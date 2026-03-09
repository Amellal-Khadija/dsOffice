# 📘 Guide d'Implémentation des Traductions - DS Office

## ✅ Ce qui est déjà fait

1. ✅ **LanguageContext** créé et fonctionnel
2. ✅ **Fichiers de traductions** complets (fr.js, en.js, ar.js)
3. ✅ **Hook useTranslation** créé
4. ✅ **LanguageProvider** intégré dans main.jsx
5. ✅ **Menu** entièrement traduit avec sélecteur de langue
6. ✅ **Support RTL** pour l'arabe
7. ✅ **Hook importé** dans Accueil.jsx

## 🔄 Ce qu'il reste à faire

Mettre à jour le contenu des 6 pages principales pour utiliser les traductions au lieu du texte hardcodé.

---

## 📝 Exemple Pratique : Accueil.jsx

### AVANT (texte hardcodé)
```jsx
export default function Accueil() {
  const { isDark } = useTheme();
  
  return (
    <div>
      <div className="hero-badge">
        Agence Visa Professionnelle — Casablanca
      </div>
      <h1 className="hero-title">
        Votre visa,<br />
        notre <span className="accent">expertise</span>
      </h1>
      <p className="hero-desc">
        DS Office vous accompagne de A à Z...
      </p>
    </div>
  );
}
```

### APRÈS (avec traductions)
```jsx
export default function Accueil() {
  const { isDark } = useTheme();
  const t = useTranslation();  // ← Ajouter cette ligne
  
  return (
    <div>
      <div className="hero-badge">
        {t.home.badge}  {/* ← Utiliser la traduction */}
      </div>
      <h1 className="hero-title">
        {t.home.hero.title}<br />
        {t.common.readyToStart} <span className="accent">{t.home.hero.titleAccent}</span>
      </h1>
      <p className="hero-desc">
        {t.home.hero.description}
      </p>
    </div>
  );
}
```

---

## 🎯 Plan d'Action Détaillé

### 1️⃣ Accueil.jsx - Sections à traduire

#### Imports (✅ DÉJÀ FAIT)
```jsx
import { useTranslation } from '../../hooks/useTranslation';

// Dans le composant
const t = useTranslation();
```

#### Section Hero
**Rechercher :**
```jsx
<div className="hero-badge">
  <span className="badge-dot" />
  Agence Visa Professionnelle — Casablanca
</div>
<h1 className="hero-title">
  Votre visa,<br />
  notre <span className="accent">expertise</span>
</h1>
<p className="hero-desc">
  DS Office vous accompagne de A à Z dans toutes vos démarches...
</p>
```

**Remplacer par :**
```jsx
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
```

#### Boutons CTA
**Rechercher :**
```jsx
<Link to="/rendez-vous" className="btn btn-blue">
  <FaCalendarAlt /> Prendre rendez-vous
</Link>
```

**Remplacer par :**
```jsx
<Link to="/rendez-vous" className="btn btn-blue">
  <FaCalendarAlt /> {t.nav.takeAppointment}
</Link>
```

#### Section Statistiques
**Rechercher dans le tableau STATS :**
```jsx
const STATS = [
  { num: "500+", label: "Clients accompagnés" },
  { num: "98%",  label: "Taux de satisfaction" },
  { num: "6",    label: "Pays couverts" },
  { num: "5+",   label: "Années d'expérience" },
];
```

