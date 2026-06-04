<rtl>

# أسئلة شائعة عن مسارات الكيان

## كيف يمكن تثبيت قيمة في حقل مرجع عام عند الحفظ داخل مسار كيان؟ حاولت استخدام:

```groovy
details.ref1='MCI0001'
```

مع العلم أنني حددت النوع المطلوب في إعدادات الحقول والشاشات، لكن القيمة لا تُحفظ. كما جرّبت تعيين النوع والكود معًا هكذا:

```groovy
details.ref1.entityType='PurchaseElement'
details.ref1='MCI0001'
```

أو على سطرين:

```groovy
details.ref1.entityType='PurchaseElement'
details.ref1.code='MCI0001'
```

لكن عند فتح المرجع في النظام، لا يتم عرضه بشكل صحيح. ما الطريقة الصحيحة لتعيين هذا النوع من الحقول؟

---

### الإجابة:

عند التعامل مع الحقول المرجعية العامة (التي تقبل مراجع من أكثر من جدول وتُعرض في الواجهة باختيار النوع ثم الكود)، يجب تعبئتها بطريقة واحدة متكاملة، وليس بتعيين النوع والكود بشكل منفصل.

الطريقة الموصى بها هي استخدام دالة `ref` بهذا الشكل:

```groovy
details.ref1=ref('PurchaseElement', 'MCI0001')
```

كما يمكن استخدام استعلام SQL يُرجع النوع والكود أو المعرف، مثل:

```groovy
details.ref1=sql(select 'PurchaseElement', 'MCI0001')
```

أو:

```groovy
details.ref1=sql(select entityType, id from PurchaseElement where code = 'MCI0001')
```

وإذا كنت مضطرًا لاستخدام الطريقة التي تعتمد على تحديد النوع والكود يدويًا، فيجب أيضًا تعيين المعرف (id) حتى يتعرف النظام على المرجع بشكل صحيح:

```groovy
details.ref1.entityType='PurchaseElement'
details.ref1.code='MCI0001'
details.ref1.id='0xFFFF00018C21ED75F9000100FF1573C6'
```

لكن هذه الطريقة معقدة ولا يُنصح باستخدامها ما لم يكن هناك ضرورة قصوى. الأفضل دائمًا استخدام `ref` أو `sql` لسهولة القراءة وضمان عمل المرجع بطريقة سليمة.

<ltr>

::: tip Summary in English
This question explains how to correctly assign a value to a generic reference field (`ref`) in an entity flow,
especially when the reference can point to multiple entity types.

It clarifies that you must set both the type and the code together using `ref()` or `sql()` instead of assigning them separately.
:::

</ltr>

## تصحيح مضاعفة التأثير المحاسبي الناتج عن استخدام الحقل الخطأ

في أحد السيناريوهات ضمن مستند "فاتورة مشروع" (`CPAProjectInvoice`)، تم إعداد مسار كيان لحساب العمولة في كل سطر من سطور المستند، من خلال:

* نسخ قيمة `n2` من المشروع الموجود في السطر إلى الحقل `details.n3`
* حساب نسبة العمولة عن طريق ضرب هذه القيمة في الحقل `totalActualValue` الموجود في رأس المستند، ثم تخزين الناتج في `details.n4`:

```
details.n3=details.project.n2
details.n4=sql(select {details.n3} * {totalActualValue} / 100)
```

ثم تم استخدام قيمة `details.n4` لإضافة تأثير محاسبي عبر المسار `EAAddAccountingEffect` بالشكل التالي:

```
details.n4=DrEffect,CrEffect
```

### سبب المشكلة

القيمة في `totalActualValue` تمثل مجموع الحقل `details.price.actualValue` لجميع السطور. وعند ضربها في كل سطر على حدة، أدى ذلك إلى مضاعفة قيمة التأثير المحاسبي النهائي.

### الحل الصحيح

بدلاً من استخدام `totalActualValue` من الرأس، يجب استخدام قيمة `actualVal` الخاصة بكل سطر على حدة لحساب العمولة بدقة، كالتالي:

```
details.n4=sql(select {details.n3} * {details.price.actualVal} / 100)
```

### المسار المصحح الكامل

::: details Copy and use in Direct Import Menu Item

```json
{
    "targetType": "CPAProjectInvoice",
    "targetAction": "UpdateCalculatedFields",
    "details": [
        {
            "className": "com.namasoft.infor.domainbase.util.actions.EAFieldsValuesCalculator",
            "title1": "First",
            "parameter1": "details.n3=details.project.n2\ndetails.n4=sql(select {details.n3} *{details.price.actualVal}/100)",
            "targetAction": "UpdateCalculatedFields",
            "description": "Sets fields from one field to another.\nParameter 1: fields Map. Format as follows:\nwarehouse=book.ref1\nname1=code\nField Value can be another field id, \"quoted string\",sql(select max(n1) from InvItem where id <> {id})\ncustomer.runCommand=\"edit\"\ncustomer.runCommand=\"save\"\n"
        },
        {
            "className": "com.namasoft.modules.accounting.domain.utils.actions.EAAddAccountingEffect",
            "title1": "Effects: fieldId=DebitEffectAccSideCode,CreditEffectAccSideCode eg:\nn1=N1EffectDR,N1EffectCR\nlines.n2=DetailsN2EffectDR,DetailsN2EffectCR",
            "parameter1": "details.n4=DrEffect,CrEffect",
            "title2": "Apply When Query (Return 0 or 1), example:\nselect case when {lines.ref1.entityType} in ('Branch','Department') then 1 else 0 end\nThis example will make the effect happen only for lines ref1 being a branch or a department",
            "targetAction": "Automatic",
            "description": "Add Extra Effect to Any Document File existing ledger request."
        }
    ]
}
```

:::

بهذا التعديل، يتم احتساب التأثير المحاسبي بدقة لكل سطر على حدة دون مضاعفة.

## حذف المستندات المرتبطة تلقائيًا عند حذف فاتورة الشراء

في بعض الحالات، يطلب العميل حذف المستند المرتبط (مثل سند صرف) تلقائيًا عند حذف مستند آخر (مثل فاتورة الشراء). يمكن تنفيذ هذا من خلال مسار الكيان (Entity Flow)، ولكن يجب الانتباه للقيود التالية.

### التحدي

إذا تم إنشاء سند صرف تلقائيًا بناءً على فاتورة الشراء، فإن حذف الفاتورة سيفشل بشكل افتراضي، لأن النظام يمنع حذف مستندات مرتبطة بمستندات أخرى. وبالتالي، **لن يتم تنفيذ مسار الحذف** الموجود في مسار الكيان.

### الحل المقترح 1: استخدام زر لحذف المستند المرتبط

الأفضلية هي إنشاء إجراء يدوي في شاشة فاتورة الشراء لحذف المستند المرتبط (مثل سند الصرف)، ثم يقوم المستخدم بحذف الفاتورة بالطريقة العادية.

#### مثال لمسار كيان يحذف سند الصرف المرتبط:

::: details JSON for direct import

```json
{
  "details" : [ {
    "className" : "com.namasoft.infor.domainbase.util.actions.DeleteRelatedEntityAction",
    "title1" : "Target Type",
    "parameter1" : "PaymentVoucher",
    "title2" : "Finder SQL. eg: select id from CreditNote where ref5Id={id}",
    "parameter2" : "select id from PaymentVoucher where fromDoc_id = {id}",
    "targetAction" : "Manual",
    "description" : "Delete Generated Entity from another entity, should be used in combination with EAGenerateEntityFromEntityAction"
  } ]
}
```

:::

