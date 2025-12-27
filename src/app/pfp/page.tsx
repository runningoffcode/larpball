"use client";

import Link from "next/link";
import dynamic from "next/dynamic";

// Dynamic import to avoid SSR issues with canvas
const PfpGenerator = dynamic(() => import("@/components/PfpGenerator"), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-[400px] aspect-square bg-white/10 rounded-xl animate-pulse flex items-center justify-center">
      <p className="text-white/50">Loading editor...</p>
    </div>
  ),
});

export default function PfpPage() {
  return (
    <main className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-white/10 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-white font-bold text-xl hover:text-white/80 transition-colors">
            $LARPBALL
          </Link>
          <Link href="/" className="text-white/60 hover:text-white text-sm transition-colors">
            Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
            PFP Generator
          </h1>
          <p className="text-white/60 text-center mb-10 max-w-md mx-auto">
            Create your custom $LARPBALL profile picture. Upload any character or sticker!
          </p>

          <PfpGenerator />
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 px-4 py-6 mt-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-white/40 text-sm">
            $LARPBALL 2025 — Exposing the Larp
          </p>
        </div>
      </footer>
    </main>
  );
}
