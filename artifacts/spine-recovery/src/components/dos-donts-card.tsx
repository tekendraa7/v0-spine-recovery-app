import { CheckCircle2, XCircle } from "lucide-react"
import { dosAndDonts } from "@/lib/exercises-data"

interface DosDontsCardProps {
  language: "en" | "ne"
}

export function DosDontsCard({ language }: DosDontsCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-[var(--color-text)] mb-4">
        {language === "en" ? "Do's and Don'ts" : "गर्नु र नगर्नु"}
      </h3>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Do's */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <h4 className="font-medium text-[var(--color-text)]">{language === "en" ? "Do" : "गर्नुहोस्"}</h4>
          </div>
          <ul className="space-y-2">
            {dosAndDonts.dos[language].map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Don'ts */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <XCircle className="w-5 h-5 text-red-600" />
            <h4 className="font-medium text-[var(--color-text)]">{language === "en" ? "Don't" : "नगर्नुहोस्"}</h4>
          </div>
          <ul className="space-y-2">
            {dosAndDonts.donts[language].map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]">
                <span className="text-red-600 mt-0.5">✗</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
