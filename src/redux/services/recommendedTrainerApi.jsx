import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AUTH_API } from "../apiConfig";
import { BASE_URL } from "../apiConfig";

export const recommendedTrainerApi = createApi({
  reducerPath: "recommendedTrainerApi",
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
  tagTypes: ["Recommended Trainer"],
  endpoints: (builder) => ({
    recommendedTrainer: builder.query({
      query: () => ({
        url: AUTH_API.RECOMMENDED_TRAINER,
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
        
      }),
    }),
  }),
});

export const { useRecommendedTrainerQuery } = recommendedTrainerApi;
export const recommendedTrainerReducer = recommendedTrainerApi.reducer;
