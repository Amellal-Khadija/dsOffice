import React from "react";
import { Link } from "react-router-dom";
import { 
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaInstagram,
  FaClock, FaArrowRight, FaGlobe, FaCheckCircle
} from 'react-icons/fa';
import { useTranslation } from '../../hooks/useTranslation';

/* ══════════════════════════════════════
   DATA - Now using translations
══════════════════════════════════════ */

/* ══════════════════════════════════════
   CSS
══════════════════════════════════════ */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

:root {
  --anthracite:   #3A3A3A;
  --anthracite-2: #555555;
  --anthracite-3: #888888;
  --red:          #E31E24;
  --red-soft:     rgba(227, 30, 36, 0.06);
  --gray-light:   #F8F8F8;
  --gray-border:  #E8E8E8;
  --white:        #FFFFFF;
  --shadow-sm:    rgba(0, 0, 0, 0.06);
  --footer-bg:    #3A3A3A;
  --footer-text:  rgba(255,255,255,0.85);
}

.dark-mode {
  --anthracite:   #F5F5F5;
  --anthracite-2: #E0E0E0;
  --anthracite-3: #A0A0A0;
  --gray-light:   #2A2A2A;
  --gray-border:  rgba(255, 255, 255, 0.12);
  --white:        #FFFFFF;
  --shadow-sm:    rgba(0, 0, 0, 0.25);
  --footer-bg:    #0D0D0D;
  --footer-text:  rgba(255,255,255,0.9);
}

.footer-root * { box-sizing: border-box; margin: 0; padding: 0; }
.footer-root { 
  font-family: 'DM Sans', sans-serif; 
  color: var(--footer-text); 
  background: var(--footer-bg);
}
.footer-root a { text-decoration: none; color: inherit; }

/* ── MAIN FOOTER ── */
.footer-main {
  padding: 64px 6vw 32px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}
.footer-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
  gap: 48px;
  max-width: 1400px;
  margin: 0 auto;
}

/* ── ABOUT COLUMN ── */
.footer-about h3 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--white);
  margin-bottom: 16px;
}
.footer-about h3 .accent {
  color: var(--red);
}
.footer-tagline {
  font-size: 0.9rem;
  line-height: 1.7;
  color: rgba(255,255,255,0.7);
  margin-bottom: 24px;
}
.footer-social {
  display: flex;
  gap: 12px;
}
.social-link {
  width: 40px; height: 40px;
  border-radius: 50%;
  background: rgba(255,255,255,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  transition: all 0.3s;
}
.social-link:hover {
  background: var(--red);
  color: var(--white);
  transform: translateY(-2px);
}

/* ── COLUMNS ── */
.footer-column h4 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--white);
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--red);
  display: inline-block;
}
.footer-links {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.footer-link {
  font-size: 0.9rem;
  color: rgba(255,255,255,0.7);
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
}
.footer-link:hover {
  color: var(--red);
  transform: translateX(4px);
}
.footer-link svg {
  font-size: 0.75rem;
  opacity: 0;
  transition: opacity 0.3s;
}
.footer-link:hover svg {
  opacity: 1;
}

/* ── CONTACT COLUMN ── */
.footer-contact-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;
  font-size: 0.9rem;
  line-height: 1.6;
}
.footer-contact-item svg {
  color: var(--red);
  font-size: 1.1rem;
  margin-top: 2px;
  flex-shrink: 0;
}
.footer-contact-item a {
  transition: color 0.3s;
}
.footer-contact-item a:hover {
  color: var(--red);
}
.contact-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: rgba(255,255,255,0.5);
  margin-bottom: 4px;
}

/* ── BOTTOM ── */
.footer-bottom {
  padding: 24px 6vw;
  background: rgba(0,0,0,0.2);
}
.footer-bottom-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}
.copyright {
  font-size: 0.85rem;
  color: rgba(255,255,255,0.6);
}
.copyright .year {
  color: var(--red);
  font-weight: 600;
}
.footer-bottom-links {
  display: flex;
  gap: 24px;
  font-size: 0.85rem;
}
.footer-bottom-links a {
  color: rgba(255,255,255,0.6);
  transition: color 0.3s;
}
.footer-bottom-links a:hover {
  color: var(--red);
}

/* ── CTA BAR ── */
.footer-cta {
  background: var(--red);
  padding: 32px 6vw;
  text-align: center;
}
.cta-content {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
.cta-content h3 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--white);
}
.cta-buttons {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
}
.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  background: var(--white);
  color: var(--anthracite);
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 6px;
  transition: all 0.3s;
}
.cta-btn:hover {
  background: var(--anthracite);
  color: var(--white);
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.2);
}

/* ── RESPONSIVE ── */
@media (max-width: 1024px) {
  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
  }
  .footer-about {
    grid-column: 1 / -1;
  }
}

