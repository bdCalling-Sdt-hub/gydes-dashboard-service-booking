import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: "/users/my-profile",
        method: "GET",
      }),
      providesTags: [tagTypes.profile],
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/users/update-my-profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.profile],
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;
