import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaGlobe, FaHandshake, FaShieldAlt, FaUserTie, FaClock, FaAward, FaHeart, FaUsers, FaCalendarAlt } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from '../../hooks/useTranslation';
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

/* ══════════════════════════════════════
   CSS — toutes les variables scopées sur
   .apropos-root (light) et
   .apropos-root.dark-mode (dark)
══════════════════════════════════════ */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

/* ── LIGHT ── */
.apropos-root {
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
}

/* ── DARK ── */
.apropos-root.dark-mode {
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
.apropos-root * { box-sizing: border-box; margin: 0; padding: 0; }
.apropos-root {
  font-family: 'DM Sans', sans-serif;
  color: var(--anthracite);
  background: var(--white);
  line-height: 1.6;
  transition: background 0.35s ease, color 0.35s ease;
}
.apropos-root a { text-decoration: none; color: inherit; }

/* ── HERO ── */
.apropos-hero {
  padding: 88px 6vw 72px;
  background: linear-gradient(135deg, var(--gray-light) 0%, var(--white) 100%);
  position: relative;
  overflow: hidden;
  transition: background 0.35s ease;
}
.apropos-hero::before {
  content: '';
  position: absolute; top: -100px; right: -100px;
  width: 500px; height: 500px; border-radius: 50%;
  background: radial-gradient(circle, rgba(227, 30, 36, 0.05) 0%, transparent 70%);
  pointer-events: none;
}
.hero-content {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 1;
}
.hero-tag {
  display: inline-block;
  font-size: 0.7rem; font-weight: 700;
  letter-spacing: 0.16em; text-transform: uppercase;
  color: var(--anthracite-2);
  padding: 6px 16px;
  background: var(--surface);
  border-radius: 4px;
  border-left: 3px solid var(--red);
  margin-bottom: 24px;
  box-shadow: 0 2px 8px var(--shadow-sm);
  transition: background 0.35s ease, color 0.35s ease;
}
.hero-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 600;
  line-height: 1.2;
  color: var(--anthracite);
  margin-bottom: 24px;
}
.hero-title .accent { color: var(--red); font-weight: 700; }
.hero-subtitle {
  font-size: 1.15rem;
  line-height: 1.8;
  color: var(--anthracite-2);
  max-width: 720px;
  margin: 0 auto 36px;
}

/* ── STATS BAR ── */
.stats-bar {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  max-width: 1000px;
  margin: 0 auto;
}
.stat-box {
  background: var(--surface);
  padding: 28px 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 16px var(--shadow-sm);
  border-top: 3px solid var(--red);
  border: 1px solid var(--gray-border);
  border-top: 3px solid var(--red);
  transition: transform 0.3s, box-shadow 0.3s, background 0.35s ease;
}
.stat-box:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px var(--shadow-md);
}
.stat-icon {
  font-size: 2rem;
  color: var(--red);
  margin-bottom: 12px;
}
.stat-num {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.5rem;
  font-weight: 600;
  color: var(--anthracite);
  line-height: 1;
  margin-bottom: 8px;
}
.stat-label {
  font-size: 0.85rem;
  color: var(--anthracite-2);
  font-weight: 500;
}

/* ── SECTION COMMONS ── */
.apropos-section {
  padding: 88px 6vw;
  transition: background 0.35s ease;
}
.ap-bg-white  { background: var(--white);      }
.ap-bg-gray   { background: var(--gray-light); }

.section-title-center {
  text-align: center;
  margin-bottom: 56px;
}
.section-tag {
  display: inline-block;
  font-size: 0.7rem; font-weight: 700;
  letter-spacing: 0.16em; text-transform: uppercase;
  color: var(--anthracite-2);
  padding: 4px 12px;
  background: var(--gray-light);
  border-radius: 3px;
  border-left: 2px solid var(--red);
  margin-bottom: 12px;
  transition: background 0.35s ease, color 0.35s ease;
}
.section-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2rem, 4vw, 3.2rem);
  font-weight: 600;
  color: var(--anthracite);
  margin-bottom: 16px;
}
.section-title .accent { color: var(--red); font-weight: 700; }
.section-desc {
  font-size: 1rem;
  color: var(--anthracite-2);
  line-height: 1.8;
  max-width: 640px;
  margin: 0 auto;
}

/* ── STORY ── */
.story-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 72px;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}
.story-images {
  position: relative;
  height: 500px;
}
.story-img-main {
  position: absolute; top: 0; left: 0;
  width: 75%; height: 100%;
  object-fit: cover; border-radius: 8px;
  box-shadow: 0 8px 32px var(--shadow-md);
}
.story-img-accent {
  position: absolute; bottom: -30px; right: 0;
  width: 55%; height: 60%;
  object-fit: cover; border-radius: 8px;
  box-shadow: 0 8px 32px var(--shadow-md);
  border: 5px solid var(--surface);
  transition: border-color 0.35s ease;
}
.story-content h3 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.8rem; font-weight: 600;
  color: var(--anthracite); margin-bottom: 20px;
}
.story-content p {
  font-size: 1rem; color: var(--anthracite-2);
  line-height: 1.8; margin-bottom: 16px;
}

