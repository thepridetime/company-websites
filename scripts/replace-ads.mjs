import fs from 'fs';
import path from 'path';

const APPLY = process.argv.includes('--apply');
const DIR = process.argv.find(a => a.startsWith('--dir='))?.slice(6) || 'src/app/components/pages';
const FILES = [
  'BreakingNewsPage', 'CoverStoriesPage', 'CybersecurityPage', 'FinancePage',
  'HealthcarePage', 'ManufacturingPage', 'SmartCitiesPage', 'SupplyChainPage',
  'WhiteHouseWatchPage', 'WorldPage', 'InnovationPage',
].map(n => path.join(DIR, n + '.tsx'));

const VARIANTS = ['first', 'second', 'fifth'];
const IMPORT = 'import { PrideTimesAd } from "../AdSenseSlots";';
const BLOCK_OPEN = /<(div|aside|section)\b/g;
const BLOCK_SELF = /<(div|aside|section)\b[^>]*\/>/g;
const BLOCK_CLOSE = /<\/(div|aside|section)>/g;
const count = (s, re) => (s.match(re) || []).length;
const opens = s => count(s, BLOCK_OPEN) - count(s, BLOCK_SELF);
const closes = s => count(s, BLOCK_CLOSE);

const ANCHOR = /^728\s*\S{1,3}\s*90\s*\S{0,3}\s*Leaderboard$/i;
const isAnchor = line => ANCHOR.test(line.replace(/<[^>]*>/g, '').trim());
const HINT = /(bg-\[|bg-\w+-\d+|bg-white|bg-black|h-\[\d+px\]|min-h-|border-dashed|border-y)/;

function findBox(lines, a) {
  let depth = 0;
  for (let i = a; i >= 0 && a - i < 60; i--) {
    if (i !== a) depth += closes(lines[i]);
    depth -= opens(lines[i]);
    if (depth >= 0) continue;
    const head = lines.slice(i, i + 4).join(' ');
    let d = 0, end = -1;
    for (let j = i; j < lines.length && j - i < 60; j++) {
      d += opens(lines[j]) - closes(lines[j]);
      if (d <= 0) { end = j; break; }
    }
    if (end >= a && end - i <= 30 && HINT.test(head)) return [i, end];
    depth = 0;
  }
  return null;
}

let total = 0;
for (const f of FILES) {
  if (!fs.existsSync(f)) { console.log('MISSING ', f); continue; }
  const src = fs.readFileSync(f, 'utf8');
  const lines = src.split(/\r?\n/);
  const eol = src.includes('\r\n') ? '\r\n' : '\n';
  const ranges = [];
  lines.forEach((l, i) => {
    if (!isAnchor(l)) return;
    const r = findBox(lines, i);
    if (!r) { console.log(`  ?? ${path.basename(f)}:${i + 1} anchor found, box not recognised`); return; }
    if (!ranges.some(x => x[0] === r[0])) ranges.push(r);
  });
  if (!ranges.length) { console.log('none   ', path.basename(f)); continue; }
  console.log(`${APPLY ? 'edit ' : 'would edit'} ${path.basename(f)}: ${ranges.length} box(es)`);
  ranges.sort((x, y) => y[0] - x[0]);
  const chosen = ranges.slice().sort((x, y) => x[0] - y[0]);
  ranges.forEach(([s, e]) => {
    const idx = chosen.findIndex(x => x[0] === s);
    const v = VARIANTS[idx % VARIANTS.length];
    const indent = lines[s].match(/^\s*/)[0];
    console.log(`   lines ${s + 1}-${e + 1} (${e - s + 1} lines) -> variant ${v}`);
    console.log(`   | ${lines[s].trim().slice(0, 100)}`);
    lines.splice(s, e - s + 1, `${indent}<PrideTimesAd variant="${v}" className="my-4 md:my-5" />`);
  });
  total += ranges.length;
  if (APPLY) {
    let out = lines.join(eol);
    if (!out.includes('PrideTimesAd }')) out = IMPORT + eol + out;
    fs.writeFileSync(f, out, 'utf8');
  }
}
console.log(APPLY ? `\nDone: ${total} box(es) replaced.` : `\nDry run only: ${total} box(es) found. Add --apply to write.`);