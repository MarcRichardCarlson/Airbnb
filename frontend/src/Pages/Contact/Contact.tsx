import React from 'react'
import { HiMail } from 'react-icons/hi';
import { ImLocation } from 'react-icons/im';
import { BsTelephoneFill } from 'react-icons/bs';


const Contact = () => {
  return (
    <div className='sm:px-6 md:px-12 lg:px-24 sm:inline md:flex '>
      <div className='bg-light-grey w-full h-full p-16'>
        <h1 className='font-bold text-3xl'>Kontakta oss</h1>
        <p>Lorem ipsum dolor sit amet consectetur.</p>

        <p className='font-bold mt-3'>Namn</p>
        <input className='w-full h-8 pl-2' type='text'></input>

        <p className='font-bold mt-2'>Email</p>
        <input className='w-full h-8 pl-2' type='email'></input>

        <p className='font-bold mt-2'>Meddelande</p>
        <textarea className='w-full h-32 p-2' placeholder='Skriv ditt meddelande...'></textarea>

        <div className='flex items-center h-6 w-1/2 mt-6'>
          <input className='w-6 h-6 mr-2' type='checkbox'></input>
          <p className='w-full'>Jag accepterar villkoren</p>
        </div>

        <button className='mt-6 bg-black text-white px-8 py-2'>Skicka</button>

      </div>
      <div className='flex flex-col w-full h-full mt-3 sm:p-2 md:p-6 lg:p-12 hidden lg:block'>
        <div className='sm:inline md:inline lg:flex'>
          <div className='flex flex-col justify-center items-start w-full mr-12 mb-12'> 
            <HiMail className='text-4xl'/>
            <h1 className='font-bold mt-2'>Email</h1>
            <p>Förväntat svar inom 3 arbetsdagar</p>
            <p className='mt-2'>lorem@gmail.com</p>
          </div>

          <div className='flex flex-col justify-center items-start w-full mb-12'>
            <BsTelephoneFill className='text-4xl'/>
            <h1 className='font-bold mt-2'>Telefon</h1>
            <p>Vardagar 07:00-15:30</p>
            <p className='mt-2'>+1 (555)000-0000</p>
          </div>
        </div>

        <div className='flex flex-col justify-center items-start w-full rounded'>          
          <ImLocation className='text-4xl'/>
          <h1 className='font-bold mt-2'>Kontor</h1>
          <p>Loremgatan 117 Stockholm</p>
          <a className='mt-2'>Karta</a>
        </div>
          
      </div>
    </div>
  )
}

export default Contact