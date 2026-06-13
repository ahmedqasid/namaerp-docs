# Nama POS — Technical Points of Use Guide

Nama ERP is a web-based system, but its **Nama POS** module includes a dedicated **desktop application** for Points of Sale (POS), offering both online and offline capabilities:

* POS operates offline using a local POS database.
* It automatically syncs with the Nama ERP central database.
* Integrates with payment terminals, including an embedded credit-card processor for mobile phones.
* POS functionality is available on Android and iOS via the **Captain Order** mobile app.

## Nama POS Pole Display Configuration Using Tempo


---

## POS Pole Display Setup

To configure a pole display for Nama POS, follow these steps:

1. Go to the **"Pos Pole Display Specs"** screen.
2. Set:

* **Communication Type**: e.g., Serial, USB.
* **Printer Name or Port Number**: to define the connection interface.
3. Link the pole display configuration to a machine by setting the **"Pos Pole Display Specs"** field in the machine record.

---

## Displaying Data on the Pole Display

Nama POS allows defining **template-based messages** for different events in the sales process. Templates are configured in the **"Pos Pole Display Specs"** screen.

### Supported Functions

* **Clear Line:**

```
@CLEARLINE@
```

Use it to clear one line on the pole display.

**Example:**

```
@CLEARLINE@@CLEARLINE@ Welcome
```

Clears two lines, then displays: `Welcome`.

* **Last Modified Line:**

```
{lastModifiedLine}
```

Use this to get the most recently added invoice line.

**Example:**

```
{lastModifiedLine.qty.value}
```

Gets the quantity of the last added item.

---

## Pole Display Templates

### Idle Template

Displayed when the POS is idle, before any invoice is created.

```
@CLEARLINE@@CLEARLINE@**** Welcome to Register {name2}
```

Clears both lines and shows a welcome message with the register's name.

---

### Line Adding Template

Displayed when a new item is added to the invoice.

```
@CLEARLINE@@CLEARLINE@
{padleft(20)}Item: {lastModifiedLine.item.name2}{endpad}
{padleft(20)}Qty: {lastModifiedLine.qty.uom.name2} - {round(lastModifiedLine.qty.value,0)}{endpad}
```

Shows item name and quantity info, padded for alignment.

---

### Total Template

Displayed when the Tender screen is opened (before payment).

```
@CLEARLINE@@CLEARLINE@
{padleft(20)}Total: {round(netPrice,2)}${endpad}
```

Displays the invoice total amount.

---

### Remaining Template

Displayed after the customer pays and change is calculated.

```
@CLEARLINE@@CLEARLINE@
{padleft(20)}Remaining: {round(change,2)}${endpad}
```

Displays the remaining change to be returned to the customer.

---

These templates provide a flexible way to control real-time messaging on POS displays using Tempo syntax.

## Filtering Search Screens in POS Using Machine Dimensions

In Nama ERP, access dimension filters (such as company, branch, sector, etc.) are applied automatically on standard screens. However, in the **POS system**, these filters are not applied automatically because the system relies on the machine's (register's) dimensions rather than the user's dimensions.

To enable filtering in POS search screens based on machine dimensions, use the **POS Settings** screen, specifically the **"Dimension Filtering"** table.

### Example:

Suppose you want to filter the **Zone (used in the delivery address)** in a **POS Sales Invoice** so that only zones linked to the current machine's branch are displayed:

1. Open the **POS Settings** screen.
2. In the **"Dimension Filtering"** table:

    * Add a new row.
    * Select the type **"Zone"** in the **Type** field.
    * In the **"Filtered In Type"** field, select **"POS Sales Invoice"**.
    * Enable the **"Filter by Branch"** option.
3. You can also create a **type list** containing "Zone" and other data types to apply the same filtering to all of them.

### Available Filtering Options:

* Filter by Company
* Filter by Branch
* Filter by Sector
* Filter by Department
* Filter by Analytical Group

## Logging In Using an API Key in POS

A new login mechanism has been added to the POS system using an **API Key** instead of a username and password. The purpose of this mechanism is to avoid storing the password (even if encrypted) inside POS configuration files, while ensuring the POS continues to work even after a password change.

This mechanism can be activated in two ways:

---

### Method 1: Automatic Creation via Traditional Login

1. Start the POS using the username and password as usual.
2. The system automatically:
   - Creates an `APICredentials` file
      - The file's code includes the user ID that was used.
   - Saves the API key inside the `nama.properties` file.
   - On startup, the system first looks for an `APICredentials` file with the matching code; if found, it uses it instead of creating a new one.

This method enables a smooth transition to API key login without any manual configuration.

---

### Method 2: Manual Creation

1. Create an `APICredentials` file manually and assign the user under whose name POS operations will be performed (reading/writing records).
2. Copy the key from the resulting file.
3. You can use the key in one of the following places:
   - Enter it in the initial settings window instead of the username and password.
   - Or place it directly in the POS `nama.properties` file:
     ```
     apiKey=dddsbddhbskbsdhdd
     ```

---

Using an API Key gives you greater flexibility and security, especially when updating passwords or managing a large number of POS terminals.

