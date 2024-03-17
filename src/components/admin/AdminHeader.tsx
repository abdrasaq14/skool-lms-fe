import decagonLogo from "/images/decagon-logo.png";
import leftArrow from "/images/left-arrow.png";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store"
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import classNames from "classnames";
import { Link, useNavigate } from "react-router-dom";


interface Header{
  header_text: string;
  linkTo: string;
}

function AdminHeader( {header_text, linkTo}: Header) {

  const user = useSelector((state: RootState) => state.userDetails);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (

    <div className="w-10/12 mx-auto">
      <div className="flex justify-between">
        <img src={decagonLogo} alt="Decagon logo" />

        <div className=" flex justify-between gap-6 align-middle items-center">
          <div className=" font-semibold text-base">Contact Us</div>

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
            <Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-sm p-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none shadow-lg">
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