import React from 'react';
import { Button } from '../common/Button';

interface FilterGroupProps {
  title: string;
  filterName: string;
  options: string[];
  filters: any;
  onToggleFilter: (filterName: string, value: string) => void;
}

export const Filter: React.FC<FilterGroupProps> = ({ title, filterName, options, filters, onToggleFilter }) => {
  return (
    <div className="mt-4">
      <p className="block text-gray-700 text-sm font-bold mb-2">{title}:</p>
      <div className="flex flex-wrap gap-2">
        {options.map(option => (
          <Button
            key={option}
            label={`${option} (43)`}
            onClick={() => onToggleFilter(filterName, option)}
            className={`${
              (filters[filterName]?.includes(option) ? 'bg-primary-400 text-white' : 'bg-gray-200 text-gray-700')
            }`}
          />
        ))}
      </div>
    </div>
  );
};