import React, { useState } from 'react';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import userService from '../../Utils/userService';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = await userService.loginUser(formData.email, formData.password);
      localStorage.setItem('token', token);
      console.log('Login successful');
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  

  return (
    <div className='h-screen bg-light-grey'>
        <div className='absolute right-2 top-20 flex sm:text-base md:text-xl'>
            <p className='mr-1'>Har du inte ett konto?</p>
            <Link to={'/registrera'}>
                <p className=' underline cursor-pointer'>Registrera dig här</p>
            </Link>
        </div>
      <form className='w-3/4 md:w-2/3 xl:w-1/2 m-auto pt-24' onSubmit={handleSubmit}>
        <h1 className='text-center text-4xl mb-4'>Logga in</h1>
        <p className='text-center sm:text-base md:text-xl mb-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <p>Email*</p>
        <input
          className='w-full h-10 mb-3 pl-2'
          type='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          required
        />
        <p>Lösenord*</p>
        <input
          className='w-full h-10 mb-3 pl-2'
          type='password'
          name='password'
          value={formData.password}
          onChange={handleChange}
          required
        />

        {error && <p className='text-red-500'>{error}</p>} {}

        <button className='w-full h-12 bg-rich-green text-white mb-3 hover:bg-off-green' type='submit'>
          Login
        </button>
        <button className='w-full h-12 bg-default-grey text-white hover:bg-off-grey'>
            <FontAwesomeIcon icon={faGoogle} className='text-white mr-1' />
            Logga in med Google
        </button>
      </form>
    </div>
  );
};

export default Login;
