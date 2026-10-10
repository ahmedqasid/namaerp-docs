---
title: EAWebEngageSendInvoice
module: supplychain
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAWebEngageSendInvoice

## Overview

Sends a sales invoice (or sales return) to the WebEngage marketing platform. It first creates or updates the customer's WebEngage profile, then sends a purchase event carrying the invoice totals, discounts and coupon, payment method, shipping address, and the full list of items. Every attempt is recorded in the **WebEngage Send Log**, so you can see what was sent and whether it succeeded.

## When This Action Runs

Attach it to a sales document's after-commit event (sales invoice, sales return, or another sales document). Draft invoices are skipped. Turn on **Check Before Send** (Parameter 7) if the event can fire more than once for the same invoice, so the invoice is not sent twice.

## How It Works

1. **Skips drafts** - If the invoice is a draft, nothing is sent.
2. **Checks the send log** - When Check Before Send is `true` and the log already has a successful send for this invoice, the action stops.
3. **Identifies the customer** - The invoice must have a customer. The WebEngage user id is the customer's mobile number, otherwise the email, otherwise the customer code. Mobile numbers are cleaned of spaces and dashes; a number without `+` or `00` is treated as a Saudi number (leading zeros removed, `966` added).
4. **Updates the customer profile** - Sends first and last name (split from Name 1), email, phone, gender, birth date, Arabic and English names, customer code, customer class and customer category. A failure here is reported but the event is still sent.
5. **Sends the purchase event** - With the event name from Parameter 4 and the invoice value date as the event time. The event includes:
   - order id (invoice code) and reference id (for a return, the code of the original invoice it was made from)
   - subtotal, shipping fee, tax amount and rate, discount total, total, the total in the store currency, and the currency code
   - each discount (header discount, discounts 1 to 8) and the discount coupon from the header or the payment lines, with its code and type
   - payment method (the first payment line that is not a coupon), shipping city and country (shipping address, else billing address)
   - item lines with quantity, prices, discounts, tax, category, brand, product type, tags, product URL and image, and size/color/revision options, plus combined product names, categories, brands, tags and product ids
   - order source (`pos` when offline, `online` otherwise); for offline orders also the branch as the store, store city and region, and the salesman as the staff member
   - invoice link (when Parameter 6 is set), invoice type, and source
6. **Logs the result** - Saves a send log row with the send date, event name, success flag and any error messages (and the request and response bodies when Parameter 14 is `true`). If the event failed, the action reports the error.

## Parameters

**Parameter 1:** License Code (Required) - Your WebEngage license code.

**Parameter 2:** API Key (Required) - Your WebEngage REST API key.

**Parameter 3:** Region (SAUDI_ARABIA) (Optional) - The WebEngage data center: `SAUDI_ARABIA`, `GLOBAL` or `INDIA`. Empty or unknown values use `SAUDI_ARABIA`.

**Parameter 4:** Event Name (Required) - The name of the event created in WebEngage, for example `Order Completed`.

**Parameter 5:** Source (default: ERP) (Optional) - Text sent as the event's `source`. Default: `ERP`.

**Parameter 6:** Invoice Link Tempo (e.g: https://x.namasoft.com/erp/r/i/{retrieverFileId}.pdf ) (Optional) - A Tempo template rendered on the invoice to build a link to it, sent as `invoice_url`.

**Parameter 7:** Check Before Send (true/false) - skip if already sent (Optional) - `true` skips invoices that already have a successful send in the log. Default: `false`.

**Parameter 8:** Is Offline (true/false) - default: true (Optional) - `true` marks the order as an in-store (POS) order and adds store and staff details; `false` marks it as an online order. Default: `true`.

**Parameter 9:** Shipping Fee Field (service1Fees/service2Fees/service3Fees/service4Fees/none - default: service1Fees) (Optional) - Which invoice service fee is sent as the shipping amount. `none` sends zero.

**Parameter 10:** Store City Tempo (offline orders, e.g: {branch.name1}) (Optional) - Tempo template rendered on the invoice for the store city. Used for offline orders only.

**Parameter 11:** Store Region Tempo (offline orders) (Optional) - Tempo template rendered on the invoice for the store region. Used for offline orders only.

**Parameter 12:** Product URL Tempo (rendered on the item, default: item url1) (Optional) - Tempo template rendered on each item for its product URL. Default: the item's URL 1.

**Parameter 13:** Product Image Tempo (rendered on the item, default: item url2) (Optional) - Tempo template rendered on each item for its image URL. Default: the item's URL 2.

**Parameter 14:** Log Sent Payloads (true/false) - keep request and response on the send log, default: false (Optional) - `true` keeps the full request and response of both calls on the send log row, which helps when troubleshooting. Default: `false`.

## Important Notes

- Item names are sent in Name 2 when the item has one, otherwise in Name 1.
- Item category is the item's Category 1, or Item Class 1 when Category 1 is empty.
- A line with no quantity is sent with a quantity of 1.

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.webengage.EAWebEngageSendInvoice`

## Related Actions

- [EASendInvoiceToDatanuum](EASendInvoiceToDatanuum.md) - sends sales invoices to another external platform


</div>
