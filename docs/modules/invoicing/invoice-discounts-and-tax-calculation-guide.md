# دليل نظام الخصومات وحساب الضرائب على الفواتير - دليل شامل {#Invoice-Discounts-and-Tax-Calculation-System---Comprehensive-Guide}
::: tip
تم إنشاء محتوى هذا الملف تلقائياً باستخدام Claude.ai من خلال مراجعة الكود المصدري لحسابات الخصومات والضرائب. إذا وجدت أي معلومات غير صحيحة، يرجى التواصل مع فريق تطوير Nama ERP.
:::
## نظرة عامة {#Overview}

يوفر Nama ERP نظاماً متطوراً لحساب خصومات الفواتير والضرائب يدعم متطلبات الأعمال المعقدة. يشرح هذا الدليل كيفية حساب الخصومات والضرائب وإعدادها وتطبيقها على الفواتير، مع معلومات تفصيلية على مستوى الحقول.

::: tip الميزات الرئيسية
- دعم 8 خصومات تسلسلية على مستوى السطر بالإضافة إلى خصم واحد على مستوى الرأس
- 4 أنواع ضرائب قابلة للإعداد مع نقاط تطبيق مرنة
- تفاعلات معقدة بين الخصومات والضرائب وترتيب مخصص
- دعم متعدد العملات ومتعدد المعدلات
- خيارات إعداد شاملة لسيناريوهات الأعمال المختلفة
- يمكن إعداد الضريبة كإضافة أو خصم
:::

## فهم تدفق الحساب {#Understanding-the-Calculation-Flow}

### تسلسل الحساب الأساسي {#Basic-Calculation-Sequence}

عند معالجة فاتورة، يتبع Nama ERP تسلسل الحساب العام التالي:

1. **حساب إجمالي السطر**: الكمية × سعر الوحدة = إجمالي السطر
2. **تطبيق خصومات السطر**: تطبيق Discount1 حتى Discount8 بالتسلسل
3. **تطبيق خصم الرأس**: تطبيق خصم واحد على الفاتورة بالكامل
4. **حسابات الضرائب**: تطبيق Tax1 حتى Tax4 عند النقاط المُعدَّة
5. **الإجماليات النهائية**: حساب صافي المبالغ والأرصدة المتبقية

::: info ملاحظة مهمة
يمكن تخصيص التسلسل الدقيق من خلال حقل `effectsConfig` في TaxConfiguration، مما يتيح ترتيبات مختلفة لتطبيق الخصومات والضرائب بناءً على متطلبات الأعمال.
:::

## نظام حل إعدادات الضرائب {#Tax-Configuration-Resolution-System}

### فهم طريقة fetchTaxConfiguration {#Understanding-fetchTaxConfiguration-Method}

تحدد طريقة `fetchTaxConfiguration` في `TaxPlan.java` إعدادات الضريبة المستخدمة من خلال عملية حل هرمية:

```java
public static TaxConfiguration fetchTaxConfiguration(
    TaxPlan header,      // Header tax plan (from document)
    TaxPlan line,        // Line tax plan (from item/line)
    LegalEntity legalEntity, 
    DateDF valueDate,
    EntityTypeDF entityType)
```

#### التسلسل الهرمي للحل {#Resolution-Hierarchy}

1. **أولوية خطة الضريبة في الرأس**
   - يتحقق أولاً من وجود خطة ضريبة في الرأس
   - إذا وُجدت، يتحقق من حقل `defaultTaxConfig`:
     - **GlobalConfig**: يستخدم الإعداد العام على مستوى النظام
     - **TaxPlanHeader**: يستخدم الإعداد من رأس خطة الضريبة
     - **TaxPlanLine**: يستخدم الإعداد من سطور ضريبة الشركة

2. **الرجوع إلى خطة ضريبة السطر**
   - إذا لم توفر خطة الرأس إعداداً، يتحقق من خطة ضريبة السطر
   - يتبع نفس منطق حل `defaultTaxConfig`

3. **الإعداد الافتراضي العام**
   - إذا لم توفر أي خطة إعداداً، يستخدم إعداد النظام العام

### حقول إعداد خطة الضريبة {#Tax-Plan-Configuration-Fields}

#### حقول خطة الضريبة الأساسية {#Core-Tax-Plan-Fields}

| اسم الحقل | حقل قاعدة البيانات | الوصف | التأثير |
|------------|------------------|-------|---------|
| **Item Plan** | `itemPlan` | يشير إلى تطبيق الخطة على الأصناف | عند التفعيل، تُستخدم الخطة لضرائب مستوى الصنف (Tax1, Tax2) |
| **No Item Taxes With This Policy** | `noItemTaxesWithThisPolicy` | تعطيل Tax1 وTax2 | عند التفعيل، تصبح ضرائب الأصناف صفراً بغض النظر عن المعدلات |
| **No Invoice Taxes With This Policy** | `noInvoiceTaxesWithThisPolicy` | تعطيل Tax3 وTax4 | عند التفعيل، تصبح ضرائب الفاتورة صفراً بغض النظر عن المعدلات |
| **Prioritize This Policy Over Policy Specified In Customer and Supplier** | `priorityPolicyOverCusOrSup` | التحكم في أولوية السياسة | عند التفعيل، تتجاوز هذه الخطة إعدادات ضريبة العميل/المورد |
| **Default Tax Configuration** | `defaultTaxConfig` | مصدر إعداد الضريبة | الخيارات: GlobalConfig, TaxPlanHeader, TaxPlanLine |
| **Tax Configuration** | `taxConfiguration` | إعدادات سلوك الضريبة المضمنة | تحتوي على جميع قواعد حساب الضريبة |
| **Legal Entity Taxes** | `legalEntityTaxes` | معدلات الضريبة حسب الشركة والتاريخ | قائمة بمعدلات الضريبة الخاصة بكل شركة |
| **Subsidiary Accounts** | `subsidiaryAccounts` | إعدادات على مستوى الحساب | تحتوي على علامات الإعفاء الضريبي |

#### حقول ضريبة الشركة {#Legal-Entity-Tax-Fields}

يحتوي كل سجل `LegalEntityTax` على:

