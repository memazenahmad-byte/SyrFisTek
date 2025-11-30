const tabs = [
  { key: 'marketplace', label: 'السوق' },
  { key: 'auctions', label: 'المزادات' },
  { key: 'seller', label: 'لوحة البائع' },
  { key: 'admin', label: 'لوحة الإدارة' },
  { key: 'ai', label: 'تقييم الجودة' },
];

export function NavigationTabs() {
  return (
    <nav className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center gap-4 overflow-x-auto px-6 py-2 text-sm font-semibold">
        {tabs.map((tab) => (
          <span key={tab.key} className="rounded-md px-3 py-2 text-emerald-700 hover:bg-emerald-50">
            {tab.label}
          </span>
        ))}
      </div>
    </nav>
  );
}
