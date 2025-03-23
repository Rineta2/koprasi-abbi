import { metadata } from "@/base/meta/metadata";

import Script from 'next/script'

metadata.manifest = "/manifest.json";

export { metadata };

import { nunitoSans } from "@/base/fonts/fonts";

import "@/style/globals.css";

import Components from "@/router/Components";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://app.sandbox.midtrans.com/snap/snap.js"
          data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
          strategy="worker"
          async
        />
      </head>
      <body
        className={`${nunitoSans.variable} antialiased`}
      >
        <Components>
          {children}
        </Components>
      </body>
    </html>
  );
}