import React, { useEffect, useRef, useState } from "react";
import { 
  FaCalendarAlt, FaClock, FaCheckCircle, FaUserTie, FaShieldAlt,
  FaFileAlt, FaWhatsapp, FaPaperPlane, FaMapMarkerAlt
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
const BENEFITS = [
  { icon: FaUserTie,   title: "Consultation personnalisée", desc: "Un expert dédié analyse votre dossier et vous conseille" },
  { icon: FaShieldAlt, title: "Maximisez vos chances",      desc: "98% de taux de réussite avec notre accompagnement" },
  { icon: FaFileAlt,   title: "Préparation complète",       desc: "Tous les documents vérifiés avant le dépôt" },
  { icon: FaClock,     title: "Gain de temps",              desc: "Évitez les erreurs et les allers-retours inutiles" },
];

const VISA_TYPES = [
  "Visa Tourisme", "Visa Études & Langues", "Visa Travail",
  "Regroupement Familial", "Visa Médical", "Arabie Saoudite", "Chine", "Autre demande",
];

/* ══════════════════════════════════════
   CSS — scopé sur .rdv-root
══════════════════════════════════════ */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

/* ── LIGHT ── */
.rdv-root {
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
.rdv-root.dark-mode {
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
.rdv-root * { box-sizing: border-box; margin: 0; padding: 0; }
.rdv-root {
  font-family: 'DM Sans', sans-serif;
  color: var(--anthracite);
  background: var(--white);
  line-height: 1.6;
  transition: background 0.35s ease, color 0.35s ease;
}
.rdv-root a { text-decoration: none; color: inherit; }

/* ── HERO — fond sombre fixe, indépendant du thème ── */
.rdv-hero {
  padding: 88px 6vw 72px;
  background: linear-gradient(135deg, #2A2A2A 0%, #444444 100%);
  text-align: center;
  position: relative;
  overflow: hidden;
}
.rdv-root.dark-mode .rdv-hero {
  background: linear-gradient(135deg, #111111 0%, #222222 100%);
}
.rdv-hero::before {
  content: '';
  position: absolute; top: -100px; right: -100px;
  width: 500px; height: 500px; border-radius: 50%;
  background: radial-gradient(circle, rgba(227, 30, 36, 0.15) 0%, transparent 70%);
  pointer-events: none;
}
.rdv-hero::after {
  content: '';
  position: absolute; top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--red) 0%, transparent 50%);
}
.hero-content {
  max-width: 800px; margin: 0 auto;
  position: relative; z-index: 1;
}
.hero-tag {
  display: inline-block;
  font-size: 0.7rem; font-weight: 700;
  letter-spacing: 0.16em; text-transform: uppercase;
  color: #FFFFFF;
  padding: 6px 16px;
  background: rgba(255,255,255,0.10);
  border-radius: 4px;
  border-left: 3px solid var(--red);
  margin-bottom: 24px;
  backdrop-filter: blur(10px);
}
.hero-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 600; line-height: 1.2;
  color: #FFFFFF; margin-bottom: 24px;
}
.hero-title .accent { color: var(--red); font-weight: 700; }
.hero-subtitle {
  font-size: 1.15rem; line-height: 1.8;
  color: rgba(255,255,255,0.85);
}

/* ── BENEFITS ── */
.benefits-section {
  padding: 88px 6vw;
  background: var(--white);
  transition: background 0.35s ease;
}
.benefits-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px; max-width: 1200px; margin: 0 auto;
}
.benefit-card {
  background: var(--gray-light);
  border: 1.5px solid var(--gray-border);
  border-radius: 12px; padding: 32px 24px; text-align: center;
  transition: all 0.3s;
}
.benefit-card:hover {
  border-color: var(--red);
  box-shadow: 0 8px 24px var(--shadow-sm);
  transform: translateY(-4px);
}
.benefit-icon {
  width: 64px; height: 64px; margin: 0 auto 20px;
  background: var(--red-soft); border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.8rem; color: var(--red); transition: all 0.3s;
}
.benefit-card:hover .benefit-icon {
  background: var(--red); color: #FFFFFF; transform: scale(1.1);
}
.benefit-card h3 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.3rem; font-weight: 600;
  color: var(--anthracite); margin-bottom: 12px;
}
.benefit-card p { font-size: 0.9rem; color: var(--anthracite-2); line-height: 1.6; }

