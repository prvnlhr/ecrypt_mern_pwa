import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addActivityData } from "../activity/activitiesSlice"
import { addToFavLoginsData } from "../favorites/favoritesSlice";
import { addRecentlyAddedData } from "../recentlyAdded/recentlyAddedSlice"
import * as api from "../../api"

const initialState = {
    loginsIdData: [],
    isLoading: false,
    action: undefined,
}

export const fecthLoginIdsData = createAsyncThunk("loginIds/fetch", async ({ user_id }, { getState, dispatch, rejectWithValue, fulfillWithValue }) => {
    try {

        const res = await api.fetchUserLoginIds(user_id);
        const { data } = res;
        data.reverse();
        return fulfillWithValue(data);
    } catch (error) {
        throw rejectWithValue(error);
    }
});


export const addNewLoginIdData = createAsyncThunk("loginIds/add", async ({ data, user_id, activityData }, { getState, dispatch, rejectWithValue, fulfillWithValue }) => {
    try {
        const state = getState();

        const res = await api.addNewLoginId(data, user_id, state.auth.token)
        console.log(res.data)
        dispatch(addActivityData({
            activityData: activityData,
            userId: user_id
        }))

        dispatch(addRecentlyAddedData({
            recentlyAddedData: data,
            userId: user_id
        }))

        const { loginIdsArray } = res.data;
        return fulfillWithValue(loginIdsArray[loginIdsArray.length - 1]);
    } catch (error) {
        throw rejectWithValue(error);
    }

});



export const editLoginIdData = createAsyncThunk("loginIds/edit", async ({ updatedData, login_id, activityData, userId }, { getState, dispatch, rejectWithValue, fulfillWithValue }) => {
    try {
        const state = getState();
        console.log(state.auth)
        const res = await api.editLoginId(login_id, updatedData, state.auth.token);
        console.log(res)

        dispatch(addActivityData({
            activityData: activityData,
            userId: userId
        }))

        return fulfillWithValue(updatedData);

    } catch (error) {
        console.log(error);
        throw rejectWithValue(updatedData);
    }
});



export const deleteLoginData = createAsyncThunk("loginIds/delete", async ({ login_id, user_id, activityData }, { getState, dispatch, rejectWithValue, fulfillWithValue }) => {
    try {
        const state = getState();
        const res = await api.deleteLoginId(login_id, user_id, state.auth.token);
        dispatch(addActivityData({
            activityData: activityData,
            userId: user_id
        }))
        const { data } = res;
        return fulfillWithValue(data.reverse());
        // return fulfillWithValue({});

    } catch (error) {
        console.log(error);
        throw rejectWithValue(error);
    }
});

export const toggleIsFav = createAsyncThunk("loginIds/toggleFav", async ({ loginId_id, isFav }, { getState, dispatch, rejectWithValue, fulfillWithValue }) => {
    try {
        const state = getState();
        const res = await api.loginIdFavouriteToggle(loginId_id, isFav, state.auth.token)
        const favLoginsArray = res.data.filter((item) => item.isFavourite);
        dispatch(addToFavLoginsData(favLoginsArray.reverse()));

        return fulfillWithValue({ favValue: isFav, id: loginId_id });
    } catch (error) {
        throw rejectWithValue(error);
    }
});


//* Slice
const loginsIdSlice = createSlice({

    name: 'loginsId',
    initialState: initialState,
    // reducers: {
    //     addLoginId(state, action) {
    //         console.log(action.payload, state)
    //         state.loginsIdData.push(action.payload)
    //     },

    // },

    extraReducers: (builder) => {
        builder.
            addCase(fecthLoginIdsData.fulfilled, (state, action) => {
                return {
                    ...state,
                    loginsIdData: action.payload,
                };
            }).
            addCase(addNewLoginIdData.fulfilled, (state, action) => {
                return {
                    ...state,
                    loginsIdData: [action.payload, ...state.loginsIdData],
                    // isLoading: false,
                    // action: 'add',
                };
            }).
            addCase(editLoginIdData.fulfilled, (state, action) => {
                console.log(action.payload)
                const newArray = state.loginsIdData.map((loginId) => {
                    if (loginId._id === action.payload._id) {
                        return action.payload;
                    } else {
                        return loginId;
                    }
                });
                return {
                    ...state,
                    loginsIdData: newArray,
                    // isLoading: false,
                    // action: 'edit',
                };
            }).addCase(editLoginIdData.rejected, (state, action) => {
                return {
                    ...state
                }
            }).
            addCase(deleteLoginData.fulfilled, (state, action) => {
                return {
                    ...state,
                    loginsIdData: action.payload,
                    isLoading: false,
                    action: undefined,
                };
            })
            .
            addCase(deleteLoginData.pending, (state, action) => {
                return {
                    ...state,
                    isLoading: true,
                    action: 'delete',
                };
            }).
            addCase(deleteLoginData.rejected, (state, action) => {
                return {
                    ...state,
                    isLoading: false,
                    action: undefined,
                };
            }).
            addCase(toggleIsFav.fulfilled, (state, action) => {
                const favVal = action.payload.favValue;
                const id = action.payload.id;
                const old = state.loginsIdData;
                const newLoginsArray = old.map((l) => {
                    if (l._id === id) {
                        return { ...l, isFavourite: favVal };
                    } else {
                        return l;
                    }
                });
                return {
                    ...state,
                    loginsIdData: newLoginsArray,
                };
            })

    }

})


export const { deleteLoginId, editLoginId } = loginsIdSlice.actions;

export default loginsIdSlice.reducer;
