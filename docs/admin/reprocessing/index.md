---
# Handcrafted landing — GenNamaDocsIndex skips this file because of the .custom-index
# marker in this folder (see hasHandcraftedHomePage in GenNamaDocsIndex.java)
title: Reprocessing and Utilities
---

# Reprocessing and Utilities

This folder holds the recovery tools: the scripts and utilities that rebuild quantities, costs, ledger balances and debt ages for a database whose numbers are already wrong. They are not maintenance, they are not routine, and none of them is a first response.

::: danger Read this before you run anything here
**One document behaving oddly is never a reason to rebuild a database.** A single document that has no accounting or inventory effect is fixed from the [Business Requests](/platform/background-processing/business-requests) screen — find its request, read why it failed, fix the cause, reprocess that one request.

The tools on these pages empty and rebuild whole tables. On a large database a full rebuild runs for **days**, the system is unusable while it runs, and there is no undo. Before you start any of them: take a backup, agree the downtime with the customer, and stop the application server where the page tells you to.
:::

## Where to start, by symptom

| What you are seeing | Go to |
|---|---|
| One document has no ledger entry or no stock effect | [Business Requests](/platform/background-processing/business-requests) — not this folder |
| Item balances or costs are wrong across many documents | [Reprocessing Quantity, Cost, and Stock Ages](/admin/reprocessing/reprocess-qty-and-cost.md) |
| Account balances or customer/supplier ageing are wrong | [Ledger and Debt Ages Reprocessing](/admin/reprocessing/reprocess-ledger-and-debt-ages.md) |
| You suspect something is wrong but cannot yet name it | [Queries to Check for (and Fix) Cost And Qty Problems](/admin/reprocessing/cost-and-qty-problems.md) |
| The problem is inside one module | The module's utilities — inventory, manufacturing, fixed assets or real estate, below |
| A site is out of step with head office | [Replication Utilities](/admin/reprocessing/replication.md) |
| Everything is correct but painfully slow | [Suggest Indexes for Large Detail Tables](/admin/reprocessing/suggest-index-creation.md) |

## The order to work in

1. **Read before you write.** Start with the diagnostic queries. They report; they change nothing, and they tell you how wide the problem really is.
2. **Fix the narrowest thing that explains it.** A failed business request, one document, one dimension.
3. **Rebuild one area** — quantities and cost, or the ledger, or one module's tables — only once you know that area is the one at fault.
4. **A full rebuild is last**, with a backup, an agreed window and the server stopped.

If step 1 does not explain the symptom, that is the moment to escalate rather than to widen the blast radius.

## Find the problem first

<LandingGrid>
  <LandingCard icon="🔍" title="Cost and Quantity Problems" link="/admin/reprocessing/cost-and-qty-problems.md" details="Queries that compare cost against the ledger document by document and show where the two disagree." />
  <LandingCard icon="🧰" title="General Purpose Utility Queries" link="/admin/reprocessing/general-purpose-utility-queries.md" details="Everyday investigative queries that apply to any module." />
  <LandingCard icon="⚡" title="Suggest Indexes for Large Detail Tables" link="/admin/reprocessing/suggest-index-creation.md" details="Find the detail tables whose size is slowing the installation down, and what to index." />
</LandingGrid>

## Rebuild balances

<LandingGrid>
  <LandingCard icon="📦" title="Reprocessing Quantity, Cost and Stock Ages" link="/admin/reprocessing/reprocess-qty-and-cost.md" details="The full rebuild of inventory quantities, costs and stock ages — backup, downtime and a stopped server required." />
  <LandingCard icon="📒" title="Ledger and Debt Ages Reprocessing" link="/admin/reprocessing/reprocess-ledger-and-debt-ages.md" details="Rebuild account balances and customer/supplier ageing when the ledger no longer agrees with the documents." />
</LandingGrid>

## Module utilities

<LandingGrid>
  <LandingCard icon="🏬" title="Inventory Utilities" link="/admin/reprocessing/inventory-utilities.md" details="Targeted queries and fixes for stock documents, serials and warehouse data." />
  <LandingCard icon="🏭" title="Manufacturing Utilities" link="/admin/reprocessing/manufacturing-utilities.md" details="Repairs for assembly documents, production orders and their cost effects." />
  <LandingCard icon="🏗️" title="Fixed Assets Utilities" link="/admin/reprocessing/fixed-asset-utilities.md" details="Depreciation, asset cards and the entries behind them." />
  <LandingCard icon="🏢" title="Real Estate Utilities" link="/admin/reprocessing/real-estate-utilities.md" details="Units, contracts and instalment data that has drifted out of line." />
</LandingGrid>

## Database and sites

<LandingGrid>
  <LandingCard icon="🗄️" title="Database Related Operations" link="/admin/reprocessing/db-operations.md" details="Server-level operations on the database itself — the most destructive page in this folder." />
  <LandingCard icon="🔁" title="Replication Utilities" link="/admin/reprocessing/replication.md" details="Diagnose and repair a site that has fallen out of step with head office." />
</LandingGrid>
