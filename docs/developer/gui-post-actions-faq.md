# General Questions About GUI Post Actions

## How to Automatically Recalculate the Price When Selecting a Lot?

In a sales invoice, when a lot is selected for one of the items, I need the system to automatically update the price if there is a custom price for that lot in the price list, or if the lot is included in an offer that includes a discount.
Note that the system already recalculates the price correctly when the quantity is modified, but this requires manually changing the quantity after selecting the lot.

**Solution:**
To achieve this, you can set up a GUI Post Action linked to the lot field (`lotId`) that triggers the GUI Post Action of the quantity field (`primeQty.value`). This linkage ensures that the system recalculates the price immediately after selecting the lot without the need for a manual quantity change.

::: details JSON for Direct Import
```json
{
  "lines": [
    {
      "forType": "SalesInvoice",
      "fieldID": "details.specificDimensions.lotId",
      "expression": "code=code",
      "callPostActorOfField": "details.quantity.quantity.primeQty.value"
    }
  ]
}
```
:::

## How Do I Calculate One Grid Column From the Others in the Same Row?

A user types a quantity in `n1` and a rate in `n2` on a journal entry line, and `n3` should immediately show `n1 × n2` — before the document is saved, on the row being edited and on no other row.

**Solution:**
One GUI Post Action line per field that should trigger the calculation. Set **Field Id** to the field the user types in (`lines.n1`), and write the calculation in **Expression**, naming the target with the **grid's own field id**:

```ini
lines.n3=sql(select isnull(try_cast({lines.n1} as decimal(20,6)), 0)
                  * isnull(try_cast({lines.n2} as decimal(20,6)), 0))
```

Three things make or break this expression:

- **Name the target with the grid prefix** (`lines.n3`, `details.n3`), not with a bare field name. `$line.n3` works too — inside a post action on a grid field, `$line` is the row the user is editing — but the grid prefix is the form that also works in every other kind of field map. See [Field Maps — Line Selection](/entity-flows/core/ai-generated-field-maps-documentation#Line-Selection).
- **Guard every placeholder that can be empty.** A cell the user has not filled in yet arrives as `NULL`, and SQL Server treats an untyped `NULL` as text: without the `isnull(try_cast(…))` wrapper the action fails with `Operand data type nvarchar is invalid for multiply operator` the first time one of the two cells is blank — which, on a row being typed in, is most of the time.
- **Repeat the line for each trigger.** A post action runs only for the field named in its **Field Id**, so a calculation that must follow both operands needs one line for `lines.n1` and one for `lines.n2`.

::: tip Context fields fill themselves in
The **Context Field 1…30** columns list what the screen has to send to the server for the expression to be evaluated. You do not fill them in by hand — they are worked out from the expression and the field id as soon as you type them, so if they look wrong, fix the expression and let them be rewritten.
:::

::: details JSON for Direct Import
```json
{
  "lines": [
    {
      "forType": "JournalEntry",
      "fieldID": "lines.n1",
      "expression": "lines.n3=sql(select isnull(try_cast({lines.n1} as decimal(20,6)), 0) * isnull(try_cast({lines.n2} as decimal(20,6)), 0))"
    },
    {
      "forType": "JournalEntry",
      "fieldID": "lines.n2",
      "expression": "lines.n3=sql(select isnull(try_cast({lines.n1} as decimal(20,6)), 0) * isnull(try_cast({lines.n2} as decimal(20,6)), 0))"
    }
  ]
}
```
:::

## What Is the Fields To Update Column For?

After the expression has run, the screen is told which fields to re-read from the result. Left empty, **Fields To Update** is worked out for you: every field on the **left** of an `=` in the expression is refreshed, which is what you want almost every time.

Fill it in when the expression changes a field that is not on the left of an `=` — a value set indirectly through `switchTarget`, a `runCommand` that recalculates the document, or a field that another field's calculation depends on. Anything not named there keeps its old value on screen until the record is saved and reopened, even though the server did change it.

List the fields exactly as the expression names them, separated by commas or newlines:

```ini
lines.n3, lines.n4
```
