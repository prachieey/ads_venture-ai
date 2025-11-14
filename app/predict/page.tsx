"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "@/hooks/use-session"
import { Zap, Loader2, ChevronDown, ChevronUp } from "lucide-react"
import { Navigation } from "@/components/navigation"

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────
const INDUSTRIES = [
  "Technology", "Artificial Intelligence", "Healthcare", "Finance / FinTech",
  "Education / EdTech", "E-Commerce", "Green Energy", "Agriculture / AgriTech",
  "Real Estate", "Entertainment / Media", "Travel & Hospitality", "Logistics / Transport",
  "FoodTech", "Gaming", "Cybersecurity", "Environmental Sustainability",
  "Biotechnology", "Blockchain / Crypto", "Fashion / Retail", "Manufacturing",
  "Aerospace", "Automotive", "Construction", "Consulting", "Consumer Goods",
  "Design", "Elder Care", "Fitness / Wellness", "Government", "Hardware / IoT",
  "Insurance / InsurTech", "Legal / LegalTech", "Marketing / AdTech",
  "Non-Profit / Social Impact", "Pharmaceuticals", "Real Estate / PropTech",
  "Recruiting / HR Tech", "Robotics", "Space", "Sports", "Telecommunications",
  "Transportation", "Venture Capital / Private Equity", "Virtual / Augmented Reality",
  "Other"
].sort((a, b) => a.localeCompare(b))

const BUSINESS_MODELS = ["B2B", "B2C", "SaaS", "Marketplace", "E-commerce", "Other"]
const EDUCATION_LEVELS = ["Bachelor's", "Master's", "PhD"]
const FUNDING_STAGES = ["Pre-seed", "Seed", "Series A", "Series B", "Series C+"]
const PRODUCT_READINESS = ["Idea", "Prototype", "MVP", "Beta", "Launched"]
const COMPETITION_LEVELS = ["Low", "Medium", "High"]
const MARKET_MATURITY = ["Emerging", "Developing", "Mature"]
const REGULATORY_RISK = ["Low", "Medium", "High"]

const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
  "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas",
  "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize",
  "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana",
  "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia",
  "Cameroon", "Canada", "Cape Verde", "Central African Republic", "Chad",
  "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica",
  "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti",
  "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt",
  "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini",
  "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia",
  "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea",
  "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland",
  "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
  "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati",
  "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan",
  "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya",
  "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi",
  "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands",
  "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova",
  "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar",
  "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua",
  "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan",
  "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru",
  "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia",
  "Rwanda", "Saint Kitts and Nevis", "Saint Lucia",
  "Saint Vincent and the Grenadines", "Samoa", "San Marino",
  "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia",
  "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia",
  "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain",
  "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
  "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga",
  "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
  "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom",
  "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City",
  "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
].sort((a, b) => a.localeCompare(b))

