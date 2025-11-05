# Google Search Console Setup & Technical SEO Checklist
## Vector for Good - Complete Implementation Guide

---

## PHASE 1: GOOGLE SEARCH CONSOLE SETUP

### Step 1: Verify Domain Ownership
**Time Required:** 15-30 minutes

1. **Go to Google Search Console:** https://search.google.com/search-console/

2. **Add Property:**
   - Click "Add Property"
   - Choose "Domain" (recommended - covers all subdomains and protocols)
   - Enter: `vectorforgood.com`

3. **Verify Ownership** (Choose ONE method):
   
   **Method A: DNS Verification (Recommended)**
   - Google provides TXT record
   - Add to DNS settings at your domain registrar
   - Format: `google-site-verification=XXXXXXXXXXXX`
   - Wait 10-30 minutes for propagation
   - Click "Verify"
   
   **Method B: HTML File Upload**
   - Download verification file from Google
   - Upload to website root: `vectorforgood.com/google-verification-file.html`
   - Click "Verify"
   
   **Method C: HTML Meta Tag**
   - Add meta tag to `<head>` section of homepage
   - `<meta name="google-site-verification" content="XXXX" />`
   - Already implemented in `/app/frontend/public/index.html`
   - Click "Verify"

4. **Confirmation:**
   - Green checkmark = verified
   - Data will start populating in 24-48 hours

---

### Step 2: Submit Sitemap
**Time Required:** 5 minutes

1. **Generate Sitemap** (if not already exists):
   ```bash
   # For React apps, install sitemap generator
   cd /app/frontend
   yarn add react-router-sitemap
   
   # Or use online generator temporarily
   # https://www.xml-sitemaps.com
   ```

2. **Sitemap should include:**
   - ✅ Homepage: `https://vectorforgood.com/`
   - ✅ Community: `https://vectorforgood.com/community`
   - ✅ Demo: `https://vectorforgood.com/demo`
   - ✅ Investors: `https://vectorforgood.com/investors`
   - ✅ Corporate Travel: `https://vectorforgood.com/corporate-travel`
   - ✅ Blog listing: `https://vectorforgood.com/blog`
   - ✅ Blog posts: `https://vectorforgood.com/blog/[slug]`
   - ✅ FAQ: `https://vectorforgood.com/faq`
   - ✅ Privacy GDPR: `https://vectorforgood.com/privacy/gdpr`
   - ✅ Privacy CCPA: `https://vectorforgood.com/privacy/ccpa`

3. **Submit to GSC:**
   - In GSC, go to "Sitemaps" (left sidebar)
   - Enter sitemap URL: `sitemap.xml`
   - Click "Submit"
   - Status should show "Success"

4. **Monitor:**
   - Check back in 24-48 hours
   - Should show "Discovered" → "Indexed" for most pages

---

### Step 3: Set Preferred Domain (Optional)
**Time Required:** 2 minutes

1. **Check Current Behavior:**
   - Does `vectorforgood.com` redirect to `www.vectorforgood.com`?
   - Or vice versa?

2. **Set Canonical:**
   - Ensure all pages have canonical tags
   - Example: `<link rel="canonical" href="https://vectorforgood.com/page" />`
   - Tells Google which version is "official"

---

## PHASE 2: INITIAL AUDIT & FIX CRITICAL ISSUES

### Step 1: Coverage Report Analysis
**Location:** GSC → "Coverage" (or "Pages")

**Check for:**
- ❌ **Errors:** Pages that failed to index
- ⚠️ **Warnings:** Pages with issues
- ✅ **Valid:** Successfully indexed pages
- ℹ️ **Excluded:** Intentionally not indexed (e.g., thank-you pages)

**Common Issues & Fixes:**

