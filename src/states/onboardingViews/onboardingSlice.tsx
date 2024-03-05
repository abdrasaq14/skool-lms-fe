import { PayloadAction, createSlice } from '@reduxjs/toolkit';
 
export interface OnboardingDetailsState {
onboardingDetails: {
    institutionName: string;
    fieldOfStudy: string;
    yearOfGraduation: string;
    gradeOrCGPA: string;
    qualificationType: string;
    countryOfInstitution: string;
  };
}
 
const initialState: OnboardingDetailsState = {
onboardingDetails: {
    institutionName: "",
    fieldOfStudy: "",
    yearOfGraduation: "",
    gradeOrCGPA: "",
    qualificationType: "",
    countryOfInstitution: "",
  },
};
 
const qualificationSlice = createSlice({
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
 
 
 
export const { updateDetails } = qualificationSlice.actions;
 
export default qualificationSlice.reducer;