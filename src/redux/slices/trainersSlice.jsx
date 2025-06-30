import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  speciality: "",
  rating: "",
};

export const trainersSlice = createSlice({
  name: "trainers",
  initialState: initialState,
  reducers: {
    setFullName(state, action) {
      state.fullName = action.payload;
    },
    setSpeciality(state, action) {
      state.speciality = action.payload;
    },
    setRating(state, action) {
      state.rating = action.payload;
    },
  },
});

export const { setFullName, setRating, setSpeciality } =
  trainersSlice.actions;

export default trainersSlice.reducer;
