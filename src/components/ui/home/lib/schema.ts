export interface HomeType {
  id: string;
  title: string;
  description: string;
  primaryText: string;
  text: string;
  imageUrl: string;
  button: {
    link: string;
    text: string;
  };
  updatedAt: string;
  createdAt: string;
}

// HeroText

export interface HeroTextProps {
  home: HomeType
}

// HeroImage

export interface HeroImageProps {
  home: HomeType
}