## Advanced Methods for Changing Sales Table Column Widths in POS

### Manual Method (Drag and Direct Edit)

- **How to use**:
  - Drag column borders manually (similar to Excel) to change the width.
  - When a width is modified for the first time, the system automatically saves the new values in the file:
    ```screenProperties.properties```
  - You can copy this file after adjusting all fields as required.

- **Deploying changes to POS machines**:
  - **Option 1**: Paste the file manually on each machine.
  - **Option 2**: Go to system settings → **Sales Column Properties** → paste the file contents → select **"Send Properties to POS Machines"** → save.

- **Advantages**:
  - Flexible and quick for initial adjustments.
  - Allows precise control based on user needs.

- **Disadvantages**:
  - Requires manual intervention when updating across multiple machines.

---

### Controlling Width via POS Interface Settings

- **How to use**:
  - In the **"POS Interface Settings"** page, a new column named **"Width"** has been added for each field in the sales table.
  - You can specify the column size through predefined options (e.g., small, extra small, medium, large, etc.).
  - Space is distributed automatically based on the size specified for each field.

- **When to use?**
  - When you want to set widths in an organized way without manual dragging.
  - For proportional distribution of fields within the table.

- **What if you want manual dragging with this feature enabled?**
  - Leave the **"Width"** field empty, which allows the user to manually adjust the size at runtime.

- **Advantages**:
  - No manual editing required on each machine.
  - Provides predefined options for a consistent look across branches.
  - Automatically distributes space between fields.

- **Disadvantages**:
  - Less flexible than the manual method in some special cases.

---

# Call Center Feature - Electronic Orders System

## Overview
The Call Center feature turns POS machines into powerful workstations for call centers, enabling operators to receive remote orders and send them to other POS machines for processing. This feature is ideal for businesses with multiple locations, delivery services, or centralized order intake operations.

### 1. How to Use the Feature

#### Call Center Mode

**Step 1: Enable Call Center Mode**
- Go to the machine record and enable "Customer Service Mode"

**Step 2: Create an Order**
1. Start a new sale as usual
2. Select the machine/branch to which the order will be sent
3. Add products, customer information, and any special instructions
4. Instead of completing the sale, click "Suspend" or press the suspend shortcut
5. The order is automatically sent to the selected machine
6. A confirmation message will appear confirming the order was sent


#### For Receiving Machines

**Step 1: Enable Automatic Order Reception**
- Go to the machine record and enable "Read Orders from Customer Service Center"

**Step 2: Process the Order**
1. After activation, orders will appear automatically (checked every minute)
2. A pop-up notification will appear when new orders arrive
3. Go to the "Suspended Orders" screen
4. Find the received order (marked as suspended)
5. Open and review the order
6. Complete processing as a normal sale

### 2. Feature Benefits
- **Centralized Order Intake**: Receive orders from a central location for multiple branches
- **Efficient Order Distribution**: Automatically route orders to the appropriate location
- **Real-Time Notifications**: Instant alerts when orders are sent and received
- **Seamless Integration**: Works with the existing POS infrastructure
- **Improved Customer Service**: Faster order processing and reduced wait times

### 3. Business Use Cases

#### Delivery Services
- The call center manages all delivery orders
- Distribute orders to appropriate locations
- Track orders in real time
- Improve delivery coordination


### 4. What Sets This Feature Apart in Nama ERP

#### Instant Synchronization
- Orders are transferred immediately to the server
- Target machines check for new orders every minute
- Automatic retry in case of network issues

#### Full Order Transfer
- All products with quantities and prices
- Customer information
- Special instructions and notes
- Discounts and promotions

#### Smart Notifications
- Visual pop-up windows for order events
- Clear error messages in case of problems

# Item Add-ons Feature - POS System

## Overview
The Item Add-ons feature allows customers to add complementary elements to main items at the point of sale. Each item can be linked to a set of add-on items such as extras (like sugar and milk for coffee), or multiple-choice options (like sizes and colors). This feature is essential for restaurants, cafes, and clothing stores.

### 1. Feature Benefits
- **Custom Add-ons**: Add complementary elements to main items
- **Multiple Options**: Support for up to 10 groups of add-on items
- **Display Flexibility**: Display main item properties (versions, colors, sizes) in different ways
- **Interface Control**: Customize how each group of elements is displayed
- **Improved Orders**: Facilitate order customization for customers

### 2. Use Cases

#### Electronics Stores
- Adding extended warranties
- Selecting complementary accessories
- Installation and delivery services
- Customizing technical specifications

### 3. How to Use the Feature

#### Setting Up Add-ons

**Step 1: Create the Add-ons Record**
1. Go to "Item Add-ons for POS"
3. Add a new record with the following information:
    - **Base Item**: Select the item or group to link

**Adding Add-on Items**
1. In the "Add-on Items" section, select the desired group (1-10)
2. Add elements with the following information:
    - **Item**: Select the add-on item
    - **Default Item**: Specify if this item is selected by default
    - **Default Unit**: Specify the default unit of measure
