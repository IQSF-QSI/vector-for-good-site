"""
Supabase Database Schema Setup

Run this SQL in your Supabase SQL Editor to create all required tables:
https://glgcnymigakooloqmbtk.supabase.co
"""

SQL_SCHEMA = """
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase Auth)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    company TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Demo Requests
CREATE TABLE IF NOT EXISTS demo_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT NOT NULL,
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- QSI Metrics
CREATE TABLE IF NOT EXISTS qsi_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    country TEXT NOT NULL,
    region TEXT,
    qsi_score INTEGER NOT NULL CHECK (qsi_score >= 0 AND qsi_score <= 100),
    legal_protections INTEGER CHECK (legal_protections >= 0 AND legal_protections <= 100),
    social_acceptance INTEGER CHECK (social_acceptance >= 0 AND social_acceptance <= 100),
    safety_index INTEGER CHECK (safety_index >= 0 AND safety_index <= 100),
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    data_sources TEXT[]
);

-- Trips
CREATE TABLE IF NOT EXISTS trips (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    destination TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    flight_id TEXT,
    hotel_id TEXT,
    car_rental_id TEXT,
    purpose TEXT,
    status TEXT DEFAULT 'planned' CHECK (status IN ('planned', 'in_progress', 'completed')),
    safety_score_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Expenses
CREATE TABLE IF NOT EXISTS expenses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trip_id UUID REFERENCES trips(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    category TEXT NOT NULL CHECK (category IN ('flight', 'hotel', 'meals', 'transportation', 'other')),
    amount DECIMAL(10, 2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    description TEXT NOT NULL,
    date DATE NOT NULL,
    receipt TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Safety Scores
CREATE TABLE IF NOT EXISTS safety_scores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    destination TEXT NOT NULL,
    country TEXT NOT NULL,
    overall_score INTEGER CHECK (overall_score >= 0 AND overall_score <= 100),
    lgbtq_safety INTEGER CHECK (lgbtq_safety >= 0 AND lgbtq_safety <= 100),
    political_stability INTEGER CHECK (political_stability >= 0 AND political_stability <= 100),
    health_advisory INTEGER CHECK (health_advisory >= 0 AND health_advisory <= 100),
    crime_rate INTEGER CHECK (crime_rate >= 0 AND crime_rate <= 100),
    mitigation_strategies TEXT[],
    real_time_alerts TEXT[],
    ai_analysis TEXT,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(destination, country)
);

-- KIKI Conversations
CREATE TABLE IF NOT EXISTS kiki_conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id TEXT NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    user_message TEXT NOT NULL,
    kiki_response TEXT NOT NULL,
    intent TEXT,
    resolved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Travel Policies
CREATE TABLE IF NOT EXISTS travel_policies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company TEXT,
    max_flight_cost DECIMAL(10, 2) DEFAULT 1500.00,
    max_hotel_cost_per_night DECIMAL(10, 2) DEFAULT 300.00,
    max_car_rental_per_day DECIMAL(10, 2) DEFAULT 100.00,
    max_daily_meals DECIMAL(10, 2) DEFAULT 75.00,
    requires_approval BOOLEAN DEFAULT TRUE,
    advance_booking_days INTEGER DEFAULT 14,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_trips_user_id ON trips(user_id);
CREATE INDEX IF NOT EXISTS idx_expenses_trip_id ON expenses(trip_id);
CREATE INDEX IF NOT EXISTS idx_expenses_user_id ON expenses(user_id);
CREATE INDEX IF NOT EXISTS idx_kiki_conversations_session_id ON kiki_conversations(session_id);
CREATE INDEX IF NOT EXISTS idx_kiki_conversations_created_at ON kiki_conversations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_safety_scores_destination ON safety_scores(destination, country);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE kiki_conversations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid() = auth_user_id);

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = auth_user_id);

-- RLS Policies for trips
CREATE POLICY "Users can view own trips" ON trips
    FOR SELECT USING (auth.uid() IN (SELECT auth_user_id FROM users WHERE id = trips.user_id));

CREATE POLICY "Users can create own trips" ON trips
    FOR INSERT WITH CHECK (auth.uid() IN (SELECT auth_user_id FROM users WHERE id = trips.user_id));

CREATE POLICY "Users can update own trips" ON trips
    FOR UPDATE USING (auth.uid() IN (SELECT auth_user_id FROM users WHERE id = trips.user_id));

-- RLS Policies for expenses
CREATE POLICY "Users can view own expenses" ON expenses
    FOR SELECT USING (auth.uid() IN (SELECT auth_user_id FROM users WHERE id = expenses.user_id));

CREATE POLICY "Users can create own expenses" ON expenses
    FOR INSERT WITH CHECK (auth.uid() IN (SELECT auth_user_id FROM users WHERE id = expenses.user_id));

-- Public access for demo requests (no auth required)
ALTER TABLE demo_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit demo requests" ON demo_requests
    FOR INSERT WITH CHECK (true);

-- Public read access for QSI metrics and safety scores
ALTER TABLE qsi_metrics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view QSI metrics" ON qsi_metrics
    FOR SELECT USING (true);

ALTER TABLE safety_scores ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view safety scores" ON safety_scores
    FOR SELECT USING (true);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
"""

if __name__ == "__main__":
    print("=" * 80)
    print("SUPABASE DATABASE SCHEMA")
    print("=" * 80)
    print("\nCopy and paste this SQL into your Supabase SQL Editor:")
    print(f"Dashboard: https://glgcnymigakooloqmbtk.supabase.co")
    print("\nGo to: SQL Editor > New Query > Paste the schema below")
    print("=" * 80)
    print(SQL_SCHEMA)
    print("=" * 80)
    print("\n✅ After running this SQL, all tables will be created with proper RLS policies!")
