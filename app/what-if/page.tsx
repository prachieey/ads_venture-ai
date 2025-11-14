"use client"

import { Navigation } from "@/components/navigation"
import { Settings } from "lucide-react"
import { useState } from "react"

export default function WhatIfPage() {
  const [sliders, setSliders] = useState({
    marketGrowth: 50,
    teamExpansion: 50,
    marketingBudget: 50,
  })

  const calculateSuccess = () => {
    const avg = (sliders.marketGrowth + sliders.teamExpansion + sliders.marketingBudget) / 3
    return Math.min(95, Math.max(40, avg + 25))
  }

  return (
    <div className="flex">
      <Navigation />
      <main className="ml-64 flex-1 min-h-screen bg-gradient-to-br from-[#F9F9FB] to-[#F0E6FF] p-8">
        <h1 className="text-4xl font-bold text-[#2E2E3A] mb-8">What-If Scenarios</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Controls */}
          <div className="glass p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-[#2E2E3A] mb-6 flex items-center gap-2">
              <Settings className="w-6 h-6 text-[#7F00FF]" />
              Adjust Scenarios
            </h2>
            <div className="space-y-8">
              {[
                { label: "Market Growth Rate", key: "marketGrowth", unit: "%" },
                { label: "Team Expansion", key: "teamExpansion", unit: "headcount" },
                { label: "Marketing Budget", key: "marketingBudget", unit: "% increase" },
              ].map(({ label, key, unit }) => (
                <div key={key}>
                  <div className="flex justify-between mb-3">
                    <label className="font-medium text-[#2E2E3A]">{label}</label>
                    <span className="text-lg font-bold text-[#7F00FF]">
                      {sliders[key as keyof typeof sliders]}
                      {unit}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliders[key as keyof typeof sliders]}
                    onChange={(e) => setSliders({ ...sliders, [key]: Number.parseInt(e.target.value) })}
                    className="w-full h-2 bg-[#00FFE7]/20 rounded-lg appearance-none cursor-pointer accent-[#7F00FF]"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="glass p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-[#2E2E3A] mb-6">Projected Outcomes</h2>

            {/* Success Score */}
            <div className="mb-8 p-6 bg-gradient-to-br from-[#7F00FF]/10 to-[#00FFE7]/10 rounded-xl">
              <p className="text-[#2E2E3A]/60 mb-2">Success Probability</p>
              <p className="text-5xl font-bold text-gradient">{calculateSuccess()}%</p>
              <p className="text-[#2E2E3A]/60 text-sm mt-2">Based on current scenario adjustments</p>
            </div>

            {/* Impact Breakdown */}
            <div className="space-y-3">
              <h3 className="font-semibold text-[#2E2E3A] mb-4">Impact Analysis</h3>
              {[
                { factor: "Revenue Impact", value: "+$2.3M" },
                { factor: "Timeline", value: "-4 months" },
                { factor: "Risk Reduction", value: "23%" },
              ].map((item, i) => (
                <div key={i} className="flex justify-between p-3 bg-[#F0E6FF] rounded-lg">
                  <span className="text-[#2E2E3A]">{item.factor}</span>
                  <span className="font-bold text-[#7F00FF]">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
