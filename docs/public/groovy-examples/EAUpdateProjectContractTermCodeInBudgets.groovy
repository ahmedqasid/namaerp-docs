package com.namasoft.modules.contracting.domain.utils


import com.namasoft.common.utilities.ObjectChecker
import com.namasoft.infra.domainbase.datafields.LongTextDF
import com.namasoft.infra.domainbase.datafields.TextDF
import com.namasoft.infra.domainbase.entity.base.EntityAction
import com.namasoft.infra.domainbase.util.Result
import com.namasoft.modules.basic.domain.primitives.EntityTargetAction
import com.namasoft.modules.contracting.domain.details.ContrEstimatdBudgetTermLine
import com.namasoft.modules.contracting.domain.details.ContrExecutivBudgetTermLine
import com.namasoft.modules.contracting.domain.details.IBudgetTermLine
import com.namasoft.modules.contracting.domain.details.ProjContractTermLine
import com.namasoft.modules.contracting.domain.entities.IBudgetFile
import com.namasoft.modules.contracting.domain.entities.ProjectContract

import java.util.stream.Collectors

public class EAUpdateProjectContractTermCodeInBudgets implements EntityAction<ProjectContract> {
    @Override
    Result doAction(EntityTargetAction action, ProjectContract object, LongTextDF... parameters) {
        Result result = Result.createAccumulatingResult();
        boolean fromCancel = ObjectChecker.areEqual(action, EntityTargetAction.PostDelete());
        updateProjectTermCodeInBudgets(object.getEstimatedBudget(), object.getTerms(), fromCancel);
        updateProjectTermCodeInBudgets(object.getExecutiveBudget(), object.getTerms(), fromCancel);
        return result;
    }

    private static void updateProjectTermCodeInBudgets(IBudgetFile budget, List<ProjContractTermLine> terms, boolean fromCancel) {
        if (budget == null)
            return;
        for (ProjContractTermLine contractTermLine : terms) {
            List<IBudgetTermLine> budgetLines = budget.fetchTermLines().stream().filter({ l -> termsAreMatched(l, contractTermLine) }).collect(Collectors.toList());
            if (!fromCancel)
                budgetLines.forEach({ l -> l.updateProjectTermCode(contractTermLine.getTermCode()) });
            else
                budgetLines.forEach({ l -> l.updateProjectTermCode(TextDF.EMPTY()) });
        }
    }

    private static boolean termsAreMatched(IBudgetTermLine line, ProjContractTermLine contractLine) {
        if (line instanceof ContrEstimatdBudgetTermLine)
            return ObjectChecker.areEqual(line.getTermCode(), contractLine.getTermCode());
        if (line instanceof ContrExecutivBudgetTermLine)
            return ObjectChecker.areEqual(((ContrExecutivBudgetTermLine) line).getEstimatedTermCode(), contractLine.getTermCode());
        return false;
    }

    @Override
    String describe() {
        return "Project contract: writes each contract term's code into the matching term lines of the contract's estimated budget and executive budget " +
                "(an estimated budget line matches on its term code, an executive budget line on its estimated term code). Run it on Post Commit. " +
                "On Post Delete the same lines are cleared instead. Takes no parameters."
    }

    @Override
    List<String> columnNames() {
        return Arrays.asList("Not used - leave empty")
    }
}
