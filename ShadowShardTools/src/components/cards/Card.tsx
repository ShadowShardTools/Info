import React from 'react';

export interface CardProps {
    children: React.ReactNode;
    className?: string;
}

export function Card({ children, className = '' }: CardProps) {
    return (
        <div
            className={`bg-gradient-to-b from-slate-800 to-slate-900 rounded-lg shadow-md overflow-hidden 
        transition-all duration-300 w-[22rem] h-[20rem]
        ${className}`}
        >
            {children}
        </div>
    );
}