| Issue | Cause | Fix |
|-------|-------|-----|
| Server error (5xx) | Backend down during crawl | Ensure 99.9% uptime |
| Soft 404 | Page returns 200 but looks like 404 | Return proper 404 status |
| Redirect error | Redirect chains or loops | Simplify redirects |
| Blocked by robots.txt | Accidentally blocked | Check `/robots.txt` |
| Crawled but not indexed | Low quality or duplicate | Improve content uniqueness |
| Discovered but not crawled | Low priority in crawl queue | Build internal links, submit sitemap |

**Action Items:**
1. Export errors to spreadsheet
2. Categorize by issue type
3. Fix highest-impact issues first (homepage, key landing pages)
4. Request re-indexing: "Request Indexing" button in URL Inspection tool

---

### Step 2: Mobile Usability Check
**Location:** GSC → "Mobile Usability"

**Common Issues:**
- Text too small to read
- Clickable elements too close together
- Content wider than screen
- Viewport not set

**Vector for Good Check:**
```html
<!-- Verify this is in index.html -->
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

**Test Yourself:**
- Chrome DevTools → Mobile emulator
- Test all major pages on iPhone and Android sizes
- Check touch targets (buttons should be 48x48px minimum)

**Fix Priority:** HIGH (52% of traffic is mobile)

---

### Step 3: Core Web Vitals
**Location:** GSC → "Core Web Vitals"

**Google's Ranking Factors:**
1. **LCP (Largest Contentful Paint):** < 2.5 seconds (GOOD)
2. **FID (First Input Delay):** < 100ms (GOOD)
3. **CLS (Cumulative Layout Shift):** < 0.1 (GOOD)

**Vector for Good Optimizations:**

**LCP Improvements:**
```bash
# Compress images
- Hero image: Reduce to < 200KB
- Use WebP format
- Lazy load below-the-fold images

