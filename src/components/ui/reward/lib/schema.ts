export interface RewardType {
  id: string;
  title: string;
  imageUrl: string;
  syarat: SyaratType[];
  textLeft: TextLeftType[];
  textRight: TextRightType[];
  updatedAt: string;
  createdAt: string;
}

export interface SyaratType {
  id: string;
  title: string;
}

export interface TextLeftType {
  id: string;
  title: string;
}

export interface TextRightType {
  id: string;
  title: string;
}

// RequirementsSectionProps

export interface RequirementsSectionProps {
  reward: RewardType[]
}

// BenefitColumnsProps

export interface BenefitColumnsProps {
  reward: RewardType[]
}