::: warning
  هذا المسار لن يعمل تلقائيًا عند حذف الفاتورة إلا إذا لم يكن هناك قيد يمنع حذف الفاتورة (مثل وجود موافقات أو علاقات أخرى). لذا يُفضل استخدام هذا المسار في زر يدوي فقط.
:::

### الحل المقترح 2: تغيير نقطة التنفيذ في مسار الكيان

إذا لم يكن هناك موافقات أو قيود على حذف الفاتورة، يمكن ربط مسار الحذف بنقطة `PreValidateOnDelete` بحيث يتم تنفيذ المسار **قبل** محاولة الحذف الفعلي. لكن في هذه الحالة، لا يزال هناك احتمال أن النظام يمنع الحذف بسبب وجود المستند المرتبط.


## إضافة قيد خاص بالمصاريف البنكية في سند القبض بدون استخدام طريقة دفع

### السيناريو

يرغب العميل في تسجيل قيمة **المصاريف البنكية** داخل سند القبض، ولكن **دون استخدام طريقة دفع**، ويريد بدلاً من ذلك إدخال القيمة يدويًا في حقل رقمي مخصص (مثل `n1`).

### التوصية

من الأفضل دائمًا استخدام **طريقة دفع** لتسجيل المصاريف البنكية، حيث توفر مرونة أعلى في التوزيع والنسب وربطها بحسابات بطريقة نظامية ومباشرة.

لكن في حال الإصرار على عدم استخدام طريقة دفع، يمكن تحقيق ذلك عبر **مسار كيان (Entity Flow)** باستخدام الإجراء:

### EAAddAccountingEffect

#### مثال لمسار كيان لإضافة تأثير محاسبي بناءً على الحقل `n1`:
::: details JSON for direct import
```json
{
  "targetType": "ReceiptVoucher",
  "details": [
    {
      "className": "com.namasoft.modules.accounting.domain.utils.actions.EAAddAccountingEffect",
      "title1": "Effects: fieldId=DebitEffectAccSideCode,CreditEffectAccSideCode eg:\nn1=N1EffectDR,N1EffectCR\nlines.n2=DetailsN2EffectDR,DetailsN2EffectCR",
      "parameter1": "n1=BankExpensesDebit,BankExpensesCredit",
      "title2": "Apply When Query (Return 0 or 1), example:\nselect case when {lines.ref1.entityType} in ('Branch','Department') then 1 else 0 end\nThis example will make the effect happen only for lines ref1 being a branch or a department",
      "title3": "ShortenLedger (true,false)",
      "parameter3": "true",
      "title4": "Currency Field  (optional)",
      "parameter4": "amount.value.currency",
      "title5": "Rate Field (optional)",
      "parameter5": "amount.rate",
      "targetAction": "Automatic",
      "description": "Add Extra Effect to Any Document File existing ledger request."
    }
  ]
}
```
:::

### شرح المدخلات:

* `parameter1`: يربط الحقل `n1` بالقيد المحاسبي (مدين ودائن) باستخدام رموز تأثير مثل `BankExpensesDebit` و`BankExpensesCredit`.
* `parameter3`: عند ضبطه على `true` يجعل النظام يختصر اليومية ولا يعرض التفاصيل إذا لم تتطلب.
* `parameter4` و `parameter5`: تُستخدم لضبط العملة ومعدل التحويل عند الحاجة.

::: tip
💡 يمكن تغيير اسم الحقل `n1` والرموز `BankExpensesDebit` و `BankExpensesCredit` حسب الإعدادات الفعلية في النظام.
:::

## إذا كنت ترغب في إنشاء مسار كيان يقوم بجلب سعر بيع الصنف من قائمة الأسعار وتخزينه في الحقل `n1` ضمن سطور إذن التوريد المخزني، فكيف يتم ذلك؟

يمكنك تنفيذ هذا الطلب من خلال استخدام **مسار كيان** من النوع `EAFieldsValuesCalculator` مع الدالة `itemprice` التابعة لمكتبة `tempo`، وذلك بالشكل التالي:

