import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../api"
// import { editLoginIdData } from "../loginsId/loginsIdSlice"

export const fetchRecentlyAdddedData = createAsyncThunk("recentlyAdded/fetch", async ({ user_id }, { getState, dispatch, rejectWithValue, fulfillWithValue }) => {
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
        // console.log('recentlyAdded response', res.data.activitiesArray)
        const data = res.data.activitiesArray;
        return fulfillWithValue(data.reverse());
    } catch (error) {
        console.log(error)
        return rejectWithValue(error);
    }
})

const initialState = {
    recentlyAdddedData: [],
}

const recentlyAddedSlice = createSlice({

    name: 'recentlyAdded',
    initialState: initialState,


    extraReducers: (builder) => {
        builder.
            addCase(addRecentlyAddedData.fulfilled, (state, action) => {
                return {
                    ...state,
                    recentlyAdddedData: action.payload
                };
            }).addCase(fetchRecentlyAdddedData.fulfilled, (state, action) => {
                return {
                    ...state,
                    recentlyAdddedData: action.payload
                }
            })

    }

})

export default recentlyAddedSlice.reducer;
