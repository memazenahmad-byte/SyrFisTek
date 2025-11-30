import { InfoCard } from '@/components/InfoCard';

export function AIQualityPage() {
  return (
    <section className="grid gap-4">
      <h2 className="text-2xl font-bold text-emerald-900">وحدة تقييم الجودة بالذكاء الاصطناعي</h2>
      <InfoCard
        title="evaluateProductQuality"
        description="وظيفة backend تعيد درجة الجودة (0-100) مع تفسير وتسجيل في قاعدة البيانات"
      >
        <ul className="list-disc space-y-1 pl-4">
          <li>استدعاء تقييم آلي لكل منتج</li>
          <li>حفظ النتيجة في جدول quality_scores</li>
          <li>عرضها في لوحة البائع ولوحة الإدارة</li>
        </ul>
      </InfoCard>
    </section>
  );
}
