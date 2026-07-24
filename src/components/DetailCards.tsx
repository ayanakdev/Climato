"use client";

import type { Current } from "@/lib/types";

interface MetricCardProps {
  label: string;
  value: string;
  sub?: string;
  icon: React.ReactNode;
  color?: string;
}

function MetricCard({ label, value, sub, icon, color = "text-primary" }: MetricCardProps) {
  return (
    <div className="card p-5">
      <div className="flex items-center gap-2 mb-3">
        <span className={color}>{icon}</span>
        <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
          {label}
        </span>
      </div>
      <div className="font-mono text-2xl font-bold text-navy count-animate">{value}</div>
      {sub && <p className="text-xs text-text-secondary mt-1">{sub}</p>}
    </div>
  );
}

function getAqiInfo(index: number) {
  const levels = [
    { label: "Good", color: "text-success", bg: "bg-green-50" },
    { label: "Moderate", color: "text-orange", bg: "bg-orange-50" },
    { label: "Unhealthy (Sensitive)", color: "text-orange", bg: "bg-orange-50" },
    { label: "Unhealthy", color: "text-danger", bg: "bg-red-50" },
    { label: "Very Unhealthy", color: "text-danger", bg: "bg-red-50" },
    { label: "Hazardous", color: "text-danger", bg: "bg-red-50" },
  ];
  return levels[Math.min(index - 1, levels.length - 1)] || levels[0];
}

function getUvInfo(uv: number) {
  if (uv <= 2) return { label: "Low", color: "text-success" };
  if (uv <= 5) return { label: "Moderate", color: "text-orange" };
  if (uv <= 7) return { label: "High", color: "text-orange" };
  if (uv <= 10) return { label: "Very High", color: "text-danger" };
  return { label: "Extreme", color: "text-danger" };
}

export default function DetailCards({ current }: { current: Current }) {
  const aqi = current.air_quality?.["us-epa-index"] ?? 1;
  const aqiInfo = getAqiInfo(aqi);
  const uvInfo = getUvInfo(current.uv);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {/* UV Index */}
      <div className="card p-5">
        <div className="flex items-center gap-2 mb-3">
          <svg className="w-4 h-4 text-orange" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
          </svg>
          <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">UV Index</span>
        </div>
        <div className="font-mono text-2xl font-bold text-navy">{current.uv}</div>
        <p className={`text-xs font-medium mt-1 ${uvInfo.color}`}>{uvInfo.label}</p>
      </div>

      {/* AQI */}
      <div className="card p-5">
        <div className="flex items-center gap-2 mb-3">
          <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Air Quality</span>
        </div>
        <div className="font-mono text-2xl font-bold text-navy">{aqi}</div>
        <p className={`text-xs font-medium mt-1 ${aqiInfo.color}`}>{aqiInfo.label}</p>
        {current.air_quality && (
          <p className="text-[10px] text-text-secondary mt-1">
            PM2.5: {current.air_quality.pm2_5?.toFixed(1)} μg/m³
          </p>
        )}
      </div>

      {/* Wind */}
      <MetricCard
        label="Wind"
        value={`${Math.round(current.wind_kph)}`}
        sub={`${current.wind_dir} · Gusts ${Math.round(current.gust_kph)} km/h`}
        color="text-primary"
        icon={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        }
      />

      {/* Humidity */}
      <MetricCard
        label="Humidity"
        value={`${current.humidity}%`}
        sub={`Dew point ${Math.round(current.dewpoint_c)}°C`}
        color="text-primary"
        icon={
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" />
          </svg>
        }
      />

      {/* Pressure */}
      <MetricCard
        label="Pressure"
        value={`${Math.round(current.pressure_mb)}`}
        sub="mb"
        color="text-primary"
        icon={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        }
      />

      {/* Visibility */}
      <MetricCard
        label="Visibility"
        value={`${current.vis_km}`}
        sub="km"
        color="text-primary"
        icon={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        }
      />
    </div>
  );
}
