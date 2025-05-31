<rtl>

# أسئلة عن مسار الكيان EAFieldsValuesCalculator

## كيف يمكن تثبيت قيمة في حقل مرجع عام عند الحفظ داخل مسار كيان؟ حاولت استخدام:

```groovy
details.ref1='MCI0001'
```

مع العلم أنني حددت النوع المطلوب في إعدادات الحقول والشاشات، لكن القيمة لا تُحفظ. كما جرّبت تعيين النوع والكود معًا هكذا:

```groovy
details.ref1.entityType='PurchaseElement'
details.ref1='MCI0001'
```

أو على سطرين:

```groovy
details.ref1.entityType='PurchaseElement'
details.ref1.code='MCI0001'
```

لكن عند فتح المرجع في النظام، لا يتم عرضه بشكل صحيح. ما الطريقة الصحيحة لتعيين هذا النوع من الحقول؟

---

### الإجابة:

عند التعامل مع الحقول المرجعية العامة (التي تقبل مراجع من أكثر من جدول وتُعرض في الواجهة باختيار النوع ثم الكود)، يجب تعبئتها بطريقة واحدة متكاملة، وليس بتعيين النوع والكود بشكل منفصل.

الطريقة الموصى بها هي استخدام دالة `ref` بهذا الشكل:

```groovy
details.ref1=ref('PurchaseElement', 'MCI0001')
```

كما يمكن استخدام استعلام SQL يُرجع النوع والكود أو المعرف، مثل:

```groovy
details.ref1=sql(select 'PurchaseElement', 'MCI0001')
```

أو:

```groovy
details.ref1=sql(select entityType, id from PurchaseElement where code = 'MCI0001')
```

وإذا كنت مضطرًا لاستخدام الطريقة التي تعتمد على تحديد النوع والكود يدويًا، فيجب أيضًا تعيين المعرف (id) حتى يتعرف النظام على المرجع بشكل صحيح:

```groovy
details.ref1.entityType='PurchaseElement'
details.ref1.code='MCI0001'
details.ref1.id='0xFFFF00018C21ED75F9000100FF1573C6'
```

لكن هذه الطريقة معقدة ولا يُنصح باستخدامها ما لم يكن هناك ضرورة قصوى. الأفضل دائمًا استخدام `ref` أو `sql` لسهولة القراءة وضمان عمل المرجع بطريقة سليمة.

<ltr>

::: tip Summary in English
This question explains how to correctly assign a value to a generic reference field (`ref`) in an entity flow, 
especially when the reference can point to multiple entity types. 

It clarifies that you must set both the type and the code together using `ref()` or `sql()` instead of assigning them separately.
:::

</ltr>

::: warning
Testing deploy of docs webhook
:::
</rtl>