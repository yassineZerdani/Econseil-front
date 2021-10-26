import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    values : [],
};

export const procmetSlice = createSlice({
    name: "procmet",
    initialState: {
        value: initialState
    },
    reducers: {
        getProcMet: (state, action) => {
            state.values = action.payload;
        },
    },
});

export const { getProcMet } = procmetSlice.actions;

export default procmetSlice.reducer;