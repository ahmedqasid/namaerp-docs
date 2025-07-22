---
title: EAWathqCommercialInfoFetcher
module: core
---

# EAWathqCommercialInfoFetcher

**Description:** Fetches Full Commercial Information from wathq.sa using CRNationalNumber field.
We copy the fields: name1,contactInfo.email,contactInfo.mobile,contactInfo.telephone1,contactInfo.website

**Parameters:**
- API Key
- Bearer Token
- Extra Fields Copier (Similar to EAFieldsValuesCalculator) Examples: 
description1=$map.issueDateHijri
name2=$map.headquarterCityName
-  Do Not Copy Any Fields (true or false, use if you want to copy fields manually)
-  Log Response (true,false), use to inspect responses from server
-  Multi Call On Same Data (true,false), allow the user to call wathq on same commercial info more than one time

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAWathqCommercialInfoFetcher`

**Module:** core

