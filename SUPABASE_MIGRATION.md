# Supabase Migration Plan

## Overview
This document outlines the complete migration from MongoDB to Supabase for the Vector for Good site.

## Database Schema

### 1. demo_requests table
```sql
CREATE TABLE demo_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  use_case TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE demo_requests ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous inserts (for form submissions)
CREATE POLICY "Allow anonymous demo request submissions"
  ON demo_requests FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Allow authenticated users to view all demo requests
CREATE POLICY "Allow authenticated users to view demo requests"
  ON demo_requests FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Allow authenticated users to update demo requests
CREATE POLICY "Allow authenticated users to update demo requests"
  ON demo_requests FOR UPDATE
  TO authenticated
  USING (true);

-- Create index for faster queries
CREATE INDEX idx_demo_requests_created_at ON demo_requests(created_at DESC);
CREATE INDEX idx_demo_requests_status ON demo_requests(status);
```

### 2. qsi_metrics table
```sql
CREATE TABLE qsi_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_name TEXT NOT NULL,
  metric_value NUMERIC NOT NULL,
  category TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE qsi_metrics ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access for metrics
CREATE POLICY "Allow public read access to metrics"
  ON qsi_metrics FOR SELECT
  TO anon, authenticated
  USING (true);

-- Policy: Allow authenticated users to insert metrics
CREATE POLICY "Allow authenticated users to insert metrics"
  ON qsi_metrics FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Allow authenticated users to update metrics
CREATE POLICY "Allow authenticated users to update metrics"
  ON qsi_metrics FOR UPDATE
  TO authenticated
  USING (true);

-- Create indexes
CREATE INDEX idx_qsi_metrics_category ON qsi_metrics(category);
CREATE INDEX idx_qsi_metrics_created_at ON qsi_metrics(created_at DESC);
```

### 3. analytics_events table
```sql
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  event_data JSONB,
  user_id TEXT,
  session_id TEXT,
  page_url TEXT,
  user_agent TEXT,
  ip_address INET,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous inserts for tracking
CREATE POLICY "Allow anonymous analytics event tracking"
  ON analytics_events FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Allow authenticated users to view analytics
CREATE POLICY "Allow authenticated users to view analytics"
  ON analytics_events FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes for analytics queries
CREATE INDEX idx_analytics_events_type ON analytics_events(event_type);
CREATE INDEX idx_analytics_events_created_at ON analytics_events(created_at DESC);
CREATE INDEX idx_analytics_events_session_id ON analytics_events(session_id);
CREATE INDEX idx_analytics_events_event_data ON analytics_events USING GIN (event_data);
```

## Environment Variables

### Backend (.env)
```bash
# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_KEY=your_supabase_service_role_key
SUPABASE_ANON_KEY=your_supabase_anon_key

# Remove MongoDB variables
# MONGODB_URI=... (no longer needed)
```

### Frontend (.env)
```bash
# Supabase Configuration
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key

# Backend API (optional, if still using backend endpoints)
REACT_APP_API_URL=http://localhost:5000
```

## Implementation Steps

1. ✅ Create database schema in Supabase dashboard
2. ✅ Update backend code to use Supabase client
3. ✅ Update frontend to use Supabase client (direct or via backend)
4. ✅ Update environment variable examples
5. ✅ Test all endpoints and forms
6. ✅ Document migration process
7. ✅ Commit and push to migrate-to-supabase branch

## Migration Notes

### Benefits of Supabase
- Built-in authentication and authorization
- Real-time subscriptions out of the box
- Automatic REST API generation
- Row Level Security for fine-grained access control
- Better scalability and performance
- PostgreSQL features (JSONB, full-text search, etc.)

### Breaking Changes
- MongoDB ObjectId replaced with UUID
- All timestamps now use PostgreSQL TIMESTAMP WITH TIME ZONE
- Field names follow PostgreSQL snake_case convention
- MongoDB $oid references need to be converted to UUIDs

## Testing Checklist

- [ ] Demo request form submission works
- [ ] QSI metrics display correctly
- [ ] Analytics tracking functions properly
- [ ] All API endpoints return expected data
- [ ] RLS policies enforce proper access control
- [ ] Frontend forms validate and submit correctly
- [ ] Error handling works as expected
