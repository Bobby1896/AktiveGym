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
        params: { type },
      }),
    }),
    updateWorkoutProgress: builder.mutation({
      query: ({ exercise, flag }) => ({
        url: `${AUTH_API.WORKOUT}?exercise=${exercise}&flag=${flag}`,
        method: "PUT",
      }),
    }),
  }),
});

export const { useWorkOutQuery, useUpdateWorkoutProgressMutation } = workOutApi;
export const { workOutReducer } = workOutApi.reducer;
