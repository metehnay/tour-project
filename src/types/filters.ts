
export interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFilter: (category: string, filters: any) => void;
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export interface Filters {
  location?: string;
  theme?: string[];
  activity?: string[];
  vehicle?: string[];
  transfer?: boolean;
  halalFood?: boolean;
  vegetarianFood?: boolean;
  price?: number;
  startTime?: number;
  groupSize?: number;
  rentType?: string[];
  rentPrice?: number;

}

export interface RentFiltersProps {
    filters: any;
    onFilterChange: (filterName: string, value: any) => void;
    onToggleFilter: (filterName: string, value: string) => void;
  }

  export interface TourFiltersProps {
    filters: any;
    onFilterChange: (filterName: string, value: any) => void;
    onToggleFilter: (filterName: string, value: string) => void;
  }

  