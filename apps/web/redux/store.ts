import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/user.slice";

import { RootApi } from "./apis/root.api";
import { TmdbApi } from "./apis/tmdb.api";

export function makeStore() {
  return configureStore({
    reducer: {
      user: userReducer,
      [RootApi.reducerPath]: RootApi.reducer,
      [TmdbApi.reducerPath]: TmdbApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(RootApi.middleware, TmdbApi.middleware),
  });
}

const store = makeStore();

export default store;
