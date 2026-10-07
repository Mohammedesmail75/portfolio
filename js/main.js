/**
 * MOHAMMED ESMAIL — PORTFOLIO CORE SCRIPTS
 * Interactive behaviors, bilingual language switching (EN/AR),
 * modal case-study viewer, Cairo timezone clock, smooth animations, and forms.
 */

let currentLang = 'en';
let currentActiveProjectIndex = 0;
let filteredProjects = [];

/* ================= 1. UI TRANSLATIONS DICTIONARY ================= */
const UI_TRANSLATIONS = {
  en: {
    // Nav
    "brand.name": "MOHAMMED ESMAIL",
    "nav.work": "Work",
    "nav.about": "About",
    "nav.services": "Services",
    "nav.contact": "Contact",
    "nav.talk": "Let's Talk",

    // Hero
    "hero.location": "Cairo, Egypt",
    "hero.status": "Available for select commissions",
    "hero.name1": "MOHAMMED",
    "hero.name2": "ESMAIL",
    "hero.role": "Graphic Designer & Visual Creative",
    "hero.statement": "I turn ideas into <strong>visual identities</strong>, <strong>campaigns</strong>, and <strong>experiences</strong> that people remember.",
    "hero.viewWork": "View Selected Work",
    "hero.getInTouch": "Get in Touch",
    "hero.marquee": "BRANDING &amp; VISUAL IDENTITY <span class=\"spark\">✦</span> SOCIAL MEDIA DESIGN <span class=\"spark\">✦</span> ADVERTISING CAMPAIGNS <span class=\"spark\">✦</span> POSTERS &amp; KEY VISUALS <span class=\"spark\">✦</span> MUSIC &amp; ENTERTAINMENT <span class=\"spark\">✦</span> PRODUCT &amp; PACKAGING <span class=\"spark\">✦</span> AI-ASSISTED CREATIVE PRODUCTION <span class=\"spark\">✦</span>",

    // Work
    "work.eyebrow": "Portfolio",
    "work.title": "Selected Work",
    "work.desc": "A curated selection of visual identities, editorial key visuals, album art, and campaigns built with artistic rigor and modern workflows.",
    "filters.all": "All Works",
    "filters.branding": "Branding",
    "filters.campaigns": "Advertising",
    "filters.posters": "Posters & Key Visuals",
    "filters.music": "Music & Entertainment",
    "filters.packaging": "Packaging",
    "filters.social": "Social Media",
    "filters.ai": "AI Creative",
    "work.noProjects": "No projects found in this discipline category.",
    "work.viewBehance": "View on Behance",

    // About
    "about.eyebrow": "About the Designer",
    "about.leadQuote": "\"Design is the visual architecture of emotion, identity, and memory.\"",
    "about.body1": "Based in Cairo, Egypt, I am a graphic designer and visual creative working at the intersection of visual storytelling, branding, advertising, music, entertainment, and modern AI-assisted workflows.",
    "about.body2": "My approach avoids generic formulas. Instead, I create holistic visual worlds — whether shaping the timeless identity for an emerging brand, directing cinematic key visuals for music releases, crafting tactile packaging, or synthesizing impossible visual aesthetics through human-guided AI production.",
    "about.p1Title": "Visual Storytelling & Cultural Depth",
    "about.p1Desc": "Rooted in contextual narrative and human resonance, creating work that connects with people on an emotional level.",
    "about.p2Title": "Obsessive Art Direction & Craft",
    "about.p2Desc": "Disciplined typography, deliberate negative space, and harmonious color architecture engineered for maximum visual impact.",
    "about.p3Title": "Modern AI-Assisted Workflows",
    "about.p3Desc": "Augmenting classical design fundamentals with state-of-the-art generative tools for rapid conceptual exploration and bespoke creative production.",

    // Sidebar
    "about.sidebarName": "Mohammed Esmail",
    "about.sidebarRole": "Graphic Designer / Art Director",
    "about.sidebarBio": "Partnering with forward-thinking brands, musicians, and studios looking for elevated visual identities and memorable campaigns.",
    "about.locLabel": "Location",
    "about.locVal": "Cairo, Egypt",
    "about.focusLabel": "Primary Focus",
    "about.focusVal": "Brand Identity & Key Visuals",
    "about.pipelineLabel": "Creative Pipeline",
    "about.pipelineVal": "Concept → 3D / AI → Finish",
    "about.statusLabel": "Status",
    "about.statusVal": "Open for Commissions",

    // Software
    "software.eyebrow": "Creative Suite",
    "software.title": "Design Software & Production Tools",
    "software.psDesc": "Key Visuals • Image Craft • Compositing",
    "software.aiDesc": "Vector Systems • Brand Identity • Typography",
    "software.prDesc": "Video Editing • Motion Grading • Visual Rhythm",

    // Services
    "services.eyebrow": "Disciplines & Offerings",
    "services.title": "Creative Services",
    "services.desc": "End-to-end visual solutions crafted with editorial precision, from strategic brand foundation to high-concept creative execution.",
    "services.scopeTitle": "Scope & Deliverables:",

    // Contact
    "contact.eyebrow": "Get in Touch",
    "contact.headline": "\"Have an idea? Let's create something memorable.\"",
    "contact.desc": "Whether you are launching a new brand, preparing an advertising campaign, releasing a musical project, or exploring AI-assisted art direction, feel free to reach out.",
    "contact.inquiryTag": "Direct Inquiry",
    "contact.copy": "Copy",
    "contact.behanceTag": "Portfolio & Case Studies",
    "contact.behanceDesc": "Detailed design presentations, brand guidelines, and visual explorations.",
    "contact.youtubeTag": "Creative Channel",
    "contact.youtubeDesc": "Visual design breakdowns, creative tutorials, and process videos.",
    "contact.studioBase": "Studio Base",
    "contact.studioLoc": "Cairo, Egypt (UTC+2)",
    "contact.availTag": "Availability",
    "contact.availVal": "Taking commissions for Q4",
    "contact.formTitle": "Send a Direct Message",
    "contact.formSubtitle": "Fill in your brief to start a conversation.",
    "contact.labelName": "Your Name",
    "contact.placeholderName": "e.g. Alex Morgan",
    "contact.labelEmail": "Email Address",
    "contact.placeholderEmail": "alex@studio.com",
    "contact.labelService": "Area of Interest",
    "contact.serviceOption0": "Brand Identity",
    "contact.serviceOption1": "Art Direction",
    "contact.serviceOption2": "Social Media Design",
    "contact.serviceOption3": "Advertising & Campaigns",
    "contact.serviceOption4": "Packaging Design",
    "contact.serviceOption5": "Music & Entertainment Visuals",
    "contact.serviceOption6": "AI Creative Production",
    "contact.serviceOption7": "Other / Multi-Disciplinary",
    "contact.labelMsg": "Project Overview",
    "contact.placeholderMsg": "Tell me about your project, timeline, and goals...",
    "contact.submitBtn": "Submit Inquiry",
    "contact.toastFill": "Please fill in your name, email, and message.",
    "contact.toastSuccess": "Thank you! Inquiry prepared. Opening your email client...",
    "contact.toastCopied": "Copied to clipboard:",

    // Footer
    "footer.rights": "All rights reserved.",
    "footer.location": "Cairo, Egypt • 30.0444° N, 31.2357° E",
    "footer.backToTop": "Back to Top",

    // Modal
    "modal.client": "Commission / Client",
    "modal.year": "Year",
    "modal.role": "Role",
    "modal.scope": "Scope & Deliverables",
    "modal.overviewTitle": "Overview & Concept",
    "modal.directionTitle": "Creative Direction & Craft",
    "modal.showcaseTitle": "Visual Showcase & Deliverables"
  },
  ar: {
    // Nav
    "brand.name": "محمد إسماعيل",
    "nav.work": "الأعمال",
    "nav.about": "نبذة عني",
    "nav.services": "الخدمات",
    "nav.contact": "تواصل معي",
    "nav.talk": "تواصل الآن",

    // Hero
    "hero.location": "القاهرة، مصر",
    "hero.status": "متاح لمشاريع مختارة وإدارة فنية",
    "hero.name1": "محمد",
    "hero.name2": "إسماعيل",
    "hero.role": "مصمم جرافيك ومبدع بصري",
    "hero.statement": "أحوّل الأفكار إلى <strong>هويات بصرية</strong>، و<strong>حملات</strong>، و<strong>تجارب</strong> تخلد في الذاكرة.",
    "hero.viewWork": "استعرض الأعمال المختارة",
    "hero.getInTouch": "تواصل معي",
    "hero.marquee": "الهوية البصرية والشعارات <span class=\"spark\">✦</span> تصميم منصات التواصل <span class=\"spark\">✦</span> الإعلانات والحملات <span class=\"spark\">✦</span> الملصقات والمفاتيح البصرية <span class=\"spark\">✦</span> الموسيقى والترفيه <span class=\"spark\">✦</span> تصميم العبوات والتغليف <span class=\"spark\">✦</span> الإنتاج الإبداعي بالذكاء الاصطناعي <span class=\"spark\">✦</span>",

    // Work
    "work.eyebrow": "معرض الأعمال",
    "work.title": "أعمال مختارة",
    "work.desc": "مجموعة منتقاة من الهويات البصرية، والمفاتيح التحريرية، وأغلفة الألبومات، والحملات الإعلانية المنفذة بحرفية فنية وأساليب معاصرة.",
    "filters.all": "جميع الأعمال",
    "filters.branding": "الهوية البصرية",
    "filters.campaigns": "الإعلانات والحملات",
    "filters.posters": "الملصقات والمفاتيح البصرية",
    "filters.music": "الموسيقى والترفيه",
    "filters.packaging": "تصميم العبوات",
    "filters.social": "منصات التواصل",
    "filters.ai": "الذكاء الاصطناعي",
    "work.noProjects": "لا توجد مشاريع في هذا التخصص حالياً.",
    "work.viewBehance": "عرض على Behance",

    // About
    "about.eyebrow": "نبذة عن المصمم",
    "about.leadQuote": "«التصميم هو الهندسة البصرية للمشاعر والهوية والذاكرة.»",
    "about.body1": "أعمل من القاهرة كمصمم جرافيك ومبدع بصري، حيث أجمع بين السرد القصصي البصري، وبناء الهويات، والإعلانات، والموسيقى والترفيه، وتطبيقات الذكاء الاصطناعي الحديثة.",
    "about.body2": "أبتعد في عملي عن القوالب المكررة، وأركز على خلق عوالم بصرية متكاملة؛ سواء كان ذلك بتأسيس هوية خالدة لعلامة تجارية ناشئة، أو توجيه مفاتيح بصرية سينمائية للأعمال الموسيقية، أو تصميم عبوات ملموسة، أو توليد جماليات بصرية متقدمة بتوجيه فني بشري دقيق.",
    "about.p1Title": "السرد البصري والعمق الثقافي",
    "about.p1Desc": "أعمال متجذرة في السياق القصصي والتأثير الإنساني للتواصل مع الجمهور على مستوى شعوري عميق.",
    "about.p2Title": "شغف الإدارة الفنية والحِرفة",
    "about.p2Desc": "انضباط في هندسة الخطوط، وتوظيف المساحات السلبية، وتناغم الألوان لتحقيق أقصى تأثير بصري.",
    "about.p3Title": "أساليب عمل حديثة بالذكاء الاصطناعي",
    "about.p3Desc": "تعزيز أساسيات التصميم الأصيلة بأحدث الأدوات التوليدية لاستكشاف المفاهيم بسرعة وابتكار حلول إبداعية مخصصة.",

    // Sidebar
    "about.sidebarName": "محمد إسماعيل",
    "about.sidebarRole": "مصمم جرافيك / مدير فني",
    "about.sidebarBio": "أتعاون مع العلامات التجارية الطموحة، والموسيقيين، والاستوديوهات الباحثة عن هويات بصرية راقية وحملات لا تُنسى.",
    "about.locLabel": "المقر",
    "about.locVal": "القاهرة، مصر",
    "about.focusLabel": "التخصص الرئيسي",
    "about.focusVal": "الهوية البصرية والمفاتيح الفنية",
    "about.pipelineLabel": "المسار الإبداعي",
    "about.pipelineVal": "الفكرة ← 3D / الذكاء الاصطناعي ← التنفيذ",
    "about.statusLabel": "الحالة",
    "about.statusVal": "متاح للمشاريع الجديدة",

    // Software
    "software.eyebrow": "حزمة الأدوات الإبداعية",
    "software.title": "برامج التصميم وأدوات الإنتاج",
    "software.psDesc": "المفاتيح البصرية • معالجة الصور • الدمج الرقمي",
    "software.aiDesc": "الأنظمة المتجهة • الهوية البصرية • هندسة الخطوط",
    "software.prDesc": "مونتاج الفيديو • تدرج الألوان الحركي • الإيقاع البصري",

    // Services
    "services.eyebrow": "التخصصات والخدمات",
    "services.title": "الخدمات الإبداعية",
    "services.desc": "حلول بصرية متكاملة تُصاغ بدقة تحريرية، من تأسيس الهوية الاستراتيجية إلى التنفيذ الإبداعي عالي المستوى.",
    "services.scopeTitle": "نطاق العمل والمخرجات:",

    // Contact
    "contact.eyebrow": "تواصل معي",
    "contact.headline": "«لديك فكرة؟ لنصنع معاً شيئاً لا يُنسى.»",
    "contact.desc": "سواء كنت بصدد إطلاق علامة تجارية جديدة، أو التجهيز لحملة إعلانية، أو إصدار عمل موسيقي، أو استكشاف إدارة فنية بالذكاء الاصطناعي، يسعدني تواصلك.",
    "contact.inquiryTag": "استفسار مباشر",
    "contact.copy": "نسخ",
    "contact.behanceTag": "معرض الأعمال ودراسات الحالة",
    "contact.behanceDesc": "عروض تفصيلية لتصاميم الهويات، وأدلة العلامات التجارية، واستكشافات بصرية.",
    "contact.youtubeTag": "القناة الإبداعية",
    "contact.youtubeDesc": "شروحات تصميم الجرافيك، ودروس إبداعية، ومقاطع من كواليس العمل.",
    "contact.studioBase": "مقر الاستوديو",
    "contact.studioLoc": "القاهرة، مصر (UTC+2)",
    "contact.availTag": "التوفر",
    "contact.availVal": "استقبال مشاريع للربع الحالي",
    "contact.formTitle": "أرسل رسالة مباشرة",
    "contact.formSubtitle": "أدخل تفاصيل موجزة لبدء المحادثة.",
    "contact.labelName": "الاسم",
    "contact.placeholderName": "مثال: أحمد علي",
    "contact.labelEmail": "البريد الإلكتروني",
    "contact.placeholderEmail": "ahmed@example.com",
    "contact.labelService": "مجال الاهتمام",
    "contact.serviceOption0": "الهوية البصرية",
    "contact.serviceOption1": "الإدارة الفنية",
    "contact.serviceOption2": "تصميم منصات التواصل",
    "contact.serviceOption3": "الإعلانات والحملات",
    "contact.serviceOption4": "تصميم العبوات والتغليف",
    "contact.serviceOption5": "مرئيات الموسيقى والترفيه",
    "contact.serviceOption6": "الإنتاج الإبداعي بالذكاء الاصطناعي",
    "contact.serviceOption7": "مجالات أخرى / متعدد التخصصات",
    "contact.labelMsg": "نبذة عن المشروع",
    "contact.placeholderMsg": "أخبرني عن مشروعك، والجدول الزمني، والأهداف المرجوة...",
    "contact.submitBtn": "إرسال الاستفسار",
    "contact.toastFill": "يرجى كتابة الاسم والبريد الإلكتروني وتفاصيل المشروع.",
    "contact.toastSuccess": "شكراً لك! جاري فتح بريدك الإلكتروني لإرسال الاستفسار...",
    "contact.toastCopied": "تم النسخ إلى الحافظة:",

    // Footer
    "footer.rights": "جميع الحقوق محفوظة.",
    "footer.location": "القاهرة، مصر • 30.0444° شمالاً، 31.2357° شرقاً",
    "footer.backToTop": "العودة للأعلى",

    // Modal
    "modal.client": "العميل / الجهة",
    "modal.year": "السنة",
    "modal.role": "الدور",
    "modal.scope": "نطاق العمل والمخرجات",
    "modal.overviewTitle": "نظرة عامة وفكرة المشروع",
    "modal.directionTitle": "التوجيه الإبداعي والحِرفة الفنية",
    "modal.showcaseTitle": "معرض المرئيات والمخرجات"
  }
};

/* ================= 2. INITIALIZATION ON DOM READY ================= */
document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initCairoClock();
  initNavigation();
  initProjects();
  initServicesAccordion();
  initContactInteractions();
  setupCaseStudyModal();
  initLanguageSwitcher();

  // Load saved language preference or default to English
  let savedLang = 'en';
  try {
    savedLang = localStorage.getItem('portfolio_lang') || 'en';
  } catch (e) {}
  setLanguage(savedLang);

  // Asynchronously load dynamic portfolio data from server / KV if available
  loadDynamicPortfolioData();
});

async function loadDynamicPortfolioData() {
  try {
    const res = await fetch('/api/portfolio-data');
    if (res.ok) {
      const data = await res.json();
      if (data && typeof data === 'object') {
        window.refreshPortfolioFromData(data);
      }
    }
  } catch (err) {
    // Graceful fallback to bundled config
  }
}

window.applySectionVisibility = function(visibility) {
  if (!visibility) return;
  const sections = {
    hero: { sel: '#hero', navHref: '#hero' },
    work: { sel: '#work', navHref: '#work' },
    about: { sel: '#about', navHref: '#about' },
    services: { sel: '#services', navHref: '#services' },
    contact: { sel: '#contact', navHref: '#contact' }
  };
  Object.entries(sections).forEach(([key, cfg]) => {
    const isVisible = visibility[key] !== false;
    const el = document.querySelector(cfg.sel);
    if (el) el.style.display = isVisible ? '' : 'none';
    if (cfg.navHref) {
      document.querySelectorAll(`a[href="${cfg.navHref}"]`).forEach(link => {
        const li = link.closest('li') || link;
        li.style.display = isVisible ? '' : 'none';
      });
    }
  });
};

