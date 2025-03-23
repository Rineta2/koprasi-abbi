export interface SisaHasilUsahaType {
    id: string;
    title: string;
    text: string;
    description: string;
    imageUrl: string;
    updatedAt: string;
    createdAt: string;
}


// WaveDecorationProps

export interface WaveDecorationProps {
    position: 'top' | 'bottom'
}

// SisaHasilUsahaCardProps

export interface SisaHasilUsahaCardProps {
    item: SisaHasilUsahaType
    index: number
}