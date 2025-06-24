import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
};

export const signUpSlice = createSlice({
  name: "signUp",
  initialState: initialState,
  reducers: {
    setFirstName(state, action) {
      state.firstName = action.payload;
    },
    setLastName(state, action) {
      state.lastName = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
    setConfirmPassword(state, action) {
      state.confirmPassword = action.payload;
    },
    setPhoneNumber(state, action) {
      state.phoneNumber = action.payload;
    },
    setAddress(state, action) {
      state.address = action.payload;
    },
    setCity(state, action) {
      state.city = action.payload;
    },
    setState(state, action) {
      state.state = action.payload;
    },
    setZipCode(state, action) {
      state.zipCode = action.payload;
    },
  },
});

export const {
  setFirstName,
  setLastName,
  setEmail,
  setPassword,
  setConfirmPassword,
  setPhoneNumber,
  setAddress,
  setCity,
  setState,
  setZipCode,
} = signUpSlice.actions;

export default signUpSlice.reducer;