'use client'

import '@/app/globals.css'
import SweetAlert from '@/components/alert/sweetAlert'
import FormGroup from "@/components/formGroup"
import Sidebar from "@/components/sidebar"
import SidebarAuth from '@/components/sidebarAuth'
import { authSignOut } from "@/redux/authSlice"
import store from '@/redux/store'
import { useEffect, useState } from "react"
import { Provider, useDispatch } from "react-redux"

const Auth = () => {

  const dispatch = useDispatch()

  const [statusAuth, setStatusAuth] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>("")

  useEffect(() => {
    dispatch(authSignOut())
  }, [])

  const handleResponse = (response: number) => {
    if (response === 200) {
      setErrorMessage("")
      SweetAlert({
        text: 'Berhasil daftar',
        title: 'Success',
        confirmButtonText: 'Lanjut',
        showCancelButton: false,
        icon: 'success',
        onClick: () => setStatusAuth(false)
      })
    }
  }

  const handleErrorMessage = (error: string) => {
    setErrorMessage(error)
  }

  return (
    <div className="flex h-screen w-screen bg-blue-100">

      {/* Sidebar */}
      <SidebarAuth />

      <div className="relative md:ml-[36%] w-full md:w-[64%] bg-blue-500 md:bg-blue-400 h-full border-box pb-6 px-2 md:px-6 pt-5">
        <div className="rounded-lg p-4 w-full">
          <FormGroup type={!statusAuth ? "signin" : "signup"} handleResponse={(e) => handleResponse(e)} handleErrorMessage={(e) => handleErrorMessage(e)} onClick={() => setStatusAuth(!statusAuth)} error={errorMessage} />
        </div>
      </div>

    </div>
  )
}

export default () => (
  <Provider store={store}>
    <Auth />
  </Provider>
);
