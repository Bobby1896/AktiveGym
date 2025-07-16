import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AUTH_API } from "../apiConfig";
import { BASE_URL } from "../apiConfig";

export const dietaryPlanApi = createApi({
  reducerPath: "dietaryPlanApi",
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
  tagTypes: ["Dietary Plan"],
  endpoints: (builder) => ({
    dietaryPlan: builder.query({
      query: ({ foodType, pageNumber, pageSize, type }) => ({
        url: AUTH_API.DIETARY_PLAN,
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
        params: { pageSize, pageNumber, foodType, type },
      }),
    }),
    getDietaryById: builder.query({
      query: ({ id }) => ({
        url: `${AUTH_API.DIETARY_PLAN}/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useDietaryPlanQuery, useGetDietaryByIdQuery } = dietaryPlanApi;
export const dietaryPlanReducer = dietaryPlanApi.reducer;
