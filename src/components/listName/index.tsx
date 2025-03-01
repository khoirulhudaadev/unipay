import API from '@/services/api'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { FaCheck, FaPlus } from 'react-icons/fa'
import InputField from '../inputField'
import { Error } from '@/public/images'

interface listNameProps {
    search?: any,
    onClick?: any,
    onChange?: any,
    NIM?: string
}

const ListName: React.FC<listNameProps> = ({ search, onClick, onChange, NIM }) => {

    const [dataUser, setDataUser] = useState<[]>([])

    useEffect(() => {
        (async() => {
            const response = await API.getAllUser()
            console.log('data pengguna:', response)
            setDataUser(response.data.data)
        })()
    }, [])

  return (
    <>
        <div className='mb-5 h-[15vh] text-white'>
            <InputField 
                label='Username'
                name='fullName'
                id='fullName'
                type='text'
                value={search}
                onChange={(e) => onChange(e.target.value)} 
                placeholder="Cari nama pengguna..." 
            />
        </div>
        <div className='block h-[80vh] pb-7 overflow-auto w-full'>
        {
            dataUser && dataUser.length > 1 ? (
                (() => {
                    const filteredData = dataUser.filter((data: any) => {
                      if (!search) {
                        // Tampilkan semua data jika !search
                        return true;
                      } else {
                        // Tampilkan data yang memiliki kesamaan dengan search pada fullName
                        return data.fullName.toLowerCase().includes(search.toLowerCase());
                      }
                    });
              
                    if (filteredData.length === 0) {
                      return (
                          <div className='flex flex-col items-center justify-center text-center'>
                            <Image 
                                src={Error}
                                alt='404'
                                width={100}
                                height={100}
                                className='mt-[20%] mb-7'
                            />
                              <p className='text-white'>Pengguna tidak ditemukan!</p>;
                          </div>
                      ) 
                    }

                    return filteredData.map((data: any, index: number) => (
                        <div className='relative h-max overflow-y-auto' key={index}>
                        <div className={`relative text-center hover:bg-blue-500 ${NIM === data.NIM ? 'bg-blue-500' : 'bg-blue-400'}  mb-4 rounded-md duration-100 cursor-pointer items-center flex w-full`}>
                            <div className='rounded-full mx-2 my-3 cursor-pointer hover:brightness-[90%] overflow-hidden w-[50px] h-[50px] bg-white'>
                            <Image 
                                src={`/images/${data?.typePhoto}.svg`}
                                alt='photo'
                                width={100}
                                height={100}
                            />
                            </div>
                            <p className='ml-3 text-white overflow-hidden max-w-[60%] whitespace-nowrap overflow-ellipsis'>{data?.fullName} - {data?.NIM}</p>
                            <div onClick={() => onClick(data?.NIM)} className={`${NIM === data.NIM ? 'bg-blue-300 text-white' : 'bg-white text-blue-500'} rounded-full flex items-center justify-center hover:brightness-[90%] cursor-pointer w-[40px] h-[40px] active:scale-[0.94] duration-100 shadow-lg absolute right-4`}>
                            {NIM === data?.NIM ? <FaCheck size={14} /> : <FaPlus size={14} />}
                            </div>
                        </div>
                        </div>
                    ))
                })()
            ) : (
                <p className='text-white'>Tidak ada pengguna!</p>
            )
        }
        </div> 
    </>
  )
}

export default ListName
