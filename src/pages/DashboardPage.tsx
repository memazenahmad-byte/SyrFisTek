import { InfoCard } from '@/components/InfoCard';

export function DashboardPage() {
  return (
    <section className="grid gap-4">
      <h2 className="text-2xl font-bold text-emerald-900">لوحة البائع</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <InfoCard title="رفع منتج جديد" description="إرسال منتجات جديدة مع ربط الفترة المحاسبية" />
        <InfoCard title="عروض الأسعار" description="إدارة الطلبات والرد عليها" />
        <InfoCard title="الإحصائيات" description="مؤشرات الأداء والعمولات لكل شركة" />
      </div>
    </section>
  );
}
