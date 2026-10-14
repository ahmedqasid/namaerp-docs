package com.namasoft.modules.supplychain.domain.utils

import com.namasoft.common.utilities.ObjectChecker
import com.namasoft.infra.domainbase.datafields.BooleanDF
import com.namasoft.infra.domainbase.datafields.LongTextDF
import com.namasoft.infra.domainbase.entity.base.EntityAction
import com.namasoft.infra.domainbase.entity.generic.GenericReference
import com.namasoft.infra.domainbase.util.DetailLineUtil
import com.namasoft.infra.domainbase.util.Result
import com.namasoft.modules.supplychain.domain.details.BasicSCDocumentLine
import com.namasoft.modules.supplychain.domain.details.SalesLine
import com.namasoft.modules.supplychain.domain.entities.SalesDocument

public class EASetSourceLineIDForFreeItemInSalesReturn implements EntityAction<SalesDocument> {
    @Override
    Result doAction(SalesDocument doc, LongTextDF... parameters) {
        Result result = Result.createAccumulatingResult();
        SalesDocument fromDoc = GenericReference.toRealOrNull(doc.getFromDoc(), SalesDocument.class);
        if (fromDoc == null)
            return result;
        for (SalesLine line : doc.getDetails()) {
            if (ObjectChecker.isNotEmptyOrNull(line.getSourceLineId()) || BooleanDF.isFalse(line.getFreeLine()))
                continue;
            SalesLine masterDocLine = DetailLineUtil.findLineWithId(doc.getDetails(), line.getMasterRowId());
            if (masterDocLine == null)
                continue;

            List<BasicSCDocumentLine> fromDocLines = fromDoc.getDetails();
            BasicSCDocumentLine fromDocLine = fromDocLines.stream().filter(l -> ObjectChecker.areEqual(masterDocLine.getSourceLineId(), l.getMasterRowId()) && ObjectChecker.areEqual(line.fetchItem(), l.fetchItem())).findFirst().orElse(null);
            if (fromDocLine != null)
                line.setSourceLineId(fromDocLine.getId())
        }
        return result;
    }

    @Override
    String describe() {
        return "Sales return (or any sales document made from another sales document): a free item line that has no source line id gets one. " +
                "The script takes the line the free line belongs to, finds that line's source line in the from-doc, and links the free line to the free line " +
                "of the same item that belongs to that source line. Lines that are not free, or are already linked, are left as they are. Parameter 1 is not used.";
    }

    @Override
    List<String> columnNames() {
        return Arrays.asList("Not used - leave empty");
    }
}
