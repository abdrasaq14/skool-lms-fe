import { fetchDetails, updateDetails } from "../states/userDetails/userDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useState } from "react";

function TestPage() {
   
    const dispatch = useDispatch();
    const userDetails = useSelector((state: RootState) => state.userDetails);


  return (
    <>
      <div className="bg-yellow-500">
        <h1 className="text-center bg-red-500 my-20 text-5xl p-5 mx-auto w-fit">
          Landing page
        </h1>
        
        
      </div>
    </>
  );
}

export default TestPage;
