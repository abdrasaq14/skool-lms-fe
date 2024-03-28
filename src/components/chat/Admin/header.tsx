import  { useRef, useState, useEffect} from "react";
import EmojiPicker from "emoji-picker-react";
import MicrophoneButton from "../User/microphone";
import { BsEmojiSmile } from "react-icons/bs";
import axiosInstance from "../../../utils/axiosInstance";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import  chatTail from '/images/chatbox-tail.png'
import chatTailTwo from '/images/chatbox-tail2.png'
import { TbMessagesOff } from "react-icons/tb";
import socket from '../../../../socket'

interface Chat {
  createdAt: string;
  id: string;
  message: string;
  receiver: { id: string; firstName: string; lastName: string };
  sender: { id: string; firstName: string; lastName: string };
}

interface Message {
  text: string;
  timestamp: string;
  senderId: string;
  receiverId: string;
}

const AdminChatHeader = ({ chats, recipient }: { chats: Chat[]; recipient: string }) => {
  console.log("chats in header page", chats);

  const [emojiPickerState, setEmojiPickerState] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>(
    chats.map((chat) => {
      const chatDate = new Date(chat.createdAt);
      chatDate.setHours(chatDate.getHours() + 1);
      return {
        text: chat.message,
        timestamp:
          chatDate.getUTCHours().toString().padStart(2, "0") +
          ":" +
          chatDate.getUTCMinutes().toString().padStart(2, "0"),
        senderId: chat.sender.id,
        receiverId: chat.receiver.id,
      };
    })
  );


  const [searchParams] = useSearchParams();
  const recipientId = searchParams.get("id");
  const userId = useSelector((state: RootState) => state.userDetails.userId);

  console.log("messages", messages);

  // useEffect(() => {
  //   setMessages(chats.map(chat => ({
  //     text: chat.message,
  //     timestamp: chat.createdAt,
  //     senderId: chat.sender.id,
  //     receiverId: chat.receiver.id
  //   })));
  // }, []);

  

  useEffect(() => {
    // Subscribe to incoming messages from the server
    socket.on("message", (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      // Unsubscribe from socket events when component unmounts
      socket.off("message");
    };
  }, []);


  const sendMessage = async () => {
    if (inputValue.trim() !== "") {

      const message = {
        text: inputValue,
        timestamp: (() => {
          const currentDate = new Date();
          currentDate.setHours(currentDate.getHours() + 1); // Add 1 hour for Nigerian time
          return (
            currentDate.getUTCHours().toString().padStart(2, "0") +
            ":" +
            currentDate.getUTCMinutes().toString().padStart(2, "0")
          );
        })(),
        senderId: userId || "",
        receiverId: recipientId || "",
      };

      socket.emit("sendMessage", message);
      setMessages([...messages, message]);
      setInputValue("");
      setChosenEmoji(null)

      try {
        await axiosInstance.post("/users/messages/chats", message);
      } catch (error) {
        console.error("Failed to send message", error);
      }

      ;
    }
  };

  function onEmojiClick(emoji: any) {
    setChosenEmoji(emoji.emoji);
    console.log("chosenEmoji", emoji.emoji.toString())
    console.log("chosenEmoji", emoji.emoji)
    setInputValue(inputValue + emoji.emoji.toString());

    console.log("input value", inputValue)
    setEmojiPickerState(false);
  }


  const handleClickOutside = (event: any) => {
    if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
      setEmojiPickerState(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className=" p-4 h-screen overflow-y-auto w-full h-100vh ">

      <div className="  p-2 rounded-xl shadow-lg bg-white h-[72%]">
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
                <p className="text-sm text-gray-700 ml-2">{recipient}</p>
            
          </div>
        </header>

        <div className="overflow-y-auto max-h-80 h-[19rem] px-6 pb-6">
        {messages.length === 0 ? (
          <div className="flex flex-col gap-6 justify-center items-center h-full mt-6">
            <p className="text-gray-500">No messages yet</p>
            <TbMessagesOff className="h-20 w-20 text-gray-500 animate-bounce ease-in-out" />

          </div>
        ) : (
          <>
            {messages.map((message, index) => {
              const isSender = message.senderId === userId;
              const senderMessage = isSender ? message.text : "";
              const receiverMessage = !isSender ? message.text : "";
              const senderTime = isSender ? message.timestamp : "";
              const receiverTime = !isSender ? message.timestamp : "";

              return (
                <div key={index} className="">
                  {!isSender && (
                    <div className="mt-2 flex-justify-start relative">
                      <div className="flex justify-start flex-row py-2 px-3 bg-[#E6E5EB] rounded-xl shadow-md w-6/12">
                      <div className="flex flex-col w-full gap-1">
                          <p className="text-black font-normal">
                            {receiverMessage}
                          </p>
                          <div className=" flex justify-end items-center">
                            <p className="flex justify-end text-xs text-black">
                              {receiverTime}
                            </p>
                          </div>
                        </div>
                      </div>
                      <img className=" h-6 absolute bottom-0 -left-[8px]" src={chatTailTwo}/>
                    </div>
                  )}
                  {isSender && (
                    <div className="mt-2 flex justify-end relative ">
                      <div className="flex py-2 px-3 bg-[#27AE60] rounded-2xl w-6/12">
                        <div className="flex flex-col w-full gap-1">
                          <p className="text-white font-normal">
                            {senderMessage}
                          </p>
                          <div className=" flex justify-end items-center">
                            <p className="flex justify-end text-xs text-white">
                              {senderTime}
                            </p>
                          </div>
                        </div>
                      </div>
                      <img className=" h-2 absolute bottom-0 right-0" src={chatTail}/>
                    </div>
                  )}
                </div>
              );
            })}
          </>
        )}
        </div>


        <div className="mt-6 border-t-2 border-gray-200 ">

          <div className="relative flex items-center gap-3 p-2 mt-2">

            <MicrophoneButton />

            <input
              type="text"
              placeholder="Type your message"
              className="flex-grow p-2 pr-20 border rounded-lg bg-[#27AE60] text-white placeholder:text-white active:ring-1 active:ring-white"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />

            <button
              className=" flex items-center justify-center"
              onClick={sendMessage}
            >
              <img src="/images/Vector.png" alt="send-icon" />
            </button>

            <button
              className="absolute right-[3.5rem] text-white font-extrabold text-xl"
              onClick={() => setEmojiPickerState(!emojiPickerState)}
            >
              <BsEmojiSmile />
            </button>

            <button className="absolute right-[5.5rem]">
              <img src="/images/Photo copy.png" />
            </button>

            {emojiPickerState && (
              <div ref={emojiPickerRef} className=" absolute right-0 w-9/10  -top-[26rem]">
              <EmojiPicker
                width="100%"
                height={420}
                lazyLoadEmojis={true}
                onEmojiClick={onEmojiClick}
                
              />
              </div>
            )}

          </div>
          
          
        </div>
      </div>
    </div>
  );
};

export default AdminChatHeader;
