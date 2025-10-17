import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/user`, credentials: "include" }),
    tagTypes: ["user"],
    endpoints: (builder) => {
        return {
            registerUser: builder.mutation({
                query: userData => {
                    return {
                        url: "/register",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["user"]
            }),

            SendOtp: builder.mutation({
                query: userData => {
                    return {
                        url: "/send-otp",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["user"]
            }),

            loginUser: builder.mutation({
                query: userData => ({
                    url: "/login",
                    method: "POST",
                    body: userData
                }),
                invalidatesTags: ["user"],

            }),

            logoutUser: builder.mutation({
                query: userData => ({
                    url: "/logout",
                    method: "POST",
                    body: userData
                }),
                invalidatesTags: ["user"],

            }),
            updateProfile :builder.mutation({
                query:(data)=>({
                    url:"/edit-profile",
                    method:"PATCH",
                    body:data
                })
            })
        }
    }
})

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useSendOtpMutation,
    useLogoutUserMutation,
    useUpdateProfileMutation
} = userApi
