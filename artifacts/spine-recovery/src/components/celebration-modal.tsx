import { useEffect, useState } from "react"
import { Trophy, X } from "lucide-react"
import type { Language } from "@/lib/translations"

interface CelebrationModalProps {
  show: boolean
  onClose: () => void
  language: Language
}

export function CelebrationModal({ show, onClose, language }: CelebrationModalProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (show) {
      setIsVisible(true)
    }
  }, [show])

  if (!isVisible) return null

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300)
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 transition-opacity ${
        show ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
    >
      <div
        className={`bg-white rounded-3xl p-8 max-w-sm w-full text-center transform transition-all relative ${
          show ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Celebration Animation */}
        <div className="relative mb-6">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-[var(--color-success)] to-[var(--color-success)]/70 rounded-full flex items-center justify-center animate-bounce">
            <Trophy className="w-12 h-12 text-white" />
          </div>
          {/* Confetti effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-[var(--color-primary)] animate-ping"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  transform: `rotate(${i * 45}deg) translateY(-40px)`,
                }}
              />
            ))}
          </div>
        </div>

        <h2 className="text-2xl font-bold text-[var(--color-text)] mb-2">
          {language === "en" ? "All Done!" : "सबै सकियो!"}
        </h2>
        <p className="text-[var(--color-text-secondary)] mb-6 leading-relaxed">
          {language === "en"
            ? "Congratulations! You've completed all your exercises for today. Your spine thanks you!"
            : "बधाई छ! तपाईंले आजको लागि आफ्नो सबै व्यायाम पूरा गर्नुभयो। तपाईंको मेरुदण्डले धन्यवाद दिन्छ!"}
        </p>

        <button
          onClick={handleClose}
          className="w-full py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold rounded-xl transition-colors"
        >
          {language === "en" ? "Awesome!" : "उत्कृष्ट!"}
        </button>

        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}
