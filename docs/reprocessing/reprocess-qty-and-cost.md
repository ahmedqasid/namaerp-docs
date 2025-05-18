# Reprocess All Quantity Transactions (Tomcat must be shutdown)

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