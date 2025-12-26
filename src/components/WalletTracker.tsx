"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Wallet {
  label: string;
  address: string;
  description: string;
}

interface WalletTrackerProps {
  wallets: Wallet[];
}

export default function WalletTracker({ wallets }: WalletTrackerProps) {
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  const copyToClipboard = async (address: string) => {
    await navigator.clipboard.writeText(address);
    setCopiedAddress(address);
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
  };

  return (
    <div className="space-y-4 mt-4">
      {wallets.map((wallet, index) => (
        <motion.div
          key={wallet.address}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="border border-[var(--matrix-green-dark)] rounded p-4 hover:border-[var(--matrix-green)] transition-colors"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[var(--accent-red)] font-bold text-sm warning-flash">
              ⚠ {wallet.label}
            </span>
            <a
              href={`https://solscan.io/account/${wallet.address}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[var(--accent-cyan)] hover:underline"
            >
              View on Solscan →
            </a>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <code className="text-[var(--text-primary)] text-sm bg-black/50 px-2 py-1 rounded flex-1 overflow-hidden">
              <span className="hidden sm:inline">{wallet.address}</span>
              <span className="sm:hidden">{truncateAddress(wallet.address)}</span>
            </code>
            <button
              onClick={() => copyToClipboard(wallet.address)}
              className="btn-terminal text-xs px-3 py-1"
            >
              {copiedAddress === wallet.address ? "Copied!" : "Copy"}
            </button>
          </div>

          <p className="text-[var(--text-dim)] text-xs">
            {wallet.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