/* ── FORM SECTION ── */
.form-section {
  padding: 88px 6vw;
  background: var(--gray-light);
  transition: background 0.35s ease;
}
.form-container { max-width: 900px; margin: 0 auto; }
.section-header { text-align: center; margin-bottom: 48px; }
.section-tag {
  display: inline-block;
  font-size: 0.7rem; font-weight: 700;
  letter-spacing: 0.16em; text-transform: uppercase;
  color: var(--anthracite-2);
  padding: 4px 12px;
  background: var(--surface);
  border-radius: 3px;
  border-left: 2px solid var(--red);
  margin-bottom: 16px;
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

.form-panel {
  background: var(--surface);
  border: 2px solid var(--gray-border);
  border-radius: 16px; padding: 48px;
  box-shadow: 0 8px 32px var(--shadow-sm);
  transition: background 0.35s ease, border-color 0.35s ease;
}

.rdv-form { display: flex; flex-direction: column; gap: 24px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.form-group { display: flex; flex-direction: column; gap: 10px; }
.form-group label {
  font-size: 0.9rem; font-weight: 600;
  color: var(--anthracite);
  display: flex; align-items: center; gap: 8px;
}
.form-group label svg { color: var(--red); font-size: 0.9rem; }
.form-group label .required { color: var(--red); margin-left: 2px; }

.form-group input,
.form-group textarea,
.form-group select {
  padding: 16px;
  border: 2px solid var(--gray-border);
  border-radius: 8px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.95rem;
  color: var(--anthracite);
  background: var(--white);
  transition: all 0.3s;
}
/* Dark mode — input date/color-scheme */
.rdv-root.dark-mode .form-group input,
.rdv-root.dark-mode .form-group textarea,
.rdv-root.dark-mode .form-group select {
  color-scheme: dark;
}
.rdv-root.dark-mode .form-group input::placeholder,
.rdv-root.dark-mode .form-group textarea::placeholder {
  color: var(--anthracite-3);
}
.rdv-root.dark-mode .form-group select option {
  background: #1A1A1A;
  color: var(--anthracite);
}
.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--red);
  box-shadow: 0 0 0 4px rgba(227, 30, 36, 0.08);
}
.form-group textarea { resize: vertical; min-height: 140px; font-family: 'DM Sans', sans-serif; }

.submit-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 12px;
  padding: 18px 40px;
  background: var(--red); color: #FFFFFF;
  font-size: 1rem; font-weight: 600;
  border: none; border-radius: 8px; cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 16px var(--red-shadow);
  position: relative; overflow: hidden; z-index: 1;
}
.submit-btn > * { position: relative; z-index: 1; }
.submit-btn::before {
  content: '';
  position: absolute; inset: 0;
  background: #1E1E1E;
  border-radius: 8px; opacity: 0;
  transition: opacity 0.3s; z-index: -1;
}
.submit-btn:hover::before { opacity: 1; }
.submit-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px var(--shadow-md); }

/* Info box */
.info-box {
  background: var(--red-soft);
  border-left: 4px solid var(--red);
  border-radius: 8px; padding: 20px 24px; margin-bottom: 32px;
}
.info-box-title {
  display: flex; align-items: center; gap: 10px;
  font-size: 0.95rem; font-weight: 600;
  color: var(--anthracite); margin-bottom: 8px;
}
.info-box-title svg { color: var(--red); font-size: 1.1rem; }
.info-box-text { font-size: 0.88rem; color: var(--anthracite-2); line-height: 1.6; }

