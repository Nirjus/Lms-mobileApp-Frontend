import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import axios from "axios";
import { enrollReducer } from "./reducers/enroll";
import { memberReducer } from "./reducers/member";

const Store = configureStore({
  reducer: {
    user: userReducer,
    enroll: enrollReducer,
    member: memberReducer,
  },
  devTools: false,
});

export default Store;
