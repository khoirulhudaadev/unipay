'use client'
import '@/app/globals.css'
import SweetAlert from '@/components/alert/sweetAlert'
import FormGroup from '@/components/formGroup'
import { Card } from '@/public/images'
import ProviderMain from '@/redux/provider'
import store from '@/redux/store'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'

const ResetPassword = () => {
 
  const navigate = useRouter()

  const [errorMessage, setErrorMessage] = useState<string>("")

  const handleResponse = (response: number) => {
    if(response === 200) {
      setErrorMessage("")
      SweetAlert({
        text:'Berhasil perbarui password!',
        title: 'Berhasil',
        icon: 'success',
        showCancelButton: false,
        confirmButtonText: 'Masuk kembali',
        navigate: navigate,
        route: '/auth'
      })
    }
  }

  const handleErrorMessage = (error: string) => {
    setErrorMessage(error)
  }
 
  return (
    <div className='fixed w-screen h-screen bg-blue-500 flex items-center justify-center'>
        <Link href={'/auth'}>
            <div className='rounded-full bg-white text-blue-500 shadow-md cursor-pointer hover:brightness-[90%] w-[50px] h-[50px] absolute z-40 left-6 md:left-8 top-6 md:top-8 flex items-center justify-center'>
                <FaArrowLeft />
            </div>
        </Link>
        <Image 
            src={Card}
            alt='card'
            className='absolute scale-[2] opacity-[0.4]'
        />
        <div className='w-full md:w-1/2 z-40 px-4 flex items-center justify-center'>
            <div className='w-full md:w-[80%] h-max rounded-lg p-8 bg-blue-100 shadow-md'>
                <FormGroup type='ResetPassword' handleErrorMessage={(e) => handleErrorMessage(e)} handleResponse={(e) => handleResponse(e)} error={errorMessage} />
            </div>
        </div>
    </div>
  )
}

export default () => (
    <ProviderMain store={store}>
      <ResetPassword />
    </ProviderMain>
);
