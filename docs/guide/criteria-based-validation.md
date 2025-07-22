# Criteria Based Validation

### You can display error line numbers by including the following in the error message template:
###  LineNumber - Error Line Number - Criteria Based Validation Error Lines

```tempo
 The error happened at Line Number {$map.errorLines}
```

## Check old data:
### Example: 
```sql
select case when {remarks}<>{oldData.remarks} then 1 else 0 end
```
#### Don't ignore spaces: Example:
```sql
select case when {remarks}<>{oldData.remarks} and coalesce({oldData.remarks},'')<>'' then 1 else 0 end
```