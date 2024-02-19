import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'



interface UserDetailsState{
    userDetails: []
}

const initialState: UserDetailsState = {
    userDetails: []
}

const userDetailsSlice = createSlice({
    name: 'userDetails',
    initialState,
    reducers: {
        update: (state, action: PayloadAction<{}>) => {
            [...state.userDetails, action.payload]
            
        },
        fetchData: (state, action) => {
            state.userDetails
        }
        
    },
    extraReducers: (builder) => {
        builder.addCase(fetchDataAsync.fulfilled, (state, action) => {
            state.userDetails = action.payload
        })
    }
})

export const fetchDataAsync = createAsyncThunk(
    "userDetails/fetchDataAsync", 
    async () => {
        const response = await fetch("")
        return response.json()
    }
)

export const { update, fetchData } = userDetailsSlice.actions


export default userDetailsSlice.reducer