<rtl>

# تطبيق الهواتف المحمولة

## شاشة الاستعلام عن صنف

تتيح هذه الشاشة مسح الباركود أو QR Code أو إدخال الكود يدوياً لاسترجاع بيانات الصنف وعرضها باستخدام قوالب Tempo.

**البيانات المتاحة:**
- **`barcode`** - الكود الممسوح أو المدخل يدوياً
- **`invItemCode`** - تفاصيل اللون والمقاس والوحدة ([التفاصيل](https://dm.namasoft.com/#InvItemCode))
- **`item`** - بيانات الصنف ([التفاصيل](https://dm.namasoft.com/#InvItem))
- **`dimensions`** - محددات الدخول الحالية

**مثال بسيط:**
```tempo
Name1: {item.name1} {enter}
Name2: {item.name2} {enter}
Color: {invItemCode.color}{enter}
Size: {invItemCode.size}{enter}
Price: {itemprice(itemIdOrCode=item,colorCode=invItemCode.color,sizeCode=invItemCode.size,legalEntityCodeOrId="01",fieldToDisplay=unitPrice)}{enter}
Price Including Tax: {itemprice(itemIdOrCode=item,colorCode=invItemCode.color,sizeCode=invItemCode.size,legalEntityCodeOrId="01",fieldToDisplay=netValue)}{enter}
```
يمكنك معرفة المزيد عند دالة الأسعار `itemprice` من دليل استعمل tempo
[Sales Price Tempo Function](tempo.md#Getting-the-Sales-Price-of-an-Item)
يمكنك أيضاً كتابة استعلامات SQL مخصصة لجلب بيانات إضافية وعرضها في القالب.

**مثال استعلام لحساب الكميات بكل مخزن:**
```sql
select w.code, w.name1, net qty from ItemDimensionsQty Q
left join Warehouse w on w.id = q.warehouse_id
where item_id = {item.id}
```

</rtl>
