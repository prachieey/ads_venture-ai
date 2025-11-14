"use client"

import Link from "next/link"
import { ArrowRight, Zap, BarChart3, Brain } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9F9FB] to-[#F0E6FF] overflow-hidden">
      {/* Animated background particles */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-[#00FFE7] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div
          className="absolute bottom-20 left-10 w-72 h-72 bg-[#FF6F61] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-72 h-72 bg-[#7F00FF] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center px-6 md:px-12 py-6">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-[#7F00FF] flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-[#2E2E3A]">VentureAI</span>
        </div>
        <div className="flex gap-6">
          <Link href="/login" className="text-[#2E2E3A] hover:text-[#7F00FF] transition">
            Login
          </Link>
          <Link
            href="/signup"
            className="px-6 py-2 rounded-lg bg-[#7F00FF] text-white hover:shadow-lg hover:shadow-[#7F00FF]/50 transition"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-20 md:py-32">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-[#2E2E3A] mb-6 text-balance">
            Predict Venture <span className="text-gradient">Success</span> with AI
          </h1>
          <p className="text-lg md:text-xl text-[#2E2E3A]/70 mb-12 max-w-3xl mx-auto text-pretty">
            VentureAI leverages cutting-edge artificial intelligence to analyze market trends, company metrics, and
            competitive landscapes to predict venture outcomes with unprecedented accuracy.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-16">
            <Link
              href="/dashboard"
              className="px-8 py-3 rounded-lg bg-[#7F00FF] text-white font-medium hover:shadow-lg hover:shadow-[#7F00FF]/50 transition flex items-center gap-2"
            >
              Get Started <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/demo"
              className="px-8 py-3 rounded-lg border-2 border-[#00FFE7] text-[#7F00FF] font-medium hover:bg-[#00FFE7]/10 transition"
            >
              Try Demo
            </Link>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-20">
          {[
            { icon: Zap, title: "Real-Time Predictions", desc: "Instant AI-powered venture analysis" },
            { icon: BarChart3, title: "Advanced Analytics", desc: "Deep market insights and trends" },
            { icon: Brain, title: "ML Intelligence", desc: "Machine learning-driven insights" },
          ].map((feature, i) => (
            <div key={i} className="glass p-6 rounded-2xl hover:shadow-lg transition">
              <feature.icon className="w-8 h-8 text-[#7F00FF] mb-4" />
              <h3 className="text-xl font-semibold text-[#2E2E3A] mb-2">{feature.title}</h3>
              <p className="text-[#2E2E3A]/60">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#00FFE7]/20 mt-20 py-8 text-center text-[#2E2E3A]/60">
        <p>&copy; 2025 VentureAI. All rights reserved.</p>
      </footer>
    </div>
  )
}
