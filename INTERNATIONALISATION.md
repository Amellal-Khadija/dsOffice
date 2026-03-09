# 🌐 Système d'Internationalisation (i18n) - DS Office

## Vue d'ensemble

Le site DS Office supporte maintenant **3 langues** :
- 🇫🇷 **Français** (par défaut)
- 🇬🇧 **Anglais**
- 🇸🇦 **Arabe** (RTL supporté)

## Architecture

```
src/
├── context/
│   └── LanguageContext.jsx      # Context pour la gestion de la langue
├── translations/
│   ├── index.js                 # Export central des traductions
│   ├── fr.js                    # Traductions françaises
│   ├── en.js                    # Traductions anglaises
│   └── ar.js                    # Traductions arabes
├── hooks/
│   └── useTranslation.js        # Hook personnalisé pour accéder aux traductions
└── components/
    └── appel-component/
        └── Menu.jsx             # Menu avec sélecteur de langue
```

## Fonctionnalités

### ✅ Implémenté

1. **Context API** pour la gestion globale de la langue
2. **Persistance** via localStorage (la langue sélectionnée reste après refresh)
3. **Support RTL** automatique pour l'arabe (direction: rtl)
4. **Sélecteur de langue** dans le menu (desktop et mobile)
5. **Traductions complètes** pour toutes les pagesPIECES OF DATA
6. **Hook personnalisé** `useTranslation()` pour faciliter l'usage

### 🔄 Direction RTL (Right-to-Left)

Quand l'utilisateur choisit l'arabe, le site bascule automatiquement en mode RTL :
- `document.documentElement.setAttribute('dir', 'rtl')`
- `document.documentElement.setAttribute('lang', 'ar')`

## Utilisation

### Dans un composant fonctionnel

```jsx
import { useTranslation } from '../hooks/useTranslation';

function MyComponent() {
  const t = useTranslation();
  
  return (
    <div>
      <h1>{t.home.hero.title}</h1>
      <p>{t.home.hero.description}</p>
      <button>{t.common.getStarted}</button>
    </div>
  );
}
```

### Changer la langue programmatiquement

```jsx
import { useLanguage } from '../context/LanguageContext';

function LanguageSwitcher() {
  const { language, changeLanguage } = useLanguage();
  
  return (
    <div>
      <button onClick={() => changeLanguage('fr')}>Français</button>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('ar')}>العربية</button>
      <p>Current: {language}</p>
    </div>
  );
}
```

## Structure des traductions

Chaque fichier de traduction (fr.js, en.js, ar.js) contient une structure identique :

```javascript
{
  nav: {
    home: "Accueil",
    about: "À propos",
    services: "Services",
    // ...
  },
  common: {
    learnMore: "En savoir plus",
    contactUs: "Nous contacter",
    // ...
  },
  home: {
    hero: {
      title: "Votre visa,",
      description: "..."
    },
    stats: { /* ... */ },
    services: { /* ... */ }
  },
  about: { /* ... */ },
  services: { /* ... */ },
  contact: { /* ... */ },
  appointment: { /* ... */ },
  footer: { /* ... */ }
}
```

## Prochaines étapes - À implémenter

### 1. Mettre à jour Accueil.jsx

```jsx
import { useTranslation } from '../../hooks/useTranslation';

export default function Accueil() {
  const t = useTranslation();
  
  return (
    <div>
      <h1>{t.home.hero.title} <span>{t.home.hero.titleAccent}</span></h1>
      <p>{t.home.hero.description}</p>
      {/* ... */}
    </div>
  );
}
```

### 2. Mettre à jour a-propos.jsx

```jsx
import { useTranslation } from '../../hooks/useTranslation';

export default function APropos() {
  const t = useTranslation();
  
  const VALUES = [
    { icon: FaHandshake, title: t.about.values.trust.title, desc: t.about.values.trust.desc },
    { icon: FaShieldAlt, title: t.about.values.security.title, desc: t.about.values.security.desc },
    // ...
  ];
  
  return (
    <div>
      <h1>{t.about.hero.title} <span>{t.about.hero.titleAccent}</span></h1>
      {/* ... */}
    </div>
  );
}
```

