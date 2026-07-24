# Climato — Design System

> Minimalist Eco-Tech & Corporate Climate Data Intelligence

---

## 1. Brand Overview & Asset Integration

### 1.1 Brand Identity

Climato is a premium climate data intelligence platform delivering real-time weather analytics, air quality monitoring, and solar/UV metrics in a clean, corporate-grade interface. The design language is **minimalist eco-tech**: geometric precision, high-contrast data visualization, and zero visual clutter.

### 1.2 Existing Asset Integration

| Asset | Path | Usage |
|-------|------|-------|
| Logo | `/logo.png` | Header top-left navigation bar, about section, loading splash |
| Favicon | `/favicon.ico` | Browser tab icon, PWA manifest icon |

**Header Navigation:**
- Place `logo.png` at the top-left of the fixed navigation bar.
- Ensure minimum 32px height with aspect ratio preserved.
- On mobile, the logo scales down to 24px height; text label "Climato" hides below 640px viewport.

**Browser Tab:**
- Reference `favicon.ico` in HTML `<link rel="icon" href="/favicon.ico">`.
- Provide 16×16 and 32×32 fallback sizes if needed.

---

## 2. Design Tokens & Typography

### 2.1 Color System

```
--color-primary:        #00AEEF;   /* Vibrant Sky Blue — actions, highlights, links */
--color-primary-hover:  #0098D4;   /* 8% darker for hover states */
--color-primary-light:  #E6F7FD;   /* 10% opacity fill for tags/chips */

--color-navy:           #002B5C;   /* Deep Navy Blue — headers, text, structural elements */
--color-navy-light:     #1A3F6F;   /* Secondary text, subtle borders */

--color-orange:         #F7941D;   /* Warm Energy Orange — alerts, badges, warnings */
--color-orange-light:   #FFF3E0;   /* 10% opacity fill for alert backgrounds */

--color-bg-primary:     #FFFFFF;   /* Pure White — main canvas */
--color-bg-secondary:   #F4F8FA;   /* Soft Ice Blue — alternate sections, cards */

--color-text-primary:   #002B5C;   /* Headings, body */
--color-text-secondary: #5A6B7D;   /* Muted body, captions */
--color-text-inverse:   #FFFFFF;   /* On dark backgrounds */

--color-border:         #E2E8F0;   /* Default borders */
--color-border-light:   #F0F4F8;   /* Subtle separators */

--color-success:        #22C55E;   /* Good AQI, positive trends */
--color-warning:        #F7941D;   /* Moderate AQI, UV alerts */
--color-danger:         #EF4444;   /* Unhealthy AQI, severe weather */
```

### 2.2 Typography

| Token | Font | Size | Weight | Line Height | Use |
|-------|------|------|--------|-------------|-----|
| `display-lg` | Inter | 48px | 700 | 1.1 | Hero temperature display |
| `display-md` | Inter | 36px | 700 | 1.15 | Section hero numbers |
| `heading-lg` | Inter | 24px | 600 | 1.25 | Card titles, section headers |
| `heading-md` | Inter | 18px | 600 | 1.3 | Subsection titles |
| `heading-sm` | Inter | 14px | 600 | 1.4 | Labels, overlines |
| `body-lg` | Inter | 16px | 400 | 1.5 | Primary body text |
| `body-md` | Inter | 14px | 400 | 1.5 | Secondary body, descriptions |
| `body-sm` | Inter | 12px | 400 | 1.5 | Captions, metadata |
| `mono-lg` | JetBrains Mono | 48px | 500 | 1.0 | Current temperature hero |
| `mono-md` | JetBrains Mono | 24px | 500 | 1.1 | Metric values |
| `mono-sm` | JetBrains Mono | 14px | 400 | 1.4 | Small data values |

### 2.3 Spacing Scale

```
--space-xs:   4px;
--space-sm:   8px;
--space-md:   12px;
--space-base: 16px;
--space-lg:   24px;
--space-xl:   32px;
--space-2xl:  48px;
--space-3xl:  64px;
--space-4xl:  96px;
```

### 2.4 Layout Grid

- **Max content width:** 1280px, centered.
- **Columns:** 12-column grid.
- **Gutter:** 24px.
- **Margin:** 16px (mobile), 32px (tablet), 48px (desktop).
- **Breakpoints:**
  - `sm`: 640px
  - `md`: 768px
  - `lg`: 1024px
  - `xl`: 1280px

### 2.5 Border Radius

```
--radius-sm:   8px;    /* Small elements: tags, chips */
--radius-md:   12px;   /* Cards, panels — PRIMARY CARD RADIUS */
--radius-lg:   16px;   /* Modals, large panels */
--radius-full: 9999px; /* Badges, pills */
```

---

## 3. Component Specifications

### 3.1 Navigation Bar

- **Position:** Fixed top, full width.
- **Height:** 64px (desktop), 56px (mobile).
- **Background:** `#FFFFFF` with `border-bottom: 1px solid var(--color-border)`.
- **Z-index:** 100.
- **Layout:** Logo (left) → Search/location input (center) → Settings icon (right).
- **Logo:** `/logo.png`, 32px height, `object-fit: contain`.

