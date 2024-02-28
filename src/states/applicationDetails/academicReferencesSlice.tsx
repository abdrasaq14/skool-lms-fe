import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface academicReferencesState {
  academicReferences: boolean | null;
}

const initialState: academicReferencesState = {
  academicReferences: null,
};

const academicReferencesSlice = createSlice({
  name: "academicReferences",
  initialState,
  reducers: {
    updateDetails: (
      state,
      action: PayloadAction<
        Partial<academicReferencesState["academicReferences"]>
      >
    ) => {
      state.academicReferences = action.payload;
    },
    fetchDetails: (state) => {
      state.academicReferences = localStorage.getItem("employmentDetails")
        ? JSON.parse(localStorage.getItem("employmentDetails") as string)
        : initialState.academicReferences;
    },
    deleteDetails: (state) => {
      state.academicReferences = initialState.academicReferences;
    },
  },
});

export const { updateDetails, fetchDetails, deleteDetails } =
  academicReferencesSlice.actions;

export default academicReferencesSlice.reducer;