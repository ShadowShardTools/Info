import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface CarouselControlsProps {
    items: any[];
    currentIndex: number;
    isAnimating: boolean;
    onPrev: () => void;
    onNext: () => void;
    onSelect: (index: number) => void;
}

export function CarouselControls({
    items,
    currentIndex,
    isAnimating,
    onPrev,
    onNext,
    onSelect
}: CarouselControlsProps) {
    const getModularIndex = (index: number) =>
        ((index % items.length) + items.length) % items.length;

    return (
        <div className="flex justify-center items-center mt-8 space-x-6">
            <button
                onClick={onPrev}
                disabled={isAnimating}
                aria-label="Previous"
                className="bg-white p-3 rounded-full shadow-md text-gray-700 hover:text-blue-600 disabled:opacity-50"
            >
                <ChevronLeft size={24} />
            </button>

            <div className="flex items-center space-x-2">
                {items.map((_, index) => (
                    <button
                        key={index}
                        aria-label={`Go to slide ${index + 1}`}
                        aria-current={getModularIndex(currentIndex) === index ? 'true' : undefined}
                        onClick={() => !isAnimating && onSelect(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${getModularIndex(currentIndex) === index ? 'bg-blue-600 w-6' : 'bg-gray-300 w-2'
                            }`}
                    />
                ))}
            </div>

            <button
                onClick={onNext}
                disabled={isAnimating}
                aria-label="Next"
                className="bg-white p-3 rounded-full shadow-md text-gray-700 hover:text-blue-600 disabled:opacity-50"
            >
                <ChevronRight size={24} />
            </button>
        </div>
    );
}