import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { 
  FaPlane, FaGraduationCap, FaBriefcase, FaUsers, FaHospital, FaGlobe,
  FaPassport, FaFileAlt, FaClock, FaCheckCircle, FaShieldAlt, 
  FaCalendarAlt, FaArrowRight
} from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';

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
   DATA
══════════════════════════════════════ */
const SERVICES = [
  {
    icon: FaPlane,
    title: "Visa Tourisme",
    desc: "Découvrez l'Europe en toute sérénité. Nous préparons votre dossier Schengen pour la France, l'Espagne et le Portugal.",
    countries: ["France", "Espagne", "Portugal"],
    features: ["Dossier complet préparé", "Prise de rendez-vous consulaire", "Suivi personnalisé", "Assistance formulaires"],
  },
  {
    icon: FaGraduationCap,
    title: "Visa Études & Langues",
    desc: "Poursuivez vos études en Europe avec nos cours d'allemand dispensés à Casablanca. Visa études Allemagne et France.",
    countries: ["Allemagne", "France", "Espagne"],
    features: ["Inscription universitaire", "Cours d'allemand à Casablanca", "Attestation d'hébergement", "Assurance étudiante"],
  },
  {
    icon: FaBriefcase,
    title: "Visa Travail",
    desc: "Intégrez le marché du travail européen avec un dossier professionnel solide et bien préparé.",
    countries: ["France", "Portugal", "Espagne"],
    features: ["Contrat de travail vérifié", "Documents légalisés", "Autorisation de travail", "Accompagnement complet"],
  },
  {
    icon: FaUsers,
    title: "Regroupement Familial",
    desc: "Rejoignez votre famille en Europe. Tous les documents nécessaires préparés avec soin.",
    countries: ["France", "Espagne", "Portugal"],
    features: ["Actes d'état civil", "Justificatifs de ressources", "Preuves de lien familial", "Dossier complet"],
  },
  {
    icon: FaHospital,
    title: "Visa Médical",
    desc: "Accédez aux soins médicaux à l'étranger. Traitement urgent et rendez-vous médicaux organisés.",
    countries: ["France", "Allemagne"],
    features: ["Rendez-vous hôpital", "Dossier médical traduit", "Prise en charge garantie", "Traitement urgent"],
  },
  {
    icon: FaGlobe,
    title: "Arabie Saoudite & Chine",
    desc: "Voyage d'affaires, tourisme ou pèlerinage. Visa Arabie Saoudite et Chine avec assistance complète.",
    countries: ["Arabie Saoudite", "Chine"],
    features: ["Visa touristique", "Visa d'affaires", "Visa pèlerinage (Omra)", "Documents légalisés"],
  },
];

const PROCESS_STEPS = [
  { icon: FaFileAlt,     title: "1. Consultation", desc: "Évaluation de votre dossier et conseil personnalisé" },
  { icon: FaPassport,    title: "2. Préparation",  desc: "Collecte et vérification de tous les documents" },
  { icon: FaCalendarAlt, title: "3. Rendez-vous",  desc: "Prise de rendez-vous et accompagnement" },
  { icon: FaCheckCircle, title: "4. Obtention",    desc: "Suivi du dossier jusqu'à l'obtention du visa" },
];

const ADVANTAGES = [
  { icon: FaShieldAlt,   title: "10+ ans d'expérience", desc: "Une expertise reconnue dans les démarches de visa" },
  { icon: FaClock,       title: "Traitement rapide",     desc: "Optimisation des délais pour votre visa" },
  { icon: FaCheckCircle, title: "98% de réussite",       desc: "Un taux d'obtention exceptionnel" },
];

/* ══════════════════════════════════════
   CSS — scopé sur .services-root
══════════════════════════════════════ */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

