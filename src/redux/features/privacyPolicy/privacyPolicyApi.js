import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const privacyPolicyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPrivacy: builder.query({
      query: () => ({
        url: "/privacyPolicy",
        method: "GET",
      }),
      providesTags: [tagTypes.privacyPolicy],
    }),
    updatePrivacy: builder.mutation({
      query: (data) => ({
        url: "/privacyPolicy",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [tagTypes.privacyPolicy],
    }),
  }),
});

export const { useGetPrivacyQuery, useUpdatePrivacyMutation } =
  privacyPolicyApi;
