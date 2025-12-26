import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "$LARPBALL | Exposing the Larp",
  description: "Exposing the security risks and vulnerabilities of centralized token infrastructure. DYOR.",
  keywords: ["larpball", "solana", "meme coin", "crypto", "security"],
  openGraph: {
    title: "$LARPBALL | Exposing the Larp",
    description: "Exposing the security risks they don't want you to see.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "$LARPBALL | Exposing the Larp",
    description: "Exposing the security risks they don't want you to see.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
