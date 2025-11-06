# Content Generation Automation - Complete Setup Guide

## 🎯 Overview

Automated system for generating SEO-optimized blog posts and LinkedIn content on a weekly schedule, reducing manual work from 10+ hours/week to 2 hours/week (review only).

---

## 🏗️ Architecture

```
Weekly Trigger (Cron/GitHub Actions)
    ↓
Supabase Edge Function: generate-seo-content
    ↓
AI Content Generation (GPT-5 via Emergent LLM Key)
    ↓
Parse & Structure Output
    ↓
Store in Supabase blog_posts (as draft)
    ↓
Slack/Email Notification to Team
    ↓
Manual Review & Approval (30-60 min)
    ↓
Publish (set published=true)
```

---

## 📦 Setup Instructions

### **Part 1: Deploy Supabase Edge Function**

**Step 1: Install Supabase CLI (if not installed)**
```bash
npm install -g supabase
```

**Step 2: Initialize Supabase in Project**
```bash
cd /app
supabase init
```

**Step 3: Create Edge Function**
```bash
supabase functions new generate-seo-content
```

**Step 4: Copy Function Code**
```bash
# Copy the code from /app/supabase/functions/generate-seo-content/index.ts
# (Already created - just needs deployment)
```

**Step 5: Set Environment Variables**

Go to Supabase Dashboard → Edge Functions → Secrets:

```
EMERGENT_LLM_KEY=sk-emergent-798Ce6a8a367eB90cC
SUPABASE_URL=https://glgcnymigakooloqmbtk.supabase.co
```

**Step 6: Deploy Function**
```bash
supabase functions deploy generate-seo-content --project-ref glgcnymigakooloqmbtk
```

**Step 7: Test Function**
```bash
curl -X POST 'https://glgcnymigakooloqmbtk.supabase.co/functions/v1/generate-seo-content' \
  -H 'Authorization: Bearer YOUR_ANON_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "topic": "How Fortune 50 Companies Measure DEI Impact",
    "keywords": "DEI measurement, ESG metrics, diversity ROI",
    "content_type": "blog",
    "target_audience": "C-suite executives",
    "word_count": 1500
  }'
```

---

### **Part 2: Set Up Automation Triggers**

#### **Option A: Supabase Cron (Recommended)**

**Enable pg_cron Extension:**
```sql
-- Run in Supabase SQL Editor
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Grant permissions
GRANT USAGE ON SCHEMA cron TO postgres;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA cron TO postgres;
```

**Schedule Weekly Blog Generation:**
```sql
-- Generate blog post every Monday at 9am UTC
SELECT cron.schedule(
  'weekly-blog-generation',
  '0 9 * * 1',
  $$
  SELECT net.http_post(
    url := 'https://glgcnymigakooloqmbtk.supabase.co/functions/v1/generate-seo-content',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer YOUR_SERVICE_ROLE_KEY'
    ),
    body := jsonb_build_object(
      'topic', 'Weekly ESG industry analysis',
      'keywords', 'ESG trends, DEI innovation, social impact measurement',
      'content_type', 'blog',
      'word_count', 1800
    )
  ) AS request_id;
  $$
);
```

**Schedule Daily LinkedIn Posts:**
```sql
-- Generate LinkedIn post every Tuesday, Wednesday, Thursday at 8am UTC
SELECT cron.schedule(
  'daily-linkedin-generation',
  '0 8 * * 2,3,4',
  $$
  SELECT net.http_post(
    url := 'https://glgcnymigakooloqmbtk.supabase.co/functions/v1/generate-seo-content',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer YOUR_SERVICE_ROLE_KEY'
    ),
    body := jsonb_build_object(
      'topic', 'Daily startup insight',
      'keywords', 'startup lessons, ESG innovation, founder journey',
      'content_type', 'linkedin',
      'target_audience', 'Startup founders, HR leaders'
    )
  ) AS request_id;
  $$
);
```

**View Scheduled Jobs:**
```sql
SELECT * FROM cron.job;
```

**Remove a Job:**
```sql
SELECT cron.unschedule('weekly-blog-generation');
```

---

#### **Option B: GitHub Actions**

