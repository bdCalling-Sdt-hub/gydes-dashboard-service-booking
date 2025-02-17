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
          ...(status?.length > 0 && { adminVerified: status }),
          ...(isSubcription?.length > 0 && { isSubcription }),
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
  }),
});

export const { useGetAllUsersQuery, useVerifedUserMutation } = UsersApi;
