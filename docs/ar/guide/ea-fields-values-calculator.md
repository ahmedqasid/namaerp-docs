# Entity Flow Fields Expressions:

- `altCode=mask(code,XXX.XXX.XXX)`
### X هنا تعبر عن حرف في الكود الاصلي
### أي حرف سوي X سيتم إضافته الى الناتج 


### Example 1:

```xml
If the item code is 111222333 , mask(code,XXX-XXX*XXX), the alternative code will be 111-222*333
Example2:
If the item code is ABC155713 , mask(code,XXX-XXX@XXX), the alternative code will be ABC-155@713


        111222333 - XX.XXXX.XX => 11.1222.333
        1122 - XXxXX => 11x22

```
- `n1=totalize(details,details.price.unitPrice)`
### لتجميع القيم بأحد الحقول يمكن استخدام الدالة "totalize"، حيث في هذا المثال سيقوم النظام بحساب مجموع القيم الموجودة بالحقل "details.price.unitPrice" بالجريد "details".

- `n1=totalizeif(details,details.price.unitPrice,select case when {details.item.item.section.code}  = ‘SEC001’ then 1 else 0 end)
`
### تعمل بنفس طريقة الدالة السابقة ولكن لصنف محدد. أي - كما بالمثال - يقوم بتجميع جميع القيم الحقل "details.price.unitPrice" بالجريد "details"، ولكن فقط مع الصنف "SEC001" المذكور بالجريد.

- `n1=totalizesql(select {details.price.unitPrice}  * {details.n1}  / {n3})
`
### لتجميع الناتج من جملة استعلام لأحد الحقول، ففي المثال الموضح سيتم تجميع الحقل "details.price.unitPrice" ولكن بعد ضربه بالحقل n1، ثم قسمته على الحقل n3.

- `n1=sql(select sum(netValue) from SalesInvoice where customer_id = {customer.id})`

### تعمل الدالة "sql" للحصول على ناتج جملة استعلام، ففي هذا المثال تم وضع إجمالي مبيعات لأحد العملاء. يمكن استخدام هذا الاستعلام بمسار كيان من داخل فاتورة المبيعات مثلاً.

- `n1=mlsql(select case when {code} = ‘abc’ then 5
when {code} = ‘cde’ then 6 
else 7 end)endmlsql
`

### تعمل الدالة "mlsql" بنفس طريقة عمل الدالة السابقة ولكن مع إمكانية كتابة جملة الاستعلام على أكثر من سطر.

- `details.ref1=firstNotEmpty(details.ref1,ref1)`
- `details.n1=firstNotEmpty(details.n5,netValue,n4)`

### تعني هذه الدالة استحضار قيمة details.n5 لوضعها بالحقل details.n1، فإذا لم تكن هناك قيمة بالحقل details.n5، يتم استحضار القيمة netValue بدلاً منها، فإذا لم يكن هناك قيمة بالحقل ،netValue ، يتم استحضار قيمة الحقل n4 بدلاً منها.

> [! Note]
> ### تسمح هذه الدالة بعدد لا نهائي من الحقول بهذه الطريقة.

- `details.text1=mask(details.text2,XX-XX:X--X)`

- `book="BookCode"`

### لإدراج القيمة بطريقة مباشرة بشرط وضع القيمة بين " "

- `book=null`

### لتفريغ قيمة الحقل وجعل قيمته مساوية ل "Null".

- `term=book.code`

### تستخدم لاستحضار التوجيه الذي كوده مساوٍ لكود الدفتر (book.code)

- `ref5=$this`

### لوضع كود الملف الحالي بالمرجع (ref5)، فمثلاً عند إنشاء مورد من داخل عميل مثلاً، فإن هذه الجملة تضع كود العميل الحالي بالمرجع"ref5" الموجود بسجل المورد المنشأ.

- `ref4=ref("SalesInvoice","SIV150160")`

### لوضع كود الفاتورة "SIV150160" بالمرجع ref4.

- `ref4=ref(ref2.$toReal.ref1.entitType,sql(select top 1 id from Customer where ref4id = {ref4.$toReal.id}))
`

### لجعل قيمة المرجع "" مساوية 
### لتعمد التعديل بأحد سجلات ملف أخر لابد من استخدام الأمر runCommand والذي يتم من خلاله التعديل والحفظ.

- `runCommand="edit"`
- `runCommand="save"`

### يمكن استخدام الأمرين الأخيرين لتعديل حقول سجل أحد الملفات. فمثلاً، لتعديل الحقل "n1" بأحد سجلات ملف الصنف وجعلها مساوية للحقل "details.n1" بالفاتورة، يتم استخدام الصيغ التالية:
```sql
details.item.item.runCommand="edit"
details.item.item.n1=details.n1
details.item.item.runCommand="Save"
```
### لابد من هذين الأمرين حتى لا يتم تعديل أي من ملفات النظام عن طريق الخطأ.
### قد يكون المطلوب تعديل عدد كبير جداً من السجلات، والذي قد يأخذ وقتاً طويلاً. لإحداث تغيير بحقول أحد الملفات بصورة سريعة اختصاراً للوقت، يمكن استخدام الأداتين التاليتين، واللتان لن يظهر تأثيرهما بملف "Action History".