**Create Workflow File:**
```yaml
# .github/workflows/content-automation.yml
name: Weekly Content Generation

on:
  schedule:
    # Every Monday at 9am UTC
    - cron: '0 9 * * 1'
  workflow_dispatch: # Manual trigger

jobs:
  generate-blog:
    runs-on: ubuntu-latest
    steps:
      - name: Generate Blog Post
        id: generate
        run: |
          RESPONSE=$(curl -s -X POST '${{ secrets.SUPABASE_URL }}/functions/v1/generate-seo-content' \
            -H 'Authorization: Bearer ${{ secrets.SUPABASE_SERVICE_KEY }}' \
            -H 'Content-Type: application/json' \
            -d '{
              "topic": "Weekly ESG industry insights",
              "keywords": "ESG metrics, DEI innovation, LGBTQ+ workplace safety",
              "content_type": "blog",
              "word_count": 1800
            }')
          
          echo "Response: $RESPONSE"
          echo "DRAFT_ID=$(echo $RESPONSE | jq -r .draft_id)" >> $GITHUB_OUTPUT

      - name: Notify Team (Slack)
        if: success()
        run: |
          curl -X POST '${{ secrets.SLACK_WEBHOOK_URL }}' \
            -H 'Content-Type: application/json' \
            -d '{
              "text": "🎉 New blog post draft generated! Review at: https://glgcnymigakooloqmbtk.supabase.co/project/glgcnymigakooloqmbtk/editor/blog_posts",
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "*New Blog Post Draft Ready* 📝\n\nTopic: Weekly ESG Insights\nDraft ID: ${{ steps.generate.outputs.DRAFT_ID }}\n\n<https://vectorforgood.com/admin/blog|Review & Publish>"
                  }
                }
              ]
            }'

      - name: Notify on Failure
        if: failure()
        run: |
          curl -X POST '${{ secrets.SLACK_WEBHOOK_URL }}' \
            -H 'Content-Type: application/json' \
            -d '{"text": "⚠️ Content generation failed. Check GitHub Actions logs."}'

  generate-linkedin:
    runs-on: ubuntu-latest
    needs: generate-blog
    steps:
      - name: Generate 3 LinkedIn Posts
        run: |
          # Generate Monday post
          curl -X POST '${{ secrets.SUPABASE_URL }}/functions/v1/generate-seo-content' \
            -H 'Authorization: Bearer ${{ secrets.SUPABASE_SERVICE_KEY }}' \
            -H 'Content-Type: application/json' \
            -d '{
              "topic": "Industry insight of the week",
              "keywords": "ESG trends, DEI measurement",
              "content_type": "linkedin"
            }'
          
          sleep 5
          
          # Generate Wednesday post
          curl -X POST '${{ secrets.SUPABASE_URL }}/functions/v1/generate-seo-content' \
            -H 'Authorization: Bearer ${{ secrets.SUPABASE_SERVICE_KEY }}' \
            -H 'Content-Type: application/json' \
            -d '{
              "topic": "Personal founder story",
              "keywords": "startup journey, impact entrepreneurship",
              "content_type": "linkedin"
            }'
          
          sleep 5
          
          # Generate Friday post
          curl -X POST '${{ secrets.SUPABASE_URL }}/functions/v1/generate-seo-content' \
            -H 'Authorization: Bearer ${{ secrets.SUPABASE_SERVICE_KEY }}' \
            -H 'Content-Type: application/json' \
            -d '{
              "topic": "Weekend read recommendation",
              "keywords": "LGBTQ+ safety, AI ethics",
              "content_type": "linkedin"
            }'

      - name: Notify Team
        run: |
          curl -X POST '${{ secrets.SLACK_WEBHOOK_URL }}' \
            -H 'Content-Type: application/json' \
            -d '{"text": "🎯 3 LinkedIn posts generated for this week. Review and schedule!"}'
```

---

### **Part 3: Notification & Review System**

**Create Supabase Function for Notifications:**

