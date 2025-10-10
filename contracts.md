# API Contracts & Backend Integration Plan

## Overview
Vector for Good Landing Page - Backend implementation for demo request management and analytics tracking.

## Current Mock Data (in /app/frontend/src/mock.js)
- Hero stats (static display data)
- QI advantages (static content)
- QI process steps (static content)
- Fortune 50 solutions (static content)
- QSI city metrics (will become real-time data from backend)
- Business impact stats (static display)
- Case studies (static content)

## Backend Implementation Strategy

### Phase 1: Demo Request Management
**Endpoint**: `POST /api/demo-requests`
- Capture demo request form submissions
- Store in MongoDB with timestamp
- Send confirmation response

**Endpoint**: `GET /api/demo-requests` (Admin only - future)
- Retrieve all demo requests
- Filter and pagination support

### Phase 2: QSI Metrics (Live Data)
**Endpoint**: `GET /api/qsi-metrics`
- Return current QSI scores for all tracked cities
- Real-time data instead of mock

**Endpoint**: `GET /api/qsi-metrics/:city`
- Get detailed metrics for specific city

### Phase 3: Analytics Tracking
**Endpoint**: `POST /api/analytics/page-view`
- Track landing page visits
- Section engagement tracking

## MongoDB Collections

### 1. demo_requests
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, validated),
  company: String (required),
  message: String (optional),
  createdAt: Date (auto),
  status: String (default: "pending"), // pending, contacted, scheduled, completed
  source: String (default: "landing_page")
}
```

### 2. qsi_metrics
```javascript
{
  _id: ObjectId,
  cityName: String (required, unique),
  country: String,
  score: Number (0-100),
  rating: String, // excellent, good, moderate, caution
  legalProtection: Number (0-100),
  socialAcceptance: Number (0-100),
  safetyIndex: Number (0-100),
  trend: String, // improving, stable, declining
  lastUpdated: Date,
  dataSource: String
}
```

### 3. analytics_events (Optional - for future)
```javascript
{
  _id: ObjectId,
  eventType: String, // page_view, form_submit, cta_click
  section: String,
  timestamp: Date,
  sessionId: String,
  metadata: Object
}
```

## API Endpoints Detail

### POST /api/demo-requests
**Request Body**:
```json
{
  "name": "John Smith",
  "email": "john.smith@company.com",
  "company": "Fortune 500 Company",
  "message": "Interested in ESG reporting solutions"
}
```

**Response (Success - 201)**:
```json
{
  "success": true,
  "message": "Demo request submitted successfully",
  "requestId": "507f1f77bcf86cd799439011"
}
```

**Response (Error - 400)**:
```json
{
  "success": false,
  "error": "Invalid email format"
}
```

### GET /api/qsi-metrics
**Response (Success - 200)**:
```json
{
  "success": true,
  "data": [
    {
      "cityName": "San Francisco, USA",
      "score": 94,
      "rating": "excellent",
      "legalProtection": 98,
      "socialAcceptance": 95,
      "safetyIndex": 89,
      "trend": "improving",
      "lastUpdated": "2025-01-10T10:00:00Z"
    },
    ...
  ]
}
```

## Frontend Integration Changes

### Files to Modify:
1. `/app/frontend/src/components/LandingPage.jsx`
   - Replace demo form submission with API call
   - Fetch QSI metrics from backend on component mount
   - Add loading states and error handling

### Changes Summary:
- **Demo Form**: Replace `console.log` with `axios.post` to `/api/demo-requests`
- **QSI Metrics**: Replace mock data with `axios.get` from `/api/qsi-metrics`
- **Loading States**: Add skeleton loaders for QSI metrics section
- **Error Handling**: Toast notifications for API errors using sonner

## Implementation Order
1. ✅ Create MongoDB models for demo_requests and qsi_metrics
2. ✅ Implement POST /api/demo-requests endpoint with validation
3. ✅ Implement GET /api/qsi-metrics endpoint
4. ✅ Seed initial QSI data to database
5. ✅ Update frontend to use real API calls
6. ✅ Remove mock data dependencies from frontend
7. ✅ Add error handling and loading states
8. ✅ Test complete flow

## Validation Rules
- **Email**: Valid email format, max 255 chars
- **Name**: Min 2 chars, max 100 chars, required
- **Company**: Min 2 chars, max 200 chars, required
- **Message**: Optional, max 1000 chars

## Error Handling
- Network errors: Show user-friendly toast message
- Validation errors: Display inline form errors
- Server errors: Generic error message with retry option
- Success: Confirmation message + form reset