- `runCommand="forcestable"
`
- `runCommand="unforcestable"
`
### لتطبيق نفس الجملة السابقة، باستخدام هذين الأمرين كالتالي:

```sql
details.item.item.runCommand="forcestable"
details.item.item.n1=details.n1
details.item.item.runCommand="unforcestable"
```

- `runCommand="guessPeriod"`
### يستخدم هذا الأمر لتخمين الفترة، فمثلاً عند إنشاء مسودة بفترة محددة ليتم الموافقة عليها بالفترة التالية، عند الحفظ سيقوم النظام بإظهار رسالة خطأ لأن التاريخ يقع خارج الفترة التي تم خلالها إنشاء المسودة، وبالتالي يمكن استخدام الأمر "guessPeriod"، كما بالمثال التالي:

```sql
valueDate=sql(select getdate ())
runCommand="guessPeriod"
```
### يمكن اختصار الجملتين السابقتين بالأمر التالي:

```sql
runCommand="makeValueDateToday"
runCommand="flush"
runCommand="runManualEntityFlow(EF005)"
runCommand="systemUpdateCalculatedFields"
```

### لإضافة نقاش مع حدث معين، يمكن استخدام الأمر التالي:

```sql
addDiscussion="New Discussion added by entity flow"

selectLine="details(2)" → sets the current line to line number 3 in the grid details
```
### يمكن استخدام هذا الأمر "selectLine" لاختيار سطر محدد، كما تم اختيار السطر الثاني (2)details. بعد ذلك يمكن استحضار أحد قيم حقول هذا السطر حيث سيكون هذا السطر هو ال currentLine كما في الأمر التالي:

- `n3=currentLine.n3`

### لاحظ أنه بدلاً من استخدام الأمرين (selectLine ، currentLine) يمكن استخدام الأمر التالي:

`n3=$line.n3
`
### كما يمكن تعديل قيم السطر من خلال استبدا اسم الجدول ب $line - كمثال:

`details.n1="15"
`
### اذا اردت تطبيقها على السطر الثاني تصبح:

```sql
selectLine="details(1)"
$line.n1="15"
```


```sql
selectLine="details(last)" → sets the current line to the last line in the grid details
description1=remarks.$left_5 → returns the first five letters of the remarks fields
description1=remarks.$right_2 → returns the last two letters of the remarks fields
description1=remarks.$mid_3_4 → returns 4 letters starting from the third one of the remarks fields
details=[clear]
```
### Clears all lines in the details grid
```sql
details=[5]
```
### Makes the grid details size 5 lines
```sql
details=[lines]
```
### Makes the grid details size the same as the lines grid size
```sql
details1=[addLines(details2)]
```
### Add new empty lines to the existing lines in grid details one, the new added lines will be exactly the size of the grid details2. This is very useful if you want to merge two grids in a single grid while creating entity from entity.
### Always use it in conjunction with `addedLinesOnly(details1.n1=details2.n5)`
```sql
details=[addLines(5)]
```
### Add 5 new empty lines, exactly like `details1=[addLines(details2)]` but with constant length instead of length of another detail
`details1=addedLinesOnly(details1.n1=details2.n5)`
### The statement inside the parentheses will be run only for the newly added lines created by  `details1=[addLines(details2)]`
## يتم استخدام الأمرين السابقين لإنشاء جدول جديد من جدولين. لمزيد من التعرف على هذين الأمرين، يمكن الرجوع للسؤال التالي:
## كيف يمكن عمل مستند صرف مخزني من خلال دمج سطور قطع الغيار و الخدمات في سند أمر الصيانة؟ أو كيف يمكن إنشاء جدول بدمج جدولين آخرين؟
`selectLine="details(0)"`
### Makes the statement `($line.n1=n5)`  affect only line number 1. If for example you want to change only line number 3, make its n5 = header n2 use the following:
```sql
selectLine="details(2)"
$line.n5=n2
switchTarget=ref1(details.n1=n2)endSwitchTarget
Sets the field details.n1 in the record found in the field ref1 to the value of the field n2 in the current record
This statement can have multiple lines. For example:
switchTarget=ref1(
details.n1=n1
details.n2=n2
details.ref5=details.ref2
)endSwitchTarget
switchSource=ref1(details.n1=n2)endSwitchSource
```
### Same like switchTarget, but changes the source of the data instead of the target of the data
### These two statements are needed when you want to copy data from lines of a record two lines of another record in an entity found in a field in the source entity
### If you want to copy data between details of two documents, and you want to copy data between lines that have matching lines, you can use matchLinesBy
```sql
matchLinesBy=details.item.item=lines.ref1,details.text1=lines.text1(
details.n1=lines.n2
details.description5=lines.text1
)endMatchLinesBy
```
### Please note that you can not use this syntax while creating documents from documents
### if you need matching lines, conside using the group lines by parameter
### Encrypting text  تشفير النصوص
```sql
description1=code.$encrypt1
description2=description1.$decrypt1
ref1=sql(select entityType,id from SalesInvoice where code = {description1.$decrypt1})
```
### في التقارير يمكن استعمال التالي:

