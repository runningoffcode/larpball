"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RiskCardProps {
  icon: "skull" | "server" | "dump" | "zombie" | "key" | "hack";
  title: string;
  description: string;
  severity: "critical" | "high" | "medium";
}

const icons: Record<string, string> = {
  skull: "💀",
  server: "🖥️",
  dump: "📉",
  zombie: "🧟",
  key: "🔑",
  hack: "👾",
};

const severityColors: Record<string, string> = {
  critical: "risk-critical",
  high: "risk-high",
  medium: "risk-medium",
};

const severityLabels: Record<string, string> = {
  critical: "CRITICAL",
  high: "HIGH",
  medium: "MEDIUM",
};

export default function RiskCard({ icon, title, description, severity }: RiskCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className={cn(
        "terminal-card border-2 p-4",
        severityColors[severity]
      )}
    >
      <div className="flex items-start gap-3">
        <span className="text-3xl" role="img" aria-label={icon}>
          {icons[icon]}
        </span>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-[var(--text-primary)] font-bold text-sm">
              {title}
            </h3>
            <span
              className={cn(
                "text-xs px-2 py-0.5 rounded",
                severity === "critical" && "bg-red-900/50 text-red-400",
                severity === "high" && "bg-amber-900/50 text-amber-400",
                severity === "medium" && "bg-yellow-900/50 text-yellow-400"
              )}
            >
              {severityLabels[severity]}
            </span>
          </div>
          <p className="text-[var(--text-dim)] text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
