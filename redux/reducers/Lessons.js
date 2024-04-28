import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  course: undefined,
  loading: false,
  update: false,
};

export const courseReducer = createReducer(initialState, (builder) => {
  builder.addCase("INIT_COURSE", (state) => {
    state.loading = false;
    state.update = !state.update;
  });
});
