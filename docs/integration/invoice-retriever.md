# إرسال الفواتير والمستندات للعملاء {#Sending-Invoices-and-Documents-to-Customers}

تتيح ميزة **Invoice Retriever** في Nama ERP إرسال روابط للعملاء (أو الموردين) تقوم بإنشاء التقارير (مثل الفواتير والإيصالات) وتقديمها عند الطلب.

عندما يضغط العميل على الرابط للمرة الأولى، يقوم النظام بتشغيل التقرير المرتبط وحفظ الملف الناتج، ثم يقدم نفس الملف في الزيارات اللاحقة لتحسين الأداء.

## خطوات الإعداد {#Configuration-Steps}

### 1. إعداد Invoice Retriever {#1-Configure-Invoice-Retriever}

* انتقل إلى شاشة **إعدادات الحقول والكيانات**.
* في جدول **Invoice Retriever Lines**، أضف سطرًا جديدًا.
* اختر النموذج الذي تريد استخدامه لإنشاء الفاتورة أو المستند.

### 2. تحديد مجلد الإخراج {#2-Set-Output-Folder}

* حدد مسار المجلد الذي سيتم تخزين الملفات الناتجة فيه.
* سيخزن النظام نتيجة التقرير هنا لتقديمها في زيارات الرابط اللاحقة دون إعادة الإنشاء.
* يمكنك حذف الملفات يدويًا من هذا المجلد لإجبار النظام على إعادة الإنشاء.

::: tip
بشكل افتراضي، يعمل التقرير مرة واحدة فقط. إذا تم تحديث الفاتورة لاحقًا، **لن** تظهر التغييرات في الرابط إلا بعد حذف الملف المحفوظ يدويًا.
:::

### 3. إجبار إعادة التنفيذ (تعطيل التخزين المؤقت) {#3-Force-Re-Execution-Disable-Caching}

* إذا أردت أن يعمل التقرير **في كل مرة** يتم فيها الوصول إلى الرابط، فعّل خيار `Do Not Cache` في سطر Invoice Retriever.

### 4. دعم نماذج متعددة {#4-Support-for-Multiple-Forms}

* يمكنك تعريف عدة retrievers لنفس الكيان باستخدام حقل **URL Prefix**.
* هذا يتيح دعم أنواع مستندات متعددة تحت مسارات URL مختلفة (مثل `invoices` و`receipts`).

## إرسال الرابط في الإشعارات {#Sending-the-Link-in-Notifications}

استخدم تعريفات الإشعارات (SMS، بريد إلكتروني، وغيرها) لإرسال روابط للعملاء باستخدام المتغير `{retrieverFileId}`.

### مثال أساسي (SMS): {#Basic-Example-SMS}

```
Thanks for visiting us, view your invoice by clicking on this link:
https://my.swsg.co/erp/r/{retrieverFileId}
```

### مع امتداد الملف: {#With-File-Extension}

```
https://my.swsg.co/erp/r/{retrieverFileId}.pdf
```

### مع كود ديناميكي: {#With-Dynamic-Code}

```
https://my.swsg.co/erp/r/{retrieverFileId}.{code}.pdf
```

### أسلوب URL أنظف: {#Cleaner-URL-Style}

```
https://my.swsg.co/erp/r/{retrieverFileId}/{code}.pdf
```

### مع URL Prefix (مثل invoices): {#With-URL-Prefix-eg-invoices}

```
https://my.swsg.co/erp/r/invoices/{retrieverFileId}
```

استخدم هذه الأشكال المختلفة لتخصيص طريقة ظهور الرابط وعمله بحسب احتياجات عملك وهويتك البصرية.
