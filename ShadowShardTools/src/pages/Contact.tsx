import { useState, useEffect, memo } from 'react';
import Icons from '../shared/Icons';

interface SocialLink {
  id: string;
  href: string;
  hoverClass: string; // full `hover:bg-color` class
  shadowClass: string; // full `shadow-color` class
  icon: React.ReactElement;
  title: string;
}

// Memoized SocialIcon component for better performance
const SocialIcon = memo(({ 
  link, 
  isHovered, 
  onMouseEnter, 
  onMouseLeave 
}: { 
  link: SocialLink; 
  isHovered: boolean; 
  onMouseEnter: () => void; 
  onMouseLeave: () => void; 
}) => (
  <div className="text-center">
    <a 
      href={link.href}
      className={`inline-flex w-12 h-12 rounded-full bg-gray-800 items-center justify-center transition-all duration-300
        ${isHovered ? `shadow-lg ${link.shadowClass} scale-110` : ''} ${link.hoverClass}`}      
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-label={link.title}
    >
      <div className={`transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}>
        {link.icon}
      </div>
    </a>
    <h3 className="text-lg font-medium text-gray-300 mt-3 mb-2">{link.title}</h3>
    <div 
      className={`h-0.5 mx-auto bg-gradient-to-r from-gray-300 to-white transition-all duration-300
        ${isHovered ? 'w-16' : 'w-0'}`}
    ></div>
  </div>
));

// Social links data - moved outside component to prevent recreation on each render
const socialLinks: SocialLink[] = [
  {
    id: 'email',
    href: 'mailto:shadowshardtools@gmail.com',
    hoverClass: 'hover:bg-yellow-400',
    shadowClass: 'shadow-yellow-400/40',
    icon: <Icons.Email />,
    title: 'Email'
  },
  {
    id: 'discord',
    href: 'https://discord.gg/QyQACA5YvA',
    hoverClass: 'hover:bg-indigo-500',
    shadowClass: 'shadow-indigo-500/40',
    icon: <Icons.Discord />,
    title: 'Discord'
  },
  {
    id: 'linkedin',
    href: 'https://www.linkedin.com/company/shadowshardtools',
    hoverClass: 'hover:bg-blue-700',
    shadowClass: 'shadow-blue-700/40',
    icon: <Icons.LinkedIn />,
    title: 'LinkedIn'
  },
  {
    id: 'bluesky',
    href: 'https://bsky.app/profile/shadowshardtools.bsky.social',
    hoverClass: 'hover:bg-sky-500',
    shadowClass: 'shadow-sky-500/40',
    icon: <Icons.Bluesky />,
    title: 'Bluesky'
  },
  {
    id: 'reddit',
    href: 'https://www.reddit.com/user/shadowshardtools/',
    hoverClass: 'hover:bg-orange-500',
    shadowClass: 'shadow-orange-500/40',
    icon: <Icons.Reddit />,
    title: 'Reddit'
  },
  {
    id: 'artstation',
    href: 'https://www.artstation.com/valeriideineka',
    hoverClass: 'hover:bg-blue-500',
    shadowClass: 'shadow-blue-500/40',
    icon: <Icons.ArtStation />,
    title: 'ArtStation'
  }
];

const Contact = (): React.ReactElement => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  
  useEffect(() => {
    // Use RAF instead of setTimeout for smoother animation
    const animationFrame = requestAnimationFrame(() => {
      setIsVisible(true);
    });
    
    return () => cancelAnimationFrame(animationFrame);
  }, []);
  
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div 
            className={`text-center mb-12 transition-all duration-1000 ease-out transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h1 className="text-5xl font-bold sm:text-6xl lg:text-7xl mb-4 text-white">Contact Us</h1>
            <p className="text-lg text-gray-300">
              Have a question or want to work together?
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {socialLinks.map((link, index) => (
              <div 
                key={link.id}
                className={`transition-all duration-700 ease-out transform ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`} 
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <SocialIcon
                  link={link}
                  isHovered={hoveredIcon === link.id}
                  onMouseEnter={() => setHoveredIcon(link.id)}
                  onMouseLeave={() => setHoveredIcon(null)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;