/* ── LIGHT ── */
.services-root {
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
.services-root.dark-mode {
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
.services-root * { box-sizing: border-box; margin: 0; padding: 0; }
.services-root {
  font-family: 'DM Sans', sans-serif;
  color: var(--anthracite);
  background: var(--white);
  line-height: 1.6;
  transition: background 0.35s ease, color 0.35s ease;
}
.services-root a { text-decoration: none; color: inherit; }

/* ── HERO ── */
.services-hero {
  padding: 88px 6vw 72px;
  background: linear-gradient(135deg, var(--gray-light) 0%, var(--white) 100%);
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: background 0.35s ease;
}
.services-hero::before {
  content: '';
  position: absolute; top: -80px; right: -80px;
  width: 400px; height: 400px; border-radius: 50%;
  background: radial-gradient(circle, rgba(227, 30, 36, 0.05) 0%, transparent 70%);
  pointer-events: none;
}
.hero-content {
  max-width: 800px;
  margin: 0 auto;
  position: relative; z-index: 1;
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
  transition: background 0.35s ease;
}
.hero-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 600; line-height: 1.2;
  color: var(--anthracite); margin-bottom: 24px;
}
.hero-title .accent { color: var(--red); font-weight: 700; }
.hero-subtitle {
  font-size: 1.15rem; line-height: 1.8;
  color: var(--anthracite-2); margin-bottom: 36px;
}

/* ── ADVANTAGES BAR ── */
.advantages-bar {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px; max-width: 900px; margin: 0 auto;
}
.adv-box {
  background: var(--surface);
  padding: 24px 20px; border-radius: 8px; text-align: center;
  box-shadow: 0 4px 16px var(--shadow-sm);
  border: 1px solid var(--gray-border);
  border-top: 3px solid var(--red);
  transition: transform 0.3s, background 0.35s ease;
}
.adv-box:hover { transform: translateY(-4px); }
.adv-icon { font-size: 2rem; color: var(--red); margin-bottom: 12px; }
.adv-title { font-size: 0.95rem; font-weight: 600; color: var(--anthracite); margin-bottom: 6px; }
.adv-desc { font-size: 0.82rem; color: var(--anthracite-2); }

/* ── SECTION ── */
.services-section {
  padding: 88px 6vw;
  transition: background 0.35s ease;
}
.sv-bg-gray  { background: var(--gray-light); }
.sv-bg-white { background: var(--white); }

.section-header { text-align: center; margin-bottom: 56px; }
.section-tag {
  display: inline-block;
  font-size: 0.7rem; font-weight: 700;
  letter-spacing: 0.16em; text-transform: uppercase;
  color: var(--anthracite-2);
  padding: 4px 12px;
  background: var(--gray-light); border-radius: 3px;
  border-left: 2px solid var(--red); margin-bottom: 12px;
  transition: background 0.35s ease;
}
.section-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2rem, 4vw, 3.2rem); font-weight: 600;
  color: var(--anthracite); margin-bottom: 16px;
}
.section-title .accent { color: var(--red); font-weight: 700; }
.section-desc {
  font-size: 1rem; color: var(--anthracite-2);
  line-height: 1.8; max-width: 640px; margin: 0 auto;
}

/* ── SERVICES GRID ── */
.services-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px; max-width: 1200px; margin: 0 auto;
}
.service-card {
  background: var(--surface);
  border: 2px solid var(--gray-border);
  border-radius: 12px; padding: 40px 32px;
  position: relative; overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.service-card::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 4px;
  background: linear-gradient(90deg, var(--red), #2A2A2A);
  opacity: 0; transition: opacity 0.3s;
}
.service-card:hover {
  border-color: var(--anthracite-3);
  box-shadow: 0 12px 40px var(--shadow-md);
  transform: translateY(-6px);
}
.service-card:hover::before { opacity: 1; }
.service-header {
  display: flex; align-items: flex-start;
  gap: 20px; margin-bottom: 24px;
}
.service-icon {
  flex-shrink: 0;
  width: 64px; height: 64px;
  background: var(--red-soft); border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.8rem; color: var(--red);
  transition: all 0.3s;
}
.service-card:hover .service-icon {
  background: var(--red); color: #FFFFFF; transform: scale(1.1);
}
.service-info h3 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.6rem; font-weight: 600;
  color: var(--anthracite); margin-bottom: 8px;
}
.service-countries { display: flex; gap: 8px; flex-wrap: wrap; }
.country-tag {
  padding: 4px 12px; background: var(--gray-light);
  border-radius: 4px; font-size: 0.7rem; font-weight: 600;
  color: var(--anthracite-2); border: 1px solid var(--gray-border);
  transition: background 0.35s ease;
}
.service-desc {
  font-size: 0.95rem; color: var(--anthracite-2);
  line-height: 1.7; margin-bottom: 24px;
}
.service-features {
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;
}
.feature-item {
  display: flex; align-items: center; gap: 8px;
  font-size: 0.85rem; color: var(--anthracite);
}
.feature-item svg { color: var(--red); font-size: 0.9rem; flex-shrink: 0; }

