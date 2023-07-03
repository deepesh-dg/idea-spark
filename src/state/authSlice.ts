import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface AuthState {
    status: boolean;
    token?: string;
}

const initialState: AuthState = {
    status: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<string>) => {
            state.status = true;
            state.token = action.payload;
        },
        logout: (state) => {
            state.status = false;
            state.token = undefined;
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
