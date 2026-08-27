# Importing Records

Importing is the mirror image of exporting: you hand the system a workbook, and it creates or updates records from it. It is how opening balances, item catalogues, customer lists and price changes get into a new installation — and how a bulk correction gets applied to four hundred existing documents without anyone opening four hundred screens.

The mechanism is deliberately unglamorous. There is no wizard and no column-matching step, because the file already says which column feeds which field. That is why the strong advice is always the same: **export first, then edit what you exported.** Starting from a file the system produced means the marker rows and headings are already right, and you only have to worry about the values.

If the correction you have in mind is the *same* new value on every record — one salesman for four hundred customers — there is a lighter tool that needs no file at all: see [Bulk Edit](/platform/list-views/bulk-edit). Import is the one to reach for when each record needs a different value, or when detail lines are involved.

## Starting an Import

Open the list screen for the records you want to load — customers, items, invoices — and choose **Import Records** (استيراد سجلات) from the **More** menu. The same command is available from the **More** menu of an open record, and it behaves identically: the file decides what is imported, not the screen you happened to be on.

The command only appears for users whose security profile grants **Can Import** on that entity type. See [Security Profiles](/platform/security/security-profiles.md).

## The Import Options

| Option | Arabic label | Default | What it does |
|---|---|---|---|
| **File** | الملف | — | The workbook or data file to import. |
| **Attachments** | المرفقات | — | The companion zip of attached files, if your sheet references any. |
| **Add** | إضافة | **On** | Allows rows that match no existing record to create one. Switch it off for an update-only run — then a row for a record that does not exist fails instead of quietly creating it. |
| **Update** | تحديث | **On** | Allows rows that match an existing record to overwrite it. Switch it off for an insert-only run, so an accidental re-upload cannot damage existing data. |
| **Ignore not found references** | تجاهل مراجع السجلات الغير موجودة | Off | Off, a row whose customer or item code cannot be found fails. On, the reference is simply left empty and the record is still saved — read the warning below before using this. |
| **Continue On Errors** | المتابعة عند حدوث خطأ | **On** | On, every row is attempted and the failures are reported at the end. Off, the import stops at the first failing row. |
| **Trim Extra Spaces** | حذف المسافات الزائدة | **On** | Strips leading and trailing spaces from every cell before using it. This is what stops a code typed as `CUST01 ` from failing to match `CUST01`. |
| **Save As Draft** | الحفظ كمسودة | Off | Imported records are saved as drafts rather than committed, so you can review them before they take effect. |
| **Use User Dimensions While Importing** | استعمال محددات المستخدم اثناء الاستيراد | Off | Resolves codes and saves records under your own legal entity, branch, sector and department rather than the record's. Useful when the same code exists in several companies. |
| **Add To Current Lines** | إضافة إلى السطور الحالية | Off | Off, the detail lines in the file replace the record's existing lines. On, they are added alongside them. |

::: warning "Continue On Errors" does not mean "undo on errors"
Switching it off stops the run at the first failure — but the rows that already succeeded stay saved. There is no rollback of a partial import. If a bad file gets halfway through, you will need to undo the damage yourself, which is the best argument for testing on a handful of rows before running the full sheet.
:::

::: danger Be careful with "Ignore not found references"
It sounds like a convenience and it is occasionally necessary, but it turns a loud failure into a silent one. A row whose warehouse could not be matched is saved with **no warehouse at all** rather than being rejected, and you find out weeks later when the stock figures do not add up. Prefer leaving it off, letting the rows fail, and fixing the codes.
:::

## How a Row Finds Its Record

Two questions get answered for every row: is this an existing record, and what does each reference point at?

### Existing record, or new one?

The importer looks for a match first by the **`id`** column if the file has one, then by the **`code`**. What happens next depends on your options:

- Matched, and *Update* is on → the record is overwritten with the values in the row.
- Matched, and *Update* is off → the row fails with *"Record already exists and you do not want to update"*.
- No match, and *Add* is on → a new record is created.
- No match, and *Add* is off → the row fails with *"Record does not exist and you do not want to add"*.

Detail lines follow the same idea one level down. When every line in your file carries its identifier, those exact lines are updated. When the identifiers are missing, lines are matched **by position** — which is fine for a fresh import and dangerous on a re-import where rows have been added, deleted or reordered.

### What a reference column matches on

When a cell says `10011` in a `customer` column, the system tries, in order:

1. the internal **identifier**, if the cell looks like one;
2. the **code** — this is the normal case, and the one you should rely on;
3. the **alternate code**, for record types that have one;
4. the **alias**;
5. for items only, a barcode, when barcode-specification searching is enabled;
6. the **name**, in Arabic then English — but *only* for record types an administrator has explicitly allowed to be matched by name, in [Fields and Entities Settings](/platform/fields-and-entities-settings/fields-settings-reference-lookups). This is switched off by default.

Two conveniences are worth knowing. Books, document terms and master groups have the owning entity type prefixed onto the code automatically, so `SalesInvoice$#SINV` in an exported file is exactly what the importer expects to see. And a reference can point at a record **defined further down the same file** — if your sheet creates a parent and a child, the importer will jump ahead, create the parent, and then finish the child. You do not have to order the rows.

If a code is genuinely ambiguous — two records sharing it — the lookup fails with an error rather than picking one at random.

::: tip Codes, not names
The single most common cause of a failed import is editing the readable `customer: Name` column instead of the `customer` code column beside it. Name columns are written on export and completely ignored on import.
:::

## Watching It Run, and Reading the Result

The import is handed to a background task, so your screen stays usable. A progress entry counts through the file — *"Importing 12 of 400 — Fail: 1 Success: 11"* — and you can cancel it partway if you spot something going wrong.

When it finishes you get **your own file back**, annotated. That returned workbook is the real result report:

- successful rows are stamped **`inserted`** in column A;
- failed rows are stamped **`erorr`** in column A, and the reason is written into the `@errors` cell at the end of the row — with detail lines getting their own error cells on their own sheets.

So the repair loop is simple and self-correcting: download the returned file, fix the rows that have text in the error column, and upload the same file again. The rows already marked `inserted` are skipped on the second pass, so nothing is imported twice.

::: info Import is a background task, not a business request
An import does not appear in the Business Requests list and is not retried from there. It runs on the server while you wait, and its result is the annotated file. What *does* land in Business Requests is the processing each imported document then triggers — its accounting and inventory effects — and those are monitored and retried in the usual way.
:::

## Supported File Types

Excel workbooks (`.xlsx`), `.csv` and `.txt` files with the same row layout, `.json`, `.xml` and `.zip` bundles are all accepted.

`.xls` — the old Excel 97 format — is **not**. Uploading one produces a message asking you to save it as `.xlsx` first.

## Importing Into the Record You Have Open

There is a second, much smaller command in an open record's **More** menu: **Import Into Current Record**. Instead of a file it takes JSON pasted into a text box, and instead of saving anything it simply *fills the screen in front of you*. You review what appeared and press Save yourself — or discard it.

It has one option, **Add To Current Lines**, which decides whether pasted detail lines replace or join the ones already on the record.

This is the tool for a single record handed to you as a snippet — a configuration someone sent you, a sample document from support. For anything with more than one record, use **Import Records**.

## When the Sheet Is Not Yours to Reshape

Everything above assumes the file uses Nama's own layout. Often it does not: a supplier sends a price list in their format, or a legacy system produces an export whose columns are in the wrong order with the wrong headings and three rows of company letterhead on top.

You could reshape it by hand every month. Or you could describe its layout once and reuse that description — which is what [Advanced Record Import](/platform/import-export/advanced-record-import.md) is for.
