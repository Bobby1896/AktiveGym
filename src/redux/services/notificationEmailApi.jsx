import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AUTH_API } from "../apiConfig";
import { BASE_URL } from "../apiConfig";

export const notificationEmailApi = createApi({
  reducerPath: "notificationEmailApi",
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
  tagTypes: ["notification Email"],
  endpoints: (builder) => ({
    notificationEmail: builder.mutation({
      query: (body) => ({
        url: AUTH_API.SEND_EMAIL,
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body,
      }),
    }),
    getNotificationEmailById: builder.query({
      query: ({ id }) => ({
        url: `${AUTH_API.GET_ALL_EMAIL}/${id}`,
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      }),
    }),
    getAllNotificationEmail: builder.query({
      query: () => ({
        url: AUTH_API.GET_ALL_EMAIL,
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      }),
    }),
  }),
});

export const {
  useNotificationEmailMutation,
  useGetAllNotificationEmailQuery,
  useGetNotificationEmailByIdQuery,
} = notificationEmailApi;
export const notificationEmailReducer = notificationEmailApi.reducer;
