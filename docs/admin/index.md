---
# Handcrafted landing — GenNamaDocsIndex skips this file because of the .custom-index
# marker in this folder (see hasHandcraftedHomePage in GenNamaDocsIndex.java)
title: System Administration
---

# System Administration

This is the toolkit for keeping a Nama ERP installation healthy. When something goes wrong — a screen hangs, numbers don't add up, costs look off — this is where you find the answers and the queries to fix them. You'll also find the Tempo language manual for crafting dynamic messages, and a deep set of reprocessing utilities for putting inventory, accounting, and module data back in order when it drifts.

## Troubleshooting

When the system misbehaves, start here. These pages walk through diagnosing hangs and answer the questions that come up most often.

<LandingGrid>
  <LandingCard icon="🩺" title="Troubleshooting" link="/admin/troubleshooting/" details="Diagnose system hangs and unresponsiveness, plus general and database-error FAQs all in one place." />
  <LandingCard icon="⏳" title="System Hanging or Unresponsiveness" link="/admin/troubleshooting/troubleshooting-system-hanging.md" details="Track down why the system freezes or stops responding and how to recover." />
  <LandingCard icon="❓" title="General FAQ" link="/admin/troubleshooting/general-faq.md" details="Answers to the everyday questions administrators ask about running Nama ERP." />
  <LandingCard icon="🗄️" title="Database Related Errors FAQ" link="/admin/troubleshooting/database-error-related-faq.md" details="Common database errors and how to resolve them." />
</LandingGrid>

## Reprocessing & Utilities

When stored figures fall out of sync, these utilities recompute them and offer ready-made SQL queries to detect and fix problems across inventory, accounting, manufacturing, fixed assets, and more.

<LandingGrid>
  <LandingCard icon="🔁" title="Reprocessing Transactions" link="/admin/reprocessing/" details="The full collection of reprocessing tools and utility queries for repairing data across modules." />
  <LandingCard icon="📦" title="Quantity, Cost & Stock Ages" link="/admin/reprocessing/reprocess-qty-and-cost.md" details="Recompute inventory quantities, costs, and stock ages when they drift." />
  <LandingCard icon="📒" title="Ledger & Debt Ages Reprocessing" link="/admin/reprocessing/reprocess-ledger-and-debt-ages.md" details="Accounting utilities for reprocessing the ledger and debt ages." />
  <LandingCard icon="🔍" title="Cost & Qty Problem Queries" link="/admin/reprocessing/cost-and-qty-problems.md" details="Queries to detect and fix cost and quantity discrepancies." />
  <LandingCard icon="🏬" title="Inventory Utility Queries" link="/admin/reprocessing/inventory-utilities.md" details="Inventory-related utility queries for investigation and cleanup." />
  <LandingCard icon="🏭" title="Manufacturing Utilities" link="/admin/reprocessing/manufacturing-utilities.md" details="Utility queries for the manufacturing module." />
  <LandingCard icon="🏗️" title="Fixed Assets Utilities" link="/admin/reprocessing/fixed-asset-utilities.md" details="Utility queries for the fixed assets module." />
  <LandingCard icon="🏠" title="Real Estate Utilities" link="/admin/reprocessing/real-estate-utilities.md" details="Utility queries for the real estate module." />
  <LandingCard icon="⚙️" title="Database Operations" link="/admin/reprocessing/db-operations.md" details="Database-related operations for maintaining the installation." />
  <LandingCard icon="🚀" title="Suggest Indexes for Detail Tables" link="/admin/reprocessing/suggest-index-creation.md" details="Suggest indexes to speed up large detail tables." />
  <LandingCard icon="🧰" title="General Purpose Utility Queries" link="/admin/reprocessing/general-purpose-utility-queries.md" details="A grab-bag of general-purpose utility queries." />
  <LandingCard icon="🔗" title="Replication Utilities" link="/admin/reprocessing/replication.md" details="Utilities for working with database replication." />
</LandingGrid>

## Messaging Tools

<LandingGrid>
  <LandingCard icon="📨" title="Tempo Language Manual" link="/admin/tempo.md" details="Build dynamic notifications, emails, SMS, and validation messages with embedded record values." />
</LandingGrid>
