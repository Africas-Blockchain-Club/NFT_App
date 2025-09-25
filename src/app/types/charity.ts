// types/charity.ts
export interface Charity {
  id: string;
  name: string;
  description: string;
  website: string;
  votes: number;
  status: 'nominated' | 'approved' | 'rejected';
  nftCollection: string;
  fundsRaised?: number;
  impactMetrics?: ImpactMetric[];
}

export interface VotingPeriod {
  id: string;
  startDate: Date;
  endDate: Date;
  status: 'upcoming' | 'active' | 'completed';
  nominatedCharities: Charity[];
}

export interface FundAllocation {
  charityId: string;
  totalFunds: number;
  fundsDisbursed: number;
  allocationDate: Date;
  impactReport?: ImpactReport;
}

export interface ImpactMetric {
  name: string;
  value: number;
  unit: string;
  target: number;
}

export interface ImpactReport {
  period: string;
  achievements: string[];
  challenges: string[];
  nextSteps: string[];
  media: MediaAsset[];
}

export interface MediaAsset {
  type: 'image' | 'video' | 'document';
  url: string;
  description: string;
}