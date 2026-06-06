<rtl>

# أسئلة شائعة حول فلترة الحقول

## كيف يمكن فلترة مرجع 1 في جرد البنود ليعرض نفس الأصناف الموجودة في التفاصيل؟

- السؤال:

أنا أستخدم مرجع 1 في جرد البنود لجلب الأصناف، وأريد أن يظهر فقط نفس الأصناف التي تم اختيارها في التفاصيل. الكود الذي كتبته هو:

```
{loop(details)}
termsLines.ref1,Equal,{details.item.item.code},OR;
{endloop}
```

- الإجابة:

الواضح أنك تريد فلترة حقل `termsLines.ref1` بحيث يعرض فقط الأصناف التي تم اختيارها في `details.item.item`.

لكن يوجد خطأ في الكود المستخدم:

* عند كتابة شرط الفلترة، يجب أن تكتب **اسم الحقل داخل شاشة الصنف** (وهي الشاشة التي يتم الفلترة فيها)، وليس اسم الحقل داخل المستند الذي تستعمله.
* استخدام `termsLines.ref1` داخل الشرط غير صحيح، لأن هذا الحقل يُستخدم فقط لتحديد أين سيتم تطبيق الفلتر، وليس داخل شرط الفلترة نفسه.

- التصحيح:

استخدم الحقول كما هي موجودة في **شاشة الصنف**، كالتالي:

إذا أردت الفلترة حسب الكود:

```
{loop(details)}
code,Equal,{details.item.item.code},OR;
{endloop}
```

وإذا أردت الفلترة بشكل أدق باستخدام رقم المعرف:

```
{loop(details)}
id,Equal,{details.item.item.id},OR;
{endloop}
```

::: tip
تأكد من أنك تستخدم اسم الحقل الصحيح الموجود في شاشة الكيان الذي يتم الفلترة عليه، وليس اسم الحقل في المستند المصدر.
:::

## ما هي أفضل طريقة عند البحث في سند التوريد أو الصرف لإظهار الأصناف بناءً على توفر الرصيد؟

* **في سند الصرف المخزني**: عرض الأصناف التي يوجد منها رصيد فقط.
* **في سند التوريد المخزني**: عرض الأصناف التي لا يوجد منها رصيد فقط.

---

### أولاً: فلترة الأصناف ذات الرصيد فقط في سند الصرف المخزني

يحتوي الكيان `InvItem` على سطور باسم `quantities` مرتبطة بجدول `ItemDimensionsQty`. يمكنك استخدام هذه العلاقة لفلترة الأصناف التي لها رصيد كما يلي:

::: details JSON for direct import

```json
{
  "forType": "StockIssue",
  "automaticUsage": true,
  "lines": [
    {
      "fieldId": "details.item.item",
      "dynamicFilter": "quantities.data.net,GreaterThan,0,AND;"
    }
  ]
}
```

:::

---

### ثانياً: فلترة الأصناف التي لا يوجد منها رصيد في سند التوريد المخزني

نظراً لأن الصنف قد لا يحتوي دائماً على بيانات مباشرة في `quantities` إذا لم يوجد رصيد، فمن الأفضل تحديث حقل مخصص (مثلاً `n5`) في كيان `InvItem` يعكس الكمية الكلية المتاحة، ثم استخدامه في الفلترة.

#### 1. إنشاء مهمة مجدولة لتحديث الحقل `n5` بقيمة الرصيد المتاح:

::: details JSON for direct import

```json
{
  "scheduleType": "Action",
  "className": "com.namasoft.infor.domainbase.util.actions.EAExecuteUpdateQuery",
  "title1": "Update Query",
  "parameter1": "update i set n5 = coalesce(qty.net,0) from InvItem i\nouter apply (\nselect sum(q.net) net from ItemDimensionsQty q where q.item_id = i.id\n) qty",
  "title2": "Evict Cache After Execution(true,false)",
  "parameter2": "true",
  "actionDescription": "Execute update query specified in first parameter"
}
```
:::

