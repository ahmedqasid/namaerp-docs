package com.namasoft.modules.accounting.domain.utils.actions

import com.namasoft.common.fieldids.AllModulesFieldIDs
import com.namasoft.common.fieldids.NotGeneratedFields
import com.namasoft.common.utilities.CollectionsUtility
import com.namasoft.common.utilities.ObjectChecker
import com.namasoft.infra.domainbase.common.PageData
import com.namasoft.infra.domainbase.common.criteria.CriteriaBuilder
import com.namasoft.infra.domainbase.datafields.DecimalDF
import com.namasoft.infra.domainbase.datafields.LongTextDF
import com.namasoft.infra.domainbase.entity.base.EntityAction
import com.namasoft.infra.domainbase.entity.generic.GenericReference
import com.namasoft.infra.domainbase.persistence.repos.FilterOnDimensions
import com.namasoft.infra.domainbase.persistence.repos.ListPageMatchingParameters
import com.namasoft.infra.domainbase.persistence.repos.Persister
import com.namasoft.infra.domainbase.util.Result
import com.namasoft.modules.accounting.domain.details.RVPVDetailLine
import com.namasoft.modules.accounting.domain.entities.RVPVVoucher

import java.util.stream.Collectors

public class EACreateSerialForLineSubsidiary implements EntityAction<RVPVVoucher> {

    @Override
    Result doAction(RVPVVoucher doc, LongTextDF... parameters) {
        Result result = Result.createAccumulatingResult();
        Map<GenericReference, List<RVPVDetailLine>> map = CollectionsUtility.mapList(doc.fetchLines(), { l -> l.getSubsidiary() });
        for (Map.Entry<GenericReference, List<RVPVDetailLine>> entry : map.entrySet()) {
            if (ObjectChecker.isEmptyOrNull(entry.getKey()))
                continue;
            CriteriaBuilder.ExpressionBuilder builder = CriteriaBuilder.create()
                    .openBraket()
                    .field(NotGeneratedFields.valueDate).lessThan(doc.getValueDate())
                    .or().openBraket().field(NotGeneratedFields.valueDate).equal(doc.getValueDate()).and().field("creationDate").lessThan(doc.creationDate()).closeBraket()
                    .closeBraket().and()
                    .field(NotGeneratedFields.fiscalYear).equal(doc.getFiscalYear()).and().idNotEqual(doc.getId()).and().commitedBefore()
                    .and().field(AllModulesFieldIDs.PaymentVoucher_lines_subsidiary + ".id").equal(entry.getKey().getId());
            List<RVPVVoucher> docs = Persister.listPageMatching(doc.getClass(), ListPageMatchingParameters.create().pageData(PageData.One()).filterOnDimensions(FilterOnDimensions.No).
                    criteria(builder).orderBy(NotGeneratedFields.valueDate, NotGeneratedFields.creationDate).desc());
            RVPVVoucher lastDoc = CollectionsUtility.getLast(docs);
            List<RVPVDetailLine> lines = lastDoc == null ? new ArrayList<>() : lastDoc.fetchLines().stream().filter { l -> ObjectChecker.areEqual(l.getSubsidiary(), entry.getKey()) }.collect(Collectors.toList());
            RVPVDetailLine lastLine = CollectionsUtility.getLast(lines);
            int serial = lastLine == null ? 0 : lastLine.getN1().tryToInt()
            for (RVPVDetailLine line in entry.getValue()) {
                serial++;
                StringBuilder lineSerial = new StringBuilder();
                lineSerial.append(line.getSubsidiary().getCode()).append(" - ").append(doc.getFiscalYear().getCode()).append(" - ").append(serial);
                line.setNarration(LongTextDF.fromString(lineSerial.toString()));
                line.setN1(DecimalDF.fromInteger(serial.toInteger()));
            }
        }
        return result;
    }

    @Override
    String describe() {
        return "Receipt or payment voucher: numbers the lines of each subsidiary within the fiscal year. Every line that has a subsidiary gets the number " +
                "that follows the last line of the same subsidiary in the earlier committed vouchers of the same type and fiscal year. The number is written " +
                "to the line's N1, and the text <subsidiary code> - <fiscal year code> - <number> to its Narration. Takes no parameters."
    }

    @Override
    List<String> columnNames() {
        return Arrays.asList("Not used - leave empty")
    }
}