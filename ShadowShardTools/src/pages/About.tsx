import React, { memo, ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';
import Icons from '../shared/Icons';

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
        className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-700/40 transition-all duration-300"
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
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className='min-h-screen py-12'>
                {/* Header */}
                <AnimatedSection inView={headerInView} yOffset={10} className="text-center mb-16">
                    <div ref={headerRef}>
                        <h1 className="text-5xl font-bold sm:text-6xl lg:text-7xl">
                            About <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
                                <span className="inline sm:hidden">Shadow Shard Tools</span>
                                <span className="hidden sm:inline">ShadowShardTools</span>
                            </span>
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
                                    <div className="mt-4 flex space-x-5">
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