window.refreshPortfolioFromData = function(data) {
  if (!data || typeof data !== 'object') return;
  if (data.designer && typeof PORTFOLIO_CONFIG !== 'undefined') {
    Object.assign(PORTFOLIO_CONFIG.designer, data.designer);
  }
  if (Array.isArray(data.projects) && typeof PORTFOLIO_CONFIG !== 'undefined') {
    PORTFOLIO_CONFIG.projects = data.projects;
    filteredProjects = [...PORTFOLIO_CONFIG.projects];
  }
  if (Array.isArray(data.services) && typeof PORTFOLIO_CONFIG !== 'undefined') {
    PORTFOLIO_CONFIG.services = data.services;
  }
  if (Array.isArray(data.categories) && typeof PORTFOLIO_CONFIG !== 'undefined') {
    PORTFOLIO_CONFIG.categories = data.categories;
  }
  if (data.translations) {
    if (data.translations.en) Object.assign(UI_TRANSLATIONS.en, data.translations.en);
    if (data.translations.ar) Object.assign(UI_TRANSLATIONS.ar, data.translations.ar);
  }
  if (data.sectionVisibility) {
    if (typeof PORTFOLIO_CONFIG !== 'undefined') PORTFOLIO_CONFIG.sectionVisibility = data.sectionVisibility;
    window.applySectionVisibility(data.sectionVisibility);
  }
  if (data.heroSettings && data.heroSettings.videoUrl) {
    const videoEl = document.querySelector('.hero-bg-video');
    const sourceEl = videoEl ? videoEl.querySelector('source') : null;
    if (sourceEl && sourceEl.getAttribute('src') !== data.heroSettings.videoUrl) {
      sourceEl.setAttribute('src', data.heroSettings.videoUrl);
      videoEl.load();
    }
  }

  // Update counts and re-render
  const allCountBadge = document.querySelector('.filter-btn[data-filter="all"] .count');
  if (allCountBadge && PORTFOLIO_CONFIG.projects) {
    allCountBadge.textContent = PORTFOLIO_CONFIG.projects.length;
  }

  renderProjectsGrid(filteredProjects);
  renderServicesAccordion();
  setLanguage(currentLang);
};

