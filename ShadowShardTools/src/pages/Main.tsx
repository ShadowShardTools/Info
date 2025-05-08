import React, { memo, ReactNode } from 'react';
import { Link } from "react-router-dom";
import { useInView } from 'react-intersection-observer';
import { Splide, SplideTrack, SplideSlide, SplideProps } from '@splidejs/react-splide';
import AnimatedSection from '../shared/components/AnimatedSection';

interface ValueCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  isVisible: boolean;
}

interface ValueData {
  title: string;
  description: string;
  icon: ReactNode;
}

const ValueCard: React.FC<ValueCardProps> = memo(({ title, description, icon, isVisible }) => (
  <div
    className={`bg-gray-900 border border-gray-700 rounded-2xl p-8 shadow-xl transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}
  >
    {/* Improved icon centering with proper flex container */}
    <div className="flex items-center justify-center mx-auto h-16 w-16 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600 text-white mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3 text-center">{title}</h3>
    <p className="text-gray-300 text-center">{description}</p>
  </div>
));

// SVG icons as separate components with improved viewBox consistency
const Icons = {
  Quality: memo(() => (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
  )),

  Innovation: memo(() => (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </svg>
  )),

  Community: memo(() => (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  )),

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


function Main() {
  const heroTitle = useInView({ triggerOnce: true, threshold: 0.2 });
  const heroText = useInView({ triggerOnce: true, threshold: 0.2 });
  const buttons = useInView({ triggerOnce: true, threshold: 0.2 });
  const valuesSection = useInView({ triggerOnce: true, threshold: 0.1 });
  const productsHeader = useInView({ triggerOnce: true, threshold: 0.2 });
  const carousel = useInView({ triggerOnce: true, threshold: 0.1 });

  const cardRefs = [
    useInView({ triggerOnce: true, threshold: 0.1 }),
    useInView({ triggerOnce: true, threshold: 0.1 }),
    useInView({ triggerOnce: true, threshold: 0.1 }),
  ];

  const values: ValueData[] = [
    {
      title: 'Quality',
      description: 'We never compromise on quality. Every line of code and every user interaction is crafted with care.',
      icon: <Icons.Quality />,
    },
    {
      title: 'Innovation',
      description: 'We constantly push boundaries and explore new approaches to solving complex problems.',
      icon: <Icons.Innovation />,
    },
    {
      title: 'Community',
      description: 'We believe in giving back to the developer community and helping others grow and succeed.',
      icon: <Icons.Community />,
    },
  ];

  const splideOptions: SplideProps["options"] = {
    type: 'loop',
    autoplay: true,
    pauseOnHover: false,
    pauseOnFocus: false,
    interval: 5000,
    arrows: false,
    pagination: false,
    width: 1000,
  };
  return (
    <div className="min-h-screen py-64">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">

        {/* Hero Title */}
        <AnimatedSection inView={heroTitle.inView} delay={0} className="mb-6" >
          <h2 ref={heroTitle.ref} className="text-5xl font-bold sm:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
            Empowering Game Developers with Fast, Scalable Tools
          </h2>
        </AnimatedSection>

        {/* Hero Paragraph */}
        <AnimatedSection inView={heroText.inView} delay={150} className="mb-6 max-w-3xl mx-auto">
          <p ref={heroText.ref} className="text-xl md:text-2xl text-gray-300">
            Cutting-edge solutions for graphics improvements...
          </p>
        </AnimatedSection>

        {/* Buttons */}
        <AnimatedSection inView={buttons.inView} delay={300} className="mb-72">
          <div ref={buttons.ref} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products" className="group">
              <span className="block w-full border-2 border-cyan-500 text-white py-3 px-6 rounded-lg hover:bg-cyan-800 transition-all duration-300">
                Explore Products
              </span>
            </Link>
            <Link to="/projects" className="group">
              <span className="block w-full border-2 border-purple-500 text-white py-3 px-6 rounded-lg hover:bg-purple-800 transition-all duration-300">
                Explore Projects
              </span>
            </Link>
          </div>
        </AnimatedSection>

        {/* Values Section */}
        <AnimatedSection inView={valuesSection.inView} delay={0} className="w-full mb-72">
          <div ref={valuesSection.ref}>
            <h2 className="text-3xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, i) => (
                <div key={value.title} ref={cardRefs[i].ref} className="flex justify-center">
                  <ValueCard
                    title={value.title}
                    description={value.description}
                    icon={value.icon}
                    isVisible={cardRefs[i].inView}
                  />
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Products Showcase */}
        <AnimatedSection inView={productsHeader.inView} delay={0} className="mb-6">
          <h2 ref={productsHeader.ref} className="text-5xl font-bold sm:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
            Products showcase
          </h2>
        </AnimatedSection>

        <AnimatedSection inView={carousel.inView} delay={200}>
          <div className='flex justify-center' ref={carousel.ref}>
            <Splide options={splideOptions} hasTrack={false}>
              <SplideTrack>
                {[
                  "e0f00866-d0de-4b05-94bf-601b596601e7",
                  "3b3cf601-f6fd-47e3-a97f-40a707338246",
                  "f490e3a1-8a0d-46b9-ad0c-e5b032b8d2ab",
                  "d9989707-9be1-4268-ad75-eb9558d2d664",
                  "5603addc-9fc1-4446-9ead-c16046901b55",
                  "5791a23b-db89-46bd-8c0f-ac7cf3b378b3",
                  "4e87370a-1d98-4016-99a9-8b7e591279b3",
                ].map((id, idx) => (
                  <SplideSlide key={id}>
                    <img
                      src={`https://assetstorev1-prd-cdn.unity3d.com/package-screenshot/${id}.webp`}
                      alt={`Product ${idx + 1}`}
                      className="rounded-xl shadow-lg transition-opacity duration-1000 ease-in-out"
                    />
                  </SplideSlide>
                ))}
              </SplideTrack>
            </Splide>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}

export default Main;