import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/privacy.css';

const PrivacyCCPA = () => {
  const navigate = useNavigate();

  return (
    <div className="privacy-policy-container">
      <div className="privacy-header">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>
        <h1>CCPA Privacy Policy</h1>
        <p className="subtitle">California Consumer Privacy Act Compliance</p>
        <p className="last-updated">Last Updated: January 2025</p>
      </div>

      <div className="privacy-content">
        <section>
          <h2>1. Introduction</h2>
          <p>
            This California Consumer Privacy Act (CCPA) Privacy Notice applies to California residents and
            supplements our general Privacy Policy. Vector for Good is committed to providing California
            consumers with enhanced privacy rights and transparency regarding their personal information.
          </p>
        </section>

        <section>
          <h2>2. Categories of Personal Information Collected</h2>
          <p>
            In the past 12 months, we have collected the following categories of personal information from
            California consumers:
          </p>

          <div className="info-category">
            <h3>A. Identifiers</h3>
            <ul>
              <li>Real name, alias, email address</li>
              <li>Unique personal identifiers (user IDs, session IDs)</li>
              <li>IP address and device identifiers</li>
            </ul>
            <p className="business-purpose">
              <strong>Business Purpose:</strong> Account creation, authentication, service delivery
            </p>
          </div>

          <div className="info-category">
            <h3>B. Professional or Employment-Related Information</h3>
            <ul>
              <li>Company name and job title</li>
              <li>Business travel information</li>
              <li>Expense reports and corporate policy compliance data</li>
            </ul>
            <p className="business-purpose">
              <strong>Business Purpose:</strong> Corporate travel management, expense tracking
            </p>
          </div>

          <div className="info-category">
            <h3>C. Commercial Information</h3>
            <ul>
              <li>Travel booking records (flights, hotels, car rentals)</li>
              <li>Purchase history and transaction data</li>
              <li>Service usage patterns</li>
            </ul>
            <p className="business-purpose">
              <strong>Business Purpose:</strong> Service fulfillment, travel management
            </p>
          </div>

          <div className="info-category">
            <h3>D. Internet or Network Activity</h3>
            <ul>
              <li>Browsing history on our platform</li>
              <li>Search queries and interaction data</li>
              <li>KIKI QI chat conversations</li>
            </ul>
            <p className="business-purpose">
              <strong>Business Purpose:</strong> Platform improvement, AI training, customer support
            </p>
          </div>

          <div className="info-category">
            <h3>E. Geolocation Data</h3>
            <ul>
              <li>Travel destinations</li>
              <li>IP-based approximate location</li>
            </ul>
            <p className="business-purpose">
              <strong>Business Purpose:</strong> Safety intelligence, destination-specific information
            </p>
          </div>

          <div className="info-category">
            <h3>F. Inferences</h3>
            <ul>
              <li>Travel preferences and patterns</li>
              <li>Safety risk profiles</li>
              <li>Service personalization data</li>
            </ul>
            <p className="business-purpose">
              <strong>Business Purpose:</strong> Personalized recommendations, safety analysis
            </p>
          </div>
        </section>

        <section>
          <h2>3. Sources of Personal Information</h2>
          <p>We collect personal information from the following sources:</p>
          <ul>
            <li><strong>Directly from you:</strong> Account registration, profile updates, travel bookings</li>
            <li><strong>Automatically:</strong> Device and usage data through cookies and analytics</li>
            <li><strong>From your employer:</strong> Corporate travel policies and employee data (with authorization)</li>
            <li><strong>Third-party integrations:</strong> Cal.com appointments, OpenPhone interactions</li>
          </ul>
        </section>

        <section>
          <h2>4. How We Use Personal Information</h2>
          <p>We use personal information for the following business and commercial purposes:</p>
          <ul>
            <li><strong>Service Operations:</strong> Process travel bookings, manage expenses, generate safety reports</li>
            <li><strong>AI-Powered Intelligence:</strong> Create personalized safety scores using GPT-5, Claude-4, Gemini-2.5</li>
            <li><strong>Customer Support:</strong> KIKI QI assistance, human support via OpenPhone</li>
            <li><strong>Platform Enhancement:</strong> Improve features, develop new services</li>
            <li><strong>Security:</strong> Detect fraud, prevent abuse, ensure platform integrity</li>
            <li><strong>Legal Compliance:</strong> Meet regulatory requirements, respond to legal requests</li>
            <li><strong>Marketing:</strong> Send service updates (with opt-out option)</li>
          </ul>
        </section>

        <section>
          <h2>5. Sharing Personal Information</h2>
          <p>
            We share personal information with the following categories of third parties:
          </p>

          <h3>Service Providers</h3>
          <ul>
            <li><strong>Supabase:</strong> Database and authentication services</li>
            <li><strong>OpenAI, Anthropic, Google:</strong> AI-powered safety analysis</li>
            <li><strong>Cal.com:</strong> Appointment scheduling</li>
            <li><strong>OpenPhone:</strong> Communication services</li>
          </ul>

          <h3>Business Partners</h3>
          <ul>
            <li>Travel service providers (airlines, hotels, car rental companies)</li>
            <li>Payment processors</li>
          </ul>

          <p className="important-note">
            <strong>Do Not Sell Disclosure:</strong> We do NOT sell your personal information to third parties.
            We do NOT share personal information for cross-context behavioral advertising.
          </p>
        </section>

        <section>
          <h2>6. Your California Privacy Rights</h2>
          <p>
            California consumers have the following rights under CCPA:
          </p>

          <div className="ccpa-rights">
            <div className="right-card">
              <h4>🔍 Right to Know</h4>
              <p>Request disclosure of:</p>
              <ul>
                <li>Categories of personal information collected</li>
                <li>Sources from which we collected it</li>
                <li>Business/commercial purposes for collection</li>
                <li>Categories of third parties with whom we share it</li>
                <li>Specific pieces of personal information collected</li>
              </ul>
            </div>

            <div className="right-card">
              <h4>🗑️ Right to Delete</h4>
              <p>Request deletion of your personal information (subject to certain exceptions for legal compliance, security, etc.)</p>
            </div>

            <div className="right-card">
              <h4>🚫 Right to Opt-Out</h4>
              <p>Opt-out of the "sale" or "sharing" of personal information (Note: We do not sell or share)</p>
            </div>

            <div className="right-card">
              <h4>✏️ Right to Correct</h4>
              <p>Request correction of inaccurate personal information</p>
            </div>

            <div className="right-card">
              <h4>📊 Right to Limit</h4>
              <p>Limit the use of sensitive personal information (if applicable)</p>
            </div>

            <div className="right-card">
              <h4>⚖️ Right to Non-Discrimination</h4>
              <p>Not be discriminated against for exercising your CCPA rights</p>
            </div>
          </div>
        </section>

        <section>
          <h2>7. How to Exercise Your Rights</h2>
          <p>California consumers can exercise their CCPA rights through the following methods:</p>

          <div className="exercise-methods">
            <div className="method">
              <h4>📧 Email Request</h4>
              <p>Send a request to: <a href="mailto:ccpa@vectorforgood.com">ccpa@vectorforgood.com</a></p>
            </div>

            <div className="method">
              <h4>💬 KIKI QI Chat</h4>
              <p>Use our AI assistant to submit a privacy request</p>
            </div>

            <div className="method">
              <h4>📞 Phone Support</h4>
              <p>Call us via OpenPhone (available on our platform)</p>
            </div>

            <div className="method">
              <h4>🔐 Account Portal</h4>
              <p>Access and manage your data directly from your account settings</p>
            </div>
          </div>

          <h3>Verification Process</h3>
          <p>
            To protect your privacy, we must verify your identity before fulfilling requests. We will ask you to:
          </p>
          <ul>
            <li>Provide your email address associated with your account</li>
            <li>Confirm recent activity or account details</li>
            <li>For sensitive requests, provide additional verification (e.g., two-factor authentication)</li>
          </ul>

          <h3>Response Timeline</h3>
          <ul>
            <li><strong>Acknowledgment:</strong> Within 10 business days</li>
            <li><strong>Full Response:</strong> Within 45 days (may extend to 90 days for complex requests)</li>
          </ul>
        </section>

        <section>
          <h2>8. Authorized Agent</h2>
          <p>
            California consumers may designate an authorized agent to submit requests on their behalf. The
            authorized agent must:
          </p>
          <ul>
            <li>Provide proof of authorization (signed permission from the consumer)</li>
            <li>Verify their own identity</li>
            <li>Submit the consumer's verification information</li>
          </ul>
          <p>We may require direct confirmation from the consumer before processing the request.</p>
        </section>

        <section>
          <h2>9. Sensitive Personal Information</h2>
          <p>
            <strong>LGBTQ+ Identity Data:</strong> We recognize that information related to sexual orientation
            and gender identity is highly sensitive. We collect and process this information ONLY when:
          </p>
          <ul>
            <li>You explicitly provide it for safety intelligence purposes</li>
            <li>It is necessary for generating personalized safety scores</li>
            <li>You have given informed consent</li>
          </ul>
          <p className="highlight">
            This data is encrypted, access-controlled, and NEVER shared with third parties without your
            explicit consent. You can request deletion at any time.
          </p>
        </section>

        <section>
          <h2>10. Data Retention</h2>
          <p>We retain personal information for the following periods:</p>
          <ul>
            <li><strong>Account Data:</strong> While your account is active + 90 days after deletion</li>
            <li><strong>Travel Records:</strong> 7 years (tax/compliance requirements)</li>
            <li><strong>KIKI Conversations:</strong> 1 year</li>
            <li><strong>Safety Reports:</strong> Anonymized and retained indefinitely for research</li>
            <li><strong>Marketing Data:</strong> Until you opt-out or request deletion</li>
          </ul>
        </section>

        <section>
          <h2>11. Minors' Privacy</h2>
          <p>
            Our services are not intended for minors under 16. We do not knowingly sell or share personal
            information of minors under 16. If you are a parent/guardian and believe we have collected
            information from a minor, contact us immediately.
          </p>
        </section>

        <section>
          <h2>12. Financial Incentives</h2>
          <p>
            We may offer financial incentives or discounts for certain activities (e.g., newsletter signup,
            referral programs). Participation is voluntary, and you may opt-out at any time. The value of
            your data is reasonably related to the incentive offered.
          </p>
        </section>

        <section>
          <h2>13. Changes to This Policy</h2>
          <p>
            We will notify California consumers of material changes to this CCPA Privacy Notice via email
            or prominent platform notice. The "Last Updated" date will reflect the most recent revision.
          </p>
        </section>

        <section>
          <h2>14. Contact Information</h2>
          <p>For CCPA-related questions or to exercise your rights:</p>
          <ul>
            <li><strong>CCPA Requests:</strong> <a href="mailto:ccpa@vectorforgood.com">ccpa@vectorforgood.com</a></li>
            <li><strong>Privacy:</strong> <a href="mailto:privacy@vectorforgood.com">privacy@vectorforgood.com</a></li>
            <li><strong>Compliance:</strong> <a href="mailto:compliance@vectorforgood.com">compliance@vectorforgood.com</a></li>
            <li><strong>General Inquiries:</strong> <a href="mailto:hello@vectorforgood.com">hello@vectorforgood.com</a></li>
            <li><strong>KIKI QI Chat:</strong> Available on our platform</li>
          </ul>
        </section>

        <section className="shine-theory">
          <h2>15. Shine Theory Notice 💎</h2>
          <p>
            Vector for Good operates on Shine Theory: "I don't shine if you don't shine." Your privacy rights
            uplift our entire community. We're committed to transparent data practices that honor your
            autonomy and dignity.
          </p>
          <p className="sass">
            Category is: California Privacy Eleganza. We're serving compliance with ballroom realness. 💅
          </p>
        </section>

        <div className="policy-footer">
          <p>
            <strong>Vector for Good - Queer Safety Intelligence</strong><br />
            Public Benefit Corporation & 501(c)(3) | NVIDIA Inception Partner
          </p>
          <p className="do-not-sell-notice">
            <strong>DO NOT SELL MY PERSONAL INFORMATION</strong><br />
            We don't sell your information, period. But if you want to submit a formal request, 
            email <a href="mailto:ccpa@vectorforgood.com">ccpa@vectorforgood.com</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyCCPA;
