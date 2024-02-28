
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    courseList: [],
    activeCourse: {},
    assessmentItem:{},
    session:{},
    selectedCourse:{}
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
        setSelectedSession: (state, { payload }) => {
            state.session = payload
        },
        setSelectedCourse: (state, { payload }) => {
            state.selectedCourse = payload
        },
    },
});

export const {setSelectedSession, setSelectedCourse, setCourseList, setActiveCourse, setAssessmentItem } = commonSlice.actions;
export default commonSlice;
