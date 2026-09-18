# nama.properties

`nama.properties` is the one file that tells an installation what it is: which database to open, what to call itself, where its files live, and which of the system's safety valves are open. It sits beside the application on the server — normally in Tomcat's `lib` folder — and it is read once at startup, so **a change to it takes effect when the server is restarted**.

The format is one `key=value` per line:

```properties
dbtype=SQLSERVER
dbname=namademo
dbuser=nama
customer=Nile Group
serverid=production-1
```

This page covers the settings support staff actually set on a customer's server. The system reads many more, but they are internal flags that exist for a developer chasing one specific problem — if a setting is not here and nobody told you to add it, it should not be in the file.

::: danger An unrecognised value is not an error
Most of these settings are read without validation. `dbtype=sqlserve` — one letter short — does not stop the server or log a complaint: the value fails to match, and the installation quietly starts up as **MySQL**. The same silence applies to a misspelled key, which is simply never read. When a setting seems to have no effect, check the spelling first.
:::

## The database, and what this installation calls itself

| Setting | What it does |
|---|---|
| `dbuser` / `dbpassword` | The database login. The password is stored encrypted, not in clear text. |
| `customer` | The customer's name, as it appears in the licence and in messages the server sends home. |
| `serverid` | This server's identity. It is what decides whether **this** machine is allowed to send e-mails and SMS — see below — so a test copy must never keep production's value. |
| `timezone` | The server's timezone. |
| `defaultlang` | The language a user gets before choosing one. |

## Addresses the system hands out

Nama writes links into e-mails, reports and mobile responses, and it cannot guess the address a user reaches it by:

| Setting | What it does |
|---|---|
| `server` | The server's own address, e.g. `http://192.168.1.5:8080/`. Needed by replication and by anything that builds a link. |
| `guiserver` | The address of the user interface, e.g. `http://192.168.1.5:8080/erp/` — this is what a link in a printed report or an e-mail points at. |
| `approvalsServer` | The address used for approval links, when approvals are answered from outside. |
| `background-server-url` | The server that runs background processing, when it is a separate machine. |

A link that lands the user on `localhost` is almost always one of these left unset.

## Mail, SMS and WhatsApp — especially on a copy

The most expensive accident in ERP support is a test copy of a live database that starts e-mailing and texting the customer's customers. Three settings exist precisely to prevent it:

| Setting | What it does |
|---|---|
| `sendmailsandsms` | The master switch. Off, and nothing leaves the server at all. |
| `send-emails-only-to` | Every e-mail the system produces goes to this address instead of its real recipients. |
| `send-sms-only-to` | The same for SMS: every message goes to this number. |
| `send-whatsapp-only-to` | The same for WhatsApp. |
| `log-sms-data` | Records the body and the provider URL of each SMS so you can see what was actually sent. Diagnostic — turn it off afterwards. |

::: warning Restoring a production backup onto a test server
Change `serverid`, then set `send-emails-only-to` and `send-sms-only-to` to your own address and number, **before** the first startup. The sending rule is `serverid` matched against the **Send Mails And SMS Only From Servers** list in [global settings](/platform/global-config/global-config-notifications), and that list travels inside the database you just restored — so a clone that keeps production's server id is, as far as the software is concerned, production.
:::

## Keeping people out

| Setting | What it does |
|---|---|
| `prevent-login-of-login-ids` | A comma-separated list of login ids that cannot sign in. |
| `prevent-login-of-login-ids-msg` | The message they see. `{0}` is replaced with the login id. |
| `prevent-login-of-ips` | A comma-separated list of blocked addresses, matched by prefix — `192.168` blocks the whole range. |
| `prevent-login-of-ips-msg` | The message they see, with `{0}` for the address. |
| `use-ldap-for-authentication` | Hand password checking to the customer's LDAP directory. |

```properties
prevent-login-of-login-ids=user1,user2
prevent-login-of-login-ids-msg=The user {0} is prevented from login by the administrator
prevent-login-of-ips=192.168,214.165.10.13
prevent-login-of-ips-msg=You cannot login from IP {0}
```

These are a blunt instrument for an emergency — a leaked account, an office that must be locked out today. Ordinary access control belongs in security profiles, not in this file.

## Files and attachments

| Setting | What it does |
|---|---|
| `tempFolder` | Where temporary files are written. Defaults to `c:/nama/temp` on Windows and `/var/nama/temp` elsewhere. |
| `storage-path` | Where the system keeps its stored files. |
| `local-external-attachments-folder` | Keeps attachments on disk in this folder instead of inside the database — the setting that stops an attachment-heavy database growing out of hand. |
| `max-single-attachment-size-kb` | Rejects a single attachment larger than this. |
| `max-total-attachment-size-gb` | Caps the total size of attachments. |

## Background work

| Setting | What it does |
|---|---|
| `tasks-initial-delay-minutes` | Holds scheduled tasks back for this many minutes after startup, so a restarting server is not immediately busy. |
| `processors-initial-delay-minutes` | The same for the background processors. |
| `no-background-processors` | Stops the background processors entirely. A server with this set saves documents but never processes them — which is right for a reporting replica and disastrous anywhere else. |
| `disable-critical-errors` | Turns off the critical-errors checks: isolation level, missing server id, disk space, failed business requests. Only for a server where those checks are known to be noise. |
| `enable-purge` | Enables the purge job that archives and removes old data. |

## Reports that will not end

| Setting | What it does |
|---|---|
| `kill-reports-running-more-than-seconds` | Stops a report that has run longer than this. The usual answer to one user's runaway report freezing a server. |
| `error-for-running-reports-more-than-seconds` | Logs an error — without killing anything — for reports that run longer than this, so you can find them before users complain. |

## Defaults on new documents

`valuedate` and `issuedate` set the date a new document opens with, written as `dd-mm-yyyy`. They are for a data-entry catch-up — a batch of last month's paperwork — and should be removed when the catch-up is over, or every document created afterwards carries a stale date.

## POS documents on the server

POS documents are written by the point-of-sale application, and the server refuses to let anyone edit or delete them by hand. `allowposedit=true` and `allowposdelete=true` lift those refusals. They are a correction tool, not a setting: turn on, fix the document, turn off.

## Diagnostics you may be asked to switch on

Each of these makes the log louder for one area. Turn them on while reproducing a problem and off again immediately — on a busy installation they fill a disk quickly.

| Setting | What it logs |
|---|---|
| `detailederror` | Full error detail instead of the short user-facing message. |
| `logws` | Web-service calls in and out. |
| `log-failed-login-details` | Why each failed sign-in failed. |
| `logreplication` / `debugreplication` | Replication messages, and the verbose version. |
| `debugATTENDANCE` | The HR attendance calculation, step by step. |
| `log-to-files-in-debug` | Writes logs to files even when the server runs from an IDE. |

## replication.properties

A site that takes part in replication carries a second file beside the first, `replication.properties`:

| Setting | What it does |
|---|---|
| `enable` | Whether replication runs on this site at all. |
| `siteid` | This site's code. Without it, replication refuses to start. |
| `sitesequence` | This site's sequence number, used when generating codes so two sites never mint the same one. It is required. |
| `headofficeurl` | The head office address this site talks to. |
| `headofficeip` | The head office address, when given as a plain address rather than a URL. |

```properties
enable=true
siteid=001
sitesequence=1
headofficeurl=http://192.168.1.5:8080/
```
