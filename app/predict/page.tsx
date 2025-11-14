"use client"

import { Navigation } from "@/components/navigation"
import { Zap, Loader2, ChevronDown, ChevronUp } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "@/hooks/use-session"

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
  'Biotechnology',
  'Blockchain / Crypto',
  'Fashion / Retail',
  'Manufacturing',
  'Aerospace',
  'Automotive',
  'Construction',
  'Consulting',
  'Consumer Goods',
  'Design',
  'Elder Care',
  'Fitness / Wellness',
  'Government',
  'Hardware / IoT',
  'Insurance / InsurTech',
  'Legal / LegalTech',
  'Marketing / AdTech',
  'Non-Profit / Social Impact',
  'Pharmaceuticals',
  'Real Estate / PropTech',
  'Recruiting / HR Tech',
  'Robotics',
  'Space',
  'Sports',
  'Telecommunications',
  'Transportation',
  'Venture Capital / Private Equity',
  'Virtual / Augmented Reality',
  'Other'
].sort((a, b) => a.localeCompare(b));

const businessModels = ["B2B", "B2C", "SaaS", "Marketplace", "E-commerce", "Other"]
const educationLevels = ["Bachelor's", "Master's", "PhD"]
const fundingStages = ["Pre-seed", "Seed", "Series A", "Series B", "Series C+"]
const productReadiness = ["Idea", "Prototype", "MVP", "Beta", "Launched"]
const competitionLevels = ["Low", "Medium", "High"]
const marketMaturity = ["Emerging", "Developing", "Mature"]
const regulatoryRisk = ["Low", "Medium", "High"]

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

