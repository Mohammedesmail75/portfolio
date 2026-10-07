# Mohammed Esmail — Portfolio Website
### Graphic Designer & Visual Creative | Cairo, Egypt

A bespoke, cinematic, modern, minimal, and high-end personal portfolio website built specifically for **Mohammed Esmail**. Crafted with the feeling of an experienced visual designer and art director rather than a generic freelancer template.

---

## 🌟 Key Features

1. **Dark Cinematic Interface**:
   - Deep obsidian and charcoal palettes (`#070709`, `#121216`) paired with refined warm gold accents (`#c8aa7a`).
   - Tactile film grain overlay for a physical, print-editorial finish.
   - Smooth custom magnetic cursor tracking with context-aware states (changes to `VIEW` when hovering artwork).

2. **Hero Section**:
   - Monolithic editorial typography with staggered hierarchy.
   - **"MOHAMMED ESMAIL"**
   - **"Graphic Designer & Visual Creative"**
   - Statement: *"I turn ideas into visual identities, campaigns, and experiences that people remember."*
   - Live Cairo time badge (`CAIRO HH:MM:SS UTC+2`) updating dynamically every second.
   - Status badge: *"Available for select commissions"*.
   - Subtle CTA: *"View Selected Work"* + *"Get in Touch"*.
   - Infinite marquee ribbon cycling through Mohammed's disciplines.

3. **Selected Work**:
   - Curated showcase of Mohammed's real portfolio projects, connecting directly to his verified Behance case study pages:
     - **Arabian Collection** (*Brand Identity*)
     - **Coolora: Engine Protection** (*Packaging Design*)
     - **Broken Mold: Room Art Space** (*Posters & Key Visuals*)
     - **Beyond Business Complex** (*Brand Identity*)
     - **Broken Mold: Countdown Night** (*Music & Entertainment*)
     - **Al-Saudi Calligraphy Identity** (*Brand Identity*)
     - **SVS Fintech Wallet** (*Social Media Design*)
     - **Neverland Entertainment** (*Advertising & Campaigns*)
   - All projects are rendered continuously on a single scrollable page without pagination.
   - Interactive category filter tabs.
   - Full-card click navigation directly opening the corresponding Behance project in a new tab.

4. **About Section**:
   - Confident, creative, human, non-corporate introduction reflecting a visual designer based in Cairo, Egypt.
   - Strategic pillars: *Visual Storytelling & Cultural Depth*, *Obsessive Art Direction & Craft*, and *Modern AI-Assisted Workflows*.
   - Quick links to Behance and YouTube.

5. **Creative Services (01 to 07)**:
   - Interactive accordion cards for all 7 disciplines:
     1. Brand Identity
     2. Art Direction
     3. Social Media Design
     4. Advertising & Campaigns
     5. Packaging Design
     6. Music & Entertainment Visuals
     7. AI Creative Production
   - Itemized scopes of work and deliverables.

6. **Clients & Collaborations**:
   - Elegant placeholder slots clearly labeled for Mohammed to insert his real clients, brand partners, and studio collaborators (no fake client names or awards invented).
   - In-page prompt and guide for updating client logos.

7. **Contact Section**:
   - Statement: *"Have an idea? Let's create something memorable."*
   - One-click copy email button with feedback toast.
   - Direct links to Behance (`https://www.behance.net/muhammedesmail`) and YouTube (`https://www.youtube.com/@MohammedEsmailOfficial/`).
   - Interactive project inquiry form with area of interest dropdown and email client launcher.
   - Studio base indicator: Cairo, Egypt with real-time clock.

---

## 📂 Project Architecture

```
mohammed-esmail-portfolio/
├── index.html                 # Semantic, accessible HTML5 structure & SEO tags
├── css/
│   └── style.css              # Dark cinematic design system & typography
├── js/
│   ├── projects-data.js       # Central data file (projects, services, clients, contacts)
│   └── main.js                # Interactions, filters, modal, cursor, clock, forms
├── assets/
│   ├── images/                # High-resolution artwork previews & mockups
│   └── icons/                 # SVG graphics
├── server.js                  # Zero-dependency local Node preview server
└── README.md                  # Customization guide & documentation
```

---

## 🚀 How to Run Locally

### Option 1: Using the built-in Node server
Run in terminal:
```bash
node server.js
```
Then open: **`http://localhost:3000`**

### Option 2: Direct browser opening or VS Code Live Server
Because this project is built as a zero-dependency static site, you can also open `index.html` directly in any web browser or use VS Code's "Open with Live Server" extension.

---

## ✏️ How to Customize Your Portfolio

### 1. Replacing Artwork Images
1. Export your designs as high-quality JPG, PNG, or WebP files.
2. Save them into `assets/images/` (e.g. `assets/images/my-project-1.jpg`).
3. Open `js/projects-data.js` and update the `image` field for that project.
4. Set `isPlaceholder: false` once you replace it with your real work.

### 2. Adding / Editing Projects
Open `js/projects-data.js`. You will find the `PORTFOLIO_CONFIG.projects` array. Each project looks like this:

```javascript
{
  id: "my-project-id",
  title: "Project Title",
  subtitle: "Brief subtitle",
  category: "branding", // branding | campaigns | posters | music | packaging | social | ai
  categoryLabel: "Brand Identity",
  year: "2024",
  image: "assets/images/my-image.jpg",
  isPlaceholder: false,
  shortDescription: "One-sentence overview of the project.",
  client: "Client Name",
  role: "Lead Designer & Art Director",
  deliverables: ["Logo System", "Brand Book", "Stationery"],
  overview: "Detailed project background and concept narrative...",
  creativeDirection: "Specific art direction and craft notes...",
  gallery: [
    { src: "assets/images/image-1.jpg", caption: "Caption 1" },
    { src: "assets/images/image-2.jpg", caption: "Caption 2" }
  ]
}
```

### 3. Adding Real Clients & Collaborations
In `js/projects-data.js`, update the `clientSlots` array with your real client brands or studio partners:

```javascript
clientSlots: [
  { id: 1, label: "Brand Name 1", category: "Fashion & Lifestyle" },
  { id: 2, label: "Studio Name 2", category: "Music & Entertainment" },
  ...
]
```

### 4. Updating Contact Email
In `js/projects-data.js`, change:
```javascript
email: "your.real.email@domain.com"
```

---

## 🌐 How to Deploy Live

You can launch this website in less than 2 minutes:

1. **Netlify**: Go to [app.netlify.com/drop](https://app.netlify.com/drop) and drag-and-drop the entire `mohammed-esmail-portfolio` folder. Your site is instantly live with free SSL.
2. **Vercel**: Run `vercel` in terminal or connect your GitHub repository on vercel.com.
3. **GitHub Pages**: Push this repo to GitHub, go to **Settings > Pages**, choose the `main` branch, and save.
