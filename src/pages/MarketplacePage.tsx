import { InfoCard } from '@/components/InfoCard';

export function MarketplacePage() {
  return (
    <section className="grid gap-4">
      <h2 className="text-2xl font-bold text-emerald-900">السوق الرئيسية</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <InfoCard title="المنتجات المميزة" description="عرض سريع لأهم المنتجات الزراعية" />
        <InfoCard
          title="المزادات النشطة"
          description="المزادات الجارية مع إمكانية المزايدة المباشرة"
        />
      </div>
      <InfoCard title="مقارنة الأسعار" description="مقارنة لحظية بين العروض والعملات" />
    </section>
  );
}
