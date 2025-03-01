'use client'

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { authInterface } from '../interfaces/authInterface'
import API from '@/services/api';
import { useDispatch } from 'react-redux'
import { authSignIn, saveToken } from '@/redux/authSlice';
import { useRouter } from 'next/navigation'

export const signinUseFormik = ({ onError }: {onError: any}) => {

    const dispatch = useDispatch()
    const navigate = useRouter()

    const formik = useFormik<authInterface>({
        initialValues: {
            NIM: '',
            password: '',
        },
        validationSchema: Yup.object({
            NIM: Yup.string()
            .min(6, 'Minimal 6 karakter')
            .required('Tidak boleh kosong!'),
            password: Yup.string()
            .max(20, 'Maksimal 20 karakter')
            .required('Tidak boleh kosong!'),
        }),
        onSubmit: async (values: any, { resetForm }) => {
            const response = await API.signiIn(values)
            
            if(response.data.status === 200) {
                dispatch(authSignIn(response.data.data))
                dispatch(saveToken(response.data.token))
                resetForm()
                navigate.push('/', {scroll: false})
            }else {
                onError(response.data.message)
            }
        }
    })

    return formik
}