const BASE_URL = process.env.NEXT_PUBLIC_URL as string;

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: "no",
};

export const metadata = {
  title: "Rizki Ramadhan - My Portfolio",
  description: "My Portfolio",
  authors: [{ name: "Rizki Ramadhan" }],
  keywords: [
    "Rizki Ramadhan",
    "Portfolio",
    "Web Developer",
    "Frontend Developer",
    "Backend Developer",
    "Fullstack Developer",
    "Bogor",
    "Indonesia",
    "Leuwiliang",
    "Jawa Barat",
    "Kota Bogor",
    "Kabupaten Bogor",
    "Kecamatan Bogor",
    "Kelurahan Bogor",
  ],

  icons: {
    icon: [
      {
        url: "/icon.png",
        sizes: "64x64 32x32 24x24 16x16",
        type: "image/x-icon",
      },
    ],
    apple: "/icon.png",
    shortcut: "/icon.png",
    appleTouchIcon: "/icon.png",
  },

  manifest: "/manifest.json",

  metadataBase: new URL(BASE_URL),
  canonical: BASE_URL,

  other: {
    "theme-color": "#f5f5f5",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
  },

  openGraph: {
    type: "website",
    title: "Rizki Ramadhan - My Portfolio",
    description: "My Portfolio",
    url: BASE_URL,
    siteName: "Rizki Ramadhan - My Portfolio",
    locale: "id_ID",
    images: [
      {
        url: "/icon.png",
        width: 1920,
        height: 1080,
        alt: "Icon for Rizki Ramadhan - My Portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Rizki Ramadhan - My Portfolio",
    description: "My Portfolio",
    creator: "@rizki_ramadhan",
    site: "@rizki_ramadhan",
    images: ["/icon.png"],
  },

  verification: {
    google: process.env.NEXT_PUBLIC_VERTIFICATION_API_KEY,
  },

  robots: {
    index: true,
    follow: true,
    noarchive: true,
    nocache: true,
  },
};
