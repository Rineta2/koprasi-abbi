export interface TentangKamiType {
  id: string;
  title: string;
  text: string;
  description: string;
  imageUrl: string;
  createdAt: string;
}

// TentangKamiHeader
export interface ImageSectionProps {
  imageUrl: string;
  title: string;
}

// TentangKamiFeatureItem
export interface FeatureItemProps {
  feature: string;
  index: number;
}

// TentangKamiSectionHeader

export interface SectionHeaderProps {
  title: string;
}

