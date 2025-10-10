import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pathlib import Path
from datetime import datetime

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Initial QSI data to seed
QSI_SEED_DATA = [
    {
        "id": "qsi-sf",
        "cityName": "San Francisco, USA",
        "country": "United States",
        "score": 94,
        "rating": "excellent",
        "legalProtection": 98,
        "socialAcceptance": 95,
        "safetyIndex": 89,
        "trend": "improving",
        "lastUpdated": datetime.utcnow(),
        "dataSource": "QI Platform"
    },
    {
        "id": "qsi-ams",
        "cityName": "Amsterdam, Netherlands",
        "country": "Netherlands",
        "score": 92,
        "rating": "excellent",
        "legalProtection": 96,
        "socialAcceptance": 93,
        "safetyIndex": 87,
        "trend": "stable",
        "lastUpdated": datetime.utcnow(),
        "dataSource": "QI Platform"
    },
    {
        "id": "qsi-berlin",
        "cityName": "Berlin, Germany",
        "country": "Germany",
        "score": 88,
        "rating": "good",
        "legalProtection": 92,
        "socialAcceptance": 87,
        "safetyIndex": 85,
        "trend": "improving",
        "lastUpdated": datetime.utcnow(),
        "dataSource": "QI Platform"
    },
    {
        "id": "qsi-singapore",
        "cityName": "Singapore",
        "country": "Singapore",
        "score": 62,
        "rating": "moderate",
        "legalProtection": 45,
        "socialAcceptance": 68,
        "safetyIndex": 73,
        "trend": "improving",
        "lastUpdated": datetime.utcnow(),
        "dataSource": "QI Platform"
    },
    {
        "id": "qsi-dubai",
        "cityName": "Dubai, UAE",
        "country": "United Arab Emirates",
        "score": 34,
        "rating": "caution",
        "legalProtection": 18,
        "socialAcceptance": 28,
        "safetyIndex": 56,
        "trend": "declining",
        "lastUpdated": datetime.utcnow(),
        "dataSource": "QI Platform"
    },
    {
        "id": "qsi-tokyo",
        "cityName": "Tokyo, Japan",
        "country": "Japan",
        "score": 71,
        "rating": "moderate",
        "legalProtection": 68,
        "socialAcceptance": 74,
        "safetyIndex": 71,
        "trend": "improving",
        "lastUpdated": datetime.utcnow(),
        "dataSource": "QI Platform"
    },
    {
        "id": "qsi-london",
        "cityName": "London, UK",
        "country": "United Kingdom",
        "score": 89,
        "rating": "good",
        "legalProtection": 94,
        "socialAcceptance": 88,
        "safetyIndex": 85,
        "trend": "stable",
        "lastUpdated": datetime.utcnow(),
        "dataSource": "QI Platform"
    },
    {
        "id": "qsi-toronto",
        "cityName": "Toronto, Canada",
        "country": "Canada",
        "score": 91,
        "rating": "excellent",
        "legalProtection": 95,
        "socialAcceptance": 92,
        "safetyIndex": 86,
        "trend": "improving",
        "lastUpdated": datetime.utcnow(),
        "dataSource": "QI Platform"
    },
    {
        "id": "qsi-sydney",
        "cityName": "Sydney, Australia",
        "country": "Australia",
        "score": 87,
        "rating": "good",
        "legalProtection": 91,
        "socialAcceptance": 86,
        "safetyIndex": 84,
        "trend": "stable",
        "lastUpdated": datetime.utcnow(),
        "dataSource": "QI Platform"
    }
]


async def seed_qsi_data():
    """Seed QSI metrics data into MongoDB."""
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]
    
    try:
        # Clear existing data
        await db.qsi_metrics.delete_many({})
        print("Cleared existing QSI metrics")
        
        # Insert seed data
        result = await db.qsi_metrics.insert_many(QSI_SEED_DATA)
        print(f"Seeded {len(result.inserted_ids)} QSI metrics successfully")
        
        # Create index on cityName for faster queries
        await db.qsi_metrics.create_index("cityName", unique=True)
        print("Created index on cityName")
        
    except Exception as e:
        print(f"Error seeding data: {str(e)}")
    finally:
        client.close()


if __name__ == "__main__":
    print("Starting QSI data seeding...")
    asyncio.run(seed_qsi_data())
    print("Seeding complete!")
