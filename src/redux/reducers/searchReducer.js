import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: 'searchReducer',
    initialState: {
        toggleSearch: false,
    },
    reducers: {
        fetchToggleSearch: (state, action) => {
            state.toggleSearch = !state.toggleSearch;
        }
    }
})

export const {fetchToggleSearch} = searchSlice.actions;

export default searchSlice.reducer