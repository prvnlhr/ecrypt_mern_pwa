import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../api"





export const searchUserData = createAsyncThunk("search/query", async ({ query }, { getState, dispatch, rejectWithValue, fulfillWithValue }) => {
    try {
        const state = getState();
        const { loginIds, cards, docs } = state;
        const data = loginIds?.loginsIdData.concat(cards?.cardsData, docs?.docsData);
        return fulfillWithValue({
            key: query,
            data: data,
        });
    } catch (error) {
        console.log(error)
        return rejectWithValue(error);
    }
})


const initialState = {
    searchResults: [],
}

const searchSlice = createSlice({
    name: 'search',
    initialState: initialState,

    reducers: {
        clearSearchData(state, action) {
            return {
                ...state,
                searchResults: [],
            }
        },

    },

    extraReducers: (builder) => {
        builder.
            addCase(searchUserData.fulfilled, (state, action) => {
                const key = action.payload.key;
                const newDataArray = action.payload.data.filter(
                    (item) =>
                        item.app?.toLowerCase().includes(key.toLowerCase()) ||
                        item.title?.toLowerCase().includes(key.toLowerCase()) ||
                        item.username?.toLowerCase().includes(key.toLowerCase()) ||
                        item.category?.toLowerCase().includes(key.toLowerCase()) ||
                        item.cardNumber?.toLowerCase().includes(key.toLowerCase()) ||
                        item.cardHolder?.toLowerCase().includes(key.toLowerCase()) ||
                        item.licenseNumber?.toLowerCase().includes(key.toLowerCase()) ||
                        item.imageName?.toLowerCase().includes(key.toLowerCase())
                );
                return {
                    ...state,
                    searchResults: newDataArray,
                };
            })

    }

})

export const { clearSearchData } = searchSlice.actions;
export default searchSlice.reducer;