### 3.2 Weather Cards

- **Default state:** `background: #FFFFFF`, `border-radius: 12px`, `border: 1px solid var(--color-border)`, `box-shadow: 0 1px 3px rgba(0,43,92,0.04)`.
- **Hover state:** `box-shadow: 0 4px 12px rgba(0,43,92,0.08)`, `transform: translateY(-1px)`.
- **Padding:** 24px.
- **Title:** `heading-sm`, uppercase, `--color-text-secondary`, `letter-spacing: 0.05em`.

### 3.3 Buttons

| Variant | Background | Text | Border |
|---------|-----------|------|--------|
| Primary | `#00AEEF` | `#FFFFFF` | none |
| Primary Hover | `#0098D4` | `#FFFFFF` | none |
| Secondary | `transparent` | `#002B5C` | `1px solid #002B5C` |
| Ghost | `transparent` | `#00AEEF` | none |

- **Radius:** `--radius-full` (pill).
- **Height:** 40px.
- **Padding:** 0 20px.
- **Font:** `body-md`, weight 500.

### 3.4 Badges & Tags

- **Radius:** `--radius-full`.
- **Padding:** 4px 12px.
- **Font:** `body-sm`, weight 500.
- **Alert badge:** `background: var(--color-orange-light)`, `color: var(--color-orange)`.

### 3.5 Data Table (Forecast)

- **Header row:** `background: var(--color-bg-secondary)`, `font: heading-sm`.
- **Body rows:** `border-bottom: 1px solid var(--color-border-light)`.
- **Hover row:** `background: var(--color-primary-light)`.
- **Alignment:** Left-aligned text, right-aligned numeric data.

---

## 4. Dashboard Architecture — WeatherAPI.com Mapping

### 4.1 Layout Structure

```
┌─────────────────────────────────────────────────────────┐
│  HEADER — Logo + Search + Settings                      │
├─────────────────────────────────────────────────────────┤
│  HERO SECTION — Current Weather (full-width)            │
├─────────────────────────────────────────────────────────┤
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │
│  │ AQI Card │ │ UV Index │ │  Wind    │ │ Humidity │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │
├─────────────────────────────────────────────────────────┤
│  14-Day Forecast — Horizontal scrollable cards          │
├─────────────────────────────────────────────────────────┤
│  Hourly Chart — Line graph (24h)                        │
├─────────────────────────────────────────────────────────┤
│  Footer                                                 │
└─────────────────────────────────────────────────────────┘
```

### 4.2 API Endpoint Mapping

| Dashboard Section | WeatherAPI.com Endpoint | Display Data |
|-------------------|------------------------|--------------|
| **Hero — Current Weather** | `/forecast.json` | `current.condition.text`, `current.temp_c`, `current.feelslike_c`, `current.condition.icon`, `location.name`, `location.localtime` |
| **Current Details** | `/forecast.json` | `current.wind_kph`, `current.humidity`, `current.pressure_mb`, `current.vis_km`, `current.uv` |
| **Air Quality Index** | `/forecast.json` → `current.air_quality` | `co`, `no2`, `o3`, `pm2_5`, `pm10`, `so2`, `us-epa-index`, `gb-defra-index` |
| **UV / Solar Metrics** | `/forecast.json` → `current.uv` | UV index value, level classification (Low/Moderate/High/Very High/Extreme) |
| **14-Day Forecast** | `/forecast.json` → `forecast.forecastday[]` | `date`, `day.maxtemp_c`, `day.mintemp_c`, `day.condition.text`, `day.condition.icon`, `day.daily_chance_of_rain`, `day.uv`, `day.air_quality` |
| **Hourly Detail** | `/forecast.json` → `forecast.forecastday[].hour[]` | `time`, `temp_c`, `condition`, `chance_of_rain`, `wind_kph` |

### 4.3 Current Weather Hero Card

- **Layout:** Split into left (text) and right (icon + temperature).
- **Location name:** `heading-lg`, `--color-navy`.
- **Date/time:** `body-md`, `--color-text-secondary`.
- **Temperature:** `display-lg`, `mono-lg`, `--color-navy`.
- **Feels like:** `body-md`, `--color-text-secondary`.
- **Condition text + icon:** Icon 64×64, text `heading-md`.
- **Background:** `--color-bg-secondary` (soft ice blue).

### 4.4 Air Quality Index Card

- **EPA Index mapping:**
  - 1 (Good): `--color-success`
  - 2 (Moderate): `--color-orange`
  - 3 (Unhealthy for Sensitive): `--color-orange`
  - 4 (Unhealthy): `--color-danger`
  - 5 (Very Unhealthy): `--color-danger`
  - 6 (Hazardous): `--color-danger`
- **Display:** Large numeric index + label badge + PM2.5 value as primary metric.
- **Visual:** Horizontal progress bar with gradient stops from green → orange → red.

### 4.5 UV Index Card

