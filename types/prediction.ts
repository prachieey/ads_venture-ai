export interface RiskFactor {
  factor: string;
  severity: 'low' | 'medium' | 'high';
  impact: string;
}

export interface Recommendation {
  action: string;
  priority: 'low' | 'medium' | 'high';
  impact: string;
}

export interface MarketAnalysis {
  size: string;
  growth: string;
  trends: string[];
}

export interface Competitor {
  name: string;
  strength: string;
  weakness: string;
  marketShare: string;
}

export interface FinancialProjection {
  sixMonths: string;
  oneYear: string;
  threeYears: string;
}

export interface PredictionResult {
  successProbability: number;
  riskFactors: RiskFactor[];
  recommendations: Recommendation[];
  marketAnalysis: MarketAnalysis;
  competitors: Competitor[];
  financialProjection: FinancialProjection;
}

export interface FormData {
  startupName: string;
  industry: string;
  region: string;
  stage: string;
  founderExperience: string;
  numberOfFounders: string;
  educationLevel: string;
  previousStartupExperience: boolean;
  teamSkillDiversity: string;
  businessModel: string;
  targetMarketSize: string;
  customerAcquisitionCost: string;
  productReadiness: string;
  competitionLevel: string;
  revenue: string;
  monthlyBurnRate: string;
  runway: string;
  fundingStage: string;
  fundingAmount: string;
  country: string;
  marketMaturity: string;
  regulatoryRisk: string;
  socialMediaPresence: string;
  ideaDescription: string;
}
