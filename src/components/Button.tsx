import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'danger';
}

export default function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
    const base = 'w-full font-semibold py-2.5 rounded-lg transition-colors';
    const variants = {
        primary: 'bg-accent text-white hover:bg-blue-600',
        danger: 'bg-loss text-white hover:bg-red-600',
    };

    return (
        <button className={`${base} ${variants[variant]} ${className}`} {...props}>
            {children}
        </button>
    );
}
