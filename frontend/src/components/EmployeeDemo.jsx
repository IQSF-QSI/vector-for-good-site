import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Link } from 'react-router-dom';
import { Globe, ArrowRight, MapPin, AlertTriangle, Shield, TrendingUp, ChevronLeft, Search } from 'lucide-react';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const EmployeeDemo = () => {
  const [qsiMetrics, setQsiMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchQSIMetrics();
  }, []);

  const fetchQSIMetrics = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API}/qsi-metrics`);
      if (response.data.success) {
        setQsiMetrics(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching QSI metrics:', error);
      toast.error('Failed to load safety data');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCities = qsiMetrics.filter(city => 
    city.cityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    city.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRatingColor = (rating) => {
    switch(rating) {
      case 'excellent': return 'text-emerald-600 bg-emerald-50';
      case 'good': return 'text-blue-600 bg-blue-50';
      case 'moderate': return 'text-orange-600 bg-orange-50';
      case 'caution': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getRatingLabel = (rating) => {
    switch(rating) {
      case 'excellent': return 'Excellent Safety';
      case 'good': return 'Good Safety';
      case 'moderate': return 'Moderate Caution';
      case 'caution': return 'High Caution';
      default: return rating;
    }
  };

  const getTrendIcon = (trend) => {
    if (trend === 'improving') return <TrendingUp className="h-4 w-4 text-emerald-500" />;
    if (trend === 'declining') return <AlertTriangle className="h-4 w-4 text-red-500" />;
    return <Shield className="h-4 w-4 text-blue-500" />;
  };

  return (
    <div className="employee-demo">
      <Helmet>
        <title>Live QSI Demo - LGBTQ+ Safety Intelligence | Vector for Good</title>
        <meta name="description" content="Try our live Queer Safety Intelligence (QSI) demo. Explore real-time LGBTQ+ safety scores for 195+ countries. See how Fortune 50 enterprises assess workplace safety and duty of care." />
        <meta name="keywords" content="QSI demo, LGBTQ+ safety scores, live demo, enterprise platform walkthrough, Queer Intelligence demo, workplace safety assessment" />
      </Helmet>
      
      {/* Header */}
      <header className="demo-header">
        <div className="demo-header-content">
          <Link to="/" className="back-link">
            <ChevronLeft className="h-5 w-5" />
            Back to Home
          </Link>
          <div className="demo-logo">
            <img 
              src="https://customer-assets.emergentagent.com/job_46189f81-3b3a-4aa4-aac3-2ab4e4427fc1/artifacts/e5ypx4zy_EEF96F90-7D62-411E-92B2-8B4BF5630EF7.PNG" 
              alt="Vector for Good Logo" 
              className="logo-img-small"
            />
          </div>
        </div>
      </header>

      <div className="demo-container">
        {/* Hero Section */}
        <section className="demo-hero">
          <Badge className="demo-badge">Employee Safety Resource</Badge>
          <h1 className="demo-title">Global LGBTQ+ Safety Index</h1>
          <p className="demo-subtitle">
            Real-time safety intelligence for LGBTQ+ travelers and employees across 19+ global cities. 
            Check safety ratings before your next business trip or relocation.
          </p>
        </section>

        {/* Search Bar */}
        <div className="search-section">
          <div className="search-wrapper">
            <Search className="search-icon" />
            <Input
              type="text"
              placeholder="Search by city or country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {/* City Grid */}
        <section className="cities-grid">
          {isLoading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading safety data...</p>
            </div>
          ) : selectedCity ? (
            // Detail View
            <div className="city-detail">
              <Button 
                variant="ghost" 
                onClick={() => setSelectedCity(null)}
                className="mb-4"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back to all cities
              </Button>
              
              <Card className="detail-card">
                <CardHeader>
                  <div className="detail-header">
                    <div>
                      <CardTitle className="detail-title">{selectedCity.cityName}</CardTitle>
                      <p className="detail-country">{selectedCity.country}</p>
                    </div>
                    <div className="detail-score-large">{selectedCity.score}</div>
                  </div>
                  <Badge className={`detail-badge ${getRatingColor(selectedCity.rating)}`}>
                    {getRatingLabel(selectedCity.rating)}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="metrics-detail">
                    <div className="metric-detail-item">
                      <div className="metric-detail-header">
                        <span className="metric-label">Legal Protection</span>
                        <span className="metric-value">{selectedCity.legalProtection}%</span>
                      </div>
                      <div className="metric-bar-large">
                        <div 
                          className="metric-fill"
                          style={{width: `${selectedCity.legalProtection}%`}}
                        ></div>
                      </div>
                      <p className="metric-description">
                        Legal rights, anti-discrimination laws, and constitutional protections
                      </p>
                    </div>

                    <div className="metric-detail-item">
                      <div className="metric-detail-header">
                        <span className="metric-label">Social Acceptance</span>
                        <span className="metric-value">{selectedCity.socialAcceptance}%</span>
                      </div>
                      <div className="metric-bar-large">
                        <div 
                          className="metric-fill"
                          style={{width: `${selectedCity.socialAcceptance}%`}}
                        ></div>
                      </div>
                      <p className="metric-description">
                        Public attitudes, community support, and cultural acceptance
                      </p>
                    </div>

                    <div className="metric-detail-item">
                      <div className="metric-detail-header">
                        <span className="metric-label">Safety Index</span>
                        <span className="metric-value">{selectedCity.safetyIndex}%</span>
                      </div>
                      <div className="metric-bar-large">
                        <div 
                          className="metric-fill"
                          style={{width: `${selectedCity.safetyIndex}%`}}
                        ></div>
                      </div>
                      <p className="metric-description">
                        Physical safety, hate crime rates, and emergency response
                      </p>
                    </div>
                  </div>

                  <div className="trend-section">
                    <div className="trend-header">
                      {getTrendIcon(selectedCity.trend)}
                      <span className="trend-label">Trend: {selectedCity.trend}</span>
                    </div>
                    <p className="trend-description">
                      {selectedCity.trend === 'improving' && 'Safety conditions have been improving over the past year.'}
                      {selectedCity.trend === 'stable' && 'Safety conditions remain consistent.'}
                      {selectedCity.trend === 'declining' && 'Safety conditions require increased vigilance.'}
                    </p>
                  </div>

                  <div className="data-source">
                    <p><strong>Data Source:</strong> {selectedCity.dataSource}</p>
                    <p><strong>Last Updated:</strong> {new Date(selectedCity.lastUpdated).toLocaleDateString()}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            // Grid View
            <div className="cities-grid-layout">
              {filteredCities.length === 0 ? (
                <div className="no-results">
                  <MapPin className="h-12 w-12 text-gray-400 mb-4" />
                  <p>No cities found matching "{searchTerm}"</p>
                </div>
              ) : (
                filteredCities.map((city, index) => (
                  <Card 
                    key={index} 
                    className="city-card"
                    onClick={() => setSelectedCity(city)}
                  >
                    <CardHeader>
                      <div className="city-card-header">
                        <div className="city-info">
                          <Globe className="h-5 w-5 text-gray-500" />
                          <div>
                            <CardTitle className="city-name">{city.cityName}</CardTitle>
                            <p className="city-country">{city.country}</p>
                          </div>
                        </div>
                        <div className={`city-score score-${city.rating}`}>
                          {city.score}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="city-metrics">
                        <div className="metric-item">
                          <span className="metric-label-small">Legal</span>
                          <div className="metric-bar-small">
                            <div className="metric-fill" style={{width: `${city.legalProtection}%`}}></div>
                          </div>
                        </div>
                        <div className="metric-item">
                          <span className="metric-label-small">Social</span>
                          <div className="metric-bar-small">
                            <div className="metric-fill" style={{width: `${city.socialAcceptance}%`}}></div>
                          </div>
                        </div>
                        <div className="metric-item">
                          <span className="metric-label-small">Safety</span>
                          <div className="metric-bar-small">
                            <div className="metric-fill" style={{width: `${city.safetyIndex}%`}}></div>
                          </div>
                        </div>
                      </div>
                      <div className="city-footer">
                        <Badge className={getRatingColor(city.rating)}>
                          {getRatingLabel(city.rating)}
                        </Badge>
                        <Button variant="ghost" size="sm" className="view-details-btn">
                          View Details <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          )}
        </section>

        {/* Info Section */}
        <section className="info-section">
          <Card className="info-card">
            <CardHeader>
              <CardTitle>How to Use This Tool</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="info-list">
                <li><strong>Before Travel:</strong> Check the safety rating for your destination city</li>
                <li><strong>For Relocation:</strong> Compare safety metrics across multiple cities</li>
                <li><strong>Emergency Planning:</strong> Review safety index scores for crisis preparedness</li>
                <li><strong>Report Concerns:</strong> Contact your HR representative if you have safety concerns</li>
              </ul>
              <div className="contact-hr">
                <p><strong>Need Support?</strong></p>
                <p>Contact your company's HR department or reach out to Vector for Good at:</p>
                <a href="mailto:hello@vectorforgood.com" className="contact-email">hello@vectorforgood.com</a>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      {/* Footer */}
      <footer className="demo-footer">
        <p>&copy; 2025 Vector for Good. Real-time LGBTQ+ safety intelligence.</p>
        <div className="demo-footer-links">
          <Link to="/">Enterprise</Link>
          <Link to="/community">Community</Link>
          <a href="mailto:hello@vectorforgood.com">Contact</a>
        </div>
      </footer>
    </div>
  );
};

export default EmployeeDemo;