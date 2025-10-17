import React from 'react';
import { Link } from 'react-router-dom';
import TravelNavbar from './TravelNavbar';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Plane, Hotel, Car, Shield, TrendingUp, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="flex">
      <TravelNavbar currentPage="/corporate-travel/dashboard" />
      
      <div className="main-content">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Corporate Travel Dashboard</h1>
            <p className="text-gray-600">Welcome to Vector Travel Intelligence Platform</p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Link to="/corporate-travel/flights">
              <Card className="travel-card hover:shadow-lg cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Search</p>
                      <h3 className="text-xl font-bold">Flights</h3>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Plane className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/corporate-travel/hotels">
              <Card className="travel-card hover:shadow-lg cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Search</p>
                      <h3 className="text-xl font-bold">Hotels</h3>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-full">
                      <Hotel className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/corporate-travel/cars">
              <Card className="travel-card hover:shadow-lg cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Rent</p>
                      <h3 className="text-xl font-bold">Cars</h3>
                    </div>
                    <div className="bg-green-100 p-3 rounded-full">
                      <Car className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/corporate-travel/safety">
              <Card className="travel-card hover:shadow-lg cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Check</p>
                      <h3 className="text-xl font-bold">Safety</h3>
                    </div>
                    <div className="bg-red-100 p-3 rounded-full">
                      <Shield className="w-6 h-6 text-red-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Features Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-purple-600" />
                  AI-Powered Safety Intelligence
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Get real-time safety scores powered by GPT-5, Claude Sonnet 4, and Gemini 2.5 Pro.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-blue-500 mr-2 mt-0.5" />
                    <span className="text-sm">LGBTQ+ safety ratings for destinations</span>
                  </li>
                  <li className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-blue-500 mr-2 mt-0.5" />
                    <span className="text-sm">Political stability assessments</span>
                  </li>
                  <li className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-blue-500 mr-2 mt-0.5" />
                    <span className="text-sm">Health and crime rate analysis</span>
                  </li>
                  <li className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-blue-500 mr-2 mt-0.5" />
                    <span className="text-sm">Personalized mitigation strategies</span>
                  </li>
                </ul>
                <Button className="mt-4 w-full" asChild>
                  <Link to="/corporate-travel/safety">Check Safety Scores</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                  Complete Travel Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  End-to-end travel booking, expense tracking, and policy compliance.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <TrendingUp className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-sm">Search flights, hotels, and car rentals</span>
                  </li>
                  <li className="flex items-start">
                    <TrendingUp className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-sm">Manage itineraries and bookings</span>
                  </li>
                  <li className="flex items-start">
                    <TrendingUp className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-sm">Track expenses and receipts</span>
                  </li>
                  <li className="flex items-start">
                    <TrendingUp className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-sm">Automated policy compliance checks</span>
                  </li>
                </ul>
                <Button className="mt-4 w-full" variant="outline" asChild>
                  <Link to="/corporate-travel/trips">View My Trips</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;