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

  const handleMessageChange = (
    index: number,
    newMessage: string,
    isSender: boolean
  ) => {
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
    </div>
  );
};

export default ChatInput;

// import React, { useState } from "react";
// import ChatHeader from "../../components/chat/header";

// interface Chat {
//   senderMessage: string;
//   receiverMessage: string;
//   senderTime: string;
//   receiverTime: string;
// }

// const ChatInput: React.FC = () => {
//   const [chats, setChats] = useState<Chat[]>([
//     {
//       senderMessage: "",
//       receiverMessage: "",
//       senderTime: "",
//       receiverTime: "",
//     },
//   ]);

//   const handleMessageChange = (
//     index: number,
//     newMessage: string,
//     isSender: boolean
//   ) => {
//     const updatedChats = chats.map((chat, i) => {
//       if (i === index) {
//         return {
//           ...chat,
//           [isSender ? "senderMessage" : "receiverMessage"]: newMessage,
//           [isSender ? "senderTime" : "receiverTime"]:
//             new Date().toLocaleTimeString(),
//         };
//       }
//       return chat;
//     });

//     // If the last chat container is not empty, add a new chat container
//     const lastChat = updatedChats[updatedChats.length - 1];
//     const isLastChatEmpty =
//       lastChat.senderMessage === "" && lastChat.receiverMessage === "";
//     if (!isLastChatEmpty) {
//       setChats([
//         ...updatedChats,
//         {
//           senderMessage: "",
//           receiverMessage: "",
//           senderTime: "",
//           receiverTime: "",
//         },
//       ]);
//     } else {
//       setChats(updatedChats);
//     }
//   };

//   return (
//     <div>
//       {chats.map((chat, index) => (
//         <ChatHeader
//           key={index}
//           senderMessage={chat.senderMessage}
//           senderTime={chat.senderTime}
//           receiverMessage={chat.receiverMessage}
//           receiverTime={chat.receiverTime}
//           userName="Jane Doe"
//           onMessageChange={(newMessage: string) =>
//             handleMessageChange(index, newMessage, true)
//           }
//         />
//       ))}
//     </div>
//   );
// };

// export default ChatInput;
