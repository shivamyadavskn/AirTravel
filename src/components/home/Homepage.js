"use client";
import React, { useState } from "react";
import {
  ArrowLeftRight,
  Calendar,
  Users,
  Plus,
  Minus,
  Plane,
} from "lucide-react";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();
  const [tripType, setTripType] = useState("one-way");
  const [from, setFrom] = useState("BOM");
  const [to, setTo] = useState("DEL");
  const [departureDate, setDepartureDate] = useState("2024-09-10");
  const [returnDate, setReturnDate] = useState("2024-09-15");
  const [travelers, setTravelers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });
  const [travelClass, setTravelClass] = useState("Economy");
  const [showTravelerPopup, setShowTravelerPopup] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchParams = new URLSearchParams({
      tripType,
      from,
      to,
      departureDate,
      returnDate,
      adults: travelers.adults,
      children: travelers.children,
      infants: travelers.infants,
      travelClass,
    }).toString();
    const searchUrl = `/flight-listing?${searchParams}`;
    router.push(searchUrl);
  };

  const updateTravelers = (type, operation) => {
    setTravelers((prev) => ({
      ...prev,
      [type]:
        operation === "increment"
          ? prev[type] + 1
          : Math.max(0, prev[type] - 1),
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-4 sm:p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-6 sm:p-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-blue-600 mb-8">
            Find Your Perfect Flight
          </h1>

          {/* Trip Type Selection */}
          <div className="flex flex-wrap justify-center space-x-4 mb-8">
            {["One-way", "Round-trip", "Multi-city"].map((type) => (
              <label key={type} className="flex items-center mb-2 cursor-pointer">
                <input
                  type="radio"
                  name="tripType"
                  value={type.toLowerCase()}
                  checked={tripType === type.toLowerCase()}
                  onChange={() => setTripType(type.toLowerCase())}
                  className="form-radio text-blue-500 hidden"
                />
                <span className={`px-4 py-2 rounded-full ${tripType === type.toLowerCase() ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} transition-colors duration-200`}>
                  {type}
                </span>
              </label>
            ))}
          </div>

          {/* Flight Search Form */}
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <InputField
                icon={<Plane className="text-blue-500" size={20} />}
                label="From"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="Enter city or airport"
              />
              <InputField
                icon={<Plane className="text-blue-500 transform rotate-90" size={20} />}
                label="To"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="Enter city or airport"
              />
              <InputField
                icon={<Calendar className="text-blue-500" size={20} />}
                label="Departure"
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
              />
              {tripType === "round-trip" && (
                <InputField
                  icon={<Calendar className="text-blue-500" size={20} />}
                  label="Return"
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                />
              )}
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => setShowTravelerPopup(!showTravelerPopup)}
                className="w-full p-4 border rounded-lg text-left relative bg-white hover:bg-gray-50 transition-colors duration-200"
              >
                {`${
                  travelers.adults + travelers.children + travelers.infants
                } Traveler(s), ${travelClass}`}
                <Users
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-500"
                  size={20}
                />
              </button>
              {showTravelerPopup && (
                <TravelerPopup
                  travelers={travelers}
                  updateTravelers={updateTravelers}
                  travelClass={travelClass}
                  setTravelClass={setTravelClass}
                  setShowTravelerPopup={setShowTravelerPopup}
                />
              )}
            </div>

            {/* Special Fares Section */}
            <div className="bg-blue-50 p-6 rounded-xl">
              <div className="flex flex-wrap items-center gap-4">
                <span className="bg-blue-500 text-white text-xs font-bold py-1 px-3 rounded-full">
                  SPECIAL OFFERS
                </span>
                <span className="font-bold text-blue-700">Special Fares</span>
                {["Student", "Senior Citizen", "Armed Forces", "Doctors & Nurses"].map((fare) => (
                  <label key={fare} className="flex items-center cursor-pointer group">
                    <input
                      type="checkbox"
                      className="form-checkbox text-blue-500 rounded-sm border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm group-hover:text-blue-500 transition-colors duration-200">{fare}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-4 px-6 rounded-full hover:bg-blue-600 transition duration-300 transform hover:scale-105"
            >
              Search Flights
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const InputField = ({ icon, label, ...props }) => (
  <div className="relative">
    <input
      {...props}
      className="w-full p-4 pl-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
    />
    <label className="absolute top-0 left-12 -translate-y-1/2 bg-white px-1 text-xs text-gray-500">
      {label}
    </label>
    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
      {icon}
    </div>
  </div>
);

const TravelerPopup = ({ travelers, updateTravelers, travelClass, setTravelClass, setShowTravelerPopup }) => (
  <div className="absolute z-10 mt-2 w-full bg-white border rounded-lg shadow-xl p-6">
    <h3 className="font-medium mb-4 text-lg text-blue-700">Travelers</h3>
    {Object.entries(travelers).map(([type, count]) => (
      <div key={type} className="flex justify-between items-center mb-4">
        <span className="capitalize text-gray-700">{type}</span>
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => updateTravelers(type, "decrement")}
            className="p-1 border rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            <Minus size={16} className="text-blue-500" />
          </button>
          <span className="mx-4 font-medium">{count}</span>
          <button
            type="button"
            onClick={() => updateTravelers(type, "increment")}
            className="p-1 border rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            <Plus size={16} className="text-blue-500" />
          </button>
        </div>
      </div>
    ))}
    <h3 className="font-medium mt-6 mb-3 text-lg text-blue-700">Class</h3>
    <select
      value={travelClass}
      onChange={(e) => setTravelClass(e.target.value)}
      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    >
      {["Economy", "Premium Economy", "Business", "First"].map((cls) => (
        <option key={cls} value={cls}>
          {cls}
        </option>
      ))}
    </select>
    <button
      onClick={() => setShowTravelerPopup(false)}
      className="mt-6 w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
    >
      Done
    </button>
  </div>
);

export default HomePage;