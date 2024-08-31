"use client";
import { useState, useEffect } from "react";
import { FetchFlightsDataAPI } from "../services/flightSearch/FlightSearch";
import FlightList from "../common/FlightListing/FlightList";
import { useSearchParams } from "next/navigation";

const Searched = () => {
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await FetchFlightsDataAPI(
          sourceAirportCode,
          destinationAirportCode,
          itineraryType,
          sortOrder,
          numAdults,
          numChildren,
          numInfants,
          classOfService,
          pageNumber,
          nearby,
          nonstop,
          currencyCode,
          region,
          date,
          returnDate
        );
        setFlightsData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div>
      <FlightList flightsData={flightsData} />
    </div>
  );
};

export default Searched;
