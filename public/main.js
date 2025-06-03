// public/main.js
const urlInput = document.getElementById('urlInput');
const fetchTimeBtn = document.getElementById('fetchTimeBtn');
const serverTimeElem = document.getElementById('serverTime');
const timezoneSelect = document.getElementById('timezoneSelect');
const debugToggle = document.getElementById('debugToggle');
const debugInfo = document.getElementById('debugInfo');
const offsetDisplay = document.getElementById('offsetDisplay');
const pingDisplay = document.getElementById('pingDisplay');
const dateHeader = document.getElementById('dateHeader');
const connectedUrl = document.getElementById('connectedUrl');
const mainTitle = document.getElementById('mainTitle');
const statusText = document.getElementById('statusText');
const themeToggle = document.getElementById('themeToggle');
const themeLabel = document.getElementById('themeLabel');
const langSelect = document.getElementById('langSelect');
const debugToggleLabel = document.getElementById('debugToggleLabel');
const urlLabel = document.getElementById('urlLabel');
const timezoneLabel = document.getElementById('timezoneLabel');
const descriptionText = document.getElementById('descriptionText');

const resources = {
  en: { translation: { title: "Realtime Server Time", description: "Measure exact server time and sync with client", fetchBtn: "Fetch Server Time", timezoneLabel: "Select Timezone", urlLabel: "Enter Target Server URL", debugLabel: "Show Debug Info", themeDark: "🌙 Dark Mode", themeLight: "☀️ Light Mode", initialMessage: "⏳ Please select a URL" }},
  ko: { translation: { title: "실시간 서버 시간", description: "정확한 서버 시간을 측정하고 동기화합니다", fetchBtn: "서버 시간 가져오기", timezoneLabel: "시간대 선택", urlLabel: "타겟 서버 URL 입력", debugLabel: "정밀 정보 보기", themeDark: "🌙 다크모드", themeLight: "☀️ 라이트모드", initialMessage: "⏳ URL을 선택해주세요" }},
  ja: { translation: { title: "リアルタイムサーバー時間", description: "正確なサーバー時間を測定して同期します", fetchBtn: "サーバー時間を取得", timezoneLabel: "タイムゾーンを選択", urlLabel: "ターゲットURLを入力", debugLabel: "詳細情報を表示", themeDark: "🌙 ダークモード", themeLight: "☀️ ライトモード", initialMessage: "⏳ URLを選択してください" }},
  zh: { translation: { title: "实时服务器时间", description: "测量准确的服务器时间并同步", fetchBtn: "获取服务器时间", timezoneLabel: "选择时区", urlLabel: "输入目标服务器 URL", debugLabel: "显示调试信息", themeDark: "🌙 黑暗模式", themeLight: "☀️ 亮色模式", initialMessage: "⏳ 请选择一个 URL" }},
  'zh-TW': { translation: { title: "即時伺服器時間", description: "測量精確的伺服器時間並同步", fetchBtn: "取得伺服器時間", timezoneLabel: "選擇時區", urlLabel: "輸入目標伺服器 URL", debugLabel: "顯示詳細資訊", themeDark: "🌙 暗色模式", themeLight: "☀️ 亮色模式", initialMessage: "⏳ 請選擇 URL" }},
  es: { translation: { title: "Hora del servidor en tiempo real", description: "Mide la hora exacta del servidor y sincroniza con el cliente", fetchBtn: "Obtener hora del servidor", timezoneLabel: "Seleccionar zona horaria", urlLabel: "Ingresar URL del servidor objetivo", debugLabel: "Mostrar información de depuración", themeDark: "🌙 Modo oscuro", themeLight: "☀️ Modo claro", initialMessage: "⏳ Por favor selecciona una URL" }},
  hi: { translation: { title: "रीयलटाइम सर्वर समय", description: "सटीक सर्वर समय मापें और क्लाइंट से सिंक करें", fetchBtn: "सर्वर समय प्राप्त करें", timezoneLabel: "समय क्षेत्र चुनें", urlLabel: "लक्ष्य सर्वर URL दर्ज करें", debugLabel: "डिबग जानकारी दिखाएँ", themeDark: "🌙 डार्क मोड", themeLight: "☀️ लाइट मोड", initialMessage: "⏳ कृपया एक URL चुनें" }},
  pt: { translation: { title: "Hora do Servidor em Tempo Real", description: "Meça a hora exata do servidor e sincronize com o cliente", fetchBtn: "Buscar Hora do Servidor", timezoneLabel: "Selecionar Fuso Horário", urlLabel: "Insira o URL do Servidor Alvo", debugLabel: "Mostrar Informações de Depuração", themeDark: "🌙 Modo Escuro", themeLight: "☀️ Modo Claro", initialMessage: "⏳ Selecione uma URL" }},
  ru: { translation: { title: "Реальное серверное время", description: "Измерьте точное время сервера и синхронизируйте с клиентом", fetchBtn: "Получить время сервера", timezoneLabel: "Выберите часовой пояс", urlLabel: "Введите URL целевого сервера", debugLabel: "Показать отладочную информацию", themeDark: "🌙 Темный режим", themeLight: "☀️ Светлый режим", initialMessage: "⏳ Пожалуйста, выберите URL" }},
  fr: { translation: { title: "Heure du serveur en temps réel", description: "Mesurez l'heure exacte du serveur et synchronisez avec le client", fetchBtn: "Obtenir l'heure du serveur", timezoneLabel: "Sélectionner le fuseau horaire", urlLabel: "Entrer l'URL du serveur cible", debugLabel: "Afficher les infos de débogage", themeDark: "🌙 Mode sombre", themeLight: "☀️ Mode clair", initialMessage: "⏳ Veuillez sélectionner une URL" }},
  de: { translation: { title: "Echtzeit-Serverzeit", description: "Messen Sie die genaue Serverzeit und synchronisieren Sie mit dem Client", fetchBtn: "Serverzeit abrufen", timezoneLabel: "Zeitzone auswählen", urlLabel: "Zielserver-URL eingeben", debugLabel: "Debug-Informationen anzeigen", themeDark: "🌙 Dunkelmodus", themeLight: "☀️ Hellmodus", initialMessage: "⏳ Bitte wählen Sie eine URL" }},
  it: { translation: { title: "Ora del server in tempo reale", description: "Misura l'ora esatta del server e sincronizza con il client", fetchBtn: "Ottieni ora del server", timezoneLabel: "Seleziona fuso orario", urlLabel: "Inserisci l'URL del server di destinazione", debugLabel: "Mostra informazioni di debug", themeDark: "🌙 Modalità scura", themeLight: "☀️ Modalità chiara", initialMessage: "⏳ Seleziona un URL" }},
  tr: { translation: { title: "Gerçek Zamanlı Sunucu Saati", description: "Sunucu saatini ölçün ve istemciyle senkronize edin", fetchBtn: "Sunucu Saatini Al", timezoneLabel: "Zaman Dilimi Seç", urlLabel: "Hedef Sunucu URL'sini Girin", debugLabel: "Hata Ayıklama Bilgilerini Göster", themeDark: "🌙 Karanlık Mod", themeLight: "☀️ Açık Mod", initialMessage: "⏳ Lütfen bir URL seçin" }},
  id: { translation: { title: "Waktu Server Realtime", description: "Ukur waktu server secara akurat dan sinkronkan dengan klien", fetchBtn: "Ambil Waktu Server", timezoneLabel: "Pilih Zona Waktu", urlLabel: "Masukkan URL Server Tujuan", debugLabel: "Tampilkan Info Debug", themeDark: "🌙 Mode Gelap", themeLight: "☀️ Mode Terang", initialMessage: "⏳ Silakan pilih URL" }},
  pl: { translation: { title: "Czas serwera w czasie rzeczywistym", description: "Zmierz dokładny czas serwera i zsynchronizuj z klientem", fetchBtn: "Pobierz czas serwera", timezoneLabel: "Wybierz strefę czasową", urlLabel: "Wprowadź docelowy URL serwera", debugLabel: "Pokaż informacje debugowania", themeDark: "🌙 Tryb ciemny", themeLight: "☀️ Tryb jasny", initialMessage: "⏳ Proszę wybrać URL" }},
};

