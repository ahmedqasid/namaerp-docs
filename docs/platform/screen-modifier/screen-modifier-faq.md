# Screen Modifier — Frequently Asked Questions

## I changed a Screen Modifier and saved it, but the screen looks the same. Why?

Saving a Screen Modifier records your *instructions* — it does not rebuild the screens. Screens are built and cached separately, so after saving you must regenerate them:

- Run **Regenerate GUI For Applicable Types Only** to rebuild just the screens this modifier targets (the quick, safe choice), or
- Run **Regenerate Screens** to rebuild every screen with the system defaults and all active user modifiers.

Then reopen the screen to see your change. See [Making your changes take effect](/platform/screen-modifier/screen-modifier-overview.md#Making-your-changes-take-effect) for the full picture.

## How can I control the fields displayed in the discussions block?

**Example: I want to remove references or attachments from the discussions section in the "Sales Invoice" screen.**

You can control the fields shown inside the discussions block for any screen via a Screen Modifier:

* Open (or create) the **Screen Modifier** for the type you want (e.g. `SalesInvoice`).
* Go to the field group named **Edit Discussion Fields**.
* You'll find seven options you can switch on as needed:
    * **Remove discussion field**
    * **Remove attachment 1**
    * **Remove attachment 2**
    * **Remove attachment 3**
    * **Remove attachment 4**
    * **Remove reference 1**
    * **Remove reference 2**
* Switch on the options you want to hide.
* Save the modifier.
* Then run one of:
    * **Regenerate Screens** to rebuild all screens, or
    * **Regenerate GUI For Applicable Types Only** to update only the types you modified.

The references, attachments or discussion field are then hidden according to your choices.

## How do I apply the same change to several screens at once?

Set **Applicable For** to **EntityType List** and list every type in **For Type List**. The modifier's instructions are then applied to all of them. For a change that should hit *every* screen of a kind, use the **Master Files**, **Documents** or **All Screens** scopes instead.

## What's the difference between Modify and Copy?

**Modify** changes the screen users already open. **Copy** leaves the original untouched and produces a separate, named layout (you give it a code in **Layout Id**) — use it to offer an alternative version of a screen alongside the standard one. See [Modify or Copy](/platform/screen-modifier/screen-modifier-overview.md#Modify-or-Copy-Effect-Type).

## Two modifiers touch the same screen. Which one wins?

Modifiers run in **Priority** order, so priority decides the outcome when two of them change the same part of a screen. Adjust the priorities to control which change is applied last. Only **activated** modifiers run at all.

## How do I override the system's default screen for the whole database, or for one company?

Save your layout under the code **`dbdefault`** to override the system default database-wide, or under **`legalentitycodedefault`** (using a company's real code) to give that company its own default. Always make sure the code/path matches the new code you're using. See [Layout codes](/platform/screen-modifier/screen-modifier-overview.md#Layout-codes-and-overriding-the-default).

## How do I show a reference's code, name or image as its own column?

Append `.code`, `.name` or `.image` to the column's field id — for example `lines.account.code`, `lines.account.name`, `lines.account.image`. This works for list columns, search columns and grid columns. See [Reference columns](/platform/screen-modifier/screen-modifier-list-and-search.md#Reference-columns-code-name-and-image).

## Is there an easier way than filling all those collections by hand?

Yes — use the [Visual Layout Editor](/platform/screen-modifier/screen-modifier-visual-editor.md). Open it with **Open In Editor** (or **Open Screen Modifier** from a list view) and redesign the screen on a canvas; it writes your changes back into the modifier for you.

## How do I get a screen back to its out-of-the-box design?

Run **Reset To System Defaults** to discard user customizations and rebuild from the system defaults. To clean up layout records nothing points at any more, run **Delete Unused Layouts**.
