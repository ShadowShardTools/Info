import { useState, useEffect } from 'react';
import { Carousel } from './carousel/Carousel';
import { ProductCard, Product } from './cards/ProductCard';

export default function ProductCarousel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        // Load the products.json file
        const response = await fetch('/Info/data/products.json');

        if (!response.ok) {
          throw new Error('Failed to fetch products data');
        }

        const data = await response.json();

        // Map the products.json structure to match the Product interface
        const mappedProducts = data.map((product: any) => ({
          id: parseInt(product.id),
          name: product.title,
          description: product.description,
          imageUrl: product.image,
          link: product.ctaLink,
        }));

        setProducts(mappedProducts);
        setIsLoading(false);
      } catch (err) {
        console.error('Error loading products:', err);
        setError('Failed to load products. Please try again later.');
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading products...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center h-64 flex items-center justify-center">{error}</div>;
  }

  return (
    <div className="my-8">
      <Carousel
        items={products}
        renderItem={(product) => <ProductCard product={product} />}
        title="Featured Products"
      />
    </div>
  );
}