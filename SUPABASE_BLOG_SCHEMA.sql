# Supabase Blog Posts Table Schema

## SQL to run in Supabase SQL Editor

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create blog_posts table
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  author TEXT DEFAULT 'KIKI QI',
  tags TEXT[] DEFAULT '{}',
  category TEXT NOT NULL,
  citations TEXT[] DEFAULT '{}',
  featured_image TEXT,
  published BOOLEAN DEFAULT true,
  publish_date TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  views INTEGER DEFAULT 0,
  sass_level INTEGER DEFAULT 10 CHECK (sass_level >= 1 AND sass_level <= 10)
);

-- Create index on slug for fast lookups
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);

-- Create index on category for filtering
CREATE INDEX idx_blog_posts_category ON blog_posts(category);

-- Create index on published for filtering
CREATE INDEX idx_blog_posts_published ON blog_posts(published);

-- Create index on publish_date for sorting
CREATE INDEX idx_blog_posts_publish_date ON blog_posts(publish_date DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access to published posts
CREATE POLICY "Public can read published posts"
  ON blog_posts
  FOR SELECT
  USING (published = true);

-- Policy: Allow authenticated users to read all posts (for admin)
CREATE POLICY "Authenticated users can read all posts"
  ON blog_posts
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Policy: Allow authenticated users to insert posts
CREATE POLICY "Authenticated users can insert posts"
  ON blog_posts
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Policy: Allow authenticated users to update posts
CREATE POLICY "Authenticated users can update posts"
  ON blog_posts
  FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Policy: Allow authenticated users to delete posts
CREATE POLICY "Authenticated users can delete posts"
  ON blog_posts
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to call the function
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample blog posts (the 3 seed posts)
INSERT INTO blog_posts (title, slug, content, excerpt, category, tags, sass_level) VALUES
(
  'Category Is: Safe Space Realness - Creating LGBTQ+ Inclusive Workplaces',
  'category-is-safe-space-realness-creating-lgbtq-inclusive-workplaces',
  'Honey, let''s talk about creating safe spaces at work. Rainbow flags aren''t enough - we need real policies.

## The Tea on True Inclusion

Creating LGBTQ+ inclusive workplaces means queer employees can show up authentically without fear.

### What Actually Works

**1. Pronouns Are Non-Negotiable** - Use them in emails, Zoom names, directories.

**2. Benefits That Serve** - Healthcare must cover gender-affirming care and diverse families.

**3. Zero Tolerance** - Believe reports, investigate immediately, trauma-informed processes.

**4. Leadership Representation** - LGBTQ+ people in C-suite positions.

## The Business Case

McKinsey: 21% higher retention, 15% more innovation. BCG: 2.3x higher cash flow per employee.

Category is: Authentic Inclusion Eleganza 💅',
  'Creating safe spaces at work requires real policies, not just rainbow flags. Here''s what actually works.',
  'LGBTQ+ Workplace',
  ARRAY['workplace', 'lgbtq+', 'inclusion', 'safety'],
  10
),
(
  'The Tea on ESG: Why Fortune 500 Cannot Ignore LGBTQ+ Metrics',
  'the-tea-on-esg-why-fortune-500-cannot-ignore-lgbtq-metrics',
  '$35 trillion in assets are managed under ESG principles. Investors are watching your LGBTQ+ policies.

## Why Investors Care

**Risk**: Poor policies = higher turnover, lawsuits, reputation damage  
**Performance**: High diversity = 5.8% better annual performance  
**Future**: Gen Z won''t work for discriminatory companies

## QSI Metrics That Matter

1. Legal Protections Score
2. Cultural Safety Index  
3. External Impact Rating
4. Risk Assessment

## Case Study: Salesforce

After LGBTQ+ policies: 22% higher satisfaction, 3.2x stock growth vs competitors.

Are you serving ESG Eleganza? 📊',
  'With $35 trillion in ESG assets, investors are watching. Why Queer Safety metrics matter to your bottom line.',
  'ESG & Metrics',
  ARRAY['esg', 'metrics', 'investment', 'qsi'],
  10
),
(
  'Passport to Safety: LGBTQ+ Travel Risk Assessment That Slays',
  'passport-to-safety-lgbtq-travel-risk-assessment-that-slays',
  'Corporate travel safety for LGBTQ+ employees isn''t optional - it''s duty of care.

## The Reality

72 countries criminalize LGBTQ+ people. Your duty of care doesn''t stop at the border.

## Pre-Travel Checklist

✅ Destination safety score  
✅ Local laws and customs  
✅ Safe accommodations  
✅ Emergency contacts  
✅ Health resources  

## What Companies Must Do

**1. Risk Assessment** - Use QSI scores for all destinations  
**2. Right to Refuse** - Employees can decline unsafe travel  
**3. Safety Briefings** - Pre-travel training  
**4. Emergency Protocol** - 24/7 support  
**5. Insurance** - Comprehensive coverage

## Bottom Line

If you''re sending LGBTQ+ employees somewhere, you better have done your homework. Category is: Travel Safety Realness 🌍',
  '72 countries criminalize LGBTQ+ people. Corporate travel safety isn''t optional - it''s duty of care.',
  'Travel Safety',
  ARRAY['travel', 'safety', 'corporate', 'lgbtq+'],
  10
);
```

## Instructions for Setup

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your project: `glgcnymigakooloqmbtk`
3. Click "SQL Editor" in the left sidebar
4. Click "New query"
5. Paste the entire SQL script above
6. Click "Run" or press Ctrl+Enter
7. Verify tables created successfully

## Verification

After running the SQL, verify by running:
```sql
SELECT COUNT(*) FROM blog_posts;
-- Should return 3

SELECT title, category FROM blog_posts ORDER BY publish_date DESC;
-- Should show all 3 posts
```
