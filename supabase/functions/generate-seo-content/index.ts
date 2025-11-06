// Supabase Edge Function: generate-seo-content
// Deploy to: supabase/functions/generate-seo-content/index.ts

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Get request body
    const { topic, keywords, content_type, target_audience, word_count } = await req.json()

    // Validate inputs
    if (!topic || !keywords || !content_type) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: topic, keywords, content_type' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get AI API key from environment
    const openaiKey = Deno.env.get('OPENAI_API_KEY')
    const emergentKey = Deno.env.get('EMERGENT_LLM_KEY')
    
    const apiKey = emergentKey || openaiKey
    if (!apiKey) {
      throw new Error('No AI API key configured')
    }

    // Select appropriate prompt template based on content type
    const systemPrompt = getSystemPrompt(content_type)
    const userPrompt = generateUserPrompt(topic, keywords, content_type, target_audience, word_count)

    // Call OpenAI API (works with Emergent LLM Key too)
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 4000
      })
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`OpenAI API error: ${error}`)
    }

    const aiResponse = await response.json()
    const generatedContent = aiResponse.choices[0].message.content

    // Parse the structured response
    const parsedContent = parseGeneratedContent(generatedContent, content_type)

    // If it's a blog post, save draft to Supabase
    if (content_type === 'blog') {
      const slug = topic.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')

      const { data: blogPost, error: dbError } = await supabaseClient
        .from('blog_posts')
        .insert({
          title: parsedContent.title,
          slug: slug,
          content: parsedContent.content,
          excerpt: parsedContent.excerpt,
          category: parsedContent.category || 'ESG & Metrics',
          tags: parsedContent.tags || keywords.split(',').map(k => k.trim()),
          author: 'KIKI QI',
          published: false, // Save as draft
          sass_level: parsedContent.sass_level || 8
        })
        .select()
        .single()

      if (dbError) {
        console.error('Database error:', dbError)
      }

      return new Response(
        JSON.stringify({
          success: true,
          content_type: 'blog',
          draft_id: blogPost?.id,
          slug: slug,
          content: parsedContent,
          metadata: {
            word_count: parsedContent.content.split(/\s+/).length,
            reading_time: Math.ceil(parsedContent.content.split(/\s+/).length / 200),
            seo_score: calculateSEOScore(parsedContent, keywords)
          }
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // If it's a LinkedIn post, return formatted content
    if (content_type === 'linkedin') {
      return new Response(
        JSON.stringify({
          success: true,
          content_type: 'linkedin',
          content: parsedContent,
          metadata: {
            character_count: parsedContent.post.length,
            hashtag_count: parsedContent.hashtags.length,
            estimated_reach: estimateLinkedInReach(parsedContent)
          }
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ success: true, content: parsedContent }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})

// ============= HELPER FUNCTIONS =============

function getSystemPrompt(contentType: string): string {
  const prompts = {
    blog: `You are KIKI, Vector for Good's fiercest content strategist and SEO expert.

Your mission: Create SEO-optimized blog posts that serve TRUTH, DATA, and IMPACT.

Writing Guidelines:
- Lead with BOLD hooks that grab attention
- Use data and citations to back every claim (Stanford, MIT, McKinsey, HBR, etc.)
- Balance sass with substance - professional but never boring
- Target enterprise decision-makers (C-suite, HR, ESG officers)
- Integrate QSI metrics and Vector for Good differentiators naturally
- Make complex topics accessible without dumbing down
- Include clear CTAs (demo, ROI calculator, whitepapers)
- Optimize for SEO: natural keyword integration, scannable structure, internal links

Voice: Authoritative, data-driven, confident, occasionally sassy (but never unprofessional)

Structure every post with:
1. Compelling H1 title (50-60 chars, keyword-rich)
2. Hook paragraph (problem statement with urgency)
3. Data-backed body (statistics, case studies, research)
4. Clear sections with H2/H3 headers
5. Actionable takeaways
6. Strong CTAs with specific links
7. Credible citations

SEO Requirements:
- Meta description (155-160 chars)
- 5-7 target keywords naturally integrated
- Internal links to Vector for Good pages
- External links to authoritative sources
- Alt text suggestions for images
- Schema markup recommendations`,

    linkedin: `You are KIKI, Vector for Good's LinkedIn content strategist.

Your mission: Create high-engagement LinkedIn posts that build thought leadership.

Post Guidelines:
- Hook in first 2 lines (critical for feed visibility)
- Tell stories with DATA (numbers, case studies, real examples)
- Personal but professional tone - authentic founder/leader voice
- Controversial takes backed by evidence (start conversations)
- Tag relevant people/companies when appropriate
- Use emojis strategically (not excessive)
- End with clear CTA or question to drive engagement

Post Structure:
1. Hook (first 2 lines visible before "see more")
2. Context/Story (personal anecdote or industry insight)
3. Data/Proof (statistics, case studies, research)
4. Insight/Takeaway (what it means, why it matters)
5. CTA (question, link, call to action)
6. Hashtags (3-5 relevant, mix of popular and niche)

Engagement Drivers:
- Ask questions to encourage comments
- Share vulnerable/authentic moments
- Challenge industry assumptions
- Celebrate wins with data
- Call out problems with solutions

Voice: Authentic, confident, data-driven, occasionally bold - like a founder who knows their stuff`,

    technical: `You are a senior AI architect writing for a technical audience.

Your mission: Create deep technical content that showcases Vector for Good's innovation.

Content Guidelines:
- Start with the "why" before the "how"
- Use architecture diagrams (describe in markdown)
- Include code examples where relevant
- Reference academic papers and technical research
- Explain trade-offs and design decisions
- Address scalability, performance, security
- Make complex topics accessible without oversimplifying

Target Audience:
- CTOs, Lead Engineers, AI/ML practitioners
- Technical decision-makers at Fortune 50
- AI ethics researchers
- Platform engineers evaluating solutions

Voice: Expert, precise, thoughtful, technically rigorous but not condescending`,

    trend_analysis: `You are an industry analyst covering ESG, DEI, and AI trends.

Your mission: Identify and analyze trends before they become mainstream.

Content Guidelines:
- Start with a provocative insight or prediction
- Use multiple data sources (Gartner, McKinsey, CB Insights, etc.)
- Connect dots others miss
- Quantify the opportunity or risk
- Explain implications for enterprises
- Position Vector for Good as ahead of the curve

Analysis Framework:
1. What's changing (the trend)
2. Why it's happening (forces driving change)
3. Who's affected (market segments, stakeholders)
4. What it means (implications, opportunities, threats)
5. What to do (actionable recommendations)

Voice: Analytical, forward-thinking, authoritative, confident but not arrogant`
  }

  return prompts[contentType] || prompts.blog
}

function generateUserPrompt(
  topic: string,
  keywords: string,
  contentType: string,
  targetAudience: string = 'C-suite executives, HR leaders, ESG officers',
  wordCount: number = 1500
): string {
  const prompts = {
    blog: `Create an SEO-optimized blog post for Vector for Good.

**Topic:** ${topic}
**Target Keywords:** ${keywords}
**Target Audience:** ${targetAudience}
**Word Count:** ${wordCount} words

**Requirements:**
1. Compelling H1 title (50-60 characters, include primary keyword)
2. Meta description (155-160 characters, include CTA)
3. Excerpt (2-3 sentences summarizing value)
4. Full blog post with:
   - Hook paragraph addressing pain point
   - 3-5 main sections with H2 headers
   - Data and statistics (cite sources)
   - Real-world examples or case studies
   - QSI/Vector for Good differentiators
   - Actionable takeaways
   - Strong CTAs
5. Category (choose: ESG & Metrics, Innovation, LGBTQ+ Workplace, Travel Safety, DEI Strategy)
6. Tags (5-7 relevant tags)
7. Sass level (1-10, recommend 5-7 for balance)
8. 3-5 credible citations
9. Internal link suggestions (ROI calculator, demo, previous posts)
10. Suggested featured image description

**Brand Integration:**
- Mention Queer Intelligence (QI) technology
- Reference 4-LLM architecture when relevant
- Include Fortune 50 trust signals
- Cite specific metrics (92% incident reduction, €2.4M savings, etc.)
- Link to demo and ROI calculator

**Format your response as:**
---
TITLE: [50-60 char SEO title]
META_DESCRIPTION: [155-160 char with CTA]
EXCERPT: [2-3 sentence summary]
CATEGORY: [Category name]
TAGS: [tag1, tag2, tag3, tag4, tag5]
SASS_LEVEL: [1-10]
FEATURED_IMAGE_SUGGESTION: [Description for image search]

CONTENT:
[Full markdown blog post with H1/H2/H3 structure]

CITATIONS:
1. [Citation 1]
2. [Citation 2]
...

INTERNAL_LINKS:
- [Link suggestion 1]
- [Link suggestion 2]

SEO_KEYWORDS_USED: [List of keywords naturally integrated]
---`,

    linkedin: `Create a high-engagement LinkedIn post for Vector for Good.

**Topic:** ${topic}
**Key Points:** ${keywords}
**Target Audience:** ${targetAudience}
**Post Length:** 150-250 words (LinkedIn sweet spot)

**Requirements:**
1. Hook in first 2 lines (visible before "see more")
2. Personal or company story/anecdote
3. Specific data point or statistic
4. Insight or takeaway
5. Question or CTA to drive engagement
6. 3-5 relevant hashtags (mix of popular and niche)

**Engagement Tactics:**
- Tag relevant companies/people (suggest who to tag)
- Ask provocative question at the end
- Use 1-2 well-placed emojis
- Create "scroll-stopper" first line
- Include specific number/metric if possible

**Brand Voice:**
- Confident founder/leader voice
- Authentic and vulnerable when appropriate
- Data-driven but not dry
- Occasionally bold or contrarian
- Always professional

**Vector for Good Integration:**
- Reference QI technology naturally
- Share real metrics when relevant
- Mention Fortune 50 traction if fits
- Link to blog post, demo, or resource

**Format your response as:**
---
HOOK: [First 2 lines - the scroll stopper]

POST:
[Full LinkedIn post text]

HASHTAGS: [#hashtag1 #hashtag2 #hashtag3]

SUGGESTED_TAGS: [@Person/Company to tag]

ENGAGEMENT_PREDICTION: [Low/Medium/High with reasoning]

POST_GOALS: [What this post aims to achieve]

VARIATIONS: [2 alternative hooks to A/B test]
---`
  }

  return prompts[contentType] || prompts.blog
}

function parseGeneratedContent(content: string, contentType: string): any {
  const sections = content.split('---').filter(s => s.trim())
  const mainContent = sections[0] || content

  if (contentType === 'blog') {
    // Parse blog post structure
    const lines = mainContent.split('\n')
    const parsed = {
      title: '',
      meta_description: '',
      excerpt: '',
      category: '',
      tags: [],
      sass_level: 7,
      featured_image_suggestion: '',
      content: '',
      citations: [],
      internal_links: [],
      seo_keywords: []
    }

    let currentSection = ''
    let contentLines = []

    for (const line of lines) {
      if (line.startsWith('TITLE:')) {
        parsed.title = line.replace('TITLE:', '').trim()
      } else if (line.startsWith('META_DESCRIPTION:')) {
        parsed.meta_description = line.replace('META_DESCRIPTION:', '').trim()
      } else if (line.startsWith('EXCERPT:')) {
        parsed.excerpt = line.replace('EXCERPT:', '').trim()
      } else if (line.startsWith('CATEGORY:')) {
        parsed.category = line.replace('CATEGORY:', '').trim()
      } else if (line.startsWith('TAGS:')) {
        const tagStr = line.replace('TAGS:', '').trim()
        parsed.tags = tagStr.split(',').map(t => t.trim())
      } else if (line.startsWith('SASS_LEVEL:')) {
        parsed.sass_level = parseInt(line.replace('SASS_LEVEL:', '').trim()) || 7
      } else if (line.startsWith('FEATURED_IMAGE_SUGGESTION:')) {
        parsed.featured_image_suggestion = line.replace('FEATURED_IMAGE_SUGGESTION:', '').trim()
      } else if (line.startsWith('CONTENT:')) {
        currentSection = 'content'
      } else if (line.startsWith('CITATIONS:')) {
        currentSection = 'citations'
      } else if (line.startsWith('INTERNAL_LINKS:')) {
        currentSection = 'internal_links'
      } else if (line.startsWith('SEO_KEYWORDS_USED:')) {
        currentSection = 'keywords'
      } else if (currentSection === 'content') {
        contentLines.push(line)
      } else if (currentSection === 'citations' && line.trim()) {
        parsed.citations.push(line.trim())
      } else if (currentSection === 'internal_links' && line.trim()) {
        parsed.internal_links.push(line.trim())
      } else if (currentSection === 'keywords' && line.trim()) {
        parsed.seo_keywords = line.trim().split(',').map(k => k.trim())
      }
    }

    parsed.content = contentLines.join('\n').trim()
    return parsed
  }

  if (contentType === 'linkedin') {
    // Parse LinkedIn post structure
    const parsed = {
      hook: '',
      post: '',
      hashtags: [],
      suggested_tags: [],
      engagement_prediction: '',
      post_goals: '',
      variations: []
    }

    const lines = mainContent.split('\n')
    let currentSection = ''

    for (const line of lines) {
      if (line.startsWith('HOOK:')) {
        parsed.hook = line.replace('HOOK:', '').trim()
      } else if (line.startsWith('POST:')) {
        currentSection = 'post'
      } else if (line.startsWith('HASHTAGS:')) {
        const hashtagStr = line.replace('HASHTAGS:', '').trim()
        parsed.hashtags = hashtagStr.split(' ').filter(h => h.startsWith('#'))
      } else if (line.startsWith('SUGGESTED_TAGS:')) {
        const tagStr = line.replace('SUGGESTED_TAGS:', '').trim()
        parsed.suggested_tags = tagStr.split(',').map(t => t.trim())
      } else if (line.startsWith('ENGAGEMENT_PREDICTION:')) {
        parsed.engagement_prediction = line.replace('ENGAGEMENT_PREDICTION:', '').trim()
      } else if (line.startsWith('POST_GOALS:')) {
        parsed.post_goals = line.replace('POST_GOALS:', '').trim()
      } else if (line.startsWith('VARIATIONS:')) {
        currentSection = 'variations'
      } else if (currentSection === 'post' && line.trim()) {
        parsed.post += line + '\n'
      } else if (currentSection === 'variations' && line.trim()) {
        parsed.variations.push(line.trim())
      }
    }

    return parsed
  }

  return { raw: content }
}

function calculateSEOScore(content: any, targetKeywords: string): number {
  let score = 0
  const keywords = targetKeywords.toLowerCase().split(',').map(k => k.trim())
  const contentLower = (content.content || '').toLowerCase()

  // Title optimization (20 points)
  if (content.title && content.title.length >= 50 && content.title.length <= 60) {
    score += 10
  }
  if (keywords.some(k => content.title?.toLowerCase().includes(k))) {
    score += 10
  }

  // Meta description (15 points)
  if (content.meta_description && content.meta_description.length >= 155 && content.meta_description.length <= 160) {
    score += 15
  }

  // Keyword usage (25 points)
  keywords.forEach(keyword => {
    const count = (contentLower.match(new RegExp(keyword, 'g')) || []).length
    if (count >= 3 && count <= 7) score += 5 // Sweet spot: natural integration
  })

  // Content length (15 points)
  const wordCount = content.content.split(/\s+/).length
  if (wordCount >= 1200 && wordCount <= 2500) {
    score += 15
  }

  // Structure (15 points)
  if (content.content.includes('##')) score += 5 // Has H2 headers
  if (content.content.includes('###')) score += 5 // Has H3 headers
  if (content.citations && content.citations.length >= 3) score += 5 // Citations

  // Internal links (10 points)
  if (content.internal_links && content.internal_links.length >= 2) {
    score += 10
  }

  return Math.min(score, 100)
}

function estimateLinkedInReach(content: any): string {
  // Simple heuristic based on content quality
  const hasQuestion = content.post.includes('?')
  const hasData = /\d+%|\$\d+|€\d+/.test(content.post)
  const hasHashtags = content.hashtags && content.hashtags.length >= 3
  const hasTags = content.suggested_tags && content.suggested_tags.length > 0

  let reach = 0
  if (hasQuestion) reach += 500
  if (hasData) reach += 1000
  if (hasHashtags) reach += 300
  if (hasTags) reach += 500

  if (reach < 800) return `Low (500-1K impressions)`
  if (reach < 1500) return `Medium (1K-5K impressions)`
  return `High (5K-20K+ impressions)`
}

/* 
DEPLOYMENT INSTRUCTIONS:

1. Create Edge Function in Supabase:
   supabase functions new generate-seo-content

2. Copy this code to:
   supabase/functions/generate-seo-content/index.ts

3. Set environment variables in Supabase Dashboard:
   - EMERGENT_LLM_KEY (or OPENAI_API_KEY)
   - SUPABASE_URL (auto-set)
   - SUPABASE_SERVICE_ROLE_KEY (auto-set)

4. Deploy:
   supabase functions deploy generate-seo-content

5. Test:
   curl -X POST 'https://glgcnymigakooloqmbtk.supabase.co/functions/v1/generate-seo-content' \
     -H 'Authorization: Bearer YOUR_SUPABASE_ANON_KEY' \
     -H 'Content-Type: application/json' \
     -d '{
       "topic": "How AI Fails LGBTQ+ Communities",
       "keywords": "AI bias, LGBTQ+ safety, ESG technology",
       "content_type": "blog",
       "target_audience": "C-suite executives",
       "word_count": 1500
     }'
*/
