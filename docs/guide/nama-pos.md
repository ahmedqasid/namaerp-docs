# دليل استعمال النقاط الفنية في نقاط البيع

Nama ERP is a web-based system, but its **Nama POS** module includes a dedicated **desktop application** for Points of Sale (POS), offering both online and offline capabilities:

* POS operates offline using a local POS database.
* It automatically syncs with the Nama ERP central database.
* Integrates with payment terminals, including an embedded credit-card processor for mobile phones.
* POS functionality is available on Android and iOS via the **Captain Order** mobile app.

## Nama POS Pole Display Configuration Using Tempo


---

## POS Pole Display Setup

To configure a pole display for Nama POS, follow these steps:

1. Go to the **"Pos Pole Display Specs"** screen.
2. Set:

* **Communication Type**: e.g., Serial, USB.
* **Printer Name or Port Number**: to define the connection interface.
3. Link the pole display configuration to a machine by setting the **"Pos Pole Display Specs"** field in the machine record.

---

## Displaying Data on the Pole Display

Nama POS allows defining **template-based messages** for different events in the sales process. Templates are configured in the **"Pos Pole Display Specs"** screen.

### Supported Functions

* **Clear Line:**

```tempo
@CLEARLINE@
```

Use it to clear one line on the pole display.

**Example:**

```tempo
@CLEARLINE@@CLEARLINE@ Welcome
```

Clears two lines, then displays: `Welcome`.

* **Last Modified Line:**

```tempo
{lastModifiedLine}
```

Use this to get the most recently added invoice line.

**Example:**

```tempo
{lastModifiedLine.qty.value}
```

Gets the quantity of the last added item.

---

## Pole Display Templates

### Idle Template

Displayed when the POS is idle, before any invoice is created.

```tempo
@CLEARLINE@@CLEARLINE@**** Welcome to Register {name2}
```

Clears both lines and shows a welcome message with the register's name.

---

### Line Adding Template

Displayed when a new item is added to the invoice.

```tempo
@CLEARLINE@@CLEARLINE@
{padleft(20)}Item: {lastModifiedLine.item.name2}{endpad}
{padleft(20)}Qty: {lastModifiedLine.qty.uom.name2} - {round(lastModifiedLine.qty.value,0)}{endpad}
```

Shows item name and quantity info, padded for alignment.

---

### Total Template

Displayed when the Tender screen is opened (before payment).

```tempo
@CLEARLINE@@CLEARLINE@
{padleft(20)}Total: {round(netPrice,2)}${endpad}
```

Displays the invoice total amount.

---

### Remaining Template

Displayed after the customer pays and change is calculated.

```tempo
@CLEARLINE@@CLEARLINE@
{padleft(20)}Remaining: {round(change,2)}${endpad}
```

Displays the remaining change to be returned to the customer.

---

These templates provide a flexible way to control real-time messaging on POS displays using Tempo syntax.

<rtl>


## فلترة البحث في شاشات نقاط البيع باستخدام محددات الماكينة

في نظام نما، يتم تطبيق الفلترة تلقائيًا على محددات الدخول (مثل الشركة، الفرع، القطاع...) في الشاشات العادية.
ولكن في **نظام نقاط البيع (POS)**، لا يتم تطبيق هذه الفلاتر بشكل تلقائي، لأن النظام يعتمد على محددات الجهاز (الماكينة) بدلاً من المستخدم.

لذلك، لتفعيل الفلترة في شاشات البحث داخل نقاط البيع بناءً على محددات الماكينة، يتم استخدام **شاشة إعدادات نقاط البيع**، وتحديدًا من خلال جدول **"فلترة المحددات"**.

### مثال:

لنفترض أنك تريد فلترة **المنطقة (المستخدمة في عنوان التوصيل)** في **فاتورة مبيعات نقاط البيع** بحيث تظهر فقط المناطق المرتبطة بفرع الماكينة الحالية:

1. افتح **شاشة إعدادات نقاط البيع**.
2. في جدول **"فلترة المحددات"**:

    * أضف سطرًا جديدًا.
    * اختر النوع **"منطقة"** في حقل **النوع**.
    * في حقل **"مفلتر في النوع"**، اختر **"فاتورة مبيعات نقاط البيع"**.
    * فعّل خيار **"فلترة بالفرع"**.
3. يمكنك أيضًا إنشاء **قائمة أنواع** تحتوي على "منطقة" وأنواع بيانات أخرى لتطبيق نفس الفلترة عليها.

### الخيارات المتاحة للفلترة:

* ✅ فلترة بالشركة
* ✅ فلترة بالفرع
* ✅ فلترة بالقطاع
* ✅ فلترة بالإدارة
* ✅ فلترة بالمجموعة التحليلية

</rtl>
