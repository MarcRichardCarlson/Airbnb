import React from 'react';
import { Link } from 'react-router-dom';

interface PaymentConfirmationProps {
  productName: string;
  imageUrls: string[];
  startDate: string;
  endDate: string;
  guests: string;
  totalPrice: number;
}

const PaymentConfirmation: React.FC<PaymentConfirmationProps> = ({
  productName,
  imageUrls,
  startDate,
  endDate,
  guests,
  totalPrice,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-sm text-gray-600 mb-6">
          Thank you for your booking. An email confirmation has been sent to your registered email address.
        </p>
        <div className="mb-4">
          <h2 className="text-lg font-bold mb-2">{productName}</h2>
          <img className="w-full h-32 object-cover mb-2" src={imageUrls[0]} alt={`Image of ${productName}`} />
          <p>Selected dates: {startDate} - {endDate}</p>
          <p>Antal gäster: {guests}</p>
        </div>
        <p className="text-lg font-bold">Totalt: {totalPrice}:-</p>
        <Link
          to="/"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
