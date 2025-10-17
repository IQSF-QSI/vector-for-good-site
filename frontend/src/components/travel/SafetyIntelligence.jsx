import React, { useState } from 'react';
import TravelNavbar from './TravelNavbar';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import { Shield, AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';

const API_URL = process.env.REACT_APP_BACKEND_URL || '';

const SafetyIntelligence = () => {
  const { getAuthHeaders } = useAuth();
  const [searchParams, setSearchParams] = useState({
    destination: '',
    country: ''
  });
  const [safetyScore, setSafetyScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSafetyScore(null);

    try {
      const response = await axios.get(
        `${API_URL}/api/safety/safety/${encodeURIComponent(searchParams.destination)}`,
        {
          params: { country: searchParams.country },
          headers: getAuthHeaders()
        }
      );
      setSafetyScore(response.data);
    } catch (err) {
      setError('Failed to fetch safety data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadge = (score) => {
    if (score >= 80) return 'score-excellent';
    if (score >= 60) return 'score-good';
    if (score >= 40) return 'score-moderate';
    return 'score-caution';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Moderate';
    return 'Caution';
  };

  return (
    <div className="flex">
      <TravelNavbar currentPage="/corporate-travel/safety" />
      
      <div className="main-content">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Safety Intelligence</h1>
          <p className="text-gray-600 mb-6">Multi-AI powered destination safety analysis</p>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Check Destination Safety</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Destination City</label>
                    <Input
                      name="destination"
                      value={searchParams.destination}
                      onChange={handleChange}
                      placeholder="e.g., London, Dubai, Singapore"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Country</label>
                    <Input
                      name="country"
                      value={searchParams.country}
                      onChange={handleChange}
                      placeholder="e.g., United Kingdom, UAE, Singapore"
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Analyzing with AI...' : 'Get Safety Analysis'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="loading-spinner mb-4"></div>
              <p className="text-gray-600">Consulting GPT-5, Claude-4, and Gemini 2.5...</p>
            </div>
          )}

          {!loading && safetyScore && (
            <div className="space-y-6">
              {/* Overall Score */}
              <div className="safety-score-card">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">{safetyScore.destination}, {safetyScore.country}</h2>
                    <p className="text-purple-100">Multi-AI Safety Assessment</p>
                  </div>
                  <div className="text-right">
                    <div className="text-5xl font-bold mb-1">{safetyScore.overallScore}</div>
                    <span className={`score-badge ${getScoreBadge(safetyScore.overallScore)}`}>
                      {getScoreLabel(safetyScore.overallScore)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Detailed Scores */}
              <Card>
                <CardHeader>
                  <CardTitle>Safety Metrics Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">LGBTQ+ Safety</p>
                        <p className={`text-3xl font-bold ${getScoreColor(safetyScore.lgbtqSafety)}`}>
                          {safetyScore.lgbtqSafety}
                        </p>
                      </div>
                      <Shield className={`w-12 h-12 ${getScoreColor(safetyScore.lgbtqSafety)}`} />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Political Stability</p>
                        <p className={`text-3xl font-bold ${getScoreColor(safetyScore.politicalStability)}`}>
                          {safetyScore.politicalStability}
                        </p>
                      </div>
                      <CheckCircle className={`w-12 h-12 ${getScoreColor(safetyScore.politicalStability)}`} />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Health Advisory</p>
                        <p className={`text-3xl font-bold ${getScoreColor(safetyScore.healthAdvisory)}`}>
                          {safetyScore.healthAdvisory}
                        </p>
                      </div>
                      <AlertCircle className={`w-12 h-12 ${getScoreColor(safetyScore.healthAdvisory)}`} />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Crime Rate (Safety)</p>
                        <p className={`text-3xl font-bold ${getScoreColor(safetyScore.crimeRate)}`}>
                          {safetyScore.crimeRate}
                        </p>
                      </div>
                      <AlertTriangle className={`w-12 h-12 ${getScoreColor(safetyScore.crimeRate)}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Mitigation Strategies */}
              {safetyScore.mitigationStrategies && safetyScore.mitigationStrategies.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Recommended Safety Measures</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {safetyScore.mitigationStrategies.map((strategy, index) => (
                        <div key={index} className="mitigation-strategy">
                          <p className="text-sm text-white">{strategy}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Real-time Alerts */}
              {safetyScore.realTimeAlerts && safetyScore.realTimeAlerts.length > 0 && (
                <Card className="border-yellow-300">
                  <CardHeader>
                    <CardTitle className="text-yellow-700">Active Alerts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {safetyScore.realTimeAlerts.map((alert, index) => (
                        <div key={index} className="flex items-start p-3 bg-yellow-50 border border-yellow-200 rounded">
                          <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
                          <p className="text-sm text-yellow-800">{alert}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* AI Analysis */}
              {safetyScore.aiAnalysis && (
                <Card>
                  <CardHeader>
                    <CardTitle>AI Analysis Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700">{safetyScore.aiAnalysis}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      Powered by GPT-5, Claude Sonnet 4, and Gemini 2.5 Pro
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SafetyIntelligence;