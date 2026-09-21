---
entities: [TaxPayerConfiguration, Bank, BankAccount, DocumentTerm]
menu: Basic → Electronic Tax Authority Configuration → Electronic Tax Authority Configuration
---
# Bank Details on Egyptian e-Invoices

An Egyptian e-invoice can optionally tell the buyer where to send the money — the bank, the account number, the IBAN and your payment terms. The Tax Authority treats the whole section as optional: fill in nothing and your invoices go out exactly as they always have. Fill it in, and customers who pay by transfer stop having to ask.

This applies to every Egyptian e-invoice — sales invoices, credit notes and debit notes alike.

## Whose bank account is sent?

Nama doesn't ask you a second time. It reuses the **Branch Id From** setting (`branchIdDimension`) in the **Electronic Tax Authority Configuration** — the same setting that tells the Authority which part of your business issued the invoice.

So if you told the Authority the issuer is a **Branch**, that branch's bank account is sent. If the issuer is the **Legal Entity**, the company's account is sent.

::: tip Why it works this way
The account and the issuer belong together. An invoice that says "issued by the Alexandria branch" but "pay into the Cairo account" is a reconciliation problem waiting to happen. One setting means the two can never drift apart.
:::

Most documents you send can go one step further and send a different account — or different payment terms — on each document. See **Choosing the account and terms on each invoice** below.

## Setting it up

1. On the **Bank** record, fill in the **Swift Code** (`swiftCode`). The bank's address is taken from the **Contact Information** section of the same record (`contactInfo.address`), so fill that in too.
2. On the **Bank Account** record, fill in **Account Number Sent To Tax Authority** (`accountNumberSentToTaxAuth`) with the number customers should transfer to, and check the **IBAN** (`iban`).
3. Open the record that **Branch Id From** names — **Legal Entity**, **Branch**, **Sector**, **Department** or **Analysis Set** — and select that account in its **Bank Account** field (`dimensionInfo.bankAccount`).
4. Optionally, fill **E-Invoice Payment Terms** (`eInvoicePaymentTerms`) on the **Electronic Tax Authority Configuration**. It's a single line of text sent with every Egyptian e-invoice, so keep it to terms that always apply — something like "Payment due within 30 days of the invoice date".

::: warning If you leave the account number empty, the code is sent instead
When **Account Number Sent To Tax Authority** is empty, Nama falls back to the bank account's **code** — which makes an internal label into something your customers read on their invoice.

Fill the field in. It accepts the number exactly as the bank writes it, dashes and spaces included, which codes don't allow.
:::

## Choosing the account and terms on each invoice

One default account suits most businesses, but not all. A company might collect from government customers into a dedicated account, or agree 60-day terms with one distributor while everyone else pays within 30. For those cases, the document's term can point Nama at a field on the document itself.

The two fields are on the terms of:

- **Sales Invoice** and **Sales Return**
- **SI Sales Invoice** and **SI Sales Return** (service center)
- **POS Sales Invoice** and **POS Sales Return**
- **Credit Note** and **Debit Note**
- **Misc Purchase Invoice**, whose term is shared with Misc Purchase Order and Request
- **Misc Contracting Invoice** and **Contractor Employee Equipment Invoice**

### The two term fields

Open the **Document Term** of the document. Both fields are in the **Electronic Invoice** group of the **Settings** tab; fill in either one, or both.

| Term field | Field ID | What to type in it |
|---|---|---|
| **E-Invoice Bank Account Field** | `termConfig.eInvoiceBankAccountField` | The ID of a **reference** field on the invoice, where users will pick the bank account |
| **E-Invoice Payment Terms Field** | `termConfig.eInvoicePaymentTermsField` | The ID of a **text** field on the invoice, where users will type the payment terms |

### Invoice fields you can point them at

The field must sit in the invoice header — not in a grid such as the item lines — and be the right kind. The usual choices are:

| Invoice field ID | Kind | Suitable for |
|---|---|---|
| `ref1`, `ref2`, `ref3` (**Reference 1**, **Reference 2**, **Reference 3**) | Reference | **E-Invoice Bank Account Field** |
| `description1` to `description5` | Text | **E-Invoice Payment Terms Field** |
| `remarks` | Text | **E-Invoice Payment Terms Field** |

Type the ID exactly as shown — `ref1`, not "Reference 1".

### How it plays out

Say the sales invoice term has `ref1` in **E-Invoice Bank Account Field** and `description1` in **E-Invoice Payment Terms Field**:

- A user invoicing a government customer selects the government collection account in **Reference 1** and types "Payment due within 60 days" in `description1`. The Tax Authority receives that account — its bank, IBAN, Swift code and account number — and those terms.
- The next invoice leaves both fields empty. It sends the branch's bank account and the **E-Invoice Payment Terms** from the configuration, as usual.

Each field falls back to the default on its own:

- **The field is empty on the invoice:** the default is sent — the branch's bank account, or `eInvoicePaymentTerms` from the configuration.
- **The bank account field holds something that isn't a bank account** (a customer picked in **Reference 1** by mistake, say): the branch's bank account is sent.

::: warning A field ID that doesn't exist blocks the document
Nama looks the field up by the ID you typed. If the document has no such field, saving a document that is sent to the Tax Authority fails with a technical message like `Can not find Field getter method : ref11`. It names the field you typed, but not the term it came from, so keep this setting in mind when you see it. If tax data validation on save is switched off for the book or the term, the document saves and the failure shows up later on its submission entry instead.

The other mistakes are quieter:

- **The bank account field holds something that isn't a bank account:** the branch's account is sent, with no warning.
- **The payment terms field is not a text field:** whatever it holds is turned into text and sent as the payment terms, which is rarely what you want.

So point each setting at a field in the document header, of the right kind, and issue one test document after you change the term.
:::

## What gets sent

This is the full map, from each field the Tax Authority receives back to where Nama reads it.

| Tax Authority field | Meaning | Record | Field ID |
|---|---|---|---|
| `bankName` | Bank name | **Bank** | `name1` |
| `bankAddress` | Bank address | **Bank** | `contactInfo.address` |
| `swiftCode` | Swift code | **Bank** | `swiftCode` |
| `bankAccountNo` | Account number | **Bank Account** | `accountNumberSentToTaxAuth`, or `code` when that is empty |
| `bankAccountIBAN` | IBAN | **Bank Account** | `iban` |
| `terms` | Payment terms | **Sales Invoice** / **Sales Return** | The invoice field named in `termConfig.eInvoicePaymentTermsField` |
| | | **Electronic Tax Authority Configuration** | `eInvoicePaymentTerms` — when the above is empty or not set |

The **Bank** rows are read from the **Bank Account**'s own `bank` field. The **Bank Account** itself is chosen in this order:

1. **On the invoice** — the field named in `termConfig.eInvoiceBankAccountField` (for example `ref1`), if it holds a bank account. Only for the documents whose terms carry the two fields, listed above.
2. **On the issuer** — `dimensionInfo.bankAccount` on the record that `branchIdDimension` points to (**Legal Entity**, **Branch**, and so on). This is what every other e-invoice, including credit and debit notes, always uses.

Anything left empty is left out. Leave all of it empty and the payment section is dropped from the invoice entirely.
