# Architecture

## Architecture: Simplified FSD

We use [Feature-Sliced Design](https://feature-sliced.design/) with reduced layers – no "widgets" or "pages" since the project is small and Next.js App Router already handles routing, so there is no ambiguity in page structure.

### Layers (top -> bottom)

```
src/
  app/            # App Router: layouts, global styles, providers
  features/       # User interactions (forms, animations, toggles)
  entities/       # Business objects
  shared/         # Reused UI kit, utils, constants, types
```

### Slice structure

A slice is a self-contained unit inside a layer, representing one business concept or user interaction. Each layer (except `app` and `shared`) is divided into slices:

```
features/
  hero-animation/
  contact-form/

entities/
  lead/
  user/
```

Slices on the same layer cannot import from each other. If cross-slice logic is needed, it belongs in a higher layer.

### Segments structure

Each slice is split into segments by technical role. Only include segments that are actually needed — don't create empty folders:

```
features/hero-animation/
  ui/        # React components of this slice
  model/     # State, types, store (zustand slice, interfaces)
  api/       # API calls related to this slice
  lib/       # Helpers and utils specific to this slice only
  index.ts   # Public API — the only file other layers import from
```

`index.ts` is the boundary of the slice. Other layers must import only from it, never from internals:

```ts
// correct
import { HeroAnimation } from '@/features/hero-animation'

// wrong
import { HeroAnimation } from '@/features/hero-animation/ui/HeroAnimation'
```

### Import rule

A module can only import from layers below the current one:

```
app -> feature -> entities -> shared
```

So `shared` cannot import from any layer above it; `app` can import from all layers.

## Key Decisions

- **No "widgets" layer** – the project is too small to justify the extra abstraction
- **No "pages" layer** – Next.js App Router replaces it and the project has only two pages (404 included). 
