import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/themeSlice";
import { glucoseApi } from "../../api/services";

export default configureStore({
  reducer: {
    theme: themeReducer,
    [glucoseApi.reducerPath]: glucoseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(glucoseApi.middleware),
});
