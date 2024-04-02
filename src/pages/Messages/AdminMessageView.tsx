import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchQuery,
  selectFilteredMessages,
} from "../../states/messages/messagesSlice";
import Message from "../../components/Message";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { RootState } from "../../store/store";

interface Chats {
  id: string;
  passportUpload: string;
  firstName: string;
  lastMessage: string; 
  lastMessageCreatedAt: string;
  online: boolean;
}
const AdminMessageView: React.FC = () => {
  const userId = useSelector((state: RootState) => state.userDetails.userId);
  const [chattingUsers, setChattingUsers] = useState<Chats[]>([]);
  
  useEffect(() => {
    const fetchMessages = async () => {
      try {

        const response = await axiosInstance.get(`/users/chats/${userId}`);
        console.log("response: ", response);
        
        setChattingUsers(response.data.users);
      } catch (error) {
        console.error("Failed to fetch messages", error);
      }
    };

    fetchMessages();
  }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const filteredMessages = useSelector(selectFilteredMessages);

  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearchValue("");
        dispatch(setSearchQuery(""));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchValue(value);
    dispatch(setSearchQuery(value));
  };

  const handleViewClick = (searchValue: string) => {
    if (filteredMessages.length === 0 || searchValue.trim() === "") return;
    // navigate(`/chat?search=${encodeURIComponent(searchValue)}`);
    navigate("/chat");
  };

  return (
    <div className="bg-white w-6/12 mx-auto mt-10 py-8 px-7 border rounded-2xl transition-all duration-300">
      <div>
        <h2 className="font-serif text-4xl text-black-100">Messages</h2>
        <div className="relative mt-3 mb-7">
          <input
            ref={searchRef}
            type="text"
            id="Search"
            placeholder="Search"
            value={searchValue}
            onChange={handleSearchChange}
            className="w-full rounded-2xl border-gray-200 py-2.5 pr-10 shadow-sm sm:text-md px-5 bg-zinc-200"
          />
        </div>
      </div>
      <div>
      {chattingUsers.length > 0 && (
  chattingUsers.map((message, index) => {

    // const timestamp: any = new Date(message.createdAt);
    const chatDate = new Date(message.
      lastMessageCreatedAt);
      chatDate.setHours(chatDate.getHours() + 1);
 
   const timestamp = chatDate.getUTCHours().toString().padStart(2, "0") +
          ":" +
          chatDate.getUTCMinutes().toString().padStart(2, "0")

    return (
      
    <Link className="hover:no-underline" to={`/admin/messages/chats?id=${message.id}`}>
    <div 
        key={index}
        style={{ cursor: "pointer" }}
      >
        <Message
          imageUrl={message.passportUpload}
          name={message.firstName}
          message={message.lastMessage}
          time={timestamp} 
          online={true}
        />
      </div>
    </Link>
    );
  })
)}

      </div>
    </div>
  );
};

export default AdminMessageView;
