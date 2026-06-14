<rtl>

# أسئلة شائعة عن تصميم التقارير

## مشكلة: ظهور رسالة `Can not handle generic reference setValueFromNest` عند استخدام زر لإنشاء سند تحويل مخزني

### السياق:

قمت بإنشاء زر في تقرير يقوم بإنشاء سند تحويل مخزني ويملأ الحقول تلقائيًا، ووضعت الكود التالي في `Initial Value Expression`:

```groovy
NamaRep.newWithFields("StockTransfer").viewName("warehousetransfersIssue").field("term").value("Stock Transfer 01")
        .field("legalEntity").value("01").field("sector").value("5").field("branch").value("W101").field("warehouse").value("W0109")
        .field("ref3").value("W0101").field("ref2").value("W101").field("toWarehouse").value("W0103")
```

وفي `Expression` وضعت:

```groovy
$V{creatorLink}.field("details.item.itemCode").value($F{ICode}).row($V{itemCodeRow})
        .field("details.quantity.quantity.primeQty.value").value($V{qty}).row($V{itemCodeRow})
        .field("details.toLocator").value("").row($V{itemCodeRow})
        .field("details.specificDimensions.locator").value($F{locode}).row($V{itemCodeRow})
```

لكن عند تشغيل التقرير ظهرت رسالة الخطأ التالية في كونسول المتصفح:

```
NaMaUIException: Can not handle generic reference setValueFromNest
```

---

### الحل:

السبب في هذه المشكلة هو أنك وضعت قيمة لحقل مرجع عام (`ref2` و `ref3`) مباشرة، بدون تحديد نوع المرجع أو الكود بشكل صحيح.

حقول مثل `ref2` و `ref3` تُعرف بأنها مراجع عامة (generic references)، ويجب عند التعامل معها استخدام المعرّف المناسب بالشكل التالي:

* `ref2#code` بدلًا من `ref2`
* وإذا كان الحقل يسمح بأكثر من نوع مرجعي، يجب تحديد النوع باستخدام `ref2#type`

---

### التصحيح المطلوب:

```groovy
NamaRep.newWithFields("StockTransfer").viewName("warehousetransfersIssue").field("term").value("Stock Transfer 01")
        .field("legalEntity").value("01").field("sector").value("5").field("branch").value("W101").field("warehouse").value("W0109")
        .field("ref3#type").value("Warehouse").field("ref3#code").value("W0101")
        .field("ref2#type").value("Warehouse").field("ref2#code").value("W101")
        .field("toWarehouse").value("W0103")
```

---

::: tip ملاحظة
إذا كان الحقل المرجعي (مثل `ref2`, `ref3`) لا يسمح إلا بنوع واحد (مثلاً مخزن فقط)، فيمكنك تجاهل حقل `#type` والاكتفاء بـ `#code` فقط:

```groovy
NamaRep.newWithFields("StockTransfer").viewName("warehousetransfersIssue").field("term").value("Stock Transfer 01")
        .field("legalEntity").value("01").field("sector").value("5").field("branch").value("W101").field("warehouse").value("W0109")
        .field("ref3#code").value("W0101")
        .field("ref2#code").value("W101")
        .field("toWarehouse").value("W0103")
```

:::

</rtl>
