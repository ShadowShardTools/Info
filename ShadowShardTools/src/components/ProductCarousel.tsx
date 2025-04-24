// components/ProductCarousel.tsx
import { Carousel } from './carousel/Carousel';
import { ProductCard, Product } from './cards/ProductCard';

export default function ProductCarousel() {
  // Sample data
  const products: Product[] = [
    { id: 1, name: "3D Character Pack", price: "$24.99", description: "High-quality 3D character models for your game projects", imageUrl: "/api/placeholder/500/300" },
    { id: 2, name: "Fantasy Environment", price: "$39.99", description: "Complete environment set with trees, rocks, and structures", imageUrl: "/api/placeholder/500/300" },
    { id: 3, name: "UI Elements Kit", price: "$19.99", description: "Modern UI components for game interfaces", imageUrl: "/api/placeholder/500/300" },
    { id: 4, name: "Particle Effects Pack", price: "$14.99", description: "Ready-to-use particle effects for various scenarios", imageUrl: "/api/placeholder/500/300" },
    { id: 5, name: "Game Music Bundle", price: "$29.99", description: "Collection of atmospheric tracks for different game moods", imageUrl: "/api/placeholder/500/300" },
    { id: 6, name: "Weapon Models Pack", price: "$34.99", description: "Detailed 3D models of fantasy and sci-fi weapons", imageUrl: "/api/placeholder/500/300" }
  ];

  return (
    <Carousel
      items={products}
      renderItem={(product) => <ProductCard product={product} />}
      title="Featured Products"
    />
  );
}