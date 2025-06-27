import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  membershipId: "",
  membershipPlan: "",
  email: "",
  gender: "",
};

export const userProfileSlice = createSlice({
  name: "userProfile",
  initialState: initialState,
  reducers: {
    setFullName(state, action) {
      state.fullName = action.payload;
    },
    setMembershipId(state, action) {
      state.membershipId = action.payload;
    },
    setMembershipPlan(state, action) {
      state.membershipPlan = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
    setGender(state, action) {
      state.gender = action.payload;
    },
  },
});

export const {
  setEmail,
  setFullName,
  setGender,
  setMembershipId,
  setMembershipPlan,
} = userProfileSlice.actions;

export default userProfileSlice.reducer;
