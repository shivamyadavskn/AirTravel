const url =
  "https://tripadvisor16.p.rapidapi.com/api/v1/flights/searchFlights?sourceAirportCode=BOM&destinationAirportCode=DEL&itineraryType=ONE_WAY&sortOrder=ML_BEST_VALUE&numAdults=1&numSeniors=0&classOfService=ECONOMY&pageNumber=1&nearby=yes&nonstop=yes&currencyCode=USD&region=USA";

const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "d35b4e7c42msh1f0b5e5d3f362a0p175f73jsn248fbaa674ac", // Replace with your own API key securely
    "x-rapidapi-host": "tripadvisor16.p.rapidapi.com",
  },
};

const fetchFlightData = async () => {
  try {
    const response = await fetch(url, options);
    const result = await response.json(); // Use .json() to parse the response body as JSON
    console.log(result);
  } catch (error) {
    console.error("Failed to fetch flight data:", error);
  }
};

// Execute the function
export { fetchFlightData };
