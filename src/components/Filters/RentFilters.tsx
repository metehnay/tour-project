import React from 'react';
import { Input } from '../common/Input';
import { BiSearch } from 'react-icons/bi';
import Slider from '../common/Slider';
import {Filter} from "./Filter";
import { RentFiltersProps } from '@/types/filters';


export const RentFilters: React.FC<RentFiltersProps> = ({ filters, onFilterChange, onToggleFilter }) => {
  return (
    <div>
      <Input
        id="location"
        label="Location"
        placeholder="Where do you wanna rent?"
        value={filters.location || ''}
        onChange={(e) => onFilterChange('location', e.target.value)}
        icon={<BiSearch className="h-5 w-5 text-gray-400" />}
        iconPosition="right"
      />

      <Filter title="Rent Type" filterName="rentType" options={['Apartment', 'House', 'Villa', 'Car', 'Bike']} filters={filters} onToggleFilter={onToggleFilter} />

      <div className="mt-8">
        <div className="flex gap-1">
          <label htmlFor="rentPrice" className="block text-gray-700 text-sm font-bold mb-2">
            Price:
          </label>
          <div className="text-sm text-gray-600 w-12">{filters.rentPrice ? Math.round(filters.rentPrice) : 1000}</div>
        </div>
      </div>
      <div className='flex gap-4 items-center mb-12'>
        <Slider
          min={0}
          max={10000}
          defaultValue={1000}
          onChange={(value) => onFilterChange('rentPrice', value)}
        />
      </div>

    </div>
  );
};