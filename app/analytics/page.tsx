"use client"

import { Navigation } from "@/components/navigation"
import { Download, Calendar } from "lucide-react"
import { useState } from "react"

export default function AnalyticsPage() {
  const [selectedRows, setSelectedRows] = useState<number[]>([])

  const history = [
    { id: 1, date: "2025-01-09", venture: "TechVenture AI", prediction: "87%", riskLevel: "Low", status: "Success" },
    {
      id: 2,
      date: "2025-01-08",
      venture: "FinTech Solutions",
      prediction: "72%",
      riskLevel: "Medium",
      status: "In Progress",
    },
    { id: 3, date: "2025-01-07", venture: "HealthTech Pro", prediction: "91%", riskLevel: "Low", status: "Success" },
    {
      id: 4,
      date: "2025-01-06",
      venture: "CloudScale Inc",
      prediction: "65%",
      riskLevel: "High",
      status: "Monitoring",
    },
    { id: 5, date: "2025-01-05", venture: "AI Analytics", prediction: "84%", riskLevel: "Low", status: "Success" },
    { id: 6, date: "2025-01-04", venture: "Blockchain Labs", prediction: "58%", riskLevel: "High", status: "At Risk" },
  ]

  const toggleRow = (id: number) => {
    setSelectedRows((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case "Low":
        return "text-[#00FFE7]"
      case "Medium":
        return "text-[#FF6F61]"
      case "High":
        return "text-red-500"
      default:
        return "text-[#2E2E3A]"
    }
  }

  return (
    <div className="flex">
      <Navigation />
      <main className="ml-64 flex-1 min-h-screen bg-gradient-to-br from-[#F9F9FB] to-[#F0E6FF] p-8">
        <h1 className="text-4xl font-bold text-[#2E2E3A] mb-3">Analytics & History</h1>
        <p className="text-[#2E2E3A]/60 mb-8">Track all your venture predictions and analysis results</p>

        {/* Filters */}
        <div className="glass p-4 rounded-lg mb-8 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-[#2E2E3A]/60">
            <Calendar className="w-5 h-5" />
            <span className="text-sm">Date Range:</span>
          </div>
          <select className="px-3 py-2 rounded-lg bg-white border border-[#00FFE7]/30 text-[#2E2E3A] text-sm cursor-pointer">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>All time</option>
          </select>

          <select className="px-3 py-2 rounded-lg bg-white border border-[#00FFE7]/30 text-[#2E2E3A] text-sm cursor-pointer ml-auto">
            <option>All Status</option>
            <option>Success</option>
            <option>In Progress</option>
            <option>At Risk</option>
          </select>

          <button className="px-4 py-2 rounded-lg bg-[#7F00FF] text-white text-sm font-medium hover:shadow-lg hover:shadow-[#7F00FF]/50 transition flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>

        {/* Table */}
        <div className="glass rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#7F00FF]/10 border-b-2 border-[#7F00FF]/20">
                  <th className="px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedRows(history.map((h) => h.id))
                        } else {
                          setSelectedRows([])
                        }
                      }}
                      className="w-4 h-4 accent-[#7F00FF] cursor-pointer"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#2E2E3A]">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#2E2E3A]">Venture Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#2E2E3A]">Prediction</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#2E2E3A]">Risk Level</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#2E2E3A]">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#2E2E3A]">Action</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item) => (
                  <tr key={item.id} className="border-b border-[#00FFE7]/20 hover:bg-[#7F00FF]/5 transition">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(item.id)}
                        onChange={() => toggleRow(item.id)}
                        className="w-4 h-4 accent-[#7F00FF] cursor-pointer"
                      />
                    </td>
                    <td className="px-6 py-4 text-[#2E2E3A] text-sm">{item.date}</td>
                    <td className="px-6 py-4 text-[#2E2E3A] font-medium">{item.venture}</td>
                    <td className="px-6 py-4">
                      <span className="text-2xl font-bold text-gradient">{item.prediction}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-semibold ${getRiskColor(item.riskLevel)}`}>{item.riskLevel}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#00FFE7]/10 text-[#00FFE7]">
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-[#7F00FF] hover:text-[#00FFE7] text-sm font-medium transition">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid md:grid-cols-4 gap-6 mt-8">
          <div className="glass p-6 rounded-xl">
            <p className="text-[#2E2E3A]/60 text-sm mb-2">Total Predictions</p>
            <p className="text-3xl font-bold text-[#2E2E3A]">1,245</p>
          </div>
          <div className="glass p-6 rounded-xl">
            <p className="text-[#2E2E3A]/60 text-sm mb-2">Avg Success Rate</p>
            <p className="text-3xl font-bold text-gradient">78.4%</p>
          </div>
          <div className="glass p-6 rounded-xl">
            <p className="text-[#2E2E3A]/60 text-sm mb-2">High Risk Cases</p>
            <p className="text-3xl font-bold text-[#FF6F61]">142</p>
          </div>
          <div className="glass p-6 rounded-xl">
            <p className="text-[#2E2E3A]/60 text-sm mb-2">Accuracy Score</p>
            <p className="text-3xl font-bold text-[#00FFE7]">94.2%</p>
          </div>
        </div>
      </main>
    </div>
  )
}
