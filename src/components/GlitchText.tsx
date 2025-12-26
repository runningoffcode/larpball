"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlitchTextProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span" | "p";
}

export default function GlitchText({
  children,
  className,
  as: Component = "h1"
}: GlitchTextProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Component
        className={cn(
          "glitch-text terminal-glow font-bold",
          className
        )}
        data-text={children}
      >
        {children}
      </Component>
    </motion.div>
  );
}