```sql
NamaRep.encrypt1($F{code})

NamaRep.decrypt1($F{description1})
encrypt1 -> تقوم بالتشفير
decrypt1 -> تقوم بفك التشفير
يوجد دالتان اخريان يمكن استعمالهم ولهم كلمة سر مختلفة
encryptX - decryptX
encrypt2 - decrypt2
```
### if a line starts with #, the line is considered a comment and not parsed at all

***

# Excel Sheet Import by Entity Flow

- `excel.importFrom="attachment"`
### Loads the excel sheet in attachment, note that you can use any field that returns a valid name of an attachment field. For example you can put attachment1,attachment2,attachment3 in description 1 as a combo, and then use the following `excel.importFrom=description1`

- `excel.activatedSheet="1"`
### Makes sheet number 1 the current sheet, you also can use the sheet name

- `excel.activatedSheet="invoices-sheet"`
### Same as previous, but uses the sheet name instead of its index

- `excel.ignoreLinesFromTop="1"`
### If you have titles row in the sheet

- `excel.ignoreLinesFromBottom="1"
`
### Same as ignoreLinesFromTop, but from bottom 

- `details=[excel.rows]
`
### Makes details the same size as the current sheet rows, it considers ignoreLinesFromTop and bottom

- `details.item.item=excel.rows.A
`
### Copies whatever in cell A in every row to the same line in the grid details
### Cells are: A,B,C, ……, AA,AB,AC,AD, ……, AZ,BA,BC,BD,...,BX,BY,BZ. CA and upper are not implemented, and we do not think this is practical

- `details.text1=sql(select case when {excel.row1.A} = 'item' then 'ABC' when {excel.row1.B} = 'item' then 'BAC' else 'CAB' end)`
### `exel.row1 ` gives you access to the first row, even if that row was ignored, to facilitate header rows querying


## Import From SQL Statement by Entity Flow or GUI Post Action

### Example 

```sql
sql.rows=sql(select top 10 id,code,n2,configuration_id from InvItem where section_id = {ref1.id})
details=[sql.rows]
details.item.itemCode=sql.rows.code
details.item.item=sql.rows.code
details.quantity.quantity.primeQty.value=sql.rows.n2
details.ref1=ref("ItemConfiguration",sql.rows.configuration_id)
```

### In this example we run a statement by `sql.rows=sql(statement here)`, you can also use multi-line sql statements by changing it to:
```sql
sql.rows=mlsql(select
Column1, column2 from Table
)endmlsql
```

### You can access any column returned by the query using sql.rows.columnAlias
### Also, you can use column index as follows: sql.rows.c1 , sql.rows.c2, and so on
***

## عند استيراد ملف العملاء والذي يحتوي على موقع جغرافي contactInfo.address.region ، مطلوب ملئ الحقول التالية بناء على الموقع جغرافي : 

```sql

contactInfo.address.country , contactInfo.address.city , contactInfo.address.state , contactInfo.address.area

```

### وبالمثل في عنوان الشحن والدفع

### يمكنك استعمال التالي في مسار كيان EAFieldValuesCalculator لنسخ المسميات باللغة العربية

```sql
contactInfo.address.country=contactInfo.address.region.$countryAr
contactInfo.address.city=contactInfo.address.region.$cityAr
contactInfo.address.state=contactInfo.address.region.$stateAr
contactInfo.address.area=contactInfo.address.region.$areaAr
```

### لنسخ المسميات باللغة الإنجليزية

```sql
contactInfo.address.country=contactInfo.address.region.$countryEn
contactInfo.address.city=contactInfo.address.region.$cityEn
contactInfo.address.state=contactInfo.address.region.$stateEn
contactInfo.address.area=contactInfo.address.region.$areaEn
```

### لنسخ المسميات حسب اللغة الحالية للمدخول

```sql
contactInfo.address.country=contactInfo.address.region.$country
contactInfo.address.city=contactInfo.address.region.$city
contactInfo.address.state=contactInfo.address.region.$state
contactInfo.address.area=contactInfo.address.region.$area

```

### بالطبع يمكنك تغيير contactInfo إلى أي حقل آخر

### OTP Support:
- #### We support creating two types of OTP, numeric OTP and alphanumeric OTP. The length of the OTP can start from 4 up to 8 letters.

### Examples:

```sql
description1=$createNumericOTP4
description2=$createNumericOTP5
description3=$createNumericOTP8

description1=$createOTP4
description2=$createOTP6
description3=$createOTP7
```












