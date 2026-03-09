import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlane, FaGraduationCap, FaBriefcase, FaUsers, FaHospital, FaGlobe, FaClipboardList, FaBolt, FaLock, FaWhatsapp, FaCalendarAlt, FaArrowRight } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from '../../hooks/useTranslation';
import Img1 from "../../assets/images/img1.jpg";
import Img2 from "../../assets/images/img2.jpeg";
import Img3 from "../../assets/images/img3.jpg";
import Img4 from "../../assets/images/image4.jpg";

/* ══════════════════════════════════════
   HOOK — Scroll reveal
══════════════════════════════════════ */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ══════════════════════════════════════
   DATA - Now using translations
══════════════════════════════════════ */

// SERVICES - Now dynamic, created in component with translations

// COUNTRIES - Now dynamic, created in component with translations

// ABOUT_POINTS - Now dynamic, created in component with translations

const WA_NUMBER = "212653633280";
const WA_BASE   = `https://wa.me/${WA_NUMBER}`;

/* ══════════════════════════════════════
   CSS
══════════════════════════════════════ */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

/* ── LIGHT MODE (scoped à .ds-root) ── */
.ds-root {
  --anthracite:   #3A3A3A;
  --anthracite-2: #555555;
  --anthracite-3: #888888;
  --red:          #E31E24;
  --red-soft:     rgba(227, 30, 36, 0.07);
  --red-shadow:   rgba(227, 30, 36, 0.18);
  --gray-light:   #F8F8F8;
  --gray-border:  #E8E8E8;
  --white:        #FFFFFF;
  --surface:      #FFFFFF;
  --shadow-sm:    rgba(0, 0, 0, 0.06);
  --shadow-md:    rgba(0, 0, 0, 0.10);
  --success:      #10B981;
}

/* ── DARK MODE (scoped à .ds-root.dark-mode) ── */
.ds-root.dark-mode {
  --anthracite:   #F0F0F0;
  --anthracite-2: #C8C8C8;
  --anthracite-3: #888888;
  --gray-light:   #1E1E1E;
  --gray-border:  rgba(255, 255, 255, 0.12);
  --white:        #121212;
  --surface:      #1A1A1A;
  --shadow-sm:    rgba(0, 0, 0, 0.40);
  --shadow-md:    rgba(0, 0, 0, 0.55);
}

/* ── BASE ── */
.ds-root * { box-sizing: border-box; margin: 0; padding: 0; }
.ds-root {
  font-family: 'DM Sans', sans-serif;
  color: var(--anthracite);
  background: var(--white);
  overflow-x: hidden;
  line-height: 1.6;
  transition: background 0.35s ease, color 0.35s ease;
}
.ds-root a:not(.btn):not(.btn-blue):not(.btn-wa):not(.btn-white) { text-decoration: none; color: inherit; }
.ds-root img { max-width: 100%; display: block; }

/* ── HERO ── */
.ds-hero {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 60px;
  padding: 96px 6vw 60px;
  background: var(--white);
  position: relative;
  overflow: hidden;
  transition: background 0.35s ease;
}
.ds-hero::before {
  content: '';
  position: absolute; top: -120px; right: -120px;
  width: 600px; height: 600px; border-radius: 50%;
  background: radial-gradient(circle, rgba(58, 58, 58, 0.03) 0%, transparent 70%);
  pointer-events: none;
}
.ds-root.dark-mode .ds-hero::before {
  background: radial-gradient(circle, rgba(227, 30, 36, 0.04) 0%, transparent 70%);
}

.hero-badge {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 8px 20px; background: var(--gray-light); border: 1.5px solid var(--gray-border);
  border-radius: 4px; font-size: 0.7rem; font-weight: 600;
  letter-spacing: 0.12em; text-transform: uppercase; color: var(--anthracite-2);
  margin-bottom: 28px;
  animation: fadeUp 0.7s ease both;
}
.badge-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--red); animation: pulse 2s infinite;
}
@keyframes pulse {
  0%,100% { opacity:1; transform:scale(1); }
  50% { opacity:0.6; transform:scale(1.4); }
}
.hero-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2.8rem, 5vw, 4.4rem); font-weight: 600;
  line-height: 1.15; color: var(--anthracite); margin-bottom: 22px;
  animation: fadeUp 0.7s 0.1s ease both;
}
.hero-title .accent { color: var(--red); font-weight: 700; }
.hero-desc {
  font-size: 1.05rem; font-weight: 400; line-height: 1.8;
  color: var(--anthracite-2); max-width: 480px; margin-bottom: 36px;
  animation: fadeUp 0.7s 0.2s ease both;
}
.hero-actions {
  display: flex; gap: 14px; flex-wrap: wrap;
  margin-bottom: 36px; animation: fadeUp 0.7s 0.3s ease both;
}

