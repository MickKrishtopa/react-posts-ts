import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    direction: true,
    category: 'all',
};

const filterSlice = createSlice({
    name: 'sort',
    initialState,
    reducers: {
        setCategory(state, action: PayloadAction<string>) {
            state.category = action.payload;
        },

        toggleDirection(state) {
            state.direction = !state.direction;
        },
    },
});

export const { setCategory, toggleDirection } = filterSlice.actions;

export default filterSlice.reducer;
