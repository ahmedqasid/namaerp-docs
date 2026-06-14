# Some Information About Using This Site

This site contains technical documentation for the **Namasoft ERP** system.

The content is divided into three main sections:

1. **Usage Guide**: Covers explanations of system reports, Entity Flows, the Tempo language, and more.
2. **Various Examples**: Includes ready-made scenarios and code that can be copied or imported.
3. **Common Questions and General Issues**: Contains concise solutions to the most frequently asked questions and problems.

---

## How to Import Examples in Embedded JSON Format

In some cases, code in JSON format is provided that can be imported directly into the system.
For example, in the FAQ section on approvals, you might find the following example:

```json
{
  "approvalEntity": "StockTransfer",
  "steps": [
    {
      "stepSeq": 1,
      "name1": "موافقة أمين المخزن",
      "responsible": {
        "responsibleType": "Field",
        "fieldId": "toWarehouse.warehouseKeeper,toWarehouse.warehouseKeeper.directSupervisor"
      }
    }
  ]
}
```

### To Import the Example into the System:

* Copy the code content.
* Open the **Approval Definition** screen.
* Press `Alt + Ctrl + X`.
* From the "More" menu, choose **Import Into Current Record**.
* Paste the code into the JSON field.
* If you want to add the lines to the existing lines instead of replacing them, enable the **Add To Current Lines** option.

---

## Copying an Example to Use in Documentation

If you want to copy a record from the system in a simplified format to include in an article on this site:

* Go to the desired record.
* Press `Alt + Ctrl + X`.
* From "More", choose **Simple Export For Docs**.
* Copy the content and paste it into the article.


## Links for Options and Tools

To make it easier to launch various tools and options within the system, many articles contain launcher links in the following format:

<UtilityLinkBuilder
  className="com.namasoft.erp.gui.server.RecommitFromFile"
  :params="[
    { title: 'Main File', default: 'e:/rc/recommit.txt' },
    { title: 'Done File', default: 'e:/rc/done.txt' },
    { title: 'Errors File', default: 'e:/rc/errors.txt' }
  ]"
  :gui="true"
/>

When the link is displayed, you will find two buttons next to it:

### First Button:

<CopyIcon/>  
The copy button — allows you to copy the link as-is and use it directly in your browser or within the system's tools.

### Second Button:

<svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="width: 24px; height: 24px;stroke-width: 2;"><path d="M17.94 17.94A10.93 10.93 0 0112 20c-7 0-11-8-11-8a21.55 21.55 0 014.22-5.89M9.88 9.88A3 3 0 0114.12 14.12M3 3l18 18" /></svg>
The edit button — when clicked, a text field appears that allows you to modify the **server address** before launching the tool, making it easy to copy the complete link after editing or navigate to it directly.
