"use client"

import { Navigation } from "@/components/navigation"
import { Filter } from "lucide-react"

export default function VisualizePage() {
  const chartData = [
    { name: "Q1", value: 65, percentage: "65%" },
    { name: "Q2", value: 72, percentage: "72%" },
    { name: "Q3", value: 81, percentage: "81%" },
    { name: "Q4", value: 78, percentage: "78%" },
  ]

  const maxValue = 100

  return (
    <div className="flex">
      <Navigation />
      <main className="ml-64 flex-1 min-h-screen bg-gradient-to-br from-[#F9F9FB] to-[#F0E6FF] p-8">
        <h1 className="text-4xl font-bold text-[#2E2E3A] mb-8">Market Visualization</h1>

        {/* Filter Bar */}
        <div className="glass p-4 rounded-lg mb-8 flex items-center gap-3">
          <Filter className="w-5 h-5 text-[#7F00FF]" />
          <select className="bg-transparent border-none outline-none text-[#2E2E3A] cursor-pointer">
            <option>All Sectors</option>
            <option>SaaS</option>
            <option>Healthcare</option>
            <option>FinTech</option>
          </select>
        </div>

        {/* Charts Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Bar Chart */}
          <div className="glass p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-[#2E2E3A] mb-6">Success Trend</h2>
            <div className="space-y-4">
              {chartData.map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-[#2E2E3A]">{item.name}</span>
                    <span className="text-sm font-bold text-[#7F00FF]">{item.percentage}</span>
                  </div>
                  <div className="h-3 bg-[#00FFE7]/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#7F00FF] to-[#00FFE7]"
                      style={{ width: `${(item.value / maxValue) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sector Distribution */}
          <div className="glass p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-[#2E2E3A] mb-6">Sector Distribution</h2>
            <div className="space-y-4">
              {[
                { sector: "SaaS", value: 35, color: "#7F00FF" },
                { sector: "FinTech", value: 28, color: "#00FFE7" },
                { sector: "HealthTech", value: 22, color: "#FF6F61" },
                { sector: "Other", value: 15, color: "#2E2E3A" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-[#2E2E3A] flex-1">{item.sector}</span>
                  <span className="font-bold text-[#2E2E3A]">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Table */}
        <div className="glass p-8 rounded-2xl mt-8">
          <h2 className="text-2xl font-bold text-[#2E2E3A] mb-6">Market Analysis</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-[#7F00FF]/20">
                  <th className="px-4 py-3 text-left text-[#2E2E3A] font-semibold">Metric</th>
                  <th className="px-4 py-3 text-left text-[#2E2E3A] font-semibold">Value</th>
                  <th className="px-4 py-3 text-left text-[#2E2E3A] font-semibold">Trend</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { metric: "Market Cap", value: "$2.3T", trend: "↑ 12%" },
                  { metric: "Active Ventures", value: "15.2K", trend: "↑ 8%" },
                  { metric: "Avg Funding", value: "$12.5M", trend: "↓ 3%" },
                  { metric: "Success Rate", value: "78%", trend: "↑ 2%" },
                ].map((item, i) => (
                  <tr key={i} className="border-b border-[#00FFE7]/20 hover:bg-[#7F00FF]/5 transition">
                    <td className="px-4 py-3 text-[#2E2E3A]">{item.metric}</td>
                    <td className="px-4 py-3 text-[#2E2E3A] font-semibold">{item.value}</td>
                    <td className="px-4 py-3 text-[#00FFE7] font-medium">{item.trend}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
