import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "",
  paymentGateway: "",
};

const withdrawSlice = createSlice({
  name: "withdraw",
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setPaymentGateway: (state, action) => {
      state.paymentGateway = action.payload;
    },
  },
});

export const { setStatus, setPaymentGateway } = withdrawSlice.actions;
export const selectStatus = (state) => state.withdraw.status;
export const selectPaymentGateway = (state) => state.withdraw.paymentGateway;
export default withdrawSlice.reducer;
