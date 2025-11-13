import React from 'react';

type Props = {
  label: string;
  valueText: string;
  percent?: number; // 0..100
  accent?: 'green' | 'rose' | 'sky' | 'slate';
  subtext?: string;
};

export default function CircleStat({
  label,
  valueText,
  percent = 100,
  accent = 'slate',
  subtext,
}: Props) {
  const size = 120;
  const stroke = 10;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, percent));
  const dash = (pct / 100) * c;

  const color =
    accent === 'green'
      ? 'stroke-green-500 text-green-700'
      : accent === 'rose'
      ? 'stroke-rose-500 text-rose-700'
      : accent === 'sky'
      ? 'stroke-sky-500 text-sky-700'
      : 'stroke-slate-500 text-slate-700';

  const bg =
    accent === 'green'
      ? 'bg-green-50'
      : accent === 'rose'
      ? 'bg-rose-50'
      : accent === 'sky'
      ? 'bg-sky-50'
      : 'bg-slate-50';

  return (
    <div className={`flex items-center gap-4 p-2 rounded-xl ${bg}`}>
      <svg width={size} height={size} className="shrink-0">
        <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
          <circle cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke} className="stroke-slate-200" fill="none" />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            strokeWidth={stroke}
            className={`${color}`}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${c - dash}`}
          />
        </g>
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="text-sm fill-slate-700">
          {Math.round(pct)}%
        </text>
      </svg>

      <div>
        <div className="text-xs text-slate-500">{label}</div>
        <div className={`text-xl font-semibold ${color.split(' ')[1]}`}>{valueText}</div>
        {subtext && <div className="mt-1 text-xs text-slate-500">{subtext}</div>}
      </div>
    </div>
  );
}
