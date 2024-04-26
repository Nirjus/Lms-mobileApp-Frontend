import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isEnroll: false,
  enrollData: undefined,
  update: false,
};

export const enrollReducer = createReducer(initialState, (builder) => {
  builder.addCase("ADD_ENROLLMENT", (state, action) => {
    state.isEnroll = true;
    state.enrollData = action.payload;
  });

  builder.addCase("UPDATE_ENROLLEMENT", (state) => {
    state.isEnroll = true;
    state.update = !state.update;
  });
});
