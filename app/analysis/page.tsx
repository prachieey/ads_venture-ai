'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  Brain,
  Users,
  MapPin,
  CheckCircle,
  Loader2,
  Sparkles,
  Zap,
  BarChart2,
  TrendingUp,
  Target,
  Award,
  DollarSign,
  Briefcase,
  Globe,
  Lightbulb,
  AlertCircle,
  ClipboardList,
  X,
  AlertTriangle,
  Edit3,
  RefreshCw,
  Check,
  Layers as LayersIcon,
  Trophy,
  BarChart3
} from 'lucide-react';
import {
  ProgressBar,
  AIVerdict
} from './components/AnalysisComponents';

type InputData = {
  fundingAmount: number | '';
  teamSize: number | '';
  industry: string;
  region: string;
  founderExperience: number;
  innovationScore: number | '';
  productStage: string;
  competitionLevel: 'Low' | 'Medium' | 'High';
  marketGrowth: 'Low' | 'Medium' | 'High';
  _errorFields?: string[]; // For form validation
};

type AnalysisResult = {
  project: {
    successScore: number;
    riskLevel: number;
    marketFit: number;
    fundingAdequacy: number;
  };
  team: {
    strength: number;
    experienceLevel: string;
    collaboration: number;
  };
  market: {
    marketFit: number;
    competitionLevel: 'Low' | 'Medium' | 'High';
  };
  financial: {
    fundingAdequacy: number;
  };
  regional: {
    marketPotential: number;
    competition: number;
    growth: number;
  };
  verdict: {
    score: number;
    message: string;
    date: string;
    confidence: number;
    strengths: string[];
    weaknesses: string[];
  };
};

const INDUSTRIES = [
  'Technology',
  'Artificial Intelligence',
  'Healthcare',
  'Finance / FinTech',
  'Education / EdTech',
  'E-Commerce',
  'Green Energy',
  'Agriculture / AgriTech',
  'Real Estate',
  'Entertainment / Media',
  'Travel & Hospitality',
  'Logistics / Transport',
  'FoodTech',
  'Gaming',
  'Cybersecurity',
  'Environmental Sustainability',
  'Others (Custom Input)'
].sort();

const COUNTRIES = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 
  'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 
  'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 
  'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 
  'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 
  'Cameroon', 'Canada', 'Cape Verde', 'Central African Republic', 'Chad', 
  'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica', 
  'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 
  'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador', 'Egypt', 
  'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 
  'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 
  'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 
  'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 
  'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 
  'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 
  'Korea, North', 'Korea, South', 'Kosovo', 'Kuwait', 'Kyrgyzstan', 
  'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 
  'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi', 
  'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 
  'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 
  'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 
  'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 
  'Niger', 'Nigeria', 'North Macedonia', 'Norway', 'Oman', 'Pakistan', 
  'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 
  'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 
  'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 
  'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 
  'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 
  'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 
  'Solomon Islands', 'Somalia', 'South Africa', 'South Sudan', 'Spain', 
  'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria', 
  'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tonga', 
  'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 
  'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 
  'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 
  'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
].sort((a, b) => a.localeCompare(b));

const calculateAnalysis = (inputs: InputData): AnalysisResult => {
  const fundingAmount = inputs.fundingAmount === '' ? 0 : Number(inputs.fundingAmount);
  const teamSize = inputs.teamSize === '' ? 0 : Number(inputs.teamSize);
  const innovationScoreValue = inputs.innovationScore === '' ? 0 : Number(inputs.innovationScore);

  // Base scores
  const fundingScore = Math.min(100, Math.floor(Math.log10((fundingAmount || 1) / 1000 + 1) * 33));
  const teamScore = Math.min(100, teamSize * 5);
  const experienceScore = Math.min(100, inputs.founderExperience * 10);

  const competitionScore = {
    'Low': 80,
    'Medium': 50,
    'High': 20
  }[inputs.competitionLevel] || 50;

  const marketGrowthScore = {
    'Low': 30,
    'Medium': 60,
    'High': 90
  }[inputs.marketGrowth] || 50;

  const productStageMultiplier = {
    'Idea': 0.5,
    'Prototype': 0.6,
    'MVP': 0.8,
    'Early Customers': 0.9,
    'Growth': 1.0,
    'Scaling': 1.1,
    'Established': 1.2
  }[inputs.productStage] || 1.0;

  // Final calculations
  const successScore = Math.min(100, Math.round(
    ((fundingScore * 0.2) +
     (teamScore * 0.2) +
     (experienceScore * 0.15) +
     (innovationScoreValue * 0.15) +
     (competitionScore * 0.15) +
     (marketGrowthScore * 0.15)) * productStageMultiplier
  ));

  const riskLevel = Math.max(0, 100 - Math.round(
    (competitionScore * 0.4) +
    (marketGrowthScore * 0.3) +
    (experienceScore * 0.3)
  ));

  const marketFit = Math.round((competitionScore + marketGrowthScore) / 2);

  // Strengths & Weaknesses
  const strengths: string[] = [];
  const weaknesses: string[] = [];

  if (fundingScore > 70) strengths.push('Strong funding position');
  if (teamScore > 70) strengths.push('Strong team composition');
  if (experienceScore > 70) strengths.push('Experienced founders');
  if (marketFit > 70) strengths.push('Excellent market fit');

  if (competitionScore < 30) weaknesses.push('High competition');
  if (marketGrowthScore < 30) weaknesses.push('Limited market growth');
  if (experienceScore < 30) weaknesses.push('Limited experience in the field');
  if (fundingScore < 30) weaknesses.push('Limited funding');

  // Industry insights
  const industryInsights: Record<string, string> = {
    'Technology': 'Focus on rapid iteration and user feedback.',
    'Healthcare': 'Consider regulatory requirements and long sales cycles.',
    'Finance': 'Security and compliance should be top priorities.',
    'E-commerce': 'Customer experience and logistics are key differentiators.',
    'AI': 'Ensure you have access to quality training data and compute resources.'
  };

  const industryInsight = industryInsights[inputs.industry] ||
    `The ${inputs.industry} industry has unique challenges and opportunities.`;

  // Verdict message
  let message: string;
  let confidence: number;

  if (successScore >= 80) {
    message = "Exceptional potential! Your startup shows strong indicators of success with solid funding, team, and market position.";
    confidence = 85 + Math.floor(Math.random() * 10);
  } else if (successScore >= 60) {
    message = "Good potential! Your startup has several strengths but could benefit from improvements in certain areas.";
    confidence = 65 + Math.floor(Math.random() * 15);
  } else if (successScore >= 40) {
    message = "Promising but needs work. Consider strengthening your team, securing more funding, or refining your market approach.";
    confidence = 50 + Math.floor(Math.random() * 15);
  } else {
    message = "High risk. Significant improvements needed in funding, team, or market strategy to increase chances of success.";
    confidence = 30 + Math.floor(Math.random() * 20);
  }

  message += ` ${industryInsight}`;

  return {
    project: {
      successScore,
      riskLevel,
      marketFit,
      fundingAdequacy: fundingScore
    },
    team: {
      strength: teamScore,
      experienceLevel: experienceScore > 70 ? 'High' : experienceScore > 40 ? 'Medium' : 'Low',
      collaboration: Math.min(100, Math.max(0, teamScore * 0.8 + experienceScore * 0.2))
    },
    market: {
      marketFit,
      competitionLevel: inputs.competitionLevel
    },
    financial: {
      fundingAdequacy: fundingScore
    },
    regional: {
      marketPotential: marketGrowthScore,
      competition: 100 - competitionScore,
      growth: marketGrowthScore
    },
    verdict: {
      score: successScore,
      message,
      date: new Date().toISOString(),
      confidence,
      strengths: strengths.length > 0 ? strengths : ['No significant strengths identified'],
      weaknesses: weaknesses.length > 0 ? weaknesses : ['No significant weaknesses identified']
    }
  };
};

