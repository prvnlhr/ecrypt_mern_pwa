import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../api"

const initialState = {
    docsData: [],
}


export const fetchDocsData = createAsyncThunk("docs/fetch", async ({ user_id }, { getState }) => {
    const res = await api.fetchDocs(user_id);
    console.table(res.data)
    const { data } = res;
    return data.reverse();
});


export const addNewDocData = createAsyncThunk("docs/add", async ({ data, name, userId }, { getState }) => {
    console.log(data, name, userId)
    const res = await api.addNewDoc(data, userId)
    console.log(res.data);
    return res.data[res.data.length - 1];
});

export const editDocData = createAsyncThunk("docs/edit", async ({ docId, docData }, { getState }) => {
    console.log(docId, docData);
    const res = await api.editDoc(docId, docData);
    return docData;
});
export const deleteDocData = createAsyncThunk("docs/delete", async ({ docId, cloudId, userId }, { getState }) => {
    console.table(userId, docId, cloudId);
    const res = await api.deleteDoc(docId, userId, cloudId);
    // console.log(res);
    console.log(res.data)
    return res.data.data.reverse();
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
