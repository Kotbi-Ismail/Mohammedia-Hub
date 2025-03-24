export interface Event {
  id: string;
  title: string;
  description: string;
  category: EventCategory;
  startDate: string;
  endDate: string;
  location: {
    name: string;
    address: string;
    latitude: number;
    longitude: number;
  };
  organizer: string;
  attendees: number;
  maxAttendees?: number;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export enum EventCategory {
  CULTURAL = 'cultural',
  SPORTS = 'sports',
  EDUCATION = 'education',
  COMMUNITY = 'community',
  OTHER = 'other',
}