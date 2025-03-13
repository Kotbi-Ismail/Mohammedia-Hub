export interface Report {
  id: string;
  title: string;
  description: string;
  category: ReportCategory;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  status: ReportStatus;
  images: string[];
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export enum ReportCategory {
  INFRASTRUCTURE = 'infrastructure',
  SANITATION = 'sanitation',
  LIGHTING = 'lighting',
  SAFETY = 'safety',
  OTHER = 'other',
}

export enum ReportStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  RESOLVED = 'resolved',
  REJECTED = 'rejected',
}