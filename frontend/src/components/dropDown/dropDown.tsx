import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import userService from '../../Utils/userService';
import { useModal } from '../../hooks/useModal';
import CreateProductModal from '../CreateProductModal/ProductModal';

interface DropdownMenuProps {
  options: string[];
  onSelect: (selectedOption: string) => void;
  isLoggedIn: boolean;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ options, onSelect, isLoggedIn}) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const createProductModal = useModal(false);
  

  const handleOptionClick = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };
  
  const handleLogout = () => {
    // Call the logout function to clear user data and token
    userService.logoutUser()
    console.log('Logout');
  };

  function handleProductCreationSuccess(): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="relative inline-block text-left z-50">
      <div>
        <button
          type="button"
          className=" inline-flex justify-center items-center w-full rounded-md shadow-sm px-2 py-2 bg-rich-blue text-sm font-medium text-white hover:bg-off-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          id="options-menu"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption || 'Menu'}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M14.293 7.293a1 1 0 011.414 1.414L10 13.414l-5.707-5.707a1 1 0 111.414-1.414L10 10.586l4.293-4.293a1 1 0 111.414 1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-4 w-56 rounded-md shadow-lg bg-rich-blue ring-1 ring-black ring-opacity-5"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          {options.map((option, index) => (
            <div
              key={index}
              className="block px-4 py-3 text-sm text-white hover:bg-off-blue hover:text-gray-900 cursor-pointer rounded-md"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
          
            {isLoggedIn ? (
              <div>
                <button onClick={createProductModal.openModal} className='px-4 py-3 w-full bg-rich-blue text-left rounded-sm text-white hover:bg-off-blue'>
                Hyr ut
                </button>
                {
                <CreateProductModal
                  show={createProductModal.isOpen}
                  onHide={createProductModal.closeModal}
                  onSuccess={handleProductCreationSuccess}
                />
                }
              <Link to={'/'}>
              <button onClick={handleLogout} className='px-4 py-3 w-full bg-rich-blue text-left rounded-sm text-white hover:bg-off-blue'>
                Logout
              </button>
            </Link>
              </div>
            ) : (
              <div className='inline w-full'>
                <Link to={'/registrera'}>
                  <button onClick={() => setIsOpen(!isOpen)} className='px-4 py-3 w-full bg-rich-blue text-left rounded-sm text-white hover:bg-off-blue'>
                    Registrera
                  </button>
                </Link>
                <Link to={'/login'}>
                  <button onClick={() => setIsOpen(!isOpen)} className='px-4 py-3 w-full bg-rich-blue text-left rounded-sm text-white hover:bg-off-blue'>
                    Login
                  </button>
                </Link>
              </div>
            )}

        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
