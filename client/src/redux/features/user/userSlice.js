import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../api"
import { fecthCardsData } from "../cards/cardsSlice"
import { fecthLoginIdsData } from "../loginsId/loginsIdSlice"
import { fetchDocsData } from "../docs/docsSlice"
import { fectchActivitiesData } from "../activity/activitiesSlice"
import { fetchRecentlyAddedData } from "../recentlyAdded/recentlyAddedSlice"
import { fetchFavoritesData } from "../favorites/favoritesSlice"
import moment from "moment";
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
    action: undefined
}

export const getUserDetails = createAsyncThunk("user/getUser", async (token, { getState, dispatch, rejectWithValue, fulfillWithValue }) => {
    try {
        const res = await api.getUser(token);
        const userData = res.data.user;
        console.log(userData)
        const profilePicData = res.data.user.profilePic
        const nameString = userData.name.split(/[" "]+/);
        const userRes = {
            firstName: nameString[0],
            lastName: nameString[1],
            email: userData.email,
            _id: userData._id,
            picUrl: profilePicData?.picUrl,
            picCloudId: profilePicData?.cloudinary_id,
            joinedDate: undefined,
            updateDate: userData.updateDate,
        }
        // console.log(userRes);
        return fulfillWithValue(userRes);
    } catch (error) {
        // console.log('error', error)
        const errorMessage = error?.response.data.msg;
        return rejectWithValue({ errorMessage });
    }
});

export const editUserProfile = createAsyncThunk("user/editProfile", async ({ token, profileData }, { getState, dispatch, rejectWithValue, fulfillWithValue }) => {
    try {

        const date = moment().format('DD');
        const month = moment().format('MMM');
        const year = moment().format('YYYY');
        const dateString = date + " " + month + " " + year;
        profileData.lastUpdateDate = dateString;

        console.log(profileData, dateString);

        const res = await api.editProfile(token, profileData);
        const userData = res.data.newData;
        console.log(userData);
        const nameString = userData.name.split(/[" "]+/);
        const resData =
        {
            firstName: nameString[0],
            lastName: nameString[1],
            msg: res.data.msg,
            updateDate: res.data.newData?.updateDate
        }

        console.log(resData)
        return fulfillWithValue(resData);
    } catch (error) {
        // console.log('error', error.response.data.msg)
        const errorMessage = error?.response.data.msg;
        return rejectWithValue({ errorMessage });
    }
});

export const changeUserPass = createAsyncThunk("user/changeProfilePass", async ({ oldPassword, newPassword, token }, { getState, dispatch, rejectWithValue, fulfillWithValue }) => {
    try {
        // console.log(token, oldPassword, newPassword);
        const res = await api.changePass(oldPassword, newPassword, token);
        return fulfillWithValue(res.data.msg);
    }
    catch (error) {
        // console.log(error.response.data.msg)
        return rejectWithValue(error.response.data.msg);
    }
});
export const changeProfilePicture = createAsyncThunk("user/changeProfilePic", async ({ data, token }, { getState, dispatch, rejectWithValue, fulfillWithValue }) => {
    try {
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
        // console.log(error.response.data.msg)
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
                    },
                    updateDate: action.payload.updateDate
                };
            })
            .addCase(getUserDetails.rejected, (state, action) => {
                return {
                    ...state,
                };
            })
            .addCase(editUserProfile.fulfilled, (state, action) => {
                console.log(action.payload)
                return {
                    ...state,
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName,
                    updateDate: action.payload.updateDate,
                    responseMessage: action.payload.msg,
                    success: true,
                    action: undefined,
                    pending: false
                };
            })
            .addCase(editUserProfile.pending, (state, action) => {
                return {
                    ...state,
                    pending: true,
                    action: 'editProfile',
                };
            })
            .addCase(editUserProfile.rejected, (state, action) => {
                return {
                    ...state,
                    responseMessage: action.payload,
                    action: 'editProfile',
                    success: false,
                    pending: false
                };
            })
            .addCase(changeUserPass.fulfilled, (state, action) => {
                return {
                    ...state,
                    responseMessage: action.payload,
                    success: true,
                    error: false,
                    pending: false,
                    action: undefined
                };
            })
            .addCase(changeUserPass.pending, (state, action) => {
                return {
                    ...state,
                    pending: true,
                    action: 'changePass',
                    success: undefined,
                    error: undefined,
                };
            })
            .addCase(changeUserPass.rejected, (state, action) => {
                return {
                    ...state,
                    responseMessage: action.payload,
                    success: false,
                    error: true,
                    action: "changePass",
                    pending: false
                };
            })
            .addCase(changeProfilePicture.fulfilled, (state, action) => {

                return {
                    ...state,
                    profilePic: action.payload,
                    responseMessage: 'Profile Picture Updated Successfully',
                    error: false,
                    success: true,
                    pending: false,
                    action: undefined
                };

            })
            .addCase(changeProfilePicture.pending, (state, action) => {
                return {
                    ...state,
                    pending: true,
                    action: 'editProfilePic',
                    success: undefined,
                    error: undefined,
                };
            })
            .addCase(changeProfilePicture.rejected, (state, action) => {
                return {
                    ...state,
                    responseMessage: action.payload,
                    action: 'editProfilePic',
                    pending: false,
                    success: false,
                    error: true,
                };
            })
    }
})

// export const { } = userSlice.actions;

export default userSlice.reducer;