/* ── PROCESS ── */
.process-steps {
  display: grid; grid-template-columns: repeat(4, 1fr);
  gap: 24px; max-width: 1200px; margin: 0 auto;
}
.process-step {
  background: var(--surface);
  border: 1.5px solid var(--gray-border);
  border-radius: 8px; padding: 32px 24px; text-align: center;
  position: relative; transition: all 0.3s;
}
.process-step::after {
  content: '→';
  position: absolute; top: 50%; right: -30px;
  transform: translateY(-50%);
  font-size: 1.5rem; color: var(--red); font-weight: bold;
}
.process-step:last-child::after { display: none; }
.process-step:hover {
  border-color: var(--red);
  box-shadow: 0 8px 24px var(--shadow-sm);
}
.process-icon {
  width: 56px; height: 56px; margin: 0 auto 16px;
  background: var(--red-soft); border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.5rem; color: var(--red); transition: all 0.3s;
}
.process-step:hover .process-icon {
  background: var(--red); color: #FFFFFF; transform: scale(1.1);
}
.process-step h4 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.15rem; font-weight: 600;
  color: var(--anthracite); margin-bottom: 8px;
}
.process-step p { font-size: 0.85rem; color: var(--anthracite-2); line-height: 1.6; }

/* ── CTA — fond sombre fixe ── */
.cta-section {
  background: #1E1E1E;
  padding: 72px 6vw; text-align: center;
  position: relative; overflow: hidden;
}
.services-root.dark-mode .cta-section {
  background: #0D0D0D;
  border-top: 1px solid rgba(255,255,255,0.08);
}
.cta-section::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, var(--red) 0%, transparent 50%);
}
.cta-content {
  max-width: 700px; margin: 0 auto;
  position: relative; z-index: 1;
}
.cta-content h2 {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2rem, 4vw, 3rem); font-weight: 600;
  color: #FFFFFF; margin-bottom: 16px;
}
.cta-content p {
  font-size: 1.1rem; color: rgba(255,255,255,0.75);
  margin-bottom: 32px; line-height: 1.7;
}
.cta-btn {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 16px 36px; background: var(--red); color: #FFFFFF;
  font-size: 0.95rem; font-weight: 600; border-radius: 6px;
  text-decoration: none; transition: all 0.3s;
  box-shadow: 0 4px 16px rgba(227, 30, 36, 0.35);
}
.cta-btn:hover {
  background: #FFFFFF; color: #1E1E1E;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(255,255,255,0.15);
}

/* ── ANIMATIONS ── */
.reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
.reveal.visible { opacity: 1; transform: none; }

/* ── RESPONSIVE ── */
@media (max-width: 1024px) {
  .services-grid { grid-template-columns: 1fr; gap: 24px; }
  .process-steps { grid-template-columns: repeat(2, 1fr); gap: 20px; }
  .process-step::after { display: none; }
  .advantages-bar { grid-template-columns: 1fr; gap: 16px; }
}

@media (max-width: 768px) {
  .services-hero { padding: 64px 5vw 56px; }
  .hero-title { font-size: clamp(2rem, 6vw, 2.8rem); }
  .hero-subtitle { font-size: 1rem; }
  .services-section { padding: 64px 5vw; }
  .service-card { padding: 32px 24px; }
  .service-header { gap: 16px; }
  .service-icon { width: 56px; height: 56px; font-size: 1.5rem; }
  .service-info h3 { font-size: 1.4rem; }
  .service-features { grid-template-columns: 1fr; gap: 10px; }
  .process-steps { grid-template-columns: 1fr; gap: 16px; }
  .cta-section { padding: 56px 5vw; }
}

