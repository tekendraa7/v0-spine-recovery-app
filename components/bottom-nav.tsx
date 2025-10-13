"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Calendar, Dumbbell, BarChart3 } from "lucide-react"

interface BottomNavProps {
  language: "en" | "ne"
}

export function BottomNav({ language }: BottomNavProps) {
  const pathname = usePathname()

  const navItems = [
    {
      href: "/",
      icon: Home,
      labelEn: "Home",
      labelNe: "होम",
    },
    {
      href: "/exercises",
      icon: Dumbbell,
      labelEn: "Exercises",
      labelNe: "व्यायाम",
    },
    {
      href: "/calendar",
      icon: Calendar,
      labelEn: "Calendar",
      labelNe: "क्यालेन्डर",
    },
    {
      href: "/progress",
      icon: BarChart3,
      labelEn: "Progress",
      labelNe: "प्रगति",
    },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[var(--color-border)] z-20">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex items-center justify-around py-2">
          {navItems.map(({ href, icon: Icon, labelEn, labelNe }) => {
            const isActive = pathname === href
            const label = language === "en" ? labelEn : labelNe

            return (
              <Link
                key={href}
                href={href}
                className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-colors ${
                  isActive
                    ? "text-[var(--color-primary)]"
                    : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs font-medium">{label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