const timezones = [
  {
    value: 'Asia/Seoul',
    cities: {
      en: 'Seoul', ko: '서울', ja: 'ソウル', zh: '首尔', 'zh-TW': '首爾',
      es: 'Seúl', hi: 'सियोल', pt: 'Seul', ru: 'Сеул', fr: 'Séoul',
      de: 'Seoul', it: 'Seul', tr: 'Seul', id: 'Seoul', pl: 'Seul'
    }
  },
  {
    value: 'Asia/Tokyo',
    cities: {
      en: 'Tokyo', ko: '도쿄', ja: '東京', zh: '东京', 'zh-TW': '東京',
      es: 'Tokio', hi: 'टोक्यो', pt: 'Tóquio', ru: 'Токио', fr: 'Tokyo',
      de: 'Tokio', it: 'Tokyo', tr: 'Tokyo', id: 'Tokyo', pl: 'Tokio'
    }
  },
  {
    value: 'Asia/Shanghai',
    cities: {
      en: 'Shanghai', ko: '상하이', ja: '上海', zh: '上海', 'zh-TW': '上海',
      es: 'Shanghái', hi: 'शंघाई', pt: 'Xangai', ru: 'Шанхай', fr: 'Shanghai',
      de: 'Shanghai', it: 'Shanghai', tr: 'Şanghay', id: 'Shanghai', pl: 'Szanghaj'
    }
  },
  {
    value: 'Europe/London',
    cities: {
      en: 'London', ko: '런던', ja: 'ロンドン', zh: '伦敦', 'zh-TW': '倫敦',
      es: 'Londres', hi: 'लंदन', pt: 'Londres', ru: 'Лондон', fr: 'Londres',
      de: 'London', it: 'Londra', tr: 'Londra', id: 'London', pl: 'Londyn'
    }
  },
  {
    value: 'America/New_York',
    cities: {
      en: 'New York', ko: '뉴욕', ja: 'ニューヨーク', zh: '纽约', 'zh-TW': '紐約',
      es: 'Nueva York', hi: 'न्यूयॉर्क', pt: 'Nova Iorque', ru: 'Нью-Йорк', fr: 'New York',
      de: 'New York', it: 'New York', tr: 'New York', id: 'New York', pl: 'Nowy Jork'
    }
  },
  {
    value: 'America/Los_Angeles',
    cities: {
      en: 'Los Angeles', ko: '로스앤젤레스', ja: 'ロサンゼルス', zh: '洛杉矶', 'zh-TW': '洛杉磯',
      es: 'Los Ángeles', hi: 'लॉस एंजेलिस', pt: 'Los Angeles', ru: 'Лос-Анджелес', fr: 'Los Angeles',
      de: 'Los Angeles', it: 'Los Angeles', tr: 'Los Angeles', id: 'Los Angeles', pl: 'Los Angeles'
    }
  },
  {
    value: 'America/Denver',
    cities: {
      en: 'Denver', ko: '덴버', ja: 'デンバー', zh: '丹佛', 'zh-TW': '丹佛',
      es: 'Denver', hi: 'डेनवर', pt: 'Denver', ru: 'Денвер', fr: 'Denver',
      de: 'Denver', it: 'Denver', tr: 'Denver', id: 'Denver', pl: 'Denver'
    }
  },
  {
    value: 'America/Chicago',
    cities: {
      en: 'Chicago', ko: '시카고', ja: 'シカゴ', zh: '芝加哥', 'zh-TW': '芝加哥',
      es: 'Chicago', hi: 'शिकागो', pt: 'Chicago', ru: 'Чикаго', fr: 'Chicago',
      de: 'Chicago', it: 'Chicago', tr: 'Chicago', id: 'Chicago', pl: 'Chicago'
    }
  },
  {
    value: 'America/Santo_Domingo',
    cities: {
      en: 'Santo Domingo', ko: '산토도밍고', ja: 'サントドミンゴ', zh: '圣多明各', 'zh-TW': '聖多明哥',
      es: 'Santo Domingo', hi: 'सैंटो डोमिंगो', pt: 'Santo Domingo', ru: 'Санто-Доминго', fr: 'Saint-Domingue',
      de: 'Santo Domingo', it: 'Santo Domingo', tr: 'Santo Domingo', id: 'Santo Domingo', pl: 'Santo Domingo'
    }
  },
  {
    value: 'America/Argentina/Buenos_Aires',
    cities: {
      en: 'Buenos Aires', ko: '부에노스아이레스', ja: 'ブエノスアイレス', zh: '布宜诺斯艾利斯', 'zh-TW': '布宜諾斯艾利斯',
      es: 'Buenos Aires', hi: 'ब्यूनस आयर्स', pt: 'Buenos Aires', ru: 'Буэнос-Айрес', fr: 'Buenos Aires',
      de: 'Buenos Aires', it: 'Buenos Aires', tr: 'Buenos Aires', id: 'Buenos Aires', pl: 'Buenos Aires'
    }
  },
  {
    value: 'Europe/Berlin',
    cities: {
      en: 'Berlin', ko: '베를린', ja: 'ベルリン', zh: '柏林', 'zh-TW': '柏林',
      es: 'Berlín', hi: 'बर्लिन', pt: 'Berlim', ru: 'Берлин', fr: 'Berlin',
      de: 'Berlin', it: 'Berlino', tr: 'Berlin', id: 'Berlin', pl: 'Berlin'
    }
  },
  {
    value: 'Europe/Kyiv',
    cities: {
      en: 'Kyiv', ko: '키이우', ja: 'キーウ', zh: '基辅', 'zh-TW': '基輔',
      es: 'Kiev', hi: 'कीव', pt: 'Kiev', ru: 'Киев', fr: 'Kyiv',
      de: 'Kiew', it: 'Kiev', tr: 'Kiev', id: 'Kyiv', pl: 'Kijów'
    }
  },
  {
    value: 'Europe/Moscow',
    cities: {
      en: 'Moscow', ko: '모스크바', ja: 'モスクワ', zh: '莫斯科', 'zh-TW': '莫斯科',
      es: 'Moscú', hi: 'मॉस्को', pt: 'Moscou', ru: 'Москва', fr: 'Moscou',
      de: 'Moskau', it: 'Mosca', tr: 'Moskova', id: 'Moskow', pl: 'Moskwa'
    }
  },
  {
    value: 'Asia/Dubai',
    cities: {
      en: 'Dubai', ko: '두바이', ja: 'ドバイ', zh: '迪拜', 'zh-TW': '杜拜',
      es: 'Dubái', hi: 'दुबई', pt: 'Dubai', ru: 'Дубай', fr: 'Dubaï',
      de: 'Dubai', it: 'Dubai', tr: 'Dubai', id: 'Dubai', pl: 'Dubaj'
    }
  },
  {
    value: 'Asia/Kolkata',
    cities: {
      en: 'New Delhi', ko: '뉴델리', ja: 'ニューデリー', zh: '新德里', 'zh-TW': '新德里',
      es: 'Nueva Delhi', hi: 'नई दिल्ली', pt: 'Nova Deli', ru: 'Нью-Дели', fr: 'New Delhi',
      de: 'Neu-Delhi', it: 'Nuova Delhi', tr: 'Yeni Delhi', id: 'New Delhi', pl: 'Nowe Delhi'
    }
  },
  {
    value: 'Asia/Dhaka',
    cities: {
      en: 'Dhaka', ko: '다카', ja: 'ダッカ', zh: '达卡', 'zh-TW': '達卡',
      es: 'Daca', hi: 'ढाका', pt: 'Daca', ru: 'Дакка', fr: 'Dacca',
      de: 'Dhaka', it: 'Dacca', tr: 'Dakka', id: 'Dhaka', pl: 'Dhaka'
    }
  },
  {
    value: 'Asia/Bangkok',
    cities: {
      en: 'Bangkok', ko: '방콕', ja: 'バンコク', zh: '曼谷', 'zh-TW': '曼谷',
      es: 'Bangkok', hi: 'बैंकॉक', pt: 'Bangcoc', ru: 'Бангкок', fr: 'Bangkok',
      de: 'Bangkok', it: 'Bangkok', tr: 'Bangkok', id: 'Bangkok', pl: 'Bangkok'
    }
  },
  {
    value: 'Australia/Sydney',
    cities: {
      en: 'Sydney', ko: '시드니', ja: 'シドニー', zh: '悉尼', 'zh-TW': '雪梨',
      es: 'Sídney', hi: 'सिडनी', pt: 'Sydney', ru: 'Сидней', fr: 'Sydney',
      de: 'Sydney', it: 'Sydney', tr: 'Sidney', id: 'Sydney', pl: 'Sydney'
    }
  }
];