/* ── CONTACT CTA ── */
.contact-cta {
  background: var(--gray-light);
  border: 2px solid var(--gray-border);
  border-radius: 12px; padding: 32px;
  text-align: center; margin-top: 32px;
  transition: background 0.35s ease;
}
.contact-cta h3 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.6rem; font-weight: 600;
  color: var(--anthracite); margin-bottom: 12px;
}
.contact-cta p {
  font-size: 0.95rem; color: var(--anthracite-2);
  margin-bottom: 24px; line-height: 1.6;
}
.contact-buttons { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
.contact-btn {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 14px 28px; border-radius: 6px;
  font-size: 0.9rem; font-weight: 600;
  transition: all 0.3s; text-decoration: none;
}
.contact-btn.whatsapp { background: #25D366; color: #FFFFFF; }
.contact-btn.phone    { background: #2A2A2A; color: #FFFFFF; }
.rdv-root.dark-mode .contact-btn.phone { background: #333333; }
.contact-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px var(--shadow-sm);
}

/* ── ANIMATIONS ── */
.reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
.reveal.visible { opacity: 1; transform: none; }

/* ── RESPONSIVE ── */
@media (max-width: 1024px) {
  .benefits-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
}

@media (max-width: 768px) {
  .rdv-hero { padding: 64px 5vw 56px; }
  .hero-title { font-size: clamp(2rem, 6vw, 2.8rem); }
  .hero-subtitle { font-size: 1rem; }
  .benefits-section { padding: 64px 5vw; }
  .benefits-grid { grid-template-columns: 1fr; gap: 16px; }
  .form-section { padding: 64px 5vw; }
  .form-panel { padding: 32px 24px; }
  .form-row { grid-template-columns: 1fr; gap: 20px; }
  .contact-buttons { flex-direction: column; }
  .contact-btn { width: 100%; justify-content: center; }
}

@media (max-width: 480px) {
  .rdv-hero { padding: 56px 5vw 48px; }
  .hero-title { font-size: 1.75rem; }
  .hero-subtitle { font-size: 0.92rem; }
  .hero-tag { font-size: 0.65rem; padding: 5px 14px; }
  .benefits-section { padding: 48px 5vw; }
  .benefit-card { padding: 24px 20px; }
  .benefit-icon { width: 56px; height: 56px; font-size: 1.5rem; }
  .benefit-card h3 { font-size: 1.15rem; }
  .benefit-card p { font-size: 0.85rem; }
  .form-section { padding: 48px 5vw; }
  .section-title { font-size: 1.6rem; }
  .section-desc { font-size: 0.9rem; }
  .form-panel { padding: 24px 20px; }
  .form-group input,
  .form-group textarea,
  .form-group select { padding: 14px; font-size: 0.9rem; }
  .submit-btn { width: 100%; padding: 16px 32px; }
  .contact-cta { padding: 24px 20px; }
  .contact-cta h3 { font-size: 1.4rem; }
  .contact-cta p { font-size: 0.88rem; }
}

@media (max-width: 360px) {
  .rdv-hero { padding: 48px 5vw 40px; }
  .hero-title { font-size: 1.5rem; }
  .benefits-section { padding: 40px 4vw; }
  .form-section { padding: 40px 4vw; }
  .form-panel { padding: 20px 16px; }
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
export default function RendezVous() {
  const { isDark } = useTheme();
  const darkClass  = isDark ? 'dark-mode' : '';

  const [formData, setFormData] = useState({
    nom: '', prenom: '', email: '', telephone: '',
    typeVisa: '', datePreferee: '', heurePreferee: '', message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = `*Demande de rendez-vous*%0A%0A*Nom:* ${formData.nom}%0A*Prénom:* ${formData.prenom}%0A*Email:* ${formData.email}%0A*Téléphone:* ${formData.telephone}%0A*Type de visa:* ${formData.typeVisa}%0A*Date souhaitée:* ${formData.datePreferee}%0A*Heure souhaitée:* ${formData.heurePreferee}%0A%0A*Message:*%0A${formData.message}`;
    window.open(`https://wa.me/212653633280?text=${message}`, '_blank');
  };

  return (
    <>
      <style>{css}</style>
      <div className={`rdv-root ${darkClass}`}>

        {/* ══ HERO ══ */}
        <section className="rdv-hero">
          <div className="hero-content">
            <div className="hero-tag">Prise de rendez-vous</div>
            <h1 className="hero-title">
              Réservez votre <span className="accent">consultation</span>
            </h1>
            <p className="hero-subtitle">
              Rencontrez nos experts en visa pour une analyse personnalisée de votre dossier. 
              Prenez rendez-vous en quelques clics et maximisez vos chances de réussite.
            </p>
          </div>
        </section>

        {/* ══ BENEFITS ══ */}
        <section className="benefits-section">
          <div className="benefits-grid">
            {BENEFITS.map((benefit, i) => {
              const IconComponent = benefit.icon;
              return (
                <Reveal key={i} delay={i * 100}>
                  <div className="benefit-card">
                    <div className="benefit-icon"><IconComponent /></div>
                    <h3>{benefit.title}</h3>
                    <p>{benefit.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ══ FORM SECTION ══ */}
        <section className="form-section">
          <Reveal>
            <div className="form-container">
              <div className="section-header">
                <div className="section-tag">Formulaire de rendez-vous</div>
                <h2 className="section-title">
                  Planifiez votre <span className="accent">consultation</span>
                </h2>
                <p className="section-desc">
                  Remplissez le formulaire ci-dessous et nous vous confirmerons votre 
                  rendez-vous dans les plus brefs délais.
                </p>
              </div>

              <div className="form-panel">
                <div className="info-box">
                  <div className="info-box-title">
                    <FaMapMarkerAlt />
                    <span>Notre bureau à Casablanca</span>
                  </div>
                  <p className="info-box-text">
                    36, Boulevard d'Anfa, Résidence ANAFE A, 7ème étage, Appt 75<br />
                    Horaires : Lun-Ven 9h-18h | Sam 9h-13h
                  </p>
                </div>

                <form className="rdv-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Nom <span className="required">*</span></label>
                      <input type="text" name="nom" value={formData.nom} onChange={handleChange} placeholder="Votre nom" required />
                    </div>
                    <div className="form-group">
                      <label>Prénom <span className="required">*</span></label>
                      <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} placeholder="Votre prénom" required />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Email <span className="required">*</span></label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="votre@email.com" required />
                    </div>
                    <div className="form-group">
                      <label>Téléphone <span className="required">*</span></label>
                      <input type="tel" name="telephone" value={formData.telephone} onChange={handleChange} placeholder="06 XX XX XX XX" required />
                    </div>
                  </div>

                  <div className="form-group">
                    <label><FaFileAlt /> Type de visa <span className="required">*</span></label>
                    <select name="typeVisa" value={formData.typeVisa} onChange={handleChange} required>
                      <option value="">Sélectionnez le type de visa</option>
                      {VISA_TYPES.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label><FaCalendarAlt /> Date préférée <span className="required">*</span></label>
                      <input
                        type="date" name="datePreferee"
                        value={formData.datePreferee} onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]} required
                      />
                    </div>
                    <div className="form-group">
                      <label><FaClock /> Heure préférée <span className="required">*</span></label>
                      <select name="heurePreferee" value={formData.heurePreferee} onChange={handleChange} required>
                        <option value="">Choisir un créneau</option>
                        <option value="9h00 - 10h00">9h00 - 10h00</option>
                        <option value="10h00 - 11h00">10h00 - 11h00</option>
                        <option value="11h00 - 12h00">11h00 - 12h00</option>
                        <option value="12h00 - 13h00">12h00 - 13h00</option>
                        <option value="14h00 - 15h00">14h00 - 15h00</option>
                        <option value="15h00 - 16h00">15h00 - 16h00</option>
                        <option value="16h00 - 17h00">16h00 - 17h00</option>
                        <option value="17h00 - 18h00">17h00 - 18h00</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Message <span className="required">*</span></label>
                    <textarea
                      name="message" value={formData.message} onChange={handleChange}
                      placeholder="Décrivez brièvement votre projet (destination, durée du séjour, situation actuelle...)"
                      required
                    />
                  </div>

                  <button type="submit" className="submit-btn">
                    <FaCheckCircle />
                    <span>Confirmer le rendez-vous</span>
                    <FaPaperPlane />
                  </button>
                </form>

                {/* Contact CTA */}
                <div className="contact-cta">
                  <h3>Besoin d'une réponse immédiate ?</h3>
                  <p>Contactez-nous directement par téléphone ou WhatsApp pour toute question urgente.</p>
                  <div className="contact-buttons">
                    <a href="https://wa.me/212653633280" target="_blank" rel="noopener noreferrer" className="contact-btn whatsapp">
                      <FaWhatsapp />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

      </div>
    </>
  );
}