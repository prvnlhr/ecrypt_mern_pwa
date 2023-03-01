import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../api"
// import { editLoginIdData } from "../loginsId/loginsIdSlice"

export const fectchActivitiesData = createAsyncThunk("activity/fetch", async ({ user_id }, { getState, dispatch, rejectWithValue, fulfillWithValue }) => {
    try {
        const res = await api.fetchUserActivities(user_id)
        return fulfillWithValue(res.data.reverse());
    } catch (error) {
        return rejectWithValue(error);
    }
})

export const addActivityData = createAsyncThunk("activity/add", async ({ activityData, userId }, { getState, dispatch, rejectWithValue, fulfillWithValue }) => {
    try {
        const res = await api.addActivity(userId, activityData);
        // console.log('activity response', res.data.activitiesArray)
        const data = res.data.activitiesArray;
        return fulfillWithValue(data.reverse());
    } catch (error) {
        console.log(error)
        return rejectWithValue(error);
    }
})

const initialState = {
    activitiesData: [],
    isLoading: false,
    action: undefined
}

const activitiesSlice = createSlice({

    name: 'activities',
    initialState: initialState,


    extraReducers: (builder) => {
        builder.
            addCase(addActivityData.fulfilled, (state, action) => {
                return {
                    ...state,
                    activitiesData: action.payload
                };
            })
            .addCase(fectchActivitiesData.fulfilled, (state, action) => {
                return {
                    ...state,
                    activitiesData: action.payload,
                    isLoading: false,
                    action: undefined
                }
            })
            .addCase(fectchActivitiesData.pending, (state, action) => {
                return {
                    ...state,
                    activitiesData: action.payload,
                    isLoading: true,
                    action: 'fetch'
                }
            })
            .addCase(fectchActivitiesData.rejected, (state, action) => {
                return {
                    ...state,
                    isLoading: false,
                    action: undefined
                }
            })

    }

})

export default activitiesSlice.reducer;
