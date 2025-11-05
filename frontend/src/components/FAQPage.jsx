import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import '../styles/faq.css';

const faqs = [
  {
    category: "Platform & Technology",
    questions: [
      {
        question: "What is Vector for Good?",
        answer: "Vector for Good is the world's first enterprise-grade Queer Safety Intelligence (QSI) platform. We provide real-time, quantifiable LGBTQ+ workplace safety metrics, travel risk assessment, and ESG social impact data using our proprietary 4-LLM AI system. Think of us as your organization's safety intelligence partner for protecting LGBTQ+ employees globally."
      },
      {
        question: "What is Queer Intelligence (QI) and how does it work?",
        answer: "Queer Intelligence is our proprietary AI framework powered by a 4-LLM relay system (GPT-5, Claude-4, Gemini-2.5, and specialized models). Unlike generic AI, our system is trained on lived LGBTQ+ experiences, peer-reviewed safety data, legal frameworks across 195+ countries, and real-time cultural context. It's the only AI built BY queer people FOR queer safety."
      },
      {
        question: "How does Vector for Good measure LGBTQ+ safety?",
        answer: "We provide quantifiable safety scores (0-100) based on legal protections, cultural climate, healthcare access, incident data, and real-time risk factors. Our QSI metrics are the industry standard for measuring the 'S' (Social) in ESG reporting—finally giving you numbers that matter, not just good intentions."
      },
      {
        question: "What makes your platform different from other ESG solutions?",
        answer: "Honey, we don't do generic ESG theater. We solve the 'unmeasurable S problem' with actual quantifiable metrics specific to LGBTQ+ safety. While others give you vague diversity scores, we deliver: real-time risk alerts, predictive incident analysis, duty of care compliance tracking, and ROI-backed safety intelligence. Plus, we're a Public Benefit Corporation—our mission is baked into our legal structure."
      }
    ]
  },
  {
    category: "Corporate Travel & Safety",
    questions: [
      {
        question: "How does Vector for Good help with corporate travel safety for LGBTQ+ employees?",
        answer: "Our Corporate Travel Intelligence provides pre-travel safety scores for 195+ countries, real-time risk alerts, hotel/accommodation vetting, emergency protocols, and legal protection summaries. We help you fulfill duty of care obligations while empowering LGBTQ+ employees to travel safely—or exercise their right to decline unsafe assignments."
      },
      {
        question: "What is duty of care and why does it matter for LGBTQ+ employees?",
        answer: "Duty of care is your legal obligation to keep employees safe during work-related travel. For LGBTQ+ employees, this means assessing risks in countries where being queer is criminalized (72 countries as of 2024), providing emergency support, and having insurance that covers discrimination-related incidents. Failing this duty can cost $150M+ in liability. We help you get it right."
      },
      {
        question: "Can employees decline travel to unsafe destinations?",
        answer: "Absolutely. Our platform provides documented safety assessments that support employees' right to refuse unsafe travel. We help HR and legal teams create policies that protect both the company and the employee—because no one should risk their safety for a business trip."
      }
    ]
  },
  {
    category: "ESG & Compliance",
    questions: [
      {
        question: "How does Vector for Good help with ESG reporting requirements?",
        answer: "We provide quantifiable 'S' (Social) metrics that meet SEC, EU CSRD, and investor ESG requirements. Our dashboard delivers: LGBTQ+ inclusion scores, incident reduction metrics, retention data, and policy compliance tracking. Investors managing $35 trillion in ESG assets are demanding this data—we deliver it in real-time."
      },
      {
        question: "Is Vector for Good compliant with privacy regulations (GDPR, CCPA)?",
        answer: "Yes! We're GDPR, CCPA, SOC2, and ISO 27001 compliant. We use zero-knowledge encryption, meaning your sensitive LGBTQ+ employee data is protected with military-grade security. Your privacy isn't negotiable—we built compliance into our foundation."
      },
      {
        question: "What ROI can we expect from implementing Vector for Good?",
        answer: "Our Fortune 50 clients see: 61-92% reduction in LGBTQ+ safety incidents, $2.4M-$8.7M annual savings from prevented incidents and reduced turnover, 18-47% increase in employee satisfaction scores, and $50M+ valuation premiums from improved ESG ratings. The real question is: what's the cost of NOT protecting your people?"
      }
    ]
  },
  {
    category: "Implementation & Pricing",
    questions: [
      {
        question: "How long does implementation take?",
        answer: "Most enterprise implementations take 4-8 weeks from contract signing to full deployment. This includes: data integration with your HRIS/travel systems, customized policy configuration, team training, and dashboard setup. We provide white-glove onboarding because getting safety right matters."
      },
      {
        question: "What size organizations do you work with?",
        answer: "We serve Fortune 50 enterprises, mid-market companies, universities, and any organization with duty of care responsibilities. If you have LGBTQ+ employees traveling internationally or operating in multiple jurisdictions, we can help—whether you're 500 or 50,000 employees."
      },
      {
        question: "How is Vector for Good priced?",
        answer: "Pricing is based on organization size, number of users, and feature requirements. We offer: Enterprise licenses (Fortune 500), Mid-market packages, and Academic/Nonprofit pricing. Contact us for a customized quote—and remember, the average cost of ONE discrimination lawsuit is $160K. We're an investment in prevention."
      }
    ]
  },
  {
    category: "KIKI AI Assistant",
    questions: [
      {
        question: "Who (or what) is KIKI?",
        answer: "KIKI is our sassy AI assistant with ballroom vernacular and zero patience for discrimination. Powered by GPT-5, KIKI helps employees get instant safety information, book appointments with our team, and connect with human support. Think of KIKI as your fiercest advocate in digital form. 💅"
      },
      {
        question: "Can KIKI replace human support?",
        answer: "No, honey. KIKI is here to complement our human team, not replace them. For complex safety situations, legal questions, or when you need a real person, KIKI connects you directly to our experts. AI is powerful, but some things need human empathy and expertise."
      }
    ]
  },
  {
    category: "Social Impact & Mission",
    questions: [
      {
        question: "How does Vector for Good support the LGBTQ+ community beyond technology?",
        answer: "We're a Public Benefit Corporation (PBC) and 501(c)(3) nonprofit, which means social impact is legally required, not just marketing. We donate 10% of revenue to grassroots LGBTQ+ organizations globally via the International Queer Safety Foundation (IQSF), maintain the world's largest LGBTQ+ safety dataset (open to researchers), and provide free access to advocacy organizations."
      },
      {
        question: "What is the International Queer Safety Foundation (IQSF)?",
        answer: "IQSF is our nonprofit arm that funds global LGBTQ+ safety research, supports grassroots advocacy organizations, and maintains open-access safety data for researchers. 10% of every dollar you spend with us goes directly to protecting queer people worldwide. Profit with purpose, baby."
      },
      {
        question: "Are you really NVIDIA Inception partners?",
        answer: "Yes! We're part of NVIDIA Inception, which provides us with cutting-edge AI infrastructure and expertise to power our 4-LLM system. We're also backed by leading impact investors who believe technology can—and should—protect vulnerable communities."
      }
    ]
  },
  {
    category: "Security & Data",
    questions: [
      {
        question: "How do you protect sensitive LGBTQ+ employee data?",
        answer: "We use: zero-knowledge encryption (we literally cannot see your unencrypted data), SOC2 Type II and ISO 27001 certification, end-to-end encrypted data transmission (TLS 1.3), role-based access controls, and regular third-party security audits. Your employees' identities are sacred—we protect them accordingly."
      },
      {
        question: "Do you sell or share user data?",
        answer: "NEVER. We do not sell, share, or use your data for advertising. Our business model is enterprise licensing, not data exploitation. This is explicitly stated in our legal structure as a Public Benefit Corporation. Your data stays yours, period."
      }
    ]
  },
  {
    category: "Getting Started",
    questions: [
      {
        question: "How do I request a demo?",
        answer: "Easy! Click 'Request Demo' on our homepage, chat with KIKI (our AI assistant), or email hello@vectorforgood.com. We'll schedule a personalized demo where we show you our platform in action with your organization's specific use cases. No sales pressure, just solutions."
      },
      {
        question: "Can we try Vector for Good before committing?",
        answer: "Yes! We offer pilot programs for qualifying organizations. This lets you test the platform with a subset of users, see real ROI data, and ensure it fits your needs before full deployment. We want you to be confident this is the right investment."
      },
      {
        question: "What support do you provide after implementation?",
        answer: "We provide: 24/7 technical support for critical issues, dedicated customer success manager, quarterly business reviews, ongoing training and onboarding for new team members, platform updates and new features at no extra cost, and access to our safety research team. You're not just buying software—you're gaining a partner."
      }
    ]
  }
];

