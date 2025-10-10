from fastapi import APIRouter, HTTPException, status
from motor.motor_asyncio import AsyncIOMotorDatabase
from models import DemoRequestCreate, DemoRequest, DemoRequestResponse, ErrorResponse
import logging

logger = logging.getLogger(__name__)
router = APIRouter()


def get_demo_requests_router(db: AsyncIOMotorDatabase):
    @router.post("/demo-requests", response_model=DemoRequestResponse, status_code=status.HTTP_201_CREATED)
    async def create_demo_request(request_data: DemoRequestCreate):
        """
        Create a new demo request from the landing page form.
        """
        try:
            # Create demo request object
            demo_request = DemoRequest(
                name=request_data.name,
                email=request_data.email,
                company=request_data.company,
                message=request_data.message
            )
            
            # Insert into database
            result = await db.demo_requests.insert_one(demo_request.dict())
            
            logger.info(f"Demo request created: {demo_request.id} for {demo_request.email}")
            
            return DemoRequestResponse(
                success=True,
                message="Demo request submitted successfully. We'll contact you within 24 hours.",
                requestId=demo_request.id
            )
            
        except Exception as e:
            logger.error(f"Error creating demo request: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to submit demo request. Please try again."
            )

    @router.get("/demo-requests", response_model=list)
    async def get_demo_requests(limit: int = 100, skip: int = 0):
        """
        Get all demo requests (for admin use).
        """
        try:
            requests = await db.demo_requests.find().sort("createdAt", -1).skip(skip).limit(limit).to_list(limit)
            return requests
        except Exception as e:
            logger.error(f"Error fetching demo requests: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to fetch demo requests"
            )

    return router
