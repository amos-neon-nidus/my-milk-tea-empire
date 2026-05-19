# 我的奶茶版图

一个纯前端静态小游戏。打开中国奶茶地图，选择喝过、想喝和 Top 3 奶茶品牌，生成自己的奶茶人格和 9:16 分享图。

它适合部署成微信里可打开的 H5 页面：结果图会带站点二维码、明文网址和“不登录，不收集微信信息”的信任提示，方便朋友从图片回到网站生成自己的版本。

## 功能

- 点亮 34 个地区的奶茶发源地。
- 记录喝过、想喝、本命 Top 1、常驻 Top 2、心头好 Top 3。
- 区分基础款和隐藏款，隐藏款包含地方名店与茶饮地标。
- 自动生成人格标题、人格标签、统计卡片和分享图。
- 分享图内置站点二维码，适合长按保存后发到微信。
- 支持右下角外链入口：`Idea孵化巢` 和 `GitHub`。

## 当前数据

- 品牌/条目总数：58
- 基础款：33
- 隐藏款：25
- 覆盖地区：34

## 本地运行

需要安装 Node.js。

```bash
node server.mjs
```

然后打开终端里显示的地址，默认是：

```text
http://127.0.0.1:4173/
```

本地服务固定使用 4173 端口。如果 4173 被占用，服务器会提示先关闭旧服务，不会自动切换到 4174。

Windows 下也可以双击：

- `启动奶茶版图.bat`：启动本地服务并自动打开页面。
- `关闭奶茶版图.bat`：关闭 4173 上的奶茶版图本地服务。

## 项目结构

```text
.
├── index.html              页面结构和静态 meta
├── styles.css              页面视觉样式
├── app.js                  交互、统计、分享图生成
├── data.js                 省份、品牌、人格规则数据
├── site-config.js          当前站点配置
├── site-config.example.js  公开部署配置示例
├── server.mjs              本地静态服务器
├── 启动奶茶版图.bat         Windows 启动脚本
├── 关闭奶茶版图.bat         Windows 关闭脚本
├── assets/                 地图图片资源
└── docs/                   数据、部署和发布说明
```

## 站点配置

上线前先改 `site-config.js`。最重要的是 `siteUrl`，它会写入分享图二维码和社交 meta。

```js
window.MILK_TEA_SITE_CONFIG = {
  siteName: "我的奶茶版图",
  siteUrl: "https://你的域名/",
  shareTitle: "我的奶茶版图",
  shareDescription: "点亮喝过、想喝和本命奶茶，生成你的奶茶人格分享图。",
  shareImage: "https://你的域名/assets/china-map-wide.png",
  studioLabel: "Idea孵化巢",
  studioUrl: "https://你的 Idea孵化巢 页面",
  githubLabel: "GitHub",
  githubUrl: "https://github.com/你的账号/你的仓库",
  shareQrTitle: "扫码生成你的奶茶版图",
  shareTrustLine: "网页打开，不登录，不收集微信信息"
};
```

GitHub 仓库还没创建时，`githubUrl` 可以先留空，页面会显示不可点击的 GitHub 入口。公开发布前请把 `127.0.0.1` 这类本地地址换成公网可访问地址。

## 发布到公网

这是静态网站，可以部署到 GitHub Pages、Netlify、Vercel 或 Cloudflare Pages。发布时至少需要包含：

- `index.html`
- `styles.css`
- `app.js`
- `data.js`
- `site-config.js`
- `assets/`

更完整的部署步骤见 [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)，发布前检查见 [docs/RELEASE_CHECKLIST.md](docs/RELEASE_CHECKLIST.md)。

## 修改内容

- 品牌、省份、人格规则：`data.js`
- 站点、分享和外链配置：`site-config.js`
- 页面结构：`index.html`
- 视觉样式：`styles.css`
- 交互逻辑：`app.js`
- 地图图片：`assets/china-map-wide.png`

新增品牌时建议先看 [docs/BRANDS.md](docs/BRANDS.md)。文案调整可以参考 [docs/COPYWRITING.md](docs/COPYWRITING.md)。

## 微信传播建议

- 不需要微信登录，也不请求头像昵称。
- 分享图适合长按保存后发朋友圈或微信群。
- 二维码应指向 HTTPS 公网地址，不要使用本地地址。
- 如果后续要控制微信链接卡片标题、描述和缩略图，再接入微信 JS-SDK 和服务端签名接口。

## 隐私说明

当前版本只在浏览器本地保存选择结果，不需要账号，不会主动上传选择数据，也不会收集微信头像、昵称或手机号。更详细说明见 [PRIVACY.md](PRIVACY.md)。

## 数据说明

品牌、发源地和本地代表条目用于娱乐向互动展示，不代表官方认证榜单。部分地方隐藏款和茶饮地标来自公开资料整理，建议上线前按你的发布口径再复核。

## 参与贡献

欢迎补充品牌、修正文案、优化地图位置和改进移动端体验。贡献前请先看 [CONTRIBUTING.md](CONTRIBUTING.md)。

## License

MIT
