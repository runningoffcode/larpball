"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import TokenStats from "@/components/TokenStats";

const CONTRACT_ADDRESS = "CE5hEYzTBwUP5U2uDcmdfGHJMh7oh7VVPvKNP3Ffpump";
const PUMP_FUN_URL = `https://pump.fun/coin/${CONTRACT_ADDRESS}`;
const X_OFFICIAL_URL = "https://x.com/larpball";
const X_COMMUNITY_URL = "https://x.com/i/communities/2004986732115022144";

const suspiciousWallets = [
  {
    label: "Volume Wallet",
    address: "CD2TNwRdREZM85Vuiz463jKZsdiJ5KWHvur3Qyeem8DG",
    description: "Used for artificial volume generation - creator fees + trading profits flow here",
  },
  {
    label: "Market-Making Wallet",
    address: "2LZaHnUf4SvxVxJJnvVvVdtp3TeBySeSaFfmCDeLmfEn",
    description: "Controls dip buys / rip sells - fully controlled by bot operator",
  },
];

const risks = [
  { icon: "💀", title: "Slow Drain Attack", description: "Pooled funds from ALL registered projects can be gradually siphoned without detection.", severity: "critical" },
  { icon: "🖥️", title: "Server Update Redirect", description: "A single server update could redirect all creator fees to a different wallet.", severity: "critical" },
  { icon: "📉", title: "MM Wallet Dump", description: "The market-making wallet holds tokens across all projects. Can dump anytime.", severity: "critical" },
  { icon: "🧟", title: "Zombie Bot", description: "Bot stops working but creator fees keep flowing forever. No off switch.", severity: "high" },
  { icon: "🔑", title: "Key Exposure Risk", description: "Private keys managed server-side. Already exposed once on stream.", severity: "critical" },
  { icon: "👾", title: "Single Point of Failure", description: "One centralized VPS controls everything. One hack = everything gone.", severity: "critical" },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={copy} className="btn text-sm px-4 py-2">
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

export default function Home() {
  const [zoomedImage, setZoomedImage] = useState(false);

  return (
    <main className="relative min-h-screen">
      {/* Background Image - Full visibility */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: "url('/background.avif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-9xl font-bold text-white mb-6 text-center"
            style={{ textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}
          >
            $LARPBALL
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl text-white/80 text-center mb-8 max-w-2xl"
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}
          >
            Exposing the security risks they don&apos;t want you to see
          </motion.p>

          {/* Live Token Stats */}
          <TokenStats />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a href="#expose" className="btn btn-danger">
              View Evidence
            </a>
            <a
              href={PUMP_FUN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-solid"
            >
              Get $LARPBALL
            </a>
            <a
              href={X_COMMUNITY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              Join Community
            </a>
            <Link href="/pfp" className="btn">
              PFP Generator
            </Link>
            <a
              href="https://larptek.larpball.org"
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              LarpTek
            </a>
          </motion.div>

        </section>

        {/* The Larp Exposed Section */}
        <section id="expose" className="px-4 py-20 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card"
          >
            <div className="card-header">
              <h2 className="text-lg font-semibold">Critical Findings</h2>
            </div>
            <div className="card-body space-y-4">
              {[
                "Two main wallets control ALL funds from registered projects",
                "Registration gives permanent access to your dev wallet - no revoke option",
                "Entire bot runs on ONE centralized server",
              ].map((finding, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-3 items-start"
                >
                  <span className="text-[var(--accent-amber)]">⚠</span>
                  <span className="text-white/90">{finding}</span>
                </motion.div>
              ))}

              <div className="border-t border-white/10 pt-4 mt-4">
                <p className="text-[var(--accent-red)] font-semibold mb-2">Past Incidents:</p>
                {[
                  "Private keys exposed LIVE on stream",
                  "Full server compromise - keys accessed, code deleted, wallet drained",
                ].map((incident, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex gap-3 items-start mb-2"
                  >
                    <span className="text-[var(--accent-red)] warning-flash">●</span>
                    <span className="text-white/90">{incident}</span>
                  </motion.div>
                ))}
              </div>

              <p className="text-[var(--text-dim)] text-sm pt-4">
                This isn&apos;t &quot;what if&quot; — <span className="text-white">it already happened.</span>
              </p>
            </div>
          </motion.div>
        </section>

        {/* Risk Analysis Section */}
        <section id="risks" className="px-4 py-20 max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-white"
          >
            Risk Assessment
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-4">
            {risks.map((risk, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`card p-4 border-l-4 ${risk.severity === "critical" ? "border-l-[var(--accent-red)]" : "border-l-[var(--accent-amber)]"}`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{risk.icon}</span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-white">{risk.title}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded ${risk.severity === "critical" ? "bg-red-500/20 text-red-400" : "bg-amber-500/20 text-amber-400"}`}>
                        {risk.severity.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-[var(--text-dim)] text-sm">{risk.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-[var(--text-dim)] mt-8"
          >
            None of these require bad intent — only centralized control.
          </motion.p>
        </section>

        {/* Evidence Section */}
        <section id="evidence" className="px-4 py-20 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card"
          >
            <div className="card-header">
              <h2 className="text-lg font-semibold text-[var(--accent-red)]">Price Action Evidence</h2>
            </div>
            <div className="card-body">
              <div
                className="relative aspect-video bg-black/50 rounded-lg overflow-hidden cursor-pointer"
                onClick={() => setZoomedImage(true)}
              >
                <Image
                  src="/larpball.jpeg"
                  alt="Snowball price dump chart"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-[var(--text-dim)] text-sm mt-3 text-center">
                Price action showing suspected manipulation — -50.6% dump captured on DEXTools
              </p>
            </div>
          </motion.div>

          {/* Zoom Modal */}
          {zoomedImage && (
            <div
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
              onClick={() => setZoomedImage(false)}
            >
              <Image
                src="/larpball.jpeg"
                alt="Snowball price dump chart"
                width={1200}
                height={800}
                className="object-contain max-h-[90vh]"
              />
            </div>
          )}
        </section>

        {/* Wallet Tracker Section */}
        <section id="wallets" className="px-4 py-20 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card"
          >
            <div className="card-header">
              <h2 className="text-lg font-semibold">Wallet Monitor</h2>
            </div>
            <div className="card-body space-y-4">
              {suspiciousWallets.map((wallet, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="border border-white/10 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[var(--accent-red)] font-semibold text-sm">
                      ⚠ {wallet.label}
                    </span>
                    <a
                      href={`https://solscan.io/account/${wallet.address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[var(--accent-blue)] hover:underline"
                    >
                      View on Solscan →
                    </a>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <code className="text-white text-sm bg-black/30 px-3 py-2 rounded flex-1 overflow-hidden text-ellipsis">
                      {wallet.address}
                    </code>
                    <CopyButton text={wallet.address} />
                  </div>
                  <p className="text-[var(--text-dim)] text-xs">{wallet.description}</p>
                </motion.div>
              ))}
              <p className="text-[var(--text-dim)] text-xs">
                Funds from ALL registered projects pool into these wallets.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Buy Section */}
        <section id="buy" className="px-4 py-20 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card"
          >
            <div className="card-body text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Join The Exposure
              </h2>

              <p className="text-[var(--text-dim)] mb-8 max-w-lg mx-auto">
                $LARPBALL exists to spread awareness about centralized token infrastructure risks.
                <span className="text-[var(--accent-red)]"> DYOR before investing.</span>
              </p>

              {/* Contract Address */}
              <div className="mb-8">
                <p className="text-[var(--text-dim)] text-sm mb-2">Contract Address:</p>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-xl mx-auto">
                  <div className="flex-1 bg-black/30 border border-white/20 rounded-lg px-4 py-3 pulse">
                    <code className="text-white text-sm break-all">{CONTRACT_ADDRESS}</code>
                  </div>
                  <CopyButton text={CONTRACT_ADDRESS} />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={PUMP_FUN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-solid text-lg px-8 py-4"
                >
                  Buy on Pump.fun
                </a>
                <a
                  href={X_COMMUNITY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn text-lg px-8 py-4"
                >
                  Join Community
                </a>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="px-4 py-12 border-t border-white/10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center gap-6 mb-6">
              <a
                href={X_OFFICIAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-dim)] hover:text-white transition-colors"
              >
                @larpball
              </a>
              <a
                href={X_COMMUNITY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-dim)] hover:text-white transition-colors"
              >
                Community
              </a>
              <a
                href={PUMP_FUN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-dim)] hover:text-white transition-colors"
              >
                Pump.fun
              </a>
              <Link
                href="/pfp"
                className="text-[var(--text-dim)] hover:text-white transition-colors"
              >
                PFP Generator
              </Link>
              <a
                href="https://larptek.larpball.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-dim)] hover:text-white transition-colors"
              >
                LarpTek
              </a>
            </div>

            <div className="text-[var(--accent-red)] text-sm mb-6 p-4 border border-[var(--accent-red)]/30 rounded-lg bg-red-900/10">
              DYOR — Not financial advice. Satirical content for educational purposes.
              Cryptocurrency investments carry high risk.
            </div>

            <p className="text-[var(--text-dim)] text-sm">
              $LARPBALL 2025 — Exposing the Larp
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
