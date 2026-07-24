"use client";

import { useState } from "react";
import type { WeatherAlert } from "@/lib/types";

function severityColor(s: string) {
  switch (s.toLowerCase()) {
    case "extreme": return "bg-red-100 text-danger border-red-200";
    case "severe": return "bg-orange-100 text-orange border-orange-200";
    case "moderate": return "bg-yellow-100 text-yellow-700 border-yellow-200";
    default: return "bg-blue-100 text-primary border-blue-200";
  }
}

export default function Alerts({ alerts }: { alerts: WeatherAlert[] }) {
  const [expanded, setExpanded] = useState<number | null>(null);

  if (!alerts || alerts.length === 0) return null;

  return (
    <div>
      <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">
        Weather Alerts
      </h2>
      <div className="space-y-2">
        {alerts.map((a, i) => (
          <div
            key={i}
            className={`card border-l-4 ${
              a.severity === "Extreme" || a.severity === "Severe"
                ? "border-l-danger"
                : a.severity === "Moderate"
                ? "border-l-orange"
                : "border-l-primary"
            }`}
          >
            <button
              onClick={() => setExpanded(expanded === i ? null : i)}
              className="w-full text-left p-4 flex items-start gap-3"
            >
              <svg className="w-5 h-5 text-orange shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-navy text-sm">{a.event}</span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${severityColor(a.severity)}`}>
                    {a.severity}
                  </span>
                </div>
                <p className="text-xs text-text-secondary mt-1 line-clamp-1">{a.headline}</p>
              </div>
              <svg
                className={`w-4 h-4 text-text-secondary shrink-0 transition-transform ${expanded === i ? "rotate-180" : ""}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {expanded === i && (
              <div className="px-4 pb-4 text-sm text-text-secondary border-t border-border-light pt-3 animate-fade-in-up">
                <p className="whitespace-pre-wrap">{a.desc || a.note}</p>
                {a.instruction && (
                  <p className="mt-2 font-medium text-navy">{a.instruction}</p>
                )}
                <div className="flex gap-4 mt-3 text-xs text-text-secondary">
                  <span>Effective: {new Date(a.effective).toLocaleString()}</span>
                  <span>Expires: {new Date(a.expires).toLocaleString()}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
