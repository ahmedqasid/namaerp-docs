<rtl>

# أسئلة عامة 
<ServerBaseURL/>

### للبحث عن مستندات عن طريق العدسة بعض الأحيان يظهر خطأ فارغ
يمكن حلها بتحديد رَقْم مناسب في`MaxRecordsPerPageForListViews` داخل الإعدادات العامة
<GlobalConfigOption option-code="value.info.maxRecordsPerPageForListViews" />

##  كيف يمكن تحديد الصلاحيات لكل أنواع السجلات في نظام نما بطريقة مرنة وسريعة دون الحاجة إلى إدراج سطر لكل نوع؟

✅ **الإجابة:**

في نظام نما، يمكنك تحديد الصلاحيات للسجلات باستخدام أحد الخيارات التالية داخل كل سطر صلاحية:

1. **نوع واحد محدد** (مثل: "عميل").
2. **قائمة أنواع** تحتوي على أكثر من نوع.
3. **كلا الخيارين معًا**.

حسب ما تحدده، يتم تطبيق الصلاحيات في ذلك السطر على:

* النوع فقط.
* أو قائمة الأنواع فقط.
* أو كلاهما معًا.

كما يمكنك ترك **كل من حقل النوع وقائمة الأنواع فارغين**، وفي هذه الحالة تُطبَّق الصلاحيات على **جميع الشاشات** في النظام.

🔽 **آلية تحديد السطر المناسب عند تنفيذ الصلاحيات:**

عند فتح شاشة (مثلاً: شاشة العميل)، يقوم النظام بالبحث عن السطر الأنسب بناءً على **الأولوية التالية**:

1. سطر يحتوي على **النوع المحدد** (مثلاً: "عميل").
2. إذا لم يوجد، يبحث في **قائمة الأنواع** عن سطر يحتوي على النوع "عميل".
3. إذا لم يوجد، يبحث عن **سطر عام** (لا يحتوي على نوع ولا قائمة أنواع).

بمجرد العثور على أول سطر مطابق حسب الترتيب أعلاه، يتوقف النظام عن البحث ويطبّق صلاحيات هذا السطر فقط.

::: tip ️ **ملاحظة عند وجود صلاحيات إضافية مؤقتة:**

* يتم اختيار **الصلاحية الأوسع نطاقًا** (التي تمنح صلاحيات أكثر).
* لكن **الأولوية في السطور** ما تزال تطبق:

    * إذا كانت صلاحية "الحفظ فقط" مخصصة لنوع "عميل"،
    * وصلاحية "الحفظ والتعديل" موجودة في سطر عام أو لقائمة أنواع،
    * فإن الأولوية تذهب لسطر "الحفظ فقط" لأنه أكثر تحديدًا حسب ترتيب الأولويات.
:::

<ltr>

## SQL Server Installation problem related to block size on new M2 SSDs (especially on new hetzner servers)
* Refer to [this article](https://learn.microsoft.com/en-us/troubleshoot/sql/database-engine/database-file-operations/troubleshoot-os-4kb-disk-sector-size?tabs=PowerShell)
* You will need to completely uninstall 
* Then run the following command in PowerShell 
```powershell
New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Services\stornvme\Parameters\Device" -Name   "ForcedPhysicalSectorSizeInBytes" -PropertyType MultiString        -Force -Value "* 4095"
```
::: warning
Remember, PowerShell not command prompt

The window should be blue, not black
:::
* Restart the server
* Then install SQL Server again

</ltr>

## كيف يمكن إضافة شاشة النقاش إلى شاشة بعينها
يمكن عمل المطلوب من خلال إعدادات الحقول والشاشات
<NamaOptionURL entityType="GenericReferenceOverrider" new-mode optionCode="addDiscussionTo.addToPage" link-title="addDiscussionTo"/>

1. يمكنك إضافة النقاش إلى أي شاشة في النظام من خلال جدول "إضافة النقاش إلي" الموجود بإعدادات الحقول والشاشات
::: tip يمكنك التحكم في الحقول الظاهرة في النقاشات
يمكنك التحكم في الحقول الظاهرة في شاشة النقاش من خلال تعديل الشاشة - بلوك "تعديل حقول النقاش"
  - إزالة حقل النقاش
  - إزالة مرفق 1 - 2 - 3 - 4
  - إزالة مرجع 1 - 2
:::

::: warning النقاش يظهر بعد الحفظ وليس قبله
لا تظهر شاشة النقاشات إلا في السجلات المحفوظة - مع إنشاء جديد قبل الحفظ لا تظهر النقاشات
:::

## في الرسائل النصية تصل الرسالة بحرف زائد + بدلا من المسافات
تصل الرسائل النصية بشكل غير صحيح بعلامة plus (+) بدلا من المسافات space
`عزيزي+العميل` بدلا من `عزيزي العميل`
### الحل هو استعمال `{utf8msg_sp20}` في حقل إعدادات أخرى في شاشة البريد والرسائل القصيرة بالإعدادات العامة بدلا من `{utf8msh`}
كمثال إذا كانت القيمة الحالية في اعدادات الرسائل كالتالي:
```
https://api.oursms.com/api-a/msgs?username=info@xyz.com&token=ToKenVaLue&src=SourceName&dests={to}&body={utf8msg}&priority=0&delay=0&validity=0&maxParts=0&dlr=0&prevDups=0
```
يجب تغييرها للتالي:
```
https://api.oursms.com/api-a/msgs?username=info@xyz.com&token=ToKenVaLue&src=SourceName&dests={to}&body={utf8msg_sp20}&priority=0&delay=0&validity=0&maxParts=0&dlr=0&prevDups=0
```
## عند فتح شاشة الحركات بالصنف تظهر رسالة خطأ 
`Can not find Field getter method : userQty.measures.clippedHeight1`
::: details وهذا هو اللوج الكامل
```
com.namasoft.infra.domainbase.util.NaMaBusinessLogicExeption: Can not find Field getter method : userQty.measures.clippedHeight1 
	at com.namasoft.infra.domainbase.metadata.EntityReflection.getFieldValue(EntityReflection.java:292) ~[domain-base-0.0.1-SNAPSHOT.jar:?]
	at com.namasoft.infra.domainbase.metadata.EntityReflection.getDirectFieldValue(EntityReflection.java:174) ~[domain-base-0.0.1-SNAPSHOT.jar:?]
	at com.namasoft.commonservices.utils.Lister.objectListToTabularResults(Lister.java:308) ~[service-base-0.0.1-SNAPSHOT.jar:?]
	at com.namasoft.commonservices.utils.Lister.getQueryListFromDB(Lister.java:232) ~[service-base-0.0.1-SNAPSHOT.jar:?]
	at com.namasoft.commonservices.utils.Lister.getListFromDB(Lister.java:338) ~[service-base-0.0.1-SNAPSHOT.jar:?]
	at com.namasoft.commonservices.utils.Lister.list(Lister.java:150) ~[service-base-0.0.1-SNAPSHOT.jar:?]
	at com.namasoft.commonservices.utils.Lister.list(Lister.java:207) ~[service-base-0.0.1-SNAPSHOT.jar:?]
	at com.namasoft.commonservices.utils.Lister.listFlat(Lister.java:830) ~[service-base-0.0.1-SNAPSHOT.jar:?]
```
:::

سبب المشكلة هو وجود حقل تم إزالته من النظام في عرض القائمة
الحل أن تقوم بعمل RegenUI من تعديل شاشة

</rtl>