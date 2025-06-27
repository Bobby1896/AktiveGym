import { configureStore } from "@reduxjs/toolkit";
import signUpReducer from "./slices/signUpSlice";
import { signUpApi } from "./services/signUpApi";
import { loginReducer } from "./services/loginApi";
import { loginApi } from "./services/loginApi";
import { dashboardReducer } from "./services/DashboardApi";
import { dashboardApi } from "./services/DashboardApi";
import { recommendedTrainerApi } from "./services/recommendedTrainerApi";
import { recommendedTrainerReducer } from "./services/recommendedTrainerApi";
import { userProfileApi } from "./services/userProfileApi";
import { userProfileReducer } from "./services/userProfileApi";

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
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(signUpApi.middleware)
      .concat(loginApi.middleware)
      .concat(dashboardApi.middleware)
      .concat(recommendedTrainerApi.middleware)
      .concat(userProfileApi.middleware),
});
