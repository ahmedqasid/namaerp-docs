# Inventory Related Utility Queries
## Re-Open Stock Taking for updates after editing
```sql
declare @startdoccode as nvarchar(50)
set @startdoccode = 'ST0000001'
update endt set status =  'Started',endActionProcessed = 0 from EndStockTaking endt inner join StartStockTaking st on st.id = endt.startDoc_id
 where st.code = @startdoccode

update std set status = 'Started' from StockTakingDetails std inner join StartStockTaking st on st.id = std.startDoc_id
 where st.code = @startdoccode

update StartStockTaking set status = 'Started' where code = @startdoccode
```

## Allow overdraft for all items at once, and closing it again
::: tip
 description5 is used to save current overDraftPolicy
:::
- Allow Overdraft:
```sql
update InvItem set overDraftPolicy = 'Yes',description5 = 'No' where overDraftPolicy = 'No'

```
- Close Overdraft:
```sql
update InvItem set overDraftPolicy = 'No',description5 = '' where description5 = 'No'
```
::: warning
Please note that you must evict cache after executing the query (from <NamaURL url="utils?evict=true"/>)

:::

## Find All Documents with changed base unit
```sql
select si.entityType,si.id,si.code from StockIssueLine l left join StockIssue si on si.id = l.stockIssue_id left join InvItem i on i.id = l.item_id 
where i.primBaseUnit_id <> l.quantityBaseUom_id
union all
select si.entityType,si.id,si.code from StockReceiptLine l left join StockReceipt si on si.id = l.stockReceipt_id left join InvItem i on i.id = l.item_id 
where i.primBaseUnit_id <> l.quantityBaseUom_id
union all
select si.entityType,si.id,si.code from StockTransferLine l left join StockTransfer si on si.id = l.stockTransfer_id left join InvItem i on i.id = l.item_id 
where i.primBaseUnit_id <> l.quantityBaseUom_id
```

## Find Transactions with different qty and cost base unit
```sql
select distinct c.originType,c.originId,c.origincode from costouttransline c left join qtytransline q  on c.originlineid = q.originlineid
where c.totalQty <> q.outBasePValue and q.outBasePValue > 0
union 
select distinct c.originType,c.originId,c.origincode from costintransline c left join qtytransline q  on c.originlineid = q.originlineid
where c.totalQty <> q.inBasePValue and q.inBasePValue > 0
```

