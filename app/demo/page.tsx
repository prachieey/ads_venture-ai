"use client"

import Link from "next/link"
import { ArrowRight, CheckCircle } from "lucide-react"

export default function DemoPage() {
  const features = [
    "Real-time venture success predictions",
    "AI-powered market analysis",
    "Risk assessment and mitigation",
    "Scenario planning tools",
    "Comprehensive market visualization",
    "Advanced what-if analysis",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9F9FB] to-[#F0E6FF]">
      {/* Header */}
      <nav className="flex justify-between items-center px-12 py-6">
        <Link href="/" className="text-[#7F00FF] hover:text-[#00FFE7] transition">
          ← Back to Home
        </Link>
        <Link
          href="/login"
          className="px-6 py-2 rounded-lg bg-[#7F00FF] text-white hover:shadow-lg hover:shadow-[#7F00FF]/50 transition"
        >
          Sign In
        </Link>
      </nav>

      <main className="max-w-4xl mx-auto px-6 md:px-12 py-20">
        <h1 className="text-5xl font-bold text-[#2E2E3A] mb-6 text-balance">
          Experience VentureAI <span className="text-gradient">Features</span>
        </h1>
        <p className="text-lg text-[#2E2E3A]/70 mb-12">
          Get an interactive preview of our powerful AI-driven venture analysis platform
        </p>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {features.map((feature, i) => (
            <div key={i} className="glass p-6 rounded-xl flex items-start gap-4 hover:shadow-lg transition">
              <CheckCircle className="w-6 h-6 text-[#7F00FF] flex-shrink-0 mt-1" />
              <span className="text-[#2E2E3A]">{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-[#2E2E3A]/60 mb-6">Ready to predict venture success?</p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-[#7F00FF] text-white font-semibold hover:shadow-lg hover:shadow-[#7F00FF]/50 transition"
          >
            Start Your Journey <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </main>
    </div>
  )
}
