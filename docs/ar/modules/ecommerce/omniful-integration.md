# دليل التكامل مع Omniful

## نظرة عامة (Overview)

يتكامل نظام نما ERP مع [Omniful](https://www.omniful.ai/)، وهي منصة موحدة لسلسلة التوريد توفر إمكانات شاملة لإدارة المستودعات وتنفيذ الطلبات. يتيح هذا التكامل مزامنة البيانات بسلاسة بين نما ERP و Omniful لإدارة المخزون ومعالجة الطلبات وعمليات سلسلة التوريد.

## بنية التكامل (Integration Architecture)

يعمل التكامل في اتجاهين:

1. **صادر (Nama ERP → Omniful)**: يتم إرسال البيانات الرئيسية والمعاملات من نما ERP إلى Omniful باستخدام مسارات الكيانات (Entity Flows)
2. **وارد (Omniful → Nama ERP)**: يتم استقبال الطلبات وتحويلات المخزون وأوامر الشراء والإيصالات من Omniful عبر webhooks

## إعداد التكوين (Configuration Setup)

### 1. كيان إعداد Omniful

انتقل إلى **Magento → Omniful Configuration** لإنشاء وضبط إعدادات التكامل.

#### الحقول المطلوبة

| الحقل | الاسم العربي | الوصف |
|-------|-------------|-------------|
| User Name | - | اسم مستخدم Omniful API |
| Password | - | كلمة مرور Omniful API |
| Seller Code | اسم البائع | معرف البائع الفريد في Omniful |
| Webhook Secret Key | - | المفتاح السري لمصادقة webhook |
| Tenant API Username | المستخدم | اسم مستخدم Tenant API للعمليات المتقدمة |
| Tenant API Password | كلمة المرور | كلمة مرور Tenant API |
| Nama API Key | - | بيانات اعتماد API للوصول إلى نما ERP |

#### إعداد حقول المرجع

تربط هذه الحقول معرفات Omniful بحقول محددة في كيانات نما ERP:

| الحقل | الاسم العربي | الغرض |
|-------|-------------|---------|
| Omniful Reference Field For Orders | حقل مرجع أومنيفل في الطلبات | ربط أوامر البيع بمعرفات الطلبات في Omniful |
| Omniful Reference Field For Issue Stock Transfer | حقل مرجع أومنيفل في صرف تحويل مخزني | ربط تحويلات صرف المخزون |
| Omniful Reference Field For Receipt Stock Transfer | حقل مرجع أومنيفل في استلام تحويل مخزني | ربط تحويلات استلام المخزون |
| Omniful Reference Field For Purchase Order | حقل مرجع أومنيفل في أمر شراء | ربط أوامر الشراء |
| Omniful Reference Field For Stock Transfer Request | حقل مرجع أومنيفل في طلب التحويل المخزني | ربط طلبات تحويل المخزون |
| Omniful Reference Field For Stock Receipt | حقل مرجع أومنيفل في التوريد المخزني | ربط إيصالات المخزون |

### 2. إعداد توليد المستندات

لكل نوع مستند سيُستقبل من Omniful، قم بضبط سطور Document Generation Info:

#### أنواع المستندات المدعومة

- **أمر بيع** (`SalesOrder`)
- **صرف تحويل مخزني** (`IssueStockTransfer`)
- **استلام تحويل مخزني** (`ReceiptStockTransfer`)
- **طلب تحويل مخزني** (`StockTransferReq`)
- **أمر شراء** (`PurchaseOrder`)
- **توريد مخزني** (`StockReceipt`)

#### حقول الإعداد

| الحقل | الوصف |
|-------|-------------|
| Entity Type | اختر نوع المستند من القائمة المنسدلة |
| Apply When Query | استعلام اختياري لتطبيق هذا الإعداد بشكل مشروط |
| Book | دفتر المستند المراد تعيينه للمستندات المُنشأة |
| Term | توجيه المستند المراد تعيينه للمستندات المُنشأة |
| Save Doc With Errors As Draft | عند التفعيل، تُحفظ المستندات التي تحتوي على أخطاء تحقق كمسودات بدلاً من الفشل |

::: warning مهم
- يجب تعريف سطر إعداد واحد على الأقل حتى يعمل التكامل
- يجب إعداد Webhook Secret Key أو Nama API Key
- جميع حقول المرجع مطلوبة ويجب أن تشير إلى حقول مخصصة صالحة في الكيانات المعنية
:::

## مزامنة البيانات الصادرة (Nama ERP → Omniful)

### مسارات الكيانات المتاحة

يمكن استخدام مسارات الكيانات التالية لإرسال البيانات من نما ERP إلى Omniful:

#### مسارات البيانات الرئيسية

1. **EASendCustomerToOmniful**
   - يرسل معلومات العميل بما في ذلك تفاصيل الاتصال والعناوين والمستندات
   - المدخلات: Omniful Config Code/ID، Omniful Reference Field ID
   - يدعم عمليتي الإنشاء والتحديث

2. **EASendSupplierToOmniful**
   - يرسل البيانات الرئيسية للمورد إلى Omniful
   - المدخلات: Omniful Config Code/ID، Omniful Reference Field ID

3. **EASendItemToOmniful**
   - يرسل أصناف المخزون مع متغيرات المقاسات والألوان
   - ينشئ SKUs في Omniful لكل مجموعة مقاس/لون
   - المدخلات: Omniful Config Code/ID، Update Condition Field

4. **EASendWarehouseToOmniful**
   - يرسل معلومات المستودع بما في ذلك الموقع وتفاصيل الاتصال والتكوين
   - يضبط إعدادات المستودع لإدارة المخزون
   - المدخلات: Omniful Config Code/ID، Update Flag Field

#### مسارات المعاملات

5. **EASendSalesInvoiceToOmniful**
   - يرسل فواتير البيع كطلبات إلى Omniful
   - يتضمن تفاصيل العميل وأصناف الطلب والعناوين ومعلومات الدفع
   - المدخلات: Omniful Config Code/ID، Omniful ID Field

6. **EASendSalesQuotationToOmniful**
   - يرسل عروض أسعار البيع إلى Omniful
   - المدخلات: Omniful Config Code/ID، Omniful Reference Field ID

7. **EASendPurchaseOrderToOmniful**
   - يرسل أوامر الشراء إلى Omniful لإدارة الموردين
   - المدخلات: Omniful Config Code/ID

8. **EASendStockTransferReqToOmniful**
   - يرسل طلبات تحويل المخزون بين المستودعات
   - المدخلات: Omniful Config Code/ID، Omniful Reference Field ID

9. **EASendStockTransferReqAsPurchaseOrderToOmniful**
   - يحوّل طلبات تحويل المخزون إلى أوامر شراء في Omniful
   - المدخلات: Omniful Config Code/ID

10. **EASendIssueStockTransferToOmniful**
    - يرسل تحويلات صرف المخزون إلى Omniful
    - المدخلات: Omniful Config Code/ID، Omniful Reference Field ID

## مزامنة البيانات الواردة (Omniful → Nama ERP)

#### نقطة نهاية Webhook

قم بإعداد Omniful لإرسال webhooks إلى نقطة نهاية webhook الخاصة بنما ERP للأحداث التالية:

#### الأحداث المدعومة

1. **أحداث الطلبات (Order Events)**
   - `order.*` مع `type: "sto"` ← ينشئ طلبات تحويل مخزني أو صرف تحويل مخزني
   - `order.*` (غير STO) ← ينشئ أوامر بيع

2. **أحداث الشراء (Purchase Events)**
   - `purchase.*` ← ينشئ أوامر شراء

3. **أحداث GRN**
   - `grn.*` ← ينشئ توريدات مخزنية أو استلام تحويل مخزني

### منطق إنشاء المستندات

#### أوامر البيع
- تُنشأ عند استقبال أحداث `order` (من النوع غير STO) بحالة ≠ "new_order"
- تربط معلومات العميل وعناوين الفوترة/الشحن وأصناف الطلب
- تربط بعروض الأسعار الموجودة إذا تم توفير `order_alias`

#### عمليات تحويل المخزون
- **طلب تحويل مخزني**: يُنشأ لطلبات STO بحالة "new_order"
- **صرف تحويل مخزني**: يُنشأ لطلبات STO بحالة ≠ "new_order"
- **استلام تحويل مخزني**: يُنشأ من أحداث GRN عند وجود صرف تحويل مخزني مطابق

#### أوامر الشراء
- تُنشأ من أحداث `purchase`
- تتضمن معلومات المورد وتفاصيل المستودع وأصناف الشراء

#### التوريدات المخزنية
- تُنشأ من أحداث GRN عند عدم وجود صرف تحويل مخزني مطابق
- تربط بأوامر الشراء الموجودة عبر مرجع `entity_id`

### معالجة محتوى Webhook

يقوم معالج webhook بما يلي:
1. التحقق من صحة المفتاح السري لـ webhook مقابل الإعداد
2. تحليل محتوى JSON لاستخراج نوع الحدث والبيانات
3. توجيه الحدث إلى طريقة إنشاء المستند المناسبة
4. ربط بيانات Omniful بكيانات نما ERP
5. حفظ المستندات وفقاً لإعداد Document Generation Info
6. تحديث حقول المرجع بمعرفات Omniful للمزامنة المستقبلية

## ربط البيانات (Data Mapping)

### ربط بيانات العميل

| حقل نما ERP | حقل Omniful |
|----------------|---------------|
| Name1 | first_name |
| Name2 | last_name |
| Contact Info → Email | email |
| Contact Info → Mobile | mobile |
| Gender | gender |
| Birth Date | date_of_birth |
| Contact Info → Address | address object |
| Passport Details | documents array |

### ربط بيانات الأصناف

| حقل نما ERP | حقل Omniful |
|----------------|---------------|
| Size/Color Code | sku_code |
| Item Name | name |
| Code + Color | description |
| Prevent Usage | status ("live"/"un_sync") |
| Base UOM | uom |
| Net Purchase Value | cost |
| Current Price | selling_price, retail_price |

### ربط بيانات الطلبات

| حقل نما ERP | حقل Omniful |
|----------------|---------------|
| ID | order_id |
| Code | order_alias |
| Warehouse Code | hub_code |
| Customer ID | customer.id |
| Billing Address | billing_address |
| Shipping Address | shipping_address |
| Order Items | order_items array |
| Payment Method | payment_method |

## معالجة الأخطاء (Error Handling)

### أخطاء إنشاء المستندات

عند مواجهة أخطاء أثناء معالجة webhook:

1. **الحفظ كمسودة**: إذا كان خيار "Save Doc With Errors As Draft" مفعّلاً في الإعداد، يُحفظ المستند كمسودة
2. **رمي الاستثناء**: إذا كان حفظ المسودة معطّلاً، تطرح العملية استثناءً وتُعيد استجابة خطأ

### متطلبات التحقق

قبل المعالجة، يتحقق النظام من:
- وجود إعداد Omniful وضبطه بشكل صحيح
- تعريف سطور Document Generation Info
- إعداد حقول المرجع المطلوبة
- تطابق المفتاح السري لـ webhook مع الإعداد

## عملاء API

يستخدم التكامل نوعين من عملاء API:

### OmnifulSalesChannelAPIClient
- يُستخدم للعمليات المتعلقة بالعملاء والطلبات
- يتعامل مع نقاط نهاية API لقناة البيع
- يدير إنشاء العملاء وتحديثهم

### OmnifulTenantAPIClient
- يُستخدم لإدارة المستودعات وعمليات المخزون
- يتعامل مع نقاط نهاية API على مستوى Tenant
- يدير الأصناف والمستودعات وعمليات سلسلة التوريد