const Section = ({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  
  return (
    <div className="mb-6">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left mb-2 focus:outline-none"
      >
        <h3 className="text-xl font-semibold text-[#2E2E3A]">{title}</h3>
        {isOpen ? <ChevronUp className="w-5 h-5 text-[#7F00FF]" /> : <ChevronDown className="w-5 h-5 text-[#7F00FF]" />}
      </button>
      {isOpen && <div className="space-y-4">{children}</div>}
    </div>
  )
}

interface PredictionResult {
  successProbability: number;
  riskFactors: {
    factor: string;
    severity: 'low' | 'medium' | 'high';
    impact: string;
  }[];
  recommendations: {
    action: string;
    priority: 'low' | 'medium' | 'high';
    impact: string;
  }[];
  marketAnalysis: {
    size: string;
    growth: string;
    trends: string[];
  };
  competitiveLandscape: {
    competitors: Array<{
      name: string;
      strength: string;
      weakness: string;
    }>;
    marketPosition: string;
  };
  financialProjection: {
    sixMonths: string;
    oneYear: string;
    threeYears: string;
  };
}

export default function PredictPage() {
  const [formData, setFormData] = useState({
    startupName: "",
    industry: "",
    region: "",
    stage: "",
    founderExperience: "",
    numberOfFounders: "1",
    educationLevel: "",
    previousStartupExperience: false,
    teamSkillDiversity: "5",
    businessModel: "",
    targetMarketSize: "",
    customerAcquisitionCost: "",
    productReadiness: "",
    competitionLevel: "",
    revenue: "",
    monthlyBurnRate: "",
    runway: "",
    fundingStage: "",
    fundingAmount: "",
    country: "",
    marketMaturity: "",
    regulatoryRisk: "",
    socialMediaPresence: "5",
    ideaDescription: "",
  })
  
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<PredictionResult | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const formRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { user, loading: authLoading } = useSession(true, '/login')
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login?redirect=/predict')
    }
  }, [user, authLoading, router])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.startupName.trim()) newErrors.startupName = 'Startup name is required'
    if (!formData.industry) newErrors.industry = 'Industry is required'
    if (!formData.country) newErrors.country = 'Country is required'
    if (!formData.founderExperience) newErrors.founderExperience = 'Founder experience is required'
    if (!formData.businessModel) newErrors.businessModel = 'Business model is required'
    if (!formData.productReadiness) newErrors.productReadiness = 'Product readiness is required'
    if (!formData.competitionLevel) newErrors.competitionLevel = 'Competition level is required'
    if (!formData.marketMaturity) newErrors.marketMaturity = 'Market maturity is required'
    if (!formData.regulatoryRisk) newErrors.regulatoryRisk = 'Regulatory risk is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const analyzeIndustry = (industry: string) => {
    // This would be replaced with real market data in production
    const industryData: Record<string, { growth: string; trends: string[] }> = {
      'Technology': {
        growth: '12% YoY',
        trends: ['AI Integration', 'Cloud Computing', 'Remote Work Solutions']
      },
      'Healthcare': {
        growth: '8% YoY',
        trends: ['Telemedicine', 'Wearable Tech', 'Personalized Medicine']
      },
      'Finance / FinTech': {
        growth: '15% YoY',
        trends: ['Blockchain', 'Digital Wallets', 'DeFi']
      },
      'E-Commerce': {
        growth: '10% YoY',
        trends: ['Social Commerce', 'AR Shopping', 'Sustainable Products']
      },
      'Green Energy': {
        growth: '20% YoY',
        trends: ['Solar Tech', 'Battery Storage', 'Carbon Capture']
      }
    }
    
    return industryData[industry] || {
      growth: '7% YoY',
      trends: ['Digital Transformation', 'Customer Experience', 'Operational Efficiency']
    }
  }

  const getCompetitors = (industry: string, businessModel: string) => {
    // This would be replaced with real competitor data in production
    const competitors: Record<string, Array<{name: string; strength: string; weakness: string}>> = {
      'Technology': [
        {
          name: 'TechCorp',
          strength: 'Strong R&D and patents',
          weakness: 'Slow to market with new features'
        },
        {
          name: 'InnovateX',
          strength: 'Agile development',
          weakness: 'Limited enterprise support'
        }
      ],
      'Healthcare': [
        {
          name: 'HealthPlus',
          strength: 'Established network',
          weakness: 'Legacy systems'
        }
      ]
    }
    
    return {
      competitors: competitors[industry] || [
        {
          name: 'Market Leader Inc.',
          strength: 'Brand recognition',
          weakness: 'Less flexible to market changes'
        }
      ],
      marketPosition: 'Analyzing market position...'
    }
  }

  const generateFinancialProjection = (score: number) => {
    // Simple projection based on success probability
    const baseGrowth = score / 10; // Convert 0-100 score to 0-10 growth factor
    return {
      sixMonths: `$${(10000 * (1 + baseGrowth * 0.1)).toLocaleString()} ARR`,
      oneYear: `$${(10000 * Math.pow(1 + baseGrowth * 0.1, 2)).toLocaleString()} ARR`,
      threeYears: `$${(10000 * Math.pow(1 + baseGrowth * 0.1, 6)).toLocaleString()} ARR`
    }
  }

  const handlePredict = () => {
    if (!user) {
      router.push('/login?redirect=/predict')
      return
    }
    
    if (!validateForm()) {
      const firstError = Object.keys(errors)[0]
      if (firstError) {
        const element = document.querySelector(`[name="${firstError}"]`) as HTMLElement
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' })
          element.focus()
        }
      }
      return
    }
    
    setLoading(true)
    
    // Simulate API call delay
    setTimeout(() => {
      try {
        // Base score calculation (0-100)
        let score = 50
        
        // Founder and Team (Max 30 points)
        const founderExp = parseInt(formData.founderExperience) || 0
        const diversityScore = parseInt(formData.teamSkillDiversity) || 5
        const educationScore = ['Bachelor\'s', 'Master\'s', 'PhD'].indexOf(formData.educationLevel) * 3 + 5
        
        score += Math.min(15, founderExp * 1.5) // Up to 15 points for experience
        score += (diversityScore - 5) * 1.5 // Up to 7.5 points for diversity
        score += educationScore / 3 // Up to 7.5 points for education
        
        // Market Factors (Max 25 points)
        const marketSize = parseFloat(formData.targetMarketSize) || 0
        const marketGrowth = analyzeIndustry(formData.industry).growth
        const marketPotential = marketSize * (parseInt(marketGrowth) / 100 || 0.07)
        
        if (marketPotential > 1) score += 10
        else if (marketPotential > 0.5) score += 7
        else if (marketPotential > 0.1) score += 4
        
        // Competition (Max 15 points)
        const competitionScore = formData.competitionLevel === 'Low' ? 15 : 
                               formData.competitionLevel === 'Medium' ? 8 : 3
        score += competitionScore
        
        // Product Readiness (Max 20 points)
        const readinessMap: Record<string, number> = { 
          "Idea": 5, 
          "Prototype": 10, 
          "MVP": 15, 
          "Beta": 18, 
          "Launched": 20 
        }
        score += readinessMap[formData.productReadiness] || 0
        
        // Financial Health (Max 20 points)
        const runwayMonths = parseInt(formData.runway) || 0
        const fundingScore = formData.fundingStage === 'Series C+' ? 10 :
                           formData.fundingStage === 'Series B' ? 8 :
                           formData.fundingStage === 'Series A' ? 6 :
                           formData.fundingStage === 'Seed' ? 4 : 2
        
        score += fundingScore
        if (runwayMonths >= 18) score += 10
        else if (runwayMonths >= 12) score += 7
        else if (runwayMonths >= 6) score += 4
        
        // Regulatory & Market Risks (Max 10 points)
        const regulatoryScore = formData.regulatoryRisk === 'Low' ? 10 :
                              formData.regulatoryRisk === 'Medium' ? 6 : 2
        score += regulatoryScore
        
        // Cap the score between 10 and 95 for realism
        score = Math.max(10, Math.min(95, Math.round(score)))
        
        // Generate detailed analysis
        const industryAnalysis = analyzeIndustry(formData.industry)
        const competitors = getCompetitors(formData.industry, formData.businessModel)
        const financials = generateFinancialProjection(score)
        
        // Risk assessment
        const riskFactors = [
          {
            factor: founderExp < 3 ? 'Limited Founder Experience' : 'Strong Founder Experience',
            severity: founderExp < 3 ? 'high' : 'low' as const,
            impact: founderExp < 3 ? 'May affect strategic decision making and investor confidence' : 'Strong leadership foundation'
          },
          {
            factor: formData.competitionLevel === 'High' ? 'High Competition' : 'Moderate/Low Competition',
            severity: formData.competitionLevel === 'High' ? 'high' : 'medium' as const,
            impact: formData.competitionLevel === 'High' 
              ? 'Need strong differentiation to capture market share' 
              : 'Good opportunity to establish market position'
          },
          {
            factor: runwayMonths < 6 ? 'Short Runway' : 'Adequate Runway',
            severity: runwayMonths < 6 ? 'high' : 'low' as const,
            impact: runwayMonths < 6 
              ? 'Consider extending runway or securing additional funding' 
              : 'Sufficient time to achieve next milestones'
          },
          {
            factor: formData.regulatoryRisk === 'High' ? 'Regulatory Challenges' : 'Stable Regulatory Environment',
            severity: formData.regulatoryRisk === 'High' ? 'high' : 'low' as const,
            impact: formData.regulatoryRisk === 'High'
              ? 'May require additional compliance measures and legal support'
              : 'Favorable regulatory conditions for growth'
          }
        ]

        // Generate recommendations
        const recommendations = [
          {
            action: founderExp < 5 ? 'Build an advisory board with industry veterans' : 'Leverage founder experience for strategic partnerships',
            priority: 'high' as const,
            impact: 'Can accelerate growth and provide valuable industry connections'
          },
          {
            action: formData.competitionLevel === 'High' 
              ? 'Develop a strong unique value proposition and focus on niche markets' 
              : 'Establish strong brand presence before competition increases',
            priority: 'high' as const,
            impact: 'Critical for customer acquisition and retention'
          },
          {
            action: 'Enhance product-market fit through customer feedback loops',
            priority: 'medium' as const,
            impact: 'Increases customer satisfaction and reduces churn'
          },
          {
            action: 'Develop a comprehensive go-to-market strategy',
            priority: 'high' as const,
            impact: 'Essential for efficient customer acquisition and scaling'
          }
        ]

        // Set the comprehensive result
        setResult({
          successProbability: score,
          riskFactors: riskFactors,
          recommendations: recommendations,
          marketAnalysis: {
            size: marketSize > 10 ? 'Large' : marketSize > 1 ? 'Medium' : 'Small',
            growth: industryAnalysis.growth,
            trends: industryAnalysis.trends
          },
          competitiveLandscape: {
            competitors: competitors.competitors,
            marketPosition: `Top ${Math.max(1, Math.floor(Math.random() * 10))} in ${formData.industry} sector`
          },
          financialProjection: financials
        })
        
      } catch (error) {
        console.error('Prediction error:', error)
      } finally {
        setLoading(false)
      }
    }, 1500) // Reduced delay for better UX
  }

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  return (
    <div className="flex">
      <Navigation />
      <main className="ml-64 flex-1 min-h-screen bg-gradient-to-br from-[#F9F9FB] to-[#F0E6FF] p-8">
        <h1 className="text-4xl font-bold text-[#2E2E3A] mb-8">Venture Prediction</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Form */}
          <div ref={formRef} className="glass p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-[#2E2E3A] mb-6">Startup Success Predictor</h2>
            <div className="space-y-6">
              {/* Basic Info Section */}
              <Section title="Basic Information">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#2E2E3A] mb-2">Startup Name</label>
                    <input
                      type="text"
                      name="startupName"
                      value={formData.startupName}
                      onChange={(e) => handleChange('startupName', e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                        errors.startupName 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-[#00FFE7]/30 focus:border-[#00FFE7]'
                      } focus:outline-none bg-white text-[#2E2E3A]`}
                      placeholder="Enter startup name"
                    />
                    {errors.startupName && <p className="mt-1 text-sm text-red-500">{errors.startupName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2E2E3A] mb-2">Industry</label>
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={(e) => handleChange('industry', e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                        errors.industry 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-[#00FFE7]/30 focus:border-[#00FFE7]'
                      } focus:outline-none bg-white text-[#2E2E3A]`}
                    >
                      <option value="">Select industry</option>
                      {INDUSTRIES.map(industry => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                    </select>
                    {errors.industry && <p className="mt-1 text-sm text-red-500">{errors.industry}</p>}
                  </div>
                </div>
              </Section>

              {/* Founder & Team Section */}
              <Section title="Founder & Team">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#2E2E3A] mb-2">Founder Experience (years)</label>
                    <input
                      type="number"
                      name="founderExperience"
                      value={formData.founderExperience}
                      onChange={(e) => handleChange('founderExperience', e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                        errors.founderExperience 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-[#00FFE7]/30 focus:border-[#00FFE7]'
                      } focus:outline-none bg-white text-[#2E2E3A]`}
                      placeholder="e.g., 5"
                      min="0"
                    />
                    {errors.founderExperience && <p className="mt-1 text-sm text-red-500">{errors.founderExperience}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2E2E3A] mb-2">Number of Founders</label>
                    <input
                      type="number"
                      value={formData.numberOfFounders}
                      onChange={(e) => handleChange('numberOfFounders', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border-2 border-[#00FFE7]/30 focus:border-[#00FFE7] focus:outline-none bg-white text-[#2E2E3A]"
                      min="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2E2E3A] mb-2">Highest Education Level</label>
                    <select
                      value={formData.educationLevel}
                      onChange={(e) => handleChange('educationLevel', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border-2 border-[#00FFE7]/30 focus:border-[#00FFE7] focus:outline-none bg-white text-[#2E2E3A]"
                    >
                      <option value="">Select education level</option>
                      {educationLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-end">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.previousStartupExperience}
                        onChange={(e) => handleChange('previousStartupExperience', e.target.checked)}
                        className="w-4 h-4 rounded border-[#00FFE7] text-[#7F00FF] focus:ring-[#7F00FF]"
                      />
                      <span className="text-sm text-[#2E2E3A]">Previous startup experience</span>
                    </label>
                  </div>
                  <div className="md:col-span-2">
                    <div className="flex justify-between mb-2">
                      <label className="block text-sm font-medium text-[#2E2E3A]">Team Skill Diversity</label>
                      <span className="text-sm text-[#2E2E3A]/70">{formData.teamSkillDiversity}/10</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={formData.teamSkillDiversity}
                      onChange={(e) => handleChange('teamSkillDiversity', e.target.value)}
                      className="w-full h-2 bg-[#00FFE7]/20 rounded-lg appearance-none cursor-pointer accent-[#7F00FF]"
                    />
                    <div className="flex justify-between text-xs text-[#2E2E3A]/50 mt-1">
                      <span>Low</span>
                      <span>High</span>
                    </div>
                  </div>
                </div>
              </Section>

              {/* Business & Product Section */}
              <Section title="Business & Product">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#2E2E3A] mb-2">Business Model</label>
                    <select
                      name="businessModel"
                      value={formData.businessModel}
                      onChange={(e) => handleChange('businessModel', e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                        errors.businessModel 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-[#00FFE7]/30 focus:border-[#00FFE7]'
                      } focus:outline-none bg-white text-[#2E2E3A]`}
                    >
                      <option value="">Select business model</option>
                      {businessModels.map(model => (
                        <option key={model} value={model}>{model}</option>
                      ))}
                    </select>
                    {errors.businessModel && <p className="mt-1 text-sm text-red-500">{errors.businessModel}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2E2E3A] mb-2">Target Market Size ($B)</label>
                    <input
                      type="number"
                      value={formData.targetMarketSize}
                      onChange={(e) => handleChange('targetMarketSize', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border-2 border-[#00FFE7]/30 focus:border-[#00FFE7] focus:outline-none bg-white text-[#2E2E3A]"
                      placeholder="e.g., 50"
                      min="0"
                      step="0.1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2E2E3A] mb-2">Customer Acquisition Cost ($)</label>
                    <input
                      type="number"
                      value={formData.customerAcquisitionCost}
                      onChange={(e) => handleChange('customerAcquisitionCost', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border-2 border-[#00FFE7]/30 focus:border-[#00FFE7] focus:outline-none bg-white text-[#2E2E3A]"
                      placeholder="e.g., 150"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2E2E3A] mb-2">Product Readiness</label>
                    <select
                      name="productReadiness"
                      value={formData.productReadiness}
                      onChange={(e) => handleChange('productReadiness', e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                        errors.productReadiness 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-[#00FFE7]/30 focus:border-[#00FFE7]'
                      } focus:outline-none bg-white text-[#2E2E3A]`}
                    >
                      <option value="">Select product stage</option>
                      {productReadiness.map(stage => (
                        <option key={stage} value={stage}>{stage}</option>
                      ))}
                    </select>
                    {errors.productReadiness && <p className="mt-1 text-sm text-red-500">{errors.productReadiness}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2E2E3A] mb-2">Competition Level</label>
                    <select
                      name="competitionLevel"
                      value={formData.competitionLevel}
                      onChange={(e) => handleChange('competitionLevel', e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                        errors.competitionLevel 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-[#00FFE7]/30 focus:border-[#00FFE7]'
                      } focus:outline-none bg-white text-[#2E2E3A]`}
                    >
                      <option value="">Select competition level</option>
                      {competitionLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                    {errors.competitionLevel && <p className="mt-1 text-sm text-red-500">{errors.competitionLevel}</p>}
                  </div>
                </div>
              </Section>

              {/* Financials Section */}
              <Section title="Financials">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#2E2E3A] mb-2">Monthly Revenue ($)</label>
                    <input
                      type="number"
                      value={formData.revenue}
                      onChange={(e) => handleChange('revenue', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border-2 border-[#00FFE7]/30 focus:border-[#00FFE7] focus:outline-none bg-white text-[#2E2E3A]"
                      placeholder="e.g., 10000"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2E2E3A] mb-2">Monthly Burn Rate ($)</label>
                    <input
                      type="number"
                      value={formData.monthlyBurnRate}
                      onChange={(e) => handleChange('monthlyBurnRate', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border-2 border-[#00FFE7]/30 focus:border-[#00FFE7] focus:outline-none bg-white text-[#2E2E3A]"
                      placeholder="e.g., 15000"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2E2E3A] mb-2">Runway (months)</label>
                    <input
                      type="number"
                      value={formData.runway}
                      onChange={(e) => handleChange('runway', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border-2 border-[#00FFE7]/30 focus:border-[#00FFE7] focus:outline-none bg-white text-[#2E2E3A]"
                      placeholder="e.g., 12"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2E2E3A] mb-2">Funding Stage</label>
                    <select
                      value={formData.fundingStage}
                      onChange={(e) => handleChange('fundingStage', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border-2 border-[#00FFE7]/30 focus:border-[#00FFE7] focus:outline-none bg-white text-[#2E2E3A]"
                    >
                      <option value="">Select funding stage</option>
                      {fundingStages.map(stage => (
                        <option key={stage} value={stage}>{stage}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2E2E3A] mb-2">Funding Amount ($)</label>
                    <input
                      type="number"
                      value={formData.fundingAmount}
                      onChange={(e) => handleChange('fundingAmount', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border-2 border-[#00FFE7]/30 focus:border-[#00FFE7] focus:outline-none bg-white text-[#2E2E3A]"
                      placeholder="e.g., 500000"
                      min="0"
                    />
                  </div>
                </div>
              </Section>

              {/* Market & Region Section */}
              <Section title="Market & Region">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#2E2E3A] mb-2">Country/Region</label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={(e) => handleChange('country', e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                        errors.country 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-[#00FFE7]/30 focus:border-[#00FFE7]'
                      } focus:outline-none bg-white text-[#2E2E3A]`}
                    >
                      <option value="">Select country or region</option>
                      {COUNTRIES.map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                    {errors.country && <p className="mt-1 text-sm text-red-500">{errors.country}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2E2E3A] mb-2">Market Maturity</label>
                    <select
                      name="marketMaturity"
                      value={formData.marketMaturity}
                      onChange={(e) => handleChange('marketMaturity', e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                        errors.marketMaturity 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-[#00FFE7]/30 focus:border-[#00FFE7]'
                      } focus:outline-none bg-white text-[#2E2E3A]`}
                    >
                      <option value="">Select market maturity</option>
                      {marketMaturity.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                    {errors.marketMaturity && <p className="mt-1 text-sm text-red-500">{errors.marketMaturity}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2E2E3A] mb-2">Regulatory Risk</label>
                    <select
                      name="regulatoryRisk"
                      value={formData.regulatoryRisk}
                      onChange={(e) => handleChange('regulatoryRisk', e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                        errors.regulatoryRisk 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-[#00FFE7]/30 focus:border-[#00FFE7]'
                      } focus:outline-none bg-white text-[#2E2E3A]`}
                    >
                      <option value="">Select regulatory risk</option>
                      {regulatoryRisk.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                    {errors.regulatoryRisk && <p className="mt-1 text-sm text-red-500">{errors.regulatoryRisk}</p>}
                  </div>
                </div>
              </Section>

              {/* AI & Perception Section */}
              <Section title="AI & Perception">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#2E2E3A] mb-2">Idea/Product Description</label>
                    <textarea
                      value={formData.ideaDescription}
                      onChange={(e) => handleChange('ideaDescription', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border-2 border-[#00FFE7]/30 focus:border-[#00FFE7] focus:outline-none bg-white text-[#2E2E3A] min-h-[100px] resize-none"
                      placeholder="Describe your startup idea or product in detail..."
                    />
                    <p className="text-xs text-[#2E2E3A]/50 mt-1">Our AI will analyze the sentiment and clarity of your description</p>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="block text-sm font-medium text-[#2E2E3A]">Social Media Presence</label>
                      <span className="text-sm text-[#2E2E3A]/70">{formData.socialMediaPresence}/10</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={formData.socialMediaPresence}
                      onChange={(e) => handleChange('socialMediaPresence', e.target.value)}
                      className="w-full h-2 bg-[#00FFE7]/20 rounded-lg appearance-none cursor-pointer accent-[#7F00FF]"
                    />
                    <div className="flex justify-between text-xs text-[#2E2E3A]/50 mt-1">
                      <span>None</span>
                      <span>Strong</span>
                    </div>
                  </div>
                </div>
              </Section>

              <button
                onClick={handlePredict}
                disabled={loading}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-[#7F00FF] to-[#00FFE7] text-white font-semibold hover:shadow-lg hover:shadow-[#7F00FF]/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-6 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    Predict Success
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results */}
          {result && (
            <div className="glass p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-[#2E2E3A] mb-6">Venture Analysis Report</h2>
              
              {/* Success Probability */}
              <div className="mb-8 p-6 bg-white/30 backdrop-blur-sm rounded-xl border border-white/20">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">Success Probability Score</h3>
                    <p className="text-sm text-gray-600">Based on comprehensive analysis of your venture</p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <div className="text-4xl font-bold text-[#00FFE7] bg-[#2E2E3A] px-6 py-3 rounded-full inline-block">
                      {result.successProbability}%
                    </div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-[#00FFE7] via-[#00B8FF] to-[#7E5BFF] transition-all duration-1000"
                    style={{ width: `${result.successProbability}%` }}
                  ></div>
                </div>
                <div className="mt-2 text-sm text-gray-500 flex justify-between">
                  <span>High Risk</span>
                  <span>Moderate</span>
                  <span>High Potential</span>
                </div>
              </div>

              {/* Market Analysis */}
              <Section title="Market Analysis">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white/30 p-4 rounded-lg">
                    <h4 className="font-medium text-[#2E2E3A]">Market Size</h4>
                    <p className="text-2xl font-bold">{result.marketAnalysis.size}</p>
                    <p className="text-sm text-gray-600">Target Market</p>
                  </div>
                  <div className="bg-white/30 p-4 rounded-lg">
                    <h4 className="font-medium text-[#2E2E3A]">Growth Rate</h4>
                    <p className="text-2xl font-bold">{result.marketAnalysis.growth}</p>
                    <p className="text-sm text-gray-600">Annual Growth</p>
                  </div>
                  <div className="bg-white/30 p-4 rounded-lg">
                    <h4 className="font-medium text-[#2E2E3A]">Key Trends</h4>
                    <ul className="space-y-1 mt-1">
                      {result.marketAnalysis.trends.map((trend, i) => (
                        <li key={i} className="text-sm flex items-center">
                          <span className="w-1.5 h-1.5 bg-[#00B8FF] rounded-full mr-2"></span>
                          {trend}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Section>

              {/* Competitive Landscape */}
              <Section title="Competitive Landscape">
                <div className="space-y-6">
                  <div className="bg-white/30 p-4 rounded-lg">
                    <h4 className="font-medium text-[#2E2E3A] mb-3">Market Position</h4>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-[#00FFE7] rounded-full mr-2"></div>
                      <span className="font-medium">{result.competitiveLandscape.marketPosition}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-[#2E2E3A] mb-3">Key Competitors</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {result.competitiveLandscape.competitors.map((competitor, i) => (
                        <div key={i} className="bg-white/30 p-4 rounded-lg">
                          <div className="font-medium">{competitor.name}</div>
                          <div className="mt-2 text-sm">
                            <div class="flex items-start">
                              <span class="text-green-500 mr-1">✓</span>
                              <span class="text-gray-700">{competitor.strength}</span>
                            </div>
                            <div class="flex items-start mt-1">
                              <span class="text-red-500 mr-1">✗</span>
                              <span class="text-gray-700">{competitor.weakness}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Section>

              {/* Financial Projections */}
              <Section title="Financial Projections">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-[#00FFE7] to-[#00B8FF] p-4 rounded-lg text-white">
                    <div className="text-sm opacity-80">6 Months</div>
                    <div className="text-2xl font-bold">{result.financialProjection.sixMonths}</div>
                    <div className="text-xs opacity-80 mt-1">Projected ARR</div>
                  </div>
                  <div className="bg-gradient-to-br from-[#00B8FF] to-[#7E5BFF] p-4 rounded-lg text-white">
                    <div className="text-sm opacity-80">1 Year</div>
                    <div className="text-2xl font-bold">{result.financialProjection.oneYear}</div>
                    <div className="text-xs opacity-80 mt-1">Projected ARR</div>
                  </div>
                  <div className="bg-gradient-to-br from-[#7E5BFF] to-[#FF5B9D] p-4 rounded-lg text-white">
                    <div className="text-sm opacity-80">3 Years</div>
                    <div className="text-2xl font-bold">{result.financialProjection.threeYears}</div>
                    <div className="text-xs opacity-80 mt-1">Projected ARR</div>
                  </div>
                </div>
              </Section>

              {/* Risk Assessment */}
              <Section title="Risk Assessment">
                <div className="space-y-4">
                  {result.riskFactors.map((risk, i) => (
                    <div key={i} className="bg-white/30 p-4 rounded-lg border-l-4 border-red-400">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{risk.factor}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          risk.severity === 'high' ? 'bg-red-100 text-red-800' :
                          risk.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {risk.severity.toUpperCase()} RISK
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{risk.impact}</p>
                    </div>
                  ))}
                </div>
              </Section>

              {/* Recommendations */}
              <Section title="Strategic Recommendations">
                <div className="space-y-4">
                  {result.recommendations.map((rec, i) => (
                    <div key={i} className="bg-white/30 p-4 rounded-lg border-l-4 border-green-400">
                      <div className="flex items-start">
                        <div className={`p-1 rounded-full mr-3 mt-0.5 ${
                          rec.priority === 'high' ? 'bg-red-100' :
                          rec.priority === 'medium' ? 'bg-yellow-100' :
                          'bg-blue-100'
                        }`}>
                          <svg className={`w-4 h-4 ${
                            rec.priority === 'high' ? 'text-red-500' :
                            rec.priority === 'medium' ? 'text-yellow-500' :
                            'text-blue-500'
                          }`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium">{rec.action}</h4>
                          <p className="text-sm text-gray-600 mt-1">{rec.impact}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div className="mb-4 md:mb-0">
                    <h4 className="font-medium">Need more detailed analysis?</h4>
                    <p className="text-sm text-gray-600">Get a comprehensive business plan and financial model</p>
                  </div>
                  <button className="bg-[#00FFE7] hover:bg-[#00e6d0] text-[#2E2E3A] font-medium py-2 px-6 rounded-full transition-colors">
                    Get Full Report
                  </button>
                </div>
                <p className="mt-4 text-xs text-gray-500">
                  This analysis is based on the provided information and industry benchmarks. 
                  Actual results may vary based on execution, market conditions, and other external factors.
                  Last updated: {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}