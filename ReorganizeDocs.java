// Run with:  java ReorganizeDocs.java [--apply] [--no-git] [--root <docs-folder>]
//
//   default root  : ./docs   (relative to current working directory)
//   default mode  : DRY RUN  — prints every move without touching the filesystem
//   --apply       : actually perform the moves
//   --no-git      : use Files.move even if inside a git repo
//
// Filenames are NEVER changed by this script — only the folder a file lives in.
// That keeps the basename-based Apache redirect map (redirects.txt) working
// without any extra entries: rebuild the docs and the new paths land in the map
// automatically.
//
// The script also rewrites all path strings inside titles-and-order-of-files.json
// so the generated sidebar.js picks up the new locations, and it prints a list
// of new parent-folder titles you should paste into the "folderTitles" block.

import java.io.IOException;
import java.nio.file.*;
import java.util.*;
import java.util.regex.*;

public class ReorganizeDocs {

    record Move(String from, String to) {}

    // ---- Folder renames first (target folder must not exist yet) -----------
    // ---- Then individual files INTO the newly-created folders --------------
    static final List<Move> MOVES = List.of(

            // --- whole-folder renames ------------------------------------------
            new Move("guide/e-commerce",      "modules/ecommerce"),
            new Move("guide/entity-flows",    "platform/entity-flows"),
            new Move("guide/hr",              "modules/hr"),
            new Move("guide/invoices",        "modules/invoicing"),
            new Move("guide/list-views",      "platform/list-views"),
            new Move("guide/manufacturing",   "modules/manufacturing"),
            new Move("guide/security",        "platform/security"),
            new Move("guide/supplychain",     "modules/supplychain"),
            new Move("reprocessing",          "admin/reprocessing"),

            // --- loose files from guide/ ---------------------------------------
            new Move("guide/GenericReferenceOverrider_UserGuide.md", "platform/GenericReferenceOverrider_UserGuide.md"),
            new Move("guide/ReportWizard_User_Documentation.md",     "platform/reports/ReportWizard_User_Documentation.md"),
            new Move("guide/approvals-system.md",                    "platform/approvals/approvals-system.md"),
            new Move("guide/attendance-machine-formula.md",          "modules/hr/attendance-machine-formula.md"),
            new Move("guide/attendance-machines-integration.md",     "integration/attendance-machines-integration.md"),
            new Move("guide/bi-module-guide.md",                     "platform/bi/bi-module-guide.md"),
            new Move("guide/bi-module-technical-reference.md",       "platform/bi/bi-module-technical-reference.md"),
            new Move("guide/bi-reference-enhanced-metrics-card.md",  "platform/bi/bi-reference-enhanced-metrics-card.md"),
            new Move("guide/bi-reference-enhanced-table.md",         "platform/bi/bi-reference-enhanced-table.md"),
            new Move("guide/bi-reference-wizard-mode.md",            "platform/bi/bi-reference-wizard-mode.md"),
            new Move("guide/criteria-based-validation.md",           "platform/criteria-based-validation.md"),
            new Move("guide/dev-request-guidelines.md",              "developer/dev-request-guidelines.md"),
            new Move("guide/docs-quick-guide.md",                    "developer/docs-quick-guide.md"),
            new Move("guide/field-filter-with-criteria.md",          "platform/field-filter-with-criteria.md"),
            new Move("guide/fiscal-period-control-guide.md",         "platform/fiscal-period-control-guide.md"),
            new Move("guide/installation-guide.md",                  "getting-started/installation-guide.md"),
            new Move("guide/invoice-retriever.md",                   "integration/invoice-retriever.md"),
            new Move("guide/mobile-application-guide.md",            "modules/mobile/mobile-application-guide.md"),
            new Move("guide/mobile-qr-integrator.md",                "modules/mobile/mobile-qr-integrator.md"),
            new Move("guide/nama-erp-api.md",                        "integration/nama-erp-api.md"),
            new Move("guide/nama-properties.md",                     "getting-started/nama-properties.md"),
            new Move("guide/notifications-system.md",                "platform/notifications/notifications-system.md"),
            new Move("guide/oracle-jdbc-connection.md",              "integration/oracle-jdbc-connection.md"),
            new Move("guide/report-wizard-guide.md",                 "platform/reports/report-wizard-guide.md"),
            new Move("guide/reports-guide.md",                       "platform/reports/reports-guide.md"),
            new Move("guide/sample-approval-email-templates.md",     "platform/approvals/sample-approval-email-templates.md"),
            new Move("guide/scheduled-tasks.md",                     "platform/scheduled-tasks.md"),
            new Move("guide/screen-modifier.md",                     "platform/screen-modifier/screen-modifier.md"),
            new Move("guide/shortcuts.md",                           "platform/shortcuts.md"),
            new Move("guide/shortcuts-ar.md",                        "platform/shortcuts-ar.md"),
            new Move("guide/sms-and-whatsapp.md",                    "platform/notifications/sms-and-whatsapp.md"),
            new Move("guide/system-integration-scenarios.md",        "integration/system-integration-scenarios.md"),
            new Move("guide/system-minimum-requirements.md",         "getting-started/system-minimum-requirements.md"),
            new Move("guide/tempo.md",                               "admin/tempo.md"),
            new Move("guide/text-criteria-guide.md",                 "platform/text-criteria-guide.md"),
            new Move("guide/translations.md",                        "platform/translations.md"),
            new Move("guide/troubleshooting-system-hanging.md",      "admin/troubleshooting/troubleshooting-system-hanging.md"),
            new Move("guide/two-factor-authentication.md",           "getting-started/two-factor-authentication.md"),
            new Move("guide/utils.md",                               "platform/utils.md"),
            new Move("guide/virtual-entity-guide.md",                "platform/virtual-entity-guide.md"),

            // --- faq/ files folded into module/platform sections --------------
            new Move("faq/approvals-faq.md",              "platform/approvals/approvals-faq.md"),
            new Move("faq/database-error-related-faq.md", "admin/troubleshooting/database-error-related-faq.md"),
            new Move("faq/entity-flow-faq.md",            "platform/entity-flows/entity-flow-faq.md"),
            new Move("faq/field-filter-faq.md",           "platform/field-filter-faq.md"),
            new Move("faq/general-faq.md",                "admin/troubleshooting/general-faq.md"),
            new Move("faq/gui-post-actions-faq.md",       "developer/gui-post-actions-faq.md"),
            new Move("faq/human-resources-faq.md",        "modules/hr/human-resources-faq.md"),
            new Move("faq/invoices-faq.md",               "modules/invoicing/invoices-faq.md"),
            new Move("faq/manufacturing-faq.md",          "modules/manufacturing/manufacturing-faq.md"),
            new Move("faq/mobile-apps-faq.md",            "modules/mobile/mobile-apps-faq.md"),
            new Move("faq/notification-fq.md",            "platform/notifications/notification-fq.md"),
            new Move("faq/pos-faq.md",                    "modules/pos/pos-faq.md"),
            new Move("faq/real-estate-fq.md",             "modules/realestate/real-estate-fq.md"),
            new Move("faq/report-faq.md",                 "platform/reports/report-faq.md"),
            new Move("faq/report-wizard-faq.md",          "platform/reports/report-wizard-faq.md"),
            new Move("faq/screen-modifier-faq.md",        "platform/screen-modifier/screen-modifier-faq.md"),
            new Move("faq/supply-chain-faq-english.md",   "modules/supplychain/supply-chain-faq-english.md"),
            new Move("faq/supply-chain-faq.md",           "modules/supplychain/supply-chain-faq.md"),

            // --- examples/ ----------------------------------------------------
            new Move("examples/entity-flow-examples.md", "platform/entity-flows/entity-flow-examples.md"),

            // --- shared guide/images split: each image follows its page -------
            // pages keep their relative "images/<name>" references unchanged
            // -> modules/hr (attendance-machine-formula.md)
            new Move("guide/images/attendance-formula-example-data.png",        "modules/hr/images/attendance-formula-example-data.png"),
            new Move("guide/images/attendance-formula-settings-page.png",       "modules/hr/images/attendance-formula-settings-page.png"),
            new Move("guide/images/attendance-formula-time-attendance.png",     "modules/hr/images/attendance-formula-time-attendance.png"),
            new Move("guide/images/attendance_machine_forumal_demo_example.PNG","modules/hr/images/attendance_machine_forumal_demo_example.PNG"),
            // -> integration (attendance-machines-integration.md, nama-erp-api.md)
            new Move("guide/images/attendance-machine-integration-linked-server.png",                 "integration/images/attendance-machine-integration-linked-server.png"),
            new Move("guide/images/attendance-machine-integration-linked-server-connection-test.png", "integration/images/attendance-machine-integration-linked-server-connection-test.png"),
            new Move("guide/images/attendance-machine-integration-linked-server-login-info.png",      "integration/images/attendance-machine-integration-linked-server-login-info.png"),
            new Move("guide/images/attendance-machine-integration-zk.png",                            "integration/images/attendance-machine-integration-zk.png"),
            new Move("guide/images/rest-api-browser.png",                                             "integration/images/rest-api-browser.png"),
            // -> platform (field-filter-with-criteria.md, translations.md + unreferenced creator-link-sample.png)
            new Move("guide/images/field-filter.png",        "platform/images/field-filter.png"),
            new Move("guide/images/translation-button.png",  "platform/images/translation-button.png"),
            new Move("guide/images/translation-editor.png",  "platform/images/translation-editor.png"),
            new Move("guide/images/translation-export.png",  "platform/images/translation-export.png"),
            new Move("guide/images/creator-link-sample.png", "platform/images/creator-link-sample.png"),
            // -> platform/reports (report-wizard-guide.md, reports-guide.md)
            new Move("guide/images/report-wizard-ex-1-run-report.png",  "platform/reports/images/report-wizard-ex-1-run-report.png"),
            new Move("guide/images/report-wizard-ex-1-view-result.png", "platform/reports/images/report-wizard-ex-1-view-result.png"),
            new Move("guide/images/jasper-reports-font-family.png",     "platform/reports/images/jasper-reports-font-family.png"),
            // -> getting-started (installation-guide.md)
            new Move("guide/images/installation-configure-logon-to-enable-auto-upgrade.png", "getting-started/images/installation-configure-logon-to-enable-auto-upgrade.png"),
            // -> platform/approvals (sample-approval-email-templates.md)
            new Move("guide/images/email-template-screenshot.png",               "platform/approvals/images/email-template-screenshot.png"),
            new Move("guide/images/sales-invoice-approval-email-template.png",   "platform/approvals/images/sales-invoice-approval-email-template.png"),
            // -> platform/notifications (sms-and-whatsapp.md)
            new Move("guide/images/sms-misr-api-key.png",      "platform/notifications/images/sms-misr-api-key.png"),
            new Move("guide/images/sms-misr-token.png",        "platform/notifications/images/sms-misr-token.png"),
            new Move("guide/images/taqnyat-bearer-token.png",  "platform/notifications/images/taqnyat-bearer-token.png"),
            new Move("guide/images/taqnyat-sender.png",        "platform/notifications/images/taqnyat-sender.png"),
            new Move("guide/images/ultramsg-curl.png",         "platform/notifications/images/ultramsg-curl.png"),
            new Move("guide/images/ultramsg-instance.png",     "platform/notifications/images/ultramsg-instance.png"),
            new Move("guide/images/ultramsg-instance-id.png",  "platform/notifications/images/ultramsg-instance-id.png"),
            new Move("guide/images/waapi-instance-id.png",     "platform/notifications/images/waapi-instance-id.png"),
            new Move("guide/images/waapi-qr.png",              "platform/notifications/images/waapi-qr.png"),
            new Move("guide/images/waapi-token.png",           "platform/notifications/images/waapi-token.png"),
            // -> admin (tempo.md)
            new Move("guide/images/tempo-editor.png",          "admin/images/tempo-editor.png")
    );