## Fix changed Unit for an Item
```sql
declare @icode as nvarchar(250)
set @icode = 'ItmeCode'

update q set quantityPUom_id = i.primBaseUnit_id from SalesInvoiceLine q left join InvItem i on i.id = q.item_id 
 where i.code = @icode

 update q set quantityPUom_id = i.primBaseUnit_id from SalesReturnLine q left join InvItem i on i.id = q.item_id 
 where i.code = @icode

 update q set quantityPUom_id = i.primBaseUnit_id from SalesQuotaionLine q left join InvItem i on i.id = q.item_id 
 where i.code = @icode

 update q set quantityPUom_id = i.primBaseUnit_id from SalesQuotaionReqLine q left join InvItem i on i.id = q.item_id 
 where i.code = @icode

 update q set quantityPUom_id = i.primBaseUnit_id from PurchaseInvoiceLine q left join InvItem i on i.id = q.item_id 
 where i.code = @icode

 update q set quantityPUom_id = i.primBaseUnit_id from PurchaseReturnLine q left join InvItem i on i.id = q.item_id 
 where i.code = @icode

 update q set quantityPUom_id = i.primBaseUnit_id from PurchaseOrderLine q left join InvItem i on i.id = q.item_id 
 where i.code = @icode

 update q set quantityPUom_id = i.primBaseUnit_id from StockIssueLine q left join InvItem i on i.id = q.item_id 
 where i.code = @icode

 update q set quantityPUom_id = i.primBaseUnit_id from StockReceiptLine q left join InvItem i on i.id = q.item_id   where i.code = @icode

 update q set quantityPUom_id = i.primBaseUnit_id from StockTransferLine q left join InvItem i on i.id = q.item_id  where i.code = @icode
```
## Query To List Documents That should be recommitted after changing Base Unit in Item:
```sql
select distinct h.entityType,h.id,h.code from StockIssue h  left join StockIssueLine q on q.stockIssue_id = h.id left join InvItem i on i.id = q.item_id where q.quantityBaseUom_id <> i.primBaseUnit_id and h.generationType <> 'GeneratedFinal'
union all
select distinct h.fromDoc_type,h.fromDoc_id,h.fromDoc_Code from StockIssue h  left join StockIssueLine q on q.stockIssue_id = h.id left join InvItem i on i.id = q.item_id where q.quantityBaseUom_id <> i.primBaseUnit_id and h.generationType = 'GeneratedFinal'
union all
select distinct h.entityType,h.id,h.code from StockReceipt h  left join StockReceiptLine q on q.StockReceipt_id = h.id left join InvItem i on i.id = q.item_id where q.quantityBaseUom_id <> i.primBaseUnit_id and h.generationType <> 'GeneratedFinal'
union all
select distinct h.fromDoc_type,h.fromDoc_id,h.fromDoc_Code from StockReceipt h  left join StockReceiptLine q on q.StockReceipt_id = h.id left join InvItem i on i.id = q.item_id where q.quantityBaseUom_id <> i.primBaseUnit_id and h.generationType = 'GeneratedFinal'
union all
select distinct h.entityType,h.id,h.code from StockTransfer h  left join StockTransferLine q on q.StockTransfer_id = h.id left join InvItem i on i.id = q.item_id where q.quantityBaseUom_id <> i.primBaseUnit_id and h.generationType <> 'GeneratedFinal'


```
## Find Entities that caused retries on a massive scale of invtransreq records
```sql
select e.lastUpdateDate,r2 .originType,r2.originCode,r2.originId,r.originType retryType,r.originCode retryCode,r.originId retryId
from InvTransReq r
inner join InvTransReq r2 on r2.id = r.secondLevelSource
left join EntitySystemEntry e on e.targetId = r2.originId
where e.lastUpdateDate between dateadd(day,-2,getdate()) and getdate()

order by e.lastUpdateDate desc

```

## Find dates where overdraft happened

```sql
with cost as (
select item_id,totalQty,totalCost,strSequence,originCreationDate,warehouse_id,locator_id,dimensionQty,dimensionCost,
valueDate,invoiceType,unitCost 
from CostInTransLine 

union all
select item_id,totalQty *-1 ,totalCost*-1,strSequence,originCreationDate,warehouse_id,locator_id,dimensionQty,dimensionCost,
valueDate,invoiceType, unitCost
from CostOutTransLine

)
, costWithTotalQty as(
select item_id,warehouse_id,locator_id,dimensionQty,dimensionCost,
sum(totalQty) over (partition by dimensionQty order by strSequence,totalQty rows unbounded preceding) qtyToDate,valueDate
from cost
)
select i.code,i.name1,c.qtyToDate,c.valueDate,w.code warehouseCode,w.name1 warehouseName,w.id warehouseId ,loc.code locatorCode,loc.name1 locatorName,loc.id locatorId 
from costWithTotalQty  c
left join InvItem i on i.id = c.item_id
left join warehouse w on w.id = c.warehouse_id
left join locator loc on loc.id = c.locator_id
where qtyToDate < 0

```

## Find incorrect itemdimensionsqty 
```sql
with qty as (
select sum(l.inBasePValue-l.outBasePValue) net,l.item_id,l.warehouse_id,l.locator_id
from QtyTransLine l

group by l.item_id,l.warehouse_id,l.locator_id
),
dim as (
select sum(l.net) net,l.item_id,l.warehouse_id,l.locator_id
from itemdimensionsqty l

group by l.item_id,l.warehouse_id,l.locator_id
)
select coalesce(qty.item_id,dim.item_id) item_id,coalesce(qty.warehouse_id,dim.warehouse_id) warehouse_id
, coalesce(qty.locator_id,dim.locator_id) locator_id
 from qty 
full join dim on qty.item_id = dim.item_id and qty.warehouse_id = dim.warehouse_id and coalesce(qty.locator_id,0x1) = coalesce(dim.locator_id,0x1)
where coalesce(qty.net,0) <> coalesce(dim.net,0)

```