/* ── VALUES ── */
.values-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
}
.value-card {
  background: var(--surface);
  border: 1.5px solid var(--gray-border);
  border-radius: 8px;
  padding: 32px 24px;
  text-align: center;
  transition: all 0.3s;
}
.value-card:hover {
  border-color: var(--red);
  box-shadow: 0 8px 24px var(--shadow-sm);
  transform: translateY(-4px);
}
.value-icon {
  width: 64px; height: 64px;
  margin: 0 auto 20px;
  background: var(--red-soft);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.8rem; color: var(--red);
  transition: all 0.3s;
}
.value-card:hover .value-icon {
  background: var(--red);
  color: #FFFFFF;
  transform: scale(1.1);
}
.value-card h3 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.3rem; font-weight: 600;
  color: var(--anthracite); margin-bottom: 12px;
}
.value-card p {
  font-size: 0.9rem;
  color: var(--anthracite-2);
  line-height: 1.6;
}

/* ── SERVICES LIST ── */
.services-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  max-width: 900px;
  margin: 0 auto;
}
.service-item {
  display: flex; align-items: flex-start; gap: 16px;
  padding: 20px;
  background: var(--gray-light);
  border-radius: 8px;
  border-left: 3px solid var(--red);
  transition: all 0.3s;
}
.service-item:hover {
  background: var(--surface);
  box-shadow: 0 4px 16px var(--shadow-sm);
  transform: translateX(4px);
}
.service-icon {
  flex-shrink: 0;
  width: 40px; height: 40px;
  background: var(--surface);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: var(--red); font-size: 1.1rem;
  border: 1px solid var(--gray-border);
  transition: background 0.35s ease;
}
.service-item p {
  font-size: 0.95rem;
  color: var(--anthracite);
  font-weight: 500;
  line-height: 1.6;
  margin: 0;
}

/* ── CTA — fond sombre fixe, indépendant du thème ── */
.cta-section {
  background: #1E1E1E;
  padding: 72px 6vw;
  text-align: center;
  position: relative;
  overflow: hidden;
}
.apropos-root.dark-mode .cta-section {
  background: #0D0D0D;
  border-top: 1px solid rgba(255,255,255,0.08);
}
.cta-section::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--red) 0%, transparent 50%);
}
.cta-content {
  max-width: 700px;
  margin: 0 auto;
  position: relative; z-index: 1;
}
.cta-content h2 {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 600;
  color: #FFFFFF;
  margin-bottom: 16px;
}
.cta-content p {
  font-size: 1.1rem;
  color: rgba(255,255,255,0.75);
  margin-bottom: 32px;
  line-height: 1.7;
}
.cta-btn {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 16px 36px;
  background: var(--red); color: #FFFFFF;
  font-size: 0.95rem; font-weight: 600;
  border-radius: 6px; text-decoration: none;
  transition: all 0.3s;
  box-shadow: 0 4px 16px rgba(227, 30, 36, 0.35);
}
.cta-btn:hover {
  background: #FFFFFF;
  color: #1E1E1E;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(255,255,255,0.15);
}