/* ================= 3. LANGUAGE SWITCHER & i18n ================= */
function initLanguageSwitcher() {
  // Desktop Header Switcher Buttons
  const langButtons = document.querySelectorAll('.lang-btn');
  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetLang = btn.getAttribute('data-lang');
      if (targetLang && targetLang !== currentLang) {
        setLanguage(targetLang);
      }
    });
  });

  // Mobile Drawer Switcher Buttons
  const mobileLangButtons = document.querySelectorAll('.mobile-lang-btn');
  mobileLangButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetLang = btn.getAttribute('data-lang');
      if (targetLang && targetLang !== currentLang) {
        setLanguage(targetLang);
      }
    });
  });

  // Footer Language Toggle Link
  const footerLangBtn = document.getElementById('footerLangBtn');
  if (footerLangBtn) {
    footerLangBtn.addEventListener('click', () => {
      const targetLang = footerLangBtn.getAttribute('data-lang-target') || (currentLang === 'ar' ? 'en' : 'ar');
      setLanguage(targetLang);
    });
  }
}

function setLanguage(lang) {
  if (lang !== 'en' && lang !== 'ar') lang = 'en';
  currentLang = lang;
  try {
    localStorage.setItem('portfolio_lang', lang);
  } catch (e) {}

  const isAr = (lang === 'ar');
  document.documentElement.lang = lang;
  document.documentElement.dir = isAr ? 'rtl' : 'ltr';

  // Toggle active class on language buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });
  document.querySelectorAll('.mobile-lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  // Footer button label
  const footerLangBtn = document.getElementById('footerLangBtn');
  if (footerLangBtn) {
    if (isAr) {
      footerLangBtn.textContent = 'English';
      footerLangBtn.setAttribute('data-lang-target', 'en');
    } else {
      footerLangBtn.textContent = 'العربية';
      footerLangBtn.setAttribute('data-lang-target', 'ar');
    }
  }

  // Update page title
  document.title = isAr 
    ? "محمد إسماعيل — مصمم جرافيك ومبدع بصري | القاهرة، مصر"
    : "Mohammed Esmail — Graphic Designer & Visual Creative | Cairo, Egypt";

  // Translate all tagged static elements
  const dict = UI_TRANSLATIONS[lang] || UI_TRANSLATIONS.en;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) {
      if (dict[key].includes('<') && dict[key].includes('>')) {
        el.innerHTML = dict[key];
      } else {
        el.textContent = dict[key];
      }
    }
  });

  // Translate form input placeholders
  const nameInput = document.getElementById('inquiryName');
  if (nameInput) nameInput.placeholder = dict["contact.placeholderName"] || "";
  const emailInput = document.getElementById('inquiryEmail');
  if (emailInput) emailInput.placeholder = dict["contact.placeholderEmail"] || "";
  const msgInput = document.getElementById('inquiryMessage');
  if (msgInput) msgInput.placeholder = dict["contact.placeholderMsg"] || "";

  // Re-render projects grid in active language
  if (typeof renderProjectsGrid === 'function' && filteredProjects) {
    renderProjectsGrid(filteredProjects);
  }

  // Re-render services in active language
  if (typeof renderServicesAccordion === 'function') {
    renderServicesAccordion();
  }

  // Update Cairo clock display
  updateClockDisplay();
}

