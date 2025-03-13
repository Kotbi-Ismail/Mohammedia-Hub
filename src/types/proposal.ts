export interface Proposal {
  id: string;
  title: string;
  description: string;
  category: ProposalCategory;
  budget?: number;
  timeline?: string;
  status: ProposalStatus;
  votes: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export enum ProposalCategory {
  URBAN_DEVELOPMENT = 'urban_development',
  ENVIRONMENT = 'environment',
  CULTURE = 'culture',
  EDUCATION = 'education',
  HEALTH = 'health',
  OTHER = 'other',
}

export enum ProposalStatus {
  UNDER_REVIEW = 'under_review',
  APPROVED = 'approved',
  IMPLEMENTED = 'implemented',
  REJECTED = 'rejected',
}