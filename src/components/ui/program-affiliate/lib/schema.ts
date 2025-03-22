export interface ProgramAffiliateType {
  id: string;
  title: string;
  description: string;
  benefits: BenefitsType[];
  updatedAt: string;
  createdAt: string;
}

// Benefits Type

export interface BenefitsType {
  id: string;
  title: string;
  imageUrl: string;
}

// Benefits Grid Props

export interface BenefitsGridProps {
  benefits: ProgramAffiliateType['benefits']
}

// Program Header Props

export interface ProgramHeaderProps {
  title: string;
  description: string;
}
