# Performance

## Choice: Lighthouse + Lighthouse CI

We use Lighthouse for manual audits during development and Lighthouse CI to enforce scores automatically in the pipeline.

## Why

- Lighthouse is the standard tool for measuring web performance, accessibility, SEO, and best practices
- Lighthouse CI blocks merges if scores drop below defined thresholds — prevents accidental regressions

## Lighthouse (manual)

Run a Lighthouse audit in Chrome DevTools (F12 → Lighthouse tab) or via CLI:

```bash
pnpm dlx lighthouse http://localhost:3000 --view
```

## Target scores

| Category       | Minimum |
| -------------- | ------- |
| Performance    | 75      |
| Accessibility  | 90      |
| SEO            | 90      |
| Best Practices | 90      |
