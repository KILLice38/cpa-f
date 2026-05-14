# Forms

## Choice: React Hook Form + Zod

We use `react-hook-form` for form state management and `zod` for schema validation.

## Why this combination

- `react-hook-form` — minimal re-renders, no controlled inputs boilerplate, good DX
- `zod` — type-safe schema validation; the inferred TypeScript type is always in sync with the schema
- `@hookform/resolvers` connects the two with a single line

## Usage pattern

Define the schema with Zod first, then derive the TypeScript type from it.

## Rules

- Schema always lives in `model/schema.ts` of the feature
- Never write manual validation logic — Zod handles it
- Form components are always `'use client'`
