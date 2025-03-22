export interface PendaftaranAnggotaKoperasiType {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  svgUrl: string;
  updatedAt: string;
  createdAt: string;
}

// Card
export interface CardContentProps {
  item: PendaftaranAnggotaKoperasiType
}