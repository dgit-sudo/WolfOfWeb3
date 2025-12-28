import { cn } from '@/lib/utils';
import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Wolf Head Outline */}
      <path d="M12 2L3 8v7l9 5 9-5V8L12 2z" />
      {/* Snout and Nose */}
      <path d="M12 11V2" />
      <path d="M12 11l-2.5 2.5" />
      <path d="M12 11l2.5 2.5" />
      {/* Eyes */}
      <path d="M10 9l-1 1" />
      <path d="M14 9l1 1" />
      {/* Gem-like facets */}
      <path d="M3 8l9 5" />
      <path d="M21 8l-9 5" />
      <path d="M3 15l9-5" />
      <path d="M21 15l-9-5" />
    </svg>
  );
}