3. In the "Add-on Item Settings" section, add settings for each group:
    - **Add-on Item Type**: Select the group (1-10)
    - **Title in POS**: The text that will appear to the user
    - **Allow Multiple Selection**: Ability to select multiple add-on items from the same group
    - **Make Add-ons Mandatory**: Force the user to make a selection
    - **Add Search Button**: Add a search button for elements
    - **Add Browse Button**: Add a button to navigate between pages

**Displaying Main Item Properties**
1. **To display versions**:
    - Enable "Show Item Versions"
    - Set the display order
    - Choose the display method (name only, code only, code and name)
    - Enter the versions title in POS

2. **To display colors**:
    - Enable "Show Item Colors"
    - Set the display order
    - Choose the display method
    - Enter the colors title in POS

3. **To display sizes**:
    - Enable "Show Item Sizes"
    - Set the display order
    - Choose the display method
    - Enter the sizes title in POS


#### Using Add-ons at the Point of Sale

**Step 1: Select the Main Item**
1. In the sales screen, select the main item
2. The add-ons window will appear automatically if enabled

**Step 2: Specify Main Item Properties if Enabled**
1. **Select Version**: If the feature is enabled, choose the desired version
2. **Select Color**: Choose the desired color from the list
3. **Select Size**: Choose the appropriate size

**Step 3: Add the Add-on Items**
1. For each group of add-on items:
    - Review the group's designated title
    - Select the desired element or elements
    - Use search if available
    - Browse pages for more options

**Step 4: Confirm Selection**
1. Review all selections
2. Make sure mandatory elements are selected
3. Click "OK" to add the item with its add-ons to the invoice

### 4. Key Features

#### Flexibility
- Support for up to 10 groups of add-on items
- Customize the title for each group
- Specify mandatory and optional elements
- Support for multiple or single selection

#### Display Options
- Display by name only, code only, or both
- Display order is customizable
- Custom titles for each property
- Control the number of elements displayed per page

#### Ease of Use
- Intuitive interface at the point of sale
- Search and browse buttons when needed
- Ability to make selections mandatory
- Support for pagination for large groups

#### Inventory Integration
- Link add-on items to the inventory system
- Track add-on item quantities
- Automatically calculate total cost
- Support for different units of measure

### 5. Best Practices

#### Organizing Add-on Items
- Group related elements together in one group
- Use clear and easy-to-understand names for groups
- Arrange elements by importance or popularity
- Avoid adding too many elements in a single group

#### Improving User Experience
- Make the most popular elements visible first
- Use descriptive titles for groups
- Enable search for large groups
- Set an appropriate number of elements per page

#### Managing Mandatory Elements
- Make only essential options mandatory
- Clearly indicate mandatory elements to the user
- Avoid making a large number of elements mandatory
- Allow multiple selection only when necessary

## Resetting the Send Attempt Counter for Unsent Documents

When POS documents fail to send to the server, the system increments a failed-attempt counter (`writeFailures`). After 25 failed attempts (the default value), the system stops trying to send the document.

To reset the counter and allow the system to retry sending, run the following query against the POS database:

```sql
UPDATE POSSalesInvoice SET writeFailures = 0 WHERE sent = 0;
UPDATE POSSalesReturn SET writeFailures = 0 WHERE sent = 0;
UPDATE POSSalesReplacement SET writeFailures = 0 WHERE sent = 0;
UPDATE POSPaymentToRegistery SET writeFailures = 0 WHERE sent = 0;
UPDATE POSReceiptFromRegistery SET writeFailures = 0 WHERE sent = 0;
UPDATE POSShiftOpen SET writeFailures = 0 WHERE sent = 0;
UPDATE POSShiftClose SET writeFailures = 0 WHERE sent = 0;
UPDATE POSCustomer SET writeFailures = 0 WHERE sent = 0;
UPDATE POSStockTransferReq SET writeFailures = 0 WHERE sent = 0;
UPDATE POSOrderReservation SET writeFailures = 0 WHERE sent = 0;
UPDATE POSCreditNote SET writeFailures = 0 WHERE sent = 0;
UPDATE POSDiscountCoupon SET writeFailures = 0 WHERE sent = 0;
UPDATE POSStockTakingDetailsDoc SET writeFailures = 0 WHERE sent = 0;
UPDATE POSStockReceipt SET writeFailures = 0 WHERE sent = 0;
UPDATE POSScrapDoc SET writeFailures = 0 WHERE sent = 0;
UPDATE POSShortfallsDoc SET writeFailures = 0 WHERE sent = 0;
UPDATE POSError SET writeFailures = 0 WHERE sent = 0;
UPDATE POSInternalMessage SET writeFailures = 0 WHERE sent = 0;
UPDATE POSInventory SET writeFailures = 0 WHERE sent = 0;
```

::: warning
Make sure to resolve the underlying issue that caused the send failure (such as network problems or server configuration) before running this query.
:::

## Fingerprint Login

The POS system supports login using a fingerprint via the Digital Persona URU4500 device, allowing users to switch quickly and securely without needing to type login credentials each time.

For full details: [Fingerprint Login in POS](./pos-fingerprint-login.md)
