"use client";

import type { WeatherData } from "@/lib/types";

function formatDate(dt: string) {
  const d = new Date(dt);
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function HeroWeather({ data }: { data: WeatherData }) {
  const { location, current } = data;
  const iconUrl = current.condition.icon.startsWith("//")
    ? `https:${current.condition.icon}`
    : current.condition.icon;

  return (
    <div className="card p-6 sm:p-8 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -translate-y-32 translate-x-32" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full translate-y-24 -translate-x-24" />

      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-navy">{location.name}</h1>
            <p className="text-text-secondary text-sm mt-1">
              {location.region ? `${location.region}, ` : ""}{location.country}
            </p>
            <p className="text-text-secondary text-xs mt-1">{formatDate(location.localtime)}</p>
          </div>

          <div className="flex items-center gap-4">
            <img
              src={iconUrl}
              alt={current.condition.text}
              width={72}
              height={72}
              className="drop-shadow-lg"
            />
            <div className="text-right">
              <div className="font-mono text-5xl sm:text-6xl font-bold tracking-tight count-animate text-navy">
                {Math.round(current.temp_c)}°
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
          <span className="bg-primary-light px-3 py-1 rounded-full font-medium text-primary">
            {current.condition.text}
          </span>
          <span className="text-text-secondary">
            Feels like {Math.round(current.feelslike_c)}°C
          </span>
          <span className="text-border">|</span>
          <span className="text-text-secondary">
            H: {Math.round(data.forecast.forecastday[0].day.maxtemp_c)}°
          </span>
          <span className="text-text-secondary">
            L: {Math.round(data.forecast.forecastday[0].day.mintemp_c)}°
          </span>
        </div>
      </div>
    </div>
  );
}
