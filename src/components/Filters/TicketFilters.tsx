import React from 'react';
import Slider from '../common/Slider';
import { Filters } from '@/types/filters';

interface TicketFiltersProps {
  filters: Filters;
  onFilterChange: (filterName: string, value: any) => void;
}

export const TicketFilters: React.FC<TicketFiltersProps> = ({ filters, onFilterChange }) => {
  return (
    <div>
      <div className="mt-6">
        <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">
          Price:
        </label>
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            ${filters.price ? Math.round(filters.price) : 5000}
          </div>
          <span className="text-xs text-gray-500">Max</span>
        </div>
        <Slider
          min={0}
          max={5000}
          defaultValue={5000}
          onChange={(value) => onFilterChange('price', value)}
        />
      </div>
    </div>
  );
};