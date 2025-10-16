# Installation Instructions - Supabase Migration

This document provides step-by-step instructions for setting up the Vector for Good project after migrating from MongoDB to Supabase.

## Prerequisites

- Node.js (v16 or higher)
- Python 3.9+
- A Supabase account (https://supabase.com)
- Git

## Supabase Setup

### 1. Create a Supabase Project

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Click "New Project"
3. Fill in your project details (name, database password, region)
4. Wait for the project to be provisioned

### 2. Create Database Tables

Run the following SQL in your Supabase SQL Editor (found in the Dashboard):

```sql
-- See SUPABASE_MIGRATION.md for the complete SQL schema
-- Copy and paste the CREATE TABLE and RLS policy statements from that file
```

Or use the schema defined in `SUPABASE_MIGRATION.md`.

### 3. Get Your Supabase Credentials

From your Supabase project dashboard:
1. Go to Settings → API
2. Copy your **Project URL** (e.g., https://xxxxxxxxxxxxx.supabase.co)
3. Copy your **anon (public) key**
4. Copy your **service_role (secret) key**

## Backend Setup

### 1. Navigate to Backend Directory

```bash
cd backend
```

### 2. Install Python Dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure Environment Variables

Create a `.env` file in the `backend` directory:

```bash
cp .env.example .env
```

Update the `.env` file with your Supabase credentials:

```bash
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_KEY=your_supabase_service_role_key
SUPABASE_ANON_KEY=your_supabase_anon_key
CORS_ORIGINS=http://localhost:3000
PORT=5000
```

### 4. Run the Backend Server

```bash
python server.py
```

Or with uvicorn:

```bash
uvicorn server:app --reload --port 5000
```

The backend API will be available at `http://localhost:5000`

## Frontend Setup

### 1. Navigate to Frontend Directory

```bash
cd frontend
```

### 2. Install Supabase JavaScript Client

```bash
npm install @supabase/supabase-js
# or
yarn add @supabase/supabase-js
```

### 3. Install Other Dependencies

```bash
npm install
# or
yarn install
```

### 4. Configure Environment Variables

Create a `.env` file in the `frontend` directory:

```bash
cp .env.example .env
```

Update the `.env` file:

```bash
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
REACT_APP_API_URL=http://localhost:5000
```

### 5. Run the Frontend Development Server

```bash
npm start
# or
yarn start
```

The frontend will be available at `http://localhost:3000`

## Verification

### Test Backend Endpoints

1. Check health: `curl http://localhost:5000/api/`
2. Test demo request creation:
```bash
curl -X POST http://localhost:5000/api/demo-requests/ \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","company":"Test Co","message":"Test message"}'
```

### Test Frontend

1. Open `http://localhost:3000` in your browser
2. Fill out the demo request form
3. Submit and verify the request appears in Supabase dashboard

## Deployment

### Vercel Deployment

The project is configured for Vercel deployment. Make sure to:

1. Add environment variables in Vercel dashboard:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_KEY`
   - `SUPABASE_ANON_KEY`
   - `REACT_APP_SUPABASE_URL`
   - `REACT_APP_SUPABASE_ANON_KEY`

2. Deploy:
```bash
git push origin migrate-to-supabase
```

3. Vercel will automatically build and deploy

## Troubleshooting

### Backend Issues

- **Module not found errors**: Make sure you've installed all requirements with `pip install -r requirements.txt`
- **Supabase connection errors**: Verify your `.env` file has correct credentials
- **CORS errors**: Check that `CORS_ORIGINS` in backend `.env` matches your frontend URL

### Frontend Issues

- **Supabase client errors**: Ensure `@supabase/supabase-js` is installed
- **API connection errors**: Verify `REACT_APP_API_URL` points to running backend
- **Build errors**: Try deleting `node_modules` and running `npm install` again

## Migration from MongoDB

If you have existing data in MongoDB, you'll need to:

1. Export data from MongoDB
2. Transform the data structure (ObjectId → UUID, field names to snake_case)
3. Import into Supabase tables

Refer to `SUPABASE_MIGRATION.md` for details on schema changes.

## Support

For issues or questions:
- Check `SUPABASE_MIGRATION.md` for schema and migration details
- Review Supabase documentation: https://supabase.com/docs
- Check backend logs for API errors
- Use browser DevTools to debug frontend issues
