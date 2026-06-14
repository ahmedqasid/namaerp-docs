# SMS and WhatsApp Configuration in Nama ERP

Nama ERP supports sending messages via SMS and WhatsApp to users, customers, suppliers, and other entities.
To enable this feature, configure the appropriate settings from the **Global Configuration** screen.

## SMS Provider: SMS Misr ([smsmisr.com](https://smsmisr.com/))

* **SMS Provider**: `SMS Misr`
* **Sender Token**: Obtain from [smsmisr.com/Client/senderid](https://smsmisr.com/Client/senderid)
  ![Sender Token Page](../../ar/platform/notifications/images/sms-misr-token.png)
* **API Username** and **API Password**: Get them from [smsmisr.com/Client/Settings](https://smsmisr.com/Client/Settings)
  ![API Credentials Page](../../ar/platform/notifications/images/sms-misr-api-key.png)

---

## SMS Provider: Taqnyat ([taqnyat.sa](https://portal.taqnyat.sa))

* **SMS Provider**: `Taqneyat`
* **Sender**:
  Visit [portal.taqnyat.sa](https://portal.taqnyat.sa), go to **Send SMS**, and copy the sender name from the dropdown list.
::: tip
💡 Use Chrome's Inspect Tool to accurately copy the value.
:::
  ![Sender Field Screenshot](../../ar/platform/notifications/images/taqnyat-sender.png)
* **Password (Bearer Token)**:
  Go to **Developers > Application**, click the ➕ icon, provide a name, then click the ✔️ mark. Copy the resulting **Bearer Token**.
  ![Bearer Token Screenshot](../../ar/platform/notifications/images/taqnyat-bearer-token.png)

---

## SMS Provider: Vodafone Egypt

* **SMS Provider**: `Vodafone Egypt`
* **User Name**: Account ID
* **Password**: API Password
* **Sender**: Sender Name
* **Other Settings**: Secret Key
* **Correction Query** (to ensure correct phone format):

  ```sql
  select case when {to} like '2%' then {to} else concat('2',{to}) end
  ```

::: tip
✅ After saving the configuration, Nama ERP will be able to send notifications and messages via the selected provider. Make sure credentials and sender IDs are valid and verified with the provider.
:::

---

# WhatsApp Integration

## WAAPI.app WhatsApp Integration

To enable sending messages via WhatsApp using the [waapi.app](https://waapi.app) platform, follow these steps:

---

### Setup Steps

1. **Create an Account and Link WhatsApp**

  * Create a new Instance on [waapi.app](https://waapi.app)
  * Log in to WhatsApp by scanning the QR code
    ![Scan QR Code from Phone](../../ar/platform/notifications/images/waapi-qr.png)
::: tip
    ⚠️ You **must** scan the QR code using the phone that has the active WhatsApp account.
::: 

2. **Get the API Token**

  * Go to the [API Tokens page](https://waapi.app/user/api-tokens)
  * Enter a suitable name, then click "Create"
  * The Token will be displayed in a popup window — copy it and place it in the **Password** field in Nama settings
    ![Token Screen](../../ar/platform/notifications/images/waapi-token.png)

3. **Get the Instance ID**

  * Go to the [Instances page](https://waapi.app/account/instances)
  * Copy the **Instance ID**
  * Place it in the **Username** or **Other Settings** field in the SMS settings in Nama
    ![Instance ID Screen](../../ar/platform/notifications/images/waapi-instance-id.png)

---

### Nama ERP Settings

In the SMS settings screen:

* **Provider**: `waapi.app WhatsApp Integration`
* **Username** or **Other Settings**: Instance ID
* **Password**: Token

---

## WhatsApp Integration Using ultramsg.com

To send WhatsApp messages from Nama ERP using [ultramsg.com](https://ultramsg.com), follow these steps:

### Step 1: Create and Link the Instance

* Log in to the [UltraMsg Dashboard](https://user.ultramsg.com/).
* Create a new **Instance** and link it to your WhatsApp account by scanning the QR code.

### Step 2: Access the Instance Settings

* After linking, go to the [UltraMsg User Panel](https://user.ultramsg.com/).
* Select your **Instance**, then click **Manage**.

![Instance Management Screenshot](../../ar/platform/notifications/images/ultramsg-instance.png)

### Step 3: Get the Instance ID and Token

* You will find the **Instance ID** in the browser URL, for example:
  `https://user.ultramsg.com/app/instances/instance.php?id=103251`
  In this example, the Instance ID is `103251`.

* From the API testing section, select **Shell (cURL)** to view a usage example.

![cURL Selection Screenshot](../../ar/platform/notifications/images/ultramsg-curl.png)

* Copy the **Instance ID** and **Token** from the displayed form.

![Instance ID and Token Screenshot](../../ar/platform/notifications/images/ultramsg-instance-id.png)

### Step 4: Configure in Nama ERP

* Use the **Instance ID** as the Username or service identifier.
* Use the **Token** as the Password for authentication.


## WaPilot WhatsApp Integration

To enable sending WhatsApp messages from Nama ERP using [wapilot.net](https://wapilot.net), follow these steps:

---

### Setup Steps

1. **Create an Account and Link WhatsApp**

   * Create an account on [app.wapilot.net](https://app.wapilot.net)
   * Create a new **Instance** and link it to your WhatsApp account by scanning the QR code

2. **Get the Instance ID**

   * From the dashboard, go to the Instances list
   * Copy your **Instance ID**

3. **Get the API Token**

   * From the account settings or API page, create or copy the **API Token**

---

### Nama ERP Settings

In the WhatsApp message settings screen:

* **Provider**: `WaPilot`
* **Username (Public ID)**: Instance ID
* **Password (Secret)**: API Token

::: tip
WaPilot can also be used as an SMS provider through the SMS settings screen, where messages are sent via WhatsApp instead of traditional SMS.
:::

---

## Sending WhatsApp from Employee Phones (Dynamic Sender)

This feature allows sending WhatsApp messages from employees' phones instead of a single fixed number. For example, when the system sends a message to a customer, the message can appear from the phone number of the sales representative responsible for that customer, allowing the representative to follow up on the conversation directly from their personal phone.

::: tip
This feature is available for all WhatsApp service providers supported in the system.
:::

---

### Setting Up Multiple Numbers in WhatsApp Settings

In the **WhatsApp Message Settings** screen, there is a **Public IDs by Sender** table that allows you to define multiple numbers (Instances) for the same settings:

| Field | Description | Required |
|-------|-------------|----------|
| **Sender ID** | Sender identifier (such as phone number or employee code) | Yes |
| **Public ID** | The Instance identifier for this number | Yes |
| **Secret** | The secret key — can be left empty to be read from the main field | No |

::: tip
If the **Secret** field is left empty in any row, the system will use the value in the main (Secret) field in the screen header.
:::

---

### Setting the Preferred Sender in Notifications and Approvals

In the **Notification Definition** or **Approval Definition** screen, there is a **WhatsApp Preferred Sender** field that supports Tempo syntax for dynamic values.

#### Examples of Preferred Sender Syntax:

| Syntax | Description |
|--------|-------------|
| `{salesRep.mobile}` | Phone number of the sales representative linked to the record |
| `{createdByUser.mobile}` | Phone number of the user who created the record |
| `{customer.accountManager.mobile}` | Phone number of the customer's account manager |

::: info How the System Works
1. When sending a WhatsApp message, the system calculates the **Preferred Sender** value using Tempo syntax
2. The system searches for this value in the **Public IDs by Sender** table
3. If a match is found, it uses the Public ID and Secret from that row
4. If no match is found, it uses the default values from the screen header
:::

---

## WaboxApp WhatsApp Integration


To enable sending WhatsApp messages from Nama ERP using WaboxApp, follow these steps:

---

### Setup Steps

1. **Register the Phone Number**
   Register the company's WhatsApp number on a phone that is always connected to the internet.
   💡 It is recommended to use an Android emulator such as [www.memuplay.com](https://www.memuplay.com) for a permanent connection.

2. **Create an Account in WaboxApp**

  * Go to [www.waboxapp.com](https://www.waboxapp.com)
  * Create a new account (requires entering credit card details)

3. **Add the Phone Number to WaboxApp**

  * Go to [https://www.waboxapp.com/manager/accounts](https://www.waboxapp.com/manager/accounts)
  * Select **Add New Phone Number**

4. **Set Up the WaboxApp Chrome Extension**

  * Download the extension from the Chrome store
  * Copy the **API Key** from the WaboxApp website into the extension, then click **Validate**

5. **Link WhatsApp Web**

  * Open [web.whatsapp.com](https://web.whatsapp.com) using the same Chrome browser that has the extension
  * Scan the QR code from the phone

6. **Get Connection Credentials**

  * From the WaboxApp dashboard, copy:

    * **API Token**
    * **Phone number in international format** (example: `201065122360` instead of `01065122360`)

7. **Configure Nama ERP**

  * Open the SMS settings screen
  * Add a new row and select the provider: `WaboxApp WhatsApp Integration`
  * Enter:

    * **Phone number in international format** in the *Sender* or *Username* field
    * **API Token** in the *Password* field


::: tip Important Notes

* The phone must be kept **always on** with a continuous internet connection.
* **WhatsApp Web must remain open** in the Chrome browser.
* If either side is closed, **messages will not be sent**.
* WaboxApp charges the credit card if you exceed **100 messages/month** (sent or received).
* It is preferable to use this provider in the `Preferred Message Provider` field in notification and scheduled task settings.
* Use the field `Used only if added in the preferred sender` in the service provider settings (as in request `KKDRQ00577`) to avoid always replacing the message provider with WhatsApp.
* The phone number must be in international format, i.e. starting with the **country code**.

:::

 
