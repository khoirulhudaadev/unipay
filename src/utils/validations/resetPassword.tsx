import { useFormik } from 'formik';
import * as Yup from 'yup';
import { authInterface } from '../interfaces/authInterface'
import API from '@/services/api';
import { useParams } from 'next/navigation';

export const resetPasswordUseFormik = ({ onError, onResponse }: {onError: any, onResponse: any}) => {
    
    const params = useParams<{token?: string}>();
    const token = params ? params.token : null;

    const formik = useFormik<authInterface>({
        initialValues: {
            password: '',
        },
        validationSchema: Yup.object({
            password: Yup.string()
            .min(8, 'Minimal 8 karakter')
            .max(20, 'Maksimal 20 karakter')
        }),
        onSubmit: async (values: any, { resetForm }) => {
            if(token) {
                const body = {
                    password: values.password
                }
                const response = await API.resetPassword({token, body})
                if(response.data.status === 200) {
                    onResponse(response.data.message)
                    resetForm()
                } else {
                    onError(response.data.message)
                }
            }else {
                onError('Invalid token reset password!')
            }
        }
    })

    return formik
}