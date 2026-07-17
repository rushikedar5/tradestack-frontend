interface FeatureBadgeProps {
  label: string;
  name: string;
  className?: string;
  color?: string;
}

export default function FeatureBadge({ label, name, className = '', color = 'text-accent' }: FeatureBadgeProps) {
  return (
    <div className={`bg-surface border border-border rounded-lg shadow-sm px-4 py-3 ${className}`}>
      <p className="text-xs text-text-muted mb-1">{label}</p>
      <p className={`font-bold text-lg ${color}`}>{name}</p>
    </div>
  );
}