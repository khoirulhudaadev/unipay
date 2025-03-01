import { useFormik } from 'formik';
import * as Yup from 'yup';
import toRupiah from '../../helpers/toRupiah';
import store from '../../redux/store';
import API from '../../services/api';
import { paymentInterface } from '../interfaces/paymentInterface';

export const paymentWithdrawUseFormik = ({onError, onResponse}: {onError?: any, onResponse?: any}) => {

    const auth = store.getState().authSlice.auth

    const formik = useFormik<paymentInterface>({
        initialValues: {
            bank_code: '',
            account_number: 0,
            amount: 0,
            classRoom: ''
        },
        validationSchema: Yup.object({
            bank_code: Yup.string()
            .required(),
            account_number: Yup.number()
            .max(9999999999999999, 'Maksimal 16 karakter.')
            .min(9999999999, 'Minimal 10 karakter.')
            .required(),
            amount: Yup.number()
            .min(9999, 'Minimal nominal Rp. 10.000.')
            .required(),
            classRoom: Yup.string()
            .required('Tidak boleh kosong!')
        }),
        onSubmit: async (values: any, {resetForm}) => {
            try {
                const data = {
                    fullName: auth ? auth.fullName : '',
                    number_telephone: auth ? auth.number_telephone : '',
                    email: auth ? auth.email : '',
                    description: `Withdraw`,
                    typePayment: localStorage.getItem('typePayment') ?? '',
                    note: 'Pencairan saldo unipay',
                    classRoom: values.classRoom,
                    channelCode: values.bank_code,
                    accountNumber: values.account_number,
                    amount: values.amount,
                    NIM: auth ? auth.NIM : '',
                    prodi: auth ? auth.prodi : '',
                    year: auth ? auth.year : '',
                    accountHolderName: auth ? auth.fullName : '',
                }

                if (auth?.balance >= 10000 && values.amount > auth?.balance) {
                    formik.setErrors({ amount: `Pencairan maksimal ${toRupiah(auth?.balance)}` });
                    return; 
                }else if(values.amount < 9999) {
                    formik.setErrors({ amount: 'Pencairan minimal Rp. 10.000' })
                    return; 
                }else if(auth?.balance < 9999) {
                    formik.setErrors({ amount: 'Saldo tidak cukup!' })
                    return; 
                }

                const response = await API.disbursement(data)
                if(response.data.message === "Pencairan berhasil!") {
                    resetForm()
                    onResponse(response.data.status)
                } else {
                    onError(response.data.message)
                }

            } catch (error: any) {
                onError(error.data.message)
            }
        }
    })

    return formik
}