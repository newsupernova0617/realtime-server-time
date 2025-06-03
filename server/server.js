// server/server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');
const https = require('https');
const { URL } = require('url');
const WebSocket = require('ws');
const dns = require('dns');
const net = require('net');

const app = express();
const PORT = process.env.PORT || 8080;

// 보안: 특정 도메인만 허용하도록 설정 (필요 시 수정)
const corsOptions = {
  origin: '*', // 🚨 배포 시엔 ['https://yourdomain.com']처럼 제한하세요
  methods: ['GET']
};
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, '../public')));

// 내부망 IP 접근 제한
function isPrivateIP(ip) {
  return /^10\./.test(ip) ||
         /^192\.168\./.test(ip) ||
         /^172\.(1[6-9]|2\d|3[01])\./.test(ip) ||
         /^127\./.test(ip) ||
         /^::1$/.test(ip) ||
         ip === 'localhost';
}

async function validateUrlSafety(targetUrl) {
  const parsed = new URL(targetUrl);
  if (!/^https?:$/.test(parsed.protocol)) throw new Error('Only http/https allowed');

  const addresses = await new Promise((resolve, reject) => {
    dns.lookup(parsed.hostname, { all: true }, (err, addrs) => err ? reject(err) : resolve(addrs));
  });

  if (addresses.some(addr => isPrivateIP(addr.address))) {
    throw new Error('Access to private/internal IPs is blocked');
  }

  return true;
}

// 서버 시간 가져오기 (HEAD → GET fallback)
function getServerTimeWithFallback(urlObj) {
  const tryMethod = (method) => {
    return new Promise((resolve, reject) => {
      const protocol = urlObj.protocol === 'https:' ? https : http;
      const options = {
        method,
        hostname: urlObj.hostname,
        path: urlObj.pathname || '/',
        port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
        headers: { 'User-Agent': 'ServerTimeSyncBot/1.0' },
      };

      const req = protocol.request(options, (res) => {
        const dateHeader = res.headers['date'];
        res.resume(); // GET일 경우 response body 무시
        if (dateHeader) resolve(dateHeader);
        else reject(new Error(`No Date header in ${method}`));
      });

      req.on('error', reject);
      req.end();
    });
  };

  return tryMethod('HEAD').catch(() => tryMethod('GET'));
}

// 프록시 엔드포인트
app.get('/proxy', async (req, res) => {
  const { target } = req.query;
  if (!target) {
    return res.status(400).json({ error: 'Missing target URL' });
  }

  try {
    await validateUrlSafety(target);
    const dateHeader = await getServerTimeWithFallback(new URL(target));
    return res.json({ date: new Date(dateHeader).toISOString() });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// WebSocket 서버
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const MAX_CONNECTIONS = 50;
let connectionCount = 0;

wss.on('connection', (ws, req) => {
  if (connectionCount >= MAX_CONNECTIONS) {
    ws.close(1008, 'Too many connections');
    return;
  }

  connectionCount++;
  console.log(`🟢 WS connected (${connectionCount})`);

  const interval = setInterval(() => {
    const now = new Date().toISOString();
    ws.send(JSON.stringify({ type: 'server_time', time: now }));
  }, 100);

  ws.on('close', () => {
    clearInterval(interval);
    connectionCount--;
    console.log(`🔴 WS disconnected (${connectionCount} left)`);
  });
});

// 서버 시작
server.listen(PORT, () => {
  console.log(`✅ Server + WS running on port ${PORT}`);
});
