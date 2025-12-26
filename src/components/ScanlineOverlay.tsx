"use client";

export default function ScanlineOverlay() {
  return (
    <>
      <div className="scanlines" aria-hidden="true" />
      <div
        className="fixed inset-0 pointer-events-none z-50"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 100%)",
        }}
        aria-hidden="true"
      />
    </>
  );
}
