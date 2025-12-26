"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TerminalCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  danger?: boolean;
}

export default function TerminalCard({
  title,
  children,
  className,
  danger = false
}: TerminalCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        "terminal-card terminal-border-glow",
        danger && "risk-critical",
        className
      )}
    >
      <div className="terminal-header">
        <div className="terminal-buttons">
          <span className="terminal-btn terminal-btn-close" />
          <span className="terminal-btn terminal-btn-minimize" />
          <span className="terminal-btn terminal-btn-maximize" />
        </div>
        <span className="terminal-title">{title}</span>
      </div>
      <div className="terminal-body">
        {children}
      </div>
    </motion.div>
  );
}
