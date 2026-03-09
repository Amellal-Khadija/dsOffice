import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from '../../assets/images/logoDSOffice.png'
import LogoDark from '../../assets/images/logoModeDark.png'
import { useTheme } from '../../context/ThemeContext'
import { useLanguage } from '../../context/LanguageContext'
import { getTranslation } from '../../translations'
import { FaMoon, FaSun, FaGlobe } from 'react-icons/fa'

/* ═══════════════════════════════════════════
   DESIGN SYSTEM
   Dominant : Gris anthracite (#3A3A3A + variantes)
   Accent   : Rouge vif (#E31E24) — utilisé avec parcimonie
   Base     : Blanc pur
═══════════════════════════════════════════ */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=DM+Sans:wght@300;400;500;600&display=swap');

  :root {
    --red:          #E31E24;
    --red-soft:     rgba(227, 30, 36, 0.06);
    --anthracite:   #3A3A3A;
    --anthracite-2: #555555;
    --anthracite-3: #888888;
    --border:       rgba(58, 58, 58, 0.10);
    --border-hover: rgba(58, 58, 58, 0.22);
    --bg-glass:     rgba(255, 255, 255, 0.97);
    --bg-flat:      rgba(255, 255, 255, 0.98);
    --white:        #FFFFFF;
    --shadow-sm:    0 1px 0 rgba(0,0,0,0.055), 0 2px 12px rgba(0,0,0,0.04);
    --shadow-md:    0 1px 0 rgba(0,0,0,0.08),  0 8px 32px rgba(0,0,0,0.07);
  }

  /* ── DARK MODE — appliqué sur .menu-root et .mobile-menu ── */
  .menu-root.dark-mode,
  .mobile-menu.dark-mode {
    --anthracite:   #F5F5F5;
    --anthracite-2: #E0E0E0;
    --anthracite-3: #A0A0A0;
    --border:       rgba(255, 255, 255, 0.12);
    --border-hover: rgba(255, 255, 255, 0.20);
    --bg-glass:     rgba(26, 26, 26, 0.97);
    --bg-flat:      rgba(22, 22, 22, 0.98);
    --white:        #1A1A1A;
    --shadow-sm:    0 1px 0 rgba(0,0,0,0.30), 0 2px 12px rgba(0,0,0,0.40);
    --shadow-md:    0 1px 0 rgba(0,0,0,0.40),  0 8px 32px rgba(0,0,0,0.55);
  }

  /* ── BASE ── */
  .menu-root {
    font-family: 'DM Sans', sans-serif;
  }

  /* ── HEADER STATES ── */
  .menu-header {
    transition: background 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
  }

  .menu-header.is-flat {
    background: var(--bg-flat);
    box-shadow: var(--shadow-sm);
    border-bottom: 1px solid var(--border);
  }

  .menu-header.is-scrolled {
    background: var(--bg-glass);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    box-shadow: var(--shadow-md);
    border-bottom: 1px solid var(--border-hover);
  }

  /* ── LOGO ── */
  .logo-wrap {
    display: flex;
    align-items: center;
    gap: 11px;
    text-decoration: none;
    outline: none;
  }

  .logo-img-box {
    position: relative;
    flex-shrink: 0;
    transition: transform 0.25s ease;
  }

  .logo-img-box img {
    display: block;
    border-radius: 6px;
  }

  .logo-wrap:hover .logo-img-box {
    transform: scale(1.05);
  }

  /* Fine red line accent under logo */
  .logo-img-box::after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 4px;
    right: 4px;
    height: 2px;
    background: var(--red);
    border-radius: 1px;
    opacity: 0;
    transform: scaleX(0);
    transition: opacity 0.25s ease, transform 0.25s ease;
  }

  .logo-wrap:hover .logo-img-box::after {
    opacity: 1;
    transform: scaleX(1);
  }

  .logo-text {
    display: flex;
    flex-direction: column;
    line-height: 1;
  }

  .logo-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--anthracite);
    letter-spacing: 0.04em;
  }

  .logo-tagline {
    font-size: 0.62rem;
    font-weight: 500;
    color: var(--anthracite-3);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-top: 2px;
  }

  /* ── NAVIGATION LINKS ── */
  .nav-items {
    display: flex;
    align-items: center;
    gap: 2px;
  }

  .nav-link {
    position: relative;
    display: inline-flex;
    align-items: center;
    padding: 8px 15px;
    font-size: 0.82rem;
    font-weight: 500;
    letter-spacing: 0.025em;
    text-decoration: none;
    border-radius: 5px;
    color: var(--anthracite-2);
    white-space: nowrap;
    transition: color 0.2s ease, background 0.2s ease;
    outline: none;
    overflow: hidden;
  }

  /* Background fill on hover — grey, not red */
  .nav-link::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(58, 58, 58, 0.06);
    border-radius: 5px;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  /* Dark mode: hover bg plus visible */
  .menu-root.dark-mode .nav-link::before {
    background: rgba(255, 255, 255, 0.08);
  }

  .nav-link:hover::before { opacity: 1; }
  .nav-link:hover { color: var(--anthracite); }

  /* Active state */
  .nav-link.is-active {
    color: var(--anthracite);
    font-weight: 600;
  }

  .nav-link.is-active::before {
    opacity: 1;
    background: rgba(58, 58, 58, 0.07);
  }

  .menu-root.dark-mode .nav-link.is-active::before {
    background: rgba(255, 255, 255, 0.10);
  }

  /* Bottom indicator — slim grey line, red dot at center */
  .nav-link .indicator {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 2px;
    border-radius: 1px;
    background: var(--anthracite);
    width: 0;
    transition: width 0.25s ease;
  }

  .nav-link.is-active .indicator {
    width: 60%;
    background: var(--anthracite);
  }

  .nav-link:not(.is-active):hover .indicator {
    width: 40%;
    background: var(--anthracite-3);
  }

  /* Red dot — only on active */
  .nav-link.is-active .indicator::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: var(--red);
  }

  /* ── CTA BUTTON (Rendez-vous) ── */
  .nav-cta {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 7px;
    margin-left: 10px;
    padding: 8px 18px;
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-decoration: none;
    border-radius: 5px;
    color: var(--white);
    background: var(--anthracite);
    white-space: nowrap;
    overflow: hidden;
    transition: background 0.25s ease, transform 0.2s ease, box-shadow 0.25s ease;
    box-shadow: 0 2px 8px rgba(58,58,58,0.20);
  }

  /* In dark mode, invert button to be light on dark */
  .menu-root.dark-mode .nav-cta {
    background: rgba(245, 245, 245, 0.12);
    color: #F5F5F5;
    border: 1px solid rgba(255,255,255,0.15);
    box-shadow: 0 2px 8px rgba(0,0,0,0.30);
  }

  /* Red sweep on hover */
  .nav-cta::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--red);
    transform: translateX(-101%);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 5px;
  }

  .nav-cta:hover::before { transform: translateX(0); }
  .nav-cta:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(227,30,36,0.28);
    color: #FFFFFF;
  }

  .nav-cta span { position: relative; z-index: 1; }
  .nav-cta .cta-dot {
    position: relative; z-index: 1;
    width: 5px; height: 5px;
    border-radius: 50%;
    background: var(--red);
    transition: background 0.25s ease;
    flex-shrink: 0;
  }
  .nav-cta:hover .cta-dot { background: rgba(255,255,255,0.7); }

  /* ── DIVIDER ── */
  .nav-divider {
    width: 1px;
    height: 18px;
    background: var(--border-hover);
    margin: 0 8px;
    flex-shrink: 0;
  }

  /* ── THEME TOGGLE ── */
  .theme-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    padding: 0;
    background: rgba(58, 58, 58, 0.06);
    border: 1px solid var(--border);
    border-radius: 50%;
    color: var(--anthracite-2);
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.3s ease;
    flex-shrink: 0;
  }

  .theme-toggle:hover {
    background: rgba(58, 58, 58, 0.1);
    border-color: var(--border-hover);
    color: var(--red);
    transform: rotate(15deg) scale(1.05);
  }

  .menu-root.dark-mode .theme-toggle,
  .mobile-menu.dark-mode .theme-toggle {
    background: rgba(255, 255, 255, 0.08);
    color: var(--anthracite-2);
  }

  .menu-root.dark-mode .theme-toggle:hover,
  .mobile-menu.dark-mode .theme-toggle:hover {
    background: rgba(255, 255, 255, 0.15);
    color: var(--red);
  }

  /* ── LANGUAGE SELECTOR ── */
  .lang-selector {
    position: relative;
    display: inline-flex;
    flex-shrink: 0;
  }

  .lang-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    padding: 8px 12px;
    background: rgba(58, 58, 58, 0.06);
    border: 1px solid var(--border);
    border-radius: 20px;
    color: var(--anthracite-2);
    font-size: 0.78rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    white-space: nowrap;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .lang-toggle:hover {
    background: rgba(58, 58, 58, 0.1);
    border-color: var(--border-hover);
    color: var(--anthracite);
  }

  .menu-root.dark-mode .lang-toggle,
  .mobile-menu.dark-mode .lang-toggle {
    background: rgba(255, 255, 255, 0.08);
    color: var(--anthracite-2);
  }

  .menu-root.dark-mode .lang-toggle:hover,
  .mobile-menu.dark-mode .lang-toggle:hover {
    background: rgba(255, 255, 255, 0.15);
    color: var(--anthracite);
  }

  .lang-dropdown {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    min-width: 140px;
    background: var(--bg-glass);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid var(--border-hover);
    border-radius: 8px;
    box-shadow: var(--shadow-md);
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all 0.3s ease;
    z-index: 100;
    overflow: hidden;
  }

  .lang-selector.is-open .lang-dropdown {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .lang-option {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    font-size: 0.82rem;
    font-weight: 500;
    color: var(--anthracite-2);
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
    background: transparent;
    width: 100%;
    text-align: left;
  }

  .lang-option:hover {
    background: rgba(58, 58, 58, 0.06);
    color: var(--anthracite);
  }

  .menu-root.dark-mode .lang-option:hover {
    background: rgba(255, 255, 255, 0.08);
  }

  .lang-option.is-active {
    background: var(--red-soft);
    color: var(--red);
    font-weight: 600;
  }

  .lang-flag {
    font-size: 1.1rem;
    flex-shrink: 0;
  }

  /* ── SCROLL PROGRESS BAR ── */
  .scroll-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--red) 0%, var(--anthracite) 100%);
    transition: width 0.1s linear;
    pointer-events: none;
  }

  /* ── HAMBURGER BUTTON ── */
  .hamburger-btn {
    display: none;
    flex-direction: column;
    gap: 5px;
    padding: 8px;
    background: transparent;
    border: none;
    cursor: pointer;
    z-index: 1001;
    transition: transform 0.3s ease;
  }

  .hamburger-line {
    width: 24px;
    height: 2px;
    background: var(--anthracite);
    border-radius: 2px;
    transition: all 0.3s ease;
  }

  .hamburger-btn.is-open .hamburger-line:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
  }

  .hamburger-btn.is-open .hamburger-line:nth-child(2) {
    opacity: 0;
  }

  .hamburger-btn.is-open .hamburger-line:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
  }

  /* ── MOBILE MENU OVERLAY ── */
  .mobile-menu-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.55);
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
    z-index: 999;
  }

  .mobile-menu-overlay.is-open {
    opacity: 1;
    visibility: visible;
  }

  /* ── MOBILE MENU PANEL ── */
  .mobile-menu {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 280px;
    max-width: 85%;
    background: var(--white);
    box-shadow: -4px 0 24px rgba(0, 0, 0, 0.15);
    transform: translateX(100%);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), background 0.35s ease;
    z-index: 1000;
    overflow-y: auto;
    padding: 80px 24px 24px;
  }

  .mobile-menu.is-open {
    transform: translateX(0);
  }

  .mobile-nav-items {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .mobile-nav-link {
    display: flex;
    align-items: center;
    padding: 14px 16px;
    font-size: 0.95rem;
    font-weight: 500;
    letter-spacing: 0.025em;
    text-decoration: none;
    border-radius: 6px;
    color: var(--anthracite-2);
    transition: all 0.2s ease;
  }

  .mobile-nav-link:hover {
    background: rgba(58, 58, 58, 0.06);
    color: var(--anthracite);
  }

  .mobile-menu.dark-mode .mobile-nav-link:hover {
    background: rgba(255, 255, 255, 0.08);
  }

  .mobile-nav-link.is-active {
    background: var(--red-soft);
    color: var(--anthracite);
    font-weight: 600;
    border-left: 3px solid var(--red);
  }

  .mobile-menu.dark-mode .mobile-nav-link.is-active {
    background: rgba(227, 30, 36, 0.12);
  }

  .mobile-nav-divider {
    height: 1px;
    background: var(--border);
    margin: 12px 0;
  }

  .mobile-nav-cta {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 14px 20px;
    margin-top: 12px;
    font-size: 0.9rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-decoration: none;
    border-radius: 6px;
    color: #FFFFFF;
    background: var(--anthracite);
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(58,58,58,0.20);
  }

  .mobile-menu.dark-mode .mobile-nav-cta {
    background: rgba(245, 245, 245, 0.12);
    border: 1px solid rgba(255,255,255,0.15);
    color: #F5F5F5;
  }

  .mobile-nav-cta:hover {
    background: var(--red) !important;
    border-color: transparent !important;
    color: #FFFFFF;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(227,30,36,0.28);
  }

  .mobile-nav-cta .cta-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--red);
    transition: background 0.25s ease;
  }

  .mobile-nav-cta:hover .cta-dot {
    background: rgba(255,255,255,0.7);
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 768px) {
    .nav-items {
      display: none;
    }

    .hamburger-btn {
      display: flex;
    }

    .logo-text {
      display: none;
    }

    nav {
      padding: 0 1.5rem !important;
    }
  }

  @media (min-width: 769px) {
    .mobile-menu,
    .mobile-menu-overlay {
      display: none !important;
    }
  }
