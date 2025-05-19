# General Purpose Utility Queries
## Get All Dates between two dates
```sql
with dates as (
SELECT  TOP (DATEDIFF(DAY, '20160101', '20161231') + 1)
        cast(DATEADD(DAY, ROW_NUMBER() OVER(ORDER BY a.object_id) - 1, '20160101') as date) dayDate
FROM    sys.all_objects a
        CROSS JOIN sys.all_objects b
)
select * from dates


```

## Repeat row many times depending on the row quantity
```sql
with numbers as (
SELECT  TOP 1000
        ROW_NUMBER() OVER(ORDER BY a.object_id) n
FROM    sys.all_objects a
        CROSS JOIN sys.all_objects b
)
select l.quantityPValue,n.n, * from SalesInvoiceLine l left join numbers n on CEILING(l.quantityPValue)>=n.n

```

## Find Missing Document Numbers
```sql
with numbers as (
SELECT  TOP 1000000
        ROW_NUMBER() OVER(ORDER BY a.object_id) n
FROM    sys.all_objects a
        CROSS JOIN sys.all_objects b
),
docs as (select cast(right(d.code,b.suffixLength) as numeric) num,s.ownerId book_id
 from SequenceEntity s inner join EntitySystemEntry d on d.targetId = s.recordId inner join DocumentBook b on b.id = s.ownerId
where b.autoCode = 1 
)
,maxdoc as(
select book_id, max(num) maxNum from docs group by book_id
)
select b.documentType, b.prefix+RIGHT('00000000000'+cast(n.n as nvarchar(10)),b.suffixLength) missingcode  from maxdoc left join numbers n on n.n <=maxdoc.maxNum left join docs on docs.book_id = maxdoc.book_id and docs.num = n.n
left join DocumentBook b on b.id = maxdoc.book_id
where docs.num is null and b.prefix like '%%'
order by b.documentType, missingcode


```

## Unlink ALL From Docs
::: details Take care before running the query
```sql
update EntitySystemEntry set fromType = null,fromId = null where fromid is not null
```
:::

