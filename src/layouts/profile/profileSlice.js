
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    profileInfo: {}
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfileInfo: (state, { payload }) => {
            state.profileInfo = payload
        }
    },
});

export const { setProfileInfo } = profileSlice.actions;
export default profileSlice;
