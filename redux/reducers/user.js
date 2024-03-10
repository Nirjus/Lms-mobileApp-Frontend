import { createReducer } from "@reduxjs/toolkit";

const initalState={
     loading: false,
     user: undefined,
}

export const userReducer = createReducer(initalState,(builder) => {
       

       builder.addCase("LOAD_USER", (state, action) => {
        state.loading = false,
        state.user = action.user
       })
})