import { baseApi } from "../../api/baseApi";

const overviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotification: builder.query({
      query: () => {
        return {
          url: `/notifications/myNotifactions`,
          method: "GET",
        };
      },
    }),
    getOverview: builder.query({
      query: () => {
        return {
          url: `/users/all-user-Statistics`,
          method: "GET",
        };
      },
    }),
    getUserYearState: builder.query({
      query: ({ year }) => {
        return {
          url: `/users/all-year-user-overview`,
          method: "GET",
          params: {
            year,
          },
        };
      },
    }),
  }),
});

export const {
  useGetNotificationQuery,
  useGetOverviewQuery,
  useGetUserYearStateQuery,
} = overviewApi;