## Fix Production/Expiry Date Problem (Healthy, Watania, Liptis)
```sql
update itemlot  set productionDate =  q.productionDate from ItemLot left join QtyTransLine q on q.item_id = ItemLot.invItem_id and q.lotId = itemlot.lotId
where itemlot.expiryDate = itemlot.productionDate and q.expiryDate <> q.productionDate and q. productiondate is not null

```
::: tip
Use the entity flow `EAUpdateLotIdDates`, it will give you more control
:::

## Zombie QtyTrackingTransactionEntry
```sql
delete e from EntitySystemEntry e left join stockissue si on si.id = e.targetId where e.targetType = 'StockIssue' and si.id is null
go
delete qe from QtyTrackingTransactionEntry qe 
left join EntitySystemEntry e on e.targetId = qe.originDocId
where e.id is null

```

## Cost Revaluatoin Problem Finders
```sql
select  i.itemCode,i.originCode  from CostInTransLine i left join CostOutTransLine o on i.originLineId = o.originLineId and o.originId = i.originId where i.originType = 'CostRevaluation' and i.netQty <> o.netQty;

select distinct c.code, l1.lineNumber,l2.lineNumber,i.code,i.name1
from RevaluationLine l1 inner join RevaluationLine l2 on l1.id <> l2.id and l1.costRevaluation_id = l2.costRevaluation_id
and l1.item_id = l2.item_id and l1.lineNumber< l2.lineNumber
and l1.department_id = l2.department_id and l1.analysisSet_id = l2.analysisSet_id
and l1.sector_id = l2.sector_id and l1.branch_id = l2.branch_id
left join CostRevaluation c on c.id = l1.costRevaluation_id
left join InvItem i on i.id = l1.item_id

```

## Find Reverse Stock Transfers
```sql
select co1.originCode,co2.originCode from CostOutTransLine co1 left join CostInTransLine ci1 on ci1.originLineId = co1.originLineId 
full join CostOutTransLine co2 on co2.dimensionQty = ci1.dimensionQty and co2.overdraftSatisQty >0  and co2.originType = 'StockTransfer' 
left join CostInTransLine ci2 on ci2.originLineId = co2.originLineId and ci2.dimensionQty = co1.dimensionQty
where co1.originType = 'StockTransfer' and co1.overdraftSatisQty >0 and ci1.id is not null and co1.id is not null and co2.id is not null and ci2.id is not null and (co2.overdraftSeqDetails like '%'+CONVERT(varchar(50), ci1.strSequence)+'%' or co1.overdraftSeqDetails like '%'+CONVERT(varchar(50), ci2.strSequence)+'%' );

```

## Find Receipts from Sales Returns as first in transaction

```sql
with start as(
select min(strSequence) minStrSequence,dimensionCost  from CostInTransLine c group by dimensionCost
)
select originCode,i.code,i.name1,netQty,netCost,unitCost from start left join CostInTransLine c on c.strSequence = start.minStrSequence
left join InvItem i on i.id = c.item_id
where c.invoiceType = 'SalesReturn'


```

