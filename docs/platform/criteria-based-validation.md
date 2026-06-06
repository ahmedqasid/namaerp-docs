# التحقق المبني على المعايير (Criteria Based Validation)

### يمكنك عرض أرقام الأسطر التي بها أخطاء عن طريق تضمين ما يلي في قالب رسالة الخطأ:
###  LineNumber - Error Line Number - Criteria Based Validation Error Lines

```tempo
 The error happened at Line Number {$map.errorLines}
```

## التحقق من البيانات القديمة (Check old data):
### مثال: 
```sql
select case when {remarks}<>{oldData.remarks} then 1 else 0 end
```
#### لا تتجاهل المسافات: مثال:
```sql
select case when {remarks}<>{oldData.remarks} and coalesce({oldData.remarks},'')<>'' then 1 else 0 end
```
