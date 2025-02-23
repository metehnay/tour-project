import React from 'react';
import { Input } from '../common/Input';
import { BiSearch } from 'react-icons/bi';
import Slider from '../common/Slider';
import { Filter } from "./Filter";
import { TourFiltersProps } from '@/types/filters';

export const TourFilters: React.FC<TourFiltersProps> = ({ filters, onFilterChange, onToggleFilter }) => {

    return (
        <div>
            <Input
                id="location"
                label="Location"
                placeholder="Where you wanna visit?"
                value={filters.location || ''}
                onChange={(e) => onFilterChange('location', e.target.value)}
                icon={<BiSearch className="h-5 w-5 text-gray-400" />} 
                iconPosition="right" 
            />

            <Filter title="Theme" filterName="theme" options={['Island Tour', 'Land tour', 'Safari']} filters={filters} onToggleFilter={onToggleFilter} />

            <Filter title="Activity" filterName="activity" options={['Swimming', 'Running', 'Elephant care', 'Snorkelling']} filters={filters} onToggleFilter={onToggleFilter} />

            <div className="mt-6">
                <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">
                    Price:
                </label>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    ${filters.price ? Math.round(filters.price) : 20000}
                  </div>
                  <span className="text-xs text-gray-500">Max</span>
                </div>
                <Slider
                    min={0}
                    max={20000}
                    defaultValue={20000}
                    onChange={(value) => onFilterChange('price', value)}
                />
            </div>

            <div className="mt-8">
                <label htmlFor="startTime" className="block text-gray-700 text-sm font-bold mb-2">
                    Start Time:
                </label>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    {filters.startTime
                      ? (() => {
                          const hours = Math.floor(filters.startTime);
                          const minutes = Math.min(59, Math.round((filters.startTime - hours) * 60));
                          return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
                        })()
                      : "--:--"}
                  </div>
                </div>
                <Slider
                    min={0}
                    max={23.99}
                    step={0.25}
                    defaultValue={17}
                    onChange={(value) => onFilterChange('startTime', value)}
                    valueDisplay="text"
                />
            </div>

            <div className="mt-8">
                <label htmlFor="groupSize" className="block text-gray-700 text-sm font-bold mb-2">
                    Group Size:
                </label>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                  {filters.groupSize ? Math.round(filters.groupSize) : 40}
                  </div>
                  <span className="text-xs text-gray-500">Max</span>
                </div>

                <Slider
                    min={1}
                    max={40}
                    defaultValue={40}
                    onChange={(value) => onFilterChange('groupSize', value)}
                />
            </div>

            <Filter title="Vehicle" filterName="vehicle" options={['Yacht', 'Speedboat', 'Safari', 'Catamaran', 'Speedcatamaran']} filters={filters} onToggleFilter={onToggleFilter} />

        </div>
    );
};