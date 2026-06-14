# Sending Invoices and Documents to Customers

The **Invoice Retriever** feature in Nama ERP allows sending links to customers (or suppliers) that generate and serve reports (e.g., invoices, receipts) on demand.

When a customer clicks the link for the first time, the system runs the associated report, saves the output file, and serves the same file for future visits to enhance performance.

## Configuration Steps

### 1. Configure Invoice Retriever

* Navigate to the **Fields and Entities Settings** screen.
* In the **Invoice Retriever Lines** grid, add a new line.
* Select the form you want to use to generate the invoice or document.

### 2. Set Output Folder

* Specify the folder path where the output files will be stored.
* The system will store the report result here to serve it on future link visits without re-generating.
* You may delete files manually from this folder to force regeneration.

::: tip
By default, the report runs only once. If the invoice is updated afterward, the changes will **not** appear in the link unless the saved file is deleted manually.
:::

### 3. Force Re-Execution (Disable Caching)

* If you want the report to run **every time** the link is accessed, enable the `Do Not Cache` option in the Invoice Retriever line.

### 4. Support for Multiple Forms

* You can define multiple retrievers for the same entity using the **URL Prefix** field.
* This helps support multiple document types under different URL paths (e.g., `invoices`, `receipts`).

## Sending the Link in Notifications

Use notification definitions (SMS, email, etc.) to send links to customers using the `{retrieverFileId}` variable.

### Basic Example (SMS):

```
Thanks for visiting us, view your invoice by clicking on this link:
https://my.swsg.co/erp/r/{retrieverFileId}
```

### With File Extension:

```
https://my.swsg.co/erp/r/{retrieverFileId}.pdf
```

### With Dynamic Code:

```
https://my.swsg.co/erp/r/{retrieverFileId}.{code}.pdf
```

### Cleaner URL Style:

```
https://my.swsg.co/erp/r/{retrieverFileId}/{code}.pdf
```

### With URL Prefix (e.g., invoices):

```
https://my.swsg.co/erp/r/invoices/{retrieverFileId}
```

Use these variations to customize how the link appears and functions depending on your business needs and branding.
