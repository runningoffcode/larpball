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
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "$LARPBALL | Exposing the Larp",
    description: "Exposing the security risks they don't want you to see.",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 1200,
        alt: "$LARPBALL",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "$LARPBALL | Exposing the Larp",
    description: "Exposing the security risks they don't want you to see.",
    images: ["/og-image.png"],
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
