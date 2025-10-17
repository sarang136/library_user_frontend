import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const CouponApi = createApi({
    reducerPath: "CouponApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/user`, credentials: "include" }),

    tagTypes: ["user"],
    endpoints: (builder) => {
        return {
            getCoupons: builder.query({
                query: () => {
                    return {
                        url: "/get-allocated-coupens",
                        method: "GET"
                    }
                },
                providesTags: ["user"]
            }),

            redeemCoupon: builder.mutation({
                query: ({ coupenId }) => {
                    return {
                        url: `/redeem/${coupenId}`,
                        method: "POST",
                        // body: redeemData,
                    }
                },
                providesTags: ["user"]
            }),


        }
    }
})

export const {
    useGetCouponsQuery,
    useRedeemCouponMutation
} = CouponApi
