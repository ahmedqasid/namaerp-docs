// Fixes link/image targets in docs/en/**/*.md after translation.
//
// Rules (en mirror lives at en/<same relative path> as its root twin):
// - http(s)/mailto/data/#fragment-only targets: untouched
// - absolute targets (/...):
//     /en/...                      -> untouched
//     /entity-flows/..., /release-notes/... -> untouched (root-only content, intentionally cross-locale)
//     image/asset targets          -> untouched (public-dir semantics)
//     other page links             -> prefixed with /en
// - relative targets:
//     page links (.md/.html/dir/no-ext) -> untouched (the mirrored tree preserves them),
//       EXCEPT when they resolve into entity-flows/ or release-notes/ -> rewritten to absolute root path
//     assets (images, pdf, json, ...)   -> re-pointed at the root twin's asset via ../ traversal
//       (Vite bundles+hashes them, so both locales share one copy)
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const DOCS = path.join(path.dirname(fileURLToPath(import.meta.url)), '../docs');
const EN = path.join(DOCS, 'en');

const PAGE_EXTENSIONS = new Set(['.md', '.html', '']);
const ROOT_ONLY_PREFIXES = ['entity-flows/', 'release-notes/'];

function isExternal(target) {
    return /^(https?:|mailto:|tel:|data:)/i.test(target) || target.startsWith('#');
}

function isPageLink(target) {
    const noFragment = target.split('#')[0];
    return PAGE_EXTENSIONS.has(path.posix.extname(noFragment)) || noFragment.endsWith('/');
}

function rewriteTarget(target, enFileDir /* posix dir relative to docs root, e.g. "en/platform" */) {
    if (isExternal(target) || !target) return target;
    const [pathPart, fragment] = splitFragment(target);
    if (!pathPart) return target; // pure fragment

    if (pathPart.startsWith('/')) {
        if (pathPart.startsWith('/en/')) return target;
        const rootRel = pathPart.slice(1);
        if (ROOT_ONLY_PREFIXES.some(p => rootRel.startsWith(p))) return target;
        if (!isPageLink(pathPart)) return target; // absolute asset (public dir)
        return '/en' + pathPart + fragment;
    }

    // relative target — resolve against the ROOT twin's directory
    const rootDir = enFileDir.replace(/^en\/?/, ''); // "" for docs/en root
    const resolved = path.posix.normalize(path.posix.join(rootDir, pathPart));
    if (resolved.startsWith('..')) return target; // escapes docs root — leave alone

    if (isPageLink(pathPart)) {
        if (ROOT_ONLY_PREFIXES.some(p => resolved.startsWith(p)))
            return '/' + resolved + fragment;
        return target; // mirrored tree keeps relative page links valid
    }

    // asset: re-point at the root twin's copy
    const newRel = path.posix.relative(enFileDir, resolved);
    return newRel + fragment;
}

function splitFragment(target) {
    const i = target.indexOf('#');
    return i === -1 ? [target, ''] : [target.slice(0, i), target.slice(i)];
}

function processFile(absFile) {
    const enFileDir = path.posix.dirname(path.relative(DOCS, absFile).split(path.sep).join('/'));
    const src = fs.readFileSync(absFile, 'utf8');
    let changes = 0;

    // Split out fenced code blocks so we never rewrite inside them
    const segments = src.split(/(```[\s\S]*?```|`[^`\n]*`)/);
    const out = segments.map((seg, i) => {
        if (i % 2 === 1) return seg; // code segment
        let s = seg.replace(/(!?\[[^\]]*\]\()\s*(<[^>]+>|[^)\s]+)((?:\s+"[^"]*")?\))/g, (m, pre, tgt, post) => {
            const bare = tgt.startsWith('<') ? tgt.slice(1, -1) : tgt;
            const fixed = rewriteTarget(bare, enFileDir);
            if (fixed === bare) return m;
            changes++;
            return pre + (tgt.startsWith('<') ? '<' + fixed + '>' : fixed) + post;
        });
        s = s.replace(/((?:src|href)=")([^"]+)(")/g, (m, pre, tgt, post) => {
            const fixed = rewriteTarget(tgt, enFileDir);
            if (fixed === tgt) return m;
            changes++;
            return pre + fixed + post;
        });
        return s;
    }).join('');

    if (changes) {
        fs.writeFileSync(absFile, out, 'utf8');
        console.log(`${path.relative(DOCS, absFile)}: ${changes} target(s) rewritten`);
    }
    return changes;
}

function walk(dir, cb) {
    for (const e of fs.readdirSync(dir, {withFileTypes: true})) {
        const full = path.join(dir, e.name);
        if (e.isDirectory()) walk(full, cb);
        else if (e.name.endsWith('.md')) cb(full);
    }
}

let total = 0, fileCount = 0;
walk(EN, f => {
    fileCount++;
    total += processFile(f);
});
console.log(`Done: ${fileCount} en files scanned, ${total} targets rewritten.`);