    public static void main(String[] args) throws Exception {
        boolean apply  = false;
        boolean useGit = true;
        Path root      = Paths.get("docs").toAbsolutePath().normalize();

        for (int i = 0; i < args.length; i++) {
            switch (args[i]) {
                case "--apply"  -> apply  = true;
                case "--no-git" -> useGit = false;
                case "--root"   -> root   = Paths.get(args[++i]).toAbsolutePath().normalize();
                case "-h", "--help" -> { printUsage(); return; }
                default -> { System.err.println("Unknown arg: " + args[i]); printUsage(); System.exit(2); }
            }
        }

        if (!Files.isDirectory(root)) {
            System.err.println("Docs root not found: " + root);
            System.err.println("Pass --root <path-to-docs>  (or run from a folder that contains ./docs).");
            System.exit(1);
        }
        if (!Files.isDirectory(root.resolve("guide")) && !Files.isDirectory(root.resolve("faq"))) {
            System.err.println("Docs root " + root + " has no 'guide' or 'faq' folder — wrong directory?");
            System.exit(1);
        }

        boolean isGitRepo = useGit && hasGit(root);
        System.out.printf("Root: %s%nMode: %s%nGit:  %s%n%n",
                root,
                apply ? "APPLY" : "DRY RUN (pass --apply to execute)",
                isGitRepo ? "git mv" : "Files.move");

        int moved = 0, skippedMissing = 0, skippedExists = 0, errors = 0;

        for (Move m : MOVES) {
            Path src = root.resolve(m.from);
            Path dst = root.resolve(m.to);

            if (!Files.exists(src)) {
                System.out.printf("[skip-missing] %s%n", m.from);
                skippedMissing++;
                continue;
            }
            if (Files.exists(dst)) {
                System.out.printf("[skip-exists ] %s -> %s%n", m.from, m.to);
                skippedExists++;
                continue;
            }

            System.out.printf("[move        ] %s -> %s%n", m.from, m.to);
            if (!apply) { moved++; continue; }

            try {
                Files.createDirectories(dst.getParent());
                if (isGitRepo) {
                    int rc = runGitMv(root, src, dst);
                    if (rc != 0) {
                        System.err.printf("                git mv failed (exit %d) — aborting.%n", rc);
                        errors++;
                        break;
                    }
                } else {
                    Files.move(src, dst, StandardCopyOption.ATOMIC_MOVE);
                }
                moved++;
            } catch (IOException | InterruptedException e) {
                System.err.printf("                error: %s%n", e.getMessage());
                errors++;
                break;
            }
        }

        System.out.printf("%nmoved=%d  skipped-missing=%d  skipped-exists=%d  errors=%d  (%s)%n",
                moved, skippedMissing, skippedExists, errors,
                apply ? "applied" : "dry run");

        rewriteSidebarJson(root, apply);

        if (apply && errors == 0) {
            System.out.println();
            System.out.println("Next steps:");
            System.out.println("  1. Paste any [json] suggested folder titles into titles-and-order-of-files.json");
            System.out.println("  2. Regenerate sidebar.js from titles-and-order-of-files.json");
            System.out.println("  3. npm run docs:build   (regenerates redirects.txt for the new paths)");
            System.out.println("  4. Smoke-test a few old URLs to confirm they 301 to the new locations");
        }
    }

