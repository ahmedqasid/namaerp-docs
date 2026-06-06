# Frequently Asked Questions about Screen Modifier

## How can I control the fields displayed in the discussions block?

### Example: I want to remove references or attachments from the discussions section in the "Sales Invoice" screen

You can control the fields displayed inside the discussions block for any screen in Nama ERP via **Screen Modifier**.

To do this:

* Go to the **Screen Modifier** for the desired type (e.g. `SalesInvoice`).
* Then navigate to the field group named: `Edit Discussion Fields`.
* You will find 7 options that can be enabled as needed:

    * **Remove discussion field**
    * **Remove attachment 1**
    * **Remove attachment 2**
    * **Remove attachment 3**
    * **Remove attachment 4**
    * **Remove reference 1**
    * **Remove reference 2**
* Enable the options you want to hide from the screen.
* Save the modification.
* After that, run one of the following commands:

    * `Regenerate Screens` to regenerate all screens.
    * Or `Regenerate Screens For Applicable Types Only` to update only the types that were modified.

This will hide the references, attachments, or discussion field according to the customization you applied.
