import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL = "https://glucose-tracker-mobile-default-rtdb.firebaseio.com/";

export const glucoseApi = createApi({
  reducerPath: "glucoseApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  tagTypes: ["profileImageGet", "userLocation"],
  endpoints: (builder) => ({
    getControles: builder.query({
      query: (localId) => `glucoseMonitor/${localId}.json`,
    }),
    addNewControl: builder.mutation({
      query: ({ fecha, control, localId }) => ({
        url: `glucoseMonitor/${localId}/${fecha}.json`,
        method: "POST",
        body: control,
      }),
    }),
    getProfileImage: builder.query({
      query: (localId) => `profileImages/${localId}.json`,
      providesTags: ["profileImageGet"],
    }),
    postProfileImage: builder.mutation({
      query: ({ image, localId }) => ({
        url: `profileImages/${localId}.json`,
        method: "PUT",
        body: { image },
      }),
      invalidatesTags: ["profileImageGet"],
    }),
    //obetener la localización de firebase
    getUserLocation: builder.query({
      query: (localId) => `locations/${localId}.json`,
      providesTags: ["userLocation"],
    }),
    postUserLocation: builder.mutation({
      query: ({ localId, location }) => ({
        url: `locations/${localId}.json`,
        method: "PUT",
        body: location,
      }),
      invalidatesTags: ["userLocation"],
    }),
    deleteUserLocation: builder.mutation({
      query: (localId) => ({
        url: `locations/${localId}.json`,
        method: "DELETE",
      }),
      invalidatesTags: ["userLocation"],
    }),
  }),
});

export const {
  useGetControlesQuery,
  useAddNewControlMutation,
  useGetProfileImageQuery,
  usePostProfileImageMutation,
  useGetUserLocationQuery,
  usePostUserLocationMutation,
  useDeleteUserLocationMutation,
} = glucoseApi;
