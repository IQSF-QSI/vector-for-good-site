import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import '../styles/blog.css';

const BlogListing = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const selectedCategory = searchParams.get('category');
  const selectedTag = searchParams.get('tag');
  const searchQuery = searchParams.get('search');

  useEffect(() => {
    fetchPosts();
    fetchCategories();
    fetchTags();
  }, [selectedCategory, selectedTag, searchQuery]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedCategory) params.append('category', selectedCategory);
      if (selectedTag) params.append('tag', selectedTag);
      if (searchQuery) params.append('search', searchQuery);
      params.append('limit', '50');

      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/blog/posts?${params.toString()}`
      );
      setPosts(response.data);
    } catch (error) {
      console.error('Failed to fetch blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/blog/categories`
      );
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/blog/tags`
      );
      setTags(response.data.slice(0, 20)); // Top 20 tags
    } catch (error) {
      console.error('Failed to fetch tags:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const search = formData.get('search');
    if (search) {
      setSearchParams({ search });
    }
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  return (
    <div className="blog-container">
      <Helmet>
        <title>LGBTQ+ Safety & ESG Thought Leadership | Vector for Good Blog</title>
        <meta name="description" content="Expert insights on LGBTQ+ workplace safety, ESG reporting, duty of care, and AI-powered intelligence for Fortune 50 enterprises. Written by KIKI QI." />
        <meta name="keywords" content="LGBTQ+ workplace safety blog, ESG reporting insights, duty of care articles, Queer Intelligence thought leadership, LGBTQ+ safety trends" />
      </Helmet>
      
      {/* Hero Section */}
      <div className="blog-hero">
        <div className="hero-content">
          <h1 className="blog-title">KIKI's Tea ☕💅</h1>
          <p className="blog-subtitle">
            Serving LGBTQ+ workplace intelligence with ballroom realness.<br />
            Category is: Corporate Safety Eleganza
          </p>
          <button 
            onClick={() => navigate('/')} 
            className="back-home-btn"
          >
            ← Back to Home
          </button>
        </div>
      </div>

      <div className="blog-layout">
        {/* Sidebar */}
        <aside className="blog-sidebar">
          {/* Search */}
          <div className="sidebar-section">
            <h3>Search</h3>
            <form onSubmit={handleSearch}>
              <input
                type="text"
                name="search"
                placeholder="Search articles..."
                defaultValue={searchQuery || ''}
                className="search-input"
              />
              <button type="submit" className="search-btn">Search</button>
            </form>
          </div>

          {/* Categories */}
          <div className="sidebar-section">
            <h3>Categories</h3>
            <div className="category-list">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setSearchParams({ category: cat.name })}
                  className={`category-tag ${selectedCategory === cat.name ? 'active' : ''}`}
                >
                  {cat.name} ({cat.count})
                </button>
              ))}
            </div>
          </div>

          {/* Popular Tags */}
          <div className="sidebar-section">
            <h3>Popular Tags</h3>
            <div className="tags-cloud">
              {tags.map((tag) => (
                <button
                  key={tag.name}
                  onClick={() => setSearchParams({ tag: tag.name })}
                  className={`tag-btn ${selectedTag === tag.name ? 'active' : ''}`}
                >
                  #{tag.name}
                </button>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          {(selectedCategory || selectedTag || searchQuery) && (
            <button onClick={clearFilters} className="clear-filters-btn">
              Clear All Filters
            </button>
          )}
        </aside>

        {/* Main Content */}
        <main className="blog-main">
          {/* Active Filters */}
          {(selectedCategory || selectedTag || searchQuery) && (
            <div className="active-filters">
              <span>Filtering by:</span>
              {selectedCategory && <span className="filter-badge">Category: {selectedCategory}</span>}
              {selectedTag && <span className="filter-badge">Tag: {selectedTag}</span>}
              {searchQuery && <span className="filter-badge">Search: "{searchQuery}"</span>}
            </div>
          )}

          {/* Posts Grid */}
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading KIKI's finest content...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="empty-state">
              <h2>No posts found, honey 💅</h2>
              <p>Looks like we haven't served this category yet. Check back soon!</p>
              <button onClick={clearFilters} className="primary-btn">
                View All Posts
              </button>
            </div>
          ) : (
            <div className="posts-grid">
              {posts.map((post) => (
                <Link to={`/blog/${post.slug}`} key={post.id} className="post-card">
                  <div className="post-card-header">
                    <span className="post-category">{post.category}</span>
                    <span className="sass-level">
                      Sass Level: {'💅'.repeat(Math.min(post.sass_level / 2, 5))}
                    </span>
                  </div>
                  
                  <h2 className="post-title">{post.title}</h2>
                  
                  <p className="post-excerpt">{post.excerpt}</p>
                  
                  <div className="post-meta">
                    <span className="post-author">By {post.author}</span>
                    <span className="post-date">
                      {new Date(post.publish_date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  
                  {post.tags && post.tags.length > 0 && (
                    <div className="post-tags">
                      {post.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="tag">#{tag}</span>
                      ))}
                    </div>
                  )}
                  
                  <div className="read-more">
                    Read the tea →
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default BlogListing;
