# Accounting Effects Configuration

Supply Chain documents that carry accounting effects post to the general ledger through configurable debit and credit **account sides**. Each account side is a small self-contained block (an *account-side config*) that defines which GL account to hit plus where the account's subsidiary (portfolio) and cost-center dimensions are sourced from. A document term adds one or more **Effect** / **Invoice Effect** pages, and the groups shown on those pages differ by document type — an invoice exposes tax, discount and service-fee sides; a stock receipt exposes only a debit/credit pair and a few toggles; a Letter-of-Credit opening exposes coverage and fees sides.

::: info Where to find it
Open the document's **Document Term** (توجيه), then the **Effect** / **Invoice Effect** (التأثير / تأثير الفاتوره) tab. All field ids below are under `DocumentTerm.termConfig.…` — the searchable prefix is `termConfig.`.
:::

## Anatomy of an Account Side

Every debit, credit, tax, discount, cash, fees, warehouse, coverage and service-fee "side" on the effect pages is the **same building block** — one account-side object. The field ids below use the main debit side (`termConfig.config.debit`) as the example prefix; every other side exposes the same sub-fields under its own prefix (e.g. `termConfig.config.credit.subsidiaryAccountType`, `termConfig.cash.accountSource.type`).

**Side Configuration** `termConfig.config.debit.sideConfig` — Points the side at a reusable, named account-side definition (a master file). Use it to share one account-side setup across many document terms instead of re-entering it per term.

**Account source / Account** `termConfig.config.debit.accountSource.type` + `termConfig.config.debit.accountRef` — How the GL account is resolved: either a fixed account (`accountRef`) or pulled from a source on the document. When the account comes from a referenced entity, `termConfig.config.debit.accountSource.entityType` names that entity type and `termConfig.config.debit.accountSource.fieldID` names the field on it that yields the account. `termConfig.config.debit.accountSource.accFrmBagCrrncy` resolves the account using the bag (portfolio) currency.

**Subsidiary account type** `termConfig.config.debit.subsidiaryAccountType` — The subsidiary/portfolio type (customer, supplier, etc.) used to derive the subsidiary account. `termConfig.config.debit.bagAccountId` carries the bag/portfolio account identifier.

**Narration** `termConfig.config.debit.narrationTemplate` / `termConfig.config.debit.narrationQuery` — The first narration (description) of the ledger line, either from a template or a SQL query. A second narration line is set by `termConfig.config.debit.narration2Template` / `termConfig.config.debit.narration2Query`.

**Dimension sources (sector / branch / department / analysis set)** — Each cost-center dimension can be a fixed value or sourced from a field on the document. Each composite source is shown only when its matching global config flag is enabled (`AddSectorSourceToTerms`, `AddBranchSourceToTerms`, `AddDeptSourceToTerms`, `AddAnalysisSourceToTerms`).

| Dimension | Field ID |
|---|---|
| Sector source | `termConfig.config.debit.sectorSource` |
| Branch source | `termConfig.config.debit.branchSource` |
| Department source | `termConfig.config.debit.departmentSource` |
| Analysis-set source | `termConfig.config.debit.analysisSetSource` |

**Entity dimension & reference dimensions** — A generic entity dimension and up to three generic reference dimensions, each a composite (source type + entity type + field id + fixed value). Each is shown only when its global config flag is on (`AddEntityDimSourceToTerms`, `AddRef1SourceToTerms` … `AddRef3SourceToTerms`).

| Dimension | Field ID |
|---|---|
| Entity dimension source / value | `termConfig.config.debit.entityDimensionSource` / `termConfig.config.debit.entityDimension` |
| Reference 1 source / value | `termConfig.config.debit.ref1Source` / `termConfig.config.debit.ref1` |
| Reference 2 source / value | `termConfig.config.debit.ref2Source` / `termConfig.config.debit.ref2` |
| Reference 3 source / value | `termConfig.config.debit.ref3Source` / `termConfig.config.debit.ref3` |

**Ignore unfound fields in refs and entity dimension** `termConfig.config.debit.ignoreUnfoundFieldsInRefsAndEntityDimension` — Don't fail posting when a referenced source field is missing. Shown when any ref/entity-dimension source is enabled.

