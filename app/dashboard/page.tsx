"use client"

import { Navigation } from "@/components/navigation"
import { BarChart3, TrendingUp, Zap, AlertCircle, ArrowRight, CheckCircle, AlertTriangle, Info } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

type AnalysisResult = {
  successProbability: number
  riskLevel: 'Low' | 'Medium' | 'High'
  focusArea: string
  isHighPotential: boolean
}

const focusAreas = [
  'Marketing Strategy',
  'Funding & Investment',
  'Product Innovation',
  'Market Expansion',
  'Operational Efficiency',
  'Customer Acquisition',
  'Team Building',
  'Technology Stack'
]

const riskLevels = ['Low', 'Medium', 'High'] as const

const generateAnalysis = (): AnalysisResult => {
  const successProbability = Math.floor(Math.random() * 60) + 20 // 20-80%
  const riskLevel = riskLevels[Math.floor(Math.random() * riskLevels.length)]
  const focusArea = focusAreas[Math.floor(Math.random() * focusAreas.length)]
  
  return {
    successProbability,
    riskLevel,
    focusArea,
    isHighPotential: successProbability > 70
  }
}

const ProgressCircle = ({ value, size = 80, strokeWidth = 6 }) => {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (value / 100) * circumference
  
  const getColor = (val: number) => {
    if (val < 30) return '#EF4444' // red
    if (val < 70) return '#F59E0B' // amber
    return '#10B981' // emerald
  }

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="w-full h-full" viewBox={`0 0 ${size} ${size}`}>
        {/* Background circle */}
        <circle
          className="text-gray-200"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress circle */}
        <circle
          className="transition-all duration-1000 ease-in-out transform -rotate-90 origin-center"
          stroke={getColor(value)}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold" style={{ color: getColor(value) }}>
          {value}%
        </span>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)

  const stats = [
    { label: "Total Predictions", value: "1,245", trend: "+12%", icon: TrendingUp },
    { label: "Success Rate", value: "87.3%", trend: "+2.1%", icon: Zap },
    { label: "Active Ventures", value: "156", trend: "+8", icon: BarChart3 },
  ]

  const runAnalysis = () => {
    setIsLoading(true)
    setAnalysis(null)
    
    // Simulate API call
    setTimeout(() => {
      const result = generateAnalysis()
      setAnalysis(result)
      setIsLoading(false)
      
      if (result.isHighPotential) {
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 3000)
      }
    }, 2000)
  }

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'High':
        return <AlertCircle className="w-4 h-4 text-red-500" />
      case 'Medium':
        return <AlertTriangle className="w-4 h-4 text-amber-500" />
      default:
        return <CheckCircle className="w-4 h-4 text-emerald-500" />
    }
  }

  return (
    <div className="flex">
      <Navigation />
      <main className="ml-64 flex-1 min-h-screen bg-gradient-to-br from-[#F9F9FB] to-[#F0E6FF] p-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-[#2E2E3A] mb-2">Welcome back, Entrepreneur!</h1>
          <p className="text-[#2E2E3A]/60">Here's your venture intelligence overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, i) => (
            <div key={i} className="glass p-6 rounded-2xl border-l-4 border-[#7F00FF] hover:shadow-lg transition">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-[#2E2E3A]/60 text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-[#2E2E3A]">{stat.value}</p>
                </div>
                <stat.icon className="w-8 h-8 text-[#7F00FF]" />
              </div>
              <p className="text-[#00FFE7] text-sm font-medium">{stat.trend} this month</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass p-8 rounded-2xl relative overflow-hidden">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-2xl font-bold text-[#2E2E3A]">Quick Analysis</h2>
              <div className="group relative">
                <Info className="w-5 h-5 text-[#7F00FF] cursor-help" />
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-48 bg-[#2E2E3A] text-white text-xs rounded-lg p-2 shadow-lg z-10">
                  AI-generated quick summary based on your venture's current metrics
                </div>
              </div>
            </div>
            
            <AnimatePresence>
              {!analysis && !isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-6"
                >
                  <p className="text-[#2E2E3A]/60 mb-6">Get instant predictions for your venture metrics</p>
                  <motion.button
                    onClick={() => router.push('/predict')}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#7F00FF] to-[#00FFE7] text-white font-medium hover:shadow-lg hover:shadow-[#7F00FF]/50 transition flex items-center gap-2"
                  >
                    <Zap className="w-5 h-5" />
                    Start Prediction
                  </motion.button>
                </motion.div>
              )}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col items-center justify-center py-8"
                >
                  <div className="w-12 h-12 border-4 border-[#7F00FF] border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-[#2E2E3A]/80">Analyzing your venture...</p>
                </motion.div>
              )}

              {analysis && !isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
                  className="space-y-6"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-[#2E2E3A]">Success Probability</h3>
                      <p className="text-sm text-[#2E2E3A]/60">Chance of meeting key milestones</p>
                    </div>
                    <ProgressCircle value={analysis.successProbability} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-medium text-[#2E2E3A]">Risk Level</h4>
                        {getRiskIcon(analysis.riskLevel)}
                      </div>
                      <div className={`px-3 py-1.5 rounded-full text-xs font-medium w-fit ${
                        analysis.riskLevel === 'High' 
                          ? 'bg-red-100 text-red-800' 
                          : analysis.riskLevel === 'Medium'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {analysis.riskLevel} Risk
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-[#2E2E3A] mb-1">Focus Area</h4>
                      <div className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#7F00FF]/10 text-[#7F00FF] w-fit">
                        {analysis.focusArea}
                      </div>
                    </div>
                  </div>

                  <motion.button
                    onClick={() => router.push('/predict')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-4 px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#7F00FF] to-[#00FFE7] text-white font-medium text-sm flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#7F00FF]/30 transition"
                  >
                    Go to Predict
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>

                  <button
                    onClick={() => setAnalysis(null)}
                    className="w-full text-center text-sm text-[#7F00FF] hover:text-[#6a00d6] transition mt-2"
                  >
                    Run New Analysis
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Confetti effect for high potential */}
            <AnimatePresence>
              {showConfetti && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 overflow-hidden pointer-events-none"
                >
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 rounded-full"
                      style={{
                        background: ['#7F00FF', '#00FFE7', '#FF6F61'][Math.floor(Math.random() * 3)],
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                      }}
                      initial={{ y: -50, opacity: 0 }}
                      animate={{
                        y: [0, 100],
                        x: Math.random() > 0.5 ? [0, 50] : [0, -50],
                        opacity: [0, 1, 0],
                        scale: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: 'loop',
                        delay: i * 0.1,
                        ease: 'easeInOut'
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="glass p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-[#2E2E3A] mb-4">Market Insights</h2>
            <p className="text-[#2E2E3A]/60 mb-6">Explore AI-powered market trends and opportunities</p>
            <button 
              onClick={() => router.push('/insights')}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#FF6F61] to-[#7F00FF] text-white font-medium hover:shadow-lg hover:shadow-[#FF6F61]/50 transition flex items-center gap-2"
            >
              View Insights
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
