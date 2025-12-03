import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "PSO Regnskap AS - Profesjonell Regnskapshjelp",
  description: "PSO Regnskap AS tilbyr skreddersydd regnskapshjelp for norske bedrifter. Kontakt oss for profesjonell rådgivning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no">
      <body className="font-sans">
        <Navigation />
        <main className="pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
