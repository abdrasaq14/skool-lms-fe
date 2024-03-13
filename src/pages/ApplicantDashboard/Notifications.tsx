import { useState } from "react";
import { formatDistanceToNow } from "date-fns";

interface Notification {
  id: number;
  message: string;
  status: string;
  read: boolean;
  timestamp: string;
}

// Dummy notification data
const dummyNotifications: Notification[] = [
  {
    id: 1,
    message: "Your application has been accepted.",
    status: "accepted",
    read: false,
    timestamp: "2024-03-12T12:00:00Z",
  },
  {
    id: 2,
    message: "Your application has been rejected.",
    status: "rejected",
    read: true,
    timestamp: "2024-03-11T09:30:00Z",
  },
  {
    id: 3,
    message: "Your application has been accepted.",
    status: "accepted",
    read: false,
    timestamp: "2024-03-10T15:45:00Z",
  },
  {
    id: 4,
    message: "Your application has been rejected.",
    status: "rejected",
    read: true,
    timestamp: "2024-03-09T18:20:00Z",
  },
];
const NotificationPage = () => {
  const [notifications, setNotifications] =
    useState<Notification[]>(dummyNotifications);

  const deleteNotification = (id: number) => {
    const updatedNotifications = notifications.filter(
      (notification) => notification.id !== id
    );
    setNotifications(updatedNotifications);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      {notifications.length === 0 ? (
        <div className="flex justify-center items-center h-96">
          <p className="text-2xl font-semibold">No notifications available</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className={`p-4 border rounded ${
                notification.read
                  ? "bg-gray-100 text-gray-600"
                  : "bg-white text-black"
              }`}
              style={{ borderColor: "#16a34a" }}
            >
              <div className="flex justify-between items-center">
                <div>
                  <span>{notification.message}</span>
                  <span className="text-gray-500 text-sm ml-3">
                    {formatDistanceToNow(new Date(notification.timestamp), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => deleteNotification(notification.id)}
                  >
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationPage;
