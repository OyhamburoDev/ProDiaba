import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    localId: null,
    imageCamera: null,
  },
  reducers: {
    setUser: (state, { payload }) => {
      console.log(payload);
      state.user = payload.user;
      state.token = payload.token;
      state.localId = payload.localId;
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
    },
    setCameraImage: (state, { payload }) => {
      state.imageCamera = payload;
    },
  },
});

export const { setUser, clearUser, setCameraImage } = authSlice.actions;

export default authSlice.reducer;
