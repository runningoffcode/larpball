"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TerminalTextProps {
  text: string;
  speed?: number;
  delay?: number;
  prefix?: string;
  cursor?: boolean;
  className?: string;
  onComplete?: () => void;
}

export default function TerminalText({
  text,
  speed = 30,
  delay = 0,
  prefix = "",
  cursor = true,
  className,
  onComplete,
}: TerminalTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setStarted(true);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    if (displayText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(text.slice(0, displayText.length + 1));
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
      onComplete?.();
    }
  }, [displayText, text, speed, started, onComplete]);

  return (
    <span className={cn("inline", className)}>
      <span className="text-[var(--text-dim)]">{prefix}</span>
      <span>{displayText}</span>
      {cursor && !isComplete && <span className="cursor" />}
      {cursor && isComplete && <span className="cursor" />}
    </span>
  );
}
