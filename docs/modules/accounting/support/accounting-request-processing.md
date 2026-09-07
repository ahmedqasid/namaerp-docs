# How Documents Are Processed Into Accounting Effects (and reprocessing a stuck request)

This is the most important page for the support team in the accounting module. It explains what happens **after** you save a document: how it turns into an effect in the general ledger, why it might get stuck, and how to reprocess it yourself without technical intervention.

## Why isn't the effect recorded instantly?

When you save an invoice or a voucher, the system doesn't write its accounting effect line by line at that very moment. Instead it creates a **business request** that is processed in the background. The benefit is twofold: saving becomes **instant** for the user, and processing becomes **reliable and retryable** if an error occurs, instead of the whole save failing.

There are two main kinds of request:

- **Ledger transaction request** (LedgerTransReq) — records the effect in the general ledger. This is what this page concerns.
- **Inventory transaction request** (InvTransReq) — records the inventory effect (quantities and costs).

## Processing status

Every document carries a **processing status** that tells you how far its request got:

- **Queued** — the request was created and is waiting its turn.
- **Processing** — it's being processed now.
- **Processed** — the accounting effect was written successfully.
- **Failed** — processing stalled for some reason (closed period, an under-configured account, a transaction prevention...).

## The Business Requests list: where to monitor and fix

When a request gets stuck or is delayed, the natural destination is the **Business Requests** list. From it:

1. **Open the list** and view the requests.
2. **Filter by status** (e.g., failed) and by document type and date, to quickly reach the stuck requests. The displayed columns help: document, status, value date.
3. **Select the stuck row(s)**.
4. From the **More** menu choose **Reprocess** or **Recommit** to retry after the cause is handled.

::: tip What's the difference between Reprocess and Recommit?
Both retry writing the effect; use Reprocess as a first step, and if the stall persists, try Recommit. The key is to **handle the cause first** (open the period, complete the account setup, remove the prevention document) and then retry.
:::

## Common causes of failure

- **Closed period** — the document's date falls in a closed accounting period (see [Year-end & period control](../year-end-and-period-control.md)).
- An active **Prevent Accounting Transactions** document covering the account/subsidiary/date.
- **Incomplete account setup** — a subsidiary account with no party specified, or an account with "prevent changing balance nature" enabled (see [Accounts](../accounts.md)).
- **Incomplete document term** — a required account not specified in the term.

## The bulk administrative tool

There's an **administrative tool** for bulk reprocessing (to rebuild the ledger and debt ages at scale). This is an **emergency/recovery** tool under technical supervision, not the day-to-day path. The normal daily path is the **Business Requests** list described above.

## For Support

- **"The document is saved but has no effect in the accounts"** — check the **processing status**; if it's "Failed", handle the cause then reprocess from the Business Requests list.
- **"I handled the cause but the status is still Failed"** — you must retry manually (Reprocess/Recommit); handling the cause alone doesn't always retry automatically.
- Options related to processing tolerance and closing with unprocessed transactions are in the [Accounting configuration](./accounting-configuration.md) catalog.
