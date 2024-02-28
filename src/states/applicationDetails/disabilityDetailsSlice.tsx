import { PayloadAction, createSlice } from '@reduxjs/toolkit'



export interface disabilityDetailsState{
   disabilityDetails: string
}

const initialState: disabilityDetailsState = {
    disabilityDetails: ""
}

const disabilityDetailsSlice = createSlice({
    name: 'disabilityDetails',
    initialState,
    reducers: {
        updateDetails: (state, action: PayloadAction<Partial<disabilityDetailsState['disabilityDetails']>>) => {
            // state.userDetails = {
            //     ...state.userDetails,
            //     ...action.payload
            // }
            state.disabilityDetails = action.payload
        },
        fetchDetails: (state) => {
            
            state.disabilityDetails = localStorage.getItem('disabilityDetails') ? JSON.parse(localStorage.getItem('disabilityDetails') as string) : initialState.disabilityDetails;
        },
        deleteDetails: (state) => {
            state.disabilityDetails = initialState.disabilityDetails;
        }
        
    },
    
})


export const { updateDetails, fetchDetails, deleteDetails } =disabilityDetailsSlice.actions


export default disabilityDetailsSlice.reducer