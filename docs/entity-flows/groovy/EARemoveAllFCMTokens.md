---
title: Keep Only a User's Last Mobile Device Token
module: core
entities: [EntityFlow, User]
groovy: recommended
description: A Groovy manual flow on users that keeps only the newest mobile app device token of a user, so push notifications stop going to old phones or arriving several times.
---

<div class='entity-flows'>

# Keep Only a User's Last Mobile Device Token

This Groovy script is a manual flow on users. It clears a user's list of mobile app device tokens down to the last one added, so the user's push notifications reach only the newest device on the list.

::: tip Recommended pattern
This script is not tied to any customer's setup. It has no parameters.
:::

| | |
|---|---|
| **Class name** | `EARemoveAllFCMTokens` |
| **Script** | [EARemoveAllFCMTokens.groovy](/groovy-examples/EARemoveAllFCMTokens.groovy) |
| **Runs on** | User. Target action **Manual**. |
| **Uses** | No parameters. Leave Parameter 1 empty. |
| **Shipped as** | Source to paste. It is not built into the system. |

## When to use it

When a user works with one of the Nama mobile apps on a device, the app registers that device's push-notification token with the server. The server adds it to the user's **User Device Tokens For Mobile Apps** and sends every push notification to every token on that list.

A token leaves the list only when the app itself asks the server to remove it. A user who changes phones, reinstalls the app or simply stops using an old tablet leaves the old token behind. After a while the user gets the same notification on two or three devices, or a manager's approval requests keep reaching a phone that now belongs to someone else.

The field cannot be edited on the user screen. This script is the way to clean it: it keeps the newest token on the list, the last one added, and drops the others.

## How it works

1. **It reads the user's token list.** A user with no tokens is left as is.
2. **It removes repeated tokens**, keeping the first place each one appears.
3. **It keeps the last token** of the list and removes all the others.

The change is saved by the run itself. The user does not need to be opened or saved.

## Setting it up

1. Open **Administration → Display Customization → Entity Flow** and create a flow whose **Target Type** is **User** and whose target action is **Manual**.
2. Add one line to the **Details** grid with target action **Manual**. Paste the whole script into its **Groovy Script** column and leave **Class Name** empty.
3. Leave **Requires Commit On Manual** unticked.
4. Save. **Class Name** now shows the script's class name, and the line's description is filled in.

Then run it:

- **For one user:** add the flow to the user screen so that it has a button, and press the button on that user. See [Introduction to Entity Flows](/platform/entity-flows/introduction-to-entity-flows).
- **For every user who has tokens:** create a task schedule with the built-in [EARunEntityFlowFromQuery](/entity-flows/core/EARunEntityFlowFromQuery). Its Parameter 1 is this flow's code, and its Parameter 2 a query such as:

```sql
select entityType, id from NaMaUser where fcmDeviceTokens is not null
```

## Example

On the demo database, the mobile app's token registration was called three times for the user `admin` with three different tokens, so **User Device Tokens For Mobile Apps** held `grvaTokA,grvaTokB,grvaTokC`. A task schedule with Class Name `com.namasoft.infor.domainbase.util.actions.EARunEntityFlowFromQuery` ran this flow on that user. Afterwards the field held only `grvaTokC`.

When the user later uses the app on another device, that device's token is added to the list again, as usual.

## The script

<<< @/public/groovy-examples/EARemoveAllFCMTokens.groovy{groovy}

## Related

- [EAGroovyAction](/entity-flows/core/EAGroovyAction): how Groovy scripts are attached to entity flows and task schedules.
- [EARunEntityFlowFromQuery](/entity-flows/core/EARunEntityFlowFromQuery): runs a manual flow on every record a query returns.

</div>
