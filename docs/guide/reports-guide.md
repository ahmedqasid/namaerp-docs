# Reports Guide (Jasper Reports)
### Add company logo to a report

- Create a parameter named `loginLegalEntityLogo` with type `java.lang.Object` or `java.io.InputStream`
- Create an image, image expression should be `$P{loginLegalEntityLogo}`

### How to Get Day Name of a Date
```groovy
NamaRep.dayName($F{dateField})
NamaRep.enDayName($F{dateField})
NamaRep.arDayName($F{dateField})
```
### To translate an enum
```groovy
NamaRep.translate(enumValue)
```
### To select name1, name2 or code, altCode based on language
```groovy
NamaRep.name(arabic,english)  
```
where arabic = name1 or code, english = name2 or altCode
