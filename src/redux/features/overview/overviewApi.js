import { baseApi } from "../../api/baseApi";

const overviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOverview: builder.query({
      query: () => {
        return {
          url: `/users/all-user-overview`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetOverviewQuery } = overviewApi;
