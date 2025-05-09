import React, { memo, useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

// Import the separate components
import AnimatedSection from '../shared/components/AnimatedSection';
import FilterableList from '../shared/components/FilterableList';
import GlowContainer from '../shared/components/GlowContainer';
import { Product } from '../shared/types';

interface ProductCardProps {
  product: Product;
  isVisible: boolean;
}

const ProductCard: React.FC<ProductCardProps> = memo(({ product, isVisible }) => {

  return (
    <div
      className={`transition-all duration-1000 transform h-full ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <GlowContainer>
        <div className="h-full bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col">
          <div className="relative aspect-[16/10] overflow-hidden border-b border-gray-800">
            <img src={product.image} alt={product.title} className="absolute inset-0 w-full h-full object-cover" />
            {product.tag && (
              <div className="absolute top-4 right-4 bg-gradient-to-r from-cyan-400 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-md shadow-lg">
                {product.tag}
              </div>
            )}
          </div>
          <div className="p-6 flex flex-col justify-between flex-1">
            <h3 className="text-2xl font-bold text-white mb-2">{product.title}</h3>
            <p className="text-gray-300 mb-6">{product.description}</p>

            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Key Features</h4>
            <ul className="text-gray-300 space-y-2 mb-6">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <svg
                    className="h-5 w-5 text-cyan-400 mt-1 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA at the bottom */}
            <div className="mt-auto">
              <a
                href={product.ctaLink}
                className="block w-full bg-green-700 text-white text-center py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-green-600/30 hover:bg-green-400 transition-all duration-300"
              >
                {product.ctaText}
              </a>
            </div>
          </div>
        </div>
      </GlowContainer>
    </div>
  );
});

// Custom category label formatter
const formatCategoryLabel = (category: string): string => {
  return category.charAt(0).toUpperCase() + category.slice(1).replace(/([A-Z])/g, ' $1').trim();
};

// Main component
const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const cta = useInView({ triggerOnce: false, threshold: 0.1 });

  // Fetch products data from JSON file
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // In a real application, you would use a path like '/data/products.json'
        const response = await fetch('/data/products.json');

        if (!response.ok) {
          throw new Error('Failed to fetch products data');
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        // Fallback to empty array if fetch fails
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Render function for FilterableList
  const renderProduct = (product: Product, isVisible: boolean) => {
    return <ProductCard product={product} isVisible={isVisible} />;
  };

  return (
    <div className='max-w-7xl mx-auto px-6 lg:px-8'>
      <FilterableList
        items={products}
        filterKey="categories"
        searchFields={['title', 'description', 'features']} // Now using searchFields properly
        renderItem={renderProduct}
        title="Products"
        subtitle="Powerful tools designed with developers and artists in mind. Designed to speed up your workflow and solve real problems."
        emptyMessage="No products match your current filters."
        loading={loading}
        showSearchInput={true}
        filterLabelFn={formatCategoryLabel}
      />

      {/* CTA Section with Neon Glow */}
      <AnimatedSection inView={cta.inView} delay={200}>
        <div className="mt-20 mb-12" ref={cta.ref}>
          <GlowContainer>
            <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 md:p-12 shadow-2xl overflow-hidden">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Need a custom solution?</h2>
              <p className="text-gray-300 mb-8 text-lg">
                If you need customized solutions that perfectly fit your business needs, don't hesitate to contact us.
              </p>
              <div className="flex flex-wrap gap-4">
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
  );
};

export default memo(Products);