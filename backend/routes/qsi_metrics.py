from fastapi import APIRouter, HTTPException, status
from motor.motor_asyncio import AsyncIOMotorDatabase
from models import QSIMetricsResponse, ErrorResponse
import logging

logger = logging.getLogger(__name__)
router = APIRouter()


def get_qsi_metrics_router(db: AsyncIOMotorDatabase):
    @router.get("/qsi-metrics", response_model=QSIMetricsResponse)
    async def get_qsi_metrics():
        """
        Get current QSI metrics for all tracked cities.
        """
        try:
            metrics = await db.qsi_metrics.find().sort("score", -1).to_list(100)
            
            # Remove MongoDB _id field
            for metric in metrics:
                if '_id' in metric:
                    del metric['_id']
            
            return QSIMetricsResponse(
                success=True,
                data=metrics
            )
            
        except Exception as e:
            logger.error(f"Error fetching QSI metrics: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to fetch QSI metrics"
            )

    @router.get("/qsi-metrics/{city_name}")
    async def get_qsi_metric_by_city(city_name: str):
        """
        Get QSI metrics for a specific city.
        """
        try:
            metric = await db.qsi_metrics.find_one({"cityName": city_name})
            
            if not metric:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"QSI metrics not found for {city_name}"
                )
            
            # Remove MongoDB _id field
            if '_id' in metric:
                del metric['_id']
            
            return {"success": True, "data": metric}
            
        except HTTPException:
            raise
        except Exception as e:
            logger.error(f"Error fetching QSI metric for {city_name}: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to fetch QSI metric"
            )

    return router
