import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'



interface UserDetailsState{
    userDetails: {
        firstName: string,
        lastName: string,
        email: string,
        phone: string,
        country: string,

    }
}

const initialState: UserDetailsState = {
    userDetails:{
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        country: "",
    }
}

const userDetailsSlice = createSlice({
    name: 'userDetails',
    initialState,
    reducers: {
        updateDetails: (state, action: PayloadAction<Partial<UserDetailsState['userDetails']>>) => {
            state.userDetails = {
                ...state.userDetails,
                ...action.payload
            }
   
        },
        fetchDetails: (state) => {
            
            state.userDetails = localStorage.getItem('userDetails') ? JSON.parse(localStorage.getItem('userDetails') as string) : initialState.userDetails;
        },
        deleteDetails: (state) => {
            state.userDetails = initialState.userDetails;
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

export const { updateDetails, fetchDetails } = userDetailsSlice.actions


export default userDetailsSlice.reducer