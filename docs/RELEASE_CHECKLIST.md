# 发布检查清单

发布前按这个清单扫一遍，避免本地可用但发出去不好用。

## 配置

- [ ] `site-config.js` 的 `siteUrl` 是正式 HTTPS 地址。
- [ ] `site-config.js` 的 `shareImage` 是公网可访问图片地址。
- [ ] `site-config.js` 的 `studioUrl` 不是 `127.0.0.1` 或 `localhost`。
- [ ] `site-config.js` 的 `githubUrl` 已填仓库地址，或确认暂时留空禁用。
- [ ] `README.md` 里的部署说明和实际发布方式一致。

## 本地检查

- [ ] `node --check app.js`
- [ ] `node --check data.js`
- [ ] `node --check site-config.js`
- [ ] `node --check server.mjs`
- [ ] 首页可打开。
- [ ] 地图省份可点击。
- [ ] 喝过、想喝、Top 1、Top 2、Top 3 状态可保存。
- [ ] 重置按钮可用。

## 分享图

- [ ] 点击“生成奶茶版图”能生成 9:16 图片。
- [ ] 人格标题、标签、统计和本命奶茶不重叠。
- [ ] 二维码不压住上方结果卡片边框。
- [ ] 二维码能扫回正式网站。
- [ ] 底部信任文案清楚可读。

## 移动端和微信

- [ ] 手机宽度下没有文本挤出按钮或卡片。
- [ ] 底部 `Idea孵化巢 / GitHub` 入口不遮挡主要操作。
- [ ] 微信内按钮文案显示为“长按图片保存”。
- [ ] 分享图长按保存后清晰可读。

## 数据口径

- [ ] 品牌总数和 README、`docs/BRANDS.md` 一致。
- [ ] 新增品牌的 `provinceId` 都存在。
- [ ] 地方隐藏款和茶饮地标不写成官方认证。
- [ ] 数据说明保留“不代表官方认证榜单”的表述。
