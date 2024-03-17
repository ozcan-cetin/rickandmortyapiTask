import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/apiSlice";
import favouriteSlice from "./features/favouriteSlice";

const store = configureStore({
  reducer: {
    favourites: favouriteSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;