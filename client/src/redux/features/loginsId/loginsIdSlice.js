import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../api"

const initialState = {
    loginsIdData: [],
}





export const fecthLoginIdsData = createAsyncThunk("loginIds/fetch", async ({ user_id }, { getState }) => {
    const res = await api.fetchUserLoginIds(user_id);
    console.log(res);
    const { data } = res;
    console.table(data);
    data.reverse();
    return data;
});


export const addNewLoginIdData = createAsyncThunk("loginIds/add", async ({ data, user_id }, { getState }) => {
    const res = await api.addNewLoginIdA(data, user_id)
    const { loginIdsArray } = res.data;
    // console.table(loginIdsArray)
    return loginIdsArray[loginIdsArray.length - 1];
});

export const editLoginIdData = createAsyncThunk("loginIds/edit", async ({ updatedData, login_id }, { getState }) => {
    // console.table(updatedData, login_id);
    const res = await api.editLoginId(login_id, updatedData);
    // console.log(updatedData);
    return updatedData;
});
export const deleteLoginData = createAsyncThunk("loginIds/delete", async ({ login_id, user_id }, { getState }) => {
    console.table(login_id, user_id);

    const res = await api.deleteLoginId(login_id, user_id);
    // console.log(res);
    const { data } = res;
    // console.log(data);
    return data.reverse();
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
                    loginsIdData: action.payload
                };
            }).addCase(addNewLoginIdData.fulfilled, (state, action) => {
                return {
                    ...state,
                    loginsIdData: [action.payload, ...state.loginsIdData]
                };
            }).addCase(editLoginIdData.fulfilled, (state, action) => {
                const newArray = state.loginsIdData.map((loginId) => {
                    if (loginId._id === action.payload._id) {
                        return action.payload;
                    } else {
                        return loginId;
                    }
                });
                console.log(newArray);
                return {
                    ...state,
                    loginsIdData: newArray,
                };
            }).addCase(deleteLoginData.fulfilled, (state, action) => {
                return {
                    ...state,
                    loginsIdData: action.payload
                };
            })

    }

})


export const { addLoginId, deleteLoginId, editLoginId } = loginsIdSlice.actions;

export default loginsIdSlice.reducer;
