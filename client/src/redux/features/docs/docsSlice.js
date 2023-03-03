import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import * as api from "../../api"
import { addActivityData } from "../activity/activitiesSlice"
import { addRecentlyAddedData, deleteRecentlyAddedData } from "../recentlyAdded/recentlyAddedSlice"

import { addToFavDocsData } from "../favorites/favoritesSlice"
const initialState = {
    docsData: [],
    isLoading: false,
    action: undefined,
}


export const fetchDocsData = createAsyncThunk("docs/fetch", async ({ user_id }, { getState, dispatch, rejectWithValue, fulfillWithValue }) => {

    try {
        const state = getState();

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
        const state = getState();

        const res = await api.addNewDoc(data, state.auth.token)
        dispatch(addActivityData({
            activityData: activityData,
            userId: userId
        }))

        const newAddedItem = res.data[res.data.length - 1];

        const dataForRecentltyAdded = {
            imageName: newAddedItem?.imageName,
            imageUrl: newAddedItem?.imageUrl,
            cloudinary_id: newAddedItem?.cloudinary_id,
            isFavourite: newAddedItem?.isFavourite,
            itemId: newAddedItem?._id
        }
        dispatch(addRecentlyAddedData({
            recentlyAddedData: dataForRecentltyAdded,
            userId: userId
        }))

        return fulfillWithValue(res.data[res.data.length - 1]);

    } catch (error) {
        throw rejectWithValue(error);
    }

});

export const editDocData = createAsyncThunk("docs/edit", async ({ docId, docData, userId, activityData }, { getState, dispatch, rejectWithValue, fulfillWithValue }) => {

    try {
        const state = getState();

        // console.log(docId, docData);
        const res = await api.editDoc(docId, docData, state.auth.token);
        dispatch(addActivityData({
            activityData: activityData,
            userId: userId,
        }))
        return fulfillWithValue(docData);

    } catch (error) {
        // console.log(error);
        throw rejectWithValue(error);
    }

});
export const deleteDocData = createAsyncThunk("docs/delete", async ({ docId, cloudId, userId, activityData }, { getState, dispatch, rejectWithValue, fulfillWithValue }) => {

    try {
        const state = getState();
        // console.table(userId, docId, cloudId);
        const res = await api.deleteDoc(docId, userId, cloudId, state.auth.token);
        dispatch(addActivityData({
            activityData: activityData,
            userId: userId
        }))

        dispatch(deleteRecentlyAddedData({
            item_id: docId,
            user_id: userId
        }))

        return fulfillWithValue(res.data.data.reverse());

    } catch (error) {
        // console.log(error);
        throw rejectWithValue(error);
    }
});

export const toggleIsFav = createAsyncThunk("docs/toggleFav", async ({ doc_id, isFav }, { getState, dispatch, rejectWithValue, fulfillWithValue }) => {
    try {
        const state = getState();
        // console.log(doc_id, isFav)
        const res = await api.docsFavouriteToggle(doc_id, isFav, state.auth.token)
        // console.log(res.data)
        const favDocsArray = res.data.filter((item) => item.isFavourite);
        // console.log(favDocsArray);
        dispatch(addToFavDocsData(favDocsArray.reverse()));
        return fulfillWithValue({ favValue: isFav, id: doc_id });
    } catch (error) {
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
    reducers: {
        rearrangeDocsList(state, action) {
            let currList = [...current(state.docsData)];
            const clickedIndex = action.payload;
            const frsItem = currList[0];
            currList[0] = currList[clickedIndex];
            currList[clickedIndex] = frsItem;
            return {
                ...state,
                docsData: currList,
            }
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchDocsData.fulfilled, (state, action) => {
                return {
                    ...state,
                    docsData: action.payload,
                    isLoading: false,
                    action: undefined
                };
            })
            .addCase(fetchDocsData.pending, (state, action) => {
                return {
                    ...state,
                    isLoading: true,
                    action: 'fetch'
                };
            })
            .addCase(fetchDocsData.rejected, (state, action) => {
                return {
                    ...state,
                    isLoading: false,
                    action: undefined
                };
            })
            .addCase(addNewDocData.fulfilled, (state, action) => {
                return {
                    ...state,
                    docsData: [action.payload, ...state.docsData],
                    isLoading: false,
                    action: undefined,
                };
            })
            .addCase(addNewDocData.pending, (state, action) => {
                return {
                    ...state,
                    isLoading: true,
                    action: 'add',
                };

            })
            .addCase(addNewDocData.rejected, (state, action) => {
                return {
                    ...state,
                    isLoading: false,
                    action: 'add',
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
                    isLoading: false,
                    action: 'edit'
                };
            })
            .addCase(editDocData.pending, (state, action) => {
                return {
                    ...state,
                    isLoading: true,
                    action: 'edit'
                };
            })
            .addCase(editDocData.rejected, (state, action) => {
                return {
                    ...state,
                    isLoading: false,
                    action: 'edit'
                };
            })
            .addCase(deleteDocData.fulfilled, (state, action) => {
                return {
                    ...state,
                    docsData: action.payload,
                    isLoading: false,
                    action: 'delete'
                };
            }).addCase(deleteDocData.pending, (state, action) => {
                return {
                    ...state,
                    isLoading: true,
                    action: 'delete'
                };
            })
            .addCase(deleteDocData.rejected, (state, action) => {
                return {
                    ...state,
                    isLoading: false,
                    action: 'delete'
                };
            })
            .addCase(toggleIsFav.fulfilled, (state, action) => {
                const favVal = action.payload.favValue;
                const id = action.payload.id;
                const old = state.docsData;
                const newDocsArray = old.map((l) => {
                    if (l._id === id) {
                        return { ...l, isFavourite: favVal };
                    } else {
                        return l;
                    }
                });
                return {
                    ...state,
                    docsData: newDocsArray,
                    isLoading: false,
                    action: undefined,
                    success: true
                };
            }).
            addCase(toggleIsFav.pending, (state, action) => {
                return {
                    ...state,
                    isLoading: true,
                    action: 'toggleFav',
                    success: undefined,
                };
            }).
            addCase(toggleIsFav.rejected, (state, action) => {
                return {
                    ...state,
                    isLoading: false,
                    action: 'toggleFav',
                    success: false,
                };
            })

    }

})

export const { rearrangeDocsList } = docsSlice.actions;

export default docsSlice.reducer;
