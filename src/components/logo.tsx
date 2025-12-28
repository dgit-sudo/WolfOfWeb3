import { cn } from '@/lib/utils';
import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <defs>
        <clipPath id="wolf-clip">
          <path d="M30 90 L50 70 L70 90 L80 80 L60 60 L75 45 L50 20 L25 45 L40 60 L20 80 Z" />
        </clipPath>
      </defs>

      {/* Final Howling Wolf Logo - initially hidden, fades in */}
      <g className="final-wolf-head opacity-0 animate-[fade-in_0.5s_ease-out_forwards]" style={{ animationDelay: '3s' }}>
        <path
          d="M30 90 L50 70 L70 90 L80 80 L60 60 L75 45 L50 20 L25 45 L40 60 L20 80 Z"
          className="stroke-dasharray-[600] stroke-dashoffset-[600] animate-[draw_2s_ease-out_forwards]"
          strokeWidth="2"
          style={{ animationDelay: '3.1s' }}
        />
        <path
          d="M80 40 Q 85 35, 90 30"
          className="stroke-dasharray-[100] stroke-dashoffset-[100] animate-[draw_1s_ease-out_forwards]"
          strokeWidth="2"
          style={{ animationDelay: '3.5s' }}
        />
        <path
          d="M82 45 Q 88 42, 95 40"
          className="stroke-dasharray-[100] stroke-dashoffset-[100] animate-[draw_1s_ease-out_forwards]"
          strokeWidth="2"
          style={{ animationDelay: '3.7s' }}
        />
        <path
          d="M84 50 Q 92 49, 100 50"
          className="stroke-dasharray-[100] stroke-dashoffset-[100] animate-[draw_1s_ease-out_forwards]"
          strokeWidth="2"
          style={{ animationDelay: '3.9s' }}
        />
      </g>

      {/* Pixelated NFT parts - fly in, then glitch and hide */}
      <g className="nft-pieces animate-[glitch-and-hide_0.3s_steps(2)_forwards]" style={{ animationDelay: '2.7s' }}>
        {/* Piece 1 (Top Left) */}
        <g className="opacity-0 animate-[fly-in-top-left_1s_cubic-bezier(0.2,1,0.3,1)_forwards]" style={{ animationDelay: '0.2s' }}>
          <rect x="25" y="25" width="10" height="10" />
          <rect x="35" y="25" width="10" height="10" />
          <rect x="25" y="35" width="10" height="10" />
        </g>
        {/* Piece 2 (Top Right) */}
        <g className="opacity-0 animate-[fly-in-top-right_1s_cubic-bezier(0.2,1,0.3,1)_forwards]" style={{ animationDelay: '0.4s' }}>
          <rect x="65" y="25" width="10" height="10" />
          <rect x="55" y="25" width="10" height="10" />
          <rect x="65" y="35" width="10" height="10" />
        </g>
        {/* Piece 3 (Bottom Left) */}
        <g className="opacity-0 animate-[fly-in-bottom-left_1s_cubic-bezier(0.2,1,0.3,1)_forwards]" style={{ animationDelay: '0.6s' }}>
          <rect x="25" y="65" width="10" height="10" />
          <rect x="35" y="75" width="10" height="10" />
          <rect x="15" y="75" width="10" height="10" />
        </g>
        {/* Piece 4 (Bottom Right) */}
        <g className="opacity-0 animate-[fly-in-bottom-right_1s_cubic-bezier(0.2,1,0.3,1)_forwards]" style={{ animationDelay: '0.8s' }}>
          <rect x="65" y="65" width="10" height="10" />
          <rect x="55" y="75" width="10" height="10" />
          <rect x="75" y="75" width="10" height="10" />
        </g>
        {/* Piece 5 (Center) */}
        <g className="opacity-0 animate-[fly-in-center_1s_cubic-bezier(0.2,1,0.3,1)_forwards]" style={{ animationDelay: '1s' }}>
          <rect x="45" y="35" width="10" height="10" />
          <rect x="45" y="45" width="10" height="10" />
          <rect x="35" y="55" width="10" height="10" />
          <rect x="55" y="55" width="10" height="10" />
          <rect x="45" y="65" width="10" height="10" />
        </g>
      </g>
    </svg>
  );
}
