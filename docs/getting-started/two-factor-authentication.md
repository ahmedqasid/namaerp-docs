# دليل المصادقة الثنائية (2FA) {#Two-Factor-Authentication-2FA-Guide}

## نظرة عامة {#Overview}

تضيف المصادقة الثنائية (2FA) طبقة حماية إضافية لعملية تسجيل الدخول في Nama ERP، إذ تطلب من المستخدمين تقديم وسيلة تحقق ثانية تتجاوز اسم المستخدم وكلمة المرور. تدعم هذه الميزة طرق مصادقة متعددة وتوفر خيارات إعداد مرنة لمسؤولي النظام.

## طرق المصادقة المدعومة {#Supported-Authentication-Methods}

### 1. Message OTP (كلمة المرور لمرة واحدة) {#1-Message-OTP-One-Time-Password-}
تستخدم قالب الإشعار المُعدّ الذي يمكنه إرسال رموز OTP عبر قنوات متعددة:
- **SMS**: إرسال رموز OTP عبر رسالة قصيرة إلى رقم الجوال المسجّل للمستخدم
- **البريد الإلكتروني**: إرسال رموز OTP إلى عنوان البريد الإلكتروني المسجّل للمستخدم
- **WhatsApp**: إرسال رموز OTP عبر رسائل WhatsApp
- **إشعارات داخل التطبيق**: عرض OTP ضمن نظام الإشعارات في التطبيق

### 2. تكامل Estidamah API {#2-Estidamah-API-Integration}
تكامل مع مزود مصادقة مخصص للمؤسسات التي تستخدم بوابة مصادقة Estidamah. تعمل هذه الطريقة على النحو التالي:
- تشفير بيانات الاعتماد باستخدام مفاتيح التشفير المُعدّة
- إرسال البيانات المشفرة إلى بوابة مصادقة Estidamah
- تتولى البوابة تسليم OTP للمستخدمين
- التحقق من OTP عبر الـ API المتكاملة

### 3. بلا مصادقة ثنائية {#3-None}
تعطيل المصادقة الثنائية (غير موصى به في بيئات الإنتاج)

## إعدادات الضبط {#Configuration-Settings}

### الوصول إلى إعدادات تسجيل الدخول {#Access-Login-Settings}
اذهب إلى: **الإعداد العام** → **إعدادات تسجيل الدخول**

### قواعد التحقق من الإعدادات {#Configuration-Validation-Rules}

يطبّق النظام قواعد التحقق التالية عند ضبط المصادقة الثنائية:

1. **متطلبات طريقة Message OTP**:
   - **قالب الإشعار**: يجب اختيار تعريف إشعار لإرسال رموز OTP
   - رسالة الخطأ في حال عدم الضبط: *"Cannot select the option Message OTP without filling Notification For Two-Factor Authentication OTP"*

2. **متطلبات طريقة Estidamah API**:
   - **جميع حقول Estidamah الثلاثة إلزامية**:
     - Environment URL
     - Encryption Key
     - Encryption IV
   - **Custom Password Validator**: يجب تفعيله في `nama.properties`
   - الخطأ في حال عدم التفعيل: *"You cannot enable Estidamah login method without enabling custom password validator in nama.properties first"*

### حقول الضبط المتاحة في الإعداد العام {#Available-Configuration-Fields-in-Global-Config}

| الحقل | الوصف | الافتراضي | الخيارات | قواعد التحقق |
|-------|-------|-----------|---------|--------------|
| **login2FAMethod** | اختيار طريقة المصادقة الثنائية | None | • None<br>• Message OTP<br>• Estidamah API | - |
| **notificationFor2FAOtp** | قالب الإشعار لإرسال OTP | - | اختر من تعريفات الإشعار المتاحة | **مطلوب** عند استخدام طريقة Message OTP |
| **otpFormat** | صيغة OTP المُولَّد | Numeric | • Numeric (مثال: 123456)<br>• Alphabetic (مثال: ABCDEF)<br>• AlphaNumeric (مثال: A1B2C3) |
| **otpLength** | عدد أحرف OTP | 6 | 4-10 أحرف |
| **otpExpiryTime** | الوقت بالثواني قبل انتهاء صلاحية OTP | 300 | 60-1200 ثانية (1-20 دقيقة) |
| **otpResendDelay** | الانتظار بالثواني قبل السماح بإعادة إرسال OTP | 60 | 30-300 ثانية |

### الإعدادات الخاصة بـ Estidamah {#Estidamah-Specific-Settings}
مطلوبة فقط عند استخدام طريقة Estidamah API:

| الحقل | الوصف |
|-------|-------|
| **estidamahEnvironmentUrl** | رابط بوابة Estidamah (مطلوب) |
| **estidamahEncryptionKey** | مفتاح التشفير لتأمين بيانات الاعتماد (مطلوب) |
| **estidamahEncryptionIV** | متجه التهيئة للتشفير (مطلوب) |

::: warning متطلب إعداد مهم
لاستخدام طريقة مصادقة Estidamah API، يجب تفعيل custom password validator في `nama.properties`:
```properties
use-custom-password-validator=true
```
يمنع هذا الإعداد تشفير كلمة المرور ويسمح للنظام بإرسال بيانات الاعتماد المشفرة إلى بوابة Estidamah.
:::

