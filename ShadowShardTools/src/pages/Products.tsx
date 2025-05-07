import React, { memo, useState, useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

// Type definitions
interface Product {
    id: string;
    title: string;
    description: string;
    features: string[];
    image: string;
    ctaText: string;
    ctaLink: string;
    tag?: string;
    categories: string[];
    highlight?: boolean;
}

interface AnimatedSectionProps {
    children: React.ReactNode;
    inView: boolean;
    delay?: number;
    className?: string;
}

interface TabButtonProps {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
}

interface ProductCardProps {
    product: Product;
    isVisible: boolean;
}

// Categories will be dynamically generated from products data

// Reusable components
const AnimatedSection: React.FC<AnimatedSectionProps> = memo(({ children, inView, delay = 0, className = '' }) => (
    <div
        className={`transition-all duration-1000 transform ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            } ${className}`}
        style={{ transitionDelay: `${delay}ms` }}
    >
        {children}
    </div>
));

const TabButton: React.FC<TabButtonProps> = memo(({ active, onClick, children }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${active
            ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg'
            : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
            }`}
    >
        {children}
    </button>
));

const ProductCard: React.FC<ProductCardProps> = memo(({ product, isVisible }) => {
    return (
        <div
            className={`relative transition-all duration-1000 transform group h-full ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >

            {/* Neon glow effect matching CTA section */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-2xl blur-xl opacity-10 group-hover:opacity-70 transition-opacity duration-500"></div>

            <div className="h-full bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden shadow-xl relative z-10 hover:scale-[1.02] transition-all duration-300 flex flex-col">
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
                    <div className="mt-auto relative group">
                        <a
                            href={product.ctaLink}
                            className="relative z-10 block w-full bg-green-700 text-white text-center py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-green-600/30 hover:bg-green-400 transition-all duration-300"
                        >
                            {product.ctaText}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
});


// Custom hook for dynamic refs
const useProductInViews = (count: number) => {
    return Array.from({ length: count }, () => useInView({ triggerOnce: true, threshold: 0.1 }));
};

// Main component
const Products: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [loading, setLoading] = useState<boolean>(true);
    const [categories, setCategories] = useState<{ id: string, label: string }[]>([
        { id: 'all', label: 'All Products' }
    ]);

    const { ref: headerRef, inView: headerInView } = useInView({ triggerOnce: true });
    const { ref: tabsRef, inView: tabsInView } = useInView({ triggerOnce: true });

    // Product card refs
    const productRefs = useProductInViews(12); // Use a reasonable maximum

    // Fetch products data from JSON file
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // In a real application, you would use a path like '/data/products.json'
                const response = await fetch('/Info/data/products.json');

                if (!response.ok) {
                    throw new Error('Failed to fetch products data');
                }

                const data = await response.json();
                setProducts(data);

                // Extract unique categories from products data
                const uniqueCategories = new Set<string>();
                data.forEach((product: Product) => {
                    product.categories.forEach(category => uniqueCategories.add(category));
                });

                // Create category objects
                const categoryObjects = Array.from(uniqueCategories).sort().map(category => ({
                    id: category,
                    label: category.charAt(0).toUpperCase() + category.slice(1).replace(/([A-Z])/g, ' $1').trim()
                }));

                // Add "All Products" at the beginning
                setCategories([
                    { id: 'all', label: 'All Products' },
                    ...categoryObjects
                ]);
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

    // Filter products by category
    const filteredProducts = useMemo(() => {
        return activeCategory === 'all'
            ? products
            : products.filter(product => product.categories.includes(activeCategory));
    }, [products, activeCategory]);

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <AnimatedSection inView={headerInView} className="text-center mb-12">
                    <div ref={headerRef}>
                        <h1 className="text-5xl font-bold sm:text-6xl lg:text-7xl">
                            Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">Products</span>
                        </h1>
                        <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-300">
                            Powerful tools designed with developers and artists in mind. Designed to speed up your workflow and solve real problems.
                        </p>
                    </div>
                </AnimatedSection>

                {/* Category Tabs */}
                <AnimatedSection inView={tabsInView} className="mb-12">
                    <div ref={tabsRef} className="flex flex-wrap justify-center gap-4">
                        {categories.map(category => (
                            <TabButton
                                key={category.id}
                                active={activeCategory === category.id}
                                onClick={() => setActiveCategory(category.id)}
                            >
                                {category.label}
                            </TabButton>
                        ))}
                    </div>
                </AnimatedSection>

                {/* Products Grid */}
                {products.length === 0 ? (
                    <AnimatedSection inView={true} delay={300}>
                        <div className="relative group mx-auto max-w-2xl">
                            {/* Neon glow background */}
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-2xl blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-500"></div>

                            {/* Foreground content */}
                            <div className="relative bg-gray-900 rounded-2xl p-8 md:p-12 shadow-2xl overflow-hidden z-10 text-center">
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Coming Soon</h2>
                                <p className="text-gray-300 mb-8 text-lg">
                                    We're working on exciting new products. Check back soon for updates!
                                </p>
                                <div className="w-24 h-24 mx-auto">
                                    <svg className="animate-spin text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </AnimatedSection>
                ) : filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                        {filteredProducts.map((product, index) => {
                            const { ref, inView } = productRefs[index % productRefs.length];
                            return (
                                <div key={product.id} ref={ref}>
                                    <ProductCard
                                        product={product}
                                        isVisible={inView}
                                    />
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <AnimatedSection inView={true} delay={300}>
                        <div className="text-center py-12">
                            <p className="text-gray-300 text-xl">No products in this category.</p>
                            <button
                                onClick={() => setActiveCategory('all')}
                                className="mt-4 px-6 py-2 bg-slate-700 rounded-xl shadow-lg text-white hover:bg-slate-600 transition-all duration-300"
                            >
                                Show All Products
                            </button>
                        </div>
                    </AnimatedSection>
                )}

                {/* CTA Section with Neon Glow */}
                <div className="mt-20 relative group">
                    {/* Neon glow background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-2xl blur-xl opacity-10 group-hover:opacity-70 transition-opacity duration-500"></div>

                    {/* Foreground content */}
                    <div className="relative bg-gray-900 border border-gray-700 rounded-2xl p-8 md:p-12 shadow-2xl overflow-hidden z-10">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Need a custom solution?</h2>
                        <p className="text-gray-300 mb-8 text-lg">
                            If you need customized solutions that perfectly fit your business needs, don't hesitate to contact us.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                to="/contact"
                                className="relative group"
                            >
                                <span className="relative z-10 block w-full bg-sky-700 text-white text-center py-3 px-6 rounded-lg font-medium hover:shadow-lg hover:shadow-sky-600/30 hover:bg-sky-400 transition-all duration-300">
                                    Contact Us
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default memo(Products);