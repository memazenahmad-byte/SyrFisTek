import { InfoCard } from '@/components/InfoCard';

export function AdminPanelPage() {
  return (
    <section className="grid gap-4">
      <h2 className="text-2xl font-bold text-emerald-900">لوحة الإدارة</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <InfoCard title="إدارة الشركات" description="تعدد الشركات والفترات المحاسبية" />
        <InfoCard title="الصلاحيات" description="نظام RBAC شجري وربط المستخدمين بالأدوار" />
        <InfoCard title="المحتوى" description="إدارة CMS متعدد اللغات وإضافة لغات جديدة" />
        <InfoCard title="إدارة الميزات" description="Feature Flags لمراحل المشروع الثلاث" />
      </div>
    </section>
  );
}
