from fastapi import APIRouter, HTTPException, status
from supabase import Client
from models import QSIMetricsResponse, ErrorResponse
import logging

logger = logging.getLogger(__name__)

router = APIRouter()

def get_qsi_metrics_router(supabase: Client):
    @router.get("/", response_model=QSIMetricsResponse)
    async def get_qsi_metrics():
        """
        Get current QSI metrics for all tracked cities.
        """
        try:
            # Fetch from Supabase
            response = supabase.table('qsi_metrics') \
                .select("*") \
                .order('metric_value', desc=True) \
                .limit(100) \
                .execute()
            
            return QSIMetricsResponse(
                success=True,
                data=response.data
            )
            
        except Exception as e:
            logger.error(f"Error fetching QSI metrics: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to fetch QSI metrics"
            )
    
    @router.get("/{city_name}")
    async def get_qsi_metric_by_city(city_name: str):
        """
        Get QSI metrics for a specific city.
        """
        try:
            # Fetch from Supabase
            response = supabase.table('qsi_metrics') \
                .select("*") \
                .eq('city_name', city_name) \
                .single() \
                .execute()
            
            if not response.data:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"QSI metrics not found for {city_name}"
                )
            
            return {"success": True, "data": response.data}
            
        except HTTPException:
            raise
        except Exception as e:
            logger.error(f"Error fetching QSI metric for {city_name}: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to fetch QSI metric"
            )
    
    return router
