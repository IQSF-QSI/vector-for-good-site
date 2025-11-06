from fastapi import APIRouter, Depends, HTTPException
from typing import List
import os
from dotenv import load_dotenv
from models import (
    Trip, TripCreate, Expense, ExpenseCreate,
    TravelPolicy, User
)
from routes.auth import get_current_user
from motor.motor_asyncio import AsyncIOMotorClient

load_dotenv()

router = APIRouter()

# MongoDB connection
MONGO_URL = os.getenv("MONGO_URL")
DB_NAME = os.getenv("DB_NAME")
if not DB_NAME:
    raise ValueError("DB_NAME environment variable must be set")
client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]


@router.post("/trips", response_model=Trip)
async def create_trip(
    trip_data: TripCreate,
    current_user: User = Depends(get_current_user)
):
    """Create a new trip"""
    trip = Trip(**trip_data.dict())
    
    await db.trips.insert_one(trip.dict())
    
    return trip


@router.get("/trips", response_model=List[Trip])
async def get_user_trips(
    current_user: User = Depends(get_current_user)
):
    """Get all trips for the current user"""
    trips = await db.trips.find({"userId": current_user.id}).to_list(length=None)
    
    return [Trip(**trip) for trip in trips]


@router.get("/trips/{trip_id}", response_model=Trip)
async def get_trip(
    trip_id: str,
    current_user: User = Depends(get_current_user)
):
    """Get a specific trip"""
    trip = await db.trips.find_one({"id": trip_id, "userId": current_user.id})
    
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")
    
    return Trip(**trip)


@router.put("/trips/{trip_id}", response_model=Trip)
async def update_trip(
    trip_id: str,
    trip_data: TripCreate,
    current_user: User = Depends(get_current_user)
):
    """Update a trip"""
    trip = await db.trips.find_one({"id": trip_id, "userId": current_user.id})
    
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")
    
    updated_trip = Trip(id=trip_id, **trip_data.dict())
    
    await db.trips.update_one(
        {"id": trip_id},
        {"$set": updated_trip.dict()}
    )
    
    return updated_trip


@router.delete("/trips/{trip_id}")
async def delete_trip(
    trip_id: str,
    current_user: User = Depends(get_current_user)
):
    """Delete a trip"""
    result = await db.trips.delete_one({"id": trip_id, "userId": current_user.id})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Trip not found")
    
    return {"success": True, "message": "Trip deleted successfully"}


# Expense routes
@router.post("/expenses", response_model=Expense)
async def create_expense(
    expense_data: ExpenseCreate,
    current_user: User = Depends(get_current_user)
):
    """Create a new expense"""
    # Verify trip belongs to user
    trip = await db.trips.find_one({
        "id": expense_data.tripId,
        "userId": current_user.id
    })
    
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")
    
    expense = Expense(**expense_data.dict())
    
    await db.expenses.insert_one(expense.dict())
    
    return expense


@router.get("/expenses", response_model=List[Expense])
async def get_user_expenses(
    trip_id: str = None,
    current_user: User = Depends(get_current_user)
):
    """Get expenses for user, optionally filtered by trip"""
    query = {"userId": current_user.id}
    if trip_id:
        query["tripId"] = trip_id
    
    expenses = await db.expenses.find(query).to_list(length=None)
    
    return [Expense(**expense) for expense in expenses]


@router.get("/expenses/{expense_id}", response_model=Expense)
async def get_expense(
    expense_id: str,
    current_user: User = Depends(get_current_user)
):
    """Get a specific expense"""
    expense = await db.expenses.find_one({
        "id": expense_id,
        "userId": current_user.id
    })
    
    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found")
    
    return Expense(**expense)


@router.put("/expenses/{expense_id}/status")
async def update_expense_status(
    expense_id: str,
    status: str,
    current_user: User = Depends(get_current_user)
):
    """Update expense status (for admin/manager)"""
    if status not in ["pending", "approved", "rejected"]:
        raise HTTPException(status_code=400, detail="Invalid status")
    
    result = await db.expenses.update_one(
        {"id": expense_id},
        {"$set": {"status": status}}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Expense not found")
    
    return {"success": True, "message": f"Expense {status}"}


@router.get("/policy", response_model=TravelPolicy)
async def get_travel_policy(
    current_user: User = Depends(get_current_user)
):
    """Get company travel policy"""
    # For now, return default policy
    # In production, this would be company-specific
    policy = TravelPolicy()
    
    return policy


@router.post("/compliance/check")
async def check_compliance(
    trip_data: dict,
    current_user: User = Depends(get_current_user)
):
    """Check if trip complies with travel policy"""
    policy = TravelPolicy()
    
    violations = []
    warnings = []
    
    # Check flight cost
    if trip_data.get("flightCost", 0) > policy.maxFlightCost:
        violations.append(f"Flight cost ${trip_data['flightCost']} exceeds limit of ${policy.maxFlightCost}")
    
    # Check hotel cost
    if trip_data.get("hotelCostPerNight", 0) > policy.maxHotelCostPerNight:
        violations.append(f"Hotel cost ${trip_data['hotelCostPerNight']}/night exceeds limit of ${policy.maxHotelCostPerNight}")
    
    # Check advance booking
    from datetime import datetime, timedelta
    if trip_data.get("departureDate"):
        departure = datetime.strptime(trip_data["departureDate"], "%Y-%m-%d")
        days_until = (departure - datetime.utcnow()).days
        if days_until < policy.advanceBookingDays:
            warnings.append(f"Trip should be booked at least {policy.advanceBookingDays} days in advance")
    
    compliant = len(violations) == 0
    requires_approval = not compliant or policy.requiresApproval
    
    return {
        "compliant": compliant,
        "requiresApproval": requires_approval,
        "violations": violations,
        "warnings": warnings,
        "policy": policy.dict()
    }
