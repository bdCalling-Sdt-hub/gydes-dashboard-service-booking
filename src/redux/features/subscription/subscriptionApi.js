import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addSubscription: builder.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: "/subscription/create",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: [tagTypes.subscription],
    }),
    getSubscription: builder.query({
      query: () => ({
        url: "/subscription",
        method: "GET",
      }),
      providesTags: [tagTypes.subscription],
    }),
    updateSubscription: builder.mutation({
      query: ({ id, data }) => ({
        url: `/subscription/${id}/update`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.subscription],
    }),
    deleteSubscription: builder.mutation({
      query: ({ id }) => ({
        url: `/subscription/${id}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.subscription],
    }),
  }),
});

export const {
  useAddSubscriptionMutation,
  useGetSubscriptionQuery,
  useUpdateSubscriptionMutation,
  useDeleteSubscriptionMutation,
} = subscriptionApi;
