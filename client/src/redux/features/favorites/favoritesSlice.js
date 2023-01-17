import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addActivityData } from "../activity/activitiesSlice"
import * as api from "../../api"

const initialState = {
    favoriteLoginIds: [],
    favoriteCards: [],
    favoriteDocs: [],
}



export const fetchFavoritesData = createAsyncThunk("favorites/fetch", async ({ user_id }, { getState, dispatch, rejectWithValue, fulfillWithValue }) => {
    try {
        const res = await api.fetchFavorites(user_id);
        const { data } = res;
        const cardsDataFav = data[0].cardsFavArray.bankCards.concat(data[0].cardsFavArray.identityCards, data[0].cardsFavArray.licenseCards);
        const loginIdsDataFav = data[0].loginIdsFavArray.reverse()
        const docsDataFav = data[0].docsArrayFavArray.reverse()
        const dataToReturn = {
            cardsDataFav,
            loginIdsDataFav,
            docsDataFav
        }
        return fulfillWithValue(dataToReturn);
    } catch (error) {
        throw rejectWithValue(error);
    }
});

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: initialState,
    reducers: {
        addToFavLoginsData(state, action) {
            console.log(action.payload)
            return {
                ...state,
                favoriteLoginIds: action.payload
            }
        },
    },
    extraReducers: (builder) => {

        builder.addCase(fetchFavoritesData.fulfilled, (state, action) => {
            return {
                ...state,
                favoriteLoginIds: action.payload.loginIdsDataFav,
                favoriteCards: action.payload.cardsDataFav,
                favoriteDocs: action.payload.docsDataFav,
            }
        })
    }

})

export const { addToFavLoginsData } = favoritesSlice.actions;
export default favoritesSlice.reducer;
