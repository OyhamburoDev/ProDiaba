import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  longitude: null,
  latitude: null,
  address: null,
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
    setAddress: (state, action) => {
      state.address = action.payload.address;
    },
  },
});

export const { setLocation, clearLocation, setAddress } = locationSlice.actions;
export default locationSlice.reducer;
