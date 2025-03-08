import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const reportsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getReports: build.query({
      query: ({ page, searchTerm, limit }) => ({
        url: `/report/allReport`,
        params: {
          page,
          searchTerm,
          limit,
        },
      }),
      providesTags: [tagTypes.reports],
    }),
    warUser: build.mutation({
      query: ({ data, id }) => ({
        url: `/report/warn/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.reports],
    }),
    banUser: build.mutation({
      query: ({ data, id }) => ({
        url: `/report/ban/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.reports],
    }),
  }),
});

export const { useGetReportsQuery, useWarUserMutation, useBanUserMutation } =
  reportsApi;
