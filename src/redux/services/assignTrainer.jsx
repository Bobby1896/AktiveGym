import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AUTH_API } from "../apiConfig";
import { BASE_URL } from "../apiConfig";

export const assignTrainerApi = createApi({
  reducerPath: "assignTrainerApi",
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
  tagTypes: ["Assign Trainer"],
  endpoints: (builder) => ({
    assignTrainer: builder.mutation({
      query: ({ trainerId }) => ({
        url: AUTH_API.ASSIGN_TRAINER,
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        params: { trainerId },
      }),
    }),
  }),
});

export const { useAssignTrainerMutation } = assignTrainerApi;
export const assignTrainerReducer = assignTrainerApi.reducer;
