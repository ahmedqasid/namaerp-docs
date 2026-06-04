# ORACLE JDBC Integration Connection in context.xml for integration purposes

```xml
<Resource name="jdbc/ldm" auth="Container" type="javax.sql.DataSource"
		factory="org.apache.tomcat.jdbc.pool.DataSourceFactory" maxActive="10000"
		maxIdle="20" maxWait="10000" username="username" password="password"
		driverClassName="net.sf.log4jdbc.DriverSpy" validationQuery="SELECT 1 FROM DUAL"
		testWhileIdle="true"
		url="jdbc:log4jdbc:oracle:thin:@192.168.80.80:1521:ldm"
		timeBetweenEvictionRunsMillis="24000000" testOnBorrow="true"/>

```


> [! WARNING]
> 
> There is a problem with oracle and long column names, the max length of any column name is 30 characters, SQLImporter needs long names for columns. As a solution to this problem, we implemented the following ticket: [https://namasoft.com/reqs/ECDR03542](https://namasoft.com/reqs/ECDR03542)
This is the ticket content:
Oracle DB does not allow aliases longer than 30 characters, this creates a problem with SQLImporter entity flow that we use to do DB level integration with other systems

> [! Solution]
> 
> As a solution, we need to add special columns after columns that need a long name. As an example this is an actual details importer query for integration with NTME Lab Information Systems (LDM):

```sql
select '' ":-detail:details", r.REQUEST_ID "#description1",'1000001' "details.item.itemCode",'1000001' "details.item.item",rl.SERVICE_CODE "details.n1",rl.SERVICE_NAME "details.text1",'1' "details.quantity.quantity.primeQty.value",'101' "details.quantity.quantity.primeQty.uom",
rl.CASH_FEES "details.price.unitPrice",rl.DISCOUNT "details.price.discount1.value"
from Request_Services rl
left join Requests r on rl.REQUEST_ID = r.REQUEST_ID
where r.REQUEST_ID = '468273'
```

#### Unfortunately oracle rejects this query because the aliases details.quantity.quantity.primeQty.value, details.quantity.quantity.primeQty.uom  are too long (more than 30 characters long). The following modified query will work, we added two 'dummy' columns with an alias starting with the symbol $alias$ in its alias and the actual alias in the value, Nama will remove those pseudo columns:

```sql
select '' ":-detail:details", r.REQUEST_ID "#description1",'1000001' "details.item.itemCode",'1000001' "details.item.item",rl.SERVICE_CODE "details.n1",rl.SERVICE_NAME "details.text1",'1' "c1", 'details.quantity.quantity.primeQty.value' "$alias$1",
'101' "c2", 'details.quantity.quantity.primeQty.uom' "$alias$2",
rl.CASH_FEES "details.price.unitPrice",rl.DISCOUNT "details.price.discount1.value"
from Request_Services rl
left join Requests r on rl.REQUEST_ID = r.REQUEST_ID
where r.REQUEST_ID = '468273'
```

#### This is the interesting part in the query:

```sql
'1' "c1", 'details.quantity.quantity.primeQty.value' "$alias$1",
'101' "c2", 'details.quantity.quantity.primeQty.uom' "$alias$2",
```


#### This will be changed as if you wrote the following

```sql
'1' "details.quantity.quantity.primeQty.value",
'101' "details.quantity.quantity.primeQty.uom"
```