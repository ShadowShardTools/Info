import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  imageUrl: string;
}

interface ProductCardProps {
  product: Product;
  isFeatured?: boolean;
}

function ProductCard({ product, isFeatured = false }: ProductCardProps) {
  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 
        ${isFeatured ? 'w-full max-w-md' : 'w-full max-w-xs'}`}
    >
      <div className="relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        {isFeatured && (
          <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
            Featured
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className={`font-bold ${isFeatured ? 'text-xl' : 'text-lg'}`}>{product.name}</h3>
          <span className="text-blue-600 font-medium text-lg">{product.price}</span>
        </div>
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">{product.description}</p>
        {isFeatured && (
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
            View Details
          </button>
        )}
      </div>
    </div>
  );
}

export default function InfiniteCarousel() {
  const products: Product[] = [
    { id: 1, name: "3D Character Pack", price: "$24.99", description: "High-quality 3D character models for your game projects", imageUrl: "/api/placeholder/500/300" },
    { id: 2, name: "Fantasy Environment", price: "$39.99", description: "Complete environment set with trees, rocks, and structures", imageUrl: "/api/placeholder/500/300" },
    { id: 3, name: "UI Elements Kit", price: "$19.99", description: "Modern UI components for game interfaces", imageUrl: "/api/placeholder/500/300" },
    { id: 4, name: "Particle Effects Pack", price: "$14.99", description: "Ready-to-use particle effects for various scenarios", imageUrl: "/api/placeholder/500/300" },
    { id: 5, name: "Game Music Bundle", price: "$29.99", description: "Collection of atmospheric tracks for different game moods", imageUrl: "/api/placeholder/500/300" },
    { id: 6, name: "Weapon Models Pack", price: "$34.99", description: "Detailed 3D models of fantasy and sci-fi weapons", imageUrl: "/api/placeholder/500/300" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchPosition, setTouchPosition] = useState<number | null>(null);

  const getModularIndex = (index: number) =>
    ((index % products.length) + products.length) % products.length;

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(prev => prev + 1);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(prev => prev - 1);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
    setTouchPosition(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchPosition(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart === null || touchPosition === null) return;
    const diff = touchStart - touchPosition;
    if (Math.abs(diff) > 50) diff > 0 ? nextSlide() : prevSlide();
    setTouchStart(null);
    setTouchPosition(null);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setTouchStart(e.clientX);
    setTouchPosition(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setTouchPosition(e.clientX);
  };

  const handleMouseUp = () => {
    if (!isDragging || touchStart === null || touchPosition === null) return;
    const diff = touchStart - touchPosition;
    if (Math.abs(diff) > 50) diff > 0 ? nextSlide() : prevSlide();
    setIsDragging(false);
    setTouchStart(null);
    setTouchPosition(null);
  };

  const dragOffset = isDragging && touchStart !== null && touchPosition !== null
    ? touchPosition - touchStart
    : 0;

  const prevIndex = getModularIndex(currentIndex - 1);
  const centerIndex = getModularIndex(currentIndex);
  const nextIndex = getModularIndex(currentIndex + 1);
  const prevPrevIndex = getModularIndex(currentIndex - 2);
  const nextNextIndex = getModularIndex(currentIndex + 2);

  useEffect(() => {
    document.body.style.userSelect = isDragging ? 'none' : '';
    return () => { document.body.style.userSelect = ''; };
  }, [isDragging]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (isAnimating) return;
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isAnimating]);

  return (
    <div className="relative w-full py-12 overflow-hidden bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Featured Products</h2>

        <div
          tabIndex={0}
          aria-roledescription="carousel"
          role="region"
          aria-label="Featured Products Carousel"
          className="relative h-96 mx-auto cursor-grab outline-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div className="relative h-full flex justify-center items-center">
            {[ 
              { i: prevPrevIndex, offset: -400, z: 1, o: 0.2, s: 0.5 },
              { i: prevIndex, offset: -220, z: 2, o: 0.6, s: 0.8 },
              { i: centerIndex, offset: 0, z: 3, o: 1, s: 1, center: true },
              { i: nextIndex, offset: 220, z: 2, o: 0.6, s: 0.8 },
              { i: nextNextIndex, offset: 400, z: 1, o: 0.2, s: 0.5 }
            ].map(({ i, offset, z, o, s, center }) => (
              <div
                key={i}
                className="absolute top-1/2 transition-all duration-800 ease-out"
                style={{
                  zIndex: z,
                  opacity: o,
                  transform: `
                    translateY(-50%) 
                    translateX(${offset + (isDragging ? dragOffset * 0.4 : 0)}px)
                    scale(${s})
                  `
                }}
              >
                <ProductCard product={products[i]} isFeatured={center} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center items-center mt-8 space-x-6">
          <button
            onClick={prevSlide}
            disabled={isAnimating}
            aria-label="Previous"
            className="bg-white p-3 rounded-full shadow-md text-gray-700 hover:text-blue-600 disabled:opacity-50"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="flex items-center space-x-2">
            {products.map((_, index) => (
              <button
                key={index}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={getModularIndex(currentIndex) === index ? 'true' : undefined}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true);
                    setCurrentIndex(index);
                    setTimeout(() => setIsAnimating(false), 500);
                  }
                }}
                className={`h-2 rounded-full transition-all duration-300 ${getModularIndex(currentIndex) === index ? 'bg-blue-600 w-6' : 'bg-gray-300 w-2'}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            disabled={isAnimating}
            aria-label="Next"
            className="bg-white p-3 rounded-full shadow-md text-gray-700 hover:text-blue-600 disabled:opacity-50"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}