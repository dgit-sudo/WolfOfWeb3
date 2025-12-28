
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
      <path d="M12 2L2 12l10 10 10-10L12 2z" />
      <path d="M12 2v10l-5 5" />
      <path d="M12 12l5 5" />
      <path d="M7 17l5-5" />
      <path d="M17 7l-5 5" />
      <path d="M2 12h20" />
    </svg>
  );
}
