import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

const MobileMenu = ({ items, currentPage, ctaText, ctaAction }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className="mobile-menu-button"
        aria-label="Toggle menu"
        style={{
          display: 'none',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: '0.5rem',
          color: 'white'
        }}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="mobile-menu-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
            display: 'none'
          }}
          onClick={toggleMenu}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div 
        className={`mobile-menu-drawer ${isOpen ? 'open' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          right: isOpen ? 0 : '-100%',
          width: '80%',
          maxWidth: '320px',
          height: '100vh',
          background: 'white',
          boxShadow: '-2px 0 10px rgba(0,0,0,0.1)',
          zIndex: 1000,
          transition: 'right 0.3s ease-in-out',
          overflowY: 'auto',
          display: 'none'
        }}
      >
        {/* Mobile Menu Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1.5rem',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <h2 style={{
            fontSize: '1.25rem',
            fontWeight: '700',
            color: '#1f2937'
          }}>
            Menu
          </h2>
          <button
            onClick={toggleMenu}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem'
            }}
          >
            <X className="h-6 w-6" style={{color: '#6b7280'}} />
          </button>
        </div>

        {/* Mobile Menu Items */}
        <nav style={{padding: '1rem 0'}}>
          {items.map((item, index) => (
            item.external ? (
              <a
                key={index}
                href={item.href}
                onClick={item.onClick ? (e) => { e.preventDefault(); item.onClick(); toggleMenu(); } : toggleMenu}
                style={{
                  display: 'block',
                  padding: '1rem 1.5rem',
                  color: currentPage === item.href ? '#8b5cf6' : '#4b5563',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  fontWeight: currentPage === item.href ? '600' : '500',
                  borderLeft: currentPage === item.href ? '3px solid #8b5cf6' : 'none',
                  transition: 'all 0.2s'
                }}
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={index}
                to={item.href}
                onClick={toggleMenu}
                style={{
                  display: 'block',
                  padding: '1rem 1.5rem',
                  color: currentPage === item.href ? '#8b5cf6' : '#4b5563',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  fontWeight: currentPage === item.href ? '600' : '500',
                  borderLeft: currentPage === item.href ? '3px solid #8b5cf6' : 'none',
                  transition: 'all 0.2s'
                }}
              >
                {item.label}
              </Link>
            )
          ))}
        </nav>

        {/* Mobile CTA Button */}
        {ctaText && (
          <div style={{padding: '1rem 1.5rem', borderTop: '1px solid #e5e7eb'}}>
            <Button
              onClick={() => {
                if (ctaAction) ctaAction();
                toggleMenu();
              }}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                fontWeight: '600'
              }}
            >
              {ctaText}
            </Button>
          </div>
        )}
      </div>

      {/* Mobile-specific CSS */}
      <style>{`
        @media (max-width: 768px) {
          .mobile-menu-button {
            display: block !important;
          }
          .mobile-menu-overlay {
            display: block !important;
          }
          .mobile-menu-drawer {
            display: block !important;
          }
          .nav-menu {
            display: none !important;
          }
          .demo-btn-header {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default MobileMenu;
