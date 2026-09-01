# Nama ERP Release Notes - December 2016

::: info Release Information
**Release Date:** December 2016  
**Release Number:** 201612
:::

## Additions

### Inventory
- Added **Brand** to the Item file.
- Added an option in the distribution management settings to make the **cost source take priority** over the current average cost for uncosted receipts.
- Added the field **"Version"** to the color/size lines in the Item file, to link a color/size or a group of colors/sizes to one or more versions; based on that, a filter is applied on warehouse document lines based on the version being recorded first, then only the colors/sizes linked to it; if there is no link in the Item file, all colors/sizes appear.
- **Item file:** Added the **"Default"** option to the color/size lines, as is the case with versions.
- **Stock Receipt Voucher:** Copies the subsidiary from the vendor when the user leaves it empty.
- Added the option **"Calculate the temporary cost based on (the Purchase Order)"** to the Stock Receipt Voucher term config.
- **Processing Voucher:** Added **"Warehouse"** to the lines of all screens on the document.
- On the Auxiliary Materials screen in the **"Assembly Machine"** file, the item code does not work, as items cannot be searched by it because it is a text field.
- **Item file - Keywords page:** Added the **"Reverse Delete State of Lines"** button to control the **"Delete on Save"** option on all lines.
- Added a file for defining **Seasons**.
- Added a screen inside the Machine file called **"Auxiliary Materials"**, containing the same lines as the Auxiliary Materials screen in the **"Processing Voucher"** document, and its standard data is pulled in as soon as the machine is selected in the Processing Voucher, while the user can enter actual data alongside it on the same line, as is the case on the indirect costs screen (standard value / actual value).
- Added the **Assembly Machines** file, whose auxiliary materials and indirect costs information can be pulled into the Processing Voucher.
- Introduced deep modifications to the **Tenders system**.
- Improved so that **"Stock Location"** files can be coded outside the **"Warehouse"** file.
- Moved the **"Machine"** field to the main screen in the **"Processing Voucher"** document.
- Improved the **item search screen** in Point of Sale to show the number of items.
- Added the **"Grouped Payment Requests"** document.
- Added a list called **Purpose** on the **"Grouped Payment Requests"** document, containing the options (**Purpose 1, Purpose 2**...).
- In the Payment Request and Receipt Request, added **the Account** to the details, to choose a subsidiary account or the account of the subsidiary (**Main - Account 1 - Account 2**...).

### Purchasing
- An error sometimes appears on the Vendor window - Archival Documents page.

### Sales
- Added a field on the Sales Invoice screen to enter the **Amount Paid** by the customer, and another cell to show the **Change**, which is the amount to be returned to the customer (these cells update as soon as they are entered and do not require clicking the Save button).
- **Sales Invoice details:** Improved so that when searching for a color/size, the system displays **code + name**.
- Added an entity flow so that creating a **Sales Quotation** automatically creates a **Sales Invoice**.
- Added **3 refs** to the Sales Invoice lines.
- **Customer file - Keywords page:** Added the **"Reverse Delete State of Lines"** button to control the **"Delete on Save"** option on all lines.
- Created the **"Create Stock Location"** button inside the **"Customer"** file to create a **"Stock Location"** linked to the customer.

