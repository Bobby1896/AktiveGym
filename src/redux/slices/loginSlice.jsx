import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    email: "",
    password: "",
    userRole: null,
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
    },
    setUserRole(state, action){
        state.userRole = action.payload;
    }
   }
});

export const {
    setEmaail,
    setPassword,
    setUserRole
} = loginSlice.actions

export default loginSlice.reducer