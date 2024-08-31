import React from "react";
import Link from "next/link";

const FlightListingCard = ({ flight }) => {
  const { segments, purchaseLinks } = flight;
  const {
    legs: [leg],
  } = segments[0];
  const {
    originStationCode,
    destinationStationCode,
    departureDateTime,
    arrivalDateTime,
    classOfService,
    marketingCarrier,
    flightNumber,
    distanceInKM,
  } = leg;
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl my-4">
      <div className="md:flex">
        <div className="md:shrink-0">
          <img
            className="h-24 w-full object-cover md:h-full md:w-48"
            src={marketingCarrier.logoUrl}
            alt={marketingCarrier.displayName}
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {marketingCarrier.displayName} - {classOfService}
          </div>
          <p className="block mt-1 text-lg leading-tight font-medium text-black">
            {originStationCode} to {destinationStationCode}
          </p>
          <p className="mt-2 text-gray-500">
            Flight {flightNumber} | {formatDate(departureDateTime)} -{" "}
            {formatDate(arrivalDateTime)}
          </p>
          <p className="mt-2 text-gray-500">
            Distance: {distanceInKM.toFixed(2)} km
          </p>
          <div className="mt-4">
            {purchaseLinks.map((link, index) => (
              <Link
                key={index}
                href={link.url}
                className="inline-block mr-2 mt-2 px-4 py-2 leading-none border rounded text-white bg-indigo-500 hover:bg-indigo-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.partnerSuppliedProvider.displayName} - $
                {link.totalPrice.toFixed(2)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightListingCard;
