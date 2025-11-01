import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/privacy.css';

const PrivacyGDPR = () => {
  const navigate = useNavigate();

  return (
    <div className="privacy-policy-container">
      <div className="privacy-header">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>
        <h1>GDPR Privacy Policy</h1>
        <p className="last-updated">Last Updated: January 2025</p>
      </div>

      <div className="privacy-content">
        <section>
          <h2>1. Introduction</h2>
          <p>
            Vector for Good ("we," "our," or "us") is committed to protecting your personal data in accordance with
            the General Data Protection Regulation (GDPR). This policy explains how we collect, use, store, and
            protect your information when you use our Queer Safety Intelligence platform and corporate travel
            solutions.
          </p>
        </section>

        <section>
          <h2>2. Data Controller</h2>
          <p><strong>Vector for Good</strong></p>
          <p>Public Benefit Corporation & 501(c)(3) Organization</p>
          <p>NVIDIA Inception Partner</p>
          <p>Contact: <a href="mailto:privacy@vectorforgood.com">privacy@vectorforgood.com</a></p>
        </section>

        <section>
          <h2>3. Legal Basis for Processing</h2>
          <p>We process your personal data under the following legal bases:</p>
          <ul>
            <li><strong>Consent:</strong> You have given explicit consent for specific data processing activities</li>
            <li><strong>Contract:</strong> Processing is necessary to fulfill our service agreement with you</li>
            <li><strong>Legal Obligation:</strong> We must process data to comply with legal requirements</li>
            <li><strong>Legitimate Interests:</strong> Processing is necessary for our legitimate business interests, such as improving our services</li>
          </ul>
        </section>

        <section>
          <h2>4. Personal Data We Collect</h2>
          
          <h3>4.1 Account Information</h3>
          <ul>
            <li>Full name</li>
            <li>Email address</li>
            <li>Company name</li>
            <li>Job title</li>
            <li>Authentication credentials (hashed passwords)</li>
          </ul>

          <h3>4.2 Travel Data</h3>
          <ul>
            <li>Travel destinations and dates</li>
            <li>Flight, hotel, and car rental preferences</li>
            <li>Trip itineraries and bookings</li>
            <li>Expense reports and receipts</li>
          </ul>

          <h3>4.3 Safety Intelligence Data</h3>
          <ul>
            <li>Destination safety queries</li>
            <li>LGBTQ+ safety score requests</li>
            <li>Travel risk assessments</li>
            <li>Safety report views and interactions</li>
          </ul>

          <h3>4.4 Communication Data</h3>
          <ul>
            <li>KIKI QI chat conversations</li>
            <li>Support inquiries</li>
            <li>Demo requests and feedback</li>
            <li>Cal.com appointment bookings</li>
            <li>OpenPhone call interactions</li>
          </ul>

          <h3>4.5 Technical Data</h3>
          <ul>
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Device information</li>
            <li>Usage analytics and cookies</li>
          </ul>
        </section>

        <section>
          <h2>5. How We Use Your Data</h2>
          <ul>
            <li><strong>Service Delivery:</strong> Provide travel booking, safety intelligence, and expense management</li>
            <li><strong>AI-Powered Insights:</strong> Generate personalized safety scores using GPT-5, Claude-4, and Gemini-2.5</li>
            <li><strong>Communication:</strong> Send service updates, safety alerts, and support responses</li>
            <li><strong>Platform Improvement:</strong> Analyze usage patterns to enhance our services</li>
            <li><strong>Compliance:</strong> Meet legal and regulatory obligations</li>
            <li><strong>Security:</strong> Detect and prevent fraud, abuse, and security incidents</li>
          </ul>
        </section>

        <section>
          <h2>6. Third-Party Services</h2>
          <p>We use the following third-party services that may process your data:</p>
          
          <h3>6.1 Infrastructure & Database</h3>
          <ul>
            <li><strong>Supabase:</strong> Secure database and authentication (GDPR-compliant, EU servers available)</li>
          </ul>

          <h3>6.2 AI Services</h3>
          <ul>
            <li><strong>OpenAI (GPT-5):</strong> Safety analysis and KIKI QI conversations</li>
            <li><strong>Anthropic (Claude-4):</strong> Multi-AI safety verification</li>
            <li><strong>Google (Gemini-2.5 Pro):</strong> Additional AI intelligence layer</li>
          </ul>

          <h3>6.3 Communication Tools</h3>
          <ul>
            <li><strong>Cal.com:</strong> Appointment scheduling (open-source, privacy-focused)</li>
            <li><strong>OpenPhone:</strong> Human connection and support calls</li>
          </ul>

          <p className="highlight">
            All third-party processors have been vetted for GDPR compliance and data protection standards.
            Data transfers outside the EU use appropriate safeguards (Standard Contractual Clauses).
          </p>
        </section>

        <section>
          <h2>7. Your GDPR Rights</h2>
          <p>Under GDPR, you have the following rights:</p>

          <div className="rights-grid">
            <div className="right-item">
              <h4>Right to Access</h4>
              <p>Request a copy of your personal data</p>
            </div>
            <div className="right-item">
              <h4>Right to Rectification</h4>
              <p>Correct inaccurate or incomplete data</p>
            </div>
            <div className="right-item">
              <h4>Right to Erasure</h4>
              <p>Request deletion of your data ("right to be forgotten")</p>
            </div>
            <div className="right-item">
              <h4>Right to Restriction</h4>
              <p>Limit how we use your data</p>
            </div>
            <div className="right-item">
              <h4>Right to Data Portability</h4>
              <p>Receive your data in machine-readable format</p>
            </div>
            <div className="right-item">
              <h4>Right to Object</h4>
              <p>Object to processing based on legitimate interests</p>
            </div>
          </div>

          <p className="exercise-rights">
            <strong>To exercise your rights:</strong> Email <a href="mailto:privacy@vectorforgood.com">privacy@vectorforgood.com</a> with your request.
            We will respond within 30 days.
          </p>
        </section>

        <section>
          <h2>8. Data Retention</h2>
          <ul>
            <li><strong>Account Data:</strong> Retained while your account is active, plus 90 days after deletion</li>
            <li><strong>Travel Records:</strong> Retained for 7 years for tax and compliance purposes</li>
            <li><strong>KIKI Conversations:</strong> Retained for 1 year for quality improvement</li>
            <li><strong>Safety Reports:</strong> Aggregated data retained indefinitely (anonymized)</li>
            <li><strong>Analytics:</strong> Retained for 24 months</li>
          </ul>
        </section>

        <section>
          <h2>9. Data Security</h2>
          <p>We implement industry-standard security measures:</p>
          <ul>
            <li>End-to-end encryption for data in transit (TLS 1.3)</li>
            <li>Encryption at rest for all databases</li>
            <li>JWT-based authentication with bcrypt password hashing</li>
            <li>Regular security audits and penetration testing</li>
            <li>Access controls and role-based permissions</li>
            <li>24/7 security monitoring and incident response</li>
          </ul>
        </section>

        <section>
          <h2>10. Cookies and Tracking</h2>
          <p>We use the following types of cookies:</p>
          <ul>
            <li><strong>Essential Cookies:</strong> Required for authentication and security</li>
            <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
            <li><strong>Analytics Cookies:</strong> Help us understand usage patterns (with your consent)</li>
          </ul>
          <p>You can manage cookie preferences through your browser settings.</p>
        </section>

        <section>
          <h2>11. International Data Transfers</h2>
          <p>
            Your data may be transferred to and processed in countries outside the European Economic Area (EEA).
            We ensure all transfers comply with GDPR using:
          </p>
          <ul>
            <li>Standard Contractual Clauses (SCCs) approved by the European Commission</li>
            <li>Adequacy decisions for countries deemed to have adequate data protection</li>
            <li>Privacy Shield successor frameworks where applicable</li>
          </ul>
        </section>

        <section>
          <h2>12. Children's Privacy</h2>
          <p>
            Our services are not intended for individuals under 16 years of age. We do not knowingly collect
            personal data from children. If we become aware of such collection, we will delete the data promptly.
          </p>
        </section>

        <section>
          <h2>13. Data Breach Notification</h2>
          <p>
            In the event of a data breach affecting your personal data, we will:
          </p>
          <ul>
            <li>Notify relevant supervisory authorities within 72 hours</li>
            <li>Inform affected users without undue delay</li>
            <li>Provide details of the breach, potential impact, and remedial actions</li>
          </ul>
        </section>

        <section>
          <h2>14. Supervisory Authority</h2>
          <p>
            You have the right to lodge a complaint with a supervisory authority in the EU member state of
            your residence, place of work, or where an alleged infringement occurred.
          </p>
          <p>
            Find your local data protection authority: 
            <a href="https://edpb.europa.eu/about-edpb/board/members_en" target="_blank" rel="noopener noreferrer">
              European Data Protection Board
            </a>
          </p>
        </section>

        <section>
          <h2>15. Changes to This Policy</h2>
          <p>
            We may update this policy to reflect changes in our practices or legal requirements. Material
            changes will be communicated via email or prominent notice on our platform. Continued use of our
            services after changes indicates acceptance of the updated policy.
          </p>
        </section>

        <section>
          <h2>16. Contact Us</h2>
          <p>For any questions about this privacy policy or data protection:</p>
          <ul>
            <li><strong>Email:</strong> <a href="mailto:privacy@vectorforgood.com">privacy@vectorforgood.com</a></li>
            <li><strong>Data Protection Officer:</strong> <a href="mailto:dpo@vectorforgood.com">dpo@vectorforgood.com</a></li>
            <li><strong>Support:</strong> Chat with KIKI QI on our platform</li>
          </ul>
        </section>

        <div className="policy-footer">
          <p>
            <strong>Vector for Good - Queer Safety Intelligence</strong><br />
            Public Benefit Corporation & 501(c)(3) | NVIDIA Inception Partner
          </p>
          <p className="motto">
            "Serving safety intelligence with ballroom realness. Category is: Privacy Protection Eleganza." 💅
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyGDPR;
