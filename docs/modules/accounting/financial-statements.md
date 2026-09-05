---
entities: [FSSettingsFile, FSIssueFile, FSAccountGroup, FSEquation]
menu: Accounting → Financial Statement → FS Settings File
---

# Financial Statements

Every company needs an income statement and a balance sheet, but no two companies want them laid out exactly the same way — different line groupings, different subtotals, different comparison columns. Rather than hard-code a fixed report, Nama gives you a **configurable financial-statements engine**: you describe the shape of the statement once, then *issue* it for any period to get the numbers. The income statement, balance sheet and cash-flow reports you print are all output of this one engine.

::: info Required license
The financial-statements engine is part of the core `accounting` license. Its screens are under **Accounting > Financial Statement**.
:::

## The building blocks

You design a statement from four screens, working from the small pieces up to the finished report:

1. **FS Account Group** (`Accounting > Financial Statement > FS Account Group`) — a named bundle of accounts, so a statement line can say "Operating Revenue" and pull a whole group instead of listing accounts one by one.
2. **FS Equation** (`Accounting > Financial Statement > FS Equation`) — a reusable formula. Lines use equations to compute their value: a balance, a debit/credit movement, an opening figure, or a total rolled up from other lines.
3. **FS Settings File** (`Accounting > Financial Statement > FS Settings File`) — the **template**: the ordered set of lines that *is* the statement's structure, plus how it's grouped, compared and displayed.
4. **Issuing Financial Statement File** (`Accounting > Financial Statement > Issuing Financial Statement File`) — the **computed snapshot**: run a settings file for a period and it captures the actual numbers, ready to print and to compare against later issues.

## Designing the statement (the settings file)

The **FS Settings File** is where the statement takes shape. It carries an Arabic and English **report title**, and a grid of **lines** — each line is a row of the finished statement:

- a **level** that sets the row's place in the hierarchy (headings, sub-lines, totals), and an Arabic/English **description**,
- an **equation** that produces the row's value — there are separate equation slots for the **balance/movement**, the **debit-credit**, the **opening**, and the **totals**, so a single line can behave correctly whether it's a normal line or a subtotal,
- alternatively a **constant value**, or a reference to another line's value by its **source line code**,
- per-line **dimension limits** — "limit lines to branch / sector / department / analysis set / subsidiary / reference…" — so a line can be restricted to just one branch or cost center,
- and flags such as **invisible in reports** (a working line used only in calculations) and **spread out in lines / spread subsidiaries in lines** (explode a group or its subsidiaries into individual rows).

![The FS Settings File screen](../../ar/modules/accounting/images/fs/fs-settings-file-en.png)

At the header you also choose how the whole statement behaves:

- the **comparison type** — **One Year**, **Two Years**, a **Period Set** (a run of consecutive periods, i.e. month-by-month columns), or **Two Period Sets** (the same months across two years),
- up to five **grouping axes** (**group by** legal entity, branch, department, sector, analysis set, references, record, or subsidiary) — so the same statement can be broken down by dimension,
- and display options: **create totals lines**, **hide zero-value balances**, **hide equal-balanced transactions**, **show to level** (collapse detail beyond a depth), and **consider debit and credit charts**.

## Issuing a statement

A settings file is just the design; the numbers come from an **issue**. The **Issuing Financial Statement File** runs a settings file for a chosen period and stores the computed result as a saved issue. That snapshot is what the FS-issue reports print — and because each issue is preserved, you can compare this month's issue against last month's, or this year against last.

![The Issuing Financial Statement File screen](../../ar/modules/accounting/images/fs/fs-issue-file-en.png)

## Actions on these screens

Designing a statement from an empty settings file is a long job, so the screen offers both a starting point and tools for editing many lines at once.

**On the FS Settings File:**

- **Create Income Statement Settings File And Groups**, **Create Balance Sheet Settings File And Groups** and **Create Cash Flow Flow Settings File And Groups** — each builds a complete, ready-made settings file for that statement, together with the account groups its lines refer to, and opens it as a new record. Each asks one question first: whether to create those groupings as an **FS Account Group** or as an **Account Category**. Start here and adapt, rather than typing the structure from scratch.
- **Select All Lines**, **Unselect All Lines** and **Reverse Selected Lines** — tick, untick, or invert the selection on the lines grid. They matter because of the header's bulk-change fields — **Change Balance Type**, **Change Debit Credit Type**, **Change Open Type**, **Change Totals Type** and **Change Level Type**: pick a value in one of them and it is applied to every **selected** line at once. Selecting is how you edit fifty lines without touching fifty rows.
- **Clear Lines Code** — empties the code on every line. Useful when you are re-coding a statement and the old codes are still being picked up by lines that reference them by **source line code**.

**On the Issuing Financial Statement File:**

- **Generate Financial Statement** — the button that turns the design into numbers. Save the issue file first with its settings file and period chosen, then press it; the screen refreshes with the computed result stored as this issue. Press it again whenever the underlying transactions have moved and the snapshot needs refreshing.

## The reports

The printed statements all come out of this engine, under the report menu (`Acc-FNS`, codes `SYSR-FNS*`):

- **Income statement** — by accounts (`SYSR-FNS001`), monthly (`SYSR-FNS002`), and grouped by dimension (`SYSR-FNS009`).
- **Balance sheet** — by accounts (`SYSR-FNS003`), monthly (`SYSR-FNS004`), by balances and by account category.
- **Cash-flow statement.**
- **Issue-driven statements** that print from a saved issue: monthly income statement one/two years (`SYSR-FNS010`/`SYSR-FNS011`), yearly income statement one/two years (`SYSR-FNS012`/`SYSR-FNS013`), yearly balance sheet one/two years (`SYSR-FNS014`/`SYSR-FNS015`), plus an FS trial balance.

![Income statement by accounts (SYSR-FNS001)](../../ar/modules/accounting/images/reports/SYSR-FNS001-en.png)

![Monthly balance sheet (SYSR-FNS004)](../../ar/modules/accounting/images/reports/SYSR-FNS004-en.png)

![Issue-driven monthly income statement (SYSR-FNS010)](../../ar/modules/accounting/images/reports/SYSR-FNS010-en.png)

## For Support

- **"A line shows the wrong number"** — check the line's **equation** (balance vs debit-credit vs opening vs totals) and any **dimension limits** on it; a line limited to one branch only sums that branch.
- **"A subtotal isn't adding up"** — totals lines use the **totals equation** and reference other lines by **source line code**; verify those references and the line **levels**.
- **"The comparison columns are missing/wrong"** — that's the **comparison type** (One Year / Two Years / Period Set / Two Period Sets) on the settings file.
- **"The figures are out of date"** — the issue-driven reports print a saved **issue**; re-issue the settings file for the period to refresh the snapshot.
- **"Zero/empty rows clutter the statement"** — turn on **hide zero-value balances** (and **show to level** to collapse deep detail).
