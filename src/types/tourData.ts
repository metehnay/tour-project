
export interface Tour {
    id: number;
    title: string;
    image: string;
    rating: number;
    reviewCount: number;
    location: string;
    price: number;
    discountPrice: number;
    description: string;
    category: any;
    theme?: Theme[];
    activity?: Activity[];
    vehicle?: Vehicle[];
    transfer?: boolean;
    halalFood?: boolean;
    vegetarianFood?: boolean;
    startTime?: string;
    groupSize?: number;
  }
  
  export type Vehicle = 'Yacht' | 'Speedboat' | 'Safari' | 'Catamaran' | 'Speedcatamaran';
  export type Activity = 'Swimming' | 'Running' | 'Elephant care' | 'Snorkelling';
  export type Theme = 'Island Tour' | 'Land tour' | 'Safari';
  

export interface TourCardProps {
    tour: {
        id: number;
        title: string;
        image: string;
        rating: number;
        reviewCount: number;
        location: string;
        price: number;
        discountPrice: number;
        description: string;
        category: any;
        theme?: Theme[];
        activity?: string[];
        vehicle?: string[];
        transfer?: boolean;
        halalFood?: boolean;
        vegetarianFood?: boolean;
        startTime?: string;
        groupSize?: number;
    };
}