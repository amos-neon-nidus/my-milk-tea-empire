(function () {
  const data = window.MILK_TEA_DATA;
  const siteConfig = {
    siteName: "我的奶茶版图",
    siteUrl: "",
    shareTitle: "我的奶茶版图",
    shareDescription: "点亮喝过、想喝和本命奶茶，生成你的奶茶人格分享图。",
    shareImage: "./assets/china-map-wide.png",
    studioLabel: "Idea孵化巢",
    studioUrl: "",
    githubLabel: "GitHub",
    githubUrl: "",
    ...(window.MILK_TEA_SITE_CONFIG || {})
  };
  const isWeChatBrowser = /MicroMessenger/i.test(navigator.userAgent || "");
  const storageKey = "milkTeaMap:v1";
  const uiStorageKey = "milkTeaMap:ui:v1";
  const compactMapMedia = window.matchMedia ? window.matchMedia("(max-width: 640px)") : { matches: false };
  const assetVersion = "20260520-shandong-color-unified";
  const rankNames = { top1: "本命", top2: "常驻", top3: "心头好" };
  const rankMarks = { top1: "1", top2: "2", top3: "3" };
  const topWeights = { top1: 5, top2: 3, top3: 2 };
  const brandTypeLabels = { main: "主线", local: "本地", landmark: "地标" };
  const brandTypeNames = { main: "主线品牌", local: "地方隐藏款", landmark: "茶饮地标" };
  const progressStateNames = {
    none: "待发现",
    available: "可探索",
    want: "想喝",
    one: "已点亮",
    many: "高浓度"
  };
  const mapLayerSize = { width: 720, height: 900 };
  const visualMaskSpread = 2;
  const mapImageSrc = `./assets/china-map-wide.png?v=${assetVersion}`;
  const provinceSeedOverrides = {
    shandong: [
      { x: 556, y: 381 },
      { x: 574, y: 383 },
      { x: 588, y: 395 }
    ],
    sichuan: [
      { x: 284, y: 548 },
      { x: 270, y: 584 },
      { x: 304, y: 610 }
    ]
  };
  const provinceFillColors = {
    none: { color: "#c8bca8", alpha: 1 },
    available: { color: "#fff4de", alpha: 1 },
    1: { color: "#a9e875", alpha: 1 },
    2: { color: "#45d39a", alpha: 1 },
    3: { color: "#54c7f2", alpha: 1 },
    4: { color: "#8a7cf6", alpha: 1 },
    max: { color: "#ffc64a", alpha: 1 }
  };
  const brandMapLabels = Object.freeze({
    mixue: { compact: "蜜雪", mark: "蜜" },
    heytea: { compact: "喜茶", mark: "喜" },
    nayuki: { compact: "奈雪", mark: "奈" },
    mollytea: { compact: "茉莉", mark: "茉" },
    linlee: { compact: "林里", mark: "林" },
    qiudashu: { compact: "丘大叔", mark: "丘" },
    gaga: { compact: "gaga", mark: "ga" },
    chapanda: { compact: "茶百道", mark: "茶百" },
    shuyi: { compact: "书亦烧仙草", mark: "书亦" },
    yizhisuanniunai: { compact: "一只酸奶牛", mark: "酸奶" },
    chagee: { compact: "霸王", mark: "霸" },
    guming: { compact: "古茗", mark: "古" },
    yiming: { compact: "一鸣真鲜奶吧", mark: "一鸣" },
    chayan: { compact: "茶颜悦色", mark: "茶颜" },
    ningji: { compact: "柠季", mark: "柠" },
    yihetang: { compact: "益禾堂", mark: "益" },
    idrink: { compact: "吾饮良品", mark: "吾" },
    yeye: { compact: "爷爷不泡茶", mark: "爷" },
    auntea: { compact: "沪上", mark: "沪" },
    lelecha: { compact: "乐乐茶", mark: "乐" },
    happylemon: { compact: "快乐柠檬", mark: "柠" },
    alittletea: { compact: "一点点", mark: "点" },
    moreyogurt: { compact: "茉酸奶", mark: "酸" },
    jidong: { compact: "悸动", mark: "悸" },
    suannaiguanguan: { compact: "酸奶罐罐", mark: "罐" },
    lemonright: { compact: "柠檬向右", mark: "右" },
    sweetseven: { compact: "7分甜", mark: "7" },
    moqi: { compact: "茉沏", mark: "茉" },
    xuncha: { compact: "巡茶", mark: "巡" },
    fuxiaotao: { compact: "伏小桃", mark: "伏" },
    chaseyanyu: { compact: "茶色烟雨", mark: "烟" },
    baifencha: { compact: "百分茶", mark: "%" },
    tianlala: { compact: "甜啦啦", mark: "甜" },
    kawanka: { compact: "卡旺卡", mark: "卡" },
    klfs: { compact: "快乐番薯", mark: "薯" },
    hujian: { compact: "壶见", mark: "壶" },
    ashui: { compact: "阿水大杯茶", mark: "阿水" },
    iceage: { compact: "冰雪时光", mark: "冰雪" },
    chahuanong: { compact: "茶话弄", mark: "话" },
    fangha: { compact: "放哈", mark: "放" },
    liumangxiansheng: { compact: "榴芒先生", mark: "榴" },
    cweinanniu: { compact: "牛男", mark: "牛" },
    sevenhundredcc: { compact: "700CC", mark: "700" },
    zuoshoubian: { compact: "左手边", mark: "左" },
    xiaomanteatian: { compact: "小满茶田", mark: "满" },
    xiashunaimo: { compact: "夏树奶沫", mark: "夏" },
    shijingpo: { compact: "市井婆", mark: "婆" },
    suishiye: { compact: "随时椰", mark: "椰" },
    mongolian: { compact: "蒙古奶茶", mark: "蒙" },
    "mongolian-milk-tea": { compact: "蒙古奶茶", mark: "蒙" },
    qidasu: { compact: "杞大叔", mark: "杞" },
    sanjiangxue: { compact: "三江雪", mark: "雪" },
    "guangming-teahouse": { compact: "光明甜茶", mark: "甜" },
    quchashan: { compact: "去茶山", mark: "山" },
    ahma: { compact: "阿嬷", mark: "嬷" },
    hongdu: { compact: "洪都", mark: "洪" },
    lanfongyuen: { compact: "兰芳园", mark: "兰" },
    saintsalp: { compact: "仙迹岩", mark: "仙" },
    yuezhicha: { compact: "悦之茶", mark: "悦" },
    unceasingly: { compact: "不已", mark: "不" },
    chajiuxingqiu: { compact: "茶救星球", mark: "救" },
    teayishi: { compact: "茶理宜世", mark: "理" },
    yinggehun: { compact: "英歌魂", mark: "英" },
    bingliwang: { compact: "兵立王", mark: "兵" },
    xinshiqi: { compact: "新时沏", mark: "新" },
    liangxiaotang: { compact: "梁小糖", mark: "梁" },
    baozhugong: { compact: "煲珠公", mark: "煲" },
    coco: { compact: "CoCo", mark: "Co" },
    milksha: { compact: "迷客夏", mark: "迷" },
    "50lan": { compact: "50岚", mark: "50" },
    thealley: { compact: "鹿角巷", mark: "鹿" }
  });

  // Frozen from the user's latest exported layout. Keep stable unless a new export is provided.
  const provinceLayout = Object.freeze({
    xinjiang: { x: 63, y: 224, w: 136, h: 128, expandedX: 12, expandedY: 204, expandedW: 238, expandedH: 172 },
    "inner-mongolia": { x: 341, y: 260, w: 105, h: 68, expandedX: 248, expandedY: 228, expandedW: 318, expandedH: 132 },
    heilongjiang: { x: 601, y: 100, w: 74, h: 74, expandedX: 561, expandedY: 52, expandedW: 162, expandedH: 128 },
    gansu: { x: 227, y: 309, w: 81, h: 52, expandedX: 181, expandedY: 276, expandedW: 209, expandedH: 123 },
    jilin: { x: 590, y: 183, w: 81, h: 50, expandedX: 560, expandedY: 144, expandedW: 159, expandedH: 115 },
    qinghai: { x: 185, y: 389, w: 98, h: 81, expandedX: 146, expandedY: 352, expandedW: 199, expandedH: 146 },
    ningxia: { x: 338, y: 351, w: 55, h: 48, expandedX: 295, expandedY: 323, expandedW: 137, expandedH: 114 },
    liaoning: { x: 567, y: 236, w: 60, h: 48, expandedX: 534, expandedY: 212, expandedW: 136, expandedH: 98 },
    tibet: { x: 49, y: 456, w: 135, h: 112, expandedX: 2, expandedY: 442, expandedW: 226, expandedH: 142 },
    shanxi: { x: 407, y: 350, w: 62, h: 69, expandedX: 372, expandedY: 333, expandedW: 136, expandedH: 124 },
    beijing: { x: 494, y: 262, w: 43, h: 36, expandedX: 451, expandedY: 232, expandedW: 136, expandedH: 98 },
    tianjin: { x: 515, y: 299, w: 42, h: 30, expandedX: 474, expandedY: 257, expandedW: 136, expandedH: 98 },
    hebei: { x: 480, y: 323, w: 43, h: 63, expandedX: 435, expandedY: 302, expandedW: 136, expandedH: 104 },
    shandong: { x: 539, y: 356, w: 72, h: 63, expandedX: 490, expandedY: 322, expandedW: 187, expandedH: 119 },
    shaanxi: { x: 329, y: 427, w: 85, h: 82, expandedX: 303, expandedY: 387, expandedW: 136, expandedH: 132 },
    henan: { x: 441, y: 434, w: 76, h: 63, expandedX: 383, expandedY: 394, expandedW: 201, expandedH: 119 },
    sichuan: { x: 248, y: 510, w: 84, h: 123, expandedX: 194, expandedY: 464, expandedW: 204, expandedH: 202 },
    chongqing: { x: 360, y: 538, w: 61, h: 58, expandedX: 310, expandedY: 526, expandedW: 136, expandedH: 98 },
    hubei: { x: 426, y: 513, w: 74, h: 69, expandedX: 373, expandedY: 473, expandedW: 184, expandedH: 126 },
    anhui: { x: 522, y: 469, w: 75, h: 74, expandedX: 455, expandedY: 440, expandedW: 199, expandedH: 128 },
    jiangsu: { x: 586, y: 420, w: 64, h: 71, expandedX: 426, expandedY: 355, expandedW: 296, expandedH: 191 },
    guizhou: { x: 345, y: 620, w: 80, h: 68, expandedX: 308, expandedY: 586, expandedW: 139, expandedH: 139 },
    hunan: { x: 430, y: 579, w: 73, h: 82, expandedX: 394, expandedY: 558, expandedW: 199, expandedH: 122 },
    shanghai: { x: 634, y: 494, w: 42, h: 44, expandedX: 468, expandedY: 445, expandedW: 253, expandedH: 174 },
    yunnan: { x: 225, y: 697, w: 92, h: 66, expandedX: 192, expandedY: 654, expandedW: 175, expandedH: 143 },
    guangxi: { x: 356, y: 713, w: 86, h: 56, expandedX: 318, expandedY: 650, expandedW: 163, expandedH: 113 },
    jiangxi: { x: 509, y: 590, w: 58, h: 67, expandedX: 470, expandedY: 551, expandedW: 136, expandedH: 118 },
    zhejiang: { x: 591, y: 548, w: 69, h: 66, expandedX: 523, expandedY: 518, expandedW: 190, expandedH: 143 },
    fujian: { x: 555, y: 633, w: 56, h: 72, expandedX: 498, expandedY: 617, expandedW: 160, expandedH: 110 },
    guangdong: { x: 446, y: 688, w: 103, h: 82, expandedX: 338, expandedY: 622, expandedW: 336, expandedH: 197 },
    hongkong: { x: 501, y: 786, w: 42, h: 30, expandedX: 456, expandedY: 743, expandedW: 136, expandedH: 98 },
    macau: { x: 453, y: 789, w: 42, h: 30, expandedX: 400, expandedY: 762, expandedW: 136, expandedH: 98 },
    hainan: { x: 368, y: 816, w: 68, h: 46, expandedX: 327, expandedY: 790, expandedW: 136, expandedH: 98 },
    taiwan: { x: 615, y: 710, w: 54, h: 77, expandedX: 447, expandedY: 635, expandedW: 273, expandedH: 192 }
  });

  const markerLayout = Object.freeze({
    xinjiang: { x: 107, y: 314.5 },
    "inner-mongolia": { x: 372.7, y: 304.3 },
    heilongjiang: { x: 618.9, y: 150.6 },
    gansu: { x: 255.1, y: 345.7 },
    jilin: { x: 612.9, y: 215 },
    qinghai: { x: 197, y: 451.5 },
    ningxia: { x: 342.6, y: 382.5 },
    liaoning: { x: 566.6, y: 268.6 },
    tibet: { x: 90.1, y: 534.7 },
    shanxi: { x: 419.3, y: 393.9 },
    beijing: { x: 490.7, y: 286.6 },
    tianjin: { x: 513, y: 318 },
    hebei: { x: 478.5, y: 366.7 },
    shandong: { x: 538.8, y: 351.9 },
    shaanxi: { x: 354.8, y: 481.2 },
    henan: { x: 451.6, y: 426.7 },
    sichuan: { x: 260.6, y: 535.3 },
    chongqing: { x: 349.1, y: 571.6 },
    hubei: { x: 417.7, y: 507.6 },
    anhui: { x: 536.5, y: 473.3 },
    jiangsu: { x: 583, y: 420.7 },
    guizhou: { x: 357, y: 667.5 },
    hunan: { x: 438.5, y: 588.2 },
    shanghai: { x: 620, y: 486.6 },
    yunnan: { x: 259.8, y: 742.7 },
    guangxi: { x: 379.9, y: 704.2 },
    jiangxi: { x: 523.2, y: 629.2 },
    zhejiang: { x: 596.4, y: 547.9 },
    fujian: { x: 556, y: 638 },
    guangdong: { x: 451.4, y: 688 },
    hongkong: { x: 502.6, y: 772.3 },
    macau: { x: 446.2, y: 771.9 },
    hainan: { x: 378.1, y: 846.9 },
    taiwan: { x: 611.8, y: 716.1 }
  });

  const markerSummaryLayout = Object.freeze({
    guangdong: { chunks: [5, 4] },
    shanghai: { chunks: [4, 4] }
  });

  const markerEditorEnabled = isLocalMarkerEditorHost() && new URLSearchParams(window.location.search).has("editMarkers");
  const markerDraftLayoutKey = "milk-tea-marker-layout-draft-v1";
  let markerDraftLayout = markerEditorEnabled ? loadMarkerDraftLayout() : {};
  let markerEditorPanel = null;
  let markerEditorTextarea = null;
  let markerEditorStatus = null;
  let markerEditorSelectedId = null;

  const mapBoard = document.querySelector("#map-board");
  const dialog = document.querySelector("#brand-dialog");
  const brandName = document.querySelector("#brand-name");
  const brandOrigin = document.querySelector("#brand-origin");
  const brandTags = document.querySelector("#brand-tags");
  const triedCount = document.querySelector("#tried-count");
  const provinceCount = document.querySelector("#province-count");
  const wantCount = document.querySelector("#want-count");
  const personaTitle = document.querySelector("#persona-title");
  const personaLine = document.querySelector("#persona-line");
  const personaFootnote = document.querySelector("#persona-footnote");
  const personaTags = document.querySelector("#persona-tags");
  const topList = document.querySelector("#top-list");
  const achievementGrid = document.querySelector("#achievement-grid");
  const shareBand = document.querySelector("#share-band");
  const sharePreview = document.querySelector("#share-preview");
  const downloadImage = document.querySelector("#download-image");
  const siteLinks = document.querySelector(".site-links");
  const studioLink = document.querySelector("#studio-link");
  const githubLink = document.querySelector("#github-link");
  const brandLabelToggle = document.querySelector("#brand-label-toggle");
  const brandSearch = document.querySelector("#brand-search");
  const brandSearchResults = document.querySelector("#brand-search-results");

  let selectedBrandId = null;
  let activeProvinceId = null;
  let state = loadState();
  let uiState = loadUiState();
  let showBrandLabels = typeof uiState.showBrandLabels === "boolean" ? uiState.showBrandLabels : !compactMapMedia.matches;
  let mapAssetsPromise = null;
  let mapPaintToken = 0;
  let provinceFocusToken = 0;
  let mapMarkerToken = 0;

  normalizeSiteConfigUrls();
  configureSiteChrome();
  configureToolbar();
  configureMarkerEditor();
  renderMap();
  renderSummary();

  mapBoard.addEventListener("click", handleMapBoardClick);

  document.querySelector("#generate-map").addEventListener("click", async (event) => {
    const button = event.currentTarget;
    const busyLabel = button.querySelector(".generate-label-busy");
    button.classList.add("is-busy");
    if (busyLabel) busyLabel.hidden = false;
    button.disabled = true;
    try {
      const url = await createShareImage();
      sharePreview.src = url;
      downloadImage.href = url;
      downloadImage.textContent = isWeChatBrowser ? "长按图片保存" : "保存 PNG";
      shareBand.hidden = false;
      shareBand.scrollIntoView({ behavior: "smooth", block: "start" });
    } finally {
      button.disabled = false;
      if (busyLabel) busyLabel.hidden = true;
      button.classList.remove("is-busy");
    }
  });

  document.querySelector("#reset-map").addEventListener("click", () => {
    if (!confirm("清空当前奶茶版图？")) return;
    state = {};
    saveState();
    activeProvinceId = null;
    renderMap();
    renderSummary();
  });

  document.querySelectorAll(".status-button").forEach((button) => {
    button.addEventListener("click", () => {
      if (!selectedBrandId) return;
      setBrandStatus(selectedBrandId, button.value);
      dialog.close();
    });
  });

  function configureToolbar() {
    if (brandLabelToggle) {
      brandLabelToggle.checked = showBrandLabels;
      brandLabelToggle.addEventListener("change", () => {
        showBrandLabels = brandLabelToggle.checked;
        uiState.showBrandLabels = showBrandLabels;
        saveUiState();
        renderMap();
      });
    }

    if (brandSearch && brandSearchResults) {
      brandSearch.addEventListener("input", () => renderBrandSearchResults(brandSearch.value));
      brandSearch.addEventListener("focus", () => renderBrandSearchResults(brandSearch.value));
      brandSearch.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          const first = getBrandSearchMatches(brandSearch.value)[0];
          if (!first) return;
          event.preventDefault();
          selectSearchedBrand(first.brand.id);
        }
        if (event.key === "Escape") {
          hideBrandSearchResults();
          brandSearch.blur();
        }
      });
      document.addEventListener("click", (event) => {
        if (event.target.closest(".brand-search")) return;
        hideBrandSearchResults();
      });
    }
  }

  function isLocalMarkerEditorHost() {
    return ["localhost", "127.0.0.1", "::1", "[::1]"].includes(window.location.hostname);
  }

  function configureMarkerEditor() {
    if (!markerEditorEnabled) return;
    mapBoard.dataset.markerEditor = "true";

    markerEditorPanel = document.createElement("section");
    markerEditorPanel.className = "marker-editor-panel";
    markerEditorPanel.setAttribute("aria-label", "胶囊位置校准");
    markerEditorPanel.innerHTML = `
      <div class="marker-editor-head">
        <strong>胶囊校准</strong>
        <span>拖动胶囊，方向键微调</span>
      </div>
      <textarea class="marker-editor-output" readonly spellcheck="false"></textarea>
      <div class="marker-editor-actions">
        <button type="button" data-action="copy">复制坐标</button>
        <button type="button" data-action="reset-selected">重置选中</button>
        <button type="button" data-action="clear">清空草稿</button>
      </div>
      <p class="marker-editor-status" aria-live="polite"></p>
    `;
    markerEditorTextarea = markerEditorPanel.querySelector(".marker-editor-output");
    markerEditorStatus = markerEditorPanel.querySelector(".marker-editor-status");
    markerEditorPanel.addEventListener("click", handleMarkerEditorPanelClick);
    document.body.append(markerEditorPanel);
    updateMarkerEditorOutput();
  }

  async function handleMarkerEditorPanelClick(event) {
    const action = event.target.closest("[data-action]")?.dataset.action;
    if (!action) return;

    if (action === "copy") {
      const output = getMarkerEditorOutput();
      try {
        await navigator.clipboard.writeText(output);
        setMarkerEditorStatus("已复制当前坐标");
      } catch (error) {
        markerEditorTextarea?.select();
        setMarkerEditorStatus("复制失败，可手动复制文本框");
      }
      return;
    }

    if (action === "reset-selected") {
      if (!markerEditorSelectedId) {
        setMarkerEditorStatus("先点选一个胶囊");
        return;
      }
      delete markerDraftLayout[markerEditorSelectedId];
      saveMarkerDraftLayout();
      setMarkerEditorStatus(`${getProvince(markerEditorSelectedId)?.name || markerEditorSelectedId} 已回到源码坐标`);
      renderMap();
      return;
    }

    if (action === "clear") {
      markerDraftLayout = {};
      saveMarkerDraftLayout();
      markerEditorSelectedId = null;
      setMarkerEditorStatus("已清空本地草稿");
      renderMap();
    }
  }

  function loadMarkerDraftLayout() {
    try {
      const parsed = JSON.parse(localStorage.getItem(markerDraftLayoutKey) || "{}");
      return normalizeMarkerLayoutDraft(parsed);
    } catch (error) {
      return {};
    }
  }

  function normalizeMarkerLayoutDraft(value) {
    if (!value || typeof value !== "object") return {};
    return Object.entries(value).reduce((acc, [provinceId, position]) => {
      const x = Number(position?.x);
      const y = Number(position?.y);
      if (Number.isFinite(x) && Number.isFinite(y)) acc[provinceId] = { x, y };
      return acc;
    }, {});
  }

  function saveMarkerDraftLayout() {
    if (!markerEditorEnabled) return;
    localStorage.setItem(markerDraftLayoutKey, JSON.stringify(markerDraftLayout));
    updateMarkerEditorOutput();
  }

  function getMarkerLayoutOverride(provinceId) {
    const base = markerLayout[provinceId] || {};
    const draft = markerEditorEnabled ? markerDraftLayout[provinceId] || {} : {};
    return { ...base, ...draft };
  }

  function updateMarkerEditorOutput() {
    if (!markerEditorTextarea) return;
    markerEditorTextarea.value = getMarkerEditorOutput();
  }

  function getMarkerEditorOutput() {
    const merged = data.provinces.reduce((acc, province) => {
      const position = getMarkerLayoutOverride(province.id);
      if (Number.isFinite(position.x) && Number.isFinite(position.y)) {
        acc[province.id] = {
          x: roundMarkerCoordinate(position.x),
          y: roundMarkerCoordinate(position.y)
        };
      }
      return acc;
    }, {});

    return `const markerLayout = Object.freeze(${formatMarkerLayoutObject(merged)});`;
  }

  function formatMarkerLayoutObject(layout) {
    const lines = Object.entries(layout)
      .map(([provinceId, position]) => {
        const key = /^[a-z][a-z0-9]*$/i.test(provinceId) ? provinceId : JSON.stringify(provinceId);
        return `  ${key}: { x: ${position.x}, y: ${position.y} }`;
      });
    return `{\n${lines.join(",\n")}\n}`;
  }

  function setMarkerEditorStatus(message) {
    if (!markerEditorStatus) return;
    markerEditorStatus.textContent = message;
  }

  function enableMarkerEditorForCluster(cluster) {
    if (!markerEditorEnabled) return;
    cluster.tabIndex = 0;
    cluster.title = "拖动胶囊调整位置";
    cluster.addEventListener("pointerdown", handleMarkerEditorPointerDown);
    cluster.addEventListener("keydown", handleMarkerEditorKeydown);
    cluster.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      selectMarkerEditorCluster(cluster);
    });
  }

  function handleMarkerEditorKeydown(event) {
    if (!markerEditorEnabled || !["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) return;
    event.preventDefault();

    const step = event.shiftKey ? 5 : 1;
    const dx = event.key === "ArrowLeft" ? -step : event.key === "ArrowRight" ? step : 0;
    const dy = event.key === "ArrowUp" ? -step : event.key === "ArrowDown" ? step : 0;
    moveMarkerCluster(event.currentTarget, dx, dy);
  }

  function handleMarkerEditorPointerDown(event) {
    if (!markerEditorEnabled || event.button !== 0) return;
    const cluster = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    cluster.focus({ preventScroll: true });
    cluster.setPointerCapture?.(event.pointerId);
    cluster.classList.add("is-marker-dragging");
    selectMarkerEditorCluster(cluster);

    const startX = event.clientX;
    const startY = event.clientY;
    const startMarkerX = Number(cluster.style.getPropertyValue("--marker-x")) || 0;
    const startMarkerY = Number(cluster.style.getPropertyValue("--marker-y")) || 0;

    const handlePointerMove = (moveEvent) => {
      const boardRect = mapBoard.getBoundingClientRect();
      const dx = (moveEvent.clientX - startX) / boardRect.width * mapLayerSize.width;
      const dy = (moveEvent.clientY - startY) / boardRect.height * mapLayerSize.height;
      setMarkerClusterPosition(cluster, startMarkerX + dx, startMarkerY + dy);
    };

    const handlePointerUp = () => {
      cluster.releasePointerCapture?.(event.pointerId);
      cluster.classList.remove("is-marker-dragging");
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      saveMarkerDraftLayout();
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp, { once: true });
  }

  function moveMarkerCluster(cluster, dx, dy) {
    const currentX = Number(cluster.style.getPropertyValue("--marker-x")) || 0;
    const currentY = Number(cluster.style.getPropertyValue("--marker-y")) || 0;
    setMarkerClusterPosition(cluster, currentX + dx, currentY + dy);
    saveMarkerDraftLayout();
  }

  function setMarkerClusterPosition(cluster, x, y) {
    const provinceId = cluster.dataset.provinceId;
    const markerWidth = Number(cluster.style.getPropertyValue("--marker-w")) || 18;
    const markerHeight = Number(cluster.style.getPropertyValue("--marker-h")) || 16;
    const nextX = roundMarkerCoordinate(clamp(x, -16, mapLayerSize.width - markerWidth + 16));
    const nextY = roundMarkerCoordinate(clamp(y, -16, mapLayerSize.height - markerHeight + 16));

    markerDraftLayout[provinceId] = { x: nextX, y: nextY };
    cluster.style.setProperty("--marker-x", nextX);
    cluster.style.setProperty("--marker-y", nextY);
    selectMarkerEditorCluster(cluster);
    updateMarkerEditorOutput();
  }

  function selectMarkerEditorCluster(cluster) {
    markerEditorSelectedId = cluster.dataset.provinceId;
    mapBoard.querySelectorAll(".map-brand-cluster.is-marker-selected").forEach((node) => {
      node.classList.remove("is-marker-selected");
    });
    cluster.classList.add("is-marker-selected");
    const province = getProvince(markerEditorSelectedId);
    const position = getMarkerLayoutOverride(markerEditorSelectedId);
    setMarkerEditorStatus(`${province?.name || markerEditorSelectedId} x:${roundMarkerCoordinate(position.x)} y:${roundMarkerCoordinate(position.y)}`);
  }

  function roundMarkerCoordinate(value) {
    return Math.round(Number(value) * 10) / 10;
  }

  function normalizeSiteConfigUrls() {
    const currentUrl = getCurrentPageUrl();
    if (isStalePagesUrl(siteConfig.siteUrl)) {
      siteConfig.siteUrl = currentUrl;
    }
    if (isStalePagesUrl(siteConfig.shareImage)) {
      siteConfig.shareImage = new URL("assets/china-map-wide.png", currentUrl).href;
    }
  }

  function isStalePagesUrl(value) {
    try {
      return new URL(value, window.location.href).host === "amos0927qdy-ops.github.io";
    } catch (error) {
      return false;
    }
  }

  function configureSiteChrome() {
    document.title = siteConfig.shareTitle || siteConfig.siteName || document.title;
    updateMeta("name", "description", siteConfig.shareDescription);
    updateMeta("property", "og:title", siteConfig.shareTitle);
    updateMeta("property", "og:description", siteConfig.shareDescription);
    updateMeta("property", "og:image", siteConfig.shareImage);
    updateMeta("property", "og:url", siteConfig.siteUrl);
    updateMeta("name", "twitter:title", siteConfig.shareTitle);
    updateMeta("name", "twitter:description", siteConfig.shareDescription);
    updateMeta("name", "twitter:image", siteConfig.shareImage);
    updateCanonical(siteConfig.siteUrl);
    const visibleLinks = [
      configureExternalLink(studioLink, siteConfig.studioLabel, siteConfig.studioUrl),
      configureExternalLink(githubLink, siteConfig.githubLabel, siteConfig.githubUrl)
    ];
    if (siteLinks) {
      siteLinks.hidden = !visibleLinks.some(Boolean);
    }

  }

  function updateMeta(attribute, key, value) {
    if (!value) return;
    let meta = document.querySelector(`meta[${attribute}="${key}"]`);
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute(attribute, key);
      document.head.append(meta);
    }
    meta.setAttribute("content", value);
  }

  function updateCanonical(value) {
    if (!value) return;
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.append(link);
    }
    link.setAttribute("href", value);
  }

  function configureExternalLink(link, label, url) {
    if (!link) return false;
    link.textContent = label || link.textContent;
    if (url) {
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener";
      link.removeAttribute("aria-disabled");
      link.classList.remove("is-disabled");
      link.hidden = false;
      return true;
    }
    link.href = "#";
    link.removeAttribute("target");
    link.setAttribute("aria-disabled", "true");
    link.classList.add("is-disabled");
    link.hidden = true;
    link.addEventListener("click", (event) => event.preventDefault());
    return false;
  }

  function loadState() {
    try {
      return JSON.parse(localStorage.getItem(storageKey)) || {};
    } catch (error) {
      return {};
    }
  }

  function saveState() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch (error) {
      // Some embedded file:// browsers block storage writes. Keep the in-memory state usable.
    }
  }

  function loadUiState() {
    try {
      return JSON.parse(localStorage.getItem(uiStorageKey)) || {};
    } catch (error) {
      return {};
    }
  }

  function saveUiState() {
    try {
      localStorage.setItem(uiStorageKey, JSON.stringify(uiState));
    } catch (error) {
      // UI preferences are optional; the game still works without persistence.
    }
  }

  function renderMap() {
    const brandsByProvince = groupBrandsByProvince();
    mapBoard.innerHTML = "";
    mapBoard.classList.toggle("has-active-province", Boolean(activeProvinceId));
    mapBoard.dataset.brandLabels = showBrandLabels ? "visible" : "hidden";

    const progressCanvas = document.createElement("canvas");
    progressCanvas.className = "map-progress-canvas";
    progressCanvas.width = mapLayerSize.width;
    progressCanvas.height = mapLayerSize.height;
    progressCanvas.setAttribute("aria-hidden", "true");
    mapBoard.append(progressCanvas);

    data.provinces.forEach((province) => {
      const layout = getLayoutProvince(province.id);
      const brands = brandsByProvince[province.id] || [];
      const progress = getProvinceProgress(brands);

      mapBoard.append(createProvinceCard("hitbox", province, layout, brands, progress));
    });

    paintProgressLayer(progressCanvas, brandsByProvince);
    if (showBrandLabels) {
      renderMapBrandMarkers(brandsByProvince);
    } else {
      mapMarkerToken += 1;
    }
    renderProvinceFocus(brandsByProvince);
  }

  function createProvinceCard(kind, province, layout, brands, progress) {
    const isPopover = kind === "popover";
    const node = document.createElement("section");
    node.className = `province province-${kind} ${activeProvinceId === province.id ? "is-active" : ""}`;
    node.role = "listitem";
    node.dataset.provinceId = province.id;
    node.dataset.density = brands.length;
    node.dataset.lit = progress.tried === 0 ? "none" : progress.tried === brands.length ? "full" : "some";
    node.dataset.state = progress.state;
    node.dataset.top = progress.topCount ? "true" : "false";
    node.dataset.primaryType = progress.primaryType;
    node.style.setProperty("--x", layout.x);
    node.style.setProperty("--y", layout.y);
    node.style.setProperty("--w", layout.w);
    node.style.setProperty("--h", layout.h);
    const popoverLayout = isPopover ? getAutoPopoverLayout(layout, brands) : layout;
    node.style.setProperty("--expanded-x", popoverLayout.expandedX);
    node.style.setProperty("--expanded-y", popoverLayout.expandedY);
    node.style.setProperty("--expanded-w", popoverLayout.expandedW);
    node.style.setProperty("--expanded-h", popoverLayout.expandedH);
    node.style.setProperty("--density", brands.length);
    node.style.setProperty("--province-bg", getProvinceFill(progress).color);
    node.setAttribute("aria-label", `${province.name}${brands.length ? `，${brands.length} 个奶茶条目，${progressStateNames[progress.state]}` : "，尽请期待"}`);
    if (isPopover) {
      node.addEventListener("click", (event) => {
        event.stopPropagation();
      });
    }

    const name = document.createElement("span");
    name.className = "province-name";
    name.textContent = province.name;
    node.append(name);

    if (isPopover) {
      const meta = document.createElement("span");
      meta.className = "province-meta";
      meta.textContent = formatProvinceMeta(progress);
      node.append(meta);
    }

    const stack = document.createElement("div");
    stack.className = "brand-stack";

    if (brands.length && isPopover) {
      brands.forEach((brand) => {
        stack.append(createBrandChip(brand));
      });
    } else {
      const empty = document.createElement("span");
      empty.className = "empty-label";
      empty.textContent = isPopover ? (brands.length ? `${brands.length} 个条目` : "尽请期待，等待奶茶江湖扩张") : brands.length ? `${brands.length} 个条目` : "待发现";
      stack.append(empty);
    }

    node.append(stack);
    return node;
  }

  async function renderProvinceFocus(brandsByProvince) {
    const token = ++provinceFocusToken;
    if (!activeProvinceId) return;

    try {
      const { masks } = await getMapAssets();
      if (token !== provinceFocusToken || !activeProvinceId) return;

      const province = getProvince(activeProvinceId);
      const mask = masks[activeProvinceId];
      if (!province || !mask) return;

      const brands = brandsByProvince[activeProvinceId] || [];
      const progress = getProvinceProgress(brands);
      const focus = getProvinceFocusLayout(activeProvinceId, mask, brands);

      const focusCanvas = document.createElement("canvas");
      focusCanvas.className = "province-focus-canvas";
      const pixelRatio = Math.min(2, window.devicePixelRatio || 1);
      focusCanvas.width = mapLayerSize.width * pixelRatio;
      focusCanvas.height = mapLayerSize.height * pixelRatio;
      focusCanvas.setAttribute("aria-hidden", "true");
      drawProvinceFocusLayer(focusCanvas, mask, progress, focus);
      mapBoard.append(focusCanvas);

      const node = createProvinceFocusContent(province, brands, progress, focus);
      mapBoard.append(node);
    } catch (error) {
      console.warn("Province focus failed", error);
    }
  }

  async function renderMapBrandMarkers(brandsByProvince) {
    const token = ++mapMarkerToken;

    try {
      const { masks } = await getMapAssets();
      if (token !== mapMarkerToken) return;

      const layer = document.createElement("div");
      layer.className = "map-brand-layer";
      layer.setAttribute("aria-label", "地图奶茶品牌标记");

      data.provinces.forEach((province) => {
        const brands = brandsByProvince[province.id] || [];
        const mask = masks[province.id];
        if (!brands.length || !mask) return;

        const layout = getLayoutProvince(province.id);
        const cluster = createMapBrandCluster(province, layout, mask, brands);
        if (cluster) layer.append(cluster);
      });

      if (!mapBoard.isConnected || token !== mapMarkerToken) return;
      mapBoard.append(layer);
    } catch (error) {
      console.warn("Map brand markers failed", error);
    }
  }

  function createMapBrandCluster(province, layout, mask, brands) {
    const displayItems = getMapBrandDisplayItems(province.id, brands);
    const markerTarget = getMapMarkerTarget(brands.length, displayItems.length);
    const rect = findBestMaskRect(mask, markerTarget.aspect);
    const bounds = getMapMarkerBounds(province.id, mask, layout, rect, brands, displayItems);
    if (bounds.w < 14 || bounds.h < 12) return null;

    const cluster = document.createElement("div");
    const markerOverride = getMarkerLayoutOverride(province.id);
    const markerX = Number.isFinite(markerOverride?.x) ? markerOverride.x : bounds.x;
    const markerY = Number.isFinite(markerOverride?.y) ? markerOverride.y : bounds.y;
    cluster.className = "map-brand-cluster";
    cluster.dataset.provinceId = province.id;
    cluster.dataset.count = brands.length;
    cluster.dataset.summary = brands.length >= 3 ? "true" : "false";
    cluster.style.setProperty("--marker-x", markerX);
    cluster.style.setProperty("--marker-y", markerY);
    cluster.style.setProperty("--marker-w", bounds.w);
    cluster.style.setProperty("--marker-h", bounds.h);
    cluster.style.setProperty("--marker-columns", bounds.columns || 1);
    cluster.style.setProperty("--marker-gap", `${bounds.gap || 2}px`);
    cluster.dataset.splitLabel = bounds.splitLabel ? "true" : "false";
    cluster.dataset.layout = bounds.layout || "stack";
    enableMarkerEditorForCluster(cluster);

    displayItems.forEach((item) => {
      cluster.append(item.type === "summary"
        ? createMapBrandSummaryToken(province, item.brands)
        : createMapBrandToken(item.brand, brands.length, bounds));
    });

    return cluster;
  }

  function getMapBrandDisplayItems(provinceId, brands) {
    const summaryLayout = getMarkerSummaryLayout(provinceId, brands.length);
    if (summaryLayout) {
      return getChunkedMapBrandDisplayItems(provinceId, brands, summaryLayout.chunks);
    }

    if (brands.length <= 2) {
      return brands.map((brand) => ({ type: "brand", brand }));
    }

    const chunkSize = brands.length >= 5 ? 3 : Math.ceil(brands.length / 2);
    const items = [];
    for (let index = 0; index < brands.length; index += chunkSize) {
      items.push({ type: "summary", provinceId: brands[0]?.provinceId || "", brands: brands.slice(index, index + chunkSize) });
    }
    return items;
  }

  function getChunkedMapBrandDisplayItems(provinceId, brands, chunks) {
    const items = [];
    let index = 0;
    chunks.forEach((size) => {
      const chunk = brands.slice(index, index + size);
      if (chunk.length) items.push({ type: "summary", provinceId, brands: chunk });
      index += size;
    });

    if (index < brands.length) {
      items.push({ type: "summary", provinceId, brands: brands.slice(index) });
    }

    return items;
  }

  function createMapBrandToken(brand, count, bounds) {
    const token = document.createElement("button");
    const current = state[brand.id] || "";
    const label = getBrandMapLabel(brand, count, bounds);
    token.className = `map-brand-token type-${getBrandType(brand)} ${current ? `status-${current}` : ""}`;
    token.type = "button";
    token.dataset.brandId = brand.id;
    token.dataset.rank = rankMarks[current] || "";
    token.dataset.mode = label.mode;
    token.append(createMapTokenLabel(label.text));
    token.setAttribute("aria-label", `${brand.name}，点击选择喝过或 Top`);
    token.addEventListener("click", (event) => {
      event.stopPropagation();
      if (markerEditorEnabled) return;
      openBrandDialog(brand.id);
    });
    return token;
  }

  function createMapBrandSummaryToken(province, brands) {
    const token = document.createElement("button");
    token.className = "map-brand-token map-brand-token-summary";
    token.type = "button";
    token.dataset.mode = "summary";
    token.append(createMapBrandSummaryLabel(province.id, brands));
    token.setAttribute("aria-label", `${province.name}奶茶品牌摘要，点击展开`);
    token.addEventListener("click", (event) => {
      event.stopPropagation();
      if (markerEditorEnabled) return;
      activeProvinceId = province.id;
      renderMap();
    });
    return token;
  }

  function createMapBrandSummaryLabel(provinceId, brands) {
    const label = document.createElement("span");
    label.className = "map-brand-token-label map-brand-token-summary-label";

    brands.forEach((brand, index) => {
      if (index > 0) {
        const separator = document.createElement("span");
        separator.className = "map-brand-token-separator";
        separator.textContent = "/";
        label.append(separator);
      }

      const part = document.createElement("span");
      part.className = "map-brand-token-part";
      part.dataset.brandId = brand.id;
      part.dataset.rank = rankMarks[state[brand.id]] || "";
      part.textContent = getBrandMapSummaryPartText(provinceId, brand);
      label.append(part);
    });

    return label;
  }

  function createMapTokenLabel(text) {
    const label = document.createElement("span");
    label.className = "map-brand-token-label";
    label.textContent = text;
    return label;
  }

  function renderBrandSearchResults(query) {
    if (!brandSearch || !brandSearchResults) return;
    const matches = getBrandSearchMatches(query).slice(0, 8);
    brandSearchResults.innerHTML = "";
    brandSearch.setAttribute("aria-expanded", matches.length ? "true" : "false");

    if (!matches.length) {
      brandSearchResults.hidden = true;
      return;
    }

    matches.forEach(({ brand, province }) => {
      const item = document.createElement("button");
      item.className = "brand-search-result";
      item.type = "button";
      item.setAttribute("role", "option");
      item.dataset.brandId = brand.id;

      const name = document.createElement("strong");
      name.textContent = brand.name;

      const meta = document.createElement("span");
      meta.textContent = `${province.name} · ${brandTypeNames[getBrandType(brand)]}`;

      item.append(name, meta);
      item.addEventListener("click", () => selectSearchedBrand(brand.id));
      brandSearchResults.append(item);
    });

    brandSearchResults.hidden = false;
  }

  function getBrandSearchMatches(query) {
    const normalized = normalizeSearchText(query);
    if (!normalized) return [];

    return data.brands
      .map((brand) => {
        const province = getProvince(brand.provinceId);
        const fields = [brand.name, brand.city, province?.name, brandTypeNames[getBrandType(brand)], ...(brand.tags || [])];
        const haystack = normalizeSearchText(fields.join(" "));
        if (!haystack.includes(normalized)) return null;
        const name = normalizeSearchText(brand.name);
        const score = name === normalized ? 0 : name.startsWith(normalized) ? 1 : haystack.startsWith(normalized) ? 2 : 3;
        return { brand, province, score };
      })
      .filter(Boolean)
      .sort((a, b) => a.score - b.score || a.brand.name.localeCompare(b.brand.name, "zh-Hans-CN"));
  }

  function normalizeSearchText(value) {
    return String(value || "").toLowerCase().replace(/[\s·/｜|,，。.-]+/g, "");
  }

  function selectSearchedBrand(brandId) {
    const brand = getBrand(brandId);
    if (!brand) return;
    activeProvinceId = brand.provinceId;
    hideBrandSearchResults();
    if (brandSearch) brandSearch.value = brand.name;
    renderMap();
    openBrandDialog(brand.id);
    mapBoard.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function hideBrandSearchResults() {
    if (!brandSearch || !brandSearchResults) return;
    brandSearchResults.hidden = true;
    brandSearch.setAttribute("aria-expanded", "false");
  }

  function getMapMarkerTarget(count, itemCount) {
    if (count <= 1) return { aspect: 2.5 };
    if (count === 2) return { aspect: 2.1 };
    if (itemCount <= 1) return { aspect: 2.8 };
    return { aspect: 2.4 };
  }

  function getMapMarkerBounds(provinceId, mask, layout, rect, brands, displayItems) {
    const count = brands.length;
    const itemCount = displayItems.length;
    const inset = count >= 5 ? 3 : 4;
    const rectX = mask.x + rect.x + inset;
    const rectY = mask.y + rect.y + inset;
    const rectW = Math.max(10, rect.w - inset * 2);
    const rectH = Math.max(10, rect.h - inset * 2);
    const columns = getMapMarkerColumns(provinceId, count, { w: rectW, h: rectH }, itemCount);
    const rows = Math.ceil(itemCount / columns);
    const markerGap = getMapMarkerGap(provinceId, count, itemCount, rows);
    const size = getMapMarkerSize(displayItems, count, columns, markerGap, rectW);
    const splitLabel = rows > 1 && count >= 3;
    const placement = getMapMarkerPlacement(provinceId, count, itemCount, rows);
    const labelRect = getProvinceLabelRect(provinceId, layout);
    const searchRect = { x: rectX, y: rectY, w: rectW, h: rectH };
    const best = chooseMapMarkerCandidate(provinceId, mask, searchRect, size, labelRect, placement, splitLabel);

    return {
      x: best.x,
      y: best.y,
      w: size.w,
      h: size.h,
      gap: markerGap,
      splitLabel,
      columns
    };
  }

  function getMapMarkerGap(provinceId, count, itemCount, rows) {
    if (rows <= 1) return 2;
    const layout = getLayoutProvince(provinceId);
    const labelSize = getProvinceLabelSize(provinceId, layout);
    if (provinceId === "guangdong") return labelSize + 18;
    if (isMarkerTinyProvince(provinceId)) return labelSize + 12;
    return labelSize + 14;
  }

  function getMapMarkerPlacement(provinceId, count, itemCount, rows) {
    const placement = {
      xShift: 0,
      yShift: 0,
      allowOutside: rows > 1 && count >= 3
    };

    if (provinceId === "guangdong") {
      placement.yShift = 2;
    }
    if (provinceId === "shanghai") {
      placement.xShift = 26;
      placement.yShift = -4;
      placement.allowOutside = true;
    }
    if (provinceId === "hongkong") {
      placement.xShift = 12;
      placement.allowOutside = true;
    }
    if (provinceId === "macau") {
      placement.xShift = -12;
      placement.allowOutside = true;
    }
    if (provinceId === "taiwan" && rows > 1) {
      placement.xShift = 10;
      placement.allowOutside = true;
    }

    return placement;
  }

  function isMarkerTinyProvince(provinceId) {
    return new Set(["beijing", "tianjin", "shanghai", "hongkong", "macau", "hainan"]).has(provinceId);
  }

  function getMapMarkerColumns(provinceId, count, bounds, itemCount) {
    if (count >= 3) return 1;
    if (count === 2) return 1;
    if (itemCount > 1) return 1;
    return 1;
  }

  function getMarkerSummaryLayout(provinceId, count) {
    const layout = markerSummaryLayout[provinceId];
    const expectedCount = layout?.chunks.reduce((sum, size) => sum + size, 0);
    return expectedCount === count ? layout : null;
  }

  function getMapMarkerSize(displayItems, count, columns, markerGap, maxWidth) {
    const widths = displayItems.map((item) => getMapMarkerItemWidth(item, count, maxWidth));
    const rowWidths = [];
    for (let index = 0; index < widths.length; index += columns) {
      const row = widths.slice(index, index + columns);
      rowWidths.push(row.reduce((sum, width) => sum + width, 0) + Math.max(0, row.length - 1) * 2);
    }

    const rows = Math.max(1, Math.ceil(displayItems.length / columns));
    return {
      w: clamp(Math.max(...rowWidths, 18), 18, mapLayerSize.width - 8),
      h: Math.max(16, rows * 17 + (rows - 1) * markerGap)
    };
  }

  function getMapMarkerItemWidth(item, count, maxWidth) {
    const text = item.type === "summary"
      ? getBrandMapSummaryText(item.provinceId, item.brands)
      : getEstimatedBrandMapText(item.brand, count, maxWidth);
    const mode = item.type === "summary" ? "summary" : count <= 1 ? "full" : count <= 4 ? "compact" : "mark";
    return estimateMapTokenWidth(text, mode);
  }

  function getEstimatedBrandMapText(brand, count, maxWidth) {
    const labels = brandMapLabels[brand.id] || {};
    const compact = labels.compact || normalizeBrandName(brand.name);

    if (count <= 1) return maxWidth >= estimateMapLabelWidth(brand.name) ? brand.name : compact;
    if (count <= 2) return compact;
    return labels.mark || compact.slice(0, 2);
  }

  function estimateMapTokenWidth(text, mode) {
    const maxWidth = mode === "full" ? 116 : mode === "summary" ? 96 : 82;
    const minWidth = mode === "mark" ? 20 : mode === "summary" ? 44 : 22;
    return clamp(estimateMapLabelWidth(text), minWidth, maxWidth);
  }

  function chooseMapMarkerCandidate(provinceId, mask, searchRect, size, labelRect, placement, splitLabel) {
    const candidates = getMapMarkerCandidates(searchRect, size, labelRect, splitLabel)
      .map((candidate) => ({
        ...candidate,
        x: candidate.x + placement.xShift,
        y: candidate.y + placement.yShift
      }));
    const allowOutside = placement.allowOutside || splitLabel;
    const allLabels = getAllProvinceLabelRects();
    let best = null;

    candidates.forEach((candidate) => {
      const normalized = normalizeMapMarkerCandidate(candidate, size, searchRect, true);
      const score = scoreMapMarkerCandidate(normalized, mask, labelRect, allLabels, allowOutside);
      if (!best || score > best.score) best = { ...normalized, score };
    });

    return best || normalizeMapMarkerCandidate(
      {
        x: searchRect.x + (searchRect.w - size.w) / 2,
        y: searchRect.y + (searchRect.h - size.h) / 2
      },
      size,
      searchRect,
      allowOutside
    );
  }

  function getMapMarkerCandidates(searchRect, size, labelRect, splitLabel) {
    const labelCenter = getRectCenter(labelRect);
    const rectCenter = getRectCenter(searchRect);
    const labelGap = 9;
    const sideGap = 8;
    const candidates = [
      {
        x: labelCenter.x - size.w / 2,
        y: labelRect.y - size.h - labelGap,
        type: "above"
      },
      {
        x: labelCenter.x - size.w / 2,
        y: labelRect.y + labelRect.h + labelGap,
        type: "below"
      },
      {
        x: labelRect.x - size.w - sideGap,
        y: labelCenter.y - size.h / 2,
        type: "left"
      },
      {
        x: labelRect.x + labelRect.w + sideGap,
        y: labelCenter.y - size.h / 2,
        type: "right"
      },
      {
        x: rectCenter.x - size.w / 2,
        y: searchRect.y + 4,
        type: "rect-top"
      },
      {
        x: rectCenter.x - size.w / 2,
        y: searchRect.y + searchRect.h - size.h - 4,
        type: "rect-bottom"
      },
      {
        x: searchRect.x + 4,
        y: rectCenter.y - size.h / 2,
        type: "rect-left"
      },
      {
        x: searchRect.x + searchRect.w - size.w - 4,
        y: rectCenter.y - size.h / 2,
        type: "rect-right"
      }
    ];

    if (splitLabel) {
      candidates.unshift({
        x: labelCenter.x - size.w / 2,
        y: labelCenter.y - size.h / 2,
        type: "split-center"
      });
    } else {
      candidates.push({
        x: rectCenter.x - size.w / 2,
        y: rectCenter.y - size.h / 2,
        type: "rect-center"
      });
    }

    return candidates;
  }

  function normalizeMapMarkerCandidate(candidate, size, searchRect, allowOutside) {
    const minX = allowOutside ? 4 : searchRect.x;
    const minY = allowOutside ? 4 : searchRect.y;
    const maxX = allowOutside ? mapLayerSize.width - size.w - 4 : searchRect.x + searchRect.w - size.w;
    const maxY = allowOutside ? mapLayerSize.height - size.h - 4 : searchRect.y + searchRect.h - size.h;
    return {
      x: clamp(candidate.x, minX, Math.max(minX, maxX)),
      y: clamp(candidate.y, minY, Math.max(minY, maxY)),
      w: size.w,
      h: size.h,
      type: candidate.type
    };
  }

  function scoreMapMarkerCandidate(candidate, mask, labelRect, allLabels, allowOutside) {
    const inflatedOwnLabel = inflateRect(labelRect, 7);
    const center = getRectCenter(candidate);
    const labelCenter = getRectCenter(labelRect);
    const coverage = getMaskCoverageScore(mask, candidate);
    const ownOverlap = getRectOverlapArea(candidate, inflatedOwnLabel);
    const labelOverlap = allLabels.reduce((sum, rect) => sum + getRectOverlapArea(candidate, inflateRect(rect, 3)), 0);
    const distance = Math.hypot(center.x - labelCenter.x, center.y - labelCenter.y);
    let score = 1000;

    score += coverage * (allowOutside ? 180 : 420);
    score -= ownOverlap * 120;
    score -= Math.max(0, labelOverlap - ownOverlap) * 24;
    score -= distance * (allowOutside ? 1.1 : 1.7);
    if (!allowOutside && coverage < 0.35) score -= 900;
    if (candidate.type === "split-center") score += 120;
    if (candidate.type === "above" || candidate.type === "below") score += 40;
    return score;
  }

  function getMaskCoverageScore(mask, rect) {
    const samplePoints = [
      [0.5, 0.5],
      [0.25, 0.35],
      [0.75, 0.35],
      [0.25, 0.65],
      [0.75, 0.65],
      [0.5, 0.18],
      [0.5, 0.82]
    ];
    let inside = 0;

    samplePoints.forEach(([px, py]) => {
      const x = rect.x + rect.w * px;
      const y = rect.y + rect.h * py;
      if (isPointInMask(mask, x, y, 2)) inside += 1;
    });

    return inside / samplePoints.length;
  }

  function getProvinceLabelRect(provinceId, layout) {
    const province = getProvince(provinceId);
    const fontSize = getProvinceLabelSize(provinceId, layout);
    const x = layout.labelX ?? layout.x + layout.w / 2;
    const y = layout.labelY ?? layout.y + layout.h / 2;
    const textWidth = String(province?.name || "").length * fontSize + 12;
    const textHeight = fontSize + 8;
    return {
      x: x - textWidth / 2,
      y: y - textHeight / 2,
      w: textWidth,
      h: textHeight,
      provinceId
    };
  }

  function getAllProvinceLabelRects() {
    return data.provinces.map((province) => {
      const layout = getLayoutProvince(province.id);
      return getProvinceLabelRect(province.id, layout);
    });
  }

  function inflateRect(rect, amount) {
    return {
      x: rect.x - amount,
      y: rect.y - amount,
      w: rect.w + amount * 2,
      h: rect.h + amount * 2
    };
  }

  function getRectCenter(rect) {
    return {
      x: rect.x + rect.w / 2,
      y: rect.y + rect.h / 2
    };
  }

  function getRectOverlapArea(a, b) {
    const x = Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x));
    const y = Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y));
    return x * y;
  }

  function getBrandMapLabel(brand, count, bounds) {
    const labels = brandMapLabels[brand.id] || {};
    const compact = labels.compact || normalizeBrandName(brand.name);
    const mark = labels.mark || compact.slice(0, 2);

    if (count <= 1 && bounds.w >= estimateMapLabelWidth(brand.name)) {
      return { text: brand.name, mode: "full" };
    }
    if (count <= 2 && bounds.w >= estimateMapLabelWidth(compact)) {
      return { text: compact, mode: "compact" };
    }
    if (count <= 4 && bounds.w >= estimateMapLabelWidth(compact) * 1.35) {
      return { text: compact, mode: "compact" };
    }
    return { text: mark, mode: "mark" };
  }

  function getBrandMapMark(brand) {
    const labels = brandMapLabels[brand.id] || {};
    const compact = labels.compact || normalizeBrandName(brand.name);
    return labels.mark || compact.slice(0, 2);
  }

  function getBrandMapSummaryText(provinceId, brands) {
    if (provinceId === "hubei") {
      return brands.map((brand) => getBrandMapSummaryPartText(provinceId, brand)).join("/");
    }
    return brands.map((brand) => getBrandMapMark(brand)).join("/");
  }

  function getBrandMapSummaryPartText(provinceId, brand) {
    const labels = brandMapLabels[brand.id] || {};
    if (provinceId === "hubei") return labels.compact || normalizeBrandName(brand.name);
    return getBrandMapMark(brand);
  }

  function normalizeBrandName(name) {
    return String(name || "").replace(/\s+/g, "");
  }

  function estimateMapLabelWidth(text) {
    return 16 + String(text || "").length * 10;
  }

  function createProvinceFocusContent(province, brands, progress, focus) {
    const node = document.createElement("section");
    node.className = "province-focus";
    node.dataset.provinceId = province.id;
    node.dataset.density = brands.length;
    node.dataset.state = progress.state;
    node.style.setProperty("--focus-x", focus.content.x);
    node.style.setProperty("--focus-y", focus.content.y);
    node.style.setProperty("--focus-w", focus.content.w);
    node.style.setProperty("--focus-h", focus.content.h);
    node.style.setProperty("--focus-scale", focus.scale);
    node.setAttribute("aria-label", `${province.name}${brands.length ? `，${brands.length} 个奶茶条目，${progressStateNames[progress.state]}` : "，尽请期待"}`);

    const name = document.createElement("span");
    name.className = "province-name";
    name.textContent = province.name;

    const meta = document.createElement("span");
    meta.className = "province-meta";
    meta.textContent = formatProvinceMeta(progress);

    const stack = document.createElement("div");
    stack.className = "brand-stack";
    if (brands.length) {
      brands.forEach((brand) => {
        stack.append(createBrandChip(brand));
      });
    } else {
      const empty = document.createElement("span");
      empty.className = "empty-label";
      empty.textContent = "尽请期待";
      stack.append(empty);
    }

    node.append(name, meta, stack);
    return node;
  }

  function getProvinceFocusLayout(provinceId, mask, brands) {
    const target = getFocusContentTarget(provinceId, brands);
    const textRect = findBestMaskRect(mask, target.aspect);
    const maxScale = getProvinceFocusMaxScale(provinceId, mask, brands);
    const fitScale = Math.min(
      maxScale,
      (mapLayerSize.width - 36) / mask.w,
      (mapLayerSize.height - 36) / mask.h
    );
    const neededScale = Math.max(
      target.minScale,
      target.width / Math.max(1, textRect.w - 10),
      target.height / Math.max(1, textRect.h - 10)
    );
    const scale = clamp(neededScale, target.minScale, Math.max(target.minScale, fitScale));
    const centerX = mask.x + mask.w / 2;
    const centerY = mask.y + mask.h / 2;
    const bounds = getScaledMaskBounds(mask, centerX, centerY, scale, 0, 0);
    const shift = getBoundsShift(bounds, 18);
    const shiftedBounds = getScaledMaskBounds(mask, centerX, centerY, scale, shift.x, shift.y);
    const rawContent = getScaledRect(textRect, mask, centerX, centerY, scale, shift);
    const inset = clamp(scale * 5, 8, 18);
    const content = shouldUseRoomyFocusContent(provinceId, brands)
      ? getRoomyFocusContent(rawContent, shiftedBounds, target, inset)
      : {
        x: rawContent.x + inset,
        y: rawContent.y + inset,
        w: Math.max(72, rawContent.w - inset * 2),
        h: Math.max(58, rawContent.h - inset * 2)
      };

    return {
      scale,
      centerX,
      centerY,
      shiftX: shift.x,
      shiftY: shift.y,
      bounds: shiftedBounds,
      content
    };
  }

  function getFocusContentTarget(provinceId, brands) {
    const count = brands.length;
    const brandTarget = getFocusBrandTarget(brands, isTinyProvince(provinceId));
    if (isTinyProvince(provinceId)) {
      if (!count) return { width: 122, height: 62, aspect: 1.95, minScale: 1.75 };
      const baseWidth = count <= 2 ? 168 : count <= 4 ? 204 : 232;
      const baseHeight = count <= 2 ? 80 : count <= 4 ? 128 : 164;
      const width = Math.min(284, Math.max(baseWidth, brandTarget.width + 24));
      const height = Math.min(224, Math.max(baseHeight, brandTarget.height + 54));
      return {
        width,
        height,
        aspect: clamp(width / height, 0.92, 2.1),
        minScale: count >= 7 ? 3.2 : count >= 5 ? 2.8 : count >= 3 ? 2.45 : 2.05
      };
    }
    if (!count) return { width: 112, height: 58, aspect: 1.9, minScale: 1.25 };
    if (count <= 1) return { width: 126, height: 64, aspect: 1.95, minScale: 1.3 };
    if (count <= 2) return { width: 154, height: 74, aspect: 2.08, minScale: 1.45 };
    const baseWidth = count <= 4 ? 196 : count <= 6 ? 236 : 286;
    const baseHeight = count <= 4 ? 94 : count <= 6 ? 118 : 142;
    const width = Math.min(332, Math.max(baseWidth, brandTarget.width + 26));
    const height = Math.min(192, Math.max(baseHeight, brandTarget.height + 48));
    return {
      width,
      height,
      aspect: clamp(width / height, 1.2, 2.28),
      minScale: count >= 8 ? 2.18 : count >= 5 ? 1.9 : 1.65
    };
  }

  function getFocusBrandTarget(brands, isTiny) {
    const count = brands.length;
    if (!count) return { width: 0, height: 0 };
    const maxColumns = isTiny ? (count >= 5 ? 2 : count >= 3 ? 2 : 1) : count >= 7 ? 3 : count >= 3 ? 2 : 1;
    const columns = Math.min(count, maxColumns);
    const rows = Math.ceil(count / columns);
    const gap = isTiny ? 7 : 6;
    const longestChip = Math.max(...brands.map((brand) => estimateFocusChipWidth(brand.name)));
    return {
      width: columns * longestChip + Math.max(0, columns - 1) * gap,
      height: rows * 25 + Math.max(0, rows - 1) * gap
    };
  }

  function estimateFocusChipWidth(name) {
    let width = 22;
    for (const char of String(name || "")) {
      if (/\s/.test(char)) {
        width += 3;
      } else if (/[A-Za-z0-9]/.test(char)) {
        width += 6;
      } else {
        width += 11;
      }
    }
    return clamp(width, 46, 112);
  }

  function shouldUseRoomyFocusContent(provinceId, brands) {
    return isTinyProvince(provinceId) || brands.length >= 6;
  }

  function getRoomyFocusContent(rawContent, bounds, target, inset) {
    const maxWidth = Math.max(72, bounds.w - inset * 2);
    const maxHeight = Math.max(58, bounds.h - inset * 2);
    const width = Math.min(maxWidth, Math.max(rawContent.w - inset * 2, target.width));
    const height = Math.min(maxHeight, Math.max(rawContent.h - inset * 2, target.height));
    const centerX = rawContent.x + rawContent.w / 2;
    const centerY = rawContent.y + rawContent.h / 2;
    const minX = bounds.x + inset;
    const minY = bounds.y + inset;
    const maxX = Math.max(minX, bounds.x + bounds.w - inset - width);
    const maxY = Math.max(minY, bounds.y + bounds.h - inset - height);

    return {
      x: clamp(centerX - width / 2, minX, maxX),
      y: clamp(centerY - height / 2, minY, maxY),
      w: width,
      h: height
    };
  }

  function getProvinceFocusMaxScale(provinceId, mask, brands) {
    const count = brands.length;
    if (isTinyProvince(provinceId)) {
      if (count >= 7) return 5.35;
      if (count >= 5) return 4.85;
      if (count >= 3) return 4.45;
      return count >= 1 ? 3.35 : 2.45;
    }
    const base = count >= 8 ? 3.45 : count >= 5 ? 3.05 : count >= 3 ? 2.45 : count >= 1 ? 2.05 : 1.65;
    const smallProvinceBoost = Math.min(mask.w, mask.h) < 58 ? 0.45 : 0;
    return base + smallProvinceBoost;
  }

  function isTinyProvince(provinceId) {
    return ["beijing", "tianjin", "shanghai", "hongkong", "macau"].includes(provinceId);
  }

  function getScaledMaskBounds(mask, centerX, centerY, scale, shiftX, shiftY) {
    return {
      x: centerX + (mask.x - centerX) * scale + shiftX,
      y: centerY + (mask.y - centerY) * scale + shiftY,
      w: mask.w * scale,
      h: mask.h * scale
    };
  }

  function getScaledRect(rect, mask, centerX, centerY, scale, shift) {
    return {
      x: centerX + (mask.x + rect.x - centerX) * scale + shift.x,
      y: centerY + (mask.y + rect.y - centerY) * scale + shift.y,
      w: rect.w * scale,
      h: rect.h * scale
    };
  }

  function getBoundsShift(bounds, margin) {
    let x = 0;
    let y = 0;

    if (bounds.x < margin) x = margin - bounds.x;
    if (bounds.x + bounds.w > mapLayerSize.width - margin) {
      x = mapLayerSize.width - margin - bounds.w - bounds.x;
    }
    if (bounds.y < margin) y = margin - bounds.y;
    if (bounds.y + bounds.h > mapLayerSize.height - margin) {
      y = mapLayerSize.height - margin - bounds.h - bounds.y;
    }

    return { x, y };
  }

  function findBestMaskRect(mask, targetAspect) {
    const heights = new Uint16Array(mask.w);
    let best = { x: Math.floor(mask.w * 0.16), y: Math.floor(mask.h * 0.22), w: Math.max(24, Math.floor(mask.w * 0.68)), h: Math.max(20, Math.floor(mask.h * 0.42)), score: 0 };

    for (let y = 0; y < mask.h; y += 1) {
      for (let x = 0; x < mask.w; x += 1) {
        heights[x] = mask.alpha[y * mask.w + x] ? heights[x] + 1 : 0;
      }

      const stack = [];
      for (let x = 0; x <= mask.w; x += 1) {
        const height = x === mask.w ? 0 : heights[x];
        let start = x;

        while (stack.length && stack[stack.length - 1].height > height) {
          const item = stack.pop();
          const width = x - item.start;
          const rect = {
            x: item.start,
            y: y - item.height + 1,
            w: width,
            h: item.height
          };
          const score = scoreMaskRect(rect, targetAspect);
          if (score > best.score) best = { ...rect, score };
          start = item.start;
        }

        stack.push({ start, height });
      }
    }

    return best;
  }

  function scoreMaskRect(rect, targetAspect) {
    if (rect.w < 14 || rect.h < 14) return 0;
    const aspect = rect.w / rect.h;
    const aspectScore = Math.min(aspect / targetAspect, targetAspect / aspect);
    const shortSidePenalty = Math.min(1, Math.min(rect.w, rect.h) / 34);
    return rect.w * rect.h * (0.42 + aspectScore * 0.58) * shortSidePenalty;
  }

  function drawProvinceFocusLayer(canvas, mask, progress, focus) {
    const ctx = canvas.getContext("2d");
    const pixelRatio = canvas.width / mapLayerSize.width;
    const fill = getProvinceFill(progress);
    const scaledMask = createScaledMaskCanvas(mask, focus.bounds.w, focus.bounds.h);
    const tintCanvas = createAlphaTintCanvas(scaledMask, fill.color, 255);

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.save();
    ctx.shadowColor = "rgba(78, 64, 56, .24)";
    ctx.shadowBlur = 18;
    ctx.shadowOffsetX = 7;
    ctx.shadowOffsetY = 10;
    ctx.drawImage(tintCanvas, focus.bounds.x, focus.bounds.y, focus.bounds.w, focus.bounds.h);
    ctx.shadowColor = "transparent";
    ctx.restore();
    drawCanvasAlphaOutline(ctx, scaledMask, focus.bounds.x, focus.bounds.y, "#fffdf4", 7, 255);
    drawCanvasAlphaOutline(ctx, scaledMask, focus.bounds.x, focus.bounds.y, "#4e4038", 3, 230);
  }

  function createScaledMaskCanvas(mask, width, height) {
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(width));
    canvas.height = Math.max(1, Math.round(height));
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(mask.canvas, 0, 0, canvas.width, canvas.height);
    return canvas;
  }

  function createAlphaTintCanvas(alphaCanvas, color, alpha) {
    const canvas = document.createElement("canvas");
    canvas.width = alphaCanvas.width;
    canvas.height = alphaCanvas.height;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "destination-in";
    ctx.globalAlpha = alpha / 255;
    ctx.drawImage(alphaCanvas, 0, 0);
    ctx.globalAlpha = 1;
    return canvas;
  }

  function drawCanvasAlphaOutline(ctx, alphaCanvas, x, y, color, radius, alpha) {
    const maskCanvas = createAlphaTintCanvas(alphaCanvas, color, alpha);
    const outlineCanvas = document.createElement("canvas");
    outlineCanvas.width = alphaCanvas.width + radius * 2;
    outlineCanvas.height = alphaCanvas.height + radius * 2;
    const outlineCtx = outlineCanvas.getContext("2d");

    for (let y2 = -radius; y2 <= radius; y2 += 1) {
      for (let x2 = -radius; x2 <= radius; x2 += 1) {
        if (x2 * x2 + y2 * y2 > radius * radius) continue;
        outlineCtx.drawImage(maskCanvas, x2 + radius, y2 + radius);
      }
    }

    outlineCtx.globalCompositeOperation = "destination-out";
    outlineCtx.drawImage(alphaCanvas, radius, radius);
    ctx.drawImage(outlineCanvas, x - radius, y - radius);
  }

  function getLayoutProvince(provinceId) {
    return { ...getProvince(provinceId), ...(provinceLayout[provinceId] || {}) };
  }

  function getAutoPopoverLayout(layout, brands) {
    const count = brands.length;
    const columns = count >= 5 ? 3 : count >= 3 ? 2 : 1;
    const rows = Math.max(1, Math.ceil(Math.max(count, 1) / columns));
    const contentWidth = count >= 5 ? 378 : count >= 3 ? 338 : count >= 2 ? 306 : 210;
    const contentHeight = count ? 104 + rows * 40 : 116;
    const expandedW = clamp(Math.max(layout.expandedW || 136, contentWidth), 136, 392);
    const expandedH = clamp(Math.max(layout.expandedH || 98, contentHeight), 98, 256);
    const expandedX = clamp(layout.expandedX ?? layout.x, 6, mapLayerSize.width - expandedW - 6);
    const expandedY = clamp(layout.expandedY ?? layout.y, 6, mapLayerSize.height - expandedH - 6);

    return { expandedX, expandedY, expandedW, expandedH };
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function groupBrandsByProvince() {
    return data.brands.reduce((acc, brand) => {
      acc[brand.provinceId] ||= [];
      acc[brand.provinceId].push(brand);
      return acc;
    }, {});
  }

  function createBrandChip(brand) {
    const chip = document.createElement("button");
    const current = state[brand.id] || "";
    const type = getBrandType(brand);
    chip.className = `brand-chip type-${type} ${current ? `status-${current}` : ""}`;
    chip.type = "button";
    chip.dataset.brandId = brand.id;
    chip.dataset.rank = rankMarks[current] || "";
    chip.dataset.type = type;

    const name = document.createElement("span");
    name.className = "brand-chip-name";
    name.textContent = brand.name;

    const badge = document.createElement("span");
    badge.className = `brand-type type-${type}`;
    badge.textContent = brandTypeLabels[type];

    chip.append(name, badge);
    chip.addEventListener("click", (event) => {
      event.stopPropagation();
      openBrandDialog(brand.id);
    });
    return chip;
  }

  async function handleMapBoardClick(event) {
    if (event.target.closest(".province-popover")) return;

    const point = getMapPointFromEvent(event);
    const { masks } = await getMapAssets();
    const provinceId = hitTestProvince(point.x, point.y, masks);

    if (provinceId) {
      if (activeProvinceId !== provinceId) {
        activeProvinceId = provinceId;
        renderMap();
      }
      return;
    }

    if (activeProvinceId) {
      activeProvinceId = null;
      renderMap();
    }
  }

  function getMapPointFromEvent(event) {
    const mapLayer = mapBoard.querySelector(".map-progress-canvas") || mapBoard;
    const rect = mapLayer.getBoundingClientRect();
    return {
      x: ((event.clientX - rect.left) / rect.width) * mapLayerSize.width,
      y: ((event.clientY - rect.top) / rect.height) * mapLayerSize.height
    };
  }

  function hitTestProvince(x, y, masks) {
    const exact = data.provinces.find((province) => isPointInMask(masks[province.id], x, y, 0));
    if (exact) return exact.id;

    let best = null;
    data.provinces.forEach((province) => {
      const radius = getHitTolerance(province.id);
      const distance = nearestMaskDistance(masks[province.id], x, y, radius);
      if (distance === null) return;
      if (!best || distance < best.distance) {
        best = { id: province.id, distance };
      }
    });
    if (best) return best.id;

    const layoutFallback = data.provinces.find((province) => isPointInProvinceHitFallback(province.id, x, y));
    return layoutFallback?.id || null;
  }

  function getHitTolerance(provinceId) {
    const tiny = new Set(["beijing", "tianjin", "shanghai", "hongkong", "macau", "hainan"]);
    const small = new Set(["ningxia", "chongqing", "taiwan"]);
    if (provinceId === "shandong") return compactMapMedia.matches ? 20 : 10;
    if (tiny.has(provinceId)) return 18;
    if (small.has(provinceId)) return 12;
    return 6;
  }

  function isPointInProvinceHitFallback(provinceId, x, y) {
    if (provinceId !== "shandong") return false;
    const layout = getLayoutProvince(provinceId);
    const inset = compactMapMedia.matches ? -16 : -8;
    return (
      x >= layout.x + inset &&
      x <= layout.x + layout.w - inset &&
      y >= layout.y + inset &&
      y <= layout.y + layout.h - inset
    );
  }

  function isPointInMask(mask, x, y, radius) {
    return nearestMaskDistance(mask, x, y, radius) !== null;
  }

  function nearestMaskDistance(mask, x, y, radius) {
    if (!mask || !mask.alpha) return null;
    const localX = Math.round(x - mask.x);
    const localY = Math.round(y - mask.y);
    let best = null;

    for (let dy = -radius; dy <= radius; dy += 1) {
      const y2 = localY + dy;
      if (y2 < 0 || y2 >= mask.h) continue;
      for (let dx = -radius; dx <= radius; dx += 1) {
        const x2 = localX + dx;
        if (x2 < 0 || x2 >= mask.w) continue;
        const distance = dx * dx + dy * dy;
        if (distance > radius * radius) continue;
        if (!mask.alpha[y2 * mask.w + x2]) continue;
        if (best === null || distance < best) best = distance;
      }
    }

    return best;
  }

  function getProvinceProgress(brands) {
    const triedBrands = brands.filter((brand) => isTriedStatus(state[brand.id]));
    const wantBrands = brands.filter((brand) => state[brand.id] === "want");
    const topBrands = brands.filter((brand) => String(state[brand.id] || "").startsWith("top"));
    const typeCounts = countBrandTypes(brands);
    const hiddenTotal = typeCounts.local + typeCounts.landmark;
    let progressState = "available";

    if (!brands.length) {
      progressState = "none";
    } else if (triedBrands.length >= 2) {
      progressState = "many";
    } else if (triedBrands.length === 1) {
      progressState = "one";
    } else if (wantBrands.length) {
      progressState = "want";
    }

    const primaryType = getBrandType(topBrands[0] || triedBrands[0] || wantBrands[0] || brands[0] || {});
    return {
      total: brands.length,
      tried: triedBrands.length,
      want: wantBrands.length,
      topCount: topBrands.length,
      hiddenTotal,
      hiddenTried: triedBrands.filter((brand) => getBrandType(brand) !== "main").length,
      state: progressState,
      primaryType,
      typeCounts
    };
  }

  function countBrandTypes(brands) {
    return brands.reduce(
      (acc, brand) => {
        acc[getBrandType(brand)] += 1;
        return acc;
      },
      { main: 0, local: 0, landmark: 0 }
    );
  }

  function getBrandType(brand) {
    return brandTypeLabels[brand.type] ? brand.type : "main";
  }

  function formatProvinceMeta(progress) {
    if (!progress.total) return "暂未收录 · 尽请期待";
    const pieces = [`已喝 ${progress.tried}/${progress.total}`];
    if (progress.want) pieces.push(`想喝 ${progress.want}`);
    if (progress.typeCounts.main) pieces.push(`主线 ${progress.typeCounts.main}`);
    if (progress.hiddenTotal) pieces.push(`隐藏 ${progress.hiddenTotal}`);
    return pieces.join(" · ");
  }

  function getProvinceFill(progress) {
    if (!progress.total) return provinceFillColors.none;
    if (!progress.tried) return provinceFillColors.available;
    if (progress.tried >= 5) return provinceFillColors.max;
    return provinceFillColors[progress.tried] || provinceFillColors.max;
  }

  async function paintProgressLayer(canvas, brandsByProvince) {
    const token = ++mapPaintToken;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    try {
      const { masks, overlay, mobileOverlay } = await getMapAssets();
      if (!canvas.isConnected || token !== mapPaintToken) return;
      canvas.dataset.maskCount = Object.keys(masks).length;
      canvas.dataset.missingMasks = data.provinces.filter((province) => !masks[province.id]).map((province) => province.id).join(",");

      data.provinces.forEach((province) => {
        const progress = getProvinceProgress(brandsByProvince[province.id] || []);
        const mask = masks[province.id];
        if (!mask) return;

        const fill = getProvinceFill(progress);
        drawMaskTint(ctx, mask, fill.color, fill.alpha, 0, 0, 1, 1, progress.topCount > 0);
      });
      ctx.drawImage(compactMapMedia.matches ? mobileOverlay : overlay, 0, 0);
      drawProvinceLabels(ctx, 0, 0, 1, 1);
    } catch (error) {
      console.warn("Map progress layer failed", error);
    }
  }

  function getMapAssets() {
    if (mapAssetsPromise) return mapAssetsPromise;
    mapAssetsPromise = loadImage(mapImageSrc).then((image) => {
      const canvas = document.createElement("canvas");
      canvas.width = mapLayerSize.width;
      canvas.height = mapLayerSize.height;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      drawImageCover(ctx, image, 0, 0, canvas.width, canvas.height, 0.48);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const masks = data.provinces.reduce((acc, province) => {
        const layout = getLayoutProvince(province.id);
        const seeds = [...(provinceSeedOverrides[province.id] || []), findProvinceSeed(imageData, layout)].filter(Boolean);
        let mask = null;
        for (const seed of seeds) {
          mask = floodProvinceMask(imageData, seed.x, seed.y);
          if (mask) break;
        }
        if (mask) {
          healMaskLabelRegion(mask, province.id, layout, province.name);
          fillMaskInteriorHoles(mask);
          acc[province.id] = mask;
        }
        return acc;
      }, {});
      const renderMasks = createExpandedRenderMasks(masks, visualMaskSpread);
      return {
        base: canvas,
        masks,
        renderMasks,
        mobileOverlay: createMapLineOverlay(masks, true),
        overlay: createMapLineOverlay(masks)
      };
    });
    return mapAssetsPromise;
  }

  function findProvinceSeed(imageData, layout) {
    const startX = Math.round(layout.x + layout.w / 2);
    const startY = Math.round(layout.y + layout.h / 2);
    const maxRadius = Math.max(34, Math.round(Math.max(layout.w, layout.h) * 0.42));

    for (let radius = 0; radius <= maxRadius; radius += 3) {
      for (let y = startY - radius; y <= startY + radius; y += 3) {
        for (let x = startX - radius; x <= startX + radius; x += 3) {
          if (x < 0 || y < 0 || x >= imageData.width || y >= imageData.height) continue;
          const pixel = readPixel(imageData, x, y);
          if (isProvinceFillPixel(pixel)) return { x, y };
        }
      }
    }
    return null;
  }

  function floodProvinceMask(imageData, seedX, seedY) {
    const { width, height, data: pixels } = imageData;
    const visited = new Uint8Array(width * height);
    const stack = [[seedX, seedY]];
    const filled = [];
    let minX = seedX;
    let maxX = seedX;
    let minY = seedY;
    let maxY = seedY;

    while (stack.length) {
      const [x, y] = stack.pop();
      if (x < 0 || y < 0 || x >= width || y >= height) continue;
      const offset = y * width + x;
      if (visited[offset]) continue;
      visited[offset] = 1;

      const i = offset * 4;
      const pixel = [pixels[i], pixels[i + 1], pixels[i + 2], pixels[i + 3]];
      if (!isProvinceFillPixel(pixel)) continue;

      filled.push(offset);
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;

      stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
    }

    if (filled.length < 80) return null;

    const maskWidth = maxX - minX + 1;
    const maskHeight = maxY - minY + 1;
    const maskCanvas = document.createElement("canvas");
    maskCanvas.width = maskWidth;
    maskCanvas.height = maskHeight;
    const maskCtx = maskCanvas.getContext("2d");
    const maskData = maskCtx.createImageData(maskWidth, maskHeight);
    const alpha = new Uint8Array(maskWidth * maskHeight);

    filled.forEach((offset) => {
      const x = offset % width;
      const y = Math.floor(offset / width);
      const maskOffset = ((y - minY) * maskWidth + (x - minX)) * 4;
      alpha[(y - minY) * maskWidth + (x - minX)] = 1;
      maskData.data[maskOffset] = 255;
      maskData.data[maskOffset + 1] = 255;
      maskData.data[maskOffset + 2] = 255;
      maskData.data[maskOffset + 3] = 255;
    });

    maskCtx.putImageData(maskData, 0, 0);
    return { canvas: maskCanvas, alpha, x: minX, y: minY, w: maskWidth, h: maskHeight };
  }

  function createExpandedRenderMasks(masks, radius) {
    return Object.entries(masks).reduce((acc, [provinceId, mask]) => {
      acc[provinceId] = expandMask(mask, radius);
      return acc;
    }, {});
  }

  function expandMask(mask, radius) {
    if (!radius) return mask;

    const minX = Math.max(0, mask.x - radius);
    const minY = Math.max(0, mask.y - radius);
    const maxX = Math.min(mapLayerSize.width, mask.x + mask.w + radius);
    const maxY = Math.min(mapLayerSize.height, mask.y + mask.h + radius);
    const canvas = document.createElement("canvas");
    canvas.width = maxX - minX;
    canvas.height = maxY - minY;
    const ctx = canvas.getContext("2d");

    for (let y = -radius; y <= radius; y += 1) {
      for (let x = -radius; x <= radius; x += 1) {
        if (x * x + y * y > radius * radius) continue;
        ctx.drawImage(mask.canvas, mask.x - minX + x, mask.y - minY + y);
      }
    }

    const expanded = {
      canvas,
      alpha: new Uint8Array(canvas.width * canvas.height),
      x: minX,
      y: minY,
      w: canvas.width,
      h: canvas.height
    };
    syncMaskAlpha(expanded);
    return expanded;
  }

  function readPixel(imageData, x, y) {
    const i = (y * imageData.width + x) * 4;
    return [
      imageData.data[i],
      imageData.data[i + 1],
      imageData.data[i + 2],
      imageData.data[i + 3]
    ];
  }

  function isProvinceFillPixel([r, g, b, a]) {
    if (a < 120) return false;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const avg = (r + g + b) / 3;
    const chroma = max - min;
    const nearWhiteBorder = avg > 230 && chroma < 42;
    const darkInk = avg < 82;
    return !nearWhiteBorder && !darkInk;
  }

  function healMaskLabelRegion(mask, provinceId, layout, label) {
    const text = String(label || "");
    const fontSize = getProvinceLabelSize(provinceId, layout);
    const patchW = Math.min(Math.max(28, layout.w * 0.94), Math.max(34, text.length * fontSize * 2.35));
    const patchH = Math.min(Math.max(22, layout.h * 0.78), Math.max(22, fontSize * 2.45));
    const centerX = layout.labelX ?? layout.x + layout.w / 2;
    const centerY = layout.labelY ?? layout.y + layout.h / 2;
    const localX = centerX - mask.x;
    const localY = centerY - mask.y;

    const ctx = mask.canvas.getContext("2d");
    ctx.save();
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.ellipse(localX, localY, patchW / 2, patchH / 2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    syncMaskAlpha(mask);
  }

  function syncMaskAlpha(mask) {
    const ctx = mask.canvas.getContext("2d", { willReadFrequently: true });
    const data = ctx.getImageData(0, 0, mask.w, mask.h).data;
    mask.alpha = new Uint8Array(mask.w * mask.h);
    for (let index = 0; index < mask.alpha.length; index += 1) {
      mask.alpha[index] = data[index * 4 + 3] ? 1 : 0;
    }
  }

  function fillMaskInteriorHoles(mask) {
    const outside = new Uint8Array(mask.w * mask.h);
    const stack = [];

    for (let x = 0; x < mask.w; x += 1) {
      pushTransparentEdge(mask, outside, stack, x, 0);
      pushTransparentEdge(mask, outside, stack, x, mask.h - 1);
    }
    for (let y = 0; y < mask.h; y += 1) {
      pushTransparentEdge(mask, outside, stack, 0, y);
      pushTransparentEdge(mask, outside, stack, mask.w - 1, y);
    }

    while (stack.length) {
      const offset = stack.pop();
      const x = offset % mask.w;
      const y = Math.floor(offset / mask.w);
      const neighbors = [
        offset - 1,
        offset + 1,
        offset - mask.w,
        offset + mask.w
      ];

      neighbors.forEach((next) => {
        const nextX = next % mask.w;
        const nextY = Math.floor(next / mask.w);
        if (next < 0 || next >= mask.alpha.length) return;
        if (Math.abs(nextX - x) + Math.abs(nextY - y) !== 1) return;
        if (mask.alpha[next] || outside[next]) return;
        outside[next] = 1;
        stack.push(next);
      });
    }

    let changed = false;
    for (let offset = 0; offset < mask.alpha.length; offset += 1) {
      if (mask.alpha[offset] || outside[offset]) continue;
      mask.alpha[offset] = 1;
      changed = true;
    }

    if (changed) writeMaskAlpha(mask);
  }

  function pushTransparentEdge(mask, outside, stack, x, y) {
    const offset = y * mask.w + x;
    if (mask.alpha[offset] || outside[offset]) return;
    outside[offset] = 1;
    stack.push(offset);
  }

  function writeMaskAlpha(mask) {
    const ctx = mask.canvas.getContext("2d");
    const imageData = ctx.createImageData(mask.w, mask.h);
    for (let offset = 0; offset < mask.alpha.length; offset += 1) {
      if (!mask.alpha[offset]) continue;
      const index = offset * 4;
      imageData.data[index] = 255;
      imageData.data[index + 1] = 255;
      imageData.data[index + 2] = 255;
      imageData.data[index + 3] = 255;
    }
    ctx.putImageData(imageData, 0, 0);
  }

  function createMapLineOverlay(masks, highContrast = false) {
    const width = mapLayerSize.width;
    const height = mapLayerSize.height;
    const overlayCanvas = document.createElement("canvas");
    overlayCanvas.width = width;
    overlayCanvas.height = height;
    const overlayCtx = overlayCanvas.getContext("2d");
    const union = createUnionMask(width, height, masks);

    Object.values(masks).forEach((mask) => {
      drawSingleMaskOutline(overlayCtx, mask, "#fffdf4", highContrast ? 3 : 4, highContrast ? 246 : 238);
    });
    if (highContrast) {
      Object.values(masks).forEach((mask) => {
        drawMaskInnerEdge(overlayCtx, mask, "#4e4038", 96, 1);
      });
      if (masks.shandong) {
        drawMaskInnerEdge(overlayCtx, masks.shandong, "#15110f", 255, 4);
      }
    }
    drawUnionOutline(overlayCtx, union, width, height);
    return overlayCanvas;
  }

  function drawMaskInnerEdge(ctx, mask, color, alpha, radius) {
    const edgeCanvas = document.createElement("canvas");
    edgeCanvas.width = mask.w;
    edgeCanvas.height = mask.h;
    const edgeCtx = edgeCanvas.getContext("2d");
    const imageData = edgeCtx.createImageData(mask.w, mask.h);
    const rgb = hexToRgb(color);

    for (let y = 0; y < mask.h; y += 1) {
      for (let x = 0; x < mask.w; x += 1) {
        const offset = y * mask.w + x;
        if (!mask.alpha[offset] || !isMaskInnerEdge(mask, x, y, radius)) continue;
        const index = offset * 4;
        imageData.data[index] = rgb.r;
        imageData.data[index + 1] = rgb.g;
        imageData.data[index + 2] = rgb.b;
        imageData.data[index + 3] = alpha;
      }
    }

    edgeCtx.putImageData(imageData, 0, 0);
    ctx.drawImage(edgeCanvas, mask.x, mask.y);
  }

  function isMaskInnerEdge(mask, x, y, radius) {
    for (let y2 = y - radius; y2 <= y + radius; y2 += 1) {
      for (let x2 = x - radius; x2 <= x + radius; x2 += 1) {
        if (x2 < 0 || y2 < 0 || x2 >= mask.w || y2 >= mask.h) return true;
        if (!mask.alpha[y2 * mask.w + x2]) return true;
      }
    }
    return false;
  }

  function drawSingleMaskOutline(ctx, mask, color, radius, alpha) {
    const maskCanvas = createLocalMaskColorCanvas(mask, color, alpha);
    const outlineCanvas = document.createElement("canvas");
    outlineCanvas.width = mask.w + radius * 2;
    outlineCanvas.height = mask.h + radius * 2;
    const outlineCtx = outlineCanvas.getContext("2d");

    for (let y = -radius; y <= radius; y += 1) {
      for (let x = -radius; x <= radius; x += 1) {
        if (x * x + y * y > radius * radius) continue;
        outlineCtx.drawImage(maskCanvas, x + radius, y + radius);
      }
    }

    outlineCtx.globalCompositeOperation = "destination-out";
    outlineCtx.drawImage(mask.canvas, radius, radius);
    ctx.drawImage(outlineCanvas, mask.x - radius, mask.y - radius);
  }

  function createLocalMaskColorCanvas(mask, color, alpha) {
    const canvas = document.createElement("canvas");
    canvas.width = mask.w;
    canvas.height = mask.h;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, mask.w, mask.h);
    ctx.globalCompositeOperation = "destination-in";
    ctx.globalAlpha = alpha / 255;
    ctx.drawImage(mask.canvas, 0, 0);
    ctx.globalAlpha = 1;
    return canvas;
  }

  function drawUnionOutline(ctx, union, width, height) {
    const closedUnion = dilateMask(union, width, height, 5);
    const maskCanvas = createMaskColorCanvas(closedUnion, width, height, "#4e4038", 210);

    ctx.save();
    for (let y = -4; y <= 4; y += 1) {
      for (let x = -4; x <= 4; x += 1) {
        if (!x && !y) continue;
        if (x * x + y * y > 18) continue;
        ctx.drawImage(maskCanvas, x, y);
      }
    }
    ctx.globalCompositeOperation = "destination-out";
    ctx.drawImage(maskCanvas, 0, 0);
    ctx.restore();
  }

  function dilateMask(mask, width, height, radius) {
    const dilated = new Uint8Array(width * height);

    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const offset = y * width + x;
        if (!mask[offset]) continue;
        for (let dy = -radius; dy <= radius; dy += 1) {
          const ny = y + dy;
          if (ny < 0 || ny >= height) continue;
          for (let dx = -radius; dx <= radius; dx += 1) {
            if (dx * dx + dy * dy > radius * radius) continue;
            const nx = x + dx;
            if (nx < 0 || nx >= width) continue;
            dilated[ny * width + nx] = 1;
          }
        }
      }
    }

    return dilated;
  }

  function createMaskColorCanvas(mask, width, height, color, alpha) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    const imageData = ctx.createImageData(width, height);
    const rgb = hexToRgb(color);

    for (let offset = 0; offset < mask.length; offset += 1) {
      if (!mask[offset]) continue;
      const i = offset * 4;
      imageData.data[i] = rgb.r;
      imageData.data[i + 1] = rgb.g;
      imageData.data[i + 2] = rgb.b;
      imageData.data[i + 3] = alpha;
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas;
  }

  function hexToRgb(hex) {
    const normalized = hex.replace("#", "");
    return {
      r: parseInt(normalized.slice(0, 2), 16),
      g: parseInt(normalized.slice(2, 4), 16),
      b: parseInt(normalized.slice(4, 6), 16)
    };
  }

  function drawProvinceLabels(ctx, x, y, scaleX, scaleY) {
    const labelScale = Math.min(scaleX, scaleY);
    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.lineJoin = "round";
    data.provinces.forEach((province) => {
      const layout = provinceLayout[province.id] || province;
      const labelX = x + (layout.labelX ?? layout.x + layout.w / 2) * scaleX;
      const labelY = y + (layout.labelY ?? layout.y + layout.h / 2) * scaleY;
      const fontSize = getProvinceLabelSize(province.id, layout) * labelScale;

      ctx.font = `900 ${fontSize}px Microsoft YaHei UI, PingFang SC, Noto Sans CJK SC, sans-serif`;
      ctx.fillStyle = "#4e4038";
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;
      ctx.fillText(province.name, labelX, labelY);
    });
    ctx.restore();
  }

  function getProvinceLabelSize(provinceId, layout) {
    const minSide = Math.min(layout.w || 60, layout.h || 46);
    const smallLabels = new Set(["beijing", "tianjin", "shanghai", "hongkong", "macau", "hainan"]);
    if (smallLabels.has(provinceId)) return 13;
    if (provinceId === "inner-mongolia") return 17;
    if (provinceId === "heilongjiang") return 17;
    return clamp(Math.round(minSide * 0.25), 14, 21);
  }

  function createUnionMask(width, height, masks) {
    const union = new Uint8Array(width * height);
    Object.values(masks).forEach((mask) => {
      const maskCtx = mask.canvas.getContext("2d", { willReadFrequently: true });
      const maskData = maskCtx.getImageData(0, 0, mask.w, mask.h).data;
      for (let y = 0; y < mask.h; y += 1) {
        for (let x = 0; x < mask.w; x += 1) {
          const alpha = maskData[(y * mask.w + x) * 4 + 3];
          if (alpha) union[(mask.y + y) * width + mask.x + x] = 1;
        }
      }
    });
    return union;
  }

  function isNearMask(union, width, height, x, y, radius) {
    for (let dy = -radius; dy <= radius; dy += 1) {
      const ny = y + dy;
      if (ny < 0 || ny >= height) continue;
      for (let dx = -radius; dx <= radius; dx += 1) {
        const nx = x + dx;
        if (nx < 0 || nx >= width) continue;
        if (union[ny * width + nx]) return true;
      }
    }
    return false;
  }

  function drawMaskTint(ctx, mask, color, alpha, x, y, scaleX, scaleY, glow) {
    const tintCanvas = document.createElement("canvas");
    tintCanvas.width = mask.w;
    tintCanvas.height = mask.h;
    const tintCtx = tintCanvas.getContext("2d");
    tintCtx.fillStyle = color;
    tintCtx.fillRect(0, 0, mask.w, mask.h);
    tintCtx.globalCompositeOperation = "destination-in";
    tintCtx.drawImage(mask.canvas, 0, 0);

    ctx.save();
    ctx.globalAlpha = alpha;
    if (glow) {
      ctx.shadowColor = "rgba(255, 220, 75, .92)";
      ctx.shadowBlur = 18 * Math.max(scaleX, scaleY);
    }
    ctx.drawImage(tintCanvas, x + mask.x * scaleX, y + mask.y * scaleY, mask.w * scaleX, mask.h * scaleY);
    if (glow) {
      ctx.shadowBlur = 0;
      ctx.globalAlpha = Math.min(0.86, alpha + 0.16);
      ctx.drawImage(tintCanvas, x + mask.x * scaleX, y + mask.y * scaleY, mask.w * scaleX, mask.h * scaleY);
    }
    ctx.restore();
  }

  function openBrandDialog(brandId) {
    const brand = getBrand(brandId);
    if (!brand) return;
    const province = getProvince(brand.provinceId);
    selectedBrandId = brandId;
    brandName.textContent = brand.name;
    brandOrigin.textContent = `${province.name} · ${brandTypeNames[getBrandType(brand)]}`;
    brandTags.textContent = "";
    dialog.showModal();
  }

  function setBrandStatus(brandId, nextStatus) {
    const oldStatus = state[brandId];

    if (nextStatus === "clear") {
      delete state[brandId];
    } else if (nextStatus.startsWith("top")) {
      Object.keys(state).forEach((id) => {
        if (state[id] === nextStatus) state[id] = "tried";
      });
      if (oldStatus && oldStatus.startsWith("top")) delete state[brandId];
      state[brandId] = nextStatus;
    } else {
      state[brandId] = nextStatus;
    }

    saveState();
    renderMap();
    renderSummary();
  }

  function renderSummary() {
    const stats = getStats();
    const persona = getPersona(stats);

    triedCount.textContent = stats.triedBrands.length;
    provinceCount.textContent = stats.triedProvinces.size;
    wantCount.textContent = stats.wantBrands.length;
    personaTitle.textContent = persona.title;
    personaLine.textContent = persona.line;
    personaFootnote.textContent = persona.footnote;
    renderPersonaTags(stats);

    topList.innerHTML = "";
    ["top1", "top2", "top3"].forEach((rank) => {
      const item = document.createElement("div");
      item.className = "top-item";
      const label = document.createElement("span");
      label.textContent = rankNames[rank];
      const brand = stats.topBrands[rank];
      const value = document.createElement("strong");
      value.textContent = brand ? `${brand.name} · ${getProvince(brand.provinceId).name}` : "未选择";
      item.append(label, value);
      topList.append(item);
    });

    renderAchievements(stats);
  }

  function renderPersonaTags(stats) {
    if (!personaTags) return;
    personaTags.innerHTML = "";
    getPersonaTags(stats).forEach((tag) => {
      const item = document.createElement("span");
      item.className = "persona-tag";
      item.textContent = tag;
      personaTags.append(item);
    });
  }

  function getStats() {
    const triedBrands = data.brands.filter((brand) => isTriedStatus(state[brand.id]));
    const wantBrands = data.brands.filter((brand) => state[brand.id] === "want");
    const basicBrands = data.brands.filter((brand) => getBrandType(brand) === "main");
    const basicTriedBrands = basicBrands.filter((brand) => isTriedStatus(state[brand.id]));
    const hiddenBrands = data.brands.filter((brand) => getBrandType(brand) !== "main");
    const hiddenTriedBrands = hiddenBrands.filter((brand) => isTriedStatus(state[brand.id]));
    const collectibleProvinces = new Set(data.brands.map((brand) => brand.provinceId));
    const topBrands = {};
    ["top1", "top2", "top3"].forEach((rank) => {
      topBrands[rank] = data.brands.find((brand) => state[brand.id] === rank);
    });
    return {
      triedBrands,
      wantBrands,
      basicBrands,
      basicTriedBrands,
      hiddenBrands,
      hiddenTriedBrands,
      topBrands,
      triedProvinces: new Set(triedBrands.map((brand) => brand.provinceId)),
      collectibleProvinces,
      topProvinces: new Set(Object.values(topBrands).filter(Boolean).map((brand) => brand.provinceId))
    };
  }

  function renderAchievements(stats) {
    if (!achievementGrid) return;
    const achievements = [
      {
        kind: "basic",
        label: "基础款",
        value: `${stats.basicTriedBrands.length}/${stats.basicBrands.length}`,
        hint: "全国连锁和主线品牌"
      },
      {
        kind: "hidden",
        label: "隐藏款",
        value: `${stats.hiddenTriedBrands.length}/${stats.hiddenBrands.length}`,
        hint: "本地名店和茶饮地标"
      },
      {
        kind: "province",
        label: "产地开图",
        value: `${stats.triedProvinces.size}/${stats.collectibleProvinces.size}`,
        hint: "按奶茶发源地计数"
      },
      {
        kind: "top",
        label: "本命奶茶",
        value: stats.topBrands.top1 ? stats.topBrands.top1.name : "待定",
        hint: "本命 Top 1"
      }
    ];

    achievementGrid.innerHTML = "";
    achievements.forEach((achievement) => {
      const card = document.createElement("div");
      card.className = `achievement-card achievement-${achievement.kind}`;

      const label = document.createElement("span");
      label.textContent = achievement.label;

      const value = document.createElement("strong");
      value.textContent = achievement.value;

      const hint = document.createElement("small");
      hint.textContent = achievement.hint;

      card.append(label, value, hint);
      achievementGrid.append(card);
    });
  }

  function getCollectionSummary(stats) {
    return `已收集 ${stats.triedBrands.length}/${data.brands.length}｜基础款 ${stats.basicTriedBrands.length}/${stats.basicBrands.length}｜隐藏款 ${stats.hiddenTriedBrands.length}/${stats.hiddenBrands.length}`;
  }

  function getPersona(stats) {
    if (!stats.triedBrands.length) {
      return {
        title: "奶茶人格等待第一杯唤醒",
        line: "地图暂时很安静，第一杯下去，奶茶雷达就会开始工作。",
        footnote: `${getCollectionSummary(stats)}｜当前状态：路过奶茶店但还没伸手。本命注脚会在选出 Top 1 后出现。`
      };
    }

    const score = getPersonaScore(stats);
    const matched = data.personaRules
      .map((rule) => ({
        ...rule,
        value: rule.tags.reduce((sum, tag) => sum + (score[tag] || 0), 0)
      }))
      .sort((a, b) => b.value - a.value)[0];

    const level = findRange(data.levels, stats.triedBrands.length);
    const curiosity = findRange(data.curiosity, stats.wantBrands.length);
    const top1 = stats.topBrands.top1;
    const regionalEgg = getRegionalEgg(stats);
    const footnote = top1
      ? `${top1.noteType}：${top1.note}`
      : `${curiosity.title}：你的想喝清单正在给下一杯做铺垫。`;

    return {
      title: regionalEgg ? `${matched.title} · ${regionalEgg.title}` : `${matched.title} · ${level.title}`,
      line: `${matched.line} ${stats.triedProvinces.size >= 8 ? "你不是只喝奶茶，你是在巡视全国茶饮版图。" : "你的奶茶版图已经开始出现自己的重心。"}`,
      footnote: `${getCollectionSummary(stats)}｜${level.title}｜${curiosity.title}｜${regionalEgg ? `${regionalEgg.line}｜` : ""}${footnote}`
    };
  }

  function getPersonaTags(stats) {
    if (!stats.triedBrands.length) {
      return ["奶茶雷达待机", "第一杯未解锁", "本命待定"];
    }

    const tags = [];
    const top1 = stats.topBrands.top1;
    const level = findRange(data.levels, stats.triedBrands.length);
    const curiosity = findRange(data.curiosity, stats.wantBrands.length);
    const regionalEgg = getRegionalEgg(stats);
    const dominantTag = getDominantFlavorTag(stats);

    if (top1) tags.push(`${getProvince(top1.provinceId).name}本命`);
    tags.push(getLevelTag(stats.triedBrands.length, level));

    if (stats.triedProvinces.size >= 10) tags.push("跨省巡茶中");
    else if (stats.triedProvinces.size >= 6) tags.push("多地取样");
    else if (stats.triedProvinces.size >= 3) tags.push("版图成形");

    if (stats.hiddenTriedBrands.length >= 4) tags.push("隐藏支线猎手");
    else if (stats.hiddenTriedBrands.length >= 1) tags.push("本地款雷达");

    if (stats.wantBrands.length >= 4) tags.push("探店清单膨胀");
    else if (stats.wantBrands.length >= 1) tags.push(curiosity.title);

    if (regionalEgg) tags.push(regionalEgg.title);
    if (dominantTag) tags.push(`${dominantTag}偏好`);

    return uniqueItems(tags).slice(0, 5);
  }

  function getPersonaScore(stats) {
    const score = {};
    Object.entries(stats.topBrands).forEach(([rank, brand]) => {
      if (!brand) return;
      brand.tags.forEach((tag) => {
        score[tag] = (score[tag] || 0) + topWeights[rank];
      });
      const province = getProvince(brand.provinceId);
      score[province.name] = (score[province.name] || 0) + Math.max(1, topWeights[rank] - 2);
    });

    if (!Object.keys(score).length) {
      stats.triedBrands.forEach((brand) => {
        brand.tags.slice(0, 3).forEach((tag) => {
          score[tag] = (score[tag] || 0) + 1;
        });
      });
    }

    return score;
  }

  function getLevelTag(triedCount, level) {
    if (triedCount >= 31) return "图鉴收集狂";
    if (triedCount >= 21) return "全国巡游";
    if (triedCount >= 13) return "城市探索家";
    if (triedCount >= 6) return "稳定复购型";
    return level.title;
  }

  function getDominantFlavorTag(stats) {
    const provinceNames = new Set(data.provinces.map((province) => province.name));
    const score = getPersonaScore(stats);
    const ignored = new Set(["大众", "稳定", "年轻", "快乐", "区域茶饮", "全国连锁"]);
    return Object.entries(score)
      .filter(([tag]) => !provinceNames.has(tag) && !ignored.has(tag) && tag.length <= 6)
      .sort((a, b) => b[1] - a[1])
      .map(([tag]) => tag)[0] || "";
  }

  function uniqueItems(items) {
    return [...new Set(items.filter(Boolean))];
  }

  function getRegionalEgg(stats) {
    const taiwanCount = stats.triedBrands.filter((brand) => brand.provinceId === "taiwan").length;
    if (taiwanCount >= 2) {
      return {
        title: "QQㄋㄟㄋㄟ拥护者",
        line: "你对珍珠、鲜奶和手摇茶有一种很难解释的信任"
      };
    }
    return null;
  }

  function findRange(ranges, value) {
    return ranges.find((range) => value >= range.min && value <= range.max) || ranges[0];
  }

  function isTriedStatus(status) {
    return status === "tried" || status === "top1" || status === "top2" || status === "top3";
  }

  function getBrand(id) {
    return data.brands.find((brand) => brand.id === id);
  }

  function getProvince(id) {
    return data.provinces.find((province) => province.id === id);
  }

  async function createShareImage() {
    const stats = getStats();
    const persona = getPersona(stats);
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#fffaf6";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawDots(ctx);

    ctx.fillStyle = "#15110f";
    ctx.font = "900 36px Microsoft YaHei UI, sans-serif";
    ctx.fillText("奶茶浓度检测", 58, 82);
    ctx.font = "900 92px KaiTi, STKaiti, serif";
    ctx.fillText(data.meta.productName || "我的奶茶版图", 54, 174);

    await drawShareMap(ctx);
    drawSharePersona(ctx, persona, stats);
    drawShareTrustFooter(ctx);

    return canvas.toDataURL("image/png");
  }

  function drawDots(ctx) {
    ctx.fillStyle = "rgba(244, 173, 179, .30)";
    for (let x = 28; x < 1080; x += 36) {
      for (let y = 28; y < 1920; y += 36) {
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  function drawStats(ctx, stats) {
    const items = [
      [`${stats.triedBrands.length}`, "喝过"],
      [`${stats.triedProvinces.size}`, "发源地"],
      [`${stats.wantBrands.length}`, "想喝"]
    ];
    const x = 72;
    const y = 360;
    const w = 936 / 3;
    ctx.lineWidth = 6;
    ctx.strokeStyle = "#15110f";
    ctx.fillStyle = "#fff8ea";
    roundRect(ctx, x, y, 936, 128, 24, true, true);
    items.forEach((item, index) => {
      if (index > 0) {
        ctx.beginPath();
        ctx.moveTo(x + w * index, y);
        ctx.lineTo(x + w * index, y + 128);
        ctx.stroke();
      }
      ctx.fillStyle = "#15110f";
      ctx.font = "900 50px Microsoft YaHei UI, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(item[0], x + w * index + w / 2, y + 58);
      ctx.font = "900 28px Microsoft YaHei UI, sans-serif";
      ctx.fillText(item[1], x + w * index + w / 2, y + 98);
    });
    ctx.textAlign = "left";
  }

  async function drawShareMap(ctx) {
    const assets = await getMapAssets();
    const x = 34;
    const y = 214;
    const w = 1012;
    const h = 1188;
    ctx.save();
    ctx.fillStyle = "#fffdf8";
    ctx.strokeStyle = "#15110f";
    ctx.lineWidth = 6;
    roundRect(ctx, x, y, w, h, 34, true, true);
    ctx.clip();
    const imageBox = { x: x + 14, y: y + 14, w: w - 28, h: h - 28 };
    ctx.drawImage(assets.base, imageBox.x, imageBox.y, imageBox.w, imageBox.h);
    await drawShareProgress(ctx, imageBox.x, imageBox.y, imageBox.w, imageBox.h, assets);
    ctx.restore();
    ctx.strokeStyle = "#15110f";
    ctx.lineWidth = 6;
    roundRect(ctx, x, y, w, h, 34, false, true);
  }

  async function drawShareProgress(ctx, x, y, w, h, assets = null) {
    const brandsByProvince = groupBrandsByProvince();
    const { masks, renderMasks, overlay } = assets || await getMapAssets();
    const scaleX = w / mapLayerSize.width;
    const scaleY = h / mapLayerSize.height;

    data.provinces.forEach((province) => {
      const progress = getProvinceProgress(brandsByProvince[province.id] || []);
      const mask = (renderMasks && renderMasks[province.id]) || masks[province.id];
      if (!mask) return;
      const fill = getProvinceFill(progress);
      drawMaskTint(ctx, mask, fill.color, fill.alpha, x, y, scaleX, scaleY, progress.topCount > 0);
    });
    ctx.drawImage(overlay, x, y, w, h);
    drawProvinceLabels(ctx, x, y, scaleX, scaleY);
  }

  function drawSharePersona(ctx, persona, stats) {
    const x = 44;
    const y = 1418;
    const w = 992;
    const h = 296;
    ctx.fillStyle = "#fff8ea";
    ctx.strokeStyle = "#15110f";
    ctx.lineWidth = 6;
    roundRect(ctx, x, y, w, h, 30, true, true);

    ctx.fillStyle = "#15110f";
    ctx.font = "900 30px Microsoft YaHei UI, sans-serif";
    ctx.fillText("奶茶浓度检测", x + 34, y + 50);
    drawShareStatPills(ctx, stats, x + 34, y + 64);
    wrapText(ctx, persona.title, x + 34, y + 142, w - 68, 44, "900 40px KaiTi, STKaiti, serif");
    wrapText(ctx, getSharePersonaLine(persona, stats), x + 34, y + 190, w - 68, 28, "900 22px Microsoft YaHei UI, sans-serif");
    drawPersonaTagPills(ctx, stats, x + 34, y + 200, w - 68);
    drawShareTopSummary(ctx, stats, x + 34, y + 260, w - 68);

  }

  function drawShareStatPills(ctx, stats, x, y) {
    const items = [
      `基础 ${stats.basicTriedBrands.length}/${stats.basicBrands.length}`,
      `隐藏 ${stats.hiddenTriedBrands.length}/${stats.hiddenBrands.length}`,
      `点亮 ${stats.triedProvinces.size} 地区`,
      `想喝 ${stats.wantBrands.length}`
    ];
    drawCanvasPills(ctx, items, x, y, 860, {
      fill: "#ffffff",
      stroke: "#15110f",
      font: "900 24px Microsoft YaHei UI, sans-serif",
      gap: 12,
      padX: 18,
      padY: 8
    });
  }

  function drawPersonaTagPills(ctx, stats, x, y, maxWidth) {
    drawCanvasPills(ctx, getPersonaTags(stats).slice(0, 4), x, y, maxWidth, {
      fill: "#fffdf4",
      stroke: "#15110f",
      font: "900 22px Microsoft YaHei UI, sans-serif",
      gap: 10,
      padX: 16,
      padY: 7
    });
  }

  function drawShareTopSummary(ctx, stats, x, y, maxWidth) {
    const text = ["top1", "top2", "top3"].map((rank) => {
      const brand = stats.topBrands[rank];
      return `${rankNames[rank]} ${brand ? formatShareBrandName(brand.name) : "待定"}`;
    }).join(" / ");
    ctx.save();
    ctx.fillStyle = "rgba(78, 64, 56, .78)";
    wrapText(ctx, text, x, y, maxWidth, 27, "900 21px Microsoft YaHei UI, sans-serif", "rgba(78, 64, 56, .78)");
    ctx.restore();
  }

  function drawShareTrustFooter(ctx) {
    const shareUrl = getShareUrl();
    const displayUrl = formatShareUrlForCanvas(shareUrl);
    const signature = `${siteConfig.shareTitle || document.title} / ${displayUrl}`;

    ctx.save();
    wrapText(ctx, signature, 58, 1828, 964, 30, "900 25px Microsoft YaHei UI, sans-serif", "rgba(21, 17, 15, .62)");
    ctx.restore();
  }

  function getShareUrl() {
    const configured = String(siteConfig.siteUrl || "").trim();
    if (configured) return configured;
    return getCurrentPageUrl();
  }

  function getCurrentPageUrl() {
    const url = new URL(window.location.href);
    url.hash = "";
    url.search = "";
    return url.href;
  }

  function formatShareUrlForCanvas(url) {
    try {
      const parsed = new URL(url);
      return `${parsed.protocol}//${parsed.host}${parsed.pathname.replace(/\/$/, "")}`;
    } catch (error) {
      return String(url || "").replace(/\/$/, "");
    }
  }

  function getSharePersonaLine(persona, stats) {
    if (!stats.triedBrands.length) return "第一杯下去，奶茶雷达就会开始工作。";
    const regionalEgg = getRegionalEgg(stats);
    if (regionalEgg) return regionalEgg.line;
    const top1 = stats.topBrands.top1;
    if (top1) return `你已经把${getProvince(top1.provinceId).name}插上本命小旗。`;
    if (stats.triedProvinces.size >= 8) return "你不是只喝奶茶，你是在巡视全国茶饮版图。";
    return "你的奶茶版图已经开始出现自己的重心。";
  }

  function formatShareBrandName(name) {
    const text = String(name || "").replace(/\s+/g, "");
    return text.length > 6 ? `${text.slice(0, 6)}…` : text;
  }

  function drawCanvasPills(ctx, items, x, y, maxWidth, options) {
    let cursorX = x;
    let cursorY = y;
    const gap = options.gap ?? 10;
    const padX = options.padX ?? 14;
    const padY = options.padY ?? 6;
    ctx.save();
    ctx.font = options.font;
    items.forEach((item) => {
      const text = String(item);
      const metrics = ctx.measureText(text);
      const pillW = Math.ceil(metrics.width + padX * 2);
      const pillH = getCanvasFontSize(options.font) + padY * 2;
      if (cursorX > x && cursorX + pillW > x + maxWidth) {
        cursorX = x;
        cursorY += pillH + gap;
      }
      ctx.fillStyle = options.fill;
      ctx.strokeStyle = options.stroke;
      ctx.lineWidth = 4;
      roundRect(ctx, cursorX, cursorY, pillW, pillH, pillH / 2, true, true);
      ctx.fillStyle = "#15110f";
      ctx.textBaseline = "middle";
      ctx.fillText(text, cursorX + padX, cursorY + pillH / 2 + 1);
      cursorX += pillW + gap;
    });
    ctx.restore();
  }

  function getCanvasFontSize(font) {
    const match = String(font).match(/(\d+(?:\.\d+)?)px/);
    return match ? Number(match[1]) : 24;
  }

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = src;
    });
  }

  function drawImageCover(ctx, image, x, y, w, h, centerY = 0.5) {
    const scale = Math.max(w / image.width, h / image.height);
    const sw = w / scale;
    const sh = h / scale;
    const sx = (image.width - sw) / 2;
    const sy = (image.height - sh) * centerY;
    ctx.drawImage(image, sx, sy, sw, sh, x, y, w, h);
    return { x, y, w, h };
  }

  function wrapText(ctx, text, x, y, maxWidth, lineHeight, font, color = "#15110f") {
    ctx.font = font;
    ctx.fillStyle = color;
    const chars = [...String(text || "")];
    let line = "";
    let lineY = y;
    chars.forEach((char) => {
      const test = line + char;
      if (ctx.measureText(test).width > maxWidth && line) {
        ctx.fillText(line, x, lineY);
        line = char;
        lineY += lineHeight;
      } else {
        line = test;
      }
    });
    if (line) ctx.fillText(line, x, lineY);
  }

  function roundRect(ctx, x, y, w, h, r, fill, stroke) {
    const radius = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + w - radius, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
    ctx.lineTo(x + w, y + h - radius);
    ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
    ctx.lineTo(x + radius, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    if (fill) ctx.fill();
    if (stroke) ctx.stroke();
  }
})();
