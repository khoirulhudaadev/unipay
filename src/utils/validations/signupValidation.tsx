import { useFormik } from 'formik';
import * as Yup from 'yup';
import { authInterface } from '../interfaces/authInterface'
import API from '@/services/api';

export const signupUseFormik = ({ onError, onResponse }: {onError: any, onResponse: any}) => {

    const formik = useFormik<authInterface>({
        initialValues: {
            email: '',
            password: '',
            fullName: '',
            NIK: '',
            NIM: '',
            gender: '',
            number_telephone: '',
            prodi: '',
            accountNumber: '',
            year: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
            .email('Invalid email address')
            .required('Tidak boleh kosong!'),
            password: Yup.string()
            .min(8, 'Minimal 8 karakter')
            .max(20, 'Maksimal 20 karakter')
            .required('Tidak boleh kosong!'),
            fullName: Yup.string()
            .min(3, 'Minimal 3 karakter')
            .max(20, 'Maksimal 20 karakter')
            .required('Tidak boleh kosong!'),
            NIK: Yup.string()
            .max(16, 'Maksimal 16 karakter')
            .required('Tidak boleh kosong!'),
            NIM: Yup.string()
            .max(8, 'Maksimal 8 karakter')
            .required('Tidak boleh kosong!'),
            number_telephone: Yup.string()
            .min(10, 'Minimal 10 karakter')
            .max(13, 'Maksimal 13 karakter')
            .required('Tidak boleh kosong!'),
            prodi: Yup.string()
            .required('Tidak boleh kosong!'),
            accountNumber: Yup.string()
            .min(10, 'Minimal 10 karakter')
            .max(15, 'Maksimal 15 karakter')
            .required('Tidak boleh kosong!'),
            year: Yup.string()
            .min(4, 'Minimal 4 karakter')
            .max(4, 'Maksimal 4 karakter')
            .required('Tidak boleh kosong!'),
        }),
        onSubmit: async (values: any, { resetForm }) => {
            const response = await API.signUp(values)
            
            if(response.data.status === 200) {
                onResponse(response.data.status)
                resetForm()
            }else {
                onError(response.data.message)
            }
        }
    })

    return formik
}