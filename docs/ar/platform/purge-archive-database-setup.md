# Setting Up the Purge Archive Database

::: danger Feature still in development
The purge feature is not yet ready for production use. This page is a working document for the support team so that, when the feature ships, you have an accurate picture of what needs to be in place. Do not enable purge on customer systems until the development team gives the green light.
:::

## What This Is

Nama ERP's purge feature lets a customer permanently move old transactions out of the live database. Some of those transactions are deleted outright, some are kept as compact summary documents (`PurgeJournal`, `PurgeStockReceipt`), and the rest are copied — row-for-row — into a **second database** that lives alongside the main one. That second database is what we call the **archive database**.

The archive is meant to be cheaper to host, slower to query, and almost never written to after the initial copy. Auditors and historical reports can still read it, but the live ERP no longer carries the weight of every closed-period transaction.

This page walks you through what you need to set up before the customer can run their first purge.

## What You'll Provision

Three things, in this order:

1. A new database, on its own (or a shared) SQL Server / MySQL instance.
2. A JDBC connection pool in Tomcat that points at it.
3. One line in `nama.properties` that tells Nama where to find the pool.

That's it. The ERP creates and maintains the schema inside the archive automatically — you don't run any DDL by hand.

## Step 1 — Create the Archive Database

Pick an instance to host the archive. The simplest setup is the **same SQL Server instance** that hosts the main ERP database, just in a separate database. That works fine for small and mid-size customers and keeps backups / firewall rules manageable.

For larger customers, or where the archive is expected to grow into the hundreds of gigabytes, put it on a separate instance — ideally one on cheaper / slower storage. The archive is read-rarely and written only during purge runs, so it doesn't need the same I/O profile as the live DB.

Whichever instance you pick:

* Create a new, empty database. Suggested name: `<customername>_archive` or `<customername>_purge`.
* Use the **same database engine** as the main ERP database (SQL Server or MySQL — don't mix).
* Grant the same SQL user (or a dedicated one) full read / write / DDL access. Nama needs DDL because it creates the archive tables on first run.
* Make sure **Mixed Mode Authentication** is on if you're using a SQL login (same as the main ERP setup — see the installation guide).

::: tip Backups
The archive is the only copy of purged data. Once a purge has finished and the rows are gone from the live DB, losing the archive means losing the data permanently. **Add the archive database to the customer's backup schedule before the first purge runs.**
:::

## Step 2 — Configure the JNDI DataSource in Tomcat

Nama looks up the archive connection via a JNDI name. You configure that name in Tomcat the same way you configure the main `dbsource`.

Open the Nama context file in Tomcat (typically `conf/Catalina/localhost/erp.xml`, or `conf/server.xml` depending on how the customer was installed) and add a second `<Resource>` entry next to the existing one. Example for SQL Server:

```xml
<Resource name="jdbc/namaPurgeDB"
          auth="Container"
          type="javax.sql.DataSource"
          driverClassName="com.microsoft.sqlserver.jdbc.SQLServerDriver"
          url="jdbc:sqlserver://localhost:1433;databaseName=customer_archive;encrypt=false"
          username="sa"
          password="..."
          maxTotal="20"
          maxIdle="5"
          maxWaitMillis="10000"/>
```

Pick any JNDI name you like for the `name=` attribute — `jdbc/namaPurgeDB` is just a convention. Whatever you pick goes into `nama.properties` in the next step.

A few things to keep in mind:

* The driver and URL format are identical to what the main database uses. If the main DB works, the archive will work the same way.
* Pool sizing can be modest. Purge writes are single-threaded today, so a `maxTotal` of 10–20 is plenty.
* Don't reuse the **same** datasource as the main DB — Nama needs them separate so it can manage transactions on each independently.

Restart Tomcat after editing the context file so the new resource is picked up.

## Step 3 — Point Nama at the DataSource

Open `nama.properties` and add this single line:

```properties
purgedbsource=java:comp/env/jdbc/namaPurgeDB
```

The value must match the `name=` you used in Tomcat, prefixed with `java:comp/env/`. So if you named the resource `jdbc/customer42archive`, the property becomes `purgedbsource=java:comp/env/jdbc/customer42archive`.

Restart Tomcat once more.

## Step 4 — Confirm It's Working

There is no dedicated "test connection" button yet. The simplest check is to start Tomcat and watch the startup log. If `purgedbsource` is missing or the JNDI name doesn't resolve, Spring fails to bring up the `purgeemf` and `purgeTransactionManager` beans, and you'll see a stack trace mentioning one of those bean names. The ERP itself will fail to start.

If Tomcat comes up cleanly, the wiring is correct. The first time a purge is actually run, Nama creates all the `O*` archive tables (`OSalesInvoice`, `OLedgerTrans`, and so on) automatically. You can confirm by connecting to the archive DB with SQL Server Management Studio after the first run and checking that those tables exist and have rows.

## What Goes Wrong (and How to Tell)

::: warning ERP won't start after enabling purge
Almost always one of three things:

* `purgedbsource` is misspelled in `nama.properties` (it's case-sensitive).
* The JNDI `name=` in Tomcat doesn't match what's in `nama.properties`.
* The archive database doesn't exist yet, or the SQL user can't connect to it.

The Tomcat log usually names the failing bean (`purgePooledDataSource`, `purgeemf`, or `purgeTransactionManager`) and the underlying cause is a few lines below.
:::

::: warning Purge runs but no rows appear in the archive
Check that you're looking at the right database. The most common mistake is pointing the JNDI URL at the main ERP DB instead of the new archive DB. Run a quick `SELECT TOP 10 * FROM OLedgerTrans` in both databases — only the archive should have rows.
:::

::: warning Different database engine on archive vs main
Nama doesn't support mixing engines. If the main DB is SQL Server, the archive must also be SQL Server. The `${dbtype}` property in Nama is shared between both.
:::

## What Support Should Tell Customers

When a customer first asks about the purge feature, the operational story is:

* It's a one-time setup: provision the archive DB, edit two config files, restart Tomcat.
* From then on, purges are launched from the ERP UI by a finance user with the right permissions.
* The archive grows over time and never shrinks unless someone manually drops old rows. Plan storage accordingly.
* The archive must be backed up. Treat it like any other production database for backup purposes.

Once the development team confirms the feature is production-ready, this page will be updated with the user-facing run-a-purge instructions and the day-to-day operational guidance that support will need to handle live tickets.
