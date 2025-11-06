# LinkedIn Content Agent - Complete Workflow

## 🎯 Mission
Generate high-engagement LinkedIn content that builds Vector for Good's thought leadership, drives demo requests, and positions Levi as an authority in ESG/AI/LGBTQ+ safety.

---

## 📊 Top-Performing LinkedIn Post Analysis

### **What Works (Based on 2024-2025 LinkedIn Algorithm)**

**Hook Patterns (First 2 Lines):**
1. **Surprising Stat:** "I just watched a Fortune 500 waste $3.2M on DEI that changed nothing."
2. **Bold Claim:** "Hot take: Your ESG metrics are useless."
3. **Personal Reveal:** "6 months ago, I almost gave up on Vector for Good."
4. **Question Hook:** "Why do 73% of LGBTQ+ employees hide at work?"
5. **Contrast:** "Everyone talks about AI bias. Nobody's fixing it."

**Content Patterns:**
- **Personal Story + Data** (highest engagement)
- **Controversial Take + Evidence** (high comments)
- **Case Study + Numbers** (high saves/shares)
- **Behind-the-Scenes** (authentic, relatable)
- **Listicles with Insights** (scannable, actionable)

**Formatting:**
- ✅ Short paragraphs (2-3 lines max)
- ✅ Line breaks for emphasis
- ✅ Strategic bold text
- ✅ 1-2 emojis (subtle, not excessive)
- ✅ Clear visual hierarchy

**Engagement Drivers:**
- ✅ Ask question at end (drives comments)
- ✅ Tag 1-2 relevant people (drives reach)
- ✅ Include data point (credibility + saves)
- ✅ Vulnerable moment (relatability)
- ✅ Actionable takeaway (value)

**Hashtag Strategy:**
- 3-5 hashtags max (more = spam)
- Mix volume (1-2 popular) + niche (2-3 targeted)
- Research trending hashtags weekly
- Popular: #ESG #DEI #AI #StartupLife #FutureOfWork
- Niche: #LGBTQInTech #QueerInclusion #ImpactStartup #ESGInnovation

---

## 🔄 LinkedIn Content Workflow

### **Step 1: Content Ideation (Weekly)**

**Sources for Topics:**
1. **Blog Post Repurposing:** Turn each blog post into 3-5 LinkedIn posts
2. **Client Wins:** Anonymized success stories (monthly)
3. **Industry News:** React to ESG/DEI/AI news within 24 hours
4. **Personal Insights:** Founder journey, lessons learned, behind-the-scenes
5. **Data Drops:** Share QSI metrics, research findings, benchmarks
6. **Controversial Takes:** Challenge industry assumptions with data

**Content Calendar Template:**
```
Monday: Industry Insight / Trend Analysis
Tuesday: Personal Story / Founder Journey
Wednesday: Data Drop / Research Finding
Thursday: Client Success / Case Study Teaser
Friday: Weekend Read / Blog Post Promo
```

---

### **Step 2: Content Generation (Per Post)**

**Input Template:**
```json
{
  "topic": "AI bias in LGBTQ+ contexts",
  "keywords": "AI ethics, LGBTQ+ safety, machine learning bias",
  "content_type": "linkedin",
  "target_audience": "HR leaders, startup founders, ESG officers",
  "post_goal": "Drive blog post traffic + position as AI ethics thought leader",
  "hook_style": "surprising_stat",
  "include_cta": true,
  "cta_link": "https://vectorforgood.com/blog/why-single-llm-ai-fails-lgbtq-context"
}
```

**AI Generation Prompt:**
```
You are writing a LinkedIn post for Levi Hankins, Founder of Vector for Good.

Topic: [topic]
Goal: [post_goal]
Hook Style: [surprising_stat / bold_claim / personal_story / question / contrast]

Create a post that:
1. Hooks in first 2 lines with [hook_style]
2. Shares specific insight or story about [topic]
3. Includes one powerful data point or metric
4. Ends with engaging question or clear CTA
5. Uses 3-5 hashtags: [based on keywords]
6. Suggests 1-2 people/companies to tag

Voice: Authentic founder - confident, data-driven, occasionally vulnerable, always professional

Format:
[Compelling hook that works before "see more"]

[Story or context - make it specific and relatable]

[Data point or proof - cite source]

[Insight or takeaway - what does this mean?]

[CTA or question - drive action]

#Hashtag1 #Hashtag2 #Hashtag3

---
Suggested tags: @Person @Company
Engagement prediction: [High/Medium/Low] because [reasoning]
```

