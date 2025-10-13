"use client"

import { useState } from "react"
import { Heart, Target, Calendar, ArrowRight } from "lucide-react"
import type { Language } from "@/lib/translations"

interface OnboardingProps {
  onComplete: (weekStarted: number) => void
  language: Language
}

export function Onboarding({ onComplete, language }: OnboardingProps) {
  const [step, setStep] = useState(0)
  const [selectedWeek, setSelectedWeek] = useState(1)

  const steps = [
    {
      icon: Heart,
      titleEn: "Welcome to Spine Recovery",
      titleNe: "मेरुदण्ड रिकभरीमा स्वागत छ",
      descriptionEn:
        "A personalized 12-week program designed to help you recover from cervical spine issues through gentle, progressive exercises.",
      descriptionNe:
        "सौम्य, प्रगतिशील व्यायाम मार्फत ग्रीवा मेरुदण्ड समस्याहरूबाट पुन: प्राप्ति गर्न मद्दत गर्न डिजाइन गरिएको १२-हप्ताको व्यक्तिगत कार्यक्रम।",
    },
    {
      icon: Target,
      titleEn: "Your Recovery Journey",
      titleNe: "तपाईंको रिकभरी यात्रा",
      descriptionEn:
        "The program is divided into three phases: Gentle Mobility (Weeks 1-4), Strengthening (Weeks 5-8), and Advanced Stability (Weeks 9-12).",
      descriptionNe:
        "कार्यक्रम तीन चरणमा विभाजित छ: सौम्य गतिशीलता (हप्ता १-४), बलियो बनाउने (हप्ता ५-८), र उन्नत स्थिरता (हप्ता ९-१२)।",
    },
    {
      icon: Calendar,
      titleEn: "Choose Your Starting Point",
      titleNe: "आफ्नो सुरुवात बिन्दु छान्नुहोस्",
      descriptionEn:
        "Select which phase matches your current recovery stage. You can always adjust this later in settings.",
      descriptionNe: "तपाईंको हालको रिकभरी चरणसँग मेल खाने चरण चयन गर्नुहोस्। तपाईं यसलाई पछि सेटिङमा समायोजन गर्न सक्नुहुन्छ।",
    },
  ]

  const currentStep = steps[step]
  const Icon = currentStep.icon

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1)
    } else {
      onComplete(selectedWeek)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full">
        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mb-8">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all ${
                i === step ? "w-8 bg-[var(--color-primary)]" : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Icon */}
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-primary)]/10 rounded-2xl flex items-center justify-center">
          <Icon className="w-10 h-10 text-[var(--color-primary)]" />
        </div>

        {/* Content */}
        <h2 className="text-2xl font-bold text-[var(--color-text)] text-center mb-3 text-balance">
          {language === "en" ? currentStep.titleEn : currentStep.titleNe}
        </h2>
        <p className="text-[var(--color-text-secondary)] text-center mb-8 leading-relaxed">
          {language === "en" ? currentStep.descriptionEn : currentStep.descriptionNe}
        </p>

        {/* Week Selection (only on last step) */}
        {step === steps.length - 1 && (
          <div className="mb-8 space-y-2">
            {[
              { week: 1, labelEn: "Week 1-4: Gentle Mobility", labelNe: "हप्ता १-४: सौम्य गतिशीलता" },
              { week: 5, labelEn: "Week 5-8: Strengthening", labelNe: "हप्ता ५-८: बलियो बनाउने" },
              { week: 9, labelEn: "Week 9-12: Advanced Stability", labelNe: "हप्ता ९-१२: उन्नत स्थिरता" },
            ].map(({ week, labelEn, labelNe }) => (
              <button
                key={week}
                onClick={() => setSelectedWeek(week)}
                className={`w-full p-4 rounded-xl text-left transition-all ${
                  selectedWeek === week
                    ? "bg-[var(--color-primary)] text-white shadow-md"
                    : "bg-gray-100 text-[var(--color-text)] hover:bg-gray-200"
                }`}
              >
                <span className="font-medium">{language === "en" ? labelEn : labelNe}</span>
              </button>
            ))}
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-3">
          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex-1 py-3 border-2 border-[var(--color-border)] text-[var(--color-text)] font-semibold rounded-xl hover:bg-gray-50 transition-colors"
            >
              {language === "en" ? "Back" : "पछाडि"}
            </button>
          )}
          <button
            onClick={handleNext}
            className="flex-1 py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            {step === steps.length - 1 ? (
              language === "en" ? (
                "Get Started"
              ) : (
                "सुरु गर्नुहोस्"
              )
            ) : (
              <>
                {language === "en" ? "Next" : "अर्को"}
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
