import React, { memo, ReactNode } from 'react';
import { Link } from "react-router-dom";
import { useInView } from 'react-intersection-observer';
import { Splide, SplideTrack, SplideSlide, SplideProps } from '@splidejs/react-splide';
import AnimatedSection from '../shared/components/AnimatedSection';
import Icons from '../shared/Icons';
import GlowContainer from '../shared/components/GlowContainer';

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
    className={`bg-gray-900 border border-gray-700 rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl transition-all duration-1000 transform ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
    }`}
  >
    <div className="flex items-center justify-center mx-auto h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600 text-white mb-2 sm:mb-5 md:mb-6">
      {icon}
    </div>
    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-center">{title}</h3>
    <p className="text-gray-300 text-sm sm:text-base text-center">{description}</p>
  </div>
));

function Main() {
  const heroTitle = useInView({ triggerOnce: false, threshold: 0.2 });
  const heroText = useInView({ triggerOnce: false, threshold: 0.2 });
  const buttons = useInView({ triggerOnce: false, threshold: 0.2 });
  const valuesHeader = useInView({ triggerOnce: false, threshold: 0.2 });
  const valuesSection = useInView({ triggerOnce: false, threshold: 0.1 });
  const productsHeader = useInView({ triggerOnce: false, threshold: 0.2 });
  const carousel = useInView({ triggerOnce: false, threshold: 0.1 });
  const additionalSection = useInView({ triggerOnce: false, threshold: 0.1 });

  const cardRefs = [
    useInView({ triggerOnce: false, threshold: 0.1 }),
    useInView({ triggerOnce: false, threshold: 0.1 }),
    useInView({ triggerOnce: false, threshold: 0.1 }),
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
    interval: 3000,
    arrows: false,
    pagination: false,
    width: 1000,
  };
  return (
    <Splide
      options={{
        type: 'slide',
        speed: 1500,
        perPage: 1,
        perMove: 1,
        flickMaxPages: 1,
        direction: 'ttb',        // top-to-bottom
        height: 'calc(100vh - 4rem)',
        arrows: false,
        pagination: true,
        wheel: true,
        wheelSleep: 500,             // enable mouse wheel scroll
        drag: false,
        snap: false,
      }}
      className="main-carousel"
      aria-label="Full page vertical carousel"
    >
      {/* Hero Slide */}
      <SplideSlide>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col justify-center items-center text-center"  style={{ minHeight: 'calc(100vh - 4rem)' }}>
          <AnimatedSection inView={heroTitle.inView} delay={0}>
            <h2 ref={heroTitle.ref} className="text-5xl font-bold sm:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600 mb-6">
              Empowering Game Developers with Fast, Scalable Tools
            </h2>
          </AnimatedSection>
          <AnimatedSection inView={heroText.inView} delay={150}>
            <p ref={heroText.ref} className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-6 leading-relaxed">
              Cutting-edge solutions for graphics improvements, performance optimization, and seamless development workflows.
            </p>
          </AnimatedSection>
          <AnimatedSection inView={buttons.inView} delay={300}>
            <div ref={buttons.ref} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products" className="group">
                <span className="block w-full border-2 border-cyan-500 text-white py-3 px-6 rounded-lg hover:bg-cyan-600 transition-all duration-300">
                  Explore Products
                </span>
              </Link>
              <Link to="/projects" className="group">
                <span className="block w-full border-2 border-purple-500 text-white py-3 px-6 rounded-lg hover:bg-purple-600 transition-all duration-300">
                  Explore Projects
                </span>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </SplideSlide>
  
      {/* Values Slide */}
      <SplideSlide>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col justify-center items-center text-center" style={{ minHeight: 'calc(100vh - 4rem)' }}>
          <AnimatedSection inView={valuesSection.inView} delay={0}>
            <div className='mt-[-50px] md:mt-[-25px]' ref={valuesSection.ref}>
              <AnimatedSection inView={valuesHeader.inView} delay={0} className="mb-2 md:mb-8">
                <h2 ref={valuesHeader.ref} className="text-5xl font-bold sm:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
                  Our Values
                </h2>
              </AnimatedSection>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
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
        </div>
      </SplideSlide>
  
      {/* Products Slide */}
      <SplideSlide>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col justify-center items-center text-center" style={{ minHeight: 'calc(100vh - 4rem)' }}>
          <AnimatedSection inView={productsHeader.inView} delay={0} className="mb-6">
            <h2 ref={productsHeader.ref} className="text-5xl font-bold sm:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600 mt-[-40px]">
              Products Showcase
            </h2>
          </AnimatedSection>
          <AnimatedSection inView={carousel.inView} delay={200}>
            <div ref={carousel.ref}>
              <Splide options={splideOptions} hasTrack={false}>
                <SplideTrack>
                  {[
                    "b9931bbc-defb-4d0d-b539-93603dadab26",
                    "c6514417-ab06-4cab-be3e-6de539b5acca",
                    "63e0fd93-230f-43f8-a4b6-eaccf461ce9c",
                    "a1990466-844f-49ea-a239-4e9cc5104b78",
                  ].map((id, idx) => (
                    <SplideSlide key={id}>
                      <img
                        src={`https://assetstorev1-prd-cdn.unity3d.com/key-image/${id}.webp`}
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
      </SplideSlide>
  
      {/* Additional Info*/}
      <SplideSlide>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col justify-center items-center text-center" style={{ minHeight: 'calc(100vh - 4rem)' }}>
          <AnimatedSection inView={additionalSection.inView} delay={0}>
            <div ref={additionalSection.ref}>
              <GlowContainer>
                <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 md:p-12 shadow-2xl overflow-hidden">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Need a custom solution?</h2>
                  <p className="text-gray-300 mb-8 text-lg">
                    If you need customized solutions that perfectly fit your business needs, don't hesitate to contact us.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Link
                      to="/contact"
                      className="block bg-transparent border-2 border-sky-400 text-white text-center py-3 px-6 rounded-lg font-medium hover:shadow-lg hover:shadow-sky-600/30 hover:bg-sky-700 transition-all duration-300"
                    >
                      Contact Us
                    </Link>
                  </div>
                </div>
              </GlowContainer>
            </div>
          </AnimatedSection>
        </div>
      </SplideSlide>
    </Splide>
  );  
}

export default Main;