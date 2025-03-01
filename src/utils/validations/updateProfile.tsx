import store from '@/redux/store';
import API from '@/services/api';
import { useFormik } from 'formik';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import * as Yup from 'yup';
import { authInterface } from '../interfaces/authInterface';

export const updateProfileUseFormik = ({ onError, onResponse }: {onError: any, onResponse: any}) => {
    
    const auth = store.getState().authSlice.auth
    const params = useParams()
    const user_id = params ? (params.user_id as string) : null

    const formik = useFormik<authInterface>({
        initialValues: {
            email: '',
            fullName: '',
            gender: '',
            number_telephone: '',
            type_photo: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
            .email('Invalid email address')
            .required('Tidak boleh kosong!'),
            fullName: Yup.string()
            .min(3, 'Minimal must 3 characters.')
            .max(20, 'Maximum only 20 characters.')
            .required('Tidak boleh kosong!'),
            number_telephone: Yup.string()
            .min(10, 'Minimal must 10 characters.')
            .max(13, 'Maximum only 13 characters.')
            .required('Tidak boleh kosong!'),
            gender: Yup.string()
            .required('Tidak boleh kosong!'),
        }),
        onSubmit: async (values: any, { resetForm }) => {

            if(user_id) {
                const body = {
                    email: values.email,
                    fullName: values.fullName,
                    gender: values.gender,
                    number_telephone: values.number_telephone,
                    type_photo: values.type_photo && values.type_photo !== '' ? values.type_photo : auth?.typePhoto
                }

                const response = await API.updateAccount({user_id, body})
                
                if(response.data.status === 200) {
                    onResponse(response.data.status)
                    resetForm()
                }else {
                    onError(response.data.message)
                }
            }else {
                onError('Invalid user id')
            }
        }
    })

    useEffect(() => {
        formik.setValues({
            email: auth ? auth.email : '',
            fullName: auth ? auth.fullName : '',
            gender: auth ? auth.gender : '',
            number_telephone: auth ? auth.number_telephone : '',
            type_photo: auth ? auth.type_photo : ''
        })
    }, [])

    return formik
}