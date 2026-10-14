package com.namasoft.modules.supplychain.domain.utils.plugnplay.groovy

import com.namasoft.common.utilities.ObjectChecker
import com.namasoft.infra.domainbase.datafields.DecimalDF
import com.namasoft.infra.domainbase.datafields.LongTextDF
import com.namasoft.infra.domainbase.datafields.UniqueTextDF
import com.namasoft.infra.domainbase.entity.base.EntityAction
import com.namasoft.infra.domainbase.entity.base.EntityMediator
import com.namasoft.infra.domainbase.metadata.EntityReflection
import com.namasoft.infra.domainbase.persistence.repos.Persister
import com.namasoft.infra.domainbase.util.Result
import com.namasoft.modules.supplychain.domain.details.ItemDimensionsDetail
import com.namasoft.modules.supplychain.domain.details.PurchaseReturnReqLine
import com.namasoft.modules.supplychain.domain.details.SizesAndColors
import com.namasoft.modules.supplychain.domain.entities.InvItem
import com.namasoft.modules.supplychain.domain.entities.PurchaseReturnReq
import com.namasoft.modules.supplychain.domain.primitives.ItemColorDF
import com.namasoft.modules.supplychain.domain.primitives.ItemSizeDF
import com.namasoft.modules.supplychain.domain.valueobjects.ItemDimensions
import com.namasoft.modules.supplychain.domain.valueobjects.ItemDimensionsData

public class EAUpdateItemDimensionsFromPurchaseReturnReqLines implements EntityAction<PurchaseReturnReq> {

    @Override
    Result doAction(PurchaseReturnReq object, LongTextDF... parameters) {
        Result result = Result.createAccumulatingResult();
        Set<InvItem> items = new LinkedHashSet<>();
        for (PurchaseReturnReqLine requestLine : object.getDetails()) {
            InvItem item = loadItem(requestLine);
            if (ObjectChecker.isEmptyOrNull(item))
                continue;
            upsertItemDimensionFromRequestLine(item, requestLine, parameters);
            applySizeAndColorMappings(item, requestLine, parameters);
            items.add(item);
        }
        for (InvItem item : items) {
            item.startEditing().addToAccumulatingResult(result);
            EntityMediator.commitFromBusinessAction(item).addToAccumulatingResult(result);
        }
        return result;
    }

    private InvItem loadItem(PurchaseReturnReqLine line) {
        if (ObjectChecker.isEmptyOrNull(line.getItem()) || ObjectChecker.isEmptyOrNull(line.getItem().getItem()))
            return null;
        return Persister.findByID(InvItem.class, line.getItem().getItem().getId());
    }

    private void upsertItemDimensionFromRequestLine(InvItem item, PurchaseReturnReqLine requestLine, LongTextDF... parameters) {
        ItemDimensionsDetail dimension = findOrAddDimension(item, requestLine);
        copyNotEmptyFieldsFromRequestLine(requestLine, dimension);
        applyMappings(requestLine, dimension, parseFieldMappings(DETAILS_PREFIX, parameters));
    }

    private ItemDimensionsDetail findOrAddDimension(InvItem item, PurchaseReturnReqLine requestLine) {
        ItemDimensionsDetail dimension = null;
        if (ObjectChecker.isNotEmptyOrNull(item.getDetails()))
            dimension = item.getDetails().stream().filter(dim -> ObjectChecker.isNotEmptyOrNull(dim.getItemCode()) && matches(requestLine, dim)).findFirst().orElse(null);
        if (dimension == null)
            dimension = addNewDimension(item, requestLine);
        return dimension;
    }

    private void applySizeAndColorMappings(InvItem item, PurchaseReturnReqLine requestLine, LongTextDF... parameters) {
        List<String[]> mappings = parseFieldMappings(SIZES_AND_COLORS_PREFIX, parameters);
        if (ObjectChecker.isEmptyOrNull(mappings))
            return;
        SizesAndColors sizeAndColor = findOrAddSizeAndColor(item, requestLine);
        applyMappings(requestLine, sizeAndColor, mappings);
    }

