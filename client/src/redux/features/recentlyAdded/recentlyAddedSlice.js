import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../api"
// import { editLoginIdData } from "../loginsId/loginsIdSlice"

export const fetchRecentlyAddedData = createAsyncThunk("recentlyAdded/fetch", async ({ user_id }, { getState, dispatch, rejectWithValue, fulfillWithValue }) => {
    try {
        const res = await api.fetchUserRecentlyAddedData(user_id)
        // console.log(res.data)
        return fulfillWithValue(res.data.reverse());
    } catch (error) {
        return rejectWithValue(error);
    }
})

export const addRecentlyAddedData = createAsyncThunk("recentlyAdded/add", async ({ recentlyAddedData, userId }, { getState, dispatch, rejectWithValue, fulfillWithValue }) => {
    try {
        const res = await api.addRecentlyData(userId, recentlyAddedData);
        const data = res.data.recentlyAddedArray;
        return fulfillWithValue(data.reverse());

    } catch (error) {
        // console.log(error)
        return rejectWithValue(error);
    }
})

export const deleteRecentlyAddedData = createAsyncThunk("recentlyAdded/delete", async ({ item_id, user_id }, { getState, dispatch, rejectWithValue, fulfillWithValue }) => {
    try {
        const state = getState();
        const res = await api.deleteRecentlyAdded(item_id, user_id, state.auth.token);
        const updateList = res.data.recentlyAddedArray;
        return fulfillWithValue(updateList);
    } catch (error) {
        throw rejectWithValue(error);
    }
});

const initialState = {
    recentlyAddedData: [],
}

const recentlyAddedSlice = createSlice({

    name: 'recentlyAdded',
    initialState: initialState,


    extraReducers: (builder) => {
        builder.
            addCase(addRecentlyAddedData.fulfilled, (state, action) => {
                return {
                    ...state,
                    recentlyAddedData: action.payload
                };
            })
            .addCase(fetchRecentlyAddedData.fulfilled, (state, action) => {
                return {
                    ...state,
                    recentlyAddedData: action.payload
                }
            })
            .addCase(deleteRecentlyAddedData.fulfilled, (state, action) => {
                return {
                    ...state,
                    recentlyAddedData: action.payload
                }
            })
            .addCase(deleteRecentlyAddedData.rejected, (state, action) => {
                return {
                    ...state,
                }
            })

    }

})

export default recentlyAddedSlice.reducer;
