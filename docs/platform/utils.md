# روابط الأدوات المساعدة (Utility Links) {#Utility-Links}
::: danger
يحتوي هذا الملف على روابط قد تكون خطرة. يُرجى التعامل بحذر عند استخدام أي من الأدوات المذكورة.
:::

<ServerBaseURL/>
::: tip
- أدخل عنوان URL للخادم الخاص بالعميل الذي تعمل معه
- يمكنك أيضًا تخصيص قيم المعاملات الافتراضية باستخدام حقول الإدخال المتوفرة.
- استخدم زر النسخ لتسهيل تشغيل الأدوات.
:::

## إعادة الحفظ من ملف - Recommit From File: (للمسؤول) {#Recommit-From-File---For-admin-}
<UtilityLinkBuilder
className="com.namasoft.erp.gui.server.RecommitFromFile"
:params="[
{ title: 'Main File', default: 'e:/rc/recommit.txt' },
{ title: 'Done File', default: 'e:/rc/done.txt' },
{ title: 'Errors File', default: 'e:/rc/errors.txt' }
]" :gui = "true"
/>

## إعادة تطبيق قيود عقود مبيعات العقارات: {#ReApply-Real-Estate-Sales-Contracts-System-Entries-}

<UtilityLinkBuilder 
className="com.namasoft.modules.realstate.domain.utils.RESysEntryMigratorUtility"/>

## إعادة تطبيق قيود عقود الإيجار: {#ReApply-Rent-Contracts-System-Entries-}
<UtilityLinkBuilder
className="com.namasoft.modules.realstate.domain.utils.UpdateREReservationEntryUtil"/>

## إعادة النسخ من ملف - Re-Replicate From File: (للمسؤول) {#Re-Replicate-From-File---For-admin-}
<UtilityLinkBuilder
className="com.namasoft.erp.gui.server.ReplicateFromFile"
:params="[
{ title: 'Main File', default: 'e:/rc/recommit.txt' },
{ title: 'Done File', default: 'e:/rc/done.txt' },
{ title: 'Errors File', default: 'e:/rc/errors.txt' }
]" :gui = "true"
/>

## الحذف من ملف - Delete From File: {#Delete-From-File-}
<UtilityLinkBuilder
className="com.namasoft.erp.gui.server.DeleteFromFile"
:params="[
{ title: 'Main File', default: 'e:/rc/delete.txt' },
{ title: 'Done File', default: 'e:/rc/done-delete.txt' },
{ title: 'Errors File', default: 'e:/rc/delete-errors.txt' }
]" :gui = "true"
/>


## إعادة توليد دفتر الأستاذ من ملف - Regen Ledger from file - Accounting Effects: {#Regen-Ledger-from-file---Accounting-Effects-}
<UtilityLinkBuilder
className="com.namasoft.erp.gui.server.RegenAccFromFile"
:params="[
{ title: 'Main File', default: 'e:/rc/regen-ledger.txt' },
{ title: 'Done File', default: 'e:/rc/regen-ledger-delete.txt' },
{ title: 'Errors File', default: 'e:/rc/regen-ledger-errors.txt' }
]" :gui = "true"
/>

## التصدير إلى خادم آخر من ملف - Export To Another Server From File: {#Export-To-Another-Server-From-File-}
<UtilityLinkBuilder
className="com.namasoft.erp.gui.server.ExportToServerFromFileByWS"
:params="[
{ title: 'Main File', default: 'e:/rc/export.txt' },
{ title: 'Done File', default: 'e:/rc/export-delete.txt' },
{ title: 'Errors File', default: 'e:/rc/export-errors.txt' },
{ title: 'Export To Server URL', default: 'http://localhost:7070/' }
]" :gui = "true"
/>


## التصدير إلى خادم آخر من ملف باستخدام جداول Excel: {#Export-To-Another-Server-from-File-Using-Excel-Sheets-}
<UtilityLinkBuilder
className="com.namasoft.erp.gui.server.ExportToServerFromFileByExcel"
:params="[
{ title: 'Main File', default: 'e:/rc/export.txt' },
{ title: 'Done File', default: 'e:/rc/export-delete.txt' },
{ title: 'Errors File', default: 'e:/rc/export-errors.txt' },
{ title: 'Export To Server URL', default: 'http://localhost:7070/' }
]" :gui = "true"
/>

## الحصول على السجلات غير المحفوظة - Get Not Commited: (يمكن استخدامه مع الحذف، يقارن ملفين فقط) {#Get-Not-Commited---can-be-used-with-delete--it-just-compares-two-files-}
<UtilityLinkBuilder
className="com.namasoft.erp.gui.server.CompareTwoFiles"
:params="[
{ title: 'First File', default: 'e:/rc/recommit.txt' },
{ title: 'Second File', default: 'e:/rc/export-delete.txt' }
]" :gui = "true"
/>

