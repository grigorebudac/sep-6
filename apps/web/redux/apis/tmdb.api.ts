import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const TmdbApi = createApi({
  reducerPath: "TmdbApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_TMDB_API_ENDPOINT}`,
    paramsSerializer: (params) => {
      console.log({ params });
      const output = new URLSearchParams(params);
      output.append("api_key", process.env.NEXT_PUBLIC_TMDB_API_KEY!);

      console.log({ out: output.toString() });
      return output.toString();
    },
  }),
  tagTypes: [],
  endpoints: () => ({}),
});
