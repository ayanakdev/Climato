"use client";

import { useState, useEffect, useCallback } from "react";
import type { WeatherData } from "@/lib/types";
import Header from "@/components/Header";
import HeroWeather from "@/components/HeroWeather";
import DetailCards from "@/components/DetailCards";
import ForecastCards from "@/components/ForecastCards";
import HourlyChart from "@/components/HourlyChart";
import Astronomy from "@/components/Astronomy";
import Alerts from "@/components/Alerts";
import WeatherMap from "@/components/WeatherMap";
import RainChance from "@/components/RainChance";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import Footer from "@/components/Footer";

export default function Home() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(async (q: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/weather?q=${encodeURIComponent(q)}`);
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to fetch weather");
      }
      const json: WeatherData = await res.json();
      setData(json);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWeather("Auto:ip");
  }, [fetchWeather]);

  const todayHours = data?.forecast.forecastday[0]?.hour ?? [];
  const now = new Date();
  const currentHourIdx = todayHours.findIndex((h) => {
    const hd = new Date(h.time);
    return hd.getHours() >= now.getHours();
  });
  const upcomingHours = todayHours.slice(
    Math.max(0, currentHourIdx),
    Math.max(currentHourIdx, currentHourIdx + 12)
  );
  const chartHours = upcomingHours.length > 0 ? upcomingHours : todayHours.slice(0, 12);

  const alerts = data?.alerts?.alert ?? [];

  return (
    <div className="min-h-screen flex flex-col bg-bg-secondary">
      <Header onSearch={fetchWeather} loading={loading} />

      <main className="flex-1">
        {loading && !data && <LoadingSkeleton />}

        {error && !data && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
            <svg className="w-16 h-16 mx-auto text-orange mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <h2 className="text-xl font-semibold text-navy mb-2">Unable to load weather</h2>
            <p className="text-text-secondary mb-4">{error}</p>
            <button
              onClick={() => fetchWeather("Auto:ip")}
              className="px-5 py-2.5 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary-hover transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {data && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
            <div className="animate-fade-in-up">
              <HeroWeather data={data} />
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: "60ms" }}>
              <DetailCards current={data.current} />
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: "120ms" }}>
              <ForecastCards days={data.forecast.forecastday} />
            </div>

            {chartHours.length > 0 && (
              <div className="animate-fade-in-up" style={{ animationDelay: "180ms" }}>
                <HourlyChart hours={chartHours} />
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fade-in-up" style={{ animationDelay: "240ms" }}>
              <Astronomy astro={data.forecast.forecastday[0].astro} />
              <RainChance forecast={data.forecast.forecastday} />
            </div>

            {alerts.length > 0 && (
              <div className="animate-fade-in-up" style={{ animationDelay: "300ms" }}>
                <Alerts alerts={alerts} />
              </div>
            )}

            <div className="animate-fade-in-up" style={{ animationDelay: "360ms" }}>
              <WeatherMap lat={data.location.lat} lon={data.location.lon} />
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
