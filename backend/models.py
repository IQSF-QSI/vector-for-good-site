from pydantic import BaseModel, Field, EmailStr, validator
from typing import Optional, List
from datetime import datetime
import uuid


class DemoRequestCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr = Field(..., max_length=255)
    company: str = Field(..., min_length=2, max_length=200)
    message: Optional[str] = Field(None, max_length=1000)

    @validator('name', 'company')
    def strip_whitespace(cls, v):
        return v.strip()


class DemoRequest(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    company: str
    message: Optional[str] = None
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    status: str = Field(default="pending")
    source: str = Field(default="landing_page")

    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }


class DemoRequestResponse(BaseModel):
    success: bool
    message: str
    requestId: Optional[str] = None


class QSIMetric(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    cityName: str
    country: str
    score: int = Field(..., ge=0, le=100)
    rating: str  # excellent, good, moderate, caution
    legalProtection: int = Field(..., ge=0, le=100)
    socialAcceptance: int = Field(..., ge=0, le=100)
    safetyIndex: int = Field(..., ge=0, le=100)
    trend: str  # improving, stable, declining
    lastUpdated: datetime = Field(default_factory=datetime.utcnow)
    dataSource: Optional[str] = "QI Platform"

    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }


class QSIMetricsResponse(BaseModel):
    success: bool
    data: List[QSIMetric]


class ErrorResponse(BaseModel):
    success: bool = False
    error: str


# ============ Corporate Travel Models ============

class UserRegister(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8)
    fullName: str = Field(..., min_length=2, max_length=100)
    company: Optional[str] = None


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class User(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    fullName: str
    company: Optional[str] = None
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: User


class FlightSearchQuery(BaseModel):
    origin: str
    destination: str
    departureDate: str
    returnDate: Optional[str] = None
    passengers: int = Field(default=1, ge=1, le=9)


class Flight(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    airline: str
    flightNumber: str
    origin: str
    destination: str
    departureTime: str
    arrivalTime: str
    duration: str
    price: float
    currency: str = "USD"
    availableSeats: int


class HotelSearchQuery(BaseModel):
    destination: str
    checkIn: str
    checkOut: str
    guests: int = Field(default=1, ge=1, le=10)


class Hotel(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    location: str
    rating: float = Field(..., ge=0, le=5)
    pricePerNight: float
    currency: str = "USD"
    amenities: List[str]
    imageUrl: Optional[str] = None


class CarRental(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    provider: str
    carType: str
    carModel: str
    pricePerDay: float
    currency: str = "USD"
    features: List[str]


class SafetyScore(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    destination: str
    country: str
    overallScore: int = Field(..., ge=0, le=100)
    lgbtqSafety: int = Field(..., ge=0, le=100)
    politicalStability: int = Field(..., ge=0, le=100)
    healthAdvisory: int = Field(..., ge=0, le=100)
    crimeRate: int = Field(..., ge=0, le=100)
    mitigationStrategies: List[str]
    realTimeAlerts: List[str]
    lastUpdated: datetime = Field(default_factory=datetime.utcnow)
    aiAnalysis: Optional[str] = None
    
    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }


class TripCreate(BaseModel):
    userId: str
    destination: str
    startDate: str
    endDate: str
    flightId: Optional[str] = None
    hotelId: Optional[str] = None
    carRentalId: Optional[str] = None
    purpose: str  # business, conference, client_meeting


class Trip(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    userId: str
    destination: str
    startDate: str
    endDate: str
    flightId: Optional[str] = None
    hotelId: Optional[str] = None
    carRentalId: Optional[str] = None
    purpose: str
    status: str = Field(default="planned")  # planned, in_progress, completed
    safetyScoreId: Optional[str] = None
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }


class ExpenseCreate(BaseModel):
    tripId: str
    userId: str
    category: str  # flight, hotel, meals, transportation, other
    amount: float
    currency: str = "USD"
    description: str
    date: str
    receipt: Optional[str] = None


class Expense(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    tripId: str
    userId: str
    category: str
    amount: float
    currency: str = "USD"
    description: str
    date: str
    receipt: Optional[str] = None
    status: str = Field(default="pending")  # pending, approved, rejected
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }


class TravelPolicy(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    maxFlightCost: float = 1500.0
    maxHotelCostPerNight: float = 300.0
    maxCarRentalPerDay: float = 100.0
    maxDailyMeals: float = 75.0
    requiresApproval: bool = True
    advanceBookingDays: int = 14
