"use client";

import type { Astro } from "@/lib/types";

export default function Astronomy({ astro }: { astro: Astro }) {
  return (
    <div className="card p-5 sm:p-6">
      <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-4">
        Astronomy
      </h2>

      <div className="flex items-center justify-between gap-6">
        {/* Sunrise / Sunset */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-5 h-5 text-orange" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
            <span className="text-xs font-semibold text-text-secondary uppercase">Sun</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div>
              <p className="text-text-secondary text-xs">Sunrise</p>
              <p className="font-mono font-semibold text-navy">{astro.sunrise}</p>
            </div>
            <div>
              <p className="text-text-secondary text-xs">Sunset</p>
              <p className="font-mono font-semibold text-navy">{astro.sunset}</p>
            </div>
          </div>
        </div>

        {/* Moonrise / Moonset */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-5 h-5 text-navy-light" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
            <span className="text-xs font-semibold text-text-secondary uppercase">Moon</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div>
              <p className="text-text-secondary text-xs">Moonrise</p>
              <p className="font-mono font-semibold text-navy">{astro.moonrise}</p>
            </div>
            <div>
              <p className="text-text-secondary text-xs">Moonset</p>
              <p className="font-mono font-semibold text-navy">{astro.moonset}</p>
            </div>
          </div>
        </div>

        {/* Moon Phase */}
        <div className="text-center shrink-0">
          <p className="text-text-secondary text-xs mb-1">Phase</p>
          <p className="font-semibold text-navy text-sm">{astro.moon_phase}</p>
          <p className="text-xs text-text-secondary">{astro.moon_illumination}% lit</p>
        </div>
      </div>
    </div>
  );
}
