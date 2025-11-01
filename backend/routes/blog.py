"""
Blog Management Routes with Sassy AI-Generated Content
"""
from fastapi import APIRouter, HTTPException, Depends, Query
from typing import List, Optional
from datetime import datetime, timezone
from pydantic import BaseModel
import os
from emergentintegrations.llm.chat import LlmChat, UserMessage
from dotenv import load_dotenv
import uuid

load_dotenv()

router = APIRouter()

# Pydantic models
class BlogPost(BaseModel):
    id: Optional[str] = None
    title: str
    slug: str
    content: str
    excerpt: str
    author: str = "KIKI QI"
    tags: List[str] = []
    category: str
    citations: List[str] = []
    featured_image: Optional[str] = None
    published: bool = True
    publish_date: Optional[str] = None
    created_at: Optional[str] = None
    updated_at: Optional[str] = None
    views: int = 0
    sass_level: int = 10  # How sassy is this article? 1-10 scale

class BlogPostCreate(BaseModel):
    title: str
    category: str
    tags: List[str] = []
    auto_generate: bool = True  # Generate content using AI
    
class BlogPostUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    excerpt: Optional[str] = None
    tags: Optional[List[str]] = None
    category: Optional[str] = None
    published: Optional[bool] = None

# In-memory storage (replace with Supabase later)
blog_posts_db = []

