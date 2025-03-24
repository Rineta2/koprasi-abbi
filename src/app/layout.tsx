import { metadata } from "@/base/meta/metadata";

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