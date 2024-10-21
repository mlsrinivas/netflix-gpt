import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../reducers/loginReducer";
import dashboardReducer from "../reducers/dashboardReducer";
import searchReducer from "../reducers/searchReducer";

const appStore = configureStore({
    reducer: {
        user: loginReducer,
        dashboard: dashboardReducer,
        searchReducer: searchReducer
    }
})

export default appStore;