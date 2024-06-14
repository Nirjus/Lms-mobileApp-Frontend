import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import axios from "axios";
import { enrollReducer } from "./reducers/enroll";
import { memberReducer } from "./reducers/member";
import { courseReducer } from "./reducers/Lessons";

axios.defaults.baseURL = "http://192.168.29.5:8000/api/v1"; // for pc -> 192.168.29.23 for physical device -> 192.168.29.5
// hosted url (render hosted) -> https://lms-mobileapp-backend.onrender.com

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
