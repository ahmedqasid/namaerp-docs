package com.namasoft.modules.supplychain.domain.utils.plugnplay.groovy


import com.namasoft.common.utilities.ObjectChecker
import com.namasoft.infra.domainbase.datafields.LongTextDF
import com.namasoft.infra.domainbase.datafields.enums.EntityTypeDF
import com.namasoft.infra.domainbase.entity.base.EntityAction
import com.namasoft.infra.domainbase.entitytype.EntityTypeUtil
import com.namasoft.infra.domainbase.util.Result
import com.namasoft.modules.basic.domain.primitives.DeliveryStatus
import com.namasoft.modules.supplychain.domain.details.BasicSCDocumentLine
import com.namasoft.modules.supplychain.domain.details.HasDeliveryStatus
import com.namasoft.modules.supplychain.domain.entities.BasicSCDocument
import com.namasoft.modules.supplychain.domain.entities.SalesInvoice

class EASetDeliveryStatusInFromDocLines implements EntityAction<BasicSCDocument> {
    @Override
    Result doAction(BasicSCDocument object, LongTextDF... parameters) {
        DeliveryStatus status = DeliveryStatus.Delivering();
        if (ObjectChecker.isNotEmptyOrNull(parameters[1]))
            status = DeliveryStatus.fromString(parameters[1].getPrimitiveValue());
        Class klass = SalesInvoice.class;
        if (ObjectChecker.isNotEmptyOrNull(parameters[2]))
            klass = EntityTypeUtil.getEntityClassFromType(EntityTypeDF.fromDataField(parameters[2]));
        for (final BasicSCDocumentLine detail in object.getDetails()) {
            def parentLine = object.fetchParentLine(detail, klass);
            if (parentLine != null) {
                HasDeliveryStatus l = parentLine.getY();
                l.setDelivStatus(status);
            }
        }
        return Result.createSuccessResult();
    }

    @Override
    String describe() {
        return "Sets the delivery status of the lines this document was made from. For each line, the script follows the line's " +
                "source line up the chain of from-documents until it reaches a document of the type in parameter 3 (default SalesInvoice), " +
                "and sets that line's delivery status to the value in parameter 2 (default Delivering). Lines with no source line are skipped. " +
                "The type in parameter 3 must be a document whose lines have a delivery status, such as a sales document or a delivery document. " +
                "Parameter 1 is not used.";
    }

    @Override
    List<String> columnNames() {
        return Arrays.asList("Not used - leave empty",
                "Status To Change To (NotDelivered, PartialDelivered, Delivered, Cancelled, Delivering, Loaded, Other1, Other2, Other3), default is Delivering",
                "Document Type To change status in, default is SalesInvoice");
    }
}