    // --- titles-and-order-of-files.json rewrite ----------------------------

    /** New parent folders introduced by the reorg — sidebar needs a title for each. */
    static final String[][] SUGGESTED_FOLDER_TITLES = {
            {"/getting-started",          "Getting Started"},
            {"/modules",                  "Modules"},
            {"/modules/ecommerce",        "e-commerce Integration"},
            {"/modules/hr",               "Human Resources"},
            {"/modules/invoicing",        "Invoices, Taxes & Discounts"},
            {"/modules/manufacturing",    "Manufacturing"},
            {"/modules/mobile",           "Mobile Applications"},
            {"/modules/pos",              "Point of Sale"},
            {"/modules/realestate",       "Real Estate"},
            {"/modules/supplychain",      "Supply Chain"},
            {"/platform",                 "Platform Features"},
            {"/platform/approvals",       "Approvals"},
            {"/platform/bi",              "Business Intelligence"},
            {"/platform/entity-flows",    "Entity Flows"},
            {"/platform/list-views",      "List Views"},
            {"/platform/notifications",   "Notifications"},
            {"/platform/reports",         "Reports"},
            {"/platform/screen-modifier", "Screen Modifier"},
            {"/integration",              "External Integrations"},
            {"/admin",                    "System Administration"},
            {"/admin/reprocessing",       "Reprocessing Transactions"},
            {"/admin/troubleshooting",    "Troubleshooting"},
            {"/developer",                "Developer Reference"},
    };

