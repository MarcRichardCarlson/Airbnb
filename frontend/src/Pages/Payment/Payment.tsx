import React, { useEffect, useState } from 'react'
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { useLocation } from 'react-router-dom';

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
    const { cartItems } = useCart();
    const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const startDateParam = queryParams.get('startDate');
  const endDateParam = queryParams.get('endDate');
  const guestsParam = queryParams.get('guests');

  // Parse ISO strings to Date objects
  const startDateObj = startDateParam ? new Date(startDateParam) : null;
  const endDateObj = endDateParam ? new Date(endDateParam) : null;

  useEffect(() => {
    console.log('startDateObj:', startDateObj);
    console.log('endDateObj:', endDateObj);
    console.log('guestsParam:', guestsParam);
  }, [startDateObj, endDateObj, guestsParam]);

  return (
    <div className='flex'>
        {cartItems.map((item: ProductDetailsProps) => (
        <div className='lg:flex md:inline px-8'>
            <div className='w-full pt-4'>
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
                    {startDateObj && endDateObj ? (
                        <p>
                        Selected dates: {startDateObj.toLocaleDateString()} - {endDateObj.toLocaleDateString()}
                        </p>
                    ) : (
                        <p>Dates not found in the URL parameters.</p>
                    )}
                        <p>Antal gäster {guestsParam || 'Not specified'}</p>
                    </div>
                </div>
            </div>

            <div className='w-full px-12 pt-2 pb-4 bg-light-grey my-4'>
                <h1 className='mt-3 text-3xl text-center'>Betalning</h1>
                <p className='text-center'>Slutför din bokning genom at ange dina betalningsuppgifter</p>
                <p className='mt-3'>Email adress</p>
                <input className='w-full rounded-sm p-1'></input>
                <p className='mt-3'>Kort detaljer</p>
                <input className='w-full rounded-sm p-1'></input>
                <p className='mt-3'>kortinnehavarens namn</p>
                <input className='w-full rounded-sm p-1'></input>
                <p className='mt-3'>Faktureringsadress</p>
                <input className='w-full rounded-sm p-1'></input>
                <p className='mt-3'>Momsregistreringsnummer</p>
                <input className='w-full rounded-sm p-1'></input>
                <div className='p-3 mt-4 w-full h-28 bg-white'>
                    <p>delsumma {item.price}:-</p>
                    <p>moms {calculateMomsAddition(item.price)}:-</p>
                    <div className='flex justify-between'>
                        <h1 className='text-3xl'>Totalt {item.price + calculateMomsAddition(item.price)}:-</h1>
                        <Link to={'/paymentconfirmation'}>
                            <button className='bg-rich-green rounded w-24 h-8 text-white'>Betala</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        ))}
    </div>
  )
}

export default Payment

