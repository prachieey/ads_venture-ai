"use client"

import { Navigation } from "@/components/navigation"
import { Lightbulb, TrendingUp, AlertCircle } from "lucide-react"
import { useState } from "react"

export default function InsightsPage() {
  const [expandedInsight, setExpandedInsight] = useState(0)

  const insights = [
    {
      title: "Market Consolidation Trend",
      description: "SaaS ventures in B2B space show 34% higher success rates when focusing on vertical integration",
      improvement: "+23%",
      category: "Market",
      details: "Data from 2,400+ ventures analyzed shows companies that consolidate features perform better",
    },
    {
      title: "Team Composition Matters",
      description: "Teams with prior exit experience show 2.8x better outcomes in Series B fundraising",
      improvement: "+28%",
      category: "Team",
      details: "Founders with previous successful exits have significantly lower failure rates",
    },
    {
      title: "Funding Timeline Optimization",
      description: "Ventures raising Series A within 18-24 months see 41% better unit economics",
      improvement: "+41%",
      category: "Funding",
      details: "Optimal timing for Series A fundraising correlates with better long-term performance",
    },
    {
      title: "Geographic Advantage",
      description:
        "West Coast ventures get 3.2x more institutional funding but East Coast has higher acquisition rates",
      improvement: "+31%",
      category: "Geographic",
      details: "Different regions have different success drivers - align strategy accordingly",
    },
  ]

  return (
    <div className="flex">
      <Navigation />
      <main className="ml-64 flex-1 min-h-screen bg-gradient-to-br from-[#F9F9FB] to-[#F0E6FF] p-8">
        <h1 className="text-4xl font-bold text-[#2E2E3A] mb-3">AI-Powered Insights</h1>
        <p className="text-[#2E2E3A]/60 mb-8">Machine learning-driven recommendations based on market data analysis</p>

        {/* Insights Grid */}
        <div className="space-y-4">
          {insights.map((insight, i) => (
            <div
              key={i}
              onClick={() => setExpandedInsight(expandedInsight === i ? -1 : i)}
              className="glass p-6 rounded-xl cursor-pointer hover:shadow-lg transition border-l-4 border-[#7F00FF]"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Lightbulb className="w-5 h-5 text-[#7F00FF]" />
                    <h3 className="text-lg font-semibold text-[#2E2E3A]">{insight.title}</h3>
                  </div>
                  <p className="text-[#2E2E3A]/70">{insight.description}</p>

                  {expandedInsight === i && (
                    <div className="mt-4 pt-4 border-t border-[#00FFE7]/20">
                      <p className="text-[#2E2E3A]/60 text-sm mb-3">{insight.details}</p>
                      <div className="bg-[#F0E6FF] p-3 rounded-lg">
                        <p className="text-sm text-[#2E2E3A]">
                          <span className="font-semibold">Recommendation:</span> Incorporate this insight into your
                          venture strategy to optimize success probability.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="text-right ml-4">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#FF6F61]/10 text-[#FF6F61] mb-2">
                    {insight.category}
                  </span>
                  <div className="text-2xl font-bold text-gradient">{insight.improvement}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Key Metrics Summary */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="glass p-6 rounded-xl">
            <AlertCircle className="w-8 h-8 text-[#FF6F61] mb-3" />
            <p className="text-[#2E2E3A]/60 text-sm mb-1">Critical Factors</p>
            <p className="text-2xl font-bold text-[#2E2E3A]">8</p>
            <p className="text-xs text-[#2E2E3A]/50 mt-2">Monitored in your profile</p>
          </div>
          <div className="glass p-6 rounded-xl">
            <TrendingUp className="w-8 h-8 text-[#00FFE7] mb-3" />
            <p className="text-[#2E2E3A]/60 text-sm mb-1">Optimization Potential</p>
            <p className="text-2xl font-bold text-[#2E2E3A]">+34%</p>
            <p className="text-xs text-[#2E2E3A]/50 mt-2">Based on AI analysis</p>
          </div>
          <div className="glass p-6 rounded-xl">
            <Lightbulb className="w-8 h-8 text-[#7F00FF] mb-3" />
            <p className="text-[#2E2E3A]/60 text-sm mb-1">New Insights</p>
            <p className="text-2xl font-bold text-[#2E2E3A]">4</p>
            <p className="text-xs text-[#2E2E3A]/50 mt-2">Updated this week</p>
          </div>
        </div>
      </main>
    </div>
  )
}
