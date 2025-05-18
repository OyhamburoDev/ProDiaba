import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL = "https://glucose-tracker-mobile-default-rtdb.firebaseio.com/";

export const glucoseApi = createApi({
  reducerPath: "glucoseApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  tagTypes: ["profileImageGet"],
  endpoints: (builder) => ({
    getControles: builder.query({
      query: () => "glucoseMonitor.json",
    }),
    addNewControl: builder.mutation({
      query: ({ fecha, control }) => ({
        url: `glucoseMonitor/${fecha}.json`,
        method: "POST",
        body: control,
      }),
    }),
    getProfileImage: builder.query({
      query: (localId) => `profileImages/${localId}.json`,
      providesTags: ["profileImageGet"],
    }),
    postProfileImage: builder.mutation({
      query: (image, localId) => ({
        url: `profileImages/${localId}.json`,
        method: "PUT",
        body: { image },
      }),
      invalidatesTags: ["profileImageGet"],
    }),
  }),
});

export const {
  useGetControlesQuery,
  useAddNewControlMutation,
  useGetProfileImageQuery,
  usePostProfileImageMutation,
} = glucoseApi;
