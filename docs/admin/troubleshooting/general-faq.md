
# General FAQ
<ServerBaseURL/>

### When Searching for Documents via the Lens, a Blank Error Sometimes Appears
This can be resolved by setting an appropriate number in `MaxRecordsPerPageForListViews` inside the General Settings.
<GlobalConfigOption option-code="value.info.maxRecordsPerPageForListViews" />

##  How Can Permissions Be Assigned to All Record Types in Nama ERP in a Flexible and Fast Way Without Adding a Row for Each Type?

✅ **Answer:**

In Nama ERP, you can assign permissions to records using one of the following options within each permission row:

1. **A single specific type** (e.g., "Customer").
2. **A type list** containing more than one type.
3. **Both options together**.

Depending on what you specify, the permissions in that row apply to:

* The type only.
* Or the type list only.
* Or both together.

You can also leave **both the type field and the type list field empty**, in which case the permissions apply to **all screens** in the system.

🔽 **How the system selects the appropriate row when applying permissions:**

When a screen is opened (e.g., the Customer screen), the system searches for the most appropriate row based on the following **priority order**:

1. A row containing the **specific type** (e.g., "Customer").
2. If not found, it searches the **type list** for a row containing the "Customer" type.
3. If not found, it searches for a **general row** (containing no type and no type list).

Once the first matching row is found according to the order above, the system stops searching and applies only that row's permissions.

::: tip Note on Additional Temporary Permissions:

* The **broadest permission** (the one granting more access) is selected.
* But the **row priority order** still applies:

    * If "Save Only" permission is assigned to the "Customer" type,
    * And "Save and Edit" permission exists in a general row or a type list row,
    * Then the "Save Only" row takes priority because it is more specific according to the priority order.
:::

