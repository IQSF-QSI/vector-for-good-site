import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { MessageSquare } from 'lucide-react';

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 1000,
        animation: 'fadeIn 0.3s ease-in-out'
      }}
    >
      <Button
        onClick={scrollToContact}
        size="lg"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '1rem 1.5rem',
          borderRadius: '50px',
          boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontWeight: '600',
          fontSize: '1rem'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.4)';
        }}
      >
        <MessageSquare className="w-5 h-5" />
        Talk to KIKI QI
      </Button>
    </div>
  );
};

export default FloatingCTA;