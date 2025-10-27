
# Tempo Language Manual

This guide introduces the **Tempo language**, developed by the **NAMA team**, to help implementers create dynamic messages for **customers**, **employees**, and **suppliers**. Tempo is used in various outputs such as **notifications**, **emails**, **SMS messages**, and **validation error messages**.

## What is Tempo?

Tempo lets you embed dynamic values in text templates. For example, to display an error message stating that an employee cannot take more than five days of vacation, you can include the employee’s name dynamically:

```tempo
Employee {employee.name1} cannot take more than five days of vacation.
```

If you want to include a hyperlink to the employee record:

```tempo
{link(employee)}
```

---

## How to Discover Field Names

To find field names in any screen:

1. Press `CTRL + ALT + I`
2. Right-click on any field to see its **internal ID**, **table name**, and **column name**

---

## Using the Tempo Web Editor

NAMA provides a web-based editor for writing and testing Tempo syntax:

* It supports **auto-completion** with `Ctrl + Space`
* It checks **syntax** as you write

👉 Try it here: [Tempo Editor](https://www.namasoft.com/tempo.html)
![Tempo Editor](images/tempo-editor.png)

---

## When to Use Tempo

Tempo can be used in two major contexts:

::: tip Two Usage Modes

1. **Query Results**
   Used in dashboards, notifications by query, or validation messages where a query is involved.

2. **Record Rendering**
   Used in entity-based messages (e.g., approvals, flows) to directly access record fields.

**Key Difference**:
Only in record mode can you access nested fields (e.g., `customer.group.code`). In query result mode, such navigation won't work as expected.
:::

---

## Tempo Syntax Overview

### 1. Accessing Record Fields

* Use `{fieldName}` to show a field from the current record:

```tempo
This Employee's Arabic name is {name1}
```

* For related records (e.g., employee in a vacation request):

```tempo
This Employee's Arabic name is {employee.name1}
```

* For indirect references (e.g., employee in a `subsidiary` field):

```tempo
This Employee's Arabic name is {subsidiary.$toReal.name1}
```

---

### 2. Writing Comments

To add comments in your Tempo code:

```tempo
{comment} This was written by Khaled {endcomment}
```

---

### 3. Disabling Tempo Parsing

If you want to prevent the whole template or part of it from being parsed:

```html
<notempo/>
```

---

### 4. Parsing a Field as Tempo Template

To parse the content of a field (e.g., remarks) as a Tempo template:

```tempo
{tempo}{customer.remarks}{endtempo}
```

---

### 5. Escaping Curly Brackets

If you need to show `{code}` literally without rendering:

```tempo
\{code\}
```

---

### 6. CSS-Friendly Brackets

To avoid issues when working with HTML/CSS, enable CSS-friendly brackets:

```html
<useCSSFriendlyBrackets/>
```

Now you can write:

```tempo
%{code}%
```

Instead of:

```tempo
{code}
```

---

### 7. Handling Editor Errors

Sometimes the Tempo editor incorrectly flags correct syntax. You can prefix such expressions with `#` to ignore the error:

Incorrect (editor shows error):

```tempo
{time.$hours}
```

Corrected:

```tempo
{#time.$hours}
```

---

### 8. Creating Line Breaks

Use `{enter}` to insert a line break in HTML messages:

```tempo
Line 1{enter}
Line 2
```

## Creating Hyperlinks in Tempo

### 1. Link to a Field or Record

You can generate clickable links for fields or records using two approaches:

#### **Method 1: Basic Link (Displays Field as Link)**

Use the `link()` function to make the field itself a hyperlink:

```tempo
{link(targetField)}
```

**Example:**
To create a link for the customer record:

```tempo
{link(customer)}
```

---

#### **Method 2: Titled Link (Custom Text as Link)**

Use `titledlink()` with custom link content:

```tempo
{titledlink(targetField)} Your custom link text {endlink}
```

**Example:**
To show a customer link with the title “Current Customer code is ABC”:

```tempo
{titledlink(customer)} Current Customer code is {code} {endlink}
```

---

### 2. Relative Links for Web Notifications

When creating links for notifications (not emails), use relative paths for optimal behavior:

#### **Use `{shortlinks}` or `{directlinks}`**

* `{shortlinks}`: Generates relative links based on the current web page
* `{directlinks}`: Also generates relative links but allows for more direct access

> ⚠️ These are **not** suitable for email messages.

**Example 1 – Using `{shortlinks}`**:

```tempo
{shortlinks}
The user {#firstAuthor.name2} created the document {#code}
```

**Example 2 – Using `{directlinks}`**:

```tempo
{directlinks}
The user {#firstAuthor.name2} created the document {link($this)}
```

---

### 3. Linking from Query Results

If you're sending a notification based on a query:

```tempo
{titledlink(entityType, id)} {code} {endlink}
```

This links to the record identified by `entityType` and `id`, using the record's code as the visible title.

---

### 4. Open Record in Specific Menu or View

You can customize how a link opens by specifying additional parameters:

```tempo
{link(record, menu="MenuCode", newindow="true or false", view="ViewName")}
```

Or with a custom title:

```tempo
{titledlink(record, menu="MenuCode", newindow="true or false", view="ViewName")}
Link Content Here
{endlink}
```

**Example:**
Open an employee record in a new window via a specific menu and view:

```tempo
{link(employee, menu="NewEmp", newindow="true", view="NewEmpsView")}
```

With a title:

```tempo
{titledlink(employee, menu="NewEmp", newindow="true", view="NewEmpsView")}
Employee code {code}, Name {name1}
{endlink}
```

---

### 5. Using a Specific Base URL for All Links

To force all links to use a certain server address, use the `{appurl()}` tag at the **start** of the template:

```tempo
{appurl("http://crm7.namasoft.com:8080/erp/")}
```

This ensures that all subsequent links are based on the provided URL.

## Using Loops in Tempo

### Looping Through Repeated Data (e.g. Document Details)

To display a list of repeated rows (like items in a document), use the `loop` block:

```tempo
{loop(details)}
  Loop content here
{endloop}
```

**Example:**
Display each item's code, Arabic name, quantity, and net value in a sales invoice:

```tempo
{loop(details)}
{@rownumber} - {#details.item.item.code} - {#details.item.item.name2} - {#details.quantity.quantity.primeQty.value} - {#details.price.netValue}
{endloop}
```

---

### Loop Variants

#### 1. **Last Line Only**

Loop through just the last row:

```tempo
{loop(details, last)}
  Last line content
{endloop}
```

---

#### 2. **Range of Lines**

Loop through a specific range of line numbers:

```tempo
{loop(details, 2, 3)}
  From line 2 to 3
{endloop}
```

---

#### 3. **From Specific Line to End**

Loop from a starting line to the last line:

```tempo
{loop(details, 5)}
```

> This is equivalent to:

```tempo
{loop(details, 5, last)}
```

---

### Manual Counters

You can define and control your own counters for custom row numbering and referencing:

#### Counter Syntax

```tempo
{incrementcounter(counterName)}
{decrementcounter(counterName)}
{countervalue(counterName)}
```

#### Use in Quick Creators

To use the counter in a row expression:

```tempo
{r(@@counterName)}
```

---

### Full Example: Creating Stock Transfer from MnOrder

This example demonstrates:

* A loop over `spareParts`
* Skipping rows where `spareParts.n1` is true
* Using a manual counter `c1`
* Populating a stock transfer creation form

```tempo
{creator(entity="StockTransfer", menu="StockTransDocumentsStockTransferReq", title="Create StockTransferReq", newwindow="true")}

{f("book")}{v("STR01")}
{f("term")}{v("STR02")}
{f("branch")}{v("MS")}
{f("warehouse")}{v("W001")}
{f("toWarehouse")}{v(spareParts.warehouse.code)}
{f("toLocator")}{v(spareParts.location.code)}

{loop(spareParts)}
  {ifnot(spareParts.n1)}
    {incrementcounter(c1)}
    {f("details.item.item")}{v(spareParts.sparePart.code)}{r(@@c1)}
    {f("details.quantity.quantity.primeQty.value")}{v(spareParts.quantity)}{r(@@c1)}
    {f("details.quantity.quantity.primeQty.uom")}{v(spareParts.uom.code)}{r(@@c1)}
    {f("details.specificDimensions.warehouse")}{v("W001")}{r(@@c1)}
    {f("details.toWarehouse")}{v(spareParts.warehouse.code)}{r(@@c1)}
    {f("details.toLocator")}{v(spareParts.location.code)}{r(@@c1)}
  {endif}
{endloop}

{endcreator}
```

### Example 2: Creating Stock Transfer Request from SalesOrder if totalUnsatisfiedQty field is not zero 

This example demonstrates using if statements.

```tempo
{if(totalUnsatisfiedQty)}
   {creator(entity="StockTransferReq")}
      {f("book")}{v("STR01")}
      {f("term")}{v("STR02")}
      {f("fromDoc#type")}{v(entityType)}
      {f("fromDoc#code")}{v(code)}
   {endcreator}
{endif}
```

## Using Tempo in Approval Notification Templates

### 1. Displaying Approval-Related Lines

To inform users about specific lines affected by an approval rule (e.g., prices below a threshold), use a `loop` over the approval rule lines:

```tempo
The lines that are below the default sales price:
{loop($map.approvalRuleLines)}
  {link($map.approvalRuleLines.item.item)} - {$map.approvalRuleLines.price.unitPrice}
{endloop}
```

This will list each line with a link to the item and display the unit price.

---

### 2. Adding Approval Action Links

To include action buttons in your email or SMS templates for approval workflows, use the following placeholders:

```tempo
{approvelink}
{rejectlink}
{returnlink}
{escalatelink}
```

::: tip

* These action links are mainly used in **email or SMS templates** defined within an **approval rule**.
* It's common to include multiple action links together in a message (e.g., Approve, Reject, Return).
:::

## Creating Tables in Tempo

Tempo allows you to format tabular data using special syntax blocks. This is useful for presenting structured data like document lines, grouped totals, or summaries in a clean format.

---

### 1. Basic Table Structure

To create a table, wrap your content between `{opentable}` and `{closetable}` tags.

#### **Example – Table of Sales Invoice Details**

```tempo
{opentable}
  {row}{cell}#{cell}Item Code{cell}Item Name{cell}Quantity{cell}Net Value{endrow}
  {loop(details)}
    {row}
      {cell}{@rownumber}
      {cell}{#details.item.item.code}
      {cell}{#details.item.item.name2}
      {cell}{#details.quantity.quantity.primeQty.value}
      {cell}{#details.price.netValue}
    {endrow}
  {endloop}
{closetable}
```

::: tip
`{@rownumber}` represents the line number and corresponds to the `#` symbol in the header.
:::

---

### 2. Rows and Cells

#### Drawing Rows

Use `{row}` and `{endrow}` to define a table row.

**Example – Table Header Row:**

```tempo
{row}{cell}#{cell}Item Code{cell}Item Name{cell}Quantity{cell}Net Value{endrow}
```

#### Drawing Cells

Use `{cell}` to create table cells. You may optionally close each cell with `{endcell}`.

**Example:**

```tempo
{cell}Item Name{endcell}
```

::: tip
The `{endcell}` tag is optional and can be omitted for simplicity.
:::

---

### 3. Grouping Data in Tables

Tempo supports grouping rows with headers and footers using the following syntax:

#### Group Header

```tempo
{header(groupingField)}
  Header content here
{endheader}
```

#### Group Footer

```tempo
{footer(groupingField)}
  Footer content here
{endfooter}
```

#### **Example – Grouped Table by Item Code**

```tempo
{loop(details)}
  {header(details.item.item.code)}
    Item: {#details.item.item.code}
    {opentable}
      {row}{cell}Quantity{cell}Price{endrow}
  {endheader}

  {row}
    {cell}{#details.quantity.quantity.primeQty.value}
    {cell}{#details.price.unitPrice}
  {endrow}

  {footer(details.item.item.code)}
    {closetable}
  {endfooter}
{endloop}
```

In this example:

* A new table is created for each unique `item.code`
* The table opens in the header and closes in the footer
* Individual item rows are inserted within the loop

## Functions Available in Tempo

### Accessing Current User Data

Use the following syntax to get properties of the currently logged-in user:

```tempo
{$user.PROPERTY_NAME}
```

**Example:**

```tempo
{$user.code}
```

---

## Date and Time Functions

### General Date Formatting

```tempo
{formatDate(dateExpression, formatExpression)}
```

**Example:**

```tempo
{formatDate(valueDate, "yyyy-MM-dd")}
```

---

### Record Metadata

* Creation date and time: `{$creationDate}`
* Creation date only: `{$creationDate.$toDate}`
* Current date: `{$today}`
* Current date and time: `{$now}`

---

### Navigating Dates

* Next month: `{date.$nextMonth}`
* Previous month: `{date.$previousMonth}`
* Next day: `{valueDate.$nextDay}`
* Previous day: `{valueDate.$previousDay}`
* Next year: `{valueDate.$nextYear}`
* Previous year: `{valueDate.$previousYear}`
* Start of month: `{valueDate.$monthStart}`
* End of month: `{valueDate.$monthEnd}`

---

### Extracting Parts of a Date

* Day: `{valueDate.day}`
* Month: `{valueDate.month}`
* Year: `{valueDate.year}`

---

### Day Name

* Arabic: `{valueDate.$arDayName}`
* English: `{valueDate.$enDayName}`
* Based on current language: `{valueDate.$dayName}`

---

### Hijri and String Formats

* Hijri date: `{valueDate.$asHijriString}`
* `DD_MM_YYYY`: `{valueDate.$toStringDD_MM_YYYY}`
* `YYYYMMDD`: `{valueDate.$toStringYYYYMMDD}`

---

### Record Creation Time

* Time only: `{$creationDate.$toTime.$toStringNormal}`

::: tip
`$toStringNormal` converts time to a readable format like `12:50:10`
:::

---

### Time Field Functions (Record Mode)

::: tip
Assume the field is called `time`
:::

* Hour: `{time.$hours}`
* Minute: `{time.$minutesOfHour}`
* Second: `{time.$secondsOfMinute}`
* Millisecond: `{time.$millisOfSecond}`

---

### Time Field Functions (Query Mode)

To format a time field from a query:

```tempo
{time(timeField)}
```

**Example:**

```tempo
{time(fromTime)}
```

Or use:

```tempo
{fromTime.$toStringNormal}
```

For total hours stored as a decimal:

```tempo
{decimalToTime(decimalField)}
```

---

## Array and Text Utilities

### Accessing Array Elements

```tempo
{details.$get(index)}
```

::: tip
Index is zero-based. To get the first row in `details`, use `{details.$get(0)}`
:::

---

### Text Utilities

* Remove all spaces:

```tempo
{description1.$removeAllSpaces}
```

* Normalize Arabic text (unify similar characters):

```tempo
{description1.$normalizeAr}
```

**Example:**

```
منى ذهبت إلى المدرسة مع فؤاد
```

Becomes:

```
مني ذهبت الي المدرسه مع فواد
```
### Translations in Tempo

#### Translating Enumeration Fields

* Arabic translation:

```tempo
{#orderStatus.$arabic}
```

* English translation:

```tempo
{#orderStatus.$english}
```

* Auto-translate based on language settings:

```tempo
{translate(orderStatus)}
```

* Force Arabic translation:

```tempo
{translateAr(orderStatus)}
```

* Force English translation:

```tempo
{translateEn(orderStatus)}
```

**Example:**

```tempo
{translate(orderStatus)}
```

This translates the `orderStatus` value to the other language (Arabic ↔ English).

::: tip
You can also use `{orderStatus.$english}` or `{orderStatus.$arabic}` directly.
:::

---

### Number-Related Functions in Tempo

#### Convert Text to Number (if possible)

* Convert to integer:

```tempo
{#description1.$tryToInt}
```

* Convert to decimal:

```tempo
{#description1.$tryToDecimal}
```

---

### Formatting Dates and Numbers

Use the `$format` function on dates or numbers with your desired pattern:

```tempo
{creationDate.$format."yyyy-MM-dd HH:mm:ss"}
{money.total.$format."###,###.00"}
```
## If Statements (Conditionals) in Tempo

Tempo provides flexible conditional logic using `{if}`, `{ifnot}`, and related syntax to control when content is rendered.

---

### Basic Conditions

* **If a field is not empty**:

```tempo
{if(code)}Content shown if `code` is not empty{endif}
```

* **If a number is not zero**:

```tempo
{if(money.remaining)}Remaining is {#money.remaining}{endif}
```

* **If a boolean is true**:

```tempo
{if(commitedBefore)}Record is committed before{endif}
```

* **Negated if condition** (if the field is empty or false):

```tempo
{ifnot(code)}Code is missing{endif}
{if!(code)}Code is missing{endif}
```

* **If a string represents a number that’s not zero**:

```tempo
{ifnumber(description1)}
```

---

### Full Syntax Reference

| Syntax                                | Description                     |
| ------------------------------------- | ------------------------------- |
| `{if(value)}`                         | Renders if `value` is not empty |
| `{if!(value)}`, `{ifnot(value)}`      | Renders if `value` is empty     |
| `{if=(a,b)}`, `{ifequal(a,b)}`        | Renders if `a == b`             |
| `{if!=(a,b)}`, `{ifnotequal(a,b)}`    | Renders if `a != b`             |
| `{if<(a,b)}`, `{ifless(a,b)}`         | Renders if `a < b`              |
| `{if<=(a,b)}`, `{iflessoreq(a,b)}`    | Renders if `a <= b`             |
| `{if>(a,b)}`, `{ifgreater(a,b)}`      | Renders if `a > b`              |
| `{if>=(a,b)}`, `{ifgreateroreq(a,b)}` | Renders if `a >= b`             |

---

### Number-Specific Conditions

| Syntax                                            | Description                      |
| ------------------------------------------------- | -------------------------------- |
| `{ifnumber(n)}`                                   | Renders if `n` is not zero       |
| `{ifnumber!(n)}`, `{ifnumbernot(n)}`              | Renders if `n` is zero           |
| `{ifnumber=(a,b)}`, `{ifnumberequal(a,b)}`        | Renders if numbers are equal     |
| `{ifnumber!=(a,b)}`, `{ifnumbernotequal(a,b)}`    | Renders if numbers are not equal |
| `{ifnumber<(a,b)}`, `{ifnumberless(a,b)}`         | Renders if `a < b`               |
| `{ifnumber<=(a,b)}`, `{ifnumberlessoreq(a,b)}`    | Renders if `a <= b`              |
| `{ifnumber>(a,b)}`, `{ifnumbergreater(a,b)}`      | Renders if `a > b`               |
| `{ifnumber>=(a,b)}`, `{ifnumbergreateroreq(a,b)}` | Renders if `a >= b`              |

---

### Using `else` and `else if`

You can chain multiple conditions using `else if=`, `elseif=`, or `else`.

```tempo
{if=(code,"a")}Case A
{else if=(code,"b")}Case B
{else if<(n1,5)}Case C
{else}No match found
{endif}
```

::: tip

* `else` must come last.
* `endelse` is optional and not recommended.
* You can prepend `else` to any `if` condition.
:::

This structure allows full control over conditional content rendering within Tempo templates.

## Tafqeet in Tempo

The `tafqeet` function converts numeric values into words, using the currency formatting defined in the global configuration.

### Syntax

```tempo
{tafqeet("Number", "CurrencyCode")}
```

---

### Examples

#### Example 1: Hardcoded Values

```tempo
{tafqeet("500", "EGP")}
```

* On English interface → `five hundred Egyptian Pounds`
* On Arabic interface → `خمسمائة جنيه مصري`

#### Example 2: Using Field Values

```tempo
{tafqeet(money.netValue, money.currency.code)}
```

This converts the value of `money.netValue` using the currency code defined in the `money` object.

---

### Notes

::: tip
If the global configuration defines:

* `code = جم`
* `altCode = EGP`

And you want the conversion in English regardless of the interface language, use:

```tempo
{tafqeet(money.netValue, money.currency.altCode)}
```

:::

---

### Force Language with `tafqeetAr` or `tafqeetEn`

* Always render in **Arabic**:

```tempo
{tafqeetAr(money.netValue, money.currency.code)}
```

* Always render in **English**:

```tempo
{tafqeetEn(money.netValue, money.currency.code)}
```
## Executing Entity Flows via Tempo Links

To trigger an entity flow from a Tempo template (e.g. in an email), use the following syntax:

```tempo
{flow(record, flowCode="EntityFlowCode")}
```

**Example:**

```tempo
{flow(employee, flowCode="CreateJobOffer")}
```

This executes the `CreateJobOffer` flow for the current `employee` record.

---

## Email-Related Functions

### 1. Setting the Email Subject

#### Method 1: Using `subject:` at the Start of the First Line

```tempo
subject:The employee {name2} was updated by {$user.name2}
```

> Must be placed at the very beginning of the email body.

#### Method 2: Using `{subject}` Block

```tempo
{subject}The employee {name2} was updated by {$user.name2}{endsubject}
```

---

### 2. Adding Attachments

Use one or more `emailattachment` tags for fields or server paths:

```tempo
{emailattachment(attachmentField)}
{emailattachment("C:\Path\To\File.pdf")}
```

**Example:**

```tempo
subject:Attachments of employee {code} - {name1}
Dear Sir,  
Please note that the employee {name1} was changed. The email contains all files attached to the employee.  
{emailattachment(attachment)}{emailattachment(attachment1)}{emailattachment(attachment2)}{emailattachment(attachment3)}{emailattachment(attachment4)}{emailattachment(attachment5)}{emailattachment(mainFile)}
```

**Another Example:**

```tempo
Attached our catalog {emailattachment("E:\Media\Prochures\catalog.pdf")}
```

::: tip 

<rtl>
* يُفضّل وضع جمل المرفقات في نهاية الرسالة.
* تجنب ترك سطور فارغة أو مسافات بينها لتفادي ظهورها غير المرغوب فيه في البريد.
* المرفقات الفارغة يتم تجاهلها تلقائيًا.

</rtl>

:::

---

### 3. Prevent Auto-Attaching Images

For HTML emails that shouldn't attach images automatically, include:

```html
<donothandleimages/>
```

---

### 4. Creating and Sending Messages

#### Message Body Block

```tempo
{openmsg}
Message content here
{closemsg}
```

#### Define Recipient Address

```tempo
{sendto}email-or-phone{endsendto}
```

**Examples:**

* Send to a customer's email:

```tempo
{sendto}{#email}{endsendto}
```

* Send an SMS to a phone number:

```tempo
{sendto}{#phoneNumber}{endsendto}
```

::: tip
Typically used inside `{loop}` blocks to send individualized messages.
:::

---

### Example: Send Email Notifications to Customers with Overdue Invoices

**Step 1: Email Template Query**

```sql
select s.code invoiceCode, s.valueDate, c.code customerCode, c.name2 customerName, s.remaining, c.email
from SalesInvoice s
left join customer c on c.id = s.customer_Id
where remaining > 0 and valueDate between dateadd(month,-1,getdate()) and getdate()
order by customerCode
```

**Step 2: Email Template Content**

```tempo
{loop()}
  {header(customerCode)}

  {openmsg}
  {sendto}{#email}{endsendto}
  {subject}Late Invoices of customer {#customerName}{endsubject}

  Dear {#customerName}{enter}
  Please note that the following invoices are due:

  {opentable}
  {row}{cell}Invoice Code{cell}Invoice Date{cell}Remaining{endrow}
  {endheader}

  {row}{cell}{#invoiceCode}{cell}{#valueDate}{cell}{#remaining}{endrow}

  {footer(customerCode)}
  {closetable}
  {closemsg}
  {endfooter}
{endloop}
```
## String Manipulation Functions in Tempo

### Trimming and Replacements

* **Trim spaces at the beginning and end:**

```tempo
{description1.$trim}
```

* **Convert Arabic numerals to English:**

```tempo
{mobile.$replaceArNumerals}
```

---

### Parsing and Conversions

* **Parse JSON string to a map:**

```tempo
{text1.$parseJSONToMap}
```

* **Convert comma-separated text into a list:**

```tempo
{remarks.$parseCSVToList}
```

---

### Substring Functions

* **Extract characters from the left:**

```tempo
{left(string, length)}
```

**Example:**

```tempo
{left(code, 3)} → "Nam" if code is "NamaSoft"
```

* **Extract characters from the right:**

```tempo
{right(string, length)}
```

**Example:**

```tempo
{right(code, 3)} → "oft" if code is "NamaSoft"
```

* **Extract substring from a specific range:**

```tempo
{substring(string, startIndex, endIndex)}
```

**Example:**

```tempo
{substring("NamaSoft", 3, 5)} → "maS"
```

---

### Padding (Truncating or Adding Spaces)

* **Left pad or truncate:**

```tempo
{leftpad(length)}YourTextHere{endpad}
```

* **Right pad or truncate:**

```tempo
{rightpad(length)}YourTextHere{endpad}
```

**Examples:**

```tempo
{leftpad(10)}123{endpad}     → "       123"
{rightpad(10)}123{endpad}    → "123       "
{leftpad(5)}123456789{endpad}→ "12345"
{rightpad(5)}123456789{endpad}→ "56789"
```

---

## Numeric Field Functions

### Fixed-Decimal Rounding

* **Round to 0–5 decimal places:**

```tempo
{n1.$round0}
{n1.$round1}
{n1.$round2}
{n1.$round3}
{n1.$round4}
{n1.$round5}
```

**Examples:**

```tempo
{n1.$round0} → 20 if n1 = 19.9  
{n1.$round2} → 10.33 remains 10.33
```

---

### Dynamic Rounding

```tempo
{round(numberExpression, decimalPlacesExpression)}
```

**Examples:**

```tempo
{round(n1, "2")}
{round(money.value, money.currency.fractionalDecimalPlaces)}
```

---

### Number Formatting

```tempo
{formatNumber(numberExpression, formatExpression)}
```

**Example:**

```tempo
{formatNumber(n1, "###,###.00")} → 1,234.50
```
## URL Shortening in Tempo

URL shortening is particularly useful for SMS messages, where long links are not practical.

* To use this feature, you need a [YOURLS](https://yourls.org) server or subscribe to Namasoft's shortening service.
* You also need an API **signature** from the YOURLS server.

### Syntax

```tempo
{shortenurl(server="https://your-shortener.com/", signature="SIGNATURE_HERE")}
  {link($this, plainLink=true)}
{endshortenurl}
```

**Example using Namasoft shortening service:**

```tempo
{shortenurl(server="https://namasoft.com/s/", signature="SIGNATURE_HERE")}
  {link($this, plainLink=true)}
{endshortenurl}
```

---

## Dynamic Report Links in Notifications and Dashboards

You can add dynamic links to reports from notifications or dashboards. This is useful for generating contextual reports based on specific parameters.

### Notification Example

```tempo
{reportlink(reportCode="1000", runType="launch", newwindow="true")}
  {paramname("entityType")}{paramvalue(ref1.entityType)}
  {paramname("document")}{paramvalue(ref1)}
{endreportlink}
```

### Dashboard Example

```tempo
{reportlink(reportCode="1000", runType="launch", plainLink=true)}
  {paramname("entityType")}{paramvalue(entityType)}
  {paramname("document")}{paramvalue(id, entityType)}
{endreportlink}
```

---

### Supported Nodes

* **Parameter by Name:**

```tempo
{paramname("paramName")}{paramvalue("paramValue")}
```

* **Reference Parameters (with optional display fields):**

```tempo
{paramrefvalue(entityType=..., id=..., code=..., name1=..., name2=...)}
```

* **Multi-value Parameters:**

```tempo
{parammultivalue}{code} {name1}{endmutlivalue}
```

---

## CRM Questionnaire Sending

### 1. Embed Survey in Email

```tempo
Dear Sir,{enter}
We would love you to answer the following survey.{enter}
{$renderQuestionsForMailEmbedded}{enter}
Thanks and Best Regards
```

### 2. Send Survey as Link

```tempo
Dear Sir,{enter}
We would love you to answer a quick survey on the following <a href='{$questionsURL}'>URL</a>.{enter}
Thanks and Best Regards
```
## Sending HTTP Requests from Tempo

You can send HTTP requests from within Tempo using the `EASendHttpRequestByTempo` entity flow. This is useful for integrating external APIs (e.g., WhatsApp, SMS, ERPs) directly from records or looped data like document lines.

---

### Example 1: Structured Body with Named Parameters

This example sends a POST request for each line in `details`, with body parts defined individually:

```tempo
{loop(details)}
  {httprequest}
    {requesturl}https://namasoft.com/api/v3.0/item{endurl}
    {requestmethod}POST{endmethod}
    {contenttype}application/json{endcontenttype}
    {charset}utf8{endcharset}

    {headername}api-key{endheadername}
    {headervalue}xxHjjk889523{endheadervalue}

    {paramname}company_name{endparamname}
    {paramvalue}{legalEntity.name2}{endparamvalue}

    {bodypartname}user_whatsapp_number{endbodypartname}
    {bodypartvalue}{details.ref1.$toReal.contactInfo.mobile}{endbodypartvalue}

    {bodypartname}ordernumber{endbodypartname}
    {bodypartvalue}{details.ref2.$toReal.code}{endbodypartvalue}

    {bodypart("complexObject")}
      {bodypartname}property1{endbodypartname}
      {bodypartvalue}abc{endbodypartvalue}
      {bodypartname}property2{endbodypartname}
      {bodypartvalue}abcd{endbodypartvalue}
    {endbodypart}

    {requestdescription1}optional description that can be viewed in the list view{enddescription1}
    {requestdescription2}Add row number {@rownumber} to use as extra info{enddescription2}

    {requestrelatedtoid1}{id}{endrelatedto1}
    {requestrelatedtoid2}{customer.id}{endrelatedto2}
  {endrequest}
{endloop}
```

---

### Example 2: Custom JSON Body String

This version uses a manually written JSON string in the request body:

```tempo
{loop(details)}
  {httprequest}
    {requesturl}https://namasoft.com/api/v3.0/item{endurl}
    {requestmethod}POST{endmethod}
    {contenttype}application/json{endcontenttype}
    {charset}utf8{endcharset}

    {headername}api-key{endheadername}
    {headervalue}xxHjjk889523{endheadervalue}

    {paramname}company_name{endparamname}
    {paramvalue}{legalEntity.name2}{endparamvalue}

    {requestbody}
      \{
        "user_whatsapp_number":"{details.ref1.$toReal.contactInfo.mobile}",
        "ordernumber":"{details.ref2.$toReal.code}"
      \}
    {endbody}
  {endrequest}
{endloop}
```

---

Both examples demonstrate sending a request per row in `details`, with the flexibility to include headers, parameters, individual body fields, or full custom JSON.


## Creators in Tempo

In Tempo, a **creator** is used to generate and populate a new entity record (like a sales invoice, customer, etc.) directly from templates.

---

### Basic Creator Syntax

```tempo
{creator(entity="EntityName", menu="MenuName", title="Link Title", view="ViewName", newwindow="true/false")}
  ...field assignments...
{endcreator}
```

* `entity`: Name of the entity to create.
* `menu` *(optional)*: Target menu name (if customized).
* `title` *(optional)*: Title shown in the creator link.
* `view` *(optional)*: Custom screen view name.
* `newwindow` *(optional)*: Whether to open in a new tab.

**Example:**

```tempo
{creator(entity="SalesInvoice")}
{endcreator}
```

---

### Setting Field Values

Use `{f("FieldName")}` and `{v("Value")}` to assign a value.

**Example:**

```tempo
{f("n1")}{v("10")}
```

---

### Dynamic Field Content

Use `{creatorvalue}...{endvalue}` to embed dynamic or computed text.

**Example:**

```tempo
{creator(entity="SalesInvoice")}
  {f("code")}{v("SA000001")}
  {f("remarks")}
    {creatorvalue}
      This document was created from {#entityType} - {#code} on date {#valueDate}
    {endvalue}
  {endcreator}
```

---

### Assigning Detail Line Values

You can insert data into specific rows in detail tables:

#### Method 1: By row number

```tempo
{f("details.item.itemCode")}{v("ITEM005")}{r("2")}
```

#### Method 2: Append to new row if needed (`@@end`)

```tempo
{f("details.item.itemCode")}{v("ITEM005")}{r("@@end")}
```

#### Method 3: Always use last row (`@@last`)

```tempo
{f("details.item.itemCode")}{v("ITEM005")}{r("@@last")}
```

#### Method 4: Use current loop row number

```tempo
{f("details.item.itemCode")}{v(details.item.itemCode)}{r(@rownumber)}
```

**Looping Example:**

```tempo
{creator(entity="SalesInvoice")}
  {f("code")}{v("SA000001")}
  {loop(details)}
    {f("details.item.itemCode")}{v(details.item.itemCode)}{r(@rownumber)}
  {endloop}
{endcreator}
```

---

### Use Case Example: Copying Only Non-Service Items

```tempo
{creator(entity="SalesInvoice")}
  {f("book")}{v("SIV1")}
  {f("term")}{v("CASH")}

  {loop(details)}
    {if!=(details.item.item.itemType, "Service")}
      {f("details.item.itemCode")}{v(details.item.itemCode)}{r("@@end")}
      {f("details.n1")}{v(details.n1)}{r("@@last")}
      {f("details.n2")}{v(details.n2)}{r("@@last")}
    {endif}
  {endloop}

{endcreator}
```

* `@@end` ensures a new line is added for each item.
* `@@last` ensures related fields are filled in the correct last row.

---

### Calling System GUI Actions from Creator

You can invoke UI actions (e.g., Save, Print, Delete):

```tempo
{callGUIAction("actionId")}
```

**Available `actionId` values:**

```
save, saveAndContinue, duplicate, accept, approval, revise, unrevise,
print, listView, showHelpMsgs, treeView, newRecord, delete,
more, refresh, homePage, goToRecord
```

## Sales and Purchase Prices in Tempo

### Getting the Sales Price of an Item

Use the `itemprice` function:

```tempo
{itemprice(itemIdOrCode=expression)}
```

This function returns the sales price for an item. Only `itemIdOrCode` is required. All other parameters are optional and can appear in any order.

#### Full Syntax

```tempo
{itemprice(
  itemIdOrCode=...,
  customerIdOrCode=...,
  uomCodeOrId=...,
  qty=...,
  classificationIdOrCode=...,
  date=...,
  legalEntityIdOrCode=...,
  sectorIdOrCode=...,
  branchIdOrCode=...,
  analysisSetIdOrCode=...,
  departmentIdOrCode=...,
  revisionIdCode=...,
  colorCode=...,
  sizeCode=...,
  priceClassifier1IdOrCode=...,
  priceClassifier2IdOrCode=...,
  priceClassifier3IdOrCode=...,
  priceClassifier4IdOrCode=...,
  priceClassifier5IdOrCode=...,
  decimalPlaces=...,
  fieldToDisplay=...
)}
```

::: tip
You can pass either the ID or the code for any parameter.
:::

#### Available fields for fieldToDisplay
 
- unitPrice
- price
- netValue
- discount1.afterValue
- discount1.percentage
- discount1.value
- discount2.afterValue
- discount2.percentage
- discount2.value
- discount3.afterValue
- discount3.percentage
- discount3.value
- discount4.afterValue
- discount4.percentage
- discount4.value
- discount5.afterValue
- discount5.percentage
- discount5.value
- discount6.afterValue
- discount6.percentage
- discount6.value
- discount7.afterValue
- discount7.percentage
- discount7.value
- discount8.afterValue
- discount8.percentage
- discount8.value
- headerDicount.afterValue
- headerDicount.percentage
- headerDicount.value
- tax1.afterValue
- tax1.maxNormalPercent
- tax1.value
- tax2.afterValue
- tax2.maxNormalPercent
- tax2.value
- tax3.afterValue
- tax3.maxNormalPercent
- tax3.value
- tax4.afterValue
- tax4.maxNormalPercent
- tax4.value
 
#### Examples

```tempo
{loop(details)}
  Price of item {details.item.item.name} is {itemprice(itemIdOrCode=details.item.item.code)}
  Price for customer CST05: {itemprice(itemIdOrCode=details.item.item.code, customerIdOrCode="CST05")}
  Price for customer CST05 on 2020-01-01: {itemprice(itemIdOrCode=details.item.item.code, customerIdOrCode="CST05", date="20200101")}
{endloop}
```

---

### Getting the Purchase Price of an Item

Use the `itempurchaseprice` function:

```tempo
{itempurchaseprice(itemIdOrCode=..., supplierIdOrCode=...)}
```

#### Full Syntax

```tempo
{itempurchaseprice(
  itemIdOrCode=...,
  supplierIdOrCode=...,
  uomCodeOrId=...,
  qty=...,
  classificationIdOrCode=...,
  date=...,
  legalEntityIdOrCode=...,
  sectorIdOrCode=...,
  branchIdOrCode=...,
  analysisSetIdOrCode=...,
  departmentIdOrCode=...,
  revisionIdCode=...,
  colorCode=...,
  sizeCode=...,
  priceClassifier1IdOrCode=...,
  priceClassifier2IdOrCode=...,
  priceClassifier3IdOrCode=...,
  priceClassifier4IdOrCode=...,
  priceClassifier5IdOrCode=...,
  decimalPlaces=...,
  fieldToDisplay=...
)}
```

---

## Utility Fields for Templates, Notifications, and Entity Flows

### Audit Trail (Change History)

Every entity in Nama ERP has built-in audit trail fields that show what changed in the record. These are particularly useful for notifications, emails, and approval workflows.

#### Available Audit Trail Fields

* `{$changesAsHtmlAr}` - Changes in HTML format (Arabic)
* `{$changesAsHtmlEn}` - Changes in HTML format (English)
* `{$changesAsTextAr}` - Changes in plain text format (Arabic)
* `{$changesAsTextEn}` - Changes in plain text format (English)

::: tip Understanding the Changes
These fields show the differences between the current version and the previous version of the record. They display:
- Modified header fields (old value → new value)
- Added detail lines
- Removed detail lines
- Modified detail line fields
:::
---

### Discussions

* `discussions`: All related discussions
* `firstDiscussion`: First discussion
* `lastDiscussion`: Most recent discussion
* `preLastDiscussion`: One before last

**Example:**

```tempo
The last added discussion was {lastDiscussion.discussion} at {lastDiscussion.onTime} by {link(lastDiscussion.user)}.
Ref1 code: {lastDiscussion.ref1.code}
```

---

### Notification and System Variables

* `$notificationTarget`: The employee/user receiving the notification
* `$notifier`: The notification definition that triggered the message
* `$currentUsers`: All currently logged-in users
* `$user`, `$currentUser`: The current user
* `$loginLegalEntity`, `$loginLegalEntityId`
* `$loginBranch`, `$loginBranchId`
* `$loginSector`, `$loginSectorId`
* `$loginDepartment`, `$loginDepartmentId`
* `$loginAnalysisSet`, `$loginAnalysisSetId`

---

### Approval-Specific Fields

* `currentApprovalCase`: The current approval context
* `currentApprovalCase.lastStep.comment`
* `currentApprovalCase.lastStep.actualResponsible`
* `currentApprovalCase.lastStep.decision`
* `currentApprovalCase.lastStep.approvalDate`
* `currentApprovalCase.lastStep.escalatedFrom`
* `currentApprovalCase.lastStep.approvalReason`
* `currentApprovalCase.lastStepDefinition.notificationRemark`

Refer to [Approval Case Entity](https://www.namasoft.com/dm/#entity:entity/ApprovalCase&) for more.

---

### Other Utilities

* `retrieverFileId`: Use this to generate customer-accessible file download links

**Example image URL for employee:**

```
http://localhost:8080/erp/file.download?entityType=Employee&recordId={empId}
```
