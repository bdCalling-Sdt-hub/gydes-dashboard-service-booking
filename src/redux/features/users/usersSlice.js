import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  role: "",
  status: null,
  isSubcription: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setIsSubcription: (state, action) => {
      state.isSubcription = action.payload;
    },
  },
});

export const { setRole, setStatus, setIsSubcription } = usersSlice.actions;
export const selectRole = (state) => state.users.role;
export const selectStatus = (state) => state.users.status;
export const selectIsSubcription = (state) => state.users.isSubcription;
export default usersSlice.reducer;
