---
title: Re-send a Document's Inventory Request One Millisecond Later
module: supplychain
entities: [EntityFlow, StockIssue, StockReceipt, StockTransfer]
groovy: recommended
description: A Groovy manual flow that moves a stock document's creation time 1 millisecond later and sends its inventory transaction request again, so its stock effect is processed again in a definite order.
---

<div class='entity-flows'>

# Re-send a Document's Inventory Request One Millisecond Later

This Groovy script is a manual flow for stock documents. It moves the document's creation time 1 millisecond later and sends the document's inventory transaction request again, so the stock effect is processed again.

::: tip Recommended pattern
This script is not tied to any customer's setup. It has no parameters.
:::

| | |
|---|---|
| **Class name** | `EARegenInvTransReqAndChangeCreationDate` |
| **Script** | [EARegenInvTransReqAndChangeCreationDate.groovy](/groovy-examples/EARegenInvTransReqAndChangeCreationDate.groovy) |
| **Runs on** | Documents that carry their own stock effect: stock issues, stock receipts, stock transfers and similar. Target action **Manual**. |
| **Uses** | No parameters. Leave Parameter 1 empty. |
| **Shipped as** | Source to paste. It is not built into the system. |

## When to use it

Inventory processing puts the movements of an item in order by **value date**, and documents with the same value date by their **creation time**. Two documents that were created in the same instant have no fixed order between them. That happens more often than it sounds: a document and the stock document generated from it are often created in the same millisecond, and so are records imported in one batch.

When such a pair is a receipt and an issue of the same item, the issue can be taken first, and then it finds no stock or takes the wrong cost.

This script moves the document 1 millisecond later and re-sends its inventory request as an update. The document now comes after anything else created in the same instant, and its stock effect is processed again in that order. Nothing else on the document changes.

## How it works

1. **It adds 1 millisecond** to the document's creation date.
2. **It builds the document's inventory transaction request** again and sends it as an **Update**. The request is processed in the background, like any other.
3. **It does not save the document through the screen.** No other effect of the document, such as its ledger entry, is sent again.

Run it once per document. Each run moves the document another millisecond.

## Setting it up

1. Open **Administration → Display Customization → Entity Flow** and create a flow whose **Target Type** is the stock document, for example Stock Issue, and whose target action is **Manual**.
2. Add one line to the **Details** grid with target action **Manual**. Paste the whole script into its **Groovy Script** column and leave **Class Name** empty.
3. Leave **Requires Commit On Manual** unticked on the flow. The script needs no save of the document.
4. Save. **Class Name** now shows the script's class name, and the line's description is filled in.

There are two ways to run it:

- **On one document:** add the flow to the document's screen so that it has a button, then press the button on the document. See [Introduction to Entity Flows](/platform/entity-flows/introduction-to-entity-flows).
- **On many documents:** create a task schedule with the built-in [EARunEntityFlowFromQuery](/entity-flows/core/EARunEntityFlowFromQuery). Its Parameter 1 is this flow's code, and its Parameter 2 a query that returns `entityType, id` of the documents.

## Example

A stock issue `SIV50501202600509_01` and the sales invoice it was generated from were both created at the same instant. With the flow saved as `REGEN-ISSUE`, a task schedule with Class Name `com.namasoft.infor.domainbase.util.actions.EARunEntityFlowFromQuery` and these parameters re-sends it:

| Parameter | Value |
|---|---|
| Parameter 1 | `REGEN-ISSUE` |
| Parameter 2 | `select entityType, id from StockIssue where code = 'SIV50501202600509_01'` |

On the demo database this moved the stock issue's creation time from `…784086` to `…784087` milliseconds. A new inventory request of type **Update** appeared for the issue and was processed, carrying the new creation time.

## The script

<<< @/public/groovy-examples/EARegenInvTransReqAndChangeCreationDate.groovy{groovy}

## Related

- [EAGroovyAction](/entity-flows/core/EAGroovyAction): how Groovy scripts are attached to entity flows and task schedules.
- [EARunEntityFlowFromQuery](/entity-flows/core/EARunEntityFlowFromQuery): runs a manual flow on every record a query returns.
- [Business Requests](/platform/background-processing/business-requests): where the re-sent inventory request can be followed.

</div>