| اسم الحقل | حقل قاعدة البيانات | الوصف |
|------------|------------------|-------|
| **Legal Entity** | `legalEntity` | شركة محددة أو null للجميع |
| **Effective From** | `effectiveFrom` | تاريخ بدء سريان معدلات الضريبة |
| **Effective To** | `effectiveTo` | تاريخ انتهاء سريان معدلات الضريبة |
| **Tax 1** | `tax1` | معدل Tax1 (نسبة مئوية أو قيمة) |
| **Tax 2** | `tax2` | معدل Tax2 (نسبة مئوية أو قيمة) |
| **Entity Type** | `entityType` | نوع المستند المحدد |
| **Entity Type List** | `entityTypeList` | أنواع مستندات متعددة |
| **Revision ID** | `revisionId` | التحكم في إصدار المعدلات |
| **Tax Configuration** | `taxConfiguration` | إعداد تجاوز لهذه الشركة |

## إعداد نظام الخصومات {#Discount-System-Configuration}

### أنواع الخصومات {#Types-of-Discounts}

#### خصومات السطر (Discount 1-8) {#Line-Discounts-Discount-1-8}
- **التطبيق التسلسلي**: يُطبَّق كل خصم بعد السابق
- **قاعدة قابلة للإعداد**: يمكن لكل خصم تطبيق مبالغ أساسية مختلفة
- **نسبة مئوية أو قيمة**: يمكن تحديده كنسبة مئوية أو مبلغ ثابت
- **تحكم فردي**: لكل خصم إعداد مستقل

#### خصم الرأس {#Header-Discount}
- **على مستوى الفاتورة**: يُطبَّق على إجمالي الفاتورة بالكامل
- **التوزيع النسبي**: يُوزَّع على جميع سطور الفاتورة بشكل نسبي
- **توقيت قابل للإعداد**: يمكن تطبيقه في نقاط مختلفة من تسلسل الحساب

### حقول إعداد الخصم {#Discount-Configuration-Fields}

#### الإعداد العام - أنواع تطبيق الخصم {#Global-Configuration---Discount-Apply-Types}

موجود في `GlobalConfigInfo.java`:

| اسم الحقل | حقل قاعدة البيانات | الوصف | القيم المتاحة |
|------------|------------------|-------|--------------|
| **Discount 1 Apply Type** | `discount1ApplyType` | المبلغ الأساسي لـ Discount 1 | TotalPrice, AfterDiscount1-8, AfterHeaderDiscount, Custom, Tax/Discount Values |
| **Discount 2 Apply Type** | `discount2ApplyType` | المبلغ الأساسي لـ Discount 2 | كما أعلاه |
| **Discount 3 Apply Type** | `discount3ApplyType` | المبلغ الأساسي لـ Discount 3 | كما أعلاه |
| **Discount 4 Apply Type** | `discount4ApplyType` | المبلغ الأساسي لـ Discount 4 | كما أعلاه |
| **Discount 5 Apply Type** | `discount5ApplyType` | المبلغ الأساسي لـ Discount 5 | كما أعلاه |
| **Discount 6 Apply Type** | `discount6ApplyType` | المبلغ الأساسي لـ Discount 6 | كما أعلاه |
| **Discount 7 Apply Type** | `discount7ApplyType` | المبلغ الأساسي لـ Discount 7 | كما أعلاه |
| **Discount 8 Apply Type** | `discount8ApplyType` | المبلغ الأساسي لـ Discount 8 | كما أعلاه |
| **Header Discount Apply Type** | `headerDiscountApplyType` | المبلغ الأساسي لخصم الرأس | كما أعلاه |

#### حقول طريقة حساب الخصم {#Discount-Calculation-Method-Fields}

| اسم الحقل | حقل قاعدة البيانات | الوصف | التأثير |
|------------|------------------|-------|---------|
| **Calculate discount 1 percentage from value** | `calcDisc1PercentFromValue` | اتجاه الحساب لـ Discount 1 | True: حساب النسبة من القيمة الثابتة<br>False: حساب القيمة من النسبة |
| **Calculate discount 2 percentage from value** | `calcDisc2PercentFromValue` | اتجاه الحساب لـ Discount 2 | كما أعلاه |
| **Calculate discount 3 percentage from value** | `calcDisc3PercentFromValue` | اتجاه الحساب لـ Discount 3 | كما أعلاه |
| **Calculate discount 4 percentage from value** | `calcDisc4PercentFromValue` | اتجاه الحساب لـ Discount 4 | كما أعلاه |
| **Calculate discount 5 percentage from value** | `calcDisc5PercentFromValue` | اتجاه الحساب لـ Discount 5 | كما أعلاه |
| **Calculate discount 6 percentage from value** | `calcDisc6PercentFromValue` | اتجاه الحساب لـ Discount 6 | كما أعلاه |
| **Calculate discount 7 percentage from value** | `calcDisc7PercentFromValue` | اتجاه الحساب لـ Discount 7 | كما أعلاه |
| **Calculate discount 8 percentage from value** | `calcDisc8PercentFromValue` | اتجاه الحساب لـ Discount 8 | كما أعلاه |

#### إعداد تأثير الضريبة على الخصم {#Tax-Effect-on-Discount-Configuration}

لكل خصم (1-8) إعداد `TaxEffectOnDiscount` بهذه الحقول:

| اسم الحقل | حقل قاعدة البيانات | الوصف | التأثير |
|------------|------------------|-------|---------|
| **Consider Tax 1** | `discount[N].considerTax1` | خصم Tax1 من قاعدة الخصم | عند التفعيل، تُخصم Tax1 قبل تطبيق الخصم |
| **Consider Tax 2** | `discount[N].considerTax2` | خصم Tax2 من قاعدة الخصم | عند التفعيل، تُخصم Tax2 قبل تطبيق الخصم |
| **Consider Tax 3** | `discount[N].considerTax3` | خصم Tax3 من قاعدة الخصم | عند التفعيل، تُخصم Tax3 قبل تطبيق الخصم |
| **Consider Tax 4** | `discount[N].considerTax4` | خصم Tax4 من قاعدة الخصم | عند التفعيل، تُخصم Tax4 قبل تطبيق الخصم |

### كيفية حساب الخصومات {#How-Discounts-Are-Calculated}

