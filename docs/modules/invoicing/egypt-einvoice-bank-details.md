---
entities: [TaxPayerConfiguration, Bank, BankAccount]
menu: Basic → Electronic Tax Authority Configuration → Electronic Tax Authority Configuration
---
# Bank Details on Egyptian e-Invoices

An Egyptian e-invoice can optionally tell the buyer where to send the money — the bank, the account number, the IBAN and your payment terms. The Tax Authority treats the whole section as optional: fill in nothing and your invoices go out exactly as they always have. Fill it in, and customers who pay by transfer stop having to ask.

This applies to every Egyptian e-invoice — sales invoices, credit notes and debit notes alike.

## Whose bank account is sent?

Nama doesn't ask you a second time. It reuses the **Branch Id From** setting in the **Electronic Tax Authority Configuration** — the same setting that tells the Authority which part of your business issued the invoice.

So if you told the Authority the issuer is a **Branch**, that branch's bank account is sent. If the issuer is the **Legal Entity**, the company's account is sent.

::: tip Why it works this way
The account and the issuer belong together. An invoice that says "issued by the Alexandria branch" but "pay into the Cairo account" is a reconciliation problem waiting to happen. One setting means the two can never drift apart.
:::

## Setting it up

1. On the **Bank** record, fill in the **Swift Code**. The bank's address is taken from the **Contact Information** section of the same record, so fill that in too.
2. On the **Bank Account** record, fill in **Account Number Sent To Tax Authority** with the number customers should transfer to, and check the **IBAN**.
3. Open the record that **Branch Id From** names — **Legal Entity**, **Branch**, **Sector**, **Department** or **Analysis Set** — and select that account in its **Bank Account** field.
4. Optionally, fill **E-Invoice Payment Terms** on the **Electronic Tax Authority Configuration**. It's a single line of text sent with every Egyptian e-invoice, so keep it to terms that always apply — something like "Payment due within 30 days of the invoice date".

::: warning If you leave the account number empty, the code is sent instead
When **Account Number Sent To Tax Authority** is empty, Nama falls back to the bank account's **code** — which makes an internal label into something your customers read on their invoice.

Fill the field in. It accepts the number exactly as the bank writes it, dashes and spaces included, which codes don't allow.
:::

## What gets sent

| On the invoice | Comes from |
|---|---|
| Bank name | The **Bank** record's name |
| Bank address | **Contact Information** on the **Bank** record |
| Swift code | **Swift Code** on the **Bank** record |
| Account number | **Account Number Sent To Tax Authority** on the **Bank Account**, falling back to its code |
| IBAN | **IBAN** on the **Bank Account** |
| Payment terms | **E-Invoice Payment Terms** on the configuration |

Anything left empty is left out. Leave all of it empty and the payment section is dropped from the invoice entirely.