# Mobile Application

## Item Inquiry Screen

This screen allows you to scan a barcode or QR Code, or enter the code manually, to retrieve item data and display it using Tempo templates.

**Available data:**
- **`barcode`** - The scanned or manually entered code
- **`invItemCode`** - Color, size, and unit details ([details](https://dm.namasoft.com/#InvItemCode))
- **`item`** - Item data ([details](https://dm.namasoft.com/#InvItem))
- **`dimensions`** - Current entry dimensions

**Simple example:**
```tempo
Name1: {item.name1} {enter}
Name2: {item.name2} {enter}
Color: {invItemCode.color}{enter}
Size: {invItemCode.size}{enter}
Price: {itemprice(itemIdOrCode=item,colorCode=invItemCode.color,sizeCode=invItemCode.size,legalEntityCodeOrId="01",fieldToDisplay=unitPrice)}{enter}
Price Including Tax: {itemprice(itemIdOrCode=item,colorCode=invItemCode.color,sizeCode=invItemCode.size,legalEntityCodeOrId="01",fieldToDisplay=netValue)}{enter}
```
You can learn more about the `itemprice` pricing function from the Tempo usage guide:
[Sales Price Tempo Function](../../admin/tempo.md#Getting-the-Sales-Price-of-an-Item)
You can also write custom SQL queries to fetch additional data and display it in the template.

**Example query to calculate quantities per warehouse:**
```sql
select w.code, w.name1, net qty from ItemDimensionsQty Q
left join Warehouse w on w.id = q.warehouse_id
where item_id = {item.id}
```
