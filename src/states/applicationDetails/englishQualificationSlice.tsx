import { PayloadAction, createSlice } from '@reduxjs/toolkit'



export interface englishQualificationState{
    englishQualification: boolean | null
}

const initialState: englishQualificationState = {
    englishQualification: null
}

const englishQualificationSlice = createSlice({
    name: 'englishQualification',
    initialState,
    reducers: {
        updateDetails: (state, action: PayloadAction<Partial<englishQualificationState['englishQualification']>>) => {
            state.englishQualification = action.payload
        },
    },
    
})


export const { updateDetails } = englishQualificationSlice.actions


export default englishQualificationSlice.reducer