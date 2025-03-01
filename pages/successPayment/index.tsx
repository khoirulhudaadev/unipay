import Button from '@/components/button'
import Sidebar from '@/components/sidebar'
import { Success } from '@/public/images'
import ProviderMain from '@/redux/provider'
import store from '@/redux/store'
import Image from 'next/image'
import Link from 'next/link'

const SuccessPayment = () => {
  return (
    <div className='flex h-screen w-full bg-blue-100'>
        <Sidebar type='backToHome' />
        <div className='relative flex flex-col items-center justify-center md:ml-[26%] w-full md:w-[74%] bg-blue-100 h-max md:h-screen border-box pb-6 text-center px-6 md:mt-0 mt-6 pt-5'>
            <Image 
                src={Success}
                alt='succesIcon'
            />
            <h2 className="font-bold mt-5 text-[30px]">Success Payment</h2>
            <p className="mt-2 text-[14px] text-slate-500 w-[50%]">Thank, Your payment is successful</p>
            <Link href={'/'}>
                <Button status="primary" text="Back to home" style="mt-10" />
            </Link>
        </div>
    </div>
  )
}

export default () => (
  <ProviderMain store={store}>
    <SuccessPayment />
  </ProviderMain>
);

