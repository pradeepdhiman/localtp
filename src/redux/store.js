import { configureStore } from "@reduxjs/toolkit";
import { coursesApi } from "layouts/courses/functions/query";
import emptySplitApi from "../utils/emptySplitApi";


export const store = configureStore({
    reducer: {
        [emptySplitApi.reducerPath]: coursesApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([emptySplitApi.middleware])
})

export default store