`

export default function Menu() {
  const [scrolled, setScrolled]             = useState(false)
  const [scrollPct, setScrollPct]           = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [langDropdownOpen, setLangDropdownOpen] = useState(false)
  const location                            = useLocation()
  const { isDark, toggleTheme }             = useTheme()
  const { language, changeLanguage }        = useLanguage()
  const t = getTranslation(language)

  /* ── Scroll tracking ── */
  useEffect(() => {
    const onScroll = () => {
      const y   = window.scrollY
      const max = document.body.scrollHeight - window.innerHeight
      setScrolled(y > 10)
      setScrollPct(max > 0 ? (y / max) * 100 : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── Close mobile menu on route change ── */
  useEffect(() => { setMobileMenuOpen(false) }, [location])

  /* ── Lock body scroll when mobile menu is open ── */
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileMenuOpen])

  /* ── Close language dropdown when clicking outside ── */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langDropdownOpen && !e.target.closest('.lang-selector')) {
        setLangDropdownOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [langDropdownOpen])

  const menuItems = [
    { path: '/',         label: t.nav.home  },
    { path: '/a-propos', label: t.nav.about },
    { path: '/services', label: t.nav.services },
    { path: '/contact',  label: t.nav.contact  },
  ]

  const languages = [
    { code: 'fr', flag: '🇫🇷', name: 'Français' },
    { code: 'en', flag: '🇬🇧', name: 'English' },
    { code: 'ar', flag: '🇸🇦', name: 'العربية' },
  ]

  const currentLang = languages.find(lang => lang.code === language) || languages[0]

  const isActive    = (path) => location.pathname === path
  const darkClass   = isDark ? 'dark-mode' : ''

  return (
    <>
      <style>{styles}</style>

      {/* ── HEADER ── */}
      <header
        className={`menu-root menu-header ${darkClass} sticky top-0 z-50 ${
          scrolled ? 'is-scrolled' : 'is-flat'
        }`}
        style={{ position: 'sticky', top: 0 }}
      >
        {/* Scroll progress bar */}
        <div className="scroll-bar" style={{ width: `${scrollPct}%` }} />

        <nav
          style={{
            maxWidth:       '1280px',
            margin:         '0 auto',
            padding:        '0 2.5rem',
            height:         '64px',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'space-between',
          }}
        >
          {/* ── Logo ── */}
          <Link to="/" className="logo-wrap">
            <div className="logo-img-box">
              <img
                src={isDark ? LogoDark : Logo}
                alt="DS Office"
                width={44}
                height={44}
              />
            </div>
          </Link>

          {/* ── Nav links (desktop) ── */}
          <div className="nav-items">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${isActive(item.path) ? 'is-active' : ''}`}
              >
                {item.label}
                <span className="indicator" />
              </Link>
            ))}

            <div className="nav-divider" />

            {/* Theme toggle */}
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={isDark ? 'Mode clair' : 'Mode sombre'}
              title={isDark ? 'Activer le mode clair' : 'Activer le mode sombre'}
            >
              {isDark ? <FaSun /> : <FaMoon />}
            </button>

            <div className="nav-divider" />

            {/* Language selector */}
            <div className={`lang-selector ${langDropdownOpen ? 'is-open' : ''}`}>
              <button
                className="lang-toggle"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                aria-label="Changer de langue"
              >
                <FaGlobe />
                <span>{currentLang.flag}</span>
              </button>
              <div className="lang-dropdown">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className={`lang-option ${language === lang.code ? 'is-active' : ''}`}
                    onClick={() => {
                      changeLanguage(lang.code)
                      setLangDropdownOpen(false)
                    }}
                  >
                    <span className="lang-flag">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="nav-divider" />

            {/* CTA */}
            <Link to="/rendez-vous" className="nav-cta">
              <span className="cta-dot" />
              <span>{t.nav.appointment}</span>
            </Link>
          </div>

          {/* ── Hamburger button (mobile) ── */}
          <button
            className={`hamburger-btn ${mobileMenuOpen ? 'is-open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </nav>

        {/* ── Mobile overlay ── */}
        <div
          className={`mobile-menu-overlay ${mobileMenuOpen ? 'is-open' : ''}`}
          onClick={() => setMobileMenuOpen(false)}
        />
      </header>

      {/* ── Mobile menu panel — OUTSIDE <header> pour éviter le z-index ── */}
      {/* Rendu en portail si besoin, mais ici simplement en fixed */}
      <div className={`mobile-menu ${darkClass} ${mobileMenuOpen ? 'is-open' : ''}`}>
        <div className="mobile-nav-items">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`mobile-nav-link ${isActive(item.path) ? 'is-active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          <div className="mobile-nav-divider" />

          {/* Theme toggle mobile */}
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={isDark ? 'Mode clair' : 'Mode sombre'}
            style={{ margin: '0 auto 12px', display: 'flex' }}
          >
            {isDark ? <FaSun /> : <FaMoon />}
          </button>

          {/* Language selector mobile */}
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', margin: '12px 0' }}>
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                style={{
                  padding: '8px 14px',
                  background: language === lang.code ? 'var(--red-soft)' : 'rgba(58, 58, 58, 0.06)',
                  border: `1px solid ${language === lang.code ? 'var(--red)' : 'var(--border)'}`,
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '0.82rem',
                  fontWeight: language === lang.code ? '600' : '500',
                  color: language === lang.code ? 'var(--red)' : 'var(--anthracite-2)',
                  transition: 'all 0.2s ease'
                }}
              >
                {lang.flag} {lang.name}
              </button>
            ))}
          </div>

          <Link
            to="/rendez-vous"
            className="mobile-nav-cta"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="cta-dot" />
            <span>{t.nav.appointment}</span>
          </Link>
        </div>
      </div>
    </>
  )
}