import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import axiosInstance from "../../utils/axiosInstance";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";

interface Notification {
  id: number;
  title: string;
  message: string;
  status: boolean;
  createdAt: string;
}

const NotificationPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const deleteNotification = async (id: number) => {
    try {
      const response = await axiosInstance.delete(`/notifications/${id}`, {
        withCredentials: true,
      });

      if (response.data.successMessage) {
        const updatedNotifications = notifications.filter(
          (notification) => notification.id !== id
        );

        setNotifications(updatedNotifications);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const markAsRead = async (id: number) => {
    try {

      const updatedNotifications = notifications.map((notification) =>
      notification.id === id
        ? { ...notification, status: true }
        : notification
    );

      setNotifications(updatedNotifications);


      await axiosInstance.put(
        `/notifications/${id}`,
        {
          status: true,
        },
        {
          withCredentials: true,
        }
      );
     
      
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axiosInstance.get("/users/notifications", {
          withCredentials: true,
        });

        console.log(response.data);

        if (response.data.notifications) {
          setNotifications(response.data.notifications);
        }
      } catch (error) {
        console.error(error);
      }
      finally {
        setLoading(false);
      }

    };

    fetchNotifications();
  }, []);

  return (
    <div className="w-10/12 mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>


      {loading ? (
        <div className="flex items-center justify-center">
          <div className=" mt-40 w-20 h-20 border-t-4 border-b-4 border-green-600 rounded-full text-center animate-spin"></div>
        </div>
      ) : (

      <>
      {notifications.length !== 0 ? (
        <ul className="space-y-4">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className={`px-4 py-4 border border-gray-600 rounded-lg ${
                notification.status
                  ? " bg-white text-gray-600  "
                  : "bg-gray-200 text-black "
              }`}
            >
              <div className="flex justify-between items-center ">

                <div className=" flex gap-4 items-center  w-[95%]">
                  <div>
                    {!notification.status ? (
                      <button
                        className="text-gray-500 hover:text-blue-600 flex flex-col justify-center items-center w-[3rem]"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <IoCheckmarkDoneSharp className="w-5 h-5 " />
                        <p className=" text-xs"> Read </p>
                      </button>
                    ) : (
                      <button
                        className="text-blue-600 hover:text-gray-500 flex flex-col justify-center items-center w-[3rem]"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <IoCheckmarkDoneSharp className="w-5 h-5" />
                        <p className=" text-xs">Unread</p>
                      </button>
                    )}
                  </div>

                  <div className=" flex gap  w-full justify-between items-center">

                    <div className="  pr-4">
                      <div>{notification.title}:</div>

                      <span>{notification.message}</span>
                    </div>

                    <div className="text-gray-500 text-sm  px-2">
                      {formatDistanceToNow(new Date(notification.createdAt), {
                        addSuffix: true,
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center ">
                  <button
                    className="text-red-600 hover:text-red-800 flex flex-col justify-center items-center gap-1 "
                    onClick={() => deleteNotification(notification.id)}
                  >
                    <FaRegTrashAlt className="w-4 h-4" />
                    <p className=" text-xs">Delete</p>
                  </button>
                </div>


              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex justify-center items-center h-96">
          <p className="text-2xl font-semibold">No notifications available</p>
        </div>
      )}

      </>

      )}




    </div>
  );
};

export default NotificationPage;
