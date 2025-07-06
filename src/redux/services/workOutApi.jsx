import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AUTH_API } from "../apiConfig";
import { BASE_URL } from "../apiConfig";

export const workOutApi = createApi({
  reducerPath: "workOutApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["WorkOut"],
  endpoints: (builder) => ({
    workOut: builder.query({
      query: (type) => ({
        url: AUTH_API.WORKOUT,
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
        params: {type},
      }),
    }),
  }),
});

export const { useWorkOutQuery } = workOutApi;
export const workOutReducer  = workOutApi.reducer;
