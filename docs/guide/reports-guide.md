# Reports Guide (Jasper Reports)
### Add the company logo to a report

- Create a parameter named `loginLegalEntityLogo` with type `java.lang.Object` or `java.io.InputStream`
- Create an image, image expression should be `$P{loginLegalEntityLogo}`

- To add any attachment to a report:
```groovy
NamaRep.getFile($F{attachmentId})
//OR
NamaRep.getAttachment($F{attachmentId})
```

## System Parameters in Reports
::: details Here is the list of all system parameters
```groovy
loginLanguage: Arabic, or English
formEntityType: the entity type for the form (Can be used for translation)
loginLegalEntityId
loginLegalEntityCode
loginLegalEntityName1
loginLegalEntityName2
loginLegalEntityLogo
loginLegalEntityLogo2
loginLegalEntityLogo3
loginLegalEntityLogo4
loginLegalEntityLogo5
reportsFooterNote1
reportsFooterNote2
loginSectorId
loginSectorCode
loginSectorName1
loginSectorName2
loginBranchId
loginBranchCode
loginBranchName1
loginBranchName2
loginAnalysisSetId
loginAnalysisSetCode
loginAnalysisSetName1
loginAnalysisSetName2
loginDepartmentId
loginDepartmentCode
loginDepartmentName1
loginDepartmentName2
loginUserId
loginUserTreatAsAuthorIds
loginUserCode
loginUserName1
loginUserName2
loginEmployeeId
publicLegalEntityId
publicSectorId
publicBranchId
publicDepartmentId
publicAnalysisSetId
guiServerURL
externalServerURL
loginLanguage
originalLoginLanguage
formEntityType
analysisSetNotUsedInSecurity
sectorNotUsedInSecurity
departmentNotUsedInSecurity
branchNotUsedInSecurity
legalEntityNotUsedInSecurity
accessibleAnalysisSetIds
accessibleDepartmentIds
accessibleBranchIds
accessibleLegalEntityIds
accessibleSectorIds
concernedLines
candidateEmployeeId
candidateEmployeeCode
candidateEmployeeName1
candidateEmployeeName2
approvedRecordId
approvedRecordType
approvedRecordCode
approvalSecret
approvalStepSeq
reportCode
reportName1
reportName2
reportId
namaReportInstance
currentGUIURL
currentReplicationSited
currentReplicationSiteCode
currentReplicationSiteName1
currentReplicationSiteName2
allowedCapabilities
allowedEntities
allowedDocuments
allowedFiles
notAllowedEntities
notAllowedDocuments
notAllowedFiles
posShiftCode
runId
```
::
### Subreports

You can include subreports within a main report. A subreport can either be:

* Another existing report, or
* An external report file.

To link a subreport, create a parameter with the **same ID** as the subreport. The parameter type should be either `java.io.InputStream` or `java.lang.Object`, depending on how the subreport is being passed.


### Extra Resources (e.g., Images)

You can also attach additional resources—such as images—to a report.
To use a resource within the report, define a parameter with the **same ID** as the resource. The parameter type should be `java.lang.Object`.


### How to Get Day Name of a Date
```groovy
NamaRep.dayName($F{dateField})
NamaRep.enDayName($F{dateField})
NamaRep.arDayName($F{dateField})
```
### To translate an enum
```groovy
NamaRep.translate(enumValue)
```
### To select name1, name2 or code, altCode based on language
```groovy
NamaRep.name(arabic,english)  
```
where arabic = name1 or code, english = name2 or altCode

### Calculate The Price of an Item

```groovy
NamaRep.priceCalculator().item($F{item}).uom($F{UOM}).qty($F{Quantity}).unitPriceOnly().price()
```
- This will calculate unit price only for the item with the qty and uom
::: tip
- This expression returns a full price Object. 
- You should put the result in a variable
  - The variable Class should be `java.lang.Object`
  - Calculation `No Calculation Function`
  - Increment type `None`
  - Reset type `None`
