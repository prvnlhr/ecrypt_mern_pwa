import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import * as api from "../../api"

const initialState = {
    loginsIdData: [],
}



// export const addNewLoginId = (newLoginData, user_id) => async (dispatch) => {

// };

export const fetchLoginIds = createAsyncThunk('loginsId/fetch', async ({ user_id }) => {
    // const response = await api.fetchUserLoginIds(user_id);

    //  const loginIdsData = response.data.reverse();
    // return loginIdsData ;


});

export const addnewLoginId = createAsyncThunk('loginsId/addNew', async ({ data }) => {
    // const response = await api.fetchUserLoginIds(user_id);

    //  const loginIdsData = response.data.reverse();
    // return loginIdsData ;

});




//* Slice
const loginsIdSlice = createSlice({

    name: 'loginsId',
    initialState: initialState,
    reducers: {
        addLoginId(state, action) {
            console.log(action.payload, state)
            state.loginsIdData.push(action.payload)
        },
        deleteLoginId(state, action) {


        },
        editLoginId(state, action) {

        },
    },
    extraReducers: {
        [fetchLoginIds.fulfilled]: (state, action) => {
            state.push(action.payload);
        },
        [addnewLoginId.fulfilled]: (state, action) => {
            state.push(action.payload);
        }
    }

})


export const { addLoginId, deleteLoginId, editLoginId } = loginsIdSlice.actions;

export default loginsIdSlice.reducer;
