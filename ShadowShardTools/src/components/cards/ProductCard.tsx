import { Card, CardProps } from './Card';

export interface Product {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    link: string;
}

export interface ProductCardProps extends Omit<CardProps, 'children'> {
    product: Product;
}

export function ProductCard({ product, className = '' }: ProductCardProps) {
    return (
        <Card className={className}>
            <div className="relative">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-42 object-cover"
                />
            </div>
            <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                    <h3 className={`font-bold 'text-lg'}`}>{product.name}</h3>
                    <a
                        href={product.link}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <button className="bg-blue-600 text-white py-2 px-4 rounded-md">View</button>
                    </a>
                </div>
                <p className="text-gray-600 text-sm line-clamp-2 mb-4">{product.description}</p>
            </div>
        </Card>
    );
}
