import { useMemo } from 'react';
import { currencies } from '@/lib/currencies';

export function CurrencySelector() {
  const options = useMemo(() => currencies, []);

  return (
    <select className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium">
      {options.map((currency) => (
        <option key={currency.code} value={currency.code}>
          {currency.code} – {currency.name}
        </option>
      ))}
    </select>
  );
}
