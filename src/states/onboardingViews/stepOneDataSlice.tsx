// steponeDataSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ISteponeState {
  courseType: string;
  studyMode: string;
  courseSearch: string;
  entryYear: string;
  entryMonth: string;
}

const initialState: ISteponeState = {
  courseType: "",
  studyMode: "",
  courseSearch: "",
  entryYear: "",
  entryMonth: "",
};

const steponeDataSlice = createSlice({
  name: "formData",
  initialState,
  reducers: {
    updateFormData(state, action: PayloadAction<Partial<ISteponeState>>) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { updateFormData } = steponeDataSlice.actions;
export default steponeDataSlice.reducer;