/* Hero visual */
.hero-visual {
  display: grid; grid-template-columns: 1fr 1fr; gap: 14px;
  animation: fadeIn 1s 0.5s ease both; z-index: 1;
}
.hv-card {
  border-radius: 6px; overflow: hidden;
  box-shadow: 0 4px 20px var(--shadow-sm);
  transition: transform 0.3s, box-shadow 0.3s;
}
.hv-card:hover { transform: translateY(-4px); box-shadow: 0 8px 32px var(--shadow-md); }
.hv-card img { width: 100%; height: 180px; object-fit: cover; display: block; }
.hv-card.tall { grid-row: span 2; }
.hv-card.tall img { height: 100%; min-height: 374px; }
.hv-stat {
  background: var(--anthracite);
  border-radius: 6px; padding: 24px 20px; color: white;
  box-shadow: 0 4px 20px var(--shadow-md);
  position: relative; overflow: hidden;
}
/* Dark mode: anthracite is now #F0F0F0 — use a fixed dark bg for this card */
.ds-root.dark-mode .hv-stat {
  background: #2A2A2A;
  border: 1px solid rgba(255,255,255,0.10);
}
.hv-stat::before {
  content: ''; position: absolute; top: 0; right: 0;
  width: 40px; height: 40px; background: var(--red);
  border-radius: 0 0 0 100%; opacity: 0.15;
}
.hv-stat .num {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.8rem; font-weight: 600; line-height: 1; margin-bottom: 4px;
}
.hv-stat .lbl { font-size: 0.78rem; opacity: 0.85; }
.hv-info { padding: 14px 16px; background: var(--surface); transition: background 0.35s ease; }
.hv-info strong { display: block; font-size: 0.88rem; font-weight: 600; color: var(--anthracite); margin-bottom: 3px; }
.hv-info span { font-size: 0.76rem; color: var(--anthracite-3); }

