import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AUTH_API } from "../apiConfig";
import { BASE_URL } from "../apiConfig";

export const usersListApi = createApi({
  reducerPath: "usersListApi",
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
  tagTypes: ["Users List"],
  endpoints: (builder) => ({
    usersList: builder.query({
      query: () => ({
        url: AUTH_API.USERS_LIST,
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      }),
    }),
  }),
});

export const { useUsersListQuery } = usersListApi;
export const usersListReducer = usersListApi.reducer;