#### الخصومات النسبية {#Percentage-Based-Discounts}
```
Discount Amount = (Base Amount × Discount Percentage) ÷ 100
New Total = Base Amount - Discount Amount
```

#### الخصومات بقيمة ثابتة {#Value-Based-Discounts}
```
Discount Amount = Fixed Discount Value
New Total = Base Amount - Discount Amount
```

#### الخصومات الشاملة للضريبة {#Tax-Inclusive-Discounts}
عند تضمين الضرائب في السعر، يُعدَّل حساب الخصم كالتالي:
```
Discount Amount = Base Amount - (Base Amount × 100) ÷ (100 + Tax Percentage)
```

## إعداد نظام الضرائب {#Tax-System-Configuration}

### حقول إعداد الضريبة في كائن TaxConfiguration {#Tax-Configuration-Fields-in-TaxConfiguration-Object}

يحتوي كائن `TaxConfiguration` على جميع إعدادات سلوك الضريبة:

#### حقول موقع الضريبة {#Tax-Location-Fields}

| اسم الحقل | حقل قاعدة البيانات | الوصف | التأثير |
|------------|------------------|-------|---------|
| **Tax 1 Location** | `tax1Location` | وقت حساب Tax1 | يتحكم في موضع التسلسل |
| **Tax 2 Location** | `tax2Location` | وقت حساب Tax2 | يتحكم في موضع التسلسل |
| **Tax 3 Location** | `tax3Location` | وقت حساب Tax3 | يتحكم في موضع التسلسل |
| **Tax 4 Location** | `tax4Location` | وقت حساب Tax4 | يتحكم في موضع التسلسل |

قيم الموقع المتاحة:
- `MainPrice`: تُطبَّق على إجمالي السطر الأصلي
- `Discount1` حتى `Discount8`: تُطبَّق بعد خصم محدد
- `HeaderDiscount`: تُطبَّق بعد خصم الرأس

#### حقول نوع تطبيق الضريبة {#Tax-Apply-Type-Fields}

| اسم الحقل | حقل قاعدة البيانات | الوصف | التأثير |
|------------|------------------|-------|---------|
| **Tax 1 Apply Type** | `tax1ApplyType` | الأساس لحساب Tax1 | يحدد المبلغ الذي تُطبَّق عليه Tax1 |
| **Tax 2 Apply Type** | `tax2ApplyType` | الأساس لحساب Tax2 | يحدد المبلغ الذي تُطبَّق عليه Tax2 |
| **Tax 3 Apply Type** | `tax3ApplyType` | الأساس لحساب Tax3 | يحدد المبلغ الذي تُطبَّق عليه Tax3 |
| **Tax 4 Apply Type** | `tax4ApplyType` | الأساس لحساب Tax4 | يحدد المبلغ الذي تُطبَّق عليه Tax4 |

#### حقول التحكم في سلوك الضريبة {#Tax-Behavior-Control-Fields}

| اسم الحقل | حقل قاعدة البيانات | الوصف | التأثير على الحساب |
|------------|------------------|-------|------------------|
| **Tax 1 Is Discount** | `tax1IsDiscount` | Tax1 تخفض الإجمالي | True: يُطرح المبلغ<br>False: يُضاف المبلغ |
| **Tax 2 Is Discount** | `tax2IsDiscount` | Tax2 تخفض الإجمالي | True: يُطرح المبلغ<br>False: يُضاف المبلغ |
| **Tax 3 Is Discount** | `tax3IsDiscount` | Tax3 تخفض الإجمالي | True: يُطرح المبلغ<br>False: يُضاف المبلغ |
| **Tax 4 Is Discount** | `tax4IsDiscount` | Tax4 تخفض الإجمالي | True: يُطرح المبلغ<br>False: يُضاف المبلغ |

#### حقول طريقة حساب الضريبة {#Tax-Calculation-Method-Fields}

| اسم الحقل | حقل قاعدة البيانات | الوصف | صيغة الحساب |
|------------|------------------|-------|------------|
| **Tax 1 Is Value Not Percentage** | `tax1IsValue` | Tax1 كمبلغ ثابت | True: مبلغ ثابت<br>False: نسبة مئوية من الأساس |
| **Tax 2 Is Value Not Percentage** | `tax2IsValue` | Tax2 كمبلغ ثابت | True: مبلغ ثابت<br>False: نسبة مئوية من الأساس |
| **Tax 3 Is Value Not Percentage** | `tax3IsValue` | Tax3 كمبلغ ثابت | True: مبلغ ثابت<br>False: نسبة مئوية من الأساس |
| **Tax 4 Is Value Not Percentage** | `tax4IsValue` | Tax4 كمبلغ ثابت | True: مبلغ ثابت<br>False: نسبة مئوية من الأساس |

#### حقول تطبيق قيمة الضريبة {#Tax-Value-Application-Fields}

| اسم الحقل | حقل قاعدة البيانات | الوصف | التأثير |
|------------|------------------|-------|---------|
| **Tax 1 Value Is For Total Not Per Piece** | `tax1ValueIsForTotal` | تطبيق قيمة Tax1 | True: مبلغ إجمالي ثابت<br>False: مضروب في الكمية |
| **Tax 2 Value Is For Total Not Per Piece** | `tax2ValueIsForTotal` | تطبيق قيمة Tax2 | True: مبلغ إجمالي ثابت<br>False: مضروب في الكمية |
| **Tax 3 Value Is For Total Not Per Piece** | `tax3ValueIsForTotal` | تطبيق قيمة Tax3 | True: مبلغ إجمالي ثابت<br>False: مضروب في الكمية |
| **Tax 4 Value Is For Total Not Per Piece** | `tax4ValueIsForTotal` | تطبيق قيمة Tax4 | True: مبلغ إجمالي ثابت<br>False: مضروب في الكمية |

#### حقول تضمين السعر {#Price-Inclusion-Fields}

