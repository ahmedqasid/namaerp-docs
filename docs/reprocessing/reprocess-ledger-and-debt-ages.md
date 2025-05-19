# Accounting Utilities - Ledger and Debt Ages Reprocessing
## Reprocess All Ledger Transactions

```sql
truncate table AccountBalance
go
truncate table DimensionsBalance
go
truncate table LedgerTransLine

go
delete from LedgerTrans
go
delete from BusinessRequestStatus where requestType = 'Delete' and simpleName ='LedgerTransReq'
go
delete from LedgerTransReq where requestType = 'Delete'
go
truncate table LedgerTransSerial
go
update LedgerTransReq set transStatus ='Retry',debtAgesProcessed=0,reqProcessed=0,hasDebtAges=0
go
truncate table DebtLineMatcher
go
delete from DebtLine
go
```

## Reprocess Unmatched Debt Ages Only
```sql
with debtAgeReqs as  (
select distinct lr.id,lr.originCode from  LedgerTransReq lr 
inner join UnmatchedManualDebtLine udl on udl.originId = lr.originId or udl.invoiceId = lr.originId
where requestType <> 'Delete' and transStatus = 'Processed'
)
update lr set transStatus = 'Retry',hasDebtAges=1,debtAgesProcessed=0,reqProcessed=1 from
LedgerTransReq lr inner join debtAgeReqs dar on dar.id = lr.id
```

## Reprocess Debt Ages

```sql
truncate table DebtLineMatcher
go
truncate table AllManualDebtLines
go
delete from DebtLine
go
truncate table UnmatchedManualDebtLine
go
with debtAgeReqs as  (
select distinct lr.id from  LedgerTransReq lr inner join LedgerTrans lt on lt.requestId = lr.id inner join LedgerTransLine ltr on ltr.ledgerTrans_id = lt.id left join Account acc on acc.id = ltr.account_id
where requestType <> 'Delete'  and acc.trackDebtAges = 1 and transStatus = 'Processed'
)
update lr set transStatus = 'Retry',hasDebtAges=1,debtAgesProcessed=0,priority = 500  from
LedgerTransReq lr inner join debtAgeReqs dar on dar.id = lr.id
```

## Delete Zombie AllManualDebtLines
```sql
delete l from AllManualDebtLines l left join EntitySystemEntry e on e.targetId = l.originId
where e.id is null

```

## Fix Contracting Reprocessing Failure
- Could not find class com.namasoft.modules.supplychain.domain.entities.ContractingMaterialIssue$ContractingMaterialIssueCostCallback
```sql
update InvTransReq set
 costCallbackClass = 'com.namasoft.modules.contracting.domain.entities.ContractingMaterialIssue$ContractingMaterialIssueCostCallback' 
where costCallbackClass = 'com.namasoft.modules.supplychain.domain.entities.ContractingMaterialIssue$ContractingMaterialIssueCostCallback'

```

## Allow Changing Currency of An Account After Deleting All its transactions
```sql
delete b from AccountBalance b left join Account acc on acc.id = b.account_id where b.creditAmount = 0 and b.debitAmount = 0 and b.localCreditAmount = 0 and b.localDebitAmount = 0
delete b from DimensionsBalance b left join Account acc on acc.id = b.account_id where b.creditAmount = 0 and b.debitAmount = 0 and b.localCreditAmount = 0 and b.localDebitAmount = 0
```
::: tip
You can use `Alt Ctrl X` shortcut, then open More Menu of Account Screen, and click on Change Balances Currency 
<rtl>تغيير عملة الأرصدة</rtl>
Then recommit all transactions of the account
:::

## Find and Remove zombie ledger transactions
- Find Zombie Transactions
```sql
select distinct r.originType,r.originId from LedgerTransReq r 
inner join LedgerTrans lr on lr.requestId = r.id
inner join LedgerTransLine l on l.ledgerTrans_id = lr.id
left join EntitySystemEntry e on e.targetId = r.originId
where (e.id is null or e.fileStatus = 'Cancelled' or r.requestType = 'Delete') 

```

- Remove Zombie Transactions
```sql
update r set requestType ='Delete',transStatus = 'Retry',reqProcessed=0,debtAgesProcessed=0 from LedgerTransReq r 
inner join LedgerTrans lr on lr.requestId = r.id
inner join LedgerTransLine l on l.ledgerTrans_id = lr.id
left join EntitySystemEntry e on e.targetId = r.originId
where (e.id is null or e.fileStatus = 'Cancelled' or r.requestType = 'Delete') 

```

