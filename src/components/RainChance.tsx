"use client";

import type { ForecastDay } from "@/lib/types";

export default function RainChance({ forecast }: { forecast: ForecastDay[] }) {
  return (
    <div className="card p-5 sm:p-6">
      <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-4">
        Chance of Rain
      </h2>
      <div className="space-y-3">
        {forecast.map((fd) => {
          const pct = fd.day.daily_chance_of_rain;
          const willRain = fd.day.daily_will_it_rain === 1;
          const date = new Date(fd.date + "T00:00:00");
          const label = fd === forecast[0] ? "Today" : date.toLocaleDateString("en-US", { weekday: "short" });

          return (
            <div key={fd.date} className="flex items-center gap-3">
              <span className="text-xs font-medium text-navy w-10 shrink-0">{label}</span>
              <div className="flex-1 h-2.5 bg-bg-secondary rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    pct > 60 ? "bg-primary" : pct > 30 ? "bg-primary/60" : "bg-primary/30"
                  }`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-xs font-mono text-navy w-10 text-right">{pct}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
