import { formatDate, toRupiah } from '@/helpers'
import React from 'react'
import { FaTimes } from 'react-icons/fa'

interface alertProps {
    data?: any,
    onClick?: () => void,
    status?: boolean
}

const Alert: React.FC<alertProps> = ({ data, status, onClick }) => {
  return (
    <div className={`w-max h-screen z-[999999999999999999] fixed overflow-hidden top-0 ${status ? 'flex right-[0%] duration-300' :'right-[-100%] duration-500'} items-center justify-end`}>
        <div className='relative w-[100vw] md:w-[30vw] h-screen bg-white shadow-lg p-6 md:p-8'>
            <div onClick={onClick} className='absolute cursor-pointer hover:brightness-[90%] top-0 left-0 w-[48px] h-[45px] bg-blue-400 flex items-center justify-center text-white'>
                <FaTimes className='mt-[-3px]' />
            </div>
            <p className='text-slate-500 mt-[60px] md:mt-16'>Total pembayaran</p>
            <h2 className={`mb-4 ${data?.type_payment !== 'top-up' ? 'text-red-500' : 'text-green-500'} text-[30px]`}>
                {toRupiah(data?.amount ?? 0)}
            </h2>
            <div className='w-full text-gray-600'>
                <div className='w-full mb-4 border-b border-blue-100 py-4'>
                    <p className='overflow-hidden max-w-[90%] whitespace-nowrap overflow-ellipsis'>ID : {data?.history_id ?? '-'}</p>
                </div>
                <div className='w-full mb-4 border-b border-blue-100 py-4'>
                    <p className='overflow-hidden max-w-[90%] whitespace-nowrap overflow-ellipsis'>Jenis : {data?.type_payment ?? '-'}</p>
                </div>
                <div className='w-full mb-4 border-b border-blue-100 py-4'>
                    <p className='overflow-hidden max-w-[90%] whitespace-nowrap overflow-ellipsis'>Waktu : {data?.date ? formatDate(data?.date ?? '') : '-'}</p>
                </div>
                <div className='w-full mb-4 border-b border-blue-100 py-4'>
                    <p className='overflow-hidden max-w-[90%] whitespace-nowrap overflow-ellipsis'>Pengirim : {data?.fullName ?? '-'}</p>
                </div>
                {
                    data.type_payment === 'Transfer' ? (
                        <div className='w-full mb-4 border-b border-blue-100 py-4'>
                            <p className='overflow-hidden max-w-[90%] whitespace-nowrap overflow-ellipsis'>Penerima : {data?.recipient ?? '-'}</p>
                        </div>
                    ):
                        null
                }
                <div className='w-full mb-4 border-b border-blue-100 py-4'>
                    <p className='overflow-hidden max-w-[90%] whitespace-nowrap overflow-ellipsis'>Deskripsi : jkdjdksjdksajdsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Alert
