'use client';
import React from 'react';
import Image from 'next/image';
import { AiOutlineHeart, AiFillStar, AiOutlineEnvironment } from 'react-icons/ai';
import { Button } from '../common/Button';
import { TourCardProps } from '@/types/tourData';
import { toast } from 'react-toastify';



const TourCard: React.FC<TourCardProps> = ({ tour }) => {

    const handleBookNow = () => {
        toast.success(`${tour.title} booked successfully!`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
            <div className="relative h-48 md:h-56">
                <Image
                    src={tour.image}
                    alt={tour.title}
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'top' }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                />
                 <div className="absolute bottom-2 left-2 bg-orange-400 text-sm text-white font-semibold text-gray-800 px-2 py-1 rounded">
                    {tour.category}
                </div>
                <div className="absolute top-2 left-2 bg-yellow-400 text-sm font-semibold text-gray-800 px-2 py-1 rounded">
                    30% OFF
                </div>
                <button className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100">
                    <AiOutlineHeart size={20} />
                </button>
            </div>

            <div className="p-4 flex flex-col flex-grow">
               <div className="flex items-center justify-between mb-1">
               <div className="flex items-center text-sm text-gray-600">
                     <AiFillStar className="text-yellow-500 mr-1" />
                     {tour.rating} <span className="ml-1">({tour.reviewCount})</span>
                  </div>                  
                  {tour.location && (
                    <div className="flex items-center text-sm text-gray-600 ">
                        <AiOutlineEnvironment className="text-gray-400 mr-1" />
                        {tour.location}
                    </div>
                )}

               </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{tour.title}</h3>


                <div className="flex mt-4  items-end flex-col ">
                   <div className='flex flex-row self-end gap-2 align-center items-center'>
                        <span className="text-red-500 line-through text-sm">THB {tour.price}</span>
                        <span className="text-xl font-semibold text-gray-800">THB {tour.discountPrice}</span>
                   </div>
                  
               </div>

               <div className="flex mt-4 justify-between items-center">
                  <a href="#" className="text-primary-500 font-semibold text-sm hover:text-primary-600 underline">
                     Details →
                  </a>

                 <Button label="Book Now" onClick={handleBookNow} className="bg-orange-400  text-white font-semibold py-2 px-4 rounded focus:outline-none shadow-md hover:bg-orange-500" />

               </div>
            </div>
        </div>
    );
};

export default TourCard;