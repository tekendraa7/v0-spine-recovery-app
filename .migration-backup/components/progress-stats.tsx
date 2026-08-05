interface ProgressStatsProps {
  completedToday: number
  totalToday: number
  percentage: number
  language: "en" | "ne"
}

export function ProgressStats({ completedToday, totalToday, percentage, language }: ProgressStatsProps) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-white/90 text-sm font-medium">
          {language === "en" ? "Today's Progress" : "आजको प्रगति"}
        </span>
        <span className="text-white font-bold text-lg">{percentage}%</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
        <div
          className="h-full bg-white rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="flex items-center justify-between mt-3">
        <span className="text-white/80 text-xs">
          {completedToday} {language === "en" ? "of" : "को"} {totalToday} {language === "en" ? "exercises" : "व्यायाम"}
        </span>
        {percentage === 100 && totalToday > 0 && (
          <span className="text-xs bg-white/20 px-2 py-1 rounded-full text-white font-medium">
            {language === "en" ? "Complete!" : "पूरा भयो!"}
          </span>
        )}
      </div>
    </div>
  )
}
