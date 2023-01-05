import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../api"

const initialState = {
    cardsData: [],
}


export const fecthCardsData = createAsyncThunk("cards/fetch", async ({ user_id }, { getState }) => {
    const res = await api.fetchUserCards(user_id);
    // console.log(res);
    const { data } = res;
    console.log(data);
    data.reverse();
    return data;
});


export const addNewCardData = createAsyncThunk("cards/add", async ({ data, user_id }, { getState }) => {
    console.table(data, user_id)
    const res = await api.addNewCard(data, user_id)
    const { cardsArray } = res.data;
    // console.table(cardsArray)
    return cardsArray[cardsArray.length - 1];
});

export const editCardData = createAsyncThunk("cards/edit", async ({ updatedData, card_id }, { getState }) => {
    console.table(updatedData, card_id);
    console.log(updatedData, card_id)
    const res = await api.editCard(card_id, updatedData);
    // console.log(updatedData);
    return updatedData;
});
export const deleteCardData = createAsyncThunk("cards/delete", async ({ card_id, user_id }, { getState }) => {
    console.table(card_id, user_id);

    const res = await api.deleteCard(card_id, user_id);
    // console.log(res);
    const { data } = res;
    // console.log(data);
    return data.reverse();
});





//* Slice
const cardsSlice = createSlice({

    name: 'cards',
    initialState: initialState,
    // reducers: {
    //     addCard(state, action) {
    //         console.log(action.payload, state)
    //         state.cardsData.push(action.payload)
    //     },

    // },

    extraReducers: (builder) => {
        builder
            .addCase(fecthCardsData.fulfilled, (state, action) => {
                console.log(action.payload)
                return {
                    ...state,
                    cardsData: action.payload
                };
            })
            .addCase(addNewCardData.fulfilled, (state, action) => {
                return {
                    ...state,
                    cardsData: [action.payload, ...state.cardsData]
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
                console.log(newArray);
                return {
                    ...state,
                    cardsData: newArray,
                };
            })
            .addCase(deleteCardData.fulfilled, (state, action) => {
                return {
                    ...state,
                    cardsData: action.payload
                };
            })
    }

})


export const { addNewCard, deleteCard, editCard } = cardsSlice.actions;

export default cardsSlice.reducer;
