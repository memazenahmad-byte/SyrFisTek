import { ReactNode } from 'react';
import { LanguageSelector } from './LanguageSelector';
import { CurrencySelector } from './CurrencySelector';
import { NavigationTabs } from './NavigationTabs';

interface MainLayoutProps {
  children: ReactNode;
  language: string;
  onLanguageChange: (lang: string) => void;
  userName?: string;
}

export function MainLayout({ children, language, onLanguageChange, userName }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-emerald-600" />
            <div>
              <p className="text-xs font-semibold uppercase text-emerald-700">SyrFisTek</p>
              <h1 className="text-xl font-bold">سيرفستك – منصة تجارة المنتجات الزراعية</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <CurrencySelector />
            <LanguageSelector value={language} onChange={onLanguageChange} />
            <div className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-800">
              {userName ?? 'زائر'}
            </div>
          </div>
        </div>
        <NavigationTabs />
      </header>
      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
    </div>
  );
}
