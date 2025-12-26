"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface ContractCopyProps {
  address: string;
}

export default function ContractCopy({ address }: ContractCopyProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 8)}...${addr.slice(-8)}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="my-4"
    >
      <div className="text-[var(--text-dim)] text-sm mb-2">
        <span className="text-[var(--matrix-green)]">$</span> Contract Address:
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        <div
          onClick={copyToClipboard}
          className="flex-1 bg-black/50 border border-[var(--matrix-green-dim)] rounded px-4 py-3 cursor-pointer hover:border-[var(--matrix-green)] transition-colors pulse-glow"
        >
          <code className="text-[var(--matrix-green)] text-sm sm:text-base break-all">
            <span className="hidden md:inline">{address}</span>
            <span className="md:hidden">{truncateAddress(address)}</span>
          </code>
        </div>

        <button
          onClick={copyToClipboard}
          className={`btn-terminal px-6 py-3 ${copied ? "bg-[var(--matrix-green)] text-black" : ""}`}
        >
          {copied ? "[ COPIED ]" : "[ COPY ]"}
        </button>
      </div>

      <p className="text-[var(--text-dim)] text-xs mt-2">
        Click to copy • DYOR before investing
      </p>
    </motion.div>
  );
}
