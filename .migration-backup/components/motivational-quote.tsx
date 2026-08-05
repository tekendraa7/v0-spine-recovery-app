"use client"

import { motivationalQuote } from "@/lib/exercises-data"
import { Sparkles } from "lucide-react"

interface MotivationalQuoteProps {
  language: "en" | "ne"
}

export function MotivationalQuote({ language }: MotivationalQuoteProps) {
  return (
    <div className="bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-primary)]/5 rounded-2xl p-5 border border-[var(--color-primary)]/20">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-5 h-5 text-[var(--color-primary)]" />
        </div>
        <div>
          <h3 className="font-semibold text-[var(--color-text)] mb-2">
            {language === "en" ? "Daily Motivation" : "दैनिक प्रेरणा"}
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed italic">
            {motivationalQuote[language]}
          </p>
        </div>
      </div>
    </div>
  )
}
