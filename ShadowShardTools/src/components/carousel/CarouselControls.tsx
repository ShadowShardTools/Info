import { MoveLeft, MoveRight } from 'lucide-react';

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
        <div className="flex justify-center items-center space-x-8">
            <button
                onClick={onPrev}
                disabled={isAnimating}
                aria-label="Previous"
                className="bg-slate-700 px-5 py-2 rounded-xl shadow-lg text-white hover:bg-slate-400 active:scale-95 transition-all duration-200 disabled:opacity-40"
            >
                <MoveLeft size={24} />
            </button>

            <div className="flex items-center space-x-2">
                {items.map((_, index) => {
                    const isActive = getModularIndex(currentIndex) === index;
                    return (
                        <button
                            key={index}
                            onClick={() => onSelect(index)}
                            aria-label={`Go to slide ${index + 1}`}
                            aria-current={isActive ? 'true' : undefined}
                            className={`h-2 rounded-full transition-all duration-300 ease-in-out
                                ${isActive ? 'bg-slate-400 w-6' : 'bg-gray-700 w-2'}
                            `}
                        />
                    );
                })}
            </div>

            <button
                onClick={onNext}
                disabled={isAnimating}
                aria-label="Next"
                className="bg-slate-700 px-5 py-2 rounded-xl shadow-lg text-white hover:bg-slate-400 active:scale-95 transition-all duration-200 disabled:opacity-40"
            >
                <MoveRight size={24} />
            </button>
        </div>
    );
}