const FAQPage = () => {
  const [openItems, setOpenItems] = useState({});

  const toggleQuestion = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="faq-page">
      <div className="faq-hero">
        <h1>Frequently Asked Questions</h1>
        <p>Everything you need to know about Queer Safety Intelligence</p>
      </div>

      <div className="faq-container">
        {faqs.map((category, catIndex) => (
          <div key={catIndex} className="faq-category">
            <h2 className="faq-category-title">{category.category}</h2>
            <div className="faq-questions">
              {category.questions.map((item, qIndex) => {
                const key = `${catIndex}-${qIndex}`;
                const isOpen = openItems[key];
                
                return (
                  <div key={qIndex} className="faq-item">
                    <button
                      className="faq-question"
                      onClick={() => toggleQuestion(catIndex, qIndex)}
                      aria-expanded={isOpen}
                    >
                      <span>{item.question}</span>
                      {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                    {isOpen && (
                      <div className="faq-answer">
                        <p>{item.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div className="faq-cta">
          <h3>Still have questions?</h3>
          <p>Our team is here to help. Chat with KIKI or reach out directly.</p>
          <div className="faq-cta-buttons">
            <a href="mailto:hello@vectorforgood.com" className="faq-btn primary">
              Email Us
            </a>
            <a href="/#demo" className="faq-btn secondary">
              Request Demo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
