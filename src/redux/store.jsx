import { configureStore } from "@reduxjs/toolkit";
import signUpReducer from "./slices/signUpSlice";
import { signUpApi } from "./services/signUpApi";
import { loginReducer, loginApi } from "./services/loginApi";
import { dashboardReducer, dashboardApi } from "./services/DashboardApi";
import { recommendedTrainerApi, recommendedTrainerReducer } from "./services/recommendedTrainerApi";
import { userProfileApi, userProfileReducer } from "./services/userProfileApi";
import { trainersApi, trainersReducer } from "./services/trainersApi";

export const store = configureStore({
  reducer: {
    [signUpApi.reducerPath]: signUpApi.reducer,
    signUp: signUpReducer,
    [loginApi.reducerPath]: loginApi.reducer,
    login: loginReducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    dashboard: dashboardReducer,
    recommendedTrainer: recommendedTrainerReducer,
    [recommendedTrainerApi.reducerPath]: recommendedTrainerApi.reducer,
    userProfile: userProfileReducer,
    [userProfileApi.reducerPath]: userProfileApi.reducer,
    trainers: trainersReducer,
    [trainersApi.reducerPath]: trainersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(signUpApi.middleware)
      .concat(loginApi.middleware)
      .concat(dashboardApi.middleware)
      .concat(recommendedTrainerApi.middleware)
      .concat(userProfileApi.middleware)
      .concat(trainersApi.middleware),
});
