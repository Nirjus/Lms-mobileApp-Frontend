import {configureStore} from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import axios from "axios";

axios.defaults.baseURL = "http://192.168.29.23:8000/api/v1"

 const Store = configureStore({
    reducer:{
        user: userReducer
    },
    devTools: false
})

export default Store