```tempo
details.n1=tempo({itemprice(itemIdOrCode=details.item.item)})
```

### شرح المكونات:

* `details.n1`: هو الحقل الذي سيتم فيه حفظ السعر المستخرج من قائمة الأسعار.
* `tempo(...)`: تقوم هذه الدالة بتقييم التعبير الموجود داخلها باستخدام محرك Tempo.
* `itemprice(...)`: تقوم هذه الدالة بجلب سعر بيع الصنف من قائمة الأسعار.
* `itemIdOrCode=details.item.item`: تشير إلى كود أو معرف الصنف ضمن سطر إذن التوريد.

يُرجى التأكد من إضافة هذا المسار إلى نوع المستند "توريد مخزني"، وتفعيله مع الإجراء المناسب مثل ما قبل تحديث الحقول المحسوبة.

##  أحاول إنشاء مسار كيان يقوم بحساب حقل المخزن تلقائيًا، لكن الكود الذي كتبته لم يعمل. ما السبب؟

**ج:** عند استخدامك للجملة التالية:

```fvc
details.specificDimensions.warehouse=sql(select case when {details.item.item.section.code} = '1' then 'W-MG' else  warehouse_id end from SrvJOrderMaterialLine where SrvCJobOrder_id = {ref1.$toReal.id} and {details.item.item.id} = material_id)
```

حدثت مشكلتان:

1. **نوع القيمة غير واضح:**
   في عبارة `case when`، قمت بإرجاع معرف (`'W-MG'`) في أحد الفروع، وفي الفرع الآخر قمت بإرجاع حقل `warehouse_id` مباشرةً. هذا تسبب في صعوبة على SQL Server في تحديد نوع القيمة المطلوبة (هل هو نص أم معرف؟). هذا الخلط يؤدي إلى فشل التنفيذ.

2. **غياب نتائج من الجدول:**
   في حالة عدم وجود أي سطر في جدول `SrvJOrderMaterialLine` يحقق شروط الفلترة، فإن الاستعلام بأكمله لن يعيد أي قيمة، وبالتالي لن يتم تعيين أي مخزن للسطر.

**الحل:**
استخدم صيغة `sub-query` بشكل صحيح داخل فرع `else` في `case when` لضمان أن الاستعلام دائمًا يرجع قيمة (حتى لو كانت `null`) بدلًا من أن لا يرجع شيئًا على الإطلاق.

الصيغة المصححة:

```nm-field-values
details.specificDimensions.warehouse=mlsql(
  select case 
    when {details.item.item.section.code} = '1' 
    then 0xffff00019247e58188000000ff09aee9 
    else (select warehouse_id from SrvJOrderMaterialLine where SrvCJobOrder_id = {ref1.$toReal.id} and {details.item.item.id} = material_id) 
  end
)endmlsql
```

بهذا الشكل، يتم ضمان أن الجملة تعيد دائمًا قيمة واحدة منطقية يمكن لـ SQL Server التعامل معها، كما يتم التأكد من أن الاستعلام لا يفشل في حالة عدم وجود سطور مطابقة في الجدول.

## أريد إحضار آخر سعر شراء للصنف في حقل `details.n2`

الطريقة الأسهل لتحقيق المطلوب هي استعمال الصيغة التالية:

```nm-field-values
details.n2=sql(select top 1 cast(l.unitPrice as decimal(20,2)) lastPrice from PurchaseInvoiceLine l where l.item_id = {details.item.item.id} order by l.valueDate desc)
```

إذا أردت إحضار آخر سعر شراء في تاريخ يسبق تاريخ السند الحالي:

```nm-field-values
details.n2=sql(select top 1 cast(l.unitPrice as decimal(20,2)) lastPrice from PurchaseInvoiceLine l where l.item_id = {details.item.item.id} and l.valueDate <= {valueDate} order by l.valueDate desc)
```

</rtl>