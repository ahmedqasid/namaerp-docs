"""Check that each English release-notes page faithfully mirrors its Arabic source.

    python tools/release-notes/validate.py            # every month
    python tools/release-notes/validate.py 2026       # only that year
    python tools/release-notes/validate.py 202608     # only that month

Structure only -- it cannot judge translation quality. It catches the mechanical damage that is
invisible on a read-through: a dropped bullet, a mangled ::: container, a lost field identifier, a
link that will fail the strict build, a page nobody translated.

Exit code is 1 if anything FAILs. WARNings are for eyeballing and do not fail the run: Arabic that
was kept on purpose (proper names, or a bullet quoting a UI label to report a typo in its wording)
and identifiers respelled because the Arabic source had a typo.
"""
import os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
DOCS = os.path.abspath(os.path.join(HERE, "..", "..", "docs"))
EN_DIR = os.path.join(DOCS, "release-notes")
AR_DIR = os.path.join(DOCS, "ar", "release-notes")

MONTHS = ["January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"]

ARABIC = re.compile(r"[؀-ۿ]")
ARABIC_RUN = re.compile(r"[؀-ۿ][؀-ۿ\s،؛]*")
# 2021 uses a literal bullet glyph instead of markdown list syntax; count both.
BULLET = re.compile(r"^\s*(?:[-*]|[●•▪◦])\s+", re.M)
H2 = re.compile(r"^##\s+", re.M)
H3 = re.compile(r"^###\s+", re.M)
CONTAINER = re.compile(r"^:::", re.M)
LINK = re.compile(r"\]\(([^)]+)\)")
IDENT = re.compile(r"\b[A-Za-z][A-Za-z0-9_]*(?:\.[A-Za-z][A-Za-z0-9_]*)+\b"
                   r"|\b[a-z]+[A-Z][A-Za-z0-9]{2,}\b"
                   r"|\b[A-Z]{2,}[A-Za-z0-9]{2,}\b")
STOP = {"ERP", "Nama"}


def idents(text):
    return {m.group(0) for m in IDENT.finditer(text)} - STOP


def _near(word, pool):
    """word is within 2 single-character edits of something in pool -- i.e. the writer corrected a
    typo in the Arabic source rather than losing the identifier."""
    for cand in pool:
        if abs(len(cand) - len(word)) > 2 or cand[:1].lower() != word[:1].lower():
            continue
        a, b = word.lower(), cand.lower()
        prev = list(range(len(b) + 1))
        for i, ca in enumerate(a, 1):
            cur = [i]
            for j, cb in enumerate(b, 1):
                cur.append(min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (ca != cb)))
            prev = cur
        if prev[-1] <= 2:
            return True
    return False


