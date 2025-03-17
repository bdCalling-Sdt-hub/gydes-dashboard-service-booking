import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  amount: "",
  paymentType: "",
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPayment: (state, action) => {
      state.amount = action.payload;
    },
    setPaymentType: (state, action) => {
      state.paymentType = action.payload;
    },
  },
});

export const { setPayment, setPaymentType } = paymentSlice.actions;
export const selectPayment = (state) => state.payment.amount;
export const selectPaymentType = (state) => state.payment.paymentType;

export default paymentSlice.reducer;
