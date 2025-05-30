# Fixed Assets Module Utilities

## Fix Last Depreciation date of fixed assets whose depreciation was deleted
::: details
```sql
update f set lastdepreciationdate = null from FixedAsset f left join FADepreciationLine l on l.fixedAsset_id = f.id
where l.id is null
update FixedAsset set lastdepreciationdate = (select MAX(FADepreciation.valueDate) from FADepreciationLine left join FADepreciation on FADepreciation.id = FADepreciationLine.fADepreciation_id
 where FADepreciation.commitedBefore = 1 and FADepreciationLine.fixedAsset_id = FixedAsset.id) 
update fa set lastDepreciationDate = dateadd(DAY,-1,od.valueDate) from FAOpeningDocument od left join FAOpeningDocLine ol on ol.FAOpeningDocument_id = od.id 
left join FixedAsset fa on fa.id= ol.fixedAsset_id
where od.commitedBefore = 1 and fa.lastDepreciationDate is null

```
:::

## Fix FAAdditionDeduction problem - entries always have zero addition/deduction
::: details
```sql
update d set moneyLocalAmount = moneyRate*moneyValueAmount, addedOrDeductedValue = moneyRate*moneyValueAmount from FAAdditionDeduction d
update p set addition = d.moneyValueAmount from FAAdditionDeduction d inner join FAPropertiesEntry p  on d.propertiesEntry_id = p.id where d.addition = 1
update p set deduction = d.moneyValueAmount from FAAdditionDeduction d inner join FAPropertiesEntry p  on d.propertiesEntry_id = p.id where d.addition = 0

```
:::
