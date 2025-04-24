import { useState, useEffect, ReactElement } from 'react';
import { CarouselItem } from './CarouselItem';
import { CarouselControls } from './CarouselControls';

export interface CarouselProps<T> {
    items: T[];
    renderItem: (item: T, index: number) => ReactElement;
    title?: string;
}

export function Carousel<T>({ items, renderItem, title }: CarouselProps<T>) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchPosition, setTouchPosition] = useState<number | null>(null);

    const getModularIndex = (index: number) =>
        ((index % items.length) + items.length) % items.length;

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

    const selectSlide = (index: number) => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex(index);
        setTimeout(() => setIsAnimating(false), 500);
    };

    const dragOffset = isDragging && touchStart !== null && touchPosition !== null
        ? touchPosition - touchStart
        : 0;

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

    // Create array of visible indices: [prevPrev, prev, current, next, nextNext]
    const visibleIndices = [-2, -1, 0, 1, 2].map(offset =>
        getModularIndex(currentIndex + offset)
    );

    return (
        <div className="relative w-full py-12 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {title && <h2 className="text-2xl font-bold text-white text-center mb-8">{title}</h2>}

                <div
                    tabIndex={0}
                    aria-roledescription="carousel"
                    role="region"
                    aria-label={`${title || 'Items'} Carousel`}
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
                        {visibleIndices.map((itemIndex, positionIndex) => (
                            <CarouselItem
                                key={itemIndex}
                                index={positionIndex}
                                currentIndex={2} // Center is always 2 in our 5-item display
                                isDragging={isDragging}
                                dragOffset={dragOffset}
                            >
                                {renderItem(items[itemIndex], itemIndex)}
                            </CarouselItem>
                        ))}
                    </div>
                </div>

                <CarouselControls
                    items={items}
                    currentIndex={currentIndex}
                    isAnimating={isAnimating}
                    onPrev={prevSlide}
                    onNext={nextSlide}
                    onSelect={selectSlide}
                />
            </div>
        </div>
    );
}