import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const PaymentConfirmation: React.FC = () => {
  const { cartItems } = useCart();

  console.log('Rendering PaymentConfirmation');

  const location = useLocation();
  const { state } = location;

  console.log('Location State:', state);

  if (!state || !state.paymentDetails) {
    console.log('No payment details found');
    return null;
  }

  const {
    productName,
    imageUrls,
    startDate,
    endDate,
    guests,
    totalPrice,
  } = location.state as {
    paymentDetails: any;
    productName: string;
    imageUrls: string[];
    startDate: string;
    endDate: string;
    guests: string;
    totalPrice: number;
  };
  
  return (
    <div className="w-full h-full my-12 flex items-center justify-center bg-white">
      <div className="p-8 rounded shadow-sm lg:w-1/2 md:w-2/3 sm:w-full bg-DEDE lg:mx-0 md:mx-0 sm:mx-4">
        <div className='flex justify-between items-center'>
          <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
          <div className="w-12 h-12 text-green-500">
            <svg className="w-full h-full fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M9 16.17l-3.5-3.5a1 1 0 0 1 1.41-1.41L9 13.35l6.59-6.59a1 1 0 0 1 1.41 1.41l-7 7a1 1 0 0 1-1.41 0z"/>
            </svg>
          </div>

        </div>
        <p className="text-sm text-gray-600 mb-6">
          Thank you for your booking. An email confirmation has been sent to your registered email address.
        </p>
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">{productName}</h2>
          <img className="w-1/3 h-32 object-cover mb-2" src={imageUrls[0]} alt={`Image of ${productName}`} />
          <p className='font-bold'>Selected dates: {startDate} - {endDate}</p>
          <p>Antal gäster: {guests}</p>
        </div>

        <div className='flex justify-between items-center'>
          <p className="text-lg font-bold">Totalt: {totalPrice}:-</p>
          <Link
            to="/"
            className="bg-rich-green text-white px-4 py-2 rounded hover:bg-off-green focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmation;