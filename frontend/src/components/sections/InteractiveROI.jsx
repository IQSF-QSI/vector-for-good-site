import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '../ui/button';

const InteractiveROI = () => {
  const [employees, setEmployees] = useState(10000);
  const totalSavings = Math.floor(employees * 240);
  const cost = employees * 5;
  const roi = Math.floor((totalSavings / cost) * 100);

  return (
    <>
      <Helmet>
        <title>Calculate LGBTQ+ Safety ROI | ESG Impact Calculator | Vector for Good</title>
        <meta name="description" content="Discover your enterprise's savings and ESG performance with our LGBTQ+ Safety ROI Calculator. Measure real business impact and compliance results instantly." />
        <meta property="og:title" content="LGBTQ+ Safety ROI Calculator | ESG Impact Results" />
        <meta property="og:description" content="See how Vector for Good's calculator quantifies cost savings, workforce impact, and regulatory ROI for LGBTQ+ safety." />
        <meta property="og:image" content="https://customer-assets.emergentagent.com/job_46189f81-3b3a-4aa4-aac3-2ab4e4427fc1/artifacts/e5ypx4zy_EEF96F90-7D62-411E-92B2-8B4BF5630EF7.PNG" />
        <meta property="og:url" content="https://vectorforgood.com/#roi-calculator" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="LGBTQ+ Safety ROI Calculator | ESG Impact Results" />
        <meta name="twitter:description" content="Calculate your company's savings from safer LGBTQ+ workplaces. Real ROI, real impact." />
        <meta name="twitter:image" content="https://customer-assets.emergentagent.com/job_46189f81-3b3a-4aa4-aac3-2ab4e4427fc1/artifacts/e5ypx4zy_EEF96F90-7D62-411E-92B2-8B4BF5630EF7.PNG" />
        <link rel="canonical" href="https://vectorforgood.com/#roi-calculator" />
      </Helmet>
      <section style={{padding: '6rem 2rem', background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)'}}>      <div style={{maxWidth: '1200px', margin: '0 auto'}}>
        <h2 style={{fontSize: '2.5rem', fontWeight: '800', textAlign: 'center', marginBottom: '3rem'}}>Calculate Your ROI</h2>
        
        <div style={{background: 'white', padding: '3rem', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)'}}>
          <label style={{display: 'block', marginBottom: '1rem', fontWeight: '600'}}>Total Employees</label>
          <input 
            type="number" 
            value={employees}
            onChange={(e) => setEmployees(parseInt(e.target.value) || 0)}
            style={{width: '100%', padding: '1rem', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem', marginBottom: '2rem'}}
          />
          
          <div style={{background: '#f0fdf4', padding: '2rem', borderRadius: '12px'}}>
            <h3 style={{fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem', textAlign: 'center'}}>Your Projected Savings</h3>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', textAlign: 'center'}}>
              <div>
                <div style={{fontSize: '2rem', fontWeight: '800', color: '#10b981'}}>${totalSavings.toLocaleString()}</div>
                <div style={{fontSize: '0.875rem', color: '#6b7280'}}>Annual Savings</div>
              </div>
              <div>
                <div style={{fontSize: '2rem', fontWeight: '800', color: '#10b981'}}>{roi}%</div>
                <div style={{fontSize: '0.875rem', color: '#6b7280'}}>ROI</div>
              </div>
              <div>
                <div style={{fontSize: '2rem', fontWeight: '800', color: '#10b981'}}>${cost.toLocaleString()}</div>
                <div style={{fontSize: '0.875rem', color: '#6b7280'}}>Annual Cost</div>
              </div>
            </div>
          </div>
          
          <div style={{marginTop: '2rem', textAlign: 'center'}}>
            <Button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Get Detailed ROI Report
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveROI;