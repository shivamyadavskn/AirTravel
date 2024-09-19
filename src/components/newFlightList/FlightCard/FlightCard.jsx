import React from "react";
import { Plane, Clock, Calendar, DollarSign } from "lucide-react";

const FlightCard = ({ flight }) => {
  const { id, itineraries, price, travelerPricings } = flight;
  const itinerary = itineraries[0];
  const segments = itinerary.segments;

  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="bg-blue-600 text-white p-4">
        <h2 className="text-xl font-semibold">Flight {id}</h2>
      </div>
      <div className="p-6">
        {segments.map((segment, index) => (
          <div key={index} className="mb-4 last:mb-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Plane className="w-5 h-5 text-blue-600 mr-2" />
                <span className="font-semibold">{segment.departure.iataCode}</span>
              </div>
              <div className="border-t-2 border-gray-300 flex-grow mx-4"></div>
              <div className="flex items-center">
                <span className="font-semibold">{segment.arrival.iataCode}</span>
                <Plane className="w-5 h-5 text-blue-600 ml-2 transform rotate-90" />
              </div>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <div>
                <p className="flex items-center"><Calendar className="w-4 h-4 mr-1" /> {formatDate(segment.departure.at)}</p>
                <p className="flex items-center"><Clock className="w-4 h-4 mr-1" /> {formatTime(segment.departure.at)}</p>
              </div>
              <div className="text-right">
                <p className="flex items-center justify-end"><Calendar className="w-4 h-4 mr-1" /> {formatDate(segment.arrival.at)}</p>
                <p className="flex items-center justify-end"><Clock className="w-4 h-4 mr-1" /> {formatTime(segment.arrival.at)}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-1 flex items-center">
              <Clock className="w-4 h-4 mr-1" /> Duration: {segment.duration}
            </p>
          </div>
        ))}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-lg font-semibold text-gray-800 flex items-center">
            <DollarSign className="w-5 h-5 text-green-600 mr-2" />
            Total Price: {price.total} {price.currency}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Base Price: {travelerPricings[0].price.base} {price.currency}
          </p>
        </div>
      </div>
      <div className="px-6 pb-6">
        <button className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default FlightCard;