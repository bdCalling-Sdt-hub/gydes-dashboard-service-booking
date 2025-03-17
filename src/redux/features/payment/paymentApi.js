import { baseApi } from "../../api/baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPayment: build.query({
      query: ({ page, limit, amount, paymentType }) => ({
        url: `/payments`,
        params: {
          page,
          limit,
          sortField: "amount",
          sortOrder: amount,
          paymentType,
        },
      }),
    }),
    paymentOverview: build.query({
      query: ({ year }) => {
        return {
          url: `/payments/paymentOverview`,
          method: "GET",
          params: {
            year,
          },
        };
      },
    }),
  }),
});

export const { useGetPaymentQuery, usePaymentOverviewQuery } = paymentApi;
