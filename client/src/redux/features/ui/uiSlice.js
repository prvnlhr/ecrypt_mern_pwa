import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//>  true : dark-mode
//>  false : light-mode

const initialState = {
    darkMode: false,
}
const uiSlice = createSlice({
    name: 'ui',
    initialState: initialState,
    reducers: {
        toggleUiTheme(state, action) {
            return {
                ...state,
                darkMode: action.payload,
            }
        },

    },
})

export const { toggleUiTheme } = uiSlice.actions;

export default uiSlice.reducer;
