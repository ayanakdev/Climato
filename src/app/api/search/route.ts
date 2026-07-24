import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.WEATHER_API_KEY;
const BASE = "https://api.weatherapi.com/v1/search.json";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q");
  if (!q || q.length < 2) {
    return NextResponse.json([], { status: 200 });
  }

  const url = `${BASE}?key=${API_KEY}&q=${encodeURIComponent(q)}`;

  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) {
    return NextResponse.json([], { status: 200 });
  }

  const data = await res.json();
  return NextResponse.json(data);
}
