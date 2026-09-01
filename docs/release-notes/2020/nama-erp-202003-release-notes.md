# Nama ERP Release Notes - March 2020

::: info Release Information
**Release Date:** March 2020  
**Release Number:** 2020.03
:::

## Additions

### Inventory
- Added 2 attachments to the header of the Delivery document
- Added an attachment to the header of the Stock Issue Request document
- Added a ninth input to `EAGenEntityFromEntityAction` that splits the lines by the field `Group Details By`
- Translated the message about not processing warehouses under stock taking into Arabic, and also revised the English message to make it clearer
- Added the vouchers (**Link Items to Customers**, **Link Items to Vendors**)
- Added the following two vouchers:
  - Link Items to Customers
  - Link Items to Vendors
- Added the following options to the Distribution Management Settings:
  - Link Items to Multiple Customers
  - Link Items to Multiple Vendors
  - When linking items to multiple customers, do not fetch items that have no customers
  - When linking items to multiple vendors, do not fetch items that have no vendors
  - Verify that items are linked to customers and vendors upon saving

### Accounting
- Added the following fields to `AccountsBagLine`:
  - `ref1,ref2,ref3,ref4,ref5`
  - `n1,n2,n3,n4,n5`
  - `text1,text2,text3,text4,text5`
- Allowed running `recommit` on documents that belong to a Shift Closing or Shift Opening

### Customer Relationship Management (CRM)
- Added the following fields to the Contact window:
  - The option **Callback**
  - The option **Callback Done**
  - The field **Planned Callback Date**
- Added 5 attachments to the **Receipt Request** document

### Human Resources
- Added the field **Employee Group** to the lines of the Shift Plan screen, and used it to set the shift for the employees listed there
- Sometimes, updating an employee's data showed an error on save such as (Leave entitlement of 24 is less than the 24.5 consumed)
- **Leave Type**: Added the following two options:
  - Treat as Weekly Leave (Payroll)
  - Treat as Official Holiday (Payroll)
- Improved the process of grouping employees on employee documents so that only employees currently on the job are grouped

### Real Estate
- The system does not allow deleting Ownership Waiver vouchers - and likewise, if the field **Based On** is changed, the system does not perform the required effect correctly
- Added the Financial Paper field to the payment lines in the Receipt Voucher
- Added Price Discount Credit and Price Discount Debit to the term config of the Opening Sales Contract

### Manufacturing
- In the Production Order, added a new field to production orders, **Complementary Item Density Factor**, which is a percentage
- Added the field **Issue Method** to the header of the **Product Components** file

### Letters of Credit
- On the Letter of Credit Opening window, the following was added:
  - Added the fields Coverage Debit and Coverage Credit to the term config
  - Added the fields Coverage Amount and Coverage Percentage on the Letter of Credit Opening screen

### Fixed Assets
- Added 5 attachments to each of the **Real Estate Sale Payment Plan** and the **Real Estate Investment Price List**
- Added a book and term config for the Fixed Asset Purchase Voucher to both the Partial Disposal voucher term config and the Asset Disposal voucher term config

### Contracting
- Added Item Classification to the screen lines on pages 1, 2, 3, and 4
- Added the option `Copy Lines from the Term Analysis Card to the Contracting Supplies Purchase Invoice Lines When Selecting the Term Analysis Card on the Invoice Lines` to the Contracting Settings
- Added the field **Executive Budget Item Description** to the Estimated Budget details, and also added the field **Estimated Budget Description** to the Executive Budget details
- **Contracting Supplies Purchase Invoice**: Improved so that entering the term analysis item code copies the field `items.description` from the Card screen to `details.description` on the Supplies Invoice screen
- Reordered the screen lines and changed the position of the field **Item Description**
- Moved the option **Show Parent Items** from some Contracting document term configs to the Contracting Settings file
- **Contracting Miscellaneous Invoice screen**: Improved so that entering a term analysis item code copies the item classification found on the Term Analysis Card
- Added Item Classification to the Contracting Raw Materials Issue lines
- An error sometimes appears in the Total Price of the Term Sheets

### Banks
- Added the field **Creating Document** to the Financial Paper
- Added the option `Delete Financial Papers Created When Their Creating Document Is Deleted` to the Accounting Settings

