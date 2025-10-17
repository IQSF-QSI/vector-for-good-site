import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import TravelLanding from './travel/TravelLanding';
import Login from './travel/Login';
import Register from './travel/Register';
import Dashboard from './travel/Dashboard';
import FlightSearch from './travel/FlightSearch';
import HotelSearch from './travel/HotelSearch';
import CarRentals from './travel/CarRentals';
import SafetyIntelligence from './travel/SafetyIntelligence';
import MyTrips from './travel/MyTrips';
import Expenses from './travel/Expenses';
import '../styles/corporate-travel.css';
import '../styles/travel-landing.css';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/corporate-travel/login" />;
};

const CorporateTravel = () => {
  return (
    <AuthProvider>
      <div className="corporate-travel-app">
        <Routes>
          <Route path="/" element={<TravelLanding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/flights" element={
            <ProtectedRoute>
              <FlightSearch />
            </ProtectedRoute>
          } />
          <Route path="/hotels" element={
            <ProtectedRoute>
              <HotelSearch />
            </ProtectedRoute>
          } />
          <Route path="/cars" element={
            <ProtectedRoute>
              <CarRentals />
            </ProtectedRoute>
          } />
          <Route path="/safety" element={
            <ProtectedRoute>
              <SafetyIntelligence />
            </ProtectedRoute>
          } />
          <Route path="/trips" element={
            <ProtectedRoute>
              <MyTrips />
            </ProtectedRoute>
          } />
          <Route path="/expenses" element={
            <ProtectedRoute>
              <Expenses />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default CorporateTravel;
