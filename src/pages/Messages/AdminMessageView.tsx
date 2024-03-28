import Message from "../../components/Message";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery, selectFilteredMessages } from "../../states/messages/messagesSlice";
import { useNavigate } from "react-router-dom";

function AdminMessageView() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const filteredMessages = useSelector(selectFilteredMessages);

  const searchRef = useRef<HTMLInputElement>(null); 

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
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
      navigate ('/chat')
  };
  return (
    <div className="w-3/4 lg:w-1/2 mx-auto mt-10  ">
      <div>
        <h2 className=" font-serif text-4xl text-black-100">Messages</h2>

        <div className="relative mt-3 mb-7">
          <input
            ref={searchRef}
            type="text"
            id="Search"
            placeholder="Search"
            value={searchValue}
            onChange={handleSearchChange}
            className="w-full rounded-2xl border-gray-200 py-2.5 pe-10 shadow-sm sm:text-md px-5 bg-zinc-200"
          />
        </div>
      </div>
      <div>
        
        <Message imageUrl="https://images.unsplash.com/photo-1614644147724-2d4785d69962?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80" name="Samie" message="I am fine " time="9:40 AM" online={true}/>

        <Message imageUrl="https://images.unsplash.com/photo-1614644147724-2d4785d69962?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80" name="Samie" message="I am fine"time="9:40 AM" online={true} />
       
      </div>
    </div>
  );
}

export default AdminMessageView;
