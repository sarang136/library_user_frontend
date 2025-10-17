import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const seatApi = createApi({
    reducerPath: "seatApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/user`, credentials: "include" }),
    tagTypes: ["user"],
    endpoints: (builder) => {
        return {
            getAllSeats: builder.query({
                query: () => {
                    return {
                        url: "/get-all-seats",
                        method: "GET"
                    }
                },
                providesTags: ["user"],

            }),
            getSlots: builder.query({
                query: () => {
                    return {
                        url: "/get-timeslots",
                        method: "GET"
                    }
                },
                providesTags: ["user"],

            }),
            getAddons: builder.query({
                query: () => {
                    return {
                        url: "/get-all-addons",
                        method: "GET"
                    }
                },
                providesTags: ["user"],

            }),
            MyActiveBookings: builder.query({
                query: () => {
                    return {
                        url: "/my-active-bookings",
                        method: "GET"
                    }
                },
                providesTags: ["user"]
            }),
            BookSeat: builder.mutation({
                query: ({ seatId, bookingData }) => ({
                    url: `/book-seats/${seatId}`,
                    method: "POST",
                    body: bookingData,
                }),
                invalidatesTags: ["user"]
            }),


        }
    }
})

export const {
    useBookSeatMutation,
    useGetAllSeatsQuery,
    useMyActiveBookingsQuery,
    useGetSlotsQuery,
    useGetAddonsQuery
} = seatApi
