
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    joinedSession:{}
};

const studySlice = createSlice({
    name: 'study',
    initialState,
    reducers: {
        setJoinedSession: (state, action) => {
            state.joinedSession = action.payload;
        },
    },
});

export const {setJoinedSession} = studySlice.actions;
export default studySlice;
