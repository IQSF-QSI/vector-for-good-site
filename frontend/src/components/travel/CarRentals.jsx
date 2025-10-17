import React, { useState, useEffect } from 'react';
import TravelNavbar from './TravelNavbar';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import { Car, DollarSign } from 'lucide-react';

const API_URL = process.env.REACT_APP_BACKEND_URL || '';

const CarRentals = () => {
  const { getAuthHeaders } = useAuth();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [destination, setDestination] = useState('New York');

  const fetchCars = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_URL}/api/travel/cars`,
        {
          params: { destination },
          headers: getAuthHeaders()
        }
      );
      setCars(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (destination) {
      fetchCars();
    }
  }, [destination]);

  return (
    <div className="flex">
      <TravelNavbar currentPage="/corporate-travel/cars" />
      
      <div className="main-content">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Car Rentals</h1>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Enter destination"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                />
                <Button onClick={fetchCars}>Search</Button>
              </div>
            </CardContent>
          </Card>

          {loading && <div className="flex justify-center py-12"><div className="loading-spinner"></div></div>}

          {!loading && cars.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cars.map((car) => (
                <Card key={car.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold">{car.carModel}</h3>
                        <p className="text-sm text-gray-600">{car.provider}</p>
                        <p className="text-xs text-gray-500 mt-1">{car.carType}</p>
                      </div>
                      <Car className="w-10 h-10 text-blue-600" />
                    </div>
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {car.features.map((feature, idx) => (
                          <span key={idx} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center">
                          <DollarSign className="w-5 h-5 text-green-600" />
                          <span className="text-2xl font-bold text-green-600">{car.pricePerDay}</span>
                        </div>
                        <p className="text-xs text-gray-500">per day</p>
                      </div>
                      <Button size="sm">Rent Now</Button>
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

export default CarRentals;