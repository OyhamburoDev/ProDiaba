import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL = "https://glucose-tracker-mobile-default-rtdb.firebaseio.com/";

export const glucoseApi = createApi({
  reducerPath: "glucoseApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
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
  }),
});

export const { useGetControlesQuery, useAddNewControlMutation } = glucoseApi;
