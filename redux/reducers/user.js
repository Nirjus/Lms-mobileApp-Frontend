import { createReducer } from "@reduxjs/toolkit";

const initalState = {
  loading: false,
  user: undefined,
  token: "",
};

export const userReducer = createReducer(initalState, (builder) => {
  builder.addCase("LOGIN_USER", (state, action) => {
    state.loading = false;
    state.user = action.user;
    state.token = action.token;
  });

  builder.addCase("LOAD_USER", (state, action) => {
    state.loading = false;
    state.user = action.user;
    state.token = action.token;
  });
});
