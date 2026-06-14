# Nama Properties
```xml
dbtype: sqlserve
```
#### Or mysql

### server: the server address (eg: http://192.168.1.5:8080/) **THIS IS IMPORTANT FOR BOTH REPLICATION AND BRACODE**

***

# REPLICATION AND BRACODE
#### `guiserver` : used for links in reports (eg: http://192.168.1.5:8080/erp/)

#### `logsql` : true or false

#### `logsqltiming` : true or false to log sql statements with the execution time

#### `SqlTimingWarnThresholdMsec`  : default 200 ms

####  `SqlTimingErrorThresholdEnabled` : default: 2000 ms

####  `normallog` : use log4j.properties instead of logsql and logsqltiming

####  `trackmemenabled`  :count alive NamaContextInstances

####  `trackmemlog`  : threshold in ms, nama will log contexts that have been alive more than this threshold

####  `trackmemrelog`  : when to log again alive contexts

####  `valuedate`  : the date that should be used by default in valuedate in new documents: dd-mm-yyyy

####  `issuedate`  : the date that should be used by default in issuedate new documents: dd-mm-yyyy

####  `enablecostschedule`  : set to true if you want to activate scheduling of task processing (defined in supply chain config)

####  `doNotProcessCostLedgerTransactions` : true or false

```xml
customer=Customer Name
tomcatservice=TomCat Service Name
tasks-initial-delay-minutes=10
```
### Delays task scheduler tasks at startup (https://namasoft.com/reqs/SRDRQ02722)
`serverid=AnyIDYouWant`
### Used for enabling SMS and email sending from nama, must match or be contained in the server id field in global config
### send-emails-only-to=abc@example.com
Send emails only to this number, and ignore any other emails (https://namasoft.com/reqs/KKDRQ00860)
`send-sms-only-to=01xxxxxxx`
### Send SMS only to this number, and ignores any other numbers  (https://namasoft.com/reqs/KKDRQ00860)
`send-ecommerce-data=true`
### Must be true in order for (Magento/BigCommerce/Shopify/WooCommerce/Zid) to send data to the ecommerce website (updating prices, quantities, and so on)
`log-sms-data=true`
### If you want the sms body and url to be saved so that you can test the urls
`logforms=true`
### If you want to log the form id used in printing documents, you can find the id in namasoft.log
#### `checkswitcheditem=true` Prevents save if details.item.itemCode != details.item.item.code
#### `allowposedit=true`           	Allow Editing/Saving POS Invoices Manually
#### `allowposdelete=true`		Allow Deleting POS Invoices Manually
#### `usecache=false`
`local-external-attachments-folder=E:/Attachments
use-new-fifo-processor=false`
https://namasoft.com/reqs/KKDRQ01451 


```xml
prevent-login-of-login-ids=user1,user2
prevent-login-of-login-ids-msg=The user {0} is prevented from login by properties file by administrator
```

```xml

prevent-login-of-ips=192.168,214.165.10.13
prevent-login-of-ips-msg=You can not login from IP {0}, because IP prefix {0} is prevented
```


## replication.properties settings file (in tomcat/lib)
### siteid: the current site code
### enable: whether replication is enabled or not
### headofficeip : head office bus ip
### headofficeport: head office bus port
### headofficeurl:
#### Example:
```xml
enable=true
siteid=001
headofficeurl=http://headofficeip:8080/
sitesequence=1
```
