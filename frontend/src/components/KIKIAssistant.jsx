import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, User, Calendar, Phone, Sparkles, PhoneCall } from 'lucide-react';
import { Button } from './ui/button';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL || '';
const OPENPHONE_API_KEY = '9FxAu3Vtm9VeZgN3UScTByDRZyuMOYWi';
const OPENPHONE_NUMBER = '+18888888888'; // Replace with actual Quo/OpenPhone number

const KIKIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hey there! I'm KIKI - your sassy but brilliant AI assistant powered by Queer Intelligence. 💜\n\nI can help you with:\n✨ Booking a demo\n🤓 Answering questions about Vector for Good\n👤 Connecting you to a human (via phone or email)\n\nWhat brings you here today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (role, content) => {
    setMessages(prev => [...prev, { role, content, timestamp: new Date() }]);
  };

  const handleQuickAction = async (action) => {
    if (action === 'book') {
      addMessage('user', 'I want to book a demo');
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addMessage('assistant', "Excellent choice! Let me help you schedule that. I'll need a few details. What's your name?");
        setShowBookingForm(true);
      }, 1000);
    } else if (action === 'questions') {
      addMessage('user', 'I have questions about Vector for Good');
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addMessage('assistant', "Fire away! I love showing off. 😎 Ask me about our AI tech, pricing, security, case studies, or anything else. I've got the receipts!");
      }, 1000);
    } else if (action === 'human') {
      addMessage('user', 'Connect me to a human');
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addMessage('assistant', "I feel replaced already! 😢 Just kidding - humans are great too.\n\nYou can reach our team:\n📞 Click to Call Now (via OpenPhone)\n📧 levi@vectorforgood.com\n🌐 vectorforgood.com\n\nOr fill out the form and they'll contact you within 24 hours!");
        setShowBookingForm(true);
      }, 1500);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    addMessage('user', userMessage);
    setInput('');
    setIsTyping(true);

    // Simple keyword-based responses (in production, this would use the LLM API)
    setTimeout(() => {
      setIsTyping(false);
      
      const lowerInput = userMessage.toLowerCase();
      
      if (lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('pricing')) {
        addMessage('assistant', "Ah, the money talk! 💰 Love it when people get straight to business.\n\nOur pricing is $5 per employee per year - yes, that's it! No hidden fees, no surprise charges. For a 10,000 employee company, that's $50K/year.\n\nBut here's the tea ☕: Our clients typically save $2-8M annually from prevented incidents and improved retention. That's a 4,000%+ ROI.\n\nWant to calculate YOUR specific ROI? I can help with that!");
      } else if (lowerInput.includes('security') || lowerInput.includes('gdpr') || lowerInput.includes('compliance')) {
        addMessage('assistant', "Security queen right here! 👑🔒\n\nWe're:\n✅ GDPR Compliant\n✅ SOC 2 Type II Certified\n✅ ISO 27001 Certified\n✅ Zero-knowledge architecture\n\nYour data is encrypted end-to-end, and we literally CAN'T see your raw travel data. It's like Fort Knox, but gayer and with better tech.\n\nNeed the technical whitepaper? Say the word!");
      } else if (lowerInput.includes('how') || lowerInput.includes('work') || lowerInput.includes('technology')) {
        addMessage('assistant', "Ooh, a tech nerd! I LOVE IT! 🤓💜\n\nWe use a 4-LLM hidden relay system:\n1️⃣ GPT-5 for contextual analysis\n2️⃣ Claude Sonnet 4 for risk assessment\n3️⃣ Gemini 2.5 Pro for validation\n4️⃣ QI Consensus for final scoring\n\nIt's like having 4 brilliant minds working together, but faster and with less drama than a group project.\n\nWe analyze 195+ countries with real-time data from 50,000+ LGBTQ+ travelers. Want the deep dive?");
      } else if (lowerInput.includes('demo') || lowerInput.includes('book') || lowerInput.includes('meeting')) {
        addMessage('assistant', "Yes! Let's get you scheduled! 📅\n\nI'll need your:\n• Name\n• Work Email\n• Company\n• What you're most excited to see\n\nShall we do this?");
        setShowBookingForm(true);
      } else if (lowerInput.includes('case stud') || lowerInput.includes('example') || lowerInput.includes('proof')) {
        addMessage('assistant', "Receipts? I got receipts! 📊\n\n💼 Global Tech Corp: 92% reduction in safety incidents, $2.4M saved annually\n🏦 Fortune 100 Financial: 18-point CEI score increase, $50M valuation premium\n🎯 International Consulting: 61% reduction in LGBTQ+ turnover, $8.7M saved\n\nThese are REAL results from Fortune 50 clients (anonymized for confidentiality, obvi).\n\nWant the full case studies?");
      } else {
        addMessage('assistant', "Great question! While I'm pretty brilliant, I want to make sure you get the perfect answer.\n\nHere's what I can definitely help with:\n📚 Pricing & ROI\n🔒 Security & Compliance\n🤖 How our AI works\n📊 Case studies\n📅 Booking a demo\n\nWhat would you like to know more about?");
      }
    }, 1200);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      company: formData.get('company'),
      message: formData.get('message') || 'Demo request via KIKI QI Assistant'
    };

    try {
      await axios.post(`${API_URL}/api/demo-requests`, data);
      setShowBookingForm(false);
      addMessage('assistant', "Boom! 💥 You're all set!\n\nOur team will reach out within 24 hours. In the meantime, feel free to keep chatting with me or check out our resources.\n\nAnything else I can help with?");
    } catch (error) {
      addMessage('assistant', "Oops! Something went wrong on my end (embarrassing 😅). Can you try emailing levi@vectorforgood.com directly? Sorry about that!");
    }
  };

  if (!isOpen) {
    return (
      <div 
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 1000
        }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          style={{
            background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
            color: 'white',
            padding: '1.25rem',
            borderRadius: '50%',
            boxShadow: '0 10px 40px rgba(236, 72, 153, 0.4)',
            width: '70px',
            height: '70px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'pulse 2s infinite'
          }}
        >
          <Sparkles className="w-8 h-8" />
        </Button>
        <div style={{
          position: 'absolute',
          bottom: '80px',
          right: '0',
          background: 'white',
          padding: '1rem 1.5rem',
          borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          whiteSpace: 'nowrap',
          fontSize: '0.875rem',
          fontWeight: '600'
        }}>
          Chat with KIKI! 💜
        </div>
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '2rem',
      right: '2rem',
      width: '420px',
      height: '600px',
      background: 'white',
      borderRadius: '20px',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 1000,
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
        color: 'white',
        padding: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
          <div style={{
            width: '48px',
            height: '48px',
            background: 'white',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Sparkles style={{width: '24px', height: '24px', color: '#ec4899'}} />
          </div>
          <div>
            <div style={{fontWeight: '700', fontSize: '1.25rem'}}>KIKI</div>
            <div style={{fontSize: '0.75rem', opacity: 0.9}}>Your Queer Intelligence Assistant</div>
          </div>
        </div>
        <button 
          onClick={() => setIsOpen(false)}
          style={{
            background: 'rgba(255,255,255,0.2)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'white'
          }}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '1.5rem',
        background: '#f9fafb'
      }}>
        {messages.map((msg, index) => (
          <div key={index} style={{
            marginBottom: '1rem',
            display: 'flex',
            justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
          }}>
            <div style={{
              maxWidth: '80%',
              background: msg.role === 'user' 
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                : 'white',
              color: msg.role === 'user' ? 'white' : '#1f2937',
              padding: '0.875rem 1.25rem',
              borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              whiteSpace: 'pre-wrap',
              lineHeight: '1.5',
              fontSize: '0.9375rem'
            }}>
              {msg.content}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div style={{display: 'flex', gap: '0.5rem', padding: '1rem'}}>
            <div style={{width: '8px', height: '8px', background: '#8b5cf6', borderRadius: '50%', animation: 'bounce 1s infinite'}}></div>
            <div style={{width: '8px', height: '8px', background: '#8b5cf6', borderRadius: '50%', animation: 'bounce 1s infinite 0.2s'}}></div>
            <div style={{width: '8px', height: '8px', background: '#8b5cf6', borderRadius: '50%', animation: 'bounce 1s infinite 0.4s'}}></div>
          </div>
        )}

        {showBookingForm && (
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            marginTop: '1rem'
          }}>
            <div style={{marginBottom: '1.5rem', textAlign: 'center'}}>
              <h4 style={{fontSize: '1rem', fontWeight: '700', marginBottom: '1rem', color: '#1f2937'}}>
                Or Call Us Directly
              </h4>
              <a 
                href={`tel:${OPENPHONE_NUMBER}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: 'white',
                  padding: '1rem 2rem',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '1rem',
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)';
                }}
              >
                <PhoneCall className="w-5 h-5" />
                Call Now via OpenPhone
              </a>
              <p style={{fontSize: '0.75rem', color: '#6b7280', marginTop: '0.5rem'}}>
                Available M-F, 9am-6pm EST
              </p>
            </div>

            <div style={{borderTop: '1px solid #e5e7eb', paddingTop: '1.5rem'}}>
              <h4 style={{fontSize: '1rem', fontWeight: '700', marginBottom: '1rem', color: '#1f2937'}}>
                Or Book a Demo
              </h4>
              <form onSubmit={handleBookingSubmit} style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <input name="name" placeholder="Your Name" required style={{padding: '0.75rem', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '0.875rem'}} />
                <input name="email" type="email" placeholder="Work Email" required style={{padding: '0.75rem', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '0.875rem'}} />
                <input name="company" placeholder="Company" required style={{padding: '0.75rem', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '0.875rem'}} />
                <textarea name="message" placeholder="What are you most interested in?" rows="2" style={{padding: '0.75rem', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '0.875rem', resize: 'none'}} />
                <Button type="submit" style={{background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)'}}>Book Demo</Button>
              </form>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      {messages.length === 1 && (
        <div style={{padding: '1rem', background: 'white', borderTop: '1px solid #e5e7eb'}}>
          <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
            <button onClick={() => handleQuickAction('book')} style={{flex: 1, padding: '0.5rem', background: '#f3f4f6', border: 'none', borderRadius: '8px', fontSize: '0.875rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'}}>
              <Calendar className="w-4 h-4" /> Book Demo
            </button>
            <button onClick={() => handleQuickAction('questions')} style={{flex: 1, padding: '0.5rem', background: '#f3f4f6', border: 'none', borderRadius: '8px', fontSize: '0.875rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'}}>
              <MessageSquare className="w-4 h-4" /> Ask Questions
            </button>
            <button onClick={() => handleQuickAction('human')} style={{flex: 1, padding: '0.5rem', background: '#f3f4f6', border: 'none', borderRadius: '8px', fontSize: '0.875rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'}}>
              <Phone className="w-4 h-4" /> Talk to Human
            </button>
          </div>
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} style={{
        padding: '1rem',
        background: 'white',
        borderTop: '1px solid #e5e7eb',
        display: 'flex',
        gap: '0.75rem'
      }}>
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          style={{
            flex: 1,
            padding: '0.75rem',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            fontSize: '0.9375rem',
            outline: 'none'
          }}
        />
        <button type="submit" style={{
          background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
          border: 'none',
          borderRadius: '12px',
          padding: '0.75rem 1.25rem',
          color: 'white',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Send className="w-5 h-5" />
        </button>
      </form>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default KIKIAssistant;