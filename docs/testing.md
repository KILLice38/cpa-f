# Testing

## Choice: Playwright

We use Playwright for end-to-end testing.

## Why Playwright

- Tests the real browser experience — clicks, navigation, form submission
- Supports Chromium, Firefox, and WebKit from one test suite
- Good TypeScript support and a readable API
- Can test animations by waiting for elements or states, not arbitrary timeouts

## File structure

Tests live in `e2e/` at the project root, separate from `src/`:

```
e2e/
  hero.spec.ts
  contact-form.spec.ts
```

## Rules

- Use semantic selectors (`getByRole`, `getByLabel`, `getByText`) — never select by CSS class
- Each spec file covers one feature or page
- Tests must pass on a fresh build (`pnpm build && pnpm start`) before merging
