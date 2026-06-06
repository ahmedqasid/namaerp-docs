# Frequently Asked Questions About Report Design

## Problem: `Can not handle generic reference setValueFromNest` error when using a button to create a stock transfer

### Context:

I created a button in a report that creates a stock transfer and auto-fills fields. I placed the following code in the `Initial Value Expression`:

```groovy
NamaRep.newWithFields("StockTransfer").viewName("warehousetransfersIssue").field("term").value("Stock Transfer 01")
        .field("legalEntity").value("01").field("sector").value("5").field("branch").value("W101").field("warehouse").value("W0109")
        .field("ref3").value("W0101").field("ref2").value("W101").field("toWarehouse").value("W0103")
```

And in the `Expression` I placed:

```groovy
$V{creatorLink}.field("details.item.itemCode").value($F{ICode}).row($V{itemCodeRow})
        .field("details.quantity.quantity.primeQty.value").value($V{qty}).row($V{itemCodeRow})
        .field("details.toLocator").value("").row($V{itemCodeRow})
        .field("details.specificDimensions.locator").value($F{locode}).row($V{itemCodeRow})
```

But when running the report, the following error appeared in the browser console:

```
NaMaUIException: Can not handle generic reference setValueFromNest
```

---

### Solution:

The cause of this problem is that you set a value for a generic reference field (`ref2` and `ref3`) directly, without specifying the reference type or code correctly.

Fields such as `ref2` and `ref3` are defined as generic references, and when working with them you must use the appropriate identifier as follows:

* `ref2#code` instead of `ref2`
* If the field allows more than one reference type, you must specify the type using `ref2#type`

---

### Required Fix:

```groovy
NamaRep.newWithFields("StockTransfer").viewName("warehousetransfersIssue").field("term").value("Stock Transfer 01")
        .field("legalEntity").value("01").field("sector").value("5").field("branch").value("W101").field("warehouse").value("W0109")
        .field("ref3#type").value("Warehouse").field("ref3#code").value("W0101")
        .field("ref2#type").value("Warehouse").field("ref2#code").value("W101")
        .field("toWarehouse").value("W0103")
```

---

::: tip Note
If the reference field (such as `ref2`, `ref3`) only allows one type (for example, warehouse only), you can omit the `#type` field and use `#code` alone:

```groovy
NamaRep.newWithFields("StockTransfer").viewName("warehousetransfersIssue").field("term").value("Stock Transfer 01")
        .field("legalEntity").value("01").field("sector").value("5").field("branch").value("W101").field("warehouse").value("W0109")
        .field("ref3#code").value("W0101")
        .field("ref2#code").value("W101")
        .field("toWarehouse").value("W0103")
```

:::
