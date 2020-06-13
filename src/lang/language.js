import I18n from 'react-native-i18n';
import en from './en';
import es from './es';

I18n.fallbacks = true;
I18n.missingBehaviour = 'guess';
I18n.defaultLocale = 'es';

I18n.translations = {
  es,
  en,
};

export const setLocale = locale => {
  I18n.locale = locale;
};

export function translate(name, params = {}) {
  return I18n.t(name, params);
}

export default I18n;