const browserLangRaw = navigator.language || navigator.userLanguage; // ex: 'ko-KR'
const browserLang = browserLangRaw.split('-')[0]; // 'ko'
const supportedLangs = Object.keys(resources);
const defaultLang = supportedLangs.includes(browserLang) ? browserLang : 'en';

// i18next 초기화
i18next.init({ lng: defaultLang, fallbackLng: 'en', debug: false, resources }, () => {
  updateText();
  renderTimezoneOptions();
  setUserTimezoneDefault();
  langSelect.value = defaultLang; // 언어 선택창도 동기화
});

// 언어 변경 이벤트
langSelect.addEventListener('change', (e) => {
  i18next.changeLanguage(e.target.value, () => {
    updateText();
    renderTimezoneOptions();
  });
});

// 상태 변수
let offset = 0;
let ping = 0;
let baseServerTime = null;
let lastFetched = null;
let syncInterval = null;
let lastBeepSec = null;
let lastExactPlayedSec = null;

// 번역된 텍스트 갱신
function updateText() {
  mainTitle.textContent = i18next.t('title');
  descriptionText.textContent = i18next.t('description');
  fetchTimeBtn.textContent = i18next.t('fetchBtn');
  timezoneLabel.textContent = i18next.t('timezoneLabel');
  urlLabel.textContent = i18next.t('urlLabel');
  debugToggleLabel.textContent = i18next.t('debugLabel');
  themeLabel.textContent = themeToggle.checked ? i18next.t('themeLight') : i18next.t('themeDark');
  statusText.textContent = i18next.t('initialMessage');
}

