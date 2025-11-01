import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, Eye, FileText, Mail } from 'lucide-react';

const GDPRPolicy = () => {
  return (
    <div style={{minHeight: '100vh', background: '#f9fafb'}}>
      {/* Header */}
      <header style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <h1 style={{fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem'}}>GDPR Privacy Policy</h1>
        <p style={{fontSize: '1.125rem', opacity: 0.9}}>Last Updated: October 17, 2025</p>
      </header>

      {/* Content */}
      <div style={{maxWidth: '900px', margin: '0 auto', padding: '3rem 2rem'}}>
        <div style={{background: 'white', borderRadius: '16px', padding: '3rem', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}>
          
          {/* Introduction */}
          <section style={{marginBottom: '3rem'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem'}}>
              <Shield style={{width: '32px', height: '32px', color: '#8b5cf6'}} />
              <h2 style={{fontSize: '2rem', fontWeight: '700', color: '#1f2937', margin: 0}}>Introduction</h2>
            </div>
            <p style={{fontSize: '1.125rem', lineHeight: '1.8', color: '#4b5563'}}>
              Vector for Good ("we," "us," or "our") is committed to protecting your privacy and ensuring GDPR compliance. This policy explains how we collect, use, and protect your personal data when you use our Queer Intelligence (QI) platform and related services.
            </p>
            <p style={{fontSize: '1.125rem', lineHeight: '1.8', color: '#4b5563'}}>
              <strong>Data Controller:</strong> Vector for Good, PBC<br />
              <strong>Contact:</strong> <a href="mailto:privacy@vectorforgood.com" style={{color: '#8b5cf6'}}>privacy@vectorforgood.com</a><br />
              <strong>EU Representative:</strong> Available upon request
            </p>
          </section>

          {/* Data We Collect */}
          <section style={{marginBottom: '3rem'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem'}}>
              <FileText style={{width: '32px', height: '32px', color: '#8b5cf6'}} />
              <h2 style={{fontSize: '2rem', fontWeight: '700', color: '#1f2937', margin: 0}}>1. Data We Collect</h2>
            </div>
            
            <h3 style={{fontSize: '1.5rem', fontWeight: '600', color: '#1f2937', marginTop: '2rem', marginBottom: '1rem'}}>1.1 Personal Data</h3>
            <ul style={{fontSize: '1.125rem', lineHeight: '1.8', color: '#4b5563'}}>
              <li><strong>Account Information:</strong> Name, email address, company name, job title</li>
              <li><strong>Authentication Data:</strong> Password (hashed), JWT tokens, OAuth credentials</li>
              <li><strong>Contact Information:</strong> Phone number (if provided for OpenPhone integration)</li>
              <li><strong>Profile Data:</strong> User preferences, settings, profile picture</li>
            </ul>

            <h3 style={{fontSize: '1.5rem', fontWeight: '600', color: '#1f2937', marginTop: '2rem', marginBottom: '1rem'}}>1.2 Travel & Safety Data</h3>
            <ul style={{fontSize: '1.125rem', lineHeight: '1.8', color: '#4b5563'}}>
              <li><strong>Travel Plans:</strong> Destinations, dates, booking details</li>
              <li><strong>Safety Assessments:</strong> LGBTQ+ safety scores, risk analysis</li>
              <li><strong>Expense Data:</strong> Trip expenses, receipts, reimbursement status</li>
              <li><strong>Location Data:</strong> Country, city, region (for safety scoring)</li>
            </ul>

            <h3 style={{fontSize: '1.5rem', fontWeight: '600', color: '#1f2937', marginTop: '2rem', marginBottom: '1rem'}}>1.3 AI Interaction Data</h3>
            <ul style={{fontSize: '1.125rem', lineHeight: '1.8', color: '#4b5563'}}>
              <li><strong>KIKI Conversations:</strong> Chat messages, queries, responses</li>
              <li><strong>Intent Data:</strong> User needs, booking requests, question categories</li>
              <li><strong>Session Data:</strong> Conversation timestamps, session duration</li>
            </ul>

            <h3 style={{fontSize: '1.5rem', fontWeight: '600', color: '#1f2937', marginTop: '2rem', marginBottom: '1rem'}}>1.4 Technical Data</h3>
            <ul style={{fontSize: '1.125rem', lineHeight: '1.8', color: '#4b5563'}}>
              <li><strong>Device Information:</strong> Browser type, OS, device ID</li>
              <li><strong>Usage Data:</strong> Pages viewed, features used, time on site</li>
              <li><strong>IP Address:</strong> For security and analytics</li>
              <li><strong>Cookies:</strong> Session cookies, analytics cookies</li>
            </ul>
          </section>

          {/* Legal Basis */}
          <section style={{marginBottom: '3rem'}}>
            <h2 style={{fontSize: '2rem', fontWeight: '700', color: '#1f2937', marginBottom: '1.5rem'}}>2. Legal Basis for Processing</h2>
            
            <div style={{background: '#f0fdf4', padding: '1.5rem', borderRadius: '12px', marginBottom: '1.5rem', borderLeft: '4px solid #10b981'}}>
              <h3 style={{fontSize: '1.25rem', fontWeight: '600', color: '#065f46', marginBottom: '1rem'}}>Contract Performance</h3>
              <p style={{fontSize: '1rem', color: '#064e3b', lineHeight: '1.6'}}>Processing necessary to provide our services (Article 6(1)(b) GDPR)</p>
            </div>

            <div style={{background: '#dbeafe', padding: '1.5rem', borderRadius: '12px', marginBottom: '1.5rem', borderLeft: '4px solid #3b82f6'}}>
              <h3 style={{fontSize: '1.25rem', fontWeight: '600', color: '#1e40af', marginBottom: '1rem'}}>Consent</h3>
              <p style={{fontSize: '1rem', color: '#1e3a8a', lineHeight: '1.6'}}>You consent to data processing for AI analysis, marketing communications (Article 6(1)(a) GDPR)</p>
            </div>

            <div style={{background: '#fef3c7', padding: '1.5rem', borderRadius: '12px', marginBottom: '1.5rem', borderLeft: '4px solid #f59e0b'}}>
              <h3 style={{fontSize: '1.25rem', fontWeight: '600', color: '#92400e', marginBottom: '1rem'}}>Legitimate Interests</h3>
              <p style={{fontSize: '1rem', color: '#78350f', lineHeight: '1.6'}}>Improving services, security, fraud prevention (Article 6(1)(f) GDPR)</p>
            </div>

            <div style={{background: '#fee2e2', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid #ef4444'}}>
              <h3 style={{fontSize: '1.25rem', fontWeight: '600', color: '#991b1b', marginBottom: '1rem'}}>Legal Obligation</h3>
              <p style={{fontSize: '1rem', color: '#7f1d1d', lineHeight: '1.6'}}>Compliance with laws, regulations, legal requests (Article 6(1)(c) GDPR)</p>
            </div>
          </section>

          {/* How We Use Data */}
          <section style={{marginBottom: '3rem'}}>
            <h2 style={{fontSize: '2rem', fontWeight: '700', color: '#1f2937', marginBottom: '1.5rem'}}>3. How We Use Your Data</h2>
            <ul style={{fontSize: '1.125rem', lineHeight: '1.8', color: '#4b5563'}}>
              <li><strong>Service Delivery:</strong> Provide travel safety intelligence, booking management, AI assistance</li>
              <li><strong>AI Analysis:</strong> Process data through GPT-5, Claude-4, Gemini-2.5 for safety scoring</li>
              <li><strong>Communication:</strong> Send booking confirmations, safety alerts, product updates</li>
              <li><strong>Improvement:</strong> Analyze usage patterns to enhance our services</li>
              <li><strong>Security:</strong> Detect fraud, prevent abuse, ensure platform security</li>
              <li><strong>Legal Compliance:</strong> Meet regulatory requirements, respond to legal requests</li>
              <li><strong>Research:</strong> Aggregate anonymized data for LGBTQ+ safety research (with IQSF)</li>
            </ul>
          </section>

          {/* Data Sharing */}
          <section style={{marginBottom: '3rem'}}>
            <h2 style={{fontSize: '2rem', fontWeight: '700', color: '#1f2937', marginBottom: '1.5rem'}}>4. Data Sharing & Third Parties</h2>
            
            <h3 style={{fontSize: '1.5rem', fontWeight: '600', color: '#1f2937', marginTop: '2rem', marginBottom: '1rem'}}>4.1 Service Providers</h3>
            <ul style={{fontSize: '1.125rem', lineHeight: '1.8', color: '#4b5563'}}>
              <li><strong>Supabase:</strong> Database hosting (EU data centers)</li>
              <li><strong>Emergent LLM:</strong> AI processing (GPT-5, Claude-4, Gemini-2.5)</li>
              <li><strong>Cal.com:</strong> Meeting scheduling</li>
              <li><strong>OpenPhone/Quo:</strong> Phone communications</li>
            </ul>

            <h3 style={{fontSize: '1.5rem', fontWeight: '600', color: '#1f2937', marginTop: '2rem', marginBottom: '1rem'}}>4.2 Data Transfers</h3>
            <p style={{fontSize: '1.125rem', lineHeight: '1.8', color: '#4b5563'}}>
              When data is transferred outside the EU/EEA, we ensure adequate protection through:
            </p>
            <ul style={{fontSize: '1.125rem', lineHeight: '1.8', color: '#4b5563'}}>
              <li>Standard Contractual Clauses (SCCs)</li>
              <li>EU-US Data Privacy Framework certification (where applicable)</li>
              <li>Adequacy decisions by the European Commission</li>
            </ul>

            <h3 style={{fontSize: '1.5rem', fontWeight: '600', color: '#1f2937', marginTop: '2rem', marginBottom: '1rem'}}>4.3 We Never Sell Your Data</h3>
            <p style={{fontSize: '1.125rem', lineHeight: '1.8', color: '#4b5563'}}>
              Vector for Good <strong>does not sell</strong> personal data to third parties. We only share data as described in this policy.
            </p>
          </section>

          {/* Your Rights */}
          <section style={{marginBottom: '3rem'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem'}}>
              <Eye style={{width: '32px', height: '32px', color: '#8b5cf6'}} />
              <h2 style={{fontSize: '2rem', fontWeight: '700', color: '#1f2937', margin: 0}}>5. Your GDPR Rights</h2>
            </div>
            
            <p style={{fontSize: '1.125rem', lineHeight: '1.8', color: '#4b5563', marginBottom: '1.5rem'}}>
              Under GDPR, you have the following rights:
            </p>

            <div style={{display: 'grid', gap: '1rem'}}>
              <div style={{padding: '1.25rem', background: '#f9fafb', borderRadius: '12px', border: '2px solid #e5e7eb'}}>
                <h4 style={{fontSize: '1.25rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem'}}>Right to Access (Article 15)</h4>
                <p style={{fontSize: '1rem', color: '#6b7280'}}>Request a copy of your personal data</p>
              </div>

              <div style={{padding: '1.25rem', background: '#f9fafb', borderRadius: '12px', border: '2px solid #e5e7eb'}}>
                <h4 style={{fontSize: '1.25rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem'}}>Right to Rectification (Article 16)</h4>
                <p style={{fontSize: '1rem', color: '#6b7280'}}>Correct inaccurate or incomplete data</p>
              </div>

              <div style={{padding: '1.25rem', background: '#f9fafb', borderRadius: '12px', border: '2px solid #e5e7eb'}}>
                <h4 style={{fontSize: '1.25rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem'}}>Right to Erasure (Article 17)</h4>
                <p style={{fontSize: '1rem', color: '#6b7280'}}>Request deletion of your personal data ("right to be forgotten")</p>
              </div>

              <div style={{padding: '1.25rem', background: '#f9fafb', borderRadius: '12px', border: '2px solid #e5e7eb'}}>
                <h4 style={{fontSize: '1.25rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem'}}>Right to Restriction (Article 18)</h4>
                <p style={{fontSize: '1rem', color: '#6b7280'}}>Limit how we use your data</p>
              </div>

              <div style={{padding: '1.25rem', background: '#f9fafb', borderRadius: '12px', border: '2px solid #e5e7eb'}}>
                <h4 style={{fontSize: '1.25rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem'}}>Right to Data Portability (Article 20)</h4>
                <p style={{fontSize: '1rem', color: '#6b7280'}}>Receive your data in a structured, machine-readable format</p>
              </div>

              <div style={{padding: '1.25rem', background: '#f9fafb', borderRadius: '12px', border: '2px solid #e5e7eb'}}>
                <h4 style={{fontSize: '1.25rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem'}}>Right to Object (Article 21)</h4>
                <p style={{fontSize: '1rem', color: '#6b7280'}}>Object to processing based on legitimate interests</p>
              </div>

              <div style={{padding: '1.25rem', background: '#f9fafb', borderRadius: '12px', border: '2px solid #e5e7eb'}}>
                <h4 style={{fontSize: '1.25rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem'}}>Right to Withdraw Consent (Article 7)</h4>
                <p style={{fontSize: '1rem', color: '#6b7280'}}>Withdraw consent for data processing at any time</p>
              </div>

              <div style={{padding: '1.25rem', background: '#f9fafb', borderRadius: '12px', border: '2px solid #e5e7eb'}}>
                <h4 style={{fontSize: '1.25rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem'}}>Right to Lodge a Complaint (Article 77)</h4>
                <p style={{fontSize: '1rem', color: '#6b7280'}}>File a complaint with your local supervisory authority</p>
              </div>
            </div>

            <div style={{marginTop: '2rem', padding: '1.5rem', background: '#ede9fe', borderRadius: '12px'}}>
              <p style={{fontSize: '1.125rem', fontWeight: '600', color: '#5b21b6', marginBottom: '0.5rem'}}>To Exercise Your Rights:</p>
              <p style={{fontSize: '1rem', color: '#6b21a8'}}>Email <a href="mailto:privacy@vectorforgood.com" style={{color: '#7c3aed', fontWeight: '600'}}>privacy@vectorforgood.com</a> with your request. We will respond within 30 days.</p>
            </div>
          </section>

          {/* Data Security */}
          <section style={{marginBottom: '3rem'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem'}}>
              <Lock style={{width: '32px', height: '32px', color: '#8b5cf6'}} />
              <h2 style={{fontSize: '2rem', fontWeight: '700', color: '#1f2937', margin: 0}}>6. Data Security</h2>
            </div>
            
            <p style={{fontSize: '1.125rem', lineHeight: '1.8', color: '#4b5563'}}>We implement industry-standard security measures:</p>
            <ul style={{fontSize: '1.125rem', lineHeight: '1.8', color: '#4b5563'}}>
              <li><strong>Encryption:</strong> TLS 1.3 for data in transit, AES-256 for data at rest</li>
              <li><strong>Access Controls:</strong> Role-based access, multi-factor authentication</li>
              <li><strong>Monitoring:</strong> 24/7 security monitoring and incident response</li>
              <li><strong>Audits:</strong> Regular security audits and penetration testing</li>
              <li><strong>Certifications:</strong> SOC 2 Type II, ISO 27001 compliant infrastructure</li>
            </ul>
          </section>

          {/* Data Retention */}
          <section style={{marginBottom: '3rem'}}>
            <h2 style={{fontSize: '2rem', fontWeight: '700', color: '#1f2937', marginBottom: '1.5rem'}}>7. Data Retention</h2>
            <ul style={{fontSize: '1.125rem', lineHeight: '1.8', color: '#4b5563'}}>
              <li><strong>Account Data:</strong> Retained while account is active + 2 years after deletion</li>
              <li><strong>Travel Data:</strong> Retained for 7 years (tax and compliance requirements)</li>
              <li><strong>KIKI Conversations:</strong> Retained for 1 year for service improvement</li>
              <li><strong>Analytics Data:</strong> Anonymized and retained indefinitely for research</li>
              <li><strong>Backups:</strong> Deleted data removed from backups within 90 days</li>
            </ul>
          </section>

          {/* Cookies */}
          <section style={{marginBottom: '3rem'}}>
            <h2 style={{fontSize: '2rem', fontWeight: '700', color: '#1f2937', marginBottom: '1.5rem'}}>8. Cookies & Tracking</h2>
            <p style={{fontSize: '1.125rem', lineHeight: '1.8', color: '#4b5563'}}>We use cookies for:</p>
            <ul style={{fontSize: '1.125rem', lineHeight: '1.8', color: '#4b5563'}}>
              <li><strong>Essential Cookies:</strong> Authentication, session management (required)</li>
              <li><strong>Analytics Cookies:</strong> Usage statistics, performance monitoring (consent required)</li>
              <li><strong>Preference Cookies:</strong> Save user settings, language preferences</li>
            </ul>
            <p style={{fontSize: '1.125rem', lineHeight: '1.8', color: '#4b5563'}}>You can manage cookie preferences in your browser settings.</p>
          </section>

          {/* Children's Privacy */}
          <section style={{marginBottom: '3rem'}}>
            <h2 style={{fontSize: '2rem', fontWeight: '700', color: '#1f2937', marginBottom: '1.5rem'}}>9. Children's Privacy</h2>
            <p style={{fontSize: '1.125rem', lineHeight: '1.8', color: '#4b5563'}}>
              Our services are not intended for individuals under 16 years old. We do not knowingly collect data from children. If you believe we have collected data from a child, contact us immediately at <a href="mailto:privacy@vectorforgood.com" style={{color: '#8b5cf6'}}>privacy@vectorforgood.com</a>.
            </p>
          </section>

          {/* Changes */}
          <section style={{marginBottom: '3rem'}}>
            <h2 style={{fontSize: '2rem', fontWeight: '700', color: '#1f2937', marginBottom: '1.5rem'}}>10. Policy Changes</h2>
            <p style={{fontSize: '1.125rem', lineHeight: '1.8', color: '#4b5563'}}>
              We may update this policy periodically. Material changes will be notified via:
            </p>
            <ul style={{fontSize: '1.125rem', lineHeight: '1.8', color: '#4b5563'}}>
              <li>Email notification to registered users</li>
              <li>Prominent notice on our website</li>
              <li>Updated "Last Updated" date</li>
            </ul>
          </section>

          {/* Contact */}
          <section style={{marginBottom: '3rem'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem'}}>
              <Mail style={{width: '32px', height: '32px', color: '#8b5cf6'}} />
              <h2 style={{fontSize: '2rem', fontWeight: '700', color: '#1f2937', margin: 0}}>11. Contact Information</h2>
            </div>
            
            <div style={{background: '#f3f4f6', padding: '2rem', borderRadius: '12px'}}>
              <p style={{fontSize: '1.125rem', fontWeight: '600', color: '#1f2937', marginBottom: '1rem'}}>Data Protection Officer</p>
              <p style={{fontSize: '1rem', color: '#4b5563', lineHeight: '1.6'}}>
                Vector for Good, PBC<br />
                Email: <a href="mailto:privacy@vectorforgood.com" style={{color: '#8b5cf6', fontWeight: '600'}}>privacy@vectorforgood.com</a><br />
                Email: <a href="mailto:dpo@vectorforgood.com" style={{color: '#8b5cf6', fontWeight: '600'}}>dpo@vectorforgood.com</a><br />
                Website: <a href="https://vectorforgood.com" style={{color: '#8b5cf6', fontWeight: '600'}}>vectorforgood.com</a>
              </p>
              <p style={{fontSize: '1rem', color: '#4b5563', lineHeight: '1.6', marginTop: '1rem'}}>
                <strong>EU Representative:</strong> Available upon request for EU-based users
              </p>
            </div>
          </section>

          {/* Supervisory Authority */}
          <section>
            <h2 style={{fontSize: '2rem', fontWeight: '700', color: '#1f2937', marginBottom: '1.5rem'}}>12. Supervisory Authority</h2>
            <p style={{fontSize: '1.125rem', lineHeight: '1.8', color: '#4b5563'}}>
              If you are not satisfied with our response, you have the right to lodge a complaint with your local supervisory authority:
            </p>
            <ul style={{fontSize: '1rem', lineHeight: '1.6', color: '#6b7280'}}>
              <li><strong>Ireland (Lead Authority):</strong> Data Protection Commission (dataprotection.ie)</li>
              <li><strong>UK:</strong> Information Commissioner's Office (ico.org.uk)</li>
              <li><strong>Germany:</strong> Federal Commissioner for Data Protection and Freedom of Information</li>
              <li><strong>France:</strong> Commission Nationale de l'Informatique et des Libertés (CNIL)</li>
            </ul>
            <p style={{fontSize: '1rem', color: '#6b7280', marginTop: '1rem', fontStyle: 'italic'}}>
              Find your supervisory authority: <a href="https://edpb.europa.eu/about-edpb/board/members_en" target="_blank" rel="noopener noreferrer" style={{color: '#8b5cf6'}}>EDPB Member List</a>
            </p>
          </section>

        </div>

        {/* Footer Navigation */}
        <div style={{marginTop: '3rem', textAlign: 'center'}}>
          <Link to="/privacy/ccpa" style={{
            display: 'inline-block',
            padding: '1rem 2rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            borderRadius: '12px',
            textDecoration: 'none',
            fontWeight: '600',
            marginRight: '1rem'
          }}>
            View CCPA Policy
          </Link>
          <Link to="/" style={{
            display: 'inline-block',
            padding: '1rem 2rem',
            background: 'white',
            color: '#8b5cf6',
            borderRadius: '12px',
            textDecoration: 'none',
            fontWeight: '600',
            border: '2px solid #8b5cf6'
          }}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GDPRPolicy;