import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserState = {
    email: string;
};

const initialState: UserState = {
    email: '',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ email: string }>) => {
            state.email = action.payload.email;
            localStorage.setItem('user', JSON.stringify(state)); // Store only email
        },
        logout: (state) => {
            localStorage.removeItem('user');
            state.email = ''; // Clear email on logout
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
