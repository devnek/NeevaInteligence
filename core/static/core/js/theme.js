/**
 * NeevaIntelligence — Theme & Navigation Logic
 * Handles dark/light mode switching, persistence, and mobile hamburger menu.
 */

(function () {
    const THEME_KEY = 'user-theme';

    /* ---- Theme Helpers ---- */
    const getStoredTheme = () => localStorage.getItem(THEME_KEY);
    const setStoredTheme = (theme) => localStorage.setItem(THEME_KEY, theme);

    const getPreferredTheme = () => {
        const stored = getStoredTheme();
        if (stored) return stored;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);

        if (document.body) {
            document.body.setAttribute('data-theme', theme);
        }

        const darkIcon = document.getElementById('theme-toggle-dark-icon');
        const lightIcon = document.getElementById('theme-toggle-light-icon');

        if (darkIcon && lightIcon) {
            if (theme === 'dark') {
                darkIcon.classList.add('hidden');
                lightIcon.classList.remove('hidden');
            } else {
                darkIcon.classList.remove('hidden');
                lightIcon.classList.add('hidden');
            }
        }
    };

    /* ---- Apply theme immediately (before DOM paint) ---- */
    applyTheme(getPreferredTheme());

    /* ---- DOM-ready setup ---- */
    document.addEventListener('DOMContentLoaded', () => {
        /* Theme Toggle */
        const themeBtn = document.getElementById('theme-toggle');
        if (themeBtn) {
            applyTheme(getPreferredTheme());

            themeBtn.addEventListener('click', () => {
                const current = document.documentElement.getAttribute('data-theme') || 'dark';
                const next = current === 'dark' ? 'light' : 'dark';
                setStoredTheme(next);
                applyTheme(next);
            });
        }

        /* System theme changes */
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!getStoredTheme()) {
                applyTheme(e.matches ? 'dark' : 'light');
            }
        });

        /* Hamburger Menu Toggle */
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('nav-links');

        if (hamburger && navLinks) {
            hamburger.addEventListener('click', () => {
                const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
                hamburger.setAttribute('aria-expanded', String(!isOpen));
                navLinks.classList.toggle('nav-open');

                /* Prevent body scroll when mobile menu is open */
                document.body.style.overflow = isOpen ? '' : 'hidden';
            });

            /* Close mobile menu when a nav link is clicked */
            navLinks.querySelectorAll('a').forEach((link) => {
                link.addEventListener('click', () => {
                    if (navLinks.classList.contains('nav-open')) {
                        hamburger.setAttribute('aria-expanded', 'false');
                        navLinks.classList.remove('nav-open');
                        document.body.style.overflow = '';
                    }
                });
            });

            /* Close mobile menu on Escape key */
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && navLinks.classList.contains('nav-open')) {
                    hamburger.setAttribute('aria-expanded', 'false');
                    navLinks.classList.remove('nav-open');
                    document.body.style.overflow = '';
                    hamburger.focus();
                }
            });
        }
    });
})();
