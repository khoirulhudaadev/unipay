import Sidebar from '@/components/sidebar'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaArrowLeft, FaPenAlt } from 'react-icons/fa'
import '../../src/app/globals.css'
import { useSelector } from 'react-redux'
import ProviderMain from '@/redux/provider'
import store from '@/redux/store'
import API from '@/services/api'

const History = () => {

  const [show, setShow] = useState(false)
  const [dataUser, setDataUser] = useState<Record<string, any>>({})

  const auth = useSelector((state: any) => state.authSlice.auth)

  useEffect(() => {
    (async () => {
      const response = await API.getAccountById(auth?.user_id)
      setDataUser(response.data.data)
    })()
  }, [dataUser])

  const close = () => {
    setShow(false)
  }

  return (
    <div className='flex'>
        {/* Sidebar */}

        <Sidebar close={close} type='backToHome' show={show} />

        <div className='absolute z-[99999] right-4 top-6 rounded-lg border border-blue-500 w-[50px] h-[50px] flex md:hidden flex-col justify-center items-center cursor-pointer hover:brightness-[90%] active:scale-[0.98]' onClick={() => setShow(!show)}>
          <div className='w-full h-max flex flex-col justify-between items-center justify-between cursor-pointer hover:brightness-[90%] active:scale-[0.98]'>
            <div className='w-[30px] h-[3px] rounded-full bg-blue-400 my-1'></div>
            <div className='w-[30px] h-[3px] rounded-full bg-blue-400 my-1'></div>
            <div className='w-[30px] h-[3px] rounded-full bg-blue-400 my-1'></div>
          </div>
        </div>

        <div className='relative md:ml-[26%] w-full bg-blue-100 min-h-screen border-box pb-6 px-6 pt-5'>
            <Link href={'/'} className='absolute z-[999999999]'>
              <div className='w-[50px] h-[50px] z-[999999] p-2 rounded-full overflow-hidden bg-blue-400 hidden md:flex items-center justify-center cursor-pointer hover:bg-blue-500 active:scale-[0.96] text-white'>
                <FaArrowLeft />
              </div>
            </Link>
            <div className='relative left-[-5px] flex items-center w-max top-1'>
              <Link href={'/'}>
                <div className='rounded-full md:hidden flex cursor-pointer hover:bg-blue-500 active:scale-[0.97] bg-blue-400 text-white text-center flex items-center justify-center w-[50px] h-[50px]'>
                  <FaArrowLeft />
                </div>
              </Link>
              <div className='relative md:hidden flex rounded-full ml-3 bg-blue-400 border border-blue-500 w-max h-max px-5 py-2 text-white text-center'>
                {dataUser ? dataUser.NIM : ''}
              </div>
            </div>
            <div className='relative top-[30px] md:top-[-20px] flex items-center justify-center h-[65%] w-full'>
                <Image 
                  src={dataUser ? `/images/${dataUser.typePhoto}.svg` : 'man1.svg'}
                  alt='faceMemotion'
                  objectFit='contain'
                  className='relative scale-[1.1]'
                  layout='fill'
                />
            </div>
            <div className='relative bg-blue-200 rounded-[30px] shadow-lg w-full h-max md:h-[200px] p-6'>
              <div className='md:flex items-center max-w-full md:overflow-hidden'>
                <div className='text-blue-500'>
                  <h2 className='font-bold text-[24px] md:text-[30px] overflow-hidden md:flex max-w-[95%] md:max-w-max whitespace-nowrap overflow-ellipsis'>{dataUser ? dataUser.fullName : ''}</h2>
                  <p className='text-blue-500 flex items-center overflow-hidden md:flex max-w-[95%] md:max-w-max whitespace-nowrap overflow-ellipsis'><span className='hidden md:flex mr-1'>{dataUser ? dataUser.NIM + ' - ' : ''}</span> {dataUser ? dataUser.prodi : ''}</p>
                </div>
                <Link href={`/profile/${dataUser ? dataUser.user_id : ''}`} className='z-40'>
                  <div className='rounded-full md:mt-0 mt-3 md:ml-[30px] p-1 border-2 border-blue-500 text-blue-500 w-[50px] h-[50px] bg-transparent flex items-center justify-center cursor-pointer hover:brightness-[90%] active:scale-[0.97]'>
                    <FaPenAlt />
                  </div>
                </Link>
              </div>
              <hr className='my-4' />
              <div className='relative w-full md:w-max h-max flex flex-wrap items-center flex-wrap overflow-hidden'>
                <div className='md:flex hidden rounded-full mr-2 mb-2 bg-blue-400 border border-blue-500 w-max h-max px-5 py-2 text-white text-center'>
                  Years, {dataUser ? dataUser?.year : ''}
                </div>
                <div className='md:flex hidden rounded-full mr-2 mb-2 bg-blue-400 border border-blue-500 w-max h-max px-5 py-2 text-white text-center'>
                  Iam {dataUser ? dataUser.gender : ''}
                </div>
                <div className='md:flex hidden rounded-full mr-2 mb-2 bg-blue-400 border border-blue-500 w-max h-max px-5 py-2 text-white text-center'>
                  IKMI CIREBON
                </div>
                <div className='rounded-full mr-2 mb-2 bg-blue-400 border border-blue-500 overflow-hidden md:flex max-w-[100%] md:max-w-max whitespace-nowrap overflow-ellipsis h-max px-5 py-2 text-white text-center'>
                {dataUser ? dataUser.email : ''}
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default () => (
  <ProviderMain store={store}>
    <History />
  </ProviderMain>
);

