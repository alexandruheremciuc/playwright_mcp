// PROMPT: Initial structure and E2E test generated with AI assistance

## Playwright + TypeScript POM Starter

A small, readable Playwright + TypeScript framework using the Page Object Model. Includes one E2E test that adds two items to a cart and verifies names, count, and total.

### Prerequisites
- Node.js LTS (18+ recommended)

### Setup
```bash
npm install
npx playwright install --with-deps
```

### Configure URL
Set your app URL via env:
```bash
export APP_URL='{{APP_URL}}'
```
The config falls back to `{{APP_URL}}` if not set.

### Run tests
```bash
npm test          # headless
npm run test:headed
npm run test:debug
npm run report    # open HTML report
```

### Structure
```
package.json
tsconfig.json
playwright.config.ts
src/
  pages/
    HomePage.ts
    ProductListPage.ts
    CartPage.ts
  fixtures/
    testData.ts
  utils/
    selectors.ts
    format.ts
tests/
  e2e/
    add-to-cart.spec.ts
```

### Notes
- Selectors prefer `data-testid`, then ARIA role/name, then text/CSS.
- Page Objects include `// TODO` notes to confirm selectors for your target app.
- `parsePrice` handles common currency formats by stripping symbols and normalizing separators.

// PROMPT: “You are my pair-programmer. Build a minimal, clean Playwright + TypeScript test automation framework using Page Object Model (POM) …”

## Playwright + TypeScript (POM) for mega-image.ro

Minimal setup with Page Objects, fixtures, utils, and one E2E test that adds two items to the cart and verifies names, count, and total.

### Prerequisites
- Node.js LTS (18+ recommended)

### Install
```bash
npm install
npx playwright install --with-deps
```

### Configure URL
- Set `APP_URL` (or `BASE_URL`) to your app, e.g.:
```bash
export APP_URL='{{APP_URL}}'
```
(Replace `{{APP_URL}}` or export your actual URL.)

### Run
```bash
npm test          # headless
npm run test:headed
npm run test:debug
npm run report    # open HTML report
```

### Project Structure
```
package.json
tsconfig.json
playwright.config.ts
src/
  pages/
    HomePage.ts
    ProductListPage.ts
    CartPage.ts
  fixtures/
    testData.ts
  utils/
    selectors.ts
    format.ts
tests/
  e2e/
    add-to-cart.spec.ts
.github/
  workflows/
    playwright.yml
```

### Selectors
- Preference order: data-testid > ARIA role/name > visible text > CSS.
- The site may not expose test ids; `src/utils/selectors.ts` documents fallbacks.
- The Page Objects include `// TODO` notes with selectors to confirm on mega-image.ro.

### CI (GitHub Actions)
- Uses Node LTS, caches npm deps, installs Playwright browsers and OS deps, runs headless tests, uploads `playwright-report` artifact.
- See `.github/workflows/playwright.yml`.

### Next Steps
1) Set `APP_URL` (or edit `playwright.config.ts` fallback).
2) Confirm and update selectors in `src/pages/*` and `tests/e2e/add-to-cart.spec.ts` for mega-image.ro.
3) Run:
   ```bash
   npm i
   npx playwright install --with-deps
   npm test
   ```
4) Commit and push to GitHub to trigger CI.


