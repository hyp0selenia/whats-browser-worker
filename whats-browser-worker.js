export default {
  async fetch(request) {
    return new Response(HTML, {
      headers: {
        'Content-Type': 'text/html; charset=UTF-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  },
};

const HTML = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>浏览器检测器 - Browser Detector</title>
<style>
  :root {
    --bg: #0d1117;
    --card-bg: #161b22;
    --border: #30363d;
    --text: #c9d1d9;
    --text-secondary: #8b949e;
    --accent: #58a6ff;
    --accent2: #3fb950;
    --accent3: #d2a8ff;
    --warn: #d29922;
    --danger: #f85149;
    --tag-bg: #1c2128;
    --tag-border: #30363d;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", "Helvetica Neue", sans-serif;
    background: var(--bg);
    color: var(--text);
    line-height: 1.6;
    min-height: 100vh;
  }
  .container { max-width: 1200px; margin: 0 auto; padding: 16px; }
  header {
    text-align: center;
    padding: 32px 16px 24px;
    border-bottom: 1px solid var(--border);
    margin-bottom: 24px;
  }
  header h1 { font-size: clamp(24px, 5vw, 36px); font-weight: 700; letter-spacing: -0.5px; }
  header .subtitle { color: var(--text-secondary); font-size: 14px; margin-top: 4px; }

  /* Browser hero card */
  .hero-card {
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 28px 32px;
    margin-bottom: 24px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .hero-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--accent), var(--accent3), var(--accent2));
  }
  .browser-icon { font-size: 48px; margin-bottom: 8px; }
  .browser-name { font-size: 28px; font-weight: 700; }
  .browser-version { font-size: 16px; color: var(--accent); margin-top: 4px; }
  .browser-engine { font-size: 13px; color: var(--text-secondary); margin-top: 2px; }
  .browser-tags { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; margin-top: 12px; }
  .tag {
    display: inline-block;
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
    background: var(--tag-bg);
    border: 1px solid var(--tag-border);
    color: var(--text-secondary);
  }
  .tag.china { background: rgba(210,168,255,0.1); border-color: rgba(210,168,255,0.3); color: var(--accent3); }
  .tag.mobile { background: rgba(88,166,255,0.1); border-color: rgba(88,166,255,0.3); color: var(--accent); }
  .tag.desktop { background: rgba(63,185,80,0.1); border-color: rgba(63,185,80,0.3); color: var(--accent2); }
  .tag.webview { background: rgba(210,153,34,0.1); border-color: rgba(210,153,34,0.3); color: var(--warn); }

  /* Grid */
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 16px; margin-bottom: 24px; }
  .card {
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 16px 20px;
  }
  .card h3 {
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--text-secondary);
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .card h3 .icon { font-size: 16px; }
  .info-row { display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px solid rgba(48,54,61,0.5); }
  .info-row:last-child { border-bottom: none; }
  .info-label { color: var(--text-secondary); font-size: 13px; }
  .info-value { font-size: 13px; font-weight: 500; text-align: right; word-break: break-all; max-width: 60%; }
  .info-value.mono { font-family: "SF Mono", "Cascadia Code", "Consolas", monospace; font-size: 11px; }
  .info-value.green { color: var(--accent2); }
  .info-value.red { color: var(--danger); }
  .info-value.yellow { color: var(--warn); }
  .info-value.blue { color: var(--accent); }

  /* Full-width */
  .full-width { grid-column: 1 / -1; }

  /* Badge for boolean */
  .badge {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 10px;
    font-size: 11px;
    font-weight: 600;
  }
  .badge.yes { background: rgba(63,185,80,0.15); color: #3fb950; }
  .badge.no  { background: rgba(248,81,73,0.15); color: #f85149; }

  /* UA string */
  .ua-box {
    background: #0d1117;
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 12px 16px;
    font-family: "SF Mono", "Cascadia Code", "Consolas", monospace;
    font-size: 12px;
    color: var(--text);
    word-break: break-all;
    line-height: 1.8;
    max-height: 120px;
    overflow-y: auto;
  }

  /* Features grid */
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 8px;
  }
  .feature-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    background: var(--tag-bg);
    border-radius: 6px;
    font-size: 13px;
  }

  footer {
    text-align: center;
    padding: 24px;
    color: var(--text-secondary);
    font-size: 12px;
    border-top: 1px solid var(--border);
    margin-top: 24px;
  }
  footer a { color: var(--accent); }

  @media (max-width: 500px) {
    .grid { grid-template-columns: 1fr; }
    .container { padding: 8px; }
    .hero-card { padding: 20px 16px; }
    .browser-name { font-size: 22px; }
  }
</style>
</head>
<body>
<div class="container">

  <header>
    <h1>🔍 浏览器检测器</h1>
    <p class="subtitle">纯前端检测 — 你的浏览器身份全解析</p>
  </header>

  <div id="hero" class="hero-card">
    <div class="browser-icon" id="browserIcon">🌐</div>
    <div class="browser-name" id="browserName">检测中...</div>
    <div class="browser-version" id="browserVersion"></div>
    <div class="browser-engine" id="browserEngine"></div>
    <div class="browser-tags" id="browserTags"></div>
  </div>

  <div class="grid">

    <!-- User Agent -->
    <div class="card full-width">
      <h3><span class="icon">📋</span> User Agent 字符串</h3>
      <div class="ua-box" id="uaString"></div>
    </div>

    <!-- Basic Info -->
    <div class="card">
      <h3><span class="icon">🖥️</span> 系统与平台</h3>
      <div id="systemInfo"></div>
    </div>

    <!-- Engine Details -->
    <div class="card">
      <h3><span class="icon">⚙️</span> 引擎与渲染</h3>
      <div id="engineInfo"></div>
    </div>

    <!-- Screen -->
    <div class="card">
      <h3><span class="icon">📐</span> 屏幕与视口</h3>
      <div id="screenInfo"></div>
    </div>

    <!-- Network & Locale -->
    <div class="card">
      <h3><span class="icon">🌍</span> 网络与区域</h3>
      <div id="networkInfo"></div>
    </div>

    <!-- Hardware -->
    <div class="card">
      <h3><span class="icon">🔩</span> 硬件信息</h3>
      <div id="hardwareInfo"></div>
    </div>

    <!-- Feature Detection -->
    <div class="card full-width">
      <h3><span class="icon">✅</span> 功能支持检测</h3>
      <div class="features-grid" id="featuresGrid"></div>
    </div>

    <!-- Plugins -->
    <div class="card full-width" id="pluginsCard">
      <h3><span class="icon">🔌</span> 浏览器插件</h3>
      <div id="pluginsInfo" style="max-height:200px;overflow-y:auto;"></div>
    </div>

    <!-- WebGL -->
    <div class="card">
      <h3><span class="icon">🎮</span> WebGL / GPU</h3>
      <div id="webglInfo"></div>
    </div>

    <!-- Storage -->
    <div class="card">
      <h3><span class="icon">💾</span> 存储信息</h3>
      <div id="storageInfo"></div>
    </div>

    <!-- Misc -->
    <div class="card">
      <h3><span class="icon">📊</span> 其他信息</h3>
      <div id="miscInfo"></div>
    </div>

    <!-- HTTP Headers (via request) -->
    <div class="card">
      <h3><span class="icon">📨</span> HTTP 请求头 (fetch)</h3>
      <div id="headersInfo"></div>
    </div>

  </div>

  <footer>
    <p>纯静态页面 · 所有检测均在本地浏览器完成 · 不上传任何数据</p>
  </footer>
</div>

<script>
(function() {
  const ua = navigator.userAgent;
  const platform = navigator.platform || '';
  const vendor = navigator.vendor || '';
  const appVersion = navigator.appVersion || '';

  // ================== 核心浏览器识别 ==================

  function detectBrowser() {
    const result = {
      name: '未知浏览器',
      version: '',
      engine: '未知',
      engineVersion: '',
      icon: '🌐',
      category: [],  // china, mobile, desktop, webview, app
      isWebView: false,
      isApp: false,
      appName: '',
      raw: {}
    };

    // --- 引擎检测 ---
    if (/webkit/i.test(ua) && !/Edge?\\//i.test(ua)) {
      result.engine = 'WebKit';
      const m = ua.match(/AppleWebKit\\/([\\d.]+)/i);
      if (m) result.engineVersion = m[1];
    }
    if (/blink/i.test(ua) || (/Chrome\\//i.test(ua) && !/Edge?\\//i.test(ua))) {
      result.engine = 'Blink';
    }
    if (/Gecko\\//i.test(ua) && !/like Gecko/i.test(ua) && !/AppleWebKit/i.test(ua)) {
      result.engine = 'Gecko';
      const m = ua.match(/rv:([\\d.]+)/);
      if (m) result.engineVersion = m[1];
    }
    if (/Trident/i.test(ua) || /MSIE/i.test(ua)) {
      result.engine = 'Trident';
      const m = ua.match(/Trident\\/([\\d.]+)/);
      if (m) result.engineVersion = m[1];
    }
    if (/Edge?\\//i.test(ua)) {
      const edgeM = ua.match(/Edg(e|A|iOS)?\\/([\\d.]+)/);
      if (edgeM) {
        result.engine = 'Blink';
        const edgeVersion = edgeM[2];
        result.engineVersion = '';
      } else {
        result.engine = 'EdgeHTML';
        const m = ua.match(/Edge\\/([\\d.]+)/);
        if (m) result.engineVersion = m[1];
      }
    }

    // --- 国内套壳浏览器优先检测 ---

    // 微信 (需在 QQ 之前，以防 QQ 浏览器 UA 也匹配到 MicroMessenger)
    if (/MicroMessenger/i.test(ua)) {
      result.name = '微信内置浏览器';
      result.appName = '微信';
      const m = ua.match(/MicroMessenger\\/([\\d.]+)/i);
      if (m) result.version = m[1];
      result.icon = '💬';
      result.category.push('china', 'app', 'webview');
      result.isWebView = true;
      result.isApp = true;
    }
    // 企业微信
    else if (/wxwork/i.test(ua)) {
      result.name = '企业微信内置浏览器';
      result.appName = '企业微信';
      const m = ua.match(/wxwork\\/([\\d.]+)/i);
      if (m) result.version = m[1];
      result.icon = '🏢';
      result.category.push('china', 'app', 'webview');
      result.isWebView = true;
      result.isApp = true;
    }
    // QQ (TIM也在内)
    else if (/QQ\\//i.test(ua) && !/QQBrowser/i.test(ua) && !/MQQBrowser/i.test(ua)) {
      result.name = 'QQ/TIM 内置浏览器';
      result.appName = 'QQ';
      const m = ua.match(/QQ\\/([\\d.]+)/i);
      if (m) result.version = m[1];
      result.icon = '🐧';
      result.category.push('china', 'app', 'webview');
      result.isWebView = true;
      result.isApp = true;
    }
    // QQ浏览器 (需在普通 Chrome 之前)
    else if (/QQBrowser/i.test(ua) || /MQQBrowser/i.test(ua)) {
      result.name = 'QQ浏览器';
      const m = ua.match(/QQBrowser\\/([\\d.]+)/i) || ua.match(/MQQBrowser\\/([\\d.]+)/i);
      if (m) result.version = m[1];
      result.icon = '🐧';
      result.category.push('china');
    }
    // UC浏览器
    else if (/UCBrowser/i.test(ua) || /UCWEB/i.test(ua)) {
      result.name = 'UC浏览器';
      const m = ua.match(/UCBrowser\\/([\\d.]+)/i) || ua.match(/UCWEB\\/([\\d.]+)/i);
      if (m) result.version = m[1];
      result.icon = '🐿️';
      result.category.push('china');
    }
    // 华为浏览器
    else if (/HuaweiBrowser/i.test(ua) || /HUAWEI(?!\\/)/i.test(ua) || /HarmonyOS/i.test(ua) && /Browser/i.test(ua)) {
      result.name = '华为浏览器';
      const m = ua.match(/HuaweiBrowser\\/([\\d.]+)/i) || ua.match(/HUAWEI\\/([\\d.]+)/i);
      if (m) result.version = m[1];
      result.icon = '🔴';
      result.category.push('china');
    }
    // 小米浏览器 (MiuiBrowser)
    else if (/MiuiBrowser/i.test(ua)) {
      result.name = '小米浏览器';
      const m = ua.match(/MiuiBrowser\\/([\\d.]+)/i);
      if (m) result.version = m[1];
      result.icon = '📱';
      result.category.push('china');
    }
    // 夸克浏览器
    else if (/Quark/i.test(ua)) {
      result.name = '夸克浏览器';
      const m = ua.match(/Quark\\/([\\d.]+)/i);
      if (m) result.version = m[1];
      result.icon = '⚛️';
      result.category.push('china');
    }
    // 360浏览器
    else if (/360SE/i.test(ua) || /360EE/i.test(ua) || /360Browser/i.test(ua) || /QIHU.*360/i.test(ua)) {
      if (/360EE/i.test(ua)) result.name = '360极速浏览器';
      else if (/360SE/i.test(ua)) result.name = '360安全浏览器';
      else result.name = '360浏览器';
      result.icon = '🛡️';
      result.category.push('china');
    }
    // 百度浏览器 / 百度APP
    else if (/baidubrowser/i.test(ua) || /BaiduBrowser/i.test(ua)) {
      result.name = '百度浏览器';
      const m = ua.match(/baidubrowser\\/([\\d.]+)/i) || ua.match(/BaiduBrowser\\/([\\d.]+)/i);
      if (m) result.version = m[1];
      result.icon = '🔍';
      result.category.push('china');
    }
    else if (/baiduboxapp/i.test(ua)) {
      result.name = '百度APP内置浏览器';
      result.appName = '百度';
      const m = ua.match(/baiduboxapp\\/([\\d.]+)/i);
      if (m) result.version = m[1];
      result.icon = '🔍';
      result.category.push('china', 'app', 'webview');
      result.isWebView = true;
      result.isApp = true;
    }
    // 搜狗浏览器
    else if (/SogouMobileBrowser/i.test(ua) || /SE[\\s\\d]+MetaSr/i.test(ua) || /MetaSr/i.test(ua)) {
      result.name = '搜狗浏览器';
      const m = ua.match(/SogouMobileBrowser\\/([\\d.]+)/i);
      if (m) result.version = m[1];
      result.icon = '🐕';
      result.category.push('china');
    }
    // 猎豹浏览器
    else if (/LieBaoFast/i.test(ua) || /LBBROWSER/i.test(ua)) {
      result.name = '猎豹浏览器';
      result.icon = '🐆';
      result.category.push('china');
    }
    // 傲游浏览器
    else if (/Maxthon/i.test(ua)) {
      result.name = '傲游浏览器';
      const m = ua.match(/Maxthon\\/([\\d.]+)/i);
      if (m) result.version = m[1];
      result.icon = '🌊';
      result.category.push('china');
    }
    // 2345浏览器
    else if (/2345Explorer/i.test(ua) || (/Mb2345Browser/i.test(ua))) {
      result.name = '2345浏览器';
      result.icon = '🔢';
      result.category.push('china');
    }
    // 淘宝
    else if (/AliApp\\(TB/i.test(ua) || /Taobao/i.test(ua)) {
      result.name = '淘宝内置浏览器';
      result.appName = '淘宝';
      const m = ua.match(/AliApp\\(TB\\/([\\d.]+)/i);
      if (m) result.version = m[1];
      result.icon = '🛒';
      result.category.push('china', 'app', 'webview');
      result.isWebView = true;
      result.isApp = true;
    }
    // 支付宝
    else if (/AlipayClient/i.test(ua) || /Alipay/i.test(ua) && /AP/i.test(ua)) {
      result.name = '支付宝内置浏览器';
      result.appName = '支付宝';
      const m = ua.match(/AlipayClient\\/([\\d.]+)/i);
      if (m) result.version = m[1];
      result.icon = '💳';
      result.category.push('china', 'app', 'webview');
      result.isWebView = true;
      result.isApp = true;
    }
    // 钉钉
    else if (/DingTalk/i.test(ua) || /AliApp\\(DingTalk/i.test(ua)) {
      result.name = '钉钉内置浏览器';
      result.appName = '钉钉';
      const m = ua.match(/DingTalk\\/([\\d.]+)/i);
      if (m) result.version = m[1];
      result.icon = '📌';
      result.category.push('china', 'app', 'webview');
      result.isWebView = true;
      result.isApp = true;
    }
    // 微博
    else if (/Weibo/i.test(ua) || /__weibo__/i.test(ua)) {
      result.name = '微博内置浏览器';
      result.appName = '微博';
      result.icon = '📢';
      result.category.push('china', 'app', 'webview');
      result.isWebView = true;
      result.isApp = true;
    }
    // 今日头条 / 抖音
    else if (/NewsArticle/i.test(ua) && /Bytedance/i.test(ua)) {
      result.name = '今日头条内置浏览器';
      result.appName = '今日头条';
      result.icon = '📰';
      result.category.push('china', 'app', 'webview');
      result.isWebView = true;
      result.isApp = true;
    }
    else if (/aweme/i.test(ua) || /ByteDanceWebView/i.test(ua)) {
      result.name = '抖音内置浏览器';
      result.appName = '抖音';
      result.icon = '🎵';
      result.category.push('china', 'app', 'webview');
      result.isWebView = true;
      result.isApp = true;
    }
    // 小红书
    else if (/rednote/i.test(ua) || /xhsapi/i.test(ua)) {
      result.name = '小红书内置浏览器';
      result.appName = '小红书';
      result.icon = '📕';
      result.category.push('china', 'app', 'webview');
      result.isWebView = true;
      result.isApp = true;
    }
    // 美团
    else if (/Meituan/i.test(ua)) {
      result.name = '美团内置浏览器';
      result.appName = '美团';
      result.icon = '🍽️';
      result.category.push('china', 'app', 'webview');
      result.isWebView = true;
      result.isApp = true;
    }
    // 京东
    else if (/jdapp/i.test(ua) || /JDMobile/i.test(ua)) {
      result.name = '京东内置浏览器';
      result.appName = '京东';
      result.icon = '📦';
      result.category.push('china', 'app', 'webview');
      result.isWebView = true;
      result.isApp = true;
    }
    // 拼多多
    else if (/pinduoduo/i.test(ua)) {
      result.name = '拼多多内置浏览器';
      result.appName = '拼多多';
      result.icon = '🛍️';
      result.category.push('china', 'app', 'webview');
      result.isWebView = true;
      result.isApp = true;
    }
    // 网易新闻 / 网易云音乐
    else if (/NeteaseNews/i.test(ua) || (/NewsApp/i.test(ua) && /netease/i.test(ua))) {
      result.name = '网易新闻内置浏览器';
      result.appName = '网易新闻';
      result.icon = '📋';
      result.category.push('china', 'app', 'webview');
      result.isWebView = true;
      result.isApp = true;
    }
    else if (/orpheus/i.test(ua) || /NeteaseMusic/i.test(ua)) {
      result.name = '网易云音乐内置浏览器';
      result.appName = '网易云音乐';
      result.icon = '🎶';
      result.category.push('china', 'app', 'webview');
      result.isWebView = true;
      result.isApp = true;
    }
    // Vivo浏览器
    else if (/VivoBrowser/i.test(ua) || /vivobrowser/i.test(ua)) {
      result.name = 'Vivo浏览器';
      const m = ua.match(/VivoBrowser\\/([\\d.]+)/i);
      if (m) result.version = m[1];
      result.icon = '📲';
      result.category.push('china');
    }
    // OPPO浏览器
    else if (/OppoBrowser/i.test(ua) || /HeyTapBrowser/i.test(ua)) {
      result.name = 'OPPO浏览器';
      const m = ua.match(/OppoBrowser\\/([\\d.]+)/i) || ua.match(/HeyTapBrowser\\/([\\d.]+)/i);
      if (m) result.version = m[1];
      result.icon = '📲';
      result.category.push('china');
    }
    // 三星浏览器 (非国内，但也比较小众)
    else if (/SamsungBrowser/i.test(ua)) {
      result.name = '三星浏览器';
      const m = ua.match(/SamsungBrowser\\/([\\d.]+)/i);
      if (m) result.version = m[1];
      result.icon = '📱';
    }
    // --- 国际主流浏览器 (在前面的都没匹配到时) ---

    // Edge
    else if (/Edg(e|A|iOS)?\\//i.test(ua)) {
      result.name = 'Microsoft Edge';
      const m = ua.match(/Edg(e|A|iOS)?\\/([\\d.]+)/i);
      if (m) result.version = m[2];
      result.icon = '🌊';
    }
    // Opera
    else if (/OPR\\//i.test(ua) || /Opera/i.test(ua)) {
      if (/OPR\\//i.test(ua)) {
        result.name = 'Opera';
        const m = ua.match(/OPR\\/([\\d.]+)/i);
        if (m) result.version = m[1];
      } else {
        result.name = 'Opera';
        const m = ua.match(/Opera\\/([\\d.]+)/i) || ua.match(/Version\\/([\\d.]+)/i);
        if (m) result.version = m[1];
      }
      result.icon = '🔴';
    }
    // Brave
    else if (/Brave/i.test(ua)) {
      result.name = 'Brave';
      const m = ua.match(/Brave\\/([\\d.]+)/i);
      if (m) result.version = m[1];
      result.icon = '🦁';
    }
    // Vivaldi
    else if (/Vivaldi/i.test(ua)) {
      result.name = 'Vivaldi';
      const m = ua.match(/Vivaldi\\/([\\d.]+)/i);
      if (m) result.version = m[1];
      result.icon = '🎻';
    }
    // Arc
    else if (/Arc\\//i.test(ua)) {
      result.name = 'Arc Browser';
      const m = ua.match(/Arc\\/([\\d.]+)/i);
      if (m) result.version = m[1];
      result.icon = '🌀';
    }
    // Firefox
    else if (/Firefox\\//i.test(ua) && !/Seamonkey/i.test(ua) && !/Focus/i.test(ua)) {
      result.name = 'Mozilla Firefox';
      const m = ua.match(/Firefox\\/([\\d.]+)/i);
      if (m) result.version = m[1];
      result.icon = '🦊';
    }
    // Safari
    else if (/Safari\\//i.test(ua) && !/Chrome\\//i.test(ua) && !/CriOS\\//i.test(ua) && !/Edge?\\//i.test(ua) && !/OPR\\//i.test(ua)) {
      result.name = 'Apple Safari';
      const m = ua.match(/Version\\/([\\d.]+)/i);
      if (m) result.version = m[1];
      result.icon = '🧭';
    }
    // Chrome (iOS uses CriOS)
    else if (/CriOS\\//i.test(ua)) {
      result.name = 'Google Chrome (iOS)';
      const m = ua.match(/CriOS\\/([\\d.]+)/i);
      if (m) result.version = m[1];
      result.icon = '🌐';
    }
    // Chrome
    else if (/Chrome\\//i.test(ua)) {
      result.name = 'Google Chrome';
      const m = ua.match(/Chrome\\/([\\d.]+)/i);
      if (m) result.version = m[1];
      result.icon = '🌐';
    }
    // Chromium
    else if (/Chromium\\//i.test(ua)) {
      result.name = 'Chromium';
      const m = ua.match(/Chromium\\/([\\d.]+)/i);
      if (m) result.version = m[1];
      result.icon = '🔵';
    }

    // 回退：用 navigator 属性
    if (result.name === '未知浏览器') {
      if (/Chrome/i.test(appVersion) && vendor.includes('Google')) {
        result.name = 'Google Chrome';
        result.icon = '🌐';
      } else if (/Safari/i.test(appVersion) && vendor.includes('Apple')) {
        result.name = 'Apple Safari';
        result.icon = '🧭';
      } else if (/Firefox/i.test(appVersion)) {
        result.name = 'Mozilla Firefox';
        result.icon = '🦊';
      }
    }

    // 设备类型
    if (/Mobi|Android|iPhone|iPad|iPod/i.test(ua)) {
      if (/iPad|Tablet/i.test(ua) || (platform === 'iPad')) {
        result.category.push('tablet');
      } else {
        result.category.push('mobile');
      }
    } else {
      result.category.push('desktop');
    }

    // 如果是 WebView 但前面没被标记（通用 WebView 检测）
    if (!result.isWebView && /wv|WebView/i.test(ua) && !/Chrome\\//i.test(ua)) {
      result.isWebView = true;
      result.category.push('webview');
    }

    // 去重
    result.category = [...new Set(result.category)];

    return result;
  }

  // ================== 操作系统检测 ==================
  function detectOS() {
    let os = '未知', osVersion = '';

    // Windows
    if (/Windows NT 10/.test(ua)) { os = 'Windows 10/11'; }
    else if (/Windows NT 6.3/.test(ua)) { os = 'Windows 8.1'; }
    else if (/Windows NT 6.2/.test(ua)) { os = 'Windows 8'; }
    else if (/Windows NT 6.1/.test(ua)) { os = 'Windows 7'; }
    else if (/Windows NT 6.0/.test(ua)) { os = 'Windows Vista'; }
    else if (/Windows NT 5/.test(ua)) { os = 'Windows XP'; }
    else if (/Windows/i.test(ua)) { os = 'Windows'; }

    // macOS
    if (/Mac OS X (\\d+[._]\\d+)/i.test(ua)) {
      const v = RegExp.$1.replace(/_/g, '.');
      const versions = {
        '10.15': 'Catalina', '10.14': 'Mojave', '10.13': 'High Sierra',
        '11': 'Big Sur', '12': 'Monterey', '13': 'Ventura', '14': 'Sonoma',
        '15': 'Sequoia', '16': 'Sierra Forest'
      };
      const major = v.split('.')[0];
      const codeName = versions[v] || versions[major] || '';
      os = codeName ? \`macOS \${v} (\${codeName})\` : \`macOS \${v}\`;
    }

    // Linux
    if (/Linux/i.test(ua) && !/Android/i.test(ua)) {
      os = 'Linux';
      if (/Ubuntu/i.test(ua)) os = 'Ubuntu Linux';
      else if (/Fedora/i.test(ua)) os = 'Fedora Linux';
      else if (/Arch/i.test(ua)) os = 'Arch Linux';
    }

    // Android
    if (/Android (\\d+[.\\d]*)/i.test(ua)) {
      os = \`Android \${RegExp.$1}\`;
    }

    // iOS
    if (/iPhone OS (\\d+[_\\d]*)/i.test(ua)) {
      os = \`iOS \${RegExp.$1.replace(/_/g, '.')}\`;
    } else if (/CPU.*OS (\\d+[_\\d]*).*like Mac OS X/i.test(ua)) {
      os = \`iOS \${RegExp.$1.replace(/_/g, '.')}\`;
    }

    // HarmonyOS
    if (/HarmonyOS/i.test(ua)) {
      const m = ua.match(/HarmonyOS[\\/\\s]?([\\d.]+)/i);
      os = m ? \`HarmonyOS \${m[1]}\` : 'HarmonyOS';
    }

    // iPadOS
    if (platform === 'iPad' || (/Macintosh/i.test(ua) && 'ontouchend' in document && navigator.maxTouchPoints > 0)) {
      if (/Mac OS X (\\d+[._]\\d+)/i.test(ua)) {
        os = \`iPadOS \${RegExp.$1.replace(/_/g, '.')}\`;
      }
    }

    return os;
  }

  // ================== 渲染页面 ==================

  const browser = detectBrowser();
  const osName = detectOS();

  // Hero
  document.getElementById('browserIcon').textContent = browser.icon;
  document.getElementById('browserName').textContent = browser.name;
  document.getElementById('browserVersion').textContent = browser.version ? \`版本 \${browser.version}\` : '';
  document.getElementById('browserEngine').textContent = browser.engineVersion
    ? \`\${browser.engine} \${browser.engineVersion}\`
    : browser.engine;

  // Tags
  const tagsEl = document.getElementById('browserTags');
  const tagLabels = {
    'china': '🇨🇳 国产',
    'mobile': '📱 移动端',
    'desktop': '🖥️ 桌面端',
    'tablet': '📋 平板',
    'app': '📦 应用内嵌',
    'webview': '🔗 WebView'
  };
  browser.category.forEach(cat => {
    const span = document.createElement('span');
    span.className = \`tag \${cat}\`;
    span.textContent = tagLabels[cat] || cat;
    tagsEl.appendChild(span);
  });
  if (browser.appName) {
    const span = document.createElement('span');
    span.className = 'tag app';
    span.textContent = \`📌 \${browser.appName}\`;
    tagsEl.appendChild(span);
  }

  // UA
  document.getElementById('uaString').textContent = ua;

  // ================== 系统信息 ==================
  function renderSystemInfo() {
    const el = document.getElementById('systemInfo');
    const rows = [
      ['操作系统', osName],
      ['平台 (navigator.platform)', platform],
      ['厂商 (navigator.vendor)', vendor || '无'],
      ['产品 (navigator.product)', navigator.product || '无'],
      ['App版本', appVersion.slice(0, 80) + (appVersion.length > 80 ? '...' : '')],
      ['语言', navigator.language || '未知'],
      ['所有语言', navigator.languages ? navigator.languages.join(', ') : '无'],
      ['在线状态', navigator.onLine ? '🟢 在线' : '🔴 离线'],
      ['Cookie 启用', navigator.cookieEnabled ? '✅ 是' : '❌ 否'],
      ['Do Not Track', navigator.doNotTrack || '未设置'],
      ['PDF 查看器', navigator.pdfViewerEnabled ? '✅ 是' : '❌ 否'],
      ['WebDriver', navigator.webdriver ? '⚠️ 是 (自动化)' : '✅ 否'],
      ['自动填充', document.designMode === 'on' ? '启用' : '正常'],
    ];
    el.innerHTML = rows.map(([l, v]) => \`
      <div class="info-row"><span class="info-label">\${l}</span><span class="info-value">\${v}</span></div>
    \`).join('');
  }

  // ================== 引擎细节 ==================
  function renderEngineInfo() {
    const el = document.getElementById('engineInfo');
    const rows = [
      ['渲染引擎', browser.engine + (browser.engineVersion ? \` \${browser.engineVersion}\` : '')],
      ['User-Agent 长度', \`\${ua.length} 字符\`],
      ['是否包含 Chrome', /Chrome|Chromium|CriOS/i.test(ua) ? '✅ 是' : '❌ 否'],
      ['是否包含 Safari', /Safari/i.test(ua) ? '✅ 是' : '❌ 否'],
      ['是否包含 Firefox', /Firefox/i.test(ua) ? '✅ 是' : '❌ 否'],
      ['是否包含 Mobile', /Mobi(le)?/i.test(ua) ? '✅ 是' : '❌ 否'],
      ['是否包含 like Gecko', /like Gecko/i.test(ua) ? '✅ 是' : '❌ 否'],
      ['devicePixelRatio', \`\${window.devicePixelRatio} (\${Math.round(window.devicePixelRatio * 100)}% 缩放)\`],
      ['colorDepth', \`\${screen.colorDepth || window.screen.colorDepth}-bit\`],
      ['pixelDepth', \`\${screen.pixelDepth || window.screen.pixelDepth}-bit\`],
    ];
    el.innerHTML = rows.map(([l, v]) => \`
      <div class="info-row"><span class="info-label">\${l}</span><span class="info-value">\${v}</span></div>
    \`).join('');
  }

  // ================== 屏幕信息 ==================
  function renderScreenInfo() {
    const el = document.getElementById('screenInfo');
    const rows = [
      ['屏幕分辨率', \`\${screen.width} × \${screen.height}\`],
      ['可用屏幕', \`\${screen.availWidth} × \${screen.availHeight}\`],
      ['窗口外尺寸', \`\${window.outerWidth} × \${window.outerHeight}\`],
      ['窗口内尺寸', \`\${window.innerWidth} × \${window.innerHeight}\`],
      ['视口尺寸', \`\${document.documentElement.clientWidth} × \${document.documentElement.clientHeight}\`],
      ['屏幕方向', screen.orientation ? screen.orientation.type : '不支持 API'],
      ['屏幕角度', screen.orientation ? \`\${screen.orientation.angle}°\` : 'N/A'],
      ['设备像素比', \`\${window.devicePixelRatio}\`],
      ['colorScheme', matchMedia('(prefers-color-scheme: dark)').matches ? '🌙 深色' : '☀️ 浅色'],
    ];
    el.innerHTML = rows.map(([l, v]) => \`
      <div class="info-row"><span class="info-label">\${l}</span><span class="info-value">\${v}</span></div>
    \`).join('');
  }

  // ================== 网络/区域 ==================
  function renderNetworkInfo() {
    const el = document.getElementById('networkInfo');
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const rows = [
      ['语言', navigator.language],
      ['时区', Intl.DateTimeFormat().resolvedOptions().timeZone],
      ['时区偏移', \`UTC\${new Date().getTimezoneOffset() <= 0 ? '+' : ''}\${-new Date().getTimezoneOffset() / 60}\`],
      ['网络类型', conn ? conn.effectiveType || conn.type || '未知' : 'API 不支持'],
      ['下行速度', conn && conn.downlink ? \`\${conn.downlink} Mbps\` : 'API 不支持'],
      ['RTT', conn && conn.rtt ? \`\${conn.rtt} ms\` : 'API 不支持'],
      ['节省流量', conn && conn.saveData ? '⚠️ 是' : '否'],
      ['最大 Touch 点', navigator.maxTouchPoints || 0],
      ['硬件并发', navigator.hardwareConcurrency ? \`\${navigator.hardwareConcurrency} 核\` : '未知'],
    ];
    el.innerHTML = rows.map(([l, v]) => \`
      <div class="info-row"><span class="info-label">\${l}</span><span class="info-value">\${v}</span></div>
    \`).join('');
  }

  // ================== 硬件信息 ==================
  function renderHardwareInfo() {
    const el = document.getElementById('hardwareInfo');
    const mem = navigator.deviceMemory;
    const rows = [
      ['CPU 核心数', navigator.hardwareConcurrency ? \`\${navigator.hardwareConcurrency} 核心\` : '未知'],
      ['设备内存', mem ? \`\${mem} GB\` : 'API 不支持'],
      ['最大触控点', navigator.maxTouchPoints || '0'],
      ['触控支持', 'ontouchstart' in window ? '✅ 是' : '❌ 否'],
      ['指针类型', matchMedia('(pointer: coarse)').matches ? 'coarse (触摸)' : matchMedia('(pointer: fine)').matches ? 'fine (鼠标/笔)' : '未知'],
      ['悬停支持', matchMedia('(hover: hover)').matches ? '✅ 是' : '❌ 否'],
      ['蓝牙', navigator.bluetooth ? '✅ API 可用' : '❌ 不可用'],
      ['USB', navigator.usb ? '✅ API 可用' : '❌ 不可用'],
      ['NFC', navigator.nfc ? '✅ API 可用' : '❌ 不可用'],
      ['GPU 强制', matchMedia('(prefers-reduced-motion: reduce)').matches ? '⚠️ 减少动效' : '正常'],
    ];
    el.innerHTML = rows.map(([l, v]) => \`
      <div class="info-row"><span class="info-label">\${l}</span><span class="info-value">\${v}</span></div>
    \`).join('');
  }

  // ================== 功能支持检测 ==================
  function renderFeatures() {
    const el = document.getElementById('featuresGrid');
    const features = [
      ['Service Worker', 'serviceWorker' in navigator],
      ['Web Worker', typeof Worker !== 'undefined'],
      ['Shared Worker', typeof SharedWorker !== 'undefined'],
      ['WebAssembly', typeof WebAssembly !== 'undefined'],
      ['WebGL', !!document.createElement('canvas').getContext('webgl')],
      ['WebGL 2', !!document.createElement('canvas').getContext('webgl2')],
      ['WebGPU', 'gpu' in navigator],
      ['WebRTC', 'RTCPeerConnection' in window],
      ['WebSocket', 'WebSocket' in window],
      ['Web Share', 'share' in navigator],
      ['Web Bluetooth', 'bluetooth' in navigator],
      ['Web USB', 'usb' in navigator],
      ['Web NFC', 'nfc' in navigator],
      ['Web Serial', 'serial' in navigator],
      ['Web MIDI', 'requestMIDIAccess' in navigator],
      ['WebAuthn', 'credentials' in navigator && 'PublicKeyCredential' in window],
      ['Payment Request', 'PaymentRequest' in window],
      ['Clipboard API', 'clipboard' in navigator],
      ['Notifications', 'Notification' in window],
      ['Push API', 'PushManager' in window],
      ['Geolocation', 'geolocation' in navigator],
      ['Battery API', 'getBattery' in navigator],
      ['Vibration', 'vibrate' in navigator],
      ['Permissions', 'permissions' in navigator],
      ['File API', 'FileReader' in window],
      ['File System Access', 'showOpenFilePicker' in window],
      ['IndexedDB', 'indexedDB' in window],
      ['localStorage', (() => { try { return !!window.localStorage; } catch(e) { return false; } })()],
      ['sessionStorage', (() => { try { return !!window.sessionStorage; } catch(e) { return false; } })()],
      ['Broadcast Channel', 'BroadcastChannel' in window],
      ['Resize Observer', 'ResizeObserver' in window],
      ['Intersection Observer', 'IntersectionObserver' in window],
      ['Mutation Observer', 'MutationObserver' in window],
      ['Canvas API', !!document.createElement('canvas').getContext('2d')],
      ['OffscreenCanvas', typeof OffscreenCanvas !== 'undefined'],
      ['Speech Synthesis', 'speechSynthesis' in window],
      ['Speech Recognition', 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window],
      ['CSS Grid', (() => { const el = document.createElement('div'); return typeof el.style.gridTemplateColumns !== 'undefined'; })()],
      ['CSS Flexbox', (() => { const el = document.createElement('div'); return typeof el.style.flexBasis !== 'undefined'; })()],
      ['CSS Container Queries', typeof document.createElement('div').style.containerType !== 'undefined'],
      ['CSS @supports', typeof CSS !== 'undefined' && 'supports' in CSS],
      ['Fullscreen API', 'fullscreenEnabled' in document],
      ['Picture-in-Picture', 'pictureInPictureEnabled' in document],
      ['Screen Wake Lock', 'wakeLock' in navigator],
    ];

    el.innerHTML = features.map(([name, supported]) => \`
      <div class="feature-item">
        <span>\${name}</span>
        <span class="badge \${supported ? 'yes' : 'no'}">\${supported ? '✓' : '✗'}</span>
      </div>
    \`).join('');
  }

  // ================== 插件 ==================
  function renderPlugins() {
    const el = document.getElementById('pluginsInfo');
    const plugins = navigator.plugins;
    if (!plugins || plugins.length === 0) {
      el.innerHTML = '<div style="color:var(--text-secondary);font-size:13px;">无插件或浏览器不暴露此信息</div>';
      return;
    }
    let html = '';
    for (let i = 0; i < Math.min(plugins.length, 30); i++) {
      html += \`<div class="info-row"><span class="info-label">\${plugins[i].name}</span><span class="info-value mono">\${plugins[i].filename || ''}</span></div>\`;
    }
    if (plugins.length > 30) {
      html += \`<div class="info-row"><span class="info-label" style="color:var(--text-secondary)">... 还有 \${plugins.length - 30} 个</span><span class="info-value"></span></div>\`;
    }
    el.innerHTML = html;
  }

  // ================== WebGL/GPU ==================
  function renderWebGL() {
    const el = document.getElementById('webglInfo');
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      el.innerHTML = '<div class="info-row"><span class="info-label">WebGL</span><span class="info-value red">不支持</span></div>';
      return;
    }
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    const rows = [
      ['GPU 厂商', debugInfo ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) : 'N/A'],
      ['GPU 渲染器', debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : 'N/A'],
      ['WebGL 版本', gl.getParameter(gl.VERSION)],
      ['着色器版本', gl.getParameter(gl.SHADING_LANGUAGE_VERSION)],
      ['最大纹理尺寸', \`\${gl.getParameter(gl.MAX_TEXTURE_SIZE)} px\`],
      ['最大视口尺寸', \`\${gl.getParameter(gl.MAX_VIEWPORT_DIMS)[0]} × \${gl.getParameter(gl.MAX_VIEWPORT_DIMS)[1]}\`],
      ['支持的扩展数', \`\${gl.getSupportedExtensions().length} 个\`],
    ];
    el.innerHTML = rows.map(([l, v]) => \`
      <div class="info-row"><span class="info-label">\${l}</span><span class="info-value mono">\${v}</span></div>
    \`).join('');
  }

  // ================== 存储 ==================
  function renderStorage() {
    const el = document.getElementById('storageInfo');
    let ls = false, ss = false;
    try { localStorage.setItem('__test', '1'); localStorage.removeItem('__test'); ls = true; } catch(e) {}
    try { sessionStorage.setItem('__test', '1'); sessionStorage.removeItem('__test'); ss = true; } catch(e) {}
    let idb = false;
    try { idb = !!window.indexedDB; } catch(e) {}

    const quota = navigator.storage && navigator.storage.estimate
      ? '查询中...'
      : 'API 不支持';

    const rows = [
      ['localStorage', ls ? '✅ 可用' : '❌ 不可用'],
      ['sessionStorage', ss ? '✅ 可用' : '❌ 不可用'],
      ['IndexedDB', idb ? '✅ 可用' : '❌ 不可用'],
      ['Cache API', 'caches' in window ? '✅ 可用' : '❌ 不可用'],
      ['Cookie 启用', navigator.cookieEnabled ? '✅ 是' : '❌ 否'],
      ['存储配额', quota],
    ];

    // 异步获取存储配额
    if (navigator.storage && navigator.storage.estimate) {
      navigator.storage.estimate().then(est => {
        const used = est.usage ? \`\${(est.usage / 1024 / 1024).toFixed(1)} MB\` : 'N/A';
        const total = est.quota ? \`\${(est.quota / 1024 / 1024).toFixed(1)} MB\` : 'N/A';
        rows[5][1] = \`\${used} 已用 / \${total} 总额\`;
        renderStorage();
      }).catch(() => {});
    }

    el.innerHTML = rows.map(([l, v]) => \`
      <div class="info-row"><span class="info-label">\${l}</span><span class="info-value">\${v}</span></div>
    \`).join('');
  }

  // ================== 其他信息 ==================
  function renderMisc() {
    const el = document.getElementById('miscInfo');
    const time = new Date();
    const rows = [
      ['当前时间', time.toLocaleString('zh-CN')],
      ['UTC 时间', time.toUTCString()],
      ['时间戳', time.getTime()],
      ['Referrer', document.referrer || '(无)'],
      ['页面协议', location.protocol],
      ['是否 iframe', window !== window.top ? '⚠️ 是' : '否'],
      ['页面可见', !document.hidden ? '✅ 是' : '❌ 否'],
      ['历史长度', history.length],
      ['contentEditable', document.body.isContentEditable ? '是' : '否'],
    ];
    el.innerHTML = rows.map(([l, v]) => \`
      <div class="info-row"><span class="info-label">\${l}</span><span class="info-value mono">\${v}</span></div>
    \`).join('');
  }

  // ================== HTTP 请求头 (通过 fetch echo) ==================
  function renderHeaders() {
    const el = document.getElementById('headersInfo');
    el.innerHTML = '<div style="color:var(--text-secondary);font-size:13px;">正在通过 API 获取...</div>';

    // 使用 httpbin 或类似服务获取请求头
    fetch('https://httpbin.org/headers', { cache: 'no-store' })
      .then(r => r.json())
      .then(data => {
        const headers = data.headers || {};
        const rows = Object.entries(headers).map(([k, v]) => {
          let displayKey = k.replace(/([A-Z])/g, '-\$1').replace(/^-/, '')
            .split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('-');
          return \`<div class="info-row"><span class="info-label">\${displayKey}</span><span class="info-value mono">\${v}</span></div>\`;
        });
        el.innerHTML = rows.join('');
      })
      .catch(() => {
        el.innerHTML = '<div style="color:var(--warn);font-size:13px;">⚠️ 无法获取（可能需要科学上网）</div>';
      });
  }

  // ================== 渲染所有 ==================
  renderSystemInfo();
  renderEngineInfo();
  renderScreenInfo();
  renderNetworkInfo();
  renderHardwareInfo();
  renderFeatures();
  renderPlugins();
  renderWebGL();
  renderStorage();
  renderMisc();
  renderHeaders();

  // ================== 额外的客户端提示 (Client Hints) ==================
  if (navigator.userAgentData) {
    navigator.userAgentData.getHighEntropyValues([
      'platform', 'platformVersion', 'architecture', 'model',
      'uaFullVersion', 'fullVersionList', 'bitness', 'wow64',
      'brands'
    ]).then(data => {
      const card = document.createElement('div');
      card.className = 'card full-width';
      card.innerHTML = \`
        <h3><span class="icon">🔬</span> User-Agent Client Hints (高熵值)</h3>
        <div id="clientHintsInfo"></div>
      \`;
      document.querySelector('.grid').insertBefore(card, document.getElementById('pluginsCard'));

      const brands = data.brands || data.fullVersionList || [];
      const brandStr = brands.map(b => \`\${b.brand} \${b.version}\`).join(', ');

      const rows = [
        ['Platform', data.platform || 'N/A'],
        ['Platform Version', data.platformVersion || 'N/A'],
        ['Architecture', data.architecture || 'N/A'],
        ['Model', data.model || 'N/A'],
        ['UA Full Version', data.uaFullVersion || 'N/A'],
        ['Bitness', data.bitness || 'N/A'],
        ['WoW64', data.wow64 !== undefined ? (data.wow64 ? '是' : '否') : 'N/A'],
        ['Brands', brandStr || 'N/A'],
        ['Mobile', navigator.userAgentData.mobile ? '✅ 是' : '❌ 否'],
      ];
      document.getElementById('clientHintsInfo').innerHTML = rows.map(([l, v]) => \`
        <div class="info-row"><span class="info-label">\${l}</span><span class="info-value mono">\${v}</span></div>
      \`).join('');
    }).catch(() => {});
  }

  // ================== Battery API ==================
  if (navigator.getBattery) {
    navigator.getBattery().then(battery => {
      const batteryInfo = document.getElementById('hardwareInfo');
      const row = document.createElement('div');
      row.className = 'info-row';
      row.innerHTML = \`<span class="info-label">🔋 电池电量</span><span class="info-value">\${Math.round(battery.level * 100)}% \${battery.charging ? '⚡ 充电中' : '🔋 放电中'}</span>\`;
      batteryInfo.appendChild(row);
    }).catch(() => {});
  }

})();
</script>
</body>
</html>`;