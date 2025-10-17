import React from 'react';
import { Card } from '../ui/card';

const caseStudies = [
  {
    company: "Global Tech Corp",
    industry: "Technology",
    employees: "50,000+",
    countries: "45",
    logo: "GT",
    challenge: "Managing duty of care for 50,000 employees across 45 countries with varying LGBTQ+ legal protections.",
    solution: "Implemented Vector for Good's QI platform with real-time safety scoring and automated travel alerts.",
    results: [
      "92% reduction in LGBTQ+ employee safety incidents",
      "$2.4M annual savings from prevented incidents",
      "47% increase in employee satisfaction scores"
    ],
    metrics: [
      { value: "92%", label: "Incident Reduction" },
      { value: "$2.4M", label: "Annual Savings" },
      { value: "47%", label: "Satisfaction" }
    ]
  },
  {
    company: "Fortune 100 Financial",
    industry: "Financial Services",
    employees: "75,000+",
    countries: "60",
    logo: "FF",
    challenge: "ESG reporting required quantifiable Social metrics for LGBTQ+ inclusion.",
    solution: "Deployed QI Dashboard with automated ESG reporting integration.",
    results: [
      "First-ever quantifiable S-pillar metrics",
      "18-point increase in HRC CEI score",
      "$50M valuation premium"
    ],
    metrics: [
      { value: "18pt", label: "CEI Increase" },
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
    challenge: "High turnover among LGBTQ+ consultants due to safety concerns in client locations.",
    solution: "Integrated QI safety scores into staffing system for proactive placement decisions.",
    results: [
      "Reduced LGBTQ+ turnover from 23% to 9%",
      "$8.7M savings from reduced recruitment costs",
      "89% report feeling safer on assignments"
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
          <h2 style={{fontSize: '2.5rem', fontWeight: '800', color: '#1f2937', marginBottom: '1rem'}}>
            Real Impact for Fortune 50 Enterprises
          </h2>
          <p style={{fontSize: '1.125rem', color: '#6b7280'}}>
            See how industry leaders are transforming LGBTQ+ employee safety
          </p>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem'}}>
          {caseStudies.map((study, index) => (
            <Card key={index} className="case-study-card">
              <div className="case-study-header">
                <div className="case-study-logo">{study.logo}</div>
                <div className="case-study-meta">
                  <h3>{study.company}</h3>
                  <p>{study.industry}</p>
                </div>
              </div>

              <div className="case-study-challenge">
                <h4>Challenge</h4>
                <p style={{fontSize: '0.875rem', lineHeight: '1.6'}}>
                  {study.challenge}
                </p>
              </div>

              <div className="case-study-solution">
                <h4>Solution</h4>
                <p style={{fontSize: '0.875rem', lineHeight: '1.6'}}>
                  {study.solution}
                </p>
              </div>

              <div className="case-study-results">
                <h4>Results</h4>
                <ul style={{fontSize: '0.875rem', paddingLeft: '1.25rem'}}>
                  {study.results.map((result, idx) => (
                    <li key={idx} style={{marginBottom: '0.5rem'}}>{result}</li>
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
          ))}</div>
      </div>
    </section>
  );
};

export default CaseStudies;
