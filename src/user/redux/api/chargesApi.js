import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const chargesApi = createApi({
    reducerPath: "chargesApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/user`, credentials: "include" }),
    tagTypes: ["user"],
    endpoints: (builder) => {
        return {
            getCharges: builder.query({
                query: () => {
                    return {
                        url: "/get-all-charges",
                        method: "GET"
                    }
                },
                providesTags: ["user"]
            }),

        }
    }
})

export const {
    useGetChargesQuery
} = chargesApi
