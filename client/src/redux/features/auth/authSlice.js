import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../api"
import { getUserDetails } from "../user/userSlice"

const initialState = {
    token: undefined,
    authResponseMessage: undefined,
    isLoading: true,
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
        const errorMessage = error?.response.data.msg
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
        return fulfillWithValue(accessToken);
    } catch (error) {
        console.log(error.response.data.msg)
        return rejectWithValue(error.response.data.msg);
    }
});

export const forgotAccountPass = createAsyncThunk("auth/forgotPass", async (email, { getState, dispatch, rejectWithValue, fulfillWithValue }) => {

    try {
        const res = await api.forgotPass(email);
        console.log(res.data.msg)
        return fulfillWithValue(res.data.msg);
    }

    catch (error) {
        console.log(error.response.data.msg)
        return rejectWithValue(error.response.data.msg);
    }
});

export const resetUserPass = createAsyncThunk("auth/resetPassword", async ({ password, token }, { getState, dispatch, rejectWithValue, fulfillWithValue }) => {
    try {
        console.log(token, password);
        const res = await api.resetPass(token, password);
        console.log(res);
        return fulfillWithValue(res.data.msg);
    }
    catch (error) {
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
            // console.log(action.payload)
            return {
                ...state,
                isLogged: true,
                token: action.payload,
            }
        },
        forceLogout(state, action) {
            // console.log(action.payload.msg)
            return {
                ...state,
                token: undefined,
                authResponseMessage: action.payload.msg,
                isLogged: false,
                error: true,
                success: false,
            }
        },
        clearAuthResponseMessage(state, action) {
            return {
                ...state,
                authResponseMessage: undefined,
            }
        }

    },

    extraReducers: (builder) => {
        builder
            .addCase(registerUser.fulfilled, (state, action) => {
                return {
                    ...state,
                    authResponseMessage: action.payload,
                    success: true,
                    error: false,
                    isLoading: false,

                };
            })
            .addCase(registerUser.pending, (state, action) => {
                // console.log(action.payload);
                return {
                    ...state,
                    authResponseMessage: undefined,
                    isLoading: true,
                };
            })
            .addCase(registerUser.rejected, (state, action) => {
                console.log(action.payload);
                return {
                    ...state,
                    authResponseMessage: action.payload.errorMessage,
                    error: true,
                    success: false,
                    isLoading: false,

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
                return {
                    ...state,
                    authResponseMessage: undefined,
                    token: action.payload.token,
                    error: false,
                    success: true,
                    isLogged: true,
                    isLoading: false,

                };
            })
            .addCase(loginUser.pending, (state, action) => {
                return {
                    ...state,
                    authResponseMessage: undefined,
                    token: undefined,
                    error: false,
                    success: false,
                    isLogged: false,
                    isLoading: true
                };
            })
            .addCase(loginUser.rejected, (state, action) => {
                return {
                    ...state,
                    authResponseMessage: action.payload,
                    error: true,
                    success: false,
                    isLogged: false,
                    isLoading: false,
                };
            })
            .addCase(getAuthToken.fulfilled, (state, action) => {
                return {
                    ...state,
                    token: action.payload,
                    error: false,
                    success: true,
                    isLogged: true,
                    isLoading: false,

                };
            })
            .addCase(getAuthToken.pending, (state, action) => {
                return {
                    ...state,
                    token: undefined,
                    authResponseMessage: undefined,
                    isLogged: undefined,
                    error: false,
                    success: false,

                };
            })
            .addCase(getAuthToken.rejected, (state, action) => {
                // console.log(action.payload);
                return {
                    ...state,
                    isLogged: false,
                    token: undefined,
                    error: true,
                    authResponseMessage: action.payload,
                    success: false,
                    isLoading: false,

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
                    isLoading: false,
                };
            })
            .addCase(logOutUser.rejected, (state, action) => {
                return {
                    ...state,
                    error: true,
                    success: false,
                    isLoading: false,
                };
            })
            .addCase(logOutUser.pending, (state, action) => {
                return {
                    ...state,
                    isLoading: true,

                };
            })
            .addCase(forgotAccountPass.fulfilled, (state, action) => {
                return {
                    ...state,
                    authResponseMessage: action.payload,
                    token: undefined,
                    error: false,
                    success: true,
                    isLogged: false,
                    isLoading: false,

                };
            })
            .addCase(resetUserPass.fulfilled, (state, action) => {
                return {
                    ...state,
                    authResponseMessage: action.payload,
                    token: undefined,
                    error: false,
                    success: true,
                    isLogged: false,
                };
            })
            .addCase(resetUserPass.rejected, (state, action) => {
                return {
                    ...state,
                    authResponseMessage: action.payload,
                    token: undefined,
                    error: true,
                    success: false,
                    isLogged: false,
                };
            })

    }
})

export const { setAuthToken, forceLogout, clearAuthResponseMessage } = authSlice.actions;

export default authSlice.reducer;
