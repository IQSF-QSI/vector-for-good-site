import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("Supabase credentials not found in environment variables")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Database table names
TABLES = {
    "users": "users",
    "demo_requests": "demo_requests",
    "qsi_metrics": "qsi_metrics",
    "trips": "trips",
    "expenses": "expenses",
    "safety_scores": "safety_scores",
    "kiki_conversations": "kiki_conversations",
    "travel_policies": "travel_policies"
}
