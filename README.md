# 🎭 Playwright CI/CD Pipeline

[![Playwright Tests](https://github.com/phucyudev/playwright-ci-pipeline/actions/workflows/playwright.yml/badge.svg)](https://github.com/phucyudev/playwright-ci-pipeline/actions/workflows/playwright.yml)
[![Playwright Version](https://img.shields.io/badge/Playwright-v1.59.1-45ba4b?logo=playwright)](https://playwright.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript)](https://www.typescriptlang.org)
[![Node.js](https://img.shields.io/badge/Node.js-LTS-339933?logo=node.js)](https://nodejs.org)
[![Cloudflare Pages](https://img.shields.io/badge/Live%20Report-Cloudflare%20Pages-F38020?logo=cloudflare)](https://qa-automation-report.pages.dev)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

> End-to-end automation testing pipeline built with **Playwright TypeScript**, automated via **GitHub Actions**, and publishing live HTML reports to **Cloudflare Pages**.

🔗 **Live Report:** [qa-automation-report.pages.dev](https://qa-automation-report.pages.dev)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Running Tests](#-running-tests)
- [CI/CD Pipeline](#-cicd-pipeline)
- [Test Reports](#-test-reports)
- [Configuration](#-configuration)
- [Contributing](#-contributing)

---

## 🔍 Overview

This project demonstrates a production-ready **CI/CD pipeline for UI automation testing**. Every push to `main` automatically triggers the full test suite across three browser engines, then publishes a live HTML report to Cloudflare Pages — giving the entire team instant visibility into test health without needing to download any artifacts.

**Key highlights:**

- 🌐 Cross-browser testing — Chromium, Firefox, and WebKit
- ♻️ Auto-retry on CI (up to 2 retries per failed test)
- 📊 Live HTML report deployed to Cloudflare Pages after every run
- 🔒 Secrets managed securely via GitHub Actions

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| [Playwright](https://playwright.dev) | Browser automation & test runner |
| [TypeScript](https://www.typescriptlang.org) | Type-safe test authoring |
| [GitHub Actions](https://github.com/features/actions) | CI/CD pipeline automation |
| [Cloudflare Pages](https://pages.cloudflare.com) | Live HTML report hosting |
| [Node.js LTS](https://nodejs.org) | JavaScript runtime |

---

## 📁 Project Structure

```
playwright-ci-pipeline/
├── .github/
│   └── workflows/
│       └── playwright.yml      # GitHub Actions CI/CD workflow
├── tests/
│   └── example.spec.ts         # Example Playwright test suite
├── playwright-report/          # Generated HTML report (git-ignored)
├── playwright.config.ts        # Playwright configuration
├── package.json
├── package-lock.json
└── README.md
```

---

## ✅ Prerequisites

- [Node.js LTS](https://nodejs.org/en/download) (v18+)
- [npm](https://www.npmjs.com) (bundled with Node.js)
- [Git](https://git-scm.com)

---

## 🚀 Installation

**1. Clone the repository**

```bash
git clone https://github.com/phucyudev/playwright-ci-pipeline.git
cd playwright-ci-pipeline
```

**2. Install dependencies**

```bash
npm ci
```

**3. Install Playwright browsers**

```bash
npx playwright install --with-deps
```

> `--with-deps` installs all required OS-level system dependencies for the browsers automatically.

---

## 🧪 Running Tests

### Run all tests (all browsers)

```bash
npx playwright test
```

### Run tests and view the HTML report

```bash
npx playwright test --reporter=html
npx playwright show-report
```

### Run tests in a specific browser

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run tests in headed mode (visible browser window)

```bash
npx playwright test --headed
```

### Run a specific test file

```bash
npx playwright test tests/example.spec.ts
```

### Debug tests interactively

```bash
npx playwright test --debug
```

---

## ⚙️ CI/CD Pipeline

The pipeline is defined in [`.github/workflows/playwright.yml`](.github/workflows/playwright.yml) and triggers automatically on:

- **Push** to `main` or `master`
- **Pull Request** targeting `main` or `master`

### Pipeline Flow

```
Push / Pull Request
        │
        ▼
┌───────────────────────────────────────────┐
│             GitHub Actions                │
│                                           │
│  1. Checkout code                         │
│  2. Setup Node.js LTS                     │
│  3. npm ci  →  Install dependencies       │
│  4. Install Playwright browsers           │
│  5. Run tests  →  Generate HTML report    │
│  6. Upload report artifact (30 days)      │
│  7. Deploy report to Cloudflare Pages     │
└───────────────────────────────────────────┘
        │
        ▼
 🌐 qa-automation-report.pages.dev
```

### Required GitHub Secrets

Set these in your repository under **Settings → Secrets and variables → Actions**:

| Secret | Description |
|---|---|
| `CLOUDFLARE_API_TOKEN` | Cloudflare API token with Pages edit permission |
| `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare account ID |

> - **API Token**: [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens) → Create Token → "Edit Cloudflare Workers" template
> - **Account ID**: Found in the right sidebar of your Cloudflare dashboard

---

## 📊 Test Reports

After every CI run, the HTML report is available in two ways:

| Method | Details |
|---|---|
| 🌐 **Live URL** | [qa-automation-report.pages.dev](https://qa-automation-report.pages.dev) — updated after every push |
| 📦 **GitHub Artifact** | Downloadable from the Actions run summary page, retained for 30 days |

To view the report **locally** after a test run:

```bash
npx playwright show-report
```

---

## 🔧 Configuration

The `playwright.config.ts` file controls test behaviour:

| Option | Local | CI | Description |
|---|---|---|---|
| `fullyParallel` | `true` | `true` | Run all test files in parallel |
| `retries` | `0` | `2` | Auto-retry count for failed tests |
| `workers` | auto | `1` | Number of parallel workers |
| `reporter` | `html` | `html` | Output format |
| `trace` | `on-first-retry` | `on-first-retry` | Capture trace on first retry |
| **Browsers** | Chromium, Firefox, WebKit | Chromium, Firefox, WebKit | All major engines |

---

## 🤝 Contributing

1. Fork this repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push and open a Pull Request

All pull requests trigger the CI pipeline automatically. Please ensure all tests pass before requesting a review.

---

<p align="center">
  Made by <a href="https://github.com/phucyudev">Tran Gia Phuc</a> · Built with <a href="https://playwright.dev">Playwright</a> · Automated by <a href="https://github.com/features/actions">GitHub Actions</a> · Hosted on <a href="https://pages.cloudflare.com">Cloudflare Pages</a>
</p>
