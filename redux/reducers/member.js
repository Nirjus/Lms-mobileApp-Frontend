import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isMember: false,
  subscription: undefined,
};

export const memberReducer = createReducer(initialState, (builder) => {
  builder.addCase("ADD_MEMBERSHIP", (state, action) => {
    state.isMember = !state.isMember;
    state.subscription = action.payload;
  });
});