    private static void rewriteSidebarJson(Path root, boolean apply) throws IOException {
        Path jsonPath = root.resolve("titles-and-order-of-files.json");
        if (!Files.exists(jsonPath)) {
            System.out.println("\n[json] titles-and-order-of-files.json not found — skipping.");
            return;
        }

        String original = Files.readString(jsonPath);

        // Rewrite any quoted path that starts with "/" using the same move rules.
        Pattern quotedPath = Pattern.compile("\"(/[^\"\\\\]*)\"");
        Matcher m = quotedPath.matcher(original);
        StringBuilder rewritten = new StringBuilder();
        int rewrites = 0;
        while (m.find()) {
            String oldPath = m.group(1);
            String newPath = rewriteJsonPath(oldPath);
            m.appendReplacement(rewritten, Matcher.quoteReplacement("\"" + newPath + "\""));
            if (!oldPath.equals(newPath)) rewrites++;
        }
        m.appendTail(rewritten);

        System.out.printf("%n[json] %d path(s) rewritten in titles-and-order-of-files.json%n", rewrites);

        if (apply) {
            if (rewrites > 0) {
                Files.writeString(jsonPath, rewritten.toString());
                System.out.println("[json] wrote " + jsonPath.getFileName());
            } else {
                System.out.println("[json] nothing to rewrite.");
            }
        } else {
            System.out.println("[json] (dry run — file not modified)");
        }

        // Show which new folder titles are missing from the JSON, so the user can paste them in.
        String currentText = apply ? rewritten.toString() : original;
        List<String[]> missing = new ArrayList<>();
        for (String[] entry : SUGGESTED_FOLDER_TITLES) {
            if (!currentText.contains("\"" + entry[0] + "\"")) missing.add(entry);
        }

        if (missing.isEmpty()) {
            System.out.println("[json] all suggested folder titles already present.");
            return;
        }

        System.out.println();
        System.out.println("[json] suggested folder titles to add inside \"folderTitles\":");
        System.out.println("       (paste before the closing brace; add a trailing comma on the previous entry)");
        for (String[] entry : missing) {
            System.out.printf("    \"%s\": \"%s\",%n", entry[0], entry[1]);
        }
    }

