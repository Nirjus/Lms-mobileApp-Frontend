import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  course: undefined,
  loading: false,
  update: false,
  chapterProgressIndex: 0,
};

export const courseReducer = createReducer(initialState, (builder) => {
  builder.addCase("INIT_COURSE", (state, action) => {
    state.loading = false;
    state.update = !state.update;
    state.course = action.payload;
  });

  builder.addCase("LOAD_COURSE", (state, action) => {
    state.loading = false;
    state.course = action.payload;
  });

  builder.addCase("SET_INDEX", (state, action) => {
    state.loading = false;
    state.chapterProgressIndex = action.payload;
  });
});
