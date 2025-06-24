import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    email: "",
    password: "",
};

export const loginSlice = createSlice({
   name: "login",
   initialState: initialState,
   reducers:{
    setEmail(state, action){
        state.email = action.payload;
    },
    setPassword(state, action){
        state.password = action.payload;
    }
   }
});

export const {
    setEmaail,
    setPassword,
} = loginSlice.actions

export default loginSlice.reducer