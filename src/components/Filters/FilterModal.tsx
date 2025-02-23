import React, { useState, useEffect, useRef } from 'react';
import { AiTwotoneCloseCircle, AiOutlineSearch } from 'react-icons/ai';
import { FaSlidersH, FaFilter } from 'react-icons/fa';
import { Button } from '../common/Button';
import { TourFilters } from './TourFilters';
import { RentFilters } from './RentFilters';
import { Filter } from './Filter';
import { FilterModalProps, Filters } from '@/types/filters';
import { MdTour, MdHome, MdTransferWithinAStation, MdConfirmationNumber } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose, onFilter, categories, selectedCategory, setSelectedCategory }) => {
    const [filters, setFilters] = useState<Filters>({});
    const [modalHeight, setModalHeight] = useState<number | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setFilters({});
    }, [selectedCategory]);

    useEffect(() => {
        if (isOpen && modalRef.current) {
            const navbarHeight = 60;
            const calculatedHeight = window.innerHeight - navbarHeight;
            setModalHeight(calculatedHeight);
        } else {
            setModalHeight(null);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleFilterChange = (filterName: string, value: any) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [filterName]: value
        }));
    };

    const handleApplyFilters = () => {
        onFilter(selectedCategory, filters);
        onClose();
    };

    const handleResetFilters = () => {
        setFilters({});
    };

    const handleCategoryHeaderClick = () => {
        setSelectedCategory('');
    };

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'Tours':
                return <MdTour size={48} className="mr-2 text-blue-500" />;
            case 'Rent':
                return <MdHome size={48} className="mr-2 text-green-500" />;
            case 'Transfer':
                return <MdTransferWithinAStation size={48} className="mr-2 text-purple-500" />;
            case 'Tickets':
                return <MdConfirmationNumber size={48} className="mr-2 text-yellow-500" />;
            default:
                return null;
        }
    };

    const renderFilters = () => {
        switch (selectedCategory) {
            case 'Tours':
                return <TourFilters filters={filters} onFilterChange={handleFilterChange} onToggleFilter={handleToggleFilter} />;
            case 'Rent':
                return <RentFilters filters={filters} onFilterChange={handleFilterChange} onToggleFilter={handleToggleFilter} />;
            default:
                return (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <p className="text-gray-600 italic mb-4">Select a category to see filters.</p>
                        <div className="grid grid-cols-1 gap-4">
                            {categories.map((category) => (
                                <motion.button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className="flex flex-col items-center justify-center bg-white hover:bg-gray-100 text-gray-800 font-semibold py-6 px-4 rounded-md shadow-sm transition duration-200 ease-in-out border border-gray-200"
                                    whileHover={{ scale: 1.03, boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)" }}
                                    whileTap={{ scale: 0.97 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                >
                                    {getCategoryIcon(category)}
                                    <span className="text-lg">{category}</span>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                );
        }
    };

    const handleToggleFilter = (filterName: string, value: string) => {
        setFilters((prevFilters) => {
            const currentValues = (prevFilters[filterName as keyof Filters] as string[]) || [];
            if (currentValues.includes(value)) {
                return { ...prevFilters, [filterName]: currentValues.filter((v) => v !== value) };
            } else {
                return { ...prevFilters, [filterName]: [...currentValues, value] };
            }
        });
    };

    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.2 } },
    };

   const modalVariants = {
        hidden: { y: "-100vh", opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 80,
                damping: 20,
                duration: 0.3,
            },
        },
        exit: { y: "-100vh", opacity: 0, transition: { duration: 0.2 } },
    };

    const headerVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.3 } },
    };

    const buttonVariants = {
        hover: { scale: 1.1, transition: { duration: 0.2 } },
        tap: { scale: 0.95 },
    };

    const showFilterButtons = selectedCategory !== '';

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50"
                    variants={backdropVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                >
                    <motion.div
                        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-screen-md mx-4 overflow-y-auto"
                        style={{
                            backgroundColor: '#f9f9f9',
                            maxHeight: modalHeight ? `${modalHeight}px` : 'calc(100vh - 60px)',
                        }}
                        variants={modalVariants}
                        ref={modalRef}
                    >
                        <motion.div
                            className="flex items-center justify-between mb-6"
                            variants={headerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {selectedCategory ? (
                                <motion.button
                                    onClick={handleCategoryHeaderClick}
                                    className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-md text-center focus:outline-none focus:shadow-outline transition duration-200"
                                    variants={buttonVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                >
                                    <span className="text-lg font-semibold">{selectedCategory.toUpperCase()}</span>
                                </motion.button>
                            ) : (
                                <span className="text-lg font-semibold"></span>
                            )}

                            <h2
                                className="text-2xl font-semibold text-gray-800 flex items-center gap-2 justify-center"
                                style={{ textDecoration: selectedCategory ? 'underline' : 'none' }}
                            >
                                FILTER
                            </h2>
                            <motion.button
                                onClick={onClose}
                                className="focus:outline-none hover:bg-gray-100 rounded-full p-1 transition duration-200"
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                            >
                                <AiTwotoneCloseCircle size={25} />
                            </motion.button>
                        </motion.div>

                        {renderFilters()}

                        {showFilterButtons && (
                            <div className="flex justify-end mt-8 space-x-4">
                                <motion.button
                                    onClick={handleResetFilters}
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
                                    variants={buttonVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                >
                                    RESET
                                </motion.button>
                                <motion.button
                                    onClick={handleApplyFilters}
                                    className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded focus:outline-none focus:shadow-outline transition duration-200 flex items-center"
                                    variants={buttonVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                >
                                    SEARCH
                                    <AiOutlineSearch className="ml-2" />
                                </motion.button>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default FilterModal;