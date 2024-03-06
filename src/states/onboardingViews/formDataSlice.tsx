// formDataSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  gender: "",
  birthCountry: "",
  residenceCountry: "",
  nationality: "",
};

const formDataSlice = createSlice({
  name: "formData",
  initialState,
  reducers: {
    updateFormData(state, action: PayloadAction<Partial<IFormDataState>>) {
      return {
        ...state,
        ...action.payload,
      };
    },
    clearFormDataTwo(state) {
      return {
        ...state,
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        gender: "",
        birthCountry: "",
        residenceCountry: "",
        nationality: "",
      };
    },
  },
});

export const { updateFormData, clearFormDataTwo } = formDataSlice.actions;
export default formDataSlice.reducer;
