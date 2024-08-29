"use client"
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Search() {
  const searchParams = useSearchParams(); // Hook to access query parameters
  const [flightsData, setFlightsData] = useState(null); // State to store fetched data
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const sourceAirportCode = searchParams.get("sourceAirportCode") || "BOM";
    const destinationAirportCode =
      searchParams.get("destinationAirportCode") || "DEL";
    const itineraryType = searchParams.get("itineraryType") || "ONE_WAY";
    const sortOrder = searchParams.get("sortOrder") || "ML_BEST_VALUE";
    const numAdults = searchParams.get("numAdults") || "1";
    const numSeniors = searchParams.get("numSeniors") || "0";
    const classOfService = searchParams.get("classOfService") || "ECONOMY";
    const pageNumber = searchParams.get("pageNumber") || "1";
    const nearby = searchParams.get("nearby") || "yes";
    const nonstop = searchParams.get("nonstop") || "yes";
    const currencyCode = searchParams.get("currencyCode") || "USD";
    const region = searchParams.get("region") || "USA";
    const date = searchParams.get("date") || "2024-09-06";
    const returnDate = searchParams.get("returnDate") || "2024-08-31";

    const fetchFlightsData = async () => {
      const url = `https://tripadvisor16.p.rapidapi.com/api/v1/flights/searchFlights?sourceAirportCode=${sourceAirportCode}&destinationAirportCode=${destinationAirportCode}&date=${date}&itineraryType=${itineraryType}&sortOrder=${sortOrder}&numAdults=${numAdults}&numSeniors=${numSeniors}&classOfService=${classOfService}&returnDate=${returnDate}&pageNumber=${pageNumber}&nearby=${nearby}&nonstop=${nonstop}&currencyCode=${currencyCode}&region=${region}`;

      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "d35b4e7c42msh1f0b5e5d3f362a0p175f73jsn248fbaa674ac", // Use environment variable for API key
          "x-rapidapi-host": "tripadvisor16.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const result = await response.json();
        setFlightsData(result);
        console.log("Fetched data:", result); // Log the result for debugging
      } catch (error) {
        setError(error.message);
        console.error("Fetch error:", error); // Log error for debugging
      } finally {
        setLoading(false);
      }
    };

    fetchFlightsData();
  }, [searchParams]); // Re-run effect if searchParams change

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Flight Search Results</h1>
      {flightsData ? (
        <div>
          {/* Adjust this section based on the actual structure of flightsData */}
          <pre>{JSON.stringify(flightsData, null, 2)}</pre>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}