:::
- The following is a list of all functions you can use to create a price calculation request
- The `price()` or `unitPrice()` function must be the last one in the expression
::: details Here are all the available functions
```groovy
item($F{itemIdOrCode})
customer($F{customerIdOrCode})
supplier($F{supplierIdOrCode})
uom($F{uomIdOrCode})
invoiceClassification($F{classificationIdOrCode})
ic($F{classificationIdOrCode})
legalEntity($F{legalEntityIdOrCode})
le($F{legalEntityIdOrCode})
sector($F{sectorIdOrCode})
sc($F{sectorIdOrCode})
branch($F{branchIdOrCode})
br($F{branchIdOrCode})
department($F{departmentIdOrCode})
dep($F{departmentIdOrCode})
analysisSet($F{analysisSetIdOrCode})
anset($F{analysisSetIdOrCode})
priceClassifier1($F{priceClassifier1IdOrCode})
pc1($F{priceClassifier1IdOrCode})
priceClassifier2($F{priceClassifier2IdOrCode})
pc2($F{priceClassifier2IdOrCode})
priceClassifier3($F{priceClassifier3IdOrCode})
pc3($F{priceClassifier3IdOrCode})
priceClassifier4($F{priceClassifier4IdOrCode})
pc4($F{priceClassifier4IdOrCode})
priceClassifier5($F{priceClassifier5IdOrCode})
pc5($F{priceClassifier5IdOrCode})
revision($F{revision})
color($F{colorCode})
size($F{size})
qty($F{qty})
date($F{date})
unitPriceOnly()
```
:::
- Assuming the variable you created is named price, here is a list of all expressions you can use to extract price components
::: details Click to view all the available variables
```groovy
$V{price}.custom.primitiveValue
$V{price}.discount1.afterValue.primitiveValue
$V{price}.discount1.maxNormalPercent.primitiveValue
$V{price}.discount1.percentage.primitiveValue
$V{price}.discount1.value.primitiveValue
$V{price}.discount2.afterValue.primitiveValue
$V{price}.discount2.maxNormalPercent.primitiveValue
$V{price}.discount2.percentage.primitiveValue
$V{price}.discount2.value.primitiveValue
$V{price}.discount3.afterValue.primitiveValue
$V{price}.discount3.maxNormalPercent.primitiveValue
$V{price}.discount3.percentage.primitiveValue
$V{price}.discount3.value.primitiveValue
$V{price}.discount4.afterValue.primitiveValue
$V{price}.discount4.maxNormalPercent.primitiveValue
$V{price}.discount4.percentage.primitiveValue
$V{price}.discount4.value.primitiveValue
$V{price}.discount5.afterValue.primitiveValue
$V{price}.discount5.maxNormalPercent.primitiveValue
$V{price}.discount5.percentage.primitiveValue
$V{price}.discount5.value.primitiveValue
$V{price}.discount6.afterValue.primitiveValue
$V{price}.discount6.maxNormalPercent.primitiveValue
$V{price}.discount6.percentage.primitiveValue
$V{price}.discount6.value.primitiveValue
$V{price}.discount7.afterValue.primitiveValue
$V{price}.discount7.maxNormalPercent.primitiveValue
$V{price}.discount7.percentage.primitiveValue
$V{price}.discount7.value.primitiveValue
$V{price}.discount8.afterValue.primitiveValue
$V{price}.discount8.maxNormalPercent.primitiveValue
$V{price}.discount8.percentage.primitiveValue
$V{price}.discount8.value.primitiveValue
$V{price}.headerDicount.afterValue.primitiveValue
$V{price}.headerDicount.maxNormalPercent.primitiveValue
$V{price}.headerDicount.percentage.primitiveValue
$V{price}.headerDicount.value.primitiveValue
$V{price}.netValue.primitiveValue
$V{price}.${price}.primitiveValue
$V{price}.tax1.afterValue.primitiveValue
$V{price}.tax1.maxNormalPercent.primitiveValue
$V{price}.tax1.percentage.primitiveValue
$V{price}.tax1.value.primitiveValue
$V{price}.tax2.afterValue.primitiveValue
$V{price}.tax2.maxNormalPercent.primitiveValue
$V{price}.tax2.percentage.primitiveValue
$V{price}.tax2.value.primitiveValue
$V{price}.tax3.afterValue.primitiveValue
$V{price}.tax3.maxNormalPercent.primitiveValue
$V{price}.tax3.percentage.primitiveValue
$V{price}.tax3.value.primitiveValue
$V{price}.tax4.afterValue.primitiveValue
$V{price}.tax4.maxNormalPercent.primitiveValue
$V{price}.tax4.percentage.primitiveValue
$V{price}.tax4.value.primitiveValue
$V{price}.totalCashShare.primitiveValue
$V{price}.totalPaymentMethodShare.primitiveValue
$V{price}.unitPrice.primitiveValue
``` 
:::
Here's a clean and organized version in English, suitable for your VuePress documentation site:

