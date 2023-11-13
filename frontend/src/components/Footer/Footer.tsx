import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { faFacebook, faInstagram, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

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

  return (<>
    {windowWidth > 735 && (
    <footer className="relative w-full h-40 text-center bg-rich-blue flex flex-col 
    items-center justify-center p-3 text-white static bottom-0 overflow-hidden">

      <div className='flex justify-between items-center h-3/4 w-full px-12'>

        <div className='w-1/6'>
          <Link to={'/'}>
            <h1 className='text-3xl font-bold'>Oldbnb</h1>
          </Link>
        </div>

        <div className='sm:w-1/3 md:w-2/4 lg:w-1/4 xl:w-1/4 flex justify-between items-center'>
          <Link to={'/'}>
            <p className='text-white'>Hem</p>
          </Link>

          <Link to={'/kontakt'}>
            <p className='text-white'>Kontakta oss</p>
          </Link>

          <Link to={'/om'}>
            <p className='text-white'>Om oss</p>
          </Link>
        </div>

        <div className='w-1/12 flex justify-between items-center'>
          <FontAwesomeIcon icon={faFacebook} />
          <FontAwesomeIcon icon={faInstagram} />
          <FontAwesomeIcon icon={faLinkedin} />
          <FontAwesomeIcon icon={faYoutube} />
        </div>
          
      </div>

      <div className='w-full h-px mt-1 mb-3 bg-DEDE'></div>
            
      <div className='flex justify-between items-center py-50 sm:w-full md:w-2/3 lg:w-1/3 xl:w-1/4'>
        <p>&copy; {new Date().getFullYear()}Home Juggler</p>
        <Link to={'/avbokningspolicy'}>
          <p className='underline'>Avbokningpolicy</p>
        </Link>
        <p className='underline'>Kakor</p>
      </div>

      <div className='rounded-full bg-default-orange h-24 w-24 absolute -right-6 -bottom-6'></div>
    </footer>
  )}

  {windowWidth <= 735 && (
    <footer className="relative w-full h-40 text-center bg-rich-blue flex flex-col 
    items-center justify-center p-3 text-white static bottom-0 overflow-hidden">

      <div className='flex justify-around items-center h-3/4 w-full'>

        <div className='w-full'>
          <h1 className='text-2xl font-bold'>Oldbnb</h1>
        </div>

        <div className='inline w-full text-left'>
          <Link to={'/avbokningspolicy'}>
            <p className='text-white text-sm'>Avbokningspolicy</p>
          </Link>

          <Link to={'/kontakt'}>
            <p className='text-white text-sm'>Kontakta oss</p>
          </Link>

          <Link to={'/om'}>
            <p className='text-white text-sm'>Om oss</p>
          </Link>
        </div>
          
      </div>

      <div className='inline my-2 w-full text-sm'>
        <p>&copy; {new Date().getFullYear()}Home Juggler</p>
      </div>

      <div className='rounded-full bg-default-orange h-24 w-24 absolute -right-6 -bottom-6 drop-shadow-lg'></div>
    </footer>
  )}
  </>
  );
};

export default Footer;
