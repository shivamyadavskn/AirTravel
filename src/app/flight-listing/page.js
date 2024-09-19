"use client";
import { useSearchParams } from "next/navigation";

import FlightListingPage from "@/components/newFlightList/NewFlight";

export default function SearchedListPage() {
  const searchParams = useSearchParams();

  const searchCriteria = {
    tripType: searchParams.get("tripType") || "one-way",
    from: searchParams.get("from") || "",
    to: searchParams.get("to") || "",
    departureDate: searchParams.get("departureDate") || "",
    returnDate: searchParams.get("returnDate") || "",
    adults: parseInt(searchParams.get("adults") || "1", 10),
    children: parseInt(searchParams.get("children") || "0", 10),
    infants: parseInt(searchParams.get("infants") || "0", 10),
    travelClass: searchParams.get("travelClass") || "Economy",
  };

  return (
    <>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Flight Search Results
        </h1>
        <FlightListingPage searchCriteria={searchCriteria} />
      </main>
    </>
  );
}

function ErrorMessage() {
  return (
    <div
      className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
      role="alert"
    >
      <p className="font-bold">Error</p>
      <p>
        Something went wrong while loading the flight results. Please try again
        later.
      </p>
    </div>
  );
}
