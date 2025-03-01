import Button from '@/components/button'
import { isEqual, toRupiah } from '@/helpers'
import { Blue2, Card, IKMI } from '@/public/images'
import API from '@/services/api'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaPlusCircle, FaSignOutAlt, FaTimes, FaWallet } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import '../../app/globals.css'

const Sidebar = ({
  type, show, onClick, onClickWithdraw, update, close, router }:
  {
    type?: string,
    show?: boolean,
    onClick?: any,
    router?: string,
    onClickWithdraw?: any,
    update?: boolean,
    close?: () => void
  }) => {

  const [dataUser, setDataUser] = useState<Record<string, any>>({})

  const auth = useSelector((state: any) => state.authSlice.auth ?? null)

  useEffect(() => {
    if (auth.NIM !== "") {
      (async () => {
        const response = await API.getAccountById(auth?.user_id)
        if (!isEqual(dataUser, response.data.data)) {
          setDataUser(response.data.data)
        }
      })()
    }
  }, [update])

  switch (type) {
    case "auth":
      return (
        <div className={`fixed flex ${show ? 'z-[99999999] left-[0%] shadow-lg' : 'left-[-100%] md:left-[0%] z-[9999999] '} md:flex top-0 w-[80vw] md:w-[36%] bg-blue-100 flex item-center duration-200 justify-center h-screen overflow-hidden`}>

          <div className='relative flex items-center justify-center z-[1]'>
            <Image
              src={IKMI}
              width={250}
              alt='logo-campus'
              className='z-40'
            />
            <div className='absolute w-max left-[50%] bottom-[10%] transform -translate-x-1/2 -translate-y-1/2 px-6 h-[50px] rounded-full text-center flex items-center bg-white text-blue-500 shadow-lg z-40'>
              <div className='rounded-full border-[4px] border-white bg-blue-400 flex items-center justify-center text-[24px] mr-4 text-white w-[70px] h-[70px]'>
                <FaWallet />
              </div>
              Rp. 300.000
            </div>
            <div className='absolute w-[400px] h-[400px] border border-blue-400 rounded-full'></div>
            <div className='absolute w-[300px] h-[300px] border border-blue-400 rounded-full'></div>
            <div className='absolute w-[200px] h-[200px] border border-blue-200 rounded-full'></div>
          </div>
        </div>
      )
    case "backToHome":
      return (
        <div className={`fixed flex ${show ? 'z-[999999999] left-[0%] shadow-lg' : 'left-[-100%] md:left-[0%] z-[9999999] '} md:flex top-0 w-[100vw] md:w-[26%] bg-blue-200 duration-200 flex item-center justify-center h-screen overflow-hidden`}>
          <div className='absolute md:flex hidden items-center justify-between z-[99999] w-full px-5 top-5'>
            <div className='flex items-center w-max rounded-full text-[20px] top-8 bg-white text-blue-500 px-5 py-1 text-center'>
              <p>{toRupiah(dataUser?.balance)}</p>
            </div>
            <Link href={'/auth'} className='z-[2222] md:flex hidden'>
              <div className='w-[50px] h-[50px] z-[111] p-2 rounded-full overflow-hidden bg-red-400 flex items-center justify-center cursor-pointer hover:bg-red-500 active:scale-[0.96] text-white'>
                <FaSignOutAlt />
              </div>
            </Link>
          </div>

          <div className='relative flex items-center justify-center z-[1]'>
            <div className='absolute w-[400px] h-[400px] border border-blue-400 rounded-full'></div>
            <div className='absolute w-[300px] h-[300px] border border-blue-400 rounded-full'></div>
            <div className='absolute w-[200px] h-[200px] border border-blue-200 rounded-full'></div>
          </div>

          <Image
            src={Card}
            alt='Card-image'
            className='w-full absolute left-[50%] transform -translate-x-1/2 -translate-y-1/2 top-[50%] hidden md:flex z-[22222222] scale-[1.8] h-auto'
          />

          <div className='md:hidden inline z-40 w-[100%] top-8 h-[280px] md:h-[250px] relative'>
            <Image
              src={Blue2}
              alt='cardImage'
              className='absolute scale-[1.2] ml-8 mt-[30px]'
            />
            <div className='z-[222] absolute text-white text-[24px] top-[95px] left-[40px] flex items-center justify-between'>
              <p>{dataUser?.accountNumber ? dataUser.accountNumber.replace(/(\d{4})/g, '$1 ') : 0}</p>
            </div>
            <div className='z-[222] absolute text-white bottom-[85px] left-[40px]'>
              <p>Nama akun</p>
              <small>{dataUser?.fullName}</small>
            </div>
          </div>

          {/* Close sidebar */}
          <div onClick={close} className='absolute flex md:hidden items-center bottom-[205px] z-[8888888] right-0 w-max px-5 py-4 bg-white rounded-tl-full rounded-bl-full text-center text-blue-500 cursor-pointer active:scale-[0.97] md:hover:brightness-[90%]'>
            <FaTimes />
          </div>

          {/* Menu bawah */}
          <div className='bottom-6 md:hidden z-40 absolute flex items-center justify-between w-full px-6'>
            <div className='w-full flex flex-col mt-3'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center w-[80%] rounded-full text-[18px] bg-white text-blue-500 px-5 py-[10px] my-3 text-center'>
                  <p className='text-center mx-auto'>{toRupiah(dataUser?.balance)}</p>
                </div>
              </div>
              <div className='flex items-center justify-between'>
                <Link href={'/profile'} className='w-[80%]'>
                  <Button text='Profile' status='primary' style='w-full' />
                </Link>
                <Link href={'/auth'} className='z-40 mt-3'>
                  <div className='w-[50px] h-[50px] z-[111] p-2 rounded-full overflow-hidden bg-red-400 flex items-center justify-center cursor-pointer hover:brightnes-[90%] active:scale-[0.96] text-white'>
                    <FaSignOutAlt />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )
    default:
      return (
        <div className={`fixed flex ${show ? 'z-[99999999] left-[0%] shadow-lg' : 'left-[-100%] md:left-[0%] z-[9999999] '} md:flex bottom-0 w-[100vw] md:w-[26%] bg-blue-200 flex item-center duration-200 justify-center h-screen overflow-hidden`}>
          <div className='absolute md:flex hidden items-center justify-between z-[3333] w-full px-5 top-5'>
            <div className='flex items-center w-max rounded-full text-[20px] top-8 bg-white text-blue-500 px-5 py-1 text-center'>
              <p>{toRupiah(dataUser?.balance)}</p>
            </div>
            <Link href={'/auth'} className='z-[2222] md:flex hidden'>
              <div className='w-[50px] h-[50px] z-[111] p-2 rounded-full overflow-hidden bg-red-400 flex items-center justify-center cursor-pointer hover:bg-red-500 active:scale-[0.96] text-white'>
                <FaSignOutAlt />
              </div>
            </Link>
          </div>

          <div className='relative flex items-center justify-center z-[1]'>
            <div className='absolute w-[400px] h-[400px] border border-blue-400 rounded-full'></div>
            <div className='absolute w-[300px] h-[300px] border border-blue-400 rounded-full'></div>
            <div className='absolute w-[200px] h-[200px] border border-blue-200 rounded-full'></div>
          </div>

          <Image
            src={Card}
            alt='Card-image'
            className='w-full absolute left-[50%] transform -translate-x-1/2 -translate-y-1/2 top-[50%] hidden md:flex z-[2] scale-[1.8] h-auto'
          />

          <div className='md:hidden inline z-40 w-[100%] top-8 h-[280px] md:h-[250px] relative'>
            <Image
              src={Blue2}
              alt='cardImage'
              className='absolute scale-[1.2] ml-8 mt-[30px]'
            />
            <div className='z-[222] absolute text-white text-[24px] top-[95px] left-[40px] flex items-center justify-between'>
              <p>{dataUser?.accountNumber ? dataUser.accountNumber.replace(/(\d{4})/g, '$1 ') : 0}</p>
            </div>
            <div className='z-[222] absolute text-white bottom-[85px] left-[40px]'>
              <p>Nama akun</p>
              <small>{dataUser?.fullName}</small>
            </div>
          </div>

          {/* Close sidebar */}
          <div onClick={close} className='absolute flex md:hidden items-center bottom-[205px] z-[8888888] right-0 w-max px-5 py-4 bg-white rounded-tl-full rounded-bl-full text-center text-blue-500 cursor-pointer active:scale-[0.97] md:hover:brightness-[90%]'>
            <FaTimes />
          </div>

          {/* Menu bawah */}
          <div className='bottom-10 md:flex z-40 absolute flex items-center justify-between w-full px-5'>
            <div className='rounded-full cursor-pointer hover:bg-blue-600 active:scale-[0.97] bg-blue-500 text-white tect-center flex items-center justify-center w-[50px] h-[50px] mr-2' onClick={onClick}>
              <FaPlusCircle />
            </div>
            <Button text='Pencairan saldo' status='primary' style='w-[75%]' handleClick={onClickWithdraw} />
          </div>
          <div className='bottom-6 md:hidden z-40 absolute flex items-center justify-between w-full px-6'>
            <div className='w-full flex flex-col mt-3'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center w-[80%] rounded-full text-[18px] bg-white text-blue-500 px-5 py-[10px] my-3 text-center'>
                  <p className='text-center mx-auto'>{toRupiah(dataUser?.balance)}</p>
                </div>
                <div className='rounded-full cursor-pointer hover:bg-blue-600 active:scale-[0.97] bg-blue-500 text-white tect-center flex items-center justify-center w-[50px] h-[50px]' onClick={onClick}>
                  <FaPlusCircle />
                </div>
              </div>
              <div className='flex items-center justify-between'>
                <Button text='Pencairan' status='primary' style='w-[80%]' handleClick={onClickWithdraw} />
                <Link href={'/auth'} className='z-40 mt-3'>
                  <div className='w-[50px] h-[50px] z-[111] p-2 rounded-full overflow-hidden bg-red-400 flex items-center justify-center cursor-pointer hover:brightnes-[90%] active:scale-[0.96] text-white'>
                    <FaSignOutAlt />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )
  }
}

export default Sidebar;
