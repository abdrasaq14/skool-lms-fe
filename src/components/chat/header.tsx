import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import MicrophoneButton from "./microphone";
import { BsEmojiSmileFill } from "react-icons/bs";


interface ChatProps {
  senderMessage: string;
  senderTime: string;
  receiverMessage: string;
  receiverTime: string;
  userName: string;
  onMessageChange: (newMessage: string) => void;
}

interface Message{
  text: string;
  timestamp: string;

}

const ChatHeader: React.FC<ChatProps> = ({
  senderMessage,
  senderTime,
  receiverMessage,
  receiverTime,
  userName,
  onMessageChange,
}) => {
  const [emojiPickerState, setEmojiPickerState] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessage = () => {
    if (inputValue.trim() !== "") {
      const message = {
        text: inputValue + (chosenEmoji ? chosenEmoji : ''), 
        timestamp: new Date().toISOString(),
      };

      setMessages([...messages, message]);
      setInputValue("");
      setChosenEmoji(null); // Clear chosen emoji after sending message
      onMessageChange(inputValue); // Update the parent's message state
    }
  };

  function onEmojiClick(emoji: any) {
    setChosenEmoji(emoji);
    setInputValue(inputValue + emoji.emoji);
    setEmojiPickerState(false); 
  }

  return (
    <div className="flex flex-col items-center h-screen p-10 bg-slate-300">
      <div className="w-full max-w-xl p-2 rounded-xl shadow-lg bg-white">
        <header className="py-2 px-2 items-center border-b-2 border-gray-300">
          <div className="flex items-center">
            <img
              src="/images/arrow-left.png"
              className="mr-3 h-7 sm:h-9"
              alt="Back Arrow"
            />
            <span className="text-lg font-bold text-black">Messages</span>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="/images/ChatAvater.png"
              className="h-2 sm:h-10"
              alt="Chat Avatar"
            />
            <p className="text-sm text-gray-700 ml-2">{userName}</p>
          </div>
        </header>

        {messages.length === 0 ? (
          <div className="flex justify-center items-center h-32">
            <p className="text-gray-500">No messages yet</p>
          </div>
        ) : (
          <>
            <div className="mt-4 flex-justify-start">
              <div className="flex justify-start flex-row p-4 bg-gray-300 rounded-lg shadow-md w-1/2">
                <div className="flex flex-col">
                  <p className="text-slate-600 font-normal">{senderMessage}</p>
                  <p className="text-xs text-gray-500">{senderTime}</p>
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-end ">
              <div className="flex justify-end p-4 bg-green-300 rounded-lg w-1/2">
                <div className="flex flex-col">
                  <p className="text-slate-600 font-normal">
                    {receiverMessage}
                  </p>
                  <p className="flex justify-end text-xs text-gray-500">
                    {receiverTime}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="mt-10 border-t-2 border-gray-200">
          <div className="relative flex items-center gap-4 p-2">
            <MicrophoneButton />

            <input
              type="text"
              placeholder="Type a message"
              className="flex-grow p-2 pr-16 border rounded-lg bg-green-200"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />

            <button className=" flex items-center justify-center" onClick={sendMessage}>
              <img src="/images/Vector.png" alt="send-icon" />
            </button>
            <button
              className="absolute right-16 text-white font-extrabold text-xl"
              onClick={() => setEmojiPickerState(!emojiPickerState)}
            >
              <BsEmojiSmileFill/>
            </button>

            <button className="absolute right-24">
              <img src="/images/Photo copy.png" />
            </button>

          </div>
          <div>
          {emojiPickerState && <EmojiPicker width='100%' height={300} onEmojiClick={onEmojiClick} />}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
