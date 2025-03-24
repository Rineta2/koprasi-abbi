import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa"

export interface TestimonialType {
  id: string;
  name: string;
  imageUrl: string;
  position: string;
  rating: number;
  description: string;
  createdAt: string;
}

export const socialMedia = [
  {
    id: 1,
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=10008888888888888',
    icon: FaFacebookF
  },
  {
    id: 2,
    label: 'Instagram',
    href: 'https://www.instagram.com/profile.php?id=10008888888888888',
    icon: FaInstagram
  },
  {
    id: 3,
    label: 'Tiktok',
    href: 'https://www.tiktok.com/profile.php?id=10008888888888888',
    icon: FaTiktok
  }
]