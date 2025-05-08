// Common interface properties
interface BaseItem {
    id: string | number;
    title: string;
    description: string;
    imageUrl?: string; // Project uses imageUrl
    image?: string;    // Product uses image
}

// Product interfaces
export interface Product extends BaseItem {
    features: string[];
    image: string;
    ctaText: string;
    ctaLink: string;
    tag?: string;
    categories: string[];
    highlight?: boolean;
}

// Project interfaces
export interface Project extends BaseItem {
    id: number;
    imageUrl: string;
    technologies: string[];
    githubUrl?: string;
    liveUrl?: string;
    date: string;
    deprecated?: boolean | string;
}

// Shared props types
export interface FilterableListProps<T> {
    items: T[];
    filterKey: string;
    renderItem: (item: T, isVisible: boolean, index: number) => React.ReactNode;
    title: string;
    subtitle: string;
    emptyMessage?: string;
    loading?: boolean;
}