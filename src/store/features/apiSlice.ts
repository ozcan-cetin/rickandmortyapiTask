import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = 'https://rickandmortyapi.com/api/';

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
});

const baseQueryWithReauth = async (
  args: any,
  api: any,
  extraOptions: any = {}
) => {
  const result = await baseQuery(args, api, extraOptions);
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    location: builder.query({
      query: (page) => ({
        url: `/location/?${page}`,
        method: "get",
      }),
    }),
    singleLocation: builder.query({
      query: (id) => ({
        url: `/location/${id}`,
        method: "get",
      }),
    }),
    singleCharacter: builder.query({
      query: (id) => ({
        url: `/character/${id}`,
        method: "get",
      }),
    }),
  }),
});

export const {
  useLocationQuery,
  useSingleLocationQuery,
  useSingleCharacterQuery,
} = apiSlice;