### Point of Sale
- In the new interface, moved the Language button next to the Payment button, and moved the Menu button to where the Language button was (next to the button group)
- Added the action `Delete Errors for Selected Machines` to the More menu on the Machine file's list screen
- Improved so that, when trying to change the password of the user set in the properties file, the message (Please use the username and password of another user in the properties file) is shown
- Added the option `Prevent Automatically Editing the Cash Payment Value on the Payment Screen` to the Point of Sale Settings
- Added the field `shiftPeriod` to the Point of Sale Settings, and the field **Shift Duration Differs from the Duration Set at** to the Shift Closing document in Nama
- On Shift Opening and Closing, sorted the payment methods so they appear in the same order shown on the Multiple Payment screen, i.e. using the same fields already in place for ordering
- Added the property `printToDialog =1` to the `properties.nama` file, for use when it needs to be enabled
- **Shift Closing**: No longer allowed entering a number in the Deferred value
- Added `n1` to the Shift Closing lines, for use in creating an accounting effect for the payment methods' fees value
- When a user is not given permission for a specific shortcut such as (View Payment Details, Reprint Document), the shortcut disappeared from the screen. Improved so that the shortcut remains but is `dimmed`
- Revised the message about the cash value not being available when trying to issue an Issue voucher, to be clearer and to show the cash value actually available
- Added the option `Start with the New Shifts Screen Layout` to the Point of Sale Settings; this option must be enabled to start with the new layout of the Shifts window

### Settings
- Added the option `Allow Printing Documents Awaiting Approval` to the Global Config
- Added the option `disaster-recovery-mode` to the `properties.nama` file; when its value is `true`, the system ignores records that no longer exist during export
- Added a confirmation dialog for the Update Reports action, so it is not clicked by mistake and all reports get updated unnecessarily
- Added the option `Allow Printing PDF Only` on the User screen and the Permission File, so a user cannot print a Word template, edit it, and reprint it
- Improved the entity flow for creating a Production Order for each line in Transfer Requests, adding the ability for it not to run if the item on the line is not a manufactured item
- Added the ability to change the format of some fields' `Display mask` for the whole invoice or the whole invoice details at once
- In the entity flow `EAAddAccountingEffect`, added the ability to enable or disable the flow at the line level with a criterion that is an `SQL` statement
- Added the two fields (**Voucher Remark** and **Manual Document Number**) to the system table `EntitySystemEntry`, to make it easier to extract the account statement

### New GUI
- Improved the new interface for a customer in Kuwait so that the `Exceed` logo is shown instead of the Nama logo, as is the case with the old interface
- Changed the phrase **Login to Nama** to **Login**, and changed `"Nama ERP Login"` to `"ERP Login"` for Kuwait customers; also revised the Nama logo on the loading screen at the start of login
- On the field information screen `"Show Fields Info"`, added a new text field that shows the allowed values for the field (especially for `Combo Box`), since support and implementation teams often need it to change the allowed values

## Fixes

### Inventory
- Fixed an issue where an error occurred when selecting a Payment Template on the Purchase Request
- Fixed an issue where, sometimes, adding a manual expense twice in the Additional Receiving Costs voucher, with a different account each time, prevented manual distribution on the Distribution screen and showed an error that the total amount did not match the manual expense value
- Fixed an issue where an error occurred when saving a Stock Taking Committee (without selecting a term config)
- Fixed an issue where an error sometimes appeared when editing a Stock Taking Committee

### Sales
- Fixed an issue where, in one case on a Sales Order, a discount coupon worth 219.3 pounds was applied, yet only 23.59 pounds were deducted on save
- Fixed an issue where an error sometimes occurred when saving a Sales Order

### Accounting
- **Bank Reconciliation Memo**: Fixed an issue where the system sometimes matched one line to another despite the values differing, and the difference being greater than the tolerance value

### Customer Relationship Management (CRM)
- **Contacts window**: Fixed an issue where the Callback field was not affected by saving the new contact; a `recommit` on the new contact, or any edit and save, was required for it to affect **Callback Done** on the original contact

### Manufacturing
- Fixed an issue where, sometimes, saving a Production Execution document showed an error message that the Size field could not be left empty on one of the lines, even though a size existed on the Production Order and the production components
- Fixed an issue where, sometimes, a raw material issue problem occurred: the system issued the complementary item with a quantity different from the one defined for it in the components
- Fixed an issue where, in one case, deleting a Production Execution showed the error:
```
The document FP200001 will lead to negative quantity for order PO200001, operation 101
```
- Fixed an issue where creating a Grouped Production Order based on a Sales Order filled in the item code but not the (default) product components or the operations; and selecting them manually cleared the quantity carried over from the Sales Order

