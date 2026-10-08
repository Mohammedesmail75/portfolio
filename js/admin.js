/**
 * MOHAMMED ESMAIL — SECURE ADMIN PORTAL & DASHBOARD
 * Handles client-side admin authentication, tabs, project CRUD,
 * content customization (EN & AR), section visibility toggling,
 * reordering, and media uploading.
 */

(function() {
  'use strict';

  let adminToken = sessionStorage.getItem('portfolio_admin_token') || null;
  let activeData = null;
  let activeTab = 'hero';
  let editingProjectIndex = null; // null = list view, number = project index, 'new' = adding new

  document.addEventListener('DOMContentLoaded', () => {
    initAdminTrigger();
  });

  /* ---------------- 1. ADMIN TRIGGER & INITIALIZATION ---------------- */
  function initAdminTrigger() {
    const triggerBtn = document.getElementById('adminTriggerBtn');
    if (!triggerBtn) return;

    triggerBtn.addEventListener('click', async () => {
      if (adminToken) {
        const isValid = await verifyCurrentToken();
        if (isValid) {
          await openAdminDashboard();
          return;
        }
      }
      openAdminLogin();
    });

    // Close on backdrop click
    const overlay = document.getElementById('adminModal');
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeAdminModal();
      });
    }

    // Close on Esc
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeAdminModal();
    });
  }

  async function verifyCurrentToken() {
    if (!adminToken) return false;
    try {
      const res = await fetch('/api/auth/check', {
        headers: { 'Authorization': `Bearer ${adminToken}` }
      });
      if (res.ok) {
        const body = await res.json();
        return !!body.authenticated;
      }
    } catch (_) {}
    adminToken = null;
    sessionStorage.removeItem('portfolio_admin_token');
    return false;
  }

  function closeAdminModal() {
    const overlay = document.getElementById('adminModal');
    if (overlay) {
      overlay.classList.remove('open');
      overlay.setAttribute('aria-hidden', 'true');
    }
  }

  /* ---------------- 2. LOGIN MODAL ---------------- */
  function openAdminLogin() {
    const container = document.getElementById('adminModalContainer');
    const overlay = document.getElementById('adminModal');
    if (!container || !overlay) return;

    container.innerHTML = `
      <div class="admin-header-bar">
        <div class="admin-header-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-crimson-hover)" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
          <span>Admin Portal</span>
        </div>
        <button type="button" class="admin-btn-icon" id="adminCloseBtn" aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>

      <div class="admin-body">
        <form class="admin-login-box" id="adminLoginForm">
          <div class="admin-login-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
          </div>
          <div>
            <h3 class="admin-login-title">Website Administration</h3>
            <p class="admin-login-subtitle">Enter your secure credentials to manage website content, projects, and visibility.</p>
          </div>

          <div class="admin-error-box" id="adminLoginError"></div>

          <div class="admin-form-group" style="text-align: left;">
            <label for="adminPassInput" class="admin-form-label">Admin Security Key</label>
            <input type="password" id="adminPassInput" class="admin-form-input" placeholder="••••••••••••" required autocomplete="current-password" autofocus />
          </div>

          <button type="submit" class="admin-btn admin-btn-primary" id="adminSubmitLoginBtn" style="width: 100%; justify-content: center; padding: 0.8rem 1rem;">
            <span>Unlock Dashboard</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </form>
      </div>
    `;

    document.getElementById('adminCloseBtn').addEventListener('click', closeAdminModal);

    const form = document.getElementById('adminLoginForm');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const pass = document.getElementById('adminPassInput').value;
      const errorBox = document.getElementById('adminLoginError');
      const submitBtn = document.getElementById('adminSubmitLoginBtn');

      errorBox.style.display = 'none';
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Verifying...';

      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password: pass })
        });

        let data = null;
        const contentType = res.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          try {
            data = await res.json();
          } catch (_) {
            data = null;
          }
        }

        if (res.ok && data && data.success && data.token) {
          adminToken = data.token;
          sessionStorage.setItem('portfolio_admin_token', adminToken);
          await openAdminDashboard();
        } else if (res.status === 401) {
          errorBox.textContent = (data && data.error) ? data.error : 'Invalid credentials. Access denied.';
          errorBox.style.display = 'block';
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>Unlock Dashboard</span>';
        } else if (res.status === 404) {
          errorBox.textContent = (data && data.error) ? data.error : 'API endpoint not found (HTTP 404). Cloudflare Pages Functions may not be deployed for /api.';
          errorBox.style.display = 'block';
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>Unlock Dashboard</span>';
        } else {
          const msg = (data && data.error) ? data.error : `Server returned HTTP ${res.status}. Please check server status.`;
          errorBox.textContent = msg;
          errorBox.style.display = 'block';
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>Unlock Dashboard</span>';
        }
      } catch (err) {
        console.error('[Admin Login Fetch Error]', err);
        errorBox.textContent = 'Connection error. Please check network or server status.';
        errorBox.style.display = 'block';
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Unlock Dashboard</span>';
      }
    });

    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
  }

  /* ---------------- 3. DASHBOARD MAIN ---------------- */
  async function openAdminDashboard() {
    const container = document.getElementById('adminModalContainer');
    const overlay = document.getElementById('adminModal');
    if (!container || !overlay) return;

    // Fetch latest data if not loaded
    if (!activeData) {
      try {
        const res = await fetch('/api/portfolio-data');
        if (res.ok) {
          activeData = await res.json();
        }
      } catch (_) {}
    }

    // Deep copy fallback if fetch failed
    if (!activeData || !activeData.projects) {
      activeData = JSON.parse(JSON.stringify({
        designer: PORTFOLIO_CONFIG.designer,
        categories: PORTFOLIO_CONFIG.categories,
        projects: PORTFOLIO_CONFIG.projects,
        services: PORTFOLIO_CONFIG.services,
        sectionVisibility: PORTFOLIO_CONFIG.sectionVisibility || { hero: true, work: true, about: true, services: true, contact: true },
        heroSettings: { videoUrl: "assets/videos/hero-video.mp4" },
        translations: (typeof UI_TRANSLATIONS !== 'undefined') ? UI_TRANSLATIONS : { en: {}, ar: {} }
      }));
    }

    renderDashboardLayout();
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
  }

  function renderDashboardLayout() {
    const container = document.getElementById('adminModalContainer');
    if (!container) return;

    container.innerHTML = `
      <div class="admin-header-bar">
        <div class="admin-header-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-crimson-hover)" stroke-width="2"><path d="M12 15a3 3 0 100-6 3 3 0 000 6z"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
          <span>Portfolio Admin</span>
          <span class="admin-badge-live">Live</span>
        </div>

        <div class="admin-header-actions">
          <button type="button" class="admin-btn admin-btn-secondary" id="adminPreviewBtn" title="Close editor to view changes on the page">
            <span>Preview</span>
          </button>
          <button type="button" class="admin-btn admin-btn-primary" id="adminSaveBtn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
            <span>Save & Publish</span>
          </button>
          <button type="button" class="admin-btn admin-btn-danger" id="adminLogoutBtn" title="End admin session">
            <span>Logout</span>
          </button>
          <button type="button" class="admin-btn-icon" id="adminCloseDashBtn" aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
      </div>

      <div class="admin-tabs-bar">
        <button type="button" class="admin-tab-btn ${activeTab === 'hero' ? 'active' : ''}" data-tab="hero">Hero Section</button>
        <button type="button" class="admin-tab-btn ${activeTab === 'projects' ? 'active' : ''}" data-tab="projects">Projects (${activeData.projects.length})</button>
        <button type="button" class="admin-tab-btn ${activeTab === 'content' ? 'active' : ''}" data-tab="content">Content & About</button>
        <button type="button" class="admin-tab-btn ${activeTab === 'contact' ? 'active' : ''}" data-tab="contact">Contact & Social</button>
        <button type="button" class="admin-tab-btn ${activeTab === 'visibility' ? 'active' : ''}" data-tab="visibility">Section Visibility</button>
        <button type="button" class="admin-tab-btn ${activeTab === 'export' ? 'active' : ''}" data-tab="export">Backup & Export</button>
      </div>

      <div class="admin-body" id="adminTabContent">
        <!-- Injected by tab renderer -->
      </div>
    `;

    // Tab buttons click
    container.querySelectorAll('.admin-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeTab = btn.getAttribute('data-tab');
        editingProjectIndex = null;
        renderDashboardLayout();
      });
    });

    document.getElementById('adminCloseDashBtn').addEventListener('click', closeAdminModal);
    document.getElementById('adminPreviewBtn').addEventListener('click', closeAdminModal);

    // Save & Publish
    document.getElementById('adminSaveBtn').addEventListener('click', handleSaveData);

    // Logout
    document.getElementById('adminLogoutBtn').addEventListener('click', handleLogout);

    renderActiveTabContent();
  }

  function renderActiveTabContent() {
    const content = document.getElementById('adminTabContent');
    if (!content) return;

    if (activeTab === 'hero') renderHeroTab(content);
    else if (activeTab === 'projects') renderProjectsTab(content);
    else if (activeTab === 'content') renderContentTab(content);
    else if (activeTab === 'contact') renderContactTab(content);
    else if (activeTab === 'visibility') renderVisibilityTab(content);
    else if (activeTab === 'export') renderExportTab(content);
  }

  /* ---------------- 4. HERO SECTION TAB ---------------- */
  function renderHeroTab(container) {
    const d = activeData.designer;
    const tEn = activeData.translations?.en || {};
    const tAr = activeData.translations?.ar || {};
    const heroVid = activeData.heroSettings?.videoUrl || "assets/videos/hero-video.mp4";

    container.innerHTML = `
      <div style="margin-bottom: 1.5rem;">
        <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.25rem;">Hero Section Customization</h3>
        <p style="font-size: 0.85rem; color: var(--text-secondary);">Manage the hero headlines, statement, status pill, video, and ticker ribbon in both English and Arabic.</p>
      </div>

      <div class="admin-grid-2">
        <!-- English Column -->
        <div style="background: rgba(255,255,255,0.02); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
            <span class="mono-tag" style="background: rgba(255,255,255,0.08);">English (EN)</span>
          </div>

          <div class="admin-form-group">
            <label class="admin-form-label">Designer Name</label>
            <input type="text" class="admin-form-input" id="heroNameEn" value="${escapeHtml(d.name || 'MOHAMMED ESMAIL')}" />
          </div>

          <div class="admin-form-group">
            <label class="admin-form-label">Role Badge</label>
            <input type="text" class="admin-form-input" id="heroRoleEn" value="${escapeHtml(d.role || '')}" />
          </div>

          <div class="admin-form-group">
            <label class="admin-form-label">Hero Statement (HTML Allowed)</label>
            <textarea class="admin-form-textarea" id="heroStatementEn">${escapeHtml(tEn['hero.statement'] || d.statement || '')}</textarea>
          </div>

          <div class="admin-form-group">
            <label class="admin-form-label">Availability Status Text</label>
            <input type="text" class="admin-form-input" id="heroStatusEn" value="${escapeHtml(d.status?.label || '')}" />
          </div>

          <div class="admin-form-group">
            <label class="admin-form-label">Marquee Ribbon Text</label>
            <textarea class="admin-form-textarea" id="heroMarqueeEn" style="min-height: 70px;">${escapeHtml(tEn['hero.marquee'] || '')}</textarea>
          </div>
        </div>

        <!-- Arabic Column -->
        <div style="background: rgba(255,255,255,0.02); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);" dir="rtl">
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
            <span class="mono-tag" style="background: rgba(168,32,53,0.15); color: #ffb8c2;">العربية (AR)</span>
          </div>

          <div class="admin-form-group">
            <label class="admin-form-label">اسم المصمم</label>
            <input type="text" class="admin-form-input" id="heroNameAr" value="${escapeHtml(d.name_ar || 'محمد إسماعيل')}" />
          </div>

          <div class="admin-form-group">
            <label class="admin-form-label">المسمى الفني</label>
            <input type="text" class="admin-form-input" id="heroRoleAr" value="${escapeHtml(d.role_ar || '')}" />
          </div>

          <div class="admin-form-group">
            <label class="admin-form-label">العبارة الافتتاحية (Hero Statement)</label>
            <textarea class="admin-form-textarea" id="heroStatementAr">${escapeHtml(tAr['hero.statement'] || d.statement_ar || '')}</textarea>
          </div>

          <div class="admin-form-group">
            <label class="admin-form-label">نص حالة التوفر (Availability)</label>
            <input type="text" class="admin-form-input" id="heroStatusAr" value="${escapeHtml(d.status?.label_ar || '')}" />
          </div>

          <div class="admin-form-group">
            <label class="admin-form-label">شريط النص المتحرك (Marquee Ticker)</label>
            <textarea class="admin-form-textarea" id="heroMarqueeAr" style="min-height: 70px;">${escapeHtml(tAr['hero.marquee'] || '')}</textarea>
          </div>
        </div>
      </div>

      <!-- Hero Video Settings -->
      <div style="margin-top: 1.5rem; background: rgba(255,255,255,0.02); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
        <h4 style="font-size: 0.95rem; font-weight: 600; margin-bottom: 0.5rem;">Hero Background Video</h4>
        <div class="admin-form-group">
          <label class="admin-form-label">Video Source Path or URL (.mp4)</label>
          <input type="text" class="admin-form-input" id="heroVideoInput" value="${escapeHtml(heroVid)}" />
          <p style="font-size: 0.76rem; color: var(--text-muted); margin-top: 0.35rem;">Default: assets/videos/hero-video.mp4</p>
        </div>
      </div>
    `;

    // Bind real-time input listeners to activeData
    const sync = () => {
      d.name = document.getElementById('heroNameEn').value;
      d.name_ar = document.getElementById('heroNameAr').value;
      d.role = document.getElementById('heroRoleEn').value;
      d.role_ar = document.getElementById('heroRoleAr').value;
      d.statement = document.getElementById('heroStatementEn').value;
      d.statement_ar = document.getElementById('heroStatementAr').value;
      if (!d.status) d.status = {};
      d.status.label = document.getElementById('heroStatusEn').value;
      d.status.label_ar = document.getElementById('heroStatusAr').value;

      if (!activeData.translations) activeData.translations = { en: {}, ar: {} };
      activeData.translations.en['hero.statement'] = d.statement;
      activeData.translations.ar['hero.statement'] = d.statement_ar;
      activeData.translations.en['hero.role'] = d.role;
      activeData.translations.ar['hero.role'] = d.role_ar;
      activeData.translations.en['hero.status'] = d.status.label;
      activeData.translations.ar['hero.status'] = d.status.label_ar;
      activeData.translations.en['hero.marquee'] = document.getElementById('heroMarqueeEn').value;
      activeData.translations.ar['hero.marquee'] = document.getElementById('heroMarqueeAr').value;

      if (!activeData.heroSettings) activeData.heroSettings = {};
      activeData.heroSettings.videoUrl = document.getElementById('heroVideoInput').value;
    };

    container.querySelectorAll('input, textarea').forEach(el => {
      el.addEventListener('input', sync);
    });
  }

  /* ---------------- 5. PROJECTS TAB (LIST & EDIT) ---------------- */
  function renderProjectsTab(container) {
    if (editingProjectIndex !== null) {
      renderProjectEditForm(container, editingProjectIndex);
      return;
    }

    // Projects List View
    container.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.25rem;">Projects Manager</h3>
          <p style="font-size: 0.85rem; color: var(--text-secondary);">Manage, reorder, add, and edit portfolio case studies and artwork images.</p>
        </div>
        <button type="button" class="admin-btn admin-btn-primary" id="adminAddProjectBtn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
          <span>Add New Project</span>
        </button>
      </div>

      <div class="admin-project-list" id="adminProjectsList">
        ${activeData.projects.map((proj, idx) => `
          <div class="admin-project-item" data-index="${idx}">
            <img src="${proj.image || 'assets/images/placeholder.jpg'}" alt="${escapeHtml(proj.title)}" class="admin-project-thumb" />
            
            <div class="admin-project-meta">
              <div class="admin-project-title-text">${idx + 1}. ${escapeHtml(proj.title)} <span style="font-weight: 400; color: var(--text-muted); font-size: 0.82rem;">(${escapeHtml(proj.title_ar || '')})</span></div>
              <div class="admin-project-cat-text">${escapeHtml(proj.categoryLabel || proj.category)} &bull; ${proj.year || '2024'}</div>
            </div>

            <div class="admin-project-actions">
              <button type="button" class="admin-btn admin-btn-secondary move-up-btn" data-index="${idx}" title="Move Up" ${idx === 0 ? 'disabled' : ''}>▲</button>
              <button type="button" class="admin-btn admin-btn-secondary move-down-btn" data-index="${idx}" title="Move Down" ${idx === activeData.projects.length - 1 ? 'disabled' : ''}>▼</button>
              <button type="button" class="admin-btn admin-btn-secondary edit-proj-btn" data-index="${idx}">Edit</button>
              <button type="button" class="admin-btn admin-btn-danger del-proj-btn" data-index="${idx}" title="Delete project">🗑</button>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    document.getElementById('adminAddProjectBtn').addEventListener('click', () => {
      editingProjectIndex = 'new';
      renderActiveTabContent();
    });

    container.querySelectorAll('.edit-proj-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        editingProjectIndex = parseInt(btn.getAttribute('data-index'), 10);
        renderActiveTabContent();
      });
    });

    // Reordering: Move Up
    container.querySelectorAll('.move-up-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = parseInt(btn.getAttribute('data-index'), 10);
        if (i > 0) {
          const temp = activeData.projects[i - 1];
          activeData.projects[i - 1] = activeData.projects[i];
          activeData.projects[i] = temp;
          renderActiveTabContent();
        }
      });
    });

    // Reordering: Move Down
    container.querySelectorAll('.move-down-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = parseInt(btn.getAttribute('data-index'), 10);
        if (i < activeData.projects.length - 1) {
          const temp = activeData.projects[i + 1];
          activeData.projects[i + 1] = activeData.projects[i];
          activeData.projects[i] = temp;
          renderActiveTabContent();
        }
      });
    });

    // Delete
    container.querySelectorAll('.del-proj-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = parseInt(btn.getAttribute('data-index'), 10);
        const title = activeData.projects[i]?.title || 'this project';
        if (confirm(`Are you sure you want to delete "${title}"?`)) {
          activeData.projects.splice(i, 1);
          renderActiveTabContent();
        }
      });
    });
  }

  function renderProjectEditForm(container, index) {
    const isNew = (index === 'new');
    const project = isNew ? {
      id: "project-" + Date.now(),
      title: "New Project",
      title_ar: "مشروع جديد",
      subtitle: "Brief subtitle",
      subtitle_ar: "وصف موجز للمشروع",
      category: "branding",
      categoryLabel: "Brand Identity",
      categoryLabel_ar: "الهوية البصرية",
      year: String(new Date().getFullYear()),
      image: "assets/images/arabian-collection.jpg",
      behanceUrl: "https://www.behance.net/muhammedesmail",
      shortDescription: "One-sentence overview of the project.",
      shortDescription_ar: "نبذة مختصرة عن المشروع في جملة واحدة.",
      client: "Client Name",
      client_ar: "اسم العميل",
      role: "Lead Visual Designer",
      role_ar: "المصمم البصري الرئيسي",
      deliverables: ["Visual Identity", "Brand Guidelines"],
      deliverables_ar: ["الهوية البصرية", "دليل الاستخدام"],
      overview: "Detailed project background and concept narrative.",
      overview_ar: "نظرة عامة مفصلة وفكرة المشروع.",
      creativeDirection: "Specific art direction notes.",
      creativeDirection_ar: "التوجيه الإبداعي والملاحظات الفنية."
    } : activeData.projects[index];

    container.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 0.75rem;">
        <button type="button" class="admin-btn admin-btn-secondary" id="adminBackToListBtn">
          ← Back to Projects List
        </button>
        <span style="font-weight: 700; color: var(--accent-gold);">${isNew ? '+ Adding New Project' : `Editing: ${escapeHtml(project.title)}`}</span>
      </div>

      <!-- Media & Core Settings Card -->
      <div style="background: rgba(255,255,255,0.02); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); margin-bottom: 1.5rem;">
        <h4 style="font-size: 0.95rem; font-weight: 600; margin-bottom: 1rem;">Artwork & Media</h4>
        
        <div class="admin-grid-2">
          <div>
            <div class="admin-form-group">
              <label class="admin-form-label">Card Image Path / URL</label>
              <input type="text" class="admin-form-input" id="projImgInput" value="${escapeHtml(project.image || '')}" />
            </div>

            <div class="admin-form-group">
              <label class="admin-form-label">Or Upload New Image</label>
              <input type="file" id="projFileUpload" accept="image/png, image/jpeg, image/webp, image/svg+xml" style="font-size: 0.82rem; color: var(--text-secondary);" />
              <div id="uploadStatusMsg" style="font-size: 0.78rem; color: var(--accent-crimson-hover); margin-top: 0.25rem;"></div>
            </div>
          </div>

          <div style="display: flex; align-items: center; justify-content: center; background: #08080a; border: 1px solid var(--border-medium); border-radius: var(--radius-md); padding: 0.5rem; min-height: 120px;">
            <img id="projPreviewImg" src="${project.image || ''}" alt="Preview" style="max-height: 120px; max-width: 100%; object-fit: contain; border-radius: var(--radius-sm);" />
          </div>
        </div>

        <div class="admin-grid-2" style="margin-top: 1rem;">
          <div class="admin-form-group">
            <label class="admin-form-label">Category</label>
            <select class="admin-form-select" id="projCategorySelect">
              <option value="branding" ${project.category === 'branding' ? 'selected' : ''}>Brand Identity</option>
              <option value="campaigns" ${project.category === 'campaigns' ? 'selected' : ''}>Advertising & Campaigns</option>
              <option value="posters" ${project.category === 'posters' ? 'selected' : ''}>Posters & Key Visuals</option>
              <option value="music" ${project.category === 'music' ? 'selected' : ''}>Music & Entertainment</option>
              <option value="packaging" ${project.category === 'packaging' ? 'selected' : ''}>Packaging Design</option>
              <option value="social" ${project.category === 'social' ? 'selected' : ''}>Social Media Design</option>
              <option value="ai" ${project.category === 'ai' ? 'selected' : ''}>AI Creative Production</option>
            </select>
          </div>

          <div class="admin-form-group">
            <label class="admin-form-label">Behance Case Study URL</label>
            <input type="url" class="admin-form-input" id="projBehanceInput" value="${escapeHtml(project.behanceUrl || '')}" />
          </div>
        </div>

        <div class="admin-form-group">
          <label class="admin-form-label">Year</label>
          <input type="text" class="admin-form-input" id="projYearInput" style="max-width: 150px;" value="${escapeHtml(project.year || '2024')}" />
        </div>
      </div>

      <!-- Bilingual Project Details -->
      <div class="admin-grid-2">
        <!-- English Column -->
        <div style="background: rgba(255,255,255,0.02); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
            <span class="mono-tag" style="background: rgba(255,255,255,0.08);">English Details</span>
          </div>

          <div class="admin-form-group">
            <label class="admin-form-label">Project Title (EN)</label>
            <input type="text" class="admin-form-input" id="projTitleEn" value="${escapeHtml(project.title || '')}" required />
          </div>

          <div class="admin-form-group">
            <label class="admin-form-label">Subtitle (EN)</label>
            <input type="text" class="admin-form-input" id="projSubtitleEn" value="${escapeHtml(project.subtitle || '')}" />
          </div>

          <div class="admin-form-group">
            <label class="admin-form-label">Category Badge Label (EN)</label>
            <input type="text" class="admin-form-input" id="projCatLabelEn" value="${escapeHtml(project.categoryLabel || '')}" />
          </div>

          <div class="admin-form-group">
            <label class="admin-form-label">Client / Commission (EN)</label>
            <input type="text" class="admin-form-input" id="projClientEn" value="${escapeHtml(project.client || '')}" />
          </div>

          <div class="admin-form-group">
            <label class="admin-form-label">Role (EN)</label>
            <input type="text" class="admin-form-input" id="projRoleEn" value="${escapeHtml(project.role || '')}" />
          </div>

          <div class="admin-form-group">
            <label class="admin-form-label">Short Description (EN)</label>
            <textarea class="admin-form-textarea" id="projShortDescEn">${escapeHtml(project.shortDescription || '')}</textarea>
          </div>

          <div class="admin-form-group">
            <label class="admin-form-label">Deliverables (comma separated EN)</label>
            <input type="text" class="admin-form-input" id="projDeliverablesEn" value="${escapeHtml(Array.isArray(project.deliverables) ? project.deliverables.join(', ') : '')}" />
          </div>

          <div class="admin-form-group">
            <label class="admin-form-label">Detailed Overview & Concept (EN)</label>
            <textarea class="admin-form-textarea" id="projOverviewEn">${escapeHtml(project.overview || '')}</textarea>
          </div>

          <div class="admin-form-group">
            <label class="admin-form-label">Creative Direction (EN)</label>
            <textarea class="admin-form-textarea" id="projDirectionEn">${escapeHtml(project.creativeDirection || '')}</textarea>
          </div>
        </div>

        <!-- Arabic Column -->
        <div style="background: rgba(255,255,255,0.02); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);" dir="rtl">
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
            <span class="mono-tag" style="background: rgba(168,32,53,0.15); color: #ffb8c2;">التفاصيل بالعربية</span>
          </div>

          <div class="admin-form-group">
            <label class="admin-form-label">عنوان المشروع (عربي)</label>
            <input type="text" class="admin-form-input" id="projTitleAr" value="${escapeHtml(project.title_ar || '')}" />
          </div>

          <div class="admin-form-group">
            <label class="admin-form-label">العنوان الفرعي (عربي)</label>
            <input type="text" class="admin-form-input" id="projSubtitleAr" value="${escapeHtml(project.subtitle_ar || '')}" />
          </div>

          <div class="admin-form-group">
            <label class="admin-form-label">نص تصنيف المشروع (عربي)</label>
            <input type="text" class="admin-form-input" id="projCatLabelAr" value="${escapeHtml(project.categoryLabel_ar || '')}" />
          </div>

          <div class="admin-form-group">
            <label class="admin-form-label">العميل / الجهة (عربي)</label>
            <input type="text" class="admin-form-input" id="projClientAr" value="${escapeHtml(project.client_ar || '')}" />
          </div>

          <div class="admin-form-group">
            <label class="admin-form-label">الدور الفني (عربي)</label>
            <input type="text" class="admin-form-input" id="projRoleAr" value="${escapeHtml(project.role_ar || '')}" />
          </div>

          <div class="admin-form-group">
            <label class="admin-form-label">الوصف الموجز (عربي)</label>
            <textarea class="admin-form-textarea" id="projShortDescAr">${escapeHtml(project.shortDescription_ar || '')}</textarea>
          </div>

          <div class="admin-form-group">
            <label class="admin-form-label">المخرجات ونطاق العمل (مفصولة بفاصلة)</label>
            <input type="text" class="admin-form-input" id="projDeliverablesAr" value="${escapeHtml(Array.isArray(project.deliverables_ar) ? project.deliverables_ar.join(', ') : '')}" />
          </div>

          <div class="admin-form-group">
            <label class="admin-form-label">نظرة عامة وفكرة المشروع (عربي)</label>
            <textarea class="admin-form-textarea" id="projOverviewAr">${escapeHtml(project.overview_ar || '')}</textarea>
          </div>

          <div class="admin-form-group">
            <label class="admin-form-label">التوجيه الإبداعي (عربي)</label>
            <textarea class="admin-form-textarea" id="projDirectionAr">${escapeHtml(project.creativeDirection_ar || '')}</textarea>
          </div>
        </div>
      </div>

      <div style="margin-top: 1.5rem; text-align: right;">
        <button type="button" class="admin-btn admin-btn-primary" id="adminApplyProjectBtn" style="padding: 0.75rem 2rem;">
          ${isNew ? 'Create Project' : 'Apply Changes'}
        </button>
      </div>
    `;

    document.getElementById('adminBackToListBtn').addEventListener('click', () => {
      editingProjectIndex = null;
      renderActiveTabContent();
    });

    // Image file upload
    const fileUpload = document.getElementById('projFileUpload');
    const imgInput = document.getElementById('projImgInput');
    const previewImg = document.getElementById('projPreviewImg');
    const statusMsg = document.getElementById('uploadStatusMsg');

    imgInput.addEventListener('input', () => {
      previewImg.src = imgInput.value;
    });

    fileUpload.addEventListener('change', async () => {
      const file = fileUpload.files[0];
      if (!file) return;

      statusMsg.textContent = 'Uploading media...';
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Data = reader.result;
        try {
          const res = await fetch('/api/admin/upload', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${adminToken}`
            },
            body: JSON.stringify({
              filename: file.name,
              base64Data
            })
          });
          const json = await res.json();
          if (res.ok && json.success && json.url) {
            imgInput.value = json.url;
            previewImg.src = json.url;
            statusMsg.textContent = '✓ Uploaded successfully';
            statusMsg.style.color = '#4ade80';
          } else {
            statusMsg.textContent = json.error || 'Upload failed';
            statusMsg.style.color = '#f87171';
          }
        } catch (err) {
          statusMsg.textContent = 'Upload network error';
          statusMsg.style.color = '#f87171';
        }
      };
      reader.readAsDataURL(file);
    });

    // Save project button
    document.getElementById('adminApplyProjectBtn').addEventListener('click', () => {
      const updated = {
        ...project,
        image: document.getElementById('projImgInput').value.trim() || project.image,
        category: document.getElementById('projCategorySelect').value,
        behanceUrl: document.getElementById('projBehanceInput').value.trim() || project.behanceUrl,
        year: document.getElementById('projYearInput').value.trim() || project.year,

        title: document.getElementById('projTitleEn').value.trim() || 'Untitled Project',
        title_ar: document.getElementById('projTitleAr').value.trim() || document.getElementById('projTitleEn').value.trim(),
        subtitle: document.getElementById('projSubtitleEn').value.trim(),
        subtitle_ar: document.getElementById('projSubtitleAr').value.trim(),
        categoryLabel: document.getElementById('projCatLabelEn').value.trim() || 'Design',
        categoryLabel_ar: document.getElementById('projCatLabelAr').value.trim() || 'تصميم',
        client: document.getElementById('projClientEn').value.trim(),
        client_ar: document.getElementById('projClientAr').value.trim(),
        role: document.getElementById('projRoleEn').value.trim(),
        role_ar: document.getElementById('projRoleAr').value.trim(),
        shortDescription: document.getElementById('projShortDescEn').value.trim(),
        shortDescription_ar: document.getElementById('projShortDescAr').value.trim(),
        overview: document.getElementById('projOverviewEn').value.trim(),
        overview_ar: document.getElementById('projOverviewAr').value.trim(),
        creativeDirection: document.getElementById('projDirectionEn').value.trim(),
        creativeDirection_ar: document.getElementById('projDirectionAr').value.trim(),
        deliverables: document.getElementById('projDeliverablesEn').value.split(',').map(s => s.trim()).filter(Boolean),
        deliverables_ar: document.getElementById('projDeliverablesAr').value.split(',').map(s => s.trim()).filter(Boolean)
      };

      if (isNew) {
        activeData.projects.push(updated);
      } else {
        activeData.projects[index] = updated;
      }

      editingProjectIndex = null;
      renderDashboardLayout();
    });
  }

  /* ---------------- 6. CONTENT & ABOUT TAB ---------------- */
  function renderContentTab(container) {
    const tEn = activeData.translations?.en || {};
    const tAr = activeData.translations?.ar || {};

    container.innerHTML = `
      <div style="margin-bottom: 1.5rem;">
        <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.25rem;">Website Content & About Section</h3>
        <p style="font-size: 0.85rem; color: var(--text-secondary);">Customize the lead quote, biography narratives, and strategic pillars in both languages.</p>
      </div>

      <div class="admin-grid-2">
        <!-- English -->
        <div style="background: rgba(255,255,255,0.02); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
          <span class="mono-tag" style="background: rgba(255,255,255,0.08); margin-bottom: 1rem; display: inline-block;">English (EN)</span>

          <div class="admin-form-group">
            <label class="admin-form-label">About Lead Quote</label>
            <textarea class="admin-form-textarea" id="aboutQuoteEn">${escapeHtml(tEn['about.leadQuote'] || '')}</textarea>
          </div>

          <div class="admin-form-group">
            <label class="admin-form-label">Biography Paragraph 1</label>
            <textarea class="admin-form-textarea" id="aboutBody1En">${escapeHtml(tEn['about.body1'] || '')}</textarea>
          </div>

          <div class="admin-form-group">
            <label class="admin-form-label">Biography Paragraph 2</label>
            <textarea class="admin-form-textarea" id="aboutBody2En">${escapeHtml(tEn['about.body2'] || '')}</textarea>
          </div>

          <div class="admin-form-group">
            <label class="admin-form-label">Pillar 1 Title & Text</label>
            <input type="text" class="admin-form-input" id="aboutP1TitleEn" value="${escapeHtml(tEn['about.p1Title'] || '')}" style="margin-bottom: 0.4rem;" />
            <textarea class="admin-form-textarea" id="aboutP1DescEn">${escapeHtml(tEn['about.p1Desc'] || '')}</textarea>
          </div>

          <div class="admin-form-group">
            <label class="admin-form-label">Pillar 2 Title & Text</label>
            <input type="text" class="admin-form-input" id="aboutP2TitleEn" value="${escapeHtml(tEn['about.p2Title'] || '')}" style="margin-bottom: 0.4rem;" />
            <textarea class="admin-form-textarea" id="aboutP2DescEn">${escapeHtml(tEn['about.p2Desc'] || '')}</textarea>
          </div>

          <div class="admin-form-group">
            <label class="admin-form-label">Pillar 3 Title & Text</label>
            <input type="text" class="admin-form-input" id="aboutP3TitleEn" value="${escapeHtml(tEn['about.p3Title'] || '')}" style="margin-bottom: 0.4rem;" />
            <textarea class="admin-form-textarea" id="aboutP3DescEn">${escapeHtml(tEn['about.p3Desc'] || '')}</textarea>
          </div>
        </div>

        <!-- Arabic -->
        <div style="background: rgba(255,255,255,0.02); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);" dir="rtl">
          <span class="mono-tag" style="background: rgba(168,32,53,0.15); color: #ffb8c2; margin-bottom: 1rem; display: inline-block;">العربية (AR)</span>

          <div class="admin-form-group">
            <label class="admin-form-label">اقتباس قسم نبذة عني</label>
            <textarea class="admin-form-textarea" id="aboutQuoteAr">${escapeHtml(tAr['about.leadQuote'] || '')}</textarea>
          </div>

          <div class="admin-form-group">
            <label class="admin-form-label">الفقرة الأولى (عربي)</label>
            <textarea class="admin-form-textarea" id="aboutBody1Ar">${escapeHtml(tAr['about.body1'] || '')}</textarea>
          </div>

          <div class="admin-form-group">
            <label class="admin-form-label">الفقرة الثانية (عربي)</label>
            <textarea class="admin-form-textarea" id="aboutBody2Ar">${escapeHtml(tAr['about.body2'] || '')}</textarea>
          </div>

          <div class="admin-form-group">
            <label class="admin-form-label">الركيزة الأولى (العنوان والوصف)</label>
            <input type="text" class="admin-form-input" id="aboutP1TitleAr" value="${escapeHtml(tAr['about.p1Title'] || '')}" style="margin-bottom: 0.4rem;" />
            <textarea class="admin-form-textarea" id="aboutP1DescAr">${escapeHtml(tAr['about.p1Desc'] || '')}</textarea>
          </div>

          <div class="admin-form-group">
            <label class="admin-form-label">الركيزة الثانية (العنوان والوصف)</label>
            <input type="text" class="admin-form-input" id="aboutP2TitleAr" value="${escapeHtml(tAr['about.p2Title'] || '')}" style="margin-bottom: 0.4rem;" />
            <textarea class="admin-form-textarea" id="aboutP2DescAr">${escapeHtml(tAr['about.p2Desc'] || '')}</textarea>
          </div>

          <div class="admin-form-group">
            <label class="admin-form-label">الركيزة الثالثة (العنوان والوصف)</label>
            <input type="text" class="admin-form-input" id="aboutP3TitleAr" value="${escapeHtml(tAr['about.p3Title'] || '')}" style="margin-bottom: 0.4rem;" />
            <textarea class="admin-form-textarea" id="aboutP3DescAr">${escapeHtml(tAr['about.p3Desc'] || '')}</textarea>
          </div>
        </div>
      </div>
    `;

    const sync = () => {
      if (!activeData.translations) activeData.translations = { en: {}, ar: {} };
      const e = activeData.translations.en;
      const a = activeData.translations.ar;

      e['about.leadQuote'] = document.getElementById('aboutQuoteEn').value;
      a['about.leadQuote'] = document.getElementById('aboutQuoteAr').value;
      e['about.body1'] = document.getElementById('aboutBody1En').value;
      a['about.body1'] = document.getElementById('aboutBody1Ar').value;
      e['about.body2'] = document.getElementById('aboutBody2En').value;
      a['about.body2'] = document.getElementById('aboutBody2Ar').value;

      e['about.p1Title'] = document.getElementById('aboutP1TitleEn').value;
      e['about.p1Desc'] = document.getElementById('aboutP1DescEn').value;
      a['about.p1Title'] = document.getElementById('aboutP1TitleAr').value;
      a['about.p1Desc'] = document.getElementById('aboutP1DescAr').value;

      e['about.p2Title'] = document.getElementById('aboutP2TitleEn').value;
      e['about.p2Desc'] = document.getElementById('aboutP2DescEn').value;
      a['about.p2Title'] = document.getElementById('aboutP2TitleAr').value;
      a['about.p2Desc'] = document.getElementById('aboutP2DescAr').value;

      e['about.p3Title'] = document.getElementById('aboutP3TitleEn').value;
      e['about.p3Desc'] = document.getElementById('aboutP3DescEn').value;
      a['about.p3Title'] = document.getElementById('aboutP3TitleAr').value;
      a['about.p3Desc'] = document.getElementById('aboutP3DescAr').value;
    };

    container.querySelectorAll('input, textarea').forEach(el => el.addEventListener('input', sync));
  }

  /* ---------------- 7. CONTACT & SOCIAL TAB ---------------- */
  function renderContactTab(container) {
    const d = activeData.designer;
    const soc = d.social || {};

    container.innerHTML = `
      <div style="margin-bottom: 1.5rem;">
        <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.25rem;">Contact & Social Links</h3>
        <p style="font-size: 0.85rem; color: var(--text-secondary);">Manage direct inquiry email, official portfolio channels, and studio details.</p>
      </div>

      <div class="admin-grid-2">
        <div>
          <div class="admin-form-group">
            <label class="admin-form-label">Primary Contact Email</label>
            <input type="email" class="admin-form-input" id="contactEmailInput" value="${escapeHtml(d.email || '')}" />
          </div>

          <div class="admin-form-group">
            <label class="admin-form-label">Behance Profile URL</label>
            <input type="url" class="admin-form-input" id="contactBehanceInput" value="${escapeHtml(soc.behance || '')}" />
          </div>

          <div class="admin-form-group">
            <label class="admin-form-label">YouTube Channel URL</label>
            <input type="url" class="admin-form-input" id="contactYoutubeInput" value="${escapeHtml(soc.youtube || '')}" />
          </div>
        </div>

        <div>
          <div class="admin-form-group">
            <label class="admin-form-label">Studio Base Location (EN)</label>
            <input type="text" class="admin-form-input" id="contactLocEn" value="${escapeHtml(d.location || 'Cairo, Egypt')}" />
          </div>

          <div class="admin-form-group" dir="rtl">
            <label class="admin-form-label">مقر الاستوديو (عربي)</label>
            <input type="text" class="admin-form-input" id="contactLocAr" value="${escapeHtml(d.location_ar || 'القاهرة، مصر')}" />
          </div>

          <div class="admin-form-group">
            <label class="admin-form-label">Timezone</label>
            <input type="text" class="admin-form-input" id="contactTzInput" value="${escapeHtml(d.timezone || 'Africa/Cairo')}" />
          </div>
        </div>
      </div>
    `;

    const sync = () => {
      d.email = document.getElementById('contactEmailInput').value.trim();
      if (!d.social) d.social = {};
      d.social.behance = document.getElementById('contactBehanceInput').value.trim();
      d.social.youtube = document.getElementById('contactYoutubeInput').value.trim();
      d.location = document.getElementById('contactLocEn').value.trim();
      d.location_ar = document.getElementById('contactLocAr').value.trim();
      d.timezone = document.getElementById('contactTzInput').value.trim();
    };

    container.querySelectorAll('input').forEach(el => el.addEventListener('input', sync));
  }

  /* ---------------- 8. SECTION VISIBILITY TAB ---------------- */
  function renderVisibilityTab(container) {
    if (!activeData.sectionVisibility) {
      activeData.sectionVisibility = { hero: true, work: true, about: true, services: true, contact: true };
    }
    const v = activeData.sectionVisibility;

    const sections = [
      { key: 'hero', name: 'Hero Section', desc: 'Main headline, background video, role badge, and marquee ticker.' },
      { key: 'work', name: 'Selected Work (Projects)', desc: 'Asymmetric grid showcasing portfolio case studies and category filters.' },
      { key: 'about', name: 'About Designer', desc: 'Narrative biography, quote, three pillars, and software tools.' },
      { key: 'services', name: 'Creative Services (01 to 07)', desc: 'Accordion list of design disciplines, taglines, and deliverables.' },
      { key: 'contact', name: 'Contact & Inquiry Section', desc: 'Direct email card, Behance, YouTube, and interactive project inquiry form.' }
    ];

    container.innerHTML = `
      <div style="margin-bottom: 1.5rem;">
        <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.25rem;">Section Visibility Controls</h3>
        <p style="font-size: 0.85rem; color: var(--text-secondary);">Show or hide entire website sections with a single click. When a section is toggled off, both the section content and its corresponding navigation link are hidden.</p>
      </div>

      <div style="display: flex; flex-direction: column;">
        ${sections.map(s => `
          <div class="admin-switch-row">
            <div class="admin-switch-label-col">
              <h4>${s.name}</h4>
              <p>${s.desc}</p>
            </div>
            <label class="admin-switch">
              <input type="checkbox" class="visibility-toggle" data-key="${s.key}" ${v[s.key] !== false ? 'checked' : ''} />
              <span class="admin-slider"></span>
            </label>
          </div>
        `).join('')}
      </div>
    `;

    container.querySelectorAll('.visibility-toggle').forEach(chk => {
      chk.addEventListener('change', () => {
        const k = chk.getAttribute('data-key');
        activeData.sectionVisibility[k] = chk.checked;
        if (typeof window.applySectionVisibility === 'function') {
          window.applySectionVisibility(activeData.sectionVisibility);
        }
      });
    });
  }

  /* ---------------- 9. EXPORT & BACKUP TAB ---------------- */
  function renderExportTab(container) {
    container.innerHTML = `
      <div style="margin-bottom: 1.5rem;">
        <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.25rem;">Backup & Data Export</h3>
        <p style="font-size: 0.85rem; color: var(--text-secondary);">Download an exact JSON snapshot of your current website content for safe keeping or Git version control.</p>
      </div>

      <div style="background: rgba(255,255,255,0.02); padding: 1.5rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); margin-bottom: 1.5rem;">
        <h4 style="font-size: 1rem; font-weight: 600; margin-bottom: 0.5rem;">Download Portfolio JSON Snapshot</h4>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">Export the current in-memory portfolio configuration to a file on your computer.</p>
        <button type="button" class="admin-btn admin-btn-secondary" id="adminExportJsonBtn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
          <span>Download portfolio-data.json</span>
        </button>
      </div>

      <div style="background: rgba(255,255,255,0.02); padding: 1.5rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
        <h4 style="font-size: 1rem; font-weight: 600; margin-bottom: 0.5rem;">Restore from JSON Backup</h4>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">Import a previously saved JSON snapshot to restore website content.</p>
        <input type="file" id="adminImportJsonFile" accept=".json" style="font-size: 0.82rem; color: var(--text-secondary);" />
        <div id="importStatusMsg" style="font-size: 0.78rem; margin-top: 0.5rem;"></div>
      </div>
    `;

    document.getElementById('adminExportJsonBtn').addEventListener('click', () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(activeData, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `portfolio-data-${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    });

    const importInput = document.getElementById('adminImportJsonFile');
    const importMsg = document.getElementById('importStatusMsg');
    importInput.addEventListener('change', () => {
      const file = importInput.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const parsed = JSON.parse(e.target.result);
          if (parsed && parsed.projects) {
            activeData = parsed;
            importMsg.textContent = '✓ Backup loaded into editor. Click "Save & Publish" to apply to live site.';
            importMsg.style.color = '#4ade80';
          } else {
            importMsg.textContent = 'Invalid portfolio data JSON structure.';
            importMsg.style.color = '#f87171';
          }
        } catch (_) {
          importMsg.textContent = 'JSON parse error.';
          importMsg.style.color = '#f87171';
        }
      };
      reader.readAsText(file);
    });
  }

  /* ---------------- 10. SAVE & PUBLISH ---------------- */
  async function handleSaveData() {
    const saveBtn = document.getElementById('adminSaveBtn');
    if (!saveBtn || !activeData) return;

    saveBtn.disabled = true;
    saveBtn.innerHTML = '<span>Saving...</span>';

    try {
      const res = await fetch('/api/admin/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`
        },
        body: JSON.stringify(activeData)
      });

      const json = await res.json();
      if (res.ok && json.success) {
        saveBtn.disabled = false;
        saveBtn.innerHTML = '<span>✓ Published!</span>';
        setTimeout(() => {
          saveBtn.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
            <span>Save & Publish</span>
          `;
        }, 2200);

        // Immediately update live website in memory
        if (typeof window.refreshPortfolioFromData === 'function') {
          window.refreshPortfolioFromData(activeData);
        }

        showAdminToast('Website changes published successfully.');
      } else {
        saveBtn.disabled = false;
        saveBtn.innerHTML = '<span>Save & Publish</span>';
        alert('Save error: ' + (json.error || 'Unauthorized'));
        if (res.status === 401) {
          adminToken = null;
          sessionStorage.removeItem('portfolio_admin_token');
          openAdminLogin();
        }
      }
    } catch (err) {
      saveBtn.disabled = false;
      saveBtn.innerHTML = '<span>Save & Publish</span>';
      alert('Save failed: Network error connecting to server.');
    }
  }

  /* ---------------- 11. LOGOUT ---------------- */
  async function handleLogout() {
    if (adminToken) {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${adminToken}` }
        });
      } catch (_) {}
    }
    adminToken = null;
    sessionStorage.removeItem('portfolio_admin_token');
    closeAdminModal();
    showAdminToast('Logged out of admin session.');
  }

  function showAdminToast(msg) {
    let toast = document.querySelector('.toast-notice');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>
      <span>${msg}</span>
    `;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
  }

  function escapeHtml(str) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

})();