## Fill expiry date and lot id (customer started without expiry, and wants to activate it after doing many transaction)
- Run the following query (note there are 3  extra steps below the query)
```sql
update   l set lotId = '20200919',expiryDate=case when i.hasExpiry = 1 then '20200919' else null end,productionDate=case when i.hasExpiry = 1 then '20200918' else null end
 from StockIssueLine l left join InvItem i on i.id = l.item_id where (i.hasExpiry = 1 and l.expiryDate  is null) or (i.hasLot = 1 and coalesce(l.lotId,'') = '')

update  l set lotId = '20200919',expiryDate=case when i.hasExpiry = 1 then '20200919' else null end,productionDate=case when i.hasExpiry = 1 then '20200918' else null end
 from StockReceiptLine l left join InvItem i on i.id = l.item_id where (i.hasExpiry = 1 and l.expiryDate  is null) or (i.hasLot = 1 and coalesce(l.lotId,'') = '')

update  l set lotId = '20200919',expiryDate=case when i.hasExpiry = 1 then '20200919' else null end,productionDate=case when i.hasExpiry = 1 then '20200918' else null end
 from StockTransferLine l left join InvItem i on i.id = l.item_id where (i.hasExpiry = 1 and l.expiryDate  is null) or (i.hasLot = 1 and coalesce(l.lotId,'') = '')


update  l set lotId = '20200919',expiryDate=case when i.hasExpiry = 1 then '20200919' else null end,productionDate=case when i.hasExpiry = 1 then '20200918' else null end
 from PurchaseInvoiceLine l left join InvItem i on i.id = l.item_id where (i.hasExpiry = 1 and l.expiryDate  is null) or (i.hasLot = 1 and coalesce(l.lotId,'') = '')

update  l set lotId = '20200919',expiryDate=case when i.hasExpiry = 1 then '20200919' else null end,productionDate=case when i.hasExpiry = 1 then '20200918' else null end
 from PurchaseReturnLine l left join InvItem i on i.id = l.item_id where (i.hasExpiry = 1 and l.expiryDate  is null) or (i.hasLot = 1 and coalesce(l.lotId,'') = '')

update  l set lotId = '20200919',expiryDate=case when i.hasExpiry = 1 then '20200919' else null end,productionDate=case when i.hasExpiry = 1 then '20200918' else null end
 from OpeningStockLine l left join InvItem i on i.id = l.item_id where (i.hasExpiry = 1 and l.expiryDate  is null) or (i.hasLot = 1 and coalesce(l.lotId,'') = '')


update  l set lotId = '20200919',expiryDate=case when i.hasExpiry = 1 then '20200919' else null end,productionDate=case when i.hasExpiry = 1 then '20200918' else null end
 from SalesInvoiceLine l left join InvItem i on i.id = l.item_id where (i.hasExpiry = 1 and l.expiryDate  is null) or (i.hasLot = 1 and coalesce(l.lotId,'') = '')
 
update  l set lotId = '20200919',expiryDate=case when i.hasExpiry = 1 then '20200919' else null end,productionDate=case when i.hasExpiry = 1 then '20200918' else null end
 from SalesReturnLine l left join InvItem i on i.id = l.item_id where (i.hasExpiry = 1 and l.expiryDate  is null) or (i.hasLot = 1 and coalesce(l.lotId,'') = '')
 
 update  l set lotId = '20200919',expiryDate=case when i.hasExpiry = 1 then '20200919' else null end,productionDate=case when i.hasExpiry = 1 then '20200918' else null end
 from EndStockTakingLine l left join InvItem i on i.id = l.item_id where (i.hasExpiry = 1 and l.expiryDate  is null) or (i.hasLot = 1 and coalesce(l.lotId,'') = '')
 

update  l set lotId = '',expiryDate=null,productionDate=null
 from StockIssueLine l left join InvItem i on i.id = l.item_id where i.hasLot = 0 and coalesce(l.lotId,'') <> ''

update  l set lotId = '',expiryDate=null,productionDate=null
 from StockReceiptLine l left join InvItem i on i.id = l.item_id where i.hasLot = 0 and coalesce(l.lotId,'') <> ''



update  l set lotId = '',expiryDate=null,productionDate=null
 from StockTransferLine l left join InvItem i on i.id = l.item_id where i.hasLot = 0 and coalesce(l.lotId,'') <> ''



update  l set lotId = '',expiryDate=null,productionDate=null
 from PurchaseInvoiceLine l left join InvItem i on i.id = l.item_id where i.hasLot = 0 and coalesce(l.lotId,'') <> ''

update  l set lotId = '',expiryDate=null,productionDate=null
 from PurchaseReturnLine l left join InvItem i on i.id = l.item_id where i.hasLot = 0 and coalesce(l.lotId,'') <> ''

update  l set lotId = '',expiryDate=null,productionDate=null
 from OpeningStockLine l left join InvItem i on i.id = l.item_id where i.hasLot = 0 and coalesce(l.lotId,'') <> ''


update  l set lotId = '',expiryDate=null,productionDate=null
 from SalesInvoiceLine l left join InvItem i on i.id = l.item_id where i.hasLot = 0 and coalesce(l.lotId,'') <> ''
 
update  l set lotId = '',expiryDate=null,productionDate=null
 from SalesReturnLine l left join InvItem i on i.id = l.item_id where i.hasLot = 0 and coalesce(l.lotId,'') <> ''

update  l set lotId = '',expiryDate=null,productionDate=null
 from AssemblyDocumentLine l left join InvItem i on i.id = l.item_id where i.hasLot = 0 and coalesce(l.lotId,'') <> ''

update  l set lotId = '20200919',expiryDate=case when i.hasExpiry = 1 then '20200919' else null end,productionDate=case when i.hasExpiry = 1 then '20200918' else null end
 from AssemblyDocumentLine l left join InvItem i on i.id = l.item_id where (i.hasExpiry = 1 and l.expiryDate  is null) or (i.hasLot = 1 and coalesce(l.lotId,'') <> '')

update  l set lotId = '',expiryDate=null,productionDate=null
 from AssemblyDocCoProdLine l left join InvItem i on i.id = l.item_id where i.hasLot = 0 and coalesce(l.lotId,'') <> ''

update  l set lotId = '20200919',expiryDate=case when i.hasExpiry = 1 then '20200919' else null end,productionDate=case when i.hasExpiry = 1 then '20200918' else null end
 from AssemblyDocCoProdLine l left join InvItem i on i.id = l.item_id where (i.hasExpiry = 1 and l.expiryDate  is null) or (i.hasLot = 1 and coalesce(l.lotId,'') = '')


update  l set itemlotId = '',expiryDate=null,productionDate=null
 from AssemblyDocument l left join InvItem i on i.id = l.assemblyItem_id where i.hasLot = 0 and coalesce(l.itemlotId,'') <> ''

update  l set itemlotId = '20200919',expiryDate=case when i.hasExpiry = 1 then '20200919' else null end,productionDate=case when i.hasExpiry = 1 then '20200918' else null end
 from AssemblyDocument l left join InvItem i on i.id = l.assemblyItem_id where (i.hasExpiry = 1 and l.expiryDate  is null) or (i.hasLot = 1 and coalesce(l.itemlotId,'') = '')


update  l set lotId = '',expiryDate=null,productionDate=null
 from MultiAssemblyLine l left join InvItem i on i.id = l.assemblyItem_id where i.hasLot = 0 and coalesce(l.lotId,'') <> ''

update  l set lotId = '20200919',expiryDate=case when i.hasExpiry = 1 then '20200919' else null end,productionDate=case when i.hasExpiry = 1 then '20200918' else null end
 from MultiAssemblyLine l left join InvItem i on i.id = l.assemblyItem_id where (i.hasExpiry = 1 and l.expiryDate  is null) or (i.hasLot = 1 and coalesce(l.lotId,'') = '')


IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES
           WHERE TABLE_NAME = N'NamaPOSSalesInvoiceLine')
BEGIN

update  l set lotId = '',expiryDate=null,productionDate=null
 from NamaPOSSalesInvoiceLine l left join InvItem i on i.id = l.item_id where i.hasLot = 0 and coalesce(l.lotId,'') <> '';

update  l set lotId = '',expiryDate=null,productionDate=null
 from NamaPOSSalesReturnLine l left join InvItem i on i.id = l.item_id where i.hasLot = 0 and coalesce(l.lotId,'') <> '';

 update  l set lotId = '',expiryDate=null,productionDate=null
 from NamaPOSReservationLine l left join InvItem i on i.id = l.item_id where i.hasLot = 0 and coalesce(l.lotId,'') <> '';

update  l set lotId = '20200919',expiryDate=case when i.hasExpiry = 1 then '20200919' else null end,productionDate=case when i.hasExpiry = 1 then '20200918' else null end
 from NamaPOSSalesInvoiceLine l left join InvItem i on i.id = l.item_id where (i.hasExpiry = 1 and l.expiryDate  is null) or (i.hasLot = 1 and coalesce(l.lotId,'') = '');

update  l set lotId = '20200919',expiryDate=case when i.hasExpiry = 1 then '20200919' else null end,productionDate=case when i.hasExpiry = 1 then '20200918' else null end
 from NamaPOSSalesReturnLine  l left join InvItem i on i.id = l.item_id where (i.hasExpiry = 1 and l.expiryDate  is null) or (i.hasLot = 1 and coalesce(l.lotId,'') = '');

update  l set lotId = '20200919',expiryDate=case when i.hasExpiry = 1 then '20200919' else null end,productionDate=case when i.hasExpiry = 1 then '20200918' else null end
 from NamaPOSReservationLine l left join InvItem i on i.id = l.item_id where (i.hasExpiry = 1 and l.expiryDate  is null) or (i.hasLot = 1 and coalesce(l.lotId,'') = '')
END


```
- Run the following query if you have manufacturing module
```sql
update  l set lotId = '20200919',expiryDate=case when i.hasExpiry = 1 then '20200919' else null end,productionDate=case when i.hasExpiry = 1 then '20200918' else null end
 from MaterialIssueLine l left join InvItem i on i.id = l.item_id where (i.hasExpiry = 1 and l.expiryDate  is null) or (i.hasLot = 1 and coalesce(l.lotId,'') = '')

update  l set lotId = '20200919',expiryDate=case when i.hasExpiry = 1 then '20200919' else null end,productionDate=case when i.hasExpiry = 1 then '20200918' else null end
 from MaterialReturnLine l left join InvItem i on i.id = l.item_id where (i.hasExpiry = 1 and l.expiryDate  is null) or (i.hasLot = 1 and coalesce(l.lotId,'') = '')

```

