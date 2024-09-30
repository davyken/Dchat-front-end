import React, { useState, useContext, useEffect } from "react";
import { MenuIcon } from "@heroicons/react/outline";
import { Transition } from "@headlessui/react";
import { useAuthProvider } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { fetchParticularUser } from "../../apiCalls";
const MenuSidebar = () => {
  const { logout, user } = useAuthProvider();

  const [isOpen, setIsOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({});

  const openMenu = () => setIsOpen(true);

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (user & user.id) {
      }
      try {
        const response = await fetchParticularUser(user.id);
        setUserDetails(response.data);
      } catch (error) {
        console.error("Error fetching user profile", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="">
      <button onClick={openMenu}>
        <MenuIcon className="h-8 w-8 text-gray-950" />
      </button>

      <Transition
        show={isOpen}
        enter="transition ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition ease-in duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex justify-end"
          onClick={closeMenu}
        >
          <div className="w-80 bg-white h-full p-4 shadow-xl flex flex-col">
            <button
              onClick={closeMenu}
              className="text-right hover:text-red-500 font-semibold"
            >
              Close
            </button>
            <div className="flex flex-col space-y-2 py-2">
              <img
                src={userDetails?.profile_picture || "images/blog-header.jpg"}
                alt="profile"
                className="w-24 h-24 rounded-full"
              />
              <p className="text-xl font-bold">{userDetails?.username}</p>
              <p className="text-sm">{userDetails.bio}</p>
            </div>
            <ul className="mt-4 space-y-2">
              <Link to={"/settings"}>
                <li className="p-2 border-b hover:text-blue-500">Settings</li>
              </Link>
              <Link to={"/profile"}>
                <li className="p-2 border-b hover:text-blue-500">Profile</li>
              </Link>
              <Link to={"/blocked"}>
                <li className="p-2 border-b hover:text-blue-500">
                  Blocked users
                </li>
              </Link>
              <Link to={"/help"}>
                <li className="p-2 border-b hover:text-blue-500">Help</li>
              </Link>
              <Link to={"/about"}>
                <li className="p-2 border-b hover:text-blue-500">About</li>
              </Link>
              <Link to={"/contact"}>
                <li className="p-2 border-b hover:text-blue-500">Contact</li>
              </Link>
            </ul>
            <div className="flex-grow"></div>
            <div className="p-4">
              <Link to={"/"}>
                <button
                  onClick={logout}
                  className="w-full max-w-sm bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
                >
                  <svg
                    className="w-6 h-6 inline-block mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    ></path>
                  </svg>
                  LogOut
                </button>
              </Link>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default MenuSidebar;
