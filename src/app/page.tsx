"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import TourCard from '@/components/TourCard';
import FilterModal from '@/components/Filters/FilterModal';
import fakeTours from "@/data/data";
import { Tour } from '@/types/tourData';

const Page: React.FC = () => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [filters, setFilters] = useState<any>({});
  const [filteredTours, setFilteredTours] = useState<Tour[]>(fakeTours);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [...new Set(fakeTours.map(tour => tour.category))];

  useEffect(() => {
    let newFilteredTours: Tour[] = fakeTours;

    if (searchQuery) {
      newFilteredTours = newFilteredTours.filter(tour => 
        tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      newFilteredTours = newFilteredTours.filter(tour => tour.category === selectedCategory);
    }

    if (Object.keys(filters).length > 0) {
      newFilteredTours = newFilteredTours.filter(tour => {
        for (const key in filters) {
          if (filters[key] !== undefined && filters[key] !== null) {
            const filterValue = filters[key];
            const tourValue = tour[key as keyof Tour];

            if (key === 'location' && typeof filterValue === 'string' && typeof tourValue === 'string') {
              if (!tourValue.toLowerCase().includes(filterValue.toLowerCase())) return false;
            }
            else if (Array.isArray(filterValue) && Array.isArray(tourValue)) {
              const tourValueTyped = tourValue as string[];
              if (!filterValue.every((val: any) => tourValueTyped.includes(val))) {
                return false;
              }
            } else if (typeof filterValue === 'number') {
              const tourValueNumber = tourValue as number;
              if (key === 'price' && tour.discountPrice > filterValue) return false;
              if (key === 'startTime' && tourValueNumber !== filterValue) return false;
              if (key === 'groupSize' && tourValueNumber > filterValue) return false;
            }
          }
        }
        return true;
      });
    }

    setFilteredTours(newFilteredTours);
  }, [selectedCategory, filters, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onFilterClick={() => setIsFilterModalOpen(true)} />
      
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onFilter={(category: string, filters: any) => {
          setSelectedCategory(category);
          setFilters(filters);
        }}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <main className="container mx-auto px-4 py-8">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            The Orca Travel
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Discover extraordinary destinations and create unforgettable memories
          </p>
        </motion.section>

        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search destinations or tours..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
            />
          </div>
        </div>

        <div className="mb-8">
            <div className="flex flex-col sm:flex-row flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('')}
                className={`px-4 py-2 rounded-full transition-all whitespace-nowrap ${
                  selectedCategory === ''
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full transition-all whitespace-nowrap ${
                    selectedCategory === category
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
        </div>


        <AnimatePresence>
          {filteredTours.length > 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {filteredTours.map((tour, index) => (
                <motion.div
                  key={tour.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <TourCard tour={tour} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-lg text-gray-600">No tours found matching your criteria.</p>
              <button 
                onClick={() => {
                  setSelectedCategory('');
                  setFilters({});
                  setSearchQuery('');
                }}
                className="mt-4 px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                Reset Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Page;