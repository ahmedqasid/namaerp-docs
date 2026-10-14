package com.namasoft.modules.accounting.utils.entityactions

import com.namasoft.common.Pair
import com.namasoft.common.fieldids.newids.accounting.IdsOfPVRequest
import com.namasoft.common.utilities.ObjectChecker
import com.namasoft.infra.domainbase.common.CommonValidations
import com.namasoft.infra.domainbase.common.criteria.CriteriaBuilder
import com.namasoft.infra.domainbase.datafields.DecimalDF
import com.namasoft.infra.domainbase.datafields.EntityCodeDF
import com.namasoft.infra.domainbase.datafields.LongTextDF
import com.namasoft.infra.domainbase.datafields.UniqueIDDF
import com.namasoft.infra.domainbase.entity.base.EntityAction
import com.namasoft.infra.domainbase.modules.hr.Employee
import com.namasoft.infra.domainbase.persistence.repos.ListPageMatchingParameters
import com.namasoft.infra.domainbase.persistence.repos.Persister
import com.namasoft.infra.domainbase.util.Result
import com.namasoft.modules.accounting.domain.entities.PVRequest
import com.namasoft.modules.basic.domain.entities.DetailedRemark
import com.namasoft.modules.basic.utils.BSCEntityTypes

import java.util.stream.Collectors

class EAYearlyLimitPerEmployeeInPVRequest implements EntityAction<PVRequest> {
    @Override
    Result doAction(PVRequest object, LongTextDF... parameters) {
        def from = object.getFrom();
        def healthSafeCode = EntityCodeDF.fromString("health")
        if (from == null || from.toReal().getCode() != healthSafeCode)
            return Result.createSuccessResult();
        Result result = Result.createAccumulatingResult();
        validateDetails(object, result);
        def emps = object.getDetails().stream().map { it.getTo() }.filter(ObjectChecker::isNotEmptyOrNull)
                .filter { it.instanceOf(BSCEntityTypes.Employee()) }.collect(Collectors.toSet());
        if (emps.isEmpty()) {
            return result;
        }
        def allRequests = Persister.listPageMatching(PVRequest.class, ListPageMatchingParameters.create()
                .criteria(CriteriaBuilder.create().field(IdsOfPVRequest.valueDate).greaterThanOrEqual(object.getValueDate().yearStart())
                        .and().field(IdsOfPVRequest.valueDate).lessThanOrEqual(object.getValueDate().yearEnd())
                        .and().commitedBefore().and().idNotEqual(object.getId())
                        .and().field(IdsOfPVRequest.details_to + ".id").in(emps.stream().map {it.getId()}.toList())
                        .and().field(IdsOfPVRequest.from + ".id").equal(from.getId())))
        Map<Pair<Employee, DetailedRemark>, DecimalDF> totals = new HashMap<>();
        for (def i = 0; i < object.getDetails().size(); i++) {
            def d = object.getDetails().get(i);
            if (d.getRef1() == null || d.getRef1().notInstanceOf(BSCEntityTypes.DetailedRemark()))
                continue;
            if (d.getTo() == null || d.getTo().notInstanceOf(BSCEntityTypes.Employee()))
                continue;
            def item = d.getRef1().<DetailedRemark> toReal()
            def emp = d.getTo().<Employee> toReal()
            def totalOfCurrent = totals.computeIfAbsent(new Pair<>(emp, item), { DecimalDF.zero() })
            totalOfCurrent.mutateAdd(d.getAmount());
            def totalOfOthers = DecimalDF.totalizeStream(allRequests.stream().flatMap { it.getDetails().stream() }.filter { ObjectChecker.arePairsEqual(d.getTo(), it.getTo(), d.getRef1(), it.getRef1()) }.map { it.getAmount() });

            def grandTotal = totalOfOthers.add(totalOfCurrent)
            if (grandTotal.isGreaterThan(item.getN1()))
                Result.createDetailFieldValidationFailure(IdsOfPVRequest.details_to, i, "The employee {0} total {1} for item {2} exceeded the defined yearly maximum {3}",
                        emp, grandTotal, item, item.getN1()).addToAccumulatingResult(result)
            d.setN1(grandTotal);
            d.setN2(item.getN1());
            d.setN3(item.getN1().subtract(grandTotal));
        }
        allRequests.add(object);
        for (final def emp in emps) {
            def yearTotal = DecimalDF.totalizeStream(allRequests.stream().flatMap { it.getDetails().stream() }
                    .filter { it.getTo() != null && it.getTo() == emp }
                    .map { it.getAmount() });
            if (yearTotal.isGreaterThan(DecimalDF.fromString(parameters[1].getPrimitiveValue())))
                Result.createFailureResult("The yearly total {0} for employee {1} is more than configured value {2}",
                        yearTotal, emp, parameters[1]).addToAccumulatingResult(result)
        }
        return result;
    }

    static void validateDetails(PVRequest object, Result result) {
        for (int i = 0; i < object.getDetails().size(); i++) {
            def detail = object.getDetails().get(i);
            if (CommonValidations.checkColumnRequired(object.getEntityType(), IdsOfPVRequest.details_to, i, detail.getTo(), result)) {
                if (detail.getTo().notInstanceOf(BSCEntityTypes.Employee()))
                    Result.createDetailFieldValidationFailure(IdsOfPVRequest.details_to, i, "The ref {0} must be an employee at line {1}", detail.getTo(), i + 1).addToAccumulatingResult(result);
            }
            if (CommonValidations.checkColumnRequired(object.getEntityType(), IdsOfPVRequest.details + ".ref1", i, detail.getRef1(), result)) {
                if (detail.getRef1().notInstanceOf(BSCEntityTypes.DetailedRemark()))
                    Result.createDetailFieldValidationFailure(IdsOfPVRequest.details + ".ref1", i, "The ref {0} must be a detailed remark at line {1}", detail.getRef1(), i + 1).addToAccumulatingResult(result);
            }
        }
    }

    @Override
    String describe() {
        return "Payment request: a yearly allowance per employee, for example a medical allowance. Applies only when Paid From is the record with code health. " +
                "Every line needs an employee in To and a detailed remark in Ref 1; the detailed remark's N1 is the yearly maximum per employee for that item. " +
                "On each line the employee's total for the item this year (committed requests from the same Paid From, plus this one) is written to N1, " +
                "the maximum to N2 and what remains to N3, and the line is refused when the maximum is exceeded. The request is also refused when an " +
                "employee's total for the year, all items together, is more than parameter 2. Parameter 1 is not used."
    }

    @Override
    List<String> columnNames() {
        return Arrays.asList("Not used - leave empty", "Yearly Maximum")
    }
}