---

## Links to Entities, Attachments, and Reports

### Entity Links

* Create a simple link to an entity:

  ```groovy
  NamaRep.link(entityType, id)
  ```

* Create a link to an entity using menu code and view name:

  ```groovy
  NamaRep.link()
    .entityType($F{entityType})
    .id($F{id})
    .viewName("theViewName")
    .menuCode("abcMenu")
    .toString();
  ```

### Attachment Links

* Create a link to an attachment (file):

  ```groovy
  NamaRep.attachmentLink(id)
  ```

### Report Links

* Create a link to another report:

  ```groovy
  NamaRep.repLinkByCode($P{REPORT_PARAMETERS_MAP}, "ReportCode")
    .p("p1 id").v(value expression)
    .p("p2 id").v(value expression)
    .toString()
  ```

* Copy all shared parameters from the current report:

  ```groovy
  NamaRep.repLinkByCode($P{REPORT_PARAMETERS_MAP}, "code").copyParams()
  ```

### Add Reference Parameters

Use any of the following expressions to pass references:

```groovy
v($F{id}, $F{entity}, $F{code}, $F{name1}, $F{name2})
v($F{id}, $F{entity}, $F{code})
ref($F{entityType}, $F{id})
refCode($F{entityType}, $F{code})
```

### Report Link Examples

```groovy
NamaRep.repLinkByCode($P{REPORT_PARAMETERS_MAP}, "Statement")
  .copyParams()
  .p("fromAccount").v($F{accountId}, $F{accountEntityType}, $F{accountCode})
  .p("toAccount").v($F{accountId}, "Account", $F{accountCode})
  .toString()
```

```groovy
NamaRep.repLinkByCode($P{REPORT_PARAMETERS_MAP}, "SalesProfitSummary")
  .copyParams($P{REPORT_PARAMETERS_MAP})
  .p("SalesInvoice").ref("SalesInvoice", $F{SSIid})
  .p("cust").refCode("Customer", "Customer501")
  .p("fromDate").v("23-04-2014")
  .p("showDetails").v("true")
  .toString()
```

```groovy
NamaRep.repLinkByCode($P{REPORT_PARAMETERS_MAP}, "SubsidiaryAccountStatement")
  .p("subsidiaryType").v($F{CustomerEntityType})
  .p("fromSubsidiary").v($F{customerId}, $F{CustomerEntityType}, $F{customerCode})
  .p("toSubsidiary").v($F{customerId}, $F{CustomerEntityType}, $F{customerCode})
  .p("accuontType").v("mainAccount")
  .toString()
```

### Public Report Links (No Authentication)

To share a report link externally (e.g. to a customer) without requiring login:

```groovy
NamaRep.repLinkByCode($P{REPORT_PARAMETERS_MAP}, "ARG000046-report")
  .p("Code_Equals").ref($F{entityType}, $F{id})
  .toNoAuthResultLink()
```

::: tip URL Shortening in Reports
You can shorten report URLs using:

```groovy
NamaRep.shortenURL(serverurl, signature, url)
```

See `{shortenurl()}` section in the Tempo help for more info.
:::

---

## Creating Entities from Reports (Creators)

* Example: create a Receipt Voucher from an Invoice:

  ```groovy
  NamaRep.newWithFields("ReceiptVoucher")
    .f("term").value("POTermCode")
    .f("book").value("POBook1")
    .f("remarks").v("Auto Created")
    .f("fromDoc#type").v("SalesInvoice")
    .f("fromDoc#code").v($F{code})
    .toString()
  ```

* You can also use:

```groovy
NamaRep.creator("ReceiptVoucher")
```

### Creating with Line-Level Details

1. Create a variable called `creatorLink` with initial value expression:

```groovy
NamaRep.newWithFields("PurchaseOrder").field("term").value("P.Order.Term").root()
```

2. For line-level expression:

```groovy
$V{creatorLink}.field("details.item.itemCode").value($F{code}).row($V{REPORT_COUNT})
```

3. To generate the full link:

```groovy
$V{creatorLink}.toString()
```

