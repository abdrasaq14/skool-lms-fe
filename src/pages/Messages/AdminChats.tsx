
import React, { useState, useEffect } from "react";
import AdminChatHeader from "../../components/chat/Admin/header";
import axiosInstance from "../../utils/axiosInstance";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store"
import socket from "../../../socket";

interface Chat {
  createdAt: string;
  id: string;
  message: string;
  receiver: {id: string, firstName: string, lastName: string};
  sender: {id: string, firstName: string, lastName: string};

}

const AdminChat: React.FC = () => {


  const [chats, setChats] = useState<Chat[]>([]);
  const [recipient, setRecipient] = useState('');
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const recipientId = searchParams.get('id');
  const userId = useSelector((state: RootState) => state.userDetails.userId);

  useEffect(() => {
    
    const fetchChats = async () => {
      try {
        
        const response = await axiosInstance.get(`/users/chats/${recipientId}/${userId}`, {
        });

        if(response.data){
            console.log("response.data: ", response.data);
          setChats(response.data.conversation);
          setRecipient(response.data.recipient.firstName + " " + response.data.recipient.lastName)
        }        
        
      } catch (error) {
        console.error("Failed to fetch chats", error);
      }
      finally {
        setLoading(false); // Update loading state after fetching chats
      }
    }
    fetchChats()

    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
      console.log(socket)

      socket.emit("addNewUser", userId);

      return () => {
        socket.disconnect(); // Clean up WebSocket connection
      };
    })
  }, [])

//   useEffect(() => {

//     const fetchRecipient = async() => {
//       try {
//         const response = await axiosInstance.get(`/users/chats/${recipientId}`);
//         if(response.data){
          
//         }
//       } catch (error) {
//         console.error("Failed to fetch recipient", error);
//       }
//     }

//     fetchRecipient()
//   })


  return (
    <div>

      {
        loading ? (

          <div className="flex items-center justify-center">
          <div className=" mt-40 w-20 h-20 border-t-4 border-b-4 border-green-600 rounded-full text-center animate-spin"></div>
        </div>
        ) : 
        (
          <AdminChatHeader chats={chats} recipient={recipient} />
        )
      
    }
    
    </div>
  );

};

export default AdminChat;
