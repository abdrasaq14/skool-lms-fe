import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface fundingInformationState {
   fundingInformation: string;
}

const initialState: fundingInformationState = {
    fundingInformation: ""
};

const fundingInformationSlice = createSlice({
    name: 'fundingInformation',
    initialState,
    reducers: {
        updateFundingInformation: (state, action: PayloadAction<Partial<fundingInformationState>>) => {
            state.fundingInformation = action.payload.fundingInformation || initialState.fundingInformation;
        },
        fetchFundingInformation: (state) => {
            state.fundingInformation = localStorage.getItem('fundingInformation') || initialState.fundingInformation;
        },
        deleteFundingInformation: (state) => {
            state.fundingInformation = initialState.fundingInformation;
        }
    }
});

export const { updateFundingInformation, fetchFundingInformation, deleteFundingInformation } = fundingInformationSlice.actions;

export default fundingInformationSlice.reducer;
