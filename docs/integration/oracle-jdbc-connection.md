# إعداد اتصال Oracle JDBC في ملف context.xml لأغراض التكامل {#ORACLE-JDBC-Integration-Connection-in-context-xml-for-integration-purposes}

```xml
<Resource name="jdbc/ldm" auth="Container" type="javax.sql.DataSource"
		factory="org.apache.tomcat.jdbc.pool.DataSourceFactory" maxActive="10000"
		maxIdle="20" maxWait="10000" username="username" password="password"
		driverClassName="net.sf.log4jdbc.DriverSpy" validationQuery="SELECT 1 FROM DUAL"
		testWhileIdle="true"
		url="jdbc:log4jdbc:oracle:thin:@192.168.80.80:1521:ldm"
		timeBetweenEvictionRunsMillis="24000000" testOnBorrow="true"/>

```


> [! WARNING]
> 
> توجد مشكلة في Oracle تتعلق بأسماء الأعمدة الطويلة؛ الحد الأقصى لطول اسم أي عمود هو 30 حرفاً، بينما تحتاج SQLImporter إلى أسماء طويلة للأعمدة. كحلٍّ لهذه المشكلة، قمنا بتنفيذ التذكرة التالية: [https://namasoft.com/reqs/ECDR03542](https://namasoft.com/reqs/ECDR03542)
محتوى التذكرة:
قاعدة بيانات Oracle لا تسمح بأسماء مستعارة (aliases) تزيد عن 30 حرفاً، مما يُشكّل مشكلة مع مسار كيان SQLImporter الذي نستخدمه للتكامل على مستوى قاعدة البيانات مع الأنظمة الأخرى.

> [! Solution]
> 
> كحل، نحتاج إلى إضافة أعمدة خاصة بعد الأعمدة التي تحتاج إلى اسم طويل. فيما يلي استعلام استيراد تفاصيل فعلي للتكامل مع نظام NTME لمعلومات المختبر (LDM):

```sql
select '' ":-detail:details", r.REQUEST_ID "#description1",'1000001' "details.item.itemCode",'1000001' "details.item.item",rl.SERVICE_CODE "details.n1",rl.SERVICE_NAME "details.text1",'1' "details.quantity.quantity.primeQty.value",'101' "details.quantity.quantity.primeQty.uom",
rl.CASH_FEES "details.price.unitPrice",rl.DISCOUNT "details.price.discount1.value"
from Request_Services rl
left join Requests r on rl.REQUEST_ID = r.REQUEST_ID
where r.REQUEST_ID = '468273'
```

#### للأسف، Oracle يرفض هذا الاستعلام لأن الأسماء المستعارة details.quantity.quantity.primeQty.value وdetails.quantity.quantity.primeQty.uom تتجاوز 30 حرفاً. الاستعلام المعدَّل التالي سيعمل بشكل صحيح؛ أضفنا عمودين "وهميين" بأسماء مستعارة تبدأ بالرمز $alias$ وتحتوي قيمتهما على الاسم المستعار الفعلي، وسيقوم نما بحذف هذه الأعمدة الوهمية: {#Unfortunately-oracle-rejects-this-query-because-the-aliases-details-quantity-quantity-primeQty-value--details-quantity-quantity-primeQty-uom--are-too-long--more-than-30-characters-long--The-following-modified-query-will-work--we-added-two--dummy--columns-with-an-alias-starting-with-the-symbol--alias--in-its-alias-and-the-actual-alias-in-the-value--Nama-will-remove-those-pseudo-columns-}

```sql
select '' ":-detail:details", r.REQUEST_ID "#description1",'1000001' "details.item.itemCode",'1000001' "details.item.item",rl.SERVICE_CODE "details.n1",rl.SERVICE_NAME "details.text1",'1' "c1", 'details.quantity.quantity.primeQty.value' "$alias$1",
'101' "c2", 'details.quantity.quantity.primeQty.uom' "$alias$2",
rl.CASH_FEES "details.price.unitPrice",rl.DISCOUNT "details.price.discount1.value"
from Request_Services rl
left join Requests r on rl.REQUEST_ID = r.REQUEST_ID
where r.REQUEST_ID = '468273'
```

#### الجزء المهم في الاستعلام هو: {#This-is-the-interesting-part-in-the-query-}

```sql
'1' "c1", 'details.quantity.quantity.primeQty.value' "$alias$1",
'101' "c2", 'details.quantity.quantity.primeQty.uom' "$alias$2",
```


#### سيتم التعامل مع هذا كما لو كتبت التالي {#This-will-be-changed-as-if-you-wrote-the-following}

```sql
'1' "details.quantity.quantity.primeQty.value",
'101' "details.quantity.quantity.primeQty.uom"
```
