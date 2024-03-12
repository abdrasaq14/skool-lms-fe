import { useEffect, useState } from "react";
import ApplicationHeader from "../../components/applicationComponents/ApplicationHeader";
import MainButton from "../../components/MainButton";
import { useDispatch, useSelector } from "react-redux";
import { updateDetails } from "../../states/applicationDetails/qualificationsSLice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import { QualificationDetailsState } from "../../states/applicationDetails/qualificationsSLice";

interface validationErrors {
  institutionName?: string;
  fieldOfStudy?: string;
  yearOfGraduation?: string;
  gradeOrCGPA?: string;
  qualificationType?: string;
  countryOfInstitution?: string;
}

const Qualification = () => {
  const storedValue = useSelector(
    (state: RootState) => state.qualifications.qualificationDetails
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<
    Partial<QualificationDetailsState["qualificationDetails"]>
  >({
    institutionName: "",
    fieldOfStudy: "",
    yearOfGraduation: "",
    gradeOrCGPA: "",
    qualificationType: "",
    countryOfInstitution: "",
  });

  const [validationErrors, setValidationErrors] = useState<validationErrors>(
    {}
  );

  useEffect(() => {
    if (storedValue !== null && storedValue !== undefined) {
      setFormData(storedValue);
    }
  }, [storedValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors: validationErrors = {};

    if (!formData.institutionName) {
      validationErrors["institutionName"] = "Institution Name is required";
    }
    if (!formData.fieldOfStudy) {
      validationErrors["fieldOfStudy"] = "Field of Study is required";
    }
    if (!formData.yearOfGraduation) {
      validationErrors["yearOfGraduation"] = "Year of Graduation is required";
    }
    if (!formData.gradeOrCGPA) {
      validationErrors["gradeOrCGPA"] = "Grade or CGPA is required";
    }
    if (!formData.qualificationType) {
      validationErrors["qualificationType"] = "Qualification Type is required";
    }
    if (!formData.countryOfInstitution) {
      validationErrors["countryOfInstitution"] =
        "Country of Institution is required";
    }
    if (Object.keys(validationErrors).length > 0) {
      setValidationErrors(validationErrors as validationErrors);
      return;
    }

    if (formData !== null) {
      dispatch(updateDetails(formData));
      navigate("/dashboard/application");

      setValidationErrors({});
    }
  };

  return (
    <>
      <ApplicationHeader
        linkTo="/dashboard/application"
        header_text="Return to start your Application"
      />

      <div className=" ">
        <h2 className="text-center text-lg font-bold text-black-1000">
          Upload your highest Qualifications
        </h2>

        <p className="text-center text-sm  font-bold text-gray-500">
          For each course you are applying to, we only require your greatest
          degree.
          <br />
          You will have the option to upload additional qualifications at a
          later stage of the
          <br /> process, should they be relevant.
        </p>

        <div className="bg-white w-3/12 mx-auto mt-4 py-4 px-6 border rounded-2xl">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-md font-medium text-black text-left">
                Institution Name:
                <input
                  type="text"
                  name="institutionName"
                  value={formData.institutionName}
                  onChange={handleChange}
                  placeholder="Enter Institution Name"
                  className="block w-full border-2 rounded-lg border-gray-200 py-2.5 px-3 text-sm focus:border-black"
                />
              </label>

              {validationErrors.institutionName && (
                <div className="text-red-500 text-sm mt-1 ml-1">
                  {validationErrors.institutionName}
                </div>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-md font-medium text-black text-left">
                Field/Area of Study:
                <input
                  type="text"
                  name="fieldOfStudy"
                  value={formData.fieldOfStudy}
                  onChange={handleChange}
                  placeholder="Enter Field/Area of Study"
                  className="block w-full border-2 rounded-lg border-gray-200 py-2.5 px-3 text-sm focus:border-black"
                />
              </label>
              {validationErrors.fieldOfStudy && (
                <div className="text-red-500 text-sm mt-1 ml-1">
                  {validationErrors.fieldOfStudy}
                </div>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-md font-medium text-black text-left">
                Year of Graduation:
                <input
                  type="text"
                  name="yearOfGraduation"
                  value={formData.yearOfGraduation}
                  onChange={handleChange}
                  placeholder="Enter Year of Graduation"
                  className="block w-full border-2 rounded-lg border-gray-200 py-2.5 px-3 text-sm focus:border-black"
                />
              </label>
              {validationErrors.yearOfGraduation && (
                <div className="text-red-500 text-sm mt-1 ml-1 ">
                  {validationErrors.yearOfGraduation}
                </div>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-md font-medium text-black text-left">
                Grade or CGPA:
                <input
                  type="text"
                  name="gradeOrCGPA"
                  value={formData.gradeOrCGPA}
                  onChange={handleChange}
                  placeholder="Enter Grade or CGPA"
                  className="block w-full border-2 rounded-lg text-black border-gray-200 py-2.5 px-3 text-sm focus:border-black"
                />
              </label>
              {validationErrors.gradeOrCGPA && (
                <div className="text-red-500 text-sm mt-1 ml-1">
                  {validationErrors.gradeOrCGPA}
                </div>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-md font-medium text-black text-left">
                Qualification Type:
                <select
                  name="qualificationType"
                  value={formData.qualificationType}
                  onChange={handleSelectChange}
                  className="block w-full border-2 rounded-lg border-gray-200 py-2.5 px-3 text-sm focus:border-black"
                >
                  <option value="">Select Qualification Type</option>
                  <option value="Masters">Masters</option>
                  <option value="Bachelor Degree">Bachelor Degree</option>
                  <option value="Higher National Diploma">
                    Higher National Diploma
                  </option>
                </select>
              </label>
              {validationErrors.qualificationType && (
                <div className="text-red-500 text-sm mt-1 ml-1">
                  {validationErrors.qualificationType}
                </div>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-md font-medium text-black text-left">
                Country of Institution:
                <input
                  type="text"
                  name="countryOfInstitution"
                  value={formData.countryOfInstitution}
                  onChange={handleChange}
                  placeholder="Enter Country of Institution"
                  className="block w-full border-2 rounded-lg border-gray-200 py-2.5 px-3 text-sm focus:border-black"
                />
              </label>
              {validationErrors.countryOfInstitution && (
                <div className="text-red-500 text-sm mt-1 ml-1">
                  {validationErrors.countryOfInstitution}
                </div>
              )}
            </div>
            <div className="mb-">
              <div className="flex flex-col gap-3 mx-auto">
                <MainButton button_text={"Save and Continue"} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Qualification;
