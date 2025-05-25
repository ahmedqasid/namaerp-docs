---
lang: ar
---

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