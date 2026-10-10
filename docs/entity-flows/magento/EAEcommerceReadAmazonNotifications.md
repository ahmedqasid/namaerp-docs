---
title: EAEcommerceReadAmazonNotifications
module: magento
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAEcommerceReadAmazonNotifications

## Overview

Reads the Amazon `ORDER_CHANGE` notifications waiting in the Amazon SQS queue of an Amazon e-commerce site and imports the orders they refer to. Amazon delivers these notifications only to an SQS queue in your own AWS account, never directly to the ERP, so this action pulls the queue on a schedule. Because Nama pulls rather than waits to be called, it also works for an ERP that cannot be reached from the internet.

See [Amazon Order Notifications](/modules/ecommerce/amazon-order-notifications) for the full AWS and site setup.

## When This Action Runs

From a Task Schedule, typically every one or two minutes. It ignores the record it runs on; everything it needs comes from the site given in the first parameter.

## How It Works

1. **Finds the site** - Looks up the e-commerce site (`MAGMagentoSite`) by the code in parameter 1 and stops with an error if none is found.
2. **Checks the queue settings** - The site must have its **Amazon SQS Queue ARN**, **AWS Access Key** and **AWS Secret Key** filled in. The AWS region and queue address are taken from the ARN.
3. **Drains the queue** - Receives messages from the queue, ten at a time, until the queue is empty or the per-run maximum (parameter 2) is reached.
4. **Drops notifications older than the cutoff** - A notification whose event time is before the cutoff date (see parameter 3) is deleted from the queue without being processed.
5. **Groups by order** - Several notifications for the same Amazon order are collapsed into one, keeping the latest. The order is then read only once.
6. **Applies the status filter** - If parameter 4 is filled and the latest status of an order is not in the list, its notifications are deleted from the queue without being processed.
7. **Imports each order** - Reads the order fresh from Amazon's Orders API and saves it through the site's normal order import. An order whose status has not changed since it was last saved is skipped.
8. **Cleans up** - Notifications that were processed successfully are deleted from the queue. A notification that failed is left on the queue so it is retried on the next run (and, after the queue's maximum receive count, moved to its dead-letter queue if you configured one). The failure is added to the run's result.

## Parameters

**Parameter 1:** Site Code (Required) - The code of the Amazon e-commerce site record.

**Parameter 2:** Max Messages Per Run (empty = 500) (Optional) - The most messages to take from the queue in one run. Must be a whole number. Empty or zero means 500.

**Parameter 3:** Process Notifications For Last (N) days (empty = all) (Optional) - A number of days. Notifications whose event time is older than today minus this many days are removed from the queue without being processed. When empty, the cutoff is the site's last order-read date if the site has one; if it has none, notifications of any age are processed.

**Parameter 4:** Process Only Order Statuses (comma separated, empty = all) (Optional) - A comma-separated list of Amazon order statuses, for example `Shipped`. The comparison ignores letter case. Orders whose latest status is not in the list are removed from the queue without being imported. Empty processes every status.

## Important Notes

- Parameters 3 and 4 do not just skip notifications: the skipped notifications are **deleted** from the queue and will not come back on a later run.
- Several queued changes to one order cost a single read of the order from Amazon, which keeps busy queues within Amazon's rate limits.

**Module:** magento

**Full Class Name:** `com.namasoft.modules.magento.utils.EAEcommerceReadAmazonNotifications`

## Related Actions

- [EAAmazonReadRefundsAsReturns](EAAmazonReadRefundsAsReturns.md)
- [EAEcommerceReadOrders](EAEcommerceReadOrders.md)
- [EAEcommerceReadOrdersFromDate](EAEcommerceReadOrdersFromDate.md)


</div>
