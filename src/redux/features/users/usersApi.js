import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const UsersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: ({ page, searchTerm, limit, role, status, isSubcription }) => ({
        url: "/users/all-users",
        method: "GET",
        params: {
          page,
          searchTerm,
          limit,
          ...(role?.length > 0 && { role }),
          ...(status !== null && { adminVerified: status }),
          ...(isSubcription !== null && { isSubcription }),
        },
      }),
      providesTags: [tagTypes.users],
    }),
    verifedUser: builder.mutation({
      query: ({ id }) => ({
        url: `/users/verifyUser/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.users],
    }),
    blockUser: builder.mutation({
      query: ({ id }) => ({
        url: `/users/block/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.users],
    }),
    unBlockUser: builder.mutation({
      query: ({ id }) => ({
        url: `/users/unBlock/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.users],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useVerifedUserMutation,
  useBlockUserMutation,
  useUnBlockUserMutation,
} = UsersApi;
