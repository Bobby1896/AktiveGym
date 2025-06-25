import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AUTH_API } from "../apiConfig";
import { BASE_URL } from "../apiConfig";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
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
  tagTypes: ["Dashboard"],
  endpoints: (builder) => ({
    dashboard: builder.query({
      query: () => ({
        url: AUTH_API.DASHBOARD,
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
        
      }),
    }),
  }),
});

export const { useDashboardQuery } = dashboardApi;
export const dashboardReducer = dashboardApi.reducer;
