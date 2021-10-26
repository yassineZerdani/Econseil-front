import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    values : [],
};

export const procorgSlice = createSlice({
    name: "procorg",
    initialState: {
        value: initialState
    },
    reducers: {
        retrieveorg: (state, action) => {
            state.values = action.payload;
        },
    },
});

export const { retrieveorg } = procorgSlice.actions;

export default procorgSlice.reducer;