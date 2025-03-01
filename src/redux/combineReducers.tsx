// reducers/index.js
import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import paymentSlice from './paymentSlice';

const rootReducer = combineReducers({
    authSlice,
    paymentSlice
});

export default rootReducer;
