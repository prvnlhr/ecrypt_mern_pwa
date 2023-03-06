import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { addActivityData } from "../activity/activitiesSlice"
import { addToFavLoginsData, removeFromFavLoginsData } from "../favorites/favoritesSlice";
import { addRecentlyAddedData, deleteRecentlyAddedData } from "../recentlyAdded/recentlyAddedSlice"
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
        // console.log(data, user_id, state.auth.token)
        const res = await api.addNewLoginId(data, user_id, state.auth.token)
        // console.log(res.data)
        dispatch(addActivityData({
            activityData: activityData,
            userId: user_id
        }))

        const { loginIdsArray } = res.data;
        const newAddedItem = loginIdsArray[loginIdsArray.length - 1];
        data.itemId = newAddedItem._id;
        dispatch(addRecentlyAddedData({
            recentlyAddedData: data,
            userId: user_id
        }))
        return fulfillWithValue(loginIdsArray[loginIdsArray.length - 1]);
    } catch (error) {
        throw rejectWithValue(error);
    }

});



export const editLoginIdData = createAsyncThunk("loginIds/edit", async ({ updatedData, login_id, activityData, userId }, { getState, dispatch, rejectWithValue, fulfillWithValue }) => {
    try {
        const state = getState();
        // console.log(state.auth)
        const res = await api.editLoginId(login_id, updatedData, state.auth.token);
        // console.log(res)

        dispatch(addActivityData({
            activityData: activityData,
            userId: userId
        }))

        return fulfillWithValue(updatedData);

    } catch (error) {
        // console.log(error);
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
        dispatch(deleteRecentlyAddedData({
            item_id: login_id,
            user_id: user_id
        }))
        //> get isFav Value from  activityData. if isFav value was true, it means we should also  remove
        //> from favList

        console.log(activityData.isFavourite, activityData._id);

        if (activityData.isFavourite === true) {
            dispatch(removeFromFavLoginsData({
                login_id: login_id,
            }));
        }
        const { data } = res;
        return fulfillWithValue(data.reverse());
        // return fulfillWithValue({});

    } catch (error) {
        // console.log(error);
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

    reducers: {
        rearrangeLoginIdsList(state, action) {
            let currList = [...current(state.loginsIdData)];
            const clickedIndex = action.payload;
            const frsItem = currList[0];
            currList[0] = currList[clickedIndex];
            currList[clickedIndex] = frsItem;
            return {
                ...state,
                loginsIdData: currList,
            }
        },
    },

    extraReducers: (builder) => {
        builder.
            addCase(fecthLoginIdsData.fulfilled, (state, action) => {
                return {
                    ...state,
                    loginsIdData: action.payload,
                    isLoading: false,
                    action: undefined,
                };
            }).
            addCase(fecthLoginIdsData.pending, (state, action) => {
                return {
                    ...state,
                    isLoading: true,
                    action: 'fetch',
                };
            }).
            addCase(fecthLoginIdsData.rejected, (state, action) => {
                return {
                    ...state,
                    isLoading: false,
                    action: undefined,
                };
            }).
            addCase(addNewLoginIdData.fulfilled, (state, action) => {
                return {
                    ...state,
                    loginsIdData: [action.payload, ...state.loginsIdData],
                    isLoading: false,
                    action: 'add',
                };
            }).
            addCase(addNewLoginIdData.pending, (state, action) => {
                return {
                    ...state,
                    isLoading: true,
                    action: 'add',
                };
            }).
            addCase(addNewLoginIdData.rejected, (state, action) => {
                return {
                    ...state,
                    isLoading: false,
                    action: 'add',
                };
            }).
            addCase(editLoginIdData.fulfilled, (state, action) => {
                // console.log(action.payload)
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
                    isLoading: false,
                    action: 'edit',
                };
            }).addCase(editLoginIdData.pending, (state, action) => {
                return {
                    ...state,
                    isLoading: true,
                    action: 'edit',
                }
            })
            .addCase(editLoginIdData.rejected, (state, action) => {
                return {
                    ...state,
                    isLoading: false,
                    action: 'edit',
                }
            }).addCase(deleteLoginData.fulfilled, (state, action) => {
                return {
                    ...state,
                    loginsIdData: action.payload,
                    isLoading: false,
                    action: 'delete',
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
                    action: 'delete',
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
                    isLoading: false,
                    action: undefined,
                    success: true
                };
            })
            .addCase(toggleIsFav.pending, (state, action) => {
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


export const { rearrangeLoginIdsList } = loginsIdSlice.actions;

export default loginsIdSlice.reducer;
