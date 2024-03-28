import { useNavigate } from "react-router-dom";

function Chat() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/dashboard/messages");
  };

  return (
    <>
      <div className="chat bg-green-600 absolute bottom-0 right-0 m-60  rounded-xl shadow-md w-48">
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
      <div className="chat-icon absolute bottom-0 right-20 m-40 w-30 h-30">
        <button onClick={handleClick}>
          <img
            className="chat-logo mt-4 transition-transform duration-200 ease-in-out transform hover:scale-110"
            src="/images/Chat.png"
            alt="chat logo"
          />
        </button>
      </div>
    </>
  );
}
export default Chat;
