import { createSlice } from '@reduxjs/toolkit'

const initialState = {};
// Slice
const slice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        login: (state, { payload }) => {
            state.isLogin = true;
        },
    }
});

export default slice.reducer;
