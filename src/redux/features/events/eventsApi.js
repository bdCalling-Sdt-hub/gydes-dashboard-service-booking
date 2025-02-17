import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const eventsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllEvents: builder.query({
      query: ({ page, searchTerm, limit }) => ({
        url: "/event/all-events",
        method: "GET",
        params: {
          page,
          searchTerm,
          limit,
        },
      }),
      providesTags: [tagTypes.events],
    }),
    deleteEvent: builder.mutation({
      query: ({ id }) => ({
        url: `/event/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.events],
    }),
  }),
});

export const { useGetAllEventsQuery, useDeleteEventMutation } = eventsApi;
