
import { combineReducers } from "@reduxjs/toolkit";
import emptySplitApi from "utils/emptySplitApi";

export const rootReducer = combineReducers({
    [emptySplitApi.reducerPath]: emptySplitApi.reducer,
    // applicant: applicantSlice.reducer,
    // courses: coursesSlice.reducer,
    // schedule:scheduleSlice.reducer,
    // question:questionSlice.reducer
});