/* ================= 4. CUSTOM CURSOR ================= */
function initCustomCursor() {
  const dot = document.querySelector('.custom-cursor-dot');
  const outline = document.querySelector('.custom-cursor-outline');
  
  if (!dot || !outline) return;

  window.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    dot.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
    
    outline.animate({
      transform: `translate3d(${clientX}px, ${clientY}px, 0)`
    }, {
      duration: 350,
      fill: 'forwards'
    });
  });

  const interactiveTargets = document.querySelectorAll('a, button, input, textarea, select, .service-card, .software-tool-card');
  interactiveTargets.forEach(el => {
    el.addEventListener('mouseenter', () => outline.classList.add('hovering'));
    el.addEventListener('mouseleave', () => outline.classList.remove('hovering'));
  });
}

/* ================= 5. CAIRO LIVE CLOCK ================= */
function updateClockDisplay() {
  const clockElement = document.getElementById('cairoTimeDisplay');
  const heroTimeElement = document.getElementById('heroCairoTime');

  try {
    const now = new Date();
    const options = {
      timeZone: 'Africa/Cairo',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    const cairoTimeStr = new Intl.DateTimeFormat('en-GB', options).format(now);
    
    if (clockElement) {
      const prefix = currentLang === 'ar' ? 'القاهرة' : 'CAIRO';
      clockElement.textContent = `${prefix} ${cairoTimeStr}`;
    }
    if (heroTimeElement) {
      const city = currentLang === 'ar' ? 'القاهرة، مصر' : 'Cairo, EG';
      heroTimeElement.textContent = `${city} • ${cairoTimeStr}`;
    }
  } catch (err) {
    console.warn("Cairo clock fallback:", err);
  }
}

function initCairoClock() {
  updateClockDisplay();
  setInterval(updateClockDisplay, 1000);
}

/* ================= 6. NAVIGATION & SCROLL ================= */
function initNavigation() {
  const nav = document.querySelector('.site-nav');
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const drawerLinks = document.querySelectorAll('.mobile-drawer-link');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    updateActiveNavLink();
  });

  function updateActiveNavLink() {
    const scrollPos = window.scrollY + 200;
    const sections = ['work', 'about', 'services', 'contact'];
    
    sections.forEach(id => {
      const sec = document.getElementById(id);
      if (!sec) return;
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  // Mobile menu toggle
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
      document.body.style.overflow = mobileDrawer.classList.contains('open') ? 'hidden' : '';
    });

    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Back to top button
  const backToTop = document.getElementById('backToTopBtn');
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* ================= 7. PROJECTS SHOWCASE & FILTERING ================= */
function initProjects() {
  const gridContainer = document.getElementById('projectsGrid');
  const filterButtons = document.querySelectorAll('.filter-btn');

  if (!gridContainer || !PORTFOLIO_CONFIG) return;

  const allCountBadge = document.querySelector('.filter-btn[data-filter="all"] .count');
  if (allCountBadge && PORTFOLIO_CONFIG.projects) {
    allCountBadge.textContent = PORTFOLIO_CONFIG.projects.length;
  }

  filteredProjects = [...PORTFOLIO_CONFIG.projects];
  renderProjectsGrid(filteredProjects);

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-filter');
      if (category === 'all') {
        filteredProjects = [...PORTFOLIO_CONFIG.projects];
      } else {
        filteredProjects = PORTFOLIO_CONFIG.projects.filter(p => p.category === category);
      }

      gridContainer.style.opacity = '0';
      gridContainer.style.transform = 'translateY(12px)';
      setTimeout(() => {
        renderProjectsGrid(filteredProjects);
        gridContainer.style.opacity = '1';
        gridContainer.style.transform = 'translateY(0)';
      }, 200);
    });
  });
}

