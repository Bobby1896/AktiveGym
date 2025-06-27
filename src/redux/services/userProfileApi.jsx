import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AUTH_API } from "../apiConfig";
import { BASE_URL } from "../apiConfig";

export const userProfileApi = createApi({
  reducerPath: "userProfileApi",
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
  tagTypes: ["User Profile"],
  endpoints: (builder) => ({
    userProfile: builder.query({
      query: () => ({
        url: AUTH_API.USER_PROFILE,
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      }),
    }),
  }),
});

export const { useUserProfileQuery } = userProfileApi;
export const userProfileReducer = userProfileApi.reducer;
