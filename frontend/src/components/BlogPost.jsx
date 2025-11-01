import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import '../styles/blog.css';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/blog/posts/${slug}`
      );
      setPost(response.data);
      
      // Fetch related posts (same category)
      if (response.data.category) {
        const relatedResponse = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/blog/posts?category=${response.data.category}&limit=3`
        );
        // Filter out current post
        const filtered = relatedResponse.data.filter(p => p.slug !== slug);
        setRelatedPosts(filtered.slice(0, 3));
      }
    } catch (error) {
      console.error('Failed to fetch blog post:', error);
    } finally {
      setLoading(false);
    }
  };

  const sharePost = (platform) => {
    const url = window.location.href;
    const text = post.title;
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    };
    
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  if (loading) {
    return (
      <div className="blog-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading KIKI's wisdom...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="blog-container">
        <div className="empty-state">
          <h2>Post not found 🤷</h2>
          <p>This post doesn't exist or has been deleted.</p>
          <button onClick={() => navigate('/blog')} className="primary-btn">
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-post-container">
      {/* Post Header */}
      <header className="post-header">
        <button onClick={() => navigate('/blog')} className="back-btn">
          ← Back to Blog
        </button>
        
        <div className="post-header-content">
          <span className="post-category-badge">{post.category}</span>
          
          <h1 className="post-main-title">{post.title}</h1>
          
          <div className="post-metadata">
            <div className="author-info">
              <div className="author-avatar">🎭</div>
              <div>
                <div className="author-name">{post.author}</div>
                <div className="post-publish-date">
                  {new Date(post.publish_date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
              </div>
            </div>
            
            <div className="post-stats">
              <span className="stat">
                <span className="stat-icon">👁️</span> {post.views} views
              </span>
              <span className="stat">
                <span className="stat-icon">💅</span> Sass Level {post.sass_level}/10
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Post Content */}
      <article className="post-article">
        <div className="post-content-wrapper">
          <ReactMarkdown className="markdown-content">
            {post.content}
          </ReactMarkdown>

          {/* Citations */}
          {post.citations && post.citations.length > 0 && (
            <div className="citations-section">
              <h3>📚 Citations & Sources</h3>
              <p className="citations-intro">
                KIKI doesn't just serve shade, we serve receipts! Here are the sources:
              </p>
              <ol className="citations-list">
                {post.citations.map((citation, idx) => (
                  <li key={idx} className="citation-item">{citation}</li>
                ))}
              </ol>
            </div>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="post-footer-tags">
              <h4>Related Topics</h4>
              <div className="tags-list">
                {post.tags.map((tag, idx) => (
                  <Link 
                    key={idx} 
                    to={`/blog?tag=${tag}`}
                    className="footer-tag"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Share Section */}
        <div className="share-section">
          <h4>Share this tea ☕</h4>
          <div className="share-buttons">
            <button 
              onClick={() => sharePost('twitter')}
              className="share-btn twitter"
            >
              🐦 Twitter
            </button>
            <button 
              onClick={() => sharePost('linkedin')}
              className="share-btn linkedin"
            >
              💼 LinkedIn
            </button>
            <button 
              onClick={() => sharePost('facebook')}
              className="share-btn facebook"
            >
              📘 Facebook
            </button>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <aside className="related-posts">
          <h3>More from {post.category}</h3>
          <div className="related-posts-grid">
            {relatedPosts.map((relatedPost) => (
              <Link 
                key={relatedPost.id} 
                to={`/blog/${relatedPost.slug}`}
                className="related-post-card"
              >
                <span className="related-category">{relatedPost.category}</span>
                <h4>{relatedPost.title}</h4>
                <p>{relatedPost.excerpt}</p>
                <span className="read-more-link">Read more →</span>
              </Link>
            ))}
          </div>
        </aside>
      )}

      {/* CTA Section */}
      <div className="post-cta">
        <div className="cta-content">
          <h3>Ready to elevate your LGBTQ+ workplace safety?</h3>
          <p>
            Get personalized safety intelligence, travel risk assessments, and ESG metrics
            that actually serve your community.
          </p>
          <div className="cta-buttons">
            <button 
              onClick={() => navigate('/#demo')}
              className="cta-btn primary"
            >
              Request Demo
            </button>
            <button 
              onClick={() => navigate('/corporate-travel')}
              className="cta-btn secondary"
            >
              Explore Corporate Travel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
