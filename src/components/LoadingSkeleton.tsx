"use client";

export default function LoadingSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Hero skeleton */}
      <div className="skeleton h-48 sm:h-56 w-full rounded-xl" />

      {/* Detail cards skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="skeleton h-28 rounded-xl" />
        ))}
      </div>

      {/* Forecast skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="skeleton h-44 rounded-xl" />
        ))}
      </div>

      {/* Chart skeleton */}
      <div className="skeleton h-56 w-full rounded-xl" />

      {/* Bottom row skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="skeleton h-40 rounded-xl" />
        <div className="skeleton h-40 rounded-xl" />
      </div>
    </div>
  );
}
