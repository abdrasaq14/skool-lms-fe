import React, { useRef, ChangeEvent, DragEvent } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentImage, setUploadedImage } from '../../states/applicationDetails/uploadPasswordSlice';
import ApplicationHeader from '../../components/applicationComponents/ApplicationHeader';
import MainButton from '../../components/MainButton';

interface UploadPassportState {
  uploadPassport: {
    currentImage: string;
    uploadedImage: string | null;
  };
}

function UploadPassport() {
  const dispatch = useDispatch();
  const currentImage = useSelector((state: UploadPassportState) => state.uploadPassport.currentImage);
  const uploadedImage = useSelector((state: UploadPassportState) => state.uploadPassport.uploadedImage);

  // Local component state
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Event handlers
  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    handleFile(selectedFile);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    handleFile(droppedFile);
  };

  const handleFile = (selectedFile: File | undefined) => {
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      // Dispatch actions to update Redux state
      dispatch(setUploadedImage(imageUrl));
      dispatch(setCurrentImage(imageUrl));
    } else {
      // Dispatch action to reset Redux state
      dispatch(setUploadedImage(null));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your form submission logic or dispatch an action if needed
  };

  return (
    <>
      <ApplicationHeader header_text="Return to Application Home" />

      <div
        className="w-9/12 mx-auto text-center mt-12"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="text-black w-5/12 mx-auto font-semibold text-4xl mb-4">
          <h3>Passport Upload</h3>
        </div>

        <div className="pb-4 text-black text-2xl">
          <p>A copy of your current passport's photo page should be uploaded.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div
            className="border-dashed border-4 border-gray-100 w-9/12 rounded-lg mx-auto"
            onClick={handleClick}
          >
            {uploadedImage ? (
              <img src={uploadedImage} className="mx-auto pt-12 pb-4 w-2/12" alt="Uploaded" />
            ) : (
              <div>
                <img
                  src={currentImage}
                  className="mx-auto pt-12 pb-4 w-2/12"
                  alt="Drag and drop area"
                />
                <h5 className="text-black text-2xl mb-4 ">
                  Drop your files here or{" "}
                  <span className="text-green-500 cursor-pointer">browse</span>
                </h5>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            )}

            <h4 className="pb-12 text-gray-400 text-2xl">Maximum size: 50MB</h4>
          </div>
          <div className="mt-4 w-5/12 mx-auto">
            <MainButton button_text="Save and Continue" />
          </div>
        </form>
      </div>
    </>
  );
}

export default UploadPassport;