    /** Apply the MOVES list to a JSON path string (leading slash, optional trailing file). */
    private static String rewriteJsonPath(String jsonPath) {
        String stripped = jsonPath.startsWith("/") ? jsonPath.substring(1) : jsonPath;
        for (Move mv : MOVES) {
            if (stripped.equals(mv.from)) return "/" + mv.to;
            if (stripped.startsWith(mv.from + "/")) {
                return "/" + mv.to + stripped.substring(mv.from.length());
            }
        }
        return jsonPath;
    }

    private static boolean hasGit(Path root) {
        Path p = root;
        while (p != null) {
            if (Files.exists(p.resolve(".git"))) return true;
            p = p.getParent();
        }
        return false;
    }

    private static int runGitMv(Path repoRoot, Path src, Path dst) throws IOException, InterruptedException {
        Process p = new ProcessBuilder("git", "mv", src.toString(), dst.toString())
                .directory(repoRoot.toFile())
                .inheritIO()
                .start();
        return p.waitFor();
    }

    private static void printUsage() {
        System.out.println("""
                Usage: java ReorganizeDocs.java [--apply] [--no-git] [--root <docs-folder>]

                  default root : ./docs
                  default mode : dry run (no changes)

                Examples:
                  java ReorganizeDocs.java                              # preview from ./docs
                  java ReorganizeDocs.java --root code/namaerp-docs/docs
                  java ReorganizeDocs.java --apply
                """);
    }
}
