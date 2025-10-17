import React, { useState, useEffect } from 'react';
import TravelNavbar from './TravelNavbar';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import { Calendar, MapPin, CheckCircle } from 'lucide-react';

const API_URL = process.env.REACT_APP_BACKEND_URL || '';

const MyTrips = () => {
  const { getAuthHeaders } = useAuth();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/trips/trips`,
        { headers: getAuthHeaders() }
      );
      setTrips(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <TravelNavbar currentPage="/corporate-travel/trips" />
      
      <div className="main-content">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">My Trips</h1>
            <Button>Create New Trip</Button>
          </div>

          {loading && <div className="flex justify-center py-12"><div className="loading-spinner"></div></div>}

          {!loading && trips.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center text-gray-500">
                <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p>No trips yet. Start planning your next journey!</p>
              </CardContent>
            </Card>
          )}

          {!loading && trips.length > 0 && (
            <div className="space-y-4">
              {trips.map((trip) => (
                <Card key={trip.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <MapPin className="w-5 h-5 text-purple-600 mr-2" />
                          <h3 className="text-xl font-bold">{trip.destination}</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Dates</p>
                            <p className="font-semibold">{trip.startDate} - {trip.endDate}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Purpose</p>
                            <p className="font-semibold capitalize">{trip.purpose.replace('_', ' ')}</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                          trip.status === 'completed' ? 'bg-green-100 text-green-700' :
                          trip.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {trip.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyTrips;