import { cn } from '@/lib/utils';
import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Wolf Head */}
      <path
        id="wolf-head"
        d="M30 90 L50 70 L70 90 L80 80 L60 60 L75 45 L50 20 L25 45 L40 60 L20 80 Z"
        className="opacity-0 animate-[fade-in_1s_ease-out_forwards]"
        style={{ animationDelay: '0.5s' }}
      />
      {/* Lower Jaw */}
      <path
        id="wolf-jaw"
        d="M50 70 L45 65 L55 65 Z"
        className="opacity-0 animate-[fade-in_1s_ease-out_forwards]"
        style={{ animationDelay: '1s' }}
      />
      {/* Howl lines */}
      <path
        id="howl-1"
        d="M80 40 Q 85 35, 90 30"
        className="opacity-0 stroke-dasharray-[100] stroke-dashoffset-[100] animate-[draw_1s_ease-out_forwards]"
        style={{ animationDelay: '1.5s' }}
      />
      <path
        id="howl-2"
        d="M82 45 Q 88 42, 95 40"
        className="opacity-0 stroke-dasharray-[100] stroke-dashoffset-[100] animate-[draw_1s_ease-out_forwards]"
        style={{ animationDelay: '1.7s' }}
      />
       <path
        id="howl-3"
        d="M84 50 Q 92 49, 100 50"
        className="opacity-0 stroke-dasharray-[100] stroke-dashoffset-[100] animate-[draw_1s_ease-out_forwards]"
        style={{ animationDelay: '1.9s' }}
      />
    </svg>
  );
}
