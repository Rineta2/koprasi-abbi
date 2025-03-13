const BASE_URL = process.env.NEXT_PUBLIC_URL as string;

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: "no",
};

export const metadata = {
  title: "Koprasi Abbi",
  description: "Koprasi Abbi",
  favicon: "/favicon.ico",
  authors: [{ name: "Rizki Ramadhan" }],
  keywords: ["Koprasi Abbi", "Koprasi", "Abbi", "Rizki Ramadhan"],

  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "64x64 32x32 24x24 16x16",
        type: "image/x-icon",
      },
    ],
    apple: "/favicon.ico",
    shortcut: "/favicon.ico",
    appleTouchIcon: "/favicon.ico",
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
    title: "Koprasi Abbi",
    description: "Koprasi Abbi",
    url: BASE_URL,
    siteName: "Koprasi Abbi",
    locale: "id_ID",
    images: [
      {
        url: "/favicon.ico",
        width: 1920,
        height: 1080,
        alt: "Icon for Koprasi Abbi",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Koprasi Abbi",
    description: "Koprasi Abbi",
    creator: "@rizki_ramadhan",
    site: "@rizki_ramadhan",
    images: ["/favicon.ico"],
  },

  //   verification: {
  //     google: process.env.NEXT_PUBLIC_VERTIFICATION_API_KEY,
  //   },

  robots: {
    index: true,
    follow: true,
    noarchive: true,
    nocache: true,
  },
};
