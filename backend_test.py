#!/usr/bin/env python3
"""
Corporate Travel App Backend API Tests
Tests all authentication, travel booking, safety intelligence, and trip management endpoints
"""

import requests
import json
import os
from datetime import datetime, timedelta
import uuid

# Get backend URL from environment
BACKEND_URL = "https://seo-content-hub-5.preview.emergentagent.com/api"

class CorporateTravelAPITester:
    def __init__(self):
        self.base_url = BACKEND_URL
        self.auth_token = None
        self.user_id = None
        self.test_results = {
            "passed": 0,
            "failed": 0,
            "errors": []
        }
        
    def log_result(self, test_name, success, message="", response_data=None):
        """Log test result"""
        if success:
            self.test_results["passed"] += 1
            print(f"✅ {test_name}: PASSED")
            if message:
                print(f"   {message}")
        else:
            self.test_results["failed"] += 1
            print(f"❌ {test_name}: FAILED")
            print(f"   {message}")
            if response_data:
                print(f"   Response: {response_data}")
            self.test_results["errors"].append(f"{test_name}: {message}")
    
    def test_user_registration(self):
        """Test POST /api/auth/register"""
        test_name = "User Registration"
        
        # Generate unique test data
        test_email = f"testuser_{uuid.uuid4().hex[:8]}@corporatetravel.com"
        test_data = {
            "email": test_email,
            "password": "SecurePass123!",
            "fullName": "John Corporate",
            "company": "TechCorp Solutions"
        }
        
        try:
            response = requests.post(f"{self.base_url}/auth/register", json=test_data)
            
            if response.status_code == 200:
                data = response.json()
                if "access_token" in data and "user" in data:
                    self.auth_token = data["access_token"]
                    self.user_id = data["user"]["id"]
                    self.log_result(test_name, True, f"User registered with ID: {self.user_id}")
                    return True
                else:
                    self.log_result(test_name, False, "Missing access_token or user in response", data)
            else:
                self.log_result(test_name, False, f"HTTP {response.status_code}", response.text)
                
        except Exception as e:
            self.log_result(test_name, False, f"Exception: {str(e)}")
        
        return False
    
    def test_user_login(self):
        """Test POST /api/auth/login"""
        test_name = "User Login"
        
        # First register a user for login test
        test_email = f"logintest_{uuid.uuid4().hex[:8]}@corporatetravel.com"
        register_data = {
            "email": test_email,
            "password": "LoginTest123!",
            "fullName": "Login Test User",
            "company": "Test Company"
        }
        
        try:
            # Register user first
            reg_response = requests.post(f"{self.base_url}/auth/register", json=register_data)
            if reg_response.status_code != 200:
                self.log_result(test_name, False, "Failed to register user for login test")
                return False
            
            # Now test login
            login_data = {
                "email": test_email,
                "password": "LoginTest123!"
            }
            
            response = requests.post(f"{self.base_url}/auth/login", json=login_data)
            
            if response.status_code == 200:
                data = response.json()
                if "access_token" in data and "user" in data:
                    self.log_result(test_name, True, f"Login successful for {test_email}")
                    return True
                else:
                    self.log_result(test_name, False, "Missing access_token or user in response", data)
            else:
                self.log_result(test_name, False, f"HTTP {response.status_code}", response.text)
                
        except Exception as e:
            self.log_result(test_name, False, f"Exception: {str(e)}")
        
        return False
    
    def test_get_current_user(self):
        """Test GET /api/auth/me"""
        test_name = "Get Current User Info"
        
        if not self.auth_token:
            self.log_result(test_name, False, "No auth token available")
            return False
        
        try:
            headers = {"Authorization": f"Bearer {self.auth_token}"}
            response = requests.get(f"{self.base_url}/auth/me", headers=headers)
            
            if response.status_code == 200:
                data = response.json()
                if "id" in data and "email" in data:
                    self.log_result(test_name, True, f"Retrieved user info for ID: {data['id']}")
                    return True
                else:
                    self.log_result(test_name, False, "Missing required user fields", data)
            else:
                self.log_result(test_name, False, f"HTTP {response.status_code}", response.text)
                
        except Exception as e:
            self.log_result(test_name, False, f"Exception: {str(e)}")
        
        return False
    
    def test_flight_search(self):
        """Test POST /api/travel/flights/search"""
        test_name = "Flight Search"
        
        if not self.auth_token:
            self.log_result(test_name, False, "No auth token available")
            return False
        
        search_data = {
            "origin": "New York",
            "destination": "London",
            "departureDate": "2024-12-15",
            "passengers": 1
        }
        
        try:
            headers = {"Authorization": f"Bearer {self.auth_token}"}
            response = requests.post(f"{self.base_url}/travel/flights/search", 
                                   json=search_data, headers=headers)
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list) and len(data) > 0:
                    flight = data[0]
                    required_fields = ["airline", "flightNumber", "origin", "destination", "price"]
                    if all(field in flight for field in required_fields):
                        self.log_result(test_name, True, f"Found {len(data)} flights")
                        return True
                    else:
                        self.log_result(test_name, False, "Missing required flight fields", flight)
                else:
                    self.log_result(test_name, False, "No flights returned or invalid format", data)
            else:
                self.log_result(test_name, False, f"HTTP {response.status_code}", response.text)
                
        except Exception as e:
            self.log_result(test_name, False, f"Exception: {str(e)}")
        
        return False
    
    def test_hotel_search(self):
        """Test POST /api/travel/hotels/search"""
        test_name = "Hotel Search"
        
        if not self.auth_token:
            self.log_result(test_name, False, "No auth token available")
            return False
        
        search_data = {
            "destination": "London",
            "checkIn": "2024-12-15",
            "checkOut": "2024-12-18",
            "guests": 1
        }
        
        try:
            headers = {"Authorization": f"Bearer {self.auth_token}"}
            response = requests.post(f"{self.base_url}/travel/hotels/search", 
                                   json=search_data, headers=headers)
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list) and len(data) > 0:
                    hotel = data[0]
                    required_fields = ["name", "location", "rating", "pricePerNight"]
                    if all(field in hotel for field in required_fields):
                        self.log_result(test_name, True, f"Found {len(data)} hotels")
                        return True
                    else:
                        self.log_result(test_name, False, "Missing required hotel fields", hotel)
                else:
                    self.log_result(test_name, False, "No hotels returned or invalid format", data)
            else:
                self.log_result(test_name, False, f"HTTP {response.status_code}", response.text)
                
        except Exception as e:
            self.log_result(test_name, False, f"Exception: {str(e)}")
        
        return False
    
    def test_car_rentals(self):
        """Test GET /api/travel/cars"""
        test_name = "Car Rentals Search"
        
        if not self.auth_token:
            self.log_result(test_name, False, "No auth token available")
            return False
        
        try:
            headers = {"Authorization": f"Bearer {self.auth_token}"}
            params = {"destination": "London"}
            response = requests.get(f"{self.base_url}/travel/cars", 
                                  params=params, headers=headers)
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list) and len(data) > 0:
                    car = data[0]
                    required_fields = ["provider", "carType", "carModel", "pricePerDay"]
                    if all(field in car for field in required_fields):
                        self.log_result(test_name, True, f"Found {len(data)} car rentals")
                        return True
                    else:
                        self.log_result(test_name, False, "Missing required car rental fields", car)
                else:
                    self.log_result(test_name, False, "No car rentals returned or invalid format", data)
            else:
                self.log_result(test_name, False, f"HTTP {response.status_code}", response.text)
                
        except Exception as e:
            self.log_result(test_name, False, f"Exception: {str(e)}")
        
        return False
    
    def test_safety_analysis(self):
        """Test GET /api/safety/safety/{destination}"""
        test_name = "AI Safety Intelligence"
        
        if not self.auth_token:
            self.log_result(test_name, False, "No auth token available")
            return False
        
        try:
            headers = {"Authorization": f"Bearer {self.auth_token}"}
            params = {"country": "United Kingdom"}
            response = requests.get(f"{self.base_url}/safety/safety/London", 
                                  params=params, headers=headers)
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ["destination", "country", "overallScore", "lgbtqSafety", 
                                 "politicalStability", "healthAdvisory", "crimeRate"]
                if all(field in data for field in required_fields):
                    scores = {
                        "Overall": data["overallScore"],
                        "LGBTQ+ Safety": data["lgbtqSafety"],
                        "Political Stability": data["politicalStability"],
                        "Health Advisory": data["healthAdvisory"],
                        "Crime Rate": data["crimeRate"]
                    }
                    self.log_result(test_name, True, f"Safety analysis complete. Scores: {scores}")
                    return True
                else:
                    self.log_result(test_name, False, "Missing required safety score fields", data)
            else:
                self.log_result(test_name, False, f"HTTP {response.status_code}", response.text)
                
        except Exception as e:
            self.log_result(test_name, False, f"Exception: {str(e)}")
        
        return False
    
    def test_create_trip(self):
        """Test POST /api/trips/trips"""
        test_name = "Create Trip"
        
        if not self.auth_token or not self.user_id:
            self.log_result(test_name, False, "No auth token or user ID available")
            return False
        
        trip_data = {
            "userId": self.user_id,
            "destination": "London",
            "startDate": "2024-12-15",
            "endDate": "2024-12-18",
            "purpose": "business"
        }
        
        try:
            headers = {"Authorization": f"Bearer {self.auth_token}"}
            response = requests.post(f"{self.base_url}/trips/trips", 
                                   json=trip_data, headers=headers)
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ["id", "userId", "destination", "startDate", "endDate"]
                if all(field in data for field in required_fields):
                    self.trip_id = data["id"]  # Store for expense test
                    self.log_result(test_name, True, f"Trip created with ID: {data['id']}")
                    return True
                else:
                    self.log_result(test_name, False, "Missing required trip fields", data)
            else:
                self.log_result(test_name, False, f"HTTP {response.status_code}", response.text)
                
        except Exception as e:
            self.log_result(test_name, False, f"Exception: {str(e)}")
        
        return False
    
    def test_get_trips(self):
        """Test GET /api/trips/trips"""
        test_name = "Get User Trips"
        
        if not self.auth_token:
            self.log_result(test_name, False, "No auth token available")
            return False
        
        try:
            headers = {"Authorization": f"Bearer {self.auth_token}"}
            response = requests.get(f"{self.base_url}/trips/trips", headers=headers)
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_result(test_name, True, f"Retrieved {len(data)} trips")
                    return True
                else:
                    self.log_result(test_name, False, "Invalid trips format", data)
            else:
                self.log_result(test_name, False, f"HTTP {response.status_code}", response.text)
                
        except Exception as e:
            self.log_result(test_name, False, f"Exception: {str(e)}")
        
        return False
    
    def test_create_expense(self):
        """Test POST /api/trips/expenses"""
        test_name = "Create Expense"
        
        if not self.auth_token or not self.user_id:
            self.log_result(test_name, False, "No auth token or user ID available")
            return False
        
        # First create a trip for the expense
        if not hasattr(self, 'trip_id'):
            trip_data = {
                "userId": self.user_id,
                "destination": "London",
                "startDate": "2024-12-15",
                "endDate": "2024-12-18",
                "purpose": "business"
            }
            
            headers = {"Authorization": f"Bearer {self.auth_token}"}
            trip_response = requests.post(f"{self.base_url}/trips/trips", 
                                        json=trip_data, headers=headers)
            
            if trip_response.status_code == 200:
                self.trip_id = trip_response.json()["id"]
            else:
                self.log_result(test_name, False, "Failed to create trip for expense test")
                return False
        
        expense_data = {
            "tripId": self.trip_id,
            "userId": self.user_id,
            "category": "meals",
            "amount": 45.50,
            "description": "Business lunch with client",
            "date": "2024-12-15"
        }
        
        try:
            headers = {"Authorization": f"Bearer {self.auth_token}"}
            response = requests.post(f"{self.base_url}/trips/expenses", 
                                   json=expense_data, headers=headers)
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ["id", "tripId", "userId", "category", "amount"]
                if all(field in data for field in required_fields):
                    self.log_result(test_name, True, f"Expense created with ID: {data['id']}")
                    return True
                else:
                    self.log_result(test_name, False, "Missing required expense fields", data)
            else:
                self.log_result(test_name, False, f"HTTP {response.status_code}", response.text)
                
        except Exception as e:
            self.log_result(test_name, False, f"Exception: {str(e)}")
        
        return False
    
    def test_get_expenses(self):
        """Test GET /api/trips/expenses"""
        test_name = "Get User Expenses"
        
        if not self.auth_token:
            self.log_result(test_name, False, "No auth token available")
            return False
        
        try:
            headers = {"Authorization": f"Bearer {self.auth_token}"}
            response = requests.get(f"{self.base_url}/trips/expenses", headers=headers)
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_result(test_name, True, f"Retrieved {len(data)} expenses")
                    return True
                else:
                    self.log_result(test_name, False, "Invalid expenses format", data)
            else:
                self.log_result(test_name, False, f"HTTP {response.status_code}", response.text)
                
        except Exception as e:
            self.log_result(test_name, False, f"Exception: {str(e)}")
        
        return False
    
    def test_travel_policy(self):
        """Test GET /api/trips/policy"""
        test_name = "Get Travel Policy"
        
        if not self.auth_token:
            self.log_result(test_name, False, "No auth token available")
            return False
        
        try:
            headers = {"Authorization": f"Bearer {self.auth_token}"}
            response = requests.get(f"{self.base_url}/trips/policy", headers=headers)
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ["maxFlightCost", "maxHotelCostPerNight", "requiresApproval"]
                if all(field in data for field in required_fields):
                    self.log_result(test_name, True, f"Policy retrieved: Flight limit ${data['maxFlightCost']}")
                    return True
                else:
                    self.log_result(test_name, False, "Missing required policy fields", data)
            else:
                self.log_result(test_name, False, f"HTTP {response.status_code}", response.text)
                
        except Exception as e:
            self.log_result(test_name, False, f"Exception: {str(e)}")
        
        return False
    
    def test_compliance_check(self):
        """Test POST /api/trips/compliance/check"""
        test_name = "Trip Compliance Check"
        
        if not self.auth_token:
            self.log_result(test_name, False, "No auth token available")
            return False
        
        trip_data = {
            "flightCost": 800,
            "hotelCostPerNight": 250,
            "departureDate": "2024-12-15"
        }
        
        try:
            headers = {"Authorization": f"Bearer {self.auth_token}"}
            response = requests.post(f"{self.base_url}/trips/compliance/check", 
                                   json=trip_data, headers=headers)
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ["compliant", "requiresApproval", "violations", "warnings"]
                if all(field in data for field in required_fields):
                    compliance_status = "Compliant" if data["compliant"] else "Non-compliant"
                    self.log_result(test_name, True, f"Compliance check: {compliance_status}")
                    return True
                else:
                    self.log_result(test_name, False, "Missing required compliance fields", data)
            else:
                self.log_result(test_name, False, f"HTTP {response.status_code}", response.text)
                
        except Exception as e:
            self.log_result(test_name, False, f"Exception: {str(e)}")
        
        return False
    
    def run_all_tests(self):
        """Run all backend API tests"""
        print("🚀 Starting Corporate Travel App Backend API Tests")
        print(f"📍 Testing against: {self.base_url}")
        print("=" * 60)
        
        # Authentication Tests
        print("\n🔐 AUTHENTICATION TESTS")
        self.test_user_registration()
        self.test_user_login()
        self.test_get_current_user()
        
        # Travel Booking Tests
        print("\n✈️ TRAVEL BOOKING TESTS")
        self.test_flight_search()
        self.test_hotel_search()
        self.test_car_rentals()
        
        # AI Safety Intelligence Tests
        print("\n🛡️ AI SAFETY INTELLIGENCE TESTS")
        self.test_safety_analysis()
        
        # Trip and Expense Management Tests
        print("\n📋 TRIP & EXPENSE MANAGEMENT TESTS")
        self.test_create_trip()
        self.test_get_trips()
        self.test_create_expense()
        self.test_get_expenses()
        self.test_travel_policy()
        self.test_compliance_check()
        
        # Summary
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print(f"✅ Passed: {self.test_results['passed']}")
        print(f"❌ Failed: {self.test_results['failed']}")
        
        if self.test_results["errors"]:
            print("\n🚨 FAILED TESTS:")
            for error in self.test_results["errors"]:
                print(f"   • {error}")
        
        success_rate = (self.test_results['passed'] / 
                       (self.test_results['passed'] + self.test_results['failed'])) * 100
        print(f"\n📈 Success Rate: {success_rate:.1f}%")
        
        return self.test_results


if __name__ == "__main__":
    tester = CorporateTravelAPITester()
    results = tester.run_all_tests()