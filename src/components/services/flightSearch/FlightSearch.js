export const GetFlightSearchData = async (params) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer YnHCqRblzAVQ5q7QnEnzcYYR69IR");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${params.originLocationCode}&destinationLocationCode=${params.destinationLocationCode}&departureDate=${params.departureDate}&returnDate=${params.returnDate}&adults=${params.adults}&max=${params.max}`,
      requestOptions
    );
    
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const result = await response.json();
    console.log("in flight data function",result); // Log the result or handle the result accordingly
    return result; // Return the result for further use if needed
  } catch (error) {
    console.error("Error fetching flight data:", error);
    throw error; // Optionally rethrow the error if you want to handle it outside this function
  }
};
