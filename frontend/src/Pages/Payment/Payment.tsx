import React, { useEffect, useState } from 'react'
import { useCart } from '../../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();
    const { cartItems } = useCart();
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [cardDetails, setCardDetails] = useState('');
    const [cardHolderName, setCardHolderName] = useState('');
    const [billingAddress, setBillingAddress] = useState('');
    const [momsRegistrationNumber, setMomsRegistrationNumber] = useState('');

    const handlePayment = () => {
        const paymentDetails = {
        email,
        cardDetails,
        cardHolderName,
        billingAddress,
        momsRegistrationNumber,
        };

        console.log('Current Page:', location.pathname);
        // Check if cartItems is not empty before accessing [0]
        if (cartItems.length > 0) {
            navigate('/paymentconfirmation', {
            state: {
                paymentDetails,
                productName: cartItems[0].productName,
                imageUrls: cartItems[0].imageUrls,
                startDate: startDateObj?.toLocaleDateString(),
                endDate: endDateObj?.toLocaleDateString(),
                guests: guestsParam || 'Not specified',
                totalPrice: cartItems[0].price + calculateMomsAddition(cartItems[0].price),
            },
            });              
        }
    };
      
    

  const queryParams = new URLSearchParams(location.search);

  const productIdParam = queryParams.get('productId');
  const startDateParam = queryParams.get('startDate');
  const endDateParam = queryParams.get('endDate');
  const guestsParam = queryParams.get('guests');

  // Parse ISO strings to Date objects
  const startDateObj = startDateParam ? new Date(startDateParam) : null;
  const endDateObj = endDateParam ? new Date(endDateParam) : null;

  useEffect(() => {
    console.log('Product ID:', productIdParam);
    console.log('Cart Items:', cartItems);
    console.log('startDateObj:', startDateObj);
    console.log('endDateObj:', endDateObj);
    console.log('guestsParam:', guestsParam);

  }, [startDateObj, endDateObj, guestsParam, productIdParam, cartItems]);


  return (
    <div className='flex px-5'>
        {cartItems.map((cartItem: ProductDetailsProps) => (
        <div className='lg:flex md:inline' key={cartItem.id}>
            <div className='w-full pt-4 h-full'>
                <div className='px-1 h-full'>

                <div className='flex justify-left items-center w-full text-sm'>
                    <Link to={'/'}>Boenden &nbsp;</Link>
                    <MdOutlineKeyboardArrowRight/>
                    <p>{cartItems.productName}&nbsp;</p>
                    <MdOutlineKeyboardArrowRight/>
                    <p>Betalning</p>
                </div>
                
                <img className='mt-1 h-1/2 w-full object-cover rounded-md' src={cartItems[0].imageUrls?.[0]} alt={`Image of ${cartItems.productName}`} />
                    <div className="flex flex-col items-center mt-1 w-full p-4 bg-DEDE rounded-md">
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
                                {cartItem.description}
                            </div>
                        ) : (
                            <p className='text-xs w-full'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, quod ipsam,
                            quas at inventore beatae asperiores natus corrupti atque eaque, nobis fuga blanditiis mollitia aperiam 
                            suscipit velit distinctio. Fugit, nisi? Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, quod ipsam,
                            quas at inventore beatae asperiores natus corrupti atque eaque, nobis fuga blanditiis mollitia aperiam 
                            suscipit velit distinctio. Fugit, nisi? </p>
                        )}
                    </div>
                    
                    <div className='flex justify-around items-center bg-DEDE h-12 mt-1 p-1 rounded-md'>
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
            <div className='px-1 w-full'>
                <div className=' pt-2 pb-14 bg-light-grey rounded-md mt-12 mb-1 px-6'>
                    <h1 className='mt-2 text-3xl text-center'>Betalning</h1>
                    <p className='text-center'>Slutför din bokning genom at ange dina betalningsuppgifter</p>
                    <p className='mt-2'>Email adress</p>
                    <input value={email}
                    onChange={(e) => setEmail(e.target.value)} className='w-full rounded-sm p-1'></input>

                    <p className='mt-2'>Kort detaljer</p>
                    <input value={cardDetails}
                    onChange={(e) => setCardDetails(e.target.value)} className='w-full rounded-sm p-1'></input>

                    <p className='mt-2'>kortinnehavarens namn</p>
                    <input value={cardHolderName}
                    onChange={(e) => setCardHolderName(e.target.value)} className='w-full rounded-sm p-1'></input>

                    <p className='mt-2'>Faktureringsadress</p>
                    <input value={billingAddress}
                    onChange={(e) => setBillingAddress(e.target.value)} className='w-full rounded-sm p-1'></input>

                    <p className='mt-2'>Momsregistreringsnummer</p>
                    <input value={momsRegistrationNumber}
                    onChange={(e) => setMomsRegistrationNumber(e.target.value)} className='w-full rounded-sm p-1'></input>

                </div>
                    <div className='p-3 mt-1 w-full h-28 bg-DEDE rounded-md'>
                        <p>delsumma {cartItem.price}:-</p>
                        <p>moms {calculateMomsAddition(cartItem.price)}:-</p>
                        <div className='flex justify-between'>
                            <h1 className='text-3xl'>Totalt {cartItem.price + calculateMomsAddition(cartItem.price)}:-</h1>
                                <button onClick={handlePayment} className='bg-rich-green rounded w-24 h-8 text-white'>Betala</button>
                        </div>
                    </div>
            </div>                
        </div>
        ))}
    </div>
  )
}

export default Payment