    private static void applyMappings(PurchaseReturnReqLine requestLine, Object targetLine, List<String[]> mappings) {
        for (String[] mapping : mappings) {
            Object value = resolveSourceValue(requestLine, mapping[1]);
            if (ObjectChecker.isNotEmptyOrNull(value))
                EntityReflection.setIncompatibleValueInField(targetLine, mapping[0], value);
        }
    }

    private static final String SIZES_AND_COLORS_PREFIX = "sizesAndColors.";
    private static final String DETAILS_PREFIX = "details.";

    private static List<String[]> parseFieldMappings(String prefix, LongTextDF... parameters) {
        List<String[]> mappings = new ArrayList<>();
        for (LongTextDF parameter : parameters) {
            if (parameter == null || ObjectChecker.isEmptyOrNull(parameter.getPrimitiveValue()))
                continue;
            for (String rawLine : parameter.getPrimitiveValue().split("\\r?\\n")) {
                int separator = rawLine.indexOf("=");
                if (separator <= 0)
                    continue;
                String targetField = rawLine.substring(0, separator).trim();
                String sourceField = rawLine.substring(separator + 1).trim();
                if (!hasPrefix(targetField, prefix))
                    continue;
                targetField = targetField.substring(prefix.length()).trim();
                if (ObjectChecker.isNotEmptyOrNull(targetField) && ObjectChecker.isNotEmptyOrNull(sourceField))
                    mappings.add([targetField, sourceField] as String[]);
            }
        }
        return mappings;
    }

    private static boolean hasPrefix(String targetField, String prefix) {
        return ObjectChecker.isNotEmptyOrNull(targetField) && targetField.regionMatches(true, 0, prefix, 0, prefix.length());
    }

    private static Object resolveSourceValue(PurchaseReturnReqLine requestLine, String sourceField) {
        if (sourceField.length() >= 2 && sourceField.startsWith("\"") && sourceField.endsWith("\""))
            return sourceField.substring(1, sourceField.length() - 1);
        return EntityReflection.getFieldValue(sourceField, requestLine, true);
    }

    private SizesAndColors findOrAddSizeAndColor(InvItem item, PurchaseReturnReqLine requestLine) {
        String sizeCode = sizeCode(requestLine);
        String colorCode = colorCode(requestLine);
        SizesAndColors sizeAndColor = null;
        if (ObjectChecker.isNotEmptyOrNull(item.getSizesAndColors()))
            sizeAndColor = item.getSizesAndColors().stream().filter(sc -> matchesSizeAndColor(sc, sizeCode, colorCode)).findFirst().orElse(null);
        if (sizeAndColor == null) {
            if (item.getSizesAndColors() == null)
                item.setSizesAndColors(new ArrayList<SizesAndColors>());
            sizeAndColor = new SizesAndColors();
            sizeAndColor.setSize(ItemSizeDF.fromString(sizeCode));
            sizeAndColor.setColor(ItemColorDF.fromString(colorCode));
            item.getSizesAndColors().add(sizeAndColor);
        }
        return sizeAndColor;
    }

    private static boolean matchesSizeAndColor(SizesAndColors sizeAndColor, String sizeCode, String colorCode) {
        return ObjectChecker.areEqual(sizeCode, primitive(sizeAndColor.getSize())) &&
                ObjectChecker.areEqual(colorCode, primitive(sizeAndColor.getColor()));
    }

    private static String sizeCode(PurchaseReturnReqLine line) {
        return line.getSpecificDimensions() == null ? null : primitive(line.getSpecificDimensions().getSize());
    }

    private static String colorCode(PurchaseReturnReqLine line) {
        return line.getSpecificDimensions() == null ? null : primitive(line.getSpecificDimensions().getColor());
    }