def check(ym):
    year, mon = ym[:4], int(ym[4:])
    name = "nama-erp-%s-release-notes.md" % ym
    ar_p = os.path.join(AR_DIR, year, name)
    en_p = os.path.join(EN_DIR, year, name)
    errs, warns = [], []

    if not os.path.exists(en_p):
        return ["MISSING - no English page for this month"], []

    ar = open(ar_p, encoding="utf-8").read()
    en = open(en_p, encoding="utf-8").read()

    want_h1 = "# Nama ERP Release Notes - %s %s" % (MONTHS[mon - 1], year)
    got_h1 = next((l.rstrip() for l in en.splitlines() if l.startswith("# ")), None)
    if got_h1 != want_h1:
        errs.append("H1 is %r, expected %r" % (got_h1, want_h1))

    for label, rx in (("bullets", BULLET), ("H2", H2), ("H3", H3), (":::", CONTAINER)):
        a, e = len(rx.findall(ar)), len(rx.findall(en))
        if a != e:
            (errs if label in ("bullets", ":::") else warns).append(
                "%s count %d (ar) vs %d (en)" % (label, a, e))

    # Arabic may legitimately survive: proper names, and bullets that quote a UI label to report a
    # typo in its wording. What must not survive is a whole untranslated line -- so judge by how
    # much of the LINE is Arabic once quoted/bold/backticked spans are set aside.
    runs, stranded = [], []
    for line in en.splitlines():
        line_runs = [r.strip() for r in ARABIC_RUN.findall(line) if r.strip()]
        if not line_runs:
            continue
        runs += line_runs
        bare = re.sub(r"\*\*.*?\*\*|\"[^\"]*\"|`[^`]*`|«[^»]*»", "", line)
        if len(ARABIC.findall(bare)) > len(re.findall(r"[A-Za-z]", line)):
            stranded.append(line.strip()[:80])
    if stranded:
        errs.append("line(s) left untranslated (mostly Arabic): %s" % " | ".join(stranded[:3]))
    elif runs:
        warns.append("Arabic kept in place (proper names / quoted labels): %s"
                     % " | ".join(runs[:6]))

    if 'dir="rtl"' in en or "dir='rtl'" in en or "<rtl>" in en:
        errs.append("RTL wrapper not removed from the English page")

    for junk in ("</content>", "</invoke>", "<invoke", "antml:", "<function_calls", "<parameter"):
        if junk in en:
            errs.append("tool-call syntax leaked into the page: %s" % junk)

    # A bare <Placeholder> in angle brackets is parsed by Vue as an unclosed tag and FAILS the build.
    for m in re.finditer(r"(?<![`\w])<([A-Za-z][A-Za-z0-9 _-]*)>", en):
        if "`" not in en.splitlines()[en[:m.start()].count("\n")]:
            errs.append("unescaped <%s> will break the Vue build - wrap it in backticks" % m.group(1))
            break

    ar_links = [l for l in LINK.findall(ar) if l.startswith("/")]
    en_links = [l for l in LINK.findall(en) if l.startswith("/")]
    if len(ar_links) != len(en_links):
        errs.append("internal link count %d (ar) vs %d (en)" % (len(ar_links), len(en_links)))
    for l in en_links:
        if l.startswith("/ar/"):
            errs.append("English page still links to %s" % l)
        elif not l.lstrip("/").startswith("release-notes"):
            if not os.path.exists(os.path.join(DOCS, l.lstrip("/").replace(".html", ".md"))):
                errs.append("dead link %s (the strict build will fail)" % l)

    # Identifiers appearing only in an Arabic *heading* are dropped on purpose: headings are mapped
    # whole by the playbook's table (### الفاتورة الإلكترونية (ZATCA) -> E-Invoicing & Government Portals).
    ar_body = "\n".join(l for l in ar.splitlines() if not l.lstrip().startswith("#"))
    en_words = set(re.findall(r"[A-Za-z][A-Za-z0-9_.]{2,}", en)) | idents(en)
    lower = {w.lower() for w in en_words}
    missing = sorted(idents(ar_body) - idents(en))
    respelled = [m for m in missing if m.lower() in lower or _near(m, en_words)]
    dropped = [m for m in missing if m not in respelled]
    if dropped:
        errs.append("identifiers dropped: %s" % ", ".join(dropped[:8])
                    + (" (+%d more)" % (len(dropped) - 8) if len(dropped) > 8 else ""))
    if respelled:
        warns.append("identifiers respelled vs the Arabic (check it is a source typo): %s"
                     % ", ".join(respelled[:6]))

    return errs, warns


def main():
    months = sorted(
        m.group(1)
        for p in os.listdir(AR_DIR) if os.path.isdir(os.path.join(AR_DIR, p))
        for f in os.listdir(os.path.join(AR_DIR, p))
        for m in [re.match(r"nama-erp-(\d{6})-release-notes\.md$", f)] if m
    )
    if len(sys.argv) > 1:
        wanted = tuple(a for a in sys.argv[1:] if a.isdigit())
        months = [m for m in months if m.startswith(wanted)]
    if not months:
        print("no matching months")
        return 1

    bad = warned = 0
    for ym in months:
        errs, warns = check(ym)
        if errs:
            bad += 1
            print("FAIL %s" % ym)
            for e in errs:
                print("       %s" % e)
        elif warns:
            warned += 1
            print("WARN %s" % ym)
            for w in warns:
                print("       %s" % w)
    print("\n%d checked | %d failed | %d warnings only | %d clean"
          % (len(months), bad, warned, len(months) - bad - warned))
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main())
