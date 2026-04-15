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
  "linkMappings": [ ]
}
```

| Key | Required | Description |
|---|---|---|
| `echartOption` | Yes | A standard ECharts option object with `$DATA.*` placeholders. The server resolves these placeholders using query results before sending to the frontend. |
| `dataMapping` | Yes | Tells the server how to transform SQL result rows into the `$DATA.*` values that replace the placeholders. |
| `clickEmitMapping` | No | Defines which cross-filters this widget emits when the user clicks a data point. |
| `clickAction` | No | Configures what a left-click on a data point does: emit cross-filters, navigate via link, or trigger drill-down. Defaults to cross-filter emission if absent. See Section 5a. |
| `drillDownMapping` | No | Defines which target widgets or dashboards appear in the right-click drill-down menu, and what filter values to pass to them. |
| `linkMappings` | No | Defines link navigation targets that appear in the right-click context menu under "Navigate To". See Section 5c. |

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
| `yAxisIndex` | No | Which Y-axis this series binds to (for dual-axis charts). Default `0`. |

**Produces these `$DATA` placeholders:**

| Placeholder | Type | Description |
|---|---|---|
| `$DATA.categories` | `string[]` | Values from `categoryColumn`, one per row |
| `$DATA.series` | `object[]` | Array of `{name, type, data}` objects |
| `$DATA.series[0].name` | `string` | Name of first series |
| `$DATA.series[0].data` | `number[]` | Numeric values of first series |
| `$DATA.series[N].name` | `string` | Name of Nth series |
| `$DATA.series[N].data` | `number[]` | Numeric values of Nth series |

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
| `$DATA.series` | `object[]` | One series per unique label. Each has `name`, `type`, `data`. Data arrays are aligned to categories (missing values are `0`). |

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

For treemap charts. Each row becomes a node.

**Required fields:**
- `type`: `"Tree"`
- `labelColumn`: column for node label
- `valueColumn`: column for node value

**Produces:**

| Placeholder | Type | Description |
|---|---|---|
| `$DATA.rows` | `string[][]` | All rows as string arrays |
| `$DATA.columns` | `string[]` | Column headers |

### 3.8 Custom / Raw

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

**Rules:**
- For **Reference** type cross-filters: provide `idColumn` (required for the filter to work), plus `codeColumn`/`name1Column`/`name2Column` for display. The `entityType` is needed for binary(16) ID coercion.
- For **scalar** type cross-filters (Date, Integer, Decimal, Text): provide `valueColumn`.
- Multiple entries in the array mean the widget emits multiple cross-filters from a single click.
- The columns referenced here must exist in the widget's SQL query.

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
| `filters` | Yes | Array of filter definitions (same structure as `clickEmitMapping` entries) |

**Each filter entry** has the same fields as `clickEmitMapping` (crossFilterCode, idColumn, codeColumn, name1Column, name2Column, entityType, entityTypeColumn, valueColumn).

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

## 5a. clickAction — Controlling Left-Click Behavior

By default, clicking a data point on a chart emits cross-filters (the values defined in `clickEmitMapping`). The `clickAction` object lets you override that behavior so a left-click can instead navigate to a link or trigger a drill-down target directly — no right-click menu needed.

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

::: warning
If `clickAction` is absent, the widget falls back to cross-filter emission — exactly the same behavior as before this feature was introduced. Existing configurations do not need any changes.
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

::: tip
The `labelColumn` field is a small touch that makes a big difference in usability. Instead of a generic "Open Customer" menu item, the user sees "Open Customer 'ABC Trading'" — they know exactly where the link will take them before they click.
:::

**Example — left-click navigates to a customer entity:**

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

Here, left-clicking a data point opens the customer's edit form in a popup dialog. The same link also appears in the right-click context menu under "Navigate To".

---

## 5c. Context Menu Structure

With `linkMappings`, `drillDownMapping`, and dimension drill-by all configured, the right-click context menu on a data point looks like this:

```
Source Label: "Series / Category"
─────────────────────────────
Navigate To:                          ← from linkMappings
  ├─ Open Customer "ABC Trading"
  ├─ Open Website
─────────────────────────────
Open In:                              ← from drillDownMapping
  ├─ Sales Details (widget)
  ├─ Regional Dashboard (dashboard)
─────────────────────────────
Drill Down By:                        ← from dimension drill-by
  ├─ By Month
```

Each section only appears if the corresponding mapping is defined. A widget with no `linkMappings` and no `drillDownMapping` will only show the "Drill Down By" section (if dimension drill-by fields exist in the wizard), or no context menu at all.

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

The format metadata is injected into the echartOption as `_formatMeta.seriesFormats` (keyed by series index). The frontend's `EChartWidget` reads this to apply formatting to tooltips and axis labels.

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

## 9. Nama ERP Extended ECharts Properties

The server injects several non-standard properties into the `echartOption` object. These are prefixed with `_` and consumed by the frontend's `EChartWidget` component. AI tools generating `echartOption` JSON should **not** include these — they are added automatically.

| Property | Purpose |
|---|---|
| `_clickEmitData` | Pre-built cross-filter emission points (from `clickEmitMapping`) |
| `_clickAction` | Click action configuration (from `clickAction`) — tells the frontend what to do on left-click |
| `_formatMeta` | Number format metadata per series (from `format` specs in dataMapping) |
| `_drillDownData` | Resolved drill-down targets and filter metadata (from `drillDownMapping`) |
| `_drillDownByData` | Dimension drill-by metadata (from wizard field definitions) |
| `_linkData` | Resolved link navigation targets and per-point link values (from `linkMappings`) |

---

## 10. Widget Types

| Type | Rendering | chartConfigJSON needed? |
|---|---|---|
| `EChart` | ECharts chart (uses echartOption + dataMapping) | Yes |
| `Table` | AG Grid table (columns from SQL, rows from data) | No |
| `PieChart`, `ColumnWithRotatedLabels`, etc. | Legacy Highcharts types (auto-translated to ECharts server-side) | No |

For `Table` widgets, the SQL column names become the grid column headers. No `chartConfigJSON` is needed — just provide the `dataSource` SQL and `crossFilterBindings`.

---

## 11. Bulk Import JSON Format

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

Wizards define data sources using field IDs rather than raw SQL. The system generates SQL from the wizard definition. This is an alternative to writing raw SQL in `dataSource`.

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

## 12. Complete Example — Sales Dashboard

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

## 13. Quick Reference — Common Patterns

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