### Optional: Specify Menu Code or View Name

```groovy {2,3}
NamaRep.newWithFields("ReceiptVoucher")
  .viewName("NormalReceipts")
  .menuCode("NormalReceiptMenu")
  .f("term").value("POTermCode")
  .f("book").value("POBook1")
  .toString()
```

### Find employee vacation balances
```groovy
NamaRep.getVacation1RemainderBalance(empIdOrCode)
NamaRep.getVacation2RemainderBalance(empIdOrCode)
NamaRep.getVacation3RemainderBalance(empIdOrCode)
NamaRep.getVacationRemainderBalance(empCodeOrId,vacationTypeIdOrCode)
NamaRep.getVacationRemainderBalance(empCodeOrId,vacationTypeIdOrCode,atDate)
```

### Approvals in Reports
- Create Links to approve, reject, return, and so on
```groovy
NamaRep.approveAllLink($P{REPORT_PARAMETERS_MAP})
NamaRep.rejectAllLink($P{REPORT_PARAMETERS_MAP})
NamaRep.returnAllLink($P{REPORT_PARAMETERS_MAP})
NamaRep.returnAllToPreviousStepLink($P{REPORT_PARAMETERS_MAP})
```
- If you have approval per line (concerned lines, used mainly in supply chain documents)
```groovy
NamaRep.approveLink($P{REPORT_PARAMETERS_MAP},$F{lineNumber})
NamaRep.approveLink($P{REPORT_PARAMETERS_MAP},$F{lineNumber},reasoncodeOrId) // same for all remaining links
NamaRep.rejectLink($P{REPORT_PARAMETERS_MAP},$F{lineNumber})
NamaRep.returnLink($P{REPORT_PARAMETERS_MAP},$F{lineNumber})
NamaRep.returnToPreviousStepLink($P{REPORT_PARAMETERS_MAP},$F{lineNumber})
```
- Another alternative would be to use the `approveAllLink` method
```groovy
NamaRep.approveAllLink($P{REPORT_PARAMETERS_MAP},decision)
```
::: tip Allowed Values for decision

Decision can be one of: `Approve` , `Reject` , or `Return`
:::
- To show approval dialog by clicking on a link, use the following code sample
```groovy
NamaRep.approveFromJS(entityType, entityId, nextStepName, concernedLines, nextStepSeq, summary)
```
- Find if a line is concerned in approval
```groovy
NamaRep.isConcernedLine($P{REPORT_PARAMETERS_MAP},$F{lineNumber})
```


### Run SQL Statement inside a report
```groovy
NamaRep.runSQLQuery(sql,paramName,paramValue,paramName,paramValue)
```
### Transform HTML to text (HTML Parsing)
```groovy
NamaRep.htmlToText(text)
```
## Miscellaneous

### Time To String Functions in Reports
- `NamaRep.timeToString`: converts milliseconds to hours:minutes, example 9120000 becomes 02:32
- `NamaRep.timeToStringNullable`:  same as previous, but 0 is converted to null instead of 00:00
- `NamaRep.decimalToString`: converts hours to hours:minutes, example 9.5 becomes 09:30 and 9.25 becomes 9:15
- `NamaRep.decimalToStringNullable`: same as previous, but 0 is converted to null instead of 00:00

### To convert date to Hijri

```groovy
NamaRep.toHijri($F{date})
NamaRep.hijriDay($F{date})+"/"+NamaRep.hijriMonth($F{date})+"/"+NamaRep.hijriYear($F{date})
NamaRep.hijri_yyyyMMdd($F{date})
```

### To execute query:
```groovy
NamaRep.executeQuery("select cast(w.name1 collate Arabic_CI_AI_KS_WS as varchar(250)) from warehouse w where w.id = :wid"
        ,"wid",$F{wid})
```

### To Get Configuration Field:
```groovy
NamaRep.getValueFromModuleConfig(moduleId,fieldId)
```
- Example:
```groovy
NamaRep.getValueFromModuleConfig("basic","value.info.useCurrentUserAsSalesMan")
```

This will get the value of the field: value.info.useCurrentUserAsSalesMan from global config

- Here are the available module names:
```
accounting
basic
supplychain
fixedassets
humanresource
dms
project
ecpa
manufacturing
srvcenter
crm
contracting
travel
realestate
housing
auditing
education
namapos
mc
```
::: rtl

