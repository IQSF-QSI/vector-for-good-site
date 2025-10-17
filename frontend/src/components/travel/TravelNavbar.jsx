import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Plane, Home, Search, Hotel, Car, Shield, Calendar, Receipt, LogOut } from 'lucide-react';
import { Button } from '../ui/button';

const TravelNavbar = ({ currentPage }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/corporate-travel/login');
  };

  const navItems = [
    { path: '/corporate-travel/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/corporate-travel/flights', icon: Plane, label: 'Flights' },
    { path: '/corporate-travel/hotels', icon: Hotel, label: 'Hotels' },
    { path: '/corporate-travel/cars', icon: Car, label: 'Car Rentals' },
    { path: '/corporate-travel/safety', icon: Shield, label: 'Safety Intel' },
    { path: '/corporate-travel/trips', icon: Calendar, label: 'My Trips' },
    { path: '/corporate-travel/expenses', icon: Receipt, label: 'Expenses' }
  ];

  return (
    <div className="nav-sidebar">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center mb-2">
          <Plane className="w-8 h-8 text-purple-600 mr-2" />
          <h2 className="text-xl font-bold">Vector Travel</h2>
        </div>
        <p className="text-sm text-gray-600">Welcome, {user?.fullName}</p>
      </div>

      <nav className="py-4">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${currentPage === item.path ? 'active' : ''}`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start text-red-600 hover:bg-red-50"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default TravelNavbar;