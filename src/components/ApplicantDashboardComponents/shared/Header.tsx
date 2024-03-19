import { Fragment, useEffect } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import { HiOutlineBell, HiOutlineChatAlt } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import axiosInstance from "../../../utils/axiosInstance";
// import container from "postcss/lib/container";

interface Notification {
  id: number;
  title: string;
  message: string;
  status: boolean;
  createdAt: string;
}

export default function Header() {
  const [count, setCount] = useState(0);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const {
          data: { notifications },
        } = await axiosInstance.get("/users/notification");
        console.log({ data: { notifications } });

        const unreadNotifications: [] = notifications.filter(
          (notification: Notification) => !notification.status
        );
          console.log(notifications);
          
        setCount(notifications.length);
        // setCount(unreadNotifications.length);

        setNotifications(unreadNotifications);
      } catch (error) {
        console.error("Failed to fetch notification:", error);
      }
    };

    fetchCount();
  }, []);

  const handleClick = () => {
    setCount(0);
  };
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const user = useSelector((state: RootState) => state.userDetails);

  return (
    <div className="bg-white h-16 px-10 flex items-center border-b border-gray-200 justify-end">
      <div className="flex items-center gap-2 mr-2">
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={classNames(
                  open && "bg-gray-100",
                  "group inline-flex items-center rounded-sm p-1.5 text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-gray-100"
                )}
              >
                <HiOutlineChatAlt fontSize={25} />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute right-0 z-10 mt-2.5 transform w-80">
                  <div className="bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5">
                    <strong className="text-gray-700 font-medium">
                      Messages
                    </strong>
                    <div className="mt-2 py-1 text-sm">
                      This is messages panel.
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>

        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={classNames(
                  open && "bg-gray-100",
                  "group inline-flex items-center rounded-sm p-1.5 text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-gray-100"
                )}
              >
                <div className="inline-block relative" onClick={handleClick}>
                  <HiOutlineBell fontSize={25} />
                  {count > 0 && (
                    <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full bg-red-500 px-2 py-0.5 text-white">
                      {count}
                    </span>
                  )}
                </div>
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute right-0 z-10 mt-3 transform w-80">
                  <div className="bg-gray-100/90 rounded-xl shadow-md px-4 py-4 border-1 border-green-100">
                    <div className="text-black font-semibold mb-4 ">
                      Notifications
                    </div>
                    {notifications.length !== 0 ? (
                      <>
                        <ul className="flex flex-col gap-4 mb-6 ">
                          {notifications
                            .slice(0, 3)
                            .map((notification: Notification) => (
                              <li
                                className="px-2 py-1 border border-gray-600 rounded-lg text-sm hover:border-2 hover:border-green-600 bg-white text-gray-600"
                                key={notification.id}
                              >
                                <h5 className=" font-medium text-gray-900">
                                  {notification.title}
                                </h5>
                                <p className=" text-gray-500">
                                  {notification.message}
                                </p>
                              </li>
                            ))}
                        </ul>
                        <div className=" w-full text-center bg-green-600 rounded-lg mx-auto py-2">
                          <Link
                            to="/dashboard/notifications"
                            className=" text-white no-underline"
                          >
                            See all notifications
                          </Link>
                        </div>
                      </>
                    ) : (
                      <div className="mt-2 py-1 text-sm">
                        No new notifications
                      </div>
                    )}
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>

        <Menu as="div" className="relative">
          <div>
            <Menu.Button className="ml-2  flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-400">
              <span className="sr-only">Open user menu</span>

              <div className=" bg-blue-400 text-blue-600 rounded-full w-10 h-10 flex justify-center items-center">
                <p className="font-semibold text-base">
                  {user.firstName.slice(0, 1) + user.lastName.slice(0, 1)}
                </p>
              </div>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-sm shadow-md p-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <div
                    className={classNames(
                      active && "bg-white",
                      "rounded-sm px-4 py-2 text-blue-600"
                    )}
                  >
                    {user.firstName + " " + user.lastName}
                  </div>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={() => navigate("/dashboard/profile")}
                    className={classNames(
                      active && "bg-gray-100",
                      "active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200"
                    )}
                  >
                    My Profile
                  </div>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={() => navigate("/dashboard/settings")}
                    className={classNames(
                      active && "bg-gray-100",
                      "active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200"
                    )}
                  >
                    Settings
                  </div>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={logout}
                    className={classNames(
                      active && "bg-gray-100",
                      "active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200"
                    )}
                  >
                    Logout
                  </div>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}
