import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AUTH_API } from "../apiConfig";
import { BASE_URL } from "../apiConfig";

export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["Login"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        // mode: "no-cors",
        url: AUTH_API.LOGIN,
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = loginApi;
export const loginReducer = loginApi.reducer;
