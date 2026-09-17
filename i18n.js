(() => {
  'use strict';

  const translations = {
    en: {
      pageTitle: 'EYE — Interactive 3D Anatomy',
      metaDescription: 'EYE — an interactive 3D human eye anatomy experience.',
      brandSubtitle: 'Interactive Anatomy Experience',
      exploreAnatomy: 'Explore anatomy',
      eyebrow: 'Native 3D · No Embed',
      heroLine1: 'See the eye.',
      heroLine2: 'Understand it.',
      lead: 'A fully interactive human-eye model rendered directly in your browser. Rotate, zoom, isolate structures and switch to an exploded or cutaway view to understand how the visual system is assembled.',
      feature1Title: 'Real-time 3D',
      feature1Text: 'Drag to orbit, pinch or scroll to zoom, and inspect from every angle.',
      feature2Title: 'Interactive anatomy',
      feature2Text: 'Select structures in the model or use the anatomy cards below to focus them.',
      feature3Title: 'Exploded view',
      feature3Text: 'Separate major layers to reveal their spatial relationship inside the eye.',
      feature4Title: 'Cutaway mode',
      feature4Text: 'Open the globe to expose the lens, retina, vitreous body and optic nerve.',
      modelReady: 'WebGL model ready',
      optimized: 'Optimized for desktop & mobile',
      building: 'Building anatomy',
      liveModel: 'LIVE MODEL',
      humanEye: 'Human Eye',
      viewerTip: 'Drag to rotate · Pinch / scroll to zoom · Tap a structure',
      lightResponse: 'Light response',
      nearFocus: 'Near focus',
      selectedStructure: 'Selected structure',
      reset: '↺ Reset',
      labels: 'Labels',
      cutaway: 'Cutaway',
      explode: 'Explode',
      rotate: 'Rotate',
      anatomyHeading: 'Inside the human eye',
      anatomyIntro: 'Select a structure to focus it in 3D. Explore a detailed anatomical reconstruction with layered tissue, a textured iris and a clear corneal surface. Select a card to reveal internal structures.',
      tapCard: 'Tap any card to focus',
      footerTitle: 'EYE · Interactive 3D Anatomy',
      footerText: 'Created as an educational WebGL experience · ',
      backTop: 'Back to top ↑',
      noscript: 'JavaScript is required to render the interactive 3D eye model.',
      langButton: 'FA',
      langButtonLabel: 'Switch to Persian',
      headerLabel: 'Site header',
      homeLabel: 'EYE home',
      navLabel: 'Primary navigation',
      viewerJumpLabel: 'Jump to 3D viewer',
      viewerJumpTitle: '3D viewer',
      viewerSectionLabel: 'Interactive 3D eye anatomy viewer',
      canvasLabel: 'Interactive three-dimensional model of the human eye',
      lightAria: 'Light intensity and pupil response',
      focusAria: 'Lens accommodation',
      closeAria: 'Close structure details',
      controlsAria: '3D viewer controls',
      resetTitle: 'Reset view'
    },
    fa: {
      pageTitle: 'چشم — آناتومی سه‌بعدی تعاملی',
      metaDescription: 'چشم — تجربه‌ای تعاملی و سه‌بعدی برای آشنایی با آناتومی چشم انسان.',
      brandSubtitle: 'تجربه تعاملی آناتومی',
      exploreAnatomy: 'کاوش آناتومی',
      eyebrow: 'سه‌بعدی واقعی · بدون امبد',
      heroLine1: 'چشم را ببین.',
      heroLine2: 'آن را بشناس.',
      lead: 'یک مدل کاملاً تعاملی از چشم انسان که مستقیماً در مرورگر شما رندر می‌شود. مدل را بچرخانید، زوم کنید، ساختارها را جدا بررسی کنید و با حالت انفجاری یا برش‌خورده، نحوه قرارگیری اجزای دستگاه بینایی را بهتر بشناسید.',
      feature1Title: 'سه‌بعدی زنده',
      feature1Text: 'برای چرخاندن مدل بکشید، با اسکرول یا پینچ زوم کنید و چشم را از هر زاویه بررسی کنید.',
      feature2Title: 'آناتومی تعاملی',
      feature2Text: 'ساختارها را روی مدل انتخاب کنید یا با کارت‌های آناتومی پایین صفحه روی هر بخش تمرکز کنید.',
      feature3Title: 'نمای انفجاری',
      feature3Text: 'لایه‌های اصلی را از هم جدا کنید تا رابطه فضایی آن‌ها درون چشم مشخص شود.',
      feature4Title: 'حالت برش',
      feature4Text: 'کره چشم را به‌صورت برش‌خورده ببینید تا عدسی، شبکیه، زجاجیه و عصب بینایی نمایان شوند.',
      modelReady: 'مدل WebGL آماده است',
      optimized: 'بهینه‌شده برای دسکتاپ و موبایل',
      building: 'در حال ساخت آناتومی',
      liveModel: 'مدل زنده',
      humanEye: 'چشم انسان',
      viewerTip: 'برای چرخش بکشید · برای زوم اسکرول یا پینچ کنید · یک ساختار را لمس کنید',
      lightResponse: 'واکنش به نور',
      nearFocus: 'فوکوس نزدیک',
      selectedStructure: 'ساختار انتخاب‌شده',
      reset: '↺ بازنشانی',
      labels: 'برچسب‌ها',
      cutaway: 'برش',
      explode: 'بازکردن اجزا',
      rotate: 'چرخش',
      anatomyHeading: 'درون چشم انسان',
      anatomyIntro: 'یک ساختار را انتخاب کنید تا در مدل سه‌بعدی روی آن تمرکز شود. بازسازی آناتومیک چشم را با لایه‌های بافتی، عنبیه بافت‌دار و سطح شفاف قرنیه بررسی کنید. با انتخاب هر کارت، ساختارهای داخلی را ببینید.',
      tapCard: 'برای تمرکز، هر کارت را انتخاب کنید',
      footerTitle: 'چشم · آناتومی سه‌بعدی تعاملی',
      footerText: 'ساخته‌شده به‌عنوان یک تجربه آموزشی WebGL · ',
      backTop: 'بازگشت به بالا ↑',
      noscript: 'برای نمایش مدل سه‌بعدی تعاملی چشم، JavaScript باید فعال باشد.',
      langButton: 'EN',
      langButtonLabel: 'تغییر زبان به انگلیسی',
      headerLabel: 'سربرگ سایت',
      homeLabel: 'صفحه اصلی چشم',
      navLabel: 'ناوبری اصلی',
      viewerJumpLabel: 'رفتن به نمایشگر سه‌بعدی',
      viewerJumpTitle: 'نمایشگر سه‌بعدی',
      viewerSectionLabel: 'نمایشگر تعاملی سه‌بعدی آناتومی چشم',
      canvasLabel: 'مدل سه‌بعدی تعاملی چشم انسان',
      lightAria: 'شدت نور و واکنش مردمک',
      focusAria: 'تطابق عدسی',
      closeAria: 'بستن جزئیات ساختار',
      controlsAria: 'کنترل‌های نمایشگر سه‌بعدی',
      resetTitle: 'بازنشانی نما'
    }
  };

  const structures = {
    cornea: {
      en: ['Cornea', 'The transparent curved front surface of the eye. Together with the lens, it bends incoming light toward the retina.'],
      fa: ['قرنیه', 'سطح شفاف و خمیده جلوی چشم که همراه با عدسی، نور ورودی را به سمت شبکیه می‌شکند.'],
      cardEn: "The transparent curved front surface that provides most of the eye's initial focusing power.",
      cardFa: 'سطح شفاف و خمیده جلوی چشم که بخش عمده قدرت اولیه تمرکز نور را فراهم می‌کند.'
    },
    iris: {
      en: ['Iris & Pupil', 'The colored iris adjusts pupil diameter, controlling how much light reaches the inside of the eye.'],
      fa: ['عنبیه و مردمک', 'عنبیه رنگی با تغییر قطر مردمک، میزان نوری را که وارد چشم می‌شود کنترل می‌کند.'],
      cardEn: 'The iris changes pupil diameter to regulate the amount of light entering the eye.',
      cardFa: 'عنبیه با تغییر قطر مردمک، مقدار نور ورودی به چشم را تنظیم می‌کند.'
    },
    lens: {
      en: ['Lens', 'A transparent biconvex structure that changes curvature during accommodation to sharpen near and far vision.'],
      fa: ['عدسی', 'ساختاری شفاف و دوکوژ که هنگام تطابق، انحنای خود را تغییر می‌دهد تا دید نزدیک و دور واضح شود.'],
      cardEn: 'A transparent biconvex structure that changes shape to fine-tune focus at different distances.',
      cardFa: 'ساختاری شفاف و دوکوژ که با تغییر شکل، فوکوس را در فاصله‌های مختلف تنظیم می‌کند.'
    },
    retina: {
      en: ['Retina', 'A thin neural layer lining the back of the eye. Photoreceptors convert light into electrical signals for the brain.'],
      fa: ['شبکیه', 'لایه‌ای عصبی و نازک در پشت چشم که گیرنده‌های نوری در آن، نور را به سیگنال‌های الکتریکی برای مغز تبدیل می‌کنند.'],
      cardEn: 'Light-sensitive neural tissue that converts photons into signals sent toward the brain.',
      cardFa: 'بافت عصبی حساس به نور که فوتون‌ها را به سیگنال‌هایی برای ارسال به مغز تبدیل می‌کند.'
    },
    sclera: {
      en: ['Sclera', 'The tough white outer coat of the globe. It protects the eye, maintains shape and anchors extraocular muscles.'],
      fa: ['صلبیه', 'لایه سفید و مقاوم بیرونی کره چشم که از چشم محافظت می‌کند، شکل آن را حفظ می‌کند و محل اتصال عضلات خارجی چشم است.'],
      cardEn: 'The strong white outer coat that protects the globe and helps maintain its shape.',
      cardFa: 'پوشش سفید و مقاوم خارجی که از کره چشم محافظت کرده و به حفظ شکل آن کمک می‌کند.'
    },
    vitreous: {
      en: ['Vitreous Body', 'A clear gel occupying most of the eye behind the lens, helping maintain globe shape while transmitting light.'],
      fa: ['زجاجیه', 'ژلی شفاف که بیشتر فضای پشت عدسی را پر می‌کند، به حفظ شکل کره چشم کمک می‌کند و نور را عبور می‌دهد.'],
      cardEn: 'A clear gel filling the large cavity behind the lens and supporting the retina.',
      cardFa: 'ژلی شفاف که فضای بزرگ پشت عدسی را پر کرده و از شبکیه پشتیبانی می‌کند.'
    },
    ciliary: {
      en: ['Ciliary Body', 'A muscular ring around the lens. Its action changes lens tension and contributes to aqueous humor production.'],
      fa: ['جسم مژگانی', 'حلقه‌ای عضلانی در اطراف عدسی که کشش عدسی را تغییر می‌دهد و در تولید زلالیه نقش دارد.'],
      cardEn: 'A muscular ring involved in lens accommodation and aqueous humor production.',
      cardFa: 'حلقه‌ای عضلانی که در تطابق عدسی و تولید زلالیه نقش دارد.'
    },
    optic: {
      en: ['Optic Nerve', 'A bundle of retinal ganglion-cell axons carrying visual signals from the eye toward the brain.'],
      fa: ['عصب بینایی', 'دسته‌ای از آکسون‌های سلول‌های گانگلیونی شبکیه که پیام‌های بینایی را از چشم به سمت مغز منتقل می‌کنند.'],
      cardEn: 'The neural pathway carrying retinal signals from the back of the eye toward the brain.',
      cardFa: 'مسیر عصبی انتقال‌دهنده پیام‌های شبکیه از پشت چشم به سمت مغز.'
    },
    choroid: {
      en: ['Choroid', 'A vascular, pigmented layer between sclera and retina that supplies the outer retina and absorbs stray light.'],
      fa: ['مشیمیه', 'لایه‌ای عروقی و رنگدانه‌دار میان صلبیه و شبکیه که بخش خارجی شبکیه را تغذیه کرده و نور پراکنده را جذب می‌کند.']
    }
  };

  const q = (selector) => document.querySelector(selector);
  const qa = (selector) => Array.from(document.querySelectorAll(selector));
  const setText = (selector, value) => { const el = q(selector); if (el) el.textContent = value; };
  const setAttr = (selector, attr, value) => { const el = q(selector); if (el) el.setAttribute(attr, value); };

  function ensureToggle() {
    const nav = q('.nav-actions');
    if (!nav || q('#langToggle')) return;
    const button = document.createElement('button');
    button.id = 'langToggle';
    button.className = 'pill lang-toggle';
    button.type = 'button';
    nav.prepend(button);
    button.addEventListener('click', () => setLanguage(currentLanguage === 'en' ? 'fa' : 'en', true));
  }

  function ensureStyles() {
    if (q('#bilingualStyles')) return;
    const style = document.createElement('style');
    style.id = 'bilingualStyles';
    style.textContent = `
      .lang-toggle{min-width:58px;padding-inline:12px;letter-spacing:.04em}
      body.lang-fa .info-panel,body.lang-fa .section,body.lang-fa .part-panel,body.lang-fa .feature,body.lang-fa .anatomy-card{direction:rtl;text-align:right}
      body.lang-fa .lead,body.lang-fa .section p,body.lang-fa .part-panel p,body.lang-fa .feature span,body.lang-fa .anatomy-card span:last-child{line-height:1.9}
      body.lang-fa .eyebrow,body.lang-fa .part-kicker{letter-spacing:0;text-transform:none}
      body.lang-fa h1,body.lang-fa .section h2,body.lang-fa .part-panel h3,body.lang-fa .feature strong,body.lang-fa .anatomy-card strong{letter-spacing:0}
      body.lang-fa .anatomy-card{text-align:right}
      @media(max-width:720px){.nav-actions .lang-toggle{display:inline-flex!important}}
    `;
    document.head.appendChild(style);
  }

  function translateCard(card, lang) {
    const key = card.dataset.focus;
    const item = structures[key];
    if (!item) return;
    const title = card.querySelector('strong');
    const desc = card.querySelector('span:last-child');
    if (title) title.textContent = item[lang][0];
    if (desc) desc.textContent = lang === 'fa' ? item.cardFa : item.cardEn;
  }

  function translateDynamicStructureText(lang) {
    const title = q('#partTitle');
    const description = q('#partDescription');
    if (!title || !description) return;
    const normalized = title.textContent.trim();
    const key = Object.keys(structures).find(k => structures[k].en[0] === normalized || structures[k].fa[0] === normalized);
    if (key) {
      title.textContent = structures[key][lang][0];
      description.textContent = structures[key][lang][1];
    }
  }

  function translateModelLabels(lang) {
    qa('.model-label').forEach(label => {
      const value = label.textContent.trim();
      const key = Object.keys(structures).find(k => structures[k].en[0] === value || structures[k].fa[0] === value);
      if (key) label.textContent = structures[key][lang][0];
    });
  }

  let currentLanguage = localStorage.getItem('eye-language') === 'fa' ? 'fa' : 'en';
  let applying = false;

  function setLanguage(lang, persist = false) {
    if (!translations[lang]) lang = 'en';
    currentLanguage = lang;
    const t = translations[lang];
    applying = true;

    document.documentElement.lang = lang;
    document.body.classList.toggle('lang-fa', lang === 'fa');
    document.title = t.pageTitle;
    const meta = q('meta[name="description"]');
    if (meta) meta.setAttribute('content', t.metaDescription);

    setText('.brand-copy span', t.brandSubtitle);
    setText('.nav-actions a.pill', t.exploreAnatomy);
    const eyebrow = q('.eyebrow');
    if (eyebrow) eyebrow.childNodes[eyebrow.childNodes.length - 1].textContent = ` ${t.eyebrow}`;
    const hero = q('h1');
    if (hero) {
      const span = hero.querySelector('span');
      if (hero.firstChild) hero.firstChild.textContent = t.heroLine1;
      if (span) span.textContent = t.heroLine2;
    }
    setText('.lead', t.lead);

    const features = qa('.feature');
    const featureContent = [
      [t.feature1Title, t.feature1Text],
      [t.feature2Title, t.feature2Text],
      [t.feature3Title, t.feature3Text],
      [t.feature4Title, t.feature4Text]
    ];
    features.forEach((feature, i) => {
      if (!featureContent[i]) return;
      const strong = feature.querySelector('strong');
      const span = feature.querySelector('span');
      if (strong) strong.textContent = featureContent[i][0];
      if (span) span.textContent = featureContent[i][1];
    });

    const metaSpans = qa('.meta-row > span');
    if (metaSpans[0]) {
      const dot = metaSpans[0].querySelector('.status-dot');
      metaSpans[0].textContent = '';
      if (dot) metaSpans[0].appendChild(dot);
      metaSpans[0].appendChild(document.createTextNode(` ${t.modelReady}`));
    }
    if (metaSpans[1]) metaSpans[1].textContent = t.optimized;

    setText('.loader-inner > span', t.building);
    const viewerLabel = q('.viewer-label');
    if (viewerLabel) {
      const strong = viewerLabel.querySelector('strong');
      if (strong) strong.textContent = t.liveModel;
      viewerLabel.lastChild.textContent = ` · ${t.humanEye}`;
    }
    setText('.viewer-tip', t.viewerTip);

    const physiologyLabels = qa('.physiology label');
    if (physiologyLabels[0]) physiologyLabels[0].firstChild.textContent = t.lightResponse;
    if (physiologyLabels[1]) physiologyLabels[1].firstChild.textContent = t.nearFocus;
    setText('.part-kicker', t.selectedStructure);

    setText('#resetBtn .tool-text', t.reset);
    setText('#labelsBtn .tool-text', t.labels);
    setText('#cutBtn .tool-text', t.cutaway);
    setText('#explodeBtn .tool-text', t.explode);
    setText('#rotateBtn .tool-text', t.rotate);

    setText('#anatomy h2', t.anatomyHeading);
    setText('#anatomy .section-head p', t.anatomyIntro);
    setText('.section-note', t.tapCard);
    qa('.anatomy-card').forEach(card => translateCard(card, lang));

    const footerSpans = qa('.footer > span');
    if (footerSpans[0]) footerSpans[0].textContent = t.footerTitle;
    if (footerSpans[1]) {
      const link = footerSpans[1].querySelector('a');
      footerSpans[1].textContent = t.footerText;
      if (link) {
        link.textContent = t.backTop;
        footerSpans[1].appendChild(link);
      }
    }
    setText('.noscript', t.noscript);

    const toggle = q('#langToggle');
    if (toggle) {
      toggle.textContent = t.langButton;
      toggle.setAttribute('aria-label', t.langButtonLabel);
      toggle.title = t.langButtonLabel;
    }

    setAttr('.topbar', 'aria-label', t.headerLabel);
    setAttr('.brand', 'aria-label', t.homeLabel);
    setAttr('.nav-actions', 'aria-label', t.navLabel);
    setAttr('.icon-btn[href="#viewer"]', 'aria-label', t.viewerJumpLabel);
    setAttr('.icon-btn[href="#viewer"]', 'title', t.viewerJumpTitle);
    setAttr('#viewer', 'aria-label', t.viewerSectionLabel);
    setAttr('#eyeCanvas', 'aria-label', t.canvasLabel);
    setAttr('#pupilControl', 'aria-label', t.lightAria);
    setAttr('#focusControl', 'aria-label', t.focusAria);
    setAttr('#closePart', 'aria-label', t.closeAria);
    setAttr('.tool-dock', 'aria-label', t.controlsAria);
    setAttr('#resetBtn', 'title', t.resetTitle);

    translateDynamicStructureText(lang);
    translateModelLabels(lang);
    if (persist) localStorage.setItem('eye-language', lang);

    requestAnimationFrame(() => { applying = false; });
  }

  function watchDynamicText() {
    const panel = q('#partPanel');
    if (panel) {
      new MutationObserver(() => {
        if (applying) return;
        applying = true;
        translateDynamicStructureText(currentLanguage);
        requestAnimationFrame(() => { applying = false; });
      }).observe(panel, { subtree: true, characterData: true, childList: true });
    }

    const layer = q('#labelsLayer');
    if (layer) {
      new MutationObserver(() => {
        if (applying) return;
        applying = true;
        translateModelLabels(currentLanguage);
        requestAnimationFrame(() => { applying = false; });
      }).observe(layer, { subtree: true, characterData: true, childList: true });
    }
  }

  ensureStyles();
  ensureToggle();
  setLanguage(currentLanguage, false);
  watchDynamicText();

  window.eyeSetLanguage = setLanguage;
})();
