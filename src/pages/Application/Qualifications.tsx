import { useEffect, useState } from "react";
import ApplicationHeader from "../../components/applicationComponents/ApplicationHeader";
import MainButton from "../../components/MainButton";
import { useDispatch, useSelector } from "react-redux";
import { updateDetails } from "../../states/applicationDetails/qualificationsSLice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import { QualificationDetailsState } from "../../states/applicationDetails/qualificationsSLice";


const Qualification = () => {

  const storedValue = useSelector(
    (state: RootState) => state.qualifications.qualificationDetails
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Partial<QualificationDetailsState['qualificationDetails']>>({
    institutionName: "",
    fieldOfStudy: "",
    yearOfGraduation: "",
    gradeOrCGPA: "",
    qualificationType: "",
    countryOfInstitution: "",
  });
  


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
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if(!formData.institutionName || !formData.fieldOfStudy || !formData.yearOfGraduation || !formData.gradeOrCGPA || !formData.qualificationType || !formData.countryOfInstitution) {
      alert("Please fill in all fields");
      return;
    }

    else if (formData !== null) { 
      dispatch(updateDetails(formData));
      navigate("/dashboard/application");
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
                  required
                  placeholder="Enter Institution Name"
                  className="block w-full border-2 rounded-lg border-gray-200 py-2.5 px-3 text-sm focus:border-black"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-md font-medium text-black text-left">
                Field/Area of Study:
                <input
                  type="text"
                  name="fieldOfStudy"
                  value={formData.fieldOfStudy}
                  onChange={handleChange}
                  required
                  placeholder="Enter Field/Area of Study"
                  className="block w-full border-2 rounded-lg border-gray-200 py-2.5 px-3 text-sm focus:border-black"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-md font-medium text-black text-left">
                Year of Graduation:
                <input
                  type="text"
                  name="yearOfGraduation"
                  value={formData.yearOfGraduation}
                  onChange={handleChange}
                  required
                  placeholder="Enter Year of Graduation"
                  className="block w-full border-2 rounded-lg border-gray-200 py-2.5 px-3 text-sm focus:border-black"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-md font-medium text-black text-left">
                Grade or CGPA:
                <input
                  type="text"
                  name="gradeOrCGPA"
                  value={formData.gradeOrCGPA}
                  onChange={handleChange}
                  required
                  placeholder="Enter Grade or CGPA"
                  className="block w-full border-2 rounded-lg text-black border-gray-200 py-2.5 px-3 text-sm focus:border-black"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-md font-medium text-black text-left">
                Qualification Type:
                <select
                  name="qualificationType"
                  value={formData.qualificationType}
                  onChange={handleSelectChange}
                  required
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
            </div>
            <div className="mb-4">
              <label className="block text-md font-medium text-black text-left">
                Country of Institution:
                <input
                  type="text"
                  name="countryOfInstitution"
                  value={formData.countryOfInstitution}
                  onChange={handleChange}
                  required
                  placeholder="Enter Country of Institution"
                  className="block w-full border-2 rounded-lg border-gray-200 py-2.5 px-3 text-sm focus:border-black"
                />
              </label>
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
}
;

export default Qualification;
