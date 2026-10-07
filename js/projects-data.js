/**
 * MOHAMMED ESMAIL — PORTFOLIO DATA CONFIGURATION
 * -------------------------------------------------------------
 * Graphic Designer & Visual Creative | Cairo, Egypt
 * 
 * INSTRUCTIONS FOR MOHAMMED:
 * You can easily update your projects, descriptions, categories,
 * and contact info directly in this file.
 */

const PORTFOLIO_CONFIG = {
  designer: {
    name: "MOHAMMED ESMAIL",
    name_ar: "محمد إسماعيل",
    role: "Graphic Designer & Visual Creative",
    role_ar: "مصمم جرافيك ومبدع بصري",
    location: "Cairo, Egypt",
    location_ar: "القاهرة، مصر",
    timezone: "Africa/Cairo",
    statement: "I turn ideas into visual identities, campaigns, and experiences that people remember.",
    statement_ar: "أحوّل الأفكار إلى هويات بصرية، وحملات، وتجارب تخلد في الذاكرة.",
    email: "Mohammedesmailofficial@gmail.com",
    social: {
      behance: "https://www.behance.net/muhammedesmail",
      youtube: "https://www.youtube.com/@MohammedEsmailOfficial/"
    },
    status: {
      available: true,
      label: "Available for select commissions & art direction",
      label_ar: "متاح لمشاريع مختارة وإدارة فنية"
    }
  },

  // Project Categories used for filtering
  categories: [
    { id: "all", label: "All Works", label_ar: "جميع الأعمال" },
    { id: "branding", label: "Brand Identity", label_ar: "الهوية البصرية" },
    { id: "campaigns", label: "Advertising & Campaigns", label_ar: "الإعلانات والحملات" },
    { id: "posters", label: "Posters & Key Visuals", label_ar: "الملصقات والمفاتيح البصرية" },
    { id: "music", label: "Music & Entertainment", label_ar: "الموسيقى والترفيه" },
    { id: "packaging", label: "Packaging Design", label_ar: "تصميم العبوات والتغليف" },
    { id: "social", label: "Social Media Design", label_ar: "تصميم منصات التواصل" },
    { id: "ai", label: "AI Creative Production", label_ar: "الإنتاج الإبداعي بالذكاء الاصطناعي" }
  ],

  // Selected Projects Showcase
  // All projects are displayed continuously on the main page without pagination.
  projects: [
    {
      id: "arabian-collection",
      title: "Arabian Collection",
      title_ar: "Arabian Collection",
      behanceUrl: "https://www.behance.net/gallery/235780351/Arabian-Collectio-Logo",
      subtitle: "Architectural Monogram & Environmental Identity",
      subtitle_ar: "مونوغرام معماري وهوية مكانية",
      category: "branding",
      categoryLabel: "Brand Identity",
      categoryLabel_ar: "الهوية البصرية",
      year: "2024",
      image: "assets/images/arabian-collection.jpg",
      isPlaceholder: false,
      shortDescription: "Sculpted 3D monogram identity and architectural interior signage crafted for an exclusive boutique collection.",
      shortDescription_ar: "هوية مونوغرام ثلاثية الأبعاد ولافتات مكانية معمارية لمجموعة حصرية راقية.",
      client: "Arabian Collection",
      client_ar: "Arabian Collection",
      role: "Brand Identity & Spatial Graphic Designer",
      role_ar: "مصمم الهوية البصرية والتصميم المكاني",
      deliverables: ["Monogram Icon & Wordmark", "3D Wall Signage Specifications", "Environmental Branding", "Brand Guidelines"],
      deliverables_ar: ["شعار مونوغرام وهوية لفظية", "مخططات لافتات جدارية 3D", "هوية مكانية معمارية", "دليل إرشادي للهوية"],
      overview: "Visual identity and architectural spatial signage developed for Arabian Collection. The identity blends a sculpted 'AC' monogram with contemporary architectural proportions, realized as a high-contrast white 3D installation against natural vertical fluted timber slats.",
      overview_ar: "تطوير هوية بصرية ولافتات مكانية معمارية لمشروع Arabian Collection. تجمع الهوية بين مونوغرام 'AC' المنحوت والنسب المعمارية المعاصرة المنفذة كعمل فني أبيض عالي التباين على ألواح خشبية طولية.",
      creativeDirection: "Modern architectural refinement. Clean geometric typography paired with natural wood textures creates a serene, high-end atmosphere that translates seamlessly from digital collateral to physical space.",
      creativeDirection_ar: "أناقة معمارية حديثة تجمع بين دقة الخطوط الهندسية ودفء الخامات الخشبية الطبيعية لتوفير طابع راقٍ وهادئ ينتقل بسلاسة من الشاشات إلى المساحات الواقعية.",
      gallery: [
        {
          src: "assets/images/arabian-collection.jpg",
          caption: "Feature Installation — 3D cutout dimensional signage on architectural timber wall",
          caption_ar: "العمل الرئيسي — لافتة مجسمة ثلاثية الأبعاد مدمجة مع الجدار الخشبي المعماري"
        }
      ]
    },
    {
      id: "coolora-engine-protection",
      title: "Coolora: Engine Protection",
      title_ar: "Coolora: حماية المحرك",
      behanceUrl: "https://www.behance.net/gallery/235779659/COOLORA-(-BRAND-IDENTITY-)",
      subtitle: "Automotive Packaging Design & Commercial Campaign",
      subtitle_ar: "تصميم عبوات زيوت المحركات وحملة تجارية",
      category: "packaging",
      categoryLabel: "Packaging Design",
      categoryLabel_ar: "تصميم العبوات والتغليف",
      year: "2024",
      image: "assets/images/coolora.jpg",
      isPlaceholder: false,
      shortDescription: "Industrial packaging design, bottle label architecture, and advertising visual campaign for Coolora Radiator Coolant.",
      shortDescription_ar: "تصميم عبوات صناعية وتصميم ملصقات وهوية إعلانية لمنتجات سائل تبريد المحركات Coolora.",
      client: "Coolora Automotive",
      client_ar: "Coolora للسيارات",
      role: "Packaging Designer & Commercial Art Director",
      role_ar: "مصمم عبوات ومدير فني إعلاني",
      deliverables: ["Bottle Label Design (3 Variants)", "Typography & Icon System", "Bilingual Product Copywriting", "Station Launch Ad Key Visual"],
      deliverables_ar: ["تصميم ملصقات العبوات (3 فئات)", "نظام أيقونات وطباعة متكامل", "صياغة النصوص بلغتين", "المفتاح البصري لحملة الإطلاق"],
      overview: "Complete packaging label system and campaign key visual for Coolora's 5L radiator coolant lineup (Red, Blue, Green). The design pairs technical automotive icons with high-contrast glowing typography to establish instant brand recognition on retail shelves and service stations.",
      overview_ar: "نظام متكامل لتصميم عبوات سائل تبريد محركات السيارات Coolora سعة 5 لتر (الأحمر، الأزرق، الأخضر). يجمع التصميم بين أيقونات ميكانيكية دقيقة وطباعة مضيئة متباينة لتوفير تميز فوري على أرفف المتاجر ومحطات الخدمة.",
      creativeDirection: "High-performance industrial precision. Vibrant color-coded containers framed in a cinematic dark automotive workshop atmosphere, highlighting reliability and advanced engine cooling power.",
      creativeDirection_ar: "دقة صناعية عالية الأداء، بتوزيع لوني واضح وحيوي وسط أجواء تصوير سينمائية داكنة تعكس الاعتمادية وقوة التبريد المتطورة.",
      gallery: [
        {
          src: "assets/images/coolora.jpg",
          caption: "Packaging Lineup & Campaign Key Visual — 5L Red, Blue, and Green coolant bottles",
          caption_ar: "خط المنتجات والمفتاح البصري للحملة — عبوات سائل التبريد 5 لتر بالألوان الأحمر والأزرق والأخضر"
        }
      ]
    },
    {
      id: "broken-mold-room-art-space",
      title: "Broken Mold: Room Art Space",
      title_ar: "Broken Mold: روم آرت سبيس",
      behanceUrl: "https://www.behance.net/gallery/236004059/Poster-(-Broken-Mold-)",
      subtitle: "Billie Eilish Tribute Concert Poster & Key Visual",
      subtitle_ar: "بوستر حفل تحية لبيلي آيليش ومفتاح بصري",
      category: "posters",
      categoryLabel: "Posters & Key Visuals",
      categoryLabel_ar: "الملصقات والمفاتيح البصرية",
      year: "2024",
      image: "assets/images/broken-mold.png",
      isPlaceholder: false,
      shortDescription: "Dynamic concert key visual and live event poster for Broken Mold's Billie Eilish tribute show at Room Art Space New Cairo.",
      shortDescription_ar: "مفتاح بصري وملصق حفل موسيقي حي لفريق Broken Mold في قاعة Room Art Space بالقاهرة الجديدة.",
      client: "Room Art Space & Broken Mold Band",
      client_ar: "روم آرت سبيس وفرقة Broken Mold",
      role: "Key Visual Designer & Event Poster Artist",
      role_ar: "مصمم المفاتيح البصرية والملصقات الفنية",
      deliverables: ["Concert Poster Design", "Social Media Event Visuals", "Venue Digital Signage", "Print Promotion Sheets"],
      deliverables_ar: ["تصميم بوستر الحفل الموسيقي", "مرئيات الحملة لمنصات التواصل", "شاشات العرض الرقمية للمكان", "مطبوعات الدعاية الورقية"],
      overview: "Official event artwork designed for the Broken Mold live tribute concert at Room Art Space New Cairo. The poster combines vintage halftone textures, retro pop color blocks in teal and ochre, and high-energy band cutouts to capture the raw energy of live music.",
      overview_ar: "العمل الفني الرسمي لحفل فرقة Broken Mold في Room Art Space التجمع الخامس. يدمج الملصق بين ملامس الـ Halftone الكلاسيكية وكتل الألوان البوب المتباينة بالأزرق والأوكر لإبراز الحماس الحي للموسيقى.",
      creativeDirection: "Indie concert aesthetic with bold graphic punch. Expressive layout typography, duotone band photography, and tactile print textures engineered for both printed street flyposters and mobile screen feeds.",
      creativeDirection_ar: "طابع بوسترات موسيقى الإندي بلمسة جرافيكية قوية، وطباعة تجريبية معالجة لطباعة الشوارع والشاشات الرقمية.",
      gallery: [
        {
          src: "assets/images/broken-mold.png",
          caption: "Official Event Poster — Room Art Space New Cairo live concert key visual",
          caption_ar: "الملصق الرسمي للحدث — المفتاح البصري لحفل روم آرت سبيس بالقاهرة الجديدة"
        }
      ]
    },
    {
      id: "beyond-business-complex",
      title: "Beyond Business Complex",
      title_ar: "Beyond Business Complex",
      behanceUrl: "https://www.behance.net/gallery/130503421/Beyond-Logo",
      subtitle: "Commercial Hub & Real Estate Visual Identity",
      subtitle_ar: "هوية بصرية لمجمع أعمال ومركز تجاري",
      category: "branding",
      categoryLabel: "Brand Identity",
      categoryLabel_ar: "الهوية البصرية",
      year: "2024",
      image: "assets/images/beyond.png",
      isPlaceholder: false,
      shortDescription: "Architectural corporate branding and geometric visual identity designed for a premier commercial business hub.",
      shortDescription_ar: "هوية بصرية مؤسسية وشعار هندسي معماري مصمم لمجمع أعمال تجاري متطور.",
      client: "Beyond Business Complex",
      client_ar: "Beyond Business Complex",
      role: "Lead Visual Designer & Art Director",
      role_ar: "المصمم البصري الرئيسي والمدير الفني",
      deliverables: ["Architectural Brand Mark", "Corporate Wordmark System", "Signage Guidelines", "Marketing Presentation Collateral"],
      deliverables_ar: ["شعار معماري هندسي", "نظام كتابة وتطبيق الاسم التجاري", "إرشادات اللافتات المعمارية", "ملفات العروض التسويقية"],
      overview: "Comprehensive visual branding for the Beyond Business Complex development. The symbol abstracts architectural elevations and modern commercial structures into a strong, unified silhouette representing growth and forward-thinking enterprise.",
      overview_ar: "هوية بصرية شاملة لمجمع الأعمال Beyond Business Complex. يجسد الشعار الواجهات المعمارية والهياكل التجارية المعاصرة في خطوط هندسية قوية تعبر عن التوسع والريادة المؤسسية.",
      creativeDirection: "Minimalist geometric power. High-contrast white typography against a deep twilight purple backdrop gives the commercial complex a prestigious, commanding presence.",
      creativeDirection_ar: "قوة هندسية دقيقة تجمع بين التباين الأبيض النقي وخلفية بنفسجية ليلية عميقة لمنح مجمع الأعمال حضوراً مهيباً وراقياً.",
      gallery: [
        {
          src: "assets/images/beyond.png",
          caption: "Brand Mark & Key Visual — Beyond Business Complex logotype and architectural icon",
          caption_ar: "شعار العلامة والمفتاح البصري — الشعار اللفظي والأيقونة المعمارية لمجمع Beyond"
        }
      ]
    },
    {
      id: "broken-mold-countdown-night",
      title: "Broken Mold: Countdown Night",
      title_ar: "Broken Mold: ليلة العد التنازلي",
      behanceUrl: "https://www.behance.net/gallery/235778307/Billie-eilish-concert-poster-(Broken-mold)",
      subtitle: "Live Music Key Visual & New Year's Concert Poster",
      subtitle_ar: "مفتاح بصري وبوستر حفل رأس السنة",
      category: "music",
      categoryLabel: "Music & Entertainment",
      categoryLabel_ar: "الموسيقى والترفيه",
      year: "2024",
      image: "assets/images/billie-eilish.jpg",
      isPlaceholder: false,
      shortDescription: "Atmospheric live show poster and countdown celebration visual for Cedam'se Beirut featuring the Broken Mold band.",
      shortDescription_ar: "بوستر احتفالي وأجواء بصرية لعرض ليلة رأس السنة الموسيقي في بيروت لفرقة Broken Mold.",
      client: "Cedam'se Beirut / Broken Mold",
      client_ar: "سيدامس بيروت / Broken Mold",
      role: "Art Director & Poster Designer",
      role_ar: "مدير فني ومصمم بوسترات",
      deliverables: ["NYE Event Poster", "Artist Social Promo Kit", "Stage Display Graphics", "Story & Feed Visuals"],
      deliverables_ar: ["بوستر حفل ليلة رأس السنة", "حزمة ترويج الفنان لمنصات التواصل", "مرئيات شاشات المسرح", "تصاميم الستوري والمنشورات"],
      overview: "Nocturnal concert key visual crafted for Broken Mold's New Year's Eve performance in Beirut. Blending gold metallic script typography, textured charcoal backdrops, and monochrome musician photography to evoke an intimate festive celebration.",
      overview_ar: "مفتاح بصري ليلي لحفل فرقة Broken Mold في بيروت بمناسبة العام الجديد. يجمع بين خطوط ذهبية انسيابية وخلفيات فحمية حجرية وصور أحادية للفنانين لخلق طابع احتفالي حميمي.",
      creativeDirection: "Nocturnal celebration noir. Elegant gold script headlines paired with distressed stone textures and subtle holiday motifs, providing sophisticated live music atmosphere.",
      creativeDirection_ar: "أجواء احتفالية ليلية نوار، تعتمد على التباين الذهبي مع الملامس الحجرية الخشنة لتجسيد فخامة الموسيقى الحية.",
      gallery: [
        {
          src: "assets/images/billie-eilish.jpg",
          caption: "Concert Poster — Cedam'se Beirut New Year's Eve live music key visual",
          caption_ar: "بوستر الحفل — المفتاح البصري لحفل ليلة رأس السنة في سيدامس بيروت"
        }
      ]
    },
    {
      id: "al-saudi-calligraphy",
      title: "Al-Saudi Calligraphy Identity",
      title_ar: "هوية الخط العربي — السعودي",
      behanceUrl: "https://www.behance.net/gallery/159321001/Al-saudi-Logo",
      subtitle: "Bespoke Arabic Lettering & Apparel Branding",
      subtitle_ar: "خط عربي مخصص وتطريز للأزياء الراقية",
      category: "branding",
      categoryLabel: "Brand Identity",
      categoryLabel_ar: "الهوية البصرية",
      year: "2024",
      image: "assets/images/al-saudi.jpg",
      isPlaceholder: false,
      shortDescription: "Bespoke Arabic calligraphy emblem and tactile embroidered identity designed for premium apparel.",
      shortDescription_ar: "شعار خط عربي أصيل وتطريز بارز مصمم خصيصاً لماركة أزياء وملابس فاخرة.",
      client: "Al-Saudi (السعودي)",
      client_ar: "السعودي (Al-Saudi)",
      role: "Calligrapher & Visual Identity Designer",
      role_ar: "خطاط ومصمم هويات بصرية",
      deliverables: ["Custom Arabic Calligraphy Mark", "Embroidery Pattern Production", "Garment Tagging & Labels", "Textile Application Guidelines"],
      deliverables_ar: ["مخطوطة عربية مخصصة", "تجهيز باترون التطريز عالي الدقة", "تصميم بطاقات وتكتات الملابس", "دليل تطبيقات الأقمشة الفاخرة"],
      overview: "A bespoke calligraphic identity blending classical Arabic letterforms with modern garment embroidery techniques. The logo was engineered with dimensional thread density to ensure razor-sharp execution on heavy luxury cotton and twill fabrics.",
      overview_ar: "هوية خطية مخصصة تمزج بين جماليات الخط العربي الكلاسيكي وتقنيات تطريز الأقمشة العصرية. تم بناء الشعار بدقة هندسية عالية وكثافة خيوط مجسمة لتنفيذه بجودة فائقة على الأقطان الفاخرة وأقمشة التويل.",
      creativeDirection: "Contemporary heritage. Sculpted Arabic calligraphy rendered in silver-grey metallic stitching over muted moss fabric, expressing craft, prestige, and timeless Middle Eastern elegance.",
      creativeDirection_ar: "أصالة معاصرة تجمع بين الخط العربي المنحوت وتطريز الخيوط الفضية على خامات خضراء زيتية هادئة تعكس الحرفة والرقي والفخامة الشرقية.",
      gallery: [
        {
          src: "assets/images/al-saudi.jpg",
          caption: "Apparel Detail — Precision high-density embroidery on heavy olive twill fabric",
          caption_ar: "تفاصيل الملابس — تطريز بارز عالي الكثافة على نسيج تويل زيتي فاخر"
        }
      ]
    },
    {
      id: "svs-fintech-wallet",
      title: "SVS Fintech Wallet",
      title_ar: "محفظة SVS الرقمية (Fintech)",
      behanceUrl: "https://www.behance.net/gallery/235784159/SVS-WALLET-(SOCIAL-MEDIA)",
      subtitle: "Digital Campaign & App Social Media Visuals",
      subtitle_ar: "حملة رقمية ومرئيات تسويق التطبيق على السوشيال ميديا",
      category: "social",
      categoryLabel: "Social Media Design",
      categoryLabel_ar: "تصميم منصات التواصل",
      year: "2024",
      image: "assets/images/svs-wallet.jpg",
      isPlaceholder: false,
      shortDescription: "High-conversion social media campaign creative and mobile app showcase visual for SVS Fintech Wallet.",
      shortDescription_ar: "تصاميم إعلانية عالية التأثير لعرض تطبيق محفظة SVS المالية الرقمية على منصات التواصل.",
      client: "SVS Fintech",
      client_ar: "SVS للتكنولوجيا المالية",
      role: "Social Media Art Director & Campaign Designer",
      role_ar: "مدير فني للسوشيال ميديا ومصمم حملات",
      deliverables: ["Social Media Ad Creatives", "Mobile UI Showcase Mockup", "Campaign Typography System", "Performance Ad Variations"],
      deliverables_ar: ["تصاميم إعلانات السوشيال ميديا", "نموذج عرض واجهة التطبيق الموبايل", "نظام الخطوط والطباعة للحملة", "تنويعات إعلانات الأداء والتسويق"],
      overview: "Social media key visual designed for SVS Fintech's digital investment wallet launch. The composition pairs a sleek handheld mobile interface showcasing ROI and crypto earning features with dynamic market trading charts and an energetic split orange backdrop.",
      overview_ar: "مفتاح بصري لمنصات التواصل الاجتماعي لإطلاق المحفظة المالية الذكية SVS Fintech. يجمع التكوين بين واجهة تطبيق الهاتف التي تستعرض العوائد وميزات العملات الرقمية وبين الرسوم البيانية التفاعلية وخلفية برتقالية حيوية.",
      creativeDirection: "High-impact financial technology aesthetic. Bold sans-serif typography, vibrant corporate orange contrasts, and polished device staging designed to maximize feed engagement and trust.",
      creativeDirection_ar: "جماليات التكنولوجيا المالية الحديثة (Fintech) بطباعة عريضة وتباينات برتقالية مميزة لعرض الجهاز بطريقة تعزز الثقة وتجذب الانتباه.",
      gallery: [
        {
          src: "assets/images/svs-wallet.jpg",
          caption: "Social Media Campaign Visual — 'The Future of Fintech is Here' handheld mobile ad",
          caption_ar: "مرئيات حملة منصات التواصل — إعلان الهاتف المحمول 'مستقبل التكنولوجيا المالية هنا'"
        }
      ]
    },
    {
      id: "neverland-entertainment",
      title: "Neverland Entertainment",
      title_ar: "مدينة نيفرلاند الترفيهية",
      behanceUrl: "https://www.behance.net/gallery/126646335/Neverland-(-Amusement-Park-)",
      subtitle: "Thematic Identity & Environmental Signage",
      subtitle_ar: "هوية بصرية موضوعية ولافتات مكانية",
      category: "campaigns",
      categoryLabel: "Advertising & Campaigns",
      categoryLabel_ar: "الإعلانات والحملات",
      year: "2024",
      image: "assets/images/neverland.jpg",
      isPlaceholder: false,
      shortDescription: "Vibrant amusement park signage concept and playful environmental identity for Neverland.",
      shortDescription_ar: "مفهوم لافتات مجسمة وهوية مرحة لمدينة الملاهي الترفيهية Neverland.",
      client: "Neverland Entertainment",
      client_ar: "نيفرلاند للترفيه",
      role: "Brand & Environmental Graphic Designer",
      role_ar: "مصمم الهوية واللافتات المكانية",
      deliverables: ["Thematic Logo Signage", "Color Architecture", "Environmental Wayfinding Concept", "Promotional Graphic Assets"],
      deliverables_ar: ["شعار ولافتات ترفيهية مميزة", "منظومة الألوان الحيوية", "مفهوم الإرشاد وتوجيه الزوار", "أصول المواد الرسومية الترويجية"],
      overview: "Environmental identity and iconic dimensional signage concept designed for Neverland entertainment park. The logo integrates dynamic roller coaster curves and ferris wheel geometries into a bold, electric neon silhouette.",
      overview_ar: "هوية مكانية ومفهوم لافتات مجسمة أيقونية لمدينة ملاهي Neverland. يدمج الشعار بين منحنيات قطار الموت الدوار وهندسة عجلة الملاهي في خطوط نيون جريئة ومبهجة.",
      creativeDirection: "Bold pop energy against raw urban architectural surfaces. Saturated magenta and electric violet create an unmistakable, high-impact presence on architectural concrete.",
      creativeDirection_ar: "طاقة بوب حيوية تتباين بجرأة مع الأسطح الخرسانية الحضرية، بألوان الماجينتا والبنفسجي الكهربائي لتشكيل علامة لا تخطئها العين.",
      gallery: [
        {
          src: "assets/images/neverland.jpg",
          caption: "Dimensional Signage Mockup — Neverland vibrant neon signage on architectural concrete",
          caption_ar: "نموذج اللافتة المجسمة — لافتة نيون حيوية لـ Neverland على خلفية خرسانية معمارية"
        }
      ]
    }
  ],

  // Creative Services
  services: [
    {
      id: "01",
      name: "Brand Identity",
      name_ar: "الهوية البصرية",
      tagline: "Distilling core vision into enduring visual systems.",
      tagline_ar: "صياغة الرؤية الجوهرية في أنظمة بصرية خالدة.",
      description: "Comprehensive visual identity creation tailored to stand apart in crowded markets. From custom wordmarks and comprehensive brand books to color architecture and tactile stationery.",
      description_ar: "بناء هويات بصرية شاملة ومتميزة تضمن التفرد في الأسواق المزدحمة؛ بدءاً من تصميم الشعارات المبتكرة وكتب الهوية الكاملة، وصولاً إلى منظومة الألوان والمطبوعات الفاخرة.",
      deliverables: [
        "Logo Systems & Monograms",
        "Visual Identity Guidelines",
        "Color Architecture & Typography Systems",
        "Brand Collateral & Stationery",
        "Digital & Print Asset Libraries"
      ],
      deliverables_ar: [
        "أنظمة الشعارات والمونوغرام",
        "أدلة إرشادات الهوية البصرية",
        "منظومة الألوان وهندسة الخطوط",
        "المطبوعات والأوراق الرسمية",
        "مكتبة الأصول الرقمية والطباعية"
      ]
    },
    {
      id: "02",
      name: "Art Direction",
      name_ar: "الإدارة الفنية",
      tagline: "Setting the aesthetic vision and emotional tone.",
      tagline_ar: "تحديد الرؤية الجمالية والنبرة الشعورية للمشاريع.",
      description: "Guiding the holistic visual narrative across campaigns, editorial releases, and commercial products. Ensuring every creative touchpoint harmonizes under a singular, compelling creative vision.",
      description_ar: "توجيه السرد البصري الشامل للحملات، والإصدارات التحريرية، والمنتجات التجارية، لضمان تناغم كافة نقاط الاتصال الإبداعية تحت مظلة رؤية موحدة وراسخة.",
      deliverables: [
        "Creative & Mood Concepts",
        "Photoshoot & Video Direction",
        "Editorial Layout Systems",
        "Campaign Visual Language",
        "Aesthetic Curation & Tone of Voice"
      ],
      deliverables_ar: [
        "المفاهيم الإبداعية ولوحات المزاج البصري",
        "توجيه جلسات التصوير والفيديو",
        "أنظمة التصميم التحريري والنشر",
        "اللغة البصرية للحملات الإعلانية",
        "تنسيق الطابع الجمالي ونبرة الصوت"
      ]
    },
    {
      id: "03",
      name: "Social Media Design",
      name_ar: "تصميم منصات التواصل",
      tagline: "Elevating digital feeds into editorial experiences.",
      tagline_ar: "الارتقاء بالخلاصات الرقمية إلى تجارب بصرية تحريرية.",
      description: "High-impact social architectures that escape the generic template look. Crafting multi-slide carousel narratives, launch graphics, and aesthetic grid systems that command attention.",
      description_ar: "بناء قوالب وتصاميم سوشيال ميديا متميزة ومبتكرة تبتعد عن القوالب الجاهزة؛ من تصاميم الكاروسيل التفاعلية إلى إعلانات الإطلاق وبناء هوية الحساب الجذابة.",
      deliverables: [
        "Bespoke Feed & Grid Architecture",
        "Story & Carousel Narrative Systems",
        "Launch & Product Drop Creatives",
        "Animated Typography Templates",
        "Platform-Optimized Content Suites"
      ],
      deliverables_ar: [
        "تصميم بنية الحساب والخلاصات المخصصة",
        "سرديات الستوري والكاروسيل التفاعلي",
        "تصاميم إطلاق المنتجات والفعاليات",
        "قوالب الطباعة المتحركة",
        "حزم محتوى مهيأة لمختلف المنصات"
      ]
    },
    {
      id: "04",
      name: "Advertising & Campaigns",
      name_ar: "الإعلانات والحملات",
      tagline: "Bold, unignorable concepts for public and digital spaces.",
      tagline_ar: "أفكار إعلانية جريئة لا يمكن تجاهلها في المساحات العامة والرقمية.",
      description: "Campaign visuals designed to halt scrollers and captivate pedestrians. From monumental out-of-home billboards to multi-channel digital performance creatives built with artistic rigor.",
      description_ar: "مرئيات حملات مصممة لإيقاف التمرير وإبهار الجمهور؛ بدءاً من إعلانات الطرق واللوحات الضخمة إلى الحملات الرقمية متعددة القنوات المصنوعة بحرفية فنية دقيقة.",
      deliverables: [
        "Out-of-Home (OOH) Billboards & Posters",
        "Digital Display Ad Suites",
        "Event & Launch Key Visuals",
        "Urban Transit & Street Postering",
        "Multi-Platform Campaign Toolkits"
      ],
      deliverables_ar: [
        "لوحات الطرق الإعلانية والبوسترات (OOH)",
        "حزم الإعلانات الرقمية والشاشات",
        "المفاتيح البصرية لإطلاق الفعاليات",
        "إعلانات وسائل النقل وبوسترات الشوارع",
        "مجموعات أدوات الحملات متعددة المنصات"
      ]
    },
    {
      id: "05",
      name: "Packaging Design",
      name_ar: "تصميم العبوات والتغليف",
      tagline: "Tactile, physical experiences that delight upon unboxing.",
      tagline_ar: "تجارب ملموسة تُبهج العميل منذ لحظة فتح العبوة.",
      description: "Transforming everyday objects into covetable physical artifacts. Structural packaging, bespoke bottle designs, luxury box dielines, label typography, and specialized print finishes.",
      description_ar: "تحويل المنتجات اليومية إلى قطع فنية ملموسة ومرغوبة؛ من تصميم الهيكل الخارجي للعبوات والزجاجات الفاخرة إلى خطوط الملصقات واللمسات الطباعية الخاصة.",
      deliverables: [
        "Primary Container & Bottle Design",
        "Secondary Box & Unboxing Architecture",
        "Label Typography & Embellishment Specs",
        "Tactile Finishes (Foil, Emboss, Spot UV)",
        "Production-Ready Dielines & 3D Mockups"
      ],
      deliverables_ar: [
        "تصميم العبوات الأساسية والزجاجات",
        "تصميم الصناديق وتجربة فتح العبوة (Unboxing)",
        "مواصفات طباعة الملصقات والزخارف",
        "التشطيبات الفاخرة (بصمة، نقش بارز، ورنيش موضعي)",
        "مخططات القص (Dielines) والنماذج ثلاثية الأبعاد"
      ]
    },
    {
      id: "06",
      name: "Music & Entertainment Visuals",
      name_ar: "مرئيات الموسيقى والترفيه",
      tagline: "Worldbuilding for sound, performance, and culture.",
      tagline_ar: "بناء عوالم بصرية للصوت والأداء والثقافة الفنية.",
      description: "Translating musical mood into iconic visual artwork. Album covers, vinyl gatefold editions, streaming digital suites, tour key visuals, and artist merchandise that connect deeply with fans.",
      description_ar: "ترجمة الأحاسيس الموسيقية إلى أعمال بصرية أيقونية؛ أغطية الألبومات، عبوات أسطوانات الفينيل، مرئيات منصات البث الرقمي، وبوسترات الجولات الغنائية التي ترتبط بالجمهور.",
      deliverables: [
        "Album & Single Artwork",
        "Vinyl & CD Physical Packaging",
        "Streaming Canvas & Motion Visuals",
        "Tour Posters & Stage Backdrops",
        "Artist Merch & Apparel Graphics"
      ],
      deliverables_ar: [
        "تصميم أغلفة الألبومات والأغاني المنفردة",
        "تغليف أسطوانات الفينيل والأقراص المدمجة",
        "مرئيات كانفاس وحركات منصات البث الرقمي",
        "بوسترات الجولات الغنائية وخلفيات المسرح",
        "تصاميم منتجات وملابس الفنانين الرسمية"
      ]
    },
    {
      id: "07",
      name: "AI Creative Production",
      name_ar: "الإنتاج الإبداعي بالذكاء الاصطناعي",
      tagline: "Accelerating imagination with modern generative tools.",
      tagline_ar: "توسيع آفاق الخيال بالأدوات التوليدية الحديثة.",
      description: "Harnessing cutting-edge AI generative models to explore rapid concept iterations, synthesize impossible visual worlds, and augment traditional design craftsmanship with future-ready efficiency.",
      description_ar: "توظيف أحدث نماذج الذكاء الاصطناعي لاستكشاف مفاهيم بصرية غير مسبوقة، وتخليق عوالم مستحيلة، ودمجها مع أساسيات التصميم التقليدي لرفع كفاءة الإنتاج الإبداعي.",
      deliverables: [
        "Generative Concept Exploration",
        "Synthetic Art Direction & Worldbuilding",
        "High-Resolution Visual Upscaling",
        "Hybrid 2D/3D + AI Workflows",
        "Custom Visual Prompting & Styling"
      ],
      deliverables_ar: [
        "استكشاف المفاهيم التوليدية السريعة",
        "الإدارة الفنية الاصطناعية وبناء العوالم",
        "ترقية دقة وتفاصيل الصور بجودة فائقة",
        "سير عمل هجين يجمع 2D / 3D والذكاء الاصطناعي",
        "أوامر توجيه وصياغة بصرية مخصصة"
      ]
    }
  ]
};

// Export for usage in browser or module environments
if (typeof module !== "undefined" && module.exports) {
  module.exports = PORTFOLIO_CONFIG;
}
