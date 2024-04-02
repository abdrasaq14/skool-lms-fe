import decagonLogo from "/images/decagon-logo.png";
import leftArrow from "/images/left-arrow.png";
import { HiOutlineChatAlt } from "react-icons/hi";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store"
import { Fragment } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import classNames from "classnames";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUserDetails } from "../../states/userDetails/userDetailsSlice";


interface Header{
  header_text: string;
  linkTo: string;
}

function AdminHeader( {header_text, linkTo}: Header) {

  const user = useSelector((state: RootState) => state.userDetails);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(clearUserDetails());
    window.history.replaceState(null, "", "/login");
 
    navigate("/login");
  };

  return (

    <div className="w-10/12 mx-auto">
      <div className="flex justify-between">
        <img src={decagonLogo} alt="Decagon logo" />

        <div className=" flex justify-between gap-4 align-middle items-center">
          <div className=" font-semibold text-base">Contact Us</div>

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
                <Popover.Panel className="absolute left-0 z-10 mt-2.5 transform w-72">
                  <div className="bg-gray-100/70 rounded-lg shadow-md ring-1 ring-black ring-opacity-5 px-6 py-4">
                    <strong className="text-gray-700 font-medium">
                      Messages
                    </strong>
                    <div className="mt-2 py-1 text-sm">
                      This is the messages panel.
                    </div>

                    <button className=" mt-8 bg-blue-400 w-full text-center py-2 px-4 rounded-2xl text-white hover:bg-blue-500">
                      <Link to={'/admin/messages'} className=" text-white no-underline">  View all messages</Link>
                     </button>

                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>

          <div className="flex justify-center items-center gap-2">

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
            <Menu.Items className="origin-top-right z-10 absolute left-0 mt-2 w-48 rounded-sm p-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none shadow-lg">
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

            <div className=" font-normal text-base">{user.firstName}</div>

          </div>
        </div>
      </div>

      <div className=" mt-6">
        <Link className=" flex gap-1" to={linkTo}>
          <img src={leftArrow} alt="Arrow to go back to the previous page" />
          <div>{header_text}</div>
        </Link>
      </div>



    </div>
  )
}

export default AdminHeader