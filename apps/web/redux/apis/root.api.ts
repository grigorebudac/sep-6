import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { User } from "types";

export const RootApi = createApi({
  reducerPath: "RootApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_AWS_API_ENDPOINT}`,
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getCurrentUser: builder.query<User.User, void>({
      query: () => {
        return `/getUser`;
      },
    }),
  }),
});

export const { useGetCurrentUserQuery } = RootApi;
