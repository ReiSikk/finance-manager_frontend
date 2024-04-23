import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { UserQueries } from '../api/UserQueries';
import * as SecureStore from 'expo-secure-store';

interface UserState {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}

interface User {
    id: number;
    username: string;
    role: Role
}

export enum Role {
    User = 'user',
    PremiumUser = 'premium',
    Admin = 'admin',
}

const initialState: UserState = {
    user: null,
    token: null,
    loading: false,
    error: null,
};

export const login = createAsyncThunk(
    'auth/login',
    async (credentials: { username: string; password: string }, thunkAPI) => {
        // try {
            
            const response = await UserQueries.login(credentials.username, credentials.password);
            console.log(response);
            return response;
            

        // } catch (error) {
        //     return thunkAPI.rejectWithValue(error.message);
        // }
    }
);

export const signup = createAsyncThunk(
    'auth/signup',
    async (userData: { username: string; password: string }, thunkAPI) => {
        // try {
            const response = UserQueries.signup(userData.username, userData.password)
            return response;
            
            
        // } catch (error) {
        //     return thunkAPI.rejectWithValue(error.message);
        // }
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            console.log("action.payload in setToken", action.payload);
            state.token = action.payload;
        },
        logout: (state) => {
            state.token = '';
            console.log("state.token in logout", state.token);
            SecureStore.deleteItemAsync('token')
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                // state.user = action.payload.user;
                state.token = action.payload.access_token;
                SecureStore.setItemAsync('token', action.payload.access_token);
                console.log("state.token in login.fulfilled", state.token);
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(signup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                // state.token = action.payload.token;
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setToken, logout } = userSlice.actions
// export const selectUser = (state: RootState) => state.user.user;
// export const selectToken = (state: RootState) => state.user.token;
// export const selectLoading = (state: RootState) => state.user.loading;
// export const selectError = (state: RootState) => state.user.error;

export default userSlice.reducer;