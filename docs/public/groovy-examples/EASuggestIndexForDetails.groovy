package com.namasoft.infor.domainbase.util;

import com.namasoft.common.utilities.ObjectChecker;
import com.namasoft.common.utils.dm.pojo.*;
import com.namasoft.infra.domainbase.datafields.LongTextDF;
import com.namasoft.infra.domainbase.entity.base.EntityAction;
import com.namasoft.infra.domainbase.util.Result;
import com.namasoft.modules.basic.domain.entities.TaskSchedule;
import com.namasoft.modules.basic.domain.primitives.EntityTargetAction;
import com.namasoft.modules.basic.util.reportwizard.DMPersisterUtil;
import com.namasoft.modules.basic.utils.BSCEntityTypes;

import java.util.*;
import java.util.stream.Collectors;

public class EASuggestIndexForDetails implements EntityAction<TaskSchedule> {
    @Override
    public Result doAction(TaskSchedule object, LongTextDF... parameters) {
        object.setForceSettinginStable(true);
        DMPersister model = DMPersisterUtil.fetchDataModel();
        List<DMEntity> entitiesWithDetails = model.getEntities().stream().filter(e -> ObjectChecker.isFalseOrNull(e.getPosClass()))
                .filter(e -> ObjectChecker.isNotEmptyOrNull(e.getDetails())).toList();
        object.setParameter2(LongTextDF.fromString(generateMissingIndexCheckSql(entitiesWithDetails)));
        return Result.createSuccessResult();
    }

    public static String generateMissingIndexCheckSql(List<DMEntity> entitiesWithDetails) {
        StringBuilder sql = new StringBuilder();

        sql.append("""
				WITH TableRowCounts AS (
				    SELECT t.name AS table_name, SUM(p.rows) AS row_count
				    FROM sys.tables t
				    JOIN sys.partitions p ON p.object_id = t.object_id
				    WHERE t.schema_id = SCHEMA_ID('dbo') AND p.index_id IN (0, 1)
				    GROUP BY t.name
				),
				TargetColumns AS (
				    SELECT
				        t.name AS table_name,
				        c.name AS column_name,
				        t.object_id,
				        c.column_id
				    FROM sys.tables t
				    JOIN sys.columns c ON t.object_id = c.object_id
				    WHERE t.schema_id = SCHEMA_ID('dbo')
				),
				IndexedColumns AS (
				    SELECT DISTINCT
				        ic.object_id,
				        ic.column_id
				    FROM sys.index_columns ic
				    JOIN sys.indexes i ON i.object_id = ic.object_id AND i.index_id = ic.index_id
				    WHERE i.is_disabled = 0 AND i.[type] IN (1, 2) -- clustered and non-clustered
				)
				SELECT TOP 100
				    rc.table_name,
				    tc.column_name,
				    rc.row_count,
				    'CREATE NONCLUSTERED INDEX IX_' + rc.table_name + '_' + tc.column_name + ' ON dbo.' + rc.table_name + '(' + tc.column_name + ');' AS create_index_sql
				FROM TableRowCounts rc
				JOIN TargetColumns tc ON rc.table_name = tc.table_name
				LEFT JOIN IndexedColumns ix ON ix.object_id = tc.object_id AND ix.column_id = tc.column_id
				WHERE  CONCAT(tc.table_name, '+', tc.column_name) IN (
				""");
        String tables = entitiesWithDetails.stream().map(DMEntity::getDetails).flatMap(Collection::stream)
                .map(d -> d.getTableName() + "+" + d.getJoinColumn()).collect(Collectors.joining("',\n'", "'", "'"));
        sql.append(tables);

        sql.append("""
				)
				AND ix.column_id IS NULL
				ORDER BY rc.row_count DESC;
				""");

        return sql.toString();
    }

    @Override
    public String describe() {
        return "Task schedule only. Each run writes into parameter 2 an SQL query that lists the detail tables whose join column " +
                "to their header has no index, largest tables first, with a CREATE INDEX statement for each one. Copy the query from " +
                "parameter 2 and run it on the database yourself: no index is created automatically. Parameter 1 holds this script " +
                "(Class Name EAGroovyAction) or is left empty.";
    }

    @Override
    public Result validateParameters(ParamValidationInfo info, EntityTargetAction action, LongTextDF... parameters) {
        if (ObjectChecker.areNotEqual(info.getTargetType(), BSCEntityTypes.TaskSchedule()))
            return Result.createFailureResult("Can be only used with task schedule");
        return Result.createSuccessResult();
    }

    @Override
    public List<String> columnNames() {
        return List.of("Not used - leave empty", "Generated Query For Index Suggestion (filled in by each run)");
    }
}
