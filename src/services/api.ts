import api from './axios';

const API = {

    // Account student
    signiIn: (body: any) => {
        return api.post('/account/signin/', body)
    },
    signUp: (body: any) => {
        return api.post('/account/signup', body)
    },
    updateAccount: ({user_id, body}: {user_id: string, body: any}) => {
        return api.put(`/account/${user_id}`, body)
    },
    getAccountById: (user_id: string) => {
        return api.get(`/account/user/${user_id}`)
    },
    getAllUser: () => {
        return api.get(`/account/list/user`)
    },

    // reset-password
    sendEmailResetPassword: (body: any) => {
        return api.post('/account/forgot-password', body)
    },
    resetPassword: ({token, body}: {token: string, body: any}) => {
        return api.put(`/account/reset-password/${token}`, body)
    },

    // payment
    topUp: (body: any) => {
        return api.post('/payment/top-up', body)
    },
    transfer: (body: any) => {
        return api.post('/payment/create', body)
    },
    disbursement: (body: any) => {
        return api.post('/payment/withdraw', body)
    },
    getAllHistoryPayments: (body?: {}) => {
        return api.get('/payment/history', body)
    },
    getAllPayments: () => {
        return api.get('/payment/')
    },
}

export default API;