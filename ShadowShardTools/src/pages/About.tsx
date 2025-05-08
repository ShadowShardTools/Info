import React, { memo, ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';

// SVG icons as separate components
const Icons = {
  LinkedIn: memo(() => (
      <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
      >
          <title>LinkedIn</title>
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
  ))
};

// Type definitions
interface AnimatedSectionProps {
    children: ReactNode;
    inView: boolean;
    delay?: number;
    yOffset?: number;
    className?: string;
}

interface SocialLinkProps {
    href: string;
    label: string;
    icon: ReactNode;
}

// Extracted reusable components
const AnimatedSection: React.FC<AnimatedSectionProps> = memo(({
    children,
    inView,
    delay = 0,
    yOffset = 10,
    className = ''
}) => (
    <div
        className={`transition-all duration-1000 transform ${inView ? 'opacity-100 translate-y-0' : `opacity-0 translate-y-${yOffset}`
            } ${className}`}
        style={{ transitionDelay: `${delay}ms` }}
    >
        {children}
    </div>
));

const SocialLink: React.FC<SocialLinkProps> = memo(({ href, label, icon }) => (
    <a
        href={href}
        className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-700/40 transition-all duration-300"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
    >
        {icon}
    </a>
));

// Main component
const About: React.FC = () => {
    // Hooks with TypeScript
    const { ref: headerRef, inView: headerInView } = useInView({ triggerOnce: true });
    const { ref: brandRef, inView: brandInView } = useInView({ triggerOnce: true });
    const { ref: aboutRef, inView: aboutInView } = useInView({ triggerOnce: true });

    return (
        <div className="min-h-screen bg-gray-950 text-white py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <AnimatedSection inView={headerInView} yOffset={10} className="text-center mb-16">
                    <div ref={headerRef}>
                        <h1 className="text-5xl font-bold sm:text-6xl lg:text-7xl">
                            About <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">ShadowShardTools</span>
                        </h1>
                        <p className="mt-6 max-w-xl mx-auto text-xl text-gray-300">
                            Crafting next-generation tools for digital innovators
                        </p>
                    </div>
                </AnimatedSection>

                {/* Brand Section */}
                <AnimatedSection inView={brandInView} yOffset={10} className="bg-gray-900 border border-gray-700 rounded-2xl mb-12 overflow-hidden shadow-xl">
                    <div ref={brandRef}>
                        <div className="px-6 py-6 sm:px-8 border-b border-gray-800">
                            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">About Brand</h2>
                        </div>
                        <div className="px-6 py-8 sm:px-8">
                            <p className="text-gray-300 mb-6 text-lg">
                                ShadowShardTools was founded in 2021 with a clear purpose: to create specialized Unity tools that enhance rendering capabilities and streamline game development workflows
                            </p>
                            <p className="text-gray-300 mb-6 text-lg">
                                We specialize in developing custom rendering solutions that extend the capabilities of Unity. Each tool we release undergoes rigorous testing in real development environments to ensure it delivers both performance optimization and visual enhancement. We believe that technical tools should be both powerful and accessible, enabling developers of all skill levels to achieve professional-quality results.
                            </p>
                            <p className="text-gray-300 text-lg">
                            At ShadowShardTools, we're committed to supporting the Unity development community with specialized solutions that solve specific technical challenges in rendering and asset optimization.
                            </p>
                        </div>
                    </div>
                </AnimatedSection>

                {/* About Me Section */}
                <AnimatedSection inView={aboutInView} yOffset={10} className="bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden shadow-xl">
                    <div ref={aboutRef}>
                        <div className="px-6 py-6 sm:px-8 border-b border-gray-800">
                            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">About Me</h2>
                        </div>
                        <div className="px-6 py-8 sm:px-8">
                            <div className="flex flex-col md:flex-row items-center md:items-start">
                                <div className="mb-8 md:mb-0 md:mr-10">
                                    <div className="h-52 w-52 rounded-full overflow-hidden bg-gradient-to-r from-cyan-400 to-purple-600 flex items-center justify-center p-1">
                                        <div className="h-full w-full rounded-full overflow-hidden bg-gray-800 flex items-center justify-center">
                                            {/* Next/image would be better for production */}
                                            <img
                                                src="https://media.licdn.com/dms/image/v2/D4D03AQGtaXCMHUPV1A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1729126520010?e=1752105600&v=beta&t=9KOXPb8_vBiER-Dq6jOs4c-r6NJk9Xt5RhXnoZEyeAQ"
                                                alt="Valerii Deineka"
                                                className="h-full w-full object-cover"
                                                loading="lazy"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-white mb-1">Valerii Deineka</h3>
                                    <p className="text-cyan-400 mb-6">Founder & Lead Developer</p>
                                    <div className="text-gray-300 space-y-4">
                                        <p>
                                            With experience spanning both freelance and self-employed ventures, I've developed a range of specialized Unity tools that enhance rendering capabilities and workflow efficiency. My work at ShadowShardTools represents my commitment to creating high-quality development tools that solve real technical challenges.
                                        </p>
                                    </div>
                                    <div className="mt-8 flex space-x-5">
                                        <SocialLink
                                            href="https://www.linkedin.com/in/valerii-deineka"
                                            label="Contact with me in LinkedIn"
                                            icon={<Icons.LinkedIn />}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>
            </div>
        </div>
    );
};

export default memo(About);