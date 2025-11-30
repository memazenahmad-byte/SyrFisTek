import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { supportedLanguages } from '@/lib/i18n';

interface LanguageContextValue {
  currentLanguage: string;
  switchLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<string>('ar');
  const value = useMemo(
    () => ({
      currentLanguage,
      switchLanguage: setCurrentLanguage,
    }),
    [currentLanguage],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}

export function resolveLanguageLabel(code: string) {
  return supportedLanguages.find((lang) => lang.code === code)?.label ?? code;
}
