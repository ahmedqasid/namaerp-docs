# Jasper Reports Complete Guide for Nama ERP

Every report and every printed form that Nama ERP produces is a JasperReports design: a layout file with a SQL query behind it and a set of prompts in front of it. This page is for the people who build and maintain those designs — the implementer who has to make a printed invoice match a customer's letterhead, and the support person who has to work out why the one on screen does not.

There are two ways to arrive at a report. The **Report Wizard** assembles the design for you out of a main table, a list of fields and a few grids; you never open the layout file. Or you draw the design yourself in **Jaspersoft Studio**, upload it, and take complete control of every band, every expression and every page. The wizard covers most everyday reporting; a hand-drawn design is what you reach for when the output has to look exactly one particular way. Both end up as the same kind of report definition, so almost everything below applies whichever route you took.

Wherever you see a Groovy expression on this page, the call comes from the report helper that Nama makes available inside every report. The full catalogue of those calls — names, dates, prices, links, security, QR codes, and the built-in `$P{}` parameters every report receives — lives on the [NamaRep expression reference](/platform/reports/reports-namarep-reference). This page explains the jobs; that page lists the calls.

## Where reports live

Everything to do with report definitions sits under **Administration → Reports**:

| Screen | What it holds |
|---|---|
| **Report Group** | The groupings that decide which menu a report appears under, and therefore who stumbles across it. |
| **Report Definition** | The report itself — the uploaded layout file, its code, its group, its subreports and its resources. This is where a hand-drawn design is registered so that users can run it. |
| **Report Wizard** | The build-it-for-me route: pick a table, pick fields, save, and a report definition is generated for you. |
| **Printing Form Wizard** | The same idea for printed forms rather than list-style reports. |
| **Data Source** | A reusable query block that a wizard report can pull extra columns from. |
| **Virtual Entity** | A saved SQL statement that behaves like a table — see [Virtual Entities](/platform/virtual-entity-guide). |
| **Report Style** | Named styles reports can share, instead of every design carrying its own fonts and borders. |
| **Custom Report Menu** | A hand-built menu of reports, for when the group-based menu is not the arrangement you want. |

If a user tells you a report is "missing", this is where to look first: the report usually exists, but its group puts it in a menu that user cannot see.

::: tip Building with the wizard instead
If you are not going to hand-draw the layout, start at the [Report Wizard Guide](/platform/reports/report-wizard-guide) — it walks through building a report from the screen, field by field. Come back here for the parts the wizard does not cover: parameters written by hand, subreports, page sizes, fonts and security constraints.
:::

## How a form knows which record to print

A report launched from a menu asks the user for everything it needs — a date range, a branch, a
customer. A printed form asks for nothing at all: the user already has the record open and has
pressed **Print**. Yet the query behind that form has no idea which sales invoice it is drawing, and
nothing in the layout tells it. The record's identity arrives from outside, in a single parameter,
and wiring that parameter is the one thing a hand-drawn form cannot get away without.

### A form printed from one record

Declare a parameter named `id`, and filter the main table on it:

```xml
<parameter name="id" class="java.lang.Object">
    <property name="entityType" value="SalesInvoice"/>
</parameter>
```

```sql
select inv.code, inv.valueDate, cust.name1
from SalesInvoice inv
    left join Customer cust on cust.id = inv.customer_id
where inv.id = $P{id}
```

That is the whole contract, and it is what every form shipped with the product does. The
`entityType` property names the kind of record the value refers to, exactly as it does on a
reference prompt.

::: warning A form receives exactly one value, and it is matched by position
A printed form never puts a prompt on screen — the user pressed Print on a record and that is the
end of the conversation. The single value it receives is the record's id, and Nama writes it into
the **first** parameter the design offers as a question. The name is not what decides: several forms
shipped with the product call this parameter `Id` or `ID` rather than `id` and print perfectly well.

