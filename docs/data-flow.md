# Data Flow

## Choice: Native fetch

We use the native `fetch` API for all data requests. No external data-fetching library (SWR, React Query, Axios).

## Why native fetch

- Next.js extends native `fetch` with built-in caching and ISR revalidation
- The project has only 4 endpoints — no need for a dedicated library
- No additional dependency to maintain

## Endpoints

| Method | Endpoint            | Usage                | Strategy    |
| ------ | ------------------- | -------------------- | ----------- |
| GET    | `/{lang}/benefits`  | Get benefits data    | ISR         |
| GET    | `/{lang}/multiply`  | Get multiply data    | ISR         |
| GET    | `/{lang}/tasks`     | Get tasks data       | ISR         |
| POST   | `/form`             | Send contact data    | Client-side |

## GET — ISR fetch (Server Component)

Data fetching happens in Server Components. The `revalidate` option tells Next.js how often to regenerate the page in the background.

## POST — client-side form submission

The contact form is submitted at runtime from the client.

## Rules

- Fetch calls belong in the `api/` segment of the relevant feature or entity
- Never fetch data directly inside a component — keep components free of network logic
- All responses must be typed
