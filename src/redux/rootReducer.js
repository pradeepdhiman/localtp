
import { combineReducers } from "@reduxjs/toolkit";
import profileSlice from "layouts/profile/profileSlice";
import studySlice from "layouts/study/studySlice";
import commonSlice from "utils/commonSlice";
import emptySplitApi from "utils/emptySplitApi";

export const rootReducer = combineReducers({
    [emptySplitApi.reducerPath]: emptySplitApi.reducer,
    common: commonSlice.reducer,
    profile: profileSlice.reducer,
    study:studySlice.reducer
});


