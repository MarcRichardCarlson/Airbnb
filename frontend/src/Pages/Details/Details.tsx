import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import productsService from '../../Utils/productService';
import { useCart } from '../../context/CartContext';
import { FaWifi } from 'react-icons/fa';
import { FaKitchenSet } from 'react-icons/fa6';
import { BiCoffee } from 'react-icons/bi';
import { LuBedDouble } from 'react-icons/lu';
import { PiTelevisionBold } from 'react-icons/pi';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import Carousel from '../../components/carousel/Carousel';
import { LiaStarSolid } from 'react-icons/lia';
import RangeDatePicker from '../../components/calendar/calendar';


interface ProductDetailsProps {
  creationDate: string | number | Date;
  productName: string;
  description: string;
  price: number;
  imageUrls: string[];
  id: string; 
}

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const DetailsPage: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [product, setProduct] = useState<ProductDetailsProps | null>(null);
  const { productId } = useParams<{ productId: string }>();
  const [showText1, setShowText1] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleDateChange = (start: Date | null, end: Date | null) => {
    setStartDate(start);
    setEndDate(end);
  };


  /*Window Resize*/
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  
  /*Navigate*/
  const navigate = useNavigate();
  
  /*CART Context*/
  const { 
  addToCart,
  } = useCart();
  

  /*Fetching products by ID*/
  useEffect(() => {
    if (productId) {
      console.log(`Details fetching product with ID: ${productId}`);
      const fetchProductData = async () => {
        try {
          const productData = await productsService.getProductById(productId);
          
          if (productData) {
            setProduct(productData as ProductDetailsProps);

          } else {
            console.error(`Product with ID ${productId} not found`);
          }
        } catch (error) {
          console.error('Error fetching product data:', error);
        }
      };

      fetchProductData();
    } else {
      console.error('Missing productId');
    }
  }, [productId]);

  /*HandleDelete*/
  const handleDeleteProduct = async () => {
    if (product) {
      try {
        await productsService.deleteProduct(product.id);
        console.log("Product deleted successfully");

        navigate('/');
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  if (!product) {
    // Placeholder card here if data is not loading in
    return <div className="spinner"></div>;
  }

  const guestsInputElement = document.getElementById('guestsInput') as HTMLInputElement | null;
  const guestsValue = guestsInputElement ? parseInt(guestsInputElement.value, 10) : 1;
  
  return (
    <>
    <div className="container mx-auto my-12 details-container">
      <div className="inblock w-full">

      {windowWidth > 735 && (
        <div className='inline'>
          
        <div className='flex justify-left items-center w-full text-sm px-6 ml-2 mb-1'>
          <Link to={'/'}>Boenden &nbsp;</Link>
          <MdOutlineKeyboardArrowRight/>
          <p>{product.productName}</p>
        </div>

        <div className='flex flex-wrap px-8 h-96'>

          <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 pr-1">
            <img className="object-cover w-full h-48 md:h-1/2 rounded cursor-pointer mt-1" src={product.imageUrls[0]} alt={`Image of ${product.productName}`} />
          </div>

          <div className="flex flex-wrap w-full md:w-1/2 lg:w-1/2 xl:w-1/2">

            <div className="h-1/2 w-full md:w-1/2 lg:w-1/2 xl:w-1/2 pr-1">
              <img className="object-cover w-full h-24 md:h-1/2 rounded cursor-pointer" src={product.imageUrls[1]} alt={`Image of ${product.productName}`} />
              <img className="object-cover w-full h-24 md:h-1/2 rounded cursor-pointer mt-1" src={product.imageUrls[2]} alt={`Image of ${product.productName}`} />
            </div>

            <div className='h-1/2 w-full md:w-1/2 lg:w-1/2 xl:w-1/2 mb-2 md:mb-0 lg:mb-0 xl:mb-0 relative'>
              <img className="object-cover w-full h-24 md:h-1/2 rounded cursor-pointer" src={product.imageUrls[3]} alt={`Image of ${product.productName}`} />
              <img className="object-cover w-full h-24 md:h-1/2 rounded cursor-pointer mt-1" src={product.imageUrls[4]} alt={`Image of ${product.productName}`} />
              <button className='absolute right-2 bottom-1 bg-rich-blue text-white rounded-sm p-3 hover:bg-off-blue'>Visa alla foton</button>
            </div>

          </div>
        </div>
      </div>
      )}
    
    {windowWidth <= 735 && (
      <Carousel>
        <div className="w-screen h-64 bg-blue-500 flex items-center justify-center">
          <img className="object-cover rounded m-1 cursor-poniter" src={product.imageUrls[0]} alt={`Image of ${product.productName}`} />
        </div>

        <div className="w-screen h-64 bg-green-500 flex items-center justify-center">
          <img className="object-cover w-full rounded cursor-poniter" src={product.imageUrls[1]} alt={`Image of ${product.productName}`}/>
        </div>

        <div className="w-screen h-64 bg-yellow-500 flex items-center justify-center">
          <img className="object-cover w-full rounded mt-1 cursor-poniter" src={product.imageUrls[2]} alt={`Image of ${product.productName}`}/>
        </div>

        <div className="w-screen h-64 bg-yellow-500 flex items-center justify-center">
          <img className="object-cover  w-full rounded cursor-poniter" src={product.imageUrls[3]} alt={`Image of ${product.productName}`}/>
        </div>
        
        <div className="w-screen h-64 bg-yellow-500 flex items-center justify-center">
          <img className="object-cover w-full rounded mt-1 cursor-poniter" src={product.imageUrls[4]} alt={`Image of ${product.productName}`}/>
        </div>
      </Carousel>
    )}
  <div className='lg:px-8 md:px-4 sm:px-0'>
    <div className="lg:flex md:inline w-full bg-DEDE bg-opacity-70 rounded px-10 py-4 mt-1 ">
      <div className='w-full'>
      
        <h2 className="text-3xl font-bold">{product.productName}</h2>
        <p className="overflow-auto my-3">{product.description}</p>

        <div className="flex flex-col items-center mt-8 w-full mb-5">
          <div className="flex mb-4">
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
            <div className="w-full">{product.description}</div>
          ) : (
            <div className="w-full">Vid avbokning mer än 72 timmar före bokad tid återbetalas hela beloppet.
             Avbokningar som görs inom 72 timmar innan den planerade aktiviteten ger ingen rätt till återbetalning.
              Vi förstår att oförutsedda händelser kan inträffa, och i sådana fall är vi öppna för att diskutera 
              alternativa arrangemang eller erbjudanden för framtida bokningar.
            Vi värdesätter våra kunders förståelse och samarbete. För mer information eller för att avboka vänligen kontakta vår kundtjänst på support@example.com </div>
          )}
        </div>

        <div className="w-full border-light-grey border-2 p-3 mb-3">
            <h4 className='text-lg font-bold text-center mb-3'>Ingår</h4>
              <div className='flex justify-center itmes-center h-20 pt-3'>
                <div className='w-full h-full'>
                  <FaWifi className='w-6 h-6 m-auto'/>
                  <p className='font-bold text-center'>Wifi</p>
                </div>
                <div className='w-full h-full'>
                  <FaKitchenSet className='w-6 h-6 m-auto'/>
                  <p className='font-bold text-center'>Kök</p>
                </div>
                <div className='w-full h-full'>
                  <BiCoffee className='w-6 h-6 m-auto'/>
                  <p className='font-bold text-center'>Frukost</p>
                </div>
                <div className='w-full h-full'>
                  <LuBedDouble className='w-6 h-6 m-auto'/>
                  <p className='font-bold text-center'>Dubbelsäng</p>
                </div>
                <div className='w-full h-full'>
                  <PiTelevisionBold className='w-6 h-6 m-auto'/>
                  <p className='font-bold text-center'>Tv</p>
                </div>
              </div>
          
        </div>
      </div>

      <div className="flex flex-col justify-between items-center lg:pl-5 md:pl-0 m-auto">
        <div className='flex justify-center items-center'>
          <p className='pr-1'>Antal gäster:</p>
          <input
            id="guestsInput"
            type='number'
            className='p-2 rounded-md w-12'
            min='1'
            defaultValue='1'
            max='50'
          />
        </div>
        <div className='w-full p-2 text-black'>
        <RangeDatePicker
          startDate={startDate}
          endDate={endDate}
          onChange={handleDateChange}
        />
        </div>
        <div className='flex flex-col justify-between items-center'>
          <p className="text-lg font-bold mt-3">Price: $ {product.price} / 5 days</p>
          <div className='flex justify-center items-center'>
            <LiaStarSolid/>
            <LiaStarSolid/>
            <LiaStarSolid/>
            <LiaStarSolid/>
            <p>(4 Stjärnor) av 10 betyg</p>
          </div>
          <button className="bg-rich-green text-white px-8 py-2 lg:w-96 md:w-full rounded-sm hover:bg-off-green mt-3">Kontakta värden</button>
           
          <Link to={`/betalning?startDate=${startDate}&endDate=${endDate}&guests=${guestsValue}&productId=${productId}`} onClick={() => addToCart(product)}>
            <button className="bg-rich-blue text-white px-8 py-2 lg:w-96 md:w-full rounded-sm hover:bg-off-blue mt-3">Boka nu</button>
          </Link>
          <p onClick={handleDeleteProduct} className='font-bold text-xs mt-3'>Gratis natt vid köp över 5000:-</p>
        </div>
      </div>

      </div>  
    </div>
  </div>
</div>
</>
  );
};

export default DetailsPage;
