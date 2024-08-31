import React from "react";
import FlightListingCard from "./FlightListingCard";

const FlightList = ({ flightsData }) => {
  console.log("flighttt-", JSON.stringify(flightsData));
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold my-6">Flight Search Results</h1>

      {flightsData.map((flight, index) => (
        <FlightListingCard key={index} flight={flight} />
      ))}
    </div>
  );
};

export default FlightList;
