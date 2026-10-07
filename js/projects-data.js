/**
 * MOHAMMED ESMAIL — PORTFOLIO DATA CONFIGURATION
 * -------------------------------------------------------------
 * Graphic Designer & Visual Creative | Cairo, Egypt
 * 
 * INSTRUCTIONS FOR MOHAMMED:
 * You can easily update your projects, descriptions, categories,
 * client roster, and contact info directly in this file.
 * 
 * Replace placeholder images in `/assets/images/` with your real work,
 * or update the `image` paths below.
 */

const PORTFOLIO_CONFIG = {
  designer: {
    name: "MOHAMMED ESMAIL",
    role: "Graphic Designer & Visual Creative",
    location: "Cairo, Egypt",
    timezone: "Africa/Cairo",
    statement: "I turn ideas into visual identities, campaigns, and experiences that people remember.",
    email: "Mohammedesmailofficial@gmail.com",
    social: {
      behance: "https://www.behance.net/muhammedesmail",
      youtube: "https://www.youtube.com/@MohammedEsmailOfficial/"
    },
    status: {
      available: true,
      label: "Available for select commissions & art direction"
    }
  },

  // Project Categories used for filtering
  categories: [
    { id: "all", label: "All Works" },
    { id: "branding", label: "Brand Identity" },
    { id: "campaigns", label: "Advertising & Campaigns" },
    { id: "posters", label: "Posters & Key Visuals" },
    { id: "music", label: "Music & Entertainment" },
    { id: "packaging", label: "Packaging Design" },
    { id: "social", label: "Social Media Design" },
    { id: "ai", label: "AI Creative Production" }
  ],

  // Selected Projects Showcase
  // All projects are displayed continuously on the main page without pagination.
  // Any new project added to this array in the future will automatically appear
  // underneath the previous projects on the same page.
  projects: [
    {
      id: "arabian-collection",
      title: "Arabian Collection",
      behanceUrl: "https://www.behance.net/gallery/235780351/Arabian-Collectio-Logo",
      subtitle: "Architectural Monogram & Environmental Identity",
      category: "branding",
      categoryLabel: "Brand Identity",
      year: "2024",
      image: "assets/images/arabian-collection.jpg",
      isPlaceholder: false,
      shortDescription: "Sculpted 3D monogram identity and architectural interior signage crafted for an exclusive boutique collection.",
      client: "Arabian Collection",
      role: "Brand Identity & Spatial Graphic Designer",
      deliverables: ["Monogram Icon & Wordmark", "3D Wall Signage Specifications", "Environmental Branding", "Brand Guidelines"],
      overview: "Visual identity and architectural spatial signage developed for Arabian Collection. The identity blends a sculpted 'AC' monogram with contemporary architectural proportions, realized as a high-contrast white 3D installation against natural vertical fluted timber slats.",
      creativeDirection: "Modern architectural refinement. Clean geometric typography paired with natural wood textures creates a serene, high-end atmosphere that translates seamlessly from digital collateral to physical space.",
      gallery: [
        {
          src: "assets/images/arabian-collection.jpg",
          caption: "Feature Installation — 3D cutout dimensional signage on architectural timber wall"
        }
      ]
    },
    {
      id: "coolora-engine-protection",
      title: "Coolora: Engine Protection",
      behanceUrl: "https://www.behance.net/gallery/235779659/COOLORA-(-BRAND-IDENTITY-)",
      subtitle: "Automotive Packaging Design & Commercial Campaign",
      category: "packaging",
      categoryLabel: "Packaging Design",
      year: "2024",
      image: "assets/images/coolora.jpg",
      isPlaceholder: false,
      shortDescription: "Industrial packaging design, bottle label architecture, and advertising visual campaign for Coolora Radiator Coolant.",
      client: "Coolora Automotive",
      role: "Packaging Designer & Commercial Art Director",
      deliverables: ["Bottle Label Design (3 Variants)", "Typography & Icon System", "Bilingual Product Copywriting", "Station Launch Ad Key Visual"],
      overview: "Complete packaging label system and campaign key visual for Coolora's 5L radiator coolant lineup (Red, Blue, Green). The design pairs technical automotive icons with high-contrast glowing typography to establish instant brand recognition on retail shelves and service stations.",
      creativeDirection: "High-performance industrial precision. Vibrant color-coded containers framed in a cinematic dark automotive workshop atmosphere, highlighting reliability and advanced engine cooling power.",
      gallery: [
        {
          src: "assets/images/coolora.jpg",
          caption: "Packaging Lineup & Campaign Key Visual — 5L Red, Blue, and Green coolant bottles"
        }
      ]
    },
    {
      id: "broken-mold-room-art-space",
      title: "Broken Mold: Room Art Space",
      behanceUrl: "https://www.behance.net/gallery/236004059/Poster-(-Broken-Mold-)",
      subtitle: "Billie Eilish Tribute Concert Poster & Key Visual",
      category: "posters",
      categoryLabel: "Posters & Key Visuals",
      year: "2024",
      image: "assets/images/broken-mold.png",
      isPlaceholder: false,
      shortDescription: "Dynamic concert key visual and live event poster for Broken Mold's Billie Eilish tribute show at Room Art Space New Cairo.",
      client: "Room Art Space & Broken Mold Band",
      role: "Key Visual Designer & Event Poster Artist",
      deliverables: ["Concert Poster Design", "Social Media Event Visuals", "Venue Digital Signage", "Print Promotion Sheets"],
      overview: "Official event artwork designed for the Broken Mold live tribute concert at Room Art Space New Cairo. The poster combines vintage halftone textures, retro pop color blocks in teal and ochre, and high-energy band cutouts to capture the raw energy of live music.",
      creativeDirection: "Indie concert aesthetic with bold graphic punch. Expressive layout typography, duotone band photography, and tactile print textures engineered for both printed street flyposters and mobile screen feeds.",
      gallery: [
        {
          src: "assets/images/broken-mold.png",
          caption: "Official Event Poster — Room Art Space New Cairo live concert key visual"
        }
      ]
    },
    {
      id: "beyond-business-complex",
      title: "Beyond Business Complex",
      behanceUrl: "https://www.behance.net/gallery/130503421/Beyond-Logo",
      subtitle: "Commercial Hub & Real Estate Visual Identity",
      category: "branding",
      categoryLabel: "Brand Identity",
      year: "2024",
      image: "assets/images/beyond.png",
      isPlaceholder: false,
      shortDescription: "Architectural corporate branding and geometric visual identity designed for a premier commercial business hub.",
      client: "Beyond Business Complex",
      role: "Lead Visual Designer & Art Director",
      deliverables: ["Architectural Brand Mark", "Corporate Wordmark System", "Signage Guidelines", "Marketing Presentation Collateral"],
      overview: "Comprehensive visual branding for the Beyond Business Complex development. The symbol abstracts architectural elevations and modern commercial structures into a strong, unified silhouette representing growth and forward-thinking enterprise.",
      creativeDirection: "Minimalist geometric power. High-contrast white typography against a deep twilight purple backdrop gives the commercial complex a prestigious, commanding presence.",
      gallery: [
        {
          src: "assets/images/beyond.png",
          caption: "Brand Mark & Key Visual — Beyond Business Complex logotype and architectural icon"
        }
      ]
    },
    {
      id: "broken-mold-countdown-night",
      title: "Broken Mold: Countdown Night",
      behanceUrl: "https://www.behance.net/gallery/235778307/Billie-eilish-concert-poster-(Broken-mold)",
      subtitle: "Live Music Key Visual & New Year's Concert Poster",
      category: "music",
      categoryLabel: "Music & Entertainment",
      year: "2024",
      image: "assets/images/billie-eilish.jpg",
      isPlaceholder: false,
      shortDescription: "Atmospheric live show poster and countdown celebration visual for Cedam'se Beirut featuring the Broken Mold band.",
      client: "Cedam'se Beirut / Broken Mold",
      role: "Art Director & Poster Designer",
      deliverables: ["NYE Event Poster", "Artist Social Promo Kit", "Stage Display Graphics", "Story & Feed Visuals"],
      overview: "Nocturnal concert key visual crafted for Broken Mold's New Year's Eve performance in Beirut. Blending gold metallic script typography, textured charcoal backdrops, and monochrome musician photography to evoke an intimate festive celebration.",
      creativeDirection: "Nocturnal celebration noir. Elegant gold script headlines paired with distressed stone textures and subtle holiday motifs, providing sophisticated live music atmosphere.",
      gallery: [
        {
          src: "assets/images/billie-eilish.jpg",
          caption: "Concert Poster — Cedam'se Beirut New Year's Eve live music key visual"
        }
      ]
    },
    {
      id: "al-saudi-calligraphy",
      title: "Al-Saudi Calligraphy Identity",
      behanceUrl: "https://www.behance.net/gallery/159321001/Al-saudi-Logo",
      subtitle: "Bespoke Arabic Lettering & Apparel Branding",
      category: "branding",
      categoryLabel: "Brand Identity",
      year: "2024",
      image: "assets/images/al-saudi.jpg",
      isPlaceholder: false,
      shortDescription: "Bespoke Arabic calligraphy emblem and tactile embroidered identity designed for premium apparel.",
      client: "Al-Saudi (السعودي)",
      role: "Calligrapher & Visual Identity Designer",
      deliverables: ["Custom Arabic Calligraphy Mark", "Embroidery Pattern Production", "Garment Tagging & Labels", "Textile Application Guidelines"],
      overview: "A bespoke calligraphic identity blending classical Arabic letterforms with modern garment embroidery techniques. The logo was engineered with dimensional thread density to ensure razor-sharp execution on heavy luxury cotton and twill fabrics.",
      creativeDirection: "Contemporary heritage. Sculpted Arabic calligraphy rendered in silver-grey metallic stitching over muted moss fabric, expressing craft, prestige, and timeless Middle Eastern elegance.",
      gallery: [
        {
          src: "assets/images/al-saudi.jpg",
          caption: "Apparel Detail — Precision high-density embroidery on heavy olive twill fabric"
        }
      ]
    },
    {
      id: "svs-fintech-wallet",
      title: "SVS Fintech Wallet",
      behanceUrl: "https://www.behance.net/gallery/235784159/SVS-WALLET-(SOCIAL-MEDIA)",
      subtitle: "Digital Campaign & App Social Media Visuals",
      category: "social",
      categoryLabel: "Social Media Design",
      year: "2024",
      image: "assets/images/svs-wallet.jpg",
      isPlaceholder: false,
      shortDescription: "High-conversion social media campaign creative and mobile app showcase visual for SVS Fintech Wallet.",
      client: "SVS Fintech",
      role: "Social Media Art Director & Campaign Designer",
      deliverables: ["Social Media Ad Creatives", "Mobile UI Showcase Mockup", "Campaign Typography System", "Performance Ad Variations"],
      overview: "Social media key visual designed for SVS Fintech's digital investment wallet launch. The composition pairs a sleek handheld mobile interface showcasing ROI and crypto earning features with dynamic market trading charts and an energetic split orange backdrop.",
      creativeDirection: "High-impact financial technology aesthetic. Bold sans-serif typography, vibrant corporate orange contrasts, and polished device staging designed to maximize feed engagement and trust.",
      gallery: [
        {
          src: "assets/images/svs-wallet.jpg",
          caption: "Social Media Campaign Visual — 'The Future of Fintech is Here' handheld mobile ad"
        }
      ]
    },
    {
      id: "neverland-entertainment",
      title: "Neverland Entertainment",
      behanceUrl: "https://www.behance.net/gallery/126646335/Neverland-(-Amusement-Park-)",
      subtitle: "Thematic Identity & Environmental Signage",
      category: "campaigns",
      categoryLabel: "Advertising & Campaigns",
      year: "2024",
      image: "assets/images/neverland.jpg",
      isPlaceholder: false,
      shortDescription: "Vibrant amusement park signage concept and playful environmental identity for Neverland.",
      client: "Neverland Entertainment",
      role: "Brand & Environmental Graphic Designer",
      deliverables: ["Thematic Logo Signage", "Color Architecture", "Environmental Wayfinding Concept", "Promotional Graphic Assets"],
      overview: "Environmental identity and iconic dimensional signage concept designed for Neverland entertainment park. The logo integrates dynamic roller coaster curves and ferris wheel geometries into a bold, electric neon silhouette.",
      creativeDirection: "Bold pop energy against raw urban architectural surfaces. Saturated magenta and electric violet create an unmistakable, high-impact presence on architectural concrete.",
      gallery: [
        {
          src: "assets/images/neverland.jpg",
          caption: "Dimensional Signage Mockup — Neverland vibrant neon signage on architectural concrete"
        }
      ]
    }
  ],

  // Services as requested by user
  services: [
    {
      id: "01",
      name: "Brand Identity",
      tagline: "Distilling core vision into enduring visual systems.",
      description: "Comprehensive visual identity creation tailored to stand apart in crowded markets. From custom wordmarks and comprehensive brand books to color architecture and tactile stationery.",
      deliverables: [
        "Logo Systems & Monograms",
        "Visual Identity Guidelines",
        "Color Architecture & Typography Systems",
        "Brand Collateral & Stationery",
        "Digital & Print Asset Libraries"
      ]
    },
    {
      id: "02",
      name: "Art Direction",
      tagline: "Setting the aesthetic vision and emotional tone.",
      description: "Guiding the holistic visual narrative across campaigns, editorial releases, and commercial products. Ensuring every creative touchpoint harmonizes under a singular, compelling creative vision.",
      deliverables: [
        "Creative & Mood Concepts",
        "Photoshoot & Video Direction",
        "Editorial Layout Systems",
        "Campaign Visual Language",
        "Aesthetic Curation & Tone of Voice"
      ]
    },
    {
      id: "03",
      name: "Social Media Design",
      tagline: "Elevating digital feeds into editorial experiences.",
      description: "High-impact social architectures that escape the generic template look. Crafting multi-slide carousel narratives, launch graphics, and aesthetic grid systems that command attention.",
      deliverables: [
        "Bespoke Feed & Grid Architecture",
        "Story & Carousel Narrative Systems",
        "Launch & Product Drop Creatives",
        "Animated Typography Templates",
        "Platform-Optimized Content Suites"
      ]
    },
    {
      id: "04",
      name: "Advertising & Campaigns",
      tagline: "Bold, unignorable concepts for public and digital spaces.",
      description: "Campaign visuals designed to halt scrollers and captivate pedestrians. From monumental out-of-home billboards to multi-channel digital performance creatives built with artistic rigor.",
      deliverables: [
        "Out-of-Home (OOH) Billboards & Posters",
        "Digital Display Ad Suites",
        "Event & Launch Key Visuals",
        "Urban Transit & Street Postering",
        "Multi-Platform Campaign Toolkits"
      ]
    },
    {
      id: "05",
      name: "Packaging Design",
      tagline: "Tactile, physical experiences that delight upon unboxing.",
      description: "Transforming everyday objects into covetable physical artifacts. Structural packaging, bespoke bottle designs, luxury box dielines, label typography, and specialized print finishes.",
      deliverables: [
        "Primary Container & Bottle Design",
        "Secondary Box & Unboxing Architecture",
        "Label Typography & Embellishment Specs",
        "Tactile Finishes (Foil, Emboss, Spot UV)",
        "Production-Ready Dielines & 3D Mockups"
      ]
    },
    {
      id: "06",
      name: "Music & Entertainment Visuals",
      tagline: "Worldbuilding for sound, performance, and culture.",
      description: "Translating musical mood into iconic visual artwork. Album covers, vinyl gatefold editions, streaming digital suites, tour key visuals, and artist merchandise that connect deeply with fans.",
      deliverables: [
        "Album & Single Artwork",
        "Vinyl & CD Physical Packaging",
        "Streaming Canvas & Motion Visuals",
        "Tour Posters & Stage Backdrops",
        "Artist Merch & Apparel Graphics"
      ]
    },
    {
      id: "07",
      name: "AI Creative Production",
      tagline: "Accelerating imagination with modern generative tools.",
      description: "Harnessing cutting-edge AI generative models to explore rapid concept iterations, synthesize impossible visual worlds, and augment traditional design craftsmanship with future-ready efficiency.",
      deliverables: [
        "Generative Concept Exploration",
        "Synthetic Art Direction & Worldbuilding",
        "High-Resolution Visual Upscaling",
        "Hybrid 2D/3D + AI Workflows",
        "Custom Visual Prompting & Styling"
      ]
    }
  ],

  // Clients & Collaborations
  // NOTE: In strict accordance with your instruction, no fake client names or awards are invented.
  // Mohammed can replace these placeholders with his real clients and brand partners!
  clientsNotice: {
    title: "Selected Collaborations & Brand Partners",
    subtitle: "Open for selective commissions with ambitious brands, independent music artists, studios, and founders in Cairo and worldwide.",
    helperText: "Mohammed: You can easily add your real clients and agency partners in js/projects-data.js to display them here."
  },

  clientSlots: [
    { id: 1, label: "[Brand Partner / Studio Slot 01]", category: "Fashion & Lifestyle" },
    { id: 2, label: "[Brand Partner / Studio Slot 02]", category: "Music & Record Label" },
    { id: 3, label: "[Brand Partner / Studio Slot 03]", category: "Cultural Institution / Art" },
    { id: 4, label: "[Brand Partner / Studio Slot 04]", category: "Hospitality & Dining" },
    { id: 5, label: "[Brand Partner / Studio Slot 05]", category: "Tech & Innovation" },
    { id: 6, label: "[Brand Partner / Studio Slot 06]", category: "Beauty & Fragrance" }
  ]
};

// Export for usage in browser or module environments
if (typeof module !== "undefined" && module.exports) {
  module.exports = PORTFOLIO_CONFIG;
}
