export interface PartnerType {
  id: string;
  imageUrl: string;
  updatedAt: string;
  createdAt: string;
}

// PartnerCard

export interface PartnerCardProps {
  partner: PartnerType;
}
