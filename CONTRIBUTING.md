# 参与贡献

谢谢你愿意一起完善“我的奶茶版图”。这个项目偏娱乐向，目标是让地图好玩、好懂、好分享。

## 可以贡献什么

- 补充或修正奶茶品牌、地方隐藏款和茶饮地标。
- 调整省份内品牌胶囊的位置和显示简称。
- 优化移动端样式、分享图排版和微信传播体验。
- 修正文案、错别字、README 和部署说明。

## 修改品牌数据

品牌数据在 `data.js` 的 `brands` 数组里。新增或修改时请同步检查：

- `id` 使用稳定英文小写，避免和已有条目重复。
- `provinceId` 必须对应 `data.js` 里已有省份 id。
- `type` 使用 `main`、`local` 或 `landmark`。
- `confidence` 使用 `A`、`B` 或 `C`，资料越分散越应该保守。
- `note` 避免写成官方口号，除非有明确来源。

数据规则说明见 `docs/BRANDS.md`。

## 修改页面或分享图

- 页面结构在 `index.html`。
- 样式在 `styles.css`。
- 交互和分享图 canvas 在 `app.js`。
- 站点和外链配置在 `site-config.js`。

请尽量保持改动小而清楚。地图布局、品牌数据、分享图排版互相影响，改一个区域时不要顺手重排其它区域。

## 本地检查

修改后至少运行：

```bash
node --check app.js
node --check data.js
node --check site-config.js
node --check server.mjs
```

再启动本地服务：

```bash
node server.mjs
```

手动检查首页、地图点击、状态选择、生成分享图、二维码和右下角外链。

## 发布前

发布前请走一遍 `docs/RELEASE_CHECKLIST.md`。尤其要确认 `site-config.js` 里的 `siteUrl`、`shareImage`、`studioUrl` 和 `githubUrl` 都是公网可访问地址。
