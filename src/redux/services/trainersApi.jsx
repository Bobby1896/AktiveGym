import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AUTH_API } from "../apiConfig";
import { BASE_URL } from "../apiConfig";

export const trainersApi = createApi({
  reducerPath: "trainersApi",
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
  tagTypes: ["Trainers"],
  endpoints: (builder) => ({
    trainers: builder.query({
      query: () => ({
        url: AUTH_API.TRAINERS,
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
        
      }),
    }),
  }),
});

export const { useTrainersQuery} = trainersApi;
export const trainersReducer = trainersApi.reducer;
