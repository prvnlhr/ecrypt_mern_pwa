import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import * as api from "../../api"
import { addActivityData } from "../activity/activitiesSlice"
import { addToFavCardsData, removeFromFavCardsData } from "../favorites/favoritesSlice";
import { addRecentlyAddedData, deleteRecentlyAddedData } from "../recentlyAdded/recentlyAddedSlice"
const initialState = {
    cardsData: [],
    isLoading: false,
    action: undefined,
    success: undefined,
}

export const fecthCardsData = createAsyncThunk("cards/fetch", async ({ user_id }, { getState, dispatch, rejectWithValue, fulfillWithValue }) => {

    try {
        const res = await api.fetchUserCards(user_id);
        const { licenseCardsArray, bankCardsArray, identityCardsArray } = res.data;
        const CardsData = bankCardsArray.concat(identityCardsArray, licenseCardsArray);
        let SortedData = CardsData.sort(
            (c1, c2) => (c1.time < c2.time) ? 1 : (c1.time > c2.time) ? -1 : 0);
        return fulfillWithValue(SortedData);
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const addNewCardData = createAsyncThunk("cards/add", async ({ data, user_id, activityData }, { getState, dispatch, rejectWithValue, fulfillWithValue }) => {
    try {

        const state = getState();
        const res = await api.addNewCard(data, user_id, state.auth.token)
        dispatch(addActivityData({
            activityData: activityData,
            userId: user_id
        }))

        data.itemId = res.data._id;

        dispatch(addRecentlyAddedData({
            recentlyAddedData: data,
            userId: user_id
        }));

        return fulfillWithValue(res.data);

    } catch (error) {
        return rejectWithValue(error);
    }
});

export const editCardData = createAsyncThunk("cards/edit", async ({ updatedData, card_id, activityData, userId }, { getState, dispatch, rejectWithValue, fulfillWithValue }) => {
    try {
        // console.table('cardSlice', updatedData, card_id);
        // console.log(updatedData, card_id)
        const state = getState();
        const res = await api.editCard(card_id, updatedData, state.auth.token);
        // console.log(activityData, userId)
        dispatch(addActivityData({
            activityData: activityData,
            userId: userId
        }))
        return fulfillWithValue(updatedData);
    } catch (error) {
        // console.log(error);
        return rejectWithValue(error);
    }
});

export const deleteCardData = createAsyncThunk("cards/delete", async ({ cardData, user_id, card_id, activityData }, { getState, dispatch, rejectWithValue, fulfillWithValue }) => {

    try {
        const state = getState();

        // console.table(user_id, card_id, cardData);
        const res = await api.deleteCard(card_id, user_id, cardData, state.auth.token
        );
        dispatch(addActivityData({
            activityData: activityData,
            userId: user_id
        }))

        dispatch(deleteRecentlyAddedData({
            item_id: card_id,
            user_id: user_id
        }))

        if (activityData.isFavourite === true) {
            dispatch(removeFromFavCardsData({
                card_id: card_id,
            }))
        }

        const { data } = res;
        // console.log(data);
        return fulfillWithValue(cardData);
    } catch (error) {
        // console.log(error);
        return rejectWithValue(error);
    }

});


export const toggleIsFav = createAsyncThunk("cards/toggleFav", async ({ card_id, isFav, category }, { getState, dispatch, rejectWithValue, fulfillWithValue }) => {
    try {
        const state = getState();

        const res = await api.cardFavouriteToggle(card_id, isFav, category, state.auth.token)
        const currToggleCardInDb = res.data.filter((item) => item._id === card_id);
        // console.log(currToggleCardInDb[0].isFavourite)
        if (currToggleCardInDb[0].isFavourite === false) {
            dispatch(removeFromFavCardsData({
                card_id
            }))
        } else {
            dispatch(addToFavCardsData({
                card: currToggleCardInDb[0]
            }))
        }
        return fulfillWithValue({ favValue: isFav, id: card_id });
    } catch (error) {
        throw rejectWithValue(error);
    }
});
//* Slice
const cardsSlice = createSlice({

    name: 'cards',
    initialState: initialState,
    reducers: {
        rearrangeCardsList(state, action) {
            let currList = [...current(state.cardsData)];
            const clickedIndex = action.payload;
            const frsItem = currList[0];
            currList[0] = currList[clickedIndex];
            currList[clickedIndex] = frsItem;
            return {
                ...state,
                cardsData: currList,
            }
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fecthCardsData.fulfilled, (state, action) => {
                return {
                    ...state,
                    cardsData: action.payload,
                    isLoading: false,
                    action: undefined,
                };
            })
            .addCase(fecthCardsData.pending, (state, action) => {
                return {
                    ...state,
                    cardsData: action.payload,
                    isLoading: true,
                    action: 'fetch',
                };
            })
            .addCase(fecthCardsData.rejected, (state, action) => {
                return {
                    ...state,
                    isLoading: false,
                    action: undefined,
                };
            })
            .addCase(addNewCardData.fulfilled, (state, action) => {
                return {
                    ...state,
                    cardsData: [action.payload, ...state.cardsData],
                    isLoading: false,
                    success: true,
                    action: 'add',
                };
            })
            .addCase(addNewCardData.pending, (state, action) => {
                return {
                    ...state,
                    isLoading: true,
                    success: undefined,
                    action: 'add'
                };
            })
            .addCase(addNewCardData.rejected, (state, action) => {
                return {
                    ...state,
                    isLoading: false,
                    success: false,
                    action: 'add'
                };
            })
            .addCase(editCardData.fulfilled, (state, action) => {
                const newArray = state.cardsData.map((card) => {
                    if (card._id === action.payload._id) {
                        return action.payload;
                    } else {
                        return card;
                    }
                });
                return {
                    ...state,
                    cardsData: newArray,
                    isLoading: false,
                    action: 'edit',
                    success: true,
                };
            })
            .addCase(editCardData.pending, (state, action) => {
                return {
                    ...state,
                    isLoading: true,
                    action: 'edit',
                    success: undefined,
                };
            })
            .addCase(editCardData.rejected, (state, action) => {

                return {
                    ...state,
                    isLoading: false,
                    action: 'edit',
                    success: false,
                };
            })
            .addCase(deleteCardData.fulfilled, (state, action) => {
                return {
                    ...state,
                    cardsData: state.cardsData.filter(card => card._id != action.payload._id),
                    isLoading: false,
                    action: 'delete',
                    success: true,
                };
            })
            .addCase(deleteCardData.pending, (state, action) => {
                return {
                    ...state,
                    isLoading: true,
                    action: 'delete',
                    success: undefined
                };
            })
            .addCase(deleteCardData.rejected, (state, action) => {
                return {
                    ...state,
                    isLoading: false,
                    action: 'delete',
                    success: false,
                };
            }).
            addCase(toggleIsFav.fulfilled, (state, action) => {
                const favVal = action.payload.favValue;
                const id = action.payload.id;
                const old = state.cardsData;
                const newCardsArray = old.map((l) => {
                    if (l._id === id) {
                        return { ...l, isFavourite: favVal };
                    } else {
                        return l;
                    }
                });

                return {
                    ...state,
                    cardsData: newCardsArray,
                    isLoading: false,
                    action: 'toggleFav',
                    success: true,
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

export const { rearrangeCardsList } = cardsSlice.actions;

export default cardsSlice.reducer;