// 테마 변경
themeToggle.addEventListener('change', (e) => {
  const isDark = e.target.checked;
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  themeLabel.textContent = isDark ? i18next.t('themeLight') : i18next.t('themeDark');
});

// 타임존 셀렉터 렌더링
function renderTimezoneOptions() {
  timezoneSelect.innerHTML = '';
  timezones.forEach(tz => {
    const opt = document.createElement('option');
    const label = `UTC${moment().tz(tz.value).format('Z')} - ${tz.cities[i18next.language] || tz.cities['en']}`;
    opt.value = tz.value;
    opt.textContent = label;
    timezoneSelect.appendChild(opt);
  });
}

// 브라우저 시간대 자동 선택
function setUserTimezoneDefault() {
  const userTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (timezones.find(t => t.value === userTZ)) {
    timezoneSelect.value = userTZ;
  }
}

// 알림 Toast
function showToast(message = '✅ 적용되었습니다!') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'alert alert-success text-sm shadow-lg';
  toast.innerHTML = `<span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => container.removeChild(toast), 2000);
}

// 시계 업데이트
function updateClocks() {
  if (connectedUrl.textContent === '--') return;

  const now = new Date();
  const correctedTime = new Date(now.getTime() + offset);
  const tz = timezoneSelect.value;
  const localized = moment(correctedTime).tz(tz);
  serverTimeElem.textContent = localized.format('HH:mm:ss.SSS');

  const min = localized.minute();
  const sec = localized.second();
  const isApproaching = min % 30 === 29 && sec >= 51;

  const smallChime = document.getElementById('chimeSmall');
  const exactChime = document.getElementById('chimeExact');

  serverTimeElem.classList.toggle('soon-effect', isApproaching);

  if (isApproaching && sec >= 55 && sec <= 59 && sec !== lastBeepSec) {
    smallChime.currentTime = 0;
    smallChime.play();
    lastBeepSec = sec;
  }

  if (isApproaching && sec === 55 && sec !== lastExactPlayedSec) {
    exactChime.currentTime = 0;
    exactChime.play();
    lastExactPlayedSec = sec;
  }
}

// 시계 동기화 시작
function startClockSync() {
  if (syncInterval) clearInterval(syncInterval);
  syncInterval = setInterval(updateClocks, 100);
}

// 서버 시간 요청
async function fetchServerTime(url) {
  try {
    const proxyUrl = `/proxy?target=${encodeURIComponent(url)}`;
    const t0 = performance.now();
    const res = await fetch(proxyUrl);
    const t1 = performance.now();

    if (!res.ok) {
      alert('❌ Failed to fetch server time');
      return;
    }

    const data = await res.json();
    const serverDate = new Date(data.date);

    ping = t1 - t0;
    offset = serverDate.getTime() - (Date.now() - ping / 2);
    baseServerTime = serverDate;
    lastFetched = Date.now();

    offsetDisplay.textContent = `${offset.toFixed(2)}`;
    pingDisplay.textContent = `${ping.toFixed(2)}`;
    const kstString = new Date(serverDate.getTime() + 9 * 60 * 60 * 1000).toISOString().replace('Z', '+09:00');
    dateHeader.textContent = kstString;
    connectedUrl.textContent = url;

    const host = new URL(url).hostname;
    statusText.textContent = `${host} Time`;

    startClockSync();
    showToast();
  } catch (err) {
    alert(`⚠️ 오류 발생: ${err.message}`);
  }
}

// 1분마다 재동기화
setInterval(() => {
  const url = connectedUrl.textContent;
  if (url && url !== '--') fetchServerTime(url);
}, 60000);

// 서버 시간 가져오기 버튼
fetchTimeBtn.addEventListener('click', () => {
  const url = urlInput.value.trim();
  if (!url.startsWith('http')) {
    alert('URL은 http:// 또는 https:// 로 시작해야 합니다.');
    return;
  }
  fetchServerTime(url);
});

// 디버그 토글
debugToggle.addEventListener('change', () => {
  debugInfo.classList.toggle('hidden', !debugToggle.checked);
});

// WebSocket 초기화
const ws = new WebSocket(`ws://${location.host}`);
ws.addEventListener('message', (event) => {
  const data = JSON.parse(event.data);
  if (data.type === 'server_time' && connectedUrl.textContent === '--') {
    const now = Date.now();
    const serverTime = new Date(data.time);
    offset = serverTime.getTime() - now;
  }
});

// 초기화
function resetInitialUI() {
  statusText.textContent = i18next.t('initialMessage');
  serverTimeElem.textContent = '--:--:--.---';
}

resetInitialUI();
startClockSync();

