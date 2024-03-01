import { PayloadAction, createSlice } from '@reduxjs/toolkit';
 
export interface QualificationDetailsState {
qualificationDetails: {
    institutionName: string;
    fieldOfStudy: string;
    yearOfGraduation: string;
    gradeOrCGPA: string;
    qualificationType: string;
    countryOfInstitution: string;
  };
}
 
const initialState: QualificationDetailsState = {
qualificationDetails: {
    institutionName: "",
    fieldOfStudy: "",
    yearOfGraduation: "",
    gradeOrCGPA: "",
    qualificationType: "",
    countryOfInstitution: "",
  },
};
 
const qualificationSlice = createSlice({
  name: 'qualificationDetails',
  initialState,
  reducers: {
    updateDetails: (state, action: PayloadAction<Partial<QualificationDetailsState['qualificationDetails']>>) => {
      state.qualificationDetails = {
        ...state.qualificationDetails,
        ...action.payload,
      };
    },
    
  },
 
});
 
 
 
export const { updateDetails } = qualificationSlice.actions;
 
export default qualificationSlice.reducer;