## كيفية التصفية حسب الشركة، أو القطاع، أو أي مُحدد آخر

نفترض أنك ترغب في تصفية البيانات بناءً على منشئ السجل، وصلاحيات التعديل أو العرض، وكذلك حسب الشركة أو القطاع أو الفرع أو غير ذلك من المُحددات ضمن سجل الحساب. للقيام بذلك، اتبع الخطوات التالية:

### 1. إنشاء مُدخل مخفي باسم `SECURITY_CONSTRAINTS`

أنشئ مُدخلًا (Parameter) من النوع `String`، واختر له خيار "Not For Prompting" لكي لا يظهر للمستخدم، وعيِّن له **التعبير (Expression)** الافتراضي التالي:

```groovy
NamaRep.security()
    .fieldEntityType("Account")
    .tableAlias("acc")
    .capabilities("firstAuthor", "viewCapability", "usageCapability", "updateCapability", "legalEntity", "branch", "sector", "department", "analysisSet")
```

شرح مكونات التعبير (Expression):

```groovy
NamaRep.security().fieldEntityType("Account")
```

هذا الجزء يُخبر النظام بأن التصفية ستُطبق على كيان "الحساب". لذلك، لن يُضاف شرط صلاحية العرض إذا كان لدى المستخدم الصلاحيات الكاملة، أو إذا كنت قد فعّلت خيار تجاهل صلاحية العرض من إعدادات تحسين الأداء.

```groovy
.tableAlias("acc")
```

هنا تُحدد الاسم المستعار (alias) لجدول الحسابات داخل الاستعلام، بحيث يعرف النظام أين يطبّق التصفية.

```groovy
.capabilities(...)
```

في هذا الجزء، تُحدد أسماء المُحددات التي ترغب في أن تشملها التصفية. على سبيل المثال، إذا كنت ترغب في التصفية فقط حسب الشركة والفرع، استخدم ما يلي:

```groovy
.capabilities("legalEntity", "branch")
```

يكفي أن تُدرج أسماء المُحددات فقط دون الحاجة إلى تفاصيل إضافية.


### 2. استخدام المُدخل داخل الاستعلام

قم بإدراج المُدخل `SECURITY_CONSTRAINTS` ضمن جملة `WHERE` في الاستعلام الخاص بك، على النحو التالي:

```sql
SELECT a, b, c 
FROM Table1 t1 
LEFT JOIN Table2 t2 ON t2.id = t1.someId 
WHERE t1.code <> 'abc' AND $P!{SECURITY_CONSTRAINTS}
```

يمكنك استخدام أي اسم يناسبك بدلًا من `SECURITY_CONSTRAINTS`.

---

### 3. التصفية حسب أكثر من جدول

إذا كنت ترغب في تطبيق التصفية على أكثر من جدول، يمكنك استخدام الصيغة التالية:

```groovy
NamaRep.security()
    .fieldEntityType("Account")
    .tableAlias("Account")
    .capabilities("firstAuthor", "viewCapability")
+ " AND " +
NamaRep.security()
    .fieldEntityType("FiscalYear")
    .tableAlias("FiscalYear")
    .capabilities("legalEntity", "branch", "sector")
```

قم بتكرار هذا الجزء بعدد الجداول المطلوبة، مع استخدام `AND` للفصل بين كل جزء وآخر.
:::

::: tip Summary In English

**Filtering Data by Legal Entity, Sector, or Other Dimensions**

- This section explains how to apply security-based filtering on reports according to various criteria such as first author, 
user permissions (view, update), legal entity (company), branch, sector, department, and other analysis sets. 
- The filtering is done by creating a hidden string parameter that defines the security constraints for a specific entity or table alias in the query.
- You can specify which capabilities or dimensions to filter on, and then include this parameter as a condition in your SQL or report query.
- When filtering on multiple tables, combine multiple security constraints with logical AND. T
- his approach helps enforce data visibility and editing rights dynamically based on user roles and organizational structure.

:::

## To translate a header and sub titles:
- Suppose that id = "xxx | yyy"
  - NamaRep.head(id) ⇒ xxx
  - NamaRep.sub(id) ⇒ yyy
## Numeric Fields Helpers
```groovy
NamaRep.zeroIfNull(fieldOrVariable)
NamaRep.oneIfZero(fieldOrVariable)
NamaRep.nullIfZero(fieldOrVariable)
```
## How to create report with different pages sizes
::: rtl
- كيفية إنشاء تقرير يحتوي على تقارير فرعية بأحجام صفحات مختلفة باستخدام JasperReports
يمكنك تنفيذ هذا النوع من التقارير بسهولة باستخدام JasperReports من خلال الخطوات التالية:

1. **إنشاء تقرير من نوع Book:**

  * ابدأ بإنشاء تقرير رئيسي من نوع *Book Report*.

2. **كتابة الجملة الشرطية:**

  * أضف جملة SQL بسيطة تتضمن الحقول التي ستُستخدم لتحديد شروط ظهور الأجزاء المختلفة.

3. **إضافة التقارير الفرعية:**

  * من خلال خيار **Add Part to Content**، أضف كل تقرير فرعي (Part) ترغب في إدراجه داخل التقرير الرئيسي.

4. **تحديد شروط الطباعة لكل Part:**

  * استخدم **Print When Expression** لتحديد متى يظهر كل جزء بناءً على الشروط التي حددتها مسبقًا.

5. **تمرير المتغيرات والمدخلات:**

  * يجب تعريف جميع المدخلات المطلوبة مسبقًا، ثم تمريرها لكل جزء بالطريقة نفسها المستخدمة مع التقارير الفرعية التقليدية (*Sub Reports*).

### مثال:

نموذج طباعة يحتوي على جزأين بحجمي صفحات مختلفين: A4 و A3، يتم إظهار كل جزء بناءً على شرط مستخرج من حقل "الملحوظة" في السند. ويتضمن كل جزء تقارير فرعية داخله.

