import React from 'react';

export interface CarouselItemProps {
    children: React.ReactNode;
    index: number;
    currentIndex: number;
    isDragging: boolean;
    dragOffset: number;
}

export function CarouselItem({
    children,
    index,
    currentIndex,
    isDragging,
    dragOffset
}: CarouselItemProps) {
    // Calculate position and styling based on index
    const getModularIndex = (idx: number, total: number) =>
        ((idx % total) + total) % total;

    // Determine position relative to center (from -2 to +2)
    const calcPosition = () => {
        const center = getModularIndex(currentIndex, 5);
        const diff = getModularIndex(index - center + 2, 5) - 2;
        return diff;
    };

    const position = calcPosition();
    const isCenter = position === 0;

    // Define visual properties based on position
    const getItemProps = () => {
        // Position mapping from -2 to +2
        const positions = [
            { offset: -400, z: 1, o: 0.01, s: 0.5 },  // -2 (far left)
            { offset: -220, z: 2, o: 0.6, s: 0.8 },   // -1 (left)
            { offset: 0, z: 3, o: 1, s: 1 },          // 0 (center)
            { offset: 220, z: 2, o: 0.6, s: 0.8 },    // 1 (right)
            { offset: 400, z: 1, o: 0.01, s: 0.5 }    // 2 (far right)
        ];

        return positions[position + 2];
    };

    const { offset, z, o, s } = getItemProps();

    return (
        <div
            className="absolute top-1/2"
            style={{
                zIndex: z,
                opacity: o,
                transition: 'transform 600ms ease-in-out, opacity 600ms ease-in-out',
                transform: `
          translateY(-50%)
          translateX(${offset + (isDragging ? dragOffset * 0.4 : 0)}px)
          scale(${s})
        `,
            }}
        >
            {React.isValidElement(children) ? (React.cloneElement(children)) : (children)}
        </div>
    );
}