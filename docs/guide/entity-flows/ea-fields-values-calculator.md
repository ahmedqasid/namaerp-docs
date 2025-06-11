# Field Values Calculator

<rtl>

```ini
altCode=mask(code,XXX.XXX.XXX)
```

* الحرف `X` يمثل حرفًا من الكود الأصلي.
* أي رمز آخر (مثل `-` أو `.` أو `*`) سيتم نسخه كما هو إلى الناتج.

### مثال 1:

إذا كان كود الصنف هو `111222333`، واستخدمنا `mask(code,XXX-XXX*XXX)`، سيكون الكود البديل هو `111-222*333`.

### مثال 2:

إذا كان كود الصنف هو `ABC155713`، واستخدمنا `mask(code,XXX-XXX@XXX)`، سيكون الكود البديل هو `ABC-155@713`.

```ini
n1=totalize(details,details.price.unitPrice)
```

* لحساب مجموع القيم داخل حقل معين في جدول (grid)، نستخدم الدالة `totalize`. المثال أعلاه يجمع كل قيم `details.price.unitPrice`.

```ini
n1=totalizeif(details,details.price.unitPrice,select case when {details.item.item.section.code} = 'SEC001' then 1 else 0 end)
```

* تجمع القيم فقط إذا تحقق شرط معين. في هذا المثال يتم جمع `unitPrice` فقط إذا كان `section.code` يساوي `SEC001`.

```sql
n1=totalizesql(select {details.price.unitPrice} * {details.n1} / {n3})
```

* يجمع ناتج عملية حسابية على الحقول باستخدام SQL مدمج.

```sql
n1=sql(select sum(netValue) from SalesInvoice where customer_id = {customer.id})
```

* ترجع الدالة ناتج استعلام SQL لحساب إجمالي مبيعات عميل معين.

```sql
n1=mlsql(select case when {code} = 'abc' then 5 when {code} = 'cde' then 6 else 7 end)endmlsql
```

* نفس وظيفة `sql` ولكن يمكن كتابة الاستعلام على عدة أسطر.

```ini
details.ref1=firstNotEmpty(details.ref1,ref1)
details.n1=firstNotEmpty(details.n5,netValue,n4)
```

* تعيد أول قيمة غير فارغة من مجموعة الحقول المحددة.

::: tip
يمكن استخدام عدد غير محدود من الحقول داخل `firstNotEmpty`.
:::

```ini
details.text1=mask(details.text2,XX-XX:X--X)
book="BookCode"
book=null
term=book.code
ref5=$this
ref4=ref("SalesInvoice","SIV150160")
```

* هذه الأوامر لملء أو تفريغ القيم، أو استخدام مرجع حالي أو ثابت.

```ini
ref4=ref(ref2.$toReal.ref1.entitType,sql(select top 1 id from Customer where ref4id = {ref4.$toReal.id}))
```

* تُستخدم لإنشاء مرجع ديناميكي مستندًا إلى نتيجة استعلام SQL.

```ini
runCommand="edit"
runCommand="save"
```

* لتعديل وحفظ سجل.

```ini
details.item.item.runCommand="edit"
details.item.item.n1=details.n1
details.item.item.runCommand="Save"
```

* لتحديث سجل مرتبط مثل صنف من داخل فاتورة.

```ini
runCommand="forcestable"
runCommand="unforcestable"
```

* لتحديث البيانات دون المرور بآلية التعديل التقليدية.

```ini
runCommand="guessPeriod"
valueDate=sql(select getdate())
```

* لتحديد الفترة الزمنية تلقائيًا عند الحفظ.

```ini
runCommand="makeValueDateToday"
runCommand="flush"
runCommand="runManualEntityFlow(EF005)"
runCommand="systemUpdateCalculatedFields"
```

* أوامر لتحديثات وحركات النظام.

```ini
addDiscussion="New Discussion added by entity flow"
selectLine="details(2)"
n3=currentLine.n3
n3=$line.n3
```

* لاختيار سطر محدد والعمل عليه.

```ini
selectLine="details(1)"
$line.n1="15"
```

* لتعديل بيانات سطر معين باستخدام `$line`.

```ini
selectLine="details(last)"
description1=remarks.$left_5
description1=remarks.$right_2
description1=remarks.$mid_3_4
details=[clear]
details=[5]
details=[lines]
```

* عمليات على الجدول: إفراغ، تحديد عدد الأسطر، أو مطابقته مع جدول آخر.

```ini
details1=[addLines(details2)]
details=[addLines(5)]
details1=addedLinesOnly(details1.n1=details2.n5)
```

* لإنشاء أسطر جديدة ونسخ بيانات من جدول آخر.

```ini
selectLine="details(0)"
$line.n1=n5
```

```ini
switchTarget=ref1(details.n1=n2)endSwitchTarget
switchTarget=ref1(
  details.n1=n1
  details.n2=n2
  details.ref5=details.ref2
)endSwitchTarget
switchSource=ref1(details.n1=n2)endSwitchSource
```

* لنقل البيانات بين الكيانات المصدر والهدف.

```ini
matchLinesBy=details.item.item=lines.ref1,details.text1=lines.text1(
  details.n1=lines.n2
  details.description5=lines.text1
)endMatchLinesBy
```

* لمطابقة ونقل بيانات الأسطر بين كيانين.

### تشفير النصوص

```ini
description1=code.$encrypt1
description2=description1.$decrypt1
ref1=sql(select entityType,id from SalesInvoice where code = {description1.$decrypt1})
```

في التقارير يمكن استخدام:

```groovy
NamaRep.encrypt1($F{code})
NamaRep.decrypt1($F{description1})
```

* `encrypt1` للتشفير، `decrypt1` لفك التشفير.
* يوجد أيضًا `encrypt2/decrypt2` و `encryptX/decryptX` بكلمات سر مختلفة.

### OTP Support

ندعم إنشاء رموز OTP رقمية أو أبجدية رقمية، بطول من 4 إلى 8 خانات.

```ini
description1=$createNumericOTP4
description2=$createNumericOTP5
description3=$createNumericOTP8

description1=$createOTP4
description2=$createOTP6
description3=$createOTP7
```

لمزيد من التفاصيل راجع: [Excel and SQL importing using entity flows](excel-and-sql-import-by-entity-flow.md)

</rtl>