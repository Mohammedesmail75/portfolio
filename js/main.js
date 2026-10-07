/**
 * MOHAMMED ESMAIL — PORTFOLIO CORE SCRIPTS
 * Interactive behaviors, filtering, modal case-study viewer,
 * Cairo timezone clock, smooth animations, and copy handlers.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all interactive modules
  initCustomCursor();
  initCairoClock();
  initNavigation();
  initProjects();
  initServicesAccordion();
  initClientsSection();
  initContactInteractions();
  initDesignerGuide();
});

/* ---------------- 1. CUSTOM CURSOR ---------------- */
function initCustomCursor() {
  const dot = document.querySelector('.custom-cursor-dot');
  const outline = document.querySelector('.custom-cursor-outline');
  
  if (!dot || !outline) return;

  // Track cursor position
  window.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    dot.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
    
    // Smooth outline follower with requestAnimationFrame or direct transform
    outline.animate({
      transform: `translate3d(${clientX}px, ${clientY}px, 0)`
    }, {
      duration: 350,
      fill: 'forwards'
    });
  });

  // Hover states on clickable elements
  const interactiveTargets = document.querySelectorAll('a, button, input, textarea, select, .service-card, .software-tool-card');
  interactiveTargets.forEach(el => {
    el.addEventListener('mouseenter', () => outline.classList.add('hovering'));
    el.addEventListener('mouseleave', () => outline.classList.remove('hovering'));
  });
}

