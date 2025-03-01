import { useFormik } from 'formik'
import * as Yup from 'yup'
import { paymentInterface } from '../interfaces/paymentInterface'
import API from '@/services/api'
import store from '@/redux/store'
import { toRupiah } from '@/helpers'

export const paymentAdminUseFormik = ({ onError, onResponse }: {onError: any, onResponse: any}) => {

    const auth = store.getState().authSlice.auth
    const payment = store.getState().paymentSlice.systemPayment?.[0]
    
    const formik = useFormik<paymentInterface>({
        initialValues: {
            amount: 0,  
            note: '',
            code: ''
        },
        validationSchema: Yup.object({
            amount: Yup.number()
            .required('Tidak boleh kosong!'),
            note: Yup.string()
            .required('Tidak boleh kosong!')
        }),
        onSubmit: async (values: any, { resetForm }) => {

            const data = {
                amount: values.amount,
                fullName: auth ? auth.fullName : '',
                number_telephone: auth ? auth.number_telephone : '',
                email: auth ? auth.email : '',
                description: `Administrasi`,
                typePayment: localStorage.getItem('typePayment') ?? '',
                year: auth ? auth.year : '',
                NIM: auth ? auth.NIM : '',
                to: 'Admin kampus',
                note: values.note,
                prodi: auth ? auth.prodi: '',
                classRoom: values.classRoom,
                code: values.code
            }

            let nominal = payment && payment.length > 0 ? payment.filter((data: any) => data.type_payment === localStorage.getItem('typePayment')) : [{ minimum_payment: 100000 }]
            
            if (auth?.balance >= 10000 && values.amount > auth?.balance) {
                formik.setErrors({ amount: `Pengiriman maksimal ${toRupiah(auth?.balance)}` });
                return; 
            }else if(values.amount < (nominal[0]?.minimum_payment)) {
                formik.setErrors({ amount: `Pengiriman minimal ${toRupiah(nominal[0].minimum_payment)}` })
                return; 
            }else if(auth?.balance === 0) {
                formik.setErrors({ amount: 'Saldo tidak cukup!' })
                return; 
            }

            const response = await API.transfer(data)
            
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