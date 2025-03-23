export interface ProgramAffiliateKoperasiType {
  id: string;
  title: string;
  benefits: BenefitsType[];
  updatedAt: string;
  createdAt: string;
}

// Benefits Type

export interface BenefitsType {
  id: string;
  title: string;
  text: string;
  price: string;
  imageUrl: string;
}

// Header Props

export interface HeaderProps {
  title: string;
}

// Benefit Card Props

export interface BenefitCardProps {
  benefit: BenefitsType;
  index: number;
}
