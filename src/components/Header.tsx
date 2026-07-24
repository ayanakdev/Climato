"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import type { SearchResult } from "@/lib/types";

export default function Header({
  onSearch,
  loading,
}: {
  onSearch: (q: string) => void;
  loading: boolean;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [open, setOpen] = useState(false);
  const [geoLoading, setGeoLoading] = useState(false);
  const wrapRef = useRef<HTMLFormElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const fetchResults = useCallback((q: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (q.length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }
    timerRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
        const data = await res.json();
        setResults(data);
        setOpen(data.length > 0);
      } catch {
        setResults([]);
      }
    }, 300);
  }, []);

  function handleChange(v: string) {
    setQuery(v);
    fetchResults(v);
  }

  function select(r: SearchResult) {
    setQuery(r.name);
    setOpen(false);
    onSearch(r.name);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      setOpen(false);
      onSearch(query.trim());
    }
  }

  function locate() {
    if (!navigator.geolocation) return;
    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGeoLoading(false);
        onSearch(`${pos.coords.latitude},${pos.coords.longitude}`);
      },
      () => setGeoLoading(false)
    );
  }

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-4">
        <a href="/" className="flex items-center gap-2 shrink-0">
          <Image src="/logo.png" alt="Climato" width={36} height={36} priority />
          <span className="text-navy font-semibold text-lg hidden sm:block">Climato</span>
        </a>

        <form onSubmit={handleSubmit} className="flex-1 max-w-md relative" ref={wrapRef}>
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => handleChange(e.target.value)}
              placeholder="Search city or zip code..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-bg-secondary border border-border text-sm text-navy placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>
          {open && results.length > 0 && (
            <div className="absolute top-full mt-2 w-full bg-white rounded-xl border border-border shadow-lg overflow-hidden z-50">
              {results.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => select(r)}
                  className="w-full text-left px-4 py-3 hover:bg-primary-light transition-colors text-sm"
                >
                  <span className="font-medium text-navy">{r.name}</span>
                  <span className="text-text-secondary ml-1">
                    {r.region ? `${r.region}, ` : ""}{r.country}
                  </span>
                </button>
              ))}
            </div>
          )}
        </form>

        <button
          onClick={locate}
          disabled={geoLoading || loading}
          className="shrink-0 p-2 rounded-full hover:bg-bg-secondary transition-colors text-text-secondary hover:text-primary disabled:opacity-50"
          title="Use my location"
        >
          {geoLoading ? (
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
}
