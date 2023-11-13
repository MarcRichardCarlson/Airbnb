import React, { useState } from 'react';
import { AiOutlineGoogle } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from '@firebase/auth';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    displayName: '',
    email: '',
    password: '',
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegistration = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:3001/users/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
        console.log('Registration successful:', response.data);
  
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };
  

  return (
    <div className='h-screen bg-light-grey'>
      <div className='absolute right-2 top-20 flex sm:text-base md:text-xl'>
        <p className='mr-1'>Har du redan ett konto?</p>
        <Link to={'/login'}>
          <p className='underline cursor-pointer'>Logga in här</p>
        </Link>
      </div>

      <div className='w-3/4 md:w-2/3 xl:w-1/2 m-auto pt-24'>
        <h1 className='text-3xl text-center mb-4'>Registrering</h1>
        <p className='text-center sm:text-base md:text-xl mb-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      
        <p>Användarnamn*</p>
        <input
          required
           className='w-full h-10 mb-3 pl-2'
          type='text'
          name='username'
          value={formData.username}
          onChange={handleChange}
        />

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

        <button className='w-full h-12 bg-rich-green text-white mb-3 hover:bg-off-green' type='submit' onClick={handleRegistration}>
          Registrera
        </button>
        
        <button className='flex justify-center items-center w-full h-12 bg-default-grey text-white hover:bg-off-grey'>
          <AiOutlineGoogle className='text-white mr-1'/>
          Logga in med Google
        </button>

      </div>
    </div>
  );
};

export default Register;
