import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.WEATHER_API_KEY;
const BASE = "https://api.weatherapi.com/v1/forecast.json";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q");
  if (!q) {
    return NextResponse.json({ error: "q is required" }, { status: 400 });
  }

  const url = `${BASE}?key=${API_KEY}&q=${encodeURIComponent(q)}&days=3&aqi=yes&alerts=yes`;

  const res = await fetch(url, { next: { revalidate: 300 } });
  if (!res.ok) {
    const err = await res.text();
    return NextResponse.json({ error: err }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
}
