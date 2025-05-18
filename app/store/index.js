import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/themeSlice";
import { glucoseApi } from "../../api/services";
import { authApi } from "../../api/authServices";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "../features/userSlice";
import locationReducer from "../features/locationSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    location: locationReducer,
    [glucoseApi.reducerPath]: glucoseApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(glucoseApi.middleware)
      .concat(authApi.middleware),
});

setupListeners(store.dispatch);

export default store;
