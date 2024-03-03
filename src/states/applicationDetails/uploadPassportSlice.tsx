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
    updateDetails: (
      state,
      action: PayloadAction<Partial<UploadPassportState>>
    ) => {
      state.currentImage = action.payload.currentImage || state.currentImage;
      state.uploadedImage = action.payload.uploadedImage || state.uploadedImage;
    },
    fetchDetails: (state) => {
        const storedData = localStorage.getItem("uploadPassport");
        if (storedData) {
          try {
            const parsedData = JSON.parse(storedData) as UploadPassportState;
            state.currentImage = parsedData.currentImage;
            state.uploadedImage = parsedData.uploadedImage;
          } catch (error) {
            console.error("Error parsing stored data:", error);
          }
        }
    },
    deleteDetails: (state) => {
      state.currentImage = initialState.currentImage;
      state.uploadedImage = initialState.uploadedImage;
    },
  },
});

export const {
  setCurrentImage,
  setUploadedImage,
  resetUploadPassport,
  updateDetails,
  fetchDetails,
  deleteDetails,
} = uploadPassportSlice.actions;

export default uploadPassportSlice.reducer;
