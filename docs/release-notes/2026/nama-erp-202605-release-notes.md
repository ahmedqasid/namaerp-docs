# Nama ERP Release Notes - May 2026

::: info Release Information
- **Release Date**: May 2026
- **Release Number**: Nama-ERP-202605
:::

## Additions

### Inventory

- Added the two fields executedStockQty and remainingStockQty to calculate the executed quantity and the remaining quantity in stock, with a Migration implemented in each of the following documents
  - Sales Invoice
  - Purchase Invoice
  - Sales Returns
  - Purchase Returns
- Added a new button in the Stock-Taking Start document to open a screen and add a Stock-Taking End voucher.
- Added a new option in the term config of Supply Chain documents that adds lines based on those having the same warehouse as the one on the document header - taking into account, for Transfer documents, the warehouse in the From Warehouse field rather than the To Warehouse field.
- Added an option to Warehouses and Locations named "Not Considered When Verifying Reservation Quantities at the Legal Entity Level". Also added two options named "Enable Not Considering When Verifying Reservation Quantities" - one for warehouses and another for locations - to prevent saving the warehouse or location if the user checked this option while not checking the corresponding option in the Supply Chain settings. For more details, you may refer to the document [https://docs.namasoft.com/modules/supplychain/ignore-reservation-qty-check-by-date.html](https://docs.namasoft.com/modules/supplychain/ignore-reservation-qty-check-by-date.html)
- Added the entity flow EAUpdateItemPricesFromPriceList. The flow is used when saving or editing price lists, for the items listed in the price list. Also added a Scheduled Tasks entity flow, "EAUpdateItemPricesFromQuery".

### Real Estate

- Added the Concerned Party Account for Receipt/Payment "concernedPartyAccForRVPV" in the Payments lines of the Sales Contract.
- When creating a Sales Contract, in the last line of the multiple-creation, when selecting to distribute the full remaining value over the number of installments, the value is calculated taking into account the maintenance-cost value or the installments that are not part of the contract value. Improved so that the system does not deduct, along with the rest of the installments, the installments that fall outside the contract cost.
- Improved the Maintenance Expense document by adding a new grid that distributes the expense value over the units of the selected property, so that if the property selected in the header or on the line is a Project, the expense is distributed over all the units belonging to the project by each unit's area divided by the total area of the units in the project - and the same distribution applies if the property is a Square, Block, Property, or Floor.

### Customer Relationship Management (CRM)

- Added the attachments attachment2, attachment3, attachment4, attacment5 to both the CRMVisit and CRMVisitRequest screens

### Purchasing

- Added an option in the Purchase Price Comparison term config named runFieldsMapOnFirstOriginDocFromDetails, to determine copying from the (Copied From Document) field from the first line.

### Accounting

- In both the Receipt Voucher and the Payment Voucher, on the (Invoices) page, in the (invoices) grid, activated the titled property to name it in the legacy GUI.

### Human Resources

- Added an option that respects the fingerprint type inferred from the Work Schedule when pairing check-in and check-out fingerprints within a single shift, instead of only taking the first and last fingerprint.
  https://docs.namasoft.com/modules/hr/attendance-machine-formula.html
- Added 15 reference fields to the Job Section screen.
- Improved the use of Cron for transferring attendance from ZK to Nama. When re-reading according to the duration specified in AttendanceMachineConfig, the system now re-reads the previous two days, and if prior data exists it is deleted and the latest check-in and check-out fingerprints are added.
- Added substantial modifications to the Attendance Voucher. For more details, please refer to the following document:
   https://docs.namasoft.com/modules/hr/ignore-overlapping-attendance.html

### Point of Sale

- Added options named "Add Free Items from Item Offers at Payment" and "Free Items for the Item Must Be Added Before Payment" in the Point of Sale settings.
- Added the Customer field to the lines of the "Point of Sale Payment Methods Settings" file, so that deferred payment methods are hidden for the cash customer.
- Added an option named "Prevent Login Except for the Shift Creator or Someone with Permission to Use Another User's Shift" in the Point of Sale settings.
- Activated the option to print Captain Order invoices along with printing preparation forms, the same way it works with printing the final invoice forms.
- Added odhv in the Tax Authority settings named dontSendAssemblyComponentLines
- Added the option "Redeem Without Otp" in the Reward Points settings.

### Contracting

- Added the ability to create an Analysis Card based on a Contracting Contract template.
- Added a new button to move the terms to an Assay, "Create Assay for Selected Terms", and another button to move the terms to a Project Contract, "Create Project Contract for Selected Terms".
- In the Contracting screens (Contracting Price Quotation - the Contract - Subcontractor Contract - ...), added a new field named "Additional Costs" and another field for the total costs of the terms, so that the total cost includes the additional costs plus the terms' costs.
- In the Standard Term screen, in the Cost Terms lines
  - Set the Cost Term's unit to display the "Contracting Unit of Measure" instead of the item's unit of measure.
  - Added a filter on the units linked to the item on the lines.
- In the Contracting screens, created a mechanism to search by the term's description, so the user can search using a word written in the description.

### Business Intelligence

- Hidden the Dashboard's toolbox by default - shown to whoever wants it.
- Added the ability to "merge" or "shrink" the charts within the Dashboard.
- Added the ability to use complex queries in the report builder tool and the Dashboard, easily, the same way it works with system tables and records. Please refer to the following document:
  [https://docs.namasoft.com/platform/virtual-entity-guide.html](https://docs.namasoft.com/platform/virtual-entity-guide.html)
- Added the **showAsRange** property to enable selecting ready-made date ranges (such as: Today, Current Month, Previous Week) or specifying a manual range (**Manual Range**). When enabled, **Date From / To** is used instead of a single date, with support for input validation and the ability to specify the allowed ranges.
  https://docs.namasoft.com/platform/reports/reports-guide.html
- Improved so that double-clicking the date field opens the date-picker window.
- Improved so that the system remembers the user's choice of whether to use the timeline or not, as soon as the timeline button is clicked.
- Added a new option to show the card list as dots on the dashboard-widget page - "Card List" tab - the option "Show Card Lists as Dots".

### Settings

- Added the option "Enable Preventing a Document Based-On from Being Used When Saving a Draft" in Global Config, to achieve the required behavior.
- Added the option skipIfOnlyCriticalFieldsChanged so that the system does not send (the notification / approval request) if the edit or update occurred exclusively on certain fields inside the grid.
- Linked Loyalty Points in the Nama system with the e-commerce store points existing in the customer's store.
- Below is the link to the required settings for Unifonic to send SMS: [https://docs.unifonic.com/articles/#!api-documentation/hello-word](https://docs.unifonic.com/articles/#!api-documentation/hello-word). Please configure the settings in the Nama system to send SMS compatible with the Unifonic company.
- Reactivated the integration with the Nami company for payment using the attachment.
- Added the Tax Policy to the MnMaintenanceService screen
- In (DashBoardGroup), added a Security Profile file and Constraints, to allow access to the Dashboard for certain users or specific permission groups.
- Added the ability to force users whose password has not been changed for more than a specified period (45 days, for example) to change it. Please refer to the following question:
  https://ask.namasoft.com/questions/10010000000000314/

### Service Center

- Added 5 date-and-time fields (dateTime4, dateTime3, dateTime2, dateTime1, dateTime5).

### Mobile Applications

- Added Contacts to the Delivery Voucher.
- Added a screen in the mobile app named "Assign Delivery Documents".
- In the Electronic Receipt Voucher term config, added:
  - Installments Effect
  - Do Not Apply Installments Effect
- Added an option in the Aggregator App settings named "Disable Fingerprint Login on Mobile".
- The following data is now taken into account for the Pending Delivery, Assign Delivery Documents documents, in the document's external display in the app, via the Mobile Entity Title Modifier
  - Term
  - Code
  - valueDate
  - delivStatus
  - description1
  - description2
  - description3
  - deliveryDate
  - customer
  - shippingAddress.city
  - shippingAddress.district
  - ref4
  - branch
- Added a field named "List Name in the App" in the Mobile Entity Title Modifier screen

### New GUI

- Added an option to control the display of the rows total.
- Added an option to control how cells are selected.
- Improved so that double-clicking the date field opens the date-picker window.
- Improved the design of the Approvals window, so that the decisions are shown as buttons instead of an options list, and moved the attachment to be after "Approval Reason".
- Changed so that when navigating from field to field within the screen using the Enter key, select all is performed inside the field, exactly as when using the TAB key.
- Implemented some technical screens for editing screens - migrating report editing from the old form to the new one and improving its capabilities

### Reports

- Added the field Evaluation Time to the Header Component grid
- Added the ability to use data sources as the main table in the report builder tool and the print-form builder tool, via Virtual Entity
