import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../api"
import { addActivityData } from "../activity/activitiesSlice"


const initialState = {
    docsData: [],
}


export const fetchDocsData = createAsyncThunk("docs/fetch", async ({ user_id }, { getState, dispatch, rejectWithValue, fulfillWithValue }) => {

    try {
        const res = await api.fetchDocs(user_id);
        // console.table(res.data)
        const { data } = res;
        return fulfillWithValue(data.reverse())
    } catch (error) {
        console.log(error);
        throw rejectWithValue(error);
    }

});


export const addNewDocData = createAsyncThunk("docs/add", async ({ data, name, userId, activityData }, { getState, dispatch, rejectWithValue, fulfillWithValue }) => {

    try {
        console.log(data, name, userId)
        const res = await api.addNewDoc(data, userId)
        dispatch(addActivityData({
            activityData: activityData,
            userId: userId
        }))
        console.log(res.data);
        return fulfillWithValue(res.data[res.data.length - 1]);

    } catch (error) {
        console.log(error);
        throw rejectWithValue(error);
    }

});

export const editDocData = createAsyncThunk("docs/edit", async ({ docId, docData, userId, activityData }, { getState, dispatch, rejectWithValue, fulfillWithValue }) => {

    try {
        console.log(docId, docData);
        const res = await api.editDoc(docId, docData);
        dispatch(addActivityData({
            activityData: activityData,
            userId: userId,
        }))
        return fulfillWithValue(docData);

    } catch (error) {
        console.log(error);
        throw rejectWithValue(error);
    }

});
export const deleteDocData = createAsyncThunk("docs/delete", async ({ docId, cloudId, userId, activityData }, { getState, dispatch, rejectWithValue, fulfillWithValue }) => {

    try {
        console.table(userId, docId, cloudId);
        const res = await api.deleteDoc(docId, userId, cloudId);
        dispatch(addActivityData({
            activityData: activityData,
            userId: userId
        }))
        // console.log(res);
        console.log(res.data)
        return fulfillWithValue(res.data.data.reverse());

    } catch (error) {
        console.log(error);
        throw rejectWithValue(error);
    }

});

//* Slice
const docsSlice = createSlice({

    name: 'docs',
    initialState: initialState,
    // reducers: {
    //     adddoc(state, action) {
    //         console.log(action.payload, state)
    //         state.docsData.push(action.payload)
    //     },

    // },

    extraReducers: (builder) => {
        builder
            .addCase(fetchDocsData.fulfilled, (state, action) => {
                return {
                    ...state,
                    docsData: action.payload
                };
            })
            .addCase(addNewDocData.fulfilled, (state, action) => {
                return {
                    ...state,
                    docsData: [action.payload, ...state.docsData]
                };
            })
            .addCase(editDocData.fulfilled, (state, action) => {
                const newArray = state.docsData.map((doc) => {
                    if (doc._id === action.payload._id) {
                        return action.payload;
                    } else {
                        return doc;
                    }
                });
                return {
                    ...state,
                    docsData: newArray,
                };
            })
            .addCase(deleteDocData.fulfilled, (state, action) => {
                return {
                    ...state,
                    docsData: action.payload
                };
            })
            .addCase(deleteDocData.rejected, (state, action) => {
                return {
                    ...state,
                    docsData: state.docsData,
                };
            })
    }

})

export const { } = docsSlice.actions;

export default docsSlice.reducer;
