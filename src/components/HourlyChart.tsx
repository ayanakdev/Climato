"use client";

import { useRef, useEffect } from "react";
import type { HourForecast } from "@/lib/types";

export default function HourlyChart({ hours }: { hours: HourForecast[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const pad = { top: 24, right: 16, bottom: 32, left: 40 };
    const chartW = w - pad.left - pad.right;
    const chartH = h - pad.top - pad.bottom;

    const temps = hours.map((hr) => hr.temp_c);
    const minT = Math.min(...temps) - 2;
    const maxT = Math.max(...temps) + 2;
    const range = maxT - minT || 1;

    ctx.clearRect(0, 0, w, h);

    // Grid lines
    ctx.strokeStyle = "#E2E8F0";
    ctx.lineWidth = 0.5;
    const gridLines = 5;
    for (let i = 0; i <= gridLines; i++) {
      const y = pad.top + (chartH / gridLines) * i;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(w - pad.right, y);
      ctx.stroke();

      const val = maxT - (range / gridLines) * i;
      ctx.fillStyle = "#5A6B7D";
      ctx.font = "11px sans-serif";
      ctx.textAlign = "right";
      ctx.fillText(`${Math.round(val)}°`, pad.left - 6, y + 4);
    }

    // X labels
    ctx.fillStyle = "#5A6B7D";
    ctx.font = "11px sans-serif";
    ctx.textAlign = "center";
    const step = Math.max(1, Math.floor(hours.length / 8));
    hours.forEach((hr, i) => {
      if (i % step === 0) {
        const x = pad.left + (chartW / (hours.length - 1)) * i;
        const label = new Date(hr.time).toLocaleTimeString("en-US", {
          hour: "numeric",
          hour12: true,
        });
        ctx.fillText(label, x, h - 8);
      }
    });

    // Area fill
    ctx.beginPath();
    hours.forEach((hr, i) => {
      const x = pad.left + (chartW / (hours.length - 1)) * i;
      const y = pad.top + chartH - ((hr.temp_c - minT) / range) * chartH;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.lineTo(pad.left + chartW, pad.top + chartH);
    ctx.lineTo(pad.left, pad.top + chartH);
    ctx.closePath();
    const gradient = ctx.createLinearGradient(0, pad.top, 0, pad.top + chartH);
    gradient.addColorStop(0, "rgba(0, 174, 239, 0.15)");
    gradient.addColorStop(1, "rgba(0, 174, 239, 0.01)");
    ctx.fillStyle = gradient;
    ctx.fill();

    // Line
    ctx.beginPath();
    ctx.strokeStyle = "#00AEEF";
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    hours.forEach((hr, i) => {
      const x = pad.left + (chartW / (hours.length - 1)) * i;
      const y = pad.top + chartH - ((hr.temp_c - minT) / range) * chartH;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Dots
    hours.forEach((hr, i) => {
      if (i % step === 0) {
        const x = pad.left + (chartW / (hours.length - 1)) * i;
        const y = pad.top + chartH - ((hr.temp_c - minT) / range) * chartH;
        ctx.beginPath();
        ctx.arc(x, y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = "#00AEEF";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();
      }
    });
  }, [hours]);

  return (
    <div>
      <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">
        Hourly Temperature
      </h2>
      <div className="card p-4 sm:p-6">
        <canvas
          ref={canvasRef}
          className="w-full"
          style={{ height: 220 }}
        />
      </div>
    </div>
  );
}
