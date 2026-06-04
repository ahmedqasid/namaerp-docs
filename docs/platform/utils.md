# Utility Links
::: danger
This file contains potentially dangerous links. Please proceed with caution when using any of the listed utilities. 
:::

<ServerBaseURL/>
::: tip
- Enter the server URL of the customer you're working with
- You can also customize the default parameter values using the input fields provided.
- Use the Copy button to simplify running the utilities.
:::

## Recommit From File: (For admin)
<UtilityLinkBuilder
className="com.namasoft.erp.gui.server.RecommitFromFile"
:params="[
{ title: 'Main File', default: 'e:/rc/recommit.txt' },
{ title: 'Done File', default: 'e:/rc/done.txt' },
{ title: 'Errors File', default: 'e:/rc/errors.txt' }
]" :gui = "true"
/>

## ReApply Real Estate Sales Contracts System Entries:

<UtilityLinkBuilder 
className="com.namasoft.modules.realstate.domain.utils.RESysEntryMigratorUtility"/>

## ReApply Rent Contracts System Entries:
<UtilityLinkBuilder
className="com.namasoft.modules.realstate.domain.utils.UpdateREReservationEntryUtil"/>

## Re-Replicate From File: (For admin)
<UtilityLinkBuilder
className="com.namasoft.erp.gui.server.ReplicateFromFile"
:params="[
{ title: 'Main File', default: 'e:/rc/recommit.txt' },
{ title: 'Done File', default: 'e:/rc/done.txt' },
{ title: 'Errors File', default: 'e:/rc/errors.txt' }
]" :gui = "true"
/>

## Delete From File:
<UtilityLinkBuilder
className="com.namasoft.erp.gui.server.DeleteFromFile"
:params="[
{ title: 'Main File', default: 'e:/rc/delete.txt' },
{ title: 'Done File', default: 'e:/rc/done-delete.txt' },
{ title: 'Errors File', default: 'e:/rc/delete-errors.txt' }
]" :gui = "true"
/>


## Regen Ledger from file - Accounting Effects:
<UtilityLinkBuilder
className="com.namasoft.erp.gui.server.RegenAccFromFile"
:params="[
{ title: 'Main File', default: 'e:/rc/regen-ledger.txt' },
{ title: 'Done File', default: 'e:/rc/regen-ledger-delete.txt' },
{ title: 'Errors File', default: 'e:/rc/regen-ledger-errors.txt' }
]" :gui = "true"
/>

## Export To Another Server From File:
<UtilityLinkBuilder
className="com.namasoft.erp.gui.server.ExportToServerFromFileByWS"
:params="[
{ title: 'Main File', default: 'e:/rc/export.txt' },
{ title: 'Done File', default: 'e:/rc/export-delete.txt' },
{ title: 'Errors File', default: 'e:/rc/export-errors.txt' },
{ title: 'Export To Server URL', default: 'http://localhost:7070/' }
]" :gui = "true"
/>


## Export To Another Server from File Using Excel Sheets:
<UtilityLinkBuilder
className="com.namasoft.erp.gui.server.ExportToServerFromFileByExcel"
:params="[
{ title: 'Main File', default: 'e:/rc/export.txt' },
{ title: 'Done File', default: 'e:/rc/export-delete.txt' },
{ title: 'Errors File', default: 'e:/rc/export-errors.txt' },
{ title: 'Export To Server URL', default: 'http://localhost:7070/' }
]" :gui = "true"
/>

## Get Not Commited: (can be used with delete, it just compares two files)
<UtilityLinkBuilder
className="com.namasoft.erp.gui.server.CompareTwoFiles"
:params="[
{ title: 'First File', default: 'e:/rc/recommit.txt' },
{ title: 'Second File', default: 'e:/rc/export-delete.txt' }
]" :gui = "true"
/>

## ReCreate Employee State System Entries:
<UtilityLinkBuilder
className="com.namasoft.modules.humanresource.domain.entities.utils.MigrateEmpStateEntry"
/>

