# أمثلة لمسارات كيان

### إنشاء مسار كيان ليقوم بتغيير معدل الموارد في سندات الموارد في النظام (يقوم بمحاكاة أن المستخدم ضغط علي الاوبشن "اعادة حساب المعدل مع الحفظ" في سند الموارد
قم بإنشاء مسار كيان مع الاجراء "يدوي" و نوعه `EAFieldsValuesCalculator` و قم بوضعه بتعديل شاشة. قم بإدخال التالي في المدخل 1:

```ini
runCommand="edit"
recalculateRateWithSave="true"
runCommand="save"
```
### إنشاء مسار كيان ليقوم بتعديل حقل description1 في السند الأعلى للسند الأعلى للسند الحالي (بناءا على ثم بناءا على)
قم بإنشاء مسار كيان مع الاجراء "تأثيرات الحفظ" و نوعه `EAFieldsValuesCalculator` . قم بإدخال التالي في المدخل 1:
```ini
switchTarget=fromDoc.$toReal.fromDoc(
runCommand="edit"
description1="ABC"
runCommand="save"
)endSwitchTarget
```
### إنشاء مسار كيان ليقوم بملء حقل القيمة في أول سطر في سند القبض بإجمالي الأوراق التجارية
قم بإنشاء مسار كيان مع الإجراء "ما قبل تحديث الحقول المحسوبة" و نوعه `EAFieldsValuesCalculator` . قم بإدخال التالي في المدخل 1:
```ini
n1=totalize(fblines,fblines.fpCreationInfo.value.amount)
selectLine="lines(0)"
$line.amount.value.amount=n1
```
### مسار كيان يقوم بإنشاء سندات طلب أمر انتاج لكل سطر من سطور طلب تحويل مخزني (او أي سند من سندات التوزيع - مثل طلب اصناف - امر بيع و هكذا)

الشرح الصوتي للمثال:

[Gen production order req from transfer req.m4a
](https://drive.google.com/file/d/1BMxLPE9aEjAjRs-VK7AfQgc0g9-oiHuR/view?usp=sharing)

شيت الاكسيل للاستيراد المباشر:

[Gen production order req from transfer req.xlsx](https://drive.google.com/file/d/1EL8HmxkM5via_44KfWgNa4IaeRLFyKvQ/view?usp=sharing)

اسم العنصر: `EAGenerateEntityFromEntityAction`

    Parameter 1:

```
ProductionOrderRequest
```

    Parameter 2:
```sql
select {currentLine.ref1.id}
```
Parameter 3:
```ini
book="طلب امر انتاج'
fromDoc=$this
invItem=$line.item.item
bom=$line.item.item.code
routing=$line.item.item.code
quantity.value=$line.quantity.quantity.primeQty.value
quantity.uom=$line.quantity.quantity.primeQty.uom
switchSource=$target.bom(
components=[details]
components.operationSeq=details.operationSeq
components.item=details.item
components.quantity.quantity.primeQty.value=details.quantity.quantity.primeQty.value
components.quantity.quantity.primeQty.uom=details.quantity.quantity.primeQty.uom
components.finalQty.value=details.finalQty.value
components.finalQty.uom=details.finalQty.uom
components.materialClassification=details.materialClassification
components.specificDimensions.warehouse=details.specificDimensions.warehouse
components.issueType=details.issueType
components.remarks=details.remarks
)endSwitchSource
switchSource=$target.routing(
routings=[details]
routings.operationSeq=details.operationSeq
routings.operation=details.operation
routings.workCenter=details.workCenter
routings.autoCharge=details.autoCharge
routings.description=details.description
routings.permittedPercentage=details.permittedPercentage
)endSwitchSource
```
    Parameter 5: (Inverse Copy Map)
```
$line.ref1=$this
Parameter 6:
details
```
### اعادة حساب بيانات الحضور و الانصراف لاخر شهرين لمن لهم سجل حضور و انصراف

قم باستيراد الملف التالي و عدل عليه إن تطلب الأمر

[Task Schedule - إعادة حساب بيانات الحضور والانصراف لاخر شهرين لمن لهم سجل حضور و انصراف.xlsx](https://drive.google.com/file/d/1BpR-11cttBbC-E3S6w2cPexxjQKkv2w6/view?usp=sharing)

### مسار كيان يقوم بإنشاء سندات أوامر شراء لكل مورد في سند طلب الشراء
الشرح الصوتي للمثال:
[MultiplePurchaseOrdersFromRequest.m4a](https://drive.google.com/open?id=1GI9p-RH_C_VG9adGQaR-wYTuflDQhJq5)

شيت الاكسيل للاستيراد المباشر:
[CreateMultipleOrdersFromItemOrderPerSupplier.xlsx](https://drive.google.com/open?id=1zaGJcwA8oqzlnG5OHqdCnzMotYppdRM5)

اسم العنصر: `EAGenerateEntityFromEntityAction`

    Parameter 1:
```
PurchaseOrder
```

    Parameter 2:
```sql
select id from PurchaseOrder where ref1Id = {id} and supplier_id = {$currentGroupKey.id}
```
    Parameter 3:
```ini
ref1=$this
fromDoc=$this
book="FPOR"
term="FPOR"
supplier=$currentGroupKey
details=[details]
details.item.item=details.item.item
details.quantity.quantity.primeQty.value=details.quantity.quantity.primeQty.value
details.quantity.quantity.primeQty.uom=details.quantity.quantity.primeQty.uom
details.price.unitPrice=details.price.unitPrice
```
    Parameter 9: (Group Details By)
```
details.recommendedSupplier
```
### مسار كيان يقوم بفرد الأرقام المسلسلة علي سطور في مستندات معينة (للاستعمال مع التقارير)

    EAAutoCreateSCDocSerial

### مسار كيان يقوم باستبدال الأرقام الهندي بالأرقام الإنجليزية
```sql
code=mlsql(select REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE({code}
,N'٠',N'0'),N'١',N'1'),N'٢',N'2'),N'٣',N'3')
,N'٤',N'4'),N'٥',N'5'),N'٦',N'6'),N'٧',N'7')
,N'٨',N'8'),N'٩',N'9'))endmlsql
```


### حذف المستند الموجود ببناءا على بعد حذف السند نفسه و باستعمال الاوبشن "يعمل بعد حفظ المستند نهائيا و التأثير على قاعدة البيانات" في مسار الكيان

يمكنك استعمال مسار الكيان `EADeleteFromQuery` و قم باستعمال الاستعلام التالي:
```sql
select {pendingEntry.fromDoc.entityType},{fromDoc.id} 
```