# Code splitting
- Load critical CSS first
- Defer non-critical JavaScript
```

**FID Improvements:**
- Minimize JavaScript execution time
- Use React code splitting
- Remove unused libraries

**CLS Improvements:**
- Set width/height on images
- Avoid injecting content above existing content
- Preload fonts

**Test Tools:**
- PageSpeed Insights: https://pagespeed.web.dev/
- Target: 90+ score for mobile and desktop

---

### Step 4: Security Issues
**Location:** GSC → "Security Issues"

**Check for:**
- Hacked content
- Malware
- Deceptive pages

**Should show:** "No issues detected"

**If issues found:**
1. Immediately investigate
2. Remove malicious code
3. Change all passwords
4. Request review in GSC

---

## PHASE 3: ONGOING MONITORING (WEEKLY/MONTHLY)

### Weekly Tasks (30 minutes)

1. **Performance Report**
   - GSC → "Performance"
   - Check:
     * Total clicks (growing?)
     * Average position (improving?)
     * CTR (above 5%?)
     * Impressions (increasing?)

2. **Top Queries**
   - Which keywords drive traffic?
   - Any surprising keywords to target?
   - Sort by "Impressions" to find opportunity keywords (high impressions, low clicks = optimize)

3. **Top Pages**
   - Which pages get most traffic?
   - Which have high impressions but low clicks? (optimize title/description)

4. **Index Coverage**
   - Any new errors?
   - Are new blog posts getting indexed within 48 hours?
   - If not, request indexing manually

---

### Monthly Tasks (1-2 hours)

1. **Deep Performance Analysis**
   - Compare month-over-month
   - Traffic trends by page
   - Keyword ranking changes
   - Identify top performers + underperformers

2. **Backlink Report** (GSC → "Links")
   - Top linking sites
   - Most linked pages
   - Top linking text (anchor text)
   - Identify toxic links (if any) and disavow

3. **Manual Actions Check**
   - GSC → "Manual Actions"
   - Should always say "No issues detected"
   - If penalty: Fix immediately and request review

4. **Enhancement Reports**
   - Breadcrumbs
   - Sitelinks
   - Logo
   - Review stars (if applicable)

5. **Search Appearance**
   - Rich results (FAQ schema showing?)
   - Organization knowledge panel appearing?

---

## PHASE 4: ADVANCED OPTIMIZATION

### 1. International Targeting (If Applicable)
**Location:** GSC → Settings → International Targeting

- Only use if targeting specific countries
- Vector for Good = Global audience, so leave unset

---

### 2. URL Parameters
**Location:** GSC → Settings → URL Parameters

- Tell Google how to handle query parameters
- Example: `?utm_source=email` should be treated as "Representative URL"

---

### 3. Change of Address (If Migrating Domains)
**Location:** GSC → Settings → Change of Address

- Only needed if moving from old domain to new
- Not applicable for Vector for Good (new site)

---

### 4. Crawl Stats
**Location:** GSC → Settings → Crawl Stats

**Monitor:**
- Crawl requests per day (should increase over time)
- Kilobytes downloaded per day
- Response time (should be < 500ms)

**Red Flags:**
- Sudden drop in crawl rate = Google found issues
- High response time = Server performance problems

---

## PHASE 5: INTEGRATION WITH OTHER TOOLS

### 1. Connect to Google Analytics
**Why:** See GSC data inside GA4

**How:**
1. In GSC, go to Settings → "Associate with Google Analytics property"
2. Select your GA4 property
3. Now GSC data appears in GA4 under "Acquisition" → "Search Console"

---

### 2. Connect to Looker Studio (Google Data Studio)
**Why:** Create custom SEO dashboards

**How:**
1. Looker Studio: https://lookerstudio.google.com/
2. Create new report
3. Add data source → "Search Console"
4. Build custom visualizations

---

### 3. Export Data Regularly
**Why:** Historical data only available for 16 months in GSC

**How:**
1. GSC → Performance
2. Click "Export" → Download CSV
3. Save monthly snapshots
4. Track long-term trends in spreadsheet

---

## PHASE 6: SEO ACTION PLAN BASED ON GSC DATA

### Scenario 1: High Impressions, Low Clicks
**Problem:** People see your result but don't click

**Fix:**
1. Improve title tag (add power words, numbers, emotion)
2. Improve meta description (include benefits, CTA)
3. Add structured data for rich results
4. Example:
   - Before: "LGBTQ+ Safety Intelligence | Vector for Good"
   - After: "LGBTQ+ Safety Intelligence Platform - Reduce Incidents 92% | Vector for Good"

---

### Scenario 2: Low Impressions, Low Clicks
**Problem:** Not ranking well

**Fix:**
1. Strengthen content (longer, more comprehensive)
2. Build backlinks to page
3. Improve internal linking
4. Target less competitive keywords initially

---

### Scenario 3: High Position but Low CTR
**Problem:** Ranking #3-7 but not getting clicks

**Fix:**
1. Optimize for featured snippet
2. Add FAQ schema
3. Improve title to stand out from competitors

---

### Scenario 4: Declining Traffic
**Problem:** Rankings or traffic dropping

**Fix:**
1. Check for technical issues (GSC coverage report)
2. Check if Google algorithm update happened (check SEO news)
3. Review content quality (E-E-A-T factors)
4. Check competitors (are they improving faster?)

---

## KEY PERFORMANCE INDICATORS (KPIs)

### Month 1 Targets:
- ✅ All pages indexed (10-15 pages)
- ✅ No critical errors in coverage report
- ✅ Mobile usability: 0 issues
- ✅ Core Web Vitals: 80%+ good URLs
- ✅ Average position: Track baseline

### Month 2 Targets:
- ✅ 10+ keywords ranking in top 100
- ✅ 500+ monthly impressions
- ✅ 50+ monthly clicks
- ✅ Average position: Improvement on 5+ keywords

### Month 3 Targets:
- ✅ 25+ keywords ranking in top 100
- ✅ 5+ keywords in top 10
- ✅ 2,000+ monthly impressions
- ✅ 200+ monthly clicks
- ✅ Featured snippet for 1+ query

### Month 6 Targets:
- ✅ 50+ keywords ranking in top 100
- ✅ 15+ keywords in top 10
- ✅ 10,000+ monthly impressions
- ✅ 1,000+ monthly clicks (5% CTR)
- ✅ 3+ featured snippets

---

## TROUBLESHOOTING GUIDE

### Problem: Pages not indexing
**Check:**
1. Is page blocked in robots.txt?
2. Does page have `noindex` meta tag?
3. Is page linked from other pages (internal links)?
4. Is server returning 200 status?
5. Is content unique and valuable?

**Solution:**
- Fix blocking issues
- Add internal links
- Request indexing manually
- Improve content quality

---

### Problem: Indexing but not ranking
**Check:**
1. Is content thin or duplicate?
2. Are there backlinks to the page?
3. Is page optimized for target keyword?
4. Is page technically sound (fast, mobile-friendly)?

**Solution:**
- Expand content (aim for 1,500+ words)
- Build backlinks
- Optimize on-page SEO
- Improve Core Web Vitals

---

### Problem: Rankings dropped suddenly
**Check:**
1. GSC → Manual Actions (penalty?)
2. Coverage Report (technical errors?)
3. Google algorithm updates (check SEO news)
4. Competitors improved (search your keywords)

**Solution:**
- Fix penalties/errors immediately
- Update content to match new algorithm priorities
- Outperform competitors

---

## RECOMMENDED TOOLS (BEYOND GSC)

### Free Tools:
- **Google Analytics 4:** Traffic analysis
- **PageSpeed Insights:** Performance testing
- **Screaming Frog (Free up to 500 URLs):** Technical SEO audit
- **Answer The Public:** Keyword research

### Paid Tools (Worth It):
- **SEMrush ($119/month):** Comprehensive SEO platform
- **Ahrefs ($99/month):** Backlink analysis, keyword research
- **Surfer SEO ($59/month):** On-page optimization
- **Clearscope ($170/month):** Content optimization

---

## VECTOR FOR GOOD SPECIFIC CHECKLIST

### Week 1 (COMPLETE THESE):
- [ ] Verify domain in Google Search Console
- [ ] Submit sitemap
- [ ] Check Coverage Report for errors
- [ ] Fix any critical mobile usability issues
- [ ] Run PageSpeed Insights on key pages
- [ ] Set up Google Analytics 4 connection
- [ ] Export baseline performance data

### Week 2:
- [ ] Fix any indexing errors from Coverage Report
- [ ] Optimize Core Web Vitals (aim for 90+ PageSpeed score)
- [ ] Review and improve low-CTR high-impression pages
- [ ] Set up weekly performance monitoring routine

### Week 3:
- [ ] Analyze top-performing keywords
- [ ] Identify keyword opportunities (high impressions, low clicks)
- [ ] Build internal links to under-indexed pages
- [ ] Request indexing for new blog posts

### Week 4:
- [ ] Month-over-month performance review
- [ ] Backlink analysis
- [ ] Competitor comparison (rankings)
- [ ] Create custom Looker Studio dashboard

---

## SUCCESS METRICS BY QUARTER

**Q1 2025:**
- 100% of pages indexed
- 0 critical errors
- 50+ keywords ranking
- 5+ top 10 rankings
- 1,000+ monthly clicks

**Q2 2025:**
- 100+ keywords ranking
- 20+ top 10 rankings
- 5+ featured snippets
- 5,000+ monthly clicks
- 3+ authoritative backlinks per week

**End of Year:**
- 200+ keywords ranking
- 50+ top 10 rankings
- 15+ featured snippets
- 25,000+ monthly clicks
- Category ownership for "quantifiable S in ESG"

---

**This checklist is comprehensive. Start with Phase 1 (setup) immediately, then work through phases sequentially. GSC data takes 48-72 hours to populate, so be patient initially. Focus on fixing errors first, then optimizing for growth.**
