import React from 'react';

export interface CardProps {
    children: React.ReactNode;
    className?: string;
}

export function Card({ children, className = '' }: CardProps) {
    return (
        <div className={`bg-slate-900 border border-gray-700 rounded-lg shadow-md overflow-hidden transition-all duration-300 w-[22rem] h-[19rem] ${className}`}>
            {children}
        </div>
    );
}