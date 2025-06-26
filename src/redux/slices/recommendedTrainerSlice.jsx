import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  speciality: "",
  rating: "",
};

export const recommendedTrainerSlice = createSlice({
  name: "recommendedTrainer",
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
  recommendedTrainerSlice.actions;

export default recommendedTrainerSlice.reducer;
