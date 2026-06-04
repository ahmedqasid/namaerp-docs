# Importing Data from Excel or Queries

## Importing Data from Excel into Nama ERP

Nama ERP allows you to import data directly from Excel sheets. Here are some key points and best practices to ensure a smooth import process:

### General Guidelines

* **Formula Support**: You can use standard Excel formulas in cells when preparing your data.
* **Recommended Practice**: It’s best to first export sample data from Nama ERP. Use the exported sheet as a template for formatting and structure.

---

### Special Import Functions

- `evalsql(sql statement)`

This function executes a SQL statement and uses the result as the value of the cell during import.

**Examples**:

```excel
evalsql(select top 1 id from SalesInvoice order by valueDate desc)
```

**With Excel formula**:

```excel
="evalsql(select code from Account where subsidiaryType = '" & U13 & "')"
```

---

* `findByCode` and `altCode` Columns

If your dataset includes a special-purpose field (e.g., `contactInfo.mobile`) that serves as a unique identifier, you can include a column named `findByCode` containing that value. The system will use it to find the corresponding record **only if a `code` field is not available**.

This same logic also applies to the `altCode` column.

---

### Advanced Excel Import

For a visual walkthrough, watch the following video introduction:
📺 [Excel Import Tutorial](https://www.youtube.com/watch?v=FlKdarW1vJI)

---

* Working with Numbers in Groovy Scripts

When using Groovy expressions during import:

* Numeric fields (`Long`, `Integer`, `Decimal`) are automatically parsed from cell values.
* To explicitly parse a cell as a number, prefix the cell name with `$`.

**Examples**:

```groovy
A + 5 * C
$A - 10 / $C
```
::: tip Note
Cell references are case-insensitive. For example, `a+2` and `$a` are valid.
:::


## Import by Entity Flow From Excel Sheets or SQL Statement

- `excel.importFrom="attachment"`
- Loads the excel sheet in attachment, note that you can use any field that returns a valid name of an attachment field. For example you can put attachment1,attachment2,attachment3 in description 1 as a combo, and then use the following `excel.importFrom=description1`

- `excel.activatedSheet="1"`
- Makes sheet number 1 the current sheet, you also can use the sheet name

- `excel.activatedSheet="invoices-sheet"`
- Same as previous, but uses the sheet name instead of its index

- `excel.ignoreLinesFromTop="1"`
- If you have titles row in the sheet

- `excel.ignoreLinesFromBottom="1"
`
- Same as ignoreLinesFromTop, but from bottom 

- `details=[excel.rows]
`
- Makes details the same size as the current sheet rows, it considers ignoreLinesFromTop and bottom

- `details.item.item=excel.rows.A
`
- Copies whatever in cell A in every row to the same line in the grid details
- Cells are: A,B,C, ……, AA,AB,AC,AD, ……, AZ,BA,BC,BD,...,BX,BY,BZ. CA and upper are not implemented, and we do not think this is practical

- `details.text1=sql(select case when {excel.row1.A} = 'item' then 'ABC' when {excel.row1.B} = 'item' then 'BAC' else 'CAB' end)`
- `exel.row1 ` gives you access to the first row, even if that row was ignored, to facilitate header rows querying


## Import From SQL Statement by Entity Flow or GUI Post Action

- [Watch this video for detailed steps](https://youtu.be/XAOituWQqsg)
- Example 

```sql
sql.rows=sql(select top 10 id,code,n2,configuration_id from InvItem where section_id = {ref1.id})
details=[sql.rows]
details.item.itemCode=sql.rows.code
details.item.item=sql.rows.code
details.quantity.quantity.primeQty.value=sql.rows.n2
details.ref1=ref("ItemConfiguration",sql.rows.configuration_id)
```

- In this example we run a statement by `sql.rows=sql(statement here)`, you can also use multi-line sql statements by changing it to:
```sql
sql.rows=mlsql(select
Column1, column2 from Table
)endmlsql
```

- You can access any column returned by the query using sql.rows.columnAlias
- Also, you can use column index as follows: sql.rows.c1 , sql.rows.c2, and so on
***

::: rtl

- عند استيراد ملف العملاء والذي يحتوي على موقع جغرافي contactInfo.address.region ، مطلوب ملئ الحقول التالية بناء على الموقع جغرافي :
:::

`contactInfo.address.country , contactInfo.address.city , contactInfo.address.state , contactInfo.address.area`

::: rtl

- وبالمثل في عنوان الشحن والدفع

- يمكنك استعمال التالي في مسار كيان EAFieldValuesCalculator لنسخ المسميات باللغة العربية

:::

```ini
contactInfo.address.country=contactInfo.address.region.$countryAr
contactInfo.address.city=contactInfo.address.region.$cityAr
contactInfo.address.state=contactInfo.address.region.$stateAr
contactInfo.address.area=contactInfo.address.region.$areaAr
```

::: rtl

- لنسخ المسميات باللغة الإنجليزية
:::

```ini
contactInfo.address.country=contactInfo.address.region.$countryEn
contactInfo.address.city=contactInfo.address.region.$cityEn
contactInfo.address.state=contactInfo.address.region.$stateEn
contactInfo.address.area=contactInfo.address.region.$areaEn
```
::: rtl

- لنسخ المسميات حسب اللغة الحالية للمدخول

:::

```ini
contactInfo.address.country=contactInfo.address.region.$country
contactInfo.address.city=contactInfo.address.region.$city
contactInfo.address.state=contactInfo.address.region.$state
contactInfo.address.area=contactInfo.address.region.$area

```

::: rtl

- بالطبع يمكنك تغيير contactInfo إلى أي حقل آخر
:::