## Employee Vacation System Entries:
- Recreate All Employees Vacation Sys Entries
<UtilityLinkBuilder
className="com.namasoft.modules.humanresource.domain.entities.utils.VacationsSysEntryMigratorForAllEmps"
/>

- To Process Only Working Employees:
<UtilityLinkBuilder
className="com.namasoft.modules.humanresource.domain.entities.utils.VacationsSysEntryMigratorForWorkingEmps"
/>

-- To Allow System To Resume After An Error:
<UtilityLinkBuilder
className="com.namasoft.modules.humanresource.domain.entities.utils.VacationsSysEntryMigratorForAllEmps"
:params="[
{ title: 'Processed Employees File', default: 'e:/rc/processed-employees.txt' }
]"
/>

::: tip
This will put the processed employee ids in e:/rc/processed-employees.txt
:::

- To Allow The system to resume after an error and determine date to start from
  <UtilityLinkBuilder
  className="com.namasoft.modules.humanresource.domain.entities.utils.VacationsSysEntryMigratorForAllEmps"
  :params="[
  { title: 'Processed Employees File', default: 'e:/rc/processed-employees.txt', id:'file' },
  { title: 'Start From Date', default: 'yyyyMMdd', id:'date' }
  ]"
  />

::: tip
This will put the processed employee ids in e:/rc/processed-employees.txt, and the date with format yyyyMMdd 
:::

- To Process Specific Employees by Code:
  <UtilityLinkBuilder
  className="com.namasoft.modules.humanresource.domain.entities.utils.VacationsSysEntryMigratorForAllEmps"
  :params="[
  { title: 'Employee Codes', default: 'E001-E002-E003', id:'codes' }
  ]"
  />

## Recreate Sub Item Status Entries:
<UtilityLinkBuilder
className="com.namasoft.modules.srvcenter.domain.utils.SubItemStatusSysEntryRecalculateUtil"
:params="[
{ title: 'Types To Process File', default: 'e:/rc/toProcessTypes.txt', id:'file' }
]"
/>


## Regenerate Approvals Summary
<UtilityLinkBuilder
className="com.namasoft.infra.domainbase.common.approval.RecalcSummaryUtil"
/>

## Remove Zombie Approvals:
<UtilityLinkBuilder
className="com.namasoft.infra.domainbase.common.approval.FixZombieApprovalUtil"
/>

## Regenerate Inventory Transactions from File:
<UtilityLinkBuilder
className="com.namasoft.modules.supplychain.domain.utils.plugnplay.RegenInvTransReqFromFile"
:params="[
{ title: 'Main File', default: 'e:/rc/regen-inv-trans.txt' },
{ title: 'Done File', default: 'e:/rc/regen-inv-done.txt' },
{ title: 'Errors File', default: 'e:/rc/regen-inv-errors.txt' }
]"
/>

## Reprocess All Fixed Assets Documents:
- Recreate all fixed assets entries
<UtilityLinkBuilder
className="com.namasoft.modules.fixedassets.domain.utils.SWSUpdatePropertyEntryUtil"
/>

- Recreate all fixed assets entries and recalculate depreciation installment values
::: danger
Take care, depreciation values WILL BE CHANGED
:::
<UtilityLinkBuilder
  className="com.namasoft.modules.fixedassets.domain.utils.SWSUpdatePropertyEntryAndRecalcDepreciationUtil"
/>

- Recalculate and remove assets that exist in prevent depreciation documents
  <UtilityLinkBuilder
  className="com.namasoft.modules.fixedassets.domain.utils.SWSUpdatePropertyEntryAndRecalcDepreciationAndRemovePreventedAssetsUtil"
  />


- Reprocess Specific Fixed Assets Documents:
  <UtilityLinkBuilder
  className="com.namasoft.modules.fixedassets.domain.utils.SWSUpdatePropertyEntryUtil"
  :params="[
  { title: 'Processed Assets File', default: 'e:/rc/processed-assets.txt', id:'file' },
  { title: 'Asset IDS' , default: 'ffff01,ffff02', id: 'ids' }
  ]"
  />