## SQL Server Installation problem related to block size on new M2 SSDs (especially on new hetzner servers)
* Refer to [this article](https://learn.microsoft.com/en-us/troubleshoot/sql/database-engine/database-file-operations/troubleshoot-os-4kb-disk-sector-size?tabs=PowerShell)
* You will need to completely uninstall 
* Then run the following command in PowerShell 
```powershell
New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Services\stornvme\Parameters\Device" -Name   "ForcedPhysicalSectorSizeInBytes" -PropertyType MultiString        -Force -Value "* 4095"
```
::: warning
Remember, PowerShell not command prompt

The window should be blue, not black
:::
* Restart the server
* Then install SQL Server again

## How Can the Discussion Screen Be Added to a Specific Screen
This can be done through the Fields and Screens Settings.
<NamaOptionURL entityType="GenericReferenceOverrider" new-mode optionCode="addDiscussionTo.addToPage" link-title="addDiscussionTo"/>

1. You can add the discussion to any screen in the system through the "Add Discussion To" table found in the Fields and Screens Settings.
::: tip You Can Control the Fields Shown in Discussions
You can control which fields appear in the discussion screen by editing the screen - "Edit Discussion Fields" block:
  - Remove the Discussion field
  - Remove Attachment 1 - 2 - 3 - 4
  - Remove Reference 1 - 2
:::

::: warning The Discussion Appears After Saving, Not Before
The discussion screen only appears on saved records - when creating a new record before saving, discussions are not shown.
:::

## SMS Messages Arrive with a Plus Sign (+) Instead of Spaces
Messages arrive incorrectly with a plus sign (+) instead of spaces.
`Dear+Customer` instead of `Dear Customer`
### The Solution is to Use `{utf8msg_sp20}` in the Other Settings Field in the Mail and SMS Settings Screen in General Settings Instead of `{utf8msh`}
For example, if the current value in the message settings is:
```
https://api.oursms.com/api-a/msgs?username=info@xyz.com&token=ToKenVaLue&src=SourceName&dests={to}&body={utf8msg}&priority=0&delay=0&validity=0&maxParts=0&dlr=0&prevDups=0
```
It should be changed to:
```
https://api.oursms.com/api-a/msgs?username=info@xyz.com&token=ToKenVaLue&src=SourceName&dests={to}&body={utf8msg_sp20}&priority=0&delay=0&validity=0&maxParts=0&dlr=0&prevDups=0
```
## When Opening the Item Transactions Screen, an Error Appears
`Can not find Field getter method : userQty.measures.clippedHeight1`
::: details Full Log Details
```
com.namasoft.infra.domainbase.util.NaMaBusinessLogicExeption: Can not find Field getter method : userQty.measures.clippedHeight1 
	at com.namasoft.infra.domainbase.metadata.EntityReflection.getFieldValue(EntityReflection.java:292) ~[domain-base-0.0.1-SNAPSHOT.jar:?]
	at com.namasoft.infra.domainbase.metadata.EntityReflection.getDirectFieldValue(EntityReflection.java:174) ~[domain-base-0.0.1-SNAPSHOT.jar:?]
	at com.namasoft.commonservices.utils.Lister.objectListToTabularResults(Lister.java:308) ~[service-base-0.0.1-SNAPSHOT.jar:?]
	at com.namasoft.commonservices.utils.Lister.getQueryListFromDB(Lister.java:232) ~[service-base-0.0.1-SNAPSHOT.jar:?]
	at com.namasoft.commonservices.utils.Lister.getListFromDB(Lister.java:338) ~[service-base-0.0.1-SNAPSHOT.jar:?]
	at com.namasoft.commonservices.utils.Lister.list(Lister.java:150) ~[service-base-0.0.1-SNAPSHOT.jar:?]
	at com.namasoft.commonservices.utils.Lister.list(Lister.java:207) ~[service-base-0.0.1-SNAPSHOT.jar:?]
	at com.namasoft.commonservices.utils.Lister.listFlat(Lister.java:830) ~[service-base-0.0.1-SNAPSHOT.jar:?]
```
:::

The cause of the problem is a field that was removed from the system still appearing in the list view.
The solution is to perform a RegenUI from the screen editing options.

## When Opening the Translation Override Screen or Any Other File, the Error Message "Operation Could Not Be Executed" Appears

::: details Error Details from the Log

```log
org.hibernate.query.sqm.PathElementException: Could not resolve attribute 'valueDate' of 'com.namasoft.modules.basic.domain.entities.TranslationOverRider'
	at org.hibernate.query.sqm.SqmPathSource.getSubPathSource(SqmPathSource.java:95) ~[hibernate-core-6.5.2.Final.jar:6.5.2.Final]
	...
	at com.namasoft.infra.domainbase.persistence.util.PersistenceUtility.getJoin(PersistenceUtility.java:138) ~[domain-base-0.0.1-SNAPSHOT.jar:?]
	at com.namasoft.infra.domainbase.persistence.util.PersistenceUtility.getPath(PersistenceUtility.java:109) ~[domain-base-0.0.1-SNAPSHOT.jar:?]
	at com.namasoft.infra.domainbase.persistence.repos.SearchQueryUtils.convertColumnsToSelectionsAndAddJoins(SearchQueryUtils.java:117) ~[domain-base-0.0.1-SNAPSHOT.jar:?]
	at com.namasoft.infra.domainbase.persistence.repos.GenericRepoImpl.countTabularResults(GenericRepoImpl.java:389) ~[domain-base-0.0.1-SNAPSHOT.jar:?]
	at com.namasoft.infra.domainbase.persistence.repos.GenericRepoImpl.tabularListPage(GenericRepoImpl.java:304) ~[domain-base-0.0.1-SNAPSHOT.jar:?]
	at com.namasoft.infra.domainbase.persistence.repos.DecoratedGenericRepo.tabularListPage(DecoratedGenericRepo.java:151) ~[domain-base-0.0.1-SNAPSHOT.jar:?]
	at com.namasoft.infra.domainbase.persistence.repos.Persister.tabularListPage(Persister.java:456) ~[domain-base-0.0.1-SNAPSHOT.jar:?]
	at com.namasoft.commonservices.utils.Lister.getPropertyListFromDB(Lister.java:523) ~[service-base-0.0.1-SNAPSHOT.jar:?]
	at com.namasoft.commonservices.utils.Lister.getListFromDB(Lister.java:336) ~[service-base-0.0.1-SNAPSHOT.jar:?]
	at com.namasoft.commonservices.utils.Lister.list(Lister.java:150) ~[service-base-0.0.1-SNAPSHOT.jar:?]
```

:::

### Explanation

This error most commonly occurs when a screen of type "For All Screens" or "All Files" is edited and the `valueDate` column is added to the columns displayed in the list table.

However, the `valueDate` field (actual date) exists only in vouchers (such as invoices or receipts) and is not present in files (such as translation override files).
Therefore, when attempting to load a list that includes this column for a file that does not support it, the problem occurs.

### Solution

Remove the `valueDate` column from the visible columns in this general modification (For All Screens or All Files), or specify the screen type precisely so that this modification is not applied to files that do not contain this field.

##  Warnings When Logging Into the System

### Error: `There are fiscal years with AllowCostProcessingWithClosingEntry set to TRUE`

### Cause of the Problem:

This error occurs when some fiscal years have the option **"Allow cost, quantity, and entry processing after the closing entry"** enabled.

### Steps to Resolve:

1. Open the **Fiscal Years** screen.
2. Find each fiscal year that has this option enabled.
3. **Uncheck** the "Allow cost, quantity, and entry processing after the closing entry" checkbox.
4. Click **Save**.

### What Does This Option Do?

By default, the system prevents **any changes to accounting entries** on dates prior to the company's **closing entry** date.

However, when this option is enabled:

* Modifications are allowed after the closing entry.
* This **changes the results of financial statements** after closing, which is **not recommended** and requires **careful review** before use.

::: danger Important
We recommend keeping this option disabled for all fiscal years, except in special cases and with the approval of financial management.
:::

::: tip Important Note
Please perform a Refresh Critical Errors from the System Utilities page after correcting these errors.
:::

## Error: `There are X user notifications which exceeds the limit of Y, this may affect system performance`

This warning appears when the number of notifications in the system exceeds the maximum allowed limit (default 10,000 notifications).

### Solution: Create a Scheduled Task to Delete Old Notifications

Create a scheduled task of type Action to automatically delete notifications older than 25 days.

You can import the task directly using the following JSON:

```json
{
  "scheduleType" : "Action",
  "scheduleInfo" : {
    "timeMinute" : "30",
    "timeHour" : "2"
  },
  "hourInfo" : {
    "runOnHour0230" : true
  },
  "sendAsMail" : true,
  "className" : "com.namasoft.infor.domainbase.util.actions.EADeleteNotificationsByDuration",
  "title1" : "Duration Days (default is 25 days)",
  "title2" : "Delete Type (all, readonly) - Default is all",
  "actionDescription" : "Deletes notifications older than specified number of days. Delete type: 'readonly' deletes only viewed notifications, 'all' deletes all notifications."
}
```

In this example, the task will run daily at 2:30 AM and delete all notifications older than 25 days.

#### Task Options:
* **Duration Days**: Number of days - notifications older than this number will be deleted (default 25 days)
* **Delete Type**:
  * `all` - Delete all old notifications (default)
  * `readonly` - Delete only read notifications

### Changing the Maximum Notification Limit

If you want to change the default maximum limit (10,000) instead of deleting notifications, you can do so through the General Settings:
<GlobalConfigOption option-code="value.maxUserNotificationCount" />

::: tip Important Note
Please perform a Refresh Critical Errors from the System Utilities page after correcting this error.
:::

## I Want to Make a Text Field Convert to a Link So I Can Enter a Website URL, with a Button Appearing Next to the Field That Opens the Link When Clicked

To achieve this in Nama ERP, you can use the following table:

### Table: `Text Fields Converted to Links`

Table code: `textToLinkFields`
Located inside the Fields and Screens Settings file.

- Setup method:

* Add a new record in the table.
* Specify the name of the field that contains the link (e.g., `details.text1` or `description2`).
* You can specify:

  * **Type**: such as `SalesInvoice` or `Customer`
  * Or **Entity Type List**: to apply it to more than one type
* Or leave both fields empty, in which case the conversion will be applied to this field on all screens where it appears.

- Result:

* A button will appear next to the text field.
* When clicked, the link stored in the field will open in a new window.
