from fastapi import APIRouter, Depends, HTTPException
from typing import List
import os
import asyncio
from dotenv import load_dotenv
from models import SafetyScore, User
from routes.auth import get_current_user
from motor.motor_asyncio import AsyncIOMotorClient
from emergentintegrations.llm.chat import LlmChat, UserMessage

load_dotenv()

router = APIRouter()

# MongoDB connection
MONGO_URL = os.getenv("MONGO_URL")
DB_NAME = os.getenv("DB_NAME")
if not DB_NAME:
    raise ValueError("DB_NAME environment variable must be set")
EMERGENT_LLM_KEY = os.getenv("EMERGENT_LLM_KEY")

client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]


async def analyze_with_gpt5(destination: str, country: str) -> dict:
    """Analyze safety with GPT-5"""
    chat = LlmChat(
        api_key=EMERGENT_LLM_KEY,
        session_id=f"gpt5-safety-{destination}",
        system_message="You are a travel safety expert specializing in LGBTQ+ safety, political stability, and risk assessment."
    ).with_model("openai", "gpt-5")
    
    prompt = f"""Analyze the safety profile for {destination}, {country} for corporate travelers.
    
Provide scores (0-100) for:
1. LGBTQ+ Safety
2. Political Stability
3. Health Advisory
4. Crime Rate

Also provide 3-5 specific mitigation strategies and any real-time alerts.
Format as JSON with keys: lgbtqSafety, politicalStability, healthAdvisory, crimeRate, mitigationStrategies (array), realTimeAlerts (array), analysis (brief text)"""
    
    message = UserMessage(text=prompt)
    response = await chat.send_message(message)
    
    return {"source": "GPT-5", "analysis": response}


async def analyze_with_claude(destination: str, country: str) -> dict:
    """Analyze safety with Claude Sonnet 4"""
    chat = LlmChat(
        api_key=EMERGENT_LLM_KEY,
        session_id=f"claude-safety-{destination}",
        system_message="You are a comprehensive risk analyst with expertise in international travel safety."
    ).with_model("anthropic", "claude-4-sonnet-20250514")
    
    prompt = f"""Provide a detailed safety assessment for corporate travelers visiting {destination}, {country}.
    
Focus on:
- LGBTQ+ safety and legal protections
- Political climate and stability
- Health risks and medical infrastructure
- Crime statistics and safe areas

Provide actionable mitigation strategies and current advisories.
Format as JSON with: lgbtqSafety, politicalStability, healthAdvisory, crimeRate, mitigationStrategies, realTimeAlerts, analysis"""
    
    message = UserMessage(text=prompt)
    response = await chat.send_message(message)
    
    return {"source": "Claude-4", "analysis": response}


async def analyze_with_gemini(destination: str, country: str) -> dict:
    """Analyze safety with Gemini 2.5 Pro"""
    chat = LlmChat(
        api_key=EMERGENT_LLM_KEY,
        session_id=f"gemini-safety-{destination}",
        system_message="You are a global safety intelligence analyst specializing in destination risk assessment."
    ).with_model("gemini", "gemini-2.5-pro")
    
    prompt = f"""Assess safety conditions in {destination}, {country} for business travelers.
    
Evaluate:
1. LGBTQ+ rights and safety (0-100 score)
2. Political stability index (0-100 score)
3. Health and medical risks (0-100 score)
4. Crime and security (0-100 score)

Provide practical mitigation strategies and current alerts.
Return JSON: lgbtqSafety, politicalStability, healthAdvisory, crimeRate, mitigationStrategies, realTimeAlerts, analysis"""
    
    message = UserMessage(text=prompt)
    response = await chat.send_message(message)
    
    return {"source": "Gemini-2.5", "analysis": response}


def parse_ai_response(text: str) -> dict:
    """Parse AI response - handles both JSON and text formats"""
    import json
    import re
    
    try:
        # Try to extract JSON from the response
        json_match = re.search(r'\{.*\}', text, re.DOTALL)
        if json_match:
            data = json.loads(json_match.group())
            return data
    except:
        pass
    
    # Fallback: Extract scores and data from text
    lgbtq = 75
    political = 80
    health = 85
    crime = 70
    
    # Try to extract numeric scores
    lgbtq_match = re.search(r'lgbtq.*?(\d+)', text, re.IGNORECASE)
    if lgbtq_match:
        lgbtq = int(lgbtq_match.group(1))
    
    political_match = re.search(r'political.*?(\d+)', text, re.IGNORECASE)
    if political_match:
        political = int(political_match.group(1))
    
    health_match = re.search(r'health.*?(\d+)', text, re.IGNORECASE)
    if health_match:
        health = int(health_match.group(1))
    
    crime_match = re.search(r'crime.*?(\d+)', text, re.IGNORECASE)
    if crime_match:
        crime = int(crime_match.group(1))
    
    return {
        "lgbtqSafety": lgbtq,
        "politicalStability": political,
        "healthAdvisory": health,
        "crimeRate": crime,
        "mitigationStrategies": [
            "Research local LGBTQ+ laws and customs",
            "Register with embassy upon arrival",
            "Keep emergency contacts accessible",
            "Use trusted transportation services"
        ],
        "realTimeAlerts": [],
        "analysis": text[:200]
    }