/* ---------------- 2. CAIRO LIVE CLOCK ---------------- */
function initCairoClock() {
  const clockElement = document.getElementById('cairoTimeDisplay');
  const heroTimeElement = document.getElementById('heroCairoTime');

  function updateClock() {
    try {
      const now = new Date();
      // Format time in Cairo (UTC+2 or UTC+3 according to daylight savings)
      const options = {
        timeZone: 'Africa/Cairo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      const cairoTimeStr = new Intl.DateTimeFormat('en-GB', options).format(now);
      
      if (clockElement) {
        clockElement.textContent = `CAIRO ${cairoTimeStr}`;
      }
      if (heroTimeElement) {
        heroTimeElement.textContent = `Cairo, EG • ${cairoTimeStr}`;
      }
    } catch (err) {
      console.warn("Cairo clock fallback:", err);
    }
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/* ---------------- 3. NAVIGATION & SCROLL ---------------- */
function initNavigation() {
  const nav = document.querySelector('.site-nav');
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const drawerLinks = document.querySelectorAll('.mobile-drawer-link');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky header class
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    // Active link highlighting on scroll
    updateActiveNavLink();
  });

  function updateActiveNavLink() {
    const scrollPos = window.scrollY + 200;
    const sections = ['work', 'about', 'services', 'clients', 'contact'];
    
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

/* ---------------- 4. PROJECTS SHOWCASE & FILTERING ---------------- */
let currentActiveProjectIndex = 0;
let filteredProjects = [];

function initProjects() {
  const gridContainer = document.getElementById('projectsGrid');
  const filterButtons = document.querySelectorAll('.filter-btn');

  if (!gridContainer || !PORTFOLIO_CONFIG) return;

  // Dynamically update the All Works count badge
  const allCountBadge = document.querySelector('.filter-btn[data-filter="all"] .count');
  if (allCountBadge && PORTFOLIO_CONFIG.projects) {
    allCountBadge.textContent = PORTFOLIO_CONFIG.projects.length;
  }

  filteredProjects = [...PORTFOLIO_CONFIG.projects];

  // Render projects continuously without pagination
  renderProjectsGrid(filteredProjects);

  // Category filter handlers
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

      // Smooth re-render with subtle fade
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

  if (projectsList.length === 0) {
    gridContainer.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
        <p>No projects found in this discipline category.</p>
      </div>
    `;
    return;
  }

  gridContainer.innerHTML = projectsList.map((project, index) => {
    const behanceUrl = project.behanceUrl || project.link || "https://www.behance.net/muhammedesmail";
    const categoryLabel = project.categoryLabel || "Selected Work";
    const shortDesc = project.shortDescription || "";
    const role = project.role || "Visual Design";

    return `
      <a href="${behanceUrl}" target="_blank" rel="noopener noreferrer" class="project-card" data-project-id="${project.id || index}" aria-label="View ${project.title} on Behance">
        <div class="project-media-wrap">
          ${project.isPlaceholder ? `
            <div class="placeholder-indicator" title="${project.placeholderNote || 'Concept Work'}">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2v20M2 12h20"/></svg>
              <span>CONCEPT WORK</span>
            </div>
          ` : ''}
          <div class="project-category-badge">${categoryLabel}</div>
          <img src="${project.image}" alt="${project.title} - ${categoryLabel}" class="project-img" loading="lazy" />
        </div>

        <div class="project-info-wrap">
          <div class="project-title-row">
            <h3 class="project-title">${project.title}</h3>
          </div>
          ${shortDesc ? `<p class="project-desc">${shortDesc}</p>` : ''}
          
          <div class="project-footer-row">
            <span class="project-role-tag">${role}</span>
            <span class="view-case-study-cta">
              View on Behance
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </span>
          </div>
        </div>
      </a>
    `;
  }).join('');

  // Attach hover cursor listeners to project cards
  const cards = gridContainer.querySelectorAll('.project-card');
  cards.forEach(card => {
    if (cursorOutline) {
      card.addEventListener('mouseenter', () => cursorOutline.classList.add('view-project'));
      card.addEventListener('mouseleave', () => cursorOutline.classList.remove('view-project'));
    }
  });
}

/* ---------------- 5. CASE STUDY MODAL CONTROLLER ---------------- */
function setupCaseStudyModal() {
  const modal = document.getElementById('caseStudyModal');
  const closeBtn = document.getElementById('closeModalBtn');
  const prevBtn = document.getElementById('prevProjectBtn');
  const nextBtn = document.getElementById('nextProjectBtn');

  if (!modal) return;

  // Close handlers
  if (closeBtn) {
    closeBtn.addEventListener('click', closeCaseStudyModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeCaseStudyModal();
    }
  });

  // Next / Previous buttons
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

  // Keyboard navigation (Esc, ArrowLeft, ArrowRight)
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
  // Title & Category
  document.getElementById('modalProjectTitle').textContent = project.title;
  document.getElementById('modalProjectSubtitle').textContent = project.subtitle || project.categoryLabel;
  document.getElementById('modalCategoryBadge').textContent = project.categoryLabel;

  // Hero artwork
  const heroImg = document.getElementById('modalHeroImg');
  heroImg.src = project.image;
  heroImg.alt = project.title;

  // Placeholder Notice in modal
  const placeholderNote = document.getElementById('modalPlaceholderBanner');
  if (placeholderNote) {
    if (project.isPlaceholder) {
      placeholderNote.style.display = 'flex';
      document.getElementById('modalPlaceholderText').textContent = project.placeholderNote;
    } else {
      placeholderNote.style.display = 'none';
    }
  }

  // Meta details
  document.getElementById('modalClient').textContent = project.client || '[Commission Placeholder]';
  document.getElementById('modalYear').textContent = project.year;
  document.getElementById('modalRole').textContent = project.role;

  // Deliverables pills
  const deliverablesContainer = document.getElementById('modalDeliverablesList');
  if (deliverablesContainer && project.deliverables) {
    deliverablesContainer.innerHTML = project.deliverables.map(d => `
      <span class="deliverable-pill">${d}</span>
    `).join('');
  }

  // Story Blocks
  document.getElementById('modalOverviewText').textContent = project.overview || project.shortDescription;
  document.getElementById('modalDirectionText').textContent = project.creativeDirection || "Crafted with meticulous attention to typography, spatial rhythm, and tactile aesthetic balance.";

  // Gallery Showcase
  const galleryContainer = document.getElementById('modalGalleryShowcase');
  if (galleryContainer && project.gallery) {
    galleryContainer.innerHTML = project.gallery.map(item => `
      <div class="gallery-item">
        <img src="${item.src}" alt="${item.caption}" loading="lazy" />
        <div class="gallery-caption">${item.caption}</div>
      </div>
    `).join('');
  }

  // Reset modal scroll to top
  const scrollBody = document.querySelector('.modal-scroll-body');
  if (scrollBody) scrollBody.scrollTop = 0;
}

/* ---------------- 6. SERVICES ACCORDION ---------------- */
function initServicesAccordion() {
  const servicesContainer = document.getElementById('servicesList');
  if (!servicesContainer || !PORTFOLIO_CONFIG) return;

  servicesContainer.innerHTML = PORTFOLIO_CONFIG.services.map((service, idx) => {
    const isFirst = idx === 0;
    return `
      <div class="service-card" data-service-id="${service.id}">
        <div class="service-main-row" role="button" tabindex="0" aria-expanded="${isFirst}">
          <div class="service-left-col">
            <span class="service-index">${service.id}</span>
            <div class="service-title-block">
              <h3 class="service-title">${service.name}</h3>
              <p class="service-tagline">${service.tagline}</p>
            </div>
          </div>
          <button class="service-toggle-btn" aria-label="Toggle details for ${service.name}">
            <svg class="toggle-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="transform: rotate(${isFirst ? '180deg' : '0deg'}); transition: transform 0.3s ease;">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>
        </div>

        <div class="service-details" style="display: ${isFirst ? 'grid' : 'none'};">
          <p class="service-desc-text">${service.description}</p>
          <div class="service-deliverables-box">
            <span class="service-deliverables-title">Scope & Deliverables:</span>
            <ul class="deliverables-bullet-list">
              ${service.deliverables.map(d => `<li>${d}</li>`).join('')}
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

/* ---------------- 7. CLIENTS & COLLABORATIONS SECTION ---------------- */
function initClientsSection() {
  const clientsGrid = document.getElementById('clientsGrid');
  if (!clientsGrid || !PORTFOLIO_CONFIG) return;

  clientsGrid.innerHTML = PORTFOLIO_CONFIG.clientSlots.map(slot => `
    <div class="client-slot-card">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(200, 170, 122, 0.4)" stroke-width="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M3 9h18M9 21V9"/>
      </svg>
      <span class="client-slot-label">${slot.label}</span>
      <span class="client-slot-category">${slot.category}</span>
      <span class="client-replace-note">Add your client logo in projects-data.js</span>
    </div>
  `).join('');
}

/* ---------------- 8. CONTACT & FORM INTERACTIONS ---------------- */
function initContactInteractions() {
  // Copy Email button
  const copyBtn = document.getElementById('copyEmailBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const email = PORTFOLIO_CONFIG.designer.email;
      navigator.clipboard.writeText(email).then(() => {
        showToast(`Copied to clipboard: ${email}`);
      }).catch(() => {
        showToast(`Email: ${email}`);
      });
    });
  }

  // Inquiry Form Handler
  const inquiryForm = document.getElementById('inquiryForm');
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('inquiryName').value.trim();
      const email = document.getElementById('inquiryEmail').value.trim();
      const service = document.getElementById('inquiryService').value;
      const message = document.getElementById('inquiryMessage').value.trim();

      if (!name || !email || !message) {
        showToast('Please fill in your name, email, and message.');
        return;
      }

      // Show friendly confirmation
      showToast('Thank you! Inquiry prepared. Opening your email client...');
      
      // Construct mailto link
      const subject = encodeURIComponent(`Project Inquiry: ${service} — ${name}`);
      const body = encodeURIComponent(`Hello Mohammed,\n\nName: ${name}\nEmail: ${email}\nService: ${service}\n\nProject Details:\n${message}\n\nBest regards,\n${name}`);
      
      setTimeout(() => {
        window.location.href = `mailto:${PORTFOLIO_CONFIG.designer.email}?subject=${subject}&body=${body}`;
      }, 800);
    });
  }
}

/* ---------------- 9. DESIGNER GUIDE MODAL ---------------- */
function initDesignerGuide() {
  const guideTrigger = document.getElementById('designerGuideTrigger');
  const guideModal = document.getElementById('designerGuideModal');
  const closeGuideBtn = document.getElementById('closeGuideBtn');

  if (guideTrigger && guideModal) {
    guideTrigger.addEventListener('click', () => {
      guideModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    if (closeGuideBtn) {
      closeGuideBtn.addEventListener('click', () => {
        guideModal.classList.remove('open');
        document.body.style.overflow = '';
      });
    }

    guideModal.addEventListener('click', (e) => {
      if (e.target === guideModal) {
        guideModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }
}

/* ---------------- 10. TOAST NOTIFICATIONS ---------------- */
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
