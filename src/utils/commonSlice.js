
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    courseList: [],
    activeCourse: {},
    assessmentItem:{}
};

const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        setCourseList: (state, action) => {
            state.courseList = action.payload;
        },
        setActiveCourse: (state, { payload }) => {
            state.activeRow = payload
        },
        setAssessmentItem: (state, { payload }) => {
            state.assessmentItem = payload
        },
    },
});

export const { setCourseList, setActiveCourse, setAssessmentItem } = commonSlice.actions;
export default commonSlice;
