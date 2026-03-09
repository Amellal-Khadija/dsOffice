import React, { useEffect, useRef, useState } from "react";
import { 
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaInstagram,
  FaClock, FaBriefcase, FaCheckCircle, FaPaperPlane
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
const CONTACT_INFO = [
  { icon: FaPhone,     title: "Téléphone", value: "06 53 27 72 03",    link: "tel:+212653277203",                               color: "#E31E24" },
  { icon: FaWhatsapp,  title: "WhatsApp",  value: "06 53 63 32 80",    link: "https://wa.me/212653633280",                      color: "#25D366" },
  { icon: FaEnvelope,  title: "Email",     value: "info@dsoffice.ma",  link: "mailto:info@dsoffice.ma",                         color: "#0055A4" },
  { icon: FaInstagram, title: "Instagram", value: "@ds.office.maroc",  link: "https://www.instagram.com/ds.office.maroc/",      color: "#E4405F" },
];

const ADDRESS = {
  street: "36, Boulevard d'Anfa",
  building: "Résidence ANAFE A, 7ème étage, Appt 75",
  city: "Casablanca, Morocco",
  coordinates: { lat: 33.595261, lng: -7.627780 },
};

const OFFICE_HOURS = [
  { day: "Lundi - Vendredi", hours: "9h00 - 18h00" },
  { day: "Samedi",           hours: "9h00 - 13h00" },
  { day: "Dimanche",         hours: "Fermé"         },
];

/* ══════════════════════════════════════
   CSS — scopé sur .contact-root
══════════════════════════════════════ */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

/* ── LIGHT ── */
.contact-root {
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
.contact-root.dark-mode {
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
.contact-root * { box-sizing: border-box; margin: 0; padding: 0; }
.contact-root {
  font-family: 'DM Sans', sans-serif;
  color: var(--anthracite);
  background: var(--white);
  line-height: 1.6;
  transition: background 0.35s ease, color 0.35s ease;
}
.contact-root a { text-decoration: none; color: inherit; }

/* ── HERO ── */
.contact-hero {
  padding: 88px 6vw 72px;
  background: linear-gradient(135deg, var(--gray-light) 0%, var(--white) 100%);
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: background 0.35s ease;
}
.contact-hero::before {
  content: '';
  position: absolute; bottom: -60px; left: -60px;
  width: 350px; height: 350px; border-radius: 50%;
  background: radial-gradient(circle, rgba(227, 30, 36, 0.05) 0%, transparent 70%);
  pointer-events: none;
}
.hero-content {
  max-width: 700px; margin: 0 auto;
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
  color: var(--anthracite-2);
}

/* ── CONTACT SECTION ── */
.contact-section {
  padding: 88px 6vw;
  background: var(--white);
  transition: background 0.35s ease;
}
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 48px; max-width: 1200px; margin: 0 auto;
}

/* ── INFO PANEL ── */
.info-panel { display: flex; flex-direction: column; gap: 32px; }
.info-section {
  background: var(--gray-light);
  border: 1.5px solid var(--gray-border);
  border-radius: 12px; padding: 32px;
  transition: background 0.35s ease, border-color 0.35s ease;
}
.info-section h3 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.6rem; font-weight: 600;
  color: var(--anthracite); margin-bottom: 24px;
  display: flex; align-items: center; gap: 12px;
}
.info-section h3 svg { color: var(--red); font-size: 1.4rem; }

/* Contact items */
.contact-items { display: flex; flex-direction: column; gap: 16px; }
.contact-item {
  display: flex; align-items: center; gap: 16px;
  padding: 16px;
  background: var(--surface);
  border-radius: 8px; border: 1px solid var(--gray-border);
  transition: all 0.3s;
}
.contact-item:hover {
  border-color: var(--anthracite-3);
  box-shadow: 0 4px 16px var(--shadow-sm);
  transform: translateX(4px);
}
.contact-icon {
  flex-shrink: 0;
  width: 48px; height: 48px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.2rem; color: #FFFFFF;
  transition: transform 0.3s;
}
.contact-item:hover .contact-icon { transform: scale(1.1); }
.contact-details { flex: 1; }
.contact-details .label {
  font-size: 0.75rem; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.05em;
  color: var(--anthracite-3); margin-bottom: 4px;
}
.contact-details .value {
  font-size: 1rem; font-weight: 500; color: var(--anthracite);
}

/* Address */
.address-block {
  display: flex; gap: 16px; padding: 20px;
  background: var(--surface); border-radius: 8px;
  border: 1px solid var(--gray-border);
  transition: background 0.35s ease;
}
.address-icon {
  flex-shrink: 0;
  width: 48px; height: 48px; border-radius: 50%;
  background: var(--red);
  display: flex; align-items: center; justify-content: center;
  font-size: 1.2rem; color: #FFFFFF;
}
.address-text { flex: 1; }
.address-text .label {
  font-size: 0.75rem; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.05em;
  color: var(--anthracite-3); margin-bottom: 8px;
}
.address-text p { font-size: 0.95rem; color: var(--anthracite); line-height: 1.6; margin-bottom: 4px; }

/* Hours */
.hours-list { display: flex; flex-direction: column; gap: 12px; }
.hour-item {
  display: flex; justify-content: space-between; align-items: center;
  padding: 12px 16px;
  background: var(--surface); border-radius: 6px;
  border: 1px solid var(--gray-border);
  transition: background 0.35s ease;
}
.hour-item .day { font-size: 0.9rem; font-weight: 500; color: var(--anthracite); }
.hour-item .time { font-size: 0.9rem; font-weight: 600; color: var(--red); }

/* ── FORM PANEL ── */
.form-panel {
  background: var(--gray-light);
  border: 1.5px solid var(--gray-border);
  border-radius: 12px; padding: 40px;
  transition: background 0.35s ease, border-color 0.35s ease;
}
.form-panel h3 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.8rem; font-weight: 600;
  color: var(--anthracite); margin-bottom: 12px;
}
.form-panel p {
  font-size: 0.95rem; color: var(--anthracite-2);
  margin-bottom: 32px; line-height: 1.7;
}
.contact-form { display: flex; flex-direction: column; gap: 20px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.form-group { display: flex; flex-direction: column; gap: 8px; }
.form-group label { font-size: 0.85rem; font-weight: 600; color: var(--anthracite); }
.form-group label .required { color: var(--red); margin-left: 2px; }

.form-group input,
.form-group textarea,
.form-group select {
  padding: 14px 16px;
  border: 1.5px solid var(--gray-border);
  border-radius: 6px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.95rem;
  color: var(--anthracite);
  background: var(--surface);
  transition: all 0.3s;
}
/* Dark mode — placeholder lisible */
.contact-root.dark-mode .form-group input::placeholder,
.contact-root.dark-mode .form-group textarea::placeholder {
  color: var(--anthracite-3);
}
/* Dark mode — options du select */
.contact-root.dark-mode .form-group select option {
  background: #1A1A1A;
  color: var(--anthracite);
}
.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--red);
  box-shadow: 0 0 0 3px rgba(227, 30, 36, 0.08);
}
.form-group textarea { resize: vertical; min-height: 140px; font-family: 'DM Sans', sans-serif; }

