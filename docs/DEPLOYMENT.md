# 部署说明

这个项目是静态网站，部署时不需要数据库，也不需要后端接口。

## 发布前准备

1. 创建公开仓库，例如 GitHub 仓库。
2. 把项目文件上传到仓库。
3. 修改 `site-config.js`：
   - `siteUrl` 改成正式 HTTPS 地址。
   - `shareImage` 改成正式图片地址，建议使用绝对 URL。
   - `studioUrl` 改成 `Idea孵化巢` 的公网地址。
   - `githubUrl` 改成仓库地址。
4. 确认 `site-config.js` 里没有 `127.0.0.1` 或 `localhost`。

## GitHub Pages

适合最轻量的公开托管。

1. 把项目推到 GitHub。
2. 进入仓库的 Settings。
3. 找到 Pages。
4. Source 选择 Deploy from a branch。
5. Branch 选择 `main`，目录选择 `/root`。
6. 保存后等待 GitHub Pages 生成公开地址。
7. 回到 `site-config.js`，把 `siteUrl` 和 `shareImage` 更新为 Pages 地址。

## Netlify、Vercel 或 Cloudflare Pages

这些平台也可以直接部署。

- Build command 留空。
- Output directory 留空或填根目录。
- Node 版本不重要，因为线上只托管静态文件。

部署后同样要把 `site-config.js` 里的地址改为正式 HTTPS 地址。

## 微信里打开

微信里最好使用 HTTPS 公网地址。发布后请实际发到微信里检查：

- 链接能否打开。
- 页面是否需要横向缩放。
- 生成图片后是否能长按保存。
- 分享图二维码是否能扫回正式网站。
- 底部“不登录，不收集微信信息”是否清楚可见。

如果以后需要自定义微信聊天卡片的标题、描述和缩略图，需要接入微信 JS-SDK，并由服务端生成签名。当前版本暂时不需要这一步。
