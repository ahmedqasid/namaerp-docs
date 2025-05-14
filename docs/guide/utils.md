# Utility Links

## Recommit From File: (For admin)

[http://localhost:8080/erp/test?util=com.namasoft.erp.gui.server.RecommitFromFile-e:/rc/recommit.txt,e:/rc/done.txt,e:/rc/errors.txt&gui=true](http://localhost:8080/erp/test?util=com.namasoft.erp.gui.server.RecommitFromFile-e:/rc/recommit.txt,e:/rc/done.txt,e:/rc/errors.txt&gui=true)

## ReApply Sales Contracts System Entries:
[http://localhost:8080/erp/test?util=com.namasoft.modules.realstate.domain.utils.RESysEntryMigratorUtility](http://localhost:8080/erp/test?util=com.namasoft.modules.realstate.domain.utils.RESysEntryMigratorUtility)

## ReApply Rent Contracts System Entries:
[http://localhost:8080/erp/test?util=com.namasoft.modules.realstate.domain.utils.UpdateREReservationEntryUtil](http://localhost:8080/erp/test?util=com.namasoft.modules.realstate.domain.utils.UpdateREReservationEntryUtil)

## Re-Replicate From File: (For admin)
[http://localhost:8080/erp/test?util=com.namasoft.erp.gui.server.ReplicateFromFile-c:/rc/recommit.txt,c:/rc/done.txt,c:/rc/error.txt&gui=true](http://localhost:8080/erp/test?util=com.namasoft.erp.gui.server.ReplicateFromFile-c:/rc/recommit.txt,c:/rc/done.txt,c:/rc/error.txt&gui=true)

## Delete From File:
[http://localhost:8080/erp/test?util=com.namasoft.erp.gui.server.DeleteFromFile-e:/rc/delete.txt,e:/rc/donedelete.txt,e:/rc/deleteerrors.txt&gui=true](http://localhost:8080/erp/test?util=com.namasoft.erp.gui.server.DeleteFromFile-e:/rc/delete.txt,e:/rc/donedelete.txt,e:/rc/deleteerrors.txt&gui=true)

## Regen Ledger from file - Accounting Effects:
[http://localhost:8080/erp/test?util=com.namasoft.erp.gui.server.RegenAccFromFile-e:/rc/regenledger.txt,e:/rc/regenledgerdone.txt,e:/rc/regenledgererrors.txt&gui=true ](http://localhost:8080/erp/test?util=com.namasoft.erp.gui.server.RegenAccFromFile-e:/rc/regenledger.txt,e:/rc/regenledgerdone.txt,e:/rc/regenledgererrors.txt&gui=true)

## Export To Another Server From File:
[http://localhost:8080/erp/test?util=com.namasoft.erp.gui.server.ExportToServerFromFileByWS-e:/rc/export.txt,e:/rc/doneexport.txt,e:/rc/errorsexport.txt,http://localhost:7070/&gui=true](http://localhost:8080/erp/test?util=com.namasoft.erp.gui.server.ExportToServerFromFileByWS-e:/rc/export.txt,e:/rc/doneexport.txt,e:/rc/errorsexport.txt,http://localhost:7070/&gui=true)

## Export To Another Server from File Using Excel Sheets:
[http://localhost:8080/erp/test?util=com.namasoft.erp.gui.server.ExportToServerFromFileByExcel-e:/rc/export.txt,e:/rc/doneexport.txt,e:/rc/errorsexport.txt,http://localhost:7070&gui=true](http://localhost:8080/erp/test?util=com.namasoft.erp.gui.server.ExportToServerFromFileByExcel-e:/rc/export.txt,e:/rc/doneexport.txt,e:/rc/errorsexport.txt,http://localhost:7070&gui=true)

## Get Not Commited: (can be used with delete, it just compares two files)
[http://localhost:8080/erp/test?util=com.namasoft.erp.gui.server.CompareTwoFiles-e:/rc/recommit.txt,e:/rc/done.txt&gui=true](http://localhost:8080/erp/test?util=com.namasoft.erp.gui.server.CompareTwoFiles-e:/rc/recommit.txt,e:/rc/done.txt&gui=true)

## ReCreate Employee State System Entries:
[http://localhost:8080/erp/test?util=com.namasoft.modules.humanresource.domain.entities.utils.MigrateEmpStateEntry](http://localhost:8080/erp/test?util=com.namasoft.modules.humanresource.domain.entities.utils.MigrateEmpStateEntry)

## ReCreate Employee Vacation System Entries:
[http://localhost:8080/erp/test?util=com.namasoft.modules.humanresource.domain.entities.utils.VacationsSysEntryMigratorForAllEmps](http://localhost:8080/erp/test?util=com.namasoft.modules.humanresource.domain.entities.utils.VacationsSysEntryMigratorForAllEmps)

## To Process Only Working Employees:
[http://localhost:8080/erp/test?util=com.namasoft.modules.humanresource.domain.entities.utils.VacationsSysEntryMigratorForWorkingEmps](http://localhost:8080/erp/test?util=com.namasoft.modules.humanresource.domain.entities.utils.VacationsSysEntryMigratorForWorkingEmps)

## To Allow System To Resume After An Error:
[http://localhost:8080/erp/test?util=com.namasoft.modules.humanresource.domain.entities.utils.VacationsSysEntryMigratorForAllEmps-e:/rc/processed-employees.txt](http://localhost:8080/erp/test?util=com.namasoft.modules.humanresource.domain.entities.utils.VacationsSysEntryMigratorForAllEmps-e:/rc/processed-employees.txt)
> [!NOTE]
> This will put the processed employee ids in e:/rc/processed-employees.txt

## To Allow The system to resume after an error and determine date to start from
[http://localhost:8080/erp/test?util=com.namasoft.modules.humanresource.domain.entities.utils.VacationsSysEntryMigratorForAllEmps-file=e:/rc/processed-employees.txt,date=20201010](http://localhost:8080/erp/test?util=com.namasoft.modules.humanresource.domain.entities.utils.VacationsSysEntryMigratorForAllEmps-file=e:/rc/processed-employees.txt,date=20201010)
> [!NOTE]
> This will put the processed employee ids in e:/rc/processed-employees.txt,
and the date with format yyyyMMdd 

## To Process an employee with code:
[http://localhost:8080/erp/test?util=com.namasoft.modules.humanresource.domain.entities.utils.VacationsSysEntryMigratorForAllEmps-codes=E001-E002-E003](http://localhost:8080/erp/test?util=com.namasoft.modules.humanresource.domain.entities.utils.VacationsSysEntryMigratorForAllEmps-codes=E001-E002-E003)

## Recreate Sub Item Status Entries:
[http://localhost:8080/erp/test?util=com.namasoft.modules.srvcenter.domain.utils.SubItemStatusSysEntryRecalculateUtil-file=c:/namautilfiles/toProcessTypes.txt](http://localhost:8080/erp/test?util=com.namasoft.modules.srvcenter.domain.utils.SubItemStatusSysEntryRecalculateUtil-file=c:/namautilfiles/toProcessTypes.txt)

## Regenerate Approvals Summary
[http://localhost:8080/erp/test?util=com.namasoft.infra.domainbase.common.approval.RecalcSummaryUtil](http://localhost:8080/erp/test?util=com.namasoft.infra.domainbase.common.approval.RecalcSummaryUtil)

## Remove Zombie Approvals:
[http://localhost:8080/erp/test?util=com.namasoft.infra.domainbase.common.approval.FixZombieApprovalUtil](http://localhost:8080/erp/test?util=com.namasoft.infra.domainbase.common.approval.FixZombieApprovalUtil)

## Regenerate Inventory Transactions from File:
[http://localhost:8080/erp/test?util=com.namasoft.modules.supplychain.domain.utils.plugnplay.RegenInvTransReqFromFile-e:/rc/regeninvtrans.txt,e:/rc/doneregeninvtrans.txt](http://localhost:8080/erp/test?util=com.namasoft.modules.supplychain.domain.utils.plugnplay.RegenInvTransReqFromFile-e:/rc/regeninvtrans.txt,e:/rc/doneregeninvtrans.txt)

## Reprocess All Fixed Assets Documents:
[http://localhost:8080/erp/test?util=com.namasoft.modules.fixedassets.domain.utils.SWSUpdatePropertyEntryUtil](http://localhost:8080/erp/test?util=com.namasoft.modules.fixedassets.domain.utils.SWSUpdatePropertyEntryUtil)

[http://localhost:8080/erp/test?util=com.namasoft.modules.fixedassets.domain.utils.SWSUpdatePropertyEntryAndRecalcDepreciationUtil](http://localhost:8080/erp/test?util=com.namasoft.modules.fixedassets.domain.utils.SWSUpdatePropertyEntryAndRecalcDepreciationUtil)

[http://localhost:8080/erp/test?util=com.namasoft.modules.fixedassets.domain.utils.SWSUpdatePropertyEntryAndRecalcDepreciationAndRemovePreventedAssetsUtil](http://localhost:8080/erp/test?util=com.namasoft.modules.fixedassets.domain.utils.SWSUpdatePropertyEntryAndRecalcDepreciationAndRemovePreventedAssetsUtil)

## Reprocess Specific Fixed Assets Documents:
[http://localhost:8080/erp/test?util=com.namasoft.modules.fixedassets.domain.utils.SWSUpdatePropertyEntryUtil-FA001,FA002,FA0003](http://localhost:8080/erp/test?util=com.namasoft.modules.fixedassets.domain.utils.SWSUpdatePropertyEntryUtil-FA001,FA002,FA0003)

