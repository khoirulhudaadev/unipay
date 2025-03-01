import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { paymentInterface } from "../utils/interfaces/paymentInterface";

interface payment {
    payment: paymentInterface[],
    balance: number,
    systemPayment: any[]
}

const initialState: payment = {
    payment: [],
    balance: 0,
    systemPayment: []
}

const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        getAllPaymentByShop: (state, action: PayloadAction<paymentInterface>) => {
            state.payment = [action.payload];
        },
        getBalance: (state, action: PayloadAction<number>) => {
            state.balance = action.payload
        },
        getSystemPayment: (state, action: PayloadAction<number>) => {
            state.systemPayment = [action.payload]
        }
    }
})

export const { getAllPaymentByShop, getBalance, getSystemPayment } = paymentSlice.actions
export default paymentSlice.reducer