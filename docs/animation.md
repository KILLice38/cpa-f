# Animation

## Choice: GSAP (GreenSock Animation Platform)

We use GSAP for all complex animations on the site.

## Why GSAP

- Industry standard for web animation — precise timeline control
- Handles complex sequences (the animated background grid) cleanly
- Better performance than CSS animations for multi-step, coordinated animations
- Works well with React via `useGSAP` hook from `@gsap/react`

## Installation

```bash
pnpm add gsap @gsap/react
```

## Usage pattern

Use the `useGSAP` hook inside `'use client'` components. It automatically handles cleanup on unmount:

```tsx
"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export function HeroAnimation() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.to(".ellipse", {
        x: 200,
        duration: 2,
        ease: "power2.inOut",
      });
    },
    { scope: container },
  );

  return <div ref={container}>...</div>;
}
```

## Rules

- Animation logic lives in the `ui/` or `model/` segment of the relevant feature
- Never use `setTimeout` or CSS transitions for anything GSAP handles
- Always use `useGSAP` instead of `useEffect` for GSAP to ensure proper cleanup
- Animation components are always `'use client'`
- On mobile, all animations are disabled except the ticker (running line) and the switching line
