import { useMemo } from 'react';
import { supportedLanguages } from '@/lib/i18n';

interface LanguageSelectorProps {
  value: string;
  onChange: (lang: string) => void;
}

export function LanguageSelector({ value, onChange }: LanguageSelectorProps) {
  const languages = useMemo(() => supportedLanguages, []);

  return (
    <select
      className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.label}
        </option>
      ))}
    </select>
  );
}
