'use client';

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";

type SecretAdminTriggerProps = {
  children: ReactNode;
};

const TARGET_CLICKS = 5;
const RESET_MS = 2000;

export function SecretAdminTrigger({ children }: SecretAdminTriggerProps) {
  const [clickCount, setClickCount] = useState(0);
  const resetRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (clickCount >= TARGET_CLICKS) {
      router.push('/neverbeforedicoverableadminpage');
      setClickCount(0);
      return;
    }

    if (clickCount > 0) {
      resetRef.current = setTimeout(() => setClickCount(0), RESET_MS);
    }

    return () => {
      if (resetRef.current) clearTimeout(resetRef.current);
    };
  }, [clickCount, router]);

  return (
    <button
      type="button"
      onClick={() => setClickCount((count) => count + 1)}
      className="w-full"
      aria-label="Founder portrait"
    >
      {children}
    </button>
  );
}