```typescript
// supabase/functions/notify-content-ready/index.ts

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

serve(async (req) => {
  const { draft_id, content_type, title } = await req.json()

  // Send Slack notification
  const slackWebhook = Deno.env.get('SLACK_WEBHOOK_URL')
  
  if (slackWebhook) {
    await fetch(slackWebhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: `📝 New ${content_type} draft ready!`,
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `*New Content Draft Generated*\n\n*Type:* ${content_type}\n*Title:* ${title}\n*Draft ID:* ${draft_id}\n\n<https://supabase.com/dashboard/project/glgcnymigakooloqmbtk/editor/blog_posts|Review in Supabase>`
            }
          },
          {
            type: "actions",
            elements: [
              {
                type: "button",
                text: { type: "plain_text", text: "Review Draft" },
                url: `https://supabase.com/dashboard/project/glgcnymigakooloqmbtk/editor/blog_posts`
              },
              {
                type: "button",
                text: { type: "plain_text", text: "Publish Now" },
                url: `https://vectorforgood.com/admin/blog/${draft_id}/publish`
              }
            ]
          }
        ]
      })
    })
  }

  // Send email notification (optional)
  const sendgridKey = Deno.env.get('SENDGRID_API_KEY')
  
  if (sendgridKey) {
    // Implement SendGrid email notification
    // Send to: hello@vectorforgood.com
    // Subject: "New [content_type] draft ready for review"
    // Body: Summary + link to review
  }

  return new Response(
    JSON.stringify({ success: true }),
    { headers: { 'Content-Type': 'application/json' } }
  )
})
```

---

## 📊 Content Quality Scoring

### **Automated Quality Checks (Before Notification)**

```typescript
function checkContentQuality(content: any): { score: number, issues: string[] } {
  const issues = []
  let score = 100

  // Title checks
  if (!content.title || content.title.length < 40) {
    issues.push('Title too short for SEO')
    score -= 10
  }
  if (content.title.length > 70) {
    issues.push('Title too long (will be truncated)')
    score -= 5
  }

  // Meta description checks
  if (!content.meta_description || content.meta_description.length < 140) {
    issues.push('Meta description too short')
    score -= 10
  }
  if (content.meta_description.length > 165) {
    issues.push('Meta description too long')
    score -= 5
  }

  // Content length checks
  const wordCount = content.content?.split(/\s+/).length || 0
  if (wordCount < 800) {
    issues.push('Content too short for SEO value')
    score -= 15
  }
  if (wordCount > 3000) {
    issues.push('Content too long (may lose readers)')
    score -= 5
  }

  // Structure checks
  if (!content.content?.includes('##')) {
    issues.push('Missing H2 headers (poor structure)')
    score -= 10
  }
  if (!content.citations || content.citations.length < 3) {
    issues.push('Insufficient citations (need 3-5)')
    score -= 10
  }

  // Keyword checks
  const hasTargetKeywords = content.seo_keywords && content.seo_keywords.length >= 3
  if (!hasTargetKeywords) {
    issues.push('Missing target keywords')
    score -= 10
  }

  // CTA checks
  const hasCTA = content.content?.toLowerCase().includes('book') || 
                 content.content?.toLowerCase().includes('download') ||
                 content.content?.toLowerCase().includes('calculate')
  if (!hasCTA) {
    issues.push('No clear call-to-action')
    score -= 10
  }

  return { score, issues }
}
```

**Quality Gates:**
- Score ≥ 80: Auto-notify team (ready for review)
- Score 60-79: Flag issues but notify (needs revision)
- Score < 60: Regenerate automatically with improved prompt

---

## 🔄 Complete Automation Flow

### **Monday 9am UTC: Weekly Blog Generation**

```sql
-- Supabase Cron Job
SELECT cron.schedule(
  'weekly-blog-auto-generation',
  '0 9 * * 1',
  $$
  DO $$
  DECLARE
    topics TEXT[] := ARRAY[
      'ESG Regulatory Updates',
      'Fortune 50 DEI Strategies',
      'AI Ethics in Corporate Settings',
      'LGBTQ+ Workplace Safety Trends'
    ];
    random_topic TEXT;
  BEGIN
    -- Select random topic from content calendar
    random_topic := topics[1 + floor(random() * array_length(topics, 1))::int];
    
    -- Call Edge Function
    PERFORM net.http_post(
      url := 'https://glgcnymigakooloqmbtk.supabase.co/functions/v1/generate-seo-content',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer SERVICE_ROLE_KEY'
      ),
      body := jsonb_build_object(
        'topic', random_topic,
        'keywords', 'ESG, DEI, LGBTQ+ safety, social impact',
        'content_type', 'blog',
        'word_count', 1800
      )
    );
  END $$;
  $$
);
```

---

### **Tuesday-Thursday 8am UTC: LinkedIn Post Generation**

```sql
-- Generate LinkedIn posts 3x per week
SELECT cron.schedule(
  'linkedin-post-generation',
  '0 8 * * 2,3,4',
  $$
  PERFORM net.http_post(
    url := 'https://glgcnymigakooloqmbtk.supabase.co/functions/v1/generate-seo-content',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer SERVICE_ROLE_KEY'
    ),
    body := jsonb_build_object(
      'topic', 'Daily founder insight',
      'keywords', 'startup lessons, ESG innovation',
      'content_type', 'linkedin',
      'target_audience', 'Startup founders, investors'
    )
  );
  $$
);
```

---

### **Part 4: Review & Publishing Workflow**

**Step 1: Notification Received (Slack/Email)**
```
📝 New blog post draft ready!

Title: "How Fortune 50 Companies Are Measuring Real DEI Impact"
Category: ESG & Metrics
Word Count: 1,847
SEO Score: 87/100

→ Review in Supabase
→ Edit if needed
→ Publish when ready
```

**Step 2: Review in Supabase Dashboard**
1. Go to: https://supabase.com/dashboard/project/glgcnymigakooloqmbtk/editor
2. Select `blog_posts` table
3. Filter: `published = false` (show only drafts)
4. Click draft to review

**Step 3: Edit (if needed)**
- Fix any AI mistakes
- Add personal touches
- Verify citations
- Check links work

**Step 4: Publish**
```sql
-- In Supabase SQL Editor or via API
UPDATE blog_posts 
SET published = true, 
    publish_date = CURRENT_TIMESTAMP 
