import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  workOutProgess: "",
  caloriesBurn: "",
  bmi: "",
  weight: "",
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: initialState,
  reducers: {
    setWorkOutProgress(state, action) {
      state.workOutProgess = action.payload;
    },
    setCaloriesBurn(state, action) {
      state.caloriesBurn = action.payload;
    },
    setBmi(state, action) {
      state.bmi = action.payload;
    },
    setWeight(state, action) {
      state.weight = action.payload;
    },
  },
});

export const { setWorkOutProgress, setCaloriesBurn, setBmi, setWeight } =
  dashboardSlice.actions;

export default dashboardSlice.reducer;