### 3. Mettre à jour services.jsx

```jsx
import { useTranslation } from '../../hooks/useTranslation';

export default function Services() {
  const t = useTranslation();
  
  return (
    <div>
      <h1>{t.services.hero.title} <span>{t.services.hero.titleAccent}</span></h1>
      {/* ... */}
    </div>
  );
}
```

### 4. Mettre à jour contact.jsx

```jsx
import { useTranslation } from '../../hooks/useTranslation';

export default function Contact() {
  const t = useTranslation();
  
  return (
    <div>
      <h1>{t.contact.hero.title} <span>{t.contact.hero.titleAccent}</span></h1>
      {/* ... */}
    </div>
  );
}
```

### 5. Mettre à jour rendez-vous.jsx

```jsx
import { useTranslation } from '../../hooks/useTranslation';

export default function Rendezvous() {
  const t = useTranslation();
  
  return (
    <div>
      <h1>{t.appointment.hero.title} <span>{t.appointment.hero.titleAccent}</span></h1>
      {/* ... */}
    </div>
  );
}
```

### 6. Mettre à jour Footer.jsx

```jsx
import { useTranslation } from '../../hooks/useTranslation';

export default function Footer() {
  const t = useTranslation();
  
  return (
    <footer>
      <h2>{t.footer.cta.title}</h2>
      {/* ... */}
    </footer>
  );
}
```

## Ajouter une nouvelle traduction

### 1. Ajouter la clé dans fr.js

```javascript
export const fr = {
  // ...
  newSection: {
    title: "Nouveau titre",
    description: "Nouvelle description"
  }
};
```

### 2. Ajouter la même clé dans en.js

```javascript
export const en = {
  // ...
  newSection: {
    title: "New title",
    description: "New description"
  }
};
```

### 3. Ajouter la même clé dans ar.js

```javascript
export const ar = {
  // ...
  newSection: {
    title: "عنوان جديد",
    description: "وصف جديد"
  }
};
```

### 4. Utiliser dans un composant

```jsx
const t = useTranslation();
<h2>{t.newSection.title}</h2>
<p>{t.newSection.description}</p>
```

## Bonnes pratiques

1. **Toujours utiliser le hook `useTranslation()`** au lieu d'accéder directement aux fichiers de traduction
2. **Maintenir la même structure** dans tous les fichiers de traduction (fr, en, ar)
3. **Tester chaque langue** après avoir ajouté une nouvelle traduction
4. **Vérifier le RTL** pour l'arabe (alignements, marges, etc.)
5. **Utiliser des clés descriptives** : `home.hero.title` plutôt que `h1` ou `title1`

## Support RTL CSS

Pour le mode arabe (RTL), certains styles CSS peuvent nécessiter des ajustements :

```css
/* Exemple : ajuster les marges en mode RTL */
.my-element {
  margin-left: 20px;
}

[dir="rtl"] .my-element {
  margin-left: 0;
  margin-right: 20px;
}
```

Ou utiliser les propriétés logiques CSS :

```css
.my-element {
  margin-inline-start: 20px; /* devient margin-right en RTL */
}
```

## Débogage

Pour vérifier la langue actuelle :

```jsx
import { useLanguage } from '../context/LanguageContext';

const { language } = useLanguage();
console.log('Current language:', language); // 'fr', 'en', ou 'ar'
```

Pour vérifier si les traductions sont chargées :

```jsx
const t = useTranslation();
console.log('Translations:', t);
```

## Notes importantes

- ⚠️ **Ne jamais hardcoder du texte** directement dans les composants
- ⚠️ **Toujours passer par les fichiers de traduction**
- ⚠️ **Tester les 3 langues** avant de déployer
- ✅ **Le menu est déjà traduit** et fonctionnel
- ✅ **Toutes les traductions sont prêtes** dans les fichiers fr.js, en.js, ar.js
- 🔄 **Il reste à intégrer** les traductions dans les 6 pages principales

---

**Créé le:** ${new Date().toLocaleDateString('fr-FR')}
**Version:** 1.0
**Status:** ✅ Infrastructure complète - 🔄 Intégration en cours
