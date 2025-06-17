<rtl>

# Database Related Errors FAQ

## عند فتح سند مصاريف اعتماد أصل تظهر رسالة خطأ "لم يمكن تنفيذ العملية"
وظهر معي لوج هذا جزء منه
```log
Could not extract column [19] from JDBC ResultSet [The conversion from nvarchar to NCLOB is unsupported.]
```
--------
لحل المشكلة قم بتنفيذ الاستعلام التالي:
::: details SQL Query to convert remarks to NCLOB (NVARCHAR(MAX)) instead of NVARCHAR(255)
```sql
ALTER TABLE FACustodyScheduledPayLine ALTER COLUMN remarks NVARCHAR(MAX);
ALTER TABLE FAPurchaseScheduledPayLine ALTER COLUMN remarks NVARCHAR(MAX);
ALTER TABLE FAPurchaseOrderScheduledPayLine ALTER COLUMN remarks NVARCHAR(MAX);
ALTER TABLE FAPurchaseOfferScheduledPay ALTER COLUMN remarks NVARCHAR(MAX);
ALTER TABLE FAInitialReceiptScheduledPayLine ALTER COLUMN remarks NVARCHAR(MAX);
ALTER TABLE FAOpeningDocumentScheduleLine ALTER COLUMN remarks NVARCHAR(MAX);
ALTER TABLE FAInitialReceiptLine ALTER COLUMN remarks NVARCHAR(MAX);
ALTER TABLE FAPurchaseOfferLine ALTER COLUMN remarks NVARCHAR(MAX);
ALTER TABLE FAPurchaseOrderLine ALTER COLUMN remarks NVARCHAR(MAX);
ALTER TABLE FAPurchOrderReqLine ALTER COLUMN remarks NVARCHAR(MAX);
ALTER TABLE FALcExpenseLine ALTER COLUMN remarks NVARCHAR(MAX);
ALTER TABLE FALCScheduledPayLine ALTER COLUMN remarks NVARCHAR(MAX);
ALTER TABLE FAReceiptDocLine ALTER COLUMN remarks NVARCHAR(MAX);
ALTER TABLE FAScheduleTemplateLine ALTER COLUMN remarks NVARCHAR(MAX);
ALTER TABLE FATakingActualLine ALTER COLUMN remarks NVARCHAR(MAX);

ALTER TABLE CustodyCustodianLine ALTER COLUMN remark NVARCHAR(MAX);
ALTER TABLE FACustodyDeliveryLine ALTER COLUMN remark NVARCHAR(MAX);
ALTER TABLE FACustodyDeliveryEmpLine ALTER COLUMN remark NVARCHAR(MAX);
ALTER TABLE FACustodyTransferFromLine ALTER COLUMN remark NVARCHAR(MAX);
ALTER TABLE FACustodyTransferToLine ALTER COLUMN remark NVARCHAR(MAX);
ALTER TABLE FACustodianLine ALTER COLUMN remark NVARCHAR(MAX);
```
:::

</rtl>