@media (max-width: 480px) {
  .services-hero { padding: 56px 5vw 48px; }
  .hero-title { font-size: 1.75rem; }
  .hero-subtitle { font-size: 0.92rem; }
  .hero-tag { font-size: 0.65rem; padding: 5px 14px; }
  .services-section { padding: 48px 5vw; }
  .section-title { font-size: 1.6rem; }
  .section-desc { font-size: 0.9rem; }
  .service-card { padding: 28px 20px; }
  .service-header { flex-direction: column; align-items: flex-start; gap: 16px; }
  .service-icon { width: 52px; height: 52px; font-size: 1.3rem; }
  .service-info h3 { font-size: 1.25rem; }
  .service-desc { font-size: 0.88rem; }
  .feature-item { font-size: 0.8rem; }
  .process-icon { width: 48px; height: 48px; font-size: 1.3rem; }
  .process-step h4 { font-size: 1.05rem; }
  .process-step p { font-size: 0.8rem; }
  .adv-box { padding: 20px 16px; }
  .adv-icon { font-size: 1.6rem; }
  .adv-title { font-size: 0.88rem; }
  .adv-desc { font-size: 0.78rem; }
  .cta-section { padding: 48px 5vw; }
  .cta-content h2 { font-size: 1.5rem; }
  .cta-content p { font-size: 0.92rem; }
  .cta-btn { width: 100%; justify-content: center; padding: 14px 28px; }
}

@media (max-width: 360px) {
  .services-hero { padding: 48px 5vw 40px; }
  .hero-title { font-size: 1.5rem; }
  .services-section { padding: 40px 4vw; }
  .service-card { padding: 24px 16px; }
  .cta-section { padding: 40px 4vw; }
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
export default function Services() {
  const { isDark } = useTheme();
  const darkClass  = isDark ? 'dark-mode' : '';

  return (
    <>
      <style>{css}</style>
      <div className={`services-root ${darkClass}`}>

        {/* ══ HERO ══ */}
        <section className="services-hero">
          <div className="hero-content">
            <div className="hero-tag">Nos Services</div>
            <h1 className="hero-title">
              Tous types de <span className="accent">visa</span>
            </h1>
            <p className="hero-subtitle">
              DS Office vous accompagne dans toutes vos démarches de visa avec une expertise 
              de plus de 10 ans. Un service personnalisé pour chaque type de visa.
            </p>

            <div className="advantages-bar">
              {ADVANTAGES.map((adv, i) => {
                const IconComponent = adv.icon;
                return (
                  <Reveal key={i} delay={i * 100}>
                    <div className="adv-box">
                      <div className="adv-icon"><IconComponent /></div>
                      <div className="adv-title">{adv.title}</div>
                      <div className="adv-desc">{adv.desc}</div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══ SERVICES ══ */}
        <section className="services-section sv-bg-gray">
          <div className="section-header">
            <div className="section-tag">Nos prestations</div>
            <h2 className="section-title">
              Un accompagnement <span className="accent">sur mesure</span>
            </h2>
            <p className="section-desc">
              De la préparation du dossier jusqu'à l'obtention de votre visa, 
              nous prenons en charge toutes les étapes pour faciliter vos démarches.
            </p>
          </div>

          <div className="services-grid">
            {SERVICES.map((service, i) => {
              const IconComponent = service.icon;
              return (
                <Reveal key={i} delay={(i % 2) * 100}>
                  <div className="service-card">
                    <div className="service-header">
                      <div className="service-icon"><IconComponent /></div>
                      <div className="service-info">
                        <h3>{service.title}</h3>
                        <div className="service-countries">
                          {service.countries.map((country) => (
                            <span key={country} className="country-tag">{country}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="service-desc">{service.desc}</p>
                    <div className="service-features">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="feature-item">
                          <FaCheckCircle />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ══ PROCESSUS ══ */}
        <section className="services-section sv-bg-white">
          <div className="section-header">
            <div className="section-tag">Notre processus</div>
            <h2 className="section-title">
              Comment nous <span className="accent">travaillons</span>
            </h2>
            <p className="section-desc">
              Un processus simple et transparent en 4 étapes pour vous garantir 
              les meilleures chances d'obtention de votre visa.
            </p>
          </div>

          <div className="process-steps">
            {PROCESS_STEPS.map((step, i) => {
              const IconComponent = step.icon;
              return (
                <Reveal key={i} delay={i * 100}>
                  <div className="process-step">
                    <div className="process-icon"><IconComponent /></div>
                    <h4>{step.title}</h4>
                    <p>{step.desc}</p>
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
              <h2>Prêt à commencer vos démarches ?</h2>
              <p>
                Prenez rendez-vous dès aujourd'hui pour bénéficier de notre expertise 
                et maximiser vos chances d'obtention de visa.
              </p>
              <Link to="/rendez-vous" className="cta-btn">
                <FaCalendarAlt />
                <span>Prendre rendez-vous</span>
                <FaArrowRight />
              </Link>
            </div>
          </Reveal>
        </section>

      </div>
    </>
  );
}