---
title: EAWathqAddressFetcher
module: core
---

# EAWathqAddressFetcher

**Description:** Fetches Address Information from wathq.sa using CRNationalNumber field.
We copy the fields: contactInfo.address.address1,contactInfo.address.address2,contactInfo.address.mapLocation,contactInfo.address.postalCode,contactInfo.address.city,contactInfo.address.street,contactInfo.address.buildingNumber,contactInfo.address.district,contactInfo.address.landPlotNumber

**Parameters:**
- API Key
- Bearer Token
- Extra Fields Copier (Similar to EAFieldsValuesCalculator) Examples: 
description1=$map.street
-  Do Not Copy Any Fields (true or false, use if you want to copy fields manually)
-  Log Response (true,false), use to inspect responses from server
-  Multi Call On Same Data (true,false), allow the user to call wathq on same commercial info more than one time

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAWathqAddressFetcher`

**Module:** core