---

### **Step 3: Review & Optimization (5-10 min per post)**

**Checklist:**
- [ ] Hook works standalone (before "see more")
- [ ] Data point is accurate and cited
- [ ] Voice sounds like founder (not AI)
- [ ] CTA is clear and compelling
- [ ] Hashtags are relevant (not spammy)
- [ ] Tags add value (not random)
- [ ] Length is 150-250 words (sweet spot)
- [ ] Formatting is scannable

**Red Flags (Edit Before Posting):**
- ❌ Generic platitudes ("Diversity is important")
- ❌ Too many emojis (looks unprofessional)
- ❌ No specific data (unsubstantiated claims)
- ❌ Too long (>300 words, loses engagement)
- ❌ No engagement hook (no question, no CTA)

---

### **Step 4: Posting Strategy**

**Best Times to Post (B2B LinkedIn):**
- **Tuesday-Thursday:** 7-9am, 12-1pm, 5-6pm EST
- **Avoid:** Weekends, Monday mornings, Friday afternoons
- **Test:** A/B test times for your audience

**Engagement Playbook (First Hour):**
1. **0-5 min:** Respond to first comments immediately
2. **5-15 min:** Share to Twitter/X with shortened link
3. **15-30 min:** Tag 2-3 relevant people in comments (not in post)
4. **30-60 min:** Engage with related posts (comment thoughtfully)
5. **1-24 hours:** Continue responding to comments (boosts algorithm)

**Repurposing:**
- Post to LinkedIn (primary)
- Tweet thread version (secondary)
- Add to weekly newsletter
- Save top performers for Medium republish

---

## 🤖 Automation Workflow

### **Weekly Content Generation (Automated)**

**Option A: Supabase Edge Function + Cron**

```sql
-- Set up weekly cron job in Supabase
SELECT cron.schedule(
  'weekly-content-generation',
  '0 9 * * 1', -- Every Monday at 9am UTC
  $$
  SELECT net.http_post(
    url := 'https://glgcnymigakooloqmbtk.supabase.co/functions/v1/generate-seo-content',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer YOUR_SERVICE_KEY"}'::jsonb,
    body := jsonb_build_object(
      'topic', 'Weekly ESG trend analysis',
      'keywords', 'ESG metrics, DEI measurement, social impact',
      'content_type', 'blog',
      'word_count', 1500
    )
  );
  $$
);
```

**Option B: GitHub Actions (Scheduled)**

```yaml
# .github/workflows/weekly-content.yml
name: Weekly Content Generation

on:
  schedule:
    - cron: '0 9 * * 1' # Every Monday at 9am UTC
  workflow_dispatch: # Manual trigger

jobs:
  generate-content:
    runs-on: ubuntu-latest
    steps:
      - name: Generate Blog Post
        run: |
          curl -X POST '${{ secrets.SUPABASE_URL }}/functions/v1/generate-seo-content' \
            -H 'Authorization: Bearer ${{ secrets.SUPABASE_SERVICE_KEY }}' \
            -H 'Content-Type: application/json' \
            -d '{
              "topic": "Weekly trend analysis",
              "keywords": "ESG, DEI, AI ethics",
              "content_type": "blog"
            }'
      
      - name: Generate LinkedIn Post
        run: |
          curl -X POST '${{ secrets.SUPABASE_URL }}/functions/v1/generate-seo-content' \
            -H 'Authorization: Bearer ${{ secrets.SUPABASE_SERVICE_KEY }}' \
            -H 'Content-Type: application/json' \
            -d '{
              "topic": "Weekly founder insight",
              "keywords": "startup lessons, ESG innovation",
              "content_type": "linkedin"
            }'
      
      - name: Notify Team
        run: |
          # Send Slack/email notification that drafts are ready
          echo "Content drafts generated - review in Supabase"
```

---

## 📅 Editorial Calendar Integration

### **Monthly Content Plan (Auto-Generated)**

**Week 1:**
- Blog: Technical deep-dive (from blog-strategy-posts-3-8.md)
- LinkedIn: 3 posts (Monday: Industry insight, Wednesday: Personal story, Friday: Data share)
- Twitter: 5 posts (daily quick hits)

