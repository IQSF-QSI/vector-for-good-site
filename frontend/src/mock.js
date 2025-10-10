import { Shield, Globe, Users, Brain, Zap, Target, TrendingUp, Award } from 'lucide-react';

export const MOCK_DATA = {
  heroStats: [
    { value: '19+', label: 'Global Cities Tracked' },
    { value: '4 LLMs', label: 'Collaborative Intelligence' },
    { value: '27%', label: 'Talent Retention Increase' }
  ],

  qiAdvantages: [
    {
      icon: <Brain className="h-8 w-8" />,
      title: 'Multi-LLM Collaboration',
      description: 'Four specialized AI models (GPT-4, Gemini, Hermes, Mistral) deliberate together, creating insights no single AI can match.'
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: 'Cultural Nuance Detection',
      description: 'Recognizes subtle signals of discrimination, exclusion, and authentic inclusion that standard AI misses entirely.'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Intersectional Analysis',
      description: 'Understands how gender, race, sexuality, and ability intersect to create unique experiences and risks.'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Built By Queer For Queer',
      description: 'Authentic understanding from lived experience, not algorithmic approximation. PBC structure ensures community benefit through IQSF (501c3).'
    }
  ],

  qiProcess: [
    {
      title: 'Query Distribution',
      description: 'Your ESG question is simultaneously sent to four specialized LLM models, each approaching from different analytical perspectives.'
    },
    {
      title: 'Independent Analysis',
      description: 'Each model independently analyzes data using its unique training, biases, and reasoning patterns—mimicking diverse team members.'
    },
    {
      title: 'Hidden Relay Deliberation',
      description: 'Models engage in structured debate through our proprietary relay system, challenging assumptions and refining insights.'
    },
    {
      title: 'Consensus Synthesis',
      description: 'QI synthesizes the deliberation into actionable intelligence, highlighting consensus, outliers, and confidence levels.'
    }
  ],

  fortune50Solutions: [
    {
      icon: <Globe className="h-8 w-8 text-blue-500" />,
      title: 'Global Workforce Safety & Mobility',
      description: 'Real-time risk assessment and duty of care compliance for LGBTQ+ employees worldwide.',
      features: [
        'Live QSI scores for 19+ cities with executive briefings',
        'Comprehensive relocation intelligence and planning',
        'Legal duty of care documentation and protocols',
        'Crisis response playbooks for safety incidents'
      ],
      impact: '31% improvement in employee satisfaction with travel policies'
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-emerald-500" />,
      title: 'ESG Reporting & Investor Relations',
      description: 'First-of-its-kind quantifiable metrics for the "S" in ESG reporting.',
      features: [
        'Standardized social impact metrics for ESG frameworks',
        'Competitive benchmarking against industry peers',
        'Impact tracking of inclusion initiatives vs. QSI',
        'Data-driven narratives for ESG-focused investors'
      ],
      impact: '35% improvement in ESG social scores within 12 months'
    },
    {
      icon: <Shield className="h-8 w-8 text-purple-500" />,
      title: 'Brand Safety & Market Intelligence',
      description: 'Predictive risk analysis and authentic messaging guidance.',
      features: [
        'Early warning system for potential controversies',
        'LGBTQ+-friendly market expansion opportunities',
        'Real-time community sentiment monitoring',
        'AI-powered communications inclusivity review'
      ],
      impact: '42% decrease in brand safety incidents'
    },
    {
      icon: <Users className="h-8 w-8 text-orange-500" />,
      title: 'Talent Acquisition & Retention',
      description: 'Data-driven insights for building truly inclusive workplaces.',
      features: [
        'Inclusive workplace scoring and benchmarking',
        'LGBTQ+ talent pool intelligence in key markets',
        'Predictive retention risk modeling',
        'AI-driven policy and benefits optimization'
      ],
      impact: '27% reduction in LGBTQ+ talent attrition'
    }
  ],

  qsiCities: [
    {
      name: 'San Francisco, USA',
      score: 94,
      rating: 'excellent',
      legalProtection: 98,
      socialAcceptance: 95,
      safetyIndex: 89,
      trend: 'improving'
    },
    {
      name: 'Amsterdam, Netherlands',
      score: 92,
      rating: 'excellent',
      legalProtection: 96,
      socialAcceptance: 93,
      safetyIndex: 87,
      trend: 'stable'
    },
    {
      name: 'Berlin, Germany',
      score: 88,
      rating: 'good',
      legalProtection: 92,
      socialAcceptance: 87,
      safetyIndex: 85,
      trend: 'improving'
    },
    {
      name: 'Singapore',
      score: 62,
      rating: 'moderate',
      legalProtection: 45,
      socialAcceptance: 68,
      safetyIndex: 73,
      trend: 'improving'
    },
    {
      name: 'Dubai, UAE',
      score: 34,
      rating: 'caution',
      legalProtection: 18,
      socialAcceptance: 28,
      safetyIndex: 56,
      trend: 'declining'
    },
    {
      name: 'Tokyo, Japan',
      score: 71,
      rating: 'moderate',
      legalProtection: 68,
      socialAcceptance: 74,
      safetyIndex: 71,
      trend: 'improving'
    }
  ],

  businessImpact: [
    {
      value: '27%',
      label: 'Talent Retention',
      description: 'Reduction in LGBTQ+ employee attrition'
    },
    {
      value: '35%',
      label: 'ESG Scores',
      description: 'Improvement in social impact metrics'
    },
    {
      value: '42%',
      label: 'Brand Safety',
      description: 'Decrease in inclusion-related incidents'
    },
    {
      value: '19%',
      label: 'Market Share',
      description: 'Growth in LGBTQ+ consumer segment'
    },
    {
      value: '31%',
      label: 'Employee Satisfaction',
      description: 'Enhanced satisfaction with travel policies'
    },
    {
      value: '$2.4M',
      label: 'Cost Savings',
      description: 'Avg. annual reduction in ESG compliance costs'
    }
  ],

  caseStudies: [
    {
      company: 'Global Tech Fortune 50',
      industry: 'Technology',
      challenge: 'Expanding operations into 15 new markets while ensuring LGBTQ+ employee safety and meeting increased ESG reporting requirements from investors.',
      solution: 'Implemented Vector for Good\'s Global Workforce Safety solution with real-time QSI monitoring and comprehensive ESG metrics dashboard.',
      results: [
        '100% duty of care compliance across all new markets',
        '38% improvement in social dimension of ESG scoring',
        'Zero safety incidents for LGBTQ+ traveling employees',
        '$1.8M saved in policy research and compliance costs'
      ]
    },
    {
      company: 'Major Financial Services Firm',
      industry: 'Financial Services',
      challenge: 'High attrition of diverse talent and investor pressure to demonstrate authentic DEI commitment beyond surface-level initiatives.',
      solution: 'Deployed Talent Acquisition & Retention solution with predictive analytics and ESG Reporting integration for transparent impact tracking.',
      results: [
        '32% reduction in LGBTQ+ talent turnover within 18 months',
        'Moved from 58th to 12th percentile in industry ESG rankings',
        '24% increase in diverse candidate applications',
        'Recognized as "Best Place to Work" by HRC Corporate Equality Index'
      ]
    },
    {
      company: 'Consumer Goods Multinational',
      industry: 'Consumer Products',
      challenge: 'Brand controversy from tone-deaf marketing campaign in Pride month, risking $150M+ in LGBTQ+ consumer segment revenue.',
      solution: 'Activated Brand Safety & Market Intelligence solution with AI-powered messaging review and real-time sentiment monitoring.',
      results: [
        '89% reduction in messaging-related controversies',
        '27% growth in LGBTQ+ consumer trust metrics',
        'Successful launch of authentic Pride campaign with 340% ROI',
        'Featured in AdWeek as "Best Practice in Inclusive Marketing"'
      ]
    },
    {
      company: 'Pharmaceutical Giant',
      industry: 'Healthcare',
      challenge: 'Clinical trial recruitment struggles in diverse populations and regulatory scrutiny over social impact claims in ESG disclosures.',
      solution: 'Integrated all four QI solutions for comprehensive workforce safety, ESG compliance, brand protection, and inclusive recruitment.',
      results: [
        '43% increase in LGBTQ+ clinical trial participation',
        'First in industry to receive AAA social impact rating',
        '$3.2M annual savings from streamlined ESG reporting',
        'Employee engagement scores up 29% across all demographics'
      ]
    }
  ]
};