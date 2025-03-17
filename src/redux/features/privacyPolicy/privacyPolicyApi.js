import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const privacyPolicyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPrivacy: builder.query({
      query: () => ({
        url: "/settings/privacy",
        method: "GET",
      }),
      providesTags: [tagTypes.privacyPolicy],
    }),
    getTermsAndConditions: builder.query({
      query: () => ({
        url: "/settings/termAndConditions",
        method: "GET",
      }),
      providesTags: [tagTypes.privacyPolicy],
    }),
    updatePrivacy: builder.mutation({
      query: (data) => ({
        url: "/settings",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [tagTypes.privacyPolicy],
    }),
  }),
});

export const {
  useGetPrivacyQuery,
  useGetTermsAndConditionsQuery,
  useUpdatePrivacyMutation,
} = privacyPolicyApi;
