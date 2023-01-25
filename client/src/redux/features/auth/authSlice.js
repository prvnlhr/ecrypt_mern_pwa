import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../api"
import { getUserDetails } from "../user/userSlice"

const initialState = {
    token: undefined,
    authResponseMessage: undefined,
    isLogged: false,
    error: false,
    success: false,
}

export const registerUser = createAsyncThunk("auth/register", async (formData, { getState, dispatch, rejectWithValue, fulfillWithValue }) => {
    try {
        const res = await api.registerNewUser(formData);
        console.log(res.data);
        const { msg } = res.data;
        return fulfillWithValue(msg);
    } catch (error) {
        console.log(error.response.data.msg)
        const errorMessage = 'Error in registration'
        return rejectWithValue({ errorMessage });
    }
});

export const activateUserAccount = createAsyncThunk("auth/activateAccount", async (activation_token, { getState, dispatch, rejectWithValue, fulfillWithValue }) => {
    console.log(activation_token);
    try {
        const res = await api.accountActivation(activation_token);
        console.log(res);
        return fulfillWithValue(res.data.msg);
    } catch (error) {
        console.log(error.response.data.msg)
        return rejectWithValue(error.response.data.msg);
    }
});
export const loginUser = createAsyncThunk("auth/login", async ({ formData, navigate }, { getState, dispatch, rejectWithValue, fulfillWithValue }) => {
    // console.log(formData, navigate);
    try {
        const res = await api.login(formData);
        const response = {
            token: res.data,
        }
        navigate('/')
        return fulfillWithValue(response);
    } catch (error) {
        console.log(error.response.data.msg)
        return rejectWithValue(error.response.data.msg);
    }
});

export const logOutUser = createAsyncThunk("auth/logout", async ({ }, { getState, dispatch, rejectWithValue, fulfillWithValue }) => {
    console.log('logout slice')
    try {
        const res = await api.logout();
        console.log(res.data.msg);
        return fulfillWithValue(res.data.msg);
    } catch (error) {
        console.log(error.response.data.msg)
        return rejectWithValue(error.response.data.msg);
    }
})

export const getAuthToken = createAsyncThunk("auth/getAuthToken", async ({ }, { getState, dispatch, rejectWithValue, fulfillWithValue }) => {
    try {
        const res = await api.getToken();
        console.log('getToken Slice', res.data);
        const accessToken = res.data;
        // dispatch(getUserDetails(accessToken))
        return fulfillWithValue(accessToken);
    } catch (error) {
        console.log(error.response.data.msg)
        return rejectWithValue(error.response.data.msg);
    }
});


//* Slice
const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,

    reducers: {
        setAuthToken(state, action) {
            console.log(action.payload)
            return {
                ...state,
                isLogged: true,
                token: action.payload,
            }
        },
        forceLogout(state, action) {
            console.log(action.payload.msg)
            return {
                ...state,
                token: undefined,
                authResponseMessage: action.payload.msg,
                isLogged: false,
                error: true,
                success: false,
            }
        },

    },

    extraReducers: (builder) => {
        builder
            .addCase(registerUser.fulfilled, (state, action) => {
                return {
                    ...state,
                    authResponseMessage: action.payload,
                    success: true,
                    error: false
                };
            })
            .addCase(registerUser.rejected, (state, action) => {
                return {
                    ...state,
                    authResponseMessage: 'Error in registration',
                    error: true,
                    success: false
                };
            })
            .addCase(activateUserAccount.fulfilled, (state, action) => {
                console.log(action.payload)
                return {
                    ...state,
                    authResponseMessage: action.payload,
                    error: false,
                    success: true
                };
            })
            .addCase(activateUserAccount.rejected, (state, action) => {
                return {
                    ...state,
                    authResponseMessage: action.payload,
                    error: true,
                    success: false
                };
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                console.log(action.payload);
                return {
                    ...state,
                    authResponseMessage: undefined,
                    token: action.payload.token,
                    error: false,
                    success: true,
                    isLogged: true,
                };
            })
            .addCase(loginUser.rejected, (state, action) => {
                return {
                    ...state,
                    authResponseMessage: action.payload,
                    error: true,
                    success: false,
                    isLogged: false,
                };
            })
            .addCase(getAuthToken.fulfilled, (state, action) => {
                return {
                    ...state,
                    token: action.payload,
                    error: false,
                    success: true,
                    isLogged: true,
                };
            })
            .addCase(getAuthToken.pending, (state, action) => {
                return {
                    ...state,
                    isLogged: undefined,

                };
            })
            .addCase(getAuthToken.rejected, (state, action) => {
                console.log(action.payload);
                return {
                    ...state,
                    isLogged: false,
                    token: undefined,
                    error: true,
                    authResponseMessage: action.payload,
                    success: false
                };
            })
            .addCase(logOutUser.fulfilled, (state, action) => {
                return {
                    ...state,
                    authResponseMessage: action.payload,
                    token: undefined,
                    error: false,
                    success: true,
                    isLogged: false,
                };
            })
            .addCase(logOutUser.rejected, (state, action) => {
                return {
                    ...state,
                    error: true,
                    success: false,
                };
            })

    }
})

export const { setAuthToken, forceLogout } = authSlice.actions;

export default authSlice.reducer;
