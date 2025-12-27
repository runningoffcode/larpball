"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TokenStatsData {
  price: number;
  marketCap: number;
  volume24h: number;
  priceChange24h: number;
  liquidity: number;
}

function formatNumber(num: number): string {
  if (num >= 1_000_000_000) {
    return `$${(num / 1_000_000_000).toFixed(2)}B`;
  }
  if (num >= 1_000_000) {
    return `$${(num / 1_000_000).toFixed(2)}M`;
  }
  if (num >= 1_000) {
    return `$${(num / 1_000).toFixed(2)}K`;
  }
  return `$${num.toFixed(2)}`;
}

function formatPrice(num: number): string {
  if (num < 0.00001) {
    return `$${num.toFixed(8)}`;
  }
  if (num < 0.01) {
    return `$${num.toFixed(6)}`;
  }
  if (num < 1) {
    return `$${num.toFixed(4)}`;
  }
  return `$${num.toFixed(2)}`;
}

export default function TokenStats() {
  const [stats, setStats] = useState<TokenStatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/token-stats");
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setStats(data);
      setError(false);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    // Refresh every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex gap-6 justify-center flex-wrap">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white/10 rounded-lg px-6 py-3 animate-pulse">
            <div className="h-4 w-16 bg-white/20 rounded mb-1" />
            <div className="h-6 w-24 bg-white/20 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (error || !stats) {
    return null; // Don't show anything if there's an error
  }

  const statItems = [
    { label: "Price", value: formatPrice(stats.price) },
    { label: "Market Cap", value: formatNumber(stats.marketCap) },
    { label: "24h Volume", value: formatNumber(stats.volume24h) },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="flex gap-4 md:gap-6 justify-center flex-wrap mb-8"
    >
      {statItems.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 + i * 0.1 }}
          className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-center"
        >
          <p className="text-white/60 text-xs uppercase tracking-wide mb-1">
            {item.label}
          </p>
          <p className="text-white font-bold text-lg md:text-xl">
            {item.value}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}
