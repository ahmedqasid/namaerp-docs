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