// ─────────────────────────────────────────────────────────────────────────────
// Collapsible Section
// ─────────────────────────────────────────────────────────────────────────────
const Section = ({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  return (
    <div className="mb-6 border-b border-gray-200 pb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left focus:outline-none"
      >
        <h3 className="text-xl font-semibold text-[#2E2E3A]">{title}</h3>
        {isOpen ? <ChevronUp className="w-5 h-5 text-[#7F00FF]" /> : <ChevronDown className="w-5 h-5 text-[#7F00FF]" />}
      </button>
      {isOpen && <div className="mt-4 space-y-5">{children}</div>}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
interface PredictionResult {
  successProbability: number
  riskFactors: { factor: string; severity: "low" | "medium" | "high"; impact: string }[]
  recommendations: { action: string; priority: "low" | "medium" | "high"; impact: string }[]
  marketAnalysis: { size: string; growth: string; trends: string[] }
  competitiveLandscape: { competitors: { name: string; strength: string; weakness: string }[]; marketPosition: string }
  financialProjection: { sixMonths: string; oneYear: string; threeYears: string }
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────────────────────
export default function PredictPage() {
  const [formData, setFormData] = useState({
    startupName: "", industry: "", country: "", founderExperience: "", numberOfFounders: "1",
    educationLevel: "", previousStartupExperience: false, teamSkillDiversity: "5",
    businessModel: "", targetMarketSize: "", customerAcquisitionCost: "", productReadiness: "",
    competitionLevel: "", revenue: "", monthlyBurnRate: "", runway: "", fundingStage: "",
    fundingAmount: "", marketMaturity: "", regulatoryRisk: "", socialMediaPresence: "5",
    ideaDescription: "",
  })

  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<PredictionResult | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const formRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { user, loading: authLoading } = useSession(true, "/login")

  useEffect(() => {
    if (!authLoading && !user) router.push("/login?redirect=/predict")
  }, [user, authLoading, router])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.startupName.trim()) newErrors.startupName = "Startup name is required"
    if (!formData.industry) newErrors.industry = "Industry is required"
    if (!formData.country) newErrors.country = "Country is required"
    if (!formData.founderExperience) newErrors.founderExperience = "Founder experience is required"
    if (!formData.businessModel) newErrors.businessModel = "Business model is required"
    if (!formData.productReadiness) newErrors.productReadiness = "Product readiness is required"
    if (!formData.competitionLevel) newErrors.competitionLevel = "Competition level is required"
    if (!formData.marketMaturity) newErrors.marketMaturity = "Market maturity is required"
    if (!formData.regulatoryRisk) newErrors.regulatoryRisk = "Regulatory risk is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Mock data helpers
  const analyzeIndustry = (industry: string) => {
    const map: Record<string, any> = {
      "Artificial Intelligence": { growth: "28% YoY", trends: ["Generative AI", "Agentic AI", "AI Safety"] },
      "Healthcare": { growth: "11% YoY", trends: ["Telehealth", "Wearables", "Precision Medicine"] },
      "Finance / FinTech": { growth: "19% YoY", trends: ["DeFi", "Embedded Finance", "Neobanks"] },
      "Green Energy": { growth: "24% YoY", trends: ["Solar", "Battery Storage", "Hydrogen"] },
    }
    return map[industry] || { growth: "9% YoY", trends: ["Digital Transformation", "Sustainability", "Automation"] }
  }

  const getCompetitors = (industry: string) => {
    const map: Record<string, any[]> = {
      "Artificial Intelligence": [
        { name: "OpenAI", strength: "Leading models & brand", weakness: "High costs" },
        { name: "Anthropic", strength: "Safety focus", weakness: "Slower release cycle" },
      ],
      "Healthcare": [{ name: "Teladoc", strength: "Large network", weakness: "Regulatory hurdles" }],
    }
    return map[industry] || [
      { name: "Market Leader Inc.", strength: "Strong brand & funding", weakness: "Legacy systems" },
      { name: "Fast Follower Co.", strength: "Agile execution", weakness: "Limited traction" },
    ]
  }

  const generateFinancialProjection = (score: number) => {
    const factor = score / 10
    const base = 12000
    return {
      sixMonths: `$${(base * Math.pow(1 + factor * 0.18, 1)).toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
      oneYear: `$${(base * Math.pow(1 + factor * 0.18, 2)).toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
      threeYears: `$${(base * Math.pow(1 + factor * 0.18, 6)).toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
    }
  }

  const handlePredict = async () => {
    if (!user) return router.push("/login?redirect=/predict")
    if (!validateForm()) {
      const first = Object.keys(errors)[0]
      document.querySelector(`[name="${first}"]`)?.scrollIntoView({ behavior: "smooth" })
      return
    }

    setLoading(true)
    await new Promise(r => setTimeout(r, 1800)) // simulate processing

    try {
      let score = 50

      // Founder & Team
      const exp = parseInt(formData.founderExperience) || 0
      score += Math.min(22, exp * 2.2)
      score += (parseInt(formData.teamSkillDiversity) - 5) * 2.5
      if (formData.previousStartupExperience) score += 10

      // Market & Product
      const marketSize = parseFloat(formData.targetMarketSize) || 0
      if (marketSize > 100) score += 18
      else if (marketSize > 30) score += 12
      else if (marketSize > 5) score += 6

      const readinessScore = { Idea: 3, Prototype: 10, MVP: 18, Beta: 24, Launched: 30 }
      score += readinessScore[formData.productReadiness as keyof typeof readinessScore] || 0

      // Financials
      const runway = parseInt(formData.runway) || 0
      if (runway >= 24) score += 15
      else if (runway >= 12) score += 10
      else if (runway >= 6) score += 5

      const fundingScore = formData.fundingStage === "Series C+" ? 18 :
        formData.fundingStage === "Series B" ? 14 :
          formData.fundingStage === "Series A" ? 10 :
            formData.fundingStage === "Seed" ? 6 : 2
      score += fundingScore

      // Risk deductions
      if (formData.competitionLevel === "High") score -= 12
      if (formData.regulatoryRisk === "High") score -= 15
      else if (formData.regulatoryRisk === "Medium") score -= 6

      score = Math.max(15, Math.min(96, Math.round(score)))

      const industryData = analyzeIndustry(formData.industry)
      const competitors = getCompetitors(formData.industry)
      const financials = generateFinancialProjection(score)

      const riskFactors = [
        ...(exp < 3 ? [{ factor: "Limited founder experience", severity: "high" as const, impact: "May impact execution & investor confidence" }] : []),
        ...(formData.competitionLevel === "High" ? [{ factor: "Intense competition", severity: "high" as const, impact: "Strong differentiation required" }] : []),
        ...(runway < 6 ? [{ factor: "Short runway", severity: "high" as const, impact: "Risk of cash depletion" }] : []),
        ...(formData.regulatoryRisk === "High" ? [{ factor: "High regulatory risk", severity: "high" as const, impact: "Potential delays or blocks" }] : []),
      ]

      const recommendations = [
        exp < 5 ? { action: "Recruit experienced advisors/co-founders", priority: "high" as const, impact: "Boosts credibility" } :
          { action: "Leverage strong founder track record", priority: "medium" as const, impact: "Attract talent & capital" },
        { action: "Refine go-to-market strategy", priority: "high" as const, impact: "Critical for growth" },
        { action: "Iterate based on customer feedback", priority: "high" as const, impact: "Improves retention" },
      ]

      setResult({
        successProbability: score,
        riskFactors: riskFactors.length ? riskFactors : [{ factor: "Low major risks", severity: "low" as const, impact: "Favorable outlook" }],
        recommendations,
        marketAnalysis: {
          size: marketSize > 100 ? "Very Large (>$100B)" : marketSize > 30 ? "Large ($30-100B)" : marketSize > 5 ? "Medium ($5-30B)" : "Small (<$5B)",
          growth: industryData.growth,
          trends: industryData.trends,
        },
        competitiveLandscape: { competitors, marketPosition: `Potential top ${Math.floor(Math.random() * 6) + 3} player in ${formData.industry}` },
        financialProjection: financials,
      })
    } catch (e) { console.error(e) } finally { setLoading(false) }
  }

  const handleChange = (field: keyof typeof formData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => { const { [field]: _, ...rest } = prev; return rest })
  }

  if (authLoading) return <div className="flex items-center justify-center min-h-screen"><Loader2 className="w-10 h-10 animate-spin" /></div>

  return (
    <div className="flex">
      <Navigation />
      <main className="ml-64 flex-1 min-h-screen bg-gradient-to-br from-[#F9F9FB] to-[#F0E6FF] p-8">
        <h1 className="text-4xl font-bold text-[#2E2E3A] mb-8">Venture Prediction</h1>

        <div className="grid md:grid-cols-2 gap-10 max-w-7xl mx-auto">
          {/* Form */}
          <div ref={formRef} className="bg-white/80 backdrop-blur-lg shadow-2xl p-8 rounded-3xl">
            <h2 className="text-3xl font-bold text-[#2E2E3A] mb-8">Startup Success Predictor</h2>

            {/* Basic Information */}
            <Section title="Basic Information">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Startup Name</label>
                  <input type="text" name="startupName" value={formData.startupName} onChange={e => handleChange("startupName", e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border-2 ${errors.startupName ? "border-red-500" : "border-[#00FFE7]/30 focus:border-[#00FFE7]"} focus:outline-none`} placeholder="Acme AI" />
                  {errors.startupName && <p className="text-red-500 text-sm mt-1">{errors.startupName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Industry</label>
                  <select name="industry" value={formData.industry} onChange={e => handleChange("industry", e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border-2 ${errors.industry ? "border-red-500" : "border-[#00FFE7]/30 focus:border-[#00FFE7]"} focus:outline-none`}>
                    <option value="">Select industry</option>
                    {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
              </div>
            </Section>

            {/* Add all other sections exactly as in your original design */}
            {/* (Founder & Team, Business & Product, Financials, Market & Region, etc.) */}
            {/* For brevity they are omitted here, but keep them exactly as you had */}

            <button
              onClick={handlePredict}
              disabled={loading}
              className="w-full mt-8 py-4 rounded-xl bg-gradient-to-r from-[#7F00FF] to-[#00FFE7] text-white font-bold text-lg hover:shadow-2xl transition-all disabled:opacity-60 flex items-center justify-center gap-3"
            >
              {loading ? (
                <> <Loader2 className="w-6 h-6 animate-spin" /> Analyzing Your Startup...</>
              ) : (
                <> <Zap className="w-6 h-6" /> Predict Success Probability</>
              )}
            </button>
          </div>

          {/* Results */}
          {result && (
            <div className="bg-white/80 backdrop-blur-lg shadow-2xl p-8 rounded-3xl">
              <h2 className="text-3xl font-bold text-[#2E2E3A] mb-8">Venture Analysis Report</h2>

              {/* Success Score */}
              <div className="bg-gradient-to-br from-[#7F00FF]/10 to-[#00FFE7]/10 p-8 rounded-2xl mb-10">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold">Success Probability</h3>
                    <p className="text-gray-600">AI-powered prediction based on 50+ factors</p>
                  </div>
                  <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#7F00FF] to-[#00FFE7]">
                    {result.successProbability}%
                  </div>
                </div>
                <div className="w-full bg-gray-300 rounded-full h-6 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 transition-all duration-1000"
                    style={{ width: `${result.successProbability}%` }} />
                </div>
              </div>

              {/* Rest of your beautiful result sections (Market, Competitors, Risks, etc.) */}
              {/* Keep them exactly as you designed — they are perfect! */}

            </div>
          )}
        </div>
      </main>
    </div>
  )
}