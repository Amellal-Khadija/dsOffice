import { useLanguage } from '../context/LanguageContext';
import { getTranslation } from '../translations';

/**
 * Custom hook to access translations easily in any component
 * @returns {Object} Translation object for the current language
 * 
 * Usage example:
 * ```jsx
 * import { useTranslation } from '../hooks/useTranslation';
 * 
 * function MyComponent() {
 *   const t = useTranslation();
 *   return <h1>{t.home.hero.title}</h1>;
 * }
 * ```
 */
export const useTranslation = () => {
  const { language } = useLanguage();
  return getTranslation(language);
};
