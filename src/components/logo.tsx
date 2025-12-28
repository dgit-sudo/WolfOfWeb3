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
      <g className="final-wolf-head opacity-0 animate-[fade-in_0.5s_ease-out_forwards]" style={{ animationDelay: '3.5s' }}>
        <path
          d="M30 90 L50 70 L70 90 L80 80 L60 60 L75 45 L50 20 L25 45 L40 60 L20 80 Z"
          className="stroke-dasharray-[600] stroke-dashoffset-[600] animate-[draw_1.5s_ease-out_forwards]"
          style={{ animationDelay: '3.6s' }}
        />
         <path
          d="M80 40 Q 85 35, 90 30"
          className="stroke-dasharray-[100] stroke-dashoffset-[100] animate-[draw_1s_ease-out_forwards]"
          strokeWidth="2"
          style={{ animationDelay: '4s' }}
        />
        <path
          d="M82 45 Q 88 42, 95 40"
          className="stroke-dasharray-[100] stroke-dashoffset-[100] animate-[draw_1s_ease-out_forwards]"
          strokeWidth="2"
          style={{ animationDelay: '4.2s' }}
        />
        <path
          d="M84 50 Q 92 49, 100 50"
          className="stroke-dasharray-[100] stroke-dashoffset-[100] animate-[draw_1s_ease-out_forwards]"
          strokeWidth="2"
          style={{ animationDelay: '4.4s' }}
        />
      </g>
      
      <g className="revolving-orbs" style={{ animation: 'hide-orbs 0.1s linear forwards 3.5s' }}>
        <g style={{ animation: 'revolve 3s ease-in-out infinite' }}>
          {/* Orb 1 */}
          <circle cx="50" cy="20" r="4" className="fill-primary opacity-0" style={{ animation: 'orb-enter 0.5s forwards 0.2s, orb-form-1 1s forwards 2.5s' }} />
          {/* Orb 2 */}
          <circle cx="85" cy="50" r="4" className="fill-accent opacity-0" style={{ animation: 'orb-enter 0.5s forwards 0.4s, orb-form-2 1s forwards 2.5s' }} />
          {/* Orb 3 */}
          <circle cx="50" cy="80" r="4" className="fill-primary opacity-0" style={{ animation: 'orb-enter 0.5s forwards 0.6s, orb-form-3 1s forwards 2.5s' }} />
          {/* Orb 4 */}
          <circle cx="15" cy="50" r="4" className="fill-accent opacity-0" style={{ animation: 'orb-enter 0.5s forwards 0.8s, orb-form-4 1s forwards 2.5s' }} />
        </g>
      </g>
    </svg>
  );
}