const AnalysisCard = ({
  title,
  icon: Icon,
  children,
  className = ''
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  className?: string;
}) => (
  <motion.div
    className={`glass p-6 rounded-2xl h-full flex flex-col ${className}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex items-center mb-4">
      <div className="p-2 rounded-lg bg-gradient-to-br from-[#7F00FF] to-[#00FFE7] text-white mr-3">
        <Icon className="w-5 h-5" />
      </div>
      <h3 className="text-xl font-bold text-[#2E2E3A]">{title}</h3>
    </div>
    <div className="flex-1">{children}</div>
  </motion.div>
);

export default function AIPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  const [inputs, setInputs] = useState<InputData>({
    fundingAmount: '',
    teamSize: '',
    industry: '',
    region: '',
    founderExperience: 3,
    innovationScore: '',
    productStage: 'MVP',
    competitionLevel: 'Medium',
    marketGrowth: 'Medium'
  });

  const isFormValid = (): boolean => {
    return (
      inputs.fundingAmount !== '' &&
      inputs.teamSize !== '' &&
      inputs.industry !== '' &&
      inputs.region !== '' &&
      inputs.innovationScore !== '' &&
      inputs.productStage !== ''
    );
  };

  const showValidationError = (message: string) => {
    // In a real app, you might want to use a toast notification library
    alert(`⚠️ ${message}`);
  };
  
  const validateAndRun = () => {
    if (!isFormValid()) {
      showValidationError('Please fill all required fields before running the analysis.');
      // Add shake animation to empty fields
      const emptyFields = [];
      if (inputs.fundingAmount === '') emptyFields.push('fundingAmount');
      if (inputs.teamSize === '') emptyFields.push('teamSize');
      if (inputs.industry === '') emptyFields.push('industry');
      if (inputs.region === '') emptyFields.push('region');
      if (inputs.innovationScore === '') emptyFields.push('innovationScore');
      if (inputs.productStage === '') emptyFields.push('productStage');
      
      // Trigger re-render with error state
      setInputs(prev => ({ ...prev, _errorFields: emptyFields }));
      return;
    }
    runAnalysis();
  };

  const handleInputChange = <K extends keyof InputData>(
    field: K,
    value: InputData[K] | string | number
  ) => {
    setInputs(prev => {
      // Remove field from error fields if it's being updated
      const updatedErrorFields = prev._errorFields?.filter(f => f !== field) || [];
      
      return {
        ...prev,
        [field]: (field === 'fundingAmount' || field === 'teamSize' || field === 'innovationScore')
          ? value === '' ? '' : Number(value)
          : value as InputData[K],
        _errorFields: updatedErrorFields
      };
    });
  };

  const runAnalysis = (): void => {
    setIsLoading(true);
    setTimeout(() => {
      const result = calculateAnalysis(inputs);
      setAnalysis(result);
      setShowResults(true);
      setIsLoading(false);

      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            VentureAI Analysis
          </h1>
          <p className="text-gray-400 mt-2 text-lg">
            Get AI-powered insights for your startup
          </p>
        </div>

        {/* Input Form */}
        <div className="glass p-6 rounded-2xl mb-8">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
            <ClipboardList className="w-5 h-5 mr-2 text-cyan-400" />
            Startup Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Funding Amount ($) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <motion.div
                    animate={inputs._errorFields?.includes('fundingAmount') ? { x: [-5, 5, -5, 5, 0] } : {}}
                    transition={{ duration: 0.5 }}
                    className="relative"
                  >
                    <input
                      type="number"
                      min="0"
                      value={inputs.fundingAmount}
                      onChange={(e) => handleInputChange('fundingAmount', e.target.value)}
                      placeholder="e.g. 50000"
                      className={`block w-full pl-10 pr-3 py-2 border ${
                        inputs._errorFields?.includes('fundingAmount') 
                          ? 'border-red-500 ring-2 ring-red-500/50' 
                          : 'border-gray-600 focus:ring-2 focus:ring-[#7F00FF]'
                      } bg-gray-700 rounded-md text-white focus:outline-none transition-all`}
                    />
                  </motion.div>
                  {inputs._errorFields?.includes('fundingAmount') && (
                    <p className="mt-1 text-xs text-red-400">This field is required</p>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Team Size <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Users className="h-5 w-5 text-gray-400" />
                  </div>
                  <motion.div
                    animate={inputs._errorFields?.includes('teamSize') ? { x: [-5, 5, -5, 5, 0] } : {}}
                    transition={{ duration: 0.5 }}
                    className="relative"
                  >
                    <input
                      type="number"
                      min="1"
                      value={inputs.teamSize}
                      onChange={(e) => handleInputChange('teamSize', e.target.value)}
                      placeholder="Number of team members"
                      className={`block w-full pl-10 pr-3 py-2 border ${
                        inputs._errorFields?.includes('teamSize') 
                          ? 'border-red-500 ring-2 ring-red-500/50' 
                          : 'border-gray-600 focus:ring-2 focus:ring-[#7F00FF]'
                      } bg-gray-700 rounded-md text-white focus:outline-none transition-all`}
                    />
                  </motion.div>
                  {inputs._errorFields?.includes('teamSize') && (
                    <p className="mt-1 text-xs text-red-400">This field is required</p>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Industry <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Briefcase className="h-5 w-5 text-gray-400" />
                  </div>
                  <motion.div
                    animate={inputs._errorFields?.includes('industry') ? { x: [-5, 5, -5, 5, 0] } : {}}
                    transition={{ duration: 0.5 }}
                    className="relative"
                  >
                    <select
                      value={inputs.industry}
                      onChange={(e) => handleInputChange('industry', e.target.value)}
                      className={`block w-full pl-10 pr-10 py-2 border ${
                        inputs._errorFields?.includes('industry') 
                          ? 'border-red-500 ring-2 ring-red-500/50' 
                          : 'border-gray-600 focus:ring-2 focus:ring-[#7F00FF]'
                      } bg-gray-700 rounded-md text-white focus:outline-none appearance-none transition-all`}
                    >
                      <option value="">Select industry</option>
                      {INDUSTRIES.map(industry => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </motion.div>
                  {inputs._errorFields?.includes('industry') && (
                    <p className="mt-1 text-xs text-red-400">Please select an industry</p>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Region/Country <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Globe className="h-5 w-5 text-gray-400" />
                  </div>
                  <motion.div
                    animate={inputs._errorFields?.includes('region') ? { x: [-5, 5, -5, 5, 0] } : {}}
                    transition={{ duration: 0.5 }}
                    className="relative"
                  >
                    <select
                      value={inputs.region}
                      onChange={(e) => handleInputChange('region', e.target.value)}
                      className={`block w-full pl-10 pr-10 py-2 border ${
                        inputs._errorFields?.includes('region') 
                          ? 'border-red-500 ring-2 ring-red-500/50' 
                          : 'border-gray-600 focus:ring-2 focus:ring-[#7F00FF]'
                      } bg-gray-700 rounded-md text-white focus:outline-none appearance-none transition-all`}
                    >
                      <option value="">Select country or region...</option>
                      {COUNTRIES.map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </motion.div>
                  {inputs._errorFields?.includes('region') && (
                    <p className="mt-1 text-xs text-red-400">Please select a country or region</p>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">Founder Experience (years)</label>
                <div className="flex items-center space-x-4">
                  <span className="text-xs text-gray-400">0</span>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={inputs.founderExperience}
                    onChange={(e) => handleInputChange('founderExperience', parseInt(e.target.value))}
                    className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#7F00FF]"
                  />
                  <span className="text-sm font-medium w-8 text-center">{inputs.founderExperience}</span>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Innovation Score (1-100) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lightbulb className="h-5 w-5 text-gray-400" />
                  </div>
                  <motion.div
                    animate={inputs._errorFields?.includes('innovationScore') ? { x: [-5, 5, -5, 5, 0] } : {}}
                    transition={{ duration: 0.5 }}
                    className="relative"
                  >
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={inputs.innovationScore}
                      onChange={(e) => handleInputChange('innovationScore', e.target.value)}
                      placeholder="Rate from 1 to 100"
                      className={`block w-full pl-10 pr-3 py-2 border ${
                        inputs._errorFields?.includes('innovationScore') 
                          ? 'border-red-500 ring-2 ring-red-500/50' 
                          : 'border-gray-600 focus:ring-2 focus:ring-[#7F00FF]'
                      } bg-gray-700 rounded-md text-white focus:outline-none transition-all`}
                    />
                  </motion.div>
                  {inputs._errorFields?.includes('innovationScore') && (
                    <p className="mt-1 text-xs text-red-400">Please enter an innovation score</p>
                  )}
                </div>
                <div className="mt-2">
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Basic</span>
                    <span>Cutting-edge</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={inputs.innovationScore || 0}
                    onChange={(e) => handleInputChange('innovationScore', e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#7F00FF]"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Competition Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Low', 'Medium', 'High'] as const).map((level) => (
                    <motion.button
                      key={level}
                      type="button"
                      whileTap={{ scale: 0.95 }}
                      className={`px-2 py-2 rounded-md text-sm font-medium transition-all ${
                        inputs.competitionLevel === level
                          ? 'bg-gradient-to-r from-[#7F00FF] to-[#00FFE7] text-white shadow-lg shadow-[#7F00FF]/30'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                      onClick={() => handleInputChange('competitionLevel', level)}
                    >
                      {level}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Market Growth
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Low', 'Medium', 'High'] as const).map((level) => (
                    <motion.button
                      key={level}
                      type="button"
                      whileTap={{ scale: 0.95 }}
                      className={`px-2 py-2 rounded-md text-sm font-medium transition-all ${
                        inputs.marketGrowth === level
                          ? 'bg-gradient-to-r from-[#7F00FF] to-[#00FFE7] text-white shadow-lg shadow-[#7F00FF]/30'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                      onClick={() => handleInputChange('marketGrowth', level)}
                    >
                      {level}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Product Stage <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Idea', 'Prototype', 'MVP', 'Early Customers', 'Growth', 'Scaling', 'Established'].map((stage) => (
                    <motion.button
                      key={stage}
                      type="button"
                      whileTap={{ scale: 0.95 }}
                      className={`px-2 py-2 rounded-md text-sm font-medium transition-all ${
                        inputs.productStage === stage
                          ? 'bg-gradient-to-r from-[#7F00FF] to-[#00FFE7] text-white shadow-lg shadow-[#7F00FF]/30'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                      onClick={() => handleInputChange('productStage', stage)}
                    >
                      {stage}
                    </motion.button>
                  ))}
                </div>
                {inputs._errorFields?.includes('productStage') && (
                  <p className="mt-1 text-xs text-red-400">Please select a product stage</p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <motion.button
              onClick={validateAndRun}
              disabled={isLoading}
              className={`px-8 py-3 rounded-full text-white font-medium text-lg transition-all ${
                isLoading
                  ? 'bg-gray-700 cursor-wait'
                  : 'bg-gradient-to-r from-[#7F00FF] to-[#00FFE7] hover:shadow-lg hover:shadow-[#7F00FF]/50'
              }`}
              whileHover={!isLoading ? { scale: 1.03 } : {}}
              whileTap={!isLoading ? { scale: 0.98 } : {}}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Analyzing...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Run AI Analysis
                </div>
              )}
            </motion.button>

            {!isFormValid() && (
              <p className="text-sm text-amber-400 mt-2">Please fill in all required fields</p>
            )}
          </div>
        </div>

        {/* Results Section */}
        {showResults && analysis && (
          <div id="results" className="glass p-6 rounded-2xl mb-8">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
              <BarChart3 className="w-6 h-6 mr-2 text-cyan-400" />
              Analysis Results
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Project Insights */}
              <AnalysisCard title="Project Insights" icon={Lightbulb}>
                <div className="space-y-4">
                  <div>
                    <ProgressBar
                      value={analysis.project.successScore}
                      color="bg-gradient-to-r from-[#7F00FF] to-[#00FFE7]"
                      label={`Success Score (${analysis.project.successScore}%)`}
                    />
                    <p className="text-sm text-gray-300 mt-1">
                      {analysis.project.successScore >= 70 ? 'Strong' : analysis.project.successScore >= 40 ? 'Moderate' : 'Limited'} potential for success.
                    </p>
                  </div>
                  <div>
                    <ProgressBar
                      value={analysis.project.riskLevel}
                      color={analysis.project.riskLevel > 60 ? 'bg-red-500' : analysis.project.riskLevel > 30 ? 'bg-yellow-500' : 'bg-green-500'}
                      label={`Risk Level (${analysis.project.riskLevel}%)`}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#00FFE7]">{analysis.project.marketFit}%</div>
                      <div className="text-xs text-gray-400">Market Fit</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#7F00FF]">{analysis.project.fundingAdequacy}%</div>
                      <div className="text-xs text-gray-400">Funding Adequacy</div>
                    </div>
                  </div>
                </div>
              </AnalysisCard>

              {/* Team Analysis */}
              <AnalysisCard title="Team Analysis" icon={Users}>
                <div className="space-y-4">
                  <div>
                    <ProgressBar
                      value={analysis.team.strength}
                      color={analysis.team.strength > 70 ? 'bg-green-500' : analysis.team.strength > 40 ? 'bg-yellow-500' : 'bg-red-500'}
                      label={`Team Strength (${analysis.team.strength}%)`}
                    />
                  </div>
                  <div className="p-4 bg-gray-800 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-300">Experience Level</span>
                      <span className="text-sm font-medium text-white">{analysis.team.experienceLevel}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">Team Size</span>
                      <span className="text-sm font-medium text-white">{inputs.teamSize} members</span>
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">Collaboration</span>
                      <span className="font-medium">{analysis.team.collaboration}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-[#7F00FF] to-[#00FFE7] h-2 rounded-full"
                        style={{ width: `${analysis.team.collaboration}%` }}
                      />
                    </div>
                  </div>
                </div>
              </AnalysisCard>

              {/* Regional Score */}
              <AnalysisCard title="Regional Score" icon={Globe}>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-800 rounded-lg text-center">
                      <div className="text-2xl font-bold text-[#00FFE7]">{analysis.regional.marketPotential}%</div>
                      <div className="text-xs text-gray-400">Market Potential</div>
                    </div>
                    <div className="p-4 bg-gray-800 rounded-lg text-center">
                      <div className="text-2xl font-bold text-[#7F00FF]">{analysis.regional.growth}%</div>
                      <div className="text-xs text-gray-400">Growth Rate</div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">Competition Level</span>
                      <span className="font-medium">{analysis.regional.competition}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-red-500 to-yellow-500 h-2 rounded-full"
                        style={{ width: `${analysis.regional.competition}%` }}
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Selected Region</h4>
                    <div className="flex items-center p-3 bg-gray-800 rounded-lg">
                      <Globe className="w-5 h-5 text-[#00FFE7] mr-2" />
                      <span className="text-white">{inputs.region}</span>
                    </div>
                  </div>
                </div>
              </AnalysisCard>

              {/* AI Verdict */}
              <AnalysisCard title="AI Verdict" icon={Trophy} className="md:col-span-2">
                <div className="space-y-4">
                  <AIVerdict
                    score={analysis.verdict.score}
                    message={analysis.verdict.message}
                    date={new Date(analysis.verdict.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="p-4 bg-gray-800 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">Confidence Level</span>
                        <span className="text-sm font-medium text-[#00FFE7]">{analysis.verdict.confidence}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                        <div
                          className="bg-gradient-to-r from-[#7F00FF] to-[#00FFE7] h-2 rounded-full"
                          style={{ width: `${analysis.verdict.confidence}%` }}
                        />
                      </div>
                    </div>

                    <div className="p-4 bg-gray-800 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">Analysis Date</span>
                        <span className="text-sm font-medium text-white">
                          {new Date(analysis.verdict.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      <div className="mt-2">
                        <div className="text-xs text-gray-400">Based on current market data</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-gradient-to-r from-[#7F00FF]/20 to-[#00FFE7]/20 rounded-lg border border-[#7F00FF]/30">
                    <h4 className="text-sm font-medium text-white mb-2 flex items-center">
                      <Lightbulb className="w-4 h-4 mr-2 text-[#00FFE7]" />
                      Recommendation
                    </h4>
                    <p className="text-sm text-gray-300">
                      {analysis.verdict.score >= 70
                        ? "Consider scaling your operations and expanding to new markets."
                        : analysis.verdict.score >= 40
                        ? "Focus on strengthening your team and refining your market approach."
                        : "Consider revisiting your business model and seeking additional funding."}
                    </p>
                  </div>

                  <div className="mt-6 text-center">
                    <motion.button
                      onClick={() => {
                        setShowResults(false);
                        setTimeout(() => {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }, 100);
                      }}
                      className="px-6 py-2 text-sm rounded-full bg-gradient-to-r from-[#7F00FF] to-[#00FFE7] text-white font-medium hover:shadow-lg hover:shadow-[#7F00FF]/50 transition"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Adjust Inputs
                    </motion.button>
                  </div>
                </div>
              </AnalysisCard>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}