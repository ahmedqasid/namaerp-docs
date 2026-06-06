// Structural parity check between docs/en/**/*.md mirrors and their root twins.
// Both sides are translations of the same document, so these counts must match:
// - fenced code blocks (count + language tags sequence)
// - known Vue component tags
// - images
// Container (::: rtl) counts intentionally differ and are not compared.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const DOCS = path.join(path.dirname(fileURLToPath(import.meta.url)), '../docs');
const EN = path.join(DOCS, 'en');

const COMPONENT_RE = /<(NamaURL|NamaOptionURL|ServerBaseURL|UtilityLinkBuilder|GlobalConfigOption|HRConfigOption|SupplyChainOption|LinkToNewRecord|CopyIcon|EmbeddableSearchBox)\b/g;

function stats(file) {
    const src = fs.readFileSync(file, 'utf8');
    const fences = [...src.matchAll(/^```(\w*)/gm)];
    const fenceLangs = fences.filter((_, i) => i % 2 === 0).map(m => m[1] || 'plain');
    return {
        fenceCount: fences.length,
        fenceLangs: fenceLangs.join(','),
        components: (src.match(COMPONENT_RE) || []).length,
        images: (src.match(/!\[[^\]]*\]\(/g) || []).length
    };
}

function walk(dir, cb) {
    for (const e of fs.readdirSync(dir, {withFileTypes: true})) {
        const full = path.join(dir, e.name);
        if (e.isDirectory()) walk(full, cb);
        else if (e.name.endsWith('.md') && e.name !== 'index.md') cb(full);
    }
}

let problems = 0, checked = 0;
walk(EN, enFile => {
    const rel = path.relative(EN, enFile);
    const rootFile = path.join(DOCS, rel);
    if (!fs.existsSync(rootFile)) {
        console.log(`MISSING ROOT TWIN: en/${rel.split(path.sep).join('/')}`);
        problems++;
        return;
    }
    checked++;
    const en = stats(enFile), root = stats(rootFile);
    const diffs = [];
    if (en.fenceCount !== root.fenceCount) diffs.push(`fences en=${en.fenceCount} root=${root.fenceCount}`);
    else if (en.fenceLangs !== root.fenceLangs) diffs.push(`fence langs differ`);
    if (en.components !== root.components) diffs.push(`components en=${en.components} root=${root.components}`);
    if (en.images !== root.images) diffs.push(`images en=${en.images} root=${root.images}`);
    if (diffs.length) {
        console.log(`${rel.split(path.sep).join('/')}: ${diffs.join('; ')}`);
        problems++;
    }
});
console.log(`Checked ${checked} mirrored pairs, ${problems} with structural differences.`);
