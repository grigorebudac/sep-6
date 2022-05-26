import { Auth } from "@aws-amplify/auth";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const USER_TAG = "USER";
export const REVIEW_TAG = "REVIEW";
export const WATCH_LIST_TAG = "WATCH_LIST";

export const RootApi = createApi({
  reducerPath: "RootApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_AWS_API_ENDPOINT}`,
    prepareHeaders: async (headers) => {
      const currentSession = await Auth.currentSession();
      const token = currentSession.getIdToken().getJwtToken();

      if (token != null) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: [USER_TAG, REVIEW_TAG, WATCH_LIST_TAG],
  endpoints: () => ({}),
});
