export interface HomeData {
  id: string;
  title: string;
  text: string;
  button1: {
    text: string;
    link: string;
  };
  button2: {
    text: string;
    link: string;
  };
  thumbnail: string;
  createdAt: number;
  updatedAt: number;
}

export interface HomeFormData {
  title: string;
  text: string;
  button1Text: string;
  button1Link: string;
  button2Text: string;
  button2Link: string;
  thumbnail: File | null;
}
