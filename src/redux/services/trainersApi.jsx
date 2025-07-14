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
      query: ({ pageSize, pageNumber, searchQuery, category }) => ({
        url: AUTH_API.TRAINERS,
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
        params: { pageSize, pageNumber, searchQuery, category },
      }),
    }),
    getTrainerById: builder.query({
      query: ({ id }) => ({
        url: `${AUTH_API.TRAINERS}/${id}`,
        method: "GET",
      }),
    }),
    addTrainer: builder.mutation({
      query: (trainerData) => ({
        url: AUTH_API.TRAINERS,
        method: "POST",
        body: trainerData,
      }),
    }),
    deleteTrainer: builder.mutation({
      query: ({ id }) => ({
        url: `${AUTH_API.TRAINERS}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useTrainersQuery,
  useGetTrainerByIdQuery,
  useAddTrainerMutation,
  useDeleteTrainerMutation,
} = trainersApi;
export const trainersReducer = trainersApi.reducer;
