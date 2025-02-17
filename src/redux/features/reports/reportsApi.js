import { baseApi } from "../../api/baseApi";

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
    }),
  }),
});

export const { useGetReportsQuery } = reportsApi;
