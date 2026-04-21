import { createContext, useContext, useEffect, useState } from 'react';
import { getSiteContent, localeOptions, LOCALE_STORAGE_KEY } from '../data/siteContent';

const LocaleContext = createContext(null);

export function LocaleProvider({ children }) {
  const [locale, setLocale] = useState(() => {
    const storedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    return storedLocale || 'ka';
  });

  useEffect(() => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    document.documentElement.lang = locale === 'ka' ? 'ka-GE' : 'en-US';
  }, [locale]);

  const content = getSiteContent(locale);

  return (
    <LocaleContext.Provider
      value={{
        locale,
        setLocale,
        content,
        localeOptions
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error('useLocale must be used within LocaleProvider.');
  }

  return context;
}
