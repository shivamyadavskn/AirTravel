"use client"
import React, { useState, useEffect } from 'react';
import { GetFlightSearchData } from '../services/flightSearch/FlightSearch';
import { Plane, Clock, Calendar, DollarSign, Filter, SortAsc, SortDesc } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const FlightListingPage = ({ searchCriteria }) => {
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortCriteria, setSortCriteria] = useState('price');
    const [sortOrder, setSortOrder] = useState('asc');
    const [filterCriteria, setFilterCriteria] = useState({
        maxPrice: Infinity,
        airlines: [],
        maxStops: Infinity,
    });

    useEffect(() => {
        const fetchFlights = async () => {
            setLoading(true);
            setError(null);

            const params = {
                originLocationCode: searchCriteria.from,
                destinationLocationCode: searchCriteria.to,
                departureDate: searchCriteria.departureDate,
                returnDate: searchCriteria.returnDate,
                adults: searchCriteria.adults,
                children: searchCriteria.children,
                infants: searchCriteria.infants,
                travelClass: searchCriteria.travelClass,
                max: 20,
            };

            try {
                const response = await GetFlightSearchData(params);
                setFlights(response.data);
            } catch (err) {
                console.error('Error fetching flights:', err);
                setError('Failed to fetch flight data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchFlights();
    }, [searchCriteria]);

    const sortedAndFilteredFlights = flights
        .filter(flight => {
            const price = parseFloat(flight.price.total);
            const stops = flight.itineraries[0].segments.length - 1;
            const airline = flight.validatingAirlineCodes[0];
            
            return price <= filterCriteria.maxPrice &&
                   (filterCriteria.airlines.length === 0 || filterCriteria.airlines.includes(airline)) &&
                   stops <= filterCriteria.maxStops;
        })
        .sort((a, b) => {
            if (sortCriteria === 'price') {
                return sortOrder === 'asc' 
                    ? parseFloat(a.price.total) - parseFloat(b.price.total)
                    : parseFloat(b.price.total) - parseFloat(a.price.total);
            } else if (sortCriteria === 'duration') {
                const durationA = a.itineraries[0].duration;
                const durationB = b.itineraries[0].duration;
                return sortOrder === 'asc'
                    ? durationA.localeCompare(durationB)
                    : durationB.localeCompare(durationA);
            }
            return 0;
        });

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className="container mx-auto px-4 py-8">
            <SearchSummary searchCriteria={searchCriteria} />
            <div className="mb-6 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <Select onValueChange={(value) => setSortCriteria(value)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="price">Price</SelectItem>
                            <SelectItem value="duration">Duration</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button 
                        variant="outline" 
                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    >
                        {sortOrder === 'asc' ? <SortAsc /> : <SortDesc />}
                    </Button>
                </div>
                <Button onClick={() => {/* Open filter modal */}}>
                    <Filter className="mr-2" /> Filter
                </Button>
            </div>
            {sortedAndFilteredFlights.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedAndFilteredFlights.map((flight) => (
                        <FlightCard key={flight.id} flight={flight} />
                    ))}
                </div>
            ) : (
                <NoFlightsMessage searchCriteria={searchCriteria} />
            )}
        </div>
    );
};

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
        <Card>
            <CardHeader className="bg-blue-600 text-white">
                <h2 className="text-xl font-semibold">Flight {id}</h2>
            </CardHeader>
            <CardContent className="p-6">
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
            </CardContent>
            <CardFooter>
                <Button className="w-full">Book Now</Button>
            </CardFooter>
        </Card>
    );
};

const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
);

const ErrorMessage = ({ message }) => (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
        <p className="font-bold">Error</p>
        <p>{message}</p>
    </div>
);

const SearchSummary = ({ searchCriteria }) => (
    <Card className="mb-6">
        <CardContent className="p-4">
            <p className="font-semibold">
                {searchCriteria.from} to {searchCriteria.to}
            </p>
            <p>
                {searchCriteria.departureDate}
                {searchCriteria.returnDate && ` - ${searchCriteria.returnDate}`}
            </p>
            <p>
                {searchCriteria.adults + searchCriteria.children + searchCriteria.infants} passenger(s), {searchCriteria.travelClass}
            </p>
        </CardContent>
    </Card>
);

const NoFlightsMessage = ({ searchCriteria }) => (
    <Card className="bg-yellow-100 border-yellow-500 text-yellow-700">
        <CardContent className="p-4">
            <p className="font-bold">No Flights Found</p>
            <p>We couldn't find any flights matching your search criteria. Please try different dates or airports.</p>
        </CardContent>
    </Card>
);

export default FlightListingPage;