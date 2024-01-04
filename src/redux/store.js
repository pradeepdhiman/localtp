import { configureStore } from "@reduxjs/toolkit";
import emptySplitApi from "../utils/emptySplitApi";
import { rootReducer } from "./rootReducer";


export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([emptySplitApi.middleware])
})


export default store