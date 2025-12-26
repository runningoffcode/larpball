"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface EvidenceFrameProps {
  src: string;
  alt: string;
  caption?: string;
}

export default function EvidenceFrame({ src, alt, caption }: EvidenceFrameProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative cursor-pointer group"
        onClick={() => setIsZoomed(true)}
      >
        <div className="border-2 border-[var(--matrix-green-dim)] rounded overflow-hidden">
          <div className="bg-[var(--bg-secondary)] px-3 py-2 border-b border-[var(--matrix-green-dark)] flex items-center gap-2">
            <span className="text-[var(--accent-red)] text-xs">●</span>
            <span className="text-[var(--text-dim)] text-xs">EVIDENCE_001.png</span>
            <span className="text-[var(--text-dim)] text-xs ml-auto">Click to zoom</span>
          </div>

          <div className="relative aspect-video bg-black">
            <Image
              src={src}
              alt={alt}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 800px"
            />
            {/* Scanline overlay on image */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0, 255, 0, 0.03) 2px, rgba(0, 255, 0, 0.03) 4px)",
              }}
            />
          </div>
        </div>

        {caption && (
          <p className="text-[var(--text-dim)] text-sm mt-3 text-center">
            <span className="text-[var(--accent-red)]">[!]</span> {caption}
          </p>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[var(--matrix-green)]/0 group-hover:bg-[var(--matrix-green)]/5 transition-colors rounded" />
      </motion.div>

      {/* Zoom Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomed(false)}
            className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-5xl max-h-[90vh] w-full"
            >
              <Image
                src={src}
                alt={alt}
                width={1200}
                height={800}
                className="object-contain w-full h-auto max-h-[90vh]"
              />
              <button
                onClick={() => setIsZoomed(false)}
                className="absolute top-4 right-4 btn-terminal px-4 py-2"
              >
                [ CLOSE ]
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
