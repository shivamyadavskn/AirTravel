"use client";
import { data } from "@/components/utils/country";
import React, { useState, useRef, useEffect } from "react";

const CountryButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(data[0]);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex items-center md:order-2 space-x-1 md:space-x-0">
      <button
        type="button"
        onClick={toggleDropdown}
        className="inline-flex items-center font-medium justify-center px-4 py-2 text-sm text-gray-900 dark:text-white rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
      >
        <img
          src={selectedCountry.flag_1x1}
          alt={`${selectedCountry.name} flag`}
          className="w-5 h-5 mr-2"
        />
        {selectedCountry.name} {selectedCountry.iso_code}
      </button>
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 z-50 mt-2 w-56 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 top-full"
        >
          <ul className="py-2 font-medium max-h-60 overflow-y-auto" role="menu">
            {data.map((country) => (
              <li key={country.iso_code}>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                  role="menuitem"
                  onClick={() => handleCountrySelect(country)}
                >
                  <div className="inline-flex items-center">
                    <img
                      src={country.flag_1x1}
                      alt={`${country.name} flag`}
                      className="w-5 h-5 mr-2"
                    />
                    {country.name}
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CountryButton;
