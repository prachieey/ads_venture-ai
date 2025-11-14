'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
  ChartData,
  registerables as registerChartJS
} from 'chart.js';
import { 
  Chart as ReactChart, 
  Pie, 
  Line, 
  Bar, 
  Radar,
  Doughnut
} from 'react-chartjs-2';
import { useEffect, useRef, useState } from 'react';
import { 
  Brain, 
  Users, 
  MapPin, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp, 
  Lightbulb, 
  Zap, 
  Download,
  RefreshCw,
  ArrowRight,
  BarChart3,
  Globe,
  Target,
  Rocket,
  AlertCircle,
  Star,
  BarChart2,
  PieChart as PieChartIcon,
  Activity,
  Award,
  Clock,
  DollarSign,
  UserCheck,
  Users as TeamIcon,
  Map as MapIcon,
  TrendingUp as GrowthIcon,
  FileText,
  Check,
  X,
  HelpCircle,
  Info,
  Sparkles
} from 'lucide-react';

// Register all ChartJS components
ChartJS.register(...registerChartJS);

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  Filler
);

type MetricCardProps = {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  color: string;
};

const MetricCard = ({ title, value, change, icon, color }: MetricCardProps) => (
  <div className="glass p-4 rounded-xl border border-white/10">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm text-[#2E2E3A]/80 mb-1">{title}</p>
        <p className="text-2xl font-bold" style={{ color }}>{value}</p>
        {change !== undefined && (
          <p className={`text-xs mt-1 ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {change >= 0 ? '↑' : '↓'} {Math.abs(change)}% from last month
          </p>
        )}
      </div>
      <div className={`p-2 rounded-lg ${color}/10`} style={{ color }}>
        {icon}
      </div>
    </div>
  </div>
);

const ProgressBar = ({ value, label, color }: { value: number; label: string; color: string }) => (
  <div className="mb-4">
    <div className="flex justify-between text-sm mb-1">
      <span className="text-[#2E2E3A]/80">{label}</span>
      <span className="font-medium">{value}%</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div 
        className="h-2 rounded-full transition-all duration-1000 ease-out"
        style={{ 
          width: `${value}%`,
          background: color,
          boxShadow: `0 0 8px ${color}80`
        }}
      />
    </div>
  </div>
);

const RegionMap = ({ data }: { data: { region: string; value: number }[] }) => {
  const chartData: ChartData<'doughnut'> = {
    labels: data.map(item => item.region),
    datasets: [
      {
        data: data.map(item => item.value),
        backgroundColor: [
          'rgba(127, 0, 255, 0.7)',
          'rgba(0, 255, 231, 0.7)',
          'rgba(255, 111, 97, 0.7)',
          'rgba(99, 102, 241, 0.7)',
          'rgba(236, 72, 153, 0.7)'
        ],
        borderColor: 'rgba(255, 255, 255, 0.8)',
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#2E2E3A',
          font: {
            size: 12,
          },
          padding: 20,
        },
      },
    },
  };

  return (
    <div className="h-64">
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

const GrowthChart = () => {
  const [data, setData] = useState<ChartData<'line'>>({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Projected Growth',
        data: Array(12).fill(0).map(() => Math.floor(Math.random() * 60) + 40),
        borderColor: '#7F00FF',
        backgroundColor: 'rgba(127, 0, 255, 0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#7F00FF',
        pointBorderColor: '#fff',
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#7F00FF',
        pointHoverBorderWidth: 2,
      },
    ],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => ({
        ...prev,
        datasets: [
          {
            ...prev.datasets[0],
            data: Array(12).fill(0).map((_, i) => {
              // Add some randomness to the data
              const baseValue = 40 + (i * 5) + (Math.random() * 20 - 10);
              return Math.min(100, Math.max(0, Math.round(baseValue)));
            })
          }
        ]
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#1F2937',
        bodyColor: '#1F2937',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: (context) => {
            return `${context.dataset.label}: ${context.parsed.y}%`;
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          color: '#6B7280',
          callback: (value) => `${value}%`
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#6B7280',
        },
      },
    },
  };

  return (
    <div className="h-64">
      <Line data={data} options={options} />
    </div>
  );
};

const TeamRadar = ({ data }: { data: { label: string; value: number }[] }) => {
  const chartData: ChartData<'radar'> = {
    labels: data.map(item => item.label),
    datasets: [
      {
        label: 'Your Team',
        data: data.map(item => item.value),
        backgroundColor: 'rgba(127, 0, 255, 0.2)',
        borderColor: '#7F00FF',
        borderWidth: 2,
        pointBackgroundColor: '#7F00FF',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#7F00FF',
      },
      {
        label: 'Industry Avg',
        data: data.map(() => Math.floor(Math.random() * 40) + 60),
        backgroundColor: 'rgba(0, 255, 231, 0.2)',
        borderColor: '#00FFE7',
        borderWidth: 2,
        pointBackgroundColor: '#00FFE7',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#00FFE7',
      },
    ],
  };

  const options: ChartOptions<'radar'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)',
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          stepSize: 20,
          display: false,
        },
        pointLabels: {
          color: '#6B7280',
          font: {
            size: 10,
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#2E2E3A',
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
          boxWidth: 8,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#1F2937',
        bodyColor: '#1F2937',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: (context) => {
            return `${context.dataset.label}: ${context.parsed.r}%`;
          }
        }
      },
    },
    elements: {
      line: {
        borderWidth: 2,
      },
      point: {
        radius: 4,
        hoverRadius: 6,
      },
    },
  };

  return (
    <div className="h-64">
      <Radar data={chartData} options={options} />
    </div>
  );
};

// AI Verdict Component
const AIVerdict = ({ score, message, date }: { score: number; message: string; date: string }) => {
  const getVerdictColor = (score: number) => {
    if (score >= 80) return 'from-green-500 to-emerald-400';
    if (score >= 60) return 'from-blue-500 to-cyan-400';
    if (score >= 40) return 'from-yellow-500 to-amber-400';
    return 'from-red-500 to-pink-400';
  };

  const getVerdictIcon = (score: number) => {
    if (score >= 80) return <Rocket className="w-6 h-6" />;
    if (score >= 60) return <TrendingUp className="w-6 h-6" />;
    if (score >= 40) return <AlertTriangle className="w-6 h-6" />;
    return <AlertCircle className="w-6 h-6" />;
  };

  return (
    <div className="glass p-6 rounded-2xl border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-[#2E2E3A] flex items-center gap-2">
          {getVerdictIcon(score)}
          AI Verdict
        </h3>
        <div className="text-sm text-[#2E2E3A]/60">{date}</div>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="text-4xl font-bold" style={{ 
          background: 'linear-gradient(135deg, #7F00FF 0%, #00FFE7 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          {score}/100
        </div>
        <div className="w-24 h-24">
          <div className="relative w-full h-full">
            <Doughnut 
              data={{
                labels: ['Score', 'Remaining'],
                datasets: [
                  {
                    data: [score, 100 - score],
                    backgroundColor: [
                      `hsl(${210 + (score * 1.5)}, 100%, 60%)`,
                      'rgba(0, 0, 0, 0.05)'
                    ],
                    borderWidth: 0,
                    circumference: 180,
                    rotation: 270,
                  },
                ],
              }}
              options={{
                cutout: '80%',
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    enabled: false,
                  },
                },
              }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center pt-6">
              <div className="text-xs text-[#2E2E3A]/60">Confidence</div>
              <div className="text-lg font-bold">{Math.min(99, score + 5)}%</div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-lg bg-[#2E2E3A]/5">
        <p className="text-[#2E2E3A] text-sm">{message}</p>
      </div>

      <div className="mt-4 flex items-center text-xs text-[#2E2E3A]/60">
        <Info className="w-4 h-4 mr-1" />
        <span>Based on latest analysis of your project metrics and market data</span>
      </div>
    </div>
  );
};

// Improvement Suggestions Component
const ImprovementSuggestions = () => {
  const allSuggestions = [
    { id: 1, text: 'Increase marketing budget by 15-20% to boost customer acquisition', category: 'marketing', priority: 'high' },
    { id: 2, text: 'Expand team with 2-3 senior developers to accelerate product development', category: 'team', priority: 'high' },
    { id: 3, text: 'Diversify revenue streams to reduce dependency on a single product', category: 'revenue', priority: 'medium' },
    { id: 4, text: 'Improve customer support response time to under 2 hours', category: 'operations', priority: 'medium' },
    { id: 5, text: 'Conduct user research to identify new feature opportunities', category: 'product', priority: 'low' },
    { id: 6, text: 'Implement A/B testing for landing pages to improve conversion', category: 'marketing', priority: 'medium' },
  ];

  const [suggestions, setSuggestions] = useState(allSuggestions.slice(0, 3));
  const [isLoading, setIsLoading] = useState(false);

  const generateNewSuggestions = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Shuffle and pick 3 random suggestions
      const shuffled = [...allSuggestions].sort(() => 0.5 - Math.random());
      setSuggestions(shuffled.slice(0, 3));
      setIsLoading(false);
    }, 800);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="glass p-6 rounded-2xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-[#2E2E3A]">Improvement Suggestions</h3>
        <button 
          onClick={generateNewSuggestions}
          disabled={isLoading}
          className="text-sm px-3 py-1.5 rounded-lg bg-[#7F00FF]/10 text-[#7F00FF] hover:bg-[#7F00FF]/20 transition flex items-center gap-1.5 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <RefreshCw className="w-3.5 h-3.5" />
              <span>New Suggestions</span>
            </>
          )}
        </button>
      </div>

      <div className="space-y-3">
        {suggestions.map((suggestion, index) => (
          <motion.div
            key={suggestion.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start p-3 bg-white/5 rounded-lg border border-white/5 hover:border-[#7F00FF]/30 transition"
          >
            <div className="flex-shrink-0 mt-0.5">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${getPriorityColor(suggestion.priority)}`}>
                {index + 1}
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm text-[#2E2E3A]">{suggestion.text}</p>
              <div className="mt-1.5 flex items-center">
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#7F00FF]/10 text-[#7F00FF] mr-2">
                  {suggestion.category.charAt(0).toUpperCase() + suggestion.category.slice(1)}
                </span>
                <span className="text-xs text-[#2E2E3A]/60">
                  {suggestion.priority} priority
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-white/10">
        <button className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-[#7F00FF] to-[#00FFE7] text-white font-medium text-sm flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#7F00FF]/30 transition">
          <Download className="w-4 h-4" />
          <span>Download Full Report</span>
        </button>
      </div>
    </div>
  );
};

export { 
  MetricCard, 
  ProgressBar, 
  RegionMap, 
  GrowthChart, 
  TeamRadar,
  AIVerdict,
  ImprovementSuggestions
};