.submit-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 10px;
  padding: 16px 36px;
  background: var(--red); color: #FFFFFF;
  font-size: 0.95rem; font-weight: 600;
  border: none; border-radius: 6px; cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 16px var(--red-shadow);
  position: relative; overflow: hidden; z-index: 1;
}
.submit-btn > * { position: relative; z-index: 1; }
.submit-btn::before {
  content: '';
  position: absolute; inset: 0;
  background: #1E1E1E;
  border-radius: 6px; opacity: 0;
  transition: opacity 0.3s; z-index: -1;
}
.submit-btn:hover::before { opacity: 1; }
.submit-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px var(--shadow-md); }

/* ── MAP SECTION ── */
.map-section {
  padding: 0 6vw 88px;
  background: var(--white);
  transition: background 0.35s ease;
}
.map-container {
  max-width: 1200px; margin: 0 auto;
  border-radius: 16px; overflow: hidden;
  box-shadow: 0 8px 32px var(--shadow-md);
  border: 2px solid var(--gray-border);
}
.map-container iframe { width: 100%; height: 500px; border: none; display: block; }

/* ── ANIMATIONS ── */
.reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
.reveal.visible { opacity: 1; transform: none; }

/* ── RESPONSIVE ── */
@media (max-width: 1024px) {
  .contact-grid { grid-template-columns: 1fr; gap: 40px; }
}

@media (max-width: 768px) {
  .contact-hero { padding: 64px 5vw 56px; }
  .hero-title { font-size: clamp(2rem, 6vw, 2.8rem); }
  .hero-subtitle { font-size: 1rem; }
  .contact-section { padding: 64px 5vw; }
  .info-section { padding: 24px; }
  .info-section h3 { font-size: 1.4rem; }
  .form-panel { padding: 32px 24px; }
  .form-panel h3 { font-size: 1.6rem; }
  .form-row { grid-template-columns: 1fr; gap: 20px; }
  .map-section { padding: 0 5vw 64px; }
  .map-container iframe { height: 400px; }
}

@media (max-width: 480px) {
  .contact-hero { padding: 56px 5vw 48px; }
  .hero-title { font-size: 1.75rem; }
  .hero-subtitle { font-size: 0.92rem; }
  .hero-tag { font-size: 0.65rem; padding: 5px 14px; }
  .contact-section { padding: 48px 5vw; }
  .info-section { padding: 20px; }
  .info-section h3 { font-size: 1.25rem; }
  .contact-item { flex-direction: column; text-align: center; gap: 12px; }
  .contact-icon { width: 44px; height: 44px; font-size: 1.1rem; }
  .address-block { flex-direction: column; text-align: center; gap: 12px; }
  .form-panel { padding: 24px 20px; }
  .form-panel h3 { font-size: 1.4rem; }
  .form-panel p { font-size: 0.88rem; }
  .submit-btn { width: 100%; padding: 14px 28px; }
  .map-section { padding: 0 5vw 48px; }
  .map-container { border-radius: 12px; }
  .map-container iframe { height: 350px; }
}

