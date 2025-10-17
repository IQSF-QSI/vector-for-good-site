import React, { useState } from 'react';
import TravelNavbar from './TravelNavbar';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import { Plane, Clock, DollarSign } from 'lucide-react';

const API_URL = process.env.REACT_APP_BACKEND_URL || '';

const FlightSearch = () => {
  const { getAuthHeaders } = useAuth();
  const [searchParams, setSearchParams] = useState({
    origin: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    passengers: 1
  });
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        `${API_URL}/api/travel/flights/search`,
        searchParams,
        { headers: getAuthHeaders() }
      );
      setFlights(response.data);
    } catch (err) {
      setError('Failed to search flights. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex">
      <TravelNavbar currentPage="/corporate-travel/flights" />
      
      <div className="main-content">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Search Flights</h1>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Flight Search</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">From</label>
                    <Input
                      name="origin"
                      value={searchParams.origin}
                      onChange={handleChange}
                      placeholder="New York"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">To</label>
                    <Input
                      name="destination"
                      value={searchParams.destination}
                      onChange={handleChange}
                      placeholder="London"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Departure Date</label>
                    <Input
                      type="date"
                      name="departureDate"
                      value={searchParams.departureDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Return Date (Optional)</label>
                    <Input
                      type="date"
                      name="returnDate"
                      value={searchParams.returnDate}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Passengers</label>
                    <Input
                      type="number"
                      name="passengers"
                      value={searchParams.passengers}
                      onChange={handleChange}
                      min="1"
                      max="9"
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Searching...' : 'Search Flights'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {loading && (
            <div className="flex justify-center py-12">
              <div className="loading-spinner"></div>
            </div>
          )}

          {!loading && flights.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">Available Flights ({flights.length})</h2>
              {flights.map((flight) => (
                <div key={flight.id} className="flight-card">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <Plane className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="font-bold text-lg">{flight.airline}</span>
                        <span className="text-gray-500 ml-2 text-sm">{flight.flightNumber}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Origin</p>
                          <p className="font-semibold">{flight.origin}</p>
                          <p className="text-xs text-gray-500">{flight.departureTime}</p>
                        </div>
                        <div className="text-center">
                          <Clock className="w-4 h-4 mx-auto mb-1 text-gray-400" />
                          <p className="text-gray-600">{flight.duration}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Destination</p>
                          <p className="font-semibold">{flight.destination}</p>
                          <p className="text-xs text-gray-500">{flight.arrivalTime}</p>
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        {flight.availableSeats} seats available
                      </div>
                    </div>
                    <div className="text-right ml-6">
                      <div className="flex items-center justify-end mb-2">
                        <DollarSign className="w-5 h-5 text-green-600" />
                        <span className="text-2xl font-bold text-green-600">
                          {flight.price.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mb-3">{flight.currency}</p>
                      <Button size="sm">Select Flight</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && flights.length === 0 && searchParams.origin && (
            <Card>
              <CardContent className="py-12 text-center text-gray-500">
                No flights found. Try different search criteria.
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlightSearch;