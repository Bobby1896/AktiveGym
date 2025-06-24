import { configureStore } from "@reduxjs/toolkit";
import signUpReducer from "./slices/signUpSlice";
import { signUpApi } from "./services/signUpApi";
import { loginReducer } from "./services/loginApi";
import { loginApi } from "./services/loginApi";

export const store = configureStore({
  reducer: {
    [signUpApi.reducerPath]: signUpApi.reducer,
    signUp: signUpReducer,
    [loginApi.reducerPath]: loginApi.reducer,
    login: loginReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(signUpApi.middleware)
      .concat(loginApi.middleware),
});
