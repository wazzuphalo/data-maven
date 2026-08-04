#!/usr/bin/env node
/**
 * Two jobs:
 *   1. Report every outstanding placeholder in the repo (`npm run check:placeholders`)
 *   2. Fail the build if a *shipped* city page still contains placeholder
 *      markers, so thin location pages cannot go live by accident.
 *
 * Blocking rule (build-fatal):
 *   Any file under content/areas/ that is published (draft: false) and
 *   contains PLACEHOLDER / TODO / {{...}} markers.
 *
 * Advisory (reported, non-fatal):
 *   Everything else — {{TOKEN}} placeholders in source, TODO comments.
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const ROOT = process.cwd();
const BLOCKING = process.argv.includes("--blocking");

const SKIP_DIRS = new Set([
  "node_modules",
  ".next",
  ".git",
  "out",
  "scripts",
  ".netlify",
]);

const SCAN_EXTS = new Set([".ts", ".tsx", ".mdx", ".md", ".json", ".css"]);

const PLACEHOLDER_PATTERNS = [
  { name: "token", re: /\{\{[A-Z_]+\}\}/g },
  { name: "PLACEHOLDER marker", re: /PLACEHOLDER:/g },
  { name: "TODO marker", re: /\bTODO\b/g },
];

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      walk(full, files);
    } else {
      const dot = entry.lastIndexOf(".");
      if (dot !== -1 && SCAN_EXTS.has(entry.slice(dot))) files.push(full);
    }
  }
  return files;
}

function isPublishedCityPage(relPath, content) {
  const inAreas = relPath.split(sep).join("/").startsWith("content/areas/");
  if (!inAreas) return false;
  // Unpublished drafts are allowed to hold placeholders.
  return !/^draft:\s*true\s*$/m.test(content);
}

const findings = [];
const blockingFindings = [];

for (const file of walk(ROOT)) {
  const relPath = relative(ROOT, file);
  const content = readFileSync(file, "utf8");
  const lines = content.split(/\r?\n/);

  for (const { name, re } of PLACEHOLDER_PATTERNS) {
    lines.forEach((line, i) => {
      re.lastIndex = 0;
      let match;
      while ((match = re.exec(line)) !== null) {
        const finding = {
          file: relPath,
          line: i + 1,
          kind: name,
          text: match[0],
          snippet: line.trim().slice(0, 100),
        };
        findings.push(finding);
        if (isPublishedCityPage(relPath, content)) blockingFindings.push(finding);
      }
    });
  }
}

if (BLOCKING) {
  if (blockingFindings.length > 0) {
    console.error(
      "\nBUILD FAILED — published city pages still contain placeholder markers.\n" +
        "Either finish the local research for these pages, or set `draft: true`\n" +
        "in the frontmatter so they are excluded from the build.\n"
    );
    for (const f of blockingFindings) {
      console.error(`  ${f.file}:${f.line}  ${f.kind} "${f.text}"`);
      console.error(`      ${f.snippet}`);
    }
    console.error("");
    process.exit(1);
  }
  process.exit(0);
}

if (findings.length === 0) {
  console.log("No outstanding placeholders found.");
  process.exit(0);
}

const byFile = new Map();
for (const f of findings) {
  if (!byFile.has(f.file)) byFile.set(f.file, []);
  byFile.get(f.file).push(f);
}

console.log(`\nOutstanding placeholders (${findings.length}):\n`);
for (const [file, items] of [...byFile].sort()) {
  console.log(`  ${file}`);
  for (const item of items) {
    console.log(`    line ${item.line}  ${item.kind}: ${item.text}`);
  }
  console.log("");
}
console.log("See ASSETS-NEEDED.md for what each placeholder is waiting on.\n");