# AI Content Generator using GPT-5
async def generate_sassy_blog_content(title: str, category: str) -> dict:
    """
    Generate sassy blog content with ballroom vernacular and drag references
    using GPT-5 via Emergent LLM key
    """
    api_key = os.getenv("EMERGENT_LLM_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="EMERGENT_LLM_KEY not configured")
    
    # Create unique session for this generation
    session_id = f"blog_gen_{uuid.uuid4()}"
    
    # System message for KIKI's sassy style
    system_message = """You are KIKI, the fiercest Queer Intelligence writer serving LOOKS, FACTS, and SHADE.
    
Your writing style:
- SASSY and UNAPOLOGETIC with ballroom vernacular (werk, slay, serve, reading, throwing shade, category is...)
- Drag culture references (lip sync for your life, death drop, realness, eleganza)
- Ball culture terms (tens across the board, legendary children, house, voguing)
- Keep it REAL while staying professional enough for corporate readers
- Use citations and data to back up your points (you're educated AND entertaining)
- Make complex ESG and DEI topics accessible and engaging
- Call out corporate BS when you see it (but make it constructive shade)
- Empower LGBTQ+ professionals and allies

Structure your posts:
1. Hook - Grab attention with sass
2. Main content - Mix data, stories, and ballroom wisdom
3. Call to action - What should readers do with this tea?

Include 3-5 credible citations (academic journals, reputable news sources, industry reports)."""

    chat = LlmChat(
        api_key=api_key,
        session_id=session_id,
        system_message=system_message
    ).with_model("openai", "gpt-5")
    
    # Generate content based on category
    prompt = f"""Write a comprehensive blog post for Vector for Good's blog.

Title: {title}
Category: {category}

Requirements:
- 1200-1500 words
- Include specific statistics and data points
- Add 3-5 credible citations (format: [1] Source Name, "Article Title", URL)
- Use ballroom/drag references naturally (not forced)
- Address corporate decision-makers AND LGBTQ+ employees
- Make it informative, entertaining, and actionable
- End with a powerful call to action

Format your response as:
EXCERPT: [2-3 sentence summary]
CONTENT: [Full blog post in markdown]
TAGS: [5-7 relevant tags separated by commas]
CITATIONS: [Numbered list of sources]"""

    user_message = UserMessage(text=prompt)
    response = await chat.send_message(user_message)
    
    # Parse response
    lines = response.split('\n')
    excerpt = ""
    content = ""
    tags = []
    citations = []
    
    current_section = None
    for line in lines:
        if line.startswith('EXCERPT:'):
            current_section = 'excerpt'
            excerpt = line.replace('EXCERPT:', '').strip()
        elif line.startswith('CONTENT:'):
            current_section = 'content'
        elif line.startswith('TAGS:'):
            current_section = 'tags'
            tags = [t.strip() for t in line.replace('TAGS:', '').split(',')]
        elif line.startswith('CITATIONS:'):
            current_section = 'citations'
        elif current_section == 'content':
            content += line + '\n'
        elif current_section == 'citations' and line.strip():
            citations.append(line.strip())
    
    return {
        'excerpt': excerpt,
        'content': content.strip(),
        'tags': tags,
        'citations': citations
    }

@router.post("/posts", response_model=BlogPost)
async def create_blog_post(post_data: BlogPostCreate):
    """
    Create a new blog post (with optional AI generation)
    """
    try:
        # Generate slug from title
        slug = post_data.title.lower().replace(' ', '-').replace("'", '').replace('"', '')
        
        # Check if slug exists
        if any(p['slug'] == slug for p in blog_posts_db):
            raise HTTPException(status_code=400, detail="Blog post with this title already exists")
        
        # Generate content if requested
        if post_data.auto_generate:
            generated = await generate_sassy_blog_content(post_data.title, post_data.category)
            content = generated['content']
            excerpt = generated['excerpt']
            tags = post_data.tags or generated['tags']
            citations = generated['citations']
        else:
            content = ""
            excerpt = ""
            tags = post_data.tags
            citations = []
        
        # Create blog post
        new_post = {
            'id': str(uuid.uuid4()),
            'title': post_data.title,
            'slug': slug,
            'content': content,
            'excerpt': excerpt,
            'author': 'KIKI QI',
            'tags': tags,
            'category': post_data.category,
            'citations': citations,
            'featured_image': None,
            'published': True,
            'publish_date': datetime.now(timezone.utc).isoformat(),
            'created_at': datetime.now(timezone.utc).isoformat(),
            'updated_at': datetime.now(timezone.utc).isoformat(),
            'views': 0,
            'sass_level': 10
        }
        
        blog_posts_db.append(new_post)
        return BlogPost(**new_post)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create blog post: {str(e)}")

@router.get("/posts", response_model=List[BlogPost])
async def get_blog_posts(
    category: Optional[str] = None,
    tag: Optional[str] = None,
    search: Optional[str] = None,
    limit: int = Query(default=10, le=50),
    offset: int = 0
):
    """
    Get all blog posts with optional filtering
    """
    filtered_posts = blog_posts_db.copy()
    
    # Filter by category
    if category:
        filtered_posts = [p for p in filtered_posts if p['category'] == category]
    
    # Filter by tag
    if tag:
        filtered_posts = [p for p in filtered_posts if tag in p['tags']]
    
    # Search in title and content
    if search:
        search_lower = search.lower()
        filtered_posts = [
            p for p in filtered_posts 
            if search_lower in p['title'].lower() or search_lower in p['content'].lower()
        ]
    
    # Sort by publish date (newest first)
    filtered_posts.sort(key=lambda x: x['publish_date'], reverse=True)
    
    # Pagination
    paginated = filtered_posts[offset:offset + limit]
    
    return [BlogPost(**p) for p in paginated]

@router.get("/posts/{slug}", response_model=BlogPost)
async def get_blog_post(slug: str):
    """
    Get a single blog post by slug
    """
    post = next((p for p in blog_posts_db if p['slug'] == slug), None)
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    
    # Increment views
    post['views'] += 1
    
    return BlogPost(**post)

@router.put("/posts/{slug}", response_model=BlogPost)
async def update_blog_post(slug: str, post_update: BlogPostUpdate):
    """
    Update a blog post
    """
    post = next((p for p in blog_posts_db if p['slug'] == slug), None)
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    
    # Update fields
    if post_update.title:
        post['title'] = post_update.title
        post['slug'] = post_update.title.lower().replace(' ', '-')
    if post_update.content:
        post['content'] = post_update.content
    if post_update.excerpt:
        post['excerpt'] = post_update.excerpt
    if post_update.tags:
        post['tags'] = post_update.tags
    if post_update.category:
        post['category'] = post_update.category
    if post_update.published is not None:
        post['published'] = post_update.published
    
    post['updated_at'] = datetime.now(timezone.utc).isoformat()
    
    return BlogPost(**post)

@router.delete("/posts/{slug}")
async def delete_blog_post(slug: str):
    """
    Delete a blog post
    """
    global blog_posts_db
    post = next((p for p in blog_posts_db if p['slug'] == slug), None)
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    
    blog_posts_db = [p for p in blog_posts_db if p['slug'] != slug]
    
    return {"message": "Blog post deleted successfully"}

@router.get("/categories")
async def get_categories():
    """
    Get all blog categories with post counts
    """
    categories = {}
    for post in blog_posts_db:
        cat = post['category']
        if cat not in categories:
            categories[cat] = 0
        categories[cat] += 1
    
    return [{"name": k, "count": v} for k, v in categories.items()]

@router.get("/tags")
async def get_tags():
    """
    Get all blog tags with post counts
    """
    tags = {}
    for post in blog_posts_db:
        for tag in post['tags']:
            if tag not in tags:
                tags[tag] = 0
            tags[tag] += 1
    
    return [{"name": k, "count": v} for k, v in sorted(tags.items(), key=lambda x: x[1], reverse=True)]

@router.post("/generate-content-batch")
async def generate_content_batch():
    """
    Generate 40+ sassy blog articles covering all topics
    """
    # Blog topics with ballroom/drag flair
    topics = [
        # LGBTQ+ Workplace Safety (10 articles)
        {"title": "Category Is: Safe Space Realness - Creating LGBTQ+ Inclusive Workplaces", "category": "LGBTQ+ Workplace"},
        {"title": "Lip Sync For Your Job: Why Coming Out at Work Still Takes Courage", "category": "LGBTQ+ Workplace"},
        {"title": "Throwing Shade on Discrimination: Legal Protections for Queer Employees", "category": "LGBTQ+ Workplace"},
        {"title": "Werk It: How LGBTQ+ Affinity Groups Transform Company Culture", "category": "LGBTQ+ Workplace"},
        {"title": "Death Drop Into Authenticity: The Business Case for Being Out at Work", "category": "LGBTQ+ Workplace"},
        {"title": "Reading Is Fundamental: Understanding Microaggressions in the Workplace", "category": "LGBTQ+ Workplace"},
        {"title": "Serving Looks AND Respect: Dress Codes and Gender Expression", "category": "LGBTQ+ Workplace"},
        {"title": "The House of Inclusive Benefits: Healthcare for LGBTQ+ Families", "category": "LGBTQ+ Workplace"},
        {"title": "Tens Across the Board: Top Companies for LGBTQ+ Employees", "category": "LGBTQ+ Workplace"},
        {"title": "Legendary Children: LGBTQ+ Mentorship Programs That Slay", "category": "LGBTQ+ Workplace"},
        
        # ESG & QSI Metrics (10 articles)
        {"title": "Category Is: ESG Eleganza - Why Queer Safety Metrics Matter", "category": "ESG & Metrics"},
        {"title": "Serving Data Realness: The QSI Scoring Framework Explained", "category": "ESG & Metrics"},
        {"title": "The Tea on ESG: Why Fortune 500 Can't Ignore LGBTQ+ Metrics", "category": "ESG & Metrics"},
        {"title": "Receipts Please: Measuring LGBTQ+ Inclusion ROI", "category": "ESG & Metrics"},
        {"title": "Sashay Away from Rainbow Washing: Authentic ESG Reporting", "category": "ESG & Metrics"},
        {"title": "Vogue Your Values: Integrating QSI into Corporate Strategy", "category": "ESG & Metrics"},
        {"title": "The Runway to Better ESG: LGBTQ+ Inclusion as Competitive Advantage", "category": "ESG & Metrics"},
        {"title": "Category Is: Compliance Realness - LGBTQ+ Data Privacy in ESG", "category": "ESG & Metrics"},
        {"title": "Serving Intelligence: How AI Powers Queer Safety Metrics", "category": "ESG & Metrics"},
        {"title": "The House Always Wins: QSI Metrics That Drive Investment Decisions", "category": "ESG & Metrics"},
        
        # Corporate Travel Safety (10 articles)
        {"title": "Passport to Safety: LGBTQ+ Travel Risk Assessment That Slays", "category": "Travel Safety"},
        {"title": "Category Is: Safe Travels Realness - Destination Safety Scores", "category": "Travel Safety"},
        {"title": "Throwing Shade on Unsafe Destinations: When to Say No to Travel", "category": "Travel Safety"},
        {"title": "Werk Trip: Pre-Travel Safety Briefings for LGBTQ+ Employees", "category": "Travel Safety"},
        {"title": "The T on International Travel: Legal Protections by Country", "category": "Travel Safety"},
        {"title": "Death Drop Into Crisis Mode: Emergency Protocols for LGBTQ+ Travelers", "category": "Travel Safety"},
        {"title": "Serving Safety: Hotel and Accommodation Vetting for Queer Travelers", "category": "Travel Safety"},
        {"title": "Reading the Room: Cultural Intelligence for LGBTQ+ Business Travel", "category": "Travel Safety"},
        {"title": "The House of Safe Passage: Travel Insurance for LGBTQ+ Employees", "category": "Travel Safety"},
        {"title": "Category Is: Business Class Realness - Corporate Duty of Care for Queer Travelers", "category": "Travel Safety"},
        
        # DEI Best Practices (10 articles)
        {"title": "Legendary: Building DEI Programs That Actually Werk", "category": "DEI Strategy"},
        {"title": "Category Is: Executive Realness - C-Suite Commitment to LGBTQ+ Inclusion", "category": "DEI Strategy"},
        {"title": "Serving Inclusion: Pronoun Policies That Respect Gender Diversity", "category": "DEI Strategy"},
        {"title": "The Runway to Change: Implementing LGBTQ+ Ally Training", "category": "DEI Strategy"},
        {"title": "Vogue Your Budget: Funding DEI Initiatives That Make Impact", "category": "DEI Strategy"},
        {"title": "Death Drop on Bias: Unconscious Bias Training for LGBTQ+ Inclusion", "category": "DEI Strategy"},
        {"title": "The T on Trans Inclusion: Best Practices for Gender Transition Support", "category": "DEI Strategy"},
        {"title": "Throwing Shade on Tokenism: Authentic LGBTQ+ Representation in Leadership", "category": "DEI Strategy"},
        {"title": "Werk the Numbers: Tracking DEI Progress with LGBTQ+ Metrics", "category": "DEI Strategy"},
        {"title": "The House of Belonging: Creating Intersectional LGBTQ+ ERGs", "category": "DEI Strategy"},
        
        # Industry Trends & Innovation (5 articles)
        {"title": "Category Is: Tech Innovation Realness - AI for LGBTQ+ Safety Intelligence", "category": "Innovation"},
        {"title": "Serving the Future: Predictive Analytics for Queer Safety", "category": "Innovation"},
        {"title": "The Metaverse Ball: Virtual Spaces for LGBTQ+ Professional Connection", "category": "Innovation"},
        {"title": "Blockchain Realness: Secure LGBTQ+ Identity Verification", "category": "Innovation"},
        {"title": "Legendary Tech: How Fortune 50 Are Using QSI Intelligence", "category": "Innovation"},
    ]
    
    generated_count = 0
    errors = []
    
    for topic in topics:
        try:
            await create_blog_post(BlogPostCreate(
                title=topic["title"],
                category=topic["category"],
                auto_generate=True
            ))
            generated_count += 1
        except Exception as e:
            errors.append(f"Failed to generate '{topic['title']}': {str(e)}")
    
    return {
        "success": True,
        "generated": generated_count,
        "total": len(topics),
        "errors": errors if errors else None
    }
