import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import orderSlice from './../features/dashboard/order/orderSlice';
import userSlice from './../features/dashboard/user/userSlice';
import deliverySlice from './../features/dashboard/delivery/deliverySlice';
import driverSlice from './../features/dashboard/driver/driverSlice';
import newsSlice from '../features/dashboard/news/newsSlice.js';
import CVSlice from './../features/dashboard/CV/CVSllice';
import homeSlice from './../features/home/homeSlice';
export const store = configureStore({
  reducer: {
    order: orderSlice,
    auth: authReducer,
    user: userSlice,
    delivery: deliverySlice,
    driver: driverSlice,
    news: newsSlice,
    CV: CVSlice,
    home: homeSlice,
  },
  devTools: process.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({ serializableCheck: false }),
  ],
});
