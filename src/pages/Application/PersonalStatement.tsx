import MainButton from "../../components/MainButton";
import ApplicationHeader from "../../components/applicationComponents/ApplicationHeader";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePersonalStatement } from "../../states/applicationDetails/personalStatementSlice";

import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function PersonalStatement() {
  const personalStatementRedux = useSelector(
    (state: RootState) => state.personalStatement.personalStatement
  );
  console.log(personalStatementRedux);

  const [personalStatement, setPersonalStatement] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const storedValue = localStorage.getItem("personalStatement");
    if (storedValue !== null) {
      setPersonalStatement(storedValue);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (personalStatement !== null) {
      const strippedValue = stripHtmlTags(personalStatement);
      dispatch(updatePersonalStatement(strippedValue));
      localStorage.setItem("personalStatement", strippedValue);
      navigate("/dashboard/application");
    }
  };

  const stripHtmlTags = (html: string): string => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const handleValueChange = (value: string) => {
    setPersonalStatement(value);
  };

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike", "link"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["code-block"],
      ["emoji"],
    ],
  };

  const formats = [
    "bold",
    "italic",
    "underline",
    "link",
    "list",
    "bullet",
    "code-block",
    "emoji",
    "strike",
  ];

  return (
    <>
      <ApplicationHeader
        linkTo="/dashboard/application"
        header_text="Return to Application Home"
      />

      <div className=" w-9/12 mx-auto text-center mt-12">
        <div className=" text-black w-3/10 mx-auto font-semibold text-2xl mb-4">
          <h6>Write your personal statement</h6>
        </div>
        <div>
          <p>
            I'm drawn to your program for its excellent reputation and alignment
            with my career goals. The unique curriculum of [specific course]
            perfectly fits my aspirations. With a background in [mention
            qualifications], I am eager to contribute to and learn from
            [institution name]. This program is crucial for achieving my career
            goal.
          </p>
        </div>

        <div>
          <form
            onSubmit={handleSubmit}
            className=" w-full mx-auto mt-8 flex flex-col gap-3"
          >
            <div className=" w-full h-auto mx-auto">
              <ReactQuill
                className="flex flex-col justify-start justify-items-start"
                modules={modules}
                formats={formats}
                placeholder="Type your message"
                onChange={handleValueChange}
                value={personalStatement}
              />
            </div>

            <div className="mt-4 w-5/12 mx-auto">
              <MainButton button_text="Save and Continue" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default PersonalStatement;