**Currency / Rate source field** `termConfig.config.debit.currencySourceField` / `termConfig.config.debit.rateSourceField` — Source fields for the currency and rate of the ledger line; shown when `AddCurrencyAndRateSourceToTerms` is on.

::: tip
In the groups below, "account side" always means a full block with the sub-fields above. Each group note gives only its **prefix** — append any sub-field id to reach a specific setting (e.g. `termConfig.cash.subsidiaryAccountType`).
:::

## Main Debit & Credit

The two primary ledger sides of the document. For an invoice the debit is typically the receivable/inventory side and the credit the revenue/supplier side; the actual account is resolved through the account-side sub-fields above.

**Debit** `termConfig.config.debit` — The main debit account side. Applies to nearly every Supply Chain document that posts to the ledger (all invoices and orders, sales/purchase return, stock receipt/issue/transfer, order delivery/execution/finished, LC cost, cost revaluation, receipt additional cost, etc.). On a Letter-of-Credit opening this side carries the *Down Payment Debit* title; on a cost revaluation it carries the *Adjustment Side* title.

**Credit** `termConfig.config.credit` — The main credit account side, the counterpart to the debit above. On a Letter-of-Credit opening it carries the *Down Payment Credit* title; on a cost revaluation it carries the *Inventory Side* title.

::: info Expense / cost documents
JOrderExpense uses the bare `termConfig.debit` / `termConfig.credit` ids (not under `config`); ReceiptAdditionalCost uses `termConfig.config.debit` / `termConfig.config.credit`.
:::

**Shorten Ledger** `termConfig.config.shortenLedger` — Collapse/net the ledger lines so the posted entry is summarized instead of one line per document line. Applies to invoices, sales/purchase return, stock receipt/issue/transfer and sales-return request.

**Calculate Ledger Trans Date From Field** `termConfig.config.calcLedgerDateFrom` — Use the value of the named field as the ledger transaction date instead of the document date. Stock receipt / issue / transfer only.

**No Accounting Effect** `termConfig.config.noAccountingEffect` — When set, the document creates no GL entry at all. Stock receipt / issue / transfer only.

## Control Journals

A second (control/memo) journal pair posted in parallel to the main entry, for control-journal accounting.

**Debit 2** `termConfig.debit2` — The control-journal debit account side.

**Credit 2** `termConfig.credit2` — The control-journal credit account side.

::: warning Only when control journals are enabled
The Debit 2 / Credit 2 sides are rendered only when **Use Control Journals** is enabled in the Supply Chain configuration. When it is off, these groups do not appear. They apply to invoices, sales/purchase return, stock receipt, stock issue, tender and sales-return request.
:::

## Tax Effects

Taxes are configured two ways depending on the document. Invoices use account-side groups (`cash`, `tax`=tax1, `tax2`, `htax`=tax3, `htax2`=tax4) on the *Other Effects* page; expense/cost documents (JOrderExpense, ReceiptAdditionalCost, LcExpense) use a flat *Taxes Info* group with simple debit/credit accounts.

**Tax Plan** `termConfig.taxPlan` — The tax plan/policy used to compute the document's taxes. Applies to all effect-bearing documents.

**Tax account sides (invoices)** — On invoice-style documents the cash leg and four tax legs are full account sides. Each tax leg also gets a `taxesOtherSide.taxNOtherSide` toggle for its opposite ledger side (see below).

| Side | Field ID (prefix) |
|---|---|
| Cash | `termConfig.cash` |
| Tax 1 | `termConfig.tax` |
| Tax 2 | `termConfig.tax2` |
| Tax 3 | `termConfig.htax` |
| Tax 4 | `termConfig.htax2` |

**Tax debit / credit (expense & cost documents)** — On JOrderExpense, ReceiptAdditionalCost and LcExpense the four taxes are flat debit/credit accounts rather than account-side blocks.

| Tax | Debit | Credit |
|---|---|---|
| Tax 1 | `termConfig.tax1Debit` | `termConfig.tax1Credit` |
| Tax 2 | `termConfig.tax2Debit` | `termConfig.tax2Credit` |
| Tax 3 | `termConfig.tax3Debit` | `termConfig.tax3Credit` |
| Tax 4 | `termConfig.tax4Debit` | `termConfig.tax4Credit` |

