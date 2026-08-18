# 浏览器检测器 (Browser Detector)

一个纯前端的浏览器身份检测工具，部署为 Cloudflare Worker。无需后端存储，所有检测均在本地浏览器完成，不上传任何数据。

## ✨ 功能特点

- **精准识别国产浏览器与 App 内嵌浏览器**
  - 微信、企业微信、QQ/TIM、QQ 浏览器
  - UC、华为、小米、夸克、360 系列、百度、搜狗、猎豹、傲游、2345
  - 淘宝、支付宝、钉钉、微博、今日头条、抖音、小红书、美团、京东、拼多多
  - 网易新闻、网易云音乐、Vivo、OPPO、三星等
- **国际主流浏览器**：Chrome、Firefox、Safari、Edge、Opera、Brave、Vivaldi、Arc 等
- **引擎检测**：Blink / WebKit / Gecko / Trident / EdgeHTML
- **系统与设备信息**：操作系统、平台、语言、时区、网络类型、屏幕与视口
- **硬件信息**：CPU 核心、设备内存、触控点、电池电量（如可用）
- **功能支持检测**：Service Worker、WebAssembly、WebGL/WebGPU、WebRTC、WebAuthn、Clipboard、Notifications 等 40+ 项
- **WebGL / GPU 信息**：厂商、渲染器、最大纹理尺寸等
- **存储能力**：localStorage / sessionStorage / IndexedDB / Cache API 及配额
- **User-Agent Client Hints**（高熵值）：平台版本、架构、机型等
- **HTTP 请求头回显**（通过 httpbin）
- 响应式深色主题，适配手机与桌面

## 🚀 部署方式

### 方式一：Cloudflare Workers（推荐）

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/) → Workers & Pages → 创建应用
2. 选择「创建 Worker」
3. 将 `whats-browser-worker.js` 的内容完整粘贴到编辑器中
4. 点击「部署」
5. （可选）绑定自定义域名

或使用 Wrangler CLI：

```bash
# 安装
npm install -g wrangler

# 登录
wrangler login

# 在项目目录创建 wrangler.toml（可选）
# name = "browser-detector"
# main = "whats-browser-worker.js"
# compatibility_date = "2024-01-01"

# 部署
wrangler deploy
```

### 方式二：静态托管

把脚本中的 `HTML` 常量内容提取为独立的 `index.html`，然后托管到：

- Cloudflare Pages
- Vercel
- Netlify
- GitHub Pages
- 任意静态服务器

## 📁 项目结构

```
.
├── whats-browser-worker.js   # Cloudflare Worker 入口（包含完整 HTML）
└── README.md
```

## 🔒 隐私说明

- 所有检测逻辑运行在用户浏览器本地
- 仅向 `https://httpbin.org/headers` 发起一次请求用于展示 HTTP 请求头（可自行移除）
- 不收集、不存储、不上传任何用户数据

## 🛠️ 技术栈

- 纯原生 HTML / CSS / JavaScript（无框架）
- Cloudflare Workers 运行时
- 使用 `navigator`、`screen`、`matchMedia`、WebGL、Client Hints 等浏览器 API

## 📝 自定义

如需修改检测逻辑或 UI，直接编辑 `whats-browser-worker.js` 中的 `HTML` 模板字符串即可。主要逻辑在 `<script>` 部分：

- `detectBrowser()` — 浏览器识别（优先匹配国产套壳与 App WebView）
- `detectOS()` — 操作系统识别
- 各类 `render*()` 函数负责渲染对应卡片

## AI
100% AI Generated