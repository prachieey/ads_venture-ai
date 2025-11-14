"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "@/hooks/use-session"
import { Zap, Loader2, ChevronDown, ChevronUp, AlertCircle } from "lucide-react"
import { Navigation } from "@/components/navigation"
import type { FormData, PredictionResult } from "@/types/prediction"

// Constants
const INDUSTRIES = [
  'Technology',
  'Artificial Intelligence',
  'Healthcare',
  'Finance / FinTech',
  'Education / EdTech',
  'E-Commerce'
]

const REGIONS = ['North America', 'Europe', 'Asia', 'South America', 'Africa', 'Oceania']
const STAGES = ['Idea', 'Prototype', 'MVP', 'Beta', 'Launched']
const EDUCATION_LEVELS = ['High School', 'Bachelor\'s', 'Master\'s', 'PhD', 'Other']
const BUSINESS_MODELS = ['B2B', 'B2C', 'B2B2C', 'Marketplace', 'SaaS', 'E-commerce']
const MARKET_MATURITY = ['Nascent', 'Growing', 'Mature', 'Declining']
const REGULATORY_RISK = ['Low', 'Medium', 'High']

const defaultFormData: FormData = {
  startupName: '',
  industry: '',
  region: '',
  stage: '',
  founderExperience: '',
  numberOfFounders: '1',
  educationLevel: '',
  previousStartupExperience: false,
  teamSkillDiversity: '5',
  businessModel: '',
  targetMarketSize: '',
  customerAcquisitionCost: '',
  productReadiness: '',
  competitionLevel: '',
  revenue: '',
  monthlyBurnRate: '',
  runway: '',
  fundingStage: '',
  fundingAmount: '',
  country: '',
  marketMaturity: '',
  regulatoryRisk: '',
  socialMediaPresence: '5',
  ideaDescription: ''
}

