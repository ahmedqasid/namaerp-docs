package com.namasoft.modules.supplychain.domain.utils.plugnplay.groovy

import com.namasoft.common.utilities.ObjectChecker
import com.namasoft.common.utilities.StringUtils
import com.namasoft.infra.domainbase.datafields.BooleanDF
import com.namasoft.infra.domainbase.datafields.DateDF
import com.namasoft.infra.domainbase.datafields.LongTextDF
import com.namasoft.infra.domainbase.datafields.TextDF
import com.namasoft.infra.domainbase.entity.base.EntityAction
import com.namasoft.infra.domainbase.persistence.repos.Persister
import com.namasoft.infra.domainbase.util.Result
import com.namasoft.modules.basic.domain.primitives.EntityTargetAction
import com.namasoft.modules.supplychain.domain.details.BasicSCDocumentLine
import com.namasoft.modules.supplychain.domain.entities.BasicSCDocument
import com.namasoft.modules.supplychain.domain.entities.InvItem
import com.namasoft.modules.supplychain.domain.entities.ItemSection

public class EAAutoLotIdFromItemSectionAndYear implements EntityAction<BasicSCDocument> {

    private static final String DEFAULT_STATIC_PREFIX = "QC-";
    private static final int STATIC_PREFIX_PARAM_INDEX = 1;
    private static final int YEAR_LENGTH = 2;
    private static final int SERIAL_LENGTH = 5;
    private static final long MAX_SERIAL = 99999L;

    @Override
    Result doAction(EntityTargetAction action, BasicSCDocument doc, LongTextDF... parameters) {
        Result result = Result.createAccumulatingResult();
        List<BasicSCDocumentLine> details = doc.getDetails();
        if (ObjectChecker.isEmptyOrNull(details))
            return result;
        String staticPrefix = fetchStaticPrefix(parameters);
        String yearPart = calcYearPart(doc);
        String lineTableName = details.getFirst().getClass().getSimpleName();
        Map<String, Long> lastSerialPerPrefix = new HashMap<>();
        for (BasicSCDocumentLine line : details) {
            if (!needsGeneratedLot(line))
                continue;
            String sectionCode = fetchSectionCode(line.fetchItem());
            if (ObjectChecker.isEmptyOrNull(sectionCode))
                continue;
            String prefix = staticPrefix + yearPart + "-" + sectionCode;
            Long serial = nextSerial(prefix, lineTableName, lastSerialPerPrefix, result);
            if (serial == null)
                continue;
            String generatedCode = prefix + StringUtils.PadLeft(serial.toString(), SERIAL_LENGTH);
            line.setText1(TextDF.fromString(generatedCode));
        }
        return result;
    }

    private static String fetchStaticPrefix(LongTextDF[] parameters) {
        if (parameters == null || parameters.length <= STATIC_PREFIX_PARAM_INDEX)
            return DEFAULT_STATIC_PREFIX;
        if (ObjectChecker.isEmptyOrNull(parameters[STATIC_PREFIX_PARAM_INDEX]))
            return DEFAULT_STATIC_PREFIX;
        String staticPrefix = parameters[STATIC_PREFIX_PARAM_INDEX].getPrimitiveValue().trim();
        return ObjectChecker.isEmptyOrNull(staticPrefix) ? DEFAULT_STATIC_PREFIX : staticPrefix;
    }

    private static boolean needsGeneratedLot(BasicSCDocumentLine line) {
        InvItem item = line.fetchItem();
        if (item == null)
            return false;
        if (BooleanDF.isFalse(item.getHasLot()))
            return false;
        return ObjectChecker.isEmptyOrNull(line.getText1());
    }

    private static String fetchSectionCode(InvItem item) {
        ItemSection section = item.getSection();
        if (section == null || section.getCode() == null)
            return null;
        return ObjectChecker.toStringOrEmpty(section.getCode().getPrimitiveValue()).trim();
    }

    private static String calcYearPart(BasicSCDocument doc) {
        DateDF valueDate = doc.getValueDate();
        if (ObjectChecker.isEmptyOrNull(valueDate))
            valueDate = DateDF.today();
        return StringUtils.PadLeft(String.valueOf(valueDate.getYear() % 100), YEAR_LENGTH);
    }

    private static Long nextSerial(String prefix, String lineTableName, Map<String, Long> lastSerialPerPrefix, Result result) {
        Long lastSerial = lastSerialPerPrefix.get(prefix);
        if (lastSerial == null)
            lastSerial = selectLastUsedSerial(prefix, lineTableName);
        long serial = lastSerial + 1;
        if (serial > MAX_SERIAL) {
            Result.createFailureResult("The serial of {0} reached its maximum {1}", prefix, MAX_SERIAL).addToAccumulatingResult(result);
            return null;
        }
        lastSerialPerPrefix.put(prefix, serial);
        return serial;
    }

    private static long selectLastUsedSerial(String prefix, String lineTableName) {
        Map<String, Object> queryParameters = new HashMap<>();
        queryParameters.put("pattern", prefix + "%");
        List<Object[]> rows = Persister.prepareAndExecuteJDBCQuery(queryParameters,
                'select text1 from ' + lineTableName + ' where text1 like {pattern}');
        long lastSerial = 0;
        for (Object[] row : rows) {
            Long serial = extractSerial(prefix, ObjectChecker.toStringOrEmpty(row[0]));
            if (serial != null && serial > lastSerial)
                lastSerial = serial;
        }
        return lastSerial;
    }

    private static Long extractSerial(String prefix, String text1) {
        String code = text1.trim();
        if (code.length() != prefix.length() + SERIAL_LENGTH)
            return null;
        if (!code.toUpperCase().startsWith(prefix.toUpperCase()))
            return null;
        String serial = code.substring(prefix.length());
        if (!(serial ==~ /\d+/))
            return null;
        return ObjectChecker.tryParseLong(serial);
    }

    @Override
    boolean shouldPreventSimultaneousRuns() {
        return true;
    }

    @Override
    List<String> columnNames() {
        return Arrays.asList("Not used - leave empty", "Static prefix, defaults to QC- when left empty");
    }

    @Override
    String describe() {
        return "Fills Text 1 of every document line whose item is lot tracked and whose Text 1 is still empty with " +
                "prefix + 2-digit year + - + item section code + 5-digit serial, for example QC-26-RAW00001. " +
                "Parameter 2 is the prefix (QC- when empty). The year comes from the document's value date. " +
                "The serial continues after the highest one already saved in Text 1 of the same kind of document line, separately for each " +
                "prefix, year and section. Lines whose item has no item section are skipped. Two runs can not happen at the same time. " +
                "Parameter 1 is not used.";
    }
}