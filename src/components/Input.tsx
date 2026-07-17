import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Input({ label, className = '', ...props }: InputProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-muted mb-1">
        {label}
      </label>
      <input
        className={`w-full bg-white border border-border rounded px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent ${className}`}
        {...props}
      />
    </div>
  );
}

