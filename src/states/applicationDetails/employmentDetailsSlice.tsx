import { PayloadAction, createSlice } from '@reduxjs/toolkit'



export interface employmentDetailsState{
    employmentDetails: boolean
}

const initialState: employmentDetailsState = {
    employmentDetails: false
}

const employmentDetailsSlice = createSlice({
    name: 'employmentDetails',
    initialState,
    reducers: {
        updateDetails: (state, action: PayloadAction<Partial<employmentDetailsState['employmentDetails']>>) => {
            // state.userDetails = {
            //     ...state.userDetails,
            //     ...action.payload
            // }
            state.employmentDetails = action.payload
        },
        fetchDetails: (state) => {
            
            state.employmentDetails = localStorage.getItem('employmentDetails') ? JSON.parse(localStorage.getItem('employmentDetails') as string) : initialState.employmentDetails;
        },
        deleteDetails: (state) => {
            state.employmentDetails = initialState.employmentDetails;
        }
        
    },
    
})


export const { updateDetails, fetchDetails, deleteDetails } = employmentDetailsSlice.actions


export default employmentDetailsSlice.reducer