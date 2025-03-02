import { IKMI } from '@/public/images'
import Image from 'next/image'
import { FaWallet } from 'react-icons/fa'

const SidebarAuth = () => {
    return (
        <div className={`fixed flex z-[99999999] left-[0%] shadow-lg md:flex top-0 w-[80vw] md:w-[36%] bg-blue-100 item-center duration-200 justify-center h-screen overflow-hidden`}>

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
}

export default SidebarAuth
