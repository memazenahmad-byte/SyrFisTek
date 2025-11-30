import { ReactNode } from 'react';

interface InfoCardProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

export function InfoCard({ title, description, children }: InfoCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-emerald-800">{title}</h3>
          {description && <p className="text-sm text-slate-600">{description}</p>}
        </div>
      </div>
      {children && <div className="mt-3 text-sm text-slate-800">{children}</div>}
    </div>
  );
}