- **UV Level classification:**
  - 1–2: Low → `--color-success`
  - 3–5: Moderate → `--color-orange`
  - 6–7: High → `--color-orange` + warning icon
  - 8–10: Very High → `--color-danger` + alert badge
  - 11+: Extreme → `--color-danger` + pulsing alert
- **Display:** Large numeric UV value + level badge + sun protection recommendation.

### 4.6 14-Day Forecast Strip

- **Layout:** Horizontal scroll on desktop, vertical stack on mobile.
- **Card size:** 120px × 180px.
- **Per card:** Day name (Mon, Tue...), weather icon (40×40), high temp (bold), low temp (muted), rain chance badge.
- **Active/today card:** `border: 2px solid var(--color-primary)`, `background: var(--color-primary-light)`.

### 4.7 Hourly Line Chart

- **Library:** Use a lightweight charting library (Chart.js or Recharts).
- **Line color:** `var(--color-primary)` (#00AEEF).
- **Grid lines:** `var(--color-border-light)`.
- **X-axis:** Time labels (6AM, 9AM, 12PM...).
- **Y-axis:** Temperature (°C).
- **Tooltip:** Custom styled card with `--color-navy` background, `--color-text-inverse` text.

---

## 5. Micro-Interactions & Animation

### 5.1 Transition Rules

- **Duration:** 150ms for micro-interactions, 300ms for page transitions.
- **Easing:** `cubic-bezier(0.4, 0, 0.2, 1)` (ease-out).
- **Apply to:** `opacity`, `transform`, `box-shadow`, `background-color`, `border-color`.

### 5.2 Specific Interactions

| Element | Trigger | Animation |
|---------|---------|-----------|
| Card | Hover | `transform: translateY(-2px)`, `box-shadow` elevation increase, 150ms |
| Button | Hover | Background darken 8%, 150ms |
| Button | Click | `transform: scale(0.97)`, 100ms |
| Badge | Appear | Fade in + `translateY(4px → 0)`, 200ms |
| Weather icon | On load | Subtle pulse animation (scale 1 → 1.05 → 1), 2s loop |
| Temperature | Value change | Count-up number animation, 600ms |
| Navigation | Scroll down | Header shadow appears, 200ms |
| AQI bar | On load | Width animates from 0% to value, 800ms ease-out |
| UV indicator | Extreme value | Pulsing orange/red glow, 1.5s loop |

### 5.3 Loading States

- **Skeleton screens** with `--color-bg-secondary` shimmer animation.
- **Pulse keyframe:** opacity 0.4 ↔ 1.0, 1.5s infinite.
- **Layout preserved** during loading to prevent layout shift (CLS = 0).

### 5.4 Error States

- **Inline error:** Red border-left on input fields, `--color-danger` text below.
- **Full-page error:** Centered message with retry button (Primary variant).
- **API failure:** Show last cached data with stale indicator badge (`--color-orange`).

---

## 6. Mobile Responsiveness Rules

### 6.1 Breakpoint Behavior

| Breakpoint | Layout Changes |
|------------|---------------|
| < 640px (mobile) | Single column, stacked cards, logo only (no text), hamburger menu |
| 640–768px (tablet) | 2-column grid for metric cards, forecast horizontal scroll |
| 768–1024px (small desktop) | 3-column grid, full navigation |
| > 1024px (desktop) | Full 12-column layout, all sections visible |

### 6.2 Mobile-Specific Rules

- **Touch targets:** Minimum 44×44px for all interactive elements.
- **Safe areas:** Respect `env(safe-area-inset-top/bottom)` for notched devices.
- **Forecast strip:** Horizontal scroll with `-webkit-overflow-scrolling: touch`, snap points.
- **Hero temperature:** Reduce from `display-lg` (48px) to `display-md` (36px) below 640px.
- **Card padding:** Reduce from 24px to 16px below 768px.
- **Navigation:** Collapse to hamburger icon below 640px, slide-in drawer from left.
- **Fonts:** `mono-lg` reduces from 48px to 32px on mobile.
- **Charts:** Touch-friendly tooltips, larger tap targets on data points.
- **Pull-to-refresh:** Implement native-feeling pull-down refresh gesture on mobile.

### 6.3 PWA Considerations

- **Manifest:** Include `manifest.json` with app name "Climato", theme color `#00AEEF`, background `#FFFFFF`.
- **Splash screen:** Logo centered on white background, sky blue loading spinner.
- **Offline:** Show last fetched data with stale indicator, retry button when online.

---

## 7. Accessibility

- **Color contrast:** WCAG AA minimum — navy on white = 12.6:1 ✓, sky blue on white = 4.5:1 ✓.
- **Focus states:** 2px outline in `--color-primary` with 2px offset, visible on all interactive elements.
- **Screen reader:** All weather data in semantic HTML, `aria-label` for icon-only elements.
- **Reduced motion:** Respect `prefers-reduced-motion: reduce` — disable all animations.
- **Alt text:** Every weather condition icon gets descriptive alt text (e.g., "Partly cloudy, 24°C").