@media (max-width: 360px) {
  .contact-hero { padding: 48px 5vw 40px; }
  .hero-title { font-size: 1.5rem; }
  .contact-section { padding: 40px 4vw; }
  .info-section { padding: 16px; }
  .form-panel { padding: 20px 16px; }
  .map-section { padding: 0 4vw 40px; }
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
export default function Contact() {
  const { isDark } = useTheme();
  const darkClass  = isDark ? 'dark-mode' : '';

  const [formData, setFormData] = useState({
    nom: '', prenom: '', email: '', telephone: '', typeVisa: '', message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = `*Nouvelle demande de contact*%0A%0A*Nom:* ${formData.nom}%0A*Prénom:* ${formData.prenom}%0A*Email:* ${formData.email}%0A*Téléphone:* ${formData.telephone}%0A*Type de visa:* ${formData.typeVisa}%0A*Message:*%0A${formData.message}`;
    window.open(`https://wa.me/212653633280?text=${message}`, '_blank');
  };

  return (
    <>
      <style>{css}</style>
      <div className={`contact-root ${darkClass}`}>

        {/* ══ HERO ══ */}
        <section className="contact-hero">
          <div className="hero-content">
            <div className="hero-tag">Contactez-nous</div>
            <h1 className="hero-title">
              Nous sommes à votre <span className="accent">écoute</span>
            </h1>
            <p className="hero-subtitle">
              Notre équipe est disponible pour répondre à toutes vos questions 
              et vous accompagner dans vos démarches de visa.
            </p>
          </div>
        </section>

        {/* ══ CONTACT SECTION ══ */}
        <section className="contact-section">
          <div className="contact-grid">

            {/* INFO PANEL */}
            <div className="info-panel">

              {/* Contact Info */}
              <Reveal>
                <div className="info-section">
                  <h3><FaBriefcase /> Informations de contact</h3>
                  <div className="contact-items">
                    {CONTACT_INFO.map((item, i) => {
                      const IconComponent = item.icon;
                      return (
                        <a key={i} href={item.link} target="_blank" rel="noopener noreferrer" className="contact-item">
                          <div className="contact-icon" style={{ background: item.color }}>
                            <IconComponent />
                          </div>
                          <div className="contact-details">
                            <div className="label">{item.title}</div>
                            <div className="value">{item.value}</div>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </Reveal>

              {/* Address */}
              <Reveal delay={100}>
                <div className="info-section">
                  <h3><FaMapMarkerAlt /> Notre adresse</h3>
                  <a
                    href={`https://www.google.com/maps?q=${ADDRESS.coordinates.lat},${ADDRESS.coordinates.lng}`}
                    target="_blank" rel="noopener noreferrer"
                    className="address-block"
                  >
                    <div className="address-icon"><FaMapMarkerAlt /></div>
                    <div className="address-text">
                      <div className="label">DS Office Casablanca</div>
                      <p>{ADDRESS.street}</p>
                      <p>{ADDRESS.building}</p>
                      <p>{ADDRESS.city}</p>
                    </div>
                  </a>
                </div>
              </Reveal>

              {/* Hours */}
              <Reveal delay={200}>
                <div className="info-section">
                  <h3><FaClock /> Horaires d'ouverture</h3>
                  <div className="hours-list">
                    {OFFICE_HOURS.map((item, i) => (
                      <div key={i} className="hour-item">
                        <span className="day">{item.day}</span>
                        <span className="time">{item.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

            </div>

            {/* FORM PANEL */}
            <Reveal delay={100}>
              <div className="form-panel">
                <h3>Envoyez-nous un message</h3>
                <p>Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.</p>

                <form className="contact-form" onSubmit={handleSubmit}>
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
                    <label>Type de visa <span className="required">*</span></label>
                    <select name="typeVisa" value={formData.typeVisa} onChange={handleChange} required>
                      <option value="">Sélectionnez le type de visa</option>
                      <option value="Tourisme">Visa Tourisme</option>
                      <option value="Études & Langues">Visa Études & Langues</option>
                      <option value="Travail">Visa Travail</option>
                      <option value="Regroupement Familial">Regroupement Familial</option>
                      <option value="Médical">Visa Médical</option>
                      <option value="Arabie Saoudite">Arabie Saoudite</option>
                      <option value="Chine">Chine</option>
                      <option value="Autre">Autre demande</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Message <span className="required">*</span></label>
                    <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Décrivez votre projet et vos besoins..." required></textarea>
                  </div>

                  <button type="submit" className="submit-btn">
                    <span>Envoyer le message</span>
                    <FaPaperPlane />
                  </button>
                </form>
              </div>
            </Reveal>

          </div>
        </section>

        {/* ══ MAP SECTION ══ */}
        <section className="map-section">
          <Reveal>
            <div className="map-container">
              <iframe
                src={`https://www.google.com/maps?q=${ADDRESS.coordinates.lat},${ADDRESS.coordinates.lng}&hl=fr&z=16&output=embed`}
                allowFullScreen="" loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="DS Office Location"
              />
            </div>
          </Reveal>
        </section>

      </div>
    </>
  );
}