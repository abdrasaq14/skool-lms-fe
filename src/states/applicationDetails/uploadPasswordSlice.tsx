import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UploadPassportState {
  currentImage: string;
  uploadedImage: string | null;
}

const initialState: UploadPassportState = {
  currentImage: '/images/drag-drop.png',
  uploadedImage: null,
};

const uploadPassportSlice = createSlice({
  name: 'uploadPassport',
  initialState,
  reducers: {
    setCurrentImage: (state, action: PayloadAction<string>) => {
      state.currentImage = action.payload;
    },
    setUploadedImage: (state, action: PayloadAction<string | null>) => {
      state.uploadedImage = action.payload;
    },
    resetUploadPassport: (state) => {
      state.currentImage = '/images/drag-drop.png';
      state.uploadedImage = null;
    },
  },
});

export const { setCurrentImage, setUploadedImage, resetUploadPassport } = uploadPassportSlice.actions;

export default uploadPassportSlice.reducer;
