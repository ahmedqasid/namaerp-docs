# Document Terms (per-type processing rules)

One question recurs throughout this module's guides: "where do the debit and credit accounts for this document come from?" The answer is always the **document term**. This page explains the idea of a term and its shared vocabulary, so we don't have to repeat it on every page.

## What is a term?

When you save any document that generates an accounting effect — a receipt voucher, a payment voucher, a loan issue, an LC opening… — the system doesn't pick the accounts out of thin air; it picks them from a **term** linked to the **document type**. The term is the recipe that says: "for this kind of document, make the debit side this account, the credit side that one, and handle tax like so." So by changing the term — rather than editing each document one by one — you govern the behavior of a whole class of documents.

Each term has a two-page edit screen: **Settings** (account and subsidiary sources and controls) and **Effect** (the details of the posted value). The top of the screen sets its basic data: the **document type**, the **code**, a **System** flag (for terms the system creates), an **Inactive** flag, a **field filter** and the printed **template**.

## Where does each side come from?

The heart of the term is the **Debit** and **Credit** blocks. In each side, the **account resource type** field decides how the account is derived; the most common sources are:

- **A fixed account** — you pick a specific **account** that's always used for this side.
- **From the subsidiary** — the account comes from the party's own subsidiary (the customer/supplier), specifying the **subsidiary account type** and **account bag code** when the subsidiary has multiple accounts.
- **From a safe deposit or bank account** — for the cash side, the account comes from a specific **safe deposit** or **bank account**.
- **From the payment method** — the account comes from the **payment method** chosen on the document.

The **related subsidiary** field on the other side links the two sides together, and you can constrain the user with **prevent inserting values different from the term's** so everyone sticks to the term's setup.

### Conditional sources (based on "from doc")

When a document is created **based on** another (e.g. a voucher based on a request or order), the accounts needed may differ. So the term offers an **Account and Subsidiary Source Settings** grid that maps a **from-doc type** to a different account/subsidiary source, optionally applied conditionally when the **from doc matches a criteria** or **a query**, or by **calculating the subsidiary from a field** of the source document.

## Taxes and dimension modifiability

- **Taxes**: the **Taxes** block sets the **tax 1 and 2 debit/credit** sides and whether each is a **deduction**, plus options to add the tax to the total debit/credit. (The tax fields appear on the document itself depending on the [Accounting configuration](./accounting-configuration.md) options.)
- **Details dimensions and modifiability**: flags like **cannot modify sector/branch/department/analysis set** stop the user from changing the [dimensions](./accounting-dimensions-and-distribution.md) at the line level, so the term's values are enforced.

## "Must / May / Cannot use"

Many term features (like invoice usage or commercial-paper usage) aren't set with just yes/no, but with three levels:

| Value | Meaning |
|---|---|
| Must Use | the feature is mandatory; the user must fill it in. |
| May Use | the feature is optional; available but not required. |
| Cannot Use | the feature is hidden/forbidden for this type. |

## A term per document

Each document that posts has its own term with its own sides — a receipt voucher's sides aren't a loan issue's sides. This quick map links each document to the page where its sides are described in detail:

| Document | Page |
|---|---|
| Receipt / payment voucher | [Receipt & payment vouchers](../receipts-and-payments.md) |
| Cashier voucher & shift close | [Cashier shifts](../cashier-shifts.md) |
| Credit / debit note | [Credit & debit notes](../credit-and-debit-notes.md) |
| Bank transfer & bank reconciliation | [Banks & bank accounts](../banks-and-bank-accounts.md) |
| Bank portfolio & financial papers | [Cheques & financial papers](../cheques-financial-papers.md) |
| Loan issue & installment payment | [Bank loans](../bank-loans.md) |
| LG issue | [Letters of guarantee](../letters-of-guarantee.md) |
| LC opening | [Letters of credit](../letters-of-credit.md) |
| Credit-facility issuance & payment | [Credit facilities](../credit-facilities.md) |
| Deposit issue & interest payment | [Fixed deposits](../fixed-deposits.md) |
| Treasury-bill purchase & ROI proof | [Treasury bills](../treasury-bills.md) |

## For Support

- **"The document posts to the wrong account"** — check the **Debit/Credit** sides in the document type's term, specifically the **account resource type**; the change in the term applies to all documents of that type.
- **"A document created based on another takes a different account"** — that's usually intended; inspect the **Account and Subsidiary Source Settings** grid in the term.
- **"The tax field doesn't appear"** — tax fields appear depending on the [Accounting configuration](./accounting-configuration.md), and their sides are set in the term's **Taxes** block.
- The processing mechanism itself is explained in [How documents are processed into accounting effects](./accounting-request-processing.md).
