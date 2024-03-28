import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchQuery,
  selectFilteredMessages,
} from "../../states/messages/messagesSlice";
import Message from "../../components/Message";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { RootState } from "../../store/store";

interface Chats {
  id: string;
  imageUrl: string;
  firstName: string;
  message: string;
  createdAt: string;
  online: boolean;
}
const AdminMessageView: React.FC = () => {
  const userId = useSelector((state: RootState) => state.userDetails.userId);
  const [chattingUsers, setChattingUsers] = useState<Chats[]>([]);
  
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axiosInstance.get(`/users/chats/${userId}`);
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
    const timestamp:any = new Date(message.createdAt);
    const now: any = new Date();
    const diffTime = now - timestamp;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    const options: Intl.DateTimeFormatOptions = { hour12: true, hour: "numeric", minute: "numeric" };
    const timeFormat = new Intl.DateTimeFormat("en-US", options).format(timestamp);
    
    let output = "";
    if (diffDays === 1) {
      output = `Yesterday`;
    } else if (diffDays <= 7) {
      output = `${diffDays} days ago`;
    } else {
      output = timeFormat;
    }

    return (
      <div
        key={index}
        onClick={() => handleViewClick(message.message)}
        style={{ cursor: "pointer" }}
      >
        <Message
          imageUrl={message.imageUrl}
          name={message.firstName}
          message={message.message}
          time={output} 
          online={true}
        />
      </div>
    );
  })
)}

      </div>
    </div>
  );
};

export default AdminMessageView;
