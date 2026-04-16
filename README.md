# 🎭 My Playwright Pipeline

[![Playwright Tests](https://github.com/anhtester/antigravity-testing-kit/actions/workflows/playwright.yml/badge.svg)](https://github.com/anhtester/antigravity-testing-kit/actions/workflows/playwright.yml)
[![Playwright Version](https://img.shields.io/badge/Playwright-v1.59.1-45ba4b?logo=playwright)](https://playwright.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript)](https://www.typescriptlang.org)
[![Node.js](https://img.shields.io/badge/Node.js-LTS-339933?logo=node.js)](https://nodejs.org)
[![Cloudflare Pages](https://img.shields.io/badge/Report-Cloudflare%20Pages-F38020?logo=cloudflare)](https://pages.cloudflare.com)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

> An end-to-end automation testing pipeline built with **Playwright** and **TypeScript**, automated via **GitHub Actions**, and publishing HTML test reports to **Cloudflare Pages**.

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

This project demonstrates a complete **CI/CD pipeline for UI automation testing** using Playwright with TypeScript. Every push to the `main`/`master` branch automatically triggers the test suite, collects results, and publishes a live HTML report to Cloudflare Pages — giving the entire team instant visibility into test health.

**Key highlights:**
- 🌐 Cross-browser testing: Chromium, Firefox, and WebKit
- ♻️ Auto-retry on CI (up to 2 retries per failed test)
- 📊 HTML report deployed live to Cloudflare Pages after every run
- 🔒 Secrets managed securely via GitHub Actions secrets

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
my-playwright-pipeline/
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

Make sure you have the following installed:

- [Node.js LTS](https://nodejs.org/en/download) (v18+ recommended)
- [npm](https://www.npmjs.com) (comes with Node.js)
- [Git](https://git-scm.com)

---

## 🚀 Installation

**1. Clone the repository**

```bash
git clone https://github.com/anhtester/antigravity-testing-kit.git
cd antigravity-testing-kit/my-playwright-pipeline
```

**2. Install Node.js dependencies**

```bash
npm ci
```

**3. Install Playwright browsers**

```bash
npx playwright install --with-deps
```

> The `--with-deps` flag installs all required OS-level dependencies for the browsers automatically.

---

## 🧪 Running Tests

### Run all tests (all browsers)

```bash
npx playwright test
```

### Run tests and open the HTML report

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

### Run tests in headed mode (visible browser)

```bash
npx playwright test --headed
```

### Run a specific test file

```bash
npx playwright test tests/example.spec.ts
```

### Debug a test interactively

```bash
npx playwright test --debug
```

---

## ⚙️ CI/CD Pipeline

The pipeline is defined in [`.github/workflows/playwright.yml`](.github/workflows/playwright.yml) and runs automatically on:

- **Push** to `main` or `master`
- **Pull Request** targeting `main` or `master`

### Pipeline Steps

```
┌────────────────────────────────────────────────────────┐
│                    GitHub Actions                      │
│                                                        │
│  1. Checkout code           (actions/checkout@v4)      │
│  2. Setup Node.js LTS       (actions/setup-node@v4)    │
│  3. Install dependencies    (npm ci)                   │
│  4. Install Playwright      (npx playwright install)   │
│  5. Run tests               (npx playwright test)      │
│  6. Upload report artifact  (actions/upload-artifact)  │
│  7. Deploy to Cloudflare    (cloudflare/wrangler)      │
└────────────────────────────────────────────────────────┘
```

### Required GitHub Secrets

To enable the **Cloudflare Pages deployment**, set the following secrets in your GitHub repository (`Settings → Secrets and variables → Actions`):

| Secret Name | Description |
|---|---|
| `CLOUDFLARE_API_TOKEN` | Cloudflare API token with Pages edit permission |
| `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare account ID |

> **How to get these values:**
> - **API Token**: Go to [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens) → Create Token → Use "Edit Cloudflare Workers" template.
> - **Account ID**: Found in the right sidebar of any Cloudflare domain dashboard, or at `dash.cloudflare.com` → click your account.

---

## 📊 Test Reports

After each CI run, the HTML report is:

1. **Uploaded as a GitHub Actions artifact** — retained for 30 days, downloadable from the Actions run summary page.
2. **Deployed live to Cloudflare Pages** — available at the project URL under the name `qa-automation-report`.

To view the report locally after a test run:

```bash
npx playwright show-report
```

---

## 🔧 Configuration

The `playwright.config.ts` file controls the test behaviour:

| Option | Value | Description |
|---|---|---|
| `testDir` | `./tests` | Directory containing test files |
| `fullyParallel` | `true` | Run all test files in parallel |
| `retries` | `2` (CI) / `0` (local) | Auto-retry failed tests on CI |
| `workers` | `1` (CI) / auto (local) | Parallel workers |
| `reporter` | `html` | Generates an HTML report |
| `trace` | `on-first-retry` | Captures trace on first retry |
| **Browsers** | Chromium, Firefox, WebKit | All major browser engines |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push and open a Pull Request

All pull requests will trigger the CI pipeline automatically. Please ensure tests pass before requesting a review.

---

<p align="center">
  Built with ❤️ using <a href="https://playwright.dev">Playwright</a> · Automated by <a href="https://github.com/features/actions">GitHub Actions</a> · Hosted on <a href="https://pages.cloudflare.com">Cloudflare Pages</a>
</p>
