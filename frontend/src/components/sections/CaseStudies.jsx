import React from 'react';
import { Card } from './ui/card';
import { TrendingUp, Users, Shield, DollarSign } from 'lucide-react';

const caseStudies = [
  {
    company: "Global Tech Corp",
    industry: "Technology",
    employees: "50,000+",
    countries: "45",
    logo: "GT",
    challenge: "Managing duty of care for 50,000 employees across 45 countries with varying LGBTQ+ legal protections. Traditional risk assessments couldn't account for sexual orientation and gender identity risks, leaving 8% of workforce vulnerable.",
    solution: "Implemented Vector for Good's QI platform with real-time safety scoring, automated travel alerts, and personalized safety protocols. Integrated with existing HRIS and travel management systems via API.",
    results: [
      "92% reduction in LGBTQ+ employee safety incidents during business travel",
      "$2.4M annual savings from prevented incidents and reduced insurance claims",
      "47% increase in employee satisfaction scores among LGBTQ+ staff",
      "100% compliance with duty of care obligations across all jurisdictions"
    ],
    metrics: [
      { value: "92%", label: "Incident Reduction" },
      { value: "$2.4M", label: "Annual Savings" },
      { value: "47%", label: "Satisfaction Increase" }
    ]
  },
  {
    company: "Fortune 100 Financial",
    industry: "Financial Services",
    employees: "75,000+",
    countries: "60",
    logo: "FF",
    challenge: "ESG reporting required quantifiable Social (S) metrics for LGBTQ+ inclusion, but traditional surveys provided only lagging indicators. Needed real-time data to demonstrate impact to investors and regulatory bodies.",
    solution: "Deployed QI Dashboard for executive team with automated ESG reporting integration. Enabled real-time tracking of LGBTQ+ safety improvements across operations in 60 countries.",
    results: [
      "First-ever quantifiable S-pillar metrics in ESG reporting",
      "18-point increase in HRC Corporate Equality Index score",
      "$50M valuation premium attributed to ESG leadership by analysts",
      "Featured in 3 major ESG investment funds"
    ],
    metrics: [
      { value: "18pt", label: "CEI Score Increase" },
      { value: "$50M", label: "Valuation Premium" },
      { value: "100%", label: "ESG Compliance" }
    ]
  },
  {
    company: "International Consulting",
    industry: "Professional Services",
    employees: "35,000+",
    countries: "38",
    logo: "IC",
    challenge: "High turnover among LGBTQ+ consultants (23% vs 14% company average) due to safety concerns in client locations. Exit interviews revealed fear of discrimination and violence in certain markets.",
    solution: "Integrated QI safety scores into staffing system, enabling proactive placement decisions. Provided personalized safety briefings and local support resources for every assignment.",
    results: [
      "Reduced LGBTQ+ consultant turnover from 23% to 9% within 18 months",
      "$8.7M savings from reduced recruitment and training costs",
      "89% of LGBTQ+ consultants report feeling safer on assignments",
      "Expanded serviceable market to 12 new countries with confidence"
    ],
    metrics: [
      { value: "61%", label: "Turnover Reduction" },
      { value: "$8.7M", label: "Cost Savings" },
      { value: "89%", label: "Safety Confidence" }
    ]
  }
];

const CaseStudies = () => {
  return (
    <section className="case-studies-section">
      <div style={{maxWidth: '1200px', margin: '0 auto'}}>
        <div style={{textAlign: 'center', marginBottom: '4rem'}}>
          <div style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#92400e',
            marginBottom: '1rem'
          }}>
            📊 Proven Results
          </div>
          <h2 style={{fontSize: '2.5rem', fontWeight: '800', color: '#1f2937', marginBottom: '1rem'}}>
            Real Impact for Fortune 50 Enterprises
          </h2>
          <p style={{fontSize: '1.125rem', color: '#6b7280', maxWidth: '700px', margin: '0 auto'}}>
            See how industry leaders are transforming LGBTQ+ employee safety into measurable business outcomes
          </p>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem'}}>
          {caseStudies.map((study, index) => (
            <Card key={index} className="case-study-card">
              <div className="case-study-header">
                <div className="case-study-logo">{study.logo}</div>
                <div className="case-study-meta">
                  <h3>{study.company}</h3>
                  <p>{study.industry} • {study.employees} employees • {study.countries} countries</p>
                </div>
              </div>

              <div className="case-study-challenge">
                <h4>❌ Challenge</h4>
                <p style={{fontSize: '0.875rem', color: '#78350f', lineHeight: '1.6'}}>
                  {study.challenge}
                </p>
              </div>

              <div className="case-study-solution">
                <h4>⚡ Solution</h4>
                <p style={{fontSize: '0.875rem', color: '#1e3a8a', lineHeight: '1.6'}}>
                  {study.solution}
                </p>
              </div>

              <div className="case-study-results">
                <h4>✅ Results</h4>
                <ul style={{fontSize: '0.875rem', color: '#064e3b', paddingLeft: '1.25rem', marginBottom: '1rem'}}>
                  {study.results.map((result, idx) => (
                    <li key={idx} style={{marginBottom: '0.5rem', lineHeight: '1.6'}}>{result}</li>
                  ))}
                </ul>
                <div className="case-study-metrics">
                  {study.metrics.map((metric, idx) => (
                    <div key={idx} className="metric-box">
                      <span className="metric-value">{metric.value}</span>
                      <span className="metric-label">{metric.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div style={{textAlign: 'center', marginTop: '3rem'}}>
          <p style={{fontSize: '0.875rem', color: '#6b7280', fontStyle: 'italic'}}>
            *All case studies represent anonymized, real-world implementations with Fortune 50 clients
          </p>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;