## Find Unbalanced Transactions (Total Debit <> Total Credit>
```sql
select originType,originId,originCode,valueDate,SUM(creditLocalAmount) cr,SUM(debitLocalAmount) dr from LedgerTransLine group by originType,originId,originCode,valueDate
having ABS(SUM(creditLocalAmount)-SUM(debitLocalAmount))>0.0
order by valueDate

```

## Find Transactions for deleted subsidiaries

```sql
select l.originCode,l.originType,l.lineNumber+1,l.subsidiaryCode
from LedgerTransLine l left join EntitySystemEntry e on e.targetId = l.subsidiaryId where e.id is null and l.subsidiaryId

```

## Find LedgerTransLine Entries Without Matching DimensionsBalance Records
- Identify Orphaned LedgerTransLine Records (No Matching DimensionsBalance)

```sql
select originType,originId from LedgerTransLine d
left join DimensionsBalance b 
on d.account_id = b.account_id
and d.legalEntity_id = b.legalEntity_id
and d.sector_id = b.sector_id
and d.analysisSet_id = b.analysisSet_id
and d.branch_id = b.branch_id
and d.department_id = b.department_id
and coalesce(d.entityDimensionId,0x1) = coalesce(b.entityDimensionId, 0x1)
and coalesce(d.subsidiaryId,0x1) = coalesce(b.subsidiaryId, 0x1)
and d.fiscalPeriod_id = b.fiscalPeriod_id
where b.id is null


```

::: warning
You should recommit the result of the previous query
:::

- Find Mismatch in Ledger vs DimensionsBalance (By Period, Entity, Account)
```sql
with ledger as (
select sum(l.debitValueAmount) dr,sum(l.creditValueAmount) cr,sum(l.debitValueAmount)  - sum(l.creditValueAmount) dr_cr 
, fp.code fpCode, le.code leCode, fp.id fpId, le.id leId,acc.id accId, acc.code accCode
from LedgerTransLine l
left join Account acc on acc.id = l.account_id
left join FiscalPeriod fp on fp.id = l.fiscalPeriod_id
left join LegalEntity le on le.id = l.legalEntity_id
group by fp.code,le.code,fp.id,le.id,acc.id,acc.code
),
dimbal as (
select sum(l.debitAmount) dr,sum(l.creditAmount) cr,sum(l.debitAmount)  - sum(l.creditAmount) dr_cr 
, fp.code fpCode, le.code leCode, fp.id fpId, le.id leId,acc.id accId, acc.code accCode
from DimensionsBalance l
left join Account acc on acc.id = l.account_id
left join FiscalPeriod fp on fp.id = l.fiscalPeriod_id
left join LegalEntity le on le.id = l.legalEntity_id
group by fp.code,le.code,fp.id,le.id,acc.id,acc.code
)
select coalesce(dimbal.fpCode,ledger.fpCode) fpCode,coalesce(dimbal.leCode,ledger.leCode) leCode
, coalesce(dimbal.accCode,ledger.accCode) accCode, dimbal.dr_cr, ledger.dr_cr
 from dimbal 
full join ledger on ledger.fpId = dimbal.fpId 
	and ledger.accId = dimbal.accId
	and ledger.leId = dimbal.leId
where coalesce(dimbal.dr_cr,0) <> coalesce(ledger.dr_cr,0)
```

