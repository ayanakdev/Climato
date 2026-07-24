"use client";

import type { ForecastDay } from "@/lib/types";

function dayName(dateStr: string, i: number) {
  if (i === 0) return "Today";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { weekday: "short" });
}

function dayDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function ForecastCards({ days }: { days: ForecastDay[] }) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">
        3-Day Forecast
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {days.map((fd, i) => {
          const iconUrl =
            fd.day.condition.icon.startsWith("//")
              ? `https:${fd.day.condition.icon}`
              : fd.day.condition.icon;

          const rainPct = fd.day.daily_chance_of_rain;

          return (
            <div
              key={fd.date}
              className={`card p-5 text-center animate-fade-in-up ${
                i === 0 ? "ring-2 ring-primary" : ""
              }`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <p className="font-semibold text-navy">{dayName(fd.date, i)}</p>
              <p className="text-xs text-text-secondary">{dayDate(fd.date)}</p>

              <img
                src={iconUrl}
                alt={fd.day.condition.text}
                width={48}
                height={48}
                className="mx-auto my-3"
              />

              <p className="text-xs text-text-secondary mb-2">
                {fd.day.condition.text}
              </p>

              <div className="flex items-center justify-center gap-2 font-mono">
                <span className="text-lg font-bold text-navy">
                  {Math.round(fd.day.maxtemp_c)}°
                </span>
                <span className="text-sm text-text-secondary">
                  {Math.round(fd.day.mintemp_c)}°
                </span>
              </div>

              <div className="mt-3 flex items-center justify-center gap-1 text-xs text-text-secondary">
                <svg className="w-3.5 h-3.5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" />
                </svg>
                <span>{rainPct}% rain</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
