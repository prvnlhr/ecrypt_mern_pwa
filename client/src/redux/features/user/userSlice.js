import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../api"
import { fecthCardsData } from "../cards/cardsSlice"
import { fecthLoginIdsData } from "../loginsId/loginsIdSlice"
import { fetchDocsData } from "../docs/docsSlice"
import { fectchActivitiesData } from "../activity/activitiesSlice"
import { fetchRecentlyAddedData } from "../recentlyAdded/recentlyAddedSlice"
import { fetchFavoritesData } from "../favorites/favoritesSlice"

const initialState = {
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    _id: undefined,
    profilePic: {
        picUrl: undefined,
        picCloudId: undefined,
    },

    joinedDate: undefined,
    updateDate: undefined,
    responseMessage: undefined,
    error: false,
    success: false,
    pending: false,
}

export const getUserDetails = createAsyncThunk("user/getUser", async (token, { getState, dispatch, rejectWithValue, fulfillWithValue }) => {
    try {
        const res = await api.getUser(token);
        const userData = res.data.user;
        const profilePicData = res.data.user.profilePic
        // console.log(profilePicData.picUrl)
        const nameString = userData.name.split(/[" "]+/);
        const userRes = {
            firstName: nameString[0],
            lastName: nameString[1],
            email: userData.email,
            _id: userData._id,
            picUrl: profilePicData.picUrl,
            picCloudId: profilePicData.cloudinary_id,
            joinedDate: undefined,
            updateDate: undefined,
        }
        return fulfillWithValue(userRes);
    } catch (error) {
        console.log('errror', error.response.data.msg)
        const errorMessage = 'Error in registration'
        return rejectWithValue({ errorMessage });
    }
});

export const editUserProfile = createAsyncThunk("user/editProfile", async ({ token, profileData }, { getState, dispatch, rejectWithValue, fulfillWithValue }) => {
    try {

        // console.log(token, profileData);
        const res = await api.editProfile(token, profileData);
        // console.log(res.data.newData)
        const userData = res.data.newData;
        const nameString = userData.name.split(/[" "]+/);
        const resData =
        {
            firstName: nameString[0],
            lastName: nameString[1],
            msg: res.data.msg
        }
        return fulfillWithValue(resData);
    } catch (error) {
        console.log('errror', error.response.data.msg)
        const errorMessage = 'Error in registration'
        return rejectWithValue({ errorMessage });
    }
});

export const changeUserPass = createAsyncThunk("user/changeProfilePass", async ({ oldPassword, newPassword, token }, { getState, dispatch, rejectWithValue, fulfillWithValue }) => {
    try {
        console.log(token, oldPassword, newPassword);
        const res = await api.changePass(oldPassword, newPassword, token);
        return fulfillWithValue(res.data.msg);
    }
    catch (error) {
        console.log(error.response.data.msg)
        return rejectWithValue(error.response.data.msg);
    }
});
export const changeProfilePicture = createAsyncThunk("user/changeProfilePic", async ({ data, token }, { getState, dispatch, rejectWithValue, fulfillWithValue }) => {
    try {
        console.log(data);
        const state = getState();
        const res = await api.editProfilePic(data, state.auth.token);
        // console.log(res);
        // console.log(res.data);
        const profilePicData = {
            picUrl: res.data.profilePicUrl,
            picCloudId: res.data.cloudinary_id,
        }
        return fulfillWithValue(profilePicData);
    }
    catch (error) {
        console.log(error.response.data.msg)
        return rejectWithValue(error.response.data.msg);
    }
});

//* Slice
const userSlice = createSlice({
    name: 'user',
    initialState: initialState,

    extraReducers: (builder) => {
        builder

            .addCase(getUserDetails.fulfilled, (state, action) => {
                // console.log(action.payload)
                return {
                    ...state,
                    _id: action.payload._id,
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName,
                    email: action.payload.email,
                    profilePic: {
                        ...state.profilePic,
                        picUrl: action.payload.picUrl,
                        picCloudId: action.payload.picCloudId,
                    }
                };
            })
            .addCase(editUserProfile.fulfilled, (state, action) => {
                // console.log(action.payload)
                return {
                    ...state,
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName,
                    responseMessage: action.payload.msg,
                    success: true
                };
            })
            .addCase(editUserProfile.rejected, (state, action) => {
                // console.log(action.payload)
                return {
                    ...state,
                    responseMessage: action.payload,
                    success: false
                };
            })
            .addCase(changeUserPass.fulfilled, (state, action) => {
                // console.log(action.payload)
                return {
                    ...state,
                    responseMessage: action.payload,
                    success: true,
                    error: false,
                };
            })
            .addCase(changeUserPass.rejected, (state, action) => {
                // console.log(action.payload)
                return {
                    ...state,
                    responseMessage: action.payload,
                    success: false,
                    error: true,
                };
            })
            .addCase(changeProfilePicture.fulfilled, (state, action) => {
                // console.log(action.payload)
                return {
                    ...state,
                    profilePic: action.payload,
                    responseMessage: 'Profile Picture Updated Successfully',
                    error: false,
                    success: true,
                    pending: false,
                };
            })
            .addCase(changeProfilePicture.pending, (state, action) => {
                return {
                    ...state,
                    pending: true
                };
            })
    }
})

// export const { } = userSlice.actions;

export default userSlice.reducer;
