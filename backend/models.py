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
