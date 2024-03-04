import { createSlice } from '@reduxjs/toolkit';

interface UserDetailsState {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
}

const initialState: UserDetailsState = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
};

const userDetailsSlice = createSlice({
    name: 'userDetails',
    initialState,
    reducers: {
        login: (state, action) => {
            return {
                ...state,
                ...action.payload,
            };
        },
        logout: () => initialState,
    },
});

export const { login, logout } = userDetailsSlice.actions;

export default userDetailsSlice.reducer;
