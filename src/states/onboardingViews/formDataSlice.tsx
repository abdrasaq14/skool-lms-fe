// formDataSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IFormDataState {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    gender: string;
    birthCountry: string;
    residenceCountry: string;
    nationality: string;
}

const initialState: IFormDataState = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    birthCountry: '',
    residenceCountry: '',
    nationality: '',
};

const formDataSlice = createSlice({
    name: 'formData',
    initialState,
    reducers: {
        updateFormData(state, action: PayloadAction<Partial<IFormDataState>>) {
            return {
                ...state,
                ...action.payload,
            };
        },
    },
});

export const { updateFormData } = formDataSlice.actions;
export default formDataSlice.reducer;