- AFTER running the UPDATE query, run the select query:
```sql
select originType,originId,originCode from InvTransReq where requestType <> 'Delete'
```
- Save the result in e:\rc\regen-inv-trans.txt (you can change the path , but make sure to change it in the utility link below also)
  <UtilityLinkBuilder
  className="com.namasoft.modules.supplychain.domain.utils.plugnplay.RegenInvTransReqFromFile"
  :params="[
  { title: 'Main File', default: 'e:/rc/regen-inv-trans.txt' },
  { title: 'Done File', default: 'e:/rc/regen-inv-done.txt' },
  { title: 'Errors File', default: 'e:/rc/regen-inv-errors.txt' }
  ]"
  />
- After the utility finishes, reprocess all quantity transactions (tomcat must be down)
## Fix null expiry dates from item lot table in sales, and purchases
```sql
update l set expiryDate = lo.expiryDate from PurchaseInvoiceLine l inner join ItemLot lo on lo.lotId = l.lotId and lo.invItem_id = l.item_id
where l.expiryDate is null and lo.expiryDate is not null
go
update l set expiryDate = lo.expiryDate from PurchaseReturnLine l inner join ItemLot lo on lo.lotId = l.lotId and lo.invItem_id = l.item_id
where l.expiryDate is null and lo.expiryDate is not null
go
update l set expiryDate = lo.expiryDate from SalesInvoiceLine l inner join ItemLot lo on lo.lotId = l.lotId and lo.invItem_id = l.item_id
where l.expiryDate is null and lo.expiryDate is not null
go
update l set expiryDate = lo.expiryDate from SalesReturnLine l inner join ItemLot lo on lo.lotId = l.lotId and lo.invItem_id = l.item_id
where l.expiryDate is null and lo.expiryDate is not null
go
update l set expiryDate = lo.expiryDate from StockTransferLine l inner join ItemLot lo on lo.lotId = l.lotId and lo.invItem_id = l.item_id
where l.expiryDate is null and lo.expiryDate is not null
go
update l set expiryDate = lo.expiryDate from StockIssueLine l inner join ItemLot lo on lo.lotId = l.lotId and lo.invItem_id = l.item_id
where l.expiryDate is null and lo.expiryDate is not null
go
update l set expiryDate = lo.expiryDate from StockReceiptLine l inner join ItemLot lo on lo.lotId = l.lotId and lo.invItem_id = l.item_id
where l.expiryDate is null and lo.expiryDate is not null
go
update l set expiryDate = lo.expiryDate from QtyTransLine l inner join ItemLot lo on lo.lotId = l.lotId and lo.invItem_id = l.item_id
where l.expiryDate is null and lo.expiryDate is not null
go

```
## Copy Expiry Date From QtyTransLine to ItemLot and ItemDimensionsQty
```sql
update q set expiryDate = lo.expiryDate from ItemDimensionsQty q inner join ItemLot lo on lo.invItem_id = q.item_id and lo.lotId = q.lotId
where q.expiryDate is null and lo.expiryDate is not null

with expiry as (
select distinct item_id,lotId,expiryDate,productionDate from QtyTransLine q 
)
update q set expiryDate = coalesce(expiry.expiryDate,q.expiryDate),productionDate = coalesce(expiry.productionDate,q.expiryDate)
 from ItemDimensionsQty q inner join expiry on expiry.item_id = q.item_id and expiry.lotId = q.lotId
where q.expiryDate <> expiry.expiryDate and q.expiryDate is not null

go

with expiry as (
select distinct item_id,lotId,expiryDate,productionDate from QtyTransLine q 
)
update q set expiryDate = coalesce(expiry.expiryDate,q.expiryDate),productionDate = coalesce(expiry.productionDate,q.expiryDate)
 from ItemLot q inner join expiry on expiry.item_id = q.invItem_id and expiry.lotId = q.lotId
where q.expiryDate <> expiry.expiryDate and q.expiryDate is not null

go


```
## Fix Production date less than expiry date
```sql
update l set productionDate = dateadd(YEAR,-1,expiryDate) from ItemLot l where productionDate >=expiryDate and expiryDate > '20000101'
update l set productionDate = dateadd(YEAR,-1,expiryDate) from ItemDimensionsQty l where productionDate >=expiryDate and expiryDate > '20000101'
update l set productionDate = dateadd(YEAR,-1,expiryDate) from QtyTransLine l where productionDate >=expiryDate and expiryDate > '20000101'
update l set productionDate = dateadd(YEAR,-1,expiryDate) from SalesInvoiceLine l where productionDate >=expiryDate and expiryDate > '20000101'
update l set productionDate = dateadd(YEAR,-1,expiryDate) from SalesReturnLine l where productionDate >=expiryDate and expiryDate > '20000101'
update l set productionDate = dateadd(YEAR,-1,expiryDate) from SalesQuotaionLine l where productionDate >=expiryDate and expiryDate > '20000101'
update l set productionDate = dateadd(YEAR,-1,expiryDate) from SalesQuotaionReqLine l where productionDate >=expiryDate and expiryDate > '20000101'
update l set productionDate = dateadd(YEAR,-1,expiryDate) from PurchaseInvoiceLine l where productionDate >=expiryDate and expiryDate > '20000101'
update l set productionDate = dateadd(YEAR,-1,expiryDate) from PurchaseReturnLine l where productionDate >=expiryDate and expiryDate > '20000101'
update l set productionDate = dateadd(YEAR,-1,expiryDate) from PurchaseOrderLine l where productionDate >=expiryDate and expiryDate > '20000101'
update l set productionDate = dateadd(YEAR,-1,expiryDate) from StockIssueLine l where productionDate >=expiryDate and expiryDate > '20000101'
update l set productionDate = dateadd(YEAR,-1,expiryDate) from StockReceiptLine l where productionDate >=expiryDate and expiryDate > '20000101'
update l set productionDate = dateadd(YEAR,-1,expiryDate) from StockTransferLine l where productionDate >=expiryDate and expiryDate > '20000101'


```
## Update Item Codes from InvItem
```sql
update  l set itemcode = i.code , itemName1 = i.name1,itemName2 = i.name2
 from StockIssueLine l left join InvItem i on i.id = l.item_id 

update  l set itemcode = i.code , itemName1 = i.name1,itemName2 = i.name2
 from StockReceiptLine l left join InvItem i on i.id = l.item_id 



update  l set itemcode = i.code , itemName1 = i.name1,itemName2 = i.name2
 from StockTransferLine l left join InvItem i on i.id = l.item_id 



update  l set itemcode = i.code , itemName1 = i.name1,itemName2 = i.name2
 from PurchaseInvoiceLine l left join InvItem i on i.id = l.item_id 

update  l set itemcode = i.code , itemName1 = i.name1,itemName2 = i.name2
 from PurchaseReturnLine l left join InvItem i on i.id = l.item_id 

update  l set itemcode = i.code , itemName1 = i.name1,itemName2 = i.name2
 from OpeningStockLine l left join InvItem i on i.id = l.item_id 


update  l set itemcode = i.code , itemName1 = i.name1,itemName2 = i.name2
 from SalesInvoiceLine l left join InvItem i on i.id = l.item_id 
 
update  l set itemcode = i.code , itemName1 = i.name1,itemName2 = i.name2
 from SalesReturnLine l left join InvItem i on i.id = l.item_id 
 
update  l set itemcode = i.code , itemName1 = i.name1,itemName2 = i.name2
 from QtyTransLine l left join InvItem i on i.id = l.item_id 
 
update  l set itemcode = i.code , itemName1 = i.name1,itemName2 = i.name2
 from CostInTransLine l left join InvItem i on i.id = l.item_id 
 
update  l set itemcode = i.code , itemName1 = i.name1,itemName2 = i.name2
 from CostOutTransLine l left join InvItem i on i.id = l.item_id 
```