export default function PredictPage() {
  const router = useRouter()
  const { user } = useSession(true, '/login')
  const [formData, setFormData] = useState<FormData>(defaultFormData)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<PredictionResult | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const formRef = useRef<HTMLDivElement>(null)

  // Validate form fields
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.startupName.trim()) {
      newErrors.startupName = 'Startup name is required'
    }
    if (!formData.industry) {
      newErrors.industry = 'Industry is required'
    }
    if (!formData.region) {
      newErrors.region = 'Region is required'
    }
    if (!formData.stage) {
      newErrors.stage = 'Stage is required'
    }
    if (!formData.founderExperience) {
      newErrors.founderExperience = 'Founder experience is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handlePredict = async () => {
    if (!user) {
      router.push('/login?redirect=/predict')
      return
    }
    
    if (!validateForm()) {
      return
    }
    
    setLoading(true)
    
    try {
      // Calculate score and generate prediction data
      let score = 50
      const founderExp = parseInt(formData.founderExperience) || 0
      const diversityScore = parseInt(formData.teamSkillDiversity) || 5
      const marketSize = parseFloat(formData.targetMarketSize) || 0
      const runwayMonths = parseInt(formData.runway) || 0
      
      // Calculate score based on form data
      score += Math.min(15, founderExp * 1.5)
      score += (diversityScore - 5) * 2
      
      if (marketSize > 10) score += 10
      else if (marketSize > 1) score += 5
      
      const readinessMap: Record<string, number> = { "Idea": 0, "Prototype": 5, "MVP": 10, "Beta": 13, "Launched": 15 }
      score += readinessMap[formData.productReadiness] || 0
      
      if (runwayMonths >= 18) score += 10
      else if (runwayMonths >= 12) score += 7
      else if (runwayMonths >= 6) score += 3
      
      score = Math.max(10, Math.min(90, Math.round(score)))
      
      // Generate risk factors
      const riskFactors = [
        {
          factor: founderExp < 3 ? "Limited founder experience in the industry" : "Strong founder experience",
          severity: founderExp < 3 ? (founderExp === 0 ? 'high' : 'medium') : 'low',
          impact: founderExp < 3 ? "May affect decision making and industry connections" : "Strong leadership in place"
        },
        {
          factor: formData.competitionLevel === "High" ? "High competition in the target market" : "Moderate competition",
          severity: formData.competitionLevel === "High" ? 'high' : 'medium',
          impact: formData.competitionLevel === "High" ? "Higher customer acquisition costs" : "Manageable competition"
        },
        {
          factor: runwayMonths < 6 ? "Limited financial runway" : "Adequate financial runway",
          severity: runwayMonths < 6 ? 'high' : 'low',
          impact: runwayMonths < 6 ? "Urgent need for additional funding" : "Sufficient time to achieve milestones"
        }
      ]

      // Generate recommendations
      const recommendations = [
        {
          action: founderExp < 3 ? "Consider adding advisors with industry experience" : "Leverage founder experience for strategic growth",
          priority: founderExp < 3 ? 'high' : 'low',
          impact: "Improves decision making and industry connections"
        },
        {
          action: formData.competitionLevel === "High" ? "Develop a strong unique value proposition" : "Continue to differentiate from competitors",
          priority: formData.competitionLevel === "High" ? 'high' : 'medium',
          impact: "Helps stand out in a competitive market"
        },
        {
          action: runwayMonths < 12 ? "Focus on extending runway or securing additional funding" : "Maintain financial discipline",
          priority: runwayMonths < 6 ? 'high' : (runwayMonths < 12 ? 'medium' : 'low'),
          impact: "Ensures business continuity and growth opportunities"
        }
      ]

      // Generate market analysis
      const marketAnalysis = {
        size: marketSize > 10 ? "Large" : (marketSize > 5 ? "Medium" : "Small"),
        growth: marketSize > 10 ? "Rapidly growing" : (marketSize > 5 ? "Steady growth" : "Emerging"),
        trends: [
          "Increasing adoption of digital solutions",
          "Growing demand for sustainable products",
          "Shift towards remote work solutions"
        ]
      }

      // Generate competitive landscape
      const competitors = [
        {
          name: `${formData.industry} Leader 1`,
          strength: "Strong brand recognition",
          weakness: "Slower to innovate",
          marketShare: "25%"
        },
        {
          name: `${formData.industry} Innovator`,
          strength: "Cutting-edge technology",
          weakness: "Limited market presence",
          marketShare: "15%"
        }
      ]

      // Generate financial projections
      const financialProjection = {
        sixMonths: `$${(marketSize * 1000).toLocaleString()} ARR`,
        oneYear: `$${(marketSize * 3000).toLocaleString()} ARR`,
        threeYears: `$${(marketSize * 15000).toLocaleString()} ARR`
      }

      // Create prediction result
      const predictionResult: PredictionResult = {
        successProbability: score,
        riskFactors,
        recommendations,
        marketAnalysis,
        competitors,
        financialProjection
      }

      // Save to database
      const response = await fetch('/api/predictions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          ...predictionResult,
          numberOfFounders: parseInt(formData.numberOfFounders),
          teamSkillDiversity: parseInt(formData.teamSkillDiversity),
          socialMediaPresence: parseInt(formData.socialMediaPresence),
          previousStartupExperience: formData.previousStartupExperience === true
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to save prediction')
      }

      const savedPrediction = await response.json()
      setResult(savedPrediction.data)
      
    } catch (error) {
      console.error('Prediction error:', error)
      alert('An error occurred while processing your prediction. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Handle form field changes
  const handleChange = (field: keyof FormData, value: string | boolean | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error for this field if it exists
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  // Form field component
  const FormField = ({
    label,
    name,
    type = 'text',
    required = false,
    options,
    min,
    max,
    step,
    textarea = false
  }: {
    label: string
    name: keyof FormData
    type?: string
    required?: boolean
    options?: string[]
    min?: number
    max?: number
    step?: number
    textarea?: boolean
  }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {options ? (
        <select
          name={name}
          value={formData[name] as string}
          onChange={(e) => handleChange(name, e.target.value)}
          className={`w-full px-3 py-2 border rounded-md ${errors[name] ? 'border-red-500' : 'border-gray-300'}`}
          required={required}
        >
          <option value="">Select {label.toLowerCase()}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : textarea ? (
        <textarea
          name={name}
          value={formData[name] as string}
          onChange={(e) => handleChange(name, e.target.value)}
          className={`w-full px-3 py-2 border rounded-md ${errors[name] ? 'border-red-500' : 'border-gray-300'}`}
          rows={4}
          required={required}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={formData[name] as string | number}
          onChange={(e) => handleChange(name, e.target.value)}
          className={`w-full px-3 py-2 border rounded-md ${errors[name] ? 'border-red-500' : 'border-gray-300'}`}
          min={min}
          max={max}
          step={step}
          required={required}
        />
      )}
      {errors[name] && (
        <p className="mt-1 text-sm text-red-600">{errors[name]}</p>
      )}
    </div>
  )

  // Result component
  const ResultCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  )

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="flex-1 p-8 ml-64">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Startup Prediction</h1>
          
          {!result ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6 text-gray-800">Tell us about your startup</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Startup Name"
                  name="startupName"
                  required
                />
                
                <FormField
                  label="Industry"
                  name="industry"
                  options={INDUSTRIES}
                  required
                />
                
                <FormField
                  label="Region"
                  name="region"
                  options={REGIONS}
                  required
                />
                
                <FormField
                  label="Stage"
                  name="stage"
                  options={STAGES}
                  required
                />
                
                <FormField
                  label="Founder Experience (years)"
                  name="founderExperience"
                  type="number"
                  min="0"
                  max="30"
                  required
                />
                
                <FormField
                  label="Number of Founders"
                  name="numberOfFounders"
                  type="number"
                  min="1"
                  max="10"
                  required
                />
                
                <FormField
                  label="Team Skill Diversity (1-10)"
                  name="teamSkillDiversity"
                  type="number"
                  min="1"
                  max="10"
                  required
                />
                
                <FormField
                  label="Business Model"
                  name="businessModel"
                  options={BUSINESS_MODELS}
                  required
                />
                
                <FormField
                  label="Target Market Size (in $M)"
                  name="targetMarketSize"
                  type="number"
                  min="0"
                  step="0.1"
                  required
                />
                
                <FormField
                  label="Product Readiness"
                  name="productReadiness"
                  options={STAGES}
                  required
                />
                
                <FormField
                  label="Competition Level"
                  name="competitionLevel"
                  options={['Low', 'Medium', 'High']}
                  required
                />
                
                <FormField
                  label="Runway (months)"
                  name="runway"
                  type="number"
                  min="0"
                  required
                />
                
                <FormField
                  label="Market Maturity"
                  name="marketMaturity"
                  options={MARKET_MATURITY}
                  required
                />
                
                <FormField
                  label="Regulatory Risk"
                  name="regulatoryRisk"
                  options={REGULATORY_RISK}
                  required
                />
                
                <FormField
                  label="Social Media Presence (1-10)"
                  name="socialMediaPresence"
                  type="number"
                  min="1"
                  max="10"
                  required
                />
                
                <div className="md:col-span-2">
                  <FormField
                    label="Idea Description"
                    name="ideaDescription"
                    textarea
                    required
                  />
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <button
                  onClick={handlePredict}
                  disabled={loading}
                  className={`flex items-center px-6 py-3 rounded-md text-white font-medium ${
                    loading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
                  } transition-colors`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin mr-2 h-5 w-5" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Zap className="mr-2 h-5 w-5" />
                      Predict Success
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Prediction Results</h2>
                  <button
                    onClick={() => setResult(null)}
                    className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                  >
                    Start Over
                  </button>
                </div>
                
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-medium text-gray-900">Success Probability</h3>
                    <span className="text-2xl font-bold text-indigo-600">
                      {result.successProbability}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-indigo-600 h-4 rounded-full"
                      style={{ width: `${result.successProbability}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Risk Factors</h3>
                    <div className="space-y-4">
                      {result.riskFactors.map((risk, index) => (
                        <div key={index} className="p-4 bg-red-50 rounded-lg">
                          <div className="flex items-start">
                            <AlertCircle className={`h-5 w-5 ${
                              risk.severity === 'high' ? 'text-red-600' : 
                              risk.severity === 'medium' ? 'text-yellow-500' : 'text-green-500'
                            } mr-2 mt-0.5 flex-shrink-0`} />
                            <div>
                              <p className="font-medium text-gray-900">{risk.factor}</p>
                              <p className="text-sm text-gray-600 mt-1">{risk.impact}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Recommendations</h3>
                    <div className="space-y-4">
                      {result.recommendations.map((rec, index) => (
                        <div key={index} className="p-4 bg-blue-50 rounded-lg">
                          <div className="flex items-start">
                            <div className={`h-5 w-5 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0 ${
                              rec.priority === 'high' ? 'bg-red-500' : 
                              rec.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                            }`}>
                              <span className="text-white text-xs font-bold">
                                {rec.priority.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{rec.action}</p>
                              <p className="text-sm text-gray-600 mt-1">{rec.impact}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Market Analysis</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <p className="text-sm text-gray-500">Market Size</p>
                      <p className="font-medium text-gray-900">{result.marketAnalysis.size}</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-500">Growth Potential</p>
                      <p className="font-medium text-gray-900">{result.marketAnalysis.growth}</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <p className="text-sm text-gray-500">Key Trends</p>
                      <ul className="mt-1 space-y-1">
                        {result.marketAnalysis.trends.map((trend, i) => (
                          <li key={i} className="text-sm text-gray-700">• {trend}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Competitive Landscape</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {result.competitors.map((competitor, index) => (
                      <div key={index} className="p-4 bg-white border rounded-lg">
                        <h4 className="font-medium text-gray-900">{competitor.name}</h4>
                        <div className="mt-2">
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Strength:</span> {competitor.strength}
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Weakness:</span> {competitor.weakness}
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Market Share:</span> {competitor.marketShare}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Financial Projections</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 bg-indigo-50 rounded-lg">
                      <p className="text-sm text-gray-500">6 Months</p>
                      <p className="text-xl font-bold text-indigo-700">{result.financialProjection.sixMonths}</p>
                    </div>
                    <div className="p-4 bg-indigo-100 rounded-lg">
                      <p className="text-sm text-gray-500">1 Year</p>
                      <p className="text-xl font-bold text-indigo-700">{result.financialProjection.oneYear}</p>
                    </div>
                    <div className="p-4 bg-indigo-200 rounded-lg">
                      <p className="text-sm text-gray-500">3 Years</p>
                      <p className="text-xl font-bold text-indigo-700">{result.financialProjection.threeYears}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Next Steps</h3>
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Based on our analysis, we recommend focusing on the following areas to improve your startup's success probability:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Address the high-priority risk factors identified above</li>
                    <li>Implement the recommended actions to strengthen your position</li>
                    <li>Monitor market trends and adjust your strategy accordingly</li>
                    <li>Consider seeking additional funding to extend your runway</li>
                  </ul>
                  <div className="pt-4">
                    <button
                      onClick={() => setResult(null)}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                    >
                      Start a New Prediction
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
