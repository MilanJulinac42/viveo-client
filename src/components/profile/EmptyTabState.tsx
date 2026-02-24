/**
 * @fileoverview Reusable empty state for profile service tabs.
 * Displayed when a celebrity has no items in a specific category.
 */

interface EmptyTabStateProps {
  icon: string;
  title: string;
  description: string;
}

export default function EmptyTabState({ icon, title, description }: EmptyTabStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 px-6 py-16 text-center">
      <span className="text-5xl">{icon}</span>
      <h4 className="mt-4 text-lg font-semibold text-slate-700">{title}</h4>
      <p className="mt-2 max-w-xs text-sm text-slate-400">{description}</p>
    </div>
  );
}