**Week 2:**
- Blog: Case study or customer success
- LinkedIn: 3 posts (Monday: Trend analysis, Wednesday: Behind-the-scenes, Friday: Weekend read promo)
- Twitter: 5 posts

**Week 3:**
- Blog: SEO evergreen content (how-to, guide, ranking)
- LinkedIn: 3 posts (Monday: Controversial take, Wednesday: Founder journey, Friday: Data visualization)
- Twitter: 5 posts

**Week 4:**
- Blog: Regulatory or industry news reaction
- LinkedIn: 3 posts (Monday: Month recap, Wednesday: Lessons learned, Friday: Looking ahead)
- Twitter: 5 posts
- Guest post: Submit 1-2 pitches

---

## 🎯 Performance Optimization

### **A/B Testing Framework**

**What to Test:**
1. **Hook Styles:** Question vs. Stat vs. Story vs. Bold claim
2. **Post Length:** Short (150 words) vs. Medium (250 words)
3. **Visual vs. Text:** Post with image vs. text-only
4. **CTA Type:** Question vs. Link vs. DM request
5. **Posting Time:** Morning vs. Lunch vs. Evening

**How to Test:**
- Post same content with different hooks on different days
- Track engagement rate (likes + comments + shares / impressions)
- Use LinkedIn Analytics to compare performance
- Double down on what works

---

## 🔧 Technical Setup

### **Required Tools:**

1. **Supabase Project:** glgcnymigakooloqmbtk
2. **AI API:** Emergent LLM Key (sk-emergent-798Ce6a8a367eB90cC)
3. **Content Storage:** Supabase blog_posts table
4. **Scheduling:** Supabase Cron or GitHub Actions
5. **Analytics:** LinkedIn Analytics + Google Analytics

### **Environment Variables Needed:**

```env
# Supabase Edge Function
EMERGENT_LLM_KEY=sk-emergent-798Ce6a8a367eB90cC
OPENAI_API_KEY=[backup if Emergent not available]
SUPABASE_URL=https://glgcnymigakooloqmbtk.supabase.co
SUPABASE_SERVICE_ROLE_KEY=[from Supabase dashboard]
```

---

## 📋 Weekly Workflow Checklist

**Monday Morning (30 min):**
- [ ] Review last week's performance (top posts, engagement rates)
- [ ] Check content calendar for this week's topics
- [ ] Generate 3-5 LinkedIn post drafts (via Edge Function or manual)
- [ ] Review and edit drafts for authenticity

**Tuesday-Friday (10 min/day):**
- [ ] Post scheduled LinkedIn content
- [ ] Engage first hour (respond to comments)
- [ ] Share wins/insights on Twitter
- [ ] Track engagement metrics

**Friday Afternoon (20 min):**
- [ ] Review week's analytics
- [ ] Plan next week's topics
- [ ] Generate blog post draft if scheduled
- [ ] Submit guest post pitch if due

---

## 🚀 Quick Start Guide

**This Week:**
1. **Set up Supabase Edge Function** (30 min)
   - Deploy generate-seo-content function
   - Test with sample topic
   - Verify output quality

2. **Generate 5 LinkedIn Posts** (60 min)
   - Use Template 2 with your topics
   - Review and personalize
   - Schedule for next week

3. **Publish Blog Post 5** (2 hours)
   - Use blog strategy outline
   - Generate via Edge Function
   - Review, edit, publish

**Next Week:**
1. Set up automation (cron or GitHub Actions)
2. Track performance metrics
3. Optimize based on data

---

## 📈 Success Metrics (Track Monthly)

**Content Output:**
- [ ] 4-8 blog posts published
- [ ] 12-16 LinkedIn posts published
- [ ] 20-30 Twitter posts published
- [ ] 1-2 guest posts pitched

**Engagement:**
- [ ] Blog: 1,000+ monthly page views by Month 3
- [ ] LinkedIn: 5,000+ impressions per post avg
- [ ] Twitter: 500-2,000 impressions per post
- [ ] Guest posts: 2-5 accepted within 3 months

**Business Impact:**
- [ ] 10-20 demo requests attributed to content
- [ ] 500+ newsletter subscribers
- [ ] 50+ inbound partnership inquiries
- [ ] 5-10 investor conversations started

---

**Ready to activate! Start with the Edge Function deployment, then scale with automation.** 🚀
