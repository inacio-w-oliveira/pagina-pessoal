import { initI18n, getLang, t } from './i18n.js';
import { projects } from './projects.js';

const THEME_KEY = 'iwo.theme';

/* Tema ------------------------------------------------------------------- */
function updateThemeButton() {
  const btn = document.querySelector('.theme-toggle');
  if (!btn) return;

  const isDark = document.documentElement.dataset.theme === 'dark';
  btn.setAttribute('aria-pressed', String(isDark));
  btn.setAttribute('aria-label', t(isDark ? 'theme.toLight' : 'theme.toDark'));
}

function initTheme() {
  const btn = document.querySelector('.theme-toggle');

  updateThemeButton();

  if (!btn) return;

  btn.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    document.documentElement.style.colorScheme = next;

    try {
      localStorage.setItem(THEME_KEY, next);
    } catch (e) {
      /* storage indisponível */
    }

    updateThemeButton();
  });
}

/* Header ----------------------------------------------------------------- */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* Menu mobile ------------------------------------------------------------ */
function initMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('site-nav');
  if (!toggle || !nav) return;

  const focusable = () => Array.from(nav.querySelectorAll('a[href]'));

  const close = ({ restoreFocus = true } = {}) => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', t('nav.menu'));
    if (restoreFocus) toggle.focus();
  };

  const open = () => {
    nav.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', t('nav.close'));
    const first = focusable()[0];
    if (first) first.focus();
  };

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) close();
    else open();
  });

  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) close({ restoreFocus: false });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      close();
    }
  });

  document.addEventListener('click', (event) => {
    if (toggle.getAttribute('aria-expanded') !== 'true') return;
    if (nav.contains(event.target) || toggle.contains(event.target)) return;
    close({ restoreFocus: false });
  });

  const mq = window.matchMedia('(min-width: 768px)');
  mq.addEventListener('change', (event) => {
    if (event.matches) close({ restoreFocus: false });
  });

  document.addEventListener('iwo:langchange', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-label', t(isOpen ? 'nav.close' : 'nav.menu'));
  });
}

/* Revelação ao rolar ----------------------------------------------------- */
function initReveal() {
  const targets = document.querySelectorAll('.hero__content, .hero__media, .section > .container');
  if (!targets.length) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduced || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('reveal', 'is-visible'));
    return;
  }

  targets.forEach((el) => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
  );

  targets.forEach((el) => observer.observe(el));
}

/* Navegação ativa -------------------------------------------------------- */
function initActiveNav() {
  const links = Array.from(document.querySelectorAll('.site-nav__link'));
  if (!links.length || !('IntersectionObserver' in window)) return;

  const map = new Map();
  links.forEach((link) => {
    const id = link.getAttribute('href')?.replace('#', '');
    const section = id ? document.getElementById(id) : null;
    if (section) map.set(section, link);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => link.removeAttribute('aria-current'));
        const link = map.get(entry.target);
        if (link) link.setAttribute('aria-current', 'page');
      });
    },
    { rootMargin: '-45% 0px -45% 0px' }
  );

  map.forEach((_, section) => observer.observe(section));
}

/* Ano do rodapé ---------------------------------------------------------- */
function initYear() {
  const el = document.querySelector('[data-year]');
  if (el) el.textContent = String(new Date().getFullYear());
}

/* Projetos --------------------------------------------------------------- */
function createCard(project, lang) {
  const article = document.createElement('article');
  article.className = 'card card--project';

  if (project.image) {
    const img = document.createElement('img');
    img.className = 'card__media';
    img.src = project.image;
    img.alt = project.title[lang] || project.title.pt;
    img.width = 800;
    img.height = 450;
    img.loading = 'lazy';
    article.appendChild(img);
  }

  const body = document.createElement('div');
  body.className = 'card__body';

  const title = document.createElement('h3');
  title.className = 'card__title';
  title.textContent = project.title[lang] || project.title.pt;
  body.appendChild(title);

  const desc = document.createElement('p');
  desc.className = 'card__desc';
  desc.textContent = project.description[lang] || project.description.pt;
  body.appendChild(desc);

  if (Array.isArray(project.tags) && project.tags.length) {
    const list = document.createElement('ul');
    list.className = 'tags';
    list.setAttribute('aria-label', t('projects.tagsLabel', lang));

    project.tags.forEach((tag) => {
      const item = document.createElement('li');
      item.className = 'tag';
      item.textContent = tag;
      list.appendChild(item);
    });

    body.appendChild(list);
  }

  const links = document.createElement('div');
  links.className = 'card__links';

  if (project.repoUrl) {
    const repo = document.createElement('a');
    repo.className = 'card__link';
    repo.href = project.repoUrl;
    repo.target = '_blank';
    repo.rel = 'noopener noreferrer';
    repo.textContent = t('projects.viewCode', lang);
    links.appendChild(repo);
  }

  if (project.liveUrl) {
    const live = document.createElement('a');
    live.className = 'card__link';
    live.href = project.liveUrl;
    live.target = '_blank';
    live.rel = 'noopener noreferrer';
    live.textContent = t('projects.viewLive', lang);
    links.appendChild(live);
  }

  body.appendChild(links);
  article.appendChild(body);

  return article;
}

function renderProjects() {
  const grid = document.getElementById('projects-grid');
  const empty = document.getElementById('projects-empty');
  if (!grid || !empty) return;

  const lang = getLang();

  if (!projects.length) {
    grid.hidden = true;
    grid.replaceChildren();
    empty.hidden = false;
    return;
  }

  empty.hidden = true;
  grid.hidden = false;
  grid.replaceChildren(...projects.map((project) => createCard(project, lang)));
}

/* Inicialização ---------------------------------------------------------- */
function init() {
  initI18n();
  initTheme();
  initHeader();
  initMenu();
  initReveal();
  initActiveNav();
  initYear();
  renderProjects();

  document.addEventListener('iwo:langchange', () => {
    updateThemeButton();
    renderProjects();
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