- Fix Incorrect Dimension Balances
::: danger
Please be careful before running the following query
:::
```sql
with dimbal as (
select
sum(l.debitValueAmount) debitAmount,sum(l.debitLocalAmount) localDebitAmount,sum(l.creditValueAmount) creditAmount,
sum(l.creditLocalAmount) localCreditAmount,
 l.account_id,coalesce(l.subsidiaryId,0x1) subsidiaryId,coalesce(l.subsidiaryEntityType,'') subsidiaryType,coalesce(l.entityDimensionId,0x1) entityDimensionId,coalesce(l.entityDimensionEntityType,'') entityDimensionType,
l.legalEntity_id,l.sector_id,l.branch_id,l.department_id,l.analysisSet_id,
l.fiscalPeriod_id 
from LedgerTransLine l
group by l.account_id,coalesce(l.subsidiaryId,0x1),coalesce(l.subsidiaryEntityType,''),coalesce(l.entityDimensionId,0x1),coalesce(l.entityDimensionEntityType,''),
l.legalEntity_id,l.sector_id,l.branch_id,l.department_id,l.analysisSet_id,
l.fiscalPeriod_id
)
update b set  b.debitAmount = coalesce(d.debitAmount,0),b.localDebitAmount = coalesce(d.localDebitAmount,0),b.creditAmount = coalesce(d.creditAmount,0),b.localCreditAmount = coalesce(d.localCreditAmount,0)
 from DimensionsBalance b 
left join dimbal d on d.account_id = b.account_id
and d.legalEntity_id = b.legalEntity_id
and d.sector_id = b.sector_id
and d.analysisSet_id = b.analysisSet_id
and d.branch_id = b.branch_id
and d.department_id = b.department_id
and d.entityDimensionId = coalesce(b.entityDimensionId, 0x1)
and d.entityDimensionType = coalesce(b.entityDimensionEntityType, '')
and d.subsidiaryId = coalesce(b.subsidiaryId, 0x1)
and d.subsidiaryType = coalesce(b.subsidiaryEntityType, '')
and d.fiscalPeriod_id = b.fiscalPeriod_id
where coalesce(d.debitAmount,0) <> b.debitAmount
or coalesce(d.creditAmount,0)  <> b.creditAmount
or coalesce(d.localDebitAmount,0) <> b.localDebitAmount
or coalesce(d.localCreditAmount,0) <> b.localCreditAmount 
```

## Financial Paper Utilities
### Fix Financial Paper Entries after delete:

```sql
update fp set lastStatusEntry_id = null from FinancialPaperStatusEntry e left join EntitySystemEntry est on est.targetId = e.originDocId left join FinancialPaper fp on fp.id = e.financialPaper_id
where est.id is null or est.fileStatus = 'Cancelled'
delete e  from FinancialPaperStatusEntry e left join EntitySystemEntry se on se.targetId = e.originDocId left join FinancialPaper p on p.id = e.financialPaper_id where se.id is null or se.fileStatus = 'Cancelled'


update fp set lastStatusEntry_id = fpe.id,status = fpe.toStatus from FinancialPaper fp 
left join FinancialPaperStatusEntry fpe on fpe.financialPaper_id = fp.id and fpe.id =
(select top 1 id from FinancialPaperStatusEntry le where le.financialPaper_id = fp.id order by valueDate desc,creationDate desc)
where fp.lastStatusEntry_id is null and fpe.id is not null


```

### Fix Cancel of Financial Papers
```sql
update l set cancelValue = fp.valueAmount from FinancialPaperCancelLine l left join FinancialPaper fp on fp.id = l.paper_id where l.cancelValue is null
```

### Fix Financial Paper Bad Last Status Entry:
```sql
select code,fp.creationDate from FinancialPaper fp left join FinancialPaperStatusEntry e on e.id = fp.lastStatusEntry_id
where e.toStatus <> fp.status

update FinancialPaper set lastStatusEntry_id = (select top 1 id from FinancialPaperStatusEntry e where e.financialPaper_id = 0xFFFF00015134C8B294000000FF5C9560 order by valueDate desc,creationDate desc) where id = 0xFFFF00015134C8B294000000FF5C9560

```

### Fix FAAdditionDeduction problem - entries always have zero addition/deduction
```sql
update d set moneyLocalAmount = moneyRate*moneyValueAmount, addedOrDeductedValue = moneyRate*moneyValueAmount from FAAdditionDeduction d
update p set addition = d.moneyValueAmount from FAAdditionDeduction d inner join FAPropertiesEntry p  on d.propertiesEntry_id = p.id where d.addition = 1
update p set deduction = d.moneyValueAmount from FAAdditionDeduction d inner join FAPropertiesEntry p  on d.propertiesEntry_id = p.id where d.addition = 0

```

### Allow Deleting Zombie Journal Entries After Deleting Closing Entry
```sql
update je set fromDoc_id = null,fromDoc_type = null,fromDoc_code = null,fromDoc_actualCode = null from JournalEntry je left join ClosingEntry ce on ce.id = je.fromDoc_id
where je.fromDoc_type = 'ClosingEntry' and ce.id is null

```