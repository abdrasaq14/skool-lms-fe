import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function SupportChat() {


useEffect(() => {

}, []);


  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/dashboard/messages/chats?id=dc93ecd9-ecac-4fa0-ae6e-fa34379b010f");
  };

  return (
    <>
      <div className="chat bg-green-600 rounded-xl shadow-md w-full py-1">

        <header className="text-white text-center mt-2 mb-2">
          Hey there! <br /> need some help?
        </header>

        <div>
          <div className="flex justify-center">
            <div className="btn transition-transform duration-200 ease-in-out transform hover:scale-110">
              <button
                onClick={handleClick}
                className="chat-btn bg-black p-2 rounded-xl text-white  w-full mb-2"
              >
                Let’s chat now
              </button>
            </div>
          </div>
        </div>


      </div>

      <div className="chat-icon w-full h-20 flex justify-end items-center mt-2">
        <button onClick={handleClick}>
          <img
            className="chat-logo transition-transform duration-200 ease-in-out transform hover:scale-110 mr-4"
            src="/images/Chat.png"
            alt="chat logo"
          />
        </button>
      </div>
    </>
  );
}
export default SupportChat;
