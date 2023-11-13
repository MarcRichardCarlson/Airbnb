import React, { useEffect, useState } from 'react';
import { Button, ListGroup, Offcanvas } from 'react-bootstrap';
import { useCart } from '../../context/CartContext';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


interface ProductDetailsProps {
  creationDate: string | number | Date;
  productName: string;
  description: string;
  price: number;
  imageUrls: string[];
  id: string; 
}

const Cart: React.FC = () => {
  const [show, setShow] = useState(false);

  const {
    cartItems,
    cartTotal,
    removeFromCart,
    increaseCartQuantity,
    decreaseCartQuantity,
    getItemQuantity,
    isOpen, 
    closeCart 
  } = useCart();

   // Use the useLocalStorage hook to save and load cartItems
  const [savedCartItems, setSavedCartItems] = useLocalStorage<ProductDetailsProps[]>("cartItems", []);

  // When the component mounts, update the cartItems with the savedCartItems
  useEffect(() => {
    if (savedCartItems.length > 0) {
      // Loop through savedCartItems and add them to cartItems
      savedCartItems.forEach(item => {
        if (!cartItems.some((existingItem: { id: string; }) => existingItem.id === item.id)) {
          cartItems.push(item);
        }
      });
    }
  }, [savedCartItems]);

  // When cartItems change, update the savedCartItems
  useEffect(() => {
    setSavedCartItems(cartItems);
  }, [cartItems]);



  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Body className="p-0">
        <ListGroup>
          {cartItems.map((item: ProductDetailsProps) => (
            <ListGroup.Item key={item.id} className='h-full p-0 m-0 border-none'>
                <div className='flex justify-center items-center mt-2
                  h-8 w-8 bg-off-white rounded-full ml-3 mb-2 cursor-pointer hover:bg-default-white'>
                  <FontAwesomeIcon icon={faArrowLeft} onClick={() => removeFromCart(item.id)} />
                </div>
              
              <img className='' src={item.imageUrls?.[0]}></img>
              <div className=''>
                <div className='cart-item-top-body'>
                  <div className='p-3'>
                    {item.productName}
                  </div>
                  <div className='px-3'>
                    {item.description}
                  </div>
                  <div className='px-3'>
                    {item.price}$ / night
                  </div>
                </div>
                <div className='px-3'>
                  <Button className='bg-rich-blue hover:bg-off-blue border-none m-1 btn-sm mt-3' onClick={() => decreaseCartQuantity(item.id)}>
                    -
                  </Button>
                  {getItemQuantity(item.id)}
                  <Button className='bg-rich-blue hover:bg-off-blue border-none m-1 btn-sm mt-3' onClick={() => increaseCartQuantity(item.id)}>
                    +
                  </Button>
                </div>
              </div>
              <p className="m-3">Total: ${cartTotal} for {getItemQuantity(item.id)} nights</p>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <Link to={'/betalning'}>
          <Button 
          className='bg-rich-green border-none hover:bg-off-green mx-3' 
          onClick={closeCart}>
            Continue
          </Button>
        </Link>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Cart;
