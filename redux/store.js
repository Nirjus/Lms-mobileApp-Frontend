import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import axios from "axios";
import { enrollReducer } from "./reducers/enroll";
import { memberReducer } from "./reducers/member";
import { courseReducer } from "./reducers/Lessons";

const Store = configureStore({
  reducer: {
    user: userReducer,
    enroll: enrollReducer,
    member: memberReducer,
    course: courseReducer,
  },
  devTools: false,
});

export default Store;