#### 2. بعد ذلك، فلترة حقل الصنف في سند التوريد بناءً على القيمة الجديدة في الحقل `n5`:

::: details JSON for direct import

```json
{
  "forType": "StockReceipt",
  "automaticUsage": true,
  "lines": [
    {
      "fieldId": "details.item.item",
      "dynamicFilter": "quantities.data.net,LessThanOrEqual,0,AND;"
    }
  ]
}
```
:::

::: tip ملاحظة
- يمكنك أيضًا استبدال `quantities.data.net` بـ `n5` مباشرة إذا أردت ربط الفلترة بالحقل المحسوب، ولكن استخدام `quantities.data.net` يظل أكثر دقة حيث أن n5 يعتمد على تشغيل المهمة.
- اختر جدول تشغيل المهمة المجدولة بعناية بحيث تحافظ على دقة الحقل n5 وفي نفس الوقت لا تشكل ضغطعا على موارد الخادم وقاعدة البيانات
:::

### 💡 تحسين تنفيذ التحديث التلقائي للحقل `n5` باستخدام مسار كيان

بدلاً من الاعتماد فقط على مهمة مجدولة مستقلة، يمكنك استخدام **مسار كيان (Entity Flow)** لتحديث الحقل `n5` مباشرة بعد أي حركة مخزنية (صرف، توريد، تحويل)، وذلك لتحقيق تحديث فوري وفعال مع تقليل الضغط على النظام.

---

- الخطوات المقترحة:

1. **إنشاء مسار كيان جديد**

* يتم تشغيله بعد التأثير الفعلي على قاعدة البيانات (بعد الحفظ النهائي).

2. **تحديد الجداول المستهدفة في قائمة أنواع**: 

* `StockIssue` (صرف مخزني)
* `StockReceipt` (توريد مخزني)
* `StockTransfer` (تحويل مخزني)

3. **إضافة إجراء من النوع "تشغيل أمر تحديث SQL"** بنفس كود المهمة المجدولة:

4. **تفعيل الخيارات التالية في مسار الكيان**:

* ✅ `يعمل بعد حفظ المستند نهائيا و التأثير على قاعدة البيانات`
* ✅ `انتظار انتهاء معالجة الكميات`

وهذه الإعدادات تضمن أن التحديث يتم **فقط بعد نجاح المعالجة المخزنية**، مما يمنع حدوث تعارض أو تحديث سابق لأوانه.

---

- الفائدة من هذا الأسلوب:

* تحديث آني لـ `n5` دون الحاجة لجدولة زمنية.
* تقليل الضغط على النظام الناتج عن تكرار التنفيذ.
* المحافظة على دقة الرصيد في كافة الشاشات التي تعتمد على `n5`.

---
وإليك المسار جاهز للاستيراد:
::: details JSON for direct import
```json
{
  "entityTypeList": "StockIssueReceiptTransfer",
  "runAfterCommitDocAndEffectOnDB": true,
  "waitForQuantityProcessing": true,
  "details": [
    {
      "className": "com.namasoft.infor.domainbase.util.actions.EAExecuteUpdateQuery",
      "parameter1": "update i set n5 =  coalesce(qty.net,0) from InvItem i\nouter apply (\nselect sum(q.net)  net from ItemDimensionsQty q where q.item_id = i.id\n) qty",
      "parameter2": "true",
      "targetAction": "PostCommit"
    },
    {
      "className": "com.namasoft.infor.domainbase.util.actions.EAExecuteUpdateQuery",
      "parameter1": "update i set n5 =  coalesce(qty.net,0) from InvItem i\nouter apply (\nselect sum(q.net)  net from ItemDimensionsQty q where q.item_id = i.id\n) qty",
      "parameter2": "true",
      "targetAction": "PostDelete"
    }
  ]
}
```
:::
> 💬 ويمكنك الاحتفاظ بالمهمة المجدولة كخطة احتياطية تعمل مرة يوميًا مثلاً لضمان المزامنة الكاملة، خاصةً في حالات التعديلات اليدوية أو عمليات الاستيراد الكبيرة.

</rtl>
