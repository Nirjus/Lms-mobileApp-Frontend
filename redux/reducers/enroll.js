import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isEnroll: false,
  enrollData: undefined,
};

export const enrollReducer = createReducer(initialState, (builder) => {
  builder.addCase("ADD_ENROLLMENT", (state, action) => {
    state.isEnroll = true;
    state.enrollData = action.payload;
  });
});
