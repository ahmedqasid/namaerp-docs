---
# Handcrafted landing — GenNamaDocsIndex skips this file because of the .custom-index
# marker in this folder (see hasHandcraftedHomePage in GenNamaDocsIndex.java)
title: إدارة النظام
---

# إدارة النظام

هذه هي مجموعة الأدوات التي تُبقي تنصيب نظام نما سليمًا. حين يحدث خلل ما — تتوقف شاشة، أو لا تتطابق الأرقام، أو تبدو التكاليف غير صحيحة — فهنا تجد الإجابات والاستعلامات التي تصلحها. كما تجد دليل لغة Tempo لصياغة الرسائل الديناميكية، ومجموعة واسعة من أدوات إعادة المعالجة لإعادة بيانات المخزون والحسابات والوحدات إلى نصابها عند انحرافها.

## استكشاف الأخطاء وإصلاحها

عندما يسيء النظام التصرّف، ابدأ من هنا. تشرح هذه الصفحات تشخيص حالات التوقف، وتجيب عن أكثر الأسئلة تكرارًا.

<LandingGrid>
  <LandingCard icon="🩺" title="استكشاف الأخطاء وإصلاحها" link="/ar/admin/troubleshooting/" details="تشخيص توقف النظام وعدم استجابته، مع أسئلة شائعة عامة وأخرى عن أخطاء قاعدة البيانات في مكان واحد." />
  <LandingCard icon="⏳" title="توقف النظام أو عدم استجابته" link="/ar/admin/troubleshooting/troubleshooting-system-hanging.md" details="اكتشف سبب تجمّد النظام أو توقفه عن الاستجابة وكيفية استعادته." />
  <LandingCard icon="❓" title="أسئلة عامة" link="/ar/admin/troubleshooting/general-faq.md" details="إجابات عن الأسئلة اليومية التي يطرحها مديرو النظام أثناء تشغيل نظام نما." />
  <LandingCard icon="🗄️" title="أسئلة شائعة عن أخطاء قاعدة البيانات" link="/ar/admin/troubleshooting/database-error-related-faq.md" details="أخطاء قاعدة البيانات الشائعة وكيفية حلّها." />
</LandingGrid>

## إعادة المعالجة والأدوات

عندما تخرج الأرقام المخزّنة عن التزامن، تعيد هذه الأدوات احتسابها وتوفّر استعلامات SQL جاهزة لاكتشاف المشكلات وإصلاحها عبر المخزون والحسابات والتصنيع والأصول الثابتة وغيرها.

<LandingGrid>
  <LandingCard icon="🔁" title="إعادة معالجة الحركات" link="/ar/admin/reprocessing/" details="المجموعة الكاملة من أدوات إعادة المعالجة والاستعلامات المساعدة لإصلاح البيانات عبر الوحدات." />
  <LandingCard icon="📦" title="الكميات والتكاليف وأعمار المخزون" link="/ar/admin/reprocessing/reprocess-qty-and-cost.md" details="أعد احتساب كميات المخزون والتكاليف وأعمار المخزون عند انحرافها." />
  <LandingCard icon="📒" title="إعادة معالجة دفتر الأستاذ وأعمار الديون" link="/ar/admin/reprocessing/reprocess-ledger-and-debt-ages.md" details="أدوات محاسبية لإعادة معالجة دفتر الأستاذ وأعمار الديون." />
  <LandingCard icon="🔍" title="استعلامات مشاكل التكلفة والكميات" link="/ar/admin/reprocessing/cost-and-qty-problems.md" details="استعلامات للكشف عن فروق التكلفة والكميات وإصلاحها." />
  <LandingCard icon="🏬" title="استعلامات المخزون المساعدة" link="/ar/admin/reprocessing/inventory-utilities.md" details="استعلامات مساعدة خاصة بالمخزون للفحص والتنظيف." />
  <LandingCard icon="🏭" title="أدوات التصنيع" link="/ar/admin/reprocessing/manufacturing-utilities.md" details="استعلامات مساعدة لوحدة التصنيع." />
  <LandingCard icon="🏗️" title="أدوات الأصول الثابتة" link="/ar/admin/reprocessing/fixed-asset-utilities.md" details="استعلامات مساعدة لوحدة الأصول الثابتة." />
  <LandingCard icon="🏠" title="أدوات العقارات" link="/ar/admin/reprocessing/real-estate-utilities.md" details="استعلامات مساعدة لوحدة العقارات." />
  <LandingCard icon="⚙️" title="عمليات قاعدة البيانات" link="/ar/admin/reprocessing/db-operations.md" details="عمليات خاصة بقاعدة البيانات للحفاظ على التنصيب." />
  <LandingCard icon="🚀" title="اقتراح Indexes لجداول التفاصيل" link="/ar/admin/reprocessing/suggest-index-creation.md" details="اقتراح Indexes لتسريع جداول التفاصيل الكبيرة." />
  <LandingCard icon="🧰" title="استعلامات عامة متعددة الأغراض" link="/ar/admin/reprocessing/general-purpose-utility-queries.md" details="مجموعة من الاستعلامات المساعدة العامة متعددة الأغراض." />
  <LandingCard icon="🔗" title="أدوات النسخ المتطابق" link="/ar/admin/reprocessing/replication.md" details="أدوات للتعامل مع النسخ المتطابق لقاعدة البيانات." />
</LandingGrid>

## أدوات الرسائل

<LandingGrid>
  <LandingCard icon="📨" title="دليل لغة Tempo" link="/ar/admin/tempo.md" details="أنشئ تنبيهات وبريدًا إلكترونيًا ورسائل SMS ورسائل تحقق ديناميكية تتضمّن قيم السجلات." />
</LandingGrid>
