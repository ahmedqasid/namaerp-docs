package com.namasoft.modules.supplychain.domain.utils.plugnplay.groovy

import com.namasoft.common.Pair
import com.namasoft.common.utilities.ObjectChecker
import com.namasoft.infra.domainbase.datafields.BooleanDF
import com.namasoft.infra.domainbase.datafields.LongTextDF
import com.namasoft.infra.domainbase.datafields.UniqueIDDF
import com.namasoft.infra.domainbase.entity.base.EntityAction
import com.namasoft.infra.domainbase.persistence.repos.Persister
import com.namasoft.infra.domainbase.util.Result
import com.namasoft.modules.basic.domain.primitives.EntityTargetAction
import com.namasoft.modules.supplychain.domain.details.BasicSCDocumentLine
import com.namasoft.modules.supplychain.domain.entities.BasicSCDocument
import com.namasoft.modules.supplychain.domain.entities.InvItem
import com.namasoft.modules.supplychain.domain.primitives.LotId
import com.namasoft.modules.supplychain.domain.primitives.SerialNumber

public class EAClearLotIdsWithNoItemDimensionsQty implements EntityAction<BasicSCDocument> {

    @Override
    Result doAction(EntityTargetAction action, BasicSCDocument doc, LongTextDF... parameters) {
        Result result = Result.createAccumulatingResult();
        clearDimensionsDisabledOnItem(doc);
        Map<Pair<UUID, String>, List<BasicSCDocumentLine>> linesPerItemAndLot = collectLinesHavingLot(doc);
        if (ObjectChecker.isEmptyOrNull(linesPerItemAndLot))
            return result;
        Set<Pair<UUID, String>> knownItemAndLotPairs = selectExistingItemAndLotPairs(linesPerItemAndLot.keySet());
        for (Map.Entry<Pair<UUID, String>, List<BasicSCDocumentLine>> entry : linesPerItemAndLot.entrySet()) {
            if (knownItemAndLotPairs.contains(entry.getKey()))
                continue;
            for (BasicSCDocumentLine line : entry.getValue())
                clearLotAndItsDates(line);
        }
        return result;
    }

    private static void clearDimensionsDisabledOnItem(BasicSCDocument doc) {
        List<BasicSCDocumentLine> details = doc.getDetails();
        if (ObjectChecker.isEmptyOrNull(details))
            return;
        for (BasicSCDocumentLine line : details) {
            InvItem item = line.fetchItem();
            if (item == null)
                continue;
            if (BooleanDF.isFalse(item.getHasLot()))
                clearLotAndItsDates(line);
            else if (BooleanDF.isFalse(item.getHasExpiry()))
                line.setExpiryDate(null);
            if (BooleanDF.isFalse(item.getHasSerial()))
                line.getSpecificDimensions().setSerialNumber(SerialNumber.createEmpty());
            if (BooleanDF.isFalse(item.getHasTwoSerials()))
                line.getSpecificDimensions().setSecondSerial(SerialNumber.createEmpty());
        }
    }

    private static void clearLotAndItsDates(BasicSCDocumentLine line) {
        line.getSpecificDimensions().setLotId(LotId.createEmpty())
        line.setExpiryDate(null)
        line.setProductionDate(null)
        line.setRetestDate(null)
    }

    private static Map<Pair<UUID, String>, List<BasicSCDocumentLine>> collectLinesHavingLot(BasicSCDocument doc) {
        Map<Pair<UUID, String>, List<BasicSCDocumentLine>> linesPerItemAndLot = new LinkedHashMap<>();
        List<BasicSCDocumentLine> details = doc.getDetails();
        if (ObjectChecker.isEmptyOrNull(details))
            return linesPerItemAndLot;
        for (BasicSCDocumentLine line : details) {
            if (line.fetchItem() == null || BooleanDF.isFalse(line.fetchItem().getHasLot()))
                continue;
            if (ObjectChecker.isEmptyOrNull(line.fetchLotId()))
                continue;
            Pair<UUID, String> key = itemAndLotKey(line.fetchItem().getId(), line.fetchLotId());
            linesPerItemAndLot.computeIfAbsent(key, { k -> new ArrayList<BasicSCDocumentLine>() }).add(line);
        }
        return linesPerItemAndLot;
    }

    private static Set<Pair<UUID, String>> selectExistingItemAndLotPairs(Collection<Pair<UUID, String>> keys) {
        Map<String, Object> queryParameters = new HashMap<>();
        queryParameters.put("items", keys.collect { UniqueIDDF.fromUUID(it.getX()) }.unique());
        queryParameters.put("lots", keys.collect { it.getY() }.unique());
        List<Object[]> rows = Persister.prepareAndExecuteJDBCQuery(queryParameters,
                'select q.item_id, q.lotId from ItemDimensionsQty q where q.item_id in ({items}) and q.lotId in ({lots})');
        Set<Pair<UUID, String>> existing = new HashSet<>();
        for (Object[] row : rows)
            existing.add(itemAndLotKey(UniqueIDDF.fromObject(row[0]), row[1]));
        return existing;
    }

    private static Pair<UUID, String> itemAndLotKey(UniqueIDDF itemId, Object lotId) {
        UUID item = itemId == null ? null : itemId.getPrimitiveValue();
        return Pair.of(item, ObjectChecker.toStringOrEmpty(lotId).trim().toUpperCase());
    }

    @Override
    String describe() {
        return "Clears the dimensions that the item of the line does not use, then clears the lot of every document line whose " +
                "item + lot pair has no row in the item dimensions quantities table, so that a lot that was never received is not " +
                "carried on the document.\n" +
                "A dimension is cleared when the matching option is disabled on the item: the lot together with its expiry, production " +
                "and retest dates when the item has no lot, the expiry date when the item has no expiry, the serial when the item has " +
                "no serial, and the second serial when the item has no two serials.\n" +
                "For the lot check, lines are skipped when the item is empty, when the item is not lot tracked, or when the line has no lot.\n" +
                "All remaining lines are checked with a single query, and the lot is compared ignoring case and surrounding spaces.\n" +
                "Takes no parameters."
    }

    @Override
    List<String> columnNames() {
        return Arrays.asList("Not used - leave empty");
    }
}