| اسم الحقل | حقل قاعدة البيانات | الوصف | تأثير الحساب |
|------------|------------------|-------|-------------|
| **Price Includes Tax 1** | `priceIncludesTax` | Tax1 ضمن السعر المعروض | True: تُستخرج الضريبة من السعر<br>False: تُضاف الضريبة إلى السعر |
| **Price Includes Tax 2** | `priceIncludesTax2` | Tax2 ضمن السعر المعروض | True: تُستخرج الضريبة من السعر<br>False: تُضاف الضريبة إلى السعر |
| **Price Includes Tax 3** | `priceIncludesTax3` | Tax3 ضمن السعر المعروض | True: تُستخرج الضريبة من السعر<br>False: تُضاف الضريبة إلى السعر |
| **Price Includes Tax 4** | `priceIncludesTax4` | Tax4 ضمن السعر المعروض | True: تُستخرج الضريبة من السعر<br>False: تُضاف الضريبة إلى السعر |

#### حقول تضمين الإجمالي {#Total-Inclusion-Fields}

| اسم الحقل | حقل قاعدة البيانات | الوصف | تأثير إجمالي الفاتورة |
|------------|------------------|-------|---------------------|
| **Tax 1 Not Included In Total** | `tax1NotIncludedInTotal` | استبعاد Tax1 من الإجمالي | True: لا تُضاف إلى إجمالي الفاتورة<br>False: تُضاف إلى إجمالي الفاتورة |
| **Tax 2 Not Included In Total** | `tax2NotIncludedInTotal` | استبعاد Tax2 من الإجمالي | True: لا تُضاف إلى إجمالي الفاتورة<br>False: تُضاف إلى إجمالي الفاتورة |
| **Tax 3 Not Included In Total** | `tax3NotIncludedInTotal` | استبعاد Tax3 من الإجمالي | True: لا تُضاف إلى إجمالي الفاتورة<br>False: تُضاف إلى إجمالي الفاتورة |
| **Tax 4 Not Included In Total** | `tax4NotIncludedInTotal` | استبعاد Tax4 من الإجمالي | True: لا تُضاف إلى إجمالي الفاتورة<br>False: تُضاف إلى إجمالي الفاتورة |

### الضريبة كإضافة أو خصم {#Tax-as-Addition-vs-Deduction}

يحدد النظام ما إذا كانت الضريبة تُضاف إلى إجمالي الفاتورة أو تُطرح منه بناءً على حقل `tax[N]IsDiscount`:

#### عندما تُضاف الضريبة إلى الإجمالي (ضريبة قياسية) {#When-Tax-Adds-to-Total-Standard-Tax}
- **إعداد الحقل**: `tax[N]IsDiscount = false`
- **الحساب**: `New Total = Base Amount + Tax Amount`
- **حالة الاستخدام**: ضريبة القيمة المضافة (VAT)، ضريبة المبيعات (GST)
- **مثال**: 
  ```
  Line Total: $100
  Tax1 (15%): $15
  Final Total: $100 + $15 = $115
  ```

#### عندما تخفض الضريبة الإجمالي (ضريبة خصم) {#When-Tax-Reduces-Total-Discount-Tax}
- **إعداد الحقل**: `tax[N]IsDiscount = true`
- **الحساب**: `New Total = Base Amount - Tax Amount`
- **حالة الاستخدام**: ضريبة الاستقطاع (Withholding Tax)، الخصومات، الحسومات
- **مثال**:
  ```
  Line Total: $100
  Tax3 (5% withholding): $5
  Final Total: $100 - $5 = $95
  ```

### طرق حساب الضرائب {#Tax-Calculation-Methods}

#### الضرائب النسبية {#Percentage-Based-Taxes}

**ضريبة خارج السعر (تُضاف إلى السعر):**
```java
if (!priceIncludesTax && !taxIsDiscount) {
    taxAmount = (baseAmount × taxPercentage) ÷ 100;
    finalAmount = baseAmount + taxAmount;
}
```

**ضريبة ضمن السعر (مدرجة في السعر):**
```java
if (priceIncludesTax && !taxIsDiscount) {
    taxAmount = baseAmount - (baseAmount × 100) ÷ (100 + taxPercentage);
    finalAmount = baseAmount; // Price already includes tax
}
```

**الضريبة كخصم:**
```java
if (taxIsDiscount) {
    taxAmount = (baseAmount × taxPercentage) ÷ 100;
    finalAmount = baseAmount - taxAmount;
}
```

#### الضرائب بقيمة ثابتة {#Value-Based-Taxes}

**الحساب بالوحدة:**
```java
if (taxIsValue && !taxValueIsForTotal) {
    taxAmount = taxRate × quantity;
}
```

**الحساب بالإجمالي:**
```java
if (taxIsValue && taxValueIsForTotal) {
    taxAmount = taxRate; // Fixed amount regardless of quantity
}
```

## إعداد التأثيرات المتقدمة {#Advanced-Effects-Configuration}

### كيان TaxDiscountEffectsConfig {#TaxDiscountEffectsConfig-Entity}

يشير حقل `effectsConfig` في TaxConfiguration إلى كيان `TaxDiscountEffectsConfig` الذي يوفر تحكماً كاملاً في تسلسل الحساب:

#### إعداد ترتيب التأثيرات {#Effects-Order-Configuration}

| اسم الحقل | حقل قاعدة البيانات | الوصف |
|------------|------------------|-------|
| **Effects Order** | `effectsOrder` | قائمة تحدد تسلسل التأثيرات |
| **Effect 1 Type** | `effect1Type` | نوع التأثير الأول (Tax1-4, Discount1-8, HeaderDiscount) |
| **Effect 1 Basis Lines** | `effect1BasisLines` | قواعد الحساب للتأثير 1 |
| **Effect 2 Type** | `effect2Type` | نوع التأثير الثاني |
| **Effect 2 Basis Lines** | `effect2BasisLines` | قواعد الحساب للتأثير 2 |
| ... | ... | ... |
| **Effect 13 Type** | `effect13Type` | نوع التأثير الثالث عشر |
| **Effect 13 Basis Lines** | `effect13BasisLines` | قواعد الحساب للتأثير 13 |

#### إعداد سطر أساس التأثير {#Effect-Basis-Line-Configuration}

يحتوي كل سطر أساس تأثير على:

| اسم الحقل | الوصف | التأثير |
|------------|-------|---------|
| **Source Type** | القيمة المستخدمة (MainPrice, CurrentTotal, Discount1-8, Tax1-4, إلخ) | يحدد القيمة الأساسية |
| **Source Value** | الجانب المحدد من المصدر (Value, AfterValue, Percentage) | يحدد القيمة الدقيقة للاستخراج |
| **Source Operation** | العملية الرياضية (Add, Subtract, Multiply, Divide, CalcPercentage, CalcInversePercentage) | كيفية تطبيق القيمة |

### العمليات الحسابية المخصصة {#Custom-Calculation-Operations}

يدعم النظام هذه العمليات لحسابات التأثيرات المخصصة:

| العملية | الصيغة | حالة الاستخدام |
|---------|--------|---------------|
| **Add** | `total + value` | الجمع القياسي |
| **Subtract** | `total - value` | الطرح القياسي |
| **Multiply** | `total × value` | حسابات القياس |
| **Divide** | `total ÷ value` | عمليات القسمة |
| **CalcPercentage** | `(total × value) ÷ 100` | حسابات النسبة المئوية |
| **CalcInversePercentage** | `total - (total ÷ ((100 + value) ÷ 100))` | استخراج الضريبة الشاملة |

## خيارات الإعداد الخاصة {#Special-Configuration-Options}

### معالجة الأصناف المجانية {#Free-Item-Handling}

| اسم الحقل | حقل قاعدة البيانات | الوصف | التأثير |
|------------|------------------|-------|---------|
| **No Taxes For Free Item** | `noTaxesForFreeItem` | تعطيل الضرائب على الأصناف المجانية | تصبح جميع الضرائب صفراً للسطور المحددة كمجانية |

### استخدام القيمة الإضافية {#Additional-Value-Usage}

تتحكم هذه الحقول في إضافة نسب الضريبة كقيم إضافية لإجماليات السطور:

| اسم الحقل | حقل قاعدة البيانات | عند الإيقاف (الافتراضي) |
|------------|------------------|----------------------|
| **Do Not Use Tax1 Percentage As Additional Value1** | `doNotUseTax1PercentageAsAdditionalValue1` | تُضاف نسبة Tax1 إلى إجمالي السطر |
| **Do Not Use Tax2 Percentage As Additional Value2** | `doNotUseTax2PercentageAsAdditionalValue2` | تُضاف نسبة Tax2 إلى إجمالي السطر |
| **Do Not Use Tax3 Percentage As Additional Value3** | `doNotUseTax3PercentageAsAdditionalValue3` | تُضاف نسبة Tax3 إلى إجمالي السطر |
| **Do Not Use Tax4 Percentage As Additional Value4** | `doNotUseTax4PercentageAsAdditionalValue4` | تُضاف نسبة Tax4 إلى إجمالي السطر |

### إعفاءات الضريبة لحسابات الموازنة {#Subsidiary-Account-Tax-Exemptions}

يمكن إعداد إعفاءات ضريبية للعملاء والموردين في حسابات موازنتهم:

| اسم الحقل | الوصف | التأثير |
|------------|-------|---------|
| **Tax 1 Exempt** | `subsidiaryAccounts.tax1Exempt` | عند التفعيل، تصبح Tax1 صفراً لهذه الجهة |
| **Tax 2 Exempt** | `subsidiaryAccounts.tax2Exempt` | عند التفعيل، تصبح Tax2 صفراً لهذه الجهة |
| **Tax 3 Exempt** | `subsidiaryAccounts.tax3Exempt` | عند التفعيل، تصبح Tax3 صفراً لهذه الجهة |
| **Tax 4 Exempt** | `subsidiaryAccounts.tax4Exempt` | عند التفعيل، تصبح Tax4 صفراً لهذه الجهة |

## سيناريوهات وأمثلة شائعة {#Common-Scenarios-and-Examples}

### السيناريو 1: ضريبة القيمة المضافة القياسية مع خصم تجاري {#Scenario-1-Standard-VAT-with-Trade-Discount}

**الإعداد:**
- `discount1ApplyType`: TotalPrice
- `tax1Location`: HeaderDiscount
- `priceIncludesTax`: false
- `tax1IsDiscount`: false

**الحساب:**
```
Line Total: $1,000
Discount 1 (10%): $100
After Discount: $900
VAT (15%): $135
Final Total: $900 + $135 = $1,035
```

### السيناريو 2: تسعير شامل للضريبة مع خصم {#Scenario-2-Tax-Inclusive-Pricing-with-Discount}

**الإعداد:**
- `priceIncludesTax`: true
- `discount1ApplyType`: TotalPrice
- `discount1.considerTax1`: true

**الحساب:**
```
Quoted Price (includes 15% VAT): $1,150
VAT Component: $150
Net Price: $1,000
Discount Base (net): $1,000
Discount (10%): $100
Final Net: $900
Final VAT: $135
Final Total: $1,035
```

### السيناريو 3: إعداد ضريبة الاستقطاع {#Scenario-3-Withholding-Tax-Configuration}

**الإعداد:**
- `tax3IsDiscount`: true (يجعلها خصماً)
- `tax3Location`: HeaderDiscount
- `tax3NotIncludedInTotal`: false

**الحساب:**
```
Line Total: $1,000
VAT (15%): $150
Subtotal: $1,150
Withholding (5%): $50 (deducted)
Final Total: $1,150 - $50 = $1,100
```

### السيناريو 4: ترتيب تأثيرات معقد {#Scenario-4-Complex-Effects-Order}

**الإعداد باستخدام TaxDiscountEffectsConfig:**
```
Effect 1: Discount1 (10% trade discount)
Effect 2: Discount2 (5% volume discount)  
Effect 3: Tax1 (15% VAT)
Effect 4: HeaderDiscount ($25 promotional)
Effect 5: Tax3 (3% withholding)
```

**الحساب:**
```
Line Total: $1,000
After Discount1: $900
After Discount2: $855
After Tax1: $855 + $128.25 = $983.25
After Header Discount: $958.25
After Withholding: $958.25 - $28.75 = $929.50
```

## أفضل ممارسات الإعداد {#Configuration-Best-Practices}

### إعداد خطط الضريبة {#Setting-Up-Tax-Plans}

1. **إنشاء خطط ضريبة أساسية**
   - تعيين `defaultTaxConfig` للتحكم في مصدر الإعداد
   - إعداد `taxConfiguration` بالإعدادات القياسية
   - تعريف `legalEntityTaxes` لجهات وفترات زمنية مختلفة

2. **إعداد سلوك الضريبة**
   - تعيين `tax[N]IsDiscount` بشكل صحيح للإضافات والخصومات
   - إعداد `priceIncludesTax[N]` بناءً على استراتيجية التسعير
   - تعيين `tax[N]NotIncludedInTotal` للضرائب المعروضة فقط

3. **تعيين نقاط التطبيق**
   - إعداد `tax[N]Location` للتسلسل الصحيح
   - تعيين `tax[N]ApplyType` لحساب الأساس الصحيح
   - استخدام `effectsConfig` للتسلسلات المعقدة

### إرشادات إعداد الخصم {#Discount-Configuration-Guidelines}

1. **الخصومات التسلسلية**
   - إعداد `discount[N]ApplyType` للخصومات المتدرجة
   - استخدام `AfterDiscount[N-1]Price` للتطبيق التسلسلي
   - مراعاة تأثيرات الضريبة مع `discount[N].considerTax[N]`

2. **قيمة ثابتة مقابل نسبة مئوية**
   - تعيين `calcDisc[N]PercentFromValue` بناءً على قواعد العمل
   - استخدام القيمة الثابتة للخصومات المحددة
   - استخدام النسبة المئوية للخصومات النسبية

### التحقق من صحة إعداد الضريبة {#Tax-Configuration-Validation}

قبل نشر إعدادات الضريبة:

1. **التحقق من اتجاه الحساب**
   - التحقق من `tax[N]IsDiscount` للإضافة/الطرح الصحيح
   - التحقق من تطابق `priceIncludesTax[N]` مع استراتيجية التسعير

2. **اختبار نطاقات التواريخ**
   - التأكد من أن `effectiveFrom` و`effectiveTo` يغطيان الفترات المطلوبة
   - اختبار انتقالات المعدلات عند حدود التواريخ

3. **التحقق من التسلسلات**
   - تأكيد أن `effectsOrder` ينتج النتائج المتوقعة
   - الاختبار ببيانات نموذجية تغطي جميع السيناريوهات

## دليل استكشاف الأخطاء وإصلاحها {#Troubleshooting-Guide}

### مشكلات الإعداد الشائعة {#Common-Configuration-Issues}

#### المشكلة: إضافة الضريبة بدلاً من خصمها {#Issue-Tax-Being-Added-Instead-of-Deducted}

**تحقق من هذه الحقول:**
- `tax[N]IsDiscount`: يجب أن يكون `true` للخصومات
- `tax[N]Location`: التحقق من نقطة الحساب
- `effectsConfig`: التحقق مما إذا كان التسلسل المخصص يتجاوز الإعدادات

#### المشكلة: قاعدة خصم غير صحيحة {#Issue-Incorrect-Discount-Base}

**تحقق من هذه الحقول:**
- `discount[N]ApplyType`: التحقق من اختيار القيمة الأساسية
- `discount[N].considerTax[N]`: التحقق من مراعاة الضريبة
- `effectsConfig`: مراجعة قواعد الحساب المخصصة

#### المشكلة: الضريبة لا تظهر في الإجمالي {#Issue-Tax-Not-Appearing-in-Total}

**تحقق من هذه الحقول:**
- `tax[N]NotIncludedInTotal`: يجب أن يكون `false` للتضمين
- `noItemTaxesWithThisPolicy`: يجب أن يكون `false` لـ Tax1/Tax2
- `noInvoiceTaxesWithThisPolicy`: يجب أن يكون `false` لـ Tax3/Tax4
- `tax[N]Exempt` للعميل/المورد: التحقق من علامات الإعفاء

#### المشكلة: تطبيق معدل ضريبة خاطئ {#Issue-Wrong-Tax-Rate-Applied}

**تحقق من ترتيب الحل:**
1. خطة ضريبة الرأس مع الشركة والتاريخ المطابقين
2. خطة ضريبة السطر مع المعايير المطابقة
3. الإعداد الافتراضي العام
4. التحقق من إعداد `priorityPolicyOverCusOrSup`

### قواعد التحقق {#Validation-Rules}

يُطبِّق النظام قواعد التحقق التالية:

1. **اتساق خطة الضريبة**
   - لا يمكن أن يكون `itemPlan` و`noItemTaxesWithThisPolicy` كلاهما true
   - يجب أن تكون تركيبات الإعداد صالحة رياضياً

2. **سلامة الحساب**
   - لا يمكن أن تجعل مبالغ الخصم إجماليات السطور سالبة
   - يجب أن تكون نسب الضريبة ضمن النطاقات الصالحة
   - يجب أن يحافظ التقريب على الدقة

3. **صحة نطاق التواريخ**
   - لا يُسمح بنطاقات تواريخ متداخلة لنفس الجهة
   - يجب أن تكون تواريخ السريان منطقية ومتسقة

## اعتبارات الأداء {#Performance-Considerations}

### إرشادات التحسين {#Optimization-Guidelines}

1. **تقليل تعقيد إعداد التأثيرات**
   - استخدم مواضع التأثيرات الضرورية فقط
   - تجنب الحسابات المتكررة
   - خزِّن الإعدادات المستخدمة بتكرار في الذاكرة المؤقتة

2. **تصميم خطة ضريبة فعّالة**
   - قلِّل سجلات ضريبة الشركات
   - استخدم نطاقات التواريخ بفعالية
   - استفد من الإعدادات الافتراضية

3. **تخزين الإعداد مؤقتاً**
   - تُخزَّن إعدادات الضريبة مؤقتاً لكل فاتورة
   - تجنب التغييرات غير الضرورية في خطة الضريبة
   - استخدم إعدادات متسقة عبر المستندات المماثلة

::: warning مهم
اختبر دائماً تغييرات الإعداد في بيئة التطوير قبل تطبيقها على أنظمة الإنتاج. يمكن أن تُفضي التفاعلات المعقدة بين الخصومات والضرائب إلى نتائج غير متوقعة، خاصةً عند استخدام إعدادات التأثيرات المخصصة.
:::

## المقارنة مع أنظمة ERP الأخرى {#Comparison-with-Other-ERP-Systems}

### Nama ERP مقارنةً بأنظمة ERP الرئيسية الأخرى {#Nama-ERP-vs-Other-Major-ERP-Systems}

يساعد فهم مقارنة نظام الخصومات والضرائب في Nama ERP بأنظمة ERP الرئيسية الأخرى على تقدير قدراته الفريدة وفلسفته التصميمية.

#### Nama ERP مقارنةً بـ Odoo {#Nama-ERP-vs-Odoo}

| الميزة | Nama ERP | Odoo |
|--------|----------|------|
| **عدد خصومات السطر** | 8 خصومات تسلسلية | عادةً 1-2 خصومات |
| **ترتيب تطبيق الخصم** | قابل للإعداد بالكامل عبر effects config | تسلسل ثابت |
| **أنواع الضرائب** | 4 ضرائب قابلة للإعداد (إضافات أو خصومات) | سطور ضريبة غير محدودة لكن عادةً إضافات فقط |
| **تفاعل الضريبة-الخصم** | قابل للإعداد لكل خصم عبر TaxEffectOnDiscount | ضريبة أساسية على المبلغ بعد الخصم |
| **تسلسلات الحساب المخصصة** | إعداد تأثيرات بـ 13 موضعاً | محدود بتسلسلات محددة مسبقاً |
| **الضريبة كخصم** | دعم أصلي عبر taxIsDiscount flag | يتطلب حلولاً بديلة أو تخصيصاً |
| **الضريبة الشاملة في السعر** | مدمجة مع استخراج تلقائي | مدعومة لكن أقل مرونة |
| **معدلات الضريبة المستندة إلى التاريخ** | أصلية مع سجلات Legal Entity Tax | تتطلب fiscal positions |

**المزايا الرئيسية لـ Nama ERP:**
- تحكم أكثر تفصيلاً في الخصومات بـ 8 خصومات تسلسلية
- دعم أصلي للضرائب كخصومات (ضرائب استقطاع)
- إعداد معقد لتفاعل الضريبة-الخصم
- تسلسلات حساب مخصصة عبر إعداد التأثيرات

**مزايا Odoo:**
- إعداد أبسط للسيناريوهات الأساسية
- وحدات مجتمعية أكثر شمولاً
- إنشاء تقارير ضريبية أسهل عبر إعدادات الحسابات

#### Nama ERP مقارنةً بـ Microsoft Dynamics 365 {#Nama-ERP-vs-Microsoft-Dynamics-365}

| الميزة | Nama ERP | Microsoft Dynamics 365 |
|--------|----------|------------------------|
| **مستويات الخصم** | 8 سطور + 1 خصم رأس | أنواع خصومات متعددة لكن عادةً 3 مستويات |
| **إعداد قاعدة الخصم** | يمكن لكل خصم تطبيق قواعد مختلفة | خيارات قاعدة محدودة |
| **إعداد الضريبة** | Tax Plans مع حل هرمي | مجموعات ضريبة وأكواد ضريبة |
| **نقاط تطبيق الضريبة** | قابلة للإعداد في أي نقطة من الحساب | عادةً بعد جميع الخصومات |
| **ترتيب التأثيرات** | تسلسل مخصص كامل | ترتيب حساب محدد مسبقاً |
| **الإعفاءات الضريبية** | مدمجة في حسابات الموازنة | مجموعات ضريبة العميل |
| **معالجة الضريبة متعددة العملات** | مدمجة مع تحويل قابل للإعداد | معالجة عملة منفصلة |

**المزايا الرئيسية لـ Nama ERP:**
- حسابات قاعدة خصم أكثر مرونة
- حل إعداد ضريبة هرمي
- تحكم أكبر في تسلسل الحساب
- إعفاء ضريبي مدمج على مستوى الحساب

**مزايا Dynamics 365:**
- تكامل أفضل مع نظام Microsoft
- تقارير مالية أكثر تطوراً
- قدرات تحليلية وذكاء اصطناعي متقدمة

#### Nama ERP مقارنةً بـ SAP (ECC/S4HANA) {#Nama-ERP-vs-SAP-ECCS4HANA}

| الميزة | Nama ERP | SAP |
|--------|----------|-----|
| **هيكل الخصم** | 8 خصومات تسلسلية على السطر | أنواع شروط (غير محدودة لكن معقدة) |
| **نهج الإعداد** | إعداد قائم على الحقول | تقنية الشروط مع المخططات |
| **حساب الضريبة** | 4 ضرائب بسلوك مرن | إجراءات ضريبة مع أنواع شروط |
| **مرونة الحساب** | إعداد التأثيرات للتسلسلات المخصصة | إجراءات التسعير مع الخطوات |
| **الضريبة كخصم** | إعداد بسيط عبر flag | يتطلب إعداد نوع الشرط |
| **واجهة المستخدم** | إعداد مباشر للحقول | يتطلب تخصيص ABAP في الغالب |
| **الأداء** | حساب محسَّن في مرور واحد | معقد لكن محسَّن للغاية |

**المزايا الرئيسية لـ Nama ERP:**
- إعداد أبسط دون تخصيص مكثف
- إعداد أكثر بديهية لضريبة الاستقطاع
- إعداد مباشر على مستوى الحقول
- تدفق حساب أسهل فهماً

**مزايا SAP:**
- مرونة غير محدودة عبر أنواع الشروط
- حلول خاصة بالصناعة
- قدرات تكامل واسعة
- إجراءات تسعير أكثر تطوراً

#### Nama ERP مقارنةً بـ Oracle EBS (E-Business Suite) {#Nama-ERP-vs-Oracle-EBS-E-Business-Suite}

| الميزة | Nama ERP | Oracle EBS |
|--------|----------|------------|
| **إدارة الخصومات** | 8 سطور + رأس مع تحكم فردي | قوائم تعديل ومؤهلات |
| **محرك الضريبة** | مدمج مع 4 ضرائب قابلة للإعداد | Oracle Tax (E-Business Tax) |
| **تعقيد الإعداد** | قائم على الحقول، مناسب لمستخدمي الأعمال | يتطلب إعداداً تقنياً |
| **أنظمة الضرائب** | Tax Plans مع نطاقات تواريخ | أنظمة ضريبة وولايات قضائية |
| **شفافية الحساب** | إعداد واضح حقلاً بحقل | محرك قواعد ضريبة معقد |
| **ضريبة الاستقطاع** | دعم أصلي عبر taxIsDiscount | وحدة ضريبة استقطاع منفصلة |

