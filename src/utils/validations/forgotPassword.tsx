import API from '@/services/api';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { authInterface } from '../interfaces/authInterface';

export const forgotPasswordUseFormik = ({ onError, onResponse }: { onError: any, onResponse: any }) => {
    const formik = useFormik<authInterface>({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Format email tidak sesuai')
                .required('Tidak boleh kosong!'),
        }),
        onSubmit: async (values: any, { resetForm }) => {
            const response = await API.sendEmailResetPassword(values)
            console.log('res', response)
            if (response.data.status === 200 || response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: "Berhasil",
                    html: 'Periksa pesan email anda!',
                    showCancelButton: false,
                    showConfirmButton: false,
                    customClass: {
                        popup: "!rounded-[12px] !bg-white !w-[30rem] !py-[2rem] !overflow-hidden",
                        icon: "!mt-0",
                        title: "!pt-[5px] !text-size-md font-700",
                        htmlContainer: "!pt-[5px] !pb-[1rem] !my-0",
                        timerProgressBar: "!bg-Neutrals-300",
                    },
                    timer: 2000,
                    timerProgressBar: true,
                });
                onResponse()
                resetForm()
            } else {
                Swal.fire({
                    icon: 'error',
                    title: "Gagal",
                    html: response.data.message,
                    showCancelButton: false,
                    showConfirmButton: false,
                    customClass: {
                        popup: "!rounded-[12px] !bg-white !w-[30rem] !py-[2rem] !overflow-hidden",
                        icon: "!mt-0",
                        title: "!pt-[5px] !text-size-md font-700",
                        htmlContainer: "!pt-[5px] !pb-[1rem] !my-0",
                        timerProgressBar: "!bg-Neutrals-300",
                    },
                    timer: 2000,
                    timerProgressBar: true,
                });
                onError(response.data.message)
            }
        }
    })

    return formik
}