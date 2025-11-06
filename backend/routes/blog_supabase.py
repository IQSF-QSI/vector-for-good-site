"""
Blog Management Routes with Supabase Persistence
"""
from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel
import os
from emergentintegrations.llm.chat import LlmChat, UserMessage
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

router = APIRouter()

# Supabase client
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("Supabase credentials not found in environment variables")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

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
    sass_level: int = 10

class BlogPostCreate(BaseModel):
    title: str
    category: str
    tags: List[str] = []
    content: Optional[str] = None
    excerpt: Optional[str] = None
    auto_generate: bool = True
    
class BlogPostUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    excerpt: Optional[str] = None
    tags: Optional[List[str]] = None
    category: Optional[str] = None
    published: Optional[bool] = None


# AI Content Generator using GPT-5
async def generate_sassy_blog_content(title: str, category: str) -> dict:
    """Generate sassy blog content"""
    api_key = os.getenv("EMERGENT_LLM_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="EMERGENT_LLM_KEY not configured")
    
    session_id = f"blog_gen_{datetime.now().timestamp()}"
    
    system_message = """You are KIKI, the fiercest Queer Intelligence writer serving LOOKS, FACTS, and SHADE.
    
Your writing style:
- SASSY and UNAPOLOGETIC with ballroom vernacular
- Keep it REAL while staying professional enough for corporate readers
- Use citations and data to back up your points
- Make complex ESG and DEI topics accessible and engaging

Structure your posts:
1. Hook - Grab attention with sass
2. Main content - Mix data, stories, and wisdom
3. Call to action - What should readers do with this tea?

Include 3-5 credible citations."""

    chat = LlmChat(
        api_key=api_key,
        session_id=session_id,
        system_message=system_message
    ).with_model("openai", "gpt-5")
    
    prompt = f"""Write a comprehensive blog post for Vector for Good's blog.

Title: {title}
Category: {category}

Requirements:
- 1200-1500 words
- Include specific statistics and data points
- Add 3-5 credible citations
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
    """Create a new blog post"""
    try:
        # Generate slug from title
        slug = post_data.title.lower().replace(' ', '-').replace("'", '').replace('"', '').replace('—', '-').replace('–', '-')
        
        # Check if slug exists
        existing = supabase.table('blog_posts').select('id').eq('slug', slug).execute()
        if existing.data:
            raise HTTPException(status_code=400, detail="Blog post with this slug already exists")
        
        # Generate content if requested
        if post_data.auto_generate and not post_data.content:
            generated = await generate_sassy_blog_content(post_data.title, post_data.category)
            content = generated['content']
            excerpt = generated['excerpt']
            tags = post_data.tags or generated['tags']
            citations = generated['citations']
        else:
            content = post_data.content or ""
            excerpt = post_data.excerpt or ""
            tags = post_data.tags
            citations = []
        
        # Create blog post in Supabase
        new_post = {
            'title': post_data.title,
            'slug': slug,
            'content': content,
            'excerpt': excerpt,
            'author': 'KIKI QI',
            'tags': tags,
            'category': post_data.category,
            'citations': citations,
            'published': True,
            'views': 0,
            'sass_level': 10
        }
        
        result = supabase.table('blog_posts').insert(new_post).execute()
        
        if not result.data:
            raise HTTPException(status_code=500, detail="Failed to create blog post")
        
        return BlogPost(**result.data[0])
        
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
    """Get all blog posts with optional filtering"""
    try:
        query = supabase.table('blog_posts').select('*')
        
        # Filter by published
        query = query.eq('published', True)
        
        # Filter by category
        if category:
            query = query.eq('category', category)
        
        # Filter by tag
        if tag:
            query = query.contains('tags', [tag])
        
        # Search in title and content
        if search:
            # Note: Supabase uses ilike for case-insensitive search
            query = query.or_(f'title.ilike.%{search}%,content.ilike.%{search}%')
        
        # Order by publish date (newest first)
        query = query.order('publish_date', desc=True)
        
        # Pagination
        query = query.range(offset, offset + limit - 1)
        
        result = query.execute()
        
        return [BlogPost(**post) for post in result.data]
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch blog posts: {str(e)}")


@router.get("/posts/{slug}", response_model=BlogPost)
async def get_blog_post(slug: str):
    """Get a single blog post by slug"""
    try:
        result = supabase.table('blog_posts').select('*').eq('slug', slug).single().execute()
        
        if not result.data:
            raise HTTPException(status_code=404, detail="Blog post not found")
        
        # Increment views
        supabase.table('blog_posts').update({
            'views': result.data['views'] + 1
        }).eq('slug', slug).execute()
        
        # Return with updated views
        post_data = result.data.copy()
        post_data['views'] += 1
        
        return BlogPost(**post_data)
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch blog post: {str(e)}")


@router.put("/posts/{slug}", response_model=BlogPost)
async def update_blog_post(slug: str, post_update: BlogPostUpdate):
    """Update a blog post"""
    try:
        # Check if post exists
        existing = supabase.table('blog_posts').select('*').eq('slug', slug).single().execute()
        if not existing.data:
            raise HTTPException(status_code=404, detail="Blog post not found")
        
        # Build update dict
        update_data = {}
        if post_update.title:
            update_data['title'] = post_update.title
            # Update slug too if title changes
            new_slug = post_update.title.lower().replace(' ', '-').replace("'", '').replace('"', '')
            update_data['slug'] = new_slug
        if post_update.content:
            update_data['content'] = post_update.content
        if post_update.excerpt:
            update_data['excerpt'] = post_update.excerpt
        if post_update.tags:
            update_data['tags'] = post_update.tags
        if post_update.category:
            update_data['category'] = post_update.category
        if post_update.published is not None:
            update_data['published'] = post_update.published
        
        if not update_data:
            raise HTTPException(status_code=400, detail="No fields to update")
        
        # Update in Supabase
        result = supabase.table('blog_posts').update(update_data).eq('slug', slug).execute()
        
        if not result.data:
            raise HTTPException(status_code=500, detail="Failed to update blog post")
        
        return BlogPost(**result.data[0])
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to update blog post: {str(e)}")


@router.delete("/posts/{slug}")
async def delete_blog_post(slug: str):
    """Delete a blog post"""
    try:
        # Check if post exists
        existing = supabase.table('blog_posts').select('id').eq('slug', slug).execute()
        if not existing.data:
            raise HTTPException(status_code=404, detail="Blog post not found")
        
        # Delete from Supabase
        supabase.table('blog_posts').delete().eq('slug', slug).execute()
        
        return {"message": "Blog post deleted successfully"}
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to delete blog post: {str(e)}")


@router.get("/categories")
async def get_categories():
    """Get all blog categories with post counts"""
    try:
        # Get all posts
        result = supabase.table('blog_posts').select('category').eq('published', True).execute()
        
        # Count by category
        categories = {}
        for post in result.data:
            cat = post['category']
            if cat not in categories:
                categories[cat] = 0
            categories[cat] += 1
        
        return [{"name": k, "count": v} for k, v in categories.items()]
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch categories: {str(e)}")


@router.get("/tags")
async def get_tags():
    """Get all blog tags with post counts"""
    try:
        # Get all posts
        result = supabase.table('blog_posts').select('tags').eq('published', True).execute()
        
        # Count by tag
        tags = {}
        for post in result.data:
            for tag in post.get('tags', []):
                if tag not in tags:
                    tags[tag] = 0
                tags[tag] += 1
        
        return [{"name": k, "count": v} for k, v in sorted(tags.items(), key=lambda x: x[1], reverse=True)]
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch tags: {str(e)}")