### Banks
- Added the option **"Bank deposit always changes the paper's bank account"** to the accounting settings.
- When coding a financial paper from within a Receipt Voucher, improved so that if the paper's code is empty, it is copied from the cheque number.
- **Letter of Guarantee Amendment:** Added debit and credit for the previous values of the term config for all existing values (**Coverage - Fees**).
- **Letter of Guarantee Amendment:** Added debit and credit for the amendment fees.
- **Letter of Guarantee Termination:** Added the option **"Shorten Entries"** to the document's term config, so that only the difference is posted.
- **Letter of Guarantee Termination:** Added **Letter of Guarantee Termination Fees**, which has an accounting term config.
- **Letter of Guarantee Request:** In both (**Coverage - Fees**), the percentage does not affect the amount and likewise the amount does not affect the percentage.
- Added another (**optional**) effect to the Closing term config, being (**debit and credit the letter's value**).
- Added an **Opening** file dedicated to Letters of Guarantee.
- Added a field to the guarantee files called **"Guarantee Type"**, containing the options (**Initial Guarantee, Final Guarantee, Advance Payment Guarantee, Customs Guarantee, Other 1, Other 2, Other 3**).
- Improved so that the **Letter of Guarantee Type** is placed in the Issuance term config, and saving is prevented if the type differs from the letter type inside the issuance voucher. That is, a term config was created for each type with its own accounting effect.
- Added **different effects** for the Letters of Guarantee Opening document, since more than one Letter of Guarantee can exist in the same document.
- **Financial Paper Cancellation document:** Improved so that when the related subsidiary is edited in the document header, it is edited in the lines as well.
- Showed the **Letter of Guarantee details** for coverage and fees on the (**Delivery, Receipt, and Termination**) documents.

### Contracting Maintenance
- Added a dropdown list of equipment types containing (**Company Equipment, Rented Equipment, Owner's Equipment**).
- Linked equipment to assets, so that company equipment is linked to assets, and if the asset has a maintenance plan it is transferred to the equipment.
- Inside the Contracting Maintenance settings, added the option **"Equipment types allowed for assignment"**, allowing selection of the equipment types that can be assigned to contracts.

### Letters of Credit
- Added the ability to **record a Letter of Credit opening commission** on the Letter of Credit opening screen and create an accounting entry for it.
- Improved the **Letter of Credit Opening Request** to contain additional data.

### Contracting
- When issuing a Subcontractor Contract based on a Customer Contract, allowed the quantities entered on the Items page to be greater than the quantity contracted with the customer.
- On the **Subcontractor Execution** document, added the field **"Contractor"**, which retrieves the name of the contractor linked to the **"Contract"** referenced in the document, and added the field **"Customer Contract"**, which retrieves the customer contract linked to the **"Subcontractor Contract"**.
- On the **Subcontractor Execution** document, improved so that it accepts execution quantities exceeding the quantities of the customer contract linked to the **"Subcontractor Contract"**, and also the **"Subcontractor Extract"**.
- **Assay document:** Added a field called **"Uniform Line Discount"**, so that when a percentage is entered into it, it is automatically applied to the lines in the **"Reduction Percentage"** field, and the reduction value is calculated automatically.

### Project Management
- Added a field that accepts (**numbers**) called **"Deliveries"** to both the Phases and Disciplines files (also to the phase and discipline lines within the Project file).
- Added both (**Phase - Discipline**) to the **"Task Execution"** document, in the Details, so results are filtered by the phases and disciplines that exist in the project only.
- Added a screen to the **"Project"** file called **"Work Team"**, containing details that accept an employee, so that any employee on this screen is allowed to record a **"Task Execution"** document in cases where **"Tasks"** have not already been assigned.
- Added the field **"Project"** to the header of the **"Task Execution"** file, in case the employee wants to create a single document for all their tasks on the same project, so the project is copied to any new line automatically.
- Inside the **"Task Execution"** document, filtered the search results so that only projects belonging to the employee are shown, and only the phases and disciplines belonging to the project/employee are shown.
- **Project file - Phases:** Added `date1,date2,text1,text2,n1,n2`.
- Added the two states (**Approval, Hold**) to the Project status list.
- **Project file:** Made the **Contract Value in Local Currency item** calculated automatically as the Total Contract Value × the rate.
- Added the **Estimated Budget** (**Phase / Discipline**) to the phase and discipline lines.
- Added **"the Estimated Budget and the Loaded Standard Costs"** to both the Phases and Disciplines files.
- **Task Execution voucher:** Added two reference fields (**ref1, ref2**), not shown on the screen.
- **Task Type file:** Improved so that **"Project Type"** is not among the required fields.
- **Task document:** Improved so that **"Project Subtype"** is not among the required fields.
- **Task Execution document:** Improved so that **"Task"** is not among the required fields.
- **Project file:** Added the field **"Responsible Employee"** to the line screens of both **"Phases"** and **"Disciplines"**.
- Added both (**Phase - Discipline**) to the **"Expense Voucher"** document, in both its header and details, so that results are filtered by the phases and disciplines that exist in the project only.

### Real Estate
- Prevented editing the Collection document in cases where the contract has been terminated or assigned, in both the Rent Contract and the Sales Contract.
- Added the fields (**Insurance Value, Maintenance Value, Water Expenses, Brokerage Fee, Buyer**) to the Grouped Contracts voucher.
- **Real Estate Expense Items window:** Added an account to the item screen, and also showed the account in the details of the Maintenance Expense screen as soon as the expense is chosen, so it can be chosen as the line subsidiary in the accounting term config of the Maintenance Expenses screen.
- **Task Execution screen:** When adding a document, the time appears incorrectly in the (**From**) time field on the document's lines.
- In some windows, when searching for an owner, both the owner and the tenant appear.
- Added a button inside the **Rent Contract** to create a Receipt Voucher, similar to Sales Contracts.

### Accounting
- Improved the **Receipt and Payment Voucher** so that when the voucher is linked to a Receipt Order or Payment Order, the link is either a single one-time link or by the amount recorded on the receipt or payment order, so that the payment order or receipt order no longer appears.
- **Closing Entry:** Added the option **"Close all periods for the fiscal year"** to the Closing Entry.
- Added the field **Seasons** to sales budgets, in both the window header and the details.
- Added a state to payment requests called (**Deferred**), in addition to Accepted and Rejected.
- Added a screen for **adjustments** to trial balance accounts.
- **Profit Distribution document:** Added the field **"Management's Share of the Partner's Profits"** to the lines, placed after the additional expenses field, called (**Management Share Account**), where a number is entered so the management percentage is calculated from it; if nothing is entered, the management percentage is calculated from the partner's profits as it is now.
- No longer allowed saving a Miscellaneous Invoice without a currency, since the currency and its rate must be specified.

### Customer Relationship Management (CRM)
- Added two buttons to Development Requests so the status can be changed directly to **"Awaiting Technical Support Reply"** and **"Awaiting Development Reply"**.

### Human Resources
- Added the field (**Permission Type**) with the choices (**Departure Permission, Lateness Permission, During-Work Permission**).
- Added a field dedicated to the employee on the **"Manual Indicator Values"** window, so entered indicators belong to a specific employee instead of choosing them in the details.
- Added the **"Workplace"** file.
- Added the **"Update Workplace"** document.
- **Payroll Records screen:** Added the filters **"From Workplace"**, **"To Workplace"**.
- Added the ability to clear **From Date** if the From Time is empty, and likewise clear **To Date** if the To Time is empty, via an entity flow, so that the **"No attendance/departure fingerprint recording"** scheme can be applied; the following entity flows were added for this:
  - `EAClearToDateIfToTimeEmpty`
  - `EAClearFromDateIfFromTimeEmpty`
- Added the ability to **edit the hire date** through an Employee Data Update voucher.
- **Employee Management:** Increased the subsidiary accounts to 20 accounts, like the rest of the subsidiaries.
- Created a mechanism **for entering the opening balance of employees' leaves**.
- When the leave balance calculation is based on the start-of-work date, and a leave voucher is created a second time for a type that has no balance, for example (**Sick Leave**, which is usually a day or two and does not require changing the employee's status and has no balance), the system does not accept saving the leave voucher until a Start of Work voucher has been created.

### Point of Sale
- Developed a **dedicated Point of Sale system**.
- Added **Printer Name** and **Drawer Open Command** as two fields inside the Point of Sale machine.
- Added the option **"Transfer payment and receipt vouchers upon saving"** inside the Point of Sale settings.
- Added the ability to **search for a Sales Invoice** on the Sales voucher.
- Added two shortcuts **to remove the invoice discount** and item discounts.
- Prevented the user from entering **negative values** in numeric fields.
- Improved so that the **total discounts applied** to the items listed in the Point of Sale invoice details are displayed.
- Developed a field to display the **total taxes applied** to the items.
- Improved Point of Sale so the system switches **to a point invoice** after the shift is closed.
- Improved so that the **default payment method** is the first payment method among the payment methods shown when opening and closing the shift.
- Reordered the fields on the Point of Sale permissions window.
- Developed a dedicated field for the remaining amount on the Payment window.
- Added a permission **to edit the discount**.
- Added a permission **to edit the tax**.
- Added a shortcut **to remove all discounts** on the invoice.
- Added a shortcut **to remove all applied taxes**.
- Added a **shortcut key** to edit the quantity of the current line.
- Added a permission **to edit the sales representative** to the Point of Sale permissions.
- Improved so that the **TAB** key navigates between fields.
- Improved so that the **Enter** key moves the cursor and adds a new line.
- Showed the **Point of Sale icon logo** instead of the Java logo present in previous releases.
- Added the ability to place a **selection for the lines to be deleted** in Point of Sale, in the invoice, the exchange, or the returns.
- Added the ability **to edit the remark** on returns.
- Added an option **to auto-maximize the Payment window** (**Screen Full**).
- Added a field **for the remaining quantity** when paying by Visa.
- Added the ability **to control the fields** that appear when searching for the customer.
- Improved the Payment screen so the change value is clearer.
- Added the ability to add a **sound clip that plays on payment**.
- Showed the **seller's name** at the top of the screen and hid the field from the header.
- Added the ability **to edit the remark** inside the invoice.
- Added the ability **to link a print template to the user** in Point of Sale.
- Added the ability **to disable the Point of Sale user** from logging into Nama.
- Adjusted the size of the text shown during payment to avoid it being displayed as dots on some devices with different screen sizes.
- On the Payment screen, improved so the system goes back when **ESC** is pressed.
- Added the field **"Hours added to the last shift"** to the Point of Sale settings.
- Changed the title of the field **"Add quantity fields"** to be **"Show total quantity"**.
- Removed the action for adding a new invoice via **F4**, since the **ESC** key performs the task.
- Added the ability **to display item images** inside Point of Sale documents at the line level when hovering the mouse over the item code, and not inside the lines themselves, as well as displaying item images at a clear size inside the Point of Sale document header.
- Added the ability **to post a specific invoice** from Point of Sale to Nama for printing purposes without waiting for the shift to close.
- Added a remark field to the Payment window and the Multi-Payment window.
- Moved the invoice value's position to the top of the window.
- Improved so that the release number is only shown using a shortcut key.
- Improved the shortcut key icons so the action associated with them is shown alongside them.
- Improved the system so that navigation between fields can be done using **"Key TAB"**.
- Introduced options in the system settings to hide some action icons on the touch screen (**Touch screen**).

## Settings

- Added **"Add as Draft"** to the **"With Action"** list on the entity flow window.
- Added the ability **to hide the existing buttons** inside screens.
- Added the ability to define the **book code using the auto-coding formula method**, so the prefix changes according to specific conditions.
- Showed the **Point of Sale icon logo** instead of the Java logo present in previous releases.
- Added the ability to place a **selection for the lines to be deleted** in Point of Sale, in the invoice, the exchange, or the returns.
- Added the ability **to edit the remark** on returns.
- Added an option **to auto-maximize the Payment window** (**Screen Full**).
- Added the field **Remaining Quantity** when paying by Visa.
- Added the ability **to control the fields** that appear when searching for the customer.
- Improved the Payment screen so the change value is clearer.
- Added the ability to add a **sound clip that plays on payment**.
- Showed the **seller's name** at the top of the screen and hid the field from the header.
- Added the ability **to edit the remark** inside the invoice.
- Added the ability **to link a print template to the user** in Point of Sale.
- Added the ability **to disable the Point of Sale user** from logging into Nama.
- Adjusted the size of the text shown during payment to avoid it being displayed as dots on some devices with different screen sizes.
- Added a property **to choose** (**ignore login dimensions, or/ignore document dimensions, or/ignore both together**) inside the field filtering screen.
- Added a new capability to screen editing: **Computed Fields** (in editing a list layout), which can be used to add any computed text, and a query can also be made and its results shown in a column.
- Added **"Pre-Save Effects"** to the **"With Action"** list on the entity flow window.
- Added an entity flow that extracts a document and its linked record and re-saves them.
- Added a settings option that allows adding a list of specific documents, which are the only ones for which quantities are shown and searched.
- Created a method similar to **File From Recommit**, which deletes specific documents or files in a given file while ignoring errors and placing them in a separate file, saving preparation time for the actual go-live work after training.
- Added the option **"Do not use the description in a title"** to Global Config.
- Added the ability to perform a **Recommit** on documents that have been reviewed.
- Developed the entity flow `EASetFieldByTemplate`.
- Added the option **"Allow leaving the warranty code empty"** to the distribution management settings.
- Improved notifications so that when the targets (**record creator**) are chosen, the message is sent to the mail on the user, not on the employee.
- Added the field **"Hours Added to Time"** to Global Config.
- Changed the way notifications are written so it becomes easier to create notifications in an organized, uncomplicated way, without requiring preparation and technical support staff to know HTML.
- On the **"Fields and Screens Settings"** document / the **"Allowed Field Values"** screen: added a column with a **Check box** for the **"Dimmed - Inactive"** property, to prevent the user from entering any data manually/optionally, with the value of these fields updated by other documents.
- Added the option **"Use French instead of English"** to Global Config.
- Added the option **"Ignore the draft suffix"** to the field configuration details in Fields and Screens Settings.
- Added the search method in the code and the Arabic and English name for all system files and documents in Global Config, under **"Search Settings"**, as follows:
  - Code search parameter
  - Arabic name search parameter
  - English name search parameter
- Added the shortcut **Insert + Shift**, which copies the line to the following line.

## Reports
- Improved so that when the edit-dimensions selection in the report inputs on the report definition is left empty, the edit-dimensions selection in the report inputs on Global Config is used instead.

## General Improvements
- Prevented saving any voucher, of whatever type, on any company for which no chart of accounts has been specified.

## Fixes

### Inventory
- When doing a **quantity follow-up** on a Purchase Order document and following up the linked quantities in the Stock Receipt document, then doing a receipt based on the Purchase Order and deleting the Purchase Order from **"Based On"** in the Receipt Voucher, the system does not accept creating another document on the same Purchase Order and considers the quantity insufficient.
- Even though an item is marked as **not sellable**, it still appears on sales invoices.
- When creating a Receipt Voucher based on an Inspection Voucher, the system places the **total quantity** instead of only the accepted quantity.
- In the Assembly document, the cost is calculated incorrectly due to the extra cost not being divided across the receipt lines, and the total value of payment vouchers being added to all receipt lines.
- **Tenders - Operation and Maintenance Items:** Searching in the modified item does not work, and re-saving a tender that has already been entered shows an error message saying there are no operation and maintenance items.

### Sales
- Sometimes, when using the **Group Shipments** button, grouping does not happen correctly and the net quantity is not calculated correctly.

### Accounting
- When linking the Receipt Voucher term config to a till, specifying the till, and choosing the term config in the Receipt document, it is not copied into the document.
- **Payment Voucher:** After activating the **create financial paper** feature inside the Payment Voucher from the accounting settings, when the financial paper is created the system asks for the code even though the book (**auto coding**) was entered, and the cheque number was also entered.
- **The relevant party** is not copied from the related subsidiary and the amount, even though they were entered on the voucher.
- When issuing a financial paper and then creating a Payment Voucher from within the financial paper, an empty error appears when saving the Payment Voucher. Likewise, the financial paper's value or due date does not appear on the financial papers page.
- Even though the option **"Allow leaving the subsidiary type empty in subsidiary accounts"** is checked in the accounting settings, the system allows the user to leave the subsidiary empty when making any movement on the account.
- There is an error when approving lines, as it issues a Payment Voucher for all lines (there is no way to select the lines for which a voucher should be issued). Improved so that when clicking Issue Payment Voucher, the system issues a payment voucher for all lines except the rejected ones.
- A Payment Voucher cannot be created based on a Sales Order.

### Banks
- When creating a bank notice for a financial paper with a temporary rejection, then creating a new bank deposit for the same paper on a bank different from the bank the old deposit was made on, the error (**the bank account is not compatible with the bank account on the financial paper**) appears.
- Nama allows the user to **cancel a financial paper** for an issued paper whose status is **collected**.
- When creating a template containing a (**boolean**), the template does not copy the checked checkmark, for example the **Disable Advance voucher**: when the field **"Disable advance"** is checked and then a template is created, the mark is not copied to the template.
- On all Letter of Guarantee screens, the guarantee type is not copied automatically as soon as the letter is retrieved (**Issuance - Amendment - Delivery - Termination**).

### Settings
- When creating **descriptors** with **"Use description in search only"** selected, the descriptors appear in full in the field value upon selection.
- The system does not allow re-saving a **document book** after changing its type, in cases where no movements have been made on it.
- **"Notification Definition" screen - "Targets" group:** if linked to the **"Field"** type, it does not send SMS messages or emails.
- **Field permission** does not work with the document code field.

### Project Management
- In the **"Task Execution"** document, the system prevents saving in cases where a task is executed for an employee who has not been assigned a **"Task"**.
- **Project file - "Disciplines" screen:** The system accepts entering disciplines whose percentages add up to more than **100%**.
- Added two reference fields (**ref1, ref2**), not shown on the screen.

### Customer Relationship Management (CRM)
- An error occurs when browsing Development Requests while filtering by the analytical group.

### Human Resources
- When choosing element types in the **Salary Structure**, the **default calendar** is not copied even though it exists on the element type.
- When creating a **Job Offer** or a **Bulk Job Offer**, the system edits some of the fields on the Employee file incorrectly.
- When creating a **Bulk Job Offer**, the **payroll calendar** is not inserted even though it was saved on the element type.
- An error sometimes appears when browsing **archival documents** on the Employee screen.
- If **"Allow exceeding the leave balance"** is not selected on the leave type, the system does not show the remaining balance on the Employee screen.

### Point of Sale
- When adding a customer to a Point of Sale invoice and then deleting them, the system still shows this customer when switching to English, and vice versa.
- When entering a credit value, the system does not respond to the user, as it does not subtract the credit value from the cash value.
- When closing Point of Sale via the **"Exit"** button, another user can log in and continue the shift.
- The system does not show appropriately sized window elements when working on a 15-inch laptop.
- The user can enter a **batch** number on a returns invoice, while this number does not exist on the sales invoice that was returned.
- Errors occur when entering a discount percentage on the invoice that contains decimal numbers.
- When performing the following steps:
  - Entering an item with a value
  - Pressing **(-)**, the system converts the item's value to a negative value
  - Pressing **(-)** again, the system converts this negative value to positive
  - Using the **(F5)** key to pay, the system shows a message that saving cannot be done with a zero or negative value
- Sometimes, the number of decimal places for the currency does not match the number of decimal digits allowed in the values.
- Payment methods are not ordered correctly in Point of Sale.
- The cursor does not move correctly (**TAB Order**) on the Receipt and Payment windows.
- The cursor does not move correctly (**TAB Order**) on the login window.
- The user can recall a **suspended sales invoice** in Sales Returns.
- The system does not allow deleting a **suspended returns invoice**, and as a result the shift cannot be closed.
- The user can **close a shift** while a Point of Sale invoice is still open.
- When entering the price manually and then changing the quantity, the system deletes the item's price.
- In some cases, the system allows the user to delete an invoice line even though they have not been given permission to do so.
- On the Multi-Payment window, when entering a value in the Visa field, the system does not subtract the Visa value from the cash value.
- There is no **correct alignment** for some of the Sales Invoice header fields.
- **The cash payment method in the default currency** does not appear as the first payment method on the shift (**Open/Close**) window.
- Improved so that the **Enter** key moves the cursor and moves to a new line.
- The system does not prevent the user from viewing old invoices while an invoice is open.
- **On the Exchange invoice**, when a negative quantity is entered, the system deletes the price.
- When retrieving invoices on the **"Returns Invoice"** and **"Exchange Invoice"** windows, the system does not subtract the negative quantities from the positive quantities.
- Point of Sale returns are no longer transferred to Nama.
- When editing the **sale price** after entering it and moving to the adjacent field, it is not affected by the edit.
- **On the Returns invoice**, the system does not accept a short number such as **(12)** for the Sales Invoice instead of the full code such as **(11110012)**.
- When editing an item's discount, the system edits the invoice's discount.
- The user can **suspend an old invoice**, then pay it again.
- When issuing an **Exchange invoice** without inserting the exchanged invoice in the invoice header, the system does not issue a **Sales Invoice** for the positive items and a **Returns Invoice** for the negative items.
- The system does not transfer the **Exchange invoice** to Nama.
- **On the Exchange invoice**, the system does not allow the user to transfer a **Returns Invoice** or a **standalone exchange** to Nama.
- **On the Exchange invoice**, the system does not allow **exchanging part of the quantity** of the item.
- The user can issue an **Exchange invoice** and then delete all its items, which then prevents users from exchanging this invoice afterward.
- **On the Exchange invoice**, the system does not accept a short number such as **(6)** for the Sales Invoice instead of the full code such as **(3111006)**.
- When deleting the last line **on a Sales Invoice**, the system does not delete the corresponding line in the invoice header.
- The message **("Exchange not allowed after 1 Days")** is wrong; the correct wording is **("Exchange not allowed after 1 Day")**.
- After the user locks and unlocks the screen, **the screen appears dimmed**.
- Pressing **double-click** on the item search screen and then pressing the **ESC** key leaves the list still showing.
- When moving to a **new invoice**, the previous invoice's item image remains showing.
- Pressing **ESC** in the item entry field does not delete the item.
- A problem appears when closing and reopening the program (**the program is already open**), requiring a wait of about a minute and a half.
- **Point of Sale invoices** are no longer transferred to Nama.
- When configuring **Point of Sale** to group invoices, the system transfers only one invoice.
- Sometimes, the **discount button** does not work, as it does not activate the discount field on the invoice.
- Sometimes, the system does not insert the **item unit** on the first login to Point of Sale.
- When entering a positive value **on the Exchange invoice**, the system adds the invoice value to the credit line on the shift.
- **On the Returns invoice**, when the invoice to be returned is entered, then the interface is switched from Arabic to English or vice versa, the system permanently hides the value of the invoice to be returned.
- When performing a **screen lock** via **F11**, the invoice data is no longer shown dimmed.
- **Viewing an Exchange invoice**, the system does not show the returned items in red.
- The two shortcuts **(-,+)** do not exist on the Help window.
- No error appears when attempting to **pay an old invoice** via the Payment window.
- The **Point of Sale search screen** does not work like Nama's own search screen, as it only shows 20 items.

### Letters of Credit
- **Letter of Credit Assignment voucher:** When closing the value of the expenses on the Letter of Credit with the total value of the expenses on the Letter of Credit, the value of the advance payment is ignored, even though it created a system journal entry from the Letter of Credit opening document.
- **The accounting term config** for the Letter of Credit opening commission reverses the entry (the debit value is reversed with the credit value).

### Manufacturing
- When **automatic creation of the raw material issue voucher** is activated during creation of the Execution voucher, the error (**the finish date cannot be left empty**) appears even though the finish date exists on the product components inside the Production Order.
- When **automatic delivery of the finished product** is chosen in the Execution voucher, the error (**the quantity cannot exceed ×××××**) appears.
- **Production Order - Linked Documents page:** Added the received quantities to the list dedicated to quantities.

### Real Estate
- **Opening Rent Contract:** Pressing **double-click** on the owner or tenant field shows all owners and tenants, while the correct behavior is that opening the tenant field shows only tenants, and opening the owner field shows only owners.
- When choosing **"Based On" a Rent Contract** or an Opening Rent Contract, sometimes the program copies the details of the chosen contract and sometimes it does not.
- In the details section of the **Grouped Contracts vouchers** screen, entering the brokerage fee value or the insurance value and the rest of the values on the line does not affect the percentage field.
- On the Building screen, the owner is not copied if it is **"Based On a Block"**.
- An error sometimes occurs when saving a **Sales Contract**.
- The system allows changing the **installment code** inside Sales Contracts even though movements have been made on it.
- When searching for the **Opening Sales Contract** from within any document via the lens, by any user without full permissions, an empty error message appears.
- If an **Assignment voucher** is deleted and another **Assignment voucher** is added on the same unit, an error message appears saying the owner cannot be changed because there is no owner inside the unit.
- On the **Real Estate Price Lists** screen, when a specific unit is chosen, the system does not copy the rest of the details automatically at the line level.
- On the Block screen, when a specific **square** is chosen, the system does not copy the project automatically; likewise on the Building screen, when the block is chosen, the program does not load the block and the rest of the data automatically; likewise the unit, when a building is chosen, does not show the rest of the details automatically, nor does the unit model.

### Letters of Credit
- **Letter of Credit Opening document term config - Accounting Effect:** The debit and credit term config is reversed.
- **Letter of Credit Opening document term config - Accounting Effect:** There is an error in the translation of the field `lcOpenFeesCredit`, as the correct translation is **"Credit - Letter of Credit Opening Commission"**, not **"Debit - Letter of Credit Opening Commission"**.
- Some fields are not copied when creating a **Letter of Credit** based on a **"Letter of Credit Opening Request"**.

### Fixed Assets
- An error sometimes occurs when performing an **Ending of Fixed Assets Count**.
- **Fixed Asset Receiving screen:** When receiving an asset, choosing the location, and saving the document, it does not affect the Asset screen; the correct behavior is to copy the effect into the Location field inside the Asset screen.

### General Fixes
- A technical error sometimes occurs when trying to open the system.
- Nama allows the user to delete a document whose status is **Cancelled** (cancelled via a Cancel Document document).
