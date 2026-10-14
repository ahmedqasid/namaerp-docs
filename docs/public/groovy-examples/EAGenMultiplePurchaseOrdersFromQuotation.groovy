package com.namasoft.modules.supplychain.domain.utils.plugnplay.groovy

import com.namasoft.common.fieldids.NotGeneratedFields
import com.namasoft.common.utilities.CollectionsUtility
import com.namasoft.infor.domainbase.util.actions.EAGenerateEntityFromEntityAction
import com.namasoft.infra.domainbase.common.approval.CriteriaDefinition
import com.namasoft.infra.domainbase.common.approval.LineIndices
import com.namasoft.infra.domainbase.common.criteria.CriteriaBuilder
import com.namasoft.infra.domainbase.datafields.EntityCodeDF
import com.namasoft.infra.domainbase.datafields.LongTextDF
import com.namasoft.infra.domainbase.entity.base.EntityAction
import com.namasoft.infra.domainbase.entity.base.EntityMediator
import com.namasoft.infra.domainbase.entity.generic.GenericReference
import com.namasoft.infra.domainbase.persistence.repos.FilterOnDimensions
import com.namasoft.infra.domainbase.persistence.repos.ListPageMatchingParameters
import com.namasoft.infra.domainbase.persistence.repos.Persister
import com.namasoft.infra.domainbase.util.Result
import com.namasoft.modules.supplychain.domain.details.PurchaseOrderLine
import com.namasoft.modules.supplychain.domain.details.PurchaseQuotationLine
import com.namasoft.modules.supplychain.domain.entities.PurchaseOrder
import com.namasoft.modules.supplychain.domain.entities.PurchaseQuotation
import com.namasoft.modules.supplychain.domain.utils.SCDocFromDocCopier
import com.namasoft.modules.supplychain.utils.SCEntityTypes

import static com.namasoft.common.fieldids.AllModulesFieldIDs.PurchaseOrder_supplier

public class EAGenMultiplePurchaseOrdersFromQuotation implements EntityAction<PurchaseQuotation> {
    @Override
    Result doAction(PurchaseQuotation doc, LongTextDF... parameters) {
        Result result = Result.createAccumulatingResult();
        CriteriaDefinition criteria = Persister.findByBusinessCode(CriteriaDefinition.class, EntityCodeDF.fromDataField(parameters[2]));
        def details = doc.getDetails()
        if (criteria != null) {
            LineIndices lineIndices = new LineIndices();
            criteria.isEntityMatching(doc, lineIndices);
            details = new ArrayList<PurchaseQuotationLine>();
            def indices = lineIndices.getIndices();
            if (indices == null)
                indices = new ArrayList<Integer>();
            for (def i : indices) {
                details.add(doc.getDetails().get(i));
            }
        }
        Map<GenericReference, List<PurchaseQuotationLine>> map = CollectionsUtility.mapList(details, { it.getRef3() });
        List<PurchaseOrder> orders = listOrders(doc)
        map.remove(null);
        for (Map.Entry<GenericReference, List<PurchaseQuotationLine>> e : map.entrySet()) {
            PurchaseOrder order = findOrder(e.getKey(), doc);
            if (order == null) {
                order = EntityMediator.createEntity(SCEntityTypes.PurchaseOrder());
            } else {
                order.startEditing().addToAccumulatingResult(result);
            }
            EAGenerateEntityFromEntityAction.copyFieldsFromSourceToTarget(doc, order, parameters[1].getPrimitiveValue());
            EntityMediator.copyCommonDataFromSourceToGeneraed(doc, order, order.getTerm(), order.getBook());
            SCDocFromDocCopier.copyHeaderDataExceptWareAndLocator(order, doc);
            EAGenerateEntityFromEntityAction.copyFieldsFromSourceToTarget(doc, order, parameters[1].getPrimitiveValue());
            order.setRef5(GenericReference.fromEntity(doc));
            order.setSupplier(GenericReference.toReal(e.getKey()));
            order.setFromDoc(GenericReference.fromEntity(doc));
            List<PurchaseOrderLine> old = new ArrayList<>(order.getDetails());
            order.getDetails().clear();
            for (PurchaseQuotationLine src : e.getValue()) {
                PurchaseOrderLine copy = old.isEmpty() ? order.createLine() : old.remove(0);
                SCDocFromDocCopier.copyLine(src, copy, doc);
                order.getDetails().add(copy);
            }
            EntityMediator.commitFromBusinessAction(order).addToAccumulatingResult(result);
            Persister.flush();
            for (PurchaseQuotationLine src : e.getValue()) {
                src.setRef4(order.toGenericReference());
            }
            orders.remove(order);
        }
        deleteOrders(orders, result);
        result
    }

    private List<PurchaseOrder> listOrders(PurchaseQuotation doc) {
        List<PurchaseOrder> existing = Persister.listPageMatching(PurchaseOrder.class,
                ListPageMatchingParameters.create().criteria(CriteriaBuilder.create().field(NotGeneratedFields.ref5 + ".id").equal(doc.getId()).build()));
        return existing;
    }

    private void deleteOrders(List<PurchaseOrder> orders, Result result) {
        for (PurchaseOrder order : orders) {
            EntityMediator.deleteEntityFromBusinessAction(order).addToAccumulatingResult(result);
        }
    }

    private PurchaseOrder findOrder(GenericReference supplier, PurchaseQuotation doc) {
        return Persister.findFirstRecordMatching(PurchaseOrder.class, CriteriaBuilder.create().field(NotGeneratedFields.ref5 + ".id").equal(doc.getId()).and().field(PurchaseOrder_supplier).equal(GenericReference.toReal(supplier)).build(), FilterOnDimensions.No);
    }

    @Override
    String describe() {
        return "Purchase quotation: creates one purchase order per supplier, taking the supplier from each line's Ref 3. " +
                "Only the lines that match the criteria definition whose code is in parameter 3 are used (all lines when it is empty). " +
                "Each run updates the orders made before for the same suppliers, creates the missing ones and deletes the ones whose supplier is no longer used. " +
                "Header and lines are copied from the quotation, then the field map in parameter 2 is applied. " +
                "Each order's Ref 5 and From Document point at the quotation, and each used quotation line's Ref 4 points at its order. Parameter 1 is not used.";
    }

    @Override
    List<String> columnNames() {
        return Arrays.asList("Not used - leave empty", "Fields Map", "Lines Criteria")
    }
}