**Remplacer par (à l'intérieur du composant) :**
```jsx
const STATS = [
  { num: "500+", label: t.home.stats.clients },
  { num: "98%",  label: t.home.stats.satisfaction },
  { num: "6",    label: t.home.stats.countries },
  { num: "5+",   label: t.home.stats.experience },
];
```

#### Section À Propos
**Rechercher :**
```jsx
<div className="section-tag">Qui sommes-nous</div>
<h2 className="section-title">
  DS Office — <span className="accent">Votre partenaire</span> de confiance
</h2>
<p className="section-sub">
  Basée à Casablanca, DS Office est une agence...
</p>
```

**Remplacer par :**
```jsx
<div className="section-tag">{t.home.about.tag}</div>
<h2 className="section-title">
  {t.home.about.title} <span className="accent">{t.home.about.titleAccent}</span> {t.home.about.titleEnd}
</h2>
<p className="section-sub">
  {t.home.about.description}
</p>
```

#### Points d'accompagnement
**Rechercher le tableau ABOUT_POINTS :**
```jsx
const ABOUT_POINTS = [
  { icon: FaClipboardList, title: "Accompagnement complet", desc: "De la préparation du dossier..." },
  // ...
];
```

**Remplacer par :**
```jsx
const ABOUT_POINTS = [
  { 
    icon: FaClipboardList, 
    title: t.home.about.points.complete.title, 
    desc: t.home.about.points.complete.desc 
  },
  { 
    icon: FaBolt, 
    title: t.home.about.points.fast.title, 
    desc: t.home.about.points.fast.desc 
  },
  { 
    icon: FaLock, 
    title: t.home.about.points.confidential.title, 
    desc: t.home.about.points.confidential.desc 
  },
  { 
    icon: FaWhatsapp, 
    title: t.home.about.points.available.title, 
    desc: t.home.about.points.available.desc 
  },
];
```

#### Services Grid
**Rechercher le tableau SERVICES :**
```jsx
const SERVICES = [
  {
    icon: FaPlane,
    title: "Visa Tourisme",
    desc: "Visitez la France, l'Espagne ou le Portugal...",
    tags: ["France", "Espagne", "Portugal"],
  },
  // ...
];
```

**Remplacer par :**
```jsx
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
```

#### Section Pays
**Rechercher :**
```jsx
<div className="section-tag">Destinations</div>
<h2 className="section-title">
  Pays <span>couverts</span>
</h2>
```

**Remplacer par :**
```jsx
<div className="section-tag">{t.home.countries.tag}</div>
<h2 className="section-title">
  {t.home.countries.title} <span>{t.home.countries.titleAccent}</span>
</h2>
```

#### CTA Banner
**Rechercher :**
```jsx
<h2>Prêt à commencer votre démarche ?</h2>
<p>Prenez rendez-vous dès aujourd'hui...</p>
```

**Remplacer par :**
```jsx
<h2>{t.common.readyToStart}</h2>
<p>{t.common.callToAction}</p>
```

---

### 2️⃣ a-propos.jsx - Sections à traduire

#### Imports
```jsx
import { useTranslation } from '../../hooks/useTranslation';

// Dans le composant
export default function APropos() {
  const { isDark } = useTheme();
  const t = useTranslation();  // ← Ajouter
```

#### Hero
```jsx
// AVANT
<div className="section-tag">Notre histoire</div>
<h1>Une décennie d'<span>excellence</span></h1>

// APRÈS
<div className="section-tag">{t.about.hero.tag}</div>
<h1>{t.about.hero.title} <span>{t.about.hero.titleAccent}</span></h1>
```

#### Stats
```jsx
// AVANT
const STATS = [
  { icon: FaClock,  num: "10+",  label: "Années d'expérience" },
  // ...
];

// APRÈS
const STATS = [
  { icon: FaClock,  num: "10+",  label: t.about.stats.experience },
  { icon: FaUsers,  num: "500+", label: t.about.stats.clients },
  { icon: FaAward,  num: "98%",  label: t.about.stats.success },
  { icon: FaGlobe,  num: "6",    label: t.about.stats.countries },
];
```

#### Values
```jsx
// AVANT
const VALUES = [
  { icon: FaHandshake, title: "Confiance", desc: "Nous bâtissons..." },
  // ...
];

// APRÈS
const VALUES = [
  { 
    icon: FaHandshake, 
    title: t.about.values.trust.title, 
    desc: t.about.values.trust.desc 
  },
  { 
    icon: FaShieldAlt, 
    title: t.about.values.security.title, 
    desc: t.about.values.security.desc 
  },
  { 
    icon: FaUserTie, 
    title: t.about.values.professionalism.title, 
    desc: t.about.values.professionalism.desc 
  },
  { 
    icon: FaHeart, 
    title: t.about.values.commitment.title, 
    desc: t.about.values.commitment.desc 
  },
];
```

---

### 3️⃣ services.jsx - Sections à traduire

#### Imports
```jsx
import { useTranslation } from '../../hooks/useTranslation';

// Dans le composant
const t = useTranslation();
```

#### Hero
```jsx
// AVANT
<div className="section-tag">Nos prestations</div>
<h1>Des solutions <span>visa</span> adaptées à vos besoins</h1>

// APRÈS
<div className="section-tag">{t.services.hero.tag}</div>
<h1>{t.services.hero.title} <span>{t.services.hero.titleAccent}</span> {t.services.hero.titleEnd}</h1>
```

#### Services Grid
```jsx
// Utiliser t.services.servicesGrid.tourism.title, .desc, .features...
```

---

### 4️⃣ contact.jsx - Sections à traduire

#### Imports
```jsx
import { useTranslation } from '../../hooks/useTranslation';

const t = useTranslation();
```

#### Contact Info
```jsx
// AVANT
const CONTACT_INFO = [
  { icon: FaPhone, title: "Téléphone", value: "06 53 27 72 03", ... },
  // ...
];

// APRÈS
const CONTACT_INFO = [
  { icon: FaPhone, title: t.contact.info.phone, value: "06 53 27 72 03", ... },
  { icon: FaWhatsapp, title: t.contact.info.whatsapp, value: "06 53 63 32 80", ... },
  { icon: FaEnvelope, title: t.contact.info.email, value: "info@dsoffice.ma", ... },
  { icon: FaInstagram, title: t.contact.info.instagram, value: "@ds.office.maroc", ... },
];
```

#### Form
```jsx
// AVANT
<h2>Envoyez-nous un message</h2>
<input placeholder="Nom complet" />

// APRÈS
<h2>{t.contact.form.title}</h2>
<input placeholder={t.contact.form.name} />
```

---

### 5️⃣ rendez-vous.jsx - Sections à traduire

#### Imports
```jsx
import { useTranslation } from '../../hooks/useTranslation';

const t = useTranslation();
```

#### Benefits
```jsx
// AVANT
const BENEFITS = [
  { icon: FaUserTie, title: "Consultation personnalisée", desc: "Un expert dédié..." },
  // ...
];

// APRÈS
const BENEFITS = [
  { 
    icon: FaUserTie, 
    title: t.appointment.benefits.consultation.title, 
    desc: t.appointment.benefits.consultation.desc 
  },
  { 
    icon: FaShieldAlt, 
    title: t.appointment.benefits.maximize.title, 
    desc: t.appointment.benefits.maximize.desc 
  },
  { 
    icon: FaFileAlt, 
    title: t.appointment.benefits.preparation.title, 
    desc: t.appointment.benefits.preparation.desc 
  },
  { 
    icon: FaClock, 
    title: t.appointment.benefits.time.title, 
    desc: t.appointment.benefits.time.desc 
  },
];
```

#### Visa Types
```jsx
// AVANT
const VISA_TYPES = [
  "Visa Tourisme", 
  "Visa Études & Langues", 
  // ...
];

// APRÈS
const VISA_TYPES = [
  t.appointment.form.visaTypes.tourism,
  t.appointment.form.visaTypes.studies,
  t.appointment.form.visaTypes.work,
  t.appointment.form.visaTypes.family,
  t.appointment.form.visaTypes.medical,
  t.appointment.form.visaTypes.saudi,
  t.appointment.form.visaTypes.china,
  t.appointment.form.visaTypes.other,
];
```

---

### 6️⃣ Footer.jsx - Sections à traduire

#### Imports
```jsx
import { useTranslation } from '../../hooks/useTranslation';

export default function Footer() {
  const t = useTranslation();
```

#### Quick Links
```jsx
// AVANT
const QUICK_LINKS = [
  { label: "Accueil", path: "/" },
  { label: "À propos", path: "/a-propos" },
  // ...
];

// APRÈS
const QUICK_LINKS = [
  { label: t.footer.navigation.home, path: "/" },
  { label: t.footer.navigation.about, path: "/a-propos" },
  { label: t.footer.navigation.services, path: "/services" },
  { label: t.footer.navigation.appointment, path: "/rendez-vous" },
  { label: t.footer.navigation.contact, path: "/contact" },
];
```

#### Services Links
```jsx
// AVANT
const SERVICES_LINKS = [
  "Visa Tourisme",
  "Visa Études & Langues",
  // ...
];

// APRÈS
const SERVICES_LINKS = [
  t.footer.services.tourism,
  t.footer.services.studies,
  t.footer.services.work,
  t.footer.services.family,
  t.footer.services.medical,
  t.footer.services.saudiChina,
];
```

---

## ⚡ Commandes Rapides

### Chercher tous les textes hardcodés
```bash
# Dans VS Code, utilisez Ctrl+Shift+F et cherchez :
"Agence Visa"
"Votre visa"
"DS Office vous accompagne"
"Prendre rendez-vous"
"Contactez-nous"
```

### Tester les traductions
1. Lancer le projet : `npm run dev`
2. Ouvrir le menu
3. Cliquer sur le sélecteur de langue (🌐)
4. Choisir FR / EN / AR
5. Vérifier que les textes changent

---

## ✅ Checklist Finale

- [ ] Accueil.jsx - Hero traduit
- [ ] Accueil.jsx - Stats traduites
- [ ] Accueil.jsx - Services traduits
- [ ] Accueil.jsx - Pays traduits
- [ ] a-propos.jsx - Hero traduit
- [ ] a-propos.jsx - Values traduites
- [ ] services.jsx - Services grid traduit
- [ ] services.jsx - Process traduit
- [ ] contact.jsx - Form traduit
- [ ] contact.jsx - Office info traduit
- [ ] rendez-vous.jsx - Benefits traduits
- [ ] rendez-vous.jsx - Form traduit
- [ ] Footer.jsx - Tous les liens traduits
- [ ] Tester FR ✅
- [ ] Tester EN ✅
- [ ] Tester AR ✅ (vérifier RTL)

---

## 🐛 Débogage

Si les traductions ne s'affichent pas :

1. Vérifier l'import du hook :
```jsx
import { useTranslation } from '../../hooks/useTranslation';
const t = useTranslation();
```

2. Vérifier que le LanguageProvider entoure bien l'App dans main.jsx

3. Console.log pour vérifier :
```jsx
console.log('Current translations:', t);
console.log('Home title:', t.home.hero.title);
```

4. Vérifier la clé exacte dans les fichiers fr.js / en.js / ar.js

---

**Bon courage ! 🚀**  
Le système est prêt, il ne reste plus qu'à remplacer les textes hardcodés par les traductions.