@media (max-width: 768px) {
  .footer-main {
    padding: 48px 5vw 24px;
  }
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  .footer-about {
    grid-column: auto;
  }
  
  .footer-bottom-content {
    flex-direction: column;
    text-align: center;
  }
  .footer-bottom-links {
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .footer-cta {
    padding: 24px 5vw;
  }
  .cta-content h3 {
    font-size: 1.4rem;
  }
  .cta-buttons {
    flex-direction: column;
    width: 100%;
  }
  .cta-btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .footer-main {
    padding: 40px 5vw 20px;
  }
  .footer-about h3 {
    font-size: 1.5rem;
  }
  .footer-tagline {
    font-size: 0.85rem;
  }
  .footer-column h4 {
    font-size: 1.1rem;
  }
  .footer-links, .footer-contact-item {
    font-size: 0.85rem;
  }
  
  .footer-cta {
    padding: 20px 5vw;
  }
  .cta-content h3 {
    font-size: 1.25rem;
  }
  .cta-btn {
    padding: 12px 24px;
    font-size: 0.85rem;
  }
  
  .footer-bottom {
    padding: 20px 5vw;
  }
  .copyright, .footer-bottom-links {
    font-size: 0.8rem;
  }
}

@media (max-width: 360px) {
  .footer-main {
    padding: 32px 4vw 16px;
  }
  .footer-about h3 {
    font-size: 1.3rem;
  }
  .footer-cta {
    padding: 16px 4vw;
  }
  .footer-bottom {
    padding: 16px 4vw;
  }
}
`;

/* ══════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════ */
export default function Footer() {
  const currentYear = new Date().getFullYear();
  const t = useTranslation();

  // Data arrays using translations
  const QUICK_LINKS = [
    { label: t.footer.navigation.home, path: "/" },
    { label: t.footer.navigation.about, path: "/a-propos" },
    { label: t.footer.navigation.services, path: "/services" },
    { label: t.footer.navigation.appointment, path: "/rendez-vous" },
    { label: t.footer.navigation.contact, path: "/contact" }
  ];

  const SERVICES_LINKS = [
    t.footer.services.tourism,
    t.footer.services.studies,
    t.footer.services.work,
    t.footer.services.family,
    t.footer.services.medical,
    t.footer.services.saudiChina
  ];

  return (
    <>
      <style>{css}</style>
      <footer className="footer-root">
        
        {/* ══ CTA BAR ══ */}
       

        {/* ══ MAIN FOOTER ══ */}
        <div className="footer-main">
          <div className="footer-grid">
            
            {/* ABOUT */}
            <div className="footer-about">
              <h3>DS <span className="accent">Office</span></h3>
              <p className="footer-tagline">
                {t.footer.about.tagline}
              </p>
              <div className="footer-social">
                <a href="https://www.instagram.com/ds.office.maroc/" target="_blank" rel="noopener noreferrer" className="social-link">
                  <FaInstagram />
                </a>
                <a href="https://wa.me/212653633280" target="_blank" rel="noopener noreferrer" className="social-link">
                  <FaWhatsapp />
                </a>
                <a href="mailto:info@dsoffice.ma" className="social-link">
                  <FaEnvelope />
                </a>
              </div>
            </div>

            {/* NAVIGATION */}
            <div className="footer-column">
              <h4>{t.footer.navigation.title}</h4>
              <div className="footer-links">
                {QUICK_LINKS.map((link, i) => (
                  <Link key={i} to={link.path} className="footer-link">
                    <FaArrowRight />
                    <span>{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* SERVICES */}
            <div className="footer-column">
              <h4>{t.footer.services.title}</h4>
              <div className="footer-links">
                {SERVICES_LINKS.map((service, i) => (
                  <Link key={i} to="/services" className="footer-link">
                    <FaCheckCircle />
                    <span>{service}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* CONTACT */}
            <div className="footer-column">
              <h4>{t.footer.contactSection.title}</h4>
              
              <div className="footer-contact-item">
                <FaPhone />
                <div>
                  <div className="contact-label">{t.footer.contactSection.phoneLabel}</div>
                  <a href="tel:+212653277203">06 53 27 72 03</a>
                </div>
              </div>

              <div className="footer-contact-item">
                <FaWhatsapp />
                <div>
                  <div className="contact-label">{t.footer.contactSection.whatsappLabel}</div>
                  <a href="https://wa.me/212653633280" target="_blank" rel="noopener noreferrer">
                    06 53 63 32 80
                  </a>
                </div>
              </div>

              <div className="footer-contact-item">
                <FaEnvelope />
                <div>
                  <div className="contact-label">{t.footer.contactSection.emailLabel}</div>
                  <a href="mailto:info@dsoffice.ma">info@dsoffice.ma</a>
                </div>
              </div>

              <div className="footer-contact-item">
                <FaMapMarkerAlt />
                <div>
                  <div className="contact-label">{t.footer.contactSection.addressLabel}</div>
                  <div>
                    {t.footer.contactSection.addressLine1}<br />
                    {t.footer.contactSection.addressLine2}<br />
                    {t.footer.contactSection.addressLine3}
                  </div>
                </div>
              </div>

              <div className="footer-contact-item">
                <FaClock />
                <div>
                  <div className="contact-label">{t.footer.contactSection.hoursLabel}</div>
                  <div>
                    {t.footer.contactSection.weekdays}<br />
                    {t.footer.contactSection.saturday}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ══ BOTTOM ══ */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              © <span className="year">{currentYear}</span> DS Office. {t.footer.bottom.copyright}
            </div>
            <div className="footer-bottom-links">
              <Link to="/a-propos">{t.footer.navigation.about}</Link>
              <Link to="/services">{t.footer.navigation.services}</Link>
              <Link to="/contact">{t.footer.navigation.contact}</Link>
            </div>
          </div>
        </div>

      </footer>
    </>
  );
}
