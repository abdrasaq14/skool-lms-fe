import { useState } from "react";
import MainButton from "../../components/MainButton";
import axiosInstance from "../../utils/axiosInstance";

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setErrorMessage("New password does not match");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return;
    }

    try {
      const res = await axiosInstance.post("/users/change-password", {
        currentPassword: currentPassword,
        newPassword: newPassword,
      });

      if (res.data.successMessage) {
        setSuccessMessage(res.data.successMessage);
      } else if (res.data.noTokenError) {
        setErrorMessage(res.data.noTokenError);
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      } else if (res.data.userNotFoundError) {
        setErrorMessage(res.data.userNotFoundError);
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      } else if (res.data.incorrectPasswordError) {
        setErrorMessage(res.data.incorrectPasswordError);
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("An error occurred");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  return (
    <div className="pt-10">
      <div className="w-4/12 mx-auto text-center bg-gray-200 border rounded-xl py-8">
        <h2 className="text-[1.5rem]">Change Password</h2>

        <form className="w-9/12 mx-auto py-2 px-2 mt-2" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 text-left">
            {errorMessage && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 py-1 rounded my-1 relative text-center"
                role="alert"
              >
                <span className=" text-xs">{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div>
                <div
                  className="bg-green-100 border border-green-400 text-green-700 py-1 rounded my-1 relative text-center"
                  role="alert"
                >
                  <span className=" text-xs">{successMessage}</span>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label htmlFor="currentPassword">Current Password</label>
              <input
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="rounded-lg border border-gray-200 py-2 px-2 text-sm shadow-lg"
                type="password"
                name="currentPassword"
                id="currentPassword"
                value={currentPassword}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="newPassword">New Password</label>
              <input
                onChange={(e) => setNewPassword(e.target.value)}
                className="rounded-lg border border-gray-200 py-2 px-2 text-sm shadow-lg"
                type="password"
                name="newPassword"
                id="newPassword"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="rounded-lg border border-gray-200 py-2 px-2 text-sm shadow-lg"
                type="password"
                name="confirmPassword"
                id="confirmPassword"
              />
            </div>

            <div className="mt-4">
              <MainButton button_text={"Change password"} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