function renderProjectsGrid(projectsList) {
  const gridContainer = document.getElementById('projectsGrid');
  const cursorOutline = document.querySelector('.custom-cursor-outline');
  
  if (!gridContainer) return;

  const isAr = (currentLang === 'ar');
  const dict = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS.en;

  if (projectsList.length === 0) {
    gridContainer.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
        <p>${dict["work.noProjects"]}</p>
      </div>
    `;
    return;
  }

  gridContainer.innerHTML = projectsList.map((project, index) => {
    const behanceUrl = project.behanceUrl || project.link || "https://www.behance.net/muhammedesmail";
    
    // Select Arabic or English fields
    const title = isAr && project.title_ar ? project.title_ar : project.title;
    const categoryLabel = isAr && project.categoryLabel_ar ? project.categoryLabel_ar : (project.categoryLabel || "Selected Work");
    const shortDesc = isAr && project.shortDescription_ar ? project.shortDescription_ar : (project.shortDescription || "");
    const role = isAr && project.role_ar ? project.role_ar : (project.role || "Visual Design");
    const ctaText = dict["work.viewBehance"];

    return `
      <a href="${behanceUrl}" target="_blank" rel="noopener noreferrer" class="project-card" data-project-id="${project.id || index}" aria-label="${ctaText} - ${title}">
        <div class="project-media-wrap">
          <div class="project-category-badge">${categoryLabel}</div>
          <img src="${project.image}" alt="${title} - ${categoryLabel}" class="project-img" loading="lazy" />
        </div>

        <div class="project-info-wrap">
          <div class="project-title-row">
            <h3 class="project-title">${title}</h3>
          </div>
          ${shortDesc ? `<p class="project-desc">${shortDesc}</p>` : ''}
          
          <div class="project-footer-row">
            <span class="project-role-tag">${role}</span>
            <span class="view-case-study-cta">
              ${ctaText}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </span>
          </div>
        </div>
      </a>
    `;
  }).join('');

  // Hover cursor listeners
  const cards = gridContainer.querySelectorAll('.project-card');
  cards.forEach(card => {
    if (cursorOutline) {
      card.addEventListener('mouseenter', () => cursorOutline.classList.add('view-project'));
      card.addEventListener('mouseleave', () => cursorOutline.classList.remove('view-project'));
    }
  });
}

/* ================= 8. SERVICES ACCORDION ================= */
function initServicesAccordion() {
  renderServicesAccordion();
}

function renderServicesAccordion() {
  const servicesContainer = document.getElementById('servicesList');
  if (!servicesContainer || !PORTFOLIO_CONFIG) return;

  const isAr = (currentLang === 'ar');
  const dict = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS.en;

  servicesContainer.innerHTML = PORTFOLIO_CONFIG.services.map((service, idx) => {
    const isFirst = idx === 0;
    const name = isAr && service.name_ar ? service.name_ar : service.name;
    const tagline = isAr && service.tagline_ar ? service.tagline_ar : service.tagline;
    const description = isAr && service.description_ar ? service.description_ar : service.description;
    const deliverables = isAr && service.deliverables_ar ? service.deliverables_ar : service.deliverables;

    return `
      <div class="service-card" data-service-id="${service.id}">
        <div class="service-main-row" role="button" tabindex="0" aria-expanded="${isFirst}">
          <div class="service-left-col">
            <span class="service-index">${service.id}</span>
            <div class="service-title-block">
              <h3 class="service-title">${name}</h3>
              <p class="service-tagline">${tagline}</p>
            </div>
          </div>
          <button class="service-toggle-btn" aria-label="Toggle details for ${name}">
            <svg class="toggle-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="transform: rotate(${isFirst ? '180deg' : '0deg'}); transition: transform 0.3s ease;">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>
        </div>

        <div class="service-details" style="display: ${isFirst ? 'grid' : 'none'};">
          <p class="service-desc-text">${description}</p>
          <div class="service-deliverables-box">
            <span class="service-deliverables-title">${dict["services.scopeTitle"]}</span>
            <ul class="deliverables-bullet-list">
              ${deliverables.map(d => `<li>${d}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Accordion click handlers
  const serviceCards = servicesContainer.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    const mainRow = card.querySelector('.service-main-row');
    const details = card.querySelector('.service-details');
    const icon = card.querySelector('.toggle-icon');

    const toggle = () => {
      const isVisible = details.style.display === 'grid';
      if (isVisible) {
        details.style.display = 'none';
        icon.style.transform = 'rotate(0deg)';
        mainRow.setAttribute('aria-expanded', 'false');
      } else {
        details.style.display = 'grid';
        icon.style.transform = 'rotate(180deg)';
        mainRow.setAttribute('aria-expanded', 'true');
      }
    };

    mainRow.addEventListener('click', toggle);
    mainRow.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  });
}

/* ================= 9. CASE STUDY MODAL ================= */
function setupCaseStudyModal() {
  const modal = document.getElementById('caseStudyModal');
  const closeBtn = document.getElementById('closeModalBtn');
  const prevBtn = document.getElementById('prevProjectBtn');
  const nextBtn = document.getElementById('nextProjectBtn');

  if (!modal) return;

  if (closeBtn) {
    closeBtn.addEventListener('click', closeCaseStudyModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeCaseStudyModal();
    }
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (filteredProjects.length === 0) return;
      currentActiveProjectIndex = (currentActiveProjectIndex - 1 + filteredProjects.length) % filteredProjects.length;
      populateModalContent(filteredProjects[currentActiveProjectIndex]);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (filteredProjects.length === 0) return;
      currentActiveProjectIndex = (currentActiveProjectIndex + 1) % filteredProjects.length;
      populateModalContent(filteredProjects[currentActiveProjectIndex]);
    });
  }

  window.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('open')) return;

    if (e.key === 'Escape') {
      closeCaseStudyModal();
    } else if (e.key === 'ArrowLeft') {
      if (prevBtn) prevBtn.click();
    } else if (e.key === 'ArrowRight') {
      if (nextBtn) nextBtn.click();
    }
  });
}

function openCaseStudyModal(index) {
  const modal = document.getElementById('caseStudyModal');
  if (!modal || !filteredProjects[index]) return;

  currentActiveProjectIndex = index;
  populateModalContent(filteredProjects[index]);

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeCaseStudyModal() {
  const modal = document.getElementById('caseStudyModal');
  if (!modal) return;

  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function populateModalContent(project) {
  const isAr = (currentLang === 'ar');

  const title = isAr && project.title_ar ? project.title_ar : project.title;
  const subtitle = isAr && project.subtitle_ar ? project.subtitle_ar : (project.subtitle || project.categoryLabel);
  const categoryLabel = isAr && project.categoryLabel_ar ? project.categoryLabel_ar : project.categoryLabel;
  const client = isAr && project.client_ar ? project.client_ar : (project.client || '[Commission]');
  const role = isAr && project.role_ar ? project.role_ar : project.role;
  const deliverables = isAr && project.deliverables_ar ? project.deliverables_ar : project.deliverables;
  const overview = isAr && project.overview_ar ? project.overview_ar : (project.overview || project.shortDescription);
  const direction = isAr && project.creativeDirection_ar ? project.creativeDirection_ar : project.creativeDirection;

  document.getElementById('modalProjectTitle').textContent = title;
  document.getElementById('modalCategoryBadge').textContent = categoryLabel;

  const heroImg = document.getElementById('modalHeroImg');
  heroImg.src = project.image;
  heroImg.alt = title;

  document.getElementById('modalClient').textContent = client;
  document.getElementById('modalYear').textContent = project.year;
  document.getElementById('modalRole').textContent = role;

  const deliverablesContainer = document.getElementById('modalDeliverablesList');
  if (deliverablesContainer && deliverables) {
    deliverablesContainer.innerHTML = deliverables.map(d => `
      <span class="deliverable-pill">${d}</span>
    `).join('');
  }

  document.getElementById('modalOverviewText').textContent = overview;
  document.getElementById('modalDirectionText').textContent = direction || "";

  const galleryContainer = document.getElementById('modalGalleryShowcase');
  if (galleryContainer && project.gallery) {
    galleryContainer.innerHTML = project.gallery.map(item => {
      const caption = isAr && item.caption_ar ? item.caption_ar : item.caption;
      return `
        <div class="gallery-item">
          <img src="${item.src}" alt="${caption}" loading="lazy" />
          <div class="gallery-caption">${caption}</div>
        </div>
      `;
    }).join('');
  }

  const scrollBody = document.querySelector('.modal-scroll-body');
  if (scrollBody) scrollBody.scrollTop = 0;
}

/* ================= 10. CONTACT INTERACTIONS ================= */
function initContactInteractions() {
  const copyBtn = document.getElementById('copyEmailBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const email = PORTFOLIO_CONFIG.designer.email;
      const dict = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS.en;
      navigator.clipboard.writeText(email).then(() => {
        showToast(`${dict["contact.toastCopied"]} ${email}`);
      }).catch(() => {
        showToast(`Email: ${email}`);
      });
    });
  }

  const inquiryForm = document.getElementById('inquiryForm');
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const dict = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS.en;
      const name = document.getElementById('inquiryName').value.trim();
      const email = document.getElementById('inquiryEmail').value.trim();
      const service = document.getElementById('inquiryService').value;
      const message = document.getElementById('inquiryMessage').value.trim();

      if (!name || !email || !message) {
        showToast(dict["contact.toastFill"]);
        return;
      }

      showToast(dict["contact.toastSuccess"]);
      
      const subject = encodeURIComponent(`Project Inquiry: ${service} — ${name}`);
      const body = encodeURIComponent(`Hello Mohammed,\n\nName: ${name}\nEmail: ${email}\nService: ${service}\n\nProject Details:\n${message}\n\nBest regards,\n${name}`);
      
      setTimeout(() => {
        window.location.href = `mailto:${PORTFOLIO_CONFIG.designer.email}?subject=${subject}&body=${body}`;
      }, 800);
    });
  }
}

/* ================= 11. TOAST NOTIFICATIONS ================= */
function showToast(message) {
  let toast = document.querySelector('.toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>
    <span>${message}</span>
  `;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3800);
}