## إعادة إنشاء قيود حالة الموظف: {#ReCreate-Employee-State-System-Entries-}
<UtilityLinkBuilder
className="com.namasoft.modules.humanresource.domain.entities.utils.MigrateEmpStateEntry"
/>

## قيود إجازات الموظفين: {#Employee-Vacation-System-Entries-}
- إعادة إنشاء قيود الإجازات لجميع الموظفين
<UtilityLinkBuilder
className="com.namasoft.modules.humanresource.domain.entities.utils.VacationsSysEntryMigratorForAllEmps"
/>

- لمعالجة الموظفين العاملين فقط:
<UtilityLinkBuilder
className="com.namasoft.modules.humanresource.domain.entities.utils.VacationsSysEntryMigratorForWorkingEmps"
/>

-- للسماح للنظام بالاستئناف بعد حدوث خطأ:
<UtilityLinkBuilder
className="com.namasoft.modules.humanresource.domain.entities.utils.VacationsSysEntryMigratorForAllEmps"
:params="[
{ title: 'Processed Employees File', default: 'e:/rc/processed-employees.txt' }
]"
/>

::: tip
سيتم وضع معرّفات الموظفين المعالَجين في e:/rc/processed-employees.txt
:::

- للسماح للنظام بالاستئناف بعد خطأ وتحديد تاريخ البدء
  <UtilityLinkBuilder
  className="com.namasoft.modules.humanresource.domain.entities.utils.VacationsSysEntryMigratorForAllEmps"
  :params="[
  { title: 'Processed Employees File', default: 'e:/rc/processed-employees.txt', id:'file' },
  { title: 'Start From Date', default: 'yyyyMMdd', id:'date' }
  ]"
  />

::: tip
سيتم وضع معرّفات الموظفين المعالَجين في e:/rc/processed-employees.txt، والتاريخ بصيغة yyyyMMdd
:::

- لمعالجة موظفين محددين بالرمز:
  <UtilityLinkBuilder
  className="com.namasoft.modules.humanresource.domain.entities.utils.VacationsSysEntryMigratorForAllEmps"
  :params="[
  { title: 'Employee Codes', default: 'E001-E002-E003', id:'codes' }
  ]"
  />

## إعادة إنشاء قيود حالة العناصر الفرعية: {#Recreate-Sub-Item-Status-Entries-}
<UtilityLinkBuilder
className="com.namasoft.modules.srvcenter.domain.utils.SubItemStatusSysEntryRecalculateUtil"
:params="[
{ title: 'Types To Process File', default: 'e:/rc/toProcessTypes.txt', id:'file' }
]"
/>


## إعادة توليد ملخص الموافقات {#Regenerate-Approvals-Summary}
<UtilityLinkBuilder
className="com.namasoft.infra.domainbase.common.approval.RecalcSummaryUtil"
/>

## إزالة الموافقات الوهمية - Remove Zombie Approvals: {#Remove-Zombie-Approvals-}
<UtilityLinkBuilder
className="com.namasoft.infra.domainbase.common.approval.FixZombieApprovalUtil"
/>

## إعادة توليد حركات المخزون من ملف: {#Regenerate-Inventory-Transactions-from-File-}
<UtilityLinkBuilder
className="com.namasoft.modules.supplychain.domain.utils.plugnplay.RegenInvTransReqFromFile"
:params="[
{ title: 'Main File', default: 'e:/rc/regen-inv-trans.txt' },
{ title: 'Done File', default: 'e:/rc/regen-inv-done.txt' },
{ title: 'Errors File', default: 'e:/rc/regen-inv-errors.txt' }
]"
/>

## إعادة معالجة جميع مستندات الأصول الثابتة: {#Reprocess-All-Fixed-Assets-Documents-}
- إعادة إنشاء جميع قيود الأصول الثابتة
<UtilityLinkBuilder
className="com.namasoft.modules.fixedassets.domain.utils.SWSUpdatePropertyEntryUtil"
/>

- إعادة إنشاء جميع قيود الأصول الثابتة وإعادة حساب أقساط الإهلاك
::: danger
انتبه، ستتغير قيم الإهلاك
:::
<UtilityLinkBuilder
  className="com.namasoft.modules.fixedassets.domain.utils.SWSUpdatePropertyEntryAndRecalcDepreciationUtil"
/>

- إعادة الحساب وإزالة الأصول الموجودة في مستندات منع الإهلاك
  <UtilityLinkBuilder
  className="com.namasoft.modules.fixedassets.domain.utils.SWSUpdatePropertyEntryAndRecalcDepreciationAndRemovePreventedAssetsUtil"
  />


- إعادة معالجة مستندات أصول ثابتة محددة:
  <UtilityLinkBuilder
  className="com.namasoft.modules.fixedassets.domain.utils.SWSUpdatePropertyEntryUtil"
  :params="[
  { title: 'Processed Assets File', default: 'e:/rc/processed-assets.txt', id:'file' },
  { title: 'Asset IDS' , default: 'ffff01,ffff02', id: 'ids' }
  ]"
  />
