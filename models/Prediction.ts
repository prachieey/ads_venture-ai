import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './User';

export interface IPrediction extends Document {
  userId: mongoose.Types.ObjectId | IUser;
  startupName: string;
  industry: string;
  region: string;
  stage: string;
  founderExperience: string;
  numberOfFounders: number;
  educationLevel: string;
  previousStartupExperience: boolean;
  teamSkillDiversity: number;
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
  socialMediaPresence: number;
  ideaDescription: string;
  successProbability: number;
  riskFactors: Array<{
    factor: string;
    severity: 'low' | 'medium' | 'high';
    impact: string;
  }>;
  recommendations: Array<{
    action: string;
    priority: 'low' | 'medium' | 'high';
    impact: string;
  }>;
  marketAnalysis: {
    size: string;
    growth: string;
    trends: string[];
  };
  competitors: Array<{
    name: string;
    strength: string;
    weakness: string;
    marketShare: string;
  }>;
  financialProjection: {
    sixMonths: string;
    oneYear: string;
    threeYears: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const RiskFactorSchema = new Schema({
  factor: { type: String, required: true },
  severity: { type: String, enum: ['low', 'medium', 'high'], required: true },
  impact: { type: String, required: true }
});

const RecommendationSchema = new Schema({
  action: { type: String, required: true },
  priority: { type: String, enum: ['low', 'medium', 'high'], required: true },
  impact: { type: String, required: true }
});

const MarketAnalysisSchema = new Schema({
  size: { type: String, required: true },
  growth: { type: String, required: true },
  trends: [{ type: String }]
});

const CompetitorSchema = new Schema({
  name: { type: String, required: true },
  strength: { type: String, required: true },
  weakness: { type: String, required: true },
  marketShare: { type: String, required: true }
});

const FinancialProjectionSchema = new Schema({
  sixMonths: { type: String, required: true },
  oneYear: { type: String, required: true },
  threeYears: { type: String, required: true }
});

const PredictionSchema = new Schema<IPrediction>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    startupName: { type: String, required: true },
    industry: { type: String, required: true },
    region: { type: String, required: true },
    stage: { type: String, required: true },
    founderExperience: { type: String, required: true },
    numberOfFounders: { type: Number, required: true },
    educationLevel: { type: String, required: true },
    previousStartupExperience: { type: Boolean, required: true },
    teamSkillDiversity: { type: Number, required: true, min: 1, max: 10 },
    businessModel: { type: String, required: true },
    targetMarketSize: { type: String, required: true },
    customerAcquisitionCost: { type: String, required: true },
    productReadiness: { type: String, required: true },
    competitionLevel: { type: String, required: true },
    revenue: { type: String, required: true },
    monthlyBurnRate: { type: String, required: true },
    runway: { type: String, required: true },
    fundingStage: { type: String, required: true },
    fundingAmount: { type: String, required: true },
    country: { type: String, required: true },
    marketMaturity: { type: String, required: true },
    regulatoryRisk: { type: String, required: true },
    socialMediaPresence: { type: Number, required: true, min: 1, max: 10 },
    ideaDescription: { type: String, required: true },
    successProbability: { type: Number, required: true, min: 0, max: 100 },
    riskFactors: [RiskFactorSchema],
    recommendations: [RecommendationSchema],
    marketAnalysis: MarketAnalysisSchema,
    competitors: [CompetitorSchema],
    financialProjection: FinancialProjectionSchema
  },
  { timestamps: true }
);

// Create a model or return existing one to prevent recompilation errors
export const Prediction = mongoose.models?.Prediction || 
  mongoose.model<IPrediction>('Prediction', PredictionSchema);
