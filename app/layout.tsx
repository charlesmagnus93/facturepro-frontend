import "./globals.css";

import Navbar from "@/components/navbar";

import Providers from "@/components/providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="fr">

      <body>

        <Providers>

          <Navbar />

          {children}

        </Providers>

      </body>

    </html>
  );
}