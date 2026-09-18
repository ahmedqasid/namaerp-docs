---
# Handcrafted landing — GenNamaDocsIndex skips this file because of the .custom-index
# marker in this folder (see hasHandcraftedHomePage in GenNamaDocsIndex.java)
title: إعادة المعالجة والأدوات
---

# إعادة المعالجة والأدوات

في هذا المجلد أدوات الإنقاذ: السكربتات والأدوات التي تعيد بناء الكميات والتكاليف وأرصدة الأستاذ وأعمار الديون لقاعدة بيانات صارت أرقامها خاطئة بالفعل. وهي ليست صيانة، ولا روتيناً، ولا واحدة منها أول رد على مشكلة.

::: danger اقرأ هذا قبل أن تشغّل شيئاً هنا
**المستند الواحد الذي يبدو غريباً ليس سبباً لإعادة بناء قاعدة بيانات أبداً.** فالمستند الواحد الذي لا أثر محاسبي أو مخزني له يُصلَح من شاشة [طلبات الأعمال](/ar/platform/background-processing/business-requests) — تجد طلبه، وتقرأ سبب فشله، وتعالج السبب، ثم تعيد معالجة ذلك الطلب وحده.

أما أدوات هذه الصفحات فتفرّغ جداول كاملة وتعيد بناءها. وعلى قاعدة كبيرة تستغرق إعادة البناء الكاملة **أياماً**، والنظام معطّل طوال ذلك، ولا رجعة فيها. فقبل أن تبدأ أياً منها: خذ نسخة احتياطية، واتفق على وقت التوقف مع العميل، وأوقف خادم التطبيق حيث تقول الصفحة ذلك.
:::

## من أين تبدأ، حسب العَرَض

| ما تراه | اذهب إلى |
|---|---|
| مستند واحد بلا قيد في الأستاذ أو بلا أثر مخزني | [طلبات الأعمال](/ar/platform/background-processing/business-requests) — لا هذا المجلد |
| أرصدة الأصناف أو تكاليفها خاطئة في مستندات كثيرة | [إعادة معالجة الكميات والتكاليف وأعمار المخزون](/ar/admin/reprocessing/reprocess-qty-and-cost.md) |
| أرصدة الحسابات أو أعمار ديون العملاء/الموردين خاطئة | [إعادة معالجة الأستاذ وأعمار الديون](/ar/admin/reprocessing/reprocess-ledger-and-debt-ages.md) |
| تشك أن ثمة خطأ ولا تستطيع تسميته بعد | [استعلامات الكشف عن مشاكل التكلفة والكميات](/ar/admin/reprocessing/cost-and-qty-problems.md) |
| المشكلة داخل وحدة بعينها | أدوات تلك الوحدة — المخزون أو التصنيع أو الأصول الثابتة أو العقارات، أدناه |
| موقع خرج عن التوافق مع المركز الرئيسي | [أدوات النسخ المتطابق](/ar/admin/reprocessing/replication.md) |
| كل شيء صحيح لكن البطء شديد | [اقتراح Indexes لجداول التفاصيل الكبيرة](/ar/admin/reprocessing/suggest-index-creation.md) |

## ترتيب العمل

1. **اقرأ قبل أن تكتب.** ابدأ بالاستعلامات التشخيصية، فهي تُخبر ولا تغيّر شيئاً، وتكشف لك اتساع المشكلة حقاً.
2. **أصلح أضيق ما يفسّرها.** طلب أعمال فاشل، أو مستند واحد، أو محدد واحد.
3. **أعِد بناء منطقة واحدة** — الكميات والتكلفة، أو الأستاذ، أو جداول وحدة بعينها — ولا تفعل إلا بعد أن تعرف أن الخلل فيها.
4. **وإعادة البناء الكاملة آخر شيء**، ومعها نسخة احتياطية ووقت متفق عليه وخادم موقَف.

فإذا لم تفسّر الخطوة الأولى العَرَض، فتلك لحظة التصعيد لا لحظة توسيع دائرة الضرر.

## اكتشف المشكلة أولاً

<LandingGrid>
  <LandingCard icon="🔍" title="مشاكل التكلفة والكميات" link="/ar/admin/reprocessing/cost-and-qty-problems.md" details="استعلامات تقارن التكلفة بالأستاذ مستنداً مستنداً وتُظهر أين اختلفا." />
  <LandingCard icon="🧰" title="استعلامات عامة متعددة الأغراض" link="/ar/admin/reprocessing/general-purpose-utility-queries.md" details="استعلامات تحقيق يومية تصلح لأي وحدة." />
  <LandingCard icon="⚡" title="اقتراح Indexes لجداول التفاصيل الكبيرة" link="/ar/admin/reprocessing/suggest-index-creation.md" details="اعرف جداول التفاصيل التي يبطئ حجمها التركيبة، وما الذي يُفهرس." />
</LandingGrid>

## إعادة بناء الأرصدة

<LandingGrid>
  <LandingCard icon="📦" title="إعادة معالجة الكميات والتكاليف وأعمار المخزون" link="/ar/admin/reprocessing/reprocess-qty-and-cost.md" details="إعادة البناء الكاملة لكميات المخزون وتكاليفه وأعماره — وتحتاج نسخة احتياطية ووقت توقف وخادماً موقَفاً." />
  <LandingCard icon="📒" title="إعادة معالجة الأستاذ وأعمار الديون" link="/ar/admin/reprocessing/reprocess-ledger-and-debt-ages.md" details="أعِد بناء أرصدة الحسابات وأعمار ديون العملاء والموردين حين لا يوافق الأستاذ المستندات." />
</LandingGrid>

## أدوات الوحدات

<LandingGrid>
  <LandingCard icon="🏬" title="أدوات المخزون" link="/ar/admin/reprocessing/inventory-utilities.md" details="استعلامات وإصلاحات موجّهة لمستندات المخزون والأرقام المسلسلة وبيانات المخازن." />
  <LandingCard icon="🏭" title="أدوات التصنيع" link="/ar/admin/reprocessing/manufacturing-utilities.md" details="إصلاحات مستندات التجميع وأوامر الإنتاج وآثارها على التكلفة." />
  <LandingCard icon="🏗️" title="أدوات الأصول الثابتة" link="/ar/admin/reprocessing/fixed-asset-utilities.md" details="الإهلاك وبطاقات الأصول والقيود التي وراءها." />
  <LandingCard icon="🏢" title="أدوات العقارات" link="/ar/admin/reprocessing/real-estate-utilities.md" details="الوحدات والعقود وبيانات الأقساط التي خرجت عن الاتساق." />
</LandingGrid>

## قاعدة البيانات والمواقع

<LandingGrid>
  <LandingCard icon="🗄️" title="عمليات قاعدة البيانات" link="/ar/admin/reprocessing/db-operations.md" details="عمليات على قاعدة البيانات نفسها على مستوى الخادم — وهي أشد صفحات هذا المجلد تدميراً." />
  <LandingCard icon="🔁" title="أدوات النسخ المتطابق" link="/ar/admin/reprocessing/replication.md" details="تشخيص موقع تخلّف عن المركز الرئيسي وإصلاحه." />
</LandingGrid>
