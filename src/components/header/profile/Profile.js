import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Modal from "@/components/modal/modal";

const ProfileDropDownList = ["DashBoard", "Setting", "Earnings", "Logout"];

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [IsLoggedIn, setIsLoggedIn] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogin = () => {
    setIsModalOpen(true);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {IsLoggedIn ? (
        <button
          type="button"
          className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          onClick={toggleDropdown}
        >
          <img
            className="w-8 h-8 rounded-full"
            src="/icons/user-login-white.webp"
            alt="user photo"
          />
        </button>
      ) : (
        <button
          onClick={handleLogin}
          className="text-2xl text-red-600  font-sans outline-2 outline-black"
        >
          Login
        </button>
      )}

      {isOpen && (
        <div
          ref={dropdownRef}
          className="z-50 absolute right-0 mt-2 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
        >
          {/* <div className="px-4 py-3">
            <span className="block text-sm text-gray-900 dark:text-white">
              Guest User
            </span>
            <button
              onClick={handleLogin}
              className="block text-sm text-blue-500 hover:underline"
            >
              Login
            </button>
          </div> */}
          <ul className="py-2" aria-labelledby="user-menu-button">
            {ProfileDropDownList.map((lists, index) => {
              return (
                <li key={index}>
                  <Link
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    {lists}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default ProfileDropdown;