* 📥 [تحميل ملف الإكسيل للاستيراد](https://docs.google.com/spreadsheets/d/1TPjsTwB2fcCIth0JB30AqbmIxPymgEbG/edit?usp=sharing&ouid=106365317117679104835&rtpof=true&sd=true)
* 📎 [تحميل المرفق للاستيراد](https://drive.google.com/file/d/1r1FraUmyLue9xyOHURnzzKTKoap_hxQQ/view?usp=sharing)
:::
Refer to development request [SRDRQ05261](https://namasoft.com/reqs/SRDRQ05261)

## Kill Reports Running for more than n seconds
Refer to development request [ECPADR00932](https://namasoft.com/reqs/ECPADR00932)
::: rtl
* ⏱️ إيقاف التقارير التي تجاوزت وقت تنفيذ معين

عند تشغيل تقارير كبيرة، قد يؤدي الضغط على النظام أحيانًا إلى عدم قدرة المستخدمين الجدد على تسجيل الدخول. وفي بعض الحالات، نضطر إلى إيقاف خدمة **Tomcat** وإعادة تشغيلها لحل المشكلة.

لذا تم إنشاء أداة تقوم بإيقاف أي تقرير تجاوز وقت تنفيذ معين (مثلاً 10 أو 120 ثانية)، دون الحاجة لإعادة تشغيل الخادم. 

---

### 🔧 خطوات التفعيل:

1. **تعديل إعدادات الوقت في ملف `nama.properties`:**

   أضف السطر التالي أو عدله:

   ```ini
   kill-reports-running-more-than-seconds=120
   ```

  * الرقم `120` يمثل الحد الأقصى لعدد الثواني المسموح بها لتشغيل التقرير.
  * يمكنك تغييره لأي قيمة زمنية حسب الحاجة.

---

2. **تشغيل رابط المعالجة اليدوية:**

   بعد حفظ الإعداد، شغّل الرابط التالي:
<NamaURL url="basic-services/monitorlogin?reload-config-and-kill-running-reports=true" removeERPPart />
   
  * هذا الرابط يقوم بإعادة تحميل الإعدادات من ملف `nama.properties`، ثم يقوم بإغلاق جميع التقارير التي تجاوز وقت تنفيذها الحد المحدد.

:::

## Tafqeet 
- You can use any of the following expressions inside your jasper report:
```groovy
NamaRep.tafqeet(currencyCode,number)
NamaRep.tafqeetArabic(currencyCode,number)
NamaRep.tafqeetEnglish(currencyCode,number)
NamaRep.tafqeetFrench(currencyCode,number)
```
The configuration for currencies tafqeet can be found in <GlobalConfigOption option-code="value.info.tafqeetInfo.currencyCode" link-title="Tafqeet Info"/>

## Miscellaneous 
- To use Arabic (hindu) numerals use
  '٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'
```groovy
NamaRep.arNumbers(value)
```
- To get saudi riyal symbol for reports, add an image, make the expression 
```groovy
NamaRep.sar()
```
- To get period between a start date and today, (years, months, days):
  - Create variable period with reset type none, increment type none
  - Variable expression should be:
```groovy
java.time.Period.between(new java.util.Date($F{FromDate}.getTime()).toInstant().atZone(java.time.ZoneId.systemDefault()).toLocalDate(), java.time.LocalDate.now())
```
  - Use the following in the text field expression you:
```groovy
$V{period}.getYears()+"  "+"سنة"+"  "+$V{period}.getMonths()+"  "+"شهر"+"  "+$V{period}.getDays()+"  "+"يوم"
```

Here’s a clearer and more polished version of your text:

---

### List Parameters (Multi-Selection)

To define a parameter that supports multiple selections, follow these guidelines:

* Set the property `list = true`.
* If the list is **not** of type `Reference`, you must also specify the `listType` property.
* To capture the selected values for display purposes, you can define additional parameters:

  * `<parameterName>_csv`: Receives the translated values as a CSV string.
  * `<parameterName>_codecsv`: Receives the codes of the selected values as a CSV string.
  * `<parameterName>_name1csv`: Receives the `name1` fields of the selected values as a CSV string.
  * `<parameterName>_name2csv`: Receives the `name2` fields of the selected values as a CSV string.
* To prevent the automatic display of the selection grid, set the property `doNotAutoShowList = true`.

::: details Example:

```xml
<parameter name="MultiEmployee" class="java.util.List">
    <property name="entityType" value="Employee"/>
    <property name="arabic" value="الموظفين"/>
    <property name="english" value="Employees"/>
    <property name="property" value="code"/>
    <property name="list" value="true"/>
    <property name="doNotAutoShowList" value="false"/>
</parameter>

<parameter name="MultiEmployee_csv" class="java.lang.String" isForPrompting="false"/>

<parameter name="MultiDate" class="java.util.Date">
    <property name="english" value="Dates"/>
    <property name="arabic" value="التورايخ"/>
    <property name="defaultValue" value="$monthStart()"/>
    <property name="list" value="true"/>
    <property name="listType" value="java.util.Date"/>
</parameter>

<parameter name="MultiDate_csv" class="java.lang.String" isForPrompting="false"/>
```
:::

## Report Properties
- preRunUtil
- questionsChangeUtil
- comparisonType
To use or change any of the previous properties, please consult the development team


## Parameter Properties


#### **Basic Properties**

* **`list`**:

  * `true` or `false`
  * Indicates whether the parameter allows multiple selections (displayed as a selection grid).

* **`listType`**:

  * Required when using non-reference types (e.g., dates, numbers).
  * Example: `java.util.Date`, `java.lang.Integer`.

* **`layout`**:

  * Defines how the parameter is displayed.
  * Options: `alone`, `spanned`, `normal`, `spanned2`.

* **`required`**:

  * `true` or `false`
  * Marks the parameter as mandatory.

* **`requiredGroup`**:

  * Use the same value for multiple parameters to enforce that at least **one** of them must be filled.

* **`hijri`**:

  * `true` or `false`
  * Indicates whether the date should be displayed using the Hijri calendar.

---

#### **Suggestions for Text Fields**

* **`suggestionquery`**:

  * SQL query that returns values for suggestion/autocomplete in text input fields.

  * **Two columns**: First for code, second for Arabic display text.

  * **Three columns**: First for code, second for Arabic, third for English.

  **Examples**:

  ```sql
  SELECT DISTINCT TOP 25 revisionId, revisionName 
  FROM ItemRevision 
  WHERE invItem_id = {fItem} 
    AND (revisionId LIKE '%' + {revision} + '%' OR revisionName LIKE '%' + {revision} + '%')
  ```

  ```sql
  SELECT DISTINCT revisionId 
  FROM ItemDimensionsQty 
  WHERE item_id = {fromItem} 
    AND revisionId LIKE '%' + {revisionId} + '%' 
    AND net <> 0
  ```

---

#### **Reference Selection**

* **`entityType`**:

  * The entity (table) from which records will be selected.

* **`allowedValues`**:

  * A comma-separated list of allowed values.
  * Will render any parameter as a combo box

* **`property`**:

  * The field to extract from the selected record (e.g., `code`, `name1`, `name2`, `startDate`).

* **`enumType`**:

  * Defines the enum type to use for allowed values.
  * Example enums: `EntityTypeDF`, `SubsidiaryType`, `DocumentEntityTypeDF`.

  **Example**:

  ```xml
  <parameter name="entityType" class="java.lang.String">
      <property name="enumType" value="EntityTypeDF"/>
      <property name="allowedValues" value="Employee,Vendor"/>
  </parameter>
  ```

---

#### **Comparative and Display Properties**

* **`type`**:

  * Comparison operators: `>` or `<`
  * For example, `>` will substitute negative infinity if no value is provided.

* **`arabic` / `english`**:

  * Arabic and English display labels.

* **`resource`**:

  * Resource key to use instead of specifying Arabic and English manually.

* **`src`**:

  * Used when you want to reuse a property from another parameter.

* **`ignore`**:

  * If set, the parameter is excluded from prompting (similar to `isForPrompting = false`).

---

#### **Filtering Values**

* **`filter`**:

  * Syntax: `field,operator,value[,relation]`
  * Multiple filters are separated by semicolons.
  * Default relation is `AND`.

  **Operators**:

  ```
  Equal, EqualOrEmpty, NotEqual, NotEqualOrEmpty,
  GreaterThan, GreaterThanOrEmpty, GreaterThanOrEqual, GreaterThanOrEqualOrEmpty,
  LessThan, LessThanOrEmpty, LessThanOrEqual, LessThanOrEqualOrEmpty,
  StartsWith, StartsWithOrEmpty, NotStartsWith, NotStartsWithOrEmpty,
  EndsWith, EndsWithOrEmpty, NotEndWith, NotEndWithOrEmpty,
  Contains, ContainsOrEmpty, NotContain, NotContainOrEmpty,
  OpenBracket, CloseBracket, In
  ```

  * Use `${parameterId}` to reference the value of another parameter in filters.

  **Examples**:

  ```
  forType,Equal,Department,AND;isLeaf,Equal,true
  documentType,Equal,ReceiptVoucher
  forType,Equal,${subsidiaryType}
  ```

---

#### **Default Values**

* **`defaultValue`**:

  * String default value based on the parameter type:

    * **Date**: `dd-MM-yyyy`
    * **Time**: `yyyy-MM-dd'T'HH:mm:ss.SSS`
    * **Reference**: `id:entityType:code`

::: details  **Functions for dynamic defaults**:

``` 
$now()
$today()
$monthStart()
$monthEnd()
$yearStart()
$yearEnd()
$currentFiscalPeriod()
$currentUser()
$currentEmployee()
$todayPlusDays(n)
$todayPlusWeeks(n)
$todayPlusMonths(n)
$todayPlusYears(n)
$quarterStart()
$quarterEnd()
$thirdStart()
$thirdEnd()
$halveStart()
$halveEnd()
$previousMonthStart()
$previousMonthEnd()
$nextMonthStart()
$nextMonthEnd()
$previousYearStart()
$previousYearEnd()
$nextYearStart()
$nextYearEnd()
```
:::
* **For multi-value parameters (List)**:

  * Use `@A=@X` to separate values.
  * Format: `id:entityType:code@A=@Xid:entityType:code@A=@X...`

---

#### **Display Control & Validation**

* **`NamaRep.canDisplay($P{param})`**:

  * Use in `printWhenExpression` to conditionally show elements based on parameter value.

* **`no-mirror = true`**:

  * Prevents mirroring of elements or bands.

---

#### **Range Validation Between Parameters**

* **`fromParam`**:

  * Links a "to" parameter to a "from" parameter to enforce range consistency.

* **`fromParamMaxGapInDays`**:

  * Defines the maximum allowed gap in days between two date parameters. Must be used with `fromParam`.

  **Example**:

  ```xml
  <parameter name="toDate" class="java.util.Date">
      <property name="arabic" value="إلى تاريخ"/>
      <property name="english" value="To Date"/>
      <property name="fromParam" value="fromDate"/>
      <property name="fromParamMaxGapInDays" value="30"/>
  </parameter>
  ```


