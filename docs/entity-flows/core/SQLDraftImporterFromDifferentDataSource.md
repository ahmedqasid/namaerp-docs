---
title: SQLDraftImporterFromDifferentDataSource
module: core
---

# SQLDraftImporterFromDifferentDataSource

**Description:** Import data from SQL Queries

**Parameters:**
- Update SQL
- Data Source Name (Must be defined in context.xml)
- SQL Statement 1
example:
select '' [:-record:PurchaseOrder],'PurchaseOrder$#PO' book,'PO'+CONVERT(NVARCHAR(10), GETDATE(), 112) code,	'PurchaseOrder$#PO' term,getdate() valueDate 

- SQL Statement 2
example:
select '' [:-detail:details],'PO'+CONVERT(NVARCHAR(10), GETDATE(), 112) #code,i.code [details.item.itemCode],i.id [details.item.item],
 i.dfMinQuantity-sum(coalesce(q.net,0)) [details.quantity.quantity.primeQty.value]
 ,i.primBaseUnit_id [details.quantity.quantity.primeQty.uom] from InvItem i left join ItemDimensionsQty q on q.item_id = i.id 
where i.dfMinQuantity > 0
group by i.id,i.dfMinQuantity,primBaseUnit_id,i.code
having sum(coalesce(q.net,0))<i.dfMinQuantity
- SQL Statement 3

**Full Class Name:** `com.namasoft.modules.commonbasic.importer.SQLDraftImporterFromDifferentDataSource`

**Module:** core

**⚠️ Warning:** This action prevents simultaneous runs