WHERE id = 'DRAFT_ID';
```

Or via API:
```bash
curl -X PUT 'https://seo-content-hub-5.preview.emergentagent.com/api/blog/posts/SLUG' \
  -H 'Content-Type: application/json' \
  -d '{"published": true}'
```

---

## 📱 LinkedIn Publishing Workflow

### **Manual Process (2-3x per week):**

**Step 1: Retrieve Generated Posts**
```bash
# Call Edge Function or check saved drafts
curl 'https://glgcnymigakooloqmbtk.supabase.co/functions/v1/generate-seo-content' \
  -H 'Authorization: Bearer KEY' \
  -d '{"topic": "Startup lesson", "content_type": "linkedin"}'
```

**Step 2: Review & Personalize**
- Read through generated post
- Add personal touches (make it sound like YOU)
- Verify data/stats are accurate
- Check hashtags are relevant
- Confirm tags make sense

**Step 3: Schedule in LinkedIn**
1. Copy final post text
2. Go to LinkedIn
3. Click "Start a post"
4. Paste content
5. Add image/visual if suggested
6. Tag suggested people/companies
7. Schedule for optimal time (see best practices)

**Step 4: Engage First Hour**
- Respond to every comment in first hour
- Like all comments
- Ask follow-up questions
- Tag relevant people in comments

---

## 🔍 Monitoring & Optimization

### **Weekly Performance Review (Friday 5pm)**

```sql
-- Check content performance
SELECT 
  title,
  category,
  views,
  publish_date,
  sass_level
FROM blog_posts 
WHERE publish_date >= CURRENT_DATE - INTERVAL '7 days'
ORDER BY views DESC;
```

**Metrics to Track:**
- Blog posts published vs. planned
- Average SEO score of generated content
- Manual edit time (goal: <30 min per post)
- Publication rate (drafts → published %)
- Engagement metrics (views, time on page, conversions)

**Optimization Actions:**
- If SEO score consistently <80: Improve prompts
- If heavy manual editing needed: Refine AI instructions
- If low engagement: Test different topics/formats
- If low conversion: Strengthen CTAs

---

## 🚀 Scaling the System

### **Phase 1 (Weeks 1-4): Foundation**
- Deploy Edge Function
- Set up weekly blog automation
- Generate 4-8 blog posts
- Publish 12-16 LinkedIn posts
- Measure baseline performance

### **Phase 2 (Weeks 5-8): Optimization**
- A/B test different prompts
- Refine based on engagement data
- Add more automation (Twitter, newsletter)
- Increase frequency (2x per week blog)

### **Phase 3 (Weeks 9-12): Scale**
- Daily LinkedIn automation
- Guest post automation (pitch generation)
- Video script generation
- Full content calendar automation

---

## 💰 Cost Analysis

### **Current Manual Process:**
- Content creation: 10-12 hours/week @ $150/hr = **$1,800/week**
- SEO optimization: 2-3 hours/week @ $100/hr = **$250/week**
- **Total: $2,050/week = $8,200/month**

### **With Automation:**
- Edge Function costs: ~$5-10/month (minimal compute)
- AI API costs: ~$50-100/month (content generation)
- Review time: 2-4 hours/week @ $150/hr = $600/week
- **Total: $2,500-2,600/month**

### **Savings: $5,600/month (68% reduction)**

---

## 📋 Quick Start Checklist

**Today:**
- [ ] Deploy Edge Function to Supabase
- [ ] Test with one blog topic
- [ ] Test with one LinkedIn topic
- [ ] Verify output quality

**This Week:**
- [ ] Set up weekly blog cron job
- [ ] Set up LinkedIn automation (or manual generation)
- [ ] Create Slack notification webhook
- [ ] Generate and publish 1 test post

**Next Week:**
- [ ] Review performance metrics
- [ ] Optimize prompts based on results
- [ ] Increase automation frequency
- [ ] Scale to full calendar

---

## 🎯 Success Criteria

**Month 1:**
- [ ] 4 blog posts auto-generated and published
- [ ] 12 LinkedIn posts created (auto or manual)
- [ ] 80%+ content quality score
- [ ] <30 min review time per post
- [ ] Zero automation failures

**Month 2:**
- [ ] 8 blog posts published
- [ ] 16 LinkedIn posts published
- [ ] 85%+ content quality score
- [ ] 1,000+ blog page views
- [ ] 5,000+ LinkedIn impressions per post

**Month 3:**
- [ ] Full automation operational
- [ ] 2-3 guest posts accepted
- [ ] 5-10 demo requests from content
- [ ] Team spending <2 hours/week on content

---

**Ready to deploy! Start with Edge Function, then layer in automation.** 🚀
