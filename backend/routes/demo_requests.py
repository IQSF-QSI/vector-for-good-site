from fastapi import APIRouter, HTTPException, status
from supabase import Client
from models import DemoRequestCreate, DemoRequest, DemoRequestResponse, ErrorResponse
import logging

logger = logging.getLogger(__name__)

router = APIRouter()

def get_demo_requests_router(supabase: Client):
    @router.post("/", response_model=DemoRequestResponse, status_code=status.HTTP_201_CREATED)
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
            
            # Insert into Supabase
            result = supabase.table('demo_requests').insert({
                'id': demo_request.id,
                'name': demo_request.name,
                'email': demo_request.email,
                'company': demo_request.company,
                'message': demo_request.message,
                'status': demo_request.status,
                'created_at': demo_request.createdAt.isoformat(),
                'updated_at': demo_request.updatedAt.isoformat()
            }).execute()
            
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
    
    @router.get("/", response_model=list)
    async def get_demo_requests(limit: int = 100, skip: int = 0):
        """
        Get all demo requests (for admin use).
        """
        try:
            # Fetch from Supabase with pagination
            response = supabase.table('demo_requests') \
                .select("*") \
                .order('created_at', desc=True) \
                .range(skip, skip + limit - 1) \
                .execute()
            
            return response.data
        except Exception as e:
            logger.error(f"Error fetching demo requests: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to fetch demo requests"
            )
    
    return router
