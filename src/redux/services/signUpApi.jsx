import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AUTH_API } from "../apiConfig";
import { BASE_URL } from "../apiConfig";

export const signUpApi = createApi({
  reducerPath: "signUpApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["SignUp"],
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (credentials) => ({
        url: AUTH_API.SIGNUP,
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useSignUpMutation } = signUpApi;
export const signUpReducer = signUpApi.reducer;
