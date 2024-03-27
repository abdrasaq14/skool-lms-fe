import React, { useState } from "react";
import ChatHeader from "../../components/chat/header";

const ChatInput: React.FC = () => {
  const [chats, setChats] = useState([
    {
      senderMessage: "",
      receiverMessage: "",
      senderTime: "",
      receiverTime: "",
    },
  ]);

  const handleMessageChange = (index: number, newMessage: string, isSender: boolean) => {
    const updatedChats = chats.map((chat, i) => {
      if (i === index) {
        return {
          ...chat,
          [isSender ? "senderMessage" : "receiverMessage"]: newMessage,
        };
      }
      return chat;
    });
    setChats(updatedChats);
  };

  // const addChat = () => {
  //   setChats([
  //     ...chats,
  //     {
  //       senderMessage: "",
  //       receiverMessage: "",
  //       senderTime: "",
  //       receiverTime: "",
  //     },
  //   ]);
  // };

  return (
    <div>
      {chats.map((chat, index) => (
        <ChatHeader
          key={index}
          senderMessage={chat.senderMessage}
          senderTime={chat.senderTime}
          receiverMessage={chat.receiverMessage}
          receiverTime={chat.receiverTime}
          userName="Jane Doe"
          onMessageChange={(newMessage) =>
            handleMessageChange(index, newMessage, true)
          }
        />
      ))}
      {/* <button onClick={addChat}>Add New Chat</button> */}
    </div>
  );
};

export default ChatInput;
