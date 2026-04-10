// Common header for AutoFlowCut guide pages
// Injects header HTML into <div id="guide-header"></div>
// Handles language dropdown, theme toggle, and SVG flag icons via flag-icons CDN
(function () {
  // Inject flag-icons CSS (SVG flags that render consistently on Windows/Mac/Linux)
  if (!document.querySelector('link[data-flag-icons]')) {
    const fiLink = document.createElement('link');
    fiLink.rel = 'stylesheet';
    fiLink.href = 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.5.0/css/flag-icons.min.css';
    fiLink.setAttribute('data-flag-icons', 'true');
    document.head.appendChild(fiLink);
  }

  // Parse current URL: /guide/{lang}/autoflowcut/{page}
  const match = window.location.pathname.match(/^\/guide\/([a-z]{2})\/autoflowcut\/(.*)$/);
  if (!match) return;
  const lang = match[1];
  const page = match[2]; // empty string for landing page

  const LANG_CONFIG = {
    en: { country: 'us', name: 'English' },
    ko: { country: 'kr', name: '한국어' },
    ja: { country: 'jp', name: '日本語' },
    de: { country: 'de', name: 'Deutsch' },
  };
  const currentLang = LANG_CONFIG[lang] || LANG_CONFIG.en;

  // Apply saved theme immediately to avoid flash
  if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.classList.add('dark');
  }

  const langDropdownItems = ['en', 'ko', 'ja', 'de']
    .map((l) => {
      const cfg = LANG_CONFIG[l];
      const activeClass =
        l === lang
          ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 font-medium'
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800';
      return `<a href="/guide/${l}/autoflowcut/${page}" class="flex items-center gap-2 px-4 py-2.5 text-sm ${activeClass}"><span class="fi fi-${cfg.country} rounded-sm" style="width: 1.25rem; height: 0.9rem;"></span>${cfg.name}</a>`;
    })
    .join('');

  const headerHTML = `
    <header class="fixed top-0 left-0 right-0 z-50 glass border-b border-gray-200 dark:border-gray-800">
      <div class="max-w-5xl mx-auto px-4">
        <div class="flex items-center justify-between h-14">
          <a href="/guide/${lang}/autoflowcut/" class="flex items-center gap-2">
            <img src="/images/autoflowcut.svg?v=20260313" alt="AutoFlowCut" class="w-8 h-8 rounded-lg">
            <span class="text-lg font-bold gradient-text">AutoFlowCut</span>
          </a>
          <div class="flex items-center gap-2">
            <div class="relative">
              <button id="langToggle" class="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors">
                <span class="fi fi-${currentLang.country} rounded-sm" style="width: 1.25rem; height: 0.9rem;"></span>
                <span>${currentLang.name}</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              <div id="langDropdown" class="hidden absolute right-0 mt-2 w-40 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden z-50">
                ${langDropdownItems}
              </div>
            </div>
            <button id="themeToggle" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              <svg class="w-5 h-5 hidden dark:block" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"/>
              </svg>
              <svg class="w-5 h-5 block dark:hidden" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  `;

  function inject() {
    const placeholder = document.getElementById('guide-header');
    if (!placeholder) return;
    placeholder.innerHTML = headerHTML;

    // Language dropdown behavior
    const langToggle = document.getElementById('langToggle');
    const langDropdown = document.getElementById('langDropdown');
    if (langToggle && langDropdown) {
      langToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        langDropdown.classList.toggle('hidden');
      });
      document.addEventListener('click', (e) => {
        if (!langToggle.contains(e.target)) {
          langDropdown.classList.add('hidden');
        }
      });
    }

    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem(
          'theme',
          document.documentElement.classList.contains('dark') ? 'dark' : 'light'
        );
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
