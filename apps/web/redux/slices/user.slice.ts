import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppThunk, User } from "types";

type UserState = {
  user: User.User | null;
};

const initialState: UserState = {
  user: null,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState["user"] | undefined>) => {
      state.user = action.payload || null;
    },
  },
});

export const signOut = (): AppThunk => (dispatch, getStore) => {
  dispatch(setUser(null));
};

export const { setUser } = slice.actions;

export default slice.reducer;