So the id parameter should be the only open question in the design. Anything else the layout needs —
a value it computes, a flag it switches on — has to be closed off, or it will take the record id
instead and the form will draw the wrong record with nothing on screen to say why. Three things
close a parameter off, and any one of them is enough: `isForPrompting="false"` on the parameter, a
`<property name="ignore" value="true"/>` inside it, or a `src` property naming the parameter it
takes its value from. The
[built-in system parameters](/platform/reports/reports-namarep-reference#Built-in-system-parameters)
— `loginUserName1`, `loginLegalEntityLogo` and the rest — are recognised by their names and skipped
as well, so they can sit anywhere.
:::

### A form printed from a list screen

Set the definition's **Report Type** to **List** and the form is offered from the list screen
instead, where the user ticks several rows before pressing Print — see
[Printing a list instead of a record](/platform/reports/printed-form-selection#Printing-a-list-instead-of-a-record).

The form is now handed every selected record rather than one, so the same parameter arrives as a
**list of ids**. Both its declaration and the query that reads it have to change:

```xml
<parameter name="id" class="java.util.List">
    <property name="entityType" value="SalesInvoice"/>
</parameter>
```

```sql
where $X{IN, inv.id, id}
```

`$X{IN, column, parameter}` is Jasper's clause function for exactly this: it writes the
`in (?, ?, ?)` for you, with as many placeholders as the user happened to tick. You cannot write
that list by hand, because how many rows a user will select is not knowable when the design is
drawn.

The two routes also bind differently, which is worth knowing before you copy a working form: a list
print matches the parameter by **name**, wherever it sits in the design, and the name has to be
exactly `id`. The `Id` and `ID` spellings a single-record form happily tolerates receive nothing
here.

::: danger `= $P{id}` against a list fails
This is the commonest reason a form that prints perfectly from a record fails from the list screen.
`$P{}` binds a single value; a list of five ids has no single value to bind, so the query dies at the
database with a type error that says nothing about lists. Change the class to `java.util.List` **and**
the comparison to `$X{IN, …}` together — either change alone still breaks.
:::

::: tip The wizard flips both for you
**Print As List** on the [Printing Form Wizard](/platform/reports/printing-form-wizard-guide) is this
same switch. Left off, the generated form filters a single id; ticked, it generates a list parameter
and an `IN`. What it writes for the single-record case is `$X{EQUAL, column, parameter}` — the clause
function spelling of `column = $P{parameter}`. Either spelling is fine in a design you draw yourself.
:::

## Putting the company logo on a report

The logo is the first thing anyone asks for, and it needs no query and no configuration — the system hands it to every report that asks for it.

1. Declare a parameter named `loginLegalEntityLogo`, of type `java.lang.Object` or `java.io.InputStream`.
2. Add an image element to the layout.
3. Set the image expression to `$P{loginLegalEntityLogo}`.

That is all. When the report runs, the logo of the legal entity the user is logged into arrives in that parameter. Four more logos are available the same way — `loginLegalEntityLogo2` through `loginLegalEntityLogo5` — which is how installations that need a second mark, a quality certification or a franchise badge, get one onto the page.

Which legal entity supplies the logo when the document belongs to a different company from the user is decided in Global Configuration, on the [Reports and Printing](/platform/global-config/global-config-reports) tab.

### Any other image or attachment

For an image that is not the logo — a stamped signature stored against the record, a scanned certificate — fetch the attachment by its id and feed the result to the image element:

```groovy
NamaRep.getFile($F{attachmentId})
// or
NamaRep.getAttachment($F{attachmentId})
```

## Subreports and extra resources

A report can embed another report inside itself. That is how a delivery note prints its lines from one design and its terms and conditions from another, and how a statement prints a different summary block per branch.

Register the subreport on the report definition, then link it into the layout:

1. Give the subreport a **subreport id** on the report definition. It is free text — you choose it.
2. In the layout, declare a parameter with **exactly that name**.
3. Set the class of that parameter to `java.lang.Object`.
4. Use the parameter as the subreport expression.

::: warning Declare it as `java.lang.Object`, not `java.io.InputStream`
What the system places in that parameter is an already-compiled report, not the raw file. A parameter declared as `java.io.InputStream` fails at fill time with a type error that says nothing useful about the cause. Every report that ships with the product declares its subreport parameters as `java.lang.Object`.
:::

Extra resources — an image the layout uses, a file the design needs — work the same way: register the resource on the report definition, declare a parameter with the same name and the class `java.lang.Object`, and reference it where the design needs it.

## Asking the user for input: report parameters

Parameters are the prompts a user fills in before a report runs, and they are also the values the SQL query reads. A parameter is declared once in the layout and does both jobs.

### Multi-selection (list) parameters

Sometimes one value is not enough — the user wants five employees, or every branch except two. A parameter can accept a list:

1. Set the property `list = true`.
2. For anything that is not a reference to a record, also set `listType` (for example `java.util.Date`).
3. To print what the user chose, declare companion string parameters. The system fills them automatically:
   - `<parameterName>_csv` — the translated values, comma-separated
   - `<parameterName>_codecsv` — the codes
   - `<parameterName>_name1csv` — the Arabic names
   - `<parameterName>_name2csv` — the English names
4. `doNotAutoShowList = true` stops the chosen values being listed automatically on the report.
5. `listDisplayType` chooses the widget the user gets:
   - `Default` — the standard multi-selection input, used when the property is omitted
   - `Dropdown` — chosen values appear as removable chips inside the input, and the full option list opens in a searchable menu. The right choice when the value set is large
   - `Chips` — every allowed value is shown as a clickable chip, selection toggling on click. The right choice for a handful of options you want visible without opening anything

```xml
<parameter name="MultiEmployee" class="java.util.List">
    <property name="entityType" value="Employee"/>
    <property name="list" value="true"/>
    <property name="listDisplayType" value="Chips"/>
</parameter>
```

::: details A fuller example — two list parameters
```xml
<!-- A list of records -->
<parameter name="MultiEmployee" class="java.util.List">
    <property name="entityType" value="Employee"/>
    <property name="arabic" value="الموظفين"/>
    <property name="english" value="Employees"/>
    <property name="property" value="code"/>
    <property name="list" value="true"/>
    <property name="doNotAutoShowList" value="false"/>
</parameter>
<parameter name="MultiEmployee_csv" class="java.lang.String" isForPrompting="false"/>

<!-- A list of plain values -->
<parameter name="MultiDate" class="java.util.Date">
    <property name="english" value="Dates"/>
    <property name="arabic" value="التواريخ"/>
    <property name="defaultValue" value="$monthStart()"/>
    <property name="list" value="true"/>
    <property name="listType" value="java.util.Date"/>
</parameter>
<parameter name="MultiDate_csv" class="java.lang.String" isForPrompting="false"/>
```
:::

### Date Range Parameters

Two separate "From Date" and "To Date" prompts work perfectly well, but they take up two rows and nothing on screen tells the user the two belong together. `showAsDateRange` gives the user a single range picker while the query keeps the two real date parameters it needs.

Three parameters cooperate:

1. **A controller parameter** — a string, with `showAsDateRange = true`. This is what the user sees. It carries no value of its own.
2. **A "from date" parameter** with `isForPrompting="false"`, named by the controller's `fromDateId`.
3. **A "to date" parameter** with `isForPrompting="false"`, named by the controller's `toDateId`.

When the user picks a range, the chosen dates are written into the two underlying parameters. From the query's point of view nothing has changed — you still reference `$P{FromValueDate}` and `$P{ToValueDate}` exactly as you would any other date parameter.

```xml
<parameter name="FromValueDate" class="java.util.Date" isForPrompting="false">
    <property name="arabic" value="من التاريخ الفعلي"/>
    <property name="english" value="From Value Date"/>
</parameter>

<parameter name="ToValueDate" class="java.util.Date" isForPrompting="false">
    <property name="arabic" value="إلى التاريخ الفعلي"/>
    <property name="english" value="To Value Date"/>
</parameter>

<parameter name="ValueDate" class="java.lang.String">
    <property name="showAsDateRange" value="true"/>
    <property name="fromDateId" value="FromValueDate"/>
    <property name="toDateId" value="ToValueDate"/>
    <property name="arabic" value="التاريخ الفعلي"/>
    <property name="english" value="Value Date"/>
</parameter>
```

Then in the query:

```sql
WHERE valueDate >= $P{FromValueDate}
  AND valueDate <= $P{ToValueDate}
```

or with the between syntax:

```sql
where $X{[BETWEEN],valueDate,FromValueDate,ToValueDate}
```

Three things have to hold or the picker will not appear: the controller must be a `java.lang.String`, both date parameters must set `isForPrompting="false"` so they do not show up as separate prompts beside the picker, and `fromDateId` and `toDateId` must match the two parameter names exactly.

### Parameter properties reference

#### Basic properties

- **`list`** — `true`/`false`, enables multi-selection
- **`listType`** — required for anything that is not a reference (for example `java.util.Date`)
- **`listDisplayType`** — the widget a list parameter renders as: `Default`, `Dropdown` or `Chips`
- **`showAsDateRange`** — `true`/`false`, renders a string parameter as a unified range picker; used with `fromDateId` and `toDateId`. See [Date Range Parameters](#Date-Range-Parameters)
- **`fromDateId`** / **`toDateId`** — the names of the two underlying date parameters when `showAsDateRange` is on
- **`layout`** — how the prompt is laid out: `alone`, `spanned`, `normal`, `spanned2`
- **`required`** — `true`/`false`, makes the prompt mandatory
- **`requiredGroup`** — groups parameters so at least one of them must be filled
- **`hijri`** — `true`/`false`, prompts for a Hijri date
- **`nama-id`** — an internal identifier used by the Report Wizard; you do not set it by hand

#### Suggestions for text fields

- **`suggestionquery`** — a SQL query feeding an autocomplete. Two columns means code plus an Arabic display; three columns means code, Arabic, English.

```sql
SELECT DISTINCT TOP 25 revisionId, revisionName
FROM ItemRevision
WHERE invItem_id = {fItem}
  AND (revisionId LIKE '%' + {revision} + '%'
       OR revisionName LIKE '%' + {revision} + '%')
```

#### Choosing a record

- **`entityType`** — what the user picks from
- **`property`** — which field of the chosen record reaches the query: `code`, `name1`, `name2`, `startDate`

#### Drop-down lists

- **`enumType`** — the option set to offer
- **`allowedValues`** — a comma-separated list of allowed values, rendered as a drop-down
- **`allowedValuesAr`** / **`allowedValuesEn`** — the Arabic and English labels for those values, comma-separated, in the same order

```xml
<parameter name="entityType" class="java.lang.String">
    <property name="enumType" value="EntityTypeDF"/>
    <property name="allowedValues" value="Employee,Supplier"/>
    <property name="allowedValuesAr" value="موظف,مورد"/>
    <property name="allowedValuesEn" value="Employee,Supplier"/>
</parameter>
```

#### Narrowing what the user may choose

- **`filter`** — `field,operator,value[,relation]`. Several filters are separated by semicolons, the default relation is `AND`, and `${parameterId}` refers to another parameter, so one prompt can narrow another.

Operators:

```
Equal, EqualOrEmpty, NotEqual, NotEqualOrEmpty,
GreaterThan, GreaterThanOrEmpty, GreaterThanOrEqual, GreaterThanOrEqualOrEmpty,
LessThan, LessThanOrEmpty, LessThanOrEqual, LessThanOrEqualOrEmpty,
StartsWith, StartsWithOrEmpty, NotStartsWith, NotStartsWithOrEmpty,
EndsWith, EndsWithOrEmpty, NotEndWith, NotEndWithOrEmpty,
Contains, ContainsOrEmpty, NotContain, NotContainOrEmpty,
OpenBracket, CloseBracket, In
```

```
forType,Equal,Department,AND;isLeaf,Equal,true
documentType,Equal,ReceiptVoucher
forType,Equal,${subsidiaryType}
```

#### Default values

- **`defaultValue`** — a string, read according to the type of the parameter: a date as `dd-MM-yyyy`, a time as `yyyy-MM-dd'T'HH:mm:ss.SSS`, a reference as `id:entityType:code`.

::: details Dynamic default functions
```
$now()                  $today()
$monthStart()           $monthEnd()
$yearStart()            $yearEnd()
$quarterStart()         $quarterEnd()
$thirdStart()           $thirdEnd()
$halveStart()           $halveEnd()
$previousMonthStart()   $previousMonthEnd()
$nextMonthStart()       $nextMonthEnd()
$previousYearStart()    $previousYearEnd()
$nextYearStart()        $nextYearEnd()
$currentFiscalPeriod()  $currentUser()
$currentEmployee()
$todayPlusDays(n)       $todayPlusWeeks(n)
$todayPlusMonths(n)     $todayPlusYears(n)
```
:::

These functions belong to `defaultValue` and nowhere else. `$currentUser()` in particular fills in a default — it is not a value you can read with `$P{}` from inside the report.

For a multi-value default, separate the values with `@A=@X`:

```
id:entityType:code@A=@Xid:entityType:code@A=@X...
```

#### Showing, hiding and validating

- **`NamaRep.canDisplay($P{param})`** — use it in a `printWhenExpression` so an element disappears for users who are not allowed to see that parameter's subject
- **`no-mirror = true`** — keeps an element from being mirrored in right-to-left layouts
- **`fromParam`** — links a "to" parameter back to its "from" parameter
- **`fromParamMaxGapInDays`** — the widest span the user may request between the two

```xml
<parameter name="toDate" class="java.util.Date">
    <property name="arabic" value="إلى تاريخ"/>
    <property name="english" value="To Date"/>
    <property name="fromParam" value="fromDate"/>
    <property name="fromParamMaxGapInDays" value="30"/>
</parameter>
```

#### Labels and the rest

- **`arabic`** / **`english`** — the prompt labels
- **`resource`** — a translation key, when the label should come from the translation files instead
- **`src`** — reuse a property already defined on another parameter
- **`ignore`** — keep the parameter out of the prompt entirely
- **`type`** — special null handling, or the comparison type to use for date comparisons with `>` and `<`

## Limiting what each user sees

A report that queries the database directly bypasses every permission the user has, unless you put those permissions back into the query yourself. That is what security constraints are for: a hidden parameter whose value is a SQL fragment describing what this particular user is allowed to see, spliced into your `WHERE` clause.

Say you want an account report filtered by who created each record, by view and edit permissions, and by the legal entity, sector, branch or any other dimension on the account.

#### 1. Declare a hidden SECURITY_CONSTRAINTS parameter

Create a `String` parameter marked **Not For Prompting**, with this default value expression:

```groovy
NamaRep.security()
  .fieldEntityType("Account")
  .tableAlias("acc")
  .capabilities("firstAuthor", "viewCapability", "usageCapability",
                "updateCapability", "legalEntity", "branch",
                "sector", "department", "analysisSet")
```

- `.fieldEntityType("Account")` — which kind of record is being filtered
- `.tableAlias("acc")` — the alias that record's table carries in your query
- `.capabilities(...)` — what to filter on. `firstAuthor` restricts to records the user created; `viewCapability`, `updateCapability` and `usageCapability` apply the matching permissions; `legalEntity`, `branch`, `sector`, `department` and `analysisSet` apply the organisational dimensions

#### 2. Splice it into the query

The parameter holds raw SQL, so it goes in with `$P!{}` — the exclamation mark is what tells Jasper to paste the text rather than bind it as a value:

```sql
SELECT a, b, c
FROM Account acc
LEFT JOIN Table2 t2 ON t2.id = acc.someId
WHERE acc.code <> 'abc'
  AND $P!{SECURITY_CONSTRAINTS}
```

#### 3. More than one table

Build one fragment per table and join them with `AND`:

```groovy
NamaRep.security()
  .fieldEntityType("Account")
  .tableAlias("Account")
  .capabilities("firstAuthor", "viewCapability")
+ " AND " +
NamaRep.security()
  .fieldEntityType("FiscalYear")
  .tableAlias("FiscalYear")
  .capabilities("legalEntity", "branch", "sector")
```

::: tip You declare it — it is not automatic
Nothing injects the security parameter into a hand-drawn report for you. A report without it shows every row the query returns, to everybody who can run the report. Reports built by the Report Wizard get the same filtering applied for them behind the scenes.
:::

## Sharing a report with someone who has no login

A report link normally requires the recipient to log in. For a customer receiving an invoice by e-mail that is no good, so a report link can be turned into one that needs no authentication:

```groovy
NamaRep.repLinkByCode($P{REPORT_PARAMETERS_MAP}, "ARG000046-report")
  .p("Code_Equals").ref($F{entityType}, $F{id})
  .toNoAuthResultLink()
```

The builder behind this — passing parameters, passing references, copying the current report's parameters across — is documented on the [NamaRep expression reference](/platform/reports/reports-namarep-reference).

::: tip Publishing a printed form for customers to fetch themselves
A public link only helps if you have somewhere to send it. Nominate the printed form the public link should render in [Fields and Entities Settings](/platform/fields-and-entities-settings/fields-settings-integrations) — that is where you say which layout a public invoice link opens, so a customer following a link from an e-mail or a QR code downloads exactly the form you intended, without an account.
:::

## Mixing page sizes in one printed document

A single report design has a single page size. When one document genuinely needs two — an A4 cover sheet followed by a wide A3 schedule — the answer is a **Book Report**: a shell whose content is a sequence of parts, each part a report of its own with its own page size.

1. Start with a main report of type **Book Report**.
2. Give it a simple SQL query returning whatever fields the parts need in order to decide between themselves.
3. Use **Add Part to Content** to add each subreport as a part.
4. Give each part a **Print When Expression** so only the parts that apply to this document print.
5. Declare the parameters the parts need and pass them down to each part.

A typical result is a two-part template — one part A4, one A3 — chosen by a condition on the notes field of the document, with each part free to contain subreports of its own.

## Fonts and Arabic PDF output

Nama ERP ships with **Times New Roman** registered for Arabic text, and that is what a report gets unless you say otherwise. To use anything else — Cairo, Amiri, Droid Arabic Naskh — the font has to be packaged and installed on the server, because the PDF has to carry the font with it.

There is also [a video walking through these steps](https://youtu.be/n08xmWekB1s).

### 1. Add the font in Jaspersoft Studio

Open **Jaspersoft Studio**, go to `Window > Preferences`, then `Jaspersoft Studio > Fonts`, and click **Add**.

### 2. Configure the font

In the **Font Family** dialog:

- Choose the `.ttf` or `.otf` file, or files
- Tick **Embed this font in PDF documents**
- Set **PDF Encoding** to `Identity-H`

![Jasper Reports Font Family Dialog for Arabic Fonts](../../ar/platform/reports/images/jasper-reports-font-family.png)

Then click **Finish**.

### 3. Export the font as a JAR

With the font added, click **Export** and save the generated `.jar` file.

### 4. Deploy the JAR

Copy the exported `.jar` into the `tomcat/lib` folder and restart the **Tomcat** service. Until the restart, reports asking for the new font fall back to whatever is already installed.

::: tip Fonts on POS machines
POS terminals render their own receipts, so the font has to reach them too. Upload the same JAR to the **Jasper Fonts** field on the **Pos UI Settings** screen (**إعدادات واجهة نقاط البيع الجديده**).

The upload does not push the font anywhere by itself: each POS machine collects it on its next master-data sync, writes it into its own `jasper-fonts-extension` folder, and starts using it straight away — or at the next launcher restart, if the existing file is in use. So after upgrading POS machines to a version that supports the font extension, re-save the Pos UI Settings record to give them something to pick up, then allow a sync cycle before checking a terminal.
:::

### 5. Use the font

Assign the new font family to the text elements in the layout. The font is embedded in the PDF, so Arabic renders correctly wherever the file is opened.

## How long a report is allowed to run

A report that never finishes holds a database connection open, and in quantity that makes the system unresponsive for everyone else. The guard against it is a time limit on the query: **Max Seconds To Execute Report Queries** in Global Configuration, under [Performance and Search](/platform/global-config/global-config-performance). A report query that exceeds the limit is stopped by the database, and the user gets an error instead of an endless wait.

It is normally set more generously than the other query limits, because a month-end report legitimately takes minutes. If reports start timing out after a change, that setting is the first thing to check; if the server is struggling under report load, tightening it is the safe lever.

You can also record how long each report took, and with which parameters, by turning on report performance logging — the options are on the [Reports and Printing](/platform/global-config/global-config-reports) tab. That log is what turns "the report is slow" into "the report is slow for one particular set of parameters".

## Writing expressions

Everything you can call from inside a report expression — names and translations, Hijri dates, number-to-words, price lookups, links back into the system, record creators, approval links, QR codes, and the complete list of built-in `$P{}` parameters — is catalogued on the [NamaRep expression reference](/platform/reports/reports-namarep-reference).
