# Reprocessing Quantity, Cost, and Stock Ages

<ServerBaseURL/>

## Reprocess All Quantity Transactions (Tomcat must be shutdown)
::: details
```sql
update FiscalYear set allowCostProcessingWithClosingEntry = 1 where commitedBefore = 1
go
delete from PartitionedCostReqInfo
go
drop table AccountBalance
go
drop table DimensionsBalance
go
drop table LedgerTransLine
go
delete from LedgerTrans
go
delete from BusinessRequestStatus where requestType = 'Delete'
go
delete from LedgerTransReq where requestType = 'Delete'
go
truncate table DebtLineMatcher
go
delete from DebtLine
go
update LedgerTransReq set transStatus ='Initial',requestType='Create',errorDescription='',errorMessage='',debtAgesProcessed=0,reqProcessed=0,hasDebtAges=0
go

IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_t77042ol5jui5eda8vte88lei]') AND parent_object_id = OBJECT_ID(N'[dbo].[ItemSerialTrans]'))
ALTER TABLE [dbo].[ItemSerialTrans] DROP CONSTRAINT [FK_t77042ol5jui5eda8vte88lei]
GO

drop table ItemSerial
go
drop table ItemSerialTrans
go
drop table ReservationTransLine
go
delete from ReservationTrans
go
drop table QtyTransLine
go
delete from QtyTrans
go
drop table ItemDimensionCost
go
drop table ItemDimensionsQty
go
drop table CostOutTransLine
go
delete from CostOutTrans
go
drop table CostInTransLine
go
delete from CostInTrans
go
delete from CostOverdraftLine
go

delete from LedgerTransReq where  originTransId <> 0xd41d8cd98f003204a9800998ecf8427e
go
delete from BusinessRequestStatus where originTransId <> 0xd41d8cd98f003204a9800998ecf8427e
go

delete from InvTransReq where requestType = 'Delete'
go

update InvTransReq set costTransStatus = 'Initial',requestType='Create', qtyTransStatus = 'Initial', transStatus = 'Initial',regenerateLedgerReq=0,priority=0,errorDescription='',errorMessage=''
go

update BusinessRequestStatus set transStatus = 'Initial',errorDescription='',errorMessage='' where simpleName in ('InvTransReq','LedgerTransReq')
go
drop table LedgerTransSerial
go
truncate table FifoCostMatcher
go
delete from FifoCostTransLine
go
truncate table UnmatchedManualDebtLine
Go
truncate table StockAgesMatcher
go
truncate table StockAgesTask
go
truncate table StockAgesTaskUpdater
go
truncate table StockAgesTransLine
go
delete from StockAgesTrans

```
:::
### Partial Reprocess of Average Cost (Fast)
<UtilityLinkBuilder
className="com.namasoft.modules.supplychain.domain.utils.FastReprocessCostFromDate"
:params="[
{ title: 'Start Date (yyyyMMdd)', default: 'yyyyMMdd' }
]"
/>

## Reprocess Stock Ages
### Method 1:
- Use Fast Reprocess Util
  <UtilityLinkBuilder
  className="com.namasoft.modules.supplychain.domain.utils.plugnplay.StockAgesFastReprocess"
  :params="[
  { title: 'Processed Ages File Path', default: 'E:/rc/stock-ages-done.txt' }
  ]"
  />
::: warning
  - Make sure to clear the stock-ages-done file before running the utility, The system will ignore all requests mentioned in the file
  - Make sure that you are on a release after April 21st
  - There are no currentNetCost errors displayed in the system

:::
### Method 2:
- Use Following Query (Slower than method 1)
::: details
```sql
truncate table StockAgesMatcher
go
truncate table StockAgesTask
go
truncate table StockAgesTaskUpdater
go
truncate table StockAgesTransLine
go
delete from StockAgesTrans
go
update r set transStatus = 'Retry',reprocessStockAges = 1 , priority = 500
from InvTransReq r inner join QtyTransLine l on l.requestId = r.id
inner join InvItem i on i.id = l.item_id
where i.stockAgesPolicy = 'Yes' and r.transStatus  ='Processed'
```
:::
### Method 3:
Use Process Of Certain Dimensions Util

<UtilityLinkBuilder
className="com.namasoft.modules.supplychain.domain.utils.plugnplay.StockAgesProcessDimensions"
:params="[
{ title: 'CSV List Of StockAgesIdx IDs You Need', default: '0xFFFFFF44444,0xFFFF55566' }
]"
/>