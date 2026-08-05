import type { JSX } from "react"

interface ExerciseSVGProps {
  exerciseId: string
  className?: string
}

export function ExerciseSVG({ exerciseId, className = "" }: ExerciseSVGProps) {
  const svgs: Record<string, JSX.Element> = {
    "cat-cow": (
      <svg viewBox="0 0 200 150" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <g className="animate-pulse">
          <circle cx="40" cy="50" r="12" />
          <path d="M 45 55 Q 80 40, 120 45 Q 140 48, 155 55" />
          <line x1="50" y1="60" x2="50" y2="100" />
          <line x1="145" y1="60" x2="145" y2="100" />
          <line x1="70" y1="50" x2="70" y2="90" />
          <line x1="125" y1="50" x2="125" y2="90" />
          <circle cx="50" cy="100" r="4" fill="currentColor" />
          <circle cx="145" cy="100" r="4" fill="currentColor" />
          <circle cx="70" cy="90" r="4" fill="currentColor" />
          <circle cx="125" cy="90" r="4" fill="currentColor" />
        </g>
      </svg>
    ),
    "chin-tucks": (
      <svg viewBox="0 0 200 150" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <g>
          <circle cx="100" cy="50" r="20" />
          <line x1="100" y1="70" x2="100" y2="100" />
          <line x1="70" y1="100" x2="130" y2="100" />
          <path d="M 120 50 L 140 50" strokeWidth="2" />
          <path d="M 135 45 L 140 50 L 135 55" strokeWidth="2" fill="currentColor" />
        </g>
      </svg>
    ),
    "pelvic-tilt": (
      <svg viewBox="0 0 200 150" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <g>
          <circle cx="30" cy="60" r="12" />
          <path d="M 40 65 Q 80 70, 120 65" />
          <ellipse cx="120" cy="70" rx="15" ry="10" />
          <path d="M 115 75 L 110 95 L 105 75" />
          <path d="M 125 75 L 130 95 L 135 75" />
          <line x1="20" y1="95" x2="180" y2="95" strokeDasharray="5,5" opacity="0.5" />
        </g>
      </svg>
    ),
    "bird-dog": (
      <svg viewBox="0 0 200 150" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <g>
          <circle cx="70" cy="50" r="12" />
          <line x1="75" y1="55" x2="130" y2="60" />
          <line x1="80" y1="60" x2="80" y2="100" />
          <line x1="60" y1="55" x2="20" y2="45" strokeWidth="4" />
          <line x1="120" y1="65" x2="120" y2="100" />
          <line x1="135" y1="62" x2="180" y2="70" strokeWidth="4" />
          <circle cx="80" cy="100" r="4" fill="currentColor" />
          <circle cx="120" cy="100" r="4" fill="currentColor" />
        </g>
      </svg>
    ),
    "glute-bridge": (
      <svg viewBox="0 0 200 150" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <g>
          <circle cx="40" cy="70" r="12" />
          <path d="M 50 75 Q 100 40, 140 75" />
          <path d="M 60 75 L 60 100 L 50 110" />
          <path d="M 130 75 L 130 100 L 140 110" />
          <line x1="20" y1="110" x2="180" y2="110" strokeDasharray="5,5" opacity="0.5" />
          <rect x="45" y="108" width="10" height="4" fill="currentColor" />
          <rect x="135" y="108" width="10" height="4" fill="currentColor" />
        </g>
      </svg>
    ),
    "cobra-pose": (
      <svg viewBox="0 0 200 150" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <g>
          <circle cx="50" cy="40" r="12" />
          <path d="M 55 50 Q 80 60, 110 80 Q 130 90, 150 95" />
          <line x1="70" y1="65" x2="70" y2="95" />
          <line x1="95" y1="75" x2="95" y2="100" />
          <line x1="120" y1="85" x2="160" y2="95" />
          <line x1="20" y1="100" x2="180" y2="100" strokeDasharray="5,5" opacity="0.5" />
        </g>
      </svg>
    ),
    "childs-pose": (
      <svg viewBox="0 0 200 150" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <g>
          <circle cx="160" cy="80" r="12" />
          <path d="M 150 85 Q 120 90, 90 95 Q 60 100, 30 90" />
          <line x1="150" y1="90" x2="140" y2="110" />
          <line x1="140" y1="90" x2="135" y2="110" />
          <line x1="20" y1="95" x2="180" y2="95" strokeDasharray="5,5" opacity="0.5" />
        </g>
      </svg>
    ),
    "knee-to-chest": (
      <svg viewBox="0 0 200 150" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <g>
          <circle cx="30" cy="60" r="12" />
          <path d="M 40 65 L 140 65" />
          <path d="M 100 65 Q 110 50, 120 65 Q 120 80, 100 80 Q 90 65, 100 65" />
          <line x1="140" y1="65" x2="160" y2="90" />
          <line x1="20" y1="90" x2="180" y2="90" strokeDasharray="5,5" opacity="0.5" />
        </g>
      </svg>
    ),
    plank: (
      <svg viewBox="0 0 200 150" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <g>
          <circle cx="40" cy="60" r="12" />
          <line x1="50" y1="65" x2="160" y2="65" strokeWidth="4" />
          <line x1="55" y1="65" x2="55" y2="90" />
          <line x1="70" y1="65" x2="70" y2="90" />
          <line x1="145" y1="65" x2="145" y2="90" />
          <line x1="160" y1="65" x2="160" y2="90" />
          <line x1="20" y1="90" x2="180" y2="90" strokeDasharray="5,5" opacity="0.5" />
        </g>
      </svg>
    ),
    "side-plank": (
      <svg viewBox="0 0 200 150" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <g>
          <circle cx="100" cy="50" r="12" />
          <line x1="100" y1="62" x2="100" y2="110" strokeWidth="4" />
          <line x1="100" y1="75" x2="70" y2="100" strokeWidth="3" />
          <line x1="100" y1="70" x2="130" y2="50" strokeWidth="3" />
          <line x1="100" y1="110" x2="85" y2="130" />
          <line x1="20" y1="130" x2="180" y2="130" strokeDasharray="5,5" opacity="0.5" />
        </g>
      </svg>
    ),
    "bird-dog-hold": (
      <svg viewBox="0 0 200 150" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <g>
          <circle cx="70" cy="50" r="12" />
          <line x1="75" y1="55" x2="130" y2="60" />
          <line x1="80" y1="60" x2="80" y2="100" />
          <line x1="60" y1="55" x2="20" y2="45" strokeWidth="4" />
          <line x1="120" y1="65" x2="120" y2="100" />
          <line x1="135" y1="62" x2="180" y2="70" strokeWidth="4" />
          <circle cx="80" cy="100" r="4" fill="currentColor" />
          <circle cx="120" cy="100" r="4" fill="currentColor" />
        </g>
      </svg>
    ),
    "glute-bridge-march": (
      <svg viewBox="0 0 200 150" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <g>
          <circle cx="40" cy="70" r="12" />
          <path d="M 50 75 Q 100 40, 140 75" />
          <path d="M 60 75 L 60 100 L 50 110" />
          <path d="M 130 75 L 130 85 L 120 70" strokeWidth="4" />
          <line x1="20" y1="110" x2="180" y2="110" strokeDasharray="5,5" opacity="0.5" />
          <rect x="45" y="108" width="10" height="4" fill="currentColor" />
        </g>
      </svg>
    ),
    "cobra-extension": (
      <svg viewBox="0 0 200 150" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <g>
          <circle cx="50" cy="30" r="12" />
          <path d="M 55 40 Q 80 55, 110 75 Q 130 85, 150 90" />
          <line x1="65" y1="55" x2="65" y2="95" />
          <line x1="90" y1="70" x2="90" y2="100" />
          <line x1="120" y1="80" x2="160" y2="90" />
          <line x1="20" y1="100" x2="180" y2="100" strokeDasharray="5,5" opacity="0.5" />
        </g>
      </svg>
    ),
    "wall-plank": (
      <svg viewBox="0 0 200 150" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <g>
          <line x1="30" y1="20" x2="30" y2="130" strokeWidth="2" opacity="0.3" />
          <circle cx="100" cy="50" r="15" />
          <line x1="100" y1="65" x2="100" y2="80" />
          <rect x="80" y="80" width="40" height="40" rx="5" />
          <line x1="80" y1="85" x2="30" y2="70" strokeWidth="4" />
          <line x1="120" y1="85" x2="155" y2="110" />
          <line x1="110" y1="120" x2="110" y2="130" />
          <line x1="90" y1="120" x2="90" y2="130" />
        </g>
      </svg>
    ),
    "shoulder-blade-squeeze": (
      <svg viewBox="0 0 200 150" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <g>
          <circle cx="100" cy="40" r="15" />
          <line x1="100" y1="55" x2="100" y2="70" />
          <rect x="80" y="70" width="40" height="50" rx="5" />
          <line x1="80" y1="80" x2="55" y2="75" strokeWidth="3" />
          <line x1="120" y1="80" x2="145" y2="75" strokeWidth="3" />
          <path d="M 60 80 Q 75 90, 60 100" strokeWidth="2" strokeDasharray="3,3" />
          <path d="M 140 80 Q 125 90, 140 100" strokeWidth="2" strokeDasharray="3,3" />
        </g>
      </svg>
    ),
    "neck-resistance": (
      <svg viewBox="0 0 200 150" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <g>
          <circle cx="100" cy="50" r="20" />
          <line x1="100" y1="70" x2="100" y2="100" />
          <line x1="70" y1="100" x2="130" y2="100" />
          <rect x="120" y="40" width="20" height="15" rx="3" />
          <line x1="120" y1="47" x2="100" y2="47" />
        </g>
      </svg>
    ),
  }

  return svgs[exerciseId] || svgs["cat-cow"]
}
