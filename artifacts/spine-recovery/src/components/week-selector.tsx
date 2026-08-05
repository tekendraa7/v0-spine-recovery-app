interface WeekSelectorProps {
  currentWeek: number
  onWeekChange: (week: number) => void
  language: "en" | "ne"
}

export function WeekSelector({ currentWeek, onWeekChange, language }: WeekSelectorProps) {
  const months = [
    {
      week: 1,
      label: language === "en" ? "Month 1" : "महिना १",
      phase: language === "en" ? "Healing & Mobility" : "निको पार्ने र गतिशीलता",
      weeks: language === "en" ? "Weeks 1-4" : "हप्ता १-४",
    },
    {
      week: 5,
      label: language === "en" ? "Month 2" : "महिना २",
      phase: language === "en" ? "Strength & Posture" : "शक्ति र मुद्रा",
      weeks: language === "en" ? "Weeks 5-8" : "हप्ता ५-८",
    },
    {
      week: 9,
      label: language === "en" ? "Month 3" : "महिना ३",
      phase: language === "en" ? "Stability & Gym Prep" : "स्थिरता र जिम तयारी",
      weeks: language === "en" ? "Weeks 9-12" : "हप्ता ९-१२",
    },
  ]

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[var(--color-border)] p-4">
      <h3 className="text-sm font-medium text-[var(--color-text-secondary)] mb-3">
        {language === "en" ? "3-Month Recovery Plan" : "३ महिनाको रिकभरी योजना"}
      </h3>
      <div className="grid grid-cols-3 gap-2">
        {months.map(({ week, label, phase, weeks }) => (
          <button
            key={week}
            onClick={() => onWeekChange(week)}
            className={`p-3 rounded-xl text-center transition-all ${
              currentWeek >= week && currentWeek < week + 4
                ? "bg-[var(--color-primary)] text-white shadow-md"
                : "bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-tertiary)]"
            }`}
          >
            <div className="text-xs font-bold mb-1">{label}</div>
            <div className="text-[10px] opacity-90 mb-1">{weeks}</div>
            <div className="text-[10px] opacity-80 leading-tight">{phase}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
