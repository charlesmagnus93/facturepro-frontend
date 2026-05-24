import "./globals.css";

import Navbar from "@/components/navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="fr">

      <body>

        <Navbar />

        {children}

      </body>

    </html>
  );
}