## تجربة المستخدم {#User-Experience-Flow}

### تسجيل الدخول القياسي مع المصادقة الثنائية {#Standard-Login-with-2FA}

1. **تسجيل الدخول الأولي**
   - يُدخل المستخدم اسم المستخدم وكلمة المرور
   - يتحقق النظام من بيانات الاعتماد

2. **توليد OTP**
   - إذا كانت المصادقة الثنائية مفعّلة، يُولّد النظام OTP
   - يُرسَل OTP عبر الطريقة المُعدّة (SMS/بريد إلكتروني/إشعار)
   - يرى المستخدم شاشة إدخال OTP

3. **التحقق من OTP**
   - يُدخل المستخدم رمز OTP المستلَم
   - يتحقق النظام من OTP
   - عند التحقق الناجح، يحصل المستخدم على الوصول

4. **إعادة إرسال OTP**
   - إذا لم يستلم المستخدم OTP، يمكنه طلب إعادة الإرسال
   - الإرسال متاح بعد انتهاء فترة التأخير المُعدّة
   - يُعاد إرسال نفس OTP إذا كان لا يزال صالحاً، أو يُولَّد رمز جديد إذا انتهت صلاحيته

### معالجة الأخطاء {#Error-Handling}

- **OTP غير صالح**: يتلقى المستخدم رسالة خطأ ويمكنه إعادة المحاولة
- **OTP منتهي الصلاحية**: يجب على المستخدم طلب OTP جديد
- **الحد الأقصى للمحاولات**: بعد محاولات فاشلة متعددة، قد يُقفَل الحساب مؤقتاً (يُضبط بشكل منفصل)

## إعدادات المستخدم {#User-Settings}

### استثناء المستخدمين من المصادقة الثنائية {#Excluding-Users-from-2FA}

يمكن استثناء مستخدمين بعينهم من متطلبات المصادقة الثنائية:

1. اذهب إلى **إدارة المستخدمين** → **إعدادات المستخدم**
2. ابحث عن حساب المستخدم
3. فعّل خيار **"Exclude from 2FA"**
4. احفظ التغييرات

هذا مفيد لـ:
- حسابات الخدمة
- حسابات الوصول الطارئ
- المستخدمون في أدوار محددة لا تستلزم المصادقة الثنائية

## تفاصيل التنفيذ التقني {#Technical-Implementation-Details}

### إدارة الجلسة {#Session-Management}

- يرتبط التحقق من OTP بجلسة تسجيل الدخول
- بعد التحقق، يُخزَّن معرّف OTP مؤقتاً
- استدعاءات الـ API اللاحقة ضمن الجلسة لا تتطلب إعادة التحقق
- انتهاء الجلسة يستدعي إجراء مصادقة ثنائية جديدة

## إعداد قالب الإشعار {#Notification-Template-Setup}

### إنشاء قالب إشعار المصادقة الثنائية {#Creating-2FA-Notification-Template}

1. اذهب إلى **إعداد النظام** → **تعريفات الإشعارات**
2. أنشئ إشعاراً يدوياً جديداً بما يلي:
   - **الاسم**: "2FA OTP Notification"
   - **للنوع**: User
   - **يدوي**: True (محدد)
   - **القناة**: اختر واحدة أو أكثر:
     - SMS
     - البريد الإلكتروني
     - WhatsApp
     - إشعار داخل التطبيق
   - **متغيرات القالب**:
     - `{name1}` - الاسم العربي الكامل للمستخدم
     - `{name2}` - الاسم الإنجليزي الكامل للمستخدم
     - `{otpCode}` - رمز OTP المُولَّد
     - أي حقل متاح في ملف بيانات المستخدم الرئيسي

### مثال على قالب SMS {#Example-SMS-Template}
```
Dear ${name2},
Your Nama ERP verification code is: {otpCode}
This code expires in 3 minutes.
Do not share this code with anyone.
```

### مثال على قالب البريد الإلكتروني {#Example-Email-Template}
```html
<p>Dear {name1},</p>
<p>Your Nama ERP login verification code is:</p>
<h2>{otpCode}</h2>
<p>This code will expire in 2 minutes.</p>
<p>If you didn't request this code, please contact your system administrator immediately.</p>
```

### مثال على قالب WhatsApp {#Example-WhatsApp-Template}
```
🔐 *Nama ERP Security Code*

Hello {name2},

Your verification code is: *{otpCode}*

⏱️ Valid for 3 minutes only
⚠️ Do not share this code with anyone

If you didn't request this, contact IT immediately.
```


## الامتثال والتنظيمات {#Compliance-and-Regulations}

يساعد تطبيق المصادقة الثنائية المؤسسات على استيفاء متطلبات الامتثال الأمني المختلفة:

- **ISO 27001**: إدارة أمن المعلومات
- **PCI DSS**: معايير صناعة بطاقات الدفع
- **GDPR**: لوائح حماية البيانات
- **اللوائح المحلية**: متطلبات NCA ECC في المملكة العربية السعودية
