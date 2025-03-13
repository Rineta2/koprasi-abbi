import { metadata } from "@/base/meta/metadata";

metadata.manifest = "/manifest.json";

export { metadata };

import { Roboto, Roboto_Mono } from "next/font/google";

import "@/style/globals.css";

const robotoSans = Roboto({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ['400', '500', '700'],
});

const robotoMono = Roboto_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ['400', '500', '700'],
});

import Providers from "@/router/Provider";

import Pathname from "@/router/Pathname";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${robotoSans.variable} ${robotoMono.variable} antialiased`}
      >
        <Providers>
          <Pathname>
            {children}
          </Pathname>
        </Providers>
      </body>
    </html>
  );
}