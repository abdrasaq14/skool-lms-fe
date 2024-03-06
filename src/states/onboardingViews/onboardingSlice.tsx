import { PayloadAction, createSlice } from '@reduxjs/toolkit';
 
export interface OnboardingDetailsState {
onboardingDetails: {
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    gender: string;
    phone: string;
    birthCountry: string;
    residenceCountry: string;
    nationality: string;
    courseType: string;
    studyMode: string;
    courseSearch: string;
    entryYear: string;
    entryMonth: string;
  };
}
 
const initialState: OnboardingDetailsState = {
onboardingDetails: {
    name: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    phone: "",
    birthCountry: "",
    residenceCountry: "",
    nationality: "",
    courseType: "",
    studyMode: "",
    courseSearch: "",
    entryYear: "",
    entryMonth: ""
  },
};
 
const onboardingSlice = createSlice({
  name: 'onboardingDetails',
  initialState,
  reducers: {
    updateDetails: (state, action: PayloadAction<Partial<OnboardingDetailsState['onboardingDetails']>>) => {
      state.onboardingDetails = {
        ...state.onboardingDetails,
        ...action.payload,
      };
    },
    
  },
 
});
 
 
 
export const { updateDetails } = onboardingSlice.actions;
 
export default onboardingSlice.reducer;

