#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const reportsDir = process.argv[2];
if (!reportsDir || !fs.existsSync(reportsDir)) {
  process.stderr.write('Usage: generate-index.js <reports-dir>\n');
  process.exit(1);
}

const reports = fs
  .readdirSync(reportsDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => {
    const metaPath = path.join(reportsDir, d.name, 'meta.json');
    try {
      const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
      return { ...meta, dir: d.name };
    } catch {
      return null;
    }
  })
  .filter(Boolean)
  .sort((a, b) => b.run - a.run);

const repoUrl = process.env.GITHUB_REPOSITORY
  ? `https://github.com/${process.env.GITHUB_REPOSITORY}`
  : '';

const totalRuns = reports.length;
const passedRuns = reports.filter((r) => r.status === 'passed').length;
const failedRuns = reports.filter((r) => r.status === 'failed').length;
const latestRun = reports[0] || null;

function badge(status) {
  if (status === 'passed') return '<span class="badge pass">&#10003; PASSED</span>';
  if (status === 'failed') return '<span class="badge fail">&#10007; FAILED</span>';
  return '<span class="badge unknown">? UNKNOWN</span>';
}

function testCounts(r) {
  const parts = [];
  if (r.passed > 0) parts.push(`<span class="count-pass">${r.passed}P</span>`);
  if (r.failed > 0) parts.push(`<span class="count-fail">${r.failed}F</span>`);
  if (r.skipped > 0) parts.push(`<span class="count-skip">${r.skipped}S</span>`);
  return parts.join(' ') || '—';
}

function tableRow(r) {
  const commitUrl = repoUrl ? `${repoUrl}/commit/${r.commit}` : '#';
  const rowClass = r.status === 'failed' ? ' class="fail-row"' : '';
  return `        <tr${rowClass}>
          <td><strong>#${r.run}</strong></td>
          <td>${badge(r.status)}</td>
          <td>${r.date}</td>
          <td><code>${r.branch}</code></td>
          <td><a href="${commitUrl}" target="_blank" rel="noopener"><code>${r.short_commit}</code></a></td>
          <td>${r.actor}</td>
          <td>${testCounts(r)}</td>
          <td>${r.duration}</td>
          <td><a href="reports/${r.dir}/index.html" class="btn-view">View &rarr;</a></td>
        </tr>`;
}

const latestLink = latestRun
  ? `<a href="reports/${latestRun.dir}/index.html" class="latest-link">View latest report &rarr;</a>`
  : '';

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>QA Test Report History</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #0d1117;
      color: #c9d1d9;
      min-height: 100vh;
    }

    header {
      background: #161b22;
      border-bottom: 1px solid #30363d;
      padding: 20px 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px;
    }
    header h1 { font-size: 1.25rem; color: #f0f6fc; font-weight: 600; }
    header p { font-size: 0.8rem; color: #8b949e; margin-top: 2px; }
    .latest-link {
      font-size: 0.85rem;
      color: #58a6ff;
      text-decoration: none;
      border: 1px solid #30363d;
      padding: 6px 14px;
      border-radius: 6px;
      white-space: nowrap;
    }
    .latest-link:hover { background: #161b22; border-color: #58a6ff; }

    .stats {
      display: flex;
      gap: 12px;
      padding: 20px 32px;
      flex-wrap: wrap;
    }
    .stat {
      background: #161b22;
      border: 1px solid #30363d;
      border-radius: 8px;
      padding: 14px 20px;
      min-width: 120px;
    }
    .stat .label { font-size: 0.7rem; color: #8b949e; text-transform: uppercase; letter-spacing: 0.06em; }
    .stat .value { font-size: 1.75rem; font-weight: 700; margin-top: 4px; line-height: 1; }
    .stat.total .value { color: #f0f6fc; }
    .stat.pass .value { color: #3fb950; }
    .stat.fail .value { color: #f85149; }

    .table-wrap { padding: 0 32px 40px; overflow-x: auto; }
    table {
      width: 100%;
      border-collapse: collapse;
      background: #161b22;
      border: 1px solid #30363d;
      border-radius: 8px;
      overflow: hidden;
      font-size: 0.85rem;
    }
    th {
      background: #0d1117;
      color: #8b949e;
      font-size: 0.7rem;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      font-weight: 600;
      padding: 10px 14px;
      text-align: left;
      border-bottom: 1px solid #30363d;
      white-space: nowrap;
    }
    td {
      padding: 12px 14px;
      border-bottom: 1px solid #21262d;
      vertical-align: middle;
    }
    tr:last-child td { border-bottom: none; }
    tbody tr:hover td { background: #1c2128; }
    tr.fail-row td { background: #1a1118; }
    tr.fail-row:hover td { background: #1f1520; }

    .badge {
      display: inline-block;
      padding: 2px 10px;
      border-radius: 999px;
      font-size: 0.72rem;
      font-weight: 600;
      white-space: nowrap;
    }
    .badge.pass { background: #0d3320; color: #3fb950; border: 1px solid #2ea043; }
    .badge.fail { background: #3d0f0d; color: #f85149; border: 1px solid #da3633; }
    .badge.unknown { background: #21262d; color: #8b949e; border: 1px solid #30363d; }

    code {
      background: #0d1117;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 0.8rem;
      color: #79c0ff;
      font-family: 'SFMono-Regular', Consolas, monospace;
    }
    a { color: #58a6ff; text-decoration: none; }
    a:hover { text-decoration: underline; }

    .count-pass { color: #3fb950; font-weight: 600; }
    .count-fail { color: #f85149; font-weight: 600; }
    .count-skip { color: #e3b341; font-weight: 600; }

    .btn-view {
      display: inline-block;
      padding: 5px 12px;
      background: #1f6feb;
      color: #fff !important;
      border-radius: 6px;
      font-size: 0.78rem;
      font-weight: 500;
      text-decoration: none !important;
      white-space: nowrap;
      transition: background 0.15s;
    }
    .btn-view:hover { background: #388bfd; }

    .empty { text-align: center; padding: 48px; color: #484f58; font-size: 0.9rem; }
  </style>
</head>
<body>
  <header>
    <div>
      <h1>&#127381; Playwright Test Report History</h1>
      <p>Automated QA report &mdash; updated on every CI run</p>
    </div>
    ${latestLink}
  </header>

  <div class="stats">
    <div class="stat total">
      <div class="label">Total Runs</div>
      <div class="value">${totalRuns}</div>
    </div>
    <div class="stat pass">
      <div class="label">Passed</div>
      <div class="value">${passedRuns}</div>
    </div>
    <div class="stat fail">
      <div class="label">Failed</div>
      <div class="value">${failedRuns}</div>
    </div>
  </div>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Run</th>
          <th>Status</th>
          <th>Date (UTC)</th>
          <th>Branch</th>
          <th>Commit</th>
          <th>Triggered By</th>
          <th>Tests</th>
          <th>Duration</th>
          <th>Report</th>
        </tr>
      </thead>
      <tbody>
        ${
          reports.length === 0
            ? '<tr><td colspan="9" class="empty">No reports yet. Run the CI pipeline to generate the first report.</td></tr>'
            : reports.map(tableRow).join('\n')
        }
      </tbody>
    </table>
  </div>
</body>
</html>
`;

process.stdout.write(html);