/* ── BUTTONS ── */
.btn {
  position: relative;
  display: inline-flex; align-items: center; gap: 10px;
  padding: 14px 28px; border-radius: 5px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9rem; font-weight: 600; cursor: pointer;
  border: none; text-decoration: none;
  letter-spacing: 0.025em; overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.btn-blue { background: var(--anthracite); color: white; box-shadow: 0 2px 8px var(--shadow-sm); z-index: 1; }
.ds-root.dark-mode .btn-blue { background: #2E2E2E; border: 1px solid rgba(255,255,255,0.14); }
.btn-blue::before { content: ''; position: absolute; inset: 0; background: var(--red); transform: translateX(-101%); transition: transform 0.3s ease; z-index: -1; }
.btn-blue:hover::before { transform: translateX(0); }
.btn-blue:hover { transform: translateY(-2px); box-shadow: 0 6px 20px var(--red-shadow); color: white; }
.btn-blue > * { position: relative; z-index: 1; }
.btn-wa { background: var(--success); color: white; box-shadow: 0 2px 8px rgba(16,185,129,0.20); }
.btn-wa:hover { background: #059669; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(16,185,129,0.30); color: white; }

/* ── STATS BAND ── */
.ds-stats {
  padding: 52px 6vw;
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; text-align: center;
  position: relative;
  background: #2A2A2A;
  transition: background 0.35s ease;
}
.ds-root.dark-mode .ds-stats { background: #111111; }
.ds-stats::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0;
  height: 2px; background: linear-gradient(90deg, var(--red) 0%, #2A2A2A 100%);
}
.ds-root.dark-mode .ds-stats::before {
  background: linear-gradient(90deg, var(--red) 0%, #111111 100%);
}
.stat-item { color: white; }
.stat-item .num {
  font-family: 'Cormorant Garamond', serif;
  font-size: 3.2rem; font-weight: 600; color: white; line-height: 1; margin-bottom: 8px;
  position: relative;
}
.stat-item .num::after {
  content: ''; position: absolute; bottom: -6px; left: 50%; transform: translateX(-50%);
  width: 24px; height: 2px; background: var(--red);
}
.stat-item .lbl { font-size: 0.88rem; opacity: 0.75; font-weight: 400; }

/* ── SECTION COMMONS ── */
.ds-section { padding: 88px 6vw; }
.section-tag {
  display: inline-block; font-size: 0.7rem; font-weight: 700;
  letter-spacing: 0.16em; text-transform: uppercase; color: var(--anthracite-2); margin-bottom: 12px;
  padding: 4px 12px; background: var(--gray-light); border-radius: 3px;
  border-left: 2px solid var(--red);
  transition: background 0.35s ease, color 0.35s ease;
}
.section-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2rem, 3.5vw, 3.2rem); font-weight: 600;
  color: var(--anthracite); line-height: 1.25; margin-bottom: 14px;
}
.section-title .accent { color: var(--red); font-weight: 700; }
.section-sub { font-size: 1rem; color: var(--anthracite-2); line-height: 1.8; max-width: 560px; }
.section-center { text-align: center; margin-bottom: 56px; }
.section-center .section-sub { margin: 0 auto; }

/* ── ABOUT ── */
.ds-about { background: var(--gray-light); transition: background 0.35s ease; }
.about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center; }
.about-images { position: relative; height: 480px; }
.about-img-main {
  position: absolute; top: 0; left: 0; width: 72%; height: 100%;
  object-fit: cover; border-radius: 6px; 
  box-shadow: 0 8px 32px var(--shadow-md);
}
.about-img-accent {
  position: absolute; bottom: -28px; right: 0; width: 52%; height: 55%;
  object-fit: cover; border-radius: 6px;
  box-shadow: 0 8px 32px var(--shadow-md);
  border: 4px solid var(--surface);
  transition: border-color 0.35s ease;
}
.about-badge-box {
  position: absolute; top: 28px; right: 0;
  background: #2A2A2A; color: white; border-radius: 6px;
  padding: 18px 22px; text-align: center;
  box-shadow: 0 6px 24px var(--shadow-md);
  border-top: 2px solid var(--red);
}
.ds-root.dark-mode .about-badge-box { background: #1A1A1A; border: 1px solid rgba(255,255,255,0.10); border-top: 2px solid var(--red); }
.about-badge-box .n { font-family: 'Cormorant Garamond', serif; font-size: 2.4rem; font-weight: 600; }
.about-badge-box .t { font-size: 0.72rem; opacity: 0.85; font-weight: 500; }
.about-points { margin-top: 32px; display: flex; flex-direction: column; gap: 16px; }
.about-point { display: flex; gap: 14px; align-items: flex-start; }
.ap-icon {
  width: 48px; height: 48px; flex-shrink: 0; background: var(--surface);
  border-radius: 6px; display: flex; align-items: center; justify-content: center; 
  font-size: 1.2rem; color: var(--anthracite); border: 1px solid var(--gray-border);
  transition: all 0.3s;
}
.about-point:hover .ap-icon { background: var(--red-soft); border-color: var(--red); color: var(--red); }
.ap-text strong { display: block; font-size: 0.95rem; font-weight: 600; color: var(--anthracite); margin-bottom: 4px; }
.ap-text span { font-size: 0.87rem; color: var(--anthracite-2); line-height: 1.6; }

/* ── SERVICES ── */
.ds-services { background: var(--white); transition: background 0.35s ease; }
.services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.srv-card {
  background: var(--surface); border: 1.5px solid var(--gray-border); border-radius: 6px;
  padding: 36px 28px; position: relative; overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.srv-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, var(--red), #2A2A2A); 
  opacity: 0; transition: opacity 0.3s;
}
.srv-card:hover { border-color: var(--anthracite-3); box-shadow: 0 8px 32px var(--shadow-sm); transform: translateY(-4px); }
.srv-card:hover::before { opacity: 1; }
.srv-icon {
  width: 58px; height: 58px; background: var(--gray-light); border-radius: 6px;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.4rem; margin-bottom: 20px; transition: all 0.3s;
  color: var(--anthracite); border: 1px solid var(--gray-border);
}
.srv-card:hover .srv-icon { 
  background: #2A2A2A; color: white; transform: scale(1.05); 
  border-color: #2A2A2A;
}
.ds-root.dark-mode .srv-card:hover .srv-icon {
  background: var(--red); border-color: var(--red);
}
.srv-card h3 {
  font-family: 'Cormorant Garamond', serif; font-size: 1.35rem; font-weight: 600;
  color: var(--anthracite); margin-bottom: 12px;
}
.srv-card p { font-size: 0.9rem; color: var(--anthracite-2); line-height: 1.7; margin-bottom: 18px; }
.srv-tags { display: flex; flex-wrap: wrap; gap: 8px; }
.srv-tag {
  padding: 4px 12px; background: var(--gray-light); border-radius: 3px;
  font-size: 0.75rem; font-weight: 600; color: var(--anthracite-2);
  border: 1px solid var(--gray-border);
}

/* ── COUNTRIES ── */
.ds-countries { 
  background: #1A1A1A;
  position: relative;
  transition: background 0.35s ease;
}
.ds-root.dark-mode .ds-countries { background: #0D0D0D; }
.ds-countries::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0;
  height: 2px; background: linear-gradient(90deg, var(--red) 0%, transparent 60%);
}
.countries-grid {
  display: grid; grid-template-columns: repeat(6, 1fr); gap: 16px; margin-top: 52px;
}
.ctry-card {
  background: rgba(255,255,255,0.06); border: 1.5px solid rgba(255,255,255,0.10);
  border-radius: 6px; padding: 30px 14px; text-align: center;
  transition: all 0.3s; cursor: default;
}
.ctry-card:hover { 
  background: rgba(255,255,255,0.10); 
  border-color: rgba(227, 30, 36, 0.4); 
  transform: translateY(-4px); 
}
.ctry-card .flag { font-size: 1.5rem; margin-bottom: 12px; font-weight: 700; }
.ctry-card .name { font-size: 0.85rem; font-weight: 600; color: white; opacity: 0.85; }

/* ── CTA BANNER ── */
.cta-banner {
  margin: 0 6vw 88px; border-radius: 6px;
  background: #2A2A2A;
  padding: 60px 64px; display: flex; align-items: center;
  justify-content: space-between; gap: 40px; position: relative; overflow: hidden;
  transition: background 0.35s ease;
}
.ds-root.dark-mode .cta-banner { background: #1E1E1E; border: 1px solid rgba(255,255,255,0.08); }
.cta-banner::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0;
  height: 2px; background: linear-gradient(90deg, var(--red) 0%, transparent 50%);
}
.cta-banner::after {
  content: ''; position: absolute; bottom: -60px; left: -60px;
  width: 300px; height: 300px; border-radius: 50%; 
  background: radial-gradient(circle, rgba(227,30,36,0.10) 0%, transparent 70%);
}
.cta-banner h2 {
  font-family: 'Cormorant Garamond', serif; font-size: 2.5rem; font-weight: 600;
  color: white; margin-bottom: 8px; position: relative; z-index: 1;
}
.cta-banner p { font-size: 1rem; color: rgba(255,255,255,0.70); position: relative; z-index: 1; }
.btn-white {
  position: relative;
  flex-shrink: 0; display: inline-flex; align-items: center; gap: 10px;
  padding: 14px 28px; background: var(--red); color: white;
  font-family: 'DM Sans', sans-serif; font-size: 0.88rem; font-weight: 600;
  text-decoration: none; border-radius: 5px;
  letter-spacing: 0.025em; transition: all 0.25s; overflow: hidden;
  box-shadow: 0 2px 12px rgba(227, 30, 36, 0.3); z-index: 2;
}
.btn-white::before {
  content: ''; position: absolute; inset: 0; background: white;
  transform: translateY(101%); transition: transform 0.3s ease; z-index: -1;
}
.btn-white:hover::before { transform: translateY(0); }
.btn-white:hover { transform: translateY(-2px); box-shadow: 0 6px 24px rgba(227, 30, 36, 0.4); color: var(--red); }
.btn-white span { position: relative; z-index: 1; }

/* ── WhatsApp float ── */
.wa-float {
  position: fixed; bottom: 28px; right: 28px;
  width: 58px; height: 58px; background: var(--success); border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 6px 24px rgba(16,185,129,0.45); z-index: 200;
  transition: transform 0.3s, box-shadow 0.3s;
  animation: floatIn 0.8s 1.5s ease both; color: white;
}
.wa-float:hover { transform: scale(1.12); box-shadow: 0 12px 40px rgba(16,185,129,0.55); }
.wa-float svg { width: 30px; height: 30px; fill: white; }
.wa-pulse {
  position: absolute; inset: -6px; border-radius: 50%;
  border: 2px solid var(--success); opacity: 0;
  animation: ripple 2.5s infinite;
}
@keyframes ripple { 0% { transform:scale(1); opacity:0.6; } 100% { transform:scale(1.6); opacity:0; } }

/* ── ANIMATIONS ── */
@keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:none; } }
@keyframes fadeIn  { from { opacity:0; } to { opacity:1; } }
@keyframes floatIn { from { opacity:0; transform:translateY(20px) scale(0.8); } to { opacity:1; transform:none; } }

.reveal { opacity:0; transform:translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
.reveal.visible { opacity:1; transform:none; }

/* ── RESPONSIVE ── */
@media (max-width: 1024px) {
  .ds-hero { 
    grid-template-columns: 1fr; 
    padding: 100px 6vw 60px; 
    text-align: center; 
    min-height: auto;
  }
  .hero-visual { display: none; }
  .hero-actions { justify-content: center; }
  .hero-desc { max-width: 100%; margin-left: auto; margin-right: auto; }
  
  .about-grid { grid-template-columns: 1fr; gap: 48px; }
  .about-images { height: 300px; margin-bottom: 0; }
  
  .services-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
  .srv-card { padding: 28px 20px; }
  
  .countries-grid { grid-template-columns: repeat(3, 1fr); gap: 12px; }
  .ctry-card { padding: 20px 10px; }
  
  .ds-stats { grid-template-columns: repeat(2, 1fr); gap: 20px; padding: 40px 6vw; }
  .stat-item .num { font-size: 2.4rem; }
  
  .cta-banner { 
    flex-direction: column; text-align: center; 
    padding: 48px 32px; margin: 0 4vw 64px;
  }
  .cta-banner h2 { font-size: 2rem; }
  .ds-section { padding: 64px 6vw; }
}

@media (max-width: 768px) {
  .ds-hero { padding: 80px 5vw 50px; }
  .hero-title { font-size: clamp(2.2rem, 8vw, 3.2rem); }
  .hero-desc { font-size: 0.95rem; }
  .btn { font-size: 0.85rem; padding: 12px 24px; }
  .services-grid { grid-template-columns: 1fr; gap: 16px; }
  .countries-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
  .ds-stats { grid-template-columns: repeat(2, 1fr); gap: 16px; padding: 36px 5vw; }
  .stat-item .num { font-size: 2rem; }
  .about-images { height: 280px; }
  .about-img-accent { bottom: -20px; }
  .cta-banner { padding: 40px 24px; margin: 0 5vw 50px; gap: 28px; }
  .cta-banner h2 { font-size: 1.75rem; }
  .btn-white { width: 100%; justify-content: center; }
  .ds-section { padding: 56px 5vw; }
  .section-center { margin-bottom: 40px; }
}

@media (max-width: 480px) {
  .ds-hero { padding: 70px 5vw 40px; }
  .hero-title { font-size: clamp(1.8rem, 10vw, 2.8rem); line-height: 1.2; }
  .hero-actions { flex-direction: column; width: 100%; gap: 10px; }
  .btn { width: 100%; justify-content: center; font-size: 0.82rem; }
  .ds-stats { padding: 32px 5vw; gap: 12px; }
  .stat-item .num { font-size: 1.7rem; }
  .ds-section { padding: 48px 5vw; }
  .about-images { height: 240px; }
  .about-badge-box { display: none; }
  .srv-card { padding: 24px 20px; }
  .countries-grid { grid-template-columns: repeat(2, 1fr); gap: 8px; }
  .cta-banner { padding: 32px 20px; margin: 0 5vw 40px; }
  .cta-banner h2 { font-size: 1.5rem; }
  .wa-float { width: 52px; height: 52px; bottom: 20px; right: 20px; }
}

@media (max-width: 360px) {
  .hero-title { font-size: 1.6rem; }
  .ds-section { padding: 40px 4vw; }
  .ds-stats { padding: 28px 4vw; gap: 8px; }
  .stat-item .num { font-size: 1.5rem; }
  .cta-banner { padding: 28px 16px; margin: 0 4vw 36px; }
  .cta-banner h2 { font-size: 1.35rem; }
}
`;

/* ══════════════════════════════════════
   REUSABLE REVEAL WRAPPER
══════════════════════════════════════ */
function Reveal({ children, delay = 0, style = {} }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "visible" : ""}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════ */
export default function Accueil() {
  const { isDark } = useTheme();
  const t = useTranslation();
  const darkClass  = isDark ? 'dark-mode' : '';

  // Dynamic data using translations
  const STATS = [
    { num: "500+", label: t.home.stats.clients },
    { num: "98%",  label: t.home.stats.satisfaction },
    { num: "6",    label: t.home.stats.countries },
    { num: "5+",   label: t.home.stats.experience },
  ];

  const ABOUT_POINTS = [
    { icon: FaClipboardList, title: t.home.about.points.complete.title,     desc: t.home.about.points.complete.desc },
    { icon: FaBolt,          title: t.home.about.points.fast.title,          desc: t.home.about.points.fast.desc },
    { icon: FaLock,          title: t.home.about.points.confidential.title,  desc: t.home.about.points.confidential.desc },
    { icon: FaWhatsapp,      title: t.home.about.points.available.title,     desc: t.home.about.points.available.desc },
  ];

  const SERVICES = [
    {
      icon: FaPlane,
      title: t.home.services.tourism.title,
      desc: t.home.services.tourism.desc,
      tags: [t.home.countries.france, t.home.countries.spain, t.home.countries.portugal],
    },
    {
      icon: FaGraduationCap,
      title: t.home.services.studies.title,
      desc: t.home.services.studies.desc,
      tags: [t.home.countries.germany, t.home.countries.france, t.home.countries.spain],
    },
    {
      icon: FaBriefcase,
      title: t.home.services.work.title,
      desc: t.home.services.work.desc,
      tags: [t.home.countries.france, t.home.countries.portugal, t.home.countries.spain],
    },
    {
      icon: FaUsers,
      title: t.home.services.family.title,
      desc: t.home.services.family.desc,
      tags: [t.home.countries.france, t.home.countries.spain, t.home.countries.portugal],
    },
    {
      icon: FaHospital,
      title: t.home.services.medical.title,
      desc: t.home.services.medical.desc,
      tags: [t.home.countries.france, t.home.countries.germany],
    },
    {
      icon: FaGlobe,
      title: t.home.services.saudiChina.title,
      desc: t.home.services.saudiChina.desc,
      tags: [t.home.countries.saudi, t.home.countries.china],
    },
  ];

  const COUNTRIES = [
    { flag: "FR", name: t.home.countries.france,  color: "#0055A4" },
    { flag: "ES", name: t.home.countries.spain,   color: "#C60B1E" },
    { flag: "PT", name: t.home.countries.portugal,color: "#006600" },
    { flag: "DE", name: t.home.countries.germany, color: "#CCAA00" },
    { flag: "SA", name: t.home.countries.saudi,   color: "#165B33" },
    { flag: "CN", name: t.home.countries.china,   color: "#DE2910" },
  ];

  return (
    <>
      <style>{css}</style>
      <div className={`ds-root ${darkClass}`}>

        {/* ══ HERO ══ */}
        <section className="ds-hero">
          <div className="hero-text">
            <div className="hero-badge">
              <span className="badge-dot" />
              {t.home.badge}
            </div>
            <h1 className="hero-title">
              {t.home.hero.title}<br />
              <span className="accent">{t.home.hero.titleAccent}</span>
            </h1>
            <p className="hero-desc">
              {t.home.hero.description}
            </p>
            <div className="hero-actions">
              <Link to="/rendez-vous" className="btn btn-blue">
                <FaCalendarAlt /> {t.nav.takeAppointment}
              </Link>
              <a
                href={`${WA_BASE}?text=${encodeURIComponent("Bonjour DS Office, je souhaite des informations sur vos services visa.")}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-wa"
              >
                <FaWhatsapp /> WhatsApp
              </a>
            </div>
          </div>

          {/* Collage visuel */}
          <div className="hero-visual">
            <div className="hv-card tall">
              <img src={Img1} alt="Conseil visa DS Office" />
            </div>
            <div className="hv-stat">
              <div className="num">500+</div>
              <div className="lbl">{t.home.stats.visasObtained}</div>
            </div>
            <div className="hv-card">
              <img src={Img2} alt="Voyage international" />
              <div className="hv-info">
                <strong>{t.home.services.tourism.title}</strong>
                <span>{t.home.countries.france} · {t.home.countries.spain} · {t.home.countries.portugal}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ══ STATS ══ */}
        <div className="ds-stats">
          {STATS.map((s, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="stat-item">
                <div className="num">{s.num}</div>
                <div className="lbl">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ══ À PROPOS ══ */}
        <section className="ds-section ds-about">
          <div className="about-grid">
            <Reveal>
              <div className="about-images">
                <img className="about-img-main" src={Img4} alt="Bureau DS Office" />
                <img className="about-img-accent" src={Img3} alt="Équipe DS Office" />
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="section-tag">{t.home.about.tag}</div>
              <h2 className="section-title">
                {t.home.about.title} <span className="accent">{t.home.about.titleAccent}</span> {t.home.about.titleEnd}
              </h2>
              <p className="section-sub">
                {t.home.about.description}
              </p>
              <div className="about-points">
                {ABOUT_POINTS.map((p, i) => {
                  const IconComponent = p.icon;
                  return (
                    <div className="about-point" key={i}>
                      <div className="ap-icon"><IconComponent /></div>
                      <div className="ap-text">
                        <strong>{p.title}</strong>
                        <span>{p.desc}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══ SERVICES ══ */}
        <section className="ds-section ds-services">
          <div className="section-center">
            <div className="section-tag">{t.home.services.tag}</div>
            <h2 className="section-title">
              {t.home.services.title} <span className="accent">{t.home.services.titleAccent}</span>
            </h2>
            <p className="section-sub">
              {t.home.services.description}
            </p>
          </div>
          <div className="services-grid">
            {SERVICES.map((s, i) => {
              const IconComponent = s.icon;
              return (
                <Reveal key={i} delay={(i % 3) * 100}>
                  <div className="srv-card">
                    <div className="srv-icon"><IconComponent /></div>
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                    <div className="srv-tags">
                      {s.tags.map((t) => (
                        <span key={t} className="srv-tag">{t}</span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ══ PAYS ══ */}
        <section className="ds-section ds-countries">
          <div className="section-center">
            <div className="section-tag" style={{ color: "rgba(255,255,255,0.9)", background: "rgba(255,255,255,0.08)", borderLeft: "2px solid var(--red)" }}>
              {t.home.countries.tag}
            </div>
            <h2 className="section-title" style={{ color: "white" }}>
              {t.home.countries.title} <span style={{ color: "var(--red)" }}>{t.home.countries.titleAccent}</span>
            </h2>
            <p className="section-sub" style={{ color: "rgba(255,255,255,0.65)", margin: "0 auto" }}>
              {t.home.countries.description}
            </p>
          </div>
          <div className="countries-grid">
            {COUNTRIES.map((c, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="ctry-card" style={{ borderColor: c.color + '40' }}>
                  <div className="flag" style={{ color: c.color }}>{c.flag}</div>
                  <div className="name">{c.name}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <br />

        {/* ══ CTA BANNER ══ */}
        <Reveal>
          <div className="cta-banner">
            <div>
              <h2>{t.common.readyToStart}</h2>
              <p>{t.common.callToAction}</p>
            </div>
            <Link to="/rendez-vous" className="btn-white">
              <span><FaCalendarAlt /></span>
              <span>{t.nav.takeAppointment}</span>
              <span><FaArrowRight /></span>
            </Link>
          </div>
        </Reveal>

        {/* ══ WhatsApp flottant ══ */}
        <a
          href={`${WA_BASE}?text=${encodeURIComponent("Bonjour DS Office, je souhaite des informations.")}`}
          target="_blank"
          rel="noreferrer"
          className="wa-float"
          title="Contacter sur WhatsApp"
        >
          <div className="wa-pulse" />
          <FaWhatsapp size={30} />
        </a>

      </div>
    </>
  );
}