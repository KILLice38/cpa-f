# Documentation

## Choice: Storybook

We use Storybook to document and develop UI components in isolation.

## Why Storybook

- Develop and test components without running the full app
- Visual documentation for shared components in `shared/ui/`
- Helps the team agree on component API and visual states before integration

## What to document

Write stories for components in `shared/ui/` and reusable components in features. Skip stories for one-off layout components.

## File structure

Stories live next to the component they document:

```
shared/ui/Button/
  index.tsx
  index.module.scss
  index.stories.tsx
```

## Rules

- Each story covers one distinct visual state (default, disabled, error, loading, etc.)
- Stories must not depend on global app state or router

## Other documentation

All documentation other than UI components lives in `docs/`.