    private ItemDimensionsDetail addNewDimension(InvItem item, PurchaseReturnReqLine requestLine) {
        if (item.getDetails() == null)
            item.setDetails(new ArrayList<ItemDimensionsDetail>());
        ItemDimensionsDetail dimension = new ItemDimensionsDetail();
        dimension.setItemCode(UniqueTextDF.fromString(itemCode(requestLine)));
        ItemDimensions dimensions = new ItemDimensions();
        dimensions.getSpecificDimensions().setWarehouse(requestLine.fetchWarehouse());
        dimension.setItemDimensions(dimensions);
        item.getDetails().add(dimension);
        return dimension;
    }

    private void copyNotEmptyFieldsFromRequestLine(PurchaseReturnReqLine line, ItemDimensionsDetail dim) {
        ItemDimensionsData data = ensureData(dim);
        if (DecimalDF.isNotEmptyOrZero(line.getN1()))
            data.setMinQuantity(line.getN1());
        if (DecimalDF.isNotEmptyOrZero(line.getN2()))
            data.setOrderLimit(line.getN2());
        if (DecimalDF.isNotEmptyOrZero(line.getN5()))
            data.setSlowMovingPeriod(line.getN5());
        if (ObjectChecker.isNotEmptyOrNull(line.getB1()))
            data.setSuggestedDiscsNOffers(line.getB1());
        if (DecimalDF.isNotEmptyOrZero(line.getN3()))
            dim.setN1(line.getN3());
        if (DecimalDF.isNotEmptyOrZero(line.getN4()))
            dim.setN2(line.getN4());
    }

    private ItemDimensionsData ensureData(ItemDimensionsDetail dim) {
        if (dim.getData() == null)
            dim.setData(new ItemDimensionsData());
        return dim.getData();
    }

    private boolean matches(PurchaseReturnReqLine line, ItemDimensionsDetail dim) {
        return ObjectChecker.areEqual(line.fetchWarehouse(), dim.fetchWarehouse()) &&
                ObjectChecker.areEqual(itemCode(line), primitive(dim.getItemCode()));
    }

    private static String itemCode(PurchaseReturnReqLine line) {
        return line.getItem() == null ? null : primitive(line.getItem().getItemCode());
    }

    private static String primitive(def dataField) {
        return dataField == null ? null : dataField.getPrimitiveValue();
    }

    @Override
    String describe() {
        return "For each Purchase Return Request line, updates the matching item dimensions line on the item (matched by warehouse + item code) using only the line's non-empty values, then saves and commits the item. If no dimensions line matches that code + warehouse, a new one is added.\n" +
                "Fixed copies: request line n1 -> min quantity, n2 -> order limit, n5 -> slow moving period, b1 -> suggested in discounts and offers, n3 -> dimensions line n1, n4 -> dimensions line n2.\n" +
                "Parameters (optional): a field map that fills the item's detail lines. One mapping per line, format:\n" +
                "<listPrefix><targetField>=<requestLineSourceField>\n" +
                "Supported list prefixes:\n" +
                "  details.         -> the Item Dimensions line (matched by warehouse + item code)\n" +
                "  sizesAndColors.  -> the Sizes And Colors row (matched by the request line's size + color, added when missing)\n" +
                "A line whose target has no supported prefix is ignored. Mixed example:\n" +
                "details.description2=text1\n" +
                "details.n3=n5\n" +
                "sizesAndColors.text3=text1\n" +
                "sizesAndColors.n1=n3\n" +
                "sizesAndColors.name1=\"Returned\"\n" +
                "The right-hand side is a field id on the request line, or a \"quoted literal\". Empty source values are skipped. Mappings may be spread across parameters 2 to 15; leave parameter 1 empty."
    }

    @Override
    List<String> columnNames() {
        return Arrays.asList("Not used - leave empty", "Field map (optional), one per line: details.<field>=<line field> or sizesAndColors.<field>=<line field>",
                "More field map lines (optional)", "More field map lines (optional)");
    }
}