**Tax 1..4 other side** `termConfig.taxesOtherSide.tax1OtherSide` … `termConfig.taxesOtherSide.tax4OtherSide` — The opposite ledger side for each tax leg on invoice-style documents.

## Discount Effects

Invoices expose eight discount **account sides** plus a header-discount side on the *Discount Effects* page, each with an "other side" toggle. Expense/cost documents expose a single flat *Discount 1* debit/credit instead.

**Discount account sides (invoices)** — The eight discount sides, each a full account-side block.

| Discount | Field ID (prefix) |
|---|---|
| Line discount | `termConfig.lineDiscount` |
| Invoice (header) discount | `termConfig.invoiceDiscount` |
| Discount 1 | `termConfig.firstDiscountAcc` |
| Discount 2 | `termConfig.secondDiscountAcc` |
| Discount 3 | `termConfig.thirdDiscountAcc` |
| Discount 4 | `termConfig.fourthDiscountAcc` |
| Discount 5 | `termConfig.fifthDiscountAcc` |
| Discount 6 | `termConfig.sixthDiscountAcc` |
| Discount 7 | `termConfig.seventhDiscountAcc` |

**Discount 1 debit / credit (expense & cost documents)** `termConfig.discount1Debit` / `termConfig.discount1Credit` — The flat discount account for the single discount group on JOrderExpense, ReceiptAdditionalCost and LcExpense.

**Discount other sides** `termConfig.taxesOtherSide.discount1OtherSide` … `termConfig.taxesOtherSide.discount8OtherSide`, and `termConfig.taxesOtherSide.headerDiscountOtherSide` — The opposite ledger side for each of the eight additional discounts and for the header (invoice-level) discount.

## Service Fees

Four pairs of debit/credit account sides for separate service-fee charges on the document, plus deduction flags and a guard toggle. Applies to invoices/orders, sales return, purchase invoice, purchase return and sales-return request.

**Service-fee account sides** — Four debit/credit pairs.

| Service fee | Debit | Credit |
|---|---|---|
| Service Fees 1 | `termConfig.serviceFees1Debit` | `termConfig.serviceFees1Credit` |
| Service Fees 2 | `termConfig.serviceFees2Debit` | `termConfig.serviceFees2Credit` |
| Service Fees 3 | `termConfig.serviceFees3Debit` | `termConfig.serviceFees3Credit` |
| Service Fees 4 | `termConfig.serviceFees4Debit` | `termConfig.serviceFees4Credit` |

**Service Fees N Deduction** `termConfig.serviceFees1Deduction` … `termConfig.serviceFees4Deduction` — When set, service fee N is treated as a deduction (subtracted) rather than an added charge.

**Do Not Add Service Fees Effect Without Account Side** `termConfig.doNotAddServiceFeesEffectWithoutAccSide` — Skip the service-fee GL effect entirely when no account side is configured for it.

**Service charge item / percentage / calc type** `termConfig.serviceCharge.item` / `termConfig.serviceCharge.percentage` / `termConfig.serviceCharge.serviceItemCalcType` — Defines the service-charge item, its percentage, and how the service-item amount is calculated.

## Additional Cost & Purchase-Return Difference

Different documents add (landed) additional cost and purchase-return cost differences in different ways.

**Additional Cost Debit / Credit (stock receipt)** `termConfig.config.additionalCostDebit` / `termConfig.config.additionalCostCredit` — Enable the additional-cost debit/credit posting on a stock receipt.

**Additional Cost side (transfers)** `termConfig.additionalCostConfig` — On Stock Transfer / Receipt Stock Transfer / Issue Stock Transfer, the account side used to post additional (landed) cost added to transferred stock, under the *Additional Cost* group.

**Purchase Return Difference Debit / Credit** `termConfig.config.purchaseRetDiffDebit` / `termConfig.config.purchaseRetDiffCredit` — Account sides for the purchase-return cost-difference debit and credit. Stock issue only.

**Warehouse Debit / Credit** `termConfig.warehouseDebit` / `termConfig.warehouseCredit` — A separate inventory/warehouse-side journal pair generated by the order-delivery document, distinct from its main debit/credit. Order Delivery only.

