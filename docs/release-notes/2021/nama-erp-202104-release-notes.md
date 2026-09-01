# Nama ERP Release Notes - April 2021

::: info Release Information
**Release Number:** April 2021  
**Release Date:** April 2021  
**File Size:** 184.5KB  
:::

## Additions

### Inventory

- **Expense Item:** Added the following fields:
  - From Value (Factor and Value)
  - To Value (Factor and Value)
  - Calculate From Details (Issued Items - Supplied Items)
  - Item
  - Item Section
  - Item Brand
  - Item Category
  - Item Classification
  - An option to calculate the total units
- In the `Sales Invoice`, when the delivery status on the item lines is (Fully Delivered), the invoice's delivery status is changed to (Fully Delivered)
- Added the following two options to the Distribution Management settings (`Supply Chain`):
  - "**Allow deleting item colors and sizes even when movements exist on them**"
  - "**Allow deleting item versions even when movements exist on them**"
- Improved the `Item Record` so that the system prevents saving the item if the field X of the quantity conversions (for the unit) is empty
- In the `Consolidation Voucher`, the quantity entered in the document header is now considered in addition to the supplied items when the expense item is set to be calculated based on the supplied quantity
- Improved the `Reception Inspection Sheet` to work like the `Purchase Order`, adding prices to it; when the option "**Use the temporary cost from the Purchase Order**" is used in the `Supply Voucher`, and it works based on a `Reception Inspection Sheet`, the cost is copied
- Activated the `Action post` for the consolidation vouchers for additional expenses on the `Consolidation Request` screen, with a check that, when the expense item's calculation is set to calculate from the supplied quantity, the quantity in the document header is considered if there are no supplied items
- Created a new document named "**Loading Cancellation**"

### Purchasing

- Added **4 n fields** to the line in the `Purchase Request` document

### Accounting

- Added the following options when defining an account:
  - Do not use if the record is empty
  - Do not allow leaving the record empty on movements against the account
  - Do not allow leaving Reference 1 empty on movements against the account
  - Do not allow leaving Reference 2 empty on movements against the account
  - Do not allow leaving Reference 3 empty on movements against the account
  - Do not allow leaving the description empty on movements against the account
  - Do not allow leaving Description 2 empty on movements against the account

### Banks

- `Letter of Guarantee Termination`: Added two sections for the accounting effect specific to the coverage

### Service Center

- Added a document named "**External Repair**"
- Added the option "**Do not allow opening more than one work order for the product at the same time**" to the Service Center settings
- Added the document "**Gate Pass**"
- Improved the "Gate Pass" document so that the system does not save the document unless the Remaining field on the invoice = 0
- Added the option "**Allow issuing the pass without paying the invoices in full**" to the term config for the "Gate Pass" document
- In both the "Work Order Execution" and "Sales Invoice" term configs, added the "**Change Product Status**" menu, to change the product's status to what is specified in the term config as soon as the execution document or sales invoice is issued
- Added **5 attachments** to the `Product Brands` screen
- Added a **Time** field named **Expected Delivery Time**, added to the screens (Service Request - Reception Inspection - Work Order - Work Order Execution)
- In the `Work Order Execution` screen, when opening a time for the first task, improved so that a line is added to the work orders grid with the status (In Progress) if there are no lines in the grid
- Improved so that if any data is entered inside the screens (Service Request, Reception Inspection, Work Order) into the product's data, it is added to the product screen specified in the header if those fields have no data on the product

### Real Estate

- Improved so that when the option to end a lease is selected, the lease is ended automatically, while keeping the actual date of the created termination voucher as the contract's end date (To Date)
- Added the related records to the `Combined Rental Units` screen to clarify the rental contracts and the opening rental contracts linked to the unit
- In the `Real Estate Investment Unit` screen - Details page, added the combined units linked to this unit
- `Sale Price Offer window`: Recalculated the field "**Difference Between Total Installments and Remaining**" so that when the button to create the installments is pressed, the system automatically calculates in this field the difference between the price and the installment value along with the button while entering data, not only on save

### Customer Relationship Management (CRM)

- Added **10 Description** fields in the `Complaint - Suggestion` document
- Added **5 time-specific fields** on the line and **5 other time-specific fields** in the header of the `Lead` screen
- Added the **Currency and Rate** field to the `Service Contract` document
- In the `Maintenance Invoice` term config, added a settings page with the following settings:
  - Added a book and term config for the created disbursement voucher
  - Create a Warehouse Issue Voucher with spare parts
  - Create a Warehouse Issue Voucher with service items
- Added the "**Warehouse**" field and the "**Issue Voucher**" field to the `Maintenance Invoice` header

### Hospital Management System

- Added the supplies (items) to the `Medical Service` file; when the service is recalled in the "Medical Service" field of the "Medical Services Invoice" details, the system copies the medical supplies for that service onto the Medical Services page

### Human Resources

- Added the following fields to the `Employee Data Update` screen:
  - National ID
  - National ID Issue Date
  - Expiry Date
- When creating a `Disbursement Request` for more than one salary record, the salary record is copied onto the lines. Improved so that when creating a `Disbursement Voucher` based on a `Disbursement Request`, the salary record is copied onto the lines so that the Paid field is affected on both the salary record and voucher
- In previous versions, the system allowed creating a manual `KPI Values Voucher` dated 2021-1-5 while selecting the March 2020 payroll period, for example. The user is now required to have the payroll period include the voucher's actual date, to prevent the error

### Point of Sale

- Added the option "**Maximum Allowed Value for Rounding Discount**" to the POS settings
- Activated the permission "**Prevent Rounding Discount**" found among the POS permissions
- Added **2 grids** to the POS settings, as follows:
  - Default POS Expense Subsidiaries
  - Default POS Receipt Subsidiaries
- These are used to select the types to be shown
- Created an **application filter** used on Android and `IOS` devices, through which invoices are initially recorded from mobile devices and transferred to the main POS program as a pending invoice; payment and invoice confirmation are then completed from the main program (`application Desktop`)
- Added **3 new fields** to both the register and the POS settings (the register takes the highest priority): **Tourism Service Item** - **Tourism Service Percentage** - the tourism service is calculated from (Base Price - after Discount 1 - after Discount 2 ... etc.)
- In POS, added an icon for the tourism service item, which can also be added by entering its code in the usual way
- Added the following two options to the `POS Register` file:
  - Send properties to the POS register
  - Read properties from the POS register
- Added actions to the More menu with the same names as the previous options
- Added the following two fields to the `POS Register` window:
  - Connection properties read from the POS
  - Data column properties read from the POS
- Made the subsidiary inside the `POS Invoice` behave like the subsidiary inside the `Receipt Voucher`, i.e. default references appear with the subsidiary such as - Customer - Employee ... etc., in addition to what is defined in the POS general reference files

### Letters of Credit

- In the `Expense Item` window, added a field to the window's details named "**Round the Total Quantity to Multiples of the Number**"

### Settings

- Added a `popup` when performing a `long click` on the document in the `Disbursement Vouchers` screen
- Configured Tomcat so that it does not start background data processing until it is fully running and the program is accessible
- In `Approval Definition`, improved the system so that it sends an alert and an email to the backup employee if the time allotted for the substitute employee's approval expires
- Added a mechanism to clear old Tomcat log files
- Added a button to both the `Fiscal Year` and `Payroll Year` so that it creates a copy of the fiscal year for the following year

### Mobile Applications

- `Electronic Receipt App`: Added the option "**Force Resend**" so that the document is sent to Nama even if it was already sent before, as the system shows a `popup` when performing a `long click` on the document in the `Disbursement Vouchers` screen
- Added a new document named "**Delivery Document**" to track orders with the sales representatives
- Developed a **dedicated sales application** linked to POS, with the following scenario:
  - When the customer arrives, the salesperson greets them with the tablet, searching for the customer's data or registering the customer's data available through the POS or the server, so that the customer's orders can be added along with their prices; the salesperson then saves the document (with the ability to print the document - the ticket number)
  - The cashier sees the tickets that have been added and for which cash has not yet been collected
  - The customer goes to the cashier with the ticket number
  - The cashier clicks the ticket number to bring up the payment screen, then collects the amount and issues the final regular invoice

### Reports

- Improved the `Debt Ages` report, code (`024ACC-SYSR`), so that it works for both vendors and customers, in addition to creating a filter on the account so that it shows only the accounts linked to the customer or vendor
- Added the report "**Form 2 Template**" with the code "**018HRS-SYSR**" to the system reports

## Fixes

::: warning Bug Fixes
Many bugs were fixed in this release to improve performance and stability
:::

### Inventory

- Fixed an issue where, when unlinking a `Supply Voucher` from a Purchase Invoice, the message "**Cannot delete the supply voucher**" appeared, because the option "Uncosted Supply" was not selected in the `Supply Voucher` term config. The message was changed to "**Cannot delete the supply voucher {voucher code} from the inventory voucher lines**"
- Fixed an issue where the option "**Calculate supplied items via the consolidation method for issued items**" only split the items from issued to supplied on save, when it should instead happen on `action post`, along with adding the consolidation method for issued items
- Fixed an issue causing an error when moving out of the consolidated item field in the document header
- `Delivery Cancellation Document`: Fixed an issue where, when creating a Delivery Cancellation document based on another Delivery Cancellation document, the delivery data was not copied onto the cancellation

### Purchasing

- Fixed an issue in the `Vendor Discounts` screen where, when adding a new discount file, on save the From Date field on the lines took its value from the "To Date" field in the header, and the To Date field on the lines remained empty; the correct behavior is for the "From Date" field in the file's details to read from the "From Date" field if it exists, and the "To Date" field in the file's details to read from the "To Date" field if it exists

### Sales

- Fixed an issue where the `Item Coupons Offer` did not work correctly with multiples
- Fixed an issue in offers - `Invoice Offers`: when creating a free-items offer on the invoice value (on a free item group) and selecting (All Items) in the free item group, applying the offer on the invoice, quotation, or sales order only selected the first item from the free item group

### Accounting

- Fixed an issue where, when creating a `Disbursement Voucher` based on a `Salary Record` and then editing the value on the second or third line, the system automatically deleted the first line; also, when editing a previously saved document and adding new lines and amounts on the lines, the system changed the amount values on the previous lines

### Human Resources

- Fixed an issue where saving a `Combined Leave Voucher` and using the new field (Leave Duration (excluding official holidays and weekends - depending on the leave type)) caused an error
- Fixed an issue where the system did not show the data for shared assets on the Assets page of the employee file
- Fixed an issue for one customer where a salary item was created named (Salesperson Shortfall) that works via a formula (balance of an account from the employee's accounts). When issuing the salary from the `Salary Record`, the system did not calculate the item, but when reissuing the same salary voucher, it calculated the values correctly
- Fixed an issue where, in some cases, deleting a `Work Commencement Voucher` caused an error

### Service Center

- Fixed an issue where, when adding a `Spare Parts Issue Document` based on a `Work Order`, the task and spare parts inside the `Work Order` were inserted without the unit price; the correct behavior is for the unit price to be inserted from the `Work Order`, or, if it does not exist in the `Work Order` and is added in the `Spare Parts Issue Document`, for the unit price to be inserted back into the `Work Order` after the document is saved
- Fixed an issue where the **Customer Contact** field inside the product and Service Center documents, when the contact's code is typed and Enter is pressed, was not added but only selected
- Fixed an issue where attempting to issue a `Gate Pass` document based on a `Work Order` showed the error "**Cannot execute the operation**"
- Fixed an issue where, when deleting a `Service Request` document, it was deleted, but the deleted document still appeared when opening the product screen's product status change summary
- Fixed an issue where, in some cases in the `Work Order` document, adding spare parts in the spare parts table and setting 50% for the customer and 50% for the company, on save the system changed the company's 50% to 100%, causing the error message "**error in percentage distribution for material**"
- Fixed an issue where, in some cases in the `Close Work Order` document, clicking the button to create the customer invoice showed the error message "This employee is not a salesperson". The message was adjusted to read "**Employee *employee name* is not a salesperson**"
- `Work Order`: Fixed an issue where, in some cases, deleting the document showed the error message "**Cannot delete the record because it is used in the Work Order field in the table SrvCProductLastService.dbo**"

### Real Estate

- Fixed an issue where, when creating a `Maintenance Expense Document` based on a `Rent Contract` or an `Opening Rent Contract`, if the contract belonged to a combined unit, the system did not copy the contract's details, i.e. it did not copy the "Property" and "Property Owner" fields
- Fixed an issue where, if a unit is linked to a combined unit and a `Rent Contract` or `Opening Rent Contract` is created on the combined unit, this did not appear on the unit screen's Details page for contracts
- Improved so that when a unit with child units is sold, the children are marked as sold even if the child is indirect — meaning that if there is a building with units not linked to floors, those units are marked with the building's status

### Settings

- Fixed an issue where field help in the help file does not work with the old GUI
- Adjusted some translations
- Fixed an issue where, when opening a window to enter a new record and using the `Quick Creator` feature, then closing the window via the close button or the "Cancel" button, the system did not warn the user about losing data

### Human Resources

- Fixed an issue where the system allowed grouping salary items (from different companies) in salary vouchers, which prevented the voucher from being saved

### Customer Relationship Management (CRM)

- Fixed an issue where, in `Service Contract`, filtering was not applied on payment vouchers as it is in `Sales Invoice`
- `Maintenance Invoice`: Fixed an issue where, when applying Discount 1 on the line as a value rather than a percentage in the spare parts grid `MnInvoiceSparePart` or the services grid `MnInvoiceService`, the system deleted it on save, keeping it only when Discount 1 was entered as a percentage
- `Maintenance Invoice`: Fixed an issue where, when selecting an item in the services grid at the field `item.services`, the item price was not retrieved

### Contracting

- Fixed an issue where, in some cases, in the `Estimated Budget` screen, selecting a standard condition caused an error on save
- `Subcontractor Extract`: Fixed an issue where, when the option "**Consider the accounting percentage when calculating the deduction value**" was checked, an error occurred in calculating the deduction value calculated on the line
- Fixed an issue where, when a real estate unit or building was sold, it still appeared in the `Rent Contract` or `Opening Rent Contract` search table when selecting the "Leased Property" field
- Fixed an issue in `Quotation Budget` where, when there is a main item with more than one main item under it, the total cost for each main item was incorrect
- Fixed an issue where, in some cases, the system did not save the `Cost Execution` document
- `Subcontractor Contract`: Fixed an issue where, in some cases, editing the "Customer" field in the contract was not allowed and showed the message "**Technical error happened**"

### Point of Sale

- Fixed an issue where, when running a report in `Point of Sale`, the date parameter did not work

### Reports

- Fixed an issue in the `Item Quantities in Warehouses` report (`009INV-SYSR`) where the Unit parameter did not work, as the quantities in the report were shown in the item's smallest unit regardless of the parameter selected; also added a filter by Item Section and a filter by Item Brand

### New GUI

- In the `Subsidiary Account Statement` report (`031ACC-SYSR`), the report dimensions (From Account Code - To Account Code) are not adjusted for the New GUI
- The `aggregates` for the New GUI tables do not work
- Fixed an issue where running the `Combined Subsidiary Trial Balance` report from inside the vendor screen showed "No data" the first time it was run; also, if the rerun button was clicked to run it again on the same page, the browser's address bar was replaced with the report's `URL`
- Fixed an issue where, in some cases, after a user logs in, the message "Cannot execute the operation" appeared and the module menu did not show on the right
- Fixed an issue where searching for a specific screen in the top search bar showed many screens the user has no permission to view, and also showed a screen that had been deleted from the company settings menus
- Fixed an issue where the option to view the selected version, found inside `Audit Trail` in the More menu inside any screen, does not appear in the New GUI
