"use client"

import type { JSX } from "react"

interface ExerciseSVGProps {
  exerciseId: string
  className?: string
}

export function ExerciseSVG({ exerciseId, className = "" }: ExerciseSVGProps) {
  const svgs: Record<string, JSX.Element> = {
    "cat-cow": (
      <svg
        viewBox="0 0 200 150"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Person on hands and knees - arched back */}
        <g className="animate-pulse">
          {/* Head */}
          <circle cx="40" cy="50" r="12" />
          {/* Spine (arched) */}
          <path d="M 45 55 Q 80 40, 120 45 Q 140 48, 155 55" />
          {/* Arms */}
          <line x1="50" y1="60" x2="50" y2="100" />
          <line x1="145" y1="60" x2="145" y2="100" />
          {/* Legs */}
          <line x1="70" y1="50" x2="70" y2="90" />
          <line x1="125" y1="50" x2="125" y2="90" />
          {/* Hands */}
          <circle cx="50" cy="100" r="4" fill="currentColor" />
          <circle cx="145" cy="100" r="4" fill="currentColor" />
          {/* Knees */}
          <circle cx="70" cy="90" r="4" fill="currentColor" />
          <circle cx="125" cy="90" r="4" fill="currentColor" />
        </g>
      </svg>
    ),
    "chin-tucks": (
      <svg
        viewBox="0 0 200 150"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Side view of head and neck */}
        <g>
          {/* Head */}
          <circle cx="100" cy="50" r="20" />
          {/* Neck */}
          <line x1="100" y1="70" x2="100" y2="100" />
          {/* Shoulders */}
          <line x1="70" y1="100" x2="130" y2="100" />
          {/* Arrow showing chin movement */}
          <path d="M 120 50 L 140 50" strokeWidth="2" />
          <path d="M 135 45 L 140 50 L 135 55" strokeWidth="2" fill="currentColor" />
        </g>
      </svg>
    ),
    "shoulder-rolls": (
      <svg
        viewBox="0 0 200 150"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Front view of upper body */}
        <g>
          {/* Head */}
          <circle cx="100" cy="40" r="15" />
          {/* Neck */}
          <line x1="100" y1="55" x2="100" y2="70" />
          {/* Torso */}
          <rect x="80" y="70" width="40" height="50" rx="5" />
          {/* Shoulders with circular motion indicators */}
          <circle cx="65" cy="75" r="8" className="animate-spin" style={{ animationDuration: "3s" }} />
          <circle cx="135" cy="75" r="8" className="animate-spin" style={{ animationDuration: "3s" }} />
          {/* Arms */}
          <line x1="65" y1="83" x2="50" y2="110" />
          <line x1="135" y1="83" x2="150" y2="110" />
        </g>
      </svg>
    ),
    "pelvic-tilt": (
      <svg
        viewBox="0 0 200 150"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Side view lying down */}
        <g>
          {/* Head */}
          <circle cx="30" cy="60" r="12" />
          {/* Spine */}
          <path d="M 40 65 Q 80 70, 120 65" />
          {/* Pelvis */}
          <ellipse cx="120" cy="70" rx="15" ry="10" />
          {/* Bent legs */}
          <path d="M 115 75 L 110 95 L 105 75" />
          <path d="M 125 75 L 130 95 L 135 75" />
          {/* Ground line */}
          <line x1="20" y1="95" x2="180" y2="95" strokeDasharray="5,5" opacity="0.5" />
        </g>
      </svg>
    ),
    "bird-dog": (
      <svg
        viewBox="0 0 200 150"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Person on hands and knees with opposite arm and leg extended */}
        <g>
          {/* Head */}
          <circle cx="70" cy="50" r="12" />
          {/* Spine */}
          <line x1="75" y1="55" x2="130" y2="60" />
          {/* Supporting arm */}
          <line x1="80" y1="60" x2="80" y2="100" />
          {/* Extended arm */}
          <line x1="60" y1="55" x2="20" y2="45" strokeWidth="4" />
          {/* Supporting leg */}
          <line x1="120" y1="65" x2="120" y2="100" />
          {/* Extended leg */}
          <line x1="135" y1="62" x2="180" y2="70" strokeWidth="4" />
          {/* Hand and foot markers */}
          <circle cx="80" cy="100" r="4" fill="currentColor" />
          <circle cx="120" cy="100" r="4" fill="currentColor" />
        </g>
      </svg>
    ),
    "glute-bridge": (
      <svg
        viewBox="0 0 200 150"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Side view of bridge position */}
        <g>
          {/* Head */}
          <circle cx="40" cy="70" r="12" />
          {/* Spine (elevated) */}
          <path d="M 50 75 Q 100 40, 140 75" />
          {/* Bent legs */}
          <path d="M 60 75 L 60 100 L 50 110" />
          <path d="M 130 75 L 130 100 L 140 110" />
          {/* Ground line */}
          <line x1="20" y1="110" x2="180" y2="110" strokeDasharray="5,5" opacity="0.5" />
          {/* Feet */}
          <rect x="45" y="108" width="10" height="4" fill="currentColor" />
          <rect x="135" y="108" width="10" height="4" fill="currentColor" />
        </g>
      </svg>
    ),
    "cobra-stretch": (
      <svg
        viewBox="0 0 200 150"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Side view of cobra pose */}
        <g>
          {/* Head (looking up) */}
          <circle cx="50" cy="40" r="12" />
          {/* Spine (extended) */}
          <path d="M 55 50 Q 80 60, 110 80 Q 130 90, 150 95" />
          {/* Arms pushing up */}
          <line x1="70" y1="65" x2="70" y2="95" />
          <line x1="95" y1="75" x2="95" y2="100" />
          {/* Lower body on ground */}
          <line x1="120" y1="85" x2="160" y2="95" />
          {/* Ground line */}
          <line x1="20" y1="100" x2="180" y2="100" strokeDasharray="5,5" opacity="0.5" />
        </g>
      </svg>
    ),
    "wall-angels": (
      <svg
        viewBox="0 0 200 150"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Front view against wall */}
        <g>
          {/* Wall */}
          <line x1="10" y1="20" x2="10" y2="130" strokeWidth="2" opacity="0.3" />
          {/* Head */}
          <circle cx="100" cy="40" r="15" />
          {/* Neck */}
          <line x1="100" y1="55" x2="100" y2="70" />
          {/* Torso */}
          <rect x="80" y="70" width="40" height="50" rx="5" />
          {/* Arms in "up" position */}
          <line x1="80" y1="75" x2="50" y2="50" strokeWidth="4" />
          <line x1="120" y1="75" x2="150" y2="50" strokeWidth="4" />
          {/* Motion arrows */}
          <path d="M 50 60 L 50 90" strokeWidth="2" strokeDasharray="3,3" opacity="0.5" />
          <path d="M 150 60 L 150 90" strokeWidth="2" strokeDasharray="3,3" opacity="0.5" />
        </g>
      </svg>
    ),
    plank: (
      <svg
        viewBox="0 0 200 150"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Side view of plank */}
        <g>
          {/* Head */}
          <circle cx="40" cy="60" r="12" />
          {/* Straight body line */}
          <line x1="50" y1="65" x2="160" y2="65" strokeWidth="4" />
          {/* Forearms */}
          <line x1="55" y1="65" x2="55" y2="90" />
          <line x1="70" y1="65" x2="70" y2="90" />
          {/* Legs */}
          <line x1="145" y1="65" x2="145" y2="90" />
          <line x1="160" y1="65" x2="160" y2="90" />
          {/* Ground line */}
          <line x1="20" y1="90" x2="180" y2="90" strokeDasharray="5,5" opacity="0.5" />
        </g>
      </svg>
    ),
    "side-plank": (
      <svg
        viewBox="0 0 200 150"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Front view of side plank */}
        <g>
          {/* Head */}
          <circle cx="100" cy="50" r="12" />
          {/* Body at angle */}
          <line x1="100" y1="62" x2="100" y2="110" strokeWidth="4" />
          {/* Supporting arm */}
          <line x1="100" y1="75" x2="70" y2="100" strokeWidth="3" />
          {/* Top arm */}
          <line x1="100" y1="70" x2="130" y2="50" strokeWidth="3" />
          {/* Legs stacked */}
          <line x1="100" y1="110" x2="85" y2="130" />
          {/* Ground line */}
          <line x1="20" y1="130" x2="180" y2="130" strokeDasharray="5,5" opacity="0.5" />
        </g>
      </svg>
    ),
    "dead-bug": (
      <svg
        viewBox="0 0 200 150"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Lying on back with limbs extended */}
        <g>
          {/* Head */}
          <circle cx="100" cy="50" r="12" />
          {/* Torso */}
          <rect x="85" y="60" width="30" height="40" rx="5" />
          {/* One arm up */}
          <line x1="90" y1="65" x2="70" y2="40" strokeWidth="3" />
          {/* One arm down */}
          <line x1="110" y1="65" x2="130" y2="90" strokeWidth="3" />
          {/* One leg extended */}
          <line x1="90" y1="100" x2="70" y2="130" strokeWidth="3" />
          {/* One leg bent */}
          <path d="M 105 100 L 120 115 L 125 100" strokeWidth="3" />
        </g>
      </svg>
    ),
    "thoracic-rotation": (
      <svg
        viewBox="0 0 200 150"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Top view of rotation */}
        <g>
          {/* Head */}
          <circle cx="100" cy="60" r="12" />
          {/* Spine */}
          <line x1="100" y1="72" x2="100" y2="110" />
          {/* Supporting arm */}
          <line x1="90" y1="85" x2="60" y2="100" />
          {/* Rotating arm (behind head) */}
          <path d="M 100 65 Q 120 60, 140 70" strokeWidth="3" />
          {/* Rotation arrow */}
          <path d="M 130 75 Q 140 80, 135 90" strokeWidth="2" />
          <path d="M 135 85 L 135 90 L 130 88" fill="currentColor" />
          {/* Supporting legs */}
          <line x1="90" y1="110" x2="80" y2="130" />
          <line x1="110" y1="110" x2="120" y2="130" />
        </g>
      </svg>
    ),
  }

  return svgs[exerciseId] || svgs["cat-cow"]
}
