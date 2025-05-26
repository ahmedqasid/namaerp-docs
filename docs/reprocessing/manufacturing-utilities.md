# Manufacturing Utilities
## Production Delivery Cost Problem (Cost Callback)
::: details
```sql
with delivery as (
select sum(cin.netCost) receiptCost,po.id from ProductionOrder po inner join ProductDelivery pod on pod.productionOrder_id = po.id inner join StockReceipt sr on sr.fromDoc_id = pod.id
inner join CostInTransLine cin on cin.originId = sr.id 
group by po.id
),
issue as (
select sum(cout.netCost) materialCost,po.id from ProductionOrder po inner join RawMaterialIssue pod on pod.productionOrder_id = po.id inner join StockIssue sr on sr.fromDoc_id = pod.id
inner join CostOutTransLine cout on cout.originId = sr.id
group by po.id
),
ret as (
select sum(cin.netCost) retCost,po.id from ProductionOrder po inner join RawMaterialReturn pod on pod.productionOrder_id = po.id inner join StockReceipt sr on sr.fromDoc_id = pod.id
inner join CostInTransLine cin on cin.originId = sr.id 
group by po.id
),
resources as(
select sum(l.total) resourceCost,po.id from ProductionOrder po inner join ResourceVoucher v on v.productionOrder_id = po.id left join ResourceVoucherLine l on l.resourceVoucher_id = v.id
group by po.id
)
select cv.entityType, cv.id,po.valueDate, receiptCost,materialCost+resourceCost-coalesce(retCost,0),receiptCost-(materialCost+resourceCost-coalesce(retCost,0)),issue.materialCost,ret.retCost,resources.resourceCost from ProductionOrder po left join
delivery on delivery.id = po.id left join issue on issue.id = po.id left join ret on ret.id = po.id 
left join resources on resources.id = po.id
left join OrderCloseVoucher cv on cv.productionOrder_id = po.id
where abs(receiptCost-(materialCost+resourceCost-coalesce(retCost,0)))>1.5 and cv.id is not null

```
:::
## Zombie ProductionMovementSysEntry 
::: details
```sql
delete e from ProductionMovementSysEntry e left join EntitySystemEntry ese on ese.targetId = e.ownerid
where ese.id is null

```
:::