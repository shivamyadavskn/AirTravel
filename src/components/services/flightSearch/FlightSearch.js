async function FetchFlightsDataAPI() {
  console.log(
    "data todfr",
    JSON.stringify(sourceAirportCode),
    JSON.stringify(destinationAirportCode),
    itineraryType,
    sortOrder,
    numAdults,
    classOfService,
    pageNumber,
    nearby,
    nonstop,
    currencyCode,
    region,
    date,
    returnDate
  );
  const url = `https://tripadvisor16.p.rapidapi.com/api/v1/flights/searchFlights?sourceAirportCode=${sourceAirportCode}&destinationAirportCode=${destinationAirportCode}&date=${date}&itineraryType=${itineraryType}&sortOrder=${sortOrder}&numAdults=${numAdults}&numSeniors=${numChildren}&classOfService=${classOfService}&returnDate=${returnDate}&pageNumber=${pageNumber}&nearby=${nearby}&nonstop=${nonstop}&currencyCode=${currencyCode}&region=${region}`;
  console.log("url data in search function", url);
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "d9575394f3mshabc1a3bc761f6abp180204jsn22668636c912", // Use environment variable for API key
      "x-rapidapi-host": "tripadvisor16.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log("resulttttttttttt", result);
    return result;
  } catch (error) {
    console.error("Fetch error:", error);
    return new Error("Failed to fetch flights data", error);
  }
}

export { FetchFlightsDataAPI };
