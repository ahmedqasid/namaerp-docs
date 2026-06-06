# Approvals FAQ

## Setting Up Approval for a Stock Transfer Based on the Receiving Warehouse

If you have multiple warehouses, each with a different **warehouse keeper** and direct supervisor, and you want the **approval of a stock transfer to be the responsibility of the warehouse that will receive the goods** (not the sending warehouse), you can achieve this by configuring the approval as follows:

### Solution

* Create an **approval definition** for the `StockTransfer` entity.
* Add an approval step where the responsible person is determined based on a **field within the document**.
* Use the following field to identify the responsible parties:

```
toWarehouse.warehouseKeeper,toWarehouse.warehouseKeeper.directSupervisor
```

This means the approval will be from:

* The **receiving warehouse keeper**
* The **direct supervisor of the receiving warehouse keeper**

---

::: details Click to view the JSON file for direct import

```json
{
  "approvalEntity": "StockTransfer",
  "steps": [
    {
      "stepSeq": 1,
      "name1": "موافقة أمين المخزن",
      "responsible": {
        "responsibleType": "Field",
        "fieldId": "toWarehouse.warehouseKeeper,toWarehouse.warehouseKeeper.directSupervisor"
      }
    }
  ]
}
```

:::

With this setup, the system automatically routes the approval request to the relevant parties in the **receiving warehouse**, ensuring the approval process follows the established management hierarchy.

## I Tried to Create an "Update Approval" for a Stock Transfer but the System Refused to Save

When defining an approval for a stock transfer and selecting the approval type "Update Approval" (مع التعديل), you may see the following error:

```
Update approval can not be used with documents, can be used with documents only  
لا يمكن استعمال "مع التعديل" مع المستندات - تستعمل مع الملفات فقط
```

### Reason

By default, Nama ERP does not allow update approvals on documents (such as stock transfers, invoices, etc.) because modifying documents after they have been approved is considered a risk and may open the door to manipulation. It is preferable to reverse the document and issue a new one instead of editing it.

### Solution

If there is a legitimate scenario that requires allowing document modification with an approval workflow, you can enable the following option in the global configuration:

<GlobalConfigOption option-code="value.info.allowApprovalsOnDocumentsUpdate" />

### Additional Notes

::: tip You can control editing or deletion after approval through permissions

* To prevent editing of approved documents, enable the `preventEditAfterApproval` option in the permissions file or user settings.
* To prevent deletion of documents after approval, enable the `preventDeleteAfterApproval` option.

:::

## The System Requests Approval on a Purchase Invoice When Saving a Receipt Voucher or Additional Costs Voucher Linked to It

When you define an "Update Approval" on a purchase invoice, you may notice that the system requests a new approval on the invoice when:

* Creating a **stock receipt voucher** linked to that invoice.
* Creating a **receipt additional costs voucher** linked to that invoice.

### Reason

Receipt vouchers and additional cost vouchers modify the linked purchase invoice because they:

* Update the **received quantities** on the invoice lines.
* Update the **cost distribution** on the invoice lines.
* Force the invoice to re-save other linked receipt vouchers.

Since these modifications are made automatically through a system action (not by the user), requesting approval in this case does not make logical sense.

### Solution

The system marks entities that are saved via a system action by setting the `systemIsCommiting` field to `true` during these operations. To avoid triggering the approval in these cases, add the following query in the **applyWhenQuery** field of the approval definition:

```sql
select case when {$systemIsCommiting} = 1 then 0 else 1 end
```

With this setup, the approval will not be triggered when the system modifies the invoice through a receipt voucher or additional costs voucher, while it will continue to be triggered when the user edits the invoice directly.
