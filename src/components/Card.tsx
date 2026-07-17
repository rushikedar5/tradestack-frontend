import type { ReactNode } from 'react';

export default function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-surface border border-border rounded-lg shadow-sm p-8 ${className}`}>
      {children}
    </div>
  );
}