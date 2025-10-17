import React, { useState } from 'react';
import TravelNavbar from './TravelNavbar';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import { Hotel, Star, DollarSign } from 'lucide-react';

const API_URL = process.env.REACT_APP_BACKEND_URL || '';

const HotelSearch = () => {
  const { getAuthHeaders } = useAuth();
  const [searchParams, setSearchParams] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 1
  });
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}/api/travel/hotels/search`,
        searchParams,
        { headers: getAuthHeaders() }
      );
      setHotels(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <TravelNavbar currentPage="/corporate-travel/hotels" />
      
      <div className="main-content">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Search Hotels</h1>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Hotel Search</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Destination</label>
                    <Input
                      value={searchParams.destination}
                      onChange={(e) => setSearchParams({...searchParams, destination: e.target.value})}
                      placeholder="City or Location"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Guests</label>
                    <Input
                      type="number"
                      value={searchParams.guests}
                      onChange={(e) => setSearchParams({...searchParams, guests: parseInt(e.target.value)})}
                      min="1"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Check-in Date</label>
                    <Input
                      type="date"
                      value={searchParams.checkIn}
                      onChange={(e) => setSearchParams({...searchParams, checkIn: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Check-out Date</label>
                    <Input
                      type="date"
                      value={searchParams.checkOut}
                      onChange={(e) => setSearchParams({...searchParams, checkOut: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Searching...' : 'Search Hotels'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {loading && <div className="flex justify-center py-12"><div className="loading-spinner"></div></div>}

          {!loading && hotels.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {hotels.map((hotel) => (
                <Card key={hotel.id} className="hotel-card">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-bold">{hotel.name}</h3>
                        <p className="text-sm text-gray-600">{hotel.location}</p>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                        <span className="font-semibold">{hotel.rating}</span>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {hotel.amenities.slice(0, 4).map((amenity, idx) => (
                          <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center">
                          <DollarSign className="w-5 h-5 text-green-600" />
                          <span className="text-2xl font-bold text-green-600">{hotel.pricePerNight}</span>
                        </div>
                        <p className="text-xs text-gray-500">per night</p>
                      </div>
                      <Button size="sm">Select Hotel</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotelSearch;