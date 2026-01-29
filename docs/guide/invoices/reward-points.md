# Customer Reward Points (Loyalty Points)

## Send a notification to the customer with each invoice with rewarded points, redeemed, and total points
* English Version
```
Dear {customer.name2},
Thanks for visiting {branch.name2}.
You earned {$earnedPoints} points. Your current balance is {customer.$availableRewardPoints} points (SAR {customer.$availableRewardAmount}).
Thanks for shopping with us!
```
* Arabic Version
```
عزيزي {customer.name1}،
شكرًا لزيارتك فرع {branch.name1}.
كسبت {$earnedPoints} نقطة جديدة، ورصيدك الآن {customer.$availableRewardPoints} نقطة ({customer.$availableRewardAmount} ريال سعودي).
شكرًا لتسوقك معنا.
```

### Steps to Notify Customers with the reward points OTP:
* Create a Notification Definition for any entity (preferably Customer) and check the "Manual" option.
* In the Reward Points Configuration file, set the "OTP Notification" field to the notification definition you just created.

### Sample SMS/Email Templates

- English Version
```
To redeeem {rewardInfo.amount} {rewardInfo.currency.altCode} ({rewardInfo.redeemedPoints} points), please use the following OTP: {otpCode} 
```
- Arabic Version
```
لاسترداد {rewardInfo.amount} ({rewardInfo.redeemedPoints} نقطة) {rewardInfo.currency.code}، يرجى استخدام رمز التحقق (OTP) التالي: {otpCode}.
```

::: tip The OTP tempo is run against the customer record
- You can access any information from the customer, like name1, name2, email, and so on.
:::

## STC Qitaf Integration Setup

### Generating CSR for STC Qitaf Certificate

When integrating with STC Qitaf loyalty program, STC will request a CSR (Certificate Signing Request) file. They will provide you with the following information:
- **Partner ID** - Your unique partner identifier
- **Country** - Country code (e.g., SA)
- **City** - City name (e.g., Riyadh)
- **Organization** - Your organization name

#### Step 1: Generate the CSR and Private Key

Run the following OpenSSL command, replacing the values with your information:

```bash
 MSYS_NO_PATHCONV=1 openssl req -new -newkey rsa:2048 -nodes \
  -keyout qitaf_private.key \
  -out qitaf_request.csr \
  -subj "/C=SA/L=Riyadh/O=YourOrganizationName/CN=YourPartnerID"
```

This creates two files:
- `qitaf_private.key` - Your private key (keep this secure and never share it)
- `qitaf_request.csr` - The CSR file to send to STC

::: warning Keep Your Private Key Secure
Never share the `.key` file with anyone. Only send the `.csr` file to STC.
:::

#### Step 2: Send CSR to STC

Send only the `qitaf_request.csr` file to STC. They will process it and send back a signed certificate file.

#### Step 3: Convert Private Key to PKCS8 Format

After receiving the certificate from STC, convert your private key to PKCS8 format (required by the system):

```bash
openssl pkcs8 -topk8 -inform PEM -outform PEM -nocrypt \
  -in qitaf_private.key \
  -out qitaf_private_pkcs8.key
```

#### Step 4: Configure in Nama ERP

1. Open the **Reward Points Config** screen
2. Upload the certificate file (received from STC) to the **Certificate** field
3. Upload the `qitaf_private_pkcs8.key` file to the **Private Key** field
4. Fill in the remaining configuration:
   - API URL
   - Client ID (Username)
   - Client Password
   - Merchant Token (API Token)
   - Branch and Terminal ID mappings

::: tip Backup Your Files
Keep secure backups of:
- Original private key (`qitaf_private.key`)
- PKCS8 private key (`qitaf_private_pkcs8.key`)
- Certificate file from STC
:::