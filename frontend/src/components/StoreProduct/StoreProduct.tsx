import React, { useEffect, useState } from 'react';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { Link } from 'react-router-dom';

export type StoreProductProps = {
  id?: any;
  productName: string;
  price: number;
  imageUrls?: string[];
  description: string;
};

const StoreProduct: React.FC<StoreProductProps> = ({ id, productName, price, imageUrls = [], description }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Check if imageUrls is defined and has at least one URL
  const hasImages = imageUrls && imageUrls.length > 0;

  return (
    <div
      className={`shadow-lg rounded-lg w-full md:w-full lg:w-full overflow-hidden ${isHovered ? 'hover:bg-gray-200' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/details/${id}`} target="_blank" rel="noopener noreferrer">

        {isHovered &&
        <div className='absolute m-2 bg-DEDE bg-opacity-50 rounded-full h-8 w-8 flex justify-center items-center'>
          <MdOutlineKeyboardArrowRight/>
        </div>
        }

        {hasImages && <img className='rounded-t-lg object-cover w-full h-72' src={imageUrls[0]} alt={productName} />}
        <div className='p-2 h-40 overflow-hidden'>
          <h2 className='pb-1 text-xl font-bold'>{productName}</h2>
          <p className='sm:text-base md:text-sm lg:text-sm'>{description}</p>
        </div>
        <div className='flex justify-around items-center h-12 px-3'>
          <p className='w-full'>{price}kr / natt</p>
          <button className='bg-default-orange text-white px-2 py-1 rounded-sm cursor-pointer hover:bg-off-orange'>Detaljer</button>
        </div>
      </Link>
    </div>
  );
};

export default StoreProduct;
