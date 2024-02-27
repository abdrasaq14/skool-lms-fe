import ApplicationHeader from "../../components/applicationComponents/ApplicationHeader";
import MainButton from "../../components/MainButton";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDetails } from "../../states/applicationDetails/academicReferencesSlice";
import { academicReferencesState } from "../../states/applicationDetails/academicReferencesSlice";

const AcademicReferences = () => {
  const [academicReferences, setAcademicReferences] = useState(false);
  const dispatch = useDispatch();
  useSelector((state: academicReferencesState) => state.academicReferences);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(updateDetails(academicReferences));
  };

  return (
    <>
      <ApplicationHeader header_text="Return to Application Home" />
      <div className=" w-9/12 mx-auto text-center mt-12">
        <div className=" text-black w-3/12 mx-auto font-semibold text-2xl mb-4">
          <h3>Academic References</h3>
        </div>
        <div>
          <p>
            We would like to know from past lecturers whether you are a good fit
            for the course
          </p>
          <p>
            If you don't have any, you can still apply. For instance, if you are
            an experienced student
          </p>
        </div>

        <div>
          <form
            onSubmit={handleSubmit}
            className=" w-5/12 mx-auto mt-8 flex flex-col gap-3"
          >
            <div className="w-9/12 mx-auto">
              <div className=" text-left mb-3">
                Do you have any academic references ?
              </div>

              <div>
                <label
                  htmlFor="answerYes"
                  className="flex justify-start gap-2 p"
                >
                  <input
                    onClick={() => setAcademicReferences(true)}
                    type="radio"
                    className=""
                    name="answer"
                    id="answerYes"
                  />
                  <span className="">Yes</span>
                </label>
              </div>

              <div>
                <label htmlFor="answerNO" className="flex justify-start gap-2">
                  <input
                    onClick={() => setAcademicReferences(false)}
                    type="radio"
                    className=""
                    name="answer"
                    id="answerNO"
                    value="No"
                  />
                  <span className="">No</span>
                </label>
              </div>
            </div>

            <div className="mt-4 w-11/12 mx-auto">
              <MainButton button_text="Save and Continue" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AcademicReferences;