/* ── ANIMATIONS ── */
.reveal {
  opacity: 0; transform: translateY(28px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.reveal.visible { opacity: 1; transform: none; }

/* ── RESPONSIVE ── */
@media (max-width: 1024px) {
  .story-grid { grid-template-columns: 1fr; gap: 48px; }
  .story-images { height: 380px; margin-bottom: 40px; }
  .values-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
  .stats-bar { grid-template-columns: repeat(2, 1fr); gap: 20px; }
  .services-list { gap: 16px; }
}

@media (max-width: 768px) {
  .apropos-hero { padding: 56px 5vw 48px; }
  .hero-title { font-size: clamp(2rem, 6vw, 2.8rem); margin-bottom: 20px; }
  .hero-subtitle { font-size: 0.95rem; margin-bottom: 32px; }
  .hero-tag { font-size: 0.65rem; padding: 5px 14px; margin-bottom: 20px; }
  .apropos-section { padding: 56px 5vw; }
  .section-title-center { margin-bottom: 40px; }
  .section-title { font-size: clamp(1.8rem, 5vw, 2.4rem); margin-bottom: 14px; }
  .section-desc { font-size: 0.92rem; }
  .story-images { height: 300px; margin-bottom: 30px; }
  .story-content h3 { font-size: 1.5rem; margin-bottom: 16px; }
  .story-content p { font-size: 0.92rem; margin-bottom: 14px; }
  .values-grid { grid-template-columns: 1fr; gap: 16px; }
  .value-card { padding: 28px 20px; }
  .value-icon { width: 56px; height: 56px; font-size: 1.6rem; margin-bottom: 16px; }
  .value-card h3 { font-size: 1.2rem; margin-bottom: 10px; }
  .value-card p { font-size: 0.88rem; }
  .services-list { grid-template-columns: 1fr; gap: 12px; }
  .service-item { padding: 16px; }
  .service-icon { width: 36px; height: 36px; font-size: 1rem; }
  .service-item p { font-size: 0.88rem; }
  .stats-bar { grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .stat-box { padding: 20px 14px; }
  .stat-icon { font-size: 1.4rem; margin-bottom: 8px; }
  .stat-num { font-size: 1.9rem; margin-bottom: 6px; }
  .stat-label { font-size: 0.7rem; }
  .cta-section { padding: 48px 5vw; }
  .cta-content h2 { font-size: clamp(1.8rem, 5vw, 2.4rem); margin-bottom: 14px; }
  .cta-content p { font-size: 0.95rem; margin-bottom: 28px; }
  .cta-btn { padding: 14px 32px; font-size: 0.9rem; }
}

@media (max-width: 480px) {
  .apropos-hero { padding: 48px 5vw 40px; }
  .hero-title { font-size: 1.75rem; line-height: 1.25; margin-bottom: 16px; }
  .hero-subtitle { font-size: 0.88rem; line-height: 1.7; margin-bottom: 28px; }
  .hero-tag { font-size: 0.6rem; padding: 4px 12px; }
  .apropos-section { padding: 44px 5vw; }
  .section-title-center { margin-bottom: 32px; }
  .section-title { font-size: 1.6rem; margin-bottom: 12px; }
  .section-desc { font-size: 0.85rem; line-height: 1.7; }
  .section-tag { font-size: 0.65rem; padding: 4px 10px; }
  .story-images { height: 260px; margin-bottom: 20px; }
  .story-img-main { width: 85%; }
  .story-img-accent { width: 60%; height: 55%; bottom: -20px; border: 4px solid var(--surface); }
  .story-content h3 { font-size: 1.3rem; margin-bottom: 14px; }
  .story-content p { font-size: 0.85rem; margin-bottom: 12px; }
  .value-card { padding: 24px 18px; }
  .value-icon { width: 52px; height: 52px; font-size: 1.4rem; margin-bottom: 14px; }
  .value-card h3 { font-size: 1.1rem; margin-bottom: 8px; }
  .value-card p { font-size: 0.82rem; line-height: 1.6; }
  .service-item { padding: 14px; gap: 12px; }
  .service-icon { width: 34px; height: 34px; font-size: 0.95rem; }
  .service-item p { font-size: 0.82rem; line-height: 1.6; }
  .stats-bar { grid-template-columns: repeat(2, 1fr); gap: 10px; }
  .stat-box { padding: 16px 12px; }
  .stat-icon { font-size: 1.2rem; margin-bottom: 6px; }
  .stat-num { font-size: 1.6rem; margin-bottom: 4px; }
  .stat-label { font-size: 0.65rem; line-height: 1.3; }
  .cta-section { padding: 40px 5vw; }
  .cta-content h2 { font-size: 1.5rem; margin-bottom: 12px; }
  .cta-content p { font-size: 0.88rem; line-height: 1.7; margin-bottom: 24px; }
  .cta-btn { width: 100%; justify-content: center; padding: 13px 28px; font-size: 0.85rem; }
}

@media (max-width: 360px) {
  .apropos-hero { padding: 40px 5vw 36px; }
  .hero-title { font-size: 1.5rem; }
  .hero-subtitle { font-size: 0.82rem; }
  .apropos-section { padding: 36px 4vw; }
  .section-title { font-size: 1.4rem; }
  .story-images { height: 220px; }
  .value-card { padding: 20px 16px; }
  .value-icon { width: 48px; height: 48px; font-size: 1.2rem; }
  .service-item { padding: 12px; }
  .stats-bar { grid-template-columns: repeat(2, 1fr); gap: 8px; }
  .stat-box { padding: 14px 10px; }
  .stat-icon { font-size: 1.1rem; margin-bottom: 5px; }
  .stat-num { font-size: 1.5rem; margin-bottom: 3px; }
  .stat-label { font-size: 0.6rem; line-height: 1.2; }
  .cta-section { padding: 36px 4vw; }
  .cta-content h2 { font-size: 1.35rem; }
}
`;

/* ══════════════════════════════════════
   REVEAL WRAPPER
══════════════════════════════════════ */
function Reveal({ children, delay = 0 }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "visible" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════ */
export default function APropos() {
  const { isDark } = useTheme();
  const darkClass  = isDark ? 'dark-mode' : '';
  const t = useTranslation();

  // Data arrays using translations
  const VALUES = [
    { icon: FaHandshake, title: t.about.values.trust.title, desc: t.about.values.trust.desc },
    { icon: FaShieldAlt, title: t.about.values.security.title, desc: t.about.values.security.desc },
    { icon: FaUserTie, title: t.about.values.professionalism.title, desc: t.about.values.professionalism.desc },
    { icon: FaHeart, title: t.about.values.commitment.title, desc: t.about.values.commitment.desc },
  ];

  const SERVICES_DETAILS = [
    { icon: FaGlobe, text: t.about.services.tourism },
    { icon: FaUsers, text: t.about.services.studies },
    { icon: FaCheckCircle, text: t.about.services.work },
    { icon: FaCheckCircle, text: t.about.services.medical },
    { icon: FaGlobe, text: t.about.services.saudiChina },
    { icon: FaCheckCircle, text: t.about.services.consulting },
  ];

  const STATS = [
    { icon: FaClock, num: "10+", label: t.about.stats.experience },
    { icon: FaUsers, num: "500+", label: t.about.stats.clients },
    { icon: FaAward, num: "98%", label: t.about.stats.success },
    { icon: FaGlobe, num: "6", label: t.about.stats.countries },
  ];

  return (
    <>
      <style>{css}</style>
      <div className={`apropos-root ${darkClass}`}>

        {/* ══ HERO ══ */}
        <section className="apropos-hero">
          <div className="hero-content">
            <div className="hero-tag">{t.about.hero.tag}</div>
            <h1 className="hero-title">
              {t.about.hero.title} <span className="accent">{t.about.hero.titleAccent}</span> {t.about.hero.titleEnd}
            </h1>
            <p className="hero-subtitle">
              {t.about.hero.description}
            </p>

            <div className="stats-bar">
              {STATS.map((stat, i) => {
                const IconComponent = stat.icon;
                return (
                  <Reveal key={i} delay={i * 100}>
                    <div className="stat-box">
                      <div className="stat-icon"><IconComponent /></div>
                      <div className="stat-num">{stat.num}</div>
                      <div className="stat-label">{stat.label}</div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══ NOTRE HISTOIRE ══ */}
        <section className="apropos-section ap-bg-white">
          <div className="story-grid">
            <Reveal>
              <div className="story-images">
                <img className="story-img-main" src={Img4} alt="DS Office - Bureau" />
                <img className="story-img-accent" src={Img3} alt="DS Office - Équipe" />
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="story-content">
                <div className="section-tag">{t.about.story.tag}</div>
                <h3>{t.about.story.title}</h3>
                <p>
                  {t.about.story.paragraph1}
                </p>
                <p>
                  {t.about.story.paragraph2}
                </p>
                <p>
                  {t.about.story.paragraph3}
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══ NOS VALEURS ══ */}
        <section className="apropos-section ap-bg-gray">
          <div className="section-title-center">
            <div className="section-tag">{t.about.valuesSection.tag}</div>
            <h2 className="section-title">
              {t.about.valuesSection.title} <span className="accent">{t.about.valuesSection.titleAccent}</span>
            </h2>
            <p className="section-desc">
              {t.about.valuesSection.description}
            </p>
          </div>

          <div className="values-grid">
            {VALUES.map((value, i) => {
              const IconComponent = value.icon;
              return (
                <Reveal key={i} delay={i * 100}>
                  <div className="value-card">
                    <div className="value-icon"><IconComponent /></div>
                    <h3>{value.title}</h3>
                    <p>{value.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ══ NOS SERVICES ══ */}
        <section className="apropos-section ap-bg-white">
          <div className="section-title-center">
            <div className="section-tag">{t.about.servicesSection.tag}</div>
            <h2 className="section-title">
              {t.about.servicesSection.title} <span className="accent">{t.about.servicesSection.titleAccent}</span>
            </h2>
            <p className="section-desc">
              {t.about.servicesSection.description}
            </p>
          </div>

          <div className="services-list">
            {SERVICES_DETAILS.map((service, i) => {
              const IconComponent = service.icon;
              return (
                <Reveal key={i} delay={(i % 2) * 100}>
                  <div className="service-item">
                    <div className="service-icon"><IconComponent /></div>
                    <p>{service.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ══ CTA ══ */}
        <section className="cta-section">
          <Reveal>
            <div className="cta-content">
              <h2>{t.about.cta.title}</h2>
              <p>
                {t.about.cta.description}
              </p>
              <Link to="/contact" className="cta-btn">
                <FaCalendarAlt />
                <span>{t.about.cta.button}</span>
              </Link>
            </div>
          </Reveal>
        </section>

      </div>
    </>
  );
}