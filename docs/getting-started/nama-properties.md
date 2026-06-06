# إعدادات Nama Properties {#Nama-Properties}
```xml
dbtype: sqlserve
```
#### أو mysql

### server: عنوان السيرفر (مثال: http://192.168.1.5:8080/) **هذا الإعداد مهم جداً لكل من الـ REPLICATION والـ BRACODE**

***

# إعدادات REPLICATION و BRACODE {#REPLICATION-AND-BRACODE}
#### `guiserver` : يستخدم للروابط في التقارير (مثال: http://192.168.1.5:8080/erp/)

#### `logsql` : true أو false

#### `logsqltiming` : true أو false لتسجيل جمل SQL مع وقت التنفيذ

#### `SqlTimingWarnThresholdMsec`  : الافتراضي 200 ms

####  `SqlTimingErrorThresholdEnabled` : الافتراضي: 2000 ms

####  `normallog` : استخدم log4j.properties بدلاً من logsql و logsqltiming

####  `trackmemenabled`  : عدّ NamaContextInstances النشطة

####  `trackmemlog`  : الحد الزمني بالـ ms، سيسجّل nama السياقات التي كانت نشطة أطول من هذا الحد

####  `trackmemrelog`  : متى يُعاد تسجيل السياقات النشطة

####  `valuedate`  : التاريخ الافتراضي الذي يُستخدم في حقل valuedate في المستندات الجديدة: dd-mm-yyyy

####  `issuedate`  : التاريخ الافتراضي الذي يُستخدم في حقل issuedate في المستندات الجديدة: dd-mm-yyyy

####  `enablecostschedule`  : اضبطه على true إذا أردت تفعيل جدولة معالجة المهام (المحددة في إعدادات supply chain)

####  `doNotProcessCostLedgerTransactions` : true أو false

```xml
customer=Customer Name
tomcatservice=TomCat Service Name
tasks-initial-delay-minutes=10
```
### يؤخّر مهام جدولة المهام عند بدء التشغيل (https://namasoft.com/reqs/SRDRQ02722)
`serverid=AnyIDYouWant`
### يُستخدم لتمكين إرسال الرسائل القصيرة والبريد الإلكتروني من nama، يجب أن يطابق أو يكون موجوداً في حقل server id في الإعداد العام
### send-emails-only-to=abc@example.com
أرسل البريد الإلكتروني إلى هذا العنوان فقط، وتجاهل أي عناوين أخرى (https://namasoft.com/reqs/KKDRQ00860)
`send-sms-only-to=01xxxxxxx`
### أرسل الرسائل القصيرة إلى هذا الرقم فقط، وتجاهل أي أرقام أخرى (https://namasoft.com/reqs/KKDRQ00860)
`send-ecommerce-data=true`
### يجب أن يكون true حتى تتمكن (Magento/BigCommerce/Shopify/WooCommerce/Zid) من إرسال البيانات إلى موقع التجارة الإلكترونية (تحديث الأسعار والكميات وما إلى ذلك)
`log-sms-data=true`
### إذا أردت حفظ محتوى الرسالة القصيرة والرابط حتى تتمكن من اختبار الروابط
`logforms=true`
### إذا أردت تسجيل معرّف النموذج المستخدم في طباعة المستندات، يمكنك العثور على المعرّف في namasoft.log
#### `checkswitcheditem=true` يمنع الحفظ إذا كان details.item.itemCode != details.item.item.code
#### `allowposedit=true`           	السماح بتحرير/حفظ فواتير POS يدوياً
#### `allowposdelete=true`		السماح بحذف فواتير POS يدوياً
#### `usecache=false`
`local-external-attachments-folder=E:/Attachments
use-new-fifo-processor=false`
https://namasoft.com/reqs/KKDRQ01451 


```xml
prevent-login-of-login-ids=user1,user2
prevent-login-of-login-ids-msg=The user {0} is prevented from login by properties file by administrator
```

```xml

prevent-login-of-ips=192.168,214.165.10.13
prevent-login-of-ips-msg=You can not login from IP {0}, because IP prefix {0} is prevented
```


## ملف إعدادات replication.properties (في tomcat/lib) {#replication-properties-settings-file-in-tomcat-lib-}
### siteid: كود الموقع الحالي
### enable: هل التكرار (replication) مفعّل أم لا
### headofficeip: عنوان IP لـ bus المكتب الرئيسي
### headofficeport: منفذ bus المكتب الرئيسي
### headofficeurl:
#### مثال:
```xml
enable=true
siteid=001
headofficeurl=http://headofficeip:8080/
sitesequence=1
```