## Letter of Credit

The Letter-of-Credit opening document exposes several extra sides beyond its main debit/credit (which carry the down-payment titles).

**Down Payment Debit / Credit** `termConfig.config.debit` / `termConfig.config.credit` — On an LC opening, the main debit/credit sides carry the *Down Payment Debit* / *Down Payment Credit* titles.

**Fees Debit / Credit** `termConfig.feesDebit` / `termConfig.feesCredit` — Account sides for the LC opening commission/fees posting.

**Covered Debit / Credit** `termConfig.coveredDebit` / `termConfig.coveredCredit` — Account sides for the cash-cover (margin/coverage) portion of the letter of credit, under the *Coverage Effect* group.

**LCExpense Book / Term** `termConfig.lCExpenseBook` / `termConfig.lCExpenseTerm` — The document book and document term used when the LC opening auto-generates its expense document.

## Cost Effect Flags

Toggles on expense/cost documents (JOrderExpense, ReceiptAdditionalCost, LcExpense) that control whether the effect rolls into item cost and how strictly it validates.

**Do Not Affect On Cost** `termConfig.doNotAffectOnCost` (JOrderExpense) / `termConfig.donotAffectOnCost` (ReceiptAdditionalCost, LcExpense) — The expense/cost document does not roll into item cost. The two spellings are layout-specific; both mean the same thing.

**Editable Taxes** `termConfig.editableTaxes` — Allow editing the computed taxes on the document. JOrderExpense, ReceiptAdditionalCost, LcExpense.

**Allow Empty Subsidiary Account Type** `termConfig.allowEmptySubsidiaryAccountType` — Permit posting even when the subsidiary/portfolio account type is not set. JOrderExpense, ReceiptAdditionalCost, LcExpense.

**Allow Empty Sys Distribution Lines** `termConfig.allowEmptySysDistributionLines` — Permit saving when the system cost-distribution lines are empty. ReceiptAdditionalCost only.

**Expense Type** `termConfig.expenseType` — Classifies the job-order expense, controlling how it posts/distributes. JOrderExpense only.

## Which Documents Expose Which Effect Pages

The effect groups present on a document term depend on the document type:

| Document | Effect groups present |
|---|---|
| Sales/Purchase invoices & orders, proforma invoices, replacement, delivery, finished-product pricing, glass job order | Main debit/credit, shorten ledger, control journals, tax effects (cash + tax 1-4 + other sides), discount effects (8 + other sides), external effect lines, approximation discount, service fees |
| Purchase Invoice | Debit/credit, shorten ledger, control journals, tax effects, discount effects, external effect lines, service fees |
| Sales Return, Sales Return Request | Debit/credit, shorten ledger, control journals (Sales Return), tax effects, discount effects, external effect lines, approximation discount, service fees |
| Purchase Return | Debit/credit, shorten ledger, tax effects, discount effects, external effect lines, service fees |
| Tender | Debit/credit, control journals, tax effects, discount effects, external effect lines, approximation discount |
| Stock Receipt | No-accounting-effect, debit/credit, additional cost (debit/credit), shorten ledger, calc-ledger-date, control journals |
| Stock Issue | No-accounting-effect, debit/credit, purchase-return difference debit/credit, shorten ledger, calc-ledger-date, control journals |
| Stock Transfer (+ Receipt/Issue Transfer) | No-accounting-effect, debit/credit, shorten ledger, calc-ledger-date, additional-cost side |
| Order Delivery | Debit/credit + warehouse debit/credit |
| Order Execution, Order Finished, Outsource Receipt, LC Cost | Debit/credit only |
| LcExpense | Debit/credit, taxes info (tax 1-4 + tax plan), discount effects (discount 1), affect-on-cost flags |
| ReceiptAdditionalCost | Debit/credit, taxes info, discount effects, affect-on-cost flags |
| JOrderExpense | Debit/credit, taxes info, discount effects, expense type, affect-on-cost flags |
| LC Opening | Debit/credit (down payment), fees debit/credit, covered debit/credit, LCExpense book/term |
| Cost Revaluation | Debit (Adjustment Side) / credit (Inventory Side) |
