import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/userApi";
import authSlice from "./slice/authSlice"
import { seatApi } from "./api/seatApi";
import { updateAngalleryApi } from "./api/updateAngalleryApi";
import { CouponApi } from "./api/CouponApi";
import { chargesApi } from "./api/chargesApi";


const reduxStore = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        [seatApi.reducerPath]: seatApi.reducer,
        [updateAngalleryApi.reducerPath]: updateAngalleryApi.reducer,
        [CouponApi.reducerPath]: CouponApi.reducer,
        [chargesApi.reducerPath]: chargesApi.reducer,
        auth: authSlice
    },

    middleware: def => [...def(),
    userApi.middleware,
    seatApi.middleware,
    updateAngalleryApi.middleware,
    chargesApi.middleware,
    CouponApi.middleware,
    ]

})

export default reduxStore