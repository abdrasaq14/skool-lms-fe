
import React, { useState, useEffect } from "react";
import ChatHeader from "../../components/chat/header";
import axiosInstance from "../../utils/axiosInstance";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store"

interface Chat {
  createdAt: string;
  id: string;
  message: string;
  receiver: {id: string, firstName: string, lastName: string};
  sender: {id: string, firstName: string, lastName: string};

}

const UserChat: React.FC = () => {


  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const recipientId = searchParams.get('id');
  const userId = useSelector((state: RootState) => state.userDetails.userId);

  useEffect(() => {
    
    const fetchChats = async () => {
      try {
        console.log("userId: ", userId);
        console.log("recipientId: ", recipientId);
        
        const response = await axiosInstance.get(`/users/chats/${recipientId}/${userId}`, {
        });

        if(response.data){
          setChats(response.data.conversation);
        }        
        
      } catch (error) {
        console.error("Failed to fetch chats", error);
      }
      finally {
        setLoading(false); // Update loading state after fetching chats
      }
    }
    fetchChats()
  }, [])


  return (
    <div>

      {
        loading ? (

          <div className="flex items-center justify-center">
          <div className=" mt-40 w-20 h-20 border-t-4 border-b-4 border-green-600 rounded-full text-center animate-spin"></div>
        </div>
        ) : 
        (
          <ChatHeader chats={chats} />
        )
      
    }
    
    </div>
  );

};

export default UserChat;
