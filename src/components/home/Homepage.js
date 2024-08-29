"use client";
import React, { useState } from "react";
import {
  ChevronDown,
  ArrowLeftRight,
  Calendar,
  Users,
  Plus,
  Minus,
} from "lucide-react";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();
  const [tripType, setTripType] = useState("one-way");
  const [from, setFrom] = useState("BOM");
  const [to, setTo] = useState("DEL");
  const [departureDate, setDepartureDate] = useState("2024-08-30");
  const [returnDate, setReturnDate] = useState("2024-09-15");
  const [travelers, setTravelers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });
  const [travelClass, setTravelClass] = useState("Economy");
  const [showTravelerPopup, setShowTravelerPopup] = useState(false);

  const handleSearch = (e) => {
   
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

    const searchUrl = `/search?${searchParams}`;
    router.push(searchUrl);

    console.log("Searching for flights:", {
      tripType,
      from,
      to,
      departureDate,
      returnDate,
      travelers,
      travelClass,
    });
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
    <div className="min-h-screen p-4 sm:p-8 shadow-md border-4">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="p-4 sm:p-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-orange-500 mb-6">
            Domestic and International Flights
          </h1>

          {/* Trip Type Selection */}
          <div className="flex flex-wrap justify-center space-x-4 mb-6">
            {["One-way", "Round-trip", "Multi-city"].map((type) => (
              <label key={type} className="flex items-center mb-2">
                <input
                  type="radio"
                  name="tripType"
                  value={type.toLowerCase()}
                  checked={tripType === type.toLowerCase()}
                  onChange={() => setTripType(type.toLowerCase())}
                  className="form-radio text-blue-500"
                />
                <span className="ml-2 text-gray-700">{type}</span>
              </label>
            ))}
          </div>

          {/* Flight Search Form */}
          <form
            onSubmit={handleSearch}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Enter city or airport"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full p-3 border rounded-lg"
              />
              <label className="absolute top-0 left-3 -translate-y-1/2 bg-white px-1 text-xs text-gray-500">
                From
              </label>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter city or airport"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full p-3 border rounded-lg"
              />
              <label className="absolute top-0 left-3 -translate-y-1/2 bg-white px-1 text-xs text-gray-500">
                To
              </label>
              <ArrowLeftRight
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500"
                size={20}
              />
            </div>
            <div className="relative">
              <input
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="w-full p-3 border rounded-lg appearance-none" // Add `appearance-none` to hide the default icon
              />
              <label className="absolute top-0 left-3 -translate-y-1/2 bg-white px-1 text-xs text-gray-500">
                Departure
              </label>
              <Calendar
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" // Add `pointer-events-none` to prevent interaction
                size={20}
              />
            </div>

            <div className="relative">
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full p-3 border rounded-lg"
                placeholder="Add return date"
              />
              <label className="absolute top-0 left-3 -translate-y-1/2 bg-white px-1 text-xs text-gray-500">
                Return
              </label>
              {/* <Calendar
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              /> */}
            </div>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowTravelerPopup(!showTravelerPopup)}
                className="w-full p-3 border rounded-lg text-left relative"
              >
                {`${
                  travelers.adults + travelers.children + travelers.infants
                } Traveler(s), ${travelClass}`}
                <Users
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
              </button>
              <label className="absolute top-0 left-3 -translate-y-1/2 bg-white px-1 text-xs text-gray-500">
                Travellers & Class
              </label>
              {showTravelerPopup && (
                <div className="absolute z-10 mt-2 w-full bg-white border rounded-lg shadow-lg p-4">
                  <h3 className="font-medium mb-4">Travelers</h3>
                  {Object.entries(travelers).map(([type, count]) => (
                    <div
                      key={type}
                      className="flex justify-between items-center mb-2"
                    >
                      <span className="capitalize">{type}</span>
                      <div className="flex items-center">
                        <button
                          type="button"
                          onClick={() => updateTravelers(type, "decrement")}
                          className="p-1 border rounded-full"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="mx-2">{count}</span>
                        <button
                          type="button"
                          onClick={() => updateTravelers(type, "increment")}
                          className="p-1 border rounded-full"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                  <h3 className="font-medium mt-4 mb-2">Class</h3>
                  <select
                    value={travelClass}
                    onChange={(e) => setTravelClass(e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    {["Economy", "Premium Economy", "Business", "First"].map(
                      (cls) => (
                        <option key={cls} value={cls}>
                          {cls}
                        </option>
                      )
                    )}
                  </select>
                </div>
              )}
            </div>
          </form>

          {/* Special Fares Section */}
          <div className="bg-green-50 p-4 rounded-lg mb-6">
            <div className="flex flex-wrap items-center gap-4">
              <span className="bg-purple-500 text-white text-xs font-bold py-1 px-2 rounded">
                MORE BENEFITS
              </span>
              <span className="font-bold">Special Fares</span>
              {[
                "Student",
                "Senior Citizen",
                "Armed Forces",
                "Doctors & Nurses",
              ].map((fare) => (
                <label key={fare} className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox text-blue-500 mr-2"
                  />
                  <span className="text-sm">{fare}</span>
                  <span className="ml-1 text-xs text-gray-500">
                    Exclusive Discounts
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-bold py-3 px-6 rounded-full hover:bg-orange-600 transition duration-300"
            onClick={()=>handleSearch()}
          >
            SEARCH FLIGHTS
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