## Delete Unnecessary Requests (LedgerTransReq and InvTransReq)
```sql
WHILE exists (select top 1 id from InvTransReq where requestType = 'Delete' and transStatus ='Processed')
BEGIN
BEGIN TRANSACTION x;
delete top (10000) from InvTransReq where requestType = 'Delete' and transStatus ='Processed';
Commit transaction x;
END;

go

WHILE exists (select top 1 id from LedgerTransReq where requestType = 'Delete' and transStatus ='Processed')
BEGIN
BEGIN TRANSACTION x;
delete top (10000) from LedgerTransReq where requestType = 'Delete' and transStatus ='Processed';
Commit transaction x;
END;


```

## Query that list transaction without a locator on a warehouse with locators:
```sql
with x as (
select distinct h.entityType,h.id,h.code,wl.warehouse_id from StockTransfer h
 left join StockTransferLine l on h.id = l.stockTransfer_id
 left join WareLocator wl on wl.warehouse_id = l.warehouse_id
where wl.id is not null and l.locator_id is null
union all
select distinct h.entityType,h.id,h.code,wl.warehouse_id from StockTransfer h
 left join StockTransferLine l on h.id = l.stockTransfer_id
 left join WareLocator wl on wl.warehouse_id = l.toWarehouse_id
where wl.id is not null and l.toLocator_id is null
union all
select distinct h.entityType,h.id,h.code,wl.warehouse_id from StockIssue h
 left join StockIssueLine l on h.id = l.stockIssue_id
 left join WareLocator wl on wl.warehouse_id = l.warehouse_id
where wl.id is not null and l.locator_id is null
union all
select distinct h.entityType,h.id,h.code,wl.warehouse_id from StockReceipt h
 left join StockReceiptLine l on h.id = l.stockReceipt_id
 left join WareLocator wl on wl.warehouse_id = l.warehouse_id
where wl.id is not null and l.locator_id is null
union all
select distinct l.originType,l.originId,l.originCode,wl.warehouse_id from ReservationTransLine l 
 left join WareLocator wl on wl.warehouse_id = l.warehouse_id
where wl.id is not null and l.locator_id is null)
select distinct h.entityType,h.id,h.code from x as h


```