### Settings
- The entity flow `com.namasoft.infor.domainbase.util.actions.EAPreventChangingFields` works correctly and accepts the addition of lines
- Fixed an issue where an error occurred when trying to send an email to a user who has no email address
- Fixed an issue where approving a Work Task document showed `error technical`

### Contracting
- Fixed an issue where, sometimes on the Supplies Purchase Invoice, not all term analysis item codes were fetched, and sometimes the system added a line to the window merely from using the mouse button
- Fixed an issue where duplicating a Term Analysis Card document caused the system to reject saving, showing the error message **Duplicate Analysis Item Code**, even though the field was empty

### Service Center
- Fixed an issue where, sometimes on the Work Order, the Expected Next Visit Date was not calculated
- Fixed an issue where the average daily consumption for vehicles serviced for the first time was calculated as (Current Reading - Warranty Kilometers) / (Last Reading Date - Warranty Start Date), which was wrong; the correct formula is (Current Reading) / (Last Reading Date - Warranty Start Date)

### Banks
- Fixed an issue where leaving the paper empty when opening a Financial Paper (so it would be created automatically) caused the system to reject it as a duplicate paper
- Fixed an issue where transferring a purchased asset to another legal entity caused the system to reject saving, objecting that the asset's Purchase Invoice was not compatible with the second legal entity, even though the Purchase Invoice is a system field on the asset that is not entered by the user

### Fixed Assets
- Added the field **Attachment** to the Asset Purchase Order screen

### Point of Sale
- Fixed an issue where switching to English and back did not update the translation correctly at all, and all the fields in the invoice header disappeared
- Fixed an issue where the system ignored the option `"defaultlang"` in the `properties.nama` file, opening the interface based on the last language Point of Sale was opened with instead; so if the interface was Arabic and was switched to English from within Point of Sale, it opened in English the next time regardless of the option in the `nama.properties` file
- Fixed an issue where trying to change font sizes through the **Edit Font Size** window caused an error in the table (grid) column headers
- Fixed an issue where the `F1` key no longer worked for reaching the Sales Invoice in some Point of Sale windows
- Fixed an issue where the shortcut `Ctrl+F4` opened the Font window instead of the Data Statistics
- Fixed an issue where, when a user did not have permission to cancel the invoice, they could not exit the previous-invoice or suspended-invoice mode
- Fixed an issue where the Payment Details icon appeared with suspended items
- Fixed an issue where the option **Full Screen When Opening the Payment Screen** in the Settings only worked with the Simple Payment window, and did not work with the Multiple Payment window
- Fixed an issue where the field **Screen Title Font Size** in the Point of Sale Settings had no effect
- Fixed an issue where the label of the option **Document Classification Required** was wrong; it should have been **Document Classification Required in Stock Transfer**
- Fixed an issue where the field **Subsidiary Required in Expenses** had no effect
- Fixed an issue where, with the option **Start with the New Point of Sale Interface** enabled but the machine not linked to a New Point of Sale Interface Settings file, the user could not log into the program
- Fixed an issue where an error occurred when saving a Point of Sale shift: a deferred amount appeared on the Shift Closing even though the full value of the invoices for the same shift had been paid
- Fixed an issue where, on the Point of Sale Stock Transfer Request, enabling the option **Print on Save** in the **Point of Sale Stock Transfer Request** document's book meant printing worked correctly only the first time; on a subsequent request, printing did not work
- Fixed an issue where an error sometimes occurred when closing the shift
- Fixed an issue where, in Point of Sale, leaving the program idle with no sales for a while turned the screen `with blur effect`, requiring Point of Sale to be closed and reopened to work correctly

### Human Resources
- Fixed an issue where the error **The operation could not be performed** sometimes appeared when saving the Salary voucher
- Fixed an issue where, sometimes, deleting an employee showed the following errors:
  - The record cannot be deleted because it is used in the field `employeeRef.EmployeeHRInfo.dbo` in the table **Employee HR Information**
  - The record cannot be deleted because it is used in the Employee field in the table `dbo.EmpAttendanceSysLine`
  - The record cannot be deleted because it is used in the Employee field in the table `dbo.SysVacationsBalance`
- Fixed an issue where an error sometimes occurred when issuing the Salary voucher
- **Salary Voucher - Statistics page**: Fixed an issue where, sometimes, Leave vouchers for the period did not display the leaves
- **Bulk Leave Requests screen**: Fixed an issue where entering the leave duration in the details calculated the Actual Leave Duration, but it was cleared on save; as a result it was missing when creating a Bulk Leave Voucher based on it
- Fixed an issue where, sometimes, the Bulk Job Offer could not be saved

### Settings
- Fixed an issue where, when a survey was sent via SMS, answering it in Arabic showed the letters incorrectly
- Fixed an issue where defining an Approval with more than one step for a file showed `error Technical`; also, defining an Approval with a single step for a file worked, but if a return decision was made and the document was sent for approval again, an error appeared
- Fixed an issue where approving a (Work Task) showed the error message **The operation cannot be performed**
- Fixed an issue where using the entity flow:
```
com.namasoft.modules.accounting.domain.utils.actions.EAAddAccountingEffect
```
to create an accounting effect for a specific document, and selecting an accounting side, meant the resulting journal entry did not take into account the effect on the reference and the record

### Manufacturing
- Fixed an issue where, sometimes on the Production Order, any edit followed by save showed **The operation could not be performed**, and some components did not change when the quantity changed
- Fixed an issue where an error sometimes occurred while processing a Production Order Execution
- **Product Return Request document**: Fixed an issue where the system would not save a Product Return Request because no term config was set for the document, even though the window has no field for the term config
- **Damaged Receipt document**: Fixed an issue where, on save, the system objected that no book and term config were set for the automatic receipt, even though the option **Create Documents Automatically** was not enabled in the document's term config
- **Indirect Costs**: Fixed an issue where the header of the first column in the details read **Anwaa** [sic] - an extra alef
- **Forecast Voucher**: Fixed an issue where entering **To Date** on the Forecast Voucher produced **The operation could not be performed**
- **Grouped Production Order**: When enabling the option **Group Quantities for the Same Items** and selecting a From Date to Date, the system fills the field `"details.productionOrderRequest"`

### New GUI
- Fixed an issue where running the report `029ACC-SYSR` and selecting From Account: `110101` To Account: `110101` caused an error, due to the input values not being sent correctly; also, after selecting inputs and running the report, then clicking Rerun Report, the previously selected input values were not kept
- Fixed an issue where opening the Quantity Entries window in Receipt vouchers in the Inventory module and selecting the Identifier showed the error **The operation could not be performed**
- Fixed an issue where, in the Contracting module, the group `CONTRACTINGMasterFiles` did not appear, even though it existed in the old GUI
- Fixed an issue where, in the Contracting module, selecting the Estimated Budget Item Code showed the list empty at first, and scrolling down revealed the items grouped at the end; the same happened on every screen with Estimated Budget items
- Fixed an issue where, in the Supplies Purchase Invoice details, the column was titled **Executive Budget Item Code**, whereas in the old GUI it was titled **Cost Item Code**
- Fixed an issue where changing the format of dashboard widgets of type `Calendar`, for example, or charts with more than one shape, to the old system `(High Charts)` in the new interface, made the charts disappear from the new interface and never reappear
- Fixed an issue where the Sales Invoice screen showed the Assortment column even though it had been removed via Edit Screen
- Fixed an issue where the `Tip Tool` did not work on the Sales Invoice, whether double-clicking the line number or using the `F9` key on the line number
- Fixed an issue where the filter fields in `Widget Criteria` were not sorted
- Fixed an issue where some buttons had the label `nul`
- Fixed an issue where, in the new GUI's `Dash Board` for the `calendar`, the text and background color were not clearly visible because the text color and background color were the same shade
- Fixed an issue where clicking the More button several times caused a problem in the vertical `Scroll bar`
- Fixed issues with the `Dialogs Styles` in the new GUI not being good in the following:
  - `Fields not surrounded by a frame as groups`
  - `Height is not resizable by content`
  - `There is unneeded horizontal scroll`
- Fixed an issue in the `Application Modal Dialogs` where it was possible to interact with icons outside the dialog while a window opened from another window was active
- Fixed a color issue when applying some `Themes`
- Fixed an issue where using the save shortcut `(Ctrl + S)` while in a `(rich text)` field showed a save-confirmation message for that field instead of saving the entire record
- Fixed an issue where, sometimes, changing the legal entity broke the More button, causing it to stop working
- Fixed an issue where, after entering the database, username, and password, the system did not accept logging in via the `(Enter)` key, requiring the mouse instead
