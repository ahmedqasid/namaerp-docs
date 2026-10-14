---
title: Fill Postal Parcels Sort Lines From IPS
module: frm
entities: [EntityFlow, IPSPostalParcelsSort]
groovy: recommended
description: A Groovy script that asks IPS about every line of an IPS Postal Parcels Sort and fills in the mail item's weight, classification, origin country, HS codes, receiver name and description.
---

<div class='entity-flows'>

# Fill Postal Parcels Sort Lines From IPS

This Groovy script fills in the lines of an **IPS Postal Parcels Sort** from IPS in one go. For every line it looks up the **Mail Item Id** in IPS and copies what IPS knows about the item onto the line.

::: tip Recommended pattern
This script is not tied to any customer's setup. You can paste it as it is; it takes no parameters. It needs a working IPS connection.
:::

| | |
|---|---|
| **Class name** | `EAIPSCDSFetchMailItemData` |
| **Script** | [EAIPSCDSFetchMailItemData.groovy](/groovy-examples/EAIPSCDSFetchMailItemData.groovy) |
| **Runs on** | IPS Postal Parcels Sort, usually on a **Manual** line |
| **Uses** | No parameters. Leave Parameter 1 empty. |
| **Shipped as** | Source to paste. It is not built into the system. |

## When to use it

On the sort screen, typing or scanning a **Mail Item Id** already looks the item up in IPS, one line at a time, as described in [IPS Integration](/modules/freight/ips-integration#Reading-from-IPS). That look-up does not happen when it cannot:

- when **Do Not Fetch Data From IPS** was ticked, for example because IPS was unreachable while the items were being scanned;
- when the lines did not come through the screen at all, for example when they were imported.

Those lines are saved with only their mail item numbers. This script catches up afterwards: run it on the document once IPS is reachable, and every line gets the data it missed.

## How it works

1. **It asks IPS about each line.** For every line, it sends the line's **Mail Item Id** to IPS, the same look-up the screen makes.
2. **It fills in what comes back.** It sets **Mail Item Weight IPS** (only when IPS returns a weight that is not zero), **Mail Subclass Id**, **Origin Country**, **Mail Class**, **Mail Category**, **HS Code**, **Revised HS Code**, **Receiver Name** and **Mail Item Description**.
3. **It keeps what IPS does not return.** A value IPS leaves empty does not clear the one already on the line, and a line IPS knows nothing about is left as it is.

Like the screen's look-up, the origin country comes from the last two letters of the mail item number, and a mail class, subclass, category or country that Nama does not have yet is created with the code IPS returns.

::: warning One IPS call per line
The script calls IPS once for every line, one after the other. On a sort with hundreds of items this takes a while. Run it when the IPS connection is up.
:::

## Setting it up

1. Open **Administration → Display Customization → Entity Flow** and create a new flow with **Target Type** set to **IPS Postal Parcels Sort**.
2. Add a line to the **Details** grid with **Target Action** set to **Manual**. Paste the whole script from the file above into **Groovy Script**, and leave **Class Name** empty: it is filled in when you save.
3. Save the flow. **Class Name** shows the script's class name, and the description appears in **Description**.
4. Add the flow to the sort screen's actions, as described under [Manual Execution](/platform/entity-flows/introduction-to-entity-flows), so that users can run it from the screen. To fill a document, open it, run the flow, then save the document. Tick **Requires Commit On Manual** on the flow if it should save the document by itself.

| Parameter | Title shown after saving | What to enter |
|---|---|---|
| Parameter 1 | Not used - leave empty | Nothing. |

A **Manual** line is the safe choice, because the script then calls IPS only when someone asks for it. It can also run on a save event, such as **Pre Update Calculated Fields**, but then every save of the document calls IPS for every line.

## Example

Twenty parcels are scanned into a sort while IPS is down, with **Do Not Fetch Data From IPS** ticked so that scanning can go on. Each line holds only its mail item number. The next morning, with IPS back, the supervisor opens the sort, runs the flow and saves. Each line now carries what IPS returned for its item: weight, classification, origin country, HS codes, receiver's name and description, as if the items had been scanned with the look-up on.

## The script

<<< @/public/groovy-examples/EAIPSCDSFetchMailItemData.groovy{groovy}

## Related

- [EAGroovyAction](/entity-flows/core/EAGroovyAction): how Groovy scripts are attached to entity flows and task schedules.
- [IPS Integration](/modules/freight/ips-integration)
- [Mail Items](/modules/freight/ips-mail-items#Postal-Parcels-Sort)

</div>
