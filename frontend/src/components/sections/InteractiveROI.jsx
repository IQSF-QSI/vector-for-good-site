import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { TrendingUp, DollarSign, Users, AlertCircle } from 'lucide-react';

const InteractiveROI = () => {
  const [inputs, setInputs] = useState({
    employees: 10000,
    travelers: 2000,
    avgTripCost: 5000,
    currentIncidents: 10
  });

  const handleChange = (field, value) => {
    setInputs(prev => ({ ...prev, [field]: parseInt(value) || 0 }));
  };

  // ROI Calculations
  const incidentCost = 75000; // Average cost per safety incident
  const currentIncidentCost = inputs.currentIncidents * incidentCost;
  const projectedReduction = 0.92; // 92% reduction based on case studies
  const preventedIncidents = Math.floor(inputs.currentIncidents * projectedReduction);
  const savingsFromIncidents = preventedIncidents * incidentCost;
  
  const turnoverReduction = Math.floor(inputs.employees * 0.08 * 0.60); // 8% LGBTQ+ workforce, 60% turnover reduction
  const savingsFromRetention = turnoverReduction * 50000; // $50k cost per turnover
  
  const insuranceSavings = inputs.travelers * 50; // $50 per traveler in insurance savings
  
  const totalAnnualSavings = savingsFromIncidents + savingsFromRetention + insuranceSavings;
  const estimatedCost = inputs.employees * 5; // $5 per employee/year
  const netROI = ((totalAnnualSavings - estimatedCost) / estimatedCost * 100).toFixed(0);
  const paybackPeriod = (estimatedCost / (totalAnnualSavings / 12)).toFixed(1);

  return (
    <section style={{padding: '6rem 2rem', background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)'}}>    <div style={{maxWidth: '1200px', margin: '0 auto'}}>
        <div style={{textAlign: 'center', marginBottom: '3rem'}}>
          <div style={{
            display: 'inline-block',
            background: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#92400e',
            marginBottom: '1rem'
          }}>
            📊 Interactive Calculator
          </div>
          <h2 style={{fontSize: '2.5rem', fontWeight: '800', color: '#1f2937', marginBottom: '1rem'}}>
            Calculate Your ROI
          </h2>
          <p style={{fontSize: '1.125rem', color: '#78350f', maxWidth: '700px', margin: '0 auto'}}>
            See your potential savings with Vector for Good based on your organization's size and risk profile
          </p>
        </div>

        <div className="roi-calculator-enhanced">
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem', marginBottom: '2rem'}}>
            <div className="calculator-input-group">
              <label>Total Employees</label>
              <input 
                type="number" 
                className="calculator-input"
                value={inputs.employees}
                onChange={(e) => handleChange('employees', e.target.value)}
                min="100"
                step="1000"
              />
            </div>
            <div className="calculator-input-group">
              <label>Annual Business Travelers</label>
              <input 
                type="number" 
                className="calculator-input"
                value={inputs.travelers}
                onChange={(e) => handleChange('travelers', e.target.value)}
                min="50"
                step="100"
              />
            </div>
            <div className="calculator-input-group">
              <label>Average Trip Cost ($)</label>
              <input 
                type="number" 
                className="calculator-input"
                value={inputs.avgTripCost}
                onChange={(e) => handleChange('avgTripCost', e.target.value)}
                min="1000"
                step="500"
              />
            </div>
            <div className="calculator-input-group">
              <label>Current Annual Safety Incidents</label>
              <input 
                type="number" 
                className="calculator-input"
                value={inputs.currentIncidents}
                onChange={(e) => handleChange('currentIncidents', e.target.value)}
                min="0"
                step="1"
              />
            </div>
          </div>

          <div className="roi-results">
            <h3 style={{fontSize: '1.5rem', fontWeight: '700', color: '#065f46', marginBottom: '1.5rem', textAlign: 'center'}}>
              Your Projected Annual Savings
            </h3>
            
            <div className="roi-result-item">
              <span className="roi-result-label">
                <AlertCircle style={{display: 'inline', width: '20px', marginRight: '0.5rem'}} />
                Prevented Incidents ({preventedIncidents} incidents)
              </span>
              <span className="roi-result-value">${savingsFromIncidents.toLocaleString()}</span>
            </div>

            <div className="roi-result-item">
              <span className="roi-result-label">
                <Users style={{display: 'inline', width: '20px', marginRight: '0.5rem'}} />
                Improved Retention ({turnoverReduction} employees)
              </span>
              <span className="roi-result-value">${savingsFromRetention.toLocaleString()}</span>
            </div>

            <div className="roi-result-item">
              <span className="roi-result-label">
                <DollarSign style={{display: 'inline', width: '20px', marginRight: '0.5rem'}} />
                Insurance & Risk Mitigation
              </span>
              <span className="roi-result-value">${insuranceSavings.toLocaleString()}</span>
            </div>

            <div style={{borderTop: '3px solid #10b981', paddingTop: '1.5rem', marginTop: '1rem'}}>
              <div className="roi-result-item" style={{border: 'none'}}>
                <span style={{fontSize: '1.25rem', fontWeight: '700', color: '#065f46'}}>
                  <TrendingUp style={{display: 'inline', width: '24px', marginRight: '0.5rem'}} />
                  Total Annual Savings
                </span>
                <span style={{fontSize: '2.5rem', fontWeight: '800', color: '#10b981'}}>
                  ${totalAnnualSavings.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div style={{marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', textAlign: 'center'}}>
            <div>
              <div style={{fontSize: '2rem', fontWeight: '800', color: '#10b981'}}>{netROI}%</div>
              <div style={{fontSize: '0.875rem', color: '#6b7280'}}>Return on Investment</div>
            </div>
            <div>
              <div style={{fontSize: '2rem', fontWeight: '800', color: '#10b981'}}>{paybackPeriod}</div>
              <div style={{fontSize: '0.875rem', color: '#6b7280'}}>Months to Payback</div>
            </div>
            <div>
              <div style={{fontSize: '2rem', fontWeight: '800', color: '#10b981'}}>${estimatedCost.toLocaleString()}</div>
              <div style={{fontSize: '0.875rem', color: '#6b7280'}}>Estimated Annual Cost</div>
            </div>
          </div>

          <div style={{marginTop: '2rem', textAlign: 'center'}}>
            <Button 
              size="lg" 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}
            >
              Get Detailed ROI Report
            </Button>
          </div>
        </div>

        <p style={{fontSize: '0.875rem', color: '#78350f', textAlign: 'center', marginTop: '2rem', fontStyle: 'italic'}}>
          *Calculations based on industry averages and anonymized client data. Individual results may vary.
        </p>
      </div>
    </section>
  );
};

export default InteractiveROI;