**المزايا الرئيسية لـ Nama ERP:**
- إعداد أبسط وأكثر شفافية
- معالجة موحدة للضرائب العادية وضرائب الاستقطاع
- مناسب لمستخدمي الأعمال
- إعداد مدمج للخصومات والضرائب

**مزايا Oracle EBS:**
- ميزات امتثال ضريبي أكثر شمولاً
- أكثر ملاءمة للمتطلبات المعقدة متعددة الولايات القضائية
- تقارير ضريبية ومطابقة متقدمة
- تكامل أعمق مع سلسلة التوريد

### الميزات الفريدة لـ Nama ERP {#Unique-Features-of-Nama-ERP}

#### ميزات نادراً ما تُوجد في أنظمة ERP الأخرى {#Features-Rarely-Found-in-Other-ERPs}

1. **ثمانية خصومات تسلسلية على السطر**
   - تحد معظم أنظمة ERP من 2-3 مستويات خصم
   - يتيح Nama سلاسل خصم معقدة لتسعير متطور

2. **إعداد TaxEffectOnDiscount**
   - تحكم تفصيلي في مراعاة الضريبة في حسابات الخصم
   - كل خصم يمكنه مراعاة كل ضريبة بشكل مستقل

3. **نموذج موحد للإضافة/الخصم الضريبي**
   - flag واحد (`taxIsDiscount`) يحوّل أي ضريبة إلى خصم
   - يلغي الحاجة إلى وحدات ضريبة استقطاع منفصلة

4. **إعداد تأثيرات بـ 13 موضعاً**
   - تحكم كامل في تسلسل الحساب
   - عمليات رياضية مخصصة بين التأثيرات

5. **حل الإعداد الهرمي**
   - حل ثلاثي المستويات: Header Plan → Line Plan → Global
   - مرونة مع قواعد أولوية واضحة

#### متى تختار Nama ERP {#When-to-Choose-Nama-ERP}

**Nama ERP مثالي لـ:**
- الشركات ذات هياكل الخصم المعقدة
- الأسواق ذات متطلبات ضريبة الاستقطاع المتعددة
- الشركات التي تحتاج إلى تفاعلات مرنة بين الضريبة والخصم
- المؤسسات التي تتطلب إعداداً شفافاً على مستوى الحقول
- الشركات ذات تسلسلات الحساب الفريدة

### مقارنة الابتكار التقني {#Technical-Innovation-Comparison}

| الجانب | نهج Nama ERP | المعيار الصناعي |
|--------|-------------|----------------|
| **فلسفة الإعداد** | قائمة على الحقول مع إظهار واجهة المستخدم | تخصيص قائم على الكود/السكريبت |
| **محرك الحساب** | مرور واحد مع ترتيب التأثيرات | متعدد المرور أو قائم على الإجراءات |
| **معالجة الضريبة** | نموذج موحد لجميع أنواع الضرائب | وحدات منفصلة لأنواع الضرائب المختلفة |
| **هيكل الخصم** | هيكل ثابت بـ 8 مستويات | متغير لكن محدود عادةً |
| **طريقة التخصيص** | الإعداد على حساب التخصيص | نهج كثيف التخصيص |
| **منحنى التعلم** | معتدل - حقول كثيرة لكن منطقية | متفاوت - يتطلب خبرة تقنية في الغالب |

### اعتبارات الترحيل {#Migration-Considerations}

عند الترحيل من أنظمة ERP الأخرى إلى Nama ERP:

**من Odoo:**
- عيِّن الخصومات البسيطة إلى أول 1-2 مستويات خصم في Nama
- حوِّل إعدادات الضريبة إلى Tax Plans
- استفد من إعداد التأثيرات للسيناريوهات المعقدة

**من Dynamics 365:**
- عيِّن خصومات اتفاقيات التجارة إلى خصومات السطر
- حوِّل مجموعات الضريبة إلى Tax Plans
- استخدم إعفاءات حسابات الموازنة

**من SAP:**
- بسِّط أنواع الشروط إلى حقول الخصم/الضريبة
- حوِّل إجراءات التسعير إلى إعداد التأثيرات
- عيِّن إجراءات الضريبة إلى Tax Plans

**من Oracle EBS:**
- حوِّل قوائم التعديل إلى إعدادات الخصم
- عيِّن أنظمة الضريبة إلى Tax Plans مع الشركات
- بسِّط ضريبة الاستقطاع إلى taxIsDiscount flags

## ملخص {#Summary}

يوفر نظام حساب خصومات الفواتير والضرائب في Nama ERP مرونة واسعة من خلال:

- **الإعداد الهرمي**: خطط الضريبة، معدلات الشركة، والإعدادات الافتراضية العامة
- **الحساب المرن**: يمكن أن تكون الضرائب إضافات أو خصومات
- **التسلسلات المخصصة**: تحكم كامل في ترتيب الحساب عبر إعداد التأثيرات
- **المعدلات المستندة إلى التاريخ**: تغييرات تلقائية في المعدلات بمرور الوقت
- **الإعدادات الخاصة بالجهة**: معدلات وقواعد مختلفة لكل شركة
- **التحكم الشامل**: إعداد على مستوى الحقول لجميع جوانب الحساب

مقارنةً بأنظمة ERP الرئيسية الأخرى، يقدم Nama ERP توازناً فريداً بين المرونة والبساطة، حيث توفر بنية الخصم ذات المستويات الثمانية والنموذج الضريبي الموحد وإعداد التأثيرات قدرات تتطلب عادةً تخصيصاً مكثفاً في الأنظمة الأخرى. وبينما قد لا يمتلك النظام البيئة الواسعة لـ SAP أو Oracle، أو بساطة Odoo للسيناريوهات الأساسية، فإنه يتفوق في التعامل مع متطلبات الخصومات والضرائب المعقدة من خلال الإعداد بدلاً من التخصيص.

يُعدّ فهم خيارات الإعداد على مستوى الحقول وعملية حل إعدادات الضريبة أمراً أساسياً للإعداد الصحيح للنظام وصيانته. يوفر مزيج خطط الضريبة وكائنات الإعداد وترتيب التأثيرات المرونة الكافية للتعامل مع أي متطلبات أعمال مع الحفاظ على دقة الحساب والامتثال للوائح التنظيمية.
