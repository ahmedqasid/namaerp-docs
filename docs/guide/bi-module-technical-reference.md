# Nama ERP BI Module — Technical Reference

This document is the authoritative technical reference for the Nama ERP BI (Business Intelligence) module's JSON structures. It is written primarily for AI assistants and developers who need to create SQL queries, chart configurations, cross-filter bindings, drill-down mappings, and bulk import files that work out-of-the-box when pasted into Nama ERP.

The BI module uses [Apache ECharts](https://echarts.apache.org/) for chart rendering. AI tools already understand standard ECharts options — this document focuses exclusively on **Nama ERP's extensions** on top of ECharts: the `chartConfigJSON` structure, `$DATA` placeholder system, `/*AND-FILTERS*/` SQL injection, cross-filter bindings, drill-down mappings, and the bulk import format.

::: tip Schema Discovery
The Nama ERP data model is published at [https://dm.namasoft.com](https://dm.namasoft.com). AI tools and developers can use this site to discover entity schemas — table names, column names, data types, join columns, foreign keys, and property paths. This is essential for writing correct SQL queries in widget data sources and for knowing which `fieldId` paths to use in wizard definitions.
:::

---

## 1. The chartConfigJSON Structure

Every BI widget stores its configuration in a single `chartConfigJSON` field (a JSON string). This is the top-level structure:

```json
{
  "echartOption": { },
  "dataMapping": { },
  "clickEmitMapping": [ ],
  "clickAction": { },
  "drillDownMapping": [ ],
  "linkMappings": [ ],
  "disableRuntimeDimensionSelection": false,
  "disableRuntimeMeasureSelection": false
}
```

| Key | Required | Description |
|---|---|---|
| `echartOption` | Yes | A standard ECharts option object with `$DATA.*` placeholders. The server resolves these placeholders using query results before sending to the frontend. |
| `dataMapping` | Yes | Tells the server how to transform SQL result rows into the `$DATA.*` values that replace the placeholders. |
| `clickEmitMapping` | No | Defines which cross-filters this widget emits when the user clicks a data point. |
| `clickAction` | No | Widget-level left-click override for charts (and fallback for tables): emit cross-filters, navigate via link, or trigger drill-down. Defaults to cross-filter emission if absent. For tables, prefer per-entry `onCellClick` on a `linkMappings` / `drillDownMapping` entry — see Section 5a. |
| `drillDownMapping` | No | Defines which target widgets or dashboards appear in the right-click drill-down menu, and what filter values to pass to them. |
| `linkMappings` | No | Defines link navigation targets that appear in the right-click context menu under "Navigate To". See Section 5b. |
| `disableRuntimeDimensionSelection` | No (wizard-mode only) | When `true`, hides the dimension pickers in the widget's runtime slot selector. Defaults to `false`. See Section 13.9. |
| `disableRuntimeMeasureSelection` | No (wizard-mode only) | When `true`, hides the measure pickers in the widget's runtime slot selector. Defaults to `false`. See Section 13.9. |

### 1.1 Wizard Mode vs SQL Mode

A widget operates in one of two modes depending on whether it has a `wizardDataSource` set:

- **SQL mode** (`widget.dataSource` is set, `widget.wizardDataSource` is null): every column reference in `chartConfigJSON` is a raw result-set column name (e.g., `"categoryColumn": "branchName"`). This is the classic mode and all examples in this document default to it.
- **Wizard mode** (`widget.wizardDataSource` is set): column slots can instead reference **wizard field IDs** — property paths defined on the wizard (e.g., `"categoryWizardFieldId": "customer.customerCategory"`). The backend resolves each field ID to its SQL alias at runtime using metadata cached on the wizard field line, so you don't write column names or repeat the reference sub-columns yourself.

Wizard mode introduces sibling keys next to each existing column key — `*WizardFieldId` alongside `*Column`. Both shapes coexist in the same JSON; the backend uses whichever is set, preferring the resolved column. Tempo columns and period-comparison columns (which have no wizard field) continue to use the `*Column` keys in both modes.

See Section 13 for the full list of wizard-mode key pairs, cross-filter / drill-down interactions, and the dimension drill-by semantics.

---

## 2. Data Source Query (SQL)

Each widget has a `dataSource` field containing a SQL query (T-SQL for SQL Server). The query **must** include the literal placeholder `/*AND-FILTERS*/` in its WHERE clause. The server replaces this with the active cross-filter conditions at runtime. Because the placeholder is a SQL comment, the query is also valid when run directly in SQL Server Management Studio without any modifications.

### Pattern

```sql
SELECT columns
FROM tables
WHERE 1=1 /*AND-FILTERS*/
GROUP BY columns
ORDER BY columns
```

### How `/*AND-FILTERS*/` Works

At runtime, the server builds WHERE clause expressions from the widget's cross-filter bindings and replaces `/*AND-FILTERS*/` with them:

- If no filters are active: `/*AND-FILTERS*/` is removed (empty string), leaving the query unchanged
- If filters are active: `/*AND-FILTERS*/` becomes ` AND expr1 AND expr2 AND expr3`

Because `/*AND-FILTERS*/` is a SQL comment, the query is always syntactically valid — you can paste it directly into SQL Server Management Studio and run it without any edits.

### Query Rules

1. Always include `/*AND-FILTERS*/` — even if the widget has no cross-filter bindings. The server expects it.
2. Use table aliases consistently. The `sqlLeftHandSide` in cross-filter definitions references these aliases (e.g., `l.branch_id`).
3. For EChart widgets, the column names in the SQL must match the column names referenced in `dataMapping` (e.g., `categoryColumn`, `valueColumn`, series `column`).
4. For Table widgets, column names become the AG Grid column headers.
5. `SELECT TOP N` is recommended for widgets that show ranked data.

### Example

```sql
SELECT TOP 10
  i.name2 itemName,
  SUM(l.netValue) netValue
FROM SalesInvoiceLine l
  LEFT JOIN InvItem i ON i.id = l.item_id
  LEFT JOIN Branch b ON b.id = l.branch_id
WHERE 1=1 /*AND-FILTERS*/
GROUP BY i.name2
ORDER BY netValue DESC
```

---

## 3. dataMapping — Types and Resolution

The `dataMapping` object tells the server how to transform query result rows into the data structures that replace `$DATA.*` placeholders in `echartOption`.

::: tip Scalar pass-through
Any key in `dataMapping` that isn't a reserved structural field (like `type`, `*Column`, `series`, `stack`, `format`, etc.) is automatically exposed as `$DATA.<key>`. This lets templates carry constants — e.g., `"target": 150` in dataMapping becomes `$DATA.target` in the echartOption, usable inside a markLine definition. Reserved keys: `type`, `categoryColumn`, `labelColumn`, `valueColumn`, `xColumn`, `yColumn`, `sizeColumn`, `innerLabelColumn`, `outerLabelColumn`, `leftValueColumn`, `rightValueColumn`, `seriesType`, `stack`, `areaStyle`, `percentMode`, `sort`, `series`, `format`.
:::

### 3.1 CategoryValue

The most common type. One column provides category labels (X-axis), and one or more series columns provide numeric values.

**Required fields:**
- `type`: `"CategoryValue"`
- `categoryColumn`: column name for X-axis categories
- `series`: array of series definitions

**Series definition:**
```json
{
  "column": "netValue",
  "name": "Net Value",
  "type": "bar",
  "format": {"type": "currency", "decimals": 0, "compact": true},
  "yAxisIndex": 0
}
```

| Series field | Required | Description |
|---|---|---|
| `column` | Yes | SQL column name to read numeric values from |
| `name` | No | Display name for legend. Defaults to column name. |
| `type` | No | ECharts series type: `"bar"`, `"line"`, `"scatter"`. Defaults to `"bar"`. |
| `format` | No | Number formatting spec (see Section 7). |
| `yAxisIndex` | No | Which Y-axis this series binds to (for dual-axis charts). Default `0`. Propagated onto the built series entry. |
| `stack` | No | Stack group name. Series with the same `stack` value are stacked. Propagated onto the built series entry. |
| `areaStyle` | No | `true` or an object — turns the series into a filled area (line charts). Propagated onto the built series entry. |

**Produces these `$DATA` placeholders:**

| Placeholder | Type | Description |
|---|---|---|
| `$DATA.categories` | `string[]` | Values from `categoryColumn`, one per row |
| `$DATA.series` | `object[]` | Array of `{name, type, data}` objects (plus `stack` / `yAxisIndex` / `areaStyle` if set on the series config) |
| `$DATA.series[0].name` | `string` | Name of first series |
| `$DATA.series[0].data` | `number[]` | Numeric values of first series |
| `$DATA.series[N].name` | `string` | Name of Nth series |
| `$DATA.series[N].data` | `number[]` | Numeric values of Nth series |
| `$DATA.min` | `number` | Minimum value across all series (useful for visualMap / `bar-ranked`-style charts) |
| `$DATA.max` | `number` | Maximum value across all series |

**Example:**

```json
{
  "dataMapping": {
    "type": "CategoryValue",
    "categoryColumn": "branchName",
    "series": [
      {"column": "netValue", "name": "Net Value", "type": "bar"},
      {"column": "totalQty", "name": "Quantity", "type": "line", "yAxisIndex": 1}
    ]
  }
}
```

**echartOption using it:**

```json
{
  "echartOption": {
    "xAxis": {"type": "category", "data": "$DATA.categories"},
    "yAxis": [{"type": "value"}, {"type": "value"}],
    "series": [
      {"name": "$DATA.series[0].name", "type": "bar", "data": "$DATA.series[0].data"},
      {"name": "$DATA.series[1].name", "type": "line", "data": "$DATA.series[1].data", "yAxisIndex": 1}
    ]
  }
}
```

**Shorthand**: If the echartOption uses `"series": "$DATA.series"`, the entire series array (with name, type, and data per series) is injected automatically. This is convenient but gives less control over individual series styling.

### 3.2 CategoryLabelValue

Pivot-table style: one column for categories (X-axis), one column whose distinct values become separate series, and one column for the numeric values. The server automatically pivots the flat result set into grouped series.

**Required fields:**
- `type`: `"CategoryLabelValue"`
- `categoryColumn`: column for X-axis categories
- `labelColumn`: column whose distinct values become series names
- `valueColumn`: column for numeric values
- `seriesType`: default chart type for all series (e.g., `"bar"`, `"line"`)

**Optional fields:**
- `stack`: if set (e.g., `"total"`), all series get this stack group → stacked chart
- `percentMode`: if `true`, values are normalized to percentages within each category → 100% stacked chart
- `areaStyle`: if `true`, series get `areaStyle: {}` → stacked area chart
- `format`: number format applied to all series

**Produces these `$DATA` placeholders:**

| Placeholder | Type | Description |
|---|---|---|
| `$DATA.categories` | `string[]` | Unique values from `categoryColumn` (preserves row order) |
| `$DATA.series` | `object[]` | One series per unique label. Each has `name`, `type`, `data` — plus `stack` / `areaStyle` when the corresponding top-level dataMapping fields are set. Data arrays are aligned to categories (missing values are `0`). When `percentMode` is `true`, values are normalized per category so each category's series sum to 100. |

**Example SQL:**

```sql
SELECT YEAR(l.valueDate) salesYear, b.name2 branchName, SUM(l.netValue) netValue
FROM SalesInvoiceLine l LEFT JOIN Branch b ON b.id = l.branch_id
WHERE 1=1 /*AND-FILTERS*/
GROUP BY YEAR(l.valueDate), b.name2
ORDER BY salesYear
```

**Example config:**

```json
{
  "echartOption": {
    "legend": {},
    "xAxis": {"type": "category", "data": "$DATA.categories"},
    "yAxis": {"type": "value"},
    "series": "$DATA.series"
  },
  "dataMapping": {
    "type": "CategoryLabelValue",
    "categoryColumn": "salesYear",
    "labelColumn": "branchName",
    "valueColumn": "netValue",
    "seriesType": "bar",
    "stack": "total"
  }
}
```

### 3.3 LabelValue

For pie charts, funnels, and similar: one column for labels, one for values. Each row becomes a data point with `{name, value}`.

**Required fields:**
- `type`: `"LabelValue"`
- `labelColumn`: column for item names
- `valueColumn`: column for numeric values

**Optional fields:**
- `centerText`: text to display in the center of a donut chart (used via `$DATA.centerText`)
- `format`: number format spec

**Produces these `$DATA` placeholders:**

| Placeholder | Type | Description |
|---|---|---|
| `$DATA.values` | `{name, value}[]` | Array of objects. `name` from `labelColumn`, `value` (numeric) from `valueColumn`. |
| `$DATA.centerText` | `string` | Only if `centerText` is set in dataMapping. |

**Example:**

```json
{
  "echartOption": {
    "tooltip": {"trigger": "item", "formatter": "{b}: {c} ({d}%)"},
    "series": [{"type": "pie", "radius": "60%", "data": "$DATA.values"}]
  },
  "dataMapping": {
    "type": "LabelValue",
    "labelColumn": "categoryName",
    "valueColumn": "netValue"
  }
}
```

### 3.4 Gauge

For gauge/meter charts. Uses only the first row of the result set.

**Required fields:**
- `type`: `"Gauge"`
- `valueColumn`: column for the gauge value

**Optional fields:**
- `unit`: display unit string (e.g., `"%"`, `"SAR"`)
- `max`: maximum value for the gauge scale
- `min`: minimum value for the gauge scale
- `bands`: color band array (e.g., `[[0.3, "#67e0e3"], [0.7, "#37a2da"], [1, "#fd666d"]]`)

**Produces these `$DATA` placeholders:**

| Placeholder | Type | Description |
|---|---|---|
| `$DATA.value` | `number` | Numeric value from first row |
| `$DATA.unit` | `string` | From `unit` field |
| `$DATA.max` | `number` | From `max` field |
| `$DATA.min` | `number` | From `min` field |
| `$DATA.bands` | `array` | From `bands` field |

### 3.5 Scatter

For scatter/bubble plots. Each row becomes an `[x, y]` or `[x, y, size]` point.

**Required fields:**
- `type`: `"Scatter"`
- `xColumn`: column for X values (numeric)
- `yColumn`: column for Y values (numeric)

**Optional fields:**
- `sizeColumn`: column for bubble size (numeric)

**Produces:**

| Placeholder | Type | Description |
|---|---|---|
| `$DATA.rows` | `number[][]` | Array of `[x, y]` or `[x, y, size]` arrays |

### 3.6 Heatmap

For heatmap/matrix charts. Each row provides an X category, Y category, and numeric value.

**Required fields:**
- `type`: `"Heatmap"`
- `xColumn`: column for X-axis categories
- `yColumn`: column for Y-axis categories
- `valueColumn`: column for cell values (numeric)

**Produces:**

| Placeholder | Type | Description |
|---|---|---|
| `$DATA.xCategories` | `string[]` | Unique X values |
| `$DATA.yCategories` | `string[]` | Unique Y values |
| `$DATA.rows` | `number[][]` | Array of `[xIndex, yIndex, value]` arrays |
| `$DATA.min` | `number` | Minimum cell value |
| `$DATA.max` | `number` | Maximum cell value |

### 3.7 Tree

Generic raw-row context (same as `Custom`). For treemap charts, prefer `LabelValue` — it produces the `{name, value}[]` shape ECharts treemap expects directly.

**Required fields:**
- `type`: `"Tree"`

**Produces:**

| Placeholder | Type | Description |
|---|---|---|
| `$DATA.rows` | `string[][]` | All rows as string arrays |
| `$DATA.columns` | `string[]` | Column headers |

### 3.8 Waterfall

For waterfall (bridge) charts. Given a single value column representing deltas, the server builds two stacked series: an invisible `Placeholder` that steps the base up/down, and a visible `Value` bar showing the magnitude of each delta.

**Required fields:**
- `type`: `"Waterfall"`
- `categoryColumn`: column for X-axis categories (in display order)
- `valueColumn`: column for the delta at each category (can be positive or negative)

**Produces:**

| Placeholder | Type | Description |
|---|---|---|
| `$DATA.categories` | `string[]` | Unique values from `categoryColumn`, preserving row order |
| `$DATA.series` | `object[]` | Two entries: `[0]` is the invisible placeholder, `[1]` is the visible value series. Both carry `stack: "Total"`. |
| `$DATA.series[0].data` | `number[]` | Placeholder heights (the stepped base level per bar) |
| `$DATA.series[1].data` | `object[]` | `[{value: <abs delta>, _signedValue: <raw delta>}, ...]`. `_signedValue` is available for styling (e.g. red for negative). |

### 3.9 Radar

For radar/spider charts. One column provides indicator names; each series column is a separate metric plotted across indicators.

**Required fields:**
- `type`: `"Radar"`
- `categoryColumn`: column whose distinct values become the radar indicators (axes)
- `series`: array of `{column, name}` — one entry per entity being compared

**Produces:**

| Placeholder | Type | Description |
|---|---|---|
| `$DATA.indicators` | `{name, max}[]` | One per unique category. `max` is the global maximum across all series (so every axis shares the same scale). |
| `$DATA.series` | `{name, value}[]` | One per series config. `value` is an array aligned to `$DATA.indicators`. |

### 3.10 GaugeMulti

For concentric multi-ring gauges — each row becomes one ring/gauge item.

**Required fields:**
- `type`: `"GaugeMulti"`
- `labelColumn`: column for each ring's name
- `valueColumn`: column for each ring's numeric value

**Produces:**

| Placeholder | Type | Description |
|---|---|---|
| `$DATA.values` | `object[]` | `[{value, name, title: {show: false}, detail: {show: false}}, ...]`. Per-point `title`/`detail` are pre-hidden to avoid overlapping labels. |

### 3.11 NestedLabelValue

For nested pies / two-level donuts. One set of rows is aggregated twice — once by the inner label, once by the outer — against a shared value column.

**Required fields:**
- `type`: `"NestedLabelValue"`
- `innerLabelColumn`: column for inner-ring labels
- `outerLabelColumn`: column for outer-ring labels
- `valueColumn`: column for numeric values

**Produces:**

| Placeholder | Type | Description |
|---|---|---|
| `$DATA.innerValues` | `{name, value}[]` | Aggregated by `innerLabelColumn` |
| `$DATA.outerValues` | `{name, value}[]` | Aggregated by `outerLabelColumn` |

### 3.12 FunnelComparison

For side-by-side comparison funnels. One label column with two value columns (left funnel + right funnel).

**Required fields:**
- `type`: `"FunnelComparison"`
- `labelColumn`: column for stage names
- `leftValueColumn`: column for left-side values
- `rightValueColumn`: column for right-side values

**Produces:**

| Placeholder | Type | Description |
|---|---|---|
| `$DATA.leftValues` | `{name, value}[]` | Aggregated from `leftValueColumn` |
| `$DATA.rightValues` | `{name, value}[]` | Aggregated from `rightValueColumn` |

### 3.13 Custom / Raw

- `Custom`: Same as Tree — provides `$DATA.rows` and `$DATA.columns`.
- `Raw`: No `$DATA` context is built. The echartOption must not contain `$DATA` placeholders. Useful for fully static charts.

---

## 4. clickEmitMapping — Cross-Filter Emission

When a user clicks a data point on a chart, the widget can emit cross-filter values that filter other widgets on the same dashboard. The `clickEmitMapping` array defines what values to extract from the clicked point and which cross-filter to set.

```json
"clickEmitMapping": [
  {
    "crossFilterCode": "itemFilter",
    "idColumn": "itemId",
    "codeColumn": "itemCode",
    "name1Column": "itemName1",
    "name2Column": "itemName2",
    "entityType": "InvItem"
  }
]
```

| Field | Required | Description |
|---|---|---|
| `crossFilterCode` | Yes | The `code` of the `BICrossFilter` entity to set |
| `valueColumn` | No | Column for scalar values (for non-reference filters like dates, numbers) |
| `idColumn` | No | Column containing the entity ID (binary(16) on SQL Server, converted automatically) |
| `codeColumn` | No | Column containing the entity code |
| `name1Column` | No | Column containing Arabic name |
| `name2Column` | No | Column containing English name |
| `entityType` | No | Static entity type string (e.g., `"InvItem"`, `"Customer"`) |
| `entityTypeColumn` | No | Column containing the entity type (for generic references) |
| `wizardFieldId` | Wizard mode | The wizard field ID this emission is bound to — both as the source of id/code/name sub-columns and as the dimension on which this entry fires. See Section 13. |

**Rules:**
- For **Reference** type cross-filters: provide `idColumn` (required for the filter to work), plus `codeColumn`/`name1Column`/`name2Column` for display. The `entityType` is needed for binary(16) ID coercion.
- For **scalar** type cross-filters (Date, Integer, Decimal, Text): provide `valueColumn`.
- Multiple entries in the array mean the widget emits multiple cross-filters from a single click.
- The columns referenced here must exist in the widget's SQL query.
- In **wizard mode**, set `wizardFieldId` instead and omit the `idColumn`/`codeColumn`/`name1Column`/`name2Column`/`entityTypeColumn`/`entityType`/`valueColumn` fields — the backend resolves them from the wizard field's cached metadata. Entries are also filtered per-dimension: an entry fires only on clicks where its `wizardFieldId` is one of the chart's currently-active dimensions.

**How it works at runtime:**
1. User clicks a data point (e.g., bar segment for "Branch A")
2. Frontend reads the `_clickEmitData` metadata (injected by the server into the echartOption)
3. For the clicked point index, it extracts the values from the pre-built point data
4. It calls the cross-filter Pinia store to set the filter
5. All other widgets bound to this cross-filter re-fetch their data with the new filter applied

---

## 5. drillDownMapping — Widget Drill-Down

When a user right-clicks a data point, a context menu shows drill-down targets. Clicking one opens a popup showing the target widget's chart, filtered by values from the clicked point.

```json
"drillDownMapping": [
  {
    "key": "invoiceDetails",
    "targetWidgetCode": "bi-item-invoice-details",
    "arTitle": "عرض تفاصيل الفواتير",
    "enTitle": "View invoice details",
    "orderInMenu": 1,
    "filters": [
      {
        "crossFilterCode": "itemFilter",
        "idColumn": "itemId",
        "codeColumn": "itemCode",
        "name1Column": "itemName1",
        "name2Column": "itemName2",
        "entityType": "InvItem"
      }
    ]
  }
]
```

| Target field | Required | Description |
|---|---|---|
| `key` | No | Unique identifier for this target. Required when referenced by `clickAction.targetKey`. |
| `targetType` | No | `"widget"` (default) or `"dashboard"`. Controls whether the target is a single widget or a full dashboard. |
| `targetWidgetCode` | If widget | The `code` of the `DashBoardWidget` to open (when `targetType` is `"widget"` or omitted) |
| `targetDashboardCode` | If dashboard | The `code` of the target `DashBoard` to open (when `targetType` is `"dashboard"`) |
| `arTitle` | No | Arabic menu item text |
| `enTitle` | No | English menu item text |
| `openMode` | No | How to open the target: `"popup"` (default — DrillDownDialog), `"navigate"` (same tab), `"newTab"`. For dashboard targets, popup opens a fullscreen dialog showing all dashboard widgets. |
| `orderInMenu` | No | Sort order in the context menu (ascending) |
| `column` | Table widgets only | Scopes the entry to a specific column. Absent = row-level (right-click any cell). |
| `onCellClick` | No | Table widgets only. When `true`, left-clicking a cell that matches this entry's scope (its `column`, or any cell if row-level) fires the drill-down directly — no right-click needed. See Section 5a. |
| `filters` | Yes | Array of filter definitions (same structure as `clickEmitMapping` entries) |
| `wizardFieldId` | Wizard mode | The dimension this drill target belongs to. The menu only shows entries whose `wizardFieldId` matches one of the chart's active dimensions. See Section 13. |

**Each filter entry** has the same fields as `clickEmitMapping` (crossFilterCode, idColumn, codeColumn, name1Column, name2Column, entityType, entityTypeColumn, valueColumn). In wizard mode each filter may carry `wizardFieldId` instead of the column fields — the backend fills in the sub-columns from the wizard field's cached metadata.

**How it works:**
1. User right-clicks a data point
2. Context menu shows drill-down targets sorted by `orderInMenu`
3. User selects a target
4. Frontend builds `drillDownFilters` from the clicked point values using the filter column mappings
5. Server receives the request, applies the drill-down filters as additional WHERE clauses on the target widget's query
6. The target widget's chart renders in a popup dialog

**Multiple drill-down targets** can be defined for the same widget — the context menu shows all of them.

### Dashboard Drill-Down

So far we have seen drill-down targets that open a single widget. But what if you want to drill into an entire dashboard — say, a "Regional Analysis" dashboard with its own set of charts? That is what `targetType: "dashboard"` is for.

When `targetType` is `"dashboard"`, you provide `targetDashboardCode` instead of `targetWidgetCode`. The drill-down filters are passed to all widgets on the target dashboard, just as if the user had set those cross-filters manually.

```json
"drillDownMapping": [
  {
    "key": "salesDetail",
    "targetType": "widget",
    "targetWidgetCode": "SALES_DETAIL",
    "enTitle": "Sales Details",
    "arTitle": "تفاصيل المبيعات",
    "orderInMenu": 1,
    "filters": [...]
  },
  {
    "key": "regionalDash",
    "targetType": "dashboard",
    "targetDashboardCode": "REGIONAL",
    "enTitle": "Regional Dashboard",
    "arTitle": "لوحة المنطقة",
    "openMode": "popup",
    "orderInMenu": 2,
    "filters": [...]
  }
]
```

The `openMode` field controls how the target opens:

| `openMode` | Behavior |
|---|---|
| `"popup"` | Default. Opens a DrillDownDialog. For dashboard targets, this is a fullscreen dialog that renders all the dashboard's widgets. |
| `"navigate"` | Navigates in the same browser tab. |
| `"newTab"` | Opens the target in a new browser tab. |

::: tip
Dashboard drill-down is particularly useful for hierarchical analysis — for example, drilling from a company-wide summary into a regional dashboard, and from there into a branch-level dashboard. Each level passes its filters down to the next.
:::

---

## 5a. Controlling Left-Click Behavior

By default, clicking a data point on a chart (or a cell in a table) emits cross-filters (the values defined in `clickEmitMapping`). Two mechanisms let you override that: the per-entry `onCellClick` flag on links and drill-downs (tables), and the widget-level `clickAction` (charts without columns).

### 5a.1 onCellClick — Per-Entry Left-Click (Tables + EnhancedTable)

The recommended way for Table/EnhancedTable widgets: mark a specific `linkMappings` or `drillDownMapping` entry with `"onCellClick": true`. When a cell is clicked, the dispatcher looks for the first entry whose scope matches the clicked cell and fires it.

```json
"linkMappings": [
  {
    "key": "openCustomer",
    "column": "customerName",
    "onCellClick": true,
    "linkToEntityTypeColumn": "customerEntityType",
    "linkToIdColumn": "customerId",
    "openMode": "popup"
  }
]
```

**Match rules for `onCellClick: true` entries:**

| Entry scope | Matches |
|---|---|
| `column` set (e.g. `"customerName"`) | Only when the clicked cell is in that column |
| `column` absent (row-level) | Any cell in the row |

**Priority order inside one widget** — the dispatcher walks the list in this order and fires the first match:

1. Drill-down entries with `onCellClick: true` (drill-down wins over link when both match).
2. Link entries with `onCellClick: true`.
3. Widget-level `clickAction` (see below).
4. Cross-filter emission (`clickEmitMapping`).

Entries without `onCellClick` still appear in the right-click context menu — the flag only controls left-click auto-fire.

### 5a.2 Widget-Level clickAction (Charts + Fallback)

For ECharts widgets there's no per-cell concept — a click hits a data point, not a column. The widget-level `clickAction` object defines a single action for the whole widget:

```json
"clickAction": {
  "type": "crossFilter | link | drillDown",
  "targetKey": "someKey"
}
```

| Field | Required | Description |
|---|---|---|
| `type` | Yes | One of `"crossFilter"`, `"link"`, or `"drillDown"`. |
| `targetKey` | If link or drillDown | The `key` of the target in `linkMappings` (for `"link"`) or `drillDownMapping` (for `"drillDown"`). Not used for `"crossFilter"`. |

The three modes:

- **`"crossFilter"`** — The current default behavior. The widget emits cross-filter values from `clickEmitMapping`. This is what happens when `clickAction` is absent entirely, so you only need to specify it explicitly if you want to be self-documenting.
- **`"link"`** — Navigates using a link defined in `linkMappings`. The `targetKey` must match the `key` of one of the link entries.
- **`"drillDown"`** — Triggers drill-down to a target defined in `drillDownMapping`. The `targetKey` must match the `key` of one of the drill-down entries. This is handy when you want a single-click drill-down experience without requiring the user to right-click and choose from a menu.

For Table/EnhancedTable widgets, `clickAction` is still honored but only as a fallback — `onCellClick` entries are checked first. The resolved target's `column` scope is also respected: if `clickAction.targetKey` points to a link/drill entry with `column: "X"`, the action fires only when the clicked cell is in column X. Prefer `onCellClick` for tables so the target scope lives on the mapping itself, not duplicated as a `targetKey` pointer.

::: warning
If neither `onCellClick` nor `clickAction` is set, the widget falls back to cross-filter emission — exactly the same behavior as before these features were introduced. Existing configurations do not need any changes.
:::

**Example — left-click opens a drill-down widget directly:**

```json
{
  "clickAction": {
    "type": "drillDown",
    "targetKey": "invoiceDetails"
  },
  "drillDownMapping": [
    {
      "key": "invoiceDetails",
      "targetWidgetCode": "bi-item-invoice-details",
      "enTitle": "Invoice Details",
      "arTitle": "تفاصيل الفواتير",
      "filters": [...]
    }
  ]
}
```

In this configuration, left-clicking a data point immediately opens the "Invoice Details" drill-down popup. The right-click context menu still shows all drill-down targets as usual.

---

## 5b. linkMappings — Link Navigation

The `linkMappings` array defines navigation links that appear in the right-click context menu under a "Navigate To" group. These links let users jump from a chart data point to an entity edit screen, an external URL, or any internal route.

```json
"linkMappings": [
  {
    "key": "openCustomer",
    "enLabel": "Open Customer",
    "arLabel": "فتح العميل",
    "linkToEntityTypeColumn": "CustomerEntityType",
    "linkToIdColumn": "CustomerId",
    "openMode": "popup",
    "labelColumn": "CustomerName"
  },
  {
    "key": "openWebsite",
    "enLabel": "Open Website",
    "arLabel": "فتح الموقع",
    "linkColumn": "WebsiteURL"
  }
]
```

There are two kinds of links, distinguished by which fields you provide:

### Direct Link (URL-based)

Use the `linkColumn` field to point to a SQL column that contains a URL. The system inspects the URL to decide how to open it:

- **Absolute URLs** (starting with `http://` or `https://`) open in a new browser tab.
- **Relative URLs** are treated as internal application routes and navigate within the app.

| Field | Required | Description |
|---|---|---|
| `key` | Yes | Unique identifier for the link. Referenced by `clickAction.targetKey`. |
| `enLabel` | No | English label in the context menu |
| `arLabel` | No | Arabic label in the context menu |
| `linkColumn` | Yes | SQL column containing the URL |
| `column` | Table widgets only | Scopes the entry to a specific column (absent = row-level, any cell). |
| `onCellClick` | No | Table widgets only. When `true`, left-clicking a matching cell fires this link without needing the right-click menu. See Section 5a.1. |

### Entity Navigation Link

Use `linkToEntityTypeColumn` + `linkToIdColumn` to build a link that opens an entity's edit view — for example, opening the Customer record that a chart bar represents.

| Field | Required | Description |
|---|---|---|
| `key` | Yes | Unique identifier for the link. Referenced by `clickAction.targetKey`. |
| `enLabel` | No | English label in the context menu |
| `arLabel` | No | Arabic label in the context menu |
| `linkToEntityTypeColumn` | Yes | SQL column containing the entity type string (e.g., `"Customer"`) |
| `linkToIdColumn` | Yes | SQL column containing the entity ID |
| `entityType` | No | Static entity type string. Use this instead of `linkToEntityTypeColumn` when every row links to the same entity type. |
| `openMode` | No | How to open the entity: `"popup"` (Quasar dialog, default), `"navigate"` (same tab), `"newTab"`. |
| `labelColumn` | No | SQL column used to enrich the context menu label. For example, if `enLabel` is `"Open Customer"` and `labelColumn` resolves to `"ABC Trading"`, the menu shows `"Open Customer 'ABC Trading'"`. |
| `column` | Table widgets only | Scopes the entry to a specific column (absent = row-level, any cell). |
| `onCellClick` | No | Table widgets only. When `true`, left-clicking a matching cell opens the link without needing the right-click menu. See Section 5a.1. |

::: tip
The `labelColumn` field is a small touch that makes a big difference in usability. Instead of a generic "Open Customer" menu item, the user sees "Open Customer 'ABC Trading'" — they know exactly where the link will take them before they click.
:::

**Example — chart widget, left-click navigates to a customer entity (widget-level clickAction):**

```json
{
  "clickAction": {
    "type": "link",
    "targetKey": "openCustomer"
  },
  "linkMappings": [
    {
      "key": "openCustomer",
      "enLabel": "Open Customer",
      "arLabel": "فتح العميل",
      "linkToEntityTypeColumn": "CustomerEntityType",
      "linkToIdColumn": "CustomerId",
      "openMode": "popup",
      "labelColumn": "CustomerName"
    }
  ]
}
```

Here, left-clicking any data point on the chart opens the customer's edit form. The same link also appears in the right-click context menu under "Navigate To".

**Example — EnhancedTable, click the customer-name cell to open its record (per-entry onCellClick):**

```json
{
  "columns": [
    {"id": "code", "field": "code"},
    {"id": "customerName", "field": "customerName"}
  ],
  "linkMappings": [
    {
      "key": "openCustomer",
      "column": "customerName",
      "onCellClick": true,
      "enLabel": "Open Customer",
      "arLabel": "فتح العميل",
      "linkToEntityTypeColumn": "CustomerEntityType",
      "linkToIdColumn": "CustomerId",
      "openMode": "popup",
      "labelColumn": "CustomerName"
    }
  ]
}
```

Clicking the customer-name cell opens the entity; clicking any other cell falls through to cross-filter emission. No `clickAction` needed — the link's own `column` + `onCellClick` flag carry all the information.

---

## 6. Cross-Filter Bindings

Cross-filter bindings define which cross-filters a widget **responds to** (not emits — that's `clickEmitMapping`). They are defined at the widget level (not inside `chartConfigJSON`).

```json
"crossFilterBindings": [
  {"crossFilter": "branchFilter"},
  {"crossFilter": "dateFrom"},
  {"crossFilter": "dateTo"}
]
```

Each binding references a `BICrossFilter` entity by its `code`. When that cross-filter has an active value, the server injects a WHERE clause into this widget's SQL query using the cross-filter's `sqlLeftHandSide` and `operator`.

**Example flow:**
1. `BICrossFilter` with code `"branchFilter"` has `sqlLeftHandSide: "l.branch_id"` and `operator: "Equal"`
2. Widget X has `crossFilterBindings: [{"crossFilter": "branchFilter"}]`
3. User clicks a branch on another widget, setting the `branchFilter` cross-filter
4. Widget X re-fetches data; the server replaces `/*AND-FILTERS*/` with `AND l.branch_id = <selected branch ID>`

### Supported Operators

| Operator | SQL | Use case |
|---|---|---|
| `Equal` | `=` | Exact match (default) |
| `In` | `IN (...)` | Multi-value selection |
| `GreaterThanOrEqual` | `>=` | Date from, minimum value |
| `LessThanOrEqual` | `<=` | Date to, maximum value |
| `GreaterThan` | `>` | Strict greater than |
| `LessThan` | `<` | Strict less than |
| `NotEqual` | `<>` | Exclusion |
| `Contains` | `LIKE '%value%'` | Text search |
| `StartsWith` | `LIKE 'value%'` | Text prefix match |

---

## 7. Number Format Spec

Series and data mappings can include a `format` object that controls how numeric values are displayed in tooltips, axis labels, and data labels.

```json
"format": {
  "type": "currency",
  "decimals": 0,
  "compact": true,
  "currency": "SAR"
}
```

| Field | Values | Description |
|---|---|---|
| `type` | `"number"`, `"currency"`, `"percent"`, `"compact"` | Formatting mode |
| `decimals` | `0`, `1`, `2`, ... | Decimal places |
| `compact` | `true` / `false` | Use compact notation (1K, 1M, 1B) |
| `currency` | `"SAR"`, `"USD"`, etc. | Currency symbol. If omitted and type is `"currency"`, the system's default currency is used. |

---

## 8. BICrossFilter Entity

Cross-filters are master-file entities that define reusable filter parameters. They produce `QuestionField` metadata for rendering filter UI controls, and carry default SQL bindings.

```json
{
  "code": "branchFilter",
  "name1": "فلتر الفرع",
  "name2": "Branch Filter",
  "paramType": "Reference",
  "referencedEntityType": "Branch",
  "arTitle": "الفرع",
  "enTitle": "Branch",
  "sqlLeftHandSide": "l.branch_id",
  "operator": "Equal"
}
```

| Field | Required | Description |
|---|---|---|
| `code` | Yes | Unique identifier, referenced by widgets |
| `name1` | Yes | Arabic name |
| `name2` | Yes | English name |
| `paramType` | Yes | Parameter type: `"Reference"`, `"Genericreference"`, `"Date"`, `"Integer"`, `"Decimal"`, `"Text"`, `"Enum"`, `"ListParam"`, `"Boolean"` |
| `referencedEntityType` | If Reference | Entity type (e.g., `"Branch"`, `"Customer"`, `"InvItem"`) |
| `arTitle` | No | Arabic label shown in the filter bar |
| `enTitle` | No | English label shown in the filter bar |
| `sqlLeftHandSide` | Yes | SQL expression for the left side of the WHERE condition (e.g., `"l.branch_id"`) |
| `operator` | Yes | Comparison operator (see Section 6) |
| `customWhereClause` | No | Full custom WHERE fragment (overrides sqlLeftHandSide + operator) |

**Important:** For `Reference` type filters, the `sqlLeftHandSide` should reference the **ID column** (e.g., `l.branch_id`), not a name or code column. The system handles binary(16) ID encoding automatically.

---

## 9. Widget Types

| Type | Rendering | chartConfigJSON needed? |
|---|---|---|
| `EChart` | ECharts chart (uses echartOption + dataMapping) | Yes |
| `Table` | AG Grid table (columns from SQL, rows from data) | No |
| `EnhancedTable` | AG Grid table driven entirely by `chartConfigJSON.columns` — per-column formatting, renderers, conditional formatting, column groups, pinning, aggregation. See Section 14. | Yes |
| `PieChart`, `ColumnWithRotatedLabels`, etc. | Legacy Highcharts types (auto-translated to ECharts server-side) | No |

For `Table` widgets, the SQL column names become the grid column headers. No `chartConfigJSON` is needed — just provide the `dataSource` SQL and `crossFilterBindings`.

For `EnhancedTable` widgets, every column is declared explicitly in `chartConfigJSON` with its own formatting spec, cell renderer, and conditional-formatting rules. See Section 14 for the full schema.

---

## 10. Bulk Import JSON Format

Nama ERP supports importing a complete dashboard setup (cross-filters, widgets, wizards, and dashboard layout) from a single JSON file. This is the fastest way to create a full dashboard with multiple interconnected charts.

### Top-Level Structure

```json
{
  "BICrossFilter": [ ],
  "DashBoardWidget": [ ],
  "DashBoardWidgetWizard": [ ],
  "DashBoard": [ ]
}
```

All four keys are optional — include only the entity types you need. Entities are created in order: cross-filters first, then widgets, then wizards, then dashboards. References between entities use `code` (business key), not IDs.

### 11.1 BICrossFilter Array

Each entry creates a `BICrossFilter` master file entity. See Section 8 for field definitions.

```json
{
  "code": "branchFilter",
  "name1": "فلتر الفرع",
  "name2": "Branch Filter",
  "paramType": "Reference",
  "referencedEntityType": "Branch",
  "arTitle": "الفرع",
  "enTitle": "Branch",
  "sqlLeftHandSide": "l.branch_id",
  "operator": "Equal"
}
```

### 11.2 DashBoardWidget Array

Each entry creates a `DashBoardWidget` entity. Key fields:

```json
{
  "code": "bi-sales-by-item",
  "name1": "المبيعات حسب الصنف",
  "name2": "Sales by Item",
  "chartTitle": "المبيعات حسب الصنف",
  "englishChartTitle": "Sales by Item",
  "type": "EChart",
  "dataSource": "SELECT ... WHERE 1=1 /*AND-FILTERS*/ ...",
  "chartConfigJSON": "{ ... }",
  "horizontalMode": true,
  "crossFilterBindings": [
    {"crossFilter": "branchFilter"},
    {"crossFilter": "dateFrom"}
  ]
}
```

| Field | Required | Description |
|---|---|---|
| `code` | Yes | Unique widget code |
| `name1` | Yes | Arabic name |
| `name2` | Yes | English name |
| `chartTitle` | No | Arabic chart title displayed above the chart |
| `englishChartTitle` | No | English chart title |
| `type` | Yes | `"EChart"` or `"Table"` |
| `dataSource` | Yes | SQL query with `/*AND-FILTERS*/` placeholder |
| `chartConfigJSON` | If EChart | JSON string containing echartOption + dataMapping (+ optional clickEmitMapping, drillDownMapping) |
| `wizardDataSource` | No | Code of a `DashBoardWidgetWizard` entity (alternative to raw SQL) |
| `horizontalMode` | No | Layout hint |
| `crossFilterBindings` | No | Array of `{"crossFilter": "filterCode"}` objects |

::: warning
The `chartConfigJSON` value is a **JSON string** (escaped), not a nested object. When writing import files, you must serialize the chart config object to a string.
:::

### 11.3 DashBoardWidgetWizard Array (Optional)

Wizards define data sources using field IDs rather than raw SQL. The system generates SQL from the wizard definition and enables several features (dimension drill-by, auto-inferred cross-filter columns, per-dimension drill menus) that raw-SQL widgets don't get. See Section 13 for the wizard-mode chart-config shape.

```json
{
  "code": "bi-sales-breakdown",
  "name1": "bi-sales-breakdown",
  "name2": "bi-sales-breakdown",
  "type": "EChartDataSource",
  "tableType": "DetailLine",
  "mainTable": "SalesInvoiceLine",
  "fields": [
    {"fieldId": "customer.customerCategory", "chartUsageType": "Dimension"},
    {"fieldId": "genericDimensions.branch", "chartUsageType": "Dimension"},
    {"fieldId": "price.netValue", "sqlAggregationType": "Sum", "chartUsageType": "Measure"}
  ]
}
```

| Field | Required | Description |
|---|---|---|
| `code` | Yes | Unique wizard code (referenced by widget's `wizardDataSource`) |
| `type` | Yes | Always `"EChartDataSource"` |
| `tableType` | Yes | `"MasterFile"`, `"DocumentHeader"`, or `"DetailLine"` |
| `mainTable` | Yes | Database table/entity type name |
| `fields[].fieldId` | Yes | Property path (e.g., `"customer.customerCategory"`, `"price.netValue"`) |
| `fields[].chartUsageType` | Yes | `"Dimension"` or `"Measure"` |
| `fields[].sqlAggregationType` | If Measure | `"Sum"`, `"Count"`, `"Average"`, `"Min"`, `"Max"` |

### 11.4 DashBoard Array

Each entry creates a `DashBoard` entity with a grid layout of widgets.

```json
{
  "code": "bi-sales-dashboard",
  "name1": "لوحة تحليل المبيعات",
  "name2": "Sales Analysis Dashboard",
  "rowsCount": 3,
  "colsCount": 3,
  "charts": [
    {
      "element": "bi-sales-by-item",
      "heightInRows": 1,
      "widthInColumns": 2,
      "rowNumber": 1,
      "columnNumber": 1
    },
    {
      "element": "bi-monthly-trend",
      "heightInRows": 1,
      "widthInColumns": 3,
      "rowNumber": 2,
      "columnNumber": 1
    }
  ],
  "crossFilterBindings": []
}
```

| Field | Required | Description |
|---|---|---|
| `code` | Yes | Unique dashboard code |
| `name1` | Yes | Arabic name |
| `name2` | Yes | English name |
| `rowsCount` | Yes | Grid row count |
| `colsCount` | Yes | Grid column count |
| `charts` | Yes | Array of widget placements |
| `charts[].element` | Yes | Widget code to place |
| `charts[].rowNumber` | Yes | Starting row (1-based) |
| `charts[].columnNumber` | Yes | Starting column (1-based) |
| `charts[].heightInRows` | Yes | How many rows this widget spans |
| `charts[].widthInColumns` | Yes | How many columns this widget spans |
| `crossFilterBindings` | No | Dashboard-level cross-filter bindings (usually empty) |

---

## 11. Complete Example — Sales Dashboard

Here is a complete, working import JSON that creates a sales analysis dashboard with 3 cross-filters, 3 widgets (pie + bar + table), cross-filter emission, and drill-down navigation.

```json
{
  "BICrossFilter": [
    {
      "code": "custCategoryFilter",
      "name1": "تصنيف العميل",
      "name2": "Customer Category",
      "paramType": "Reference",
      "referencedEntityType": "CustomerCategory",
      "arTitle": "تصنيف العميل",
      "enTitle": "Customer Category",
      "sqlLeftHandSide": "cc.id",
      "operator": "Equal"
    },
    {
      "code": "dateFromFilter",
      "name1": "من تاريخ",
      "name2": "Date From",
      "paramType": "Date",
      "arTitle": "من تاريخ",
      "enTitle": "From",
      "sqlLeftHandSide": "l.valueDate",
      "operator": "GreaterThanOrEqual"
    },
    {
      "code": "dateToFilter",
      "name1": "إلى تاريخ",
      "name2": "Date To",
      "paramType": "Date",
      "arTitle": "إلى تاريخ",
      "enTitle": "To",
      "sqlLeftHandSide": "l.valueDate",
      "operator": "LessThanOrEqual"
    }
  ],
  "DashBoardWidget": [
    {
      "code": "ex-sales-by-category",
      "name1": "المبيعات حسب التصنيف",
      "name2": "Sales by Category",
      "chartTitle": "المبيعات حسب التصنيف",
      "englishChartTitle": "Sales by Category",
      "type": "EChart",
      "dataSource": "SELECT cc.id ccId, cc.code ccCode, cc.name1 ccName1, cc.name2 ccName2, SUM(l.netValue) netValue FROM SalesInvoiceLine l LEFT JOIN Customer c ON c.id = l.customer_id LEFT JOIN CustomerCategory cc ON cc.id = c.customerCategory_id WHERE 1=1 /*AND-FILTERS*/ GROUP BY cc.id, cc.code, cc.name1, cc.name2",
      "chartConfigJSON": "{\"echartOption\":{\"tooltip\":{\"trigger\":\"item\",\"formatter\":\"{b}: {c} ({d}%)\"},\"legend\":{\"orient\":\"vertical\",\"left\":\"left\"},\"series\":[{\"type\":\"pie\",\"radius\":\"60%\",\"data\":\"$DATA.values\"}]},\"dataMapping\":{\"type\":\"LabelValue\",\"labelColumn\":\"ccName2\",\"valueColumn\":\"netValue\"},\"clickEmitMapping\":[{\"crossFilterCode\":\"custCategoryFilter\",\"idColumn\":\"ccId\",\"codeColumn\":\"ccCode\",\"name1Column\":\"ccName1\",\"name2Column\":\"ccName2\",\"entityType\":\"CustomerCategory\"}]}",
      "crossFilterBindings": [
        {"crossFilter": "dateFromFilter"},
        {"crossFilter": "dateToFilter"}
      ]
    },
    {
      "code": "ex-top-items",
      "name1": "أعلى الأصناف",
      "name2": "Top Items",
      "chartTitle": "أعلى 10 أصناف",
      "englishChartTitle": "Top 10 Items",
      "type": "EChart",
      "dataSource": "SELECT TOP 10 i.name2 itemName, SUM(l.netValue) netValue FROM SalesInvoiceLine l LEFT JOIN InvItem i ON i.id = l.item_id LEFT JOIN Customer c ON c.id = l.customer_id LEFT JOIN CustomerCategory cc ON cc.id = c.customerCategory_id WHERE 1=1 /*AND-FILTERS*/ GROUP BY i.name2 ORDER BY netValue DESC",
      "chartConfigJSON": "{\"echartOption\":{\"tooltip\":{\"trigger\":\"axis\",\"axisPointer\":{\"type\":\"shadow\"}},\"grid\":{\"left\":120,\"right\":40,\"top\":10,\"bottom\":20},\"xAxis\":{\"type\":\"value\"},\"yAxis\":{\"type\":\"category\",\"data\":\"$DATA.categories\",\"inverse\":true,\"axisLabel\":{\"width\":110,\"overflow\":\"truncate\"}},\"series\":[{\"name\":\"$DATA.series[0].name\",\"type\":\"bar\",\"data\":\"$DATA.series[0].data\",\"itemStyle\":{\"borderRadius\":[0,4,4,0]},\"label\":{\"show\":true,\"position\":\"right\"}}]},\"dataMapping\":{\"type\":\"CategoryValue\",\"categoryColumn\":\"itemName\",\"series\":[{\"column\":\"netValue\",\"name\":\"Net Value\",\"type\":\"bar\",\"format\":{\"type\":\"currency\",\"decimals\":0,\"compact\":true}}]}}",
      "crossFilterBindings": [
        {"crossFilter": "custCategoryFilter"},
        {"crossFilter": "dateFromFilter"},
        {"crossFilter": "dateToFilter"}
      ]
    },
    {
      "code": "ex-invoice-details",
      "name1": "تفاصيل الفواتير",
      "name2": "Invoice Details",
      "chartTitle": "تفاصيل الفواتير",
      "englishChartTitle": "Invoice Details",
      "type": "Table",
      "dataSource": "SELECT TOP 200 s.code invoiceCode, l.valueDate, c.name2 customerName, i.name2 itemName, l.quantityBaseValue qty, l.netValue FROM SalesInvoiceLine l LEFT JOIN SalesInvoice s ON s.id = l.salesInvoice_id LEFT JOIN InvItem i ON i.id = l.item_id LEFT JOIN Customer c ON c.id = l.customer_id LEFT JOIN CustomerCategory cc ON cc.id = c.customerCategory_id WHERE 1=1 /*AND-FILTERS*/ ORDER BY l.valueDate DESC",
      "crossFilterBindings": [
        {"crossFilter": "custCategoryFilter"},
        {"crossFilter": "dateFromFilter"},
        {"crossFilter": "dateToFilter"}
      ]
    }
  ],
  "DashBoard": [
    {
      "code": "ex-sales-dashboard",
      "name1": "لوحة المبيعات",
      "name2": "Sales Dashboard",
      "rowsCount": 2,
      "colsCount": 3,
      "charts": [
        {"element": "ex-sales-by-category", "heightInRows": 1, "widthInColumns": 1, "rowNumber": 1, "columnNumber": 1},
        {"element": "ex-top-items", "heightInRows": 1, "widthInColumns": 2, "rowNumber": 1, "columnNumber": 2},
        {"element": "ex-invoice-details", "heightInRows": 1, "widthInColumns": 3, "rowNumber": 2, "columnNumber": 1}
      ],
      "crossFilterBindings": []
    }
  ]
}
```

### What This Creates

- **3 cross-filters**: Customer Category (reference picker), Date From, Date To (date pickers)
- **Pie chart** (`ex-sales-by-category`): Shows sales distribution by customer category. Clicking a slice sets the `custCategoryFilter`, which filters the other two widgets.
- **Horizontal bar chart** (`ex-top-items`): Top 10 items by net value. Responds to the category filter and date filters.
- **Table** (`ex-invoice-details`): Invoice line details. Responds to all three filters.
- **Dashboard** (`ex-sales-dashboard`): 2-row, 3-column grid. Pie on top-left, bar chart spanning top-right, table spanning the full bottom row.

### How to Import

1. Save the JSON to a file
2. In Nama ERP, navigate to **BI Dashboard Import** (or use the developer tools import endpoint)
3. Upload the file — all entities are created in one operation
4. Open the dashboard by its code (`ex-sales-dashboard`)

---

## 12. Quick Reference — Common Patterns

### Vertical Bar Chart (CategoryValue)
```json
{
  "echartOption": {
    "tooltip": {"trigger": "axis", "axisPointer": {"type": "shadow"}},
    "xAxis": {"type": "category", "data": "$DATA.categories", "axisLabel": {"rotate": 45}},
    "yAxis": {"type": "value"},
    "series": [{"name": "$DATA.series[0].name", "type": "bar", "data": "$DATA.series[0].data", "itemStyle": {"borderRadius": [4, 4, 0, 0]}}]
  },
  "dataMapping": {"type": "CategoryValue", "categoryColumn": "categoryName", "series": [{"column": "value", "name": "Value", "type": "bar"}]}
}
```

### Horizontal Bar Chart (CategoryValue with swapped axes)
```json
{
  "echartOption": {
    "tooltip": {"trigger": "axis", "axisPointer": {"type": "shadow"}},
    "grid": {"left": 140, "right": 40, "top": 10, "bottom": 20},
    "xAxis": {"type": "value"},
    "yAxis": {"type": "category", "data": "$DATA.categories", "inverse": true, "axisLabel": {"width": 130, "overflow": "truncate"}},
    "series": [{"name": "$DATA.series[0].name", "type": "bar", "data": "$DATA.series[0].data", "itemStyle": {"borderRadius": [0, 4, 4, 0]}, "label": {"show": true, "position": "right"}}]
  },
  "dataMapping": {"type": "CategoryValue", "categoryColumn": "itemName", "series": [{"column": "netValue", "name": "Net Value", "type": "bar"}]}
}
```

### Stacked Bar (CategoryLabelValue)
```json
{
  "echartOption": {
    "tooltip": {"trigger": "axis", "axisPointer": {"type": "shadow"}},
    "legend": {},
    "xAxis": {"type": "category", "data": "$DATA.categories"},
    "yAxis": {"type": "value"},
    "series": "$DATA.series"
  },
  "dataMapping": {"type": "CategoryLabelValue", "categoryColumn": "year", "labelColumn": "branch", "valueColumn": "amount", "seriesType": "bar", "stack": "total"}
}
```

### Line Chart with Area Fill
```json
{
  "echartOption": {
    "tooltip": {"trigger": "axis"},
    "xAxis": {"type": "category", "data": "$DATA.categories"},
    "yAxis": {"type": "value"},
    "series": [{"name": "$DATA.series[0].name", "type": "line", "data": "$DATA.series[0].data", "areaStyle": {}, "smooth": true}]
  },
  "dataMapping": {"type": "CategoryValue", "categoryColumn": "month", "series": [{"column": "total", "name": "Total", "type": "line"}]}
}
```

### Pie Chart (LabelValue)
```json
{
  "echartOption": {
    "tooltip": {"trigger": "item", "formatter": "{b}: {c} ({d}%)"},
    "legend": {"orient": "vertical", "left": "left"},
    "series": [{"type": "pie", "radius": "60%", "data": "$DATA.values"}]
  },
  "dataMapping": {"type": "LabelValue", "labelColumn": "name", "valueColumn": "amount"}
}
```

### Donut Chart with Center Label
```json
{
  "echartOption": {
    "tooltip": {"trigger": "item", "formatter": "{b}: {c} ({d}%)"},
    "graphic": [{"type": "text", "left": "center", "top": "center", "style": {"text": "$DATA.centerText", "fontSize": 24, "fontWeight": "bold", "textAlign": "center"}}],
    "series": [{"type": "pie", "radius": ["45%", "70%"], "data": "$DATA.values", "label": {"show": false}}]
  },
  "dataMapping": {"type": "LabelValue", "labelColumn": "name", "valueColumn": "amount", "centerText": "Total"}
}
```

### Gauge
```json
{
  "echartOption": {
    "series": [{"type": "gauge", "min": 0, "max": "$DATA.max", "data": [{"value": "$DATA.value", "name": "$DATA.unit"}], "axisLine": {"lineStyle": {"width": 30, "color": "$DATA.bands"}}, "detail": {"formatter": "{value}"}}]
  },
  "dataMapping": {"type": "Gauge", "valueColumn": "score", "unit": "%", "max": 100, "bands": [[0.3, "#67e0e3"], [0.7, "#37a2da"], [1, "#fd666d"]]}
}
```

### Combination Chart (Bar + Line, Dual Axis)
```json
{
  "echartOption": {
    "tooltip": {"trigger": "axis", "axisPointer": {"type": "shadow"}},
    "legend": {},
    "xAxis": {"type": "category", "data": "$DATA.categories"},
    "yAxis": [{"type": "value"}, {"type": "value", "splitLine": {"show": false}}],
    "series": "$DATA.series"
  },
  "dataMapping": {
    "type": "CategoryValue",
    "categoryColumn": "month",
    "series": [
      {"column": "revenue", "name": "Revenue", "type": "bar"},
      {"column": "margin", "name": "Margin %", "type": "line", "yAxisIndex": 1}
    ]
  }
}
```

### Heatmap
```json
{
  "echartOption": {
    "tooltip": {"position": "top"},
    "xAxis": {"type": "category", "data": "$DATA.xCategories", "splitArea": {"show": true}},
    "yAxis": {"type": "category", "data": "$DATA.yCategories", "splitArea": {"show": true}},
    "visualMap": {"min": "$DATA.min", "max": "$DATA.max", "calculable": true, "orient": "horizontal", "left": "center", "bottom": 0},
    "series": [{"type": "heatmap", "data": "$DATA.rows", "label": {"show": true}}]
  },
  "dataMapping": {"type": "Heatmap", "xColumn": "dayOfWeek", "yColumn": "hourSlot", "valueColumn": "count"}
}
```

---

## 13. Wizard Mode — Chart Config Shape

When a widget has a `wizardDataSource`, its `chartConfigJSON` can reference **wizard field IDs** instead of raw SQL column names. The backend resolves each field ID to its underlying SQL alias using metadata that is cached on the wizard field line at save time.

This section is the definitive reference for the wizard-mode shape. SQL-mode widgets are unaffected by anything here.

### 13.1 How Metadata Caching Works

When you save a `DashBoardWidgetWizard`, its `postCommitAction` runs `ReportWizardQuery.build()` once, then stores a per-field metadata record in each field line's (system) `fieldMetadata` JSON field. The record contains:

- `fieldId` — the wizard field's property path
- `chartUsage` — `"Dimension"` or `"Measure"`
- `paramType` — `Reference`, `Decimal`, `Text`, `Date`, `Integer`, `Genericreference`, `Enum`, `Boolean`
- `referencedEntityType` — only for reference fields
- `aggregation` — `None`, `Sum`, `Count`, `Average`, `Min`, `Max`
- `displayAlias` — the SQL alias used for this field's primary display column
- `subColumns` — for reference fields only: the aliases of the auto-expanded id/code/name1/name2/entityType/value sub-columns
- `sqlLeftHandSide` — the fully-qualified SQL LHS (e.g., `MainEntity.CustomerId`) used for cross-filter WHERE injection
- `arabicTitle` / `englishTitle` — pass-through from the field line

Because metadata is cached, no runtime re-building of `ReportWizardQuery` is needed just to look up an alias. At chart-render time the backend deserializes the cached records and consults them.

### 13.2 Data Mapping Keys

For every column slot that the chart types (Section 3) define, wizard mode adds a `*WizardFieldId` sibling key:

| SQL-mode key | Wizard-mode sibling | Resolves to |
|---|---|---|
| `categoryColumn` | `categoryWizardFieldId` | `displayAlias` of the referenced wizard field |
| `labelColumn` | `labelWizardFieldId` | same |
| `valueColumn` | `valueWizardFieldId` | same |
| `xColumn` | `xWizardFieldId` | same |
| `yColumn` | `yWizardFieldId` | same |
| `sizeColumn` | `sizeWizardFieldId` | same (Scatter bubble size) |
| `series[].column` | `series[].wizardFieldId` | same |

If both are present for the same slot, the `*Column` value wins. If neither is present, the slot is left unset.

For tempo columns and period-comparison columns, use the `*Column` keys — those aliases are not wizard fields, and any `wizardFieldId` pointing at them is silently ignored by the resolver.

**Example — CategoryLabelValue in wizard mode:**

```json
"dataMapping": {
  "type": "CategoryLabelValue",
  "categoryWizardFieldId": "invoice.valueDate",
  "labelWizardFieldId": "customer.customerCategory",
  "valueWizardFieldId": "price.netValue",
  "seriesType": "bar"
}
```

### 13.3 Click-Emit & Drill-Down — wizardFieldId

Each entry in `clickEmitMapping` and `drillDownMapping` (and its `filters[]` sub-entries) can carry a `wizardFieldId`:

```json
"clickEmitMapping": [
  { "crossFilterCode": "customerCategoryFilter", "wizardFieldId": "customer.customerCategory" },
  { "crossFilterCode": "customerFilter",         "wizardFieldId": "invoice.customer" }
]
```

Two things happen at runtime for each entry that has a `wizardFieldId`:

1. **Sub-column inference** — the backend fills in missing `idColumn`/`codeColumn`/`name1Column`/`name2Column`/`entityTypeColumn`/`valueColumn`/`entityType` from the wizard field's cached `subColumns` + `referencedEntityType`. You do not need to write those fields.
2. **Per-dimension filtering** — the entry only fires when its `wizardFieldId` is one of the chart's **currently active dimensions** (see 14.4). This is what makes click-emit and drill-down behave correctly when a single widget supports multiple dimensions via drill-by.

Entries without a `wizardFieldId` are treated as always-active (legacy SQL-mode behavior).

### 13.4 Active Dimensions

The "currently active dimensions" for a wizard widget is the ordered list of wizard field IDs it is grouping by right now. The backend derives it as:

1. If the request carries `drillDownByTargetDimension`, that field ID is first.
2. Then, in order: `categoryWizardFieldId`, `labelWizardFieldId`, `xWizardFieldId`, `yWizardFieldId` — whichever are set in `dataMapping`.

Duplicates are skipped. This list drives three things:

- **SQL rebuild**: the effective SQL is regenerated for each request via `ReportWizardQuery.buildForDrillDown(wizard, primary, otherDims)`. The primary dimension is the first entry; the rest are included as additional GROUP BY columns. All measures stay in the SELECT regardless.
- **Click/drill filtering** (14.3).
- **Drill-by menu exclusion**: a dimension already in the active list is hidden from the right-click "Drill Down By" menu.

### 13.5 Dimension Drill-By Semantics (Option A)

When a user right-clicks a data point and picks "Drill Down By X":

1. **Category is replaced** — the drilled dimension takes the primary (category) slot.
2. **Other active dimensions (label, x, y) stay** — they remain in GROUP BY so the chart renders the same shape.
3. **Filter by clicked category value only** — the drill stack accumulates one entry per drill: `(categoryFieldId, clickedValue)`. The label's clicked value is NOT added to the filter.
4. **Drill stack grows with each drill** — filters accumulate (e.g., after two drills: `WHERE month='Jan' AND region='West'`).

The drill menu is computed from `wizard.fields` filtered to:
- `chartUsageType == Dimension`
- Not already in the active list
- Not already in the drill stack

Once the user drills, the server rebuilds the chart config by reading the widget's existing `chartConfigJSON` and surgically overriding `dataMapping.categoryColumn` with the drilled dimension's display alias (and removing `categoryWizardFieldId` so the rewriter doesn't overwrite). Everything else — `echartOption`, `labelColumn`/`labelWizardFieldId`, `valueColumn`/`valueWizardFieldId`, series styling, colors, `clickEmitMapping`, `drillDownMapping`, `linkMappings` — is carried through untouched.

### 13.6 Cross-Filter SQL LHS

For wizard widgets, cross-filter bindings can omit `sqlLeftHandSide` on both the binding and the `BICrossFilter` entity. If the binding has no LHS, the backend:

1. Finds the click-emit entry for the same cross-filter code in the chart config
2. Reads its `wizardFieldId`
3. Uses the wizard field's cached `sqlLeftHandSide`

This lets wizard-backed widgets inherit the SQL LHS from the field ID without the author ever having to know or write it.

### 13.7 Coexistence With Legacy Widgets

Wizard widgets saved before wizard-mode keys were introduced have only `*Column` keys in their `chartConfigJSON`. The backend reads them as before — column names, no per-dimension filtering. Re-saving the widget through the chart designer upgrades it to the new shape if the user picks field IDs for the mapping slots.

### 13.8 Complete Wizard-Mode Example

Below is a single CategoryLabelValue widget written in full wizard-mode shape: category and label are wizard field IDs, the measure is a wizard field ID, and both click-emit and drill-down entries use `wizardFieldId` so sub-columns are auto-inferred and the entries fire per-dimension.

```json
{
  "echartOption": {
    "tooltip": {"trigger": "axis", "axisPointer": {"type": "shadow"}},
    "legend": {},
    "xAxis": {"type": "category", "data": "$DATA.categories"},
    "yAxis": {"type": "value"},
    "series": "$DATA.series"
  },
  "dataMapping": {
    "type": "CategoryLabelValue",
    "categoryWizardFieldId": "invoice.valueDate",
    "labelWizardFieldId": "customer.customerCategory",
    "valueWizardFieldId": "price.netValue",
    "seriesType": "bar",
    "stack": "total"
  },
  "clickEmitMapping": [
    { "crossFilterCode": "dateFromFilter",         "wizardFieldId": "invoice.valueDate" },
    { "crossFilterCode": "customerCategoryFilter", "wizardFieldId": "customer.customerCategory" }
  ],
  "drillDownMapping": [
    {
      "key": "categoryDetails",
      "wizardFieldId": "customer.customerCategory",
      "targetWidgetCode": "bi-category-details",
      "enTitle": "Category details",
      "arTitle": "تفاصيل التصنيف",
      "filters": [
        { "crossFilterCode": "customerCategoryFilter", "wizardFieldId": "customer.customerCategory" }
      ]
    }
  ]
}
```

The corresponding wizard definition:

```json
{
  "code": "bi-sales-breakdown",
  "type": "EChartDataSource",
  "tableType": "DetailLine",
  "mainTable": "SalesInvoiceLine",
  "fields": [
    {"fieldId": "invoice.valueDate",          "chartUsageType": "Dimension"},
    {"fieldId": "customer.customerCategory",  "chartUsageType": "Dimension"},
    {"fieldId": "price.netValue",             "chartUsageType": "Measure", "sqlAggregationType": "Sum"}
  ]
}
```

No raw SQL, no column-name bookkeeping, no `idColumn`/`codeColumn` mappings. When a user right-clicks a bar and picks "Drill Down By Branch", the server rebuilds the query keeping customer category as the series axis (so the stacked layout is preserved), swaps the X-axis to branch, filters by the clicked date, and re-renders — all without touching the `echartOption` styling.

### 13.9 Runtime Slot Selection

Wizard-backed widgets expose a runtime selector (toolbar button / echarts toolbox icon on each widget) that lets the dashboard viewer reshape the chart without editing it: pick a different dimension for the category slot, swap the measure, add/remove series measures, etc. Selection is **session-only** — refreshing the page resets to the configured defaults.

The selector shape is driven entirely by `dataMapping.type`. Each mapping type declares which slots are pickable at runtime and which `*WizardFieldId` keys they write to:

| Mapping type | Dimension slots | Measure slots | Multi-measure series |
|---|---|---|---|
| `CategoryValue` | `categoryWizardFieldId` | `series[].wizardFieldId` (N) | **Yes** (flexible only) |
| `LabelValue` | `labelWizardFieldId` | `valueWizardFieldId` | No |
| `CategoryLabelValue` | `categoryWizardFieldId`, `labelWizardFieldId` | `valueWizardFieldId` | No |
| `Scatter` | — | `xWizardFieldId`, `yWizardFieldId`, `sizeWizardFieldId` (optional) | No |
| `Heatmap` | `xWizardFieldId`, `yWizardFieldId` | `valueWizardFieldId` | No |
| `Gauge` | — | `valueWizardFieldId` | No |
| `Tree` | `labelWizardFieldId` | `valueWizardFieldId` | No |

Mapping types not listed (`Waterfall`, `NestedLabelValue`, `GaugeMulti`, `Radar`, `FunnelComparison`, `Custom`, `Raw`) have no runtime selector — their button is hidden.

**Flexible vs. fixed `CategoryValue`**: only "flexible" CategoryValue widgets allow the user to pick multiple measures as series. A CategoryValue is **flexible** when every entry in `series[]` is uniform — no `yAxisIndex`, no `stack`, no `target`, and all entries share the same `type`. Dual-axis, combo bar/line, stacked, and with-target CategoryValue charts are **fixed**: their runtime multi-measure picker is hidden (but single-slot pickers still work).

**No selector in drill-by mode**: when a chart is rendered inside the dimension drill-by dialog (request carries `drillDownByTargetDimension`), the server omits `runtimeSelectorInfo` from the chart line, so the selector does not appear on the drill-by view. Drill-by is already reshaping the chart; the runtime selector stays on the main dashboard view only.

**Opt-out flags** on `chartConfigJSON`:
- `disableRuntimeDimensionSelection: true` — hides dimension pickers (keeps measure pickers).
- `disableRuntimeMeasureSelection: true` — hides measure pickers (keeps dimension pickers).

Set both to `true` to hide the selector entirely.

**Interaction with click/drill mappings**: runtime slot changes reshape `activeDimensionFieldIds` (Section 13.4), which means click-emit and drill-down entries keyed by `wizardFieldId` automatically follow the new active dimensions — no extra config needed.

**Guidance for AI-generated configs**: prefer wizard-mode keys (`*WizardFieldId`) over raw column names whenever a `wizardDataSource` is present, so generated widgets pick up the runtime selector for free. For designer-only widgets (no end-user reshaping), set both opt-out flags to `true`. For dashboards where you ship carefully tuned combo/dual-axis CategoryValue charts, you don't need the flags — the fixed-shape detector already hides the multi-measure picker.

---

## 14. EnhancedTable — JSON-Driven Grid

`EnhancedTable` is a second-generation table widget where every column is declared in `chartConfigJSON` with its own formatting, renderer, conditional-formatting rules, pinning, grouping, and aggregation. It reuses all the BI interaction machinery (`clickEmitMapping`, `drillDownMapping`, `linkMappings`, `clickAction` — Sections 4–5b) with an optional `column` field on each entry to target a specific cell. The classic `Table` widget remains unchanged; opt in by setting `"type": "EnhancedTable"` on the widget.

### 14.1 chartConfigJSON Structure

```json
{
  "tableOptions": { },
  "columnGroups": [ ],
  "columns": [ ],
  "rowConditionalFormatting": { "cascade": false, "rules": [ ] },
  "clickEmitMapping":  [ ],
  "drillDownMapping":  [ ],
  "linkMappings":      [ ],
  "clickAction":       { }
}
```

| Key | Required | Description |
|---|---|---|
| `columns` | Yes | Ordered array of column definitions (see 15.3). Columns in this array define the grid's column order. |
| `columnGroups` | No | Array of `{id, headerArTitle, headerEnTitle, marryChildren, openByDefault}` entries. Columns reference their group via `groupId`. |
| `tableOptions` | No | Grid-level options (see 15.2). Safe to omit — defaults are reasonable. |
| `rowConditionalFormatting` | No | Row-level conditional formatting (see 15.5). |
| `clickEmitMapping`, `drillDownMapping`, `linkMappings`, `clickAction` | No | Same as Sections 4–5a. Each `drillDownMapping` / `linkMappings` entry may carry a `column` field (scope the entry to a specific column) and `onCellClick: true` (fire on left-click, not just right-click). Prefer `onCellClick` on the entry itself over widget-level `clickAction` for tables — see Section 5a.1 for dispatch order. |

No `dataMapping` / `echartOption` — EnhancedTable does not use ECharts.

### 14.2 tableOptions

```json
"tableOptions": {
  "pagination":         false,
  "pageSize":           25,
  "pageSizes":          [25, 50, 100, 250],
  "rowNumbers":         true,
  "enableRowGroup":     true,
  "enablePivot":        false,
  "pivotOpenByDefault": false,
  "grandTotalRow":      "bottom",
  "defaultColWidth":    null,
  "defaultFlex":        1,
  "defaultMinWidth":    130,
  "wrapText":           true,
  "autoHeight":         true,
  "enableRtl":          "auto",
  "cellSelection":      true
}
```

| Field | Default | Notes |
|---|---|---|
| `pagination` | `false` | Off by default — all rows load at once and the user scrolls. When enabled, AG Grid paginates the in-memory data (no server-side paging). |
| `grandTotalRow` | `null` | `"top"`, `"bottom"`, or `null`. AG Grid computes the totals client-side from visible rows; no server-side footer is emitted. |
| `enableRowGroup` / `enablePivot` | `true` / `false` | Enables AG Grid row-grouping and pivot modes. Columns need `rowGroup: true` / `pivot: true` to be actually grouped/pivoted by default. |

### 14.3 Column Definition

```json
{
  "id":            "amountCol",
  "field":         "netValue",
  "wizardFieldId": "price.netValue",
  "groupId":       "salesGroup",
  "headerArTitle": "الصافي",
  "headerEnTitle": "Net Value",
  "hide":          false,
  "width":         120,
  "minWidth":      80,
  "maxWidth":      240,
  "flex":          null,
  "pinned":        null,
  "sort":          null,
  "sortIndex":     null,
  "rowGroup":      false,
  "rowGroupIndex": null,
  "pivot":         false,
  "aggFunc":       "sum",
  "tooltipField":  null,
  "formatting":    { },
  "renderer":      { },
  "conditionalFormatting": { }
}
```

| Field | Required | Description |
|---|---|---|
| `id` | Yes | Stable identifier. Used by click/drill/link mappings (their `column` field), by conditional formatting (`compareColumn`), and as the React/AG Grid column ID. |
| `field` | One of | SQL column name from the widget's `dataSource`. |
| `wizardFieldId` | One of | Wizard field ID (wizard mode only). Resolved to a SQL column alias via `DashBoardWizardFieldMetadata.displayAlias` — see Section 13. |
| `groupId` | No | References an entry in `columnGroups[].id`. Columns with the same `groupId` render under a shared group header. |
| `headerArTitle` / `headerEnTitle` | No | Localized column header. Falls back to `id` if both are empty. |
| `hide`, `width`, `minWidth`, `maxWidth`, `flex` | No | AG Grid layout controls. |
| `pinned` | No | `"left"`, `"right"`, or `null`. |
| `sort`, `sortIndex` | No | Initial sort applied when the widget loads. |
| `rowGroup`, `rowGroupIndex`, `pivot`, `aggFunc` | No | Row-grouping / pivot / aggregation. `aggFunc` accepts `"sum"`, `"avg"`, `"min"`, `"max"`, `"count"`, `"first"`, `"last"`. |
| `tooltipField` | No | The `id` of another column whose display value becomes this cell's tooltip. |
| `formatting` | No | Display-string formatter (see 15.4.1). |
| `renderer` | No | Cell renderer (see 15.4.2). Defaults to `text`. |
| `conditionalFormatting` | No | Per-cell styling rules (see 15.5). |

### 14.4 Formatting & Renderers

#### 15.4.1 `formatting`

Controls how the raw SQL value becomes a display string. Server-computed, so the client uses the result verbatim.

```json
"formatting": {
  "type":              "currency",
  "decimals":          2,
  "thousandSeparator": true,
  "currencyCode":      "SAR",
  "currencySymbol":    "SAR",
  "currencyPlacement": "suffix",
  "dateFormat":        "yyyy-MM-dd",
  "percentScale":      "asIs",
  "nullDisplay":       "—",
  "prefix":            "",
  "suffix":            ""
}
```

| `type` | Input | Output example | Extra options |
|---|---|---|---|
| `text` | Any | unchanged | — |
| `number` | Numeric | `1,234.50` | `decimals`, `thousandSeparator` |
| `currency` | Numeric | `1,234.50 SAR` | `decimals`, `currencySymbol`, `currencyPlacement` (`prefix`/`suffix`) |
| `percent` | Numeric | `45.00%` | `decimals`, `percentScale` (`asIs` leaves 45 as 45%; `fraction` treats 0.45 as 45%) |
| `date` | Parseable date | `2026-04-19` | `dateFormat` (SimpleDateFormat pattern, default `yyyy-MM-dd`) |
| `datetime` | Parseable datetime | `2026-04-19 14:30` | `dateFormat` (default `yyyy-MM-dd HH:mm`) |
| `duration` | Seconds | `1:23:45` | — |

`prefix` / `suffix` wrap the formatted string. `nullDisplay` replaces empty values (defaults to `""`).

#### 15.4.2 `renderer`

```json
"renderer": {
  "type": "text" | "html" | "badge" | "bar" | "sparkline" | "progress" | "icon",
  "badge":    { "shape": "pill" | "square", "variant": "solid" | "outline" },
  "bar":      { "min": 0, "max": 100, "color": "#4caf50" },
  "progress": { "min": 0, "max": 100 },
  "icon":     { "mapping": [ { "when": "Approved", "icon": "check_circle", "color": "#2e7d32" } ], "position": "prefix" | "replace" },
  "sparkline": { "type": "line" | "column" | "area", "lineColor": "#2196F3", "fill": "rgba(33,150,243,0.2)" }
}
```

| Type | Visual | Notes |
|---|---|---|
| `text` | Plain formatted string | Default. No renderer block needed. |
| `html` | Renders raw HTML from the cell value via `v-html`. | Trust model matches the legacy Table's `Param_INHTML` — no client-side sanitization. |
| `badge` | Pill/square label with the cell's text. | Background color comes from `conditionalFormatting` (falls back to a subtle blue). |
| `bar` | Horizontal filled bar using `agSparklineCellRenderer` with `type:"bar"`, `direction:"horizontal"`. | Value scaled between `min` and `max`. |
| `progress` | Same mechanism as `bar` with a blue default fill. Semantically "progress toward target". | |
| `sparkline` | Multi-point mini chart (`agSparklineCellRenderer`). | Reads the series from the column's own SQL `field` — a comma-separated numeric list or a JSON array (e.g. `1,5,9,12` or `[1,5,9,12]`). |
| `icon` | Cell value is matched against `mapping[].when` strings; matched entry renders an icon (optionally replacing the text when `position: "replace"`). | |

**Important**: `bar`, `progress`, and `sparkline` require AG Grid Enterprise's `SparklinesModule` registered globally (already done in the Nama Vue shell). The widget automatically wraps the cell's numeric value in a single-element array for bar/progress to match what `agSparklineCellRenderer` expects.

### 14.5 Conditional Formatting

Rules evaluated server-side against a result-set row; the winning style is embedded directly in the wire payload so the client does zero rule evaluation.

```json
"conditionalFormatting": {
  "cascade": false,
  "rules": [
    { "when": { "type": "threshold", "op": ">=", "value": 1000 },
      "style": { "bg": "#e8f5e9", "color": "#1b5e20", "bold": true } },
    { "when": { "type": "threshold", "op": "<", "value": 0 },
      "style": { "bg": "#ffebee", "color": "#b71c1c", "bold": true } },
    { "when": { "type": "range", "min": 0, "max": 100, "maxExclusive": true },
      "style": { "bg": "#fff3e0" } },
    { "when": { "type": "enum", "values": ["Cancelled", "Rejected"] },
      "style": { "bg": "#eeeeee", "italic": true } },
    { "when": { "type": "compareColumn", "op": ">", "column": "budgetCol" },
      "style": { "bg": "#ffebee", "color": "#b71c1c" } },
    { "when": { "type": "isNull" },
      "style": { "italic": true, "color": "#9e9e9e" } }
  ]
}
```

**Rule types**:

| `type` | Operands | Comparison |
|---|---|---|
| `threshold` | `op`, `value` | Numeric (or date, if the column's `formatting.type` is `date`/`datetime`). Coerces both sides; rule misses if coercion fails — never falls through to a string compare. |
| `range` | `min`, `max`, `minExclusive?`, `maxExclusive?` | Numeric or date, same coercion rule. |
| `compareColumn` | `op`, `column` (another column's `id`) | Compares this cell's value to another column's value on the same row. |
| `enum` | `values[]` | Case-sensitive string equality on the trimmed cell value. |
| `isNull` / `isNotNull` | — | Tests the raw cell value before coercion. |

Operators: `>`, `>=`, `<`, `<=`, `=`, `!=`.

**`cascade`**: when `false` (default), first matching rule wins and evaluation stops. When `true`, every matching rule is merged on top of the previous one (later keys override earlier keys).

**Style object vocabulary** (deliberately small — no raw CSS strings):

| Key | CSS |
|---|---|
| `bg` | `background-color` |
| `color` | `color` |
| `bold` | `font-weight: 700` |
| `italic` | `font-style: italic` |
| `underline` | `text-decoration: underline` |
| `border` | `border` (shorthand, trusted string) |
| `align` | `text-align` (`start`/`center`/`end`) |

#### 15.5.1 `rowConditionalFormatting`

Same rule vocabulary, applied per row. Each rule must name the column to test via `when.column` (there is no implicit "this cell"). The winning style is applied to the whole row via AG Grid's `getRowStyle`.

```json
"rowConditionalFormatting": {
  "cascade": false,
  "rules": [
    { "when": { "type": "threshold", "column": "marginCol", "op": "<", "value": 0 },
      "style": { "bg": "#ffebee" } },
    { "when": { "type": "enum", "column": "statusCol", "values": ["Cancelled"] },
      "style": { "bg": "#fafafa", "italic": true } }
  ]
}
```

### 14.6 Complete Example

```json
{
  "tableOptions": {
    "pagination": false,
    "rowNumbers": true,
    "enableRowGroup": true,
    "grandTotalRow": "bottom"
  },
  "columnGroups": [
    { "id": "customerGroup",
      "headerArTitle": "بيانات العميل",
      "headerEnTitle": "Customer",
      "marryChildren": true }
  ],
  "columns": [
    { "id": "invoiceCode",  "field": "invoiceCode",
      "headerArTitle": "الفاتورة",   "headerEnTitle": "Invoice",
      "pinned": "left", "width": 120 },
    { "id": "valueDate",    "field": "valueDate",
      "headerArTitle": "التاريخ",    "headerEnTitle": "Date",
      "formatting": { "type": "date" }, "width": 110 },
    { "id": "customerName", "field": "customerName", "groupId": "customerGroup",
      "headerArTitle": "العميل",      "headerEnTitle": "Customer" },
    { "id": "branchName",   "field": "branchName",   "groupId": "customerGroup",
      "headerArTitle": "الفرع",       "headerEnTitle": "Branch" },
    { "id": "qty",          "field": "qty",
      "headerArTitle": "الكمية",      "headerEnTitle": "Qty",
      "formatting": { "type": "number", "decimals": 0 },
      "renderer":   { "type": "progress", "progress": { "min": 0, "max": 50 } },
      "aggFunc": "sum", "width": 140 },
    { "id": "netValue",     "field": "netValue",
      "headerArTitle": "الصافي",      "headerEnTitle": "Net",
      "formatting": { "type": "currency", "decimals": 2, "currencySymbol": "SAR" },
      "aggFunc": "sum",
      "conditionalFormatting": {
        "rules": [
          { "when": { "type": "threshold", "op": ">=", "value": 10000 },
            "style": { "bg": "#e8f5e9", "color": "#1b5e20", "bold": true } },
          { "when": { "type": "threshold", "op": "<", "value": 0 },
            "style": { "bg": "#ffebee", "color": "#b71c1c", "bold": true } }
        ] } },
    { "id": "tier",         "field": "tier",
      "headerArTitle": "الفئة",       "headerEnTitle": "Tier",
      "renderer": { "type": "badge", "badge": { "shape": "pill" } },
      "conditionalFormatting": {
        "rules": [
          { "when": { "type": "enum", "values": ["High"] },
            "style": { "bg": "#2e7d32", "color": "#ffffff" } },
          { "when": { "type": "enum", "values": ["Medium"] },
            "style": { "bg": "#f9a825", "color": "#ffffff" } },
          { "when": { "type": "enum", "values": ["Low"] },
            "style": { "bg": "#9e9e9e", "color": "#ffffff" } }
        ] } }
  ],
  "rowConditionalFormatting": {
    "rules": [
      { "when": { "type": "threshold", "column": "netValue", "op": ">=", "value": 50000 },
        "style": { "bg": "#fff8e1", "bold": true } }
    ]
  },
  "clickEmitMapping": [
    { "crossFilterCode": "customerFilter", "column": "customerName", "valueColumn": "customerName" }
  ]
}
```

### 14.7 Migration From `Table`

No automatic upgrade. Users opt in per widget:

1. Change the widget's `type` from `Table` to `EnhancedTable`.
2. Open the chart-config editor → **Table Columns** tab → click **Generate Columns From Result Set** to seed default columns from the SQL result-set headers.
3. Customize column formatting, renderers, conditional formatting as needed.

Existing `clickEmitMapping` / `drillDownMapping` / `linkMappings` in the widget's `chartConfigJSON` continue to work unchanged — the `column` field in those mappings matches the auto-generated column `id`s (which default to the SQL column name).
