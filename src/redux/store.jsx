import { configureStore } from "@reduxjs/toolkit";
import signUpReducer from "./slices/signUpSlice";
import { signUpApi } from "./services/signUpApi";
import { dashboardApi, dashboardReducer } from "../redux/services/dashboardApi";
import { loginReducer, loginApi } from "./services/loginApi";
// import { dashboardApi, dashboardReducer } from "./services/dashboardApi";
import {
  recommendedTrainerApi,
  recommendedTrainerReducer,
} from "./services/recommendedTrainerApi";
import { userProfileApi, userProfileReducer } from "./services/userProfileApi";
import { trainersApi, trainersReducer } from "./services/trainersApi";
import {
  assignTrainerApi,
  assignTrainerReducer,
} from "./services/assignTrainerApi";
import { workOutApi, workOutReducer } from "./services/workOutApi";
import { usersListApi, usersListReducer } from "./services/usersListApi";
import { dietaryPlanApi, dietaryPlanReducer } from "./services/dietaryPlanApi";

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
    assignTrainer: assignTrainerReducer,
    [assignTrainerApi.reducerPath]: assignTrainerApi.reducer,
    workOut: workOutReducer,
    [workOutApi.reducerPath]: workOutApi.reducer,
    usersList: usersListReducer,
    [usersListApi.reducerPath]: usersListApi.reducer,
    dietaryPlan: dietaryPlanReducer,
    [dietaryPlanApi.reducerPath]: dietaryPlanApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(signUpApi.middleware)
      .concat(loginApi.middleware)
      .concat(dashboardApi.middleware)
      .concat(recommendedTrainerApi.middleware)
      .concat(userProfileApi.middleware)
      .concat(trainersApi.middleware)
      .concat(assignTrainerApi.middleware)
      .concat(workOutApi.middleware)
      .concat(usersListApi.middleware)
      .concat(dietaryPlanApi.middleware),
});
