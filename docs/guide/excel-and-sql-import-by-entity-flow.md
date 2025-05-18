# Import by Entity Flow From Excel Sheets or SQL Statement

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

<rtl>

- عند استيراد ملف العملاء والذي يحتوي على موقع جغرافي contactInfo.address.region ، مطلوب ملئ الحقول التالية بناء على الموقع جغرافي :
</rtl>

`contactInfo.address.country , contactInfo.address.city , contactInfo.address.state , contactInfo.address.area`

<rtl>

- وبالمثل في عنوان الشحن والدفع

- يمكنك استعمال التالي في مسار كيان EAFieldValuesCalculator لنسخ المسميات باللغة العربية

</rtl>

```ini
contactInfo.address.country=contactInfo.address.region.$countryAr
contactInfo.address.city=contactInfo.address.region.$cityAr
contactInfo.address.state=contactInfo.address.region.$stateAr
contactInfo.address.area=contactInfo.address.region.$areaAr
```

<rtl>

- لنسخ المسميات باللغة الإنجليزية
</rtl>

```ini
contactInfo.address.country=contactInfo.address.region.$countryEn
contactInfo.address.city=contactInfo.address.region.$cityEn
contactInfo.address.state=contactInfo.address.region.$stateEn
contactInfo.address.area=contactInfo.address.region.$areaEn
```
<rtl>

- لنسخ المسميات حسب اللغة الحالية للمدخول

</rtl>

```ini
contactInfo.address.country=contactInfo.address.region.$country
contactInfo.address.city=contactInfo.address.region.$city
contactInfo.address.state=contactInfo.address.region.$state
contactInfo.address.area=contactInfo.address.region.$area

```

<rtl>

- بالطبع يمكنك تغيير contactInfo إلى أي حقل آخر
</rtl>
