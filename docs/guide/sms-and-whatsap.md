Here is a refined version suitable for inclusion in the Nama ERP documentation site (using VuePress):

---

# SMS and WhatsApp Configuration in Nama ERP

Nama ERP supports sending messages via SMS and WhatsApp to users, customers, suppliers, and other entities.
To enable this feature, configure the appropriate settings from the **Global Configuration** screen.

## SMS Provider: SMS Misr ([smsmisr.com](https://smsmisr.com/))

* **SMS Provider**: `SMS Misr`
* **Sender Token**: Obtain from [smsmisr.com/Client/senderid](https://smsmisr.com/Client/senderid)
  ![Sender Token Page](images/sms-misr-token.png)
* **API Username** and **API Password**: Get them from [smsmisr.com/Client/Settings](https://smsmisr.com/Client/Settings)
  ![API Credentials Page](images/sms-misr-api-key.png)

---

## SMS Provider: Taqnyat ([taqnyat.sa](https://portal.taqnyat.sa))

* **SMS Provider**: `Taqneyat`
* **Sender**:
  Visit [portal.taqnyat.sa](https://portal.taqnyat.sa), go to **Send SMS**, and copy the sender name from the dropdown list.
::: tip
💡 Use Chrome's Inspect Tool to accurately copy the value.
:::
  ![Sender Field Screenshot](images/taqnyat-sender.png)
* **Password (Bearer Token)**:
  Go to **Developers > Application**, click the ➕ icon, provide a name, then click the ✔️ mark. Copy the resulting **Bearer Token**.
  ![Bearer Token Screenshot](images/taqnyat-bearer-token.png)

---

## SMS Provider: Vodafone Egypt

* **SMS Provider**: `Vodafone Egypt`
* **User Name**: Account ID
* **Password**: API Password
* **Sender**: Sender Name
* **Other Settings**: Secret Key
* **Correction Query** (to ensure correct phone format):

  ```sql
  select case when {to} like '2%' then {to} else '2'+{to} end
  ```

::: tip
✅ After saving the configuration, Nama ERP will be able to send notifications and messages via the selected provider. Make sure credentials and sender IDs are valid and verified with the provider.
:::
