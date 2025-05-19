# Real Estate Utilities

## Fix System Paid, Collect Requested and Collected by Financial Papers in Contracts
- First run the following statement and then put the output in recommit file:
 ```sql
select distinct paymentDocEntityType,paymentDocId from InstallmentPaymentEntry where refid is null

```
- Now Delete all bad entries:
```sql
delete  from InstallmentPaymentEntry where refid is null

```
- Run The following Query
```sql
with paidValues as (
select sum(case when effectType = 'SystemPaid' then e.paidValue else 0 end) SystemPaid
,sum(case when effectType = 'CollectedByFP' then e.paidValue else 0 end) CollectedByFP
,sum(case when effectType = 'RequestedCollect' then e.paidValue else 0 end) RequestedCollect
,e.installmentCode,e.installmentDocId from InstallmentPaymentEntry e
group by e.installmentCode,e.installmentDocId
)
update l set systemPaidValue = coalesce(pv.SystemPaid,0),requestedCollectValue = coalesce(pv.RequestedCollect,0),collectedByFPValue=coalesce(pv.CollectedByFP,0)
,remainingValue = l.netValue -l.systemPaidValue,remainingCollectVal = l.netValue-l.requestedCollectValue,remainingFPVal = l.netValue - l.collectedByFPValue
from RESalesLine l left join paidValues pv on pv.installmentCode = l.installmentCode and pv.installmentDocId = l.rESalesDoc_id

--------------------------------------------------------------------
go

with paidValues as (
select sum(case when effectType = 'SystemPaid' then e.paidValue else 0 end) SystemPaid
,sum(case when effectType = 'CollectedByFP' then e.paidValue else 0 end) CollectedByFP
,sum(case when effectType = 'RequestedCollect' then e.paidValue else 0 end) RequestedCollect
,e.installmentCode,e.installmentDocId from InstallmentPaymentEntry e
group by e.installmentCode,e.installmentDocId
)
update l set systemPaidValue = coalesce(pv.SystemPaid,0),requestedCollectValue = coalesce(pv.RequestedCollect,0),collectedByFPValue=coalesce(pv.CollectedByFP,0) 
,remainingValue = l.netValue -l.systemPaidValue,remainingCollectVal = l.netValue-l.requestedCollectValue,remainingFPVal = l.netValue - l.collectedByFPValue
from REOpeningSalesLines l left join paidValues pv on pv.installmentCode = l.installmentCode and pv.installmentDocId = l.rEOpeningSales_id
	
go
--------------------------------------------------------------------


with paidValues as (
select sum(case when effectType = 'SystemPaid' then e.paidValue else 0 end) SystemPaid
,sum(case when effectType = 'CollectedByFP' then e.paidValue else 0 end) CollectedByFP
,sum(case when effectType = 'RequestedCollect' then e.paidValue else 0 end) RequestedCollect
,e.installmentCode,e.installmentDocId from InstallmentPaymentEntry e
group by e.installmentCode,e.installmentDocId
)
update l set systemPaidValue = coalesce(pv.SystemPaid,0),requestedCollectValue = coalesce(pv.RequestedCollect,0),collectedByFPValue=coalesce(pv.CollectedByFP,0) 
,remainingValue = l.netValue -l.systemPaidValue,remainingCollectVal = l.netValue-l.requestedCollectValue,remainingFPVal = l.netValue - l.collectedByFPValue
from RERentInstalmentLine l left join paidValues pv on pv.installmentCode = l.installmentCode and pv.installmentDocId = l.rERentContract_id
go
--------------------------------------------------------------------

with paidValues as (
select sum(case when effectType = 'SystemPaid' then e.paidValue else 0 end) SystemPaid
,sum(case when effectType = 'CollectedByFP' then e.paidValue else 0 end) CollectedByFP
,sum(case when effectType = 'RequestedCollect' then e.paidValue else 0 end) RequestedCollect
,e.installmentCode,e.installmentDocId from InstallmentPaymentEntry e
group by e.installmentCode,e.installmentDocId
)
update l set systemPaidValue = coalesce(pv.SystemPaid,0),requestedCollectValue = coalesce(pv.RequestedCollect,0),collectedByFPValue=coalesce(pv.CollectedByFP,0) 
,remainingValue = l.netValue -l.systemPaidValue,remainingCollectVal = l.netValue-l.requestedCollectValue,remainingFPVal = l.netValue - l.collectedByFPValue
from REOpeningRentContractLine l left join paidValues pv on pv.installmentCode = l.installmentCode and pv.installmentDocId = l.rEOpeningRentContract_id
--------------------------------------------------------------------
go
--------------------------------------------------------------------

with paidValues as (
select sum(case when effectType = 'SystemPaid' then e.paidValue else 0 end) SystemPaid
,sum(case when effectType = 'CollectedByFP' then e.paidValue else 0 end) CollectedByFP
,sum(case when effectType = 'RequestedCollect' then e.paidValue else 0 end) RequestedCollect
,e.installmentCode,e.installmentDocId from InstallmentPaymentEntry e
group by e.installmentCode,e.installmentDocId
)
update l set systemPaid = coalesce(pv.SystemPaid,0),
remaining = l.paymentValue - l.systemPaid, paid = case when l.remaining <=0 then 1 else 0 end
from SalesInvScheduledPayLine l left join paidValues pv on pv.installmentCode = l.installmentCode and pv.installmentDocId = l.salesInvoice_id

--------------------------------------------------------------------
go
```
- Now recommit the files