async def get_multi_ai_safety_analysis(destination: str, country: str) -> SafetyScore:
    """Get safety analysis from multiple AI models and aggregate results"""
    
    # Run all three AI analyses in parallel
    results = await asyncio.gather(
        analyze_with_gpt5(destination, country),
        analyze_with_claude(destination, country),
        analyze_with_gemini(destination, country),
        return_exceptions=True
    )
    
    # Parse responses
    parsed_results = []
    for result in results:
        if isinstance(result, Exception):
            continue
        try:
            parsed = parse_ai_response(result["analysis"])
            parsed_results.append(parsed)
        except:
            continue
    
    # Aggregate scores (average from all models)
    if not parsed_results:
        # Fallback if all AI calls fail
        parsed_results = [{
            "lgbtqSafety": 75,
            "politicalStability": 80,
            "healthAdvisory": 85,
            "crimeRate": 70,
            "mitigationStrategies": [
                "Research local laws and customs",
                "Register with embassy",
                "Keep emergency contacts",
                "Use official transportation"
            ],
            "realTimeAlerts": [],
            "analysis": "Safety analysis based on general guidelines."
        }]
    
    # Safely extract numeric values
    def safe_get_score(result, key, default):
        value = result.get(key, default)
        if isinstance(value, (int, float)):
            return int(value)
        elif isinstance(value, dict):
            return default
        else:
            try:
                return int(value)
            except (ValueError, TypeError):
                return default
    
    avg_lgbtq = sum(safe_get_score(r, "lgbtqSafety", 75) for r in parsed_results) // len(parsed_results)
    avg_political = sum(safe_get_score(r, "politicalStability", 80) for r in parsed_results) // len(parsed_results)
    avg_health = sum(safe_get_score(r, "healthAdvisory", 85) for r in parsed_results) // len(parsed_results)
    avg_crime = sum(safe_get_score(r, "crimeRate", 70) for r in parsed_results) // len(parsed_results)
    
    # Overall score (average of all metrics)
    overall_score = (avg_lgbtq + avg_political + avg_health + avg_crime) // 4
    
    # Combine mitigation strategies from all models
    all_strategies = []
    all_alerts = []
    all_analyses = []
    
    for r in parsed_results:
        strategies = r.get("mitigationStrategies", [])
        alerts = r.get("realTimeAlerts", [])
        
        # Ensure strategies are strings
        if isinstance(strategies, list):
            all_strategies.extend([str(s) for s in strategies if isinstance(s, (str, int, float))])
        
        # Ensure alerts are strings
        if isinstance(alerts, list):
            all_alerts.extend([str(a) for a in alerts if isinstance(a, (str, int, float))])
            
        all_analyses.append(str(r.get("analysis", "")))
    
    # Remove duplicates safely
    try:
        unique_strategies = list(set(all_strategies))[:6]
    except TypeError:
        unique_strategies = all_strategies[:6]
    
    try:
        unique_alerts = list(set(all_alerts))[:3]
    except TypeError:
        unique_alerts = all_alerts[:3]
    combined_analysis = " | ".join([a[:100] for a in all_analyses if a])
    
    safety_score = SafetyScore(
        destination=destination,
        country=country,
        overallScore=overall_score,
        lgbtqSafety=avg_lgbtq,
        politicalStability=avg_political,
        healthAdvisory=avg_health,
        crimeRate=avg_crime,
        mitigationStrategies=unique_strategies if unique_strategies else ["Stay informed of local conditions"],
        realTimeAlerts=unique_alerts if unique_alerts else [],
        aiAnalysis=f"Multi-AI Analysis: {combined_analysis[:300]}"
    )
    
    return safety_score


@router.get("/safety/{destination}", response_model=SafetyScore)
async def get_safety_score(
    destination: str,
    country: str,
    current_user: User = Depends(get_current_user)
):
    """Get AI-powered safety score for a destination"""
    
    # Check if we have a recent cached score
    cached_score = await db.safety_scores.find_one({
        "destination": destination,
        "country": country
    })
    
    if cached_score:
        # If cached score is less than 24 hours old, return it
        from datetime import datetime, timedelta
        
        last_updated = cached_score["lastUpdated"]
        if isinstance(last_updated, str):
            last_updated = datetime.fromisoformat(last_updated)
        elif not isinstance(last_updated, datetime):
            # If it's not a datetime or string, skip cache
            pass
        else:
            if datetime.utcnow() - last_updated < timedelta(hours=24):
                return SafetyScore(**cached_score)
    
    # Generate new safety analysis using multi-AI
    safety_score = await get_multi_ai_safety_analysis(destination, country)
    
    # Save to database
    await db.safety_scores.update_one(
        {"destination": destination, "country": country},
        {"$set": safety_score.dict()},
        upsert=True
    )
    
    return safety_score
