import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const withdrawApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getWithdraw: build.query({
      query: ({ page, limit, status, paymentGateway }) => ({
        url: `/withdraw-requests`,
        params: {
          page,
          limit,
          status,
          paymentGateway,
        },
      }),
      providesTags: [tagTypes.withdraw],
    }),
    updateWithdraw: build.mutation({
      query: ({ id, data }) => ({
        url: `withdraw-requests/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.withdraw],
    }),
  }),
});

export const { useGetWithdrawQuery, useUpdateWithdrawMutation } = withdrawApi;
