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
  riskFactors: string[];
  recommendations: string[];
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
    setTimeout(() => {
      let score = 50
      
      const founderExp = parseInt(formData.founderExperience) || 0
      score += Math.min(15, founderExp * 1.5)
      
      const diversityScore = parseInt(formData.teamSkillDiversity) || 5
      score += (diversityScore - 5) * 2
      
      const marketSize = parseFloat(formData.targetMarketSize) || 0
      if (marketSize > 10) score += 10
      else if (marketSize > 1) score += 5
      
      const readinessMap: Record<string, number> = { "Idea": 0, "Prototype": 5, "MVP": 10, "Beta": 13, "Launched": 15 }
      score += readinessMap[formData.productReadiness] || 0
      
      const runwayMonths = parseInt(formData.runway) || 0
      if (runwayMonths >= 18) score += 10
      else if (runwayMonths >= 12) score += 7
      else if (runwayMonths >= 6) score += 3
      
      score = Math.max(10, Math.min(90, Math.round(score)))
      
      const riskFactors: string[] = []
      if (founderExp < 3) riskFactors.push("Limited founder experience in the industry")
      if (formData.competitionLevel === "High") riskFactors.push("High competition in the target market")
      if (runwayMonths < 6) riskFactors.push("Limited financial runway")
      if (formData.regulatoryRisk === "High") riskFactors.push("High regulatory risk in chosen market")
      if (diversityScore < 5) riskFactors.push("Limited team skill diversity")

      const recommendations: string[] = []
      if (founderExp < 3) recommendations.push("Consider adding advisors with industry experience")
      if (formData.competitionLevel === "High") recommendations.push("Develop a strong unique value proposition")
      if (runwayMonths < 12) recommendations.push("Focus on extending runway or securing additional funding")
      if (diversityScore < 5) recommendations.push("Consider adding team members with complementary skills")

      setResult({
        successProbability: score,
        riskFactors: riskFactors.length > 0 ? riskFactors : ["No major risk factors identified"],
        recommendations: recommendations.length > 0 ? recommendations : ["Continue current growth strategy"]
      })
      
      setLoading(false)
    }, 2000)
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
              <h2 className="text-2xl font-bold text-[#2E2E3A] mb-6">Prediction Results</h2>

              {/* Success Gauge */}
              <div className="mb-8 text-center">
                <div className="relative w-40 h-40 mx-auto mb-4">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#E5E7EB" strokeWidth="8" />
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="8"
                      strokeDasharray={`${(result.successProbability / 100) * 314} 314`}
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#7F00FF" />
                        <stop offset="100%" stopColor="#00FFE7" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-4xl font-bold bg-gradient-to-r from-[#7F00FF] to-[#00FFE7] bg-clip-text text-transparent">
                      {result.successProbability.toFixed(1)}%
                    </div>
                    <div className="text-sm text-[#2E2E3A]/60">Success Rate</div>
                  </div>
                </div>
              </div>

              {/* Risk Factors */}
              <div className="mb-6">
                <h3 className="font-semibold text-[#2E2E3A] mb-3">Risk Factors</h3>
                <ul className="space-y-2">
                  {result.riskFactors.map((factor, i) => (
                    <li key={i} className="flex items-center gap-2 text-[#2E2E3A]/70">
                      <span className="w-2 h-2 rounded-full bg-[#FF6F61] flex-shrink-0"></span>
                      {factor}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommendations */}
              <div>
                <h3 className="font-semibold text-[#2E2E3A] mb-3">Recommendations</h3>
                <ul className="space-y-2">
                  {result.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-2 text-[#2E2E3A]/70">
                      <span className="w-2 h-2 rounded-full bg-[#00FFE7] mt-1.5 flex-shrink-0"></span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}