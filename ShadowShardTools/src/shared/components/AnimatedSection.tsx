import React, { memo } from 'react';

interface AnimatedSectionProps {
  children: React.ReactNode;
  inView: boolean;
  delay?: number;
  className?: string;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = memo(({ children, inView, delay = 0, className = '' }) => (
  <div
    className={`transition-all duration-1000 transform ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}
    style={{ transitionDelay: `${delay}ms` }}
  >
    {children}
  </div>
));

export default AnimatedSection;