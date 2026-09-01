# Nama ERP Release Notes - April 2025

::: info Release Information
- **Release Date**: April 2025
- **Release Number**: Nama-ERP-202504
:::

## Additions

### Inventory

- Deleting a system-generated Warehouse Receipt Voucher or a system-generated Warehouse Issue Voucher from the list screen was prevented.
- In the Assembly Request (AssemblyRequest), an option was added via the term config to reserve quantities from the withdrawn items.
- In the AssemblyRequest screen, using the Sales Order in the Based On field was allowed.
- In the "Car Status Change Movements" block on the Statistics screen of the Sub Item file, the Document Type (EntityType) column was added.

### Sales

- In the Final Product Pricing document, saving the document without details was allowed.
- Attachments were added on the second page, "Item Grouping", of the Sales Price List screen.
- An option named "Consider the Actual Date from the Based On Document When Calculating Prices and Offers" was added to the Sales term configs.

### Purchasing

- A Groovy entity flow was added that copies the details.n1 field on the Purchase Invoice to the sizesAndColors.n1 field on the item when the invoice is saved.
- Attachments were added on the second page, "Item Grouping", of the Purchase Price List screen.

### Accounting

- The ability to display the new Riyal symbol in Nama was added.
  Add an image to the report, make the expression as follows:
  NamaRep.sar()
- In the Exchange Rate Change Voucher, a new option was added to consider balance sheet accounts only, not the income statement — the option "Include Income Statement and Other Accounts" was added to the Exchange Rate Change Voucher term config.
- An option named "copyLocalAmountFromHeaderToLinesAmount = Copy the Local Amount from the Voucher Header to the Line Amount" was added to the Receipt & Payment term config.

### Banks

- The option "Reverse Installments Effect" was added to the term config of the "Cancel Financial Paper" voucher.

### Manufacturing

- When selecting the Production Order in a Raw Material Issue, the system was improved so that it brings down the batches and quantities found in the Production Order onto the line, in the Product Components tab.

### Settings

- A button named "Collect Operation Logs (Application Logs)" was created. It was added in Nama on the utils.html page.
- Unified Number fields were added under the tax information data on the Customer screen, and the integration with the Wathq platform was changed to go through the Unified Number instead of the Commercial Registration Number.
- The Grid Dashboard was enabled in the New GUI, taking into account activating the grid's own filters, as well as the ability to export the data to Excel.
- The option "Prevent Deleting a User Linked to Entity System Entries" was added in Global Config, for emergency cases.
- A button named "deleteUnusedLayouts = Delete Unused Layouts" was added to the More menu of the screen-editing window.

### Human Resources

- A new document named "Attendance & Departure Zone Exception" was added; when this voucher exists for an employee, no objection is raised when a check-in or check-out occurs outside the zones.
- In the Leave Balance Adjustment voucher, a button was added to group employees, with filters like the Salary Register screen; a Leave Type field and an Added Balance field were also added in the header. When a specific leave type is selected and the added balance is entered in the header and Group Employees is clicked, lines are created for all employees matching the filter, with the same leave type from the header and the added balance from the header applied to every line.
- An accounting effect was added for the Group Bonus voucher.
- A new group was added to the Human Resources settings named "Ignore Electronic Attendance When Calculating Salaries and Attendance Information", including the following options:
  - Ignore only the electronic attendance vouchers that match the criteria.
  - Ignore electronic attendance for employees who match the criteria.
  - Ignore electronic attendance for employees who match the query.
  - Ignore only the electronic attendance vouchers that match the query.
- In the (Work Schedule Plan) screen, the following fields were added: "priority, fromDate, toDate" in the list screen for display, filtering, and sorting.
- The field numberOfHoursAllowedBeforePreventingCheckOut was added inside the AttendanceShift document, to set the total hours allowed for the shift in order to save the electronic attendance document.
- 5 attachment fields were added to the Job Opportunity screen.

### Mobile Applications

- A new screen was added for changing the password.
- In the Mobile Applications settings, a field named "Mobile Settings Code" was added.
