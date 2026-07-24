"use client";

export default function WeatherMap({ lat, lon }: { lat: number; lon: number }) {
  const embedUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${lat},${lon}&zoom=8`;

  return (
    <div className="card p-5 sm:p-6">
      <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-4">
        Weather Map
      </h2>

      <div className="relative rounded-xl overflow-hidden bg-bg-secondary" style={{ height: 300 }}>
        <iframe
          src={embedUrl}
          className="w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Weather Map"
        />
      </div>
    </div>
  );
}
