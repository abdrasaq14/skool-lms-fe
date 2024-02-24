import { useState } from "react";
// import { StepperContext } from "./contexts/StepperContext";
// import Stepper from "./Components/Stepper";
// import StepperControl from "./Components/StepperControl";

// import FindCourse from "./Components/steps/FindCourse";
// import Qualification from "./Components/steps/Qualification";
// import StartCourse from "./Components/steps/StartCourse";

import { StepperContext } from "../contexts/StepperContext";
import Stepper from "./Stepper";
import StepperControl from "./StepperControl";

import FindCourse from "./steps/FindCourse";
import Qualification from "./steps/Qualification";
import StartCourse from "./steps/StartCourse";


const ApplicationView = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState("");
  const [finalData, setFinalData] = useState([]);

  const steps = ["Find your course", "Start your application", "Qualification"];

  const dislplayStep = (step) => {
    switch (step) {
      case 1:
        return <FindCourse />;
      case 2:
        return <StartCourse />;
      case 3:
        return <Qualification />;
    }
  };

  const handleClick = (direction) => {
    let newStep = currentStep;

    direction === "next" ? newStep++ : newStep--;
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };

  return (
    <div className="md:w-1/2 mx-auto shadow-xl rounded-2xl pb-2 bg-white ">
      {/* Stepper */}

      <div className="container horizontal mt-5 ">
        <Stepper steps={steps} currentStep={currentStep} />
      </div>

      {/* Display Components */}

      <div className="my-10 p-10">
        <StepperContext.Provider
          value={{
            userData,
            setUserData,
            finalData,
            setFinalData,
          }}
        >
          {dislplayStep(currentStep)}
        </StepperContext.Provider>
      </div>

      {/* Navigation Control */}

      <StepperControl
        handleClick={handleClick}
        currentStep={currentStep}
        steps={steps}
      />
    </div>
  );
};

export default ApplicationView;
