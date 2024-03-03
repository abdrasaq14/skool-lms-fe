import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface personalStatementState {
  personalStatement: string;
}

const initialState: personalStatementState = {
  personalStatement: "",
};

const personalStatementSlice = createSlice({
  name: "personalStatement",
  initialState,
  reducers: {
    updatePersonalStatement: (
      state,
      action: PayloadAction<Partial<personalStatementState["personalStatement"]>>
    ) => {
      state.personalStatement = action.payload;
    },
  },
});

export const { updatePersonalStatement } = personalStatementSlice.actions;

export default personalStatementSlice.reducer;