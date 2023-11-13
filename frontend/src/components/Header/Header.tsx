import React, { useEffect, useRef, useState } from 'react';
import CreateProductModal from '../CreateProductModal/ProductModal';
import LogoutButton from '../Logout/Logout';
import { useModal } from '../../hooks/useModal';
import { Link, useNavigate } from 'react-router-dom';
import { BsFillHouseDoorFill } from 'react-icons/bs';
import DropdownMenu from '../dropDown/dropDown';
import SearchBar from '../searchBar/searchBar';

const options = ['Kontakta oss', 'Om oss', 'Avbokningspolicy'];

const Header: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const createProductModal = useModal(false);
  const [isUtilModalOpen, setIsUtilModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleSelect = (selectedOption: string) => {
    switch (selectedOption) {
      case 'Kontakta oss':
        navigate('/kontakt');
        break;
      case 'Om oss':
        navigate('/om');
        break;
      case 'Avbokningspolicy':
        navigate('/avbokningspolicy');
        break;
      default:
        break;
    }
  };

  /*Create product*/
  const handleProductCreationSuccess = () => {
    console.log('Product created successfully');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);
  
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

  // Create a ref to the modal element
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Function to handle clicks outside the modal
  const handleOutsideClick = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setIsUtilModalOpen(false); // Close the modal
    }
  };

  useEffect(() => {
    if (isUtilModalOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      // Cleanup the event listener when the component unmounts or modal closes
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isUtilModalOpen]);

  return (
    <>
      {windowWidth > 735 && (
        <nav className="w-full flex justify-between items-center h-20
          p-10 pl-16 pr-12 bg-rich-blue drop-shadow-lg" role="navigation">
        <div className='absolute -top-6 -left-6 h-20 w-20 rounded-full bg-default-orange drop-shadow-lg'></div>

        <Link to={'/'}>
          <h1 className='text-2xl font-bold text-white drop-shadow-lg'>Oldbnb</h1>
        </Link>

          <SearchBar/>

          <div className='flex justify-between items-center w-80'>
            <Link to={'/'}>
              <p className='text-white text-sm drop-shadow-lg'>Hem</p>
            </Link>

            <Link to={'/kontakt'}>
              <p className='text-white text-sm drop-shadow-lg'>Kontakt</p>
            </Link>

            <Link to={'/om'}>
              <p className='text-white text-sm drop-shadow-lg'>Om oss</p>
            </Link>
          


            {isLoggedIn ? (
              <div className='flex justify-center items-center'>
                <button className='py-2 px-2 mx-2 bg-rich-green rounded text-white 
                whitespace-nowrap text-sm drop-shadow-lg hover:bg-off-green' onClick={createProductModal.openModal}>
                  Hyr ut
                </button>
                {
                <CreateProductModal
                  show={createProductModal.isOpen}
                  onHide={createProductModal.closeModal}
                  onSuccess={handleProductCreationSuccess}
                />
                }
                <LogoutButton />
              </div>
            ) : (
              <div className='flex justify-center items-center'>
                <Link to={'/login'}>
                  <button className='p-2 w-20 bg-default-orange rounded-sm text-white 
                    drop-shadow-lg hover:bg-off-orange text-sm'>
                    Login
                  </button>
                </Link>
              </div>
            )}
          </div>
        </nav>
          )}

      {windowWidth <= 735 && (

        <nav className="w-full flex justify-between items-center h-20
         px-12 bg-rich-blue" role="navigation">

          <Link to={'/'}>
            <BsFillHouseDoorFill className='text-3xl cursor-pointer text-white w-16'/>
          </Link>

          <div className=' flex justify-center items-center h-20 w-40 mb-4 rounded-b-full bg-default-orange'>
            <p className='text-white text-xl font-bold'>Oldbnb</p>
          </div>

          <DropdownMenu options={options} onSelect={handleSelect} isLoggedIn={isLoggedIn}/>

        </nav>
      )}

    </>
  );
};

export default Header;
