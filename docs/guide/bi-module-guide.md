# BI Module — Dashboards & Analytics

Nama ERP's BI module lets you build interactive dashboards that turn your live ERP data into charts, gauges, tables, and more. Charts talk to each other through cross-filters, drill-down popups, and direct links — so your dashboards aren't just static pictures, they're exploration tools your team can click through to find answers.

This guide walks you through everything the BI module can do, from the chart designer to advanced interactions like drill-down and cross-filtering. If you're looking for the JSON structures, SQL patterns, and import formats needed to build dashboards programmatically, see the [Technical Reference](./bi-module-technical-reference.md).

---

## What You Get

A typical BI setup in Nama ERP looks like this:

- **Dashboards** — grid layouts that hold multiple widgets side-by-side
- **Widgets** — individual charts, tables, or cards that each pull data from a SQL query
- **Cross-Filters** — shared filter parameters (branch, date range, customer, etc.) that slice data across all widgets at once
- **Drill-Down** — click a data point to open a related chart or dashboard, pre-filtered to that point's context
- **Links** — click a data point to jump straight to the underlying record (e.g., open the customer's edit screen)

---

## Chart Types

The module ships with **41 ready-to-use chart templates** organized into 11 categories. You don't need to configure ECharts JSON from scratch — pick a template, point it at your data, and customize the look.

### Bar Charts (10 templates)
Single bar, grouped bars (side-by-side comparison), stacked, 100% stacked, horizontal, horizontal stacked, positive/negative bars, waterfall, prior-period comparison, and ranked horizontal bars with descending sort.

### Line Charts (6 templates)
Single line, multi-series, step line (values stay constant between points), dual Y-axis (for comparing different scales — e.g., revenue vs. quantity), line with a dashed target reference line, and line with a data-zoom slider for large date ranges.

### Area Charts (4 templates)
Basic area, stacked area, gradient-fill area, and range/band area.

### Pie & Donut Charts (6 templates)
Standard pie, donut, donut with center label, rose/sunburst pie (wedge size by area, not angle), half-circle pie, and nested multi-level pie.

### Gauge Charts (3 templates)
Standard speedometer gauge, ring gauge, and multi-ring gauge (multiple concentric indicators).

### Combination Charts (2 templates)
Mixed bar + line, and mixed bar + area — useful when you want to show totals as bars and a trend line on the same chart.

### Scatter & Bubble (2 templates)
XY scatter plot and bubble chart (bubble size encodes a third dimension).

### Radar Charts (2 templates)
Polygon radar and filled radar — great for comparing multiple metrics across categories (e.g., KPI scorecards).

### Funnel Charts (2 templates)
Standard funnel (conversion stages) and comparison funnel.

### Treemap (1 template)
Hierarchical rectangle chart for part-to-whole relationships.

### Heatmap (1 template)
Matrix visualization with color intensity — useful for time-of-day patterns, region × product analysis, and similar two-dimensional breakdowns.

---

## The Chart Designer

The chart designer is the dialog you open when you create or edit a widget's chart configuration. It has two states:

### State A — Template Gallery

When you start with a blank widget, the designer opens in gallery mode. You see a searchable grid of all 41 templates, each rendered as a live mini-chart so you can see exactly what you're picking. You can:

- **Search** by name (e.g., type "stacked" to filter to stacked variants)
- **Filter by category** using the chips at the top (Bar, Line, Pie, etc.)
- **Click a template** to select it and move to the editor
- **Start Blank** if you want to build a chart from an empty canvas

### State B — Chart Editor

Once you've picked a template (or opened an existing widget), you land in the editor. This is where you connect your data, style the chart, and configure interactions. The editor is split into a **form area** on the left and a **live preview** on the right — every change you make updates the preview in real time.

At the top of the editor, a **chart type bar** shows 11 icon buttons (one per chart category). Clicking one switches the chart type while keeping your data mapping intact where possible.

The form area has several tabs:

#### Data Mapping Tab

This is where you tell the chart which SQL columns to use. The available fields depend on the data mapping type (which is set automatically by your template choice, but can be changed):

- **Category column** — the dimension that goes on the X-axis (e.g., branch name, month)
- **Series** — one or more value columns, each with a name, chart type (bar/line/scatter), number format, and optional Y-axis assignment
- **Label column** — for pivot-style charts where distinct values in one column become separate series automatically
- **Stack / Percent mode** — turn grouped bars into stacked bars, or normalize to 100%
- **Sort order** — ascending or descending by value

#### Style Tab

Visual customization without touching JSON:

- **Title & subtitle** — show/hide, text, position
- **Color palette** — six built-in palettes (default, warm, cool, pastel, monochrome, Nama brand), plus a custom color picker for individual series
- **Decal patterns** — hatching/patterns for accessibility and black-and-white printing
- **Legend** — show/hide, position (top/bottom/left/right), orientation
- **Tooltip** — show/hide, trigger mode (axis shows all series at once, item shows one data point)
- **Axes** — label rotation, inverse direction, min/max bounds, grid lines
- **Data labels** — show/hide, position (top/bottom/inside/center)
- **Data zoom** — slider or mouse-wheel zoom for scrollable charts
- **Type-specific controls:**
  - Bars: corner radius, bar width
  - Lines/Areas: smooth curves, show data points, line width, step mode, area fill
  - Pies: inner radius (donut hole), outer radius, rose mode, start angle
  - Gauges: min/max value, pointer toggle, axis line width
  - Scatter: symbol size
  - Heatmaps: show/hide cell labels
  - Radar: polygon or circle shape

#### Advanced JSON Editor

For anything the UI controls don't cover, you can switch to a Monaco code editor and edit the raw ECharts option JSON directly. Changes in the JSON editor sync back to the UI controls, so you can mix visual editing with hand-written JSON.

::: tip
You don't need to learn the full ECharts API to use the designer. The templates and UI controls cover the most common scenarios. But if you want fine-grained control — custom gradients, rich-text labels, complex tooltip formatters — the JSON editor is there. See the [Apache ECharts documentation](https://echarts.apache.org/en/option.html) for the full option reference.
:::

#### Click & Links Tab

Configure what happens when users interact with the chart — covered in detail in the [Cross-Filtering](#Cross-Filtering) and [Links](#Links----Navigate-to-Records) sections below.

#### Drill-Down Tab

Configure drill-down targets — covered in the [Drill-Down](#Drill-Down) section below.

---

## Dashboards & Layout

A dashboard is a grid that holds multiple widgets. You configure the grid size (e.g., 3 columns × 4 rows), then place each widget by specifying its row, column, width (in columns), and height (in rows).

### Editing the Layout

In edit mode, you can:

- **Drag widgets** to reposition them on the grid
- **Resize widgets** using handles on all edges and corners
- **Save or cancel** your layout changes

### Auto-Refresh

Dashboards can refresh automatically. There are two levels:

- **Dashboard-level refresh** — a single timer that re-fetches all widgets at a set interval
- **Widget-level refresh** — individual widgets can have their own refresh interval, useful when some charts need near-real-time data and others don't

### Widget Types on a Dashboard

While ECharts are the star of the show, dashboards support several other widget types:

| Widget Type | What It Does                                                            |
|---|-------------------------------------------------------------------------|
| **EChart** | Any of the 41 chart templates                                           |
| **Table** | A data table — the SQL column names become column headers automatically |
| **Metrics Cards** | KPI summary cards (value + label + trend)                               |
| **Timeline** | Chronological event stream                                              |
| **Calendar** | Event calendar                                                          |
| **Report** | Embedded JasperReport                                                   |
| **HTML** | Custom HTML content                                                     |
| **Recent Visits** | Shows recently viewed records                                           |
| **Card Menu** | Navigation cards                                                        |
| **Resource View** | Resource scheduler                                                      |

---

## Cross-Filtering

Cross-filtering is how charts talk to each other. When you click a bar for "Riyadh Branch" on one chart, every other chart on the dashboard re-fetches its data filtered to Riyadh Branch. Click it again and the filter clears.

### How It Works

There are three pieces to a cross-filter setup:

1. **BICrossFilter entity** — a reusable filter definition stored in the system. It specifies the parameter type (reference, date, text, etc.), which SQL column to filter on, and which comparison operator to use. You create these once and reuse them across many widgets.

2. **Cross-filter bindings on widgets** — each widget declares which cross-filters it *responds to*. When a filter is active, the widget's SQL query gets an extra WHERE clause injected automatically.

3. **Click emit mapping on widgets** — each widget can declare which cross-filters it *emits* when a user clicks on it. This is what makes a pie chart click set a filter that other charts react to.

### The Filter Bar

At the top of every dashboard that uses cross-filters, you'll see a **filter bar**. It shows:

- A **Filters button** with a count of active filters (e.g., "Filters: 3")
- **Filter chips** — one per active filter, showing the field label and selected value, with an X button to remove it
- Clicking the Filters button opens a **filter editor dialog** where you can set or change multiple filter values at once

### Filter Types

Cross-filters support all the data types you'd expect:

| Type | Example | UI Control |
|---|---|---|
| Reference | Branch, Customer, Item | Entity lookup field |
| Date | From date, To date | Date picker |
| Text | Search keyword | Text input |
| Integer / Decimal | Minimum amount | Number input |
| Enum | Invoice status | Dropdown |
| Boolean | Active only | Checkbox |
| List | Multiple branches | Multi-select |

### Operators

Each cross-filter can use a different comparison operator:

| Operator | SQL | Typical Use |
|---|---|---|
| Equal | `=` | Exact match (most common) |
| In | `IN (...)` | Multi-value selection |
| GreaterThanOrEqual | `>=` | "From" date, minimum value |
| LessThanOrEqual | `<=` | "To" date, maximum value |
| GreaterThan / LessThan | `>` / `<` | Strict comparison |
| NotEqual | `<>` | Exclusion |
| Contains | `LIKE '%...%'` | Text search |
| StartsWith | `LIKE '...%'` | Prefix match |

### Visual Feedback

When cross-filters are active, widgets show badges indicating:

- **"Filtered by: Branch, Date"** — this widget's data is filtered by these cross-filters
- **"Emitting: Branch"** — this widget is the source of the active Branch filter

Hover over a badge to see the actual filter values.

---

## Drill-Down

Drill-down lets users navigate from summary data to detail data. Right-click a data point and a context menu shows you where you can drill into. There are three flavors:

### Widget Drill-Down (Chart → Chart)

Right-click a data point → select a target → a popup opens showing the target widget's chart, pre-filtered to the clicked value. For example, right-click "Electronics" on a sales-by-category pie → drill into "Top 10 Items in Electronics" bar chart.

You can configure multiple drill-down targets per widget, and they appear as separate items in the right-click menu.

### Dashboard Drill-Down (Chart → Dashboard)

Same idea, but the target is an entire dashboard instead of a single widget. The drill-down filters are passed to all widgets on the target dashboard. Great for hierarchical analysis — e.g., company overview → regional dashboard → branch dashboard.

### Dimension Drill-By (Same Chart, Deeper Dimension)

If a widget uses a wizard data source with multiple dimension fields, you can drill down *by dimension*. Click "Riyadh" → drill by Month → see the same metric broken down by month for Riyadh only. A breadcrumb trail tracks your path (Region → Branch → Month), and you can click any breadcrumb to go back.

### Single-Click Drill-Down

By default, drill-down requires a right-click. But you can configure a widget so that a left-click immediately triggers a specific drill-down target — no menu needed. This is configured via the `clickAction` setting in the Click & Links tab.

### The Drill-Down Dialog

When a drill-down opens in popup mode (the default), it shows:

- A **breadcrumb trail** at the top showing the path you've taken (clickable to go back)
- The **target chart** rendered with the drill-down filters applied
- A **maximize button** for full-screen viewing
- Support for **nested drill-downs** — you can drill from the popup into another popup

---

## Links — Navigate to Records

Sometimes you want to click a chart data point and jump to the actual ERP record behind it. That's what link mappings are for.

### Entity Links

Point a link at an entity type + ID column, and clicking opens that record's edit screen. For example, clicking a bar for "ABC Trading" can open the Customer record for ABC Trading — in a popup dialog, the same tab, or a new tab.

A nice touch: you can configure a `labelColumn` so the context menu says "Open Customer 'ABC Trading'" instead of just "Open Customer".

### URL Links

If your SQL query returns a URL column, you can link to it directly. Absolute URLs (http/https) open in a new tab; relative URLs navigate within the app.

### Where Links Appear

Links show up in the right-click context menu under a "Navigate To" section. Like drill-down, you can also configure a link as the default left-click action.

---

## The Right-Click Context Menu

When you right-click a data point on a chart that has interactions configured, you see a structured menu:

```
"Series Name / Category Value"
─────────────────────────
Navigate To:
  ├─ Open Customer "ABC Trading"
  ├─ Open Website
─────────────────────────
Open In:
  ├─ Sales Details
  ├─ Regional Dashboard
─────────────────────────
Drill Down By:
  ├─ By Month
  ├─ By Branch
```

Each section only appears if the corresponding mapping is defined. A chart with no links, no drill-down targets, and no wizard dimensions shows no context menu at all.

---

## Chart Interactions Summary

| Action | What Happens |
|---|---|
| **Left-click** data point | Emits cross-filter (default), or navigates/drills if `clickAction` is configured |
| **Left-click** same point again | Clears the cross-filter (toggle behavior) |
| **Right-click** data point | Opens context menu with drill-down targets, links, and drill-by options |
| **Hover** data point | Shows tooltip (axis mode shows all series, item mode shows single point) |
| **Scroll wheel** | Zooms in/out if data zoom is enabled |
| **Drag zoom slider** | Adjusts visible data range |
| **Toolbar: Save as Image** | Downloads the chart as a PNG file |
| **Toolbar: Export Config** | Copies the chart configuration JSON to clipboard |

---

## Table Widgets

Not everything needs to be a chart. Table widgets display query results in an grid with sortable, resizable columns. The SQL column names become the grid headers — no extra configuration needed beyond the query and cross-filter bindings.

Table widgets respect cross-filters just like chart widgets do, so when you click a branch on a bar chart, the table next to it filters to show only that branch's records.

---

## Data Sources

Each widget gets its data from either a raw SQL query or a wizard data source.

### Raw SQL

You write a standard T-SQL SELECT query. The only requirement is including the `/*AND-FILTERS*/` placeholder in the WHERE clause — this is where the system injects cross-filter conditions at runtime. Because it's a SQL comment, your query remains valid if you paste it into SQL Server Management Studio for testing.

### Wizard Data Source

Instead of writing SQL, you define a data source using Nama ERP field IDs (property paths like `customer.customerCategory` or `price.netValue`). The system generates the SQL automatically. Wizard data sources are required if you want dimension drill-by — the system needs to know the field structure to build drill queries dynamically.

Wizard fields are marked as either **Dimension** (group-by / category) or **Measure** (aggregated value with Sum, Count, Average, Min, or Max).

---

## Number Formatting

You can specify how numeric values are displayed in tooltips, axis labels, and data labels. Format options include:

| Format Type | Example Output |
|---|---|
| `number` | 1,234,567.89 |
| `currency` | SAR 1,234,568 |
| `percent` | 85.5% |
| `compact` | 1.2M, 45K |

You can also control decimal places and specify a currency symbol. If you set the type to `currency` without specifying which currency, the system uses your organization's default.

---

## Period Comparison

Sometimes you need to answer "how does this quarter compare to the same quarter last year?" without building a completely different dashboard. The period comparison feature handles this — the system runs your existing widget query twice (once for the current dates, once for the shifted dates) and merges the results, so every chart that opts in automatically shows both periods side by side.

### Setting It Up

Three pieces are needed:

1. **Create a `BI Period Comparison Config`** — a master file that defines:
   - How far to shift the dates (e.g., 1 Year, 3 Months) using the `Subtracted Period` field
   - Column names for the injected period columns (e.g., `periodAr` / `periodEn`)
   - Display labels for each period (e.g., "Current Year" / "Previous Year" in both Arabic and English)

2. **Link it to your date cross-filters** — on each date cross-filter (e.g., Date From, Date To), set the `Period Comparison Config` field to the config you created. Both date filters should point to the same config so both ends of the range shift together.

3. **Enable comparison on each widget** — on the widget, check the `Enable Comparison` checkbox. Only widgets with this flag enabled will run the double-query comparison. Other widgets on the same dashboard continue to work normally with a single query.

### Two Modes of Comparison

#### Mode A — Period Label Column (for trend charts)

Best for line charts, area charts, and any chart that uses `CategoryLabelValue` data mapping. The system injects a period column into the result set (using the column names from your config), and the chart's `labelColumn` can reference it to automatically get two series — one per period.

**Example:** A monthly sales trend line chart with `categoryColumn: "monthLabel"` and `labelColumn: "periodEn"`. When the user selects January–March 2026, the chart shows two lines: "Current Year" and "Previous Year", both plotted against months 01, 02, 03.

For this mode, format your month/category to exclude the year (e.g., `FORMAT(l.valueDate, 'MM')` instead of `'yyyy-MM'`) so that the same months align across periods.

#### Mode B — Column Split (for bar charts and explicit series)

Best for bar charts, ranked lists, and any chart that uses `CategoryValue` with explicitly defined series. Instead of adding a period dimension, this mode splits a measure column into two: one for the current period, one for the previous period.

Configure it in the widget's **Comparison Data Mapping** grid:

| Original Column | Previous Period Column |
|---|---|
| `netValue` | `prevNetValue` |

Your chart's `CategoryValue` data mapping then has two series: one for `netValue` ("Current Year") and one for `prevNetValue` ("Previous Year"), producing side-by-side bars.

For EChart widgets, you don't need to set `Merge Comparison Results By Columns` — the ECharts data mapping layer already merges rows that share the same category/label keys and sums their values automatically. However, `Merge Comparison Results By Columns` is important for **non-chart widget types** like Tables, Metrics Cards, and other widgets where there's no data mapping layer to handle the merge. Set it to a CSV of the columns that identify a unique row (e.g., `itemClassName`), and the system will match rows from both periods and combine them into a single row instead of appending duplicates.

### Query Parameters

Regardless of mode, the system injects two parameters into every comparison query: `periodArValue` and `periodEnValue`. Widget authors can use these directly in SQL — for example, in `CONCAT()` or `CASE` expressions — to label or transform data based on which period is currently being queried.

---

## Creating Dashboards with AI

The [BI Module Technical Reference](./bi-module-technical-reference.md) documents every JSON structure, SQL pattern, and import format you need to create dashboards programmatically. It's written specifically for AI tools and developers — which means you can use an AI assistant to design and generate complete dashboard import files for you.

::: tip Using AI to Build Dashboards
Here's a workflow that works well:

1. Give the AI tool the technical reference link: `https://docs.namasoft.com/guide/bi-module-technical-reference.html`
2. Tell it what data model you're working with — you can point it to [dm.namasoft.com](https://dm.namasoft.com) for schema discovery
3. Describe the dashboard you want in plain language, for example:

   > "I need a sales analysis dashboard with a pie chart showing sales by customer category, a horizontal bar chart showing top 10 items, a monthly trend line chart, and a details table. All charts should be cross-filtered by branch, date range, and customer category. The pie chart should emit the customer category filter when clicked, and the bar chart should drill down to invoice details."

4. Ask the AI to generate a complete import JSON file following the technical reference format
5. Import the generated JSON into Nama ERP — you'll have a working dashboard with all the cross-filters, drill-downs, and styling ready to go
6. Given AI can guess table names, column names, or joins incorrectly, it is better to give it a sample query containing the columns and joins you want to use.

This is dramatically faster than building each widget by hand, especially for dashboards with many interconnected charts and complex cross-filter setups.
:::
