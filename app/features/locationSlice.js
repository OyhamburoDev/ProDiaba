import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  longitude: null,
  latitude: null,
};

const locationSlice = createSlice({
  name: "location", //Nombre del slice
  initialState, // Estado inicial
  reducers: {
    setLocation: (state, action) => {
      state.longitude = action.payload.longitude;
      state.latitude = action.payload.latitude;
    },
    clearLocation: (state) => {
      state.longitude = null;
      state.latitude = null;
    },
  },
});

export const { setLocation, clearLocation } = locationSlice.actions;
export default locationSlice.reducer;
