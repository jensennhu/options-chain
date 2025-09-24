# Options Trader App Design Guidelines

## Design Approach: Reference-Based (Financial Trading Platforms)
**Primary References:** TradingView, Interactive Brokers, Robinhood
**Justification:** Financial trading applications require trust, professionalism, and data-dense interfaces that prioritize information accessibility over visual flourish.

## Core Design Elements

### Color Palette
**Dark Mode Primary (Default):**
- Background: 210 15% 8% (Deep navy-black)
- Surface: 210 12% 12% (Dark slate)
- Primary: 142 76% 36% (Professional green for gains)
- Danger: 0 84% 60% (Red for losses)
- Text Primary: 0 0% 95% (Near white)
- Text Secondary: 210 5% 70% (Muted gray)

**Light Mode:**
- Background: 0 0% 98% (Off-white)
- Surface: 0 0% 100% (Pure white)
- Primary: 142 69% 30% (Darker green)
- Text Primary: 210 15% 15% (Dark slate)

### Typography
**Font Stack:** Inter (Google Fonts)
- Headers: Inter 600 (Semibold)
- Body: Inter 400 (Regular)
- Data/Numbers: Inter 500 (Medium) with tabular-nums

### Layout System
**Spacing Units:** Tailwind 2, 4, 6, 8, 12 units
- Component padding: p-4, p-6
- Section margins: m-8, m-12
- Micro-spacing: p-2, m-2

### Component Library

**Navigation:**
- Top navigation bar with logo, search, and account menu
- Sidebar for watchlists and quick filters
- Breadcrumb navigation for deep screens

**Data Display:**
- Sortable tables with sticky headers
- Real-time price tickers with color-coded changes
- Options chain grid with strike prices and expiration dates
- Metric cards for key options Greeks

**Forms & Controls:**
- Symbol search with autocomplete
- Date range pickers for expiration filtering
- Slider controls for volatility and price ranges
- Toggle switches for screening criteria

**Overlays:**
- Modal dialogs for detailed option analysis
- Tooltips for explaining complex metrics
- Loading states with skeleton screens

### Key Interface Sections

1. **Header Bar:** Symbol search, watchlist access, account menu
2. **Screening Panel:** Filters for strike price, expiration, volume
3. **Options Chain Table:** Strike prices, bid/ask spreads, Greeks, discount indicators
4. **Analysis Dashboard:** Charts, calculated fair values, profit/loss projections
5. **Watchlist Sidebar:** Saved symbols and quick access

### Visual Hierarchy
- Use green/red sparingly for gain/loss indication only
- Emphasize important metrics with subtle background highlights
- Group related data with card containers and subtle borders
- Use consistent icon sizing (16px for inline, 20px for standalone)

### Data-Focused Principles
- Prioritize information density over visual appeal
- Use monospace fonts for numerical data alignment
- Implement clear visual separation between data categories
- Maintain consistent decimal precision across all price displays

This design emphasizes trust, clarity, and efficient data consumption essential for financial applications while maintaining modern web standards.