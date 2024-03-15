import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface notificationState {
  notificationCount: number;
}

const initialState: notificationState = {
    notificationCount: 0,
  };


  const notificationStatusSlice = createSlice({
    name: "notificationStatus",
    initialState,
    reducers: {
      updateStatus: (
        state,
        action: PayloadAction<
          Partial<notificationState["notificationCount"]>
        >
      ) => {
        state.notificationCount = action.payload;
      },
      
    },
  });


  export const { updateStatus } =
  notificationStatusSlice.actions;

  export default notificationStatusSlice.reducer;