import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../api"
import { fecthCardsData } from "../cards/cardsSlice"
import { fecthLoginIdsData } from "../loginsId/loginsIdSlice"
import { fetchDocsData } from "../docs/docsSlice"
import { fectchActivitiesData } from "../activity/activitiesSlice"
import { fetchRecentlyAddedData } from "../recentlyAdded/recentlyAddedSlice"
import { fetchFavoritesData } from "../favorites/favoritesSlice"
const initialState = {
    user: undefined
}

export const getUserDetails = createAsyncThunk("user/getUser", async (token, { getState, dispatch, rejectWithValue, fulfillWithValue }) => {
    console.log('userSlice');
    try {
        const res = await api.getUser(token);
        const userData = res.data.user;
        const nameString = userData.name.split(/[" "]+/);
        const data = {
            _id: userData._id,
            firstName: nameString[0],
            lastName: nameString[1],
            email: userData.email,
        };
        const userId = data._id;
        console.log(res.data.user);
        dispatch(fecthLoginIdsData({ user_id: userId }));
        dispatch(fecthCardsData({ user_id: userId }));
        dispatch(fetchDocsData({ user_id: userId }))
        dispatch(fectchActivitiesData({ user_id: userId }))
        dispatch(fetchFavoritesData({ user_id: userId }))
        dispatch(fetchRecentlyAddedData({ user_id: userId }))
        return fulfillWithValue(data);
    } catch (error) {
        console.log('errror', error.response.data.msg)
        const errorMessage = 'Error in registration'
        return rejectWithValue({ errorMessage });
    }
});

//* Slice
const userSlice = createSlice({
    name: 'auth',
    initialState: initialState,



    extraReducers: (builder) => {
        builder
            .addCase(getUserDetails.fulfilled, (state, action) => {
                return {
                    ...state,
                    user: action.payload
                };
            })

    }
})

// export const { } = userSlice.actions;

export default userSlice.reducer;
