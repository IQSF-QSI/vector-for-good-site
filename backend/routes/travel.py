from fastapi import APIRouter, Depends, HTTPException
from typing import List
import os
from dotenv import load_dotenv
from models import (
    Flight, FlightSearchQuery, Hotel, HotelSearchQuery, 
    CarRental, User
)
from routes.auth import get_current_user
from motor.motor_asyncio import AsyncIOMotorClient
import uuid
from datetime import datetime, timedelta
import random

load_dotenv()

router = APIRouter()

# MongoDB connection
MONGO_URL = os.getenv("MONGO_URL")
DB_NAME = os.getenv("DB_NAME", "test_database")
client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]


# Mock data generators for realistic travel booking
AIRLINES = ["United Airlines", "Delta", "American Airlines", "British Airways", "Lufthansa", "Emirates", "Singapore Airlines"]
AIRPORTS = {
    "New York": "JFK",
    "Los Angeles": "LAX",
    "London": "LHR",
    "Paris": "CDG",
    "Tokyo": "NRT",
    "Dubai": "DXB",
    "Singapore": "SIN",
    "San Francisco": "SFO",
    "Chicago": "ORD",
    "Frankfurt": "FRA",
    "Amsterdam": "AMS",
    "Hong Kong": "HKG"
}

HOTELS = [
    "Hilton", "Marriott", "Hyatt", "InterContinental", "Four Seasons",
    "Sheraton", "Westin", "Ritz-Carlton", "Park Hyatt", "JW Marriott"
]

CAR_PROVIDERS = ["Enterprise", "Hertz", "Avis", "Budget", "National"]
CAR_TYPES = [
    {"type": "Economy", "models": ["Toyota Corolla", "Honda Civic", "Nissan Sentra"]},
    {"type": "Midsize", "models": ["Toyota Camry", "Honda Accord", "Mazda 6"]},
    {"type": "Luxury", "models": ["BMW 5 Series", "Mercedes E-Class", "Audi A6"]},
    {"type": "SUV", "models": ["Toyota RAV4", "Honda CR-V", "Ford Explorer"]}
]


def generate_mock_flights(origin: str, destination: str, departure_date: str, count: int = 5) -> List[Flight]:
    flights = []
    departure_dt = datetime.strptime(departure_date, "%Y-%m-%d")
    
    for i in range(count):
        airline = random.choice(AIRLINES)
        flight_number = f"{airline[:2].upper()}{random.randint(100, 999)}"
        
        # Generate departure time (6 AM to 10 PM)
        hour = random.randint(6, 22)
        minute = random.choice([0, 15, 30, 45])
        departure_time = f"{hour:02d}:{minute:02d}"
        
        # Duration between 2-15 hours based on distance
        duration_hours = random.randint(2, 15)
        duration_minutes = random.choice([0, 30])
        duration = f"{duration_hours}h {duration_minutes}m"
        
        # Calculate arrival time
        arrival_dt = departure_dt.replace(hour=hour, minute=minute) + timedelta(hours=duration_hours, minutes=duration_minutes)
        arrival_time = arrival_dt.strftime("%H:%M")
        
        # Price between $200-$2000
        price = round(random.uniform(200, 2000), 2)
        
        flights.append(Flight(
            airline=airline,
            flightNumber=flight_number,
            origin=origin,
            destination=destination,
            departureTime=f"{departure_date} {departure_time}",
            arrivalTime=f"{arrival_dt.strftime('%Y-%m-%d')} {arrival_time}",
            duration=duration,
            price=price,
            availableSeats=random.randint(5, 50)
        ))
    
    return flights


def generate_mock_hotels(destination: str, count: int = 5) -> List[Hotel]:
    hotels = []
    
    for i in range(count):
        hotel_name = f"{random.choice(HOTELS)} {destination}"
        rating = round(random.uniform(3.5, 5.0), 1)
        price = round(random.uniform(100, 500), 2)
        
        amenities = random.sample([
            "Free WiFi", "Breakfast Included", "Gym", "Pool",
            "Business Center", "Restaurant", "Bar", "Spa",
            "Room Service", "Airport Shuttle", "Parking"
        ], k=random.randint(4, 7))
        
        hotels.append(Hotel(
            name=hotel_name,
            location=destination,
            rating=rating,
            pricePerNight=price,
            amenities=amenities,
            imageUrl=f"https://images.unsplash.com/photo-{random.randint(1000000000000, 9999999999999)}"
        ))
    
    return hotels


def generate_mock_car_rentals(destination: str, count: int = 5) -> List[CarRental]:
    car_rentals = []
    
    for i in range(count):
        provider = random.choice(CAR_PROVIDERS)
        car_category = random.choice(CAR_TYPES)
        car_model = random.choice(car_category["models"])
        
        price = round(random.uniform(30, 150), 2)
        
        features = random.sample([
            "Automatic", "Manual", "GPS", "Bluetooth",
            "Backup Camera", "USB Charging", "Child Seat Available",
            "Unlimited Mileage", "Insurance Included"
        ], k=random.randint(3, 5))
        
        car_rentals.append(CarRental(
            provider=provider,
            carType=car_category["type"],
            carModel=car_model,
            pricePerDay=price,
            features=features
        ))
    
    return car_rentals


@router.post("/flights/search", response_model=List[Flight])
async def search_flights(
    query: FlightSearchQuery,
    current_user: User = Depends(get_current_user)
):
    # Generate mock flight data
    flights = generate_mock_flights(
        origin=query.origin,
        destination=query.destination,
        departure_date=query.departureDate,
        count=8
    )
    
    # Sort by price
    flights.sort(key=lambda x: x.price)
    
    return flights


@router.post("/hotels/search", response_model=List[Hotel])
async def search_hotels(
    query: HotelSearchQuery,
    current_user: User = Depends(get_current_user)
):
    # Generate mock hotel data
    hotels = generate_mock_hotels(
        destination=query.destination,
        count=6
    )
    
    # Sort by rating
    hotels.sort(key=lambda x: x.rating, reverse=True)
    
    return hotels


@router.get("/cars", response_model=List[CarRental])
async def get_car_rentals(
    destination: str,
    current_user: User = Depends(get_current_user)
):
    # Generate mock car rental data
    car_rentals = generate_mock_car_rentals(
        destination=destination,
        count=6
    )
    
    # Sort by price
    car_rentals.sort(key=lambda x: x.pricePerDay)
    
    return car_rentals
