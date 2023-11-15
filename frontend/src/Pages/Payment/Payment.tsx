import React, { useState } from 'react'
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';

interface ProductDetailsProps {
    creationDate: string | number | Date;
    productName: string;
    description: string;
    price: number;
    imageUrls: string[];
    id: string; 
}

const calculateMomsAddition = (price: number): number => {
    const momsPercentage = 0.1; // 10% moms
    const momsAmount = price * momsPercentage;
    return Math.floor(momsAmount);
};

const Payment: React.FC = () => {
    const [showText1, setShowText1] = useState(false);
    const { startDate, endDate } = useParams<{ startDate?: string; endDate?: string }>();
    const { selectedDates } = useBooking();
    const { cartItems } = useCart();

    const formatDate = (date: Date | null) => {
        return date ? date.toLocaleDateString() : 'N/A';
    };

  return (
    <div className='flex h-screen'>
        {cartItems.map((item: ProductDetailsProps) => (
        <div className='flex px-8'>
            <div className='w-1/2 h-full pt-4'>
                <div className='px-4 h-full'>

                <div className='flex justify-left items-center w-full text-sm'>
                    <Link to={'/'}>Boenden &nbsp;</Link>
                    <MdOutlineKeyboardArrowRight/>
                    <p>{item.productName}</p>
                    <MdOutlineKeyboardArrowRight/>
                    <p>Betalning</p>
                </div>
                
                    <img className='mt-2 h-1/2 w-full object-cover' src={item.imageUrls?.[0]}></img>

                    <div className="flex flex-col items-center mt-2 w-full p-4 bg-DEDE">
                        <div className="flex">
                            <button
                            className={`font-bold py-2 px-4 ${showText1 ? 'underline' : 'text-darker-light-grey'} mr-4`}
                            onClick={() => setShowText1(true)}
                            >
                            Detaljer
                            </button>
                            <button
                            className={`font-bold py-2 px-4 ${!showText1 ? 'underline' : 'text-darker-light-grey'}`}
                            onClick={() => setShowText1(false)}
                            >
                            Avbokningspolicy
                            </button>
                        </div>

                        {showText1 ? (
                            <div className="text-xs w-full p-1">
                                {item.description}
                            </div>
                        ) : (
                            <p className='text-xs w-full'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, quod ipsam,
                            quas at inventore beatae asperiores natus corrupti atque eaque, nobis fuga blanditiis mollitia aperiam 
                            suscipit velit distinctio. Fugit, nisi? Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, quod ipsam,
                            quas at inventore beatae asperiores natus corrupti atque eaque, nobis fuga blanditiis mollitia aperiam 
                            suscipit velit distinctio. Fugit, nisi? </p>
                        )}
                    </div>
                    
                    <div className='flex justify-around items-center font-bold bg-DEDE h-16 rounded-sm mt-4 p-1'>
                    <p>Från: {formatDate(selectedDates[0])}</p>
                    <p>Till: {formatDate(selectedDates[1])}</p>
                        <p>Antal gäster  4</p>
                    </div>
                </div>
            </div>

            <div className='w-1/2 h-full px-12 pt-4 bg-light-grey'>
                <h1 className='mt-3 text-3xl text-center'>Betalning</h1>
                <p className='text-center'>Slutför din bokning genom at ange dina betalningsuppgifter</p>
                <p className='mt-4'>Email adress</p>
                <input className='w-full rounded-sm p-1'></input>
                <p className='mt-4'>Kort detaljer</p>
                <input className='w-full rounded-sm p-1'></input>
                <p className='mt-4'>kortinnehavarens namn</p>
                <input className='w-full rounded-sm p-1'></input>
                <p className='mt-4'>Faktureringsadress</p>
                <input className='w-full rounded-sm p-1'></input>
                <p className='mt-4'>Momsregistreringsnummer</p>
                <input className='w-full rounded-sm p-1'></input>
                <div className='p-3 mt-4 w-full h-28 bg-white'>
                    <p>delsumma {item.price}:-</p>
                    <p>moms {calculateMomsAddition(item.price)}:-</p>
                    <div className='flex justify-between'>
                        <h1 className='text-3xl'>Totalt {item.price + calculateMomsAddition(item.price)}:-</h1>
                        <button className='bg-rich-green rounded w-24 text-white'>Betala</button>
                    </div>
                </div>
            </div>
        </div>
        ))}
    </div>
  )
}

export default Payment

