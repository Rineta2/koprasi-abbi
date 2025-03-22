export interface BonusSponsorType {
  id: string;
  title: string;
  imageUrl: string;
  updatedAt: string;
  createdAt: string;
}

// SponsorCard Props

export interface SponsorCardProps {
  item: BonusSponsorType;
  index: number;
}
