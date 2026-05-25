import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StudioLightingToggle } from "@/components/layout/StudioLightingToggle";
import { PasskeyGuard } from "@/components/layout/PasskeyGuard";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Vanguard Exotics | Digital Showroom",
  description: "Elite exotic car dealership in Lagos, Nigeria. Curating Excellence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans font-light tracking-tight">
        <PasskeyGuard>
          <Navbar />
          <StudioLightingToggle />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </PasskeyGuard>
      </body>
    </html>
  );
}
