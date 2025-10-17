import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const updateAngalleryApi = createApi({
    reducerPath: "updateAngalleryApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/user`, credentials: "include" }),
    tagTypes: ["user"],
    endpoints: (builder) => {
        return {
            getUpdates: builder.query({
                query: () => {
                    return {
                        url: "/get-updates",
                        method: "GET"
                    }
                },
                providesTags: ["user"]
            }),
            getGallery: builder.query({
                query: () => {
                    return {
                        url: "/get-gallery",
                        method: "GET"
                    }
                },
                providesTags: ["user"]
            }),


        }
    }
})

export const {
    useGetUpdatesQuery,
    useGetGalleryQuery